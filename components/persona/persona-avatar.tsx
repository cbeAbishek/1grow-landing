"use client";

import { motion } from "framer-motion";
import { personaFaces } from "@/data/persona-face";
import { cn } from "@/lib/utils";

export interface PersonaAvatarProps {
  planId: string;
  reduceMotion: boolean;
  className?: string;
}

/**
 * Raster persona portrait: one <img> carries the portrait and an independent
 * blink overlay animates the eye lids on a loop.
 */
export function PersonaAvatar({
  planId,
  reduceMotion,
  className,
}: PersonaAvatarProps) {
  const face = personaFaces[planId] ?? personaFaces.solo;

  const blinkTransition = {
    duration: 0.16,
    times: [0, 0.5, 1],
    repeat: Infinity,
    repeatDelay: 3.4,
    ease: "easeInOut" as const,
  };

  return (
    <div
      className={cn("relative", className)}
      style={{ aspectRatio: `${face.width}/${face.height}` }}
    >
      {/* The portrait itself — never sliced, never broken */}
      <img
        src={face.image}
        alt={face.alt}
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain drop-shadow-xl"
      />

      {/* Blink lids */}
      {[face.eyeL, face.eyeR].map((eye, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className="pointer-events-none absolute z-20 origin-top"
          style={{
            left: `${(eye.cx - eye.w / 2) * 100}%`,
            top: `${face.eyeTop * 100}%`,
            width: `${eye.w * 100}%`,
            height: `${face.eyeHeight * 100}%`,
            background: face.lidColor,
            borderRadius: "48% 48% 52% 52% / 42% 42% 58% 58%",
            boxShadow: "0 1.5px 2px rgba(0,0,0,0.35)",
          }}
          animate={reduceMotion ? undefined : { scaleY: [0.06, 1, 0.06] }}
          transition={blinkTransition}
        />
      ))}
    </div>
  );
}
