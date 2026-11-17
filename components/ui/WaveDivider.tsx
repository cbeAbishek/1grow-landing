'use client'

import React from 'react'
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
  // Static paths spanning fully from x=-4 to x=1444 to ensure zero edge clipping or gaps
  const paths = {
    A: {
      back: 'M-4,150 C220,40 520,20 820,90 C1080,150 1260,170 1444,90 L1444,265 L-4,265 Z',
      mid: 'M-4,190 C260,90 560,70 860,130 C1100,178 1290,190 1444,130 L1444,265 L-4,265 Z',
      front: 'M-4,230 C300,150 620,130 900,180 C1120,218 1300,226 1444,180 L1444,265 L-4,265 Z',
    },
    B: {
      back: 'M-4,130 C320,30 640,60 920,110 C1160,150 1320,80 1444,120 L1444,265 L-4,265 Z',
      mid: 'M-4,170 C360,70 700,100 980,150 C1200,180 1360,130 1444,160 L1444,265 L-4,265 Z',
      front: 'M-4,210 C400,120 740,140 1040,190 C1240,220 1380,180 1444,200 L1444,265 L-4,265 Z',
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
        shapeRendering="geometricPrecision"
      >
        {/* Back Layer - completely static, spans 100% width */}
        <path
          d={paths.back}
          fill="var(--wave-back, #c4defa)"
          fillOpacity="0.6"
        />

        {/* Mid Layer - completely static, spans 100% width */}
        <path
          d={paths.mid}
          fill="var(--wave-mid, #dcecfd)"
        />

        {/* Front Layer: Solid next section top colour (seamless) */}
        <path
          d={paths.front}
          fill={nextSectionBg}
        />
      </svg>
    </div>
  )
}
