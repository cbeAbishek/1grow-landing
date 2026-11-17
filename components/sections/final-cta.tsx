'use client'

import React from 'react'
import { Heart, MessageSquare } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { ActionButton } from '@/components/ui/action-button'
import { Reveal } from '@/components/motion/reveal'
import { ReferenceWave } from '@/components/layout/reference-wave'
import { finalCtaData } from '@/content/landing'

export function FinalCta() {
  return (
    <section
      id="contact"
      data-band="tint"
      className="relative scroll-mt-24 pt-8 pb-52 sm:pt-10 sm:pb-60 lg:pt-12 lg:pb-72 text-center overflow-x-clip transition-colors duration-300"
      style={{
        backgroundColor: 'var(--faq-bg, #fff4ef)',
      }}
    >
      {/* Background Decor: Soft Static Flat Blooms + Dot Grid */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        {/* Top-left soft peach bloom */}
        <div
          className="absolute -top-24 -left-24 size-[520px] rounded-full opacity-60"
          style={{ background: 'var(--faq-blob-peach, #ffe8df)' }}
        />
        {/* Bottom-right soft lavender bloom */}
        <div
          className="absolute bottom-24 -right-24 size-[560px] rounded-full opacity-50"
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

      <Container>
        <Reveal direction="scale" className="relative z-10 max-w-3xl mx-auto">
          {/* Eyebrow Pill */}
          <span className="inline-block rounded-full border border-[#ea580c]/25 bg-[#fff0ea] dark:bg-orange-950/60 px-4 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#ea580c] dark:text-orange-300 mb-6">
            Institutional Automation
          </span>

          {/* Heading */}
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--heading)] leading-tight text-balance">
            {finalCtaData.heading}
          </h2>

          {/* Lead */}
          <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-[var(--ink-2)]">
            {finalCtaData.lead}
          </p>

          {/* Action Button Pair: 56px Pill CTA + Secondary */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <ActionButton
              href="/wishlist"
              variant="pill"
              icon={<Heart className="size-5 fill-white/20" aria-hidden="true" />}
              aria-label="Join early access wishlist"
            >
              {finalCtaData.primaryCta}
            </ActionButton>

            <ActionButton
              href={finalCtaData.whatsappUrl}
              variant="secondary"
              icon={<MessageSquare className="size-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />}
              aria-label="Talk to 1Grow on WhatsApp"
            >
              {finalCtaData.secondaryCta}
            </ActionButton>
          </div>

          <p className="mt-6 text-sm text-[var(--ink-3)] font-medium">
            Free 20-day trial · No credit card required · Instant setup in minutes
          </p>
        </Reveal>
      </Container>

      {/* Reference 3-Layer Static Wave Transitioning into Footer (Sand) */}
      <ReferenceWave
        colors={[
          'var(--wave-finalcta-end-1)',
          'var(--wave-finalcta-end-2)',
          'var(--wave-finalcta-end-3)',
        ]}
      />
    </section>
  )
}
