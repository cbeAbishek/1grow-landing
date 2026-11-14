'use client'

import React from 'react'
import Link from 'next/link'
import {
  GraduationCap,
  Package,
  PartyPopper,
  CreditCard,
  BarChart3,
  ArrowRight,
} from 'lucide-react'
import { Container } from '@/components/layout/container'
import { SectionHead } from '@/components/layout/section-head'
import { Reveal } from '@/components/motion/reveal'
import { WaveDivider } from '@/components/layout/wave-divider'
import { platformTiles } from '@/content/landing'

const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  Package,
  PartyPopper,
  CreditCard,
  BarChart3,
}

// Accent fills per §5 and §3
const tileAccents: Record<string, string> = {
  training: '#8b5cf6', // Purple
  rental: '#ff6b00',   // Vibrant Orange
  event: '#f43f5e',    // Coral
  billing: '#16a34a',  // Green
  analytics: '#0891b2',// Cyan
}

export function PlatformTiles() {
  return (
    <section
      data-band="dark"
      className="relative overflow-hidden pt-24 pb-32 sm:pt-28 sm:pb-36 text-white"
      style={{
        background: 'var(--bg-dark-band)',
      }}
    >
      {/* Radial glow highlight + faint dot grid overlay (§5, §7.6) */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(55% 50% at 50% 10%, rgba(255,107,0,0.28), transparent 75%), radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px) 0 0/28px 28px',
        }}
      />

      <Container>
        <SectionHead
          eyebrow="The Platform"
          title={<span className="text-white font-bold">One platform. Three businesses. Zero spreadsheets.</span>}
          lead={<span className="text-white/85">Everything your academy, rental inventory, and event operations need — built together with automated billing, WhatsApp notifications, and executive reporting.</span>}
          className="text-white"
        />

        {/* 5 Glass Product Tiles in responsive stretch grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch">
          {platformTiles.map((tile, i) => {
            const Icon = iconMap[tile.icon] || Package
            const accent = tileAccents[tile.id] || tile.accent || '#7526e3'
            return (
              <Reveal
                key={tile.id}
                delay={i * 0.08}
                className="flex"
              >
                <Link
                  href={tile.href}
                  className="tile group relative flex flex-col justify-between w-full min-h-[260px] p-7 rounded-[36px] border-2 border-white/12 bg-white/6 transition-all duration-200 focus-visible:outline-4 focus-visible:outline-white"
                  style={
                    {
                      '--tile-accent': accent,
                    } as React.CSSProperties
                  }
                  aria-label={`Explore ${tile.title || tile.name}`}
                >
                  <div>
                    {/* 56px Icon Squircle (§5) */}
                    <div className="grid size-14 place-items-center rounded-2xl bg-white/12 text-white transition-transform duration-200 group-hover:scale-105">
                      <Icon className="size-7" aria-hidden="true" />
                    </div>

                    {/* Title 28px Outfit 600 (§2, §5) */}
                    <h3 className="font-display mt-6 text-[26px] sm:text-[28px] font-semibold text-white leading-tight">
                      {tile.name}
                    </h3>

                    {/* Full Description — NO LINE CLAMP (§1.5, §5) */}
                    <p className="mt-3 text-[16px] text-white/85 leading-relaxed">
                      {tile.desc}
                    </p>
                  </div>

                  {/* Bottom Link Action */}
                  <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between text-base font-bold text-white">
                    <span>Explore</span>
                    <ArrowRight
                      className="size-5 tile-arrow"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </Container>

      {/* Wave ending transitioning back to Light (§4) */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none">
        <WaveDivider to="light" shape="A" />
      </div>
    </section>
  )
}
