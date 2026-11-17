'use client'

import React, { useRef, useId } from 'react'
import {
  motion,
  MotionValue,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import {
  UserPlus,
  Store,
  Users,
  Check,
} from 'lucide-react'
import {
  TL,
  DESKTOP_PLACEMENTS,
  STEP_COLOURWAYS,
} from './stepsConfig'
import { StepItem } from '@/content/landing'
import { cn } from '@/lib/utils'

// Step 3 Icon: Database with down-arrow
function DatabaseDownIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v6c0 1.66 4.03 3 9 3 1.3 0 2.5-.09 3.6-.25" />
      <path d="M3 12v6c0 1.66 4.03 3 9 3 .9 0 1.8-.05 2.6-.14" />
      <path d="M19 12v7" />
      <path d="M16 16l3 3 3-3" />
    </svg>
  )
}

// Step 5 Icon: Bar chart with rising arrow
function GrowthChartIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 3v18h18" />
      <path d="M7 16v-4" />
      <path d="M11 16v-7" />
      <path d="M15 16v-9" />
      <path d="M19 16v-12" />
      <path d="M7 11l4-3 4 2 4-5" />
      <path d="M16 5h3v3" />
    </svg>
  )
}

// Step Icons mapping matching §6.2
const ICONS = [UserPlus, Store, DatabaseDownIcon, Users, GrowthChartIcon]

