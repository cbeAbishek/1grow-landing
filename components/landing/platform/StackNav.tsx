'use client'

import React, { useRef } from 'react'
import { motion, MotionValue, useMotionValueEvent } from 'framer-motion'
import {
  GraduationCap,
  Package,
  PartyPopper,
  CreditCard,
  Warehouse,
  BarChart3,
} from 'lucide-react'
import { PlatformCardData } from '@/content/platform'
import { N, T_VH } from './stackConfig'
import { cn } from '@/lib/utils'

const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  Package,
  PartyPopper,
  CreditCard,
  Warehouse,
  BarChart3,
}

interface StackNavProps {
  cards: PlatformCardData[]
  s: MotionValue<number>
  activeIndex: number
  onNavigate: (index: number) => void
}

export function StackNav({ cards, s, activeIndex, onNavigate }: StackNavProps) {
  return (
    <aside
      className="hidden lg:flex flex-col gap-2 w-[260px] shrink-0 sticky top-32 z-30"
      aria-label="Platform Stack Navigation"
    >
      <div className="relative pl-6">
        {/* Progress Rail Behind Nav (§10.3) */}
        <div className="absolute left-2.5 top-2 bottom-2 w-[2px] bg-[rgba(3,45,96,0.12)] dark:bg-white/10 rounded-full overflow-hidden">
          <motion.div
            style={{
              height: `${(activeIndex / (N - 1)) * 100}%`,
            }}
            className="w-full bg-[var(--accent-blue,#0176d3)] transition-all duration-300"
          />
        </div>

        {cards.map((card, idx) => {
          const Icon = iconMap[card.icon] || Package
          const isActive = activeIndex === idx

          return (
            <div key={card.id} className="relative my-1">
              <button
                onClick={() => onNavigate(idx)}
                className={cn(
                  'relative z-10 flex items-center gap-3 w-full py-2.5 px-3 rounded-full text-left transition-all duration-200 select-none group',
                  isActive
                    ? 'text-[var(--heading)] font-bold'
                    : 'text-[var(--color-nav-text,#18181b)]/70 hover:text-[var(--accent-blue,#0176d3)] hover:translate-x-1'
                )}
                aria-current={isActive ? 'step' : undefined}
              >
                {/* Active Gliding Pill Background (§10.3) */}
                {isActive && (
                  <motion.div
                    layoutId="stack-nav-pill"
                    className="absolute inset-0 z-0 rounded-full bg-white dark:bg-white/15 shadow-[0_8px_20px_-4px_rgba(24,24,27,0.1)] border border-black/5"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}

                <div
                  className={cn(
                    'relative z-10 grid place-items-center size-9 rounded-full transition-transform',
                    isActive
                      ? 'text-white scale-105'
                      : 'bg-black/5 dark:bg-white/10 text-[var(--ink-2)] group-hover:scale-105'
                  )}
                  style={{
                    backgroundColor: isActive ? card.accentColor : undefined,
                  }}
                >
                  <Icon className="size-4.5" />
                </div>

                <span
                  className={cn(
                    'relative z-10 text-[16px] transition-all',
                    isActive ? 'text-[20px] font-bold text-[var(--heading)]' : 'font-medium'
                  )}
                >
                  {card.title}
                </span>
              </button>
            </div>
          )
        })}
      </div>
    </aside>
  )
}
