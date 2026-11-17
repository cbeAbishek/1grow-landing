'use client'

import React, { useState } from 'react'
import { motion, MotionValue, useTransform, useMotionValueEvent } from 'framer-motion'
import {
  N,
  SCALE_STEP,
  DIM_STEP,
  ENTER_DIST,
  CARD_BASE_COLORS,
} from './stackConfig'
import { PlatformCardData } from '@/content/platform'
import { ArrowUpRight } from 'lucide-react'
import { HeroArt } from './art/HeroArt'
import {
  SymbolCap,
  SymbolBox,
  SymbolPopper,
  SymbolCoin,
  SymbolBars,
  SymbolCrates,
} from '@/components/landing/hero/symbols/SymbolSet'

interface StackCardProps {
  card: PlatformCardData
  i: number
  s: MotionValue<number>
  stripH?: number
  cardH?: number
}

const clampVal = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v))

// Smootherstep: t³(6t² − 15t + 10) (§10.2)
const smootherstep = (t: number) => {
  const c = clampVal(t, 0, 1)
  return c * c * c * (c * (c * 6 - 15) + 10)
}

// Smoothstep: t²(3 − 2t) (§6.3)
const smoothstep = (min: number, max: number, x: number) => {
  const t = clampVal((x - min) / (max - min), 0, 1)
  return t * t * (3 - 2 * t)
}

function MiniSymbol({ id, size = 68 }: { id: string; size?: number }) {
  switch (id) {
    case 'training':
      return <SymbolCap size={size} className="drop-shadow-md" />
    case 'rental':
      return <SymbolBox size={size} className="drop-shadow-md" />
    case 'event':
      return <SymbolPopper size={size} className="drop-shadow-md" />
    case 'billing':
      return <SymbolCoin size={size} className="drop-shadow-md" />
    case 'inventory':
      return <SymbolCrates size={size} className="drop-shadow-md" />
    case 'analytics':
      return <SymbolBars size={size} className="drop-shadow-md" />
    default:
      return <SymbolCap size={size} />
  }
}

