"use client";

import { useId, type ReactNode } from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";

export interface PersonaAvatarProps {
  planId: string;
  level: MotionValue<number>;
  reduceMotion: boolean;
  className?: string;
}

export function PersonaAvatar({
  planId,
  level,
  reduceMotion,
  className,
}: PersonaAvatarProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  // Jaw open factor (0.06 = lips resting, 1 = fully open mid-syllable)
  const jawOpen = useTransform(level, [0, 0.12, 0.5, 1], [0.06, 0.22, 0.62, 1]);
  const headBob = useTransform(level, [0, 1], [0, 2.4]);
  const headTilt = useTransform(level, [0, 1], [0, -1.1]);

  const mouth = (
    <motion.g
      style={{
        scaleY: jawOpen,
        transformBox: "fill-box",
        originX: "50%",
        originY: "12%",
      }}
    >
      <path
        d="M95,103.5q15,9 30,0q-2,12.5 -15,12.5q-13,0 -15,-12.5Z"
        fill="#3a1810"
      />
      <path
        d="M95,103.5q15,9 30,0l-1.6,3.6q-13.4,7.4 -26.8,0Z"
        fill="#f8fafc"
        opacity={0.92}
      />
      <ellipse cx={110} cy={112.6} rx={6.4} ry={2.7} fill="#d97780" />
    </motion.g>
  );

  const restingSmile = (
    <path
      d="M97,105.5q13,6.5 26,0"
      fill="none"
      stroke="#552c18"
      strokeWidth={2.1}
      strokeLinecap="round"
      opacity={0.9}
    />
  );

  const eyes = (blinkDelay: number) => (
    <>
      {[96, 124].map((cx) => (
        <motion.g
          key={cx}
          style={{
            transformBox: "fill-box",
            originX: "50%",
            originY: "50%",
          }}
          animate={
            reduceMotion
              ? undefined
              : { scaleY: [1, 0.08, 1] }
          }
          transition={{
            duration: 0.24,
            repeat: Infinity,
            repeatDelay: blinkDelay,
            times: [0, 0.5, 1],
            ease: "easeInOut",
          }}
        >
          <ellipse cx={cx} cy={87.5} rx={8.1} ry={4.9} fill="#fff" />
          <circle cx={cx} cy={87.7} r={4.3} fill="#33231b" />
          <circle cx={cx} cy={87.9} r={2.1} fill="#130b07" />
          <circle cx={cx + 1.4} cy={86.4} r={1.15} fill="#fff" />
        </motion.g>
      ))}
    </>
  );

  let body: ReactNode = null;
  let accent = "#f97316";

  if (planId === "solo") {
    accent = "#f97316";
    body = (
      <>
        {/* Backdrop glow */}
        <circle cx={110} cy={118} r={98} fill={`url(#bg-${uid})`} />

        {/* Torso: orange puffer jacket */}
        <path
          d="M28,240C28,178 62,156 110,156C158,156 192,178 192,240Z"
          fill={`url(#jacket-${uid})`}
        />
        <path
          d="M110,166v74"
          stroke="#7c2d12"
          strokeWidth={2.6}
          strokeDasharray="4 3"
          opacity={0.85}
        />
        <path
          d="M96,158h28l-5,16h-18Z"
          fill="#c2410c"
        />
        <path
          d="M101,158h18l-3,10h-12Z"
          fill="#111111"
        />
        <path
          d="M52,196c8,10 18,15 29,17M168,196c-8,10 -18,15 -29,17"
          stroke="#fdba74"
          strokeWidth={5}
          strokeLinecap="round"
          opacity={0.5}
          fill="none"
        />

        {/* Neck */}
        <path
          d="M96,120h28v20c0,10 -28,10 -28,0Z"
          fill="#8a4f2c"
        />
        <path
          d="M96,120h28v6H96Z"
          fill="#6b3a1e"
          opacity={0.7}
        />

        {/* Ears */}
        <ellipse cx={77} cy={88} rx={5.4} ry={8.6} fill="#8a4f2c" />
        <ellipse cx={143} cy={88} rx={5.4} ry={8.6} fill="#8a4f2c" />

        {/* Head */}
        <ellipse cx={110} cy={84} rx={33} ry={37} fill={`url(#skinSolo-${uid})`} />
        <ellipse cx={100} cy={74} rx={17} ry={15} fill="#cd9a6b" opacity={0.35} />

        {/* Quiff hairstyle */}
        <path
          d="M76,67C72,33 93,18 116,20C143,22 152,40 150,64C142,55 131,53 121,57C103,63 88,63 76,67Z"
          fill="#221510"
        />
        <path
          d="M88,38c9,-7 22,-8 31,-4"
          stroke="#4a2c1c"
          strokeWidth={3}
          strokeLinecap="round"
          opacity={0.9}
          fill="none"
        />

        {/* Brows */}
        <path d="M87,79.5q9,-5.5 17,0" stroke="#221510" strokeWidth={2.6} strokeLinecap="round" fill="none" />
        <path d="M116,79.5q9,-5.5 17,0" stroke="#221510" strokeWidth={2.6} strokeLinecap="round" fill="none" />

        {eyes(3.2)}

        {/* Nose */}
        <path d="M110,92q0.5,6.5 -3,9" stroke="#6b3a1e" strokeWidth={1.6} strokeLinecap="round" opacity={0.75} fill="none" />

        {restingSmile}
        {mouth}
      </>
    );
  } else if (planId === "business") {
    accent = "#14b8a6";
    body = (
      <>
        <circle cx={110} cy={118} r={98} fill={`url(#bg-${uid})`} />

        {/* Long wavy hair behind shoulders */}
        <path
          d="M64,240C60,150 78,78 110,72C142,78 160,150 156,240Z"
          fill="#16111c"
        />

        {/* Torso: teal blazer + cream kurti */}
        <path
          d="M28,240C28,178 62,156 110,156C158,156 192,178 192,240Z"
          fill={`url(#blazer-${uid})`}
        />
        <path d="M110,156l-16,26 16,58 16,-58Z" fill="#f5e9d7" opacity={0.95} />
        <path d="M84,166l24,20M136,166l-24,20" stroke="#0b3b39" strokeWidth={4} strokeLinecap="round" opacity={0.8} />
        <path d="M92,192q18,12 36,0" stroke="#f0c56b" strokeWidth={2} fill="none" opacity={0.9} />

        {/* Neck */}
        <path d="M97,118h26v22c0,9 -26,9 -26,0Z" fill="#7c4a26" />
        <path d="M97,118h26v6H97Z" fill="#5f3719" opacity={0.75} />

        {/* Ears + gold hoops */}
        <ellipse cx={79} cy={88} rx={5} ry={8.2} fill="#7c4a26" />
        <ellipse cx={141} cy={88} rx={5} ry={8.2} fill="#7c4a26" />
        <circle cx={79} cy={97} r={3.6} fill="none" stroke="#f0c56b" strokeWidth={1.7} />
        <circle cx={141} cy={97} r={3.6} fill="none" stroke="#f0c56b" strokeWidth={1.7} />

        {/* Head */}
        <ellipse cx={110} cy={83} rx={31} ry={35.5} fill={`url(#skinBiz-${uid})`} />
        <ellipse cx={100} cy={73} rx={16} ry={14} fill="#cd9a6b" opacity={0.3} />

        {/* Side-swept voluminous hair */}
        <path
          d="M74,72C70,32 96,18 118,21C144,24 152,46 146,74C138,60 128,57 116,61C99,67 84,70 74,72Z"
          fill="#16111c"
        />
        <path
          d="M74,70C78,88 74,104 66,112C72,96 76,84 74,70Z"
          fill="#16111c"
        />
        <path
          d="M146,70C142,88 146,104 154,112C148,96 144,84 146,70Z"
          fill="#16111c"
        />
        <path
          d="M96,32c10,-5 24,-5 32,1"
          stroke="#2e2637"
          strokeWidth={3}
          strokeLinecap="round"
          opacity={0.9}
          fill="none"
        />

        {/* Bindi */}
        <circle cx={110} cy={62} r={1.9} fill="#b91c1c" />

        {/* Brows: softer elegant arches */}
        <path d="M88,77.5q8.5,-6 16.5,-0.5" stroke="#16111c" strokeWidth={2.2} strokeLinecap="round" fill="none" />
        <path d="M115.5,77q8.5,-5.5 16.5,0.5" stroke="#16111c" strokeWidth={2.2} strokeLinecap="round" fill="none" />

        {eyes(4.1)}

        {/* Lashes */}
        <path d="M87.5,84.5l-3.4,-2.6M132.5,84.5l3.4,-2.6" stroke="#16111c" strokeWidth={1.4} strokeLinecap="round" />

        {/* Nose */}
        <path d="M110,90.5q0.5,6 -2.6,8.4" stroke="#5f3719" strokeWidth={1.5} strokeLinecap="round" opacity={0.7} fill="none" />

        {restingSmile}
        {mouth}
      </>
    );
  } else {
    accent = "#8b5cf6";
    body = (
      <>
        <circle cx={110} cy={118} r={98} fill={`url(#bg-${uid})`} />

        {/* Torso: charcoal enterprise suit */}
        <path
          d="M28,240C28,178 62,156 110,156C158,156 192,178 192,240Z"
          fill={`url(#suit-${uid})`}
        />
        <path d="M96,156h28l-6,88h-16Z" fill="#f8fafc" opacity={0.96} />
        <path d="M110,168l-7,14 7,46 7,-46Z" fill={`url(#tie-${uid})`} />
        <path d="M80,162l30,22M140,162l-30,22" stroke="#020617" strokeWidth={5} strokeLinecap="round" opacity={0.85} />
        <path d="M150,206l16,-6 4,20 -16,5Z" fill="#f0c56b" opacity={0.95} />

        {/* Neck */}
        <path d="M97,120h26v19c0,9 -26,9 -26,0Z" fill="#5b351d" />
        <path d="M97,120h26v6H97Z" fill="#402212" opacity={0.8} />

        {/* Ears */}
        <ellipse cx={79} cy={88} rx={5.2} ry={8.4} fill="#5b351d" />
        <ellipse cx={141} cy={88} rx={5.2} ry={8.4} fill="#5b351d" />

        {/* Head */}
        <ellipse cx={110} cy={84} rx={31.5} ry={36} fill={`url(#skinScale-${uid})`} />
        <ellipse cx={101} cy={74} rx={16} ry={14} fill="#a9714b" opacity={0.28} />

        {/* Salt-and-pepper receding hair */}
        <path d="M79,76C75,36 96,22 116,23C140,24 148,40 143,72L136,58C124,48 96,50 86,60Z" fill="#a8b0bd" />
        <path d="M86,60C96,50 124,48 136,58L133,66C122,57 99,58 89,66Z" fill="#6b7280" opacity={0.7} />

        {/* Full salt-pepper beard */}
        <path
          d="M79,92C77,124 92,138 110,138C128,138 143,124 141,92C136,100 126,100 118,99C113,106 107,106 102,99C94,100 84,100 79,92Z"
          fill="#9aa3b1"
        />
        <path d="M96,104q14,7 28,0l-2,16q-12,7 -24,0Z" fill="#7c8594" opacity={0.55} />

        {/* Thick grey brows */}
        <path d="M87,79q9,-6 17,0" stroke="#6b7280" strokeWidth={3.4} strokeLinecap="round" fill="none" />
        <path d="M116,79q9,-6 17,0" stroke="#6b7280" strokeWidth={3.4} strokeLinecap="round" fill="none" />

        {eyes(4.8)}

        {/* Round executive glasses */}
        <g stroke="#0b1220" strokeWidth={2.1} fill="none" strokeLinejoin="round">
          <circle cx={96} cy={87.5} r={11} />
          <circle cx={124} cy={87.5} r={11} />
          <path d="M107,87.5h6" />
          <path d="M85,86l-7,-2M135,86l7,-2" />
        </g>

        {/* Nose */}
        <path d="M110,92q0.5,6.2 -2.8,8.6" stroke="#3d2312" strokeWidth={1.6} strokeLinecap="round" opacity={0.8} fill="none" />

        {/* Mouth sits on the beard — warm lip tone over grey */}
        <path
          d="M97,105.5q13,6 26,0"
          fill="none"
          stroke="#c08064"
          strokeWidth={2.1}
          strokeLinecap="round"
          opacity={0.9}
        />
        <motion.g
          style={{
            scaleY: jawOpen,
            transformBox: "fill-box",
            originX: "50%",
            originY: "12%",
          }}
        >
          <path
            d="M95,103.5q15,9 30,0q-2,12.5 -15,12.5q-13,0 -15,-12.5Z"
            fill="#31120c"
          />
          <path
            d="M95,103.5q15,9 30,0l-1.6,3.6q-13.4,7.4 -26.8,0Z"
            fill="#f8fafc"
            opacity={0.85}
          />
          <ellipse cx={110} cy={112.6} rx={6.4} ry={2.7} fill="#c4717c" />
        </motion.g>
      </>
    );
  }

  return (
    <motion.svg
      viewBox="0 0 220 240"
      role="img"
      aria-label={
        planId === "solo"
          ? "Illustrated portrait of Karthik, solo academy owner"
          : planId === "business"
          ? "Illustrated portrait of Ananya, multi-branch managing director"
          : "Illustrated portrait of Vikramaditya, enterprise CEO"
      }
      className={className}
      style={{ y: headBob, rotate: headTilt }}
    >
      <defs>
        <radialGradient id={`bg-${uid}`} cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.22" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`skinSolo-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b07a4a" />
          <stop offset="100%" stopColor="#7c4a26" />
        </linearGradient>
        <linearGradient id={`skinBiz-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a9714b" />
          <stop offset="100%" stopColor="#6e3b1f" />
        </linearGradient>
        <linearGradient id={`skinScale-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8a5632" />
          <stop offset="100%" stopColor="#4e2c15" />
        </linearGradient>
        <linearGradient id={`jacket-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="60%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#c2410c" />
        </linearGradient>
        <linearGradient id={`blazer-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f766e" />
          <stop offset="100%" stopColor="#134e4a" />
        </linearGradient>
        <linearGradient id={`suit-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1f2937" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id={`tie-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#991b1b" />
          <stop offset="100%" stopColor="#450a0a" />
        </linearGradient>
      </defs>
      {body}
    </motion.svg>
  );
}
