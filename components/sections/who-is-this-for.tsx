'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  GraduationCap,
  Music,
  Waves,
  Swords,
  Heart,
  BookOpen,
  Package,
  PartyPopper,
  CalendarHeart,
  Camera,
  ArrowRight,
} from 'lucide-react'
import { Container } from '@/components/layout/container'
import { SectionHead } from '@/components/layout/section-head'
import { Reveal } from '@/components/motion/reveal'
import { WaveDivider } from '@/components/layout/wave-divider'
import { industries } from '@/content/landing'
import { cn } from '@/lib/utils'

const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  Music,
  Waves,
  Swords,
  Heart,
  BookOpen,
  Package,
  PartyPopper,
  CalendarHeart,
  Camera,
}

const accentCycles = [
  'card-accent-blue',
  'card-accent-orange',
  'card-accent-coral',
  'card-accent-teal',
  'card-accent-green',
  'card-accent-purple',
]

type CategoryFilter = 'all' | 'training' | 'rental' | 'event'

export function WhoIsThisFor() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all')

  const filteredIndustries =
    activeFilter === 'all'
      ? industries
      : industries.filter((ind) => ind.category === activeFilter)

  return (
    <section
      id="industries"
      data-band="light"
      aria-labelledby="industries-heading"
      className="relative scroll-mt-24 pt-24 pb-36 sm:pt-28 sm:pb-44 bg-[var(--bg)]"
    >
      <Container>
        <SectionHead
          id="industries-heading"
          eyebrow="Industry Solutions"
          title="Built for your industry"
          lead={
            <>
              1Grow works for training academies, rental firms, and event planners across India.
              Each industry gets custom workflows, reports, and tools designed for your business type.{' '}
              <strong className="text-[var(--heading)] font-semibold">
                Pick your industry below to see how 1Grow helps.
              </strong>
            </>
          }
        />

        {/* Filter Segmented Control */}
        <div className="flex justify-center mb-12" role="tablist" aria-label="Filter industry solutions">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-[var(--surface-2)] p-1.5 shadow-xs">
            {(
              [
                { id: 'all', label: 'All Solutions' },
                { id: 'training', label: 'Training Institutes' },
                { id: 'rental', label: 'Rental Businesses' },
                { id: 'event', label: 'Event Companies' },
              ] as const
            ).map((filter) => {
              const isActive = activeFilter === filter.id
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  role="tab"
                  aria-selected={isActive}
                  className={cn(
                    'h-10 px-5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--primary)]',
                    isActive
                      ? 'bg-[var(--primary)] text-white shadow-sm'
                      : 'text-[var(--ink-2)] hover:text-[var(--heading)] hover:bg-[var(--surface)]',
                  )}
                >
                  {filter.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* 10 Industry Cards in 2/3 column layout with accent colors (§3, §5, §6) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch">
          {filteredIndustries.map((ind, idx) => {
            const IconComponent = iconMap[ind.icon] || Package
            const accentClass = accentCycles[idx % accentCycles.length]

            return (
              <Reveal key={ind.id} delay={(idx % 3) * 0.08} className="flex">
                <div
                  className={cn(
                    'accent-card group flex flex-col justify-between w-full p-8 rounded-[28px] card-spotlight',
                    accentClass,
                  )}
                >
                  {/* Decorative soft bleeding corner circle (§5) */}
                  <div className="dec-circle" aria-hidden="true" />

                  <div>
                    {/* 64px Squircle with wiggle hover (§5, §6) */}
                    <div className="icon-blob mb-6 shadow-sm">
                      <IconComponent
                        className="size-7"
                        style={{ color: 'var(--card-accent-icon)' }}
                        aria-hidden="true"
                      />
                    </div>

                    {/* Title 24px Outfit 600 */}
                    <h3 className="font-display text-[24px] font-semibold text-[var(--heading)] leading-tight">
                      {ind.name}
                    </h3>

                    {/* Description 17px/28px — NO LINE CLAMP */}
                    <p className="mt-3 text-[17px] leading-[28px] text-[var(--ink-2)]">
                      {ind.description}
                    </p>
                  </div>

                  {/* Learn More link with sliding arrow */}
                  <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/10">
                    <Link
                      href={ind.href}
                      className="link-arrow text-[16px] font-bold"
                      style={{ color: 'var(--card-accent-icon)' }}
                      aria-label={`Learn more about 1Grow for ${ind.name}`}
                    >
                      <span>Learn more</span>
                      <ArrowRight className="size-4.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>

      {/* Wave ending transitioning into Problems section (tint) (§4) */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none">
        <WaveDivider to="tint" shape="B" />
      </div>
    </section>
  )
}
