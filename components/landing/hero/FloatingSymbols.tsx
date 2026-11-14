'use client'

import React from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import {
  SymbolCap,
  SymbolBox,
  SymbolPopper,
  SymbolCoin,
  SymbolBars,
  SymbolCrates,
  SymbolSparkle,
} from './symbols/SymbolSet'
import { SymbolDefs } from './symbols/SymbolDefs'

interface FloatingSymbolsProps {
  onSelectModule?: (moduleId: string) => void
  mouseProgress?: { x: number; y: number }
}

export function FloatingSymbols({ onSelectModule }: FloatingSymbolsProps) {
  const { scrollY } = useScroll()

  // Scroll parallax depths (§6.4)
  const yFront = useTransform(scrollY, [0, 700], [0, -140])
  const yMid = useTransform(scrollY, [0, 700], [0, -80])
  const yBack = useTransform(scrollY, [0, 700], [0, -40])

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-visible" aria-hidden="true">
      <SymbolDefs />

      {/* 1. Training Cap (Top-Left: left -72px, top -56px, rotate -12deg) */}
      <motion.div
        style={{ y: yFront }}
        className="pointer-events-auto absolute -left-12 lg:-left-20 -top-12 lg:-top-16 cursor-pointer sym-float group"
        onClick={() => onSelectModule?.('training')}
      >
        <div className="relative transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:rotate-6">
          <SymbolCap size={140} className="w-24 sm:w-28 lg:w-36 h-auto" />
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 dark:bg-black/80 px-2.5 py-0.5 rounded-full text-xs font-bold text-[var(--heading)] shadow-md">
            Training
          </span>
        </div>
      </motion.div>

      {/* Sparkle near Cap */}
      <motion.div
        style={{ y: yBack }}
        className="absolute left-16 sm:left-24 top-4 sparkle-twinkle hidden sm:block"
      >
        <SymbolSparkle size={36} />
      </motion.div>

      {/* 2. Events Popper (Top-Right: right -64px, top -72px, rotate 14deg) */}
      <motion.div
        style={{ y: yFront }}
        className="pointer-events-auto absolute -right-10 lg:-right-16 -top-14 lg:-top-20 cursor-pointer sym-float group"
        onClick={() => onSelectModule?.('event')}
      >
        <div className="relative transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:rotate-12">
          <SymbolPopper size={140} className="w-24 sm:w-28 lg:w-36 h-auto" />
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 dark:bg-black/80 px-2.5 py-0.5 rounded-full text-xs font-bold text-[var(--heading)] shadow-md">
            Events
          </span>
        </div>
      </motion.div>

      {/* Sparkle near Popper */}
      <motion.div
        style={{ y: yBack }}
        className="absolute right-24 sm:right-32 top-8 sparkle-twinkle hidden sm:block"
      >
        <SymbolSparkle size={44} />
      </motion.div>

      {/* 3. Billing Coin (Right edge, middle: right -96px, top 42%, rotate -8deg) */}
      <motion.div
        style={{ y: yMid }}
        className="pointer-events-auto absolute -right-12 lg:-right-24 top-[40%] cursor-pointer sym-float group"
        onClick={() => onSelectModule?.('billing')}
      >
        <div className="relative transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:rotate-[-4deg]">
          <SymbolCoin size={140} className="w-24 sm:w-28 lg:w-36 h-auto" />
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 dark:bg-black/80 px-2.5 py-0.5 rounded-full text-xs font-bold text-[var(--heading)] shadow-md">
            Billing
          </span>
        </div>
      </motion.div>

      {/* 4. Rental Box (Left edge, lower third: left -88px, bottom 90px, rotate 8deg) */}
      <motion.div
        style={{ y: yMid }}
        className="pointer-events-auto absolute -left-12 lg:-left-22 bottom-24 lg:bottom-28 cursor-pointer sym-float group"
        onClick={() => onSelectModule?.('rental')}
      >
        <div className="relative transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:rotate-12">
          <SymbolBox size={140} className="w-24 sm:w-28 lg:w-36 h-auto" />
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 dark:bg-black/80 px-2.5 py-0.5 rounded-full text-xs font-bold text-[var(--heading)] shadow-md">
            Rental
          </span>
        </div>
      </motion.div>

      {/* 5. Inventory Crates (Bottom-Left: left 56px, bottom -84px, rotate -6deg) */}
      <motion.div
        style={{ y: yFront }}
        className="pointer-events-auto absolute left-8 lg:left-14 -bottom-16 lg:-bottom-22 cursor-pointer sym-float group hidden md:block"
        onClick={() => onSelectModule?.('inventory')}
      >
        <div className="relative transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-2">
          <SymbolCrates size={130} className="w-24 sm:w-28 lg:w-32 h-auto" />
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 dark:bg-black/80 px-2.5 py-0.5 rounded-full text-xs font-bold text-[var(--heading)] shadow-md">
            Inventory
          </span>
        </div>
      </motion.div>

      {/* 6. Analytics Bars (Bottom-Right: right 40px, bottom -72px, rotate 6deg) */}
      <motion.div
        style={{ y: yFront }}
        className="pointer-events-auto absolute right-8 lg:right-12 -bottom-14 lg:-bottom-20 cursor-pointer sym-float group hidden md:block"
        onClick={() => onSelectModule?.('analytics')}
      >
        <div className="relative transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:rotate-6">
          <SymbolBars size={130} className="w-24 sm:w-28 lg:w-32 h-auto" />
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 dark:bg-black/80 px-2.5 py-0.5 rounded-full text-xs font-bold text-[var(--heading)] shadow-md">
            Analytics
          </span>
        </div>
      </motion.div>
    </div>
  )
}
