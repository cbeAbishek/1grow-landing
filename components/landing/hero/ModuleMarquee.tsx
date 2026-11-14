'use client'

import React, { useState } from 'react'
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
  MessageSquare,
  FileCheck,
  Pause,
  Play,
} from 'lucide-react'
import { SymbolSparkle } from './symbols/SymbolSet'

const LOOP_ITEMS = [
  { label: 'Student Management', icon: GraduationCap, color: '#8b5cf6' },
  { label: 'Rental Management', icon: Package, color: '#0176d3' },
  { label: 'Event Management', icon: PartyPopper, color: '#e5484d' },
  { label: 'Multi-Branch Operations', icon: Building2, color: '#2563eb' },
  { label: 'Billing & Payments', icon: CreditCard, color: '#2e844a' },
  { label: 'Reports & Analytics', icon: BarChart3, color: '#0d9488' },
  { label: 'Calendar & Resource Scheduling', icon: CalendarDays, color: '#ea580c' },
  { label: 'Inventory & Asset Management', icon: Warehouse, color: '#d97706' },
  { label: 'Dashboard & Business Insights', icon: Layers, color: '#7526e3' },
  { label: 'WhatsApp Reminders', icon: MessageSquare, color: '#16a34a' },
  { label: 'GST Invoicing', icon: FileCheck, color: '#0284c7' },
]

export function ModuleMarquee() {
  const [paused, setPaused] = useState(false)

  return (
    <div className="relative w-full pt-20 pb-12 overflow-hidden">
      {/* Heading per §7.1: "Everything your business runs on, in one place" */}
      <h2 className="font-display text-center text-[clamp(2rem,1.3rem+2.6vw,3.25rem)] font-medium text-[var(--heading)] leading-[1.15] max-w-[900px] mx-auto mb-12 sm:mb-14 px-4 text-balance">
        Everything your business runs on, in one place
      </h2>

      {/* Full-bleed marquee container with edge mask */}
      <div
        data-paused={paused ? 'true' : 'false'}
        className="loop-marquee relative w-full py-4"
      >
        <div className="loop-marquee-track">
          {/* First loop copy */}
          {LOOP_ITEMS.map((item, idx) => {
            const Icon = item.icon
            return (
              <React.Fragment key={`first-${item.label}`}>
                <div className="group flex items-center gap-3.5 shrink-0 cursor-default transition-all duration-200">
                  <div
                    className="grid place-items-center size-10 rounded-xl transition-transform duration-200 group-hover:scale-110"
                    style={{ color: item.color }}
                  >
                    <Icon className="size-8" aria-hidden="true" />
                  </div>
                  <span className="font-display text-[24px] sm:text-[28px] font-semibold text-[var(--heading)]/80 group-hover:text-[var(--heading)] group-hover:opacity-100 transition-colors whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
                {/* 4-point sparkle divider (§7.1) */}
                <div className="shrink-0 opacity-60">
                  <SymbolSparkle size={14} />
                </div>
              </React.Fragment>
            )
          })}

          {/* Second loop copy (aria-hidden for accessibility §7.2) */}
          {LOOP_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <React.Fragment key={`second-${item.label}`}>
                <div
                  aria-hidden="true"
                  className="group flex items-center gap-3.5 shrink-0 cursor-default transition-all duration-200"
                >
                  <div
                    className="grid place-items-center size-10 rounded-xl transition-transform duration-200 group-hover:scale-110"
                    style={{ color: item.color }}
                  >
                    <Icon className="size-8" aria-hidden="true" />
                  </div>
                  <span className="font-display text-[24px] sm:text-[28px] font-semibold text-[var(--heading)]/80 group-hover:text-[var(--heading)] group-hover:opacity-100 transition-colors whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
                <div aria-hidden="true" className="shrink-0 opacity-60">
                  <SymbolSparkle size={14} />
                </div>
              </React.Fragment>
            )
          })}
        </div>
      </div>

      {/* Pause/Play Button bottom-right (§7.1) */}
      <div className="flex justify-end max-w-[1320px] mx-auto px-6 mt-3">
        <button
          onClick={() => setPaused((p) => !p)}
          className="grid size-11 place-items-center rounded-full bg-white/70 dark:bg-white/10 hover:bg-white text-[var(--heading)] border border-[var(--glass-border,rgba(3,45,96,0.1))] shadow-xs transition-transform active:scale-95"
          aria-label={paused ? 'Resume marquee scroll' : 'Pause marquee scroll'}
          aria-pressed={paused}
        >
          {paused ? <Play className="size-4 fill-current" /> : <Pause className="size-4 fill-current" />}
        </button>
      </div>
    </div>
  )
}
