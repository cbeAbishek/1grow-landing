'use client'

import React from 'react'

export function StepsBackgroundDecor() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none select-none overflow-hidden"
    >
      {/* 24px dot pattern grid at <= 4% opacity */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.035] dark:opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="steps-dot-grid"
            x="0"
            y="0"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.2" fill="currentColor" className="text-[#8b5cf6]" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#steps-dot-grid)" />
      </svg>
    </div>
  )
}
