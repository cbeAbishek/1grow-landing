'use client'

import React from 'react'
import { motion, MotionValue } from 'framer-motion'
import {
  GraduationCap,
  Package,
  PartyPopper,
  CreditCard,
  Warehouse,
  BarChart3,
} from 'lucide-react'
import { PlatformCardData } from '@/content/platform'
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
  className?: string
}

export function StackNav({
  cards,
  activeIndex,
  onNavigate,
  className,
}: StackNavProps) {
  return (
    <nav
      className={cn(
        'z-30 select-none hidden xl:flex flex-col',
        className
      )}
      aria-label="Platform Modules Navigation"
    >
      <div className="relative flex flex-col">
        {cards.map((card, idx) => {
          const Icon = iconMap[card.icon] || Package
          const isActive = activeIndex === idx

          return (
            <div
              key={card.id}
              className="relative flex items-center"
              style={{
                height: isActive ? '54px' : '49px',
                transition: 'height 250ms cubic-bezier(0.2, 1, 0.25, 1)',
              }}
            >
              <a
                href={`#platform-${card.slug}`}
                onClick={(e) => {
                  e.preventDefault()
                  onNavigate(idx)
                }}
                className={cn(
                  'relative z-10 flex items-center transition-all duration-200 outline-none group cursor-pointer w-full',
                  isActive
                    ? 'h-[52px] rounded-full px-2 pr-5 text-[#032d60] dark:text-white font-bold'
                    : 'h-[49px] pl-[17px] pr-4 text-[#032d60]/75 dark:text-zinc-300 font-semibold text-[15px] hover:text-[#0176d3] hover:translate-x-1'
                )}
                aria-current={isActive ? 'step' : undefined}
              >
                {/* Active White Pill Background Glider */}
                {isActive && (
                  <motion.div
                    layoutId="salesforce-style-nav-pill"
                    className="absolute inset-0 z-0 rounded-full bg-white dark:bg-white/15 shadow-[0_8px_20px_-8px_rgba(3,45,96,0.25)] border border-black/5 dark:border-white/10"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}

                {/* 36px Glossy Icon (Only rendered on the active pill) */}
                {isActive && (
                  <div
                    className="relative z-10 grid place-items-center size-9 rounded-full text-white shadow-xs mr-3 shrink-0"
                    style={{
                      background: card.gradient,
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4), 0 2px 6px rgba(0,0,0,0.15)',
                    }}
                  >
                    <Icon className="size-4.5" />
                  </div>
                )}

                {/* Label */}
                <span
                  className={cn(
                    'relative z-10 tracking-tight transition-all truncate whitespace-nowrap',
                    isActive
                      ? 'text-[17px] font-bold text-[#032d60] dark:text-white'
                      : 'text-[15px] font-semibold'
                  )}
                >
                  {card.title}
                </span>
              </a>
            </div>
          )
        })}
      </div>
    </nav>
  )
}
