"use client";

import { useEffect, useRef, type RefObject } from "react";
import {
  useAnimationFrame,
  useMotionValue,
  type MotionValue,
} from "framer-motion";
import {
  loadVisemeTimings,
  cueAt,
  visemeOpenness,
  type VisemeTiming,
} from "./visemes";

export interface UseLipSyncOptions {
  speaking: boolean;
  reduceMotion: boolean;
  analyser: AnalyserNode | null;
  /** Loaded .visemes.json for the CURRENT plan, or null */
  visemeUrl?: string | null;
  /** Live element currently playing the plan's audio file */
  audioRef: RefObject<HTMLAudioElement | null>;
}

export function visemeUrlFor(audioFile?: string | null): string | null {
  if (!audioFile) return null;
  return audioFile.replace(/\.[a-z0-9]+$/i, ".visemes.json");
}

/**
 * Owns a 0..1 `lipLevel` MotionValue.
 * Priority: Rhubarb viseme timings → AnalyserNode FFT → syllable envelope.
 */
export function useLipSync({
  speaking,
  reduceMotion,
  analyser,
  visemeUrl,
  audioRef,
}: UseLipSyncOptions): MotionValue<number> {
  const lipLevel = useMotionValue(0);
  const visemeRef = useRef<VisemeTiming | null | "loading">(null);
  const cueIndexRef = useRef(0);
  const fftRef = useRef<Uint8Array | null>(null);

  // Load / swap viseme cues whenever the active file changes
  useEffect(() => {
    visemeRef.current = null;
    cueIndexRef.current = 0;
    if (!visemeUrl) return;
    let alive = true;
    visemeRef.current = "loading";
    loadVisemeTimings(visemeUrl).then((timing) => {
      if (!alive) return;
      visemeRef.current = timing;
    });
    return () => {
      alive = false;
    };
  }, [visemeUrl]);

  useAnimationFrame((time) => {
    let target = 0;
    if (speaking && !reduceMotion) {
      const timing = visemeRef.current;
      const audio = audioRef.current;

      if (timing && timing !== "loading" && audio && !audio.paused && !audio.ended) {
        const { cue, index } = cueAt(timing, audio.currentTime, cueIndexRef.current);
        cueIndexRef.current = index;
        target = cue ? visemeOpenness(cue.viseme) : 0.05;
      } else if (analyser) {
        const search = Math.floor(analyser.frequencyBinCount * 0.72);
        if (!fftRef.current || fftRef.current.length !== search) {
          fftRef.current = new Uint8Array(search);
        }
        analyser.getByteFrequencyData(fftRef.current);
        let sum = 0;
        for (let i = 0; i < search; i++) sum += fftRef.current[i];
        const avg = sum / search / 255;
        target = Math.min(1, Math.pow(avg, 1.35) * 1.6);
      } else {
        const t = time / 1000;
        const a = (Math.sin(t * 9.1 + 1.7) + 1) / 2;
        const b = (Math.sin(t * 13.6 + 0.6) + 1) / 2;
        const c = (Math.sin(t * 4.7) + 1) / 2;
        target = Math.min(1, 0.16 + a * 0.42 + b * 0.26 + c * 0.18);
      }
    }
    lipLevel.set(lipLevel.get() + (target - lipLevel.get()) * 0.3);
  });

  return lipLevel;
}
