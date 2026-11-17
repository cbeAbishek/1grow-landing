'use client'

import React from 'react'
import { Container } from '@/components/layout/container'
import { ReferenceWave } from '@/components/layout/reference-wave'
import { industries } from '@/content/landing'
import { IndustryStage } from '@/components/landing/industry/IndustryStage'
import { SymbolSparkle } from '@/components/landing/hero/symbols/SymbolSet'

/**
 * Flag controlling whether Section 3 ends with the 3-layer reference wave (§2, §8.2)
 * When false, the bottom wave is omitted and Section 4's top blend alone provides the transition.
 */
export const INDUSTRY_END_WAVE = true

function HeaderBurst({ className }: { className?: string }) {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M8 36L4 40"
        stroke="#ea580c"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M16 28L30 14"
        stroke="#ff7a00"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M34 10L40 4"
        stroke="#ea580c"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function WhoIsThisFor() {
  return (
    <section
      id="industries"
      data-band="sand"
      aria-labelledby="industries-heading"
      className="relative scroll-mt-24 pt-16 sm:pt-20 pb-[clamp(96px,14vw,240px)] bg-[var(--t-sand-bg,#fdf8f1)] overflow-x-clip transition-colors duration-300"
    >
      {/* Decorative Background Blobs matching reference (§5.1) */}
      <div
        className="absolute top-20 -left-20 w-72 h-72 rounded-full bg-[var(--ind-blob-lavender,#e8e0fd)] opacity-50 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-32 -right-20 w-80 h-80 rounded-full bg-[var(--ind-blob-peach,#fed7aa)] opacity-45 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Decorative Sparkles & Bursts */}
      <div
        className="absolute top-16 left-8 sm:left-20 pointer-events-none text-orange-400 opacity-75"
        aria-hidden="true"
      >
        <SymbolSparkle size={32} />
      </div>
      <div
        className="absolute top-14 right-8 sm:right-24 pointer-events-none opacity-85"
        aria-hidden="true"
      >
        <HeaderBurst />
      </div>

      <Container className="relative z-10">
        {/* Header Block (Normal Flow, NOT Pinned §5.1, tightened spacing §7.2.5) */}
        <header className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-[var(--ind-orange-soft,#fff3e6)] text-[#ea580c] border border-[#ea580c]/25 shadow-xs mb-4">
            INDUSTRY SOLUTIONS
          </div>

          <h2
            id="industries-heading"
            className="font-display text-3xl sm:text-4xl lg:text-[52px] font-bold text-[var(--ind-ink,#1a1820)] dark:text-white tracking-tight leading-[1.12]"
          >
            Built for your industry
          </h2>

          <p className="mt-4 text-[16px] sm:text-[18px] leading-[26px] sm:leading-[28px] text-[var(--ind-ink-2,#5a5360)] dark:text-zinc-300">
            1Grow works for training academies, rental firms, and event planners across India.
            Each industry gets custom workflows, reports, and tools designed for your business type.{' '}
            <strong className="text-[var(--ind-ink,#1a1820)] dark:text-white font-semibold">
              Pick your industry below to see how 1Grow helps.
            </strong>
          </p>
        </header>
      </Container>

      {/* Scroll-Scrubbed Stage: Always renders all 10 industries in data order (§5.1).
          Filter tabs and filter swap logic removed completely. */}
      <div className="relative w-full">
        <IndustryStage
          industries={industries}
          caption="Pick your industry below to see how 1Grow helps."
        />
      </div>

      {/* Section 3 -> Section 5 Reference 3-Layer Static Wave */}
      {INDUSTRY_END_WAVE && (
        <ReferenceWave
          colors={[
            'var(--wave-ref-bottom-1)',
            'var(--wave-ref-bottom-2)',
            'var(--wave-ref-bottom-3, #fff2f5)',
          ]}
        />
      )}
    </section>
  )
}
