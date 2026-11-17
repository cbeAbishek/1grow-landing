'use client'

import React from 'react'
import { Container } from '@/components/layout/container'
import { ReferenceWave } from '@/components/layout/reference-wave'
import { WhyUsBento } from './why-choose-us/WhyUsBento'

export function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      data-band="light"
      aria-labelledby="why-choose-heading"
      className="relative scroll-mt-24 pt-24 pb-52 sm:pt-28 sm:pb-60 lg:pb-72 overflow-x-clip transition-colors duration-300"
      style={{
        backgroundColor: 'var(--whyus-bg, #eff9f1)',
      }}
    >
      {/* Background Decor: Soft Static Flat Blooms + 24px Dot Grid (§6.7) */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        {/* Top-left soft green bloom */}
        <div
          className="absolute -top-24 -left-24 size-[520px] rounded-full opacity-60"
          style={{ background: 'var(--whyus-blob-green, #dcf1e1)' }}
        />
        {/* Bottom-right mint bloom */}
        <div
          className="absolute bottom-24 -right-24 size-[580px] rounded-full opacity-50"
          style={{ background: 'var(--whyus-blob-mint, #e2f7ea)' }}
        />
        {/* Faint 24px dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(currentColor 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <Container className="relative z-10 max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Section Header with Eyebrow, H2, Sparkles, and Lead (§6.1, §6.7) */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40 shadow-xs mb-4">
            WHY CHOOSE US
          </div>

          {/* Heading with Decorative Sparkles */}
          <div className="relative inline-block text-center">
            {/* Left Sparkle */}
            <svg
              viewBox="0 0 24 24"
              fill="#10b981"
              className="absolute -top-4 -left-7 size-5 sm:size-6 opacity-75 hidden sm:block"
              aria-hidden="true"
            >
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>

            <h2
              id="why-choose-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--heading)] leading-[1.14] text-balance"
              style={{
                fontSize: 'clamp(2.25rem, 1.6rem + 2.8vw, 3.75rem)',
              }}
            >
              Why academies choose 1Grow
            </h2>

            {/* Right Sparkle & Squiggle */}
            <svg
              viewBox="0 0 24 24"
              fill="#f59e0b"
              className="absolute -top-3 -right-8 size-5 sm:size-6 opacity-75 hidden sm:block"
              aria-hidden="true"
            >
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </div>

          {/* Lead Paragraph */}
          <p className="mt-4 text-base sm:text-lg text-[var(--ink-2)] leading-relaxed text-balance">
            Built by people who know the academy and event business inside out. 1Grow helps you save
            time, eliminate double-bookings, and scale multi-branch operations with institutional clarity.{' '}
            <strong className="text-[var(--heading)] font-semibold">Here is why owners pick us.</strong>
          </p>
        </div>

        {/* Asymmetric 4-Card Bento Grid with In-Place View-More Swap (§6.2, §6.5) */}
        <WhyUsBento />
      </Container>

      {/* Reference 3-Layer Static Wave Transitioning into Pricing (Sand) (§5, §6.7) */}
      <ReferenceWave
        colors={[
          'var(--wave-whyus-end-1)',
          'var(--wave-whyus-end-2)',
          'var(--wave-whyus-end-3)',
        ]}
      />
    </section>
  )
}
