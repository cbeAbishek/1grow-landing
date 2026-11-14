'use client'

import React from 'react'
import { cn } from '@/lib/utils'

export type WaveBand = 'light' | 'tint' | 'dark'
export type WaveShape = 'A' | 'B' | 'C'

export interface WaveDividerProps {
  to?: WaveBand
  shape?: WaveShape
  flip?: boolean
  className?: string
}

export function WaveDivider({
  to = 'light',
  shape = 'A',
  flip = false,
  className,
}: WaveDividerProps) {
  // Shape paths (viewBox: 0 0 1440 120)
  const paths = {
    A: {
      front: 'M0,64 C240,112 480,8 720,52 C960,96 1200,20 1440,64 L1440,120 L0,120 Z',
      back: 'M0,40 C300,0 560,96 860,56 C1100,24 1300,70 1440,36 L1440,120 L0,120 Z',
    },
    B: {
      front: 'M0,48 C360,110 680,16 1020,84 C1220,124 1360,60 1440,48 L1440,120 L0,120 Z',
      back: 'M0,24 C400,90 760,10 1080,70 C1280,105 1380,45 1440,24 L1440,120 L0,120 Z',
    },
    C: {
      front: 'M0,72 C420,18 1020,18 1440,72 L1440,120 L0,120 Z',
      back: 'M0,52 C440,6 1000,6 1440,52 L1440,120 L0,120 Z',
    },
  }[shape]

  // Color mapping based on target band
  const frontFill =
    to === 'dark'
      ? '#18181b'
      : to === 'tint'
      ? 'var(--bg-tint)'
      : 'var(--bg)'

  const backFill =
    to === 'dark'
      ? '#27272a'
      : to === 'tint'
      ? '#ede7dc'
      : 'var(--bg-tint)'

  return (
    <div
      aria-hidden="true"
      className={cn(
        'relative w-full h-[72px] sm:h-[96px] lg:h-[120px] overflow-hidden leading-none pointer-events-none select-none z-10 -mb-[1px]',
        flip && 'rotate-180',
        className,
      )}
    >
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        preserveAspectRatio="none"
        className="w-full h-full block"
      >
        {/* Back wave with subtle horizontal drift */}
        <path
          d={paths.back}
          fill={backFill}
          opacity="0.45"
          className="wave-drift"
        />
        {/* Front solid wave that connects into the next section */}
        <path
          d={paths.front}
          fill={frontFill}
          opacity="1"
        />
      </svg>
    </div>
  )
}
