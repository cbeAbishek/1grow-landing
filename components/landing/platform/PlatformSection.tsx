'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { Container } from '@/components/layout/container'
import { WaveDivider } from '@/components/ui/WaveDivider'
import { StackCard } from './StackCard'
import { StackNav } from './StackNav'
import { PLATFORM_CARDS } from '@/content/platform'
import {
  N,
  T_VH,
  DWELL_VH,
  STRIP,
  MAX_STRIPS,
} from './stackConfig'
import { cn } from '@/lib/utils'
import {
  GraduationCap,
  Package,
  PartyPopper,
  CreditCard,
  Warehouse,
  BarChart3,
  ArrowRight,
} from 'lucide-react'

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

  // Scroll Progress across the pinning track (§10.2)
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  })

  // Map scroll progress to s in [0, N-1]
  const s = useTransform(scrollYProgress, [0, 1], [0, N - 1])

  // Derive active index with hysteresis (§10.3)
  useMotionValueEvent(s, 'change', (val) => {
    if (isNavLockedRef.current) return
    const rounded = Math.min(N - 1, Math.max(0, Math.round(val)))
    if (Math.abs(val - activeIndex) >= 0.55) {
      setActiveIndex(rounded)
    }
  })

  // Click-to-scroll handler (§10.3)
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
    }, 900)
  }

  return (
    <section
      id="platform"
      data-band="light"
      className="relative overflow-clip isolate"
      style={{
        background: 'var(--platform-bg, #f4f9ff)',
      }}
    >
      {/* Soft Radial Ambient Tints (§10.1) */}
      <div
        className="pointer-events-none absolute -top-12 left-0 size-[600px] rounded-full bg-[#1b96ff]/10 blur-[100px] -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/4 right-0 size-[600px] rounded-full bg-[#7526e3]/8 blur-[100px] -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-32 left-1/3 size-[500px] rounded-full bg-[#f59e0b]/6 blur-[100px] -z-10"
        aria-hidden="true"
      />

      {/* Header (Normal Flow, Centered §10.1) */}
      <div className="pt-24 sm:pt-28 pb-12 sm:pb-16 text-center max-w-[900px] mx-auto px-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(1,118,211,0.10)] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[var(--accent-blue,#0176d3)] mb-4">
          The Platform
        </div>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[var(--heading)] leading-[1.05] text-balance">
          One platform. Three businesses. Zero spreadsheets.
        </h2>
        <p className="mt-6 text-lg sm:text-xl text-[var(--ink-2)] dark:text-zinc-300 leading-relaxed max-w-[760px] mx-auto">
          Everything your academy, rental inventory, and event operations need —
          built together with automated billing, WhatsApp notifications, and
          executive reporting.
        </p>
      </div>

      {/* Desktop Scroll-Scrubbed Stacking Track (>=1024px) (§10.2) */}
      <div
        ref={outerRef}
        className="hidden lg:block relative"
        style={{
          height: `calc(100dvh + ${(N - 1) * T_VH}dvh + ${DWELL_VH}dvh)`,
        }}
      >
        <div className="sticky top-0 h-[100dvh] flex items-center max-w-[1320px] mx-auto px-8">
          <div className="w-full grid grid-cols-[260px_1fr] gap-8 items-center pt-8">
            {/* Left Synchronized Vertical Nav */}
            <StackNav
              cards={PLATFORM_CARDS}
              s={s}
              activeIndex={activeIndex}
              onNavigate={handleNavigate}
            />

            {/* Right Card Stack Area */}
            <div
              className="relative w-full"
              style={{
                height: `calc(min(68dvh, 620px) + ${MAX_STRIPS * STRIP}px)`,
              }}
            >
              {PLATFORM_CARDS.map((card, i) => (
                <StackCard
                  key={card.id}
                  card={card}
                  i={i}
                  s={s}
                  cardH={560}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Fallback (<1024px Pure CSS Stacking §10.4) */}
      <div className="lg:hidden px-4 pb-20">
        {/* Sticky Chip Bar */}
        <div className="sticky top-18 z-40 flex items-center gap-2 overflow-x-auto py-2 mb-6 no-scrollbar bg-[var(--platform-bg,#f4f9ff)]/95 backdrop-blur-md">
          {PLATFORM_CARDS.map((card, idx) => (
            <a
              key={card.id}
              href={`#mobile-card-${card.id}`}
              className="shrink-0 px-4 py-2 rounded-full text-xs font-bold bg-white dark:bg-white/10 text-[var(--heading)] shadow-xs border border-black/5"
            >
              {card.title}
            </a>
          ))}
        </div>

        {/* Cards stacked vertically */}
        <div className="space-y-6">
          {PLATFORM_CARDS.map((card, i) => {
            const Icon = iconMap[card.icon] || Package
            return (
              <article
                key={card.id}
                id={`mobile-card-${card.id}`}
                style={{ background: card.gradient }}
                className="rounded-[32px] p-6 text-white shadow-xl border border-white/20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="grid size-10 place-items-center rounded-xl bg-white/20">
                    <Icon className="size-6 text-white" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    {card.title}
                  </h3>
                </div>
                <h4 className="text-xl font-medium text-white mb-3">
                  {card.headline}
                </h4>
                <p className="text-sm text-white/90 leading-relaxed mb-6">
                  {card.description}
                </p>
                <a
                  href={card.ctaHref}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#032d60] font-bold text-sm shadow-md"
                >
                  <span>{card.ctaText}</span>
                  <ArrowRight className="size-4" />
                </a>
              </article>
            )
          })}
        </div>
      </div>

      {/* Bottom Wave Divider (Variant B) connecting to Industry grid (§10.5) */}
      <div className="w-full pointer-events-none mt-12 sm:mt-16">
        <WaveDivider variant="B" nextSectionBg="var(--bg, #fcfbf8)" />
      </div>
    </section>
  )
}