export function StackCard({
  card,
  i,
  s,
  stripH = 46,
}: StackCardProps) {
  const [isActive, setIsActive] = useState(i === 0)

  // Track active state with threshold (§7.7, §10.3: not per-frame React state)
  useMotionValueEvent(s, 'change', (val) => {
    const active = Math.abs(val - i) < 0.5
    if (active !== isActive) {
      setIsActive(active)
    }
  })

  // Entrance progress u for a given card k: u = clamp((s - (k - 1) - 0.14) / 0.72, 0, 1) (§10.2)
  const getCardEntrance = (v: number, k: number) => {
    if (k === 0) return 1
    const rawU = (v - (k - 1) - 0.14) / 0.72
    return smootherstep(rawU)
  }

  // Continuous depth d_i: sum of entering progress of all later cards j > i (§10.2)
  const depth = useTransform(s, (v) => {
    let sum = 0
    for (let j = i + 1; j < N; j++) {
      sum += getCardEntrance(v, j)
    }
    return sum
  })

  // Y position (§6.2, §10.2):
  // - Future card (v < i - 1): parked offscreen below at ENTER_DIST
  // - Entering card (v in [i - 1, i]): enters from below (ENTER_DIST -> 0)
  // - Active or buried card (v >= i): y = -stripH * depth
  const y = useTransform(s, (v) => {
    if (i > 0 && v < i) {
      const u = getCardEntrance(v, i)
      return (1 - u) * ENTER_DIST
    }
    // For active/buried card:
    let d = 0
    for (let j = i + 1; j < N; j++) {
      d += getCardEntrance(v, j)
    }
    return -stripH * d
  })

  // Scale: 1 - 0.0487 * d with transform-origin: 50% 0 (§6.2)
  const scale = useTransform(depth, (d) => 1 - SCALE_STEP * d)

  // Dim overlay: 0.04 * d (an opaque navy layer inside the card clip, §6.2)
  const dim = useTransform(depth, (d) => DIM_STEP * d)

  // Strip band opacity: smoothstep(0.25, 0.85, d) (§6.3)
  const stripOpacity = useTransform(depth, (d) => smoothstep(0.25, 0.85, d))

  // Active header content opacity: 1 - smoothstep(0.05, 0.55, d) (§6.3)
  const activeHeaderOpacity = useTransform(depth, (d) =>
    1 - smoothstep(0.05, 0.55, d)
  )

  // Base background color for 100% opaque layer (§9)
  const baseBg = CARD_BASE_COLORS[card.id] || '#032d60'

  return (
    <motion.article
      id={`platform-${card.slug}`}
      data-card-index={i}
      data-state={isActive ? 'active' : 'idle'}
      aria-hidden={!isActive}
      inert={!isActive}
      style={{
        top: `${5 * stripH}px`, // Reserve 5 * stripH headroom inside sticky stage (§6.2)
        height: 'var(--card-h, clamp(500px, 56dvh, 660px))',
        y,
        scale,
        opacity: 1, // D1 / §9: Every card is 100% opaque from its first visible pixel
        zIndex: i + 1,
        backgroundColor: baseBg,
        backgroundImage: card.gradient,
        transformOrigin: '50% 0%',
        pointerEvents: isActive ? 'auto' : 'none',
        isolation: 'isolate',
        contain: 'layout paint style',
      }}
      className="stack-card absolute left-0 right-0 overflow-hidden rounded-[36px] text-white border border-white/20 select-none will-change-transform"
    >
      {/* 1px Top Edge Highlight separating layers (§6.2) */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-white/30 z-30"
        aria-hidden="true"
      />

      {/* Pre-rendered Pseudo-element Shadow (§6.2, §10.3) */}
      <div
        className="pointer-events-none absolute -inset-1 rounded-[38px] shadow-[0_32px_64px_-24px_rgba(0,16,57,0.55),0_12px_24px_-12px_rgba(0,0,0,0.25)] -z-10"
        aria-hidden="true"
      />

      {/* Dim Overlay for Buried Cards (§6.2, §9) */}
      <motion.div
        style={{ opacity: dim }}
        className="pointer-events-none absolute inset-0 bg-[#001039] z-20"
        aria-hidden="true"
      />

      {/* =========================================================================
          Salesforce-Style Header Strip Band (Top 46px) (§6.3)
          Visible when card is buried (depth >= 1), stacked like steps above active card
         ========================================================================= */}
      <motion.div
        style={{
          opacity: stripOpacity,
          height: `${stripH}px`,
        }}
        aria-hidden={isActive}
        className="absolute top-0 left-0 right-0 z-25 grid grid-cols-[1fr_auto] items-center px-7 gap-4 pointer-events-none"
      >
        {/* Left: One-line headline */}
        <div className="font-display font-semibold text-[17px] text-white truncate whitespace-nowrap">
          {card.headline}
        </div>

        {/* Right: Product name + 30px glossy mini symbol badge */}
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="text-[15px] font-semibold text-white/90">
            {card.title} Suite
          </span>
          <div className="relative size-[30px] grid place-items-center shrink-0">
            <MiniSymbol id={card.id} size={30} />
          </div>
        </div>
      </motion.div>

      {/* =========================================================================
          Active Card Interior Content (§7.1, §7.2)
          Top-aligned, consistent vertical rhythm, no dead space between tag & headline
         ========================================================================= */}
      <motion.div
        style={{
          opacity: activeHeaderOpacity,
          padding: 'clamp(32px, 4.2vw, 64px)',
          minHeight: 'clamp(500px, 56dvh, 660px)',
        }}
        aria-hidden={!isActive}
        className="relative z-10 flex flex-col h-full pt-[70px]"
      >
        {/* Active Header Row (§7.2: starts ≈ 70px from card top) */}
        <div className="flex items-center justify-between gap-4 mb-4">
          {/* Top-Left Tag Pill */}
          <div
            data-element="tag-pill"
            className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-[13px] font-bold uppercase tracking-[0.06em] text-white border border-white/25"
          >
            <span>{card.title.toUpperCase()}</span>
            <span className="size-1 rounded-full bg-white/70" />
            <span className="text-white/80">MODULE 0{i + 1}</span>
          </div>

          {/* Top-Right Product Label beside 64–72px Glossy Badge */}
          <div className="flex items-center gap-3.5 text-right">
            <div data-element="product-label" className="hidden sm:block text-right">
              <div className="text-[17px] font-semibold text-white tracking-tight leading-tight">
                1Grow Platform
              </div>
              <div className="text-[15px] text-white/80 font-normal leading-tight mt-0.5">
                {card.title} Suite
              </div>
            </div>
            {/* 68px Glossy Clay Badge */}
            <div data-element="badge" className="relative size-[68px] grid place-items-center shrink-0">
              <MiniSymbol id={card.id} size={68} />
            </div>
          </div>
        </div>

        {/* Main 2-Column Grid (§7.2: Left Column 1fr, Right Art Zone 0.95fr, gap 32px) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.95fr] gap-8 items-start flex-1">
          {/* Left Column: Top-aligned, vertical rhythm (Tag -> 24px -> Headline -> 20px -> Body -> 28px -> CTA) */}
          <div className="flex flex-col items-start justify-start">
            <h3
              className="font-display font-bold text-white tracking-tight text-balance"
              style={{
                fontSize: 'clamp(2rem, 1.2rem + 2vw, 3rem)',
                lineHeight: 1.1,
              }}
            >
              {card.headline}
            </h3>

            <p
              className="mt-5 text-white/90 leading-[27px] max-w-[46ch]"
              style={{
                fontSize: '18px',
              }}
            >
              {card.description}
            </p>

            {/* White Pill CTA (Single Icon, Hover Lift, Diagonal Shine) */}
            <div className="mt-7">
              <a
                href={card.ctaHref}
                className="group relative inline-flex items-center justify-center gap-2 h-[56px] px-6 rounded-full bg-white text-[#032d60] font-semibold text-[18px] shadow-md hover:bg-white/95 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.985] transition-all overflow-hidden"
              >
                <span>{card.ctaText}</span>
                <ArrowUpRight className="size-[18px] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />

                {/* Diagonal Shine Band on Hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"
                />
              </a>
            </div>
          </div>

          {/* Right Column: Hero Art Zone (§7.3, §7.4) */}
          <div className="w-full flex items-center justify-center">
            <HeroArt moduleId={card.id} isActive={isActive} />
          </div>
        </div>
      </motion.div>
    </motion.article>
  )
}
