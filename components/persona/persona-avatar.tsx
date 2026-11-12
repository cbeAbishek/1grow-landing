"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { personaFaces } from "@/data/persona-face";
import { cn } from "@/lib/utils";

export interface PersonaAvatarProps {
  planId: string;
  lipLevel: MotionValue<number>;
  isSpeaking: boolean;
  reduceMotion: boolean;
  className?: string;
}

/**
 * Raster persona with an articulated jaw built from stacked clip-path slices
 * of the SAME png. The jaw slice slides down with voice intensity while a
 * dark mouth cavity is revealed underneath it. Blinking + idle float are
 * independent treatments layered on top.
 */
export function PersonaAvatar({
  planId,
  lipLevel,
  isSpeaking,
  reduceMotion,
  className,
}: PersonaAvatarProps) {
  const face = personaFaces[planId] ?? personaFaces.solo;
  const jawHeight = face.jawBottom - face.jawTop;
  const maxDropPct = face.maxJawDrop * jawHeight * 100;

  // Jaw translation as a % of the full-height layer element
  const jawY = useTransform(lipLevel, [0, 1], ["0%", `${maxDropPct.toFixed(2)}%`]);

  // Floating: slow breathing idle, quicker talk bob while speaking
  const floatGesture =
    isSpeaking && !reduceMotion
      ? { y: [0, -4, 0, -3, 0], rotate: [0, -0.6, 0, 0.5, 0] }
      : { y: [0, -7, 0], rotate: [0, 0.4, 0] };
  const floatTransition =
    isSpeaking && !reduceMotion
      ? { duration: 1.15, repeat: Infinity, ease: "easeInOut" as const }
      : { duration: 4.2, repeat: Infinity, ease: "easeInOut" as const };

  const blink = !reduceMotion
    ? { scaleY: [0.06, 1, 0.06] }
    : undefined;
  const blinkTransition = {
    duration: 0.16,
    times: [0, 0.5, 1],
    repeat: Infinity,
    repeatDelay: 3.4 + (planId === "business" ? 1.2 : planId === "complete" ? 2.4 : 0),
    ease: "easeInOut" as const,
  };

  return (
    <motion.div
      className={cn("relative", className)}
      style={{ aspectRatio: `${face.width}/${face.height}` }}
      animate={reduceMotion ? undefined : floatGesture}
      transition={floatTransition}
    >
      {/* Mouth cavity — revealed as the jaw drops */}
      <div
        aria-hidden="true"
        className="absolute z-0"
        style={{
          left: `${(face.faceCenterX - face.mouthWidth / 2) * 100}%`,
          width: `${face.mouthWidth * 100}%`,
          top: `${face.jawTop * 100}%`,
          height: `${(jawHeight * face.maxJawDrop * 1.12 + 0.015) * 100}%`,
          background: face.cavityColor,
          borderRadius: "50% / 62%",
          boxShadow: "inset 0 3px 8px rgba(0,0,0,0.55)",
        }}
      />

      {/* Lower face + torso — stays fixed */}
      <img
        src={face.image}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain"
        style={{ clipPath: `inset(${face.jawBottom * 100}% 0 0 0)` }}
      />

      {/* Jaw slice — slides down with voice intensity */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 select-none"
        style={{
          clipPath: `inset(${face.jawTop * 100}% 0 ${(1 - face.jawBottom) * 100}% 0)`,
          y: jawY,
          willChange: "transform",
        }}
      >
        <img
          src={face.image}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="absolute inset-0 h-full w-full object-contain"
        />
      </motion.div>

      {/* Upper face — stays fixed; carries the accessible name */}
      <img
        src={face.image}
        alt={face.alt}
        draggable={false}
        className="pointer-events-none absolute inset-0 z-20 h-full w-full select-none object-contain"
        style={{ clipPath: `inset(0 0 ${(1 - face.jawTop) * 100}% 0)` }}
      />

      {/* Blink lids */}
      {[face.eyeCx[0], face.eyeCx[1]].map((cx) => (
        <motion.div
          key={cx}
          aria-hidden="true"
          className="absolute z-30 origin-top rounded-[50%]"
          style={{
            left: `${(cx - face.eyeWidth / 2) * 100}%`,
            top: `${face.eyeTop * 100}%`,
            width: `${face.eyeWidth * 100}%`,
            height: `${face.eyeHeight * 100}%`,
            background: face.lidColor,
            borderRadius: "48% 48% 52% 52% / 42% 42% 58% 58%",
            boxShadow: "0 1.5px 2px rgba(0,0,0,0.35)",
          }}
          animate={reduceMotion ? undefined : blink}
          transition={blinkTransition}
        />
      ))}
    </motion.div>
  );
}
