'use client'

import React, { useState } from 'react'
import { Container } from '@/components/layout/container'
import { faqs } from '@/content/landing'
import { FaqHelpCard } from './faq/FaqHelpCard'
import { FaqAccordionItem } from './faq/FaqAccordionItem'

export function Faq() {
  // Preserving single-open mode with default-open item 0 verbatim (§8.1)
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx))
  }

  return (
    <section
      id="faq"
      data-band="tint"
      aria-labelledby="faq-heading"
      className="relative scroll-mt-24 pt-24 pb-8 sm:pt-28 sm:pb-10 lg:pb-12 overflow-x-clip transition-colors duration-300"
      style={{
        backgroundColor: 'var(--faq-bg, #fff4ef)',
      }}
    >
      {/* Background Decor: Soft Static Flat Blooms + Dot Grid (§8.2) */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        {/* Top-right soft peach bloom */}
        <div
          className="absolute -top-24 -right-24 size-[540px] rounded-full opacity-60"
          style={{ background: 'var(--faq-blob-peach, #ffe8df)' }}
        />
        {/* Bottom-left soft lavender bloom */}
        <div
          className="absolute bottom-24 -left-24 size-[580px] rounded-full opacity-50"
          style={{ background: 'var(--faq-blob-lavender, #f6eefe)' }}
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
        {/* 12-Column Help Desk Layout (§8.1, §8.3) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left 5 Columns: Sticky Help Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
            <FaqHelpCard totalQuestions={faqs.length} />
          </div>

          {/* Right 7 Columns: Individual Accordion Card Stack */}
          <div className="lg:col-span-7">
            <ul className="flex flex-col gap-3.5 list-none p-0 m-0">
              {faqs.map((faq, i) => (
                <FaqAccordionItem
                  key={faq.question}
                  faq={faq}
                  index={i}
                  isOpen={openIndex === i}
                  onToggle={() => toggle(i)}
                />
              ))}
            </ul>
          </div>
        </div>

        {/* Orange Dotted Divider transitioning into CTA (§ Change 2) */}
        <div
          className="mt-14 sm:mt-18 lg:mt-20 flex items-center justify-center select-none"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 360 8"
            fill="none"
            className="w-full max-w-[280px] sm:max-w-[340px] h-2 text-[#ea580c] select-none pointer-events-none"
          >
            {[...Array(15)].map((_, i) => (
              <circle key={i} cx={12 + i * 24} cy="4" r="3.5" fill="currentColor" />
            ))}
          </svg>
        </div>
      </Container>
    </section>
  )
}
