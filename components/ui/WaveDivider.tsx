'use client'

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface WaveDividerProps {
  variant?: 'A' | 'B'
  nextSectionBg?: string
  flip?: boolean
  className?: string
}

export function WaveDivider({
  variant = 'A',
  nextSectionBg = 'var(--platform-bg, #f4f9ff)',
  flip = false,
  className,
}: WaveDividerProps) {
  const { scrollY } = useScroll()

  // Scroll flow: back layer -24px, mid -12px, front 0px (§8.3)
  const yBack = useTransform(scrollY, [0, 800], [0, -24])
  const yMid = useTransform(scrollY, [0, 800], [0, -12])

  // Paths per §8.2 & §10.5
  const paths = {
    A: {
      back: 'M0,150 C220,40 520,20 820,90 C1080,150 1260,170 1440,90 L1440,260 L0,260 Z',
      mid: 'M0,190 C260,90 560,70 860,130 C1100,178 1290,190 1440,130 L1440,260 L0,260 Z',
      front: 'M0,230 C300,150 620,130 900,180 C1120,218 1300,226 1440,180 L1440,260 L0,260 Z',
    },
    B: {
      back: 'M0,130 C320,30 640,60 920,110 C1160,150 1320,80 1440,120 L1440,260 L0,260 Z',
      mid: 'M0,170 C360,70 700,100 980,150 C1200,180 1360,130 1440,160 L1440,260 L0,260 Z',
      front: 'M0,210 C400,120 740,140 1040,190 C1240,220 1380,180 1440,200 L1440,260 L0,260 Z',
    },
  }[variant]

  return (
    <div
      aria-hidden="true"
      className={cn(
        'relative w-full h-[120px] sm:h-[180px] lg:h-[240px] overflow-hidden leading-none pointer-events-none select-none z-10 -mb-[1px]',
        flip && 'rotate-180',
        className
      )}
    >
      <svg
        viewBox="0 0 1440 260"
        fill="none"
        preserveAspectRatio="none"
        className="w-full h-full block"
      >
        {/* Back Layer with horizontal drift & opacity 60% */}
        <motion.g style={{ y: yBack }}>
          <path
            d={paths.back}
            fill="var(--wave-back, #c4defa)"
            fillOpacity="0.6"
            className="wave-back-drift"
          />
        </motion.g>

        {/* Mid Layer with horizontal drift */}
        <motion.g style={{ y: yMid }}>
          <path
            d={paths.mid}
            fill="var(--wave-mid, #dcecfd)"
            className="wave-mid-drift"
          />
        </motion.g>

        {/* Front Layer: Solid next section top colour (seamless §8.2) */}
        <path
          d={paths.front}
          fill={nextSectionBg}
        />
      </svg>
    </div>
  )
}
