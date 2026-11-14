'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GraduationCap,
  Package,
  PartyPopper,
  Check,
  ArrowRight,
  CalendarDays,
  TrendingUp,
} from 'lucide-react'
import { Container } from '@/components/layout/container'
import { SectionHead } from '@/components/layout/section-head'
import { ActionButton } from '@/components/ui/action-button'
import { Reveal } from '@/components/motion/reveal'
import { WaveDivider } from '@/components/layout/wave-divider'
import { modulesData } from '@/content/landing'
import { cn } from '@/lib/utils'

const iconMap: Record<string, React.ElementType> = {
  training: GraduationCap,
  rental: Package,
  event: PartyPopper,
}

export function Modules() {
  const [activeTab, setActiveTab] = useState(0)
  const current = modulesData[activeTab]
  const Icon = iconMap[current.id] || GraduationCap

  return (
    <section
      id="modules"
      data-band="dark"
      aria-labelledby="modules-heading"
      className="relative overflow-hidden pt-24 pb-36 sm:pt-28 sm:pb-44 text-white"
      style={{
        background: 'var(--bg-dark-band)',
      }}
    >
      {/* Background glow and subtle dot grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(55% 50% at 50% 10%, rgba(255,107,0,0.25), transparent 75%), radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px) 0 0/28px 28px',
        }}
      />

      <Container>
        <SectionHead
          id="modules-heading"
          eyebrow="Specialized Operations"
          title={<span className="text-white font-bold">Powerful modules that work the way you do</span>}
          lead={<span className="text-white/85">Turn on only what you need. Each module is built for your industry and connects seamlessly with billing, CRM, and analytics. Pick Training, Rental, or Event management.</span>}
          className="text-white"
        />

        {/* Segmented Pill Tab Group on Dark with layoutId (§7) */}
        <div className="flex justify-center mb-14" role="tablist" aria-label="Select product module">
          <div className="relative inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 backdrop-blur-md shadow-xs">
            {modulesData.map((m, idx) => {
              const TabIcon = iconMap[m.id] || GraduationCap
              const isActive = activeTab === idx
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveTab(idx)}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`module-panel-${m.id}`}
                  className={cn(
                    'relative z-10 flex items-center gap-2.5 h-11 px-6 rounded-full text-sm font-bold transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white',
                    isActive
                      ? 'text-white'
                      : 'text-white/70 hover:text-white',
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeModuleTab"
                      className="absolute inset-0 bg-[var(--primary)] rounded-full -z-10 shadow-md"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <TabIcon className="size-4.5 shrink-0" aria-hidden="true" />
                  <span>{m.tab}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Module Content Layout: Left Copy (5 cols) | Right Dark Dashboard Window (7 cols) */}
        <div
          id={`module-panel-${current.id}`}
          role="tabpanel"
          aria-label={`${current.title} panel`}
          className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14"
        >
          {/* Left Column: Copy & Checklist */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-bold text-white">
              <Icon className="size-4" />
              <span>{current.badge}</span>
            </div>

            <h3 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
              {current.title}
            </h3>

            <p className="text-lg text-white/85 leading-relaxed">
              {current.description}
            </p>

            {/* Checklist with Custom Badges */}
            <ul className="space-y-3.5 pt-2">
              {current.features.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="grid size-6 place-items-center rounded-full bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                    <Check className="size-3.5 stroke-[3]" aria-hidden="true" />
                  </span>
                  <span className="text-base text-white/90 font-medium leading-normal">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <ActionButton
                href="/wishlist"
                variant="pill"
                showArrow
                aria-label={`Get started with ${current.tab}`}
              >
                Get Started with {current.tab}
              </ActionButton>
            </div>
          </div>

          {/* Right Column: Interactive Dark Dashboard Mockup */}
          <div className="lg:col-span-7">
            <Reveal
              direction="right"
              className="relative overflow-hidden rounded-[36px] border border-white/12 bg-white/6 p-6 sm:p-8 backdrop-blur-xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)]"
            >
              <div className="space-y-5">
                {/* Mock Window Title */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="grid size-10 place-items-center rounded-xl bg-white/10 text-white">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-white">{current.title}</p>
                      <p className="text-xs text-white/60">Live Operational Feed</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80">
                    <CalendarDays className="size-3.5 text-sky-400" />
                    <span>Real-Time Sync</span>
                  </div>
                </div>

                {/* Live Row Records */}
                <div className="space-y-3">
                  {current.rows.map((row) => (
                    <div
                      key={row.name}
                      className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/5 p-4 transition-colors hover:bg-white/10"
                    >
                      <div>
                        <p className="text-base font-semibold text-white">{row.name}</p>
                        <p className="text-xs text-white/60 mt-0.5">{row.meta}</p>
                      </div>
                      <span className={cn('rounded-full px-3 py-1 text-xs font-bold shrink-0', row.tagColor)}>
                        {row.tag}
                      </span>
                    </div>
                  ))}
                </div>

                {/* SVG Bar Chart with Animated Draw */}
                <div className="rounded-2xl border border-white/8 bg-white/5 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-white/90 flex items-center gap-1.5">
                      <TrendingUp className="size-4 text-[var(--primary)]" /> Operational Volume &amp; Capacity
                    </span>
                    <span className="text-[11px] text-white/60 font-mono">Last 6 Months</span>
                  </div>

                  <svg viewBox="0 0 360 80" className="w-full h-20">
                    {[0, 25, 50, 75].map((y) => (
                      <line
                        key={y}
                        x1="0"
                        y1={y}
                        x2="360"
                        y2={y}
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                      />
                    ))}
                    {current.chartData.map((d, i) => {
                      const barWidth = 14
                      const gap = 46
                      const x = i * (barWidth * 2 + gap) + 16
                      const h1 = (d.primary / 100) * 70
                      const h2 = (d.secondary / 100) * 70
                      return (
                        <g key={d.label}>
                          <rect
                            x={x}
                            y={80 - h1}
                            width={barWidth}
                            height={h1}
                            rx="3"
                            fill="var(--primary)"
                            className="transition-all duration-500 ease-out"
                          />
                          <rect
                            x={x + barWidth + 2}
                            y={80 - h2}
                            width={barWidth}
                            height={h2}
                            rx="3"
                            fill="#57a3fd"
                            className="transition-all duration-500 ease-out"
                          />
                        </g>
                      )
                    })}
                  </svg>
                  <div className="mt-1 flex justify-between px-2 text-[10px] text-white/50 font-mono">
                    {current.chartData.map((d) => (
                      <span key={d.label}>{d.label}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>

      {/* Wave ending transitioning into WhyChooseUs (light) (§4) */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none">
        <WaveDivider to="light" shape="A" />
      </div>
    </section>
  )
}
