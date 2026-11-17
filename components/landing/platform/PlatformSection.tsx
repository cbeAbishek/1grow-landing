'use client'

import React, { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion'
import { ReferenceWave } from '@/components/layout/reference-wave'
import { StackCard } from './StackCard'
import { StackNav } from './StackNav'
import { PLATFORM_CARDS } from '@/content/platform'
import {
  N,
  T_VH,
  DWELL_VH,
  STRIP_H_PX,
  STACK_SPRING,
} from './stackConfig'
import {
  GraduationCap,
  Package,
  PartyPopper,
  CreditCard,
  Warehouse,
  BarChart3,
  ArrowUpRight,
} from 'lucide-react'
import { HeroArt } from './art/HeroArt'

const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  Package,
  PartyPopper,
  CreditCard,
  Warehouse,
  BarChart3,
}

export function PlatformSection() {
  const outerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const isNavLockedRef = useRef(false)

  // Scroll Progress across the pinning track (§8.1, §10.1)
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  })

  // Spring-smoothed progress: stiffness 140, damping 22, mass 0.5 (damping ratio >= 1: zero overshoot) (§10.1)
  const smoothProgress = useSpring(scrollYProgress, STACK_SPRING)

  // Total scroll length = (N - 1) * T_VH + DWELL_VH = 500 + 40 = 540 dvh
  // Card transitions happen over the first 500 dvh; remaining 40 dvh is dwell for card 5 (§10.2)
  const cardTrackRatio = ((N - 1) * T_VH) / ((N - 1) * T_VH + DWELL_VH)

  // Map smoothed scroll progress to s in [0, N-1]
  const s = useTransform(smoothProgress, (p) => {
    const clampedP = Math.min(1, Math.max(0, p))
    const normalized = Math.min(1, clampedP / cardTrackRatio)
    return normalized * (N - 1)
  })

  // Derive active index with hysteresis
  useMotionValueEvent(s, 'change', (val) => {
    if (isNavLockedRef.current) return
    const rounded = Math.min(N - 1, Math.max(0, Math.round(val)))
    if (Math.abs(val - activeIndex) >= 0.5) {
      setActiveIndex(rounded)
    }
  })

  // Click-to-scroll handler
  const handleNavigate = (index: number) => {
    if (!outerRef.current) return
    isNavLockedRef.current = true
    setActiveIndex(index)

    const rect = outerRef.current.getBoundingClientRect()
    const sectionTop = window.scrollY + rect.top
    const targetScrollY =
      sectionTop + index * ((T_VH / 100) * window.innerHeight)

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    })

    setTimeout(() => {
      isNavLockedRef.current = false
      if (typeof window !== 'undefined') {
        const slug = PLATFORM_CARDS[index].slug
        window.history.replaceState(null, '', `#platform-${slug}`)
      }
    }, 1600)
  }

  return (
    <section
      id="platform"
      data-band="light"
      className="relative overflow-x-clip isolate -mt-px pb-36 sm:pb-44 lg:pb-52"
      style={
        {
          background: 'var(--t-platformPale-bg, var(--platform-bg, #f4f9ff))',
          '--stack-w': 'clamp(760px, 60.4vw, 1180px)',
          '--card-h': 'clamp(500px, 56dvh, 660px)',
          '--strip-h': 'clamp(40px, 4.3dvh, 48px)',
        } as React.CSSProperties
      }
    >
      {/* Header (§8: Tight, deliberate spacing; eyebrow -> H2: 12px; H2 -> lead: 16px) */}
      <div className="relative z-20 pt-12 sm:pt-16 pb-4 sm:pb-5 text-center max-w-[900px] mx-auto px-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(1,118,211,0.10)] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[var(--accent-blue,#0176d3)] mb-3">
          The Platform
        </div>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tight text-[var(--heading)] leading-[1.1] text-balance">
          One platform. Three businesses. Zero spreadsheets.
        </h2>
        <p className="mt-4 text-base sm:text-lg lg:text-xl text-[var(--ink-2)] dark:text-zinc-300 leading-relaxed max-w-[760px] mx-auto">
          Everything your academy, rental inventory, and event operations need —
          built together with automated billing, WhatsApp notifications, and
          executive reporting.
        </p>
      </div>

      {/* Desktop Scroll-Scrubbed Stacking Track (>=1024px) (§6.1, §6.4, §8, §10) */}
      <div
        ref={outerRef}
        className="hidden lg:block relative z-10"
        style={{
          height: `calc(100dvh + ${(N - 1) * T_VH}dvh + ${DWELL_VH}dvh)`,
          marginTop:
            'calc(-1 * ((100dvh - var(--card-h) + 5 * var(--strip-h)) / 2 - clamp(0px, 4.4vw - 43px, 46px)))',
        }}
      >
        <div className="sticky top-0 h-[100dvh] w-full flex items-center justify-center overflow-hidden">
          {/* Left Vertical Nav (Outside Stack, Absolutely Positioned, Gap Rule >=1280px) (§6.4) */}
          <StackNav
            cards={PLATFORM_CARDS}
            s={s}
            activeIndex={activeIndex}
            onNavigate={handleNavigate}
            className="absolute left-[clamp(20px,2.2vw,40px)] top-1/2 -translate-y-1/2"
          />

          {/* Intermediate Tablet/Small Desktop Chip Bar (1024px - 1279px) (§6.4) */}
          <div className="hidden lg:flex xl:hidden absolute top-20 z-40 left-1/2 -translate-x-1/2 items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-md border border-black/5 dark:border-white/10 shadow-sm">
            {PLATFORM_CARDS.map((card, idx) => {
              const isActive = activeIndex === idx
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => handleNavigate(idx)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#0176d3] text-white shadow-xs'
                      : 'text-[var(--ink-2)] hover:text-[var(--heading)]'
                  }`}
                >
                  {card.title}
                </button>
              )
            })}
          </div>

          {/* Centered Composite Stack Area (§6.1: Horizontal Centre Within ±2px of Viewport Centre) */}
          <div
            className="relative mx-auto"
            style={{
              width: 'var(--stack-w, clamp(760px, 60.4vw, 1180px))',
              height: 'calc(var(--card-h, clamp(500px, 56dvh, 660px)) + 5 * var(--strip-h, 46px))',
            }}
          >
            {PLATFORM_CARDS.map((card, i) => (
              <StackCard
                key={card.id}
                card={card}
                i={i}
                s={s}
                stripH={STRIP_H_PX}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Fallback (<1024px Responsive Stack) */}
      <div className="lg:hidden px-4 pb-20 relative z-10">
        {/* Sticky Chip Bar */}
        <div className="sticky top-16 z-40 flex items-center gap-2 overflow-x-auto py-2.5 mb-6 no-scrollbar bg-[var(--platform-bg,#f4f9ff)]/95 backdrop-blur-md">
          {PLATFORM_CARDS.map((card, idx) => (
            <a
              key={card.id}
              href={`#mobile-card-${card.id}`}
              className="shrink-0 px-4 py-2 rounded-full text-xs font-bold bg-white dark:bg-white/10 text-[var(--heading)] shadow-xs border border-black/5 hover:border-[var(--accent-blue,#0176d3)] transition-colors"
            >
              {card.title}
            </a>
          ))}
        </div>

        {/* Cards stacked vertically */}
        <div className="space-y-8 max-w-[680px] mx-auto">
          {PLATFORM_CARDS.map((card, i) => {
            const Icon = iconMap[card.icon] || Package
            return (
              <article
                key={card.id}
                id={`mobile-card-${card.id}`}
                style={{
                  backgroundColor:
                    card.id === 'training'
                      ? '#4c1d95'
                      : card.id === 'rental'
                      ? '#014486'
                      : card.id === 'event'
                      ? '#9f1d1d'
                      : card.id === 'billing'
                      ? '#14532d'
                      : card.id === 'inventory'
                      ? '#9a3412'
                      : '#0b4f4a',
                  backgroundImage: card.gradient,
                }}
                className="rounded-[32px] p-6 sm:p-8 text-white shadow-xl border border-white/20 space-y-6 overflow-hidden"
              >
                {/* Header Row */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="grid size-10 place-items-center rounded-xl bg-white/20 backdrop-blur-xs">
                      <Icon className="size-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-white">
                        {card.title}
                      </h3>
                      <span className="text-xs text-white/70">Module 0{i + 1}</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-white/80 bg-white/15 px-3 py-1 rounded-full border border-white/20">
                    1Grow Suite
                  </span>
                </div>

                {/* Value Copy */}
                <div>
                  <h4 className="font-display text-2xl font-semibold text-white leading-snug">
                    {card.headline}
                  </h4>
                  <p className="text-sm sm:text-base text-white/90 leading-relaxed mt-3">
                    {card.description}
                  </p>
                </div>

                {/* Hero Art */}
                <div className="w-full py-2">
                  <HeroArt moduleId={card.id} isActive={true} />
                </div>

                {/* Primary CTA (Single Arrow) */}
                <div className="pt-2">
                  <a
                    href={card.ctaHref}
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-full bg-white text-[#032d60] font-bold text-sm shadow-md hover:bg-white/95 transition-all"
                  >
                    <span>{card.ctaText}</span>
                    <ArrowUpRight className="size-4" />
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      {/* Section 2 -> Section 3 Reference 3-Layer Static Wave */}
      <ReferenceWave
        colors={[
          'var(--wave-ref-bottom-1)',
          'var(--wave-ref-bottom-2)',
          'var(--t-sand-bg, #fdf8f1)',
        ]}
      />
    </section>
  )
}
