'use client'

import React from 'react'

interface GlossyWordmarkProps {
  text: string
  tint?: string
  isActive?: boolean
}

export function GlossyWordmark({
  text,
  tint = '#dbeafe',
  isActive = true,
}: GlossyWordmarkProps) {
  const isMultiLine = text === 'Event Management'
  const chars = isMultiLine ? 10 : text.length

  const fontSizeStyle = isMultiLine
    ? 'clamp(44px, min(56px, calc(100cqw / 6.6)), 60px)'
    : `clamp(44px, min(74px, calc(100cqw / (${chars} * 0.62))), 80px)`

  return (
    <div className="relative w-full text-center select-none pointer-events-none flex flex-col items-center justify-center">
      {/* Background Soft Drop Shadow Layer */}
      <div
        aria-hidden="true"
        className="absolute inset-0 font-display font-extrabold tracking-tight text-center text-transparent select-none flex flex-col items-center justify-center"
        style={{
          fontSize: fontSizeStyle,
          lineHeight: 1.0,
          filter: 'drop-shadow(0 8px 16px rgba(0, 16, 57, 0.4))',
        }}
      >
        {isMultiLine ? (
          <div className="leading-[1.0] text-center">
            <div>Event</div>
            <div>Management</div>
          </div>
        ) : (
          <div>{text}</div>
        )}
      </div>

      {/* Main Glossy Gradient Text with Sweep Overlay */}
      <div className="relative inline-block max-w-full overflow-hidden">
        <h4
          className="relative z-10 font-display font-extrabold tracking-tight text-center bg-clip-text text-transparent max-w-full"
          style={{
            fontSize: fontSizeStyle,
            lineHeight: 1.0,
            backgroundImage: `linear-gradient(180deg, #ffffff 0%, ${tint} 100%)`,
          }}
        >
          {isMultiLine ? (
            <div className="leading-[1.0] text-center">
              <div>Event</div>
              <div>Management</div>
            </div>
          ) : (
            <div>{text}</div>
          )}
        </h4>

        {/* Diagonal Gloss Sweep Band (Clipped inside parent overflow-hidden layer, so it never expands scrollWidth) */}
        {isActive && (
          <div
            aria-hidden="true"
            className="absolute inset-0 overflow-hidden pointer-events-none z-20"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-gloss-sweep" />
          </div>
        )}
      </div>
    </div>
  )
}
