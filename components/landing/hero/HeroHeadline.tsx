'use client'

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Check, Heart } from 'lucide-react'
import Link from 'next/link'
import { heroData } from '@/content/landing'

export function HeroHeadline() {
  const { scrollY } = useScroll()
  // As user scrolls first 500px, translate y 0 -> -36px, opacity 1 -> 0.55 (§4.3)
  const y = useTransform(scrollY, [0, 500], [0, -36])
  const opacity = useTransform(scrollY, [0, 500], [1, 0.55])

  const words = ['Manage', 'your', 'entire', 'business', 'from']

  return (
    <motion.div
      style={{ y, opacity }}
      className="mx-auto max-w-[1240px] px-5 sm:px-8 text-center"
    >
      {/* H1 with SSR-split word spans for instant LCP safe reveal (§4.2) */}
      <h1
        id="hero-heading"
        aria-label="Manage your entire business from one platform"
        className="font-display pt-2 sm:pt-4 text-[clamp(3.25rem,1.2rem+6.2vw,6.25rem)] font-semibold tracking-[-0.03em] text-[var(--heading)] leading-[1.02] text-balance"
      >
        <span aria-hidden="true">
          {words.map((word, i) => (
            <React.Fragment key={word}>
              <span className="hw">
                <span className="hw-i" style={{ '--i': i } as React.CSSProperties}>
                  {word}
                </span>
              </span>{' '}
            </React.Fragment>
          ))}
          <span className="relative inline-block whitespace-nowrap">
            <span className="hl-wipe font-bold">one platform</span>
            {/* Hand-drawn SVG squiggle underline drawing in over 800ms (§4.2) */}
            <svg
              className="squiggle-draw absolute -bottom-3 left-0 w-full overflow-visible pointer-events-none"
              viewBox="0 0 320 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4 14 C 42 7.5, 82 7, 126 11.5 C 168 16, 212 16, 254 10 C 278 6.5, 298 7.5, 316 11"
                stroke="#f59e0b"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </span>
      </h1>

      {/* Lead Paragraph (20–22px / 32–34px) */}
      <p className="mx-auto mt-7 max-w-[720px] text-[20px] sm:text-[22px] leading-[34px] text-[var(--ink-2)] dark:text-zinc-300">
        {heroData.lead}
      </p>

      {/* Action Pair: 56px Pill CTAs in Unified Blue & Glass (§1, §2, §4.2) */}
      <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/wishlist"
          className="wishlist-pill-shine group inline-flex items-center justify-center gap-2.5 h-14 px-8 rounded-full bg-[#0176d3] text-white text-[18px] font-bold shadow-[0_12px_28px_-6px_rgba(1,118,211,0.5)] hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-6px_rgba(1,118,211,0.6)] active:scale-[0.98] transition-all duration-150"
          aria-label="Join early access wishlist"
        >
          <Heart className="size-5 fill-white/20" aria-hidden="true" />
          <span>{heroData.primaryCta}</span>
          <span className="size-2 rounded-full bg-white pulse-dot" />
        </Link>

        <a
          href="#how-it-works"
          className="inline-flex items-center justify-center h-14 px-8 rounded-full border border-[var(--glass-border,rgba(3,45,96,0.14))] bg-[var(--glass-bg,rgba(255,255,255,0.72))] backdrop-blur-md text-[18px] font-bold text-[var(--heading)] hover:bg-[rgba(1,118,211,0.08)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-150"
          aria-label="See how 1Grow works"
        >
          {heroData.secondaryCta}
        </a>
      </div>

      {/* Micro-Trust Row */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-8 text-sm sm:text-base font-semibold text-[var(--ink-2)] dark:text-zinc-300">
        {heroData.microTrust.map((item) => (
          <div key={item} className="inline-flex items-center gap-2">
            <span className="grid size-5 place-items-center rounded-full bg-emerald-500/15 text-[var(--success)]">
              <Check className="size-3.5 stroke-[3]" aria-hidden="true" />
            </span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
