'use client'

import React from 'react'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { SectionHead } from '@/components/layout/section-head'
import { ActionButton } from '@/components/ui/action-button'
import { Reveal } from '@/components/motion/reveal'
import { WaveDivider } from '@/components/layout/wave-divider'
import { plans } from '@/content/landing'
import { cn } from '@/lib/utils'

export function PricingPreview() {
  return (
    <section
      id="pricing"
      data-band="tint"
      aria-labelledby="pricing-heading"
      className="relative scroll-mt-24 pt-24 pb-36 sm:pt-28 sm:pb-44 bg-[var(--bg-tint)]"
    >
      <Container>
        <SectionHead
          id="pricing-heading"
          eyebrow="Transparent Investment"
          title="Simple, transparent pricing"
          lead="Start with a 20-day free trial. No credit card required. Pay only for what you use, and scale up smoothly as your students and branches expand."
        />

        {/* 3 Pricing Cards Grid (§1.8, §5, §6) */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-6">
          {plans.map((plan, i) => {
            const isFeatured = plan.highlight

            return (
              <Reveal
                key={plan.name}
                delay={i * 0.08}
                className={cn('flex flex-col h-full', isFeatured && 'md:-translate-y-2 z-10')}
              >
                <div
                  className={cn(
                    'group relative flex flex-col justify-between w-full h-full rounded-[36px] bg-[var(--surface)] p-8 sm:p-9 shadow-[var(--shadow-1)] transition-all duration-300 hover:shadow-[var(--shadow-3)] hover:-translate-y-2.5',
                    isFeatured
                      ? 'featured-pricing-card shadow-[var(--shadow-3)]'
                      : 'border-2 border-line',
                  )}
                >
                  {/* "Most Popular" Sticker with rotate(-2deg) (§5) */}
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 -rotate-2 rounded-full bg-[var(--primary)] px-5 py-1.5 text-xs font-bold text-white shadow-md uppercase tracking-wider border border-orange-300/40 z-20">
                      {plan.badge}
                    </div>
                  )}

                  {/* Card Content Top: Header, Price, Features with flex:1 to pin CTA (§1.8) */}
                  <div className="flex flex-col flex-1">
                    {/* Plan Header */}
                    <h3 className="font-display text-2xl font-bold text-[var(--heading)]">
                      {plan.name}
                    </h3>
                    <p className="mt-2 text-base text-[var(--ink-2)] min-h-[48px]">
                      {plan.description}
                    </p>

                    {/* Price Display: 64px Outfit 600 (§2, §5) */}
                    <div className="mt-6 flex items-baseline gap-1.5 pb-6 border-b border-line">
                      <span className="font-display text-[54px] sm:text-[64px] font-bold tracking-tight text-[var(--heading)] leading-none">
                        {plan.price}
                      </span>
                      <span className="text-base text-[var(--ink-3)] font-semibold">
                        {plan.period}
                      </span>
                    </div>

                    {/* Feature List (flex-1 ensures equal card height distribution) */}
                    <ul className="mt-6 space-y-4 text-base text-[var(--ink-2)] flex-1">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-3">
                          <span className="grid size-5.5 place-items-center rounded-full bg-emerald-500/15 text-[var(--success)] shrink-0 mt-0.5">
                            <Check className="size-3.5 stroke-[3]" aria-hidden="true" />
                          </span>
                          <span className="font-medium text-[var(--heading)]">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Full-width 56px Pill CTA pinned to bottom with nowrap arrow (§1.8) */}
                  <div className="mt-9 pt-4">
                    <ActionButton
                      href="/pricing"
                      variant={isFeatured ? 'primary' : 'secondary'}
                      className="w-full text-center justify-center inline-flex items-center gap-2 flex-nowrap whitespace-nowrap"
                      showArrow
                      aria-label={`Get started with ${plan.name}`}
                    >
                      Get started
                    </ActionButton>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>

      {/* Wave ending transitioning into StatStrip/Blogs (light) (§4) */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none">
        <WaveDivider to="light" shape="A" />
      </div>
    </section>
  )
}
