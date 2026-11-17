'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Users,
  Wallet,
  Bell,
  BarChart3,
  ShieldCheck,
  Layers,
  HeadphonesIcon,
  Check,
} from 'lucide-react'
import {
  DomainFitIllustration,
  AutoPayIllustration,
  WhatsAppIllustration,
  AnalyticsIllustration,
  SecureIllustration,
  MultiBranchIllustration,
  SupportIllustration,
  FreeTrialIllustration,
} from './WhyUsIllustrations'
import { cn } from '@/lib/utils'

export interface CardConfig {
  number: number
  slot: 1 | 2 | 3 | 4
  title: string
  tag: string
  description: string
  icon: string
  gradient: string
  textColor: 'white' | 'dark'
  toneRgb: string
  toneHex: string
}

const iconComponents: Record<string, React.ElementType> = {
  Users,
  Wallet,
  Bell,
  BarChart3,
  ShieldCheck,
  Layers,
  HeadphonesIcon,
  Check,
}

const illustrationComponents: Record<number, React.ElementType> = {
  1: DomainFitIllustration,
  2: AutoPayIllustration,
  3: WhatsAppIllustration,
  4: AnalyticsIllustration,
  5: SecureIllustration,
  6: MultiBranchIllustration,
  7: SupportIllustration,
  8: FreeTrialIllustration,
}

// Sparkle element for decorative twinkle
function Sparkle({ className, color = '#ffffff' }: { className?: string; color?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={color}
      className={cn('size-4 sm:size-5 pointer-events-none select-none opacity-80', className)}
      aria-hidden="true"
    >
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  )
}

export function WhyUsCard({
  config,
  index,
}: {
  config: CardConfig
  index: number
}) {
  const shouldReduceMotion = useReducedMotion()
  const Icon = iconComponents[config.icon] || Users
  const Illustration = illustrationComponents[config.number] || DomainFitIllustration
  const isDarkText = config.textColor === 'dark'
  const isWide = config.slot === 1 || config.slot === 4

  // Min-height specifications per slot (§6.2)
  const slotMinHeight = {
    1: 'min-h-[460px]',
    2: 'min-h-[440px]',
    3: 'min-h-[400px]',
    4: 'min-h-[400px]',
  }[config.slot]

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : 0.65,
        delay: shouldReduceMotion ? 0 : index * 0.09,
        ease: [0.2, 1, 0.25, 1],
      }}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              y: -6,
              transition: { duration: 0.25, ease: 'easeOut' },
            }
      }
      className={cn(
        'group relative flex flex-col justify-between rounded-[32px] overflow-hidden p-7 sm:p-9 border select-none',
        'border-white/35 transition-shadow duration-300',
        slotMinHeight,
        config.slot === 1 && 'lg:col-span-7',
        config.slot === 2 && 'lg:col-span-5',
        config.slot === 3 && 'lg:col-span-5',
        config.slot === 4 && 'lg:col-span-7',
        // Tablet (640-1023px): card 1 & 4 span 2 cols; card 2 & 3 span 1 col
        (config.slot === 1 || config.slot === 4) && 'sm:col-span-2 lg:col-span-auto',
        (config.slot === 2 || config.slot === 3) && 'sm:col-span-1 lg:col-span-auto'
      )}
      style={{
        background: config.gradient,
        boxShadow: `0 26px 48px -22px rgba(${config.toneRgb}, 0.5)`,
      }}
    >
      {/* Subtle radial gloss overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(120% 70% at 0% 0%, rgba(255, 255, 255, 0.28), transparent 55%)',
        }}
        aria-hidden="true"
      />

      {/* Soft circular background decoration */}
      <div
        className="pointer-events-none absolute -right-12 -top-12 size-56 rounded-full opacity-30 blur-2xl"
        style={{
          background: isDarkText ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.2)',
        }}
        aria-hidden="true"
      />

      {/* Decorative Sparkles */}
      <Sparkle
        className="absolute top-14 right-24 hidden sm:block"
        color={isDarkText ? '#78350f' : '#ffffff'}
      />
      <Sparkle
        className="absolute bottom-20 left-1/2 hidden lg:block opacity-60"
        color={isDarkText ? '#1e293b' : '#ffffff'}
      />

      {/* Top Bar: Tag Pill (left) + Icon Circle (right) */}
      <div className="relative z-10 flex items-center justify-between gap-4">
        {/* Code-style Tag Pill */}
        <span
          className={cn(
            'inline-flex items-center px-3.5 py-1.5 rounded-full font-mono text-[13px] font-semibold tracking-wide backdrop-blur-md',
            isDarkText
              ? 'bg-black/10 text-[#1a1030] border border-black/15'
              : 'bg-white/20 text-white border border-white/30'
          )}
        >
          {config.tag}
        </span>

        {/* 52px White Circular Icon Button / Tile */}
        <div
          className="grid size-[52px] place-items-center rounded-full bg-white shadow-[0_8px_20px_-4px_rgba(0,0,0,0.18)] shrink-0 transition-transform duration-300 group-hover:scale-105"
          style={{ color: config.toneHex }}
          aria-hidden="true"
        >
          <Icon className="size-6 stroke-[2.2]" />
        </div>
      </div>

      {/* Middle Body: Headline + Full Description */}
      <div className="relative z-10 mt-6 sm:mt-8">
        <h3
          className={cn(
            'font-display font-semibold tracking-tight leading-[1.12] text-balance',
            isDarkText ? 'text-[#1a1030]' : 'text-white',
            isWide
              ? 'text-3xl sm:text-4xl lg:text-[42px]'
              : 'text-2xl sm:text-3xl lg:text-[34px]'
          )}
        >
          {config.title}
        </h3>

        <p
          className={cn(
            'mt-3.5 sm:mt-4 leading-relaxed font-normal',
            isDarkText ? 'text-[#2e1d44]/90' : 'text-white/90',
            isWide ? 'text-base sm:text-[17px] max-w-[46ch]' : 'text-[15px] sm:text-base max-w-[38ch]'
          )}
        >
          {config.description}
        </p>
      </div>

      {/* Bottom Area: Footer Chip (left) + Clay Illustration (right or center) */}
      <div className="relative z-10 mt-8 pt-4 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        {/* Institutional Reliability Glass Pill Chip */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-white/95 text-[#0f172a] shadow-[0_4px_12px_rgba(0,0,0,0.08)] backdrop-blur-sm border border-white/60">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.06em]">
            INSTITUTIONAL RELIABILITY
          </span>
          <span className="grid size-4.5 place-items-center rounded-full bg-emerald-100 text-emerald-600">
            <Check className="size-3 stroke-[3]" />
          </span>
        </div>

        {/* 3D Soft Clay Illustration */}
        <motion.div
          whileHover={
            shouldReduceMotion
              ? {}
              : {
                  y: -8,
                  rotate: isWide ? 2 : -2,
                  transition: { duration: 0.3, ease: 'easeOut' },
                }
          }
          className={cn(
            'pointer-events-none select-none transition-transform duration-300',
            isWide
              ? 'self-end w-[44%] max-w-[240px] -mb-3 sm:-mr-3'
              : 'self-center sm:self-end w-[58%] max-w-[210px] -mb-2'
          )}
        >
          <Illustration className="w-full h-auto" />
        </motion.div>
      </div>
    </motion.div>
  )
}
