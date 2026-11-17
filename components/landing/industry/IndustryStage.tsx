'use client'

import React, { useRef, useState, useEffect, useMemo } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  MotionValue,
} from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { IndustryItem } from '@/content/landing'
import { IndustryCard } from './IndustryCard'
import {
  CFG,
  clamp,
  lerp,
  easeInOutCubic,
  easeOutCubic,
} from './stageConfig'
import { SymbolSparkle } from '@/components/landing/hero/symbols/SymbolSet'
import { cn } from '@/lib/utils'

interface IndustryStageProps {
  industries: IndustryItem[]
  caption?: string
}

export function IndustryStage({
  industries,
  caption = 'Pick your industry below to see how 1Grow helps.',
}: IndustryStageProps) {
  const stageOuterRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  // Responsive stage dimensions via ResizeObserver
  const [dims, setDims] = useState<{ sw: number; sh: number; isDesktop: boolean }>({
    sw: 1440,
    sh: 900,
    isDesktop: true,
  })

  useEffect(() => {
    const update = () => {
      if (stickyRef.current) {
        const rect = stickyRef.current.getBoundingClientRect()
        setDims({
          sw: rect.width || window.innerWidth,
          sh: rect.height || window.innerHeight,
          isDesktop: window.innerWidth >= 1024,
        })
      } else {
        setDims({
          sw: window.innerWidth,
          sh: window.innerHeight,
          isDesktop: window.innerWidth >= 1024,
        })
      }
    }

    update()
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [])

  const n = industries.length
  const sw = dims.sw
  const sh = dims.sh

  // Equal-Size Card Dimensions (§5.2, §7.2) - Compact, balanced internal card proportions
  const cardW = clamp(sw * 0.175, 240, 275)
  const cardH = clamp(sh * 0.39, 340, 370)

  // Card slot positions: rowX_i = ROW_PAD + CW/2 + i*(CW+GAP) - sw/2
  const { rowPositions, totalRowW } = useMemo(() => {
    const positions: { rowX: number; w: number; h: number }[] = []
    let currentX = CFG.ROW_PAD

    for (let i = 0; i < n; i++) {
      const centerX = currentX + cardW / 2
      positions.push({
        rowX: centerX - sw / 2,
        w: cardW,
        h: cardH,
      })
      currentX += cardW + CFG.GAP
    }

    const totalW = currentX - CFG.GAP + CFG.ROW_PAD
    return { rowPositions: positions, totalRowW: totalW }
  }, [n, cardW, cardH, sw])

  // Travel geometry
  const travelDistance = Math.max(0, totalRowW - sw)
  const needsTravel = travelDistance > 0 && n >= 3
  const scrollVh = needsTravel ? CFG.SCROLL_VH_TRAVEL : CFG.SCROLL_VH_FIT
  const spreadEnd = needsTravel ? CFG.SPREAD_END_TRAVEL : CFG.SPREAD_END_FIT

  // Hero card index for pile pose (Rental Business index or center card)
  const heroIndex = useMemo(() => {
    const rentalIdx = industries.findIndex((ind) => ind.id === 'rental-business')
    if (rentalIdx !== -1) return rentalIdx
    return clamp(Math.floor(n / 2), 0, n - 1)
  }, [industries, n])

  // Single Scroll Progress MotionValue p in [0, 1] (§7.1)
  const { scrollYProgress: p } = useScroll({
    target: stageOuterRef,
    offset: ['start start', 'end end'],
  })

  // 1. Expand Phase Transforms (§7.2.1, §7.3)
  const expandT = useTransform(p, (val) => {
    return easeInOutCubic(clamp((val - CFG.EXPAND[0]) / (CFG.EXPAND[1] - CFG.EXPAND[0]), 0, 1))
  })

  const panelInsetX = useTransform(expandT, (t) => {
    const startW = Math.min(CFG.PANEL_START_MAX_W, sw - 48)
    const endW = sw - 2 * CFG.PANEL_END_INSET
    const currentW = lerp(startW, endW, t)
    return Math.max(CFG.PANEL_END_INSET, (sw - currentW) / 2)
  })

  // Panel End Height: PANEL_END_H = min(sh - 48, cardH + 210) (§7.2.1)
  const panelInsetY = useTransform(expandT, (t) => {
    const startH = Math.min(CFG.PANEL_START_MAX_H, sh * CFG.PANEL_START_H_VH)
    const endH = Math.min(sh - 48, cardH + 210)
    const currentH = lerp(startH, endH, t)
    return Math.max(24, (sh - currentH) / 2)
  })

  const panelRadius = useTransform(expandT, (t) => {
    return lerp(CFG.PANEL_START_RADIUS, CFG.PANEL_END_RADIUS, t)
  })

  // 2. Smooth Stage Ending Dissolve for p in [0.90, 1.00] (§7.3)
  const panelOpacity = useTransform(p, (val) => {
    if (val < 0.90) return 1
    const t = clamp((val - 0.90) / 0.10, 0, 1)
    return 1 - easeInOutCubic(t)
  })

  const captionTop = useTransform(panelInsetY, (top) => top + 36)
  const captionOpacity = useTransform(p, (val) => {
    if (val < 0.85) return 1
    const t = clamp((val - 0.85) / 0.10, 0, 1)
    return 1 - easeInOutCubic(t)
  })

  // Warm Glow rising layer
  const glowY = useTransform(p, [0, 0.5], ['18%', '0%'])
  const glowOpacity = useTransform(p, [0, 0.4], [0.55, 1])

  // Travel Track Translation X (§7.5)
  const trackX = useTransform(p, (val) => {
    if (!needsTravel) return 0
    const progress = clamp((val - CFG.TRAVEL[0]) / (CFG.TRAVEL[1] - CFG.TRAVEL[0]), 0, 1)
    return -travelDistance * easeInOutCubic(progress)
  })

  // Chevron scroll hint: visible ONLY while p < 0.08, fully hidden afterwards (§7.2.4)
  const chevronOpacity = useTransform(p, [0, 0.08], [1, 0])
  const chevronVisibility = useTransform(p, (val) => (val >= 0.08 ? 'hidden' : 'visible'))

  // Keyboard navigation scrollToCard (§7.7)
  const scrollToCard = (idx: number) => {
    if (!stageOuterRef.current || !needsTravel || !rowPositions[idx]) return
    const targetTrackX = -rowPositions[idx].rowX
    const normalized = clamp(targetTrackX / -travelDistance, 0, 1)
    const targetP = CFG.TRAVEL[0] + normalized * (CFG.TRAVEL[1] - CFG.TRAVEL[0])

    const rect = stageOuterRef.current.getBoundingClientRect()
    const outerTop = window.scrollY + rect.top
    const outerH = (1 + scrollVh / 100) * sh
    const targetScrollY = outerTop + targetP * (outerH - sh)

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    })
  }

  // --- Fallback 1: Reduced Motion / No-JS (Static Uniform Grid §5.4) ---
  if (prefersReduced) {
    return (
      <div className="w-full max-w-[1380px] mx-auto px-6 py-12">
        <p className="font-display text-center text-lg sm:text-2xl font-semibold text-[var(--ind-ink,#1a1820)] dark:text-white mb-10">
          {caption}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6 relative z-10">
          {industries.map((ind, idx) => (
            <div key={ind.id} className="w-full min-h-[330px] h-[350px]">
              <IndustryCard industry={ind} index={idx} isInteractive={true} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // --- Fallback 2: Mobile / Tablet (< 1024px Non-Pinned Scroll-Snap Row §5.4) ---
  if (!dims.isDesktop) {
    return (
      <div className="w-full pt-4 pb-12 overflow-hidden">
        <p className="font-display text-center text-base sm:text-lg font-semibold text-[var(--ind-ink,#1a1820)] dark:text-white mb-6 px-6">
          {caption}
        </p>
        <div className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory px-6 pb-6 no-scrollbar">
          {industries.map((ind, idx) => (
            <div
              key={ind.id}
              className="shrink-0 snap-center w-[min(74vw,250px)] min-h-[330px] h-[clamp(330px,46dvh,365px)]"
            >
              <IndustryCard industry={ind} index={idx} isInteractive={true} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // --- Desktop Pinned Scrub Stage (>= 1024px, motion allowed §5-§9) ---
  return (
    <div
      ref={stageOuterRef}
      className="stage-outer relative w-full pb-16 sm:pb-20"
      style={{
        height: `calc(100dvh + ${scrollVh}dvh)`,
      }}
    >
      <div
        ref={stickyRef}
        className="stage-sticky sticky top-0 h-[100dvh] w-full overflow-x-clip select-none flex items-center justify-center pointer-events-auto"
      >
        {/* Animated Gradient Panel Box with End Dissolve (§6.1, §7.3) */}
        <motion.div
          className="stage-panel absolute overflow-hidden shadow-[0_32px_64px_-16px_rgba(40,20,80,0.18)] border-[1.5px] border-white/80 dark:border-white/10"
          style={{
            left: panelInsetX,
            right: panelInsetX,
            top: panelInsetY,
            bottom: panelInsetY,
            borderRadius: panelRadius,
            opacity: panelOpacity,
            background: 'var(--stage-grad-pastel, var(--stage-grad))',
          }}
          aria-hidden="true"
        >
          {/* Subtle Dot Grid */}
          <div
            className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#4a3070_1.5px,transparent_1.5px)] [background-size:24px_24px]"
            aria-hidden="true"
          />

          {/* Warm Glow Rising Layer (§6.1) */}
          <motion.div
            style={{
              y: glowY,
              opacity: glowOpacity,
            }}
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-radial from-orange-400/30 via-rose-300/15 to-transparent blur-3xl"
            aria-hidden="true"
          />

          {/* Sparkles Placed Asymmetrically with Parallax */}
          <div className="absolute top-8 left-10 opacity-70 pointer-events-none text-orange-400/70">
            <SymbolSparkle size={48} />
          </div>
          <div className="absolute top-12 right-14 opacity-60 pointer-events-none text-indigo-400/60">
            <SymbolSparkle size={36} />
          </div>
          <div className="absolute bottom-16 left-16 opacity-50 pointer-events-none text-amber-500/60">
            <SymbolSparkle size={32} />
          </div>
          <div className="absolute bottom-12 right-20 opacity-75 pointer-events-none text-orange-500/70">
            <SymbolSparkle size={44} />
          </div>
        </motion.div>

        {/* Section Caption Centred Near Top Inside Panel (§6.2, §7.3) */}
        <motion.p
          style={{
            top: captionTop,
            opacity: captionOpacity,
          }}
          className="stage-caption absolute z-20 font-display text-center text-[clamp(1.25rem,0.9rem+1.2vw,1.75rem)] font-semibold text-[var(--ind-ink,#1a1820)] dark:text-white px-6 pointer-events-none max-w-[800px]"
        >
          {caption}
        </motion.p>

        {/*
          Cards Track: Centered vertically + 24px relative to panel center (§7.2.2)
          Outer elements handle scrub motion; cards stay fully visible during panel dissolve (§7.3)
        */}
        <div
          className="stage-track absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ transform: 'translateY(24px)' }}
        >
          <ul className="relative w-full h-full list-none m-0 p-0 flex items-center justify-center">
            {industries.map((ind, i) => {
              const pos = rowPositions[i] || { rowX: 0, w: cardW, h: cardH }
              return (
                <StageCardItem
                  key={ind.id}
                  industry={ind}
                  i={i}
                  n={n}
                  w={pos.w}
                  h={pos.h}
                  rowX_i={pos.rowX}
                  heroIndex={heroIndex}
                  p={p}
                  spreadEnd={spreadEnd}
                  trackX={trackX}
                  onFocus={() => scrollToCard(i)}
                />
              )
            })}
          </ul>
        </div>

        {/* Scroll Hint Chevron (Hidden when p >= 0.08 §7.2.4) */}
        <motion.div
          style={{
            opacity: chevronOpacity,
            visibility: chevronVisibility,
          }}
          className="absolute bottom-6 z-20 flex flex-col items-center pointer-events-none text-[var(--ind-ink,#1a1820)]/60 dark:text-white/60"
          aria-hidden="true"
        >
          <span className="text-[11px] font-bold tracking-widest uppercase mb-1">
            Scroll to explore
          </span>
          <ChevronDown className="size-5 animate-bounce" />
        </motion.div>
      </div>
    </div>
  )
}

interface StageCardItemProps {
  industry: IndustryItem
  i: number
  n: number
  w: number
  h: number
  rowX_i: number
  heroIndex: number
  p: MotionValue<number>
  spreadEnd: number
  trackX: MotionValue<number>
  onFocus: () => void
}

function StageCardItem({
  industry,
  i,
  n,
  w,
  h,
  rowX_i,
  heroIndex,
  p,
  spreadEnd,
  trackX,
  onFocus,
}: StageCardItemProps) {
  const d = Math.abs(i - heroIndex)
  const maxD = Math.max(heroIndex, n - 1 - heroIndex)

  // Pile pose values (§7.4 & §6.2)
  const depth = Math.min(d, CFG.PILE_VISIBLE)
  const pileY = -depth * CFG.PILE_DY
  const pileRot = (i < heroIndex ? -1 : 1) * depth * CFG.PILE_ROT
  const pileScale = 1 - depth * CFG.PILE_SCALE
  const tilt_i = (i % 2 === 0 ? -1 : 1) * CFG.ROW_TILT

  // Spread progress sp_i with stagger delay (§7.4)
  const delay_i = d * CFG.SPREAD_STAGGER
  const maxDelay = maxD * CFG.SPREAD_STAGGER

  // Motion transforms
  const cardX = useTransform([p, trackX], ([val, tx]) => {
    const rawP = val as number
    const currentTx = tx as number
    const sp = clamp(
      (rawP - CFG.SPREAD_START - delay_i) / (spreadEnd - CFG.SPREAD_START - maxDelay),
      0,
      1
    )
    const e = easeOutCubic(sp)
    return lerp(0, rowX_i, e) + currentTx
  })

  const cardY = useTransform(p, (val) => {
    const sp = clamp(
      (val - CFG.SPREAD_START - delay_i) / (spreadEnd - CFG.SPREAD_START - maxDelay),
      0,
      1
    )
    const e = easeOutCubic(sp)
    const arc = Math.sin(Math.PI * e) * CFG.FLIGHT_ARC
    return lerp(pileY, 0, e) - arc
  })

  const cardRot = useTransform([p, cardX], ([val, cx]) => {
    const rawP = val as number
    const currentX = cx as number
    const sp = clamp(
      (rawP - CFG.SPREAD_START - delay_i) / (spreadEnd - CFG.SPREAD_START - maxDelay),
      0,
      1
    )
    const e = easeOutCubic(sp)
    let rot = lerp(pileRot, tilt_i, e)

    // Focus effect: relax rotation when card is near viewport centre
    const distFromCenter = Math.abs(currentX)
    const focusRange = CFG.FOCUS_RANGE * w
    if (distFromCenter < focusRange) {
      const focusT = 1 - distFromCenter / focusRange
      rot = lerp(rot, 0, focusT)
    }
    return rot
  })

  const cardScale = useTransform([p, cardX], ([val, cx]) => {
    const rawP = val as number
    const currentX = cx as number
    const sp = clamp(
      (rawP - CFG.SPREAD_START - delay_i) / (spreadEnd - CFG.SPREAD_START - maxDelay),
      0,
      1
    )
    const e = easeOutCubic(sp)
    let scale = lerp(pileScale, 1, e)

    // Focus effect: scale up slightly when card is near centre
    const distFromCenter = Math.abs(currentX)
    const focusRange = CFG.FOCUS_RANGE * w
    if (distFromCenter < focusRange) {
      const focusT = 1 - distFromCenter / focusRange
      scale = lerp(scale, scale * CFG.FOCUS_SCALE, focusT)
    }
    return scale
  })

  const cardOpacity = useTransform(p, (val) => {
    if (d <= CFG.PILE_VISIBLE) return 1
    const sp = clamp(
      (val - CFG.SPREAD_START - delay_i) / (spreadEnd - CFG.SPREAD_START - maxDelay),
      0,
      1
    )
    return clamp(sp / 0.33, 0, 1)
  })

  // Pointer events enabled once spread is >= 85% complete (§7.7)
  const isInteractiveTransform = useTransform(p, (val) => {
    return val >= spreadEnd * 0.85
  })
  const [isInteractive, setIsInteractive] = useState(false)
  useEffect(() => {
    return isInteractiveTransform.on('change', (active) => setIsInteractive(active))
  }, [isInteractiveTransform])

  return (
    <motion.li
      onFocus={onFocus}
      style={{
        x: cardX,
        y: cardY,
        rotate: cardRot,
        scale: cardScale,
        opacity: cardOpacity,
        zIndex: n - d,
        pointerEvents: isInteractive ? 'auto' : 'none',
        width: w,
        height: h,
      }}
      className="stage-card absolute origin-center will-change-transform"
      aria-hidden={!isInteractive}
    >
      <IndustryCard industry={industry} index={i} isInteractive={isInteractive} />
    </motion.li>
  )
}
