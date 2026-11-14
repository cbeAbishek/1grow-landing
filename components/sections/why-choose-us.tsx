'use client'

import React from 'react'
import {
  Users,
  Wallet,
  Bell,
  BarChart3,
  ShieldCheck,
  Layers,
  HeadphonesIcon,
  Check,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { Container } from '@/components/layout/container'
import { SectionHead } from '@/components/layout/section-head'
import { Reveal } from '@/components/motion/reveal'
import { WaveDivider } from '@/components/layout/wave-divider'
import { reasons } from '@/content/landing'
import { cn } from '@/lib/utils'

const iconMap: Record<string, React.ElementType> = {
  Users,
  Wallet,
  Bell,
  BarChart3,
  ShieldCheck,
  Layers,
  HeadphonesIcon,
  Check,
}

const accentCycles = [
  'card-accent-blue',
  'card-accent-orange',
  'card-accent-coral',
  'card-accent-teal',
  'card-accent-green',
  'card-accent-purple',
]

export function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      data-band="light"
      aria-labelledby="why-choose-heading"
      className="relative scroll-mt-24 pt-24 pb-36 sm:pt-28 sm:pb-44 bg-[var(--bg)]"
    >
      <Container>
        <SectionHead
          id="why-choose-heading"
          eyebrow="Why Choose Us"
          title="Why academies choose 1Grow"
          lead={
            <>
              Built by people who know the academy and event business inside out. 1Grow helps you save
              time, eliminate double-bookings, and scale multi-branch operations with institutional clarity.{' '}
              <strong className="text-[var(--heading)] font-semibold">Here is why owners pick us.</strong>
            </>
          }
        />

        {/* 8-Card Grid with Featured First Card (§5, §6) */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {reasons.map((reason, i) => {
            const Icon = iconMap[reason.icon] || Users
            const isFeatured = reason.featured
            const accentClass = accentCycles[i % accentCycles.length]

            return (
              <Reveal
                key={reason.title}
                delay={i * 0.06}
                className={isFeatured ? 'sm:col-span-2 lg:col-span-2 flex' : 'flex'}
              >
                <div
                  className={cn(
                    'accent-card group relative flex flex-col justify-between w-full rounded-[28px] p-8 card-spotlight',
                    accentClass,
                  )}
                >
                  <div className="dec-circle" aria-hidden="true" />

                  {/* Top 3px Accent Bar */}
                  <span className="absolute top-0 left-0 right-0 h-[3.5px] bg-[var(--card-accent-icon)] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="icon-blob shadow-sm">
                        <Icon
                          className="size-7"
                          style={{ color: 'var(--card-accent-icon)' }}
                          aria-hidden="true"
                        />
                      </div>
                      {reason.microLabel && (
                        <span className="rounded-full bg-[var(--cloud-tint)] px-3 py-1 text-xs font-bold text-[var(--primary)] border border-[var(--accent-orange-200)]">
                          {reason.microLabel}
                        </span>
                      )}
                    </div>

                    <h3
                      className={cn(
                        'font-display font-bold text-[var(--heading)] group-hover:text-[var(--card-accent-icon)] transition-colors',
                        isFeatured ? 'text-2xl sm:text-3xl leading-snug' : 'text-xl leading-snug',
                      )}
                    >
                      {reason.title}
                    </h3>

                    <p className="mt-3 text-base text-[var(--ink-2)] leading-relaxed">
                      {reason.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[var(--ink-3)]">
                    <span>Institutional Reliability</span>
                    <Check className="size-4 text-[var(--success)] stroke-[3]" />
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>

      {/* Wave ending transitioning into Pricing (tint) (§4) */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none">
        <WaveDivider to="tint" shape="B" />
      </div>
    </section>
  )
}
