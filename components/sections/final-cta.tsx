'use client'

import React from 'react'
import { Heart, MessageSquare } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { ActionButton } from '@/components/ui/action-button'
import { Reveal } from '@/components/motion/reveal'
import { WaveDivider } from '@/components/layout/wave-divider'
import { finalCtaData } from '@/content/landing'

export function FinalCta() {
  return (
    <section
      id="contact"
      data-band="dark"
      className="relative scroll-mt-24 pt-24 pb-36 sm:pt-28 sm:pb-44 text-center text-white overflow-hidden"
      style={{
        background: 'var(--bg-dark-band)',
      }}
    >
      {/* Ambient Blurred Floating Orbs */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute -top-24 -left-24 size-80 rounded-full blur-[85px] opacity-40 blob-drift"
          style={{ background: '#ff6b00' }}
        />
        <div
          className="absolute -bottom-24 -right-24 size-96 rounded-full blur-[90px] opacity-35 blob-drift-delay"
          style={{ background: '#f43f5e' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[420px] rounded-full blur-[100px] opacity-20 blob-drift"
          style={{ background: '#8b5cf6' }}
        />
      </div>

      <Container>
        <Reveal direction="scale" className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-orange-200 mb-6">
            Institutional Automation
          </span>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight text-balance">
            {finalCtaData.heading}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-white/85">
            {finalCtaData.lead}
          </p>

          {/* Action Button Pair: 56px Pill CTA + Secondary on Dark (§1, §2, §5) */}
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
              variant="secondary-dark"
              icon={<MessageSquare className="size-5 text-emerald-400" aria-hidden="true" />}
              aria-label="Talk to 1Grow on WhatsApp"
            >
              {finalCtaData.secondaryCta}
            </ActionButton>
          </div>

          <p className="mt-6 text-sm text-white/70">
            Free 20-day trial · No credit card required · Instant setup in minutes
          </p>
        </Reveal>
      </Container>

      {/* Wave ending transitioning into Footer (light) (§4) */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none">
        <WaveDivider to="light" shape="A" />
      </div>
    </section>
  )
}
