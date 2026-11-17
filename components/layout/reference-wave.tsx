'use client'

import React from 'react'
import { cn } from '@/lib/utils'

export interface ReferenceWaveProps {
  /**
   * Three fill colors in paint order: [back (L1), middle (L2), front (L3)]
   */
  colors: [string, string, string]
  gradient?: {
    id?: string
    start?: string
    mid?: string
    end?: string
    startOpacity?: number
    midOpacity?: number
    endOpacity?: number
  }
  flip?: boolean
  className?: string
}

// Single Source of Truth Geometry derived from the reference design (§6.2)
const PATH_BACK =
  'M0,35 C70,19 130,10 192,10 C340,10 500,64 663,84 C760,96 820,98 875,97 C1010,94 1100,60 1193,46 C1280,33 1370,14 1440,9 L1440,200 L0,200 Z'

const PATH_MID =
  'M0,84 C80,66 170,53 252,53 C380,53 480,70 597,80 C680,88 730,112 796,112 C900,112 1020,116 1127,108 C1240,100 1340,72 1440,55 L1440,200 L0,200 Z'

const PATH_FRONT =
  'M0,127 C110,103 230,77 345,77 C470,77 560,90 663,95 C760,100 830,130 928,130 C1020,130 1100,124 1193,119 C1290,114 1370,98 1440,86 L1440,200 L0,200 Z'

export function ReferenceWave({
  colors,
  gradient,
  flip = false,
  className,
}: ReferenceWaveProps) {
  const [c1, c2, c3] = colors
  const reactId = React.useId()
  const gradId = gradient?.id || `ref-wave-grad-${reactId.replace(/[^a-zA-Z0-9-_]/g, '')}`

  return (
    <div
      aria-hidden="true"
      style={{
        height: 'var(--wave-h, clamp(96px, 14vw, 260px))',
      }}
      className={cn(
        'absolute left-0 right-0 -bottom-[1px] w-full overflow-hidden leading-none pointer-events-none select-none z-10',
        flip && 'rotate-180',
        className
      )}
    >
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
        className="w-full h-full block"
        shapeRendering="geometricPrecision"
      >
        {gradient && (
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={gradient.start || 'var(--wave-rose-start, #FDF8F1)'}
                stopOpacity={gradient.startOpacity ?? 0.92}
              />
              <stop
                offset="50%"
                stopColor={gradient.mid || 'var(--wave-rose-mid, #FAF0EB)'}
                stopOpacity={gradient.midOpacity ?? 0.86}
              />
              <stop
                offset="100%"
                stopColor={gradient.end || 'var(--wave-rose-end, #F6DDD9)'}
                stopOpacity={gradient.endOpacity ?? 1}
              />
            </linearGradient>
          </defs>
        )}

        {/* Layer 1 (Back) */}
        <path d={PATH_BACK} fill={c1} />

        {/* Layer 2 (Middle) */}
        <path d={PATH_MID} fill={c2} />

        {/* Layer 3 (Front Ground) */}
        <path d={PATH_FRONT} fill={gradient ? `url(#${gradId})` : c3} />
      </svg>
    </div>
  )
}
