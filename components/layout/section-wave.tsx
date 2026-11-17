'use client'

import React from 'react'
import { cn } from '@/lib/utils'

export type SectionThemeKey =
  | 'sky'
  | 'sand'
  | 'lavender'
  | 'mint'
  | 'blush'
  | 'navy'
  | 'heroSky'
  | 'platformPale'

export type WaveVariant = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'

export interface SectionWaveProps {
  from: SectionThemeKey
  to: SectionThemeKey
  variant?: WaveVariant
  className?: string
  flip?: boolean
}

// Precision curves derived directly from the reference design (media_1794728988567_1b6612a7.jpg)
// Extended from x=-4 to x=1444 with y=204 to ensure zero edge gap or sub-pixel clipping on any viewport
const RAW_PATHS = {
  // Variant A: Exact Reference Curve (Gentle S-Curve: left crest, soft center-right dip, smooth right sweep)
  A: {
    back: 'M-4,140 C280,112 450,149 840,164 C1076,165 1250,134 1444,130 L1444,204 L-4,204 Z',
    mid: 'M-4,160 C274,130 502,160 829,172 C1124,178 1209,156 1444,148 L1444,204 L-4,204 Z',
    front: 'M-4,176 C297,140 535,163 845,173 C1107,185 1214,172 1444,160 L1444,204 L-4,204 Z',
  },
  // Variant B: Horizontally Mirrored Reference Curve
  B: {
    back: 'M-4,130 C190,134 364,165 600,164 C990,149 1160,112 1444,140 L1444,204 L-4,204 Z',
    mid: 'M-4,148 C231,156 316,178 611,172 C938,160 1166,130 1444,160 L1444,204 L-4,204 Z',
    front: 'M-4,160 C226,172 333,185 595,173 C905,163 1143,140 1444,176 L1444,204 L-4,204 Z',
  },
  // Variant C: Valley / Harmonic Gentle Wave
  C: {
    back: 'M-4,144 C320,168 580,166 840,148 C1080,132 1280,130 1444,142 L1444,204 L-4,204 Z',
    mid: 'M-4,160 C335,182 600,180 855,162 C1095,148 1295,146 1444,158 L1444,204 L-4,204 Z',
    front: 'M-4,176 C350,194 620,194 870,176 C1110,164 1310,162 1444,174 L1444,204 L-4,204 Z',
  },
}

export function SectionWave({
  from,
  to,
  variant = 'A',
  className,
  flip = false,
}: SectionWaveProps) {
  // Map variants D, E, F to mirrored or complementary shapes
  const baseKey: 'A' | 'B' | 'C' =
    variant === 'D' ? 'B' : variant === 'E' ? 'A' : variant === 'F' ? 'C' : variant

  const paths = RAW_PATHS[baseKey]

  const wave1Fill = `var(--t-${from}-wave1)`
  const wave2Fill = `var(--t-${from}-wave2)`
  const nextBgFill = `var(--t-${to}-bg)`

  return (
    <div
      aria-hidden="true"
      className={cn(
        'relative w-full h-[clamp(72px,10vw,150px)] overflow-hidden leading-none pointer-events-none select-none z-10 -mb-[1px]',
        flip && 'rotate-180',
        className
      )}
    >
      <svg
        viewBox="0 0 1440 200"
        fill="none"
        preserveAspectRatio="none"
        className="w-full h-full block"
        shapeRendering="geometricPrecision"
      >
        {/* Layer 1 (Back): from.wave1 - completely static, spans 100% width */}
        <path d={paths.back} fill={wave1Fill} />

        {/* Layer 2 (Middle): from.wave2 - completely static, spans 100% width */}
        <path d={paths.mid} fill={wave2Fill} />

        {/* Layer 3 (Front): to.bg - seamless solid transition into next section */}
        <path d={paths.front} fill={nextBgFill} />
      </svg>
    </div>
  )
}
