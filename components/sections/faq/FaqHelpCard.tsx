'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { MessageSquare, ArrowRight } from 'lucide-react'

interface FaqHelpCardProps {
  totalQuestions: number
  whatsappUrl?: string
}

// 3D Glossy Clay Question Mark Badge for Help Card Top-Right Corner
function ClayQuestionBadge({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-hidden="true"
      style={{ filter: 'drop-shadow(0 12px 20px rgba(240,120,90,0.35))' }}
    >
      <defs>
        <linearGradient id="faq-qb-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff9a57" />
          <stop offset="100%" stopColor="#ff5000" />
        </linearGradient>
        <radialGradient id="faq-qb-gloss" cx="30%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Circle Clay Disc */}
      <circle cx="50" cy="50" r="44" fill="url(#faq-qb-grad)" />
      <circle cx="50" cy="50" r="44" fill="url(#faq-qb-gloss)" />
      <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" />

      {/* 3D Question Mark */}
      <path
        d="M40 38 C40 28 60 28 60 38 C60 46 50 48 50 56"
        stroke="#ffffff"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="50" cy="68" r="4.5" fill="#ffffff" />
    </svg>
  )
}

// Small Chat Bubble for Bottom-Left Corner
function ClayChatBubble({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      className={className}
      aria-hidden="true"
      style={{ filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.14))' }}
    >
      <defs>
        <linearGradient id="faq-cb-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
      </defs>
      <path
        d="M20 22 C20 14, 60 14, 60 22 L60 48 C60 56, 32 56, 24 64 L26 54 C20 54, 20 48, 20 40 Z"
        fill="url(#faq-cb-grad)"
      />
      <line x1="30" y1="30" x2="50" y2="30" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
      <line x1="30" y1="40" x2="44" y2="40" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export function FaqHelpCard({
  totalQuestions,
  whatsappUrl = 'https://wa.me/919566372450',
}: FaqHelpCardProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.2, 1, 0.25, 1] }}
      className="relative rounded-[32px] p-7 sm:p-9 bg-white/75 dark:bg-white/[0.05] backdrop-blur-[14px] border border-white/90 dark:border-white/10 shadow-[0_28px_56px_-28px_rgba(240,120,90,0.3)] dark:shadow-none"
    >
      {/* Decorative Clay Symbols (§8.3) */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [0, -8, 0],
                rotate: [0, 3, 0],
              }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute -top-8 -right-8 size-20 sm:size-24 select-none z-20"
      >
        <ClayQuestionBadge className="w-full h-full" />
      </motion.div>

      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [0, 6, 0],
                rotate: [0, -3, 0],
              }
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="pointer-events-none absolute -bottom-5 -left-5 size-14 sm:size-16 select-none z-20 hidden sm:block"
      >
        <ClayChatBubble className="w-full h-full" />
      </motion.div>

      {/* Top Eyebrow + Derived Questions Count Chip */}
      <div className="flex items-center gap-3 mb-4">
        <span className="eyebrow inline-flex items-center gap-2 font-body text-xs sm:text-sm font-bold uppercase tracking-wider text-[#ea580c] bg-[#fff0ea] dark:bg-orange-950/60 dark:text-orange-300 px-3.5 py-1.5 rounded-full border border-[#ea580c]/25">
          FAQ
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide bg-orange-100/70 dark:bg-orange-950/40 text-[#c2410c] dark:text-orange-300 border border-orange-200/50">
          {totalQuestions} questions
        </span>
      </div>

      {/* Section Title */}
      <h2
        id="faq-heading"
        className="font-display text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-[var(--heading)] leading-[1.12] text-balance"
      >
        Frequently asked questions
      </h2>

      {/* Lead Paragraph */}
      <p className="mt-4 text-base sm:text-lg text-[var(--ink-2)] leading-relaxed">
        Everything you need to know about 1Grow before getting started. Can&apos;t find what you&apos;re looking for?
      </p>

      {/* Divider */}
      <div className="my-7 pt-6 border-t border-line/60">
        <p className="text-base font-bold text-[var(--heading)] mb-3">
          Have a specific question?
        </p>

        {/* Restyled WhatsApp Pill Button with shine hover sweep */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 w-full sm:w-auto h-[52px] px-6 rounded-full bg-[#0176d3] hover:bg-[#0b5cab] text-white font-display text-base font-bold shadow-[0_10px_24px_-6px_rgba(1,118,211,0.45)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0176d3]"
        >
          {/* Diagonal shine sweep */}
          <span
            className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-20deg] transition-all duration-700 group-hover:left-[150%]"
            aria-hidden="true"
          />

          <MessageSquare className="size-4.5 text-emerald-300 transition-transform duration-300 group-hover:scale-110" />
          <span>Still stuck? Chat with us on WhatsApp</span>
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </a>
      </div>
    </motion.div>
  )
}
