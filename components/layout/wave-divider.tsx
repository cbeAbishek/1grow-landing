'use client'

import React from 'react'
import { SectionWave, SectionThemeKey, WaveVariant } from './section-wave'

export type WaveBand =
  | 'light'
  | 'tint'
  | 'dark'
  | 'platform'
  | 'sand'
  | 'lavender'
  | 'sky'
  | 'mint'
  | 'blush'
  | 'navy'

export type WaveShape = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'

export interface WaveDividerProps {
  to?: WaveBand
  from?: SectionThemeKey
  shape?: WaveShape
  variant?: WaveVariant
  flip?: boolean
  nextSectionBg?: string
  className?: string
}

// Band to Theme mapping
const BAND_TO_THEME: Record<string, SectionThemeKey> = {
  light: 'sand',
  tint: 'lavender',
  dark: 'navy',
  platform: 'platformPale',
  sand: 'sand',
  lavender: 'lavender',
  sky: 'sky',
  mint: 'mint',
  blush: 'blush',
  navy: 'navy',
}

export function WaveDivider({
  to = 'light',
  from,
  shape = 'A',
  variant,
  flip = false,
  className,
}: WaveDividerProps) {
  const chosenVariant: WaveVariant = variant || (shape as WaveVariant) || 'A'
  const targetTheme = BAND_TO_THEME[to] || 'sand'

  // If from is not specified, assign a complementary source theme
  const sourceTheme: SectionThemeKey =
    from ||
    (targetTheme === 'sand'
      ? 'platformPale'
      : targetTheme === 'lavender'
      ? 'sand'
      : targetTheme === 'sky'
      ? 'lavender'
      : targetTheme === 'blush'
      ? 'sky'
      : targetTheme === 'navy'
      ? 'blush'
      : targetTheme === 'mint'
      ? 'navy'
      : 'sand')

  return (
    <SectionWave
      from={sourceTheme}
      to={targetTheme}
      variant={chosenVariant}
      flip={flip}
      className={className}
    />
  )
}

export { SectionWave }
