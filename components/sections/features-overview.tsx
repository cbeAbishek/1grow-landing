'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users,
  Wallet,
  BarChart3,
  GraduationCap,
  CalendarDays,
  ClipboardList,
  MessageSquare,
  Package,
  CalendarCheck,
  FileText,
  Smartphone,
  PartyPopper,
  UserCheck,
  CheckSquare,
  Truck,
  ArrowRight,
  BookOpen,
} from 'lucide-react'
import { Container } from '@/components/layout/container'
import { SectionHead } from '@/components/layout/section-head'
import { Reveal } from '@/components/motion/reveal'
import { WaveDivider } from '@/components/layout/wave-divider'
import { featureGroups, resourceCards } from '@/content/landing'
import { cn } from '@/lib/utils'

const iconMap: Record<string, React.ElementType> = {
  Users,
  Wallet,
  BarChart3,
  GraduationCap,
  CalendarDays,
  ClipboardList,
  MessageSquare,
  Package,
  CalendarCheck,
  FileText,
  Smartphone,
  PartyPopper,
  UserCheck,
  CheckSquare,
  Truck,
}

const accentCycles = [
  'card-accent-blue',
  'card-accent-orange',
  'card-accent-coral',
  'card-accent-teal',
  'card-accent-green',
  'card-accent-purple',
]

export function FeaturesOverview() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section
      id="features"
      data-band="tint"
      aria-labelledby="features-heading"
      className="relative scroll-mt-24 pt-24 pb-36 sm:pt-28 sm:pb-44 bg-[var(--bg-tint)]"
    >
      <Container>
        <SectionHead
          id="features-heading"
          eyebrow="Platform Capabilities"
          title="Everything you need to run your academy or business"
          lead="Features grouped by your operational rhythm — Admissions, Inventory, and Events. Every capability connects with automated billing, customer messaging, and real-time reports out of the box."
        />

        {/* Sliding Pill Tab Control with layoutId (§7) */}
        <div className="flex justify-center mb-14" role="tablist" aria-label="Select feature category">
          <div className="relative inline-flex items-center gap-2 rounded-full border border-line bg-[var(--surface-2)] p-1.5 shadow-xs">
            {featureGroups.map((group, idx) => {
              const isActive = activeTab === idx
              const GroupIcon = iconMap[group.icon] || Package
              return (
                <button
                  key={group.category}
                  onClick={() => setActiveTab(idx)}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`feature-panel-${idx}`}
                  className={cn(
                    'relative z-10 flex items-center gap-2.5 h-11 px-6 rounded-full text-sm font-bold transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--primary)]',
                    isActive
                      ? 'text-white'
                      : 'text-[var(--ink-2)] hover:text-[var(--heading)]',
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFeatureTab"
                      className="absolute inset-0 bg-[var(--primary)] rounded-full -z-10 shadow-sm"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <GroupIcon className="size-4.5 shrink-0" aria-hidden="true" />
                  <span>{group.category}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Feature Cards Grid with Crossfade Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            id={`feature-panel-${activeTab}`}
            role="tabpanel"
            aria-label={`${featureGroups[activeTab].category} features`}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7"
          >
            {featureGroups[activeTab].features.map((feat, idx) => {
              const Icon = iconMap[feat.icon] || ClipboardList
              const accentClass = accentCycles[idx % accentCycles.length]

              return (
                <div
                  key={feat.name}
                  className={cn(
                    'accent-card group flex flex-col justify-between p-8 rounded-[28px] card-spotlight',
                    accentClass,
                  )}
                >
                  <div className="dec-circle" aria-hidden="true" />

                  <div>
                    {/* 64px Squircle with wiggle */}
                    <div className="icon-blob mb-6 shadow-sm">
                      <Icon
                        className="size-7"
                        style={{ color: 'var(--card-accent-icon)' }}
                        aria-hidden="true"
                      />
                    </div>

                    <h3 className="font-display text-[22px] font-bold text-[var(--heading)] leading-snug">
                      {feat.name}
                    </h3>

                    <p className="mt-3 text-[16px] leading-[26px] text-[var(--ink-2)]">
                      {feat.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
                    <span
                      className="text-xs font-bold uppercase tracking-wider"
                      style={{ color: 'var(--card-accent-icon)' }}
                    >
                      {featureGroups[activeTab].category}
                    </span>
                    {feat.microLabel && (
                      <span className="font-mono text-xs text-[var(--ink-3)] font-semibold">
                        {feat.microLabel}
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </motion.div>
        </AnimatePresence>

        {/* 3 Resource Cards below */}
        <div className="mt-20">
          <div className="mb-8 text-center sm:text-left">
            <h3 className="font-display text-2xl font-bold text-[var(--heading)]">
              Resources &amp; Real-World Guides
            </h3>
            <p className="mt-1 text-base text-[var(--ink-2)]">
              Explore step-by-step documentation, business templates, and industry playbooks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {resourceCards.map((res, i) => (
              <Reveal key={res.title} delay={i * 0.08} className="flex">
                <Link
                  href={res.href}
                  className="group flex flex-col justify-between w-full rounded-[28px] border border-line bg-[var(--surface)] p-7 shadow-[var(--shadow-1)] transition-all duration-300 hover:-translate-y-2 hover:border-[var(--accent-blue-200)] hover:shadow-[var(--shadow-2)] card-spotlight"
                >
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-line">
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
                        {res.badge}
                      </span>
                      <BookOpen className="size-4 text-[var(--ink-3)]" />
                    </div>

                    <h4 className="font-display mt-4 text-xl font-bold text-[var(--heading)] group-hover:text-[var(--primary)] transition-colors">
                      {res.title}
                    </h4>

                    <p className="mt-2 text-sm text-[var(--ink-2)] leading-relaxed">
                      {res.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-line flex items-center justify-between text-sm font-bold text-[var(--primary)]">
                    <span>Read Guide</span>
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>

      {/* Wave ending transitioning into Modules (dark) (§4) */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none">
        <WaveDivider to="dark" shape="B" />
      </div>
    </section>
  )
}
