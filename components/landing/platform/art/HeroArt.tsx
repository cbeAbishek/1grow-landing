'use client'

import React, { useRef, useEffect, useState } from 'react'
import { GlossyWordmark } from './GlossyWordmark'
import { TileIcon } from './TileIcon'
import { MODULE_ART_CONFIG, ModuleArtConfig } from './heroArtConfig'
import { WORDMARK_TINTS } from '../stackConfig'

interface HeroArtProps {
  moduleId: string
  isActive?: boolean
}

export function HeroArt({ moduleId, isActive = true }: HeroArtProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const config: ModuleArtConfig = MODULE_ART_CONFIG[moduleId] || MODULE_ART_CONFIG.training
  const tint = WORDMARK_TINTS[moduleId] || '#dbeafe'
  const [artScale, setArtScale] = useState(1)

  useEffect(() => {
    if (!rootRef.current || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        // --art-scale = clamp(.7, min(zoneW/458, zoneH/412), 1) (§7.3)
        const scaleW = width > 0 ? width / 458 : 1
        const scaleH = height > 0 ? height / 412 : 1
        const computed = Math.min(1, Math.max(0.7, Math.min(scaleW, scaleH)))
        setArtScale(computed)
      }
    })
    observer.observe(rootRef.current)
    return () => observer.disconnect()
  }, [])

  const baseTilePx = Math.round(92 * artScale)

  return (
    <div
      ref={rootRef}
      data-active={isActive ? 'true' : 'false'}
      style={
        {
          '--art-scale': artScale,
          containerType: 'inline-size',
        } as React.CSSProperties
      }
      className="hero-art-root relative w-full h-full min-h-[380px] max-h-[460px] flex flex-col justify-between items-center select-none overflow-visible py-2"
    >
      {/* Background Decor Layer (Confined §7.6: Behind wordmark and tiles) */}
      <div
        className="absolute inset-0 pointer-events-none -z-0 flex items-center justify-center overflow-visible"
        aria-hidden="true"
      >
        {/* Soft Radial Glow (tone-tinted) */}
        <div
          className="absolute size-[320px] rounded-full blur-[72px] opacity-35 transition-opacity duration-500"
          style={{ background: config.accentGlow }}
        />

        {/* Thin Dotted Ring (<=14% opacity, behind wordmark and tiles, 40s linear rotation) */}
        <div
          className={`absolute size-[260px] rounded-full border border-dashed border-white/[0.13] ${
            isActive ? 'animate-spin-slow' : ''
          }`}
        />

        {/* Sparkles (Strictly confined to reserved empty cells: top-left margin above wordmark, right margin beside tiles) */}
        <div
          data-element="sparkle"
          className="absolute -top-3 left-4 size-2 bg-yellow-200 rounded-full blur-[0.4px] animate-pulse"
          style={{ opacity: 0.85 }}
        />
        <div
          data-element="sparkle"
          className="absolute -top-1 left-16 size-1.5 bg-white rounded-full blur-[0.3px] animate-pulse [animation-delay:1.4s]"
          style={{ opacity: 0.75 }}
        />
        <div
          data-element="sparkle"
          className="absolute top-1/2 -right-3 size-2 bg-cyan-200 rounded-full blur-[0.4px] animate-pulse [animation-delay:2.2s]"
          style={{ opacity: 0.85 }}
        />
      </div>

      {/* Row 1: Glossy Wordmark (§7.3: No large 3D symbol here) */}
      <div className="relative z-10 w-full flex items-center justify-center pt-1 pb-3 px-2">
        <GlossyWordmark text={config.wordmark} tint={tint} isActive={isActive} />
      </div>

      {/* Row 2: Four Staggered High-Contrast Glossy Icon Tiles (§7.4) */}
      <div
        className="relative z-10 w-full flex items-start justify-center gap-2.5 sm:gap-3.5 pt-2"
        style={{
          minHeight: `${baseTilePx + 64}px`,
        }}
      >
        {config.tiles.map((tile, idx) => {
          // Tiles 2 and 4 sit ≈ 28px lower than 1 and 3 (staggered)
          const isShifted = idx % 2 === 1
          const staggerOffset = Math.round(26 * artScale)

          return (
            <div
              key={tile.title}
              style={{
                marginTop: isShifted ? `${staggerOffset}px` : '0px',
              }}
              className="flex flex-col items-center group cursor-default transition-transform duration-300 hover:-translate-y-1.5"
            >
              {/* Glossy High-Contrast Tile Surface (§7.4) */}
              <div
                className="relative grid place-items-center rounded-[22px] transition-all duration-200 overflow-hidden"
                style={{
                  width: `${baseTilePx}px`,
                  height: `${baseTilePx}px`,
                  background:
                    'linear-gradient(160deg, rgba(255, 255, 255, 0.97) 0%, rgba(255, 255, 255, 0.82) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.9)',
                  boxShadow:
                    'inset 0 1px 0 #ffffff, 0 16px 28px -14px rgba(0, 0, 30, 0.45)',
                }}
              >
                {/* Tile Icon (Tone-colored with darker definition stroke) */}
                <TileIcon
                  name={tile.icon}
                  accentColor={
                    moduleId === 'training'
                      ? '#7c3aed'
                      : moduleId === 'rental'
                      ? '#0176d3'
                      : moduleId === 'event'
                      ? '#e11d48'
                      : moduleId === 'billing'
                      ? '#16a34a'
                      : moduleId === 'inventory'
                      ? '#ea580c'
                      : '#0d9488'
                  }
                  primaryColor="#0f172a"
                  isActive={isActive}
                />
              </div>

              {/* Tile Label Beneath: 14px/600, white, centered, never truncated (§7.4) */}
              <p
                style={{
                  fontSize: `${Math.max(12, Math.round(14 * artScale))}px`,
                  maxWidth: `${baseTilePx + 16}px`,
                }}
                className="mt-2.5 text-center text-white font-semibold leading-tight select-none text-balance"
              >
                {tile.title}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
