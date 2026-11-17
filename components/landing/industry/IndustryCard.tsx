'use client'

import React from 'react'
import Link from 'next/link'
import {
  Package,
  GraduationCap,
  PartyPopper,
  Heart,
  Music,
  Waves,
  Swords,
  Sparkles,
  CalendarHeart,
  Camera,
  ArrowRight,
} from 'lucide-react'
import { IndustryItem } from '@/content/landing'
import {
  INDUSTRY_CONFIGS,
  IndustryIllustration,
} from './IndustryIllustrations'
import { SymbolSparkle } from '@/components/landing/hero/symbols/SymbolSet'
import { cn } from '@/lib/utils'

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Package,
  GraduationCap,
  PartyPopper,
  Heart,
  Music,
  Waves,
  Swords,
  Sparkles,
  CalendarHeart,
  Camera,
}

// Three short white burst strokes near top-right with varied rotation per card (§5.2.6)
function BurstStrokes({ rotation = 0, className }: { rotation?: number; className?: string }) {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 44 44"
      fill="none"
      className={className}
      style={{ transform: `rotate(${rotation}deg)` }}
      aria-hidden="true"
    >
      <path
        d="M8 36L4 40"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M16 28L30 14"
        stroke="rgba(255,255,255,0.95)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M34 10L40 4"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

interface IndustryCardProps {
  industry: IndustryItem
  index: number
  className?: string
  style?: React.CSSProperties
  isInteractive?: boolean
}

export function IndustryCard({
  industry,
  index,
  className,
  style,
  isInteractive = true,
}: IndustryCardProps) {
  const cfg = INDUSTRY_CONFIGS[industry.id] || INDUSTRY_CONFIGS['rental-business']
  const IconComponent = ICON_MAP[cfg.iconName] || Package

  // Varied rotations and sparkle positions per card (§5.2.6)
  const burstRotation = (index * 37) % 360
  const sparkleTop = 16 + ((index * 13) % 20)
  const sparkleRight = 56 + ((index * 19) % 24)

  return (
    <article
      aria-label={`1Grow solution for ${industry.name}`}
      className={cn('stage-card-outer select-none h-full w-full', className)}
      style={style}
    >
      {/*
        Inner Interactive Card Element (§5.2, §7.4):
        Scrub transforms stay on outer element; inner handles hover, press and elevation.
        No static perspective/skew tilt (cards read straight and clean).
      */}
      <div
        className={cn(
          'group relative w-full h-full rounded-[26px] overflow-hidden p-5 sm:p-5.5 sm:pb-5.5 flex flex-col justify-between transition-all duration-300',
          'border-[1.5px] border-white/55 dark:border-white/30',
          isInteractive && 'hover:-translate-y-2 active:scale-[0.985] cursor-pointer'
        )}
        style={{
          background: cfg.gradient,
          boxShadow: `0 24px 48px -20px ${cfg.shadowColor}`,
        }}
      >
        {/* Gloss Overlay (§5.2) */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[26px]"
          style={{
            background:
              'radial-gradient(120% 80% at 10% 0%, rgba(255,255,255,0.35) 0%, transparent 55%)',
          }}
          aria-hidden="true"
        />

        {/* Inner Glow Overlay (§5.2) */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[26px] shadow-[inset_0_-24px_40px_rgba(255,255,255,0.16)]"
          aria-hidden="true"
        />

        {/* Subtle Text-Side Scrim to guarantee ≥ 4.5:1 text contrast (§5.2) */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[26px]"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.16) 0%, rgba(0,0,0,0.06) 45%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        {/* Decor: Burst Strokes & Sparkle (§5.2.6) */}
        <div className="absolute top-3.5 right-3.5 pointer-events-none transition-transform duration-300 group-hover:scale-110">
          <BurstStrokes rotation={burstRotation} />
        </div>
        <div
          className="absolute pointer-events-none text-white/80 transition-transform duration-300 group-hover:scale-125"
          style={{ top: `${sparkleTop}px`, right: `${sparkleRight}px` }}
          aria-hidden="true"
        >
          <SymbolSparkle size={15} />
        </div>

        {/* Top Content Block */}
        <div className="relative z-10 space-y-2 sm:space-y-2.5 max-w-[88%]">
          {/* 1. White Circle Icon (§5.2.1) */}
          <div className="size-11 sm:size-12 rounded-full bg-white shadow-md flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0">
            <span style={{ color: cfg.accentColor }}>
              <IconComponent className="size-5 sm:size-[22px]" />
            </span>
          </div>

          {/* 2. Industry Name (§5.2.2) */}
          <h3 className="font-display font-bold text-[20px] sm:text-[22px] leading-[1.2] text-white tracking-tight drop-shadow-xs">
            {industry.name}
          </h3>

          {/* 3. Description in full without line clamp (§5.2.3) */}
          <p className="text-[13px] sm:text-[13.5px] leading-[18px] sm:leading-[19px] text-white/95 font-medium drop-shadow-xs">
            {industry.description}
          </p>
        </div>

        {/* Bottom Area: White Pill CTA and 3D Clay Illustration (§5.2.4, §5.2.5) */}
        <div className="relative z-10 pt-2.5 flex items-end justify-between mt-auto">
          {/* 4. White Pill CTA with stretched ::after so whole card is clickable */}
          <Link
            href={industry.href}
            className={cn(
              'relative inline-flex items-center gap-1.5 h-9 sm:h-9.5 px-3.5 sm:px-4 rounded-full bg-white font-bold text-[12.5px] sm:text-[13px] shadow-md',
              'transition-all duration-200 group-hover:shadow-lg group-hover:-translate-y-0.5',
              'after:absolute after:inset-0 after:content-[""] after:rounded-full after:z-20'
            )}
            style={{ color: cfg.accentColor }}
          >
            <span>Learn more</span>
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>

          {/* 5. Soft 3D Clay Illustration (bottom-right, ~44% card width, bleeding) */}
          <div
            className="absolute -right-2.5 -bottom-2.5 sm:-right-3 sm:-bottom-3 w-[44%] sm:w-[45%] pointer-events-none transition-all duration-300 group-hover:-translate-y-1.5 group-hover:rotate-1"
            aria-hidden="true"
          >
            <IndustryIllustration
              type={cfg.illustrationType}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </article>
  )
}
