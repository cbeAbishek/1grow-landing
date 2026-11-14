'use client'

import React from 'react'
import { HeroHeadline } from './HeroHeadline'
import { ShowcasePanel } from './ShowcasePanel'
import { ModuleMarquee } from './ModuleMarquee'
import { WaveDivider } from '@/components/ui/WaveDivider'

export function HeroShell() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-clip isolate"
      style={{
        background:
          'linear-gradient(180deg, var(--hero-grad-top, #eaf5fe) 0%, var(--hero-grad-mid, #dcecfd) 55%, var(--hero-grad-bottom, #cfe4fb) 100%)',
        paddingTop: 'calc(var(--nav-top, 16px) + var(--nav-h, 64px) + 56px)',
      }}
    >
      {/* 3 Blurred Drifting Ambient Glow Blobs (§8.1) */}
      <div
        className="pointer-events-none absolute -top-12 -left-20 size-[480px] rounded-full bg-[#1b96ff]/30 blur-[90px] blob-drift -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 -right-24 size-[520px] rounded-full bg-[#7526e3]/18 blur-[95px] blob-drift-delay -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-44 left-1/4 size-[420px] rounded-full bg-[#f59e0b]/16 blur-[90px] blob-drift -z-10"
        aria-hidden="true"
      />

      {/* Hero Headline & Primary CTA (§4) */}
      <HeroHeadline />

      {/* Interactive 6-Tab Product Showcase Card with Floating 3D Stickers (§5, §6) */}
      <ShowcasePanel />

      {/* Infinite Capability Loop Band (§7) */}
      <ModuleMarquee />

      {/* Large Organic 3-Layer Wave Transition into Platform Section (§8.2) */}
      <div className="w-full pointer-events-none -mt-4 sm:-mt-8">
        <WaveDivider variant="A" nextSectionBg="var(--platform-bg, #f4f9ff)" />
      </div>
    </section>
  )
}
