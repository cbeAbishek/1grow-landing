'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, MessageSquare, ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { Reveal } from '@/components/motion/reveal'
import { WaveDivider } from '@/components/layout/wave-divider'
import { faqs } from '@/content/landing'
import { cn } from '@/lib/utils'

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx))
  }

  return (
    <section
      id="faq"
      data-band="tint"
      aria-labelledby="faq-heading"
      className="relative scroll-mt-24 pt-24 pb-36 sm:pt-28 sm:pb-44 bg-[var(--bg-tint)]"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Sticky Heading Block */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <span className="eyebrow inline-flex items-center gap-2 font-body text-sm font-bold uppercase tracking-wider text-[var(--primary)] bg-[var(--cloud-tint)] px-4 py-1.5 rounded-full border border-[var(--accent-orange-200)] mb-4">
              FAQ
            </span>
            <h2
              id="faq-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--heading)] leading-tight text-balance"
            >
              Frequently asked questions
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[var(--ink-2)] leading-relaxed">
              Everything you need to know about 1Grow before getting started. Can&apos;t find what you&apos;re looking for?
            </p>

            <div className="mt-8 pt-6 border-t border-line/70">
              <p className="text-base font-bold text-[var(--heading)] mb-2">Have a specific question?</p>
              <a
                href="https://wa.me/919566372450"
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow text-base font-semibold text-[var(--primary)]"
              >
                <MessageSquare className="size-4 mr-1 text-[var(--success)]" />
                Still stuck? Chat with us on WhatsApp &rarr;
              </a>
            </div>
          </div>

          {/* Right Column: Salesforce Style Accordion List (§6, §7.16) */}
          <div className="lg:col-span-7">
            <Reveal direction="scale">
              <div className="rounded-[28px] border border-line bg-[var(--surface)] shadow-[var(--shadow-2)] overflow-hidden divide-y divide-line">
                {faqs.map((faq, i) => {
                  const isOpen = openIndex === i
                  return (
                    <div
                      key={faq.question}
                      className={cn(
                        'relative transition-colors duration-200',
                        isOpen ? 'bg-[var(--surface)]' : 'hover:bg-[var(--cloud-tint)]',
                      )}
                    >
                      {/* Left 4px Accent Bar on Open */}
                      {isOpen && (
                        <span className="absolute left-0 top-0 bottom-0 w-[4px] bg-[var(--primary)]" />
                      )}

                      <button
                        type="button"
                        onClick={() => toggle(i)}
                        className="flex w-full items-center justify-between gap-4 p-6 sm:p-7 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--primary)] group"
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${i}`}
                      >
                        <span
                          className={cn(
                            'font-display text-lg sm:text-xl font-bold transition-colors duration-150 pr-4',
                            isOpen
                              ? 'text-[var(--primary)]'
                              : 'text-[var(--heading)] group-hover:text-[var(--primary)]',
                          )}
                        >
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={cn(
                            'size-5 shrink-0 text-[var(--ink-3)] transition-transform duration-250',
                            isOpen && 'rotate-180 text-[var(--primary)]',
                          )}
                          aria-hidden="true"
                        />
                      </button>

                      {isOpen && (
                        <div
                          id={`faq-answer-${i}`}
                          className="px-6 pb-6 sm:px-7 sm:pb-7 text-base text-[var(--ink-2)] leading-relaxed border-t border-line/40 pt-4"
                        >
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>

      {/* Wave ending transitioning into Dark Final CTA (§4) */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none">
        <WaveDivider to="dark" shape="B" />
      </div>
    </section>
  )
}
