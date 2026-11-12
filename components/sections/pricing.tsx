"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, Check, Zap } from "lucide-react";
import { PersonaAvatar } from "@/components/persona/persona-avatar";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";
import { personaPlans, type PricingPersona } from "@/data/pricing";

/* -------------------------------------------------------------------------- */
/*  Per-card staging: where the persona stands and which gesture it performs.  */
/*  Order follows `personaPlans`.                                              */
/*    blink : calm, only the eye blink built into PersonaAvatar                */
/*    point : leans toward the feature card and a pointer shows the way down   */
/*    nod   : greets the visitor with two small nods                           */
/* -------------------------------------------------------------------------- */

type Side = "right" | "left" | "center";
type Gesture = "blink" | "point" | "nod";

const STAGING: { stage: string; side: Side; gesture: Gesture }[] = [
  { stage: "Capture", side: "right", gesture: "blink" },
  { stage: "Run", side: "left", gesture: "point" },
  { stage: "Grow", side: "center", gesture: "nod" },
];

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
  const plans = personaPlans;

  return (
    <section
      id={id}
      aria-labelledby="pricing-heading"
      className={cn(
        "relative isolate scroll-mt-24 overflow-hidden px-4 py-20 sm:py-28",
        className
      )}
    >
      {/* Soft blueprint grid and warm spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 text-foreground opacity-[0.045] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_45%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[32rem] w-[60rem] max-w-full -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="mx-auto max-w-7xl">
        {showHeading && (
          <SectionHeading
            eyebrow="Your agent team"
            title={
              <>
                Pick how many agents{" "}
                <span className="text-gradient">work for your business</span>
              </>
            }
            description="Each plan adds an agent to the relay. They hand work to each other, so you run the business while they run the routine."
            accentColor="primary"
          />
        )}

        {/* Trigger node: the trial starts the workflow */}
        <Reveal className="mx-auto mt-12 max-w-3xl">
          <TrialTrigger />
        </Reveal>
        <div
          aria-hidden="true"
          className="mx-auto h-10 w-px bg-gradient-to-b from-border via-primary/40 to-border lg:hidden"
        />

        {/* The relay. pt-44 is the headroom the personas rise into. */}
        <div className="flex flex-col items-stretch pt-44 lg:flex-row lg:pt-48">
          {plans.map((plan, i) => (
            <div key={plan.id} className="contents">
              <AgentCard plan={plan} index={i} />
              {i < plans.length - 1 && (
                <Handoff
                  fromName={plan.characterName}
                  toName={plans[i + 1].characterName}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Trial trigger                                                              */
/* -------------------------------------------------------------------------- */

function TrialTrigger() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-accent-green/30 bg-card/80 p-5 shadow-sm backdrop-blur sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-6">
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1 bg-accent-green"
      />
      <div className="flex items-start gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-green/15 text-accent-green">
          <Zap className="size-5" aria-hidden="true" />
        </span>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-heading text-base font-bold text-foreground sm:text-lg">
              Start with all agents on, free for 20 days
            </p>
            <span className="rounded-full bg-accent-green/15 px-2.5 py-0.5 text-xs font-semibold text-accent-green">
              No credit card
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            See the full relay work on your own business before you pay a single
            rupee.
          </p>
        </div>
      </div>
      <Link
        href="/wishlist"
        className="mt-4 inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-accent-green px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-accent-green/20 transition hover:bg-accent-green/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green sm:mt-0 sm:w-auto"
      >
        Claim free trial
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Handoff rail between agents                                                */
/* -------------------------------------------------------------------------- */

function Handoff({
  fromName,
  toName,
}: {
  fromName: string;
  toName: string;
}) {
  const reduceMotion = useReducedMotion();
  const label = `${fromName} hands work to ${toName}`;

  return (
    <>
      {/* Desktop: horizontal rail at header height */}
      <div
        role="img"
        aria-label={label}
        className="relative hidden w-14 shrink-0 self-start lg:mt-16 lg:block xl:w-20"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-border" />
        {!reduceMotion && (
          <motion.span
            className="absolute top-0 size-2.5 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_14px_3px] shadow-primary/50"
            animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.6,
            }}
          />
        )}
        <span className="absolute left-1/2 top-0 grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-border bg-card text-muted-foreground shadow-sm">
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </span>
      </div>

      {/* Mobile and tablet: vertical rail through the headroom */}
      <div
        role="img"
        aria-label={label}
        className="relative mx-auto h-44 w-px lg:hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-border via-primary/40 to-border" />
        {!reduceMotion && (
          <motion.span
            className="absolute left-1/2 size-2.5 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_14px_3px] shadow-primary/50"
            animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.5,
            }}
          />
        )}
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Persona gestures                                                           */
/* -------------------------------------------------------------------------- */

function gestureMotion(gesture: Gesture, side: Side) {
  switch (gesture) {
    case "point": {
      // Lean toward the card below; direction follows the side it stands on.
      const dir = side === "left" ? 1 : -1;
      return {
        animate: {
          rotate: [0, 4 * dir, 4 * dir, 0],
          x: [0, 6 * dir, 6 * dir, 0],
          y: [0, 3, 3, 0],
        },
        transition: {
          duration: 4,
          times: [0, 0.2, 0.75, 1],
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      };
    }
    case "nod":
      // Two small nods, then a pause.
      return {
        animate: { y: [0, 7, 0, 7, 0, 0] },
        transition: {
          duration: 3.6,
          times: [0, 0.1, 0.2, 0.3, 0.4, 1],
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      };
    default:
      return { animate: undefined, transition: undefined };
  }
}

/* -------------------------------------------------------------------------- */
/*  Agent card                                                                 */
/* -------------------------------------------------------------------------- */

interface AgentCardProps {
  plan: PricingPersona;
  index: number;
}

function AgentCard({ plan, index }: AgentCardProps) {
  const reduceMotion = useReducedMotion();
  const { stage, side, gesture } =
    STAGING[index] ?? STAGING[STAGING.length - 1];
  const motionProps = gestureMotion(gesture, side);

  return (
    <Reveal
      delay={index * 0.1}
      className={cn(
        "relative flex min-w-0 flex-1 flex-col rounded-[28px] border bg-card",
        plan.highlight
          ? "z-10 border-primary/50 shadow-2xl shadow-primary/15 ring-1 ring-primary/30 lg:-translate-y-3"
          : "border-border shadow-lg shadow-black/[0.04]"
      )}
    >
      {/*
        Persona: stands mostly OUTSIDE the card, overlapping the top edge.
        Each card stages it differently: right, left, or centered.
        About 70% of the figure is above the card; the lower part fades in.
        Mobile: -top-36 h-52 | sm and up: -top-[10.5rem] h-60
      */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -top-36 z-20 flex h-52 items-end sm:-top-[10.5rem] sm:h-60",
          side === "right" && "right-2 w-[48%] justify-end sm:right-3",
          side === "left" && "left-2 w-[48%] justify-start sm:left-3",
          side === "center" && "left-1/2 w-[62%] -translate-x-1/2 justify-center"
        )}
      >
        <motion.div
          className="flex h-full w-full items-end justify-center"
          style={{
            transformOrigin:
              side === "left" ? "35% 100%" : side === "right" ? "65% 100%" : "50% 100%",
          }}
          animate={reduceMotion ? undefined : motionProps.animate}
          transition={motionProps.transition}
        >
          {/* Only the "blink" card keeps the built-in eye blink, so every
              card shows one clear gesture. */}
          <PersonaAvatar
            planId={plan.id}
            reduceMotion={gesture === "blink" ? !!reduceMotion : true}
            className="h-full w-auto max-w-full object-contain object-bottom drop-shadow-xl [mask-image:linear-gradient(to_bottom,black_72%,transparent)]"
          />
        </motion.div>
      </div>

      {/* Pointer that shows the way to the feature cards (point gesture only) */}
      {gesture === "point" && (
        <motion.span
          aria-hidden="true"
          className={cn(
            "absolute top-[5.75rem] z-10 grid size-9 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 sm:top-[6.25rem]",
            side === "left" ? "left-8 sm:left-9" : "right-8 sm:right-9"
          )}
          animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="size-4" strokeWidth={3} />
        </motion.span>
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Header: always clear of the persona */}
        <div
          className={cn(
            side === "center"
              ? "flex flex-col items-center pt-14 text-center sm:pt-16"
              : "min-h-[6.5rem] w-[50%] sm:min-h-[7rem]",
            side === "left" && "ml-auto"
          )}
        >
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-foreground/80">
            <span className="size-1.5 rounded-full bg-primary" />
            {stage}
          </span>
          <h3 className="mt-2 font-heading text-xl font-bold leading-tight tracking-tight text-foreground sm:text-2xl">
            {plan.planName}
          </h3>
          <p className="mt-1 text-xs font-medium leading-snug text-muted-foreground">
            {plan.characterName}
            <span className="block">{plan.characterRole}</span>
          </p>
        </div>

        {/* Feature menu cards: fully visible and static */}
        <div className="mt-4 flex-1">
          <p className="mb-2 text-xs font-semibold text-foreground/80">
            What you get
          </p>

          <ul className="space-y-1.5">
            {plan.features.map((feature) => {
              if (feature.startsWith("Everything in")) {
                return (
                  <li
                    key={feature}
                    className="flex items-center gap-2 pb-0.5 pt-1.5 text-xs font-semibold text-muted-foreground"
                  >
                    <span className="h-px flex-1 bg-border" />
                    {feature}
                    <span className="h-px flex-1 bg-border" />
                  </li>
                );
              }

              return (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 rounded-xl border border-border/60 bg-background/50 px-3 py-2 text-xs font-medium leading-snug text-foreground/85"
                >
                  <span className="mt-px grid size-4 shrink-0 place-items-center rounded-full bg-accent-green/15 text-accent-green">
                    <Check
                      className="size-2.5"
                      strokeWidth={3.5}
                      aria-hidden="true"
                    />
                  </span>
                  <span>{feature}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Price: original price only */}
        <div className="mt-5 flex items-baseline justify-center gap-1.5 border-t border-border/60 pt-5">
          <span className="font-heading text-4xl font-extrabold tabular-nums tracking-tight text-foreground sm:text-5xl">
            ₹{plan.monthlyPrice.toLocaleString("en-IN")}
          </span>
          <span className="text-sm font-semibold text-muted-foreground">
            /month
          </span>
        </div>

        {/* CTA */}
        <div className="mt-5">
          <Link
            href={plan.ctaHref}
            className={cn(
              "group/btn flex h-12 w-full items-center justify-center gap-2 rounded-2xl px-5 text-sm font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
              plan.highlight
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/35"
                : "border-2 border-border bg-card text-foreground hover:border-primary hover:bg-muted/50"
            )}
          >
            <span>{plan.ctaText}</span>
            <ArrowRight
              className="size-4 transition-transform duration-200 group-hover/btn:translate-x-1"
              aria-hidden="true"
            />
          </Link>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            20-day full access, no card required
          </p>
        </div>
      </div>
    </Reveal>
  );
}