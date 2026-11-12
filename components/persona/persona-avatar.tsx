"use client";

import { useId } from "react";
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
 * Raster persona lip-sync WITHOUT splitting the image: one <img> carries the
 * portrait; an SVG overlay draws a vocal-tract mouth (dark cavity with teeth
 * and tongue) whose scaleY is driven by voice intensity, over the PNG's
 * resting smile. Blink & float are independent overlays.
 */
export function PersonaAvatar({
  planId,
  lipLevel,
  isSpeaking,
  reduceMotion,
  className,
}: PersonaAvatarProps) {
  const face = personaFaces[planId] ?? personaFaces.solo;
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const { mouth } = face;
  const m = mouth;

  const jaw = useTransform(lipLevel, [0, 0.12, 0.5, 1], [0.06, 0.16, 0.62, 1]);
  const cavityOpacity = useTransform(jaw, [0.06, 0.25, 1], [0, 1, 1]);

  const floatGesture =
    isSpeaking && !reduceMotion
      ? { y: [0, -4, 0, -3, 0], rotate: [0, -0.6, 0, 0.5, 0] }
      : { y: [0, -7, 0], rotate: [0, 0.4, 0] };
  const floatTransition =
    isSpeaking && !reduceMotion
      ? { duration: 1.15, repeat: Infinity, ease: "easeInOut" as const }
      : { duration: 4.2, repeat: Infinity, ease: "easeInOut" as const };

  const blinkTransition = {
    duration: 0.16,
    times: [0, 0.5, 1],
    repeat: Infinity,
    repeatDelay: 3.4 + (planId === "business" ? 1.2 : planId === "complete" ? 2.4 : 0),
    ease: "easeInOut" as const,
  };

  // Mouth cavity geometry
  const halfW = m.width / 2;

  return (
    <motion.div
      className={cn("relative", className)}
      style={{ aspectRatio: `${face.width}/${face.height}` }}
      animate={reduceMotion ? undefined : floatGesture}
      transition={floatTransition}
    >
      {/* The portrait itself — never sliced, never broken */}
      <img
        src={face.image}
        alt={face.alt}
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain drop-shadow-xl"
      />

      {/* Voice action ON the image: articulated overlay mouth */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 h-full w-full"
      >
        <defs>
          <radialGradient id={`cavity-${uid}`} cx="50%" cy="42%" r="65%">
            <stop offset="0%" stopColor="#120609" />
            <stop offset="70%" stopColor="#1f0e0c" />
            <stop offset="100%" stopColor="#33201c" />
          </radialGradient>
        </defs>

        {/* Resting state = the PNG's own smile; opening mouth draws over it */}

        {/* Open mouth: cavity + teeth + tongue, jaw-opens from its top edge */}
        <motion.g
          style={{
            scaleY: jaw,
            opacity: cavityOpacity,
            transformBox: "fill-box",
            originX: "50%",
            originY: "8%",
          }}
        >
          <ellipse
            cx={m.cx * 100}
            cy={m.cy * 100}
            rx={halfW * 88}
            ry={(m.openHeight / 2) * 100}
            fill={`url(#cavity-${uid})`}
          />
          {/* Upper teeth */}
          <path
            d={`M ${(m.cx - halfW * 0.72) * 100} ${(m.cy - m.openHeight * 0.36) * 100}
               Q ${m.cx * 100} ${(m.cy - m.openHeight * 0.1) * 100} ${(m.cx + halfW * 0.72) * 100} ${(m.cy - m.openHeight * 0.36) * 100}
               L ${(m.cx + halfW * 0.62) * 100} ${(m.cy - m.openHeight * 0.18) * 100}
               Q ${m.cx * 100} ${(m.cy + m.openHeight * 0.06) * 100} ${(m.cx - halfW * 0.62) * 100} ${(m.cy - m.openHeight * 0.18) * 100} Z`}
            fill="#f7f5ef"
          />
          {/* Tongue */}
          <ellipse
            cx={m.cx * 100}
            cy={(m.cy + m.openHeight * 0.24) * 100}
            rx={halfW * 52}
            ry={m.openHeight * 36}
            fill="#b0504a"
          />
        </motion.g>
      </svg>

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
    </motion.div>
  );
}
