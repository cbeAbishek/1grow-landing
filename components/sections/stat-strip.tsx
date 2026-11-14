'use client'

import React from 'react'
import { Container } from '@/components/layout/container'
import { Counter } from '@/components/motion/counter'
import { Reveal } from '@/components/motion/reveal'
import { statItems } from '@/content/landing'

export function StatStrip() {
  return (
    <section
      data-band="light"
      className="relative border-y border-line bg-[var(--bg)] py-16 sm:py-20"
      aria-label="Verified platform metrics"
    >
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center divide-y sm:divide-y-0 sm:divide-x divide-line/70">
          {statItems.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08} className="pt-6 sm:pt-0 sm:px-4">
              <div className="flex flex-col items-center">
                <p className="font-display text-[clamp(2.75rem,2rem+4vw,5rem)] font-bold tracking-tight text-[var(--primary)] leading-tight">
                  <Counter
                    value={item.value}
                    prefix={item.prefix}
                    suffix={item.suffix}
                  />
                </p>
                <p className="mt-3 text-base sm:text-lg font-semibold text-[var(--ink-2)] max-w-[240px] leading-snug">
                  {item.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
