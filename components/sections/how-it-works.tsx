'use client'

import React from 'react'
import {
  UserPlus,
  Building2,
  LayoutGrid,
  Users,
  Rocket,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import { Container } from '@/components/layout/container'
import { SectionHead } from '@/components/layout/section-head'
import { Reveal } from '@/components/motion/reveal'
import { WaveDivider } from '@/components/layout/wave-divider'
import { steps } from '@/content/landing'
import { cn } from '@/lib/utils'

const stepIcons = [UserPlus, Building2, LayoutGrid, Users, Rocket]

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      data-band="light"
      aria-labelledby="how-it-works-heading"
      className="relative scroll-mt-24 pt-24 pb-36 sm:pt-28 sm:pb-44 bg-[var(--bg)]"
    >
      <Container>
        <SectionHead
          id="how-it-works-heading"
          eyebrow="How It Works"
          title="From sign-up to live operations in five simple steps"
          lead="Getting started with 1Grow takes minutes. Follow this step-by-step process to move from setup to automated daily operations without technical complexity."
        />

        {/* 5-Step Timeline Grid with Connecting Rail Line */}
        <div className="relative mt-16">
          <div
            aria-hidden="true"
            className="absolute top-8 left-16 right-16 hidden h-[3px] bg-gradient-to-r from-[var(--primary)] via-[#f43f5e] to-[#8b5cf6] lg:block opacity-40"
          />

          <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {steps.map((step, i) => {
              const Icon = stepIcons[i] || Rocket
              return (
                <Reveal key={step.number} delay={i * 0.09} as="li" className="h-full flex">
                  <div className="group relative flex h-full flex-col justify-between w-full rounded-[28px] border border-line bg-[var(--surface)] p-7 shadow-[var(--shadow-1)] transition-all duration-300 hover:-translate-y-2 hover:border-[var(--accent-orange-200)] hover:shadow-[var(--shadow-2)] card-spotlight">
                    <div>
                      {/* Node circle on top */}
                      <div className="flex items-center justify-between pb-5 border-b border-line/60">
                        <div className="relative z-10 grid size-14 place-items-center rounded-2xl bg-[var(--cloud-tint)] text-[var(--primary)] font-display text-xl font-bold shadow-xs group-hover:bg-[var(--primary)] group-hover:text-white transition-colors duration-300">
                          {step.number}
                        </div>
                        <div className="grid size-10 place-items-center rounded-xl bg-[var(--surface-tint)] text-[var(--primary)]">
                          <Icon className="size-5" aria-hidden="true" />
                        </div>
                      </div>

                      {/* Step Title & Description */}
                      <div className="mt-5">
                        <h3 className="font-display text-xl font-bold text-[var(--heading)] group-hover:text-[var(--primary)] transition-colors">
                          {step.title}
                        </h3>
                        <p className="mt-2.5 text-base text-[var(--ink-2)] leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Micro UI visual badge */}
                    <div className="mt-6 pt-4 border-t border-line/50">
                      <div className="inline-flex items-center gap-2 rounded-full bg-[var(--cloud-tint)] px-3 py-1 text-xs font-semibold text-[var(--primary)]">
                        <span className="size-1.5 rounded-full bg-[var(--success)]" />
                        <span>{step.visual}</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </ol>
        </div>
      </Container>

      {/* Wave ending transitioning into Features Overview (tint) (§4) */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none">
        <WaveDivider to="tint" shape="C" />
      </div>
    </section>
  )
}
