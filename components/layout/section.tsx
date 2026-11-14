import React from 'react'
import { cn } from '@/lib/utils'
import { WaveDivider, type WaveBand, type WaveShape } from './wave-divider'

export type SectionBand = 'light' | 'tint' | 'dark'

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  band?: SectionBand
  hasTopDivider?: boolean
  waveBottom?: WaveBand
  waveShape?: WaveShape
  waveFlip?: boolean
  noBottomPadding?: boolean
}

export function Section({
  children,
  className,
  band = 'light',
  hasTopDivider = false,
  waveBottom,
  waveShape = 'A',
  waveFlip = false,
  noBottomPadding = false,
  ...props
}: SectionProps) {
  return (
    <section
      data-band={band}
      className={cn(
        'relative transition-colors duration-300',
        noBottomPadding
          ? 'pt-16 sm:pt-20 lg:pt-28 pb-0'
          : 'py-16 sm:py-20 lg:py-28',
        hasTopDivider && 'border-t border-line',
        className,
      )}
      {...props}
    >
      {children}
      {waveBottom && (
        <div className="absolute inset-x-0 bottom-0 pointer-events-none">
          <WaveDivider to={waveBottom} shape={waveShape} flip={waveFlip} />
        </div>
      )}
    </section>
  )
}
