'use client'

import React from 'react'
import {
  GraduationCap,
  Package,
  PartyPopper,
  Building2,
  CreditCard,
  BarChart3,
  CalendarDays,
  Warehouse,
  Layers,
} from 'lucide-react'
import { WaveDivider } from '@/components/layout/wave-divider'
import { marqueeItems } from '@/content/landing'

const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  Package,
  PartyPopper,
  Building2,
  CreditCard,
  BarChart3,
  CalendarDays,
  Warehouse,
  Layers,
}

const badgeStyles = [
  { bg: 'bg-[#fff7ed] dark:bg-orange-950/30', border: 'border-[#fed7aa] dark:border-orange-800/40', text: 'text-[#c2410c] dark:text-orange-300', icon: 'text-[#ea580c] dark:text-orange-400' },
  { bg: 'bg-[#eff6ff] dark:bg-blue-950/30', border: 'border-[#bfdbfe] dark:border-blue-800/40', text: 'text-[#1d4ed8] dark:text-blue-300', icon: 'text-[#2563eb] dark:text-blue-400' },
  { bg: 'bg-[#fff1f2] dark:bg-rose-950/30', border: 'border-[#fecdd3] dark:border-rose-800/40', text: 'text-[#be123c] dark:text-rose-300', icon: 'text-[#e11d48] dark:text-rose-400' },
  { bg: 'bg-[#ecfeff] dark:bg-cyan-950/30', border: 'border-[#a5f3fc] dark:border-cyan-800/40', text: 'text-[#0e7490] dark:text-cyan-300', icon: 'text-[#0891b2] dark:text-cyan-400' },
  { bg: 'bg-[#f0fdf4] dark:bg-emerald-950/30', border: 'border-[#bbf7d0] dark:border-emerald-800/40', text: 'text-[#15803d] dark:text-emerald-300', icon: 'text-[#16a34a] dark:text-emerald-400' },
  { bg: 'bg-[#fefce8] dark:bg-yellow-950/30', border: 'border-[#fef08a] dark:border-yellow-800/40', text: 'text-[#a16207] dark:text-yellow-300', icon: 'text-[#ca8a04] dark:text-yellow-400' },
  { bg: 'bg-[#faf5ff] dark:bg-purple-950/30', border: 'border-[#e9d5ff] dark:border-purple-800/40', text: 'text-[#7e22ce] dark:text-purple-300', icon: 'text-[#9333ea] dark:text-purple-400' },
  { bg: 'bg-[#fff1f2] dark:bg-rose-950/30', border: 'border-[#fecdd3] dark:border-rose-800/40', text: 'text-[#be123c] dark:text-rose-300', icon: 'text-[#e11d48] dark:text-rose-400' },
  { bg: 'bg-[#ecfdf5] dark:bg-teal-950/30', border: 'border-[#a7f3d0] dark:border-teal-800/40', text: 'text-[#047857] dark:text-teal-300', icon: 'text-[#059669] dark:text-teal-400' },
]

export function TrustMarquee() {
  return (
    <section className="relative w-full bg-[var(--bg)] pt-12 pb-24 sm:pt-16 sm:pb-32 overflow-hidden scroll-mt-24">
      <div className="mx-auto max-w-[80rem] px-5 mb-8 text-center">
        <p className="text-base font-semibold text-[var(--ink-2)]">
          One platform for every kind of business you run
        </p>
      </div>

      {/* Infinite Marquee with edge-fade mask (§7.5) */}
      <div className="marquee w-full py-2">
        <div className="marquee-track flex items-center">
          {/* Primary Track */}
          <div className="flex items-center gap-4 shrink-0">
            {marqueeItems.map((item, idx) => {
              const Icon = iconMap[item.icon] || Layers
              const style = badgeStyles[idx % badgeStyles.length]
              return (
                <div
                  key={`m1-${idx}`}
                  className={`inline-flex items-center gap-3 rounded-full border px-5 py-3 text-base font-semibold shadow-xs transition-all hover:scale-105 ${style.bg} ${style.border} ${style.text}`}
                >
                  <Icon className={`size-5 ${style.icon}`} aria-hidden="true" />
                  <span>{item.label}</span>
                </div>
              )
            })}
          </div>

          {/* Duplicate Track for seamless infinite loop (aria-hidden) */}
          <div className="flex items-center gap-4 shrink-0" aria-hidden="true">
            {marqueeItems.map((item, idx) => {
              const Icon = iconMap[item.icon] || Layers
              const style = badgeStyles[idx % badgeStyles.length]
              return (
                <div
                  key={`m2-${idx}`}
                  className={`inline-flex items-center gap-3 rounded-full border px-5 py-3 text-base font-semibold shadow-xs transition-all hover:scale-105 ${style.bg} ${style.border} ${style.text}`}
                >
                  <Icon className={`size-5 ${style.icon}`} aria-hidden="true" />
                  <span>{item.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Wave ending transitioning into Dark Tile Band (§4) */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none">
        <WaveDivider to="dark" shape="B" />
      </div>
    </section>
  )
}