// Decor burst: 3 short rounded strokes (3-4px, 14-22px long, fanned) (§7.3)
function DecorBurst({
  position,
  color,
  active,
}: {
  position: 'top-left' | 'bottom-right'
  color: string
  active: boolean
}) {
  const isTL = position === 'top-left'
  return (
    <div
      aria-hidden="true"
      className={cn(
        'absolute pointer-events-none z-20 transition-all duration-300',
        isTL
          ? '-top-5 -left-5 sm:-top-7 sm:-left-7'
          : '-bottom-5 -right-5 sm:-bottom-7 sm:-right-7',
      )}
    >
      <svg
        width="38"
        height="38"
        viewBox="0 0 38 38"
        fill="none"
        className={cn(
          'transition-transform duration-350 ease-out',
          active ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 rotate-12',
          !isTL && 'rotate-180',
        )}
      >
        <line
          x1="6"
          y1="32"
          x2="2"
          y2="36"
          stroke={color}
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <line
          x1="14"
          y1="24"
          x2="26"
          y2="12"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="28"
          y1="10"
          x2="34"
          y2="4"
          stroke={color}
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

export interface StepCardProps {
  step: StepItem
  index: number
  progress: MotionValue<number>
  isDesktop: boolean
}

export function StepCard({
  step,
  index,
  progress,
  isDesktop,
}: StepCardProps) {
  const shouldReduceMotion = useReducedMotion()
  const cw = STEP_COLOURWAYS[index]
  const placement = DESKTOP_PLACEMENTS[index]
  const IconComponent = ICONS[index]

  // Animation values derived purely from progress MotionValue without React state
  const actStart = TL.act[index] - TL.actRamp * 0.66
  const actEnd = TL.act[index] + TL.actRamp * 0.34
  const act = useTransform(progress, [actStart, actEnd], [0, 1], { clamp: true })

  const nextActStart = index < 4 ? TL.act[index + 1] - TL.actRamp * 0.66 : 1.0
  const nextActEnd = index < 4 ? TL.act[index + 1] + TL.actRamp * 0.34 : 1.0
  const nextAct = useTransform(
    progress,
    [nextActStart, nextActEnd],
    index < 4 ? [0, 1] : [0, 0],
    { clamp: true },
  )

  // emph: 1 only while this card is the active milestone
  const emph = useTransform([act, nextAct], ([a, n]: number[]) => a * (1 - n))

  // Outer transforms for desktop scrub
  const yScrub = useTransform(
    [act, emph],
    ([a, e]: number[]) => -4 * (a - e) - 12 * e,
  )
  const scaleScrub = useTransform(
    [act, emph],
    ([a, e]: number[]) => 0.97 + 0.03 * a + 0.03 * e,
  )
  const rotZScrub = useTransform(
    [act, emph],
    ([a, e]: number[]) => placement.rotateZ * (1 - 0.4 * a - 0.25 * e),
  )
  const opacityScrub = useTransform(act, (a: number) => 0.78 + 0.22 * a)

  // Tone ring glow for emphasis
  const glowRingOpacity = useTransform(emph, (e: number) => e)

  // Burst decor visibility trigger
  const [burstActive, setBurstActive] = React.useState(false)
  React.useEffect(() => {
    return act.on('change', (v) => {
      if (v > 0.5) setBurstActive(true)
      else setBurstActive(false)
    })
  }, [act])

  // Burst placement configuration
  const hasBurst = index === 0 || index === 3 || index === 4
  const burstPos = index === 0 ? 'top-left' : 'bottom-right'

  // Unique gradient IDs
  const idPrefix = useId().replace(/[^a-zA-Z0-9-_]/g, '')
  const cardGradId = `card-grad-${idPrefix}`
  const tileGradId = `tile-grad-${idPrefix}`

  return (
    <motion.li
      data-step-card={index + 1}
      className={cn(
        'steps-card-outer relative group focus-within:z-30',
        isDesktop ? 'absolute' : 'relative w-full max-w-[390px] mx-auto',
      )}
      style={{
        width: isDesktop ? 'var(--step-card-w, clamp(256px, 20.5%, 292px))' : '100%',
        height: isDesktop ? 'var(--step-card-h, clamp(380px, 29vw, 420px))' : 'auto',
        left: isDesktop ? `${placement.leftPercent}%` : undefined,
        top: isDesktop ? `calc(${placement.topH} * var(--step-card-h, 400px))` : undefined,
        y: shouldReduceMotion ? 0 : isDesktop ? yScrub : 0,
        scale: shouldReduceMotion ? 1 : isDesktop ? scaleScrub : 1,
        opacity: shouldReduceMotion ? 1 : isDesktop ? opacityScrub : 1,
        zIndex: 10 + index,
      }}
    >
      {/* Decor Bursts (§7.3) */}
      {hasBurst && (
        <DecorBurst
          position={burstPos}
          color={cw.burstColor}
          active={shouldReduceMotion || burstActive}
        />
      )}

      {/* Tone Glow Ring during emphasis (§9.3) */}
      <motion.div
        aria-hidden="true"
        className="absolute -inset-1.5 rounded-[36px] pointer-events-none transition-opacity duration-300"
        style={{
          boxShadow: `0 0 0 6px rgba(${cw.toneRgb}, 0.22)`,
          opacity: shouldReduceMotion ? 0 : glowRingOpacity,
        }}
      />

      {/* Inner Card: 3D perspective skin and hover transitions (§6.1, §6.2, §9.3) */}
      <div
        className={cn(
          'steps-card-inner relative flex flex-col justify-between w-full h-full rounded-[32px] p-6 sm:p-7 select-none',
          'backdrop-blur-[12px] border border-white/80 dark:border-white/10 transition-all duration-300',
          'hover:-translate-y-1.5 hover:shadow-2xl active:scale-[0.985]',
        )}
        style={{
          transform: isDesktop && !shouldReduceMotion
            ? `perspective(1200px) rotateY(${placement.rotateY}deg) rotateZ(${placement.rotateZ}deg)`
            : !isDesktop && !shouldReduceMotion
            ? `rotate(${index % 2 === 0 ? '-1.8deg' : '1.8deg'})`
            : undefined,
          background: `linear-gradient(145deg, ${cw.cardGrad[0]}, ${cw.cardGrad[1]})`,
          boxShadow: `0 30px 50px -24px rgba(${cw.toneRgb}, 0.38), 0 8px 16px -8px rgba(${cw.toneRgb}, 0.2), inset 0 -10px 24px -8px rgba(${cw.toneRgb}, 0.28)`,
        }}
      >
        {/* Top-Left Gloss Highlight (§6.2) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-[32px] pointer-events-none overflow-hidden"
          style={{
            background:
              'radial-gradient(120% 70% at 0% 0%, rgba(255, 255, 255, 0.75), transparent 55%)',
          }}
        />

        {/* Top Row: Icon Tile + Number Badge */}
        <div className="relative z-10 flex items-center justify-between">
          {/* Icon Tile: 64px rounded square (radius 20px), tone gradient, inner highlight */}
          <div
            className="grid size-14 sm:size-16 place-items-center rounded-[20px] shadow-sm transition-transform duration-300 group-hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${cw.tileGrad[0]}, ${cw.tileGrad[1]})`,
              border: '1px solid rgba(255, 255, 255, 0.7)',
            }}
          >
            <IconComponent
              className="size-7 sm:size-8"
              style={{ color: cw.iconColor }}
            />
          </div>

          {/* Number Badge: 40px circle, top-right, tone color, white 18px/700 numeral */}
          <div
            className="grid size-10 place-items-center rounded-full text-white font-display text-[17px] font-bold shadow-md transition-all duration-300 group-hover:scale-110"
            style={{
              backgroundColor: cw.badgeBg,
              boxShadow: `0 4px 12px rgba(${cw.toneRgb}, 0.4)`,
            }}
          >
            {step.number}
          </div>
        </div>

        {/* Content Body: Title + Description */}
        <div className="relative z-10 my-4 sm:my-5 flex-1 flex flex-col justify-start">
          <h3 className="font-display font-bold text-[21px] sm:text-[22px] leading-[1.25] text-[#1b1630] dark:text-white tracking-tight text-balance">
            {step.title}
          </h3>
          <p className="mt-2.5 text-[14.5px] sm:text-[15.5px] leading-[1.48] text-[#4b4560] dark:text-zinc-300 font-normal">
            {step.description}
          </p>
        </div>

        {/* Highlight Chip: compact glass pill at the bottom (§6.2) */}
        <div className="relative z-10 pt-3 border-t border-black/[0.06] dark:border-white/[0.08]">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] sm:text-[12.5px] font-semibold transition-colors duration-300 backdrop-blur-md"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.75)',
              color: cw.iconColor,
              border: `1px solid rgba(${cw.toneRgb}, 0.25)`,
            }}
          >
            <span
              className="grid size-4 place-items-center rounded-full text-white"
              style={{ backgroundColor: cw.badgeBg }}
            >
              <Check className="size-2.5 stroke-[3.5]" />
            </span>
            <span className="line-clamp-2 leading-tight">{step.visual}</span>
          </div>
        </div>
      </div>
    </motion.li>
  )
}
