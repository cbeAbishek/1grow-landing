'use client'

import React from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface FaqItemData {
  question: string
  answer: string
  link?: string
  linkText?: string
}

interface FaqAccordionItemProps {
  faq: FaqItemData
  index: number
  isOpen: boolean
  onToggle: () => void
}

// Morphing Plus / Minus Icon Component (§8.3, §8.4)
function MorphingPlusMinus({
  isOpen,
  shouldReduceMotion,
}: {
  isOpen: boolean
  shouldReduceMotion: boolean | null
}) {
  return (
    <div
      className={cn(
        'grid size-9 place-items-center rounded-full shrink-0 transition-all duration-300',
        isOpen
          ? 'bg-[#ff7a00] text-white shadow-[0_4px_12px_rgba(255,122,0,0.35)] rotate-180'
          : 'bg-[#fff0e8] dark:bg-white/10 text-[#ea580c] dark:text-orange-300 group-hover:bg-[#ffe3d6] group-hover:rotate-45'
      )}
      style={
        shouldReduceMotion
          ? { transform: 'none', transition: 'background-color 150ms' }
          : undefined
      }
      aria-hidden="true"
    >
      <svg viewBox="0 0 20 20" fill="currentColor" className="size-4.5">
        {/* Horizontal bar */}
        <rect x="4" y="9" width="12" height="2" rx="1" />
        {/* Vertical bar: shrinks to scaleY 0 on open */}
        <motion.rect
          x="9"
          y="4"
          width="2"
          height="12"
          rx="1"
          animate={{ scaleY: isOpen ? 0 : 1 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          style={{ originX: '10px', originY: '10px' }}
        />
      </svg>
    </div>
  )
}

export function FaqAccordionItem({
  faq,
  index,
  isOpen,
  onToggle,
}: FaqAccordionItemProps) {
  const shouldReduceMotion = useReducedMotion()
  const formattedIndex = String(index + 1).padStart(2, '0')

  return (
    <motion.li
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.5,
        delay: shouldReduceMotion ? 0 : index * 0.04,
        ease: [0.2, 1, 0.25, 1],
      }}
      className={cn(
        'group relative rounded-[24px] border transition-all duration-300 overflow-hidden',
        isOpen
          ? 'bg-gradient-to-br from-white to-[#fff1ea] dark:from-white/[0.08] dark:to-orange-950/20 border-[#ff7a00]/40 shadow-[0_16px_36px_-6px_rgba(240,120,90,0.18)] dark:shadow-none'
          : 'bg-[var(--surface,white)] dark:bg-white/[0.04] border-[#f0785a]/15 dark:border-white/10 hover:border-[#f0785a]/35 shadow-[var(--shadow-1)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-2)]'
      )}
    >
      {/* 4px Left Accent Gradient Bar on Open (§8.4) */}
      <span
        className={cn(
          'absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-[#ff7a00] to-[#ff5e8a] origin-top transition-transform duration-300',
          isOpen ? 'scale-y-100' : 'scale-y-0'
        )}
        aria-hidden="true"
      />

      {/* Accordion Header Button */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0176d3]"
      >
        <div className="flex items-center gap-3.5 sm:gap-4 flex-1 pr-2">
          {/* 2-Digit Index Chip ("01"..."13") with pop on open (§8.4) */}
          <motion.span
            animate={isOpen ? { scale: [1, 1.15, 1] } : { scale: 1 }}
            transition={{ duration: 0.3 }}
            className={cn(
              'grid size-9 place-items-center rounded-[12px] font-display text-[13px] font-bold shrink-0 transition-colors duration-200',
              isOpen
                ? 'bg-[#ff7a00] text-white shadow-xs'
                : 'bg-[#fff0e8] dark:bg-white/10 text-[#ea580c] dark:text-orange-300'
            )}
          >
            {formattedIndex}
          </motion.span>

          {/* Question Text */}
          <span
            className={cn(
              'font-display text-base sm:text-[18px] font-semibold leading-[1.35] transition-colors duration-200',
              isOpen
                ? 'text-[#c2410c] dark:text-orange-300'
                : 'text-[var(--heading)] group-hover:text-[#c2410c] dark:group-hover:text-orange-300'
            )}
          >
            {faq.question}
          </span>
        </div>

        {/* Morphing Plus / Minus Icon */}
        <MorphingPlusMinus isOpen={isOpen} shouldReduceMotion={shouldReduceMotion} />
      </button>

      {/* Accordion Answer Panel using CSS Grid trick (§8.4) */}
      <div
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
        aria-hidden={!isOpen}
        style={{
          display: 'grid',
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          transition: shouldReduceMotion ? 'none' : 'grid-template-rows 300ms cubic-bezier(0.2, 1, 0.25, 1)',
        }}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-6 pt-1 sm:px-6 sm:pb-6 pl-[56px] sm:pl-[72px]">
            <p className="text-base text-[var(--ink-2)] leading-relaxed">
              {faq.answer}
            </p>

            {/* Optional link preserved verbatim from content */}
            {faq.link && faq.linkText && (
              <div className="mt-3.5 pt-3 border-t border-line/40">
                <Link
                  href={faq.link}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0176d3] hover:text-[#0b5cab] transition-colors"
                >
                  <span>{faq.linkText}</span>
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.li>
  )
}
