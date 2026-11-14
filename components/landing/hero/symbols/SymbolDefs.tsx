import React from 'react'

export function SymbolDefs() {
  return (
    <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
      <defs>
        {/* Gradients for Symbols */}
        <linearGradient id="grad-training-cap" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9b6bff" />
          <stop offset="100%" stopColor="#5b21b6" />
        </linearGradient>

        <linearGradient id="grad-rental-box" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#57a3fd" />
          <stop offset="100%" stopColor="#0176d3" />
        </linearGradient>

        <linearGradient id="grad-events-popper" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff8a80" />
          <stop offset="100%" stopColor="#e5484d" />
        </linearGradient>

        <linearGradient id="grad-billing-coin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5fd08a" />
          <stop offset="100%" stopColor="#2e844a" />
        </linearGradient>

        <linearGradient id="grad-analytics-chart" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5eead4" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>

        <linearGradient id="grad-inventory-crates" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>

        <linearGradient id="grad-sparkle" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>

        {/* Drop shadow filter for 3D stickers */}
        <filter id="symbol-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#032d60" floodOpacity="0.25" />
        </filter>
      </defs>
    </svg>
  )
}
