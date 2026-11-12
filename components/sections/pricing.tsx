"use client";

import { useState, useEffect, useRef, useCallback, type RefObject } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  Square,
  Check,
  Mic,
} from "lucide-react";
import { PersonaAvatar } from "@/components/persona/persona-avatar";
import { useLipSync, visemeUrlFor } from "@/components/persona/use-lip-sync";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";
import {
  billingOptions,
  personaPlans,
  calculateEffectiveMonthlyPrice,
  type BillingPeriod,
  type PricingPersona,
} from "@/data/pricing";

interface PricingProps {
  showHeading?: boolean;
  className?: string;
  id?: string;
}

export function Pricing({
  showHeading = true,
  className,
  id = "pricing",
}: PricingProps) {
  const [billing, setBilling] = useState<BillingPeriod>("annual");
  const [activeSpeakerId, setActiveSpeakerId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const isMutedRef = useRef<boolean>(isMuted);
  isMutedRef.current = isMuted;

  // Tear down the Web Audio analyser so waveforms stop cleanly
  const teardownAnalyser = useCallback(() => {
    setAnalyser(null);
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
  }, []);

  // Single-speaker cancel / cleanup function
  const stopAllSpeech = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    if (audioRef.current) {
      audioRef.current.onplay = null;
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    teardownAnalyser();
    setActiveSpeakerId(null);
    setIsSpeaking(false);
  }, [teardownAnalyser]);

  // Web Speech API playback helper
  const playWebSpeech = useCallback(
    (plan: PricingPersona) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        setActiveSpeakerId(null);
        setIsSpeaking(false);
        return;
      }

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(plan.speechScript);
      utterance.rate = plan.voiceConfig.rate;
      utterance.pitch = plan.voiceConfig.pitch;

      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const preferredVoice =
          voices.find((v) => v.lang === plan.voiceConfig.lang) ||
          voices.find((v) => v.lang.startsWith("en-IN")) ||
          voices.find((v) => v.lang.startsWith("en")) ||
          null;
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }
      }

      utterance.onstart = () => {
        if (isMutedRef.current) {
          window.speechSynthesis.cancel();
          return;
        }
        setActiveSpeakerId(plan.id);
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setActiveSpeakerId(null);
        setIsSpeaking(false);
      };

      utterance.onerror = () => {
        setActiveSpeakerId(null);
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    },
    []
  );

  // Playback controller: handles optional audio file fallback to Web Speech API
  const handleTogglePlay = useCallback(
    (plan: PricingPersona) => {
      // If currently speaking this persona, stop playback
      if (activeSpeakerId === plan.id && isSpeaking) {
        stopAllSpeech();
        return;
      }

      // Stop any other active speaker immediately (Single-speaker control)
      stopAllSpeech();

      // If muted, unmute on explicit play click
      if (isMuted) {
        isMutedRef.current = false;
        setIsMuted(false);
      }

      // Attempt optional pre-recorded audio file if defined
      if (plan.audioFile) {
        const audio = new Audio(plan.audioFile);
        audioRef.current = audio;
        audio.muted = isMutedRef.current;
        audio.preload = "auto";

        const wireAnalyser = () => {
          try {
            const AudioCtx =
              window.AudioContext ||
              (window as unknown as { webkitAudioContext?: typeof AudioContext })
                .webkitAudioContext;
            if (!AudioCtx) return;
            const ctx = new AudioCtx();
            const source = ctx.createMediaElementSource(audio);
            const node = ctx.createAnalyser();
            node.fftSize = 64;
            node.smoothingTimeConstant = 0.78;
            source.connect(node);
            node.connect(ctx.destination);
            audioContextRef.current = ctx;
            setAnalyser(node);
            if (ctx.state === "suspended") ctx.resume().catch(() => {});
          } catch {
            // Waveform is decorative — never block playback
          }
        };

        let fallbackStarted = false;
        const fallbackToVoice = () => {
          if (fallbackStarted) return;
          fallbackStarted = true;
          // File missing/unplayable in public/audio — use Web Speech API instead
          teardownAnalyser();
          audioRef.current = null;
          playWebSpeech(plan);
        };

        audio.onplay = () => {
          setActiveSpeakerId(plan.id);
          setIsSpeaking(true);
        };

        audio.onended = () => {
          setActiveSpeakerId(null);
          setIsSpeaking(false);
          audioRef.current = null;
          teardownAnalyser();
        };

        audio.onerror = fallbackToVoice;

        // Wire the analyser BEFORE playback starts, inside the user gesture.
        // If the AudioContext stays suspended, the routed media element would play silently.
        wireAnalyser();

        audio.play().catch(fallbackToVoice);
      } else {
        playWebSpeech(plan);
      }
    },
    [
      activeSpeakerId,
      isSpeaking,
      isMuted,
      stopAllSpeech,
      playWebSpeech,
      teardownAnalyser,
    ]
  );

  // Global Mute Toggle
  const toggleGlobalMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (next) {
        stopAllSpeech();
      }
      return next;
    });
  }, [stopAllSpeech]);

  // Automatic speech cancellation on component unmount
  useEffect(() => {
    return () => {
      stopAllSpeech();
    };
  }, [stopAllSpeech]);

  // Automatic speech cancellation when leaving the tab or hiding window
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAllSpeech();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [stopAllSpeech]);

  // Pre-load synthesis voices for low-latency playback
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  return (
    <section
      id={id}
      aria-labelledby="pricing-heading"
      className={cn("scroll-mt-24 px-4 py-20 sm:py-24", className)}
    >
      <div className="mx-auto max-w-7xl">
        {showHeading && (
          <SectionHeading
            eyebrow="Persona-Based Pricing"
            title={
              <>
                Meet the founders{" "}
                <span className="text-gradient">scaling on 1Grow</span>
              </>
            }
            description="Listen to real business owners speak directly to your operational stage. No static module checklists—just genuine business outcomes."
            accentColor="primary"
          />
        )}

        {/* 20-Day Free Trial Launch Banner */}
        <Reveal className="mx-auto mt-10 max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl border border-accent-green/25 bg-gradient-to-r from-accent-green/10 via-card to-accent-green/5 p-5 shadow-sm sm:flex sm:items-center sm:justify-between sm:p-6">
            <div className="flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-green/20 text-accent-green shadow-sm">
                <Sparkles className="size-6" aria-hidden="true" />
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-heading text-base font-bold text-foreground sm:text-lg">
                    Full Platform Access · 20-Day Free Trial
                  </p>
                  <span className="inline-flex items-center rounded-full bg-accent-green/20 px-2.5 py-0.5 text-xs font-semibold text-accent-green">
                    No Credit Card Required
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                  Experience the exact operational turnaround before paying a single rupee. All features unlocked.
                </p>
              </div>
            </div>
            <div className="mt-4 shrink-0 sm:mt-0 sm:pl-4">
              <Link
                href="/wishlist"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent-green px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-accent-green/20 transition-all hover:bg-accent-green/90 sm:w-auto"
              >
                Claim Free Trial
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Billing frequency toggle & Global Audio Controls */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Billing Periods */}
            <div
              role="tablist"
              aria-label="Billing frequency selection"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/80 p-1.5 shadow-inner backdrop-blur-sm"
            >
              {billingOptions.map((option) => {
                const isSelected = billing === option.id;
                return (
                  <button
                    key={option.id}
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setBilling(option.id)}
                    className={cn(
                      "relative flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:text-sm",
                      isSelected
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span>{option.label}</span>
                    {option.badge && (
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                          isSelected
                            ? "bg-primary-foreground/20 text-primary-foreground"
                            : "bg-accent-green/15 text-accent-green"
                        )}
                      >
                        {option.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Global Mute Toggle Button */}
            <button
              type="button"
              onClick={toggleGlobalMute}
              aria-label={isMuted ? "Unmute all personas" : "Mute all personas"}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:text-sm",
                isMuted
                  ? "border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/20"
                  : isSpeaking
                  ? "border-primary/40 bg-primary/10 text-primary shadow-sm"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              )}
            >
              {isMuted ? (
                <>
                  <VolumeX className="size-4" />
                  <span>Audio Muted</span>
                </>
              ) : (
                <>
                  <Volume2
                    className={cn(
                      "size-4",
                      isSpeaking && "animate-pulse text-primary"
                    )}
                  />
                  <span>{isSpeaking ? "Voice Playing" : "Mute Voice"}</span>
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-muted-foreground">
            {billing === "annual" ? (
              <span className="font-medium text-accent-green">
                ✓ 20% Annual savings applied — enjoy 2 months free!
              </span>
            ) : billing === "half" ? (
              <span className="font-medium text-accent-green">
                ✓ 10% Semi-annual savings applied
              </span>
            ) : (
              "Standard monthly billing, cancel anytime with 1 click."
            )}
          </p>
        </div>

        {/* Minimal Persona Pricing Cards Grid (ONLY Character, Speech Bubble, Plan Name, Price, CTA) */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
          {personaPlans.map((plan, i) => (
            <PersonaCard
              key={plan.id}
              plan={plan}
              billing={billing}
              index={i}
              isSpeaking={activeSpeakerId === plan.id && isSpeaking}
              analyser={analyser}
              audioRef={audioRef}
              onTogglePlay={() => handleTogglePlay(plan)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface PersonaCardProps {
  plan: PricingPersona;
  billing: BillingPeriod;
  index: number;
  isSpeaking: boolean;
  analyser: AnalyserNode | null;
  audioRef: RefObject<HTMLAudioElement | null>;
  onTogglePlay: () => void;
}

function PersonaCard({
  plan,
  billing,
  index,
  isSpeaking,
  analyser,
  audioRef,
  onTogglePlay,
}: PersonaCardProps) {
  const reduceMotion = useReducedMotion();
  const effectivePrice = calculateEffectiveMonthlyPrice(
    plan.monthlyPrice,
    billing
  );
  const hasDiscount = billing !== "monthly";
  const isTalking = isSpeaking && !reduceMotion;

  // Voice amplitude (0..1) drives jaw, bob, rings — visemes > FFT > envelope
  const lipLevel = useLipSync({
    speaking: isSpeaking,
    reduceMotion: !!reduceMotion,
    analyser,
    visemeUrl: visemeUrlFor(plan.audioFile),
    audioRef,
  });

  return (
    <Reveal
      delay={index * 0.1}
      className={cn(
        "group relative flex h-full flex-col rounded-3xl border transition-all duration-300",
        plan.highlight
          ? "border-primary/50 bg-gradient-to-b from-primary/10 via-card to-card shadow-2xl shadow-primary/15 ring-2 ring-primary/25 lg:-translate-y-2 lg:scale-[1.03] z-10"
          : "border-border bg-card hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-black/5"
      )}
    >
      {/* Popular Badge for Highlighted Middle Plan */}
      {plan.highlight && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-accent-yellow px-4 py-1 text-xs font-bold text-primary-foreground shadow-lg shadow-primary/30">
            <Sparkles className="size-3.5 fill-current" />
            {plan.popularBadge || "Most Popular"}
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {/* 1. Plan Name & Persona Header */}
        <div className="text-center">
          <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground">
            {plan.planName}
          </h3>
          <p className="mt-1 text-xs font-medium text-muted-foreground">
            {plan.characterName} · {plan.characterRole}
          </p>
        </div>

        {/* 2. Voice Controller — the pitch is SPOKEN here, not shown as text */}
        <div className="relative mt-5">
          <div
            className={cn(
              "relative flex items-center justify-between gap-3 rounded-2xl border py-2 pl-2.5 pr-3 shadow-sm transition-all duration-300",
              isSpeaking
                ? "border-primary/50 bg-primary/10 ring-2 ring-primary/20 shadow-md shadow-primary/10"
                : "border-border/80 bg-muted/60 dark:bg-muted/30"
            )}
          >
            {/* Speech bubble tail pointing down to the character */}
            <div
              aria-hidden="true"
              className={cn(
                "absolute -bottom-2.5 left-1/2 size-0 -translate-x-1/2 border-x-8 border-t-8 border-x-transparent transition-colors",
                isSpeaking
                  ? "border-t-primary/30"
                  : "border-t-border/80 dark:border-t-muted"
              )}
            />

            <button
              type="button"
              onClick={onTogglePlay}
              aria-label={
                isSpeaking
                  ? `Stop speech for ${plan.characterName}`
                  : `Listen to ${plan.characterName} speak`
              }
              aria-pressed={isSpeaking}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                isSpeaking
                  ? "bg-primary text-primary-foreground shadow-sm shadow-primary/25 hover:bg-primary/90"
                  : "bg-card border border-border text-foreground hover:bg-muted hover:border-primary/30"
              )}
            >
              {isSpeaking ? (
                <>
                  <Square className="size-3 fill-current" />
                  <span>Stop Voice</span>
                </>
              ) : (
                <>
                  <Play className="size-3 fill-current" />
                  <span>Hear {plan.characterName.split(" ")[0]} Speak</span>
                </>
              )}
            </button>

            {/* Live waveform while speaking, subtle hint otherwise */}
            {isSpeaking ? (
              <AudioWaveVisualizer
                active={isSpeaking}
                analyser={analyser}
                bars={6}
                className="text-primary"
              />
            ) : (
              <span className="hidden items-center gap-1.5 whitespace-nowrap pr-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground xl:inline-flex">
                <Mic className="size-3.5" aria-hidden="true" />
                Tap to hear
              </span>
            )}
          </div>
        </div>

        {/* 3. The Persona — SVG character that lip-syncs and bobs to the voice */}
        <div className="relative my-2 flex flex-col items-center justify-center">
          {/* Expanding sound rings behind the character */}
          {isTalking && (
            <>
              {[0, 1, 2].map((ring) => (
                <motion.span
                  key={ring}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-36 w-36 rounded-full border-2 border-primary/30 sm:h-40 sm:w-40"
                  animate={{
                    x: "-50%",
                    y: "-50%",
                    scale: [0.55, 2.05],
                    opacity: [0.6, 0],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: ring * 0.6,
                  }}
                />
              ))}
            </>
          )}

          {/* Character: mouth and head move with the actual voice amplitude */}
          <PersonaAvatar
            planId={plan.id}
            lipLevel={lipLevel}
            isSpeaking={isSpeaking}
            reduceMotion={!!reduceMotion}
            className="relative z-10 h-44 w-auto drop-shadow-xl transition-all duration-300 group-hover:scale-[1.03] sm:h-48"
          />

          {/* Speaking status chip with mini waveform */}
          {isSpeaking && (
            <motion.div
              initial={{ opacity: 0, y: 6, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              className="pointer-events-none absolute bottom-0 left-1/2 z-20 flex items-center gap-2 rounded-full border border-primary/30 bg-card/95 py-1 pl-2.5 pr-3 shadow-lg backdrop-blur-sm"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                Speaking
              </span>
              <AudioWaveVisualizer
                active={isSpeaking}
                analyser={analyser}
                bars={4}
                tall
                className="text-primary"
              />
            </motion.div>
          )}
        </div>

        {/* 4. What's included in this package */}
        <ul className="mt-2 flex-1 space-y-1.5 border-t border-border/60 pt-3">
          {plan.features.map((feature) => {
            const isDivider = feature.startsWith("Everything in");
            if (isDivider) {
              return (
                <li
                  key={feature}
                  className="pt-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground"
                >
                  {feature}
                </li>
              );
            }
            return (
              <li
                key={feature}
                className="flex items-start gap-2 text-[11px] font-medium leading-snug text-foreground/90 sm:text-xs"
              >
                <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-accent-green/15 text-accent-green">
                  <Check className="size-2.5" strokeWidth={3.5} aria-hidden="true" />
                </span>
                <span>{feature}</span>
              </li>
            );
          })}
        </ul>

        {/* 5. Price Display */}
        <div className="border-t border-border/60 pt-4 text-center">
          <div className="flex items-baseline justify-center gap-1.5">
            <span className="font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              ₹{effectivePrice.toLocaleString("en-IN")}
            </span>
            <span className="text-sm font-semibold text-muted-foreground">
              /month
            </span>
          </div>

          <div className="mt-1 flex items-center justify-center gap-2">
            {hasDiscount && (
              <span className="text-xs text-muted-foreground line-through">
                ₹{plan.monthlyPrice.toLocaleString("en-IN")}
              </span>
            )}
            {hasDiscount && (
              <span className="rounded-md bg-accent-green/15 px-2 py-0.5 text-[11px] font-bold text-accent-green">
                Save {billing === "annual" ? "20%" : "10%"}
              </span>
            )}
            {!hasDiscount && (
              <span className="text-[11px] text-muted-foreground">
                Billed monthly
              </span>
            )}
          </div>
        </div>

        {/* 6. CTA Button */}
        <div className="mt-5">
          <Link
            href={plan.ctaHref}
            className={cn(
              "group/btn flex h-12 w-full items-center justify-center gap-2 rounded-2xl px-5 text-sm font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
              plan.highlight
                ? "bg-gradient-to-r from-primary via-accent-yellow to-primary text-primary-foreground shadow-lg shadow-primary/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/35"
                : "border-2 border-border bg-card text-foreground hover:border-primary hover:bg-muted/50 hover:text-foreground"
            )}
          >
            <span>{plan.ctaText}</span>
            <ArrowRight className="size-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
          </Link>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            20-day full access · No card required
          </p>
        </div>
      </div>
    </Reveal>
  );
}

interface AudioWaveVisualizerProps {
  active: boolean;
  analyser: AnalyserNode | null;
  bars?: number;
  tall?: boolean;
  className?: string;
}

function AudioWaveVisualizer({
  active,
  analyser,
  bars = 5,
  tall = false,
  className,
}: AudioWaveVisualizerProps) {
  const reduceMotion = useReducedMotion();
  const [levels, setLevels] = useState<number[]>(() =>
    Array(bars).fill(0.28)
  );

  useEffect(() => {
    if (!active) {
      setLevels(Array(bars).fill(0.28));
      return;
    }
    if (reduceMotion) {
      setLevels(Array(bars).fill(0.55));
      return;
    }

    let raf = 0;
    let last = 0;
    let t = Math.random() * 100;
    // Voice energy lives in the low-mid bins; skip the top (mostly noise)
    const data = analyser
      ? new Uint8Array(Math.floor(analyser.frequencyBinCount * 0.72))
      : null;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (now - last < 55) return; // ~18fps updates, CSS transitions smooth the rest
      last = now;

      const next = new Array<number>(bars).fill(0.3);

      if (analyser && data) {
        analyser.getByteFrequencyData(data);
        for (let i = 0; i < bars; i++) {
          const start = Math.floor((i / bars) * data.length);
          const end = Math.max(start + 1, Math.floor(((i + 1) / bars) * data.length));
          let sum = 0;
          for (let j = start; j < end; j++) sum += data[j];
          const avg = sum / (end - start) / 255;
          next[i] = 0.18 + avg * 0.95;
        }
      } else {
        // Web Speech API audio can't be tapped by an analyser, so synthesise
        // a natural syllable-like envelope that rises and falls like a voice.
        t += 0.26;
        for (let i = 0; i < bars; i++) {
          const syllable = (Math.sin(t * 1.9 + i * 0.7) + 1) / 2;
          const carrier = (Math.sin(t + i * 1.35) + 1) / 2;
          next[i] =
            0.2 + syllable * 0.45 + carrier * 0.3 + Math.random() * 0.08;
        }
      }

      setLevels((prev) =>
        next.map((v, i) => prev[i] + (v - prev[i]) * 0.5)
      );
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, analyser, bars, reduceMotion]);

  const maxHeight = tall ? 12 : 18;

  return (
    <div
      role="img"
      aria-label="Voice playing"
      className={cn("flex h-5 items-end gap-[3px]", className)}
    >
      {levels.map((level, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="w-1 rounded-full bg-current transition-[height,opacity] duration-150 ease-out"
          style={{
            height: `${Math.round(3 + level * maxHeight)}px`,
            opacity: active ? 0.55 + level * 0.45 : 0.4,
          }}
        />
      ))}
    </div>
  );
}
