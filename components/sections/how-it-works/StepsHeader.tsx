'use client'

import React from 'react'

export function StepsHeader() {
  return (
    <header className="text-center mx-auto max-w-[1000px] mb-14 sm:mb-20 px-4">
      {/* Eyebrow Pill */}
      <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#fff3e6] dark:bg-[rgba(255,122,0,0.15)] text-[#ea580c] border border-[#ea580c]/25 shadow-xs mb-4 sm:mb-5">
        How It Works
      </div>

      {/* Two-Line H2 at >= 1100px */}
      <h2
        id="how-it-works-heading"
        className="font-display font-bold text-[#1b1630] dark:text-white tracking-tight leading-[1.18] text-[clamp(2.25rem,1.4rem+3vw,3.75rem)] text-balance mx-auto max-w-[960px]"
      >
        From sign-up to live operations in five simple steps
      </h2>

      {/* Centred Lead Paragraph */}
      <p className="mt-5 sm:mt-6 text-[17px] sm:text-[19px] leading-[27px] sm:leading-[30px] text-[#5a5370] dark:text-zinc-300 max-w-[820px] mx-auto text-balance">
        Getting started with 1Grow takes minutes. Follow this step-by-step process to move from setup to automated daily operations without technical complexity.
      </p>
    </header>
  )
}
