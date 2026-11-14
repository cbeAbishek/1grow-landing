'use client'

import React from 'react'
import { motion, MotionValue, useTransform } from 'framer-motion'
import {
  N,
  STRIP,
  MAX_STRIPS,
  SCALE_STEP,
  DIM_STEP,
  ENTER_EXTRA,
} from './stackConfig'
import { PlatformCardData } from '@/content/platform'
import {
  GraduationCap,
  Package,
  PartyPopper,
  CreditCard,
  Warehouse,
  BarChart3,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import {
  TrainingScreen,
  RentalScreen,
  EventsScreen,
  BillingScreen,
  InventoryScreen,
  AnalyticsScreen,
} from '@/components/landing/hero/screens/ShowcaseScreens'
import {
  SymbolCap,
  SymbolBox,
  SymbolPopper,
  SymbolCoin,
  SymbolCrates,
  SymbolBars,
} from '@/components/landing/hero/symbols/SymbolSet'

const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  Package,
  PartyPopper,
  CreditCard,
  Warehouse,
  BarChart3,
}

const visualScreens: Record<string, React.ReactNode> = {
  training: <TrainingScreen />,
  rental: <RentalScreen />,
  event: <EventsScreen />,
  billing: <BillingScreen />,
  inventory: <InventoryScreen />,
  analytics: <AnalyticsScreen />,
}

const symbolMap: Record<string, React.ReactNode> = {
  training: <SymbolCap size={96} />,
  rental: <SymbolBox size={96} />,
  event: <SymbolPopper size={96} />,
  billing: <SymbolCoin size={96} />,
  inventory: <SymbolCrates size={96} />,
  analytics: <SymbolBars size={96} />,
}

interface StackCardProps {
  card: PlatformCardData
  i: number
  s: MotionValue<number>
  cardH: number
}

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

export function StackCard({ card, i, s, cardH }: StackCardProps) {
  const Icon = iconMap[card.icon] || Package

  // Transforms derived purely from s per §10.2 & §16.5
  const enter = useTransform(s, (v) =>
    i === 0 ? 1 : easeOutCubic(clamp(v - (i - 1), 0, 1))
  )
  const depth = useTransform(s, (v) => clamp(v - i, 0, N))

  const y = useTransform(
    [enter, depth],
    ([e, d]: number[]) =>
      (1 - e) * (cardH + ENTER_EXTRA) - Math.min(d, MAX_STRIPS) * STRIP
  )
  const scale = useTransform(depth, (d) => 1 - Math.min(d, 3) * SCALE_STEP)
  const dim = useTransform(depth, (d) => Math.min(d, 3) * DIM_STEP)
  const opacity = useTransform(depth, (d) =>
    d <= MAX_STRIPS ? 1 : Math.max(0, 1 - (d - MAX_STRIPS))
  )
  const bodyOpacity = useTransform(depth, (d) => 1 - clamp(d / 0.6, 0, 1))

  return (
    <motion.article
      id={`platform-${card.slug}`}
      style={{
        y,
        scale,
        opacity,
        zIndex: i + 1,
        background: card.gradient,
      }}
      className="stack-card absolute left-0 right-0 top-0 overflow-hidden rounded-[40px] p-8 sm:p-12 text-white shadow-2xl border border-white/20 origin-top"
    >
      {/* Dim Overlay when covered (§10.2) */}
      <motion.div
        style={{ opacity: dim }}
        className="pointer-events-none absolute inset-0 bg-navy-950/80 bg-[#001039]/80 -z-0"
        aria-hidden="true"
      />

      {/* Top Strip (Always visible for up to 2 buried cards §10.2) */}
      <div className="relative z-10 flex h-[56px] items-center justify-between border-b border-white/20 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-xl bg-white/20 backdrop-blur-md">
            <Icon className="size-6 text-white" />
          </div>
          <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white">
            {card.title}
          </span>
        </div>
        <div className="flex items-center gap-2 text-white/80 text-xs font-semibold uppercase tracking-wider">
          <span>Module 0{i + 1}</span>
          <Sparkles className="size-4 text-amber-300" />
        </div>
      </div>

      {/* Card Body (fades when card is buried) */}
      <motion.div
        style={{ opacity: bodyOpacity }}
        className="relative z-10 grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 items-center"
      >
        {/* Left: Copy & White Pill CTA */}
        <div className="space-y-6">
          <div className="inline-block text-xs font-bold uppercase tracking-widest text-white/80 bg-white/10 px-3.5 py-1 rounded-full">
            {card.title} System
          </div>

          <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-white leading-[1.08]">
            {card.headline}
          </h3>

          <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-[540px]">
            {card.description}
          </p>

          <div className="pt-2">
            <a
              href={card.ctaHref}
              className="inline-flex items-center gap-2.5 h-14 px-8 rounded-full bg-white text-[#032d60] font-bold text-lg shadow-lg hover:bg-white/95 hover:-translate-y-0.5 active:scale-98 transition-all"
            >
              <span>{card.ctaText}</span>
              <ArrowRight className="size-5" />
            </a>
          </div>
        </div>

        {/* Right: Module UI Visual in frosted card + Symbol sticker */}
        <div className="relative rounded-[28px] bg-white/10 border border-white/25 backdrop-blur-md p-4 min-h-[340px] shadow-inner overflow-hidden">
          {/* Floating Sticker Symbol */}
          <div className="absolute -top-4 -right-4 z-20 pointer-events-none transform rotate-6 scale-90 sm:scale-100">
            {symbolMap[card.id]}
          </div>

          <div className="relative z-10 h-full">
            {visualScreens[card.id] || visualScreens.training}
          </div>
        </div>
      </motion.div>
    </motion.article>
  )
}
