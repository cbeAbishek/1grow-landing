import React from 'react'

export interface SymbolProps {
  size?: number
  className?: string
  onClick?: () => void
}

export function SymbolCap({ size = 130, className, onClick }: SymbolProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
      style={{ filter: 'drop-shadow(0 18px 24px rgba(3,45,96,0.25))' }}
      aria-label="Training Cap Symbol"
      role="img"
    >
      {/* Base Mortarboard Diamond */}
      <path
        d="M80 32L142 66L80 100L18 66L80 32Z"
        fill="url(#grad-training-cap)"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Glossy Top Highlight */}
      <path
        d="M80 38L130 65L80 92L30 65L80 38Z"
        fill="white"
        fillOpacity="0.28"
      />
      {/* Lower Cap Skull Rim */}
      <path
        d="M45 80V105C45 118 60 128 80 128C100 128 115 118 115 105V80"
        fill="url(#grad-training-cap)"
        stroke="rgba(255,255,255,0.6)"
        strokeWidth="3.5"
      />
      {/* Tassel Button & Cord */}
      <circle cx="80" cy="66" r="6" fill="#fde047" stroke="#d97706" strokeWidth="2" />
      <path
        d="M80 66C98 72 120 86 122 108"
        stroke="#fde047"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <rect x="116" y="108" width="12" height="18" rx="4" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
    </svg>
  )
}

export function SymbolBox({ size = 130, className, onClick }: SymbolProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
      style={{ filter: 'drop-shadow(0 18px 24px rgba(3,45,96,0.25))' }}
      aria-label="Rental Box Symbol"
      role="img"
    >
      {/* Cube Top Face */}
      <path
        d="M80 26L134 56L80 86L26 56L80 26Z"
        fill="url(#grad-rental-box)"
        stroke="rgba(255,255,255,0.75)"
        strokeWidth="4"
      />
      <path
        d="M80 32L124 56L80 80L36 56L80 32Z"
        fill="white"
        fillOpacity="0.32"
      />
      {/* Left Face */}
      <path
        d="M26 56L80 86V136L26 106V56Z"
        fill="#01529a"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="3.5"
      />
      {/* Right Face */}
      <path
        d="M80 86L134 56V106L80 136V86Z"
        fill="#0176d3"
        stroke="rgba(255,255,255,0.6)"
        strokeWidth="3.5"
      />
      {/* Hanging Tag */}
      <rect
        x="96"
        y="78"
        width="26"
        height="36"
        rx="6"
        transform="rotate(18 96 78)"
        fill="#fbbf24"
        stroke="#ffffff"
        strokeWidth="3"
      />
      <circle cx="106" cy="88" r="3" fill="#92400e" />
    </svg>
  )
}

export function SymbolPopper({ size = 130, className, onClick }: SymbolProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
      style={{ filter: 'drop-shadow(0 18px 24px rgba(3,45,96,0.25))' }}
      aria-label="Events Popper Symbol"
      role="img"
    >
      {/* Party Popper Cone */}
      <path
        d="M32 134L48 64L114 126L32 134Z"
        fill="url(#grad-events-popper)"
        stroke="rgba(255,255,255,0.75)"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Stripes on Cone */}
      <path d="M42 90L76 122" stroke="#fbbf24" strokeWidth="6" strokeLinecap="round" />
      <path d="M46 72L102 124" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
      {/* Confetti & Streamers */}
      <circle cx="118" cy="46" r="6" fill="#fde047" />
      <circle cx="94" cy="34" r="5" fill="#38bdf8" />
      <circle cx="132" cy="74" r="7" fill="#4ade80" />
      <path d="M84 48C94 36 112 34 124 22" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" />
      <path d="M106 62C118 52 136 60 144 48" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

export function SymbolCoin({ size = 130, className, onClick }: SymbolProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
      style={{ filter: 'drop-shadow(0 18px 24px rgba(3,45,96,0.25))' }}
      aria-label="Billing Rupee Coin Symbol"
      role="img"
    >
      {/* Outer Coin Edge Depth */}
      <circle cx="80" cy="84" r="54" fill="#1b6e3b" />
      {/* Coin Face */}
      <circle
        cx="80"
        cy="76"
        r="54"
        fill="url(#grad-billing-coin)"
        stroke="rgba(255,255,255,0.8)"
        strokeWidth="4"
      />
      {/* Inner Rim */}
      <circle cx="80" cy="76" r="44" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" />
      {/* Gloss Crescent */}
      <path
        d="M48 54C56 42 70 36 84 36C98 36 112 42 120 54"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
        strokeOpacity="0.6"
      />
      {/* Embossed ₹ Symbol */}
      <path
        d="M66 58H94M66 69H90M66 58V80C75 80 84 76 86 69C86 62 76 60 66 60M75 80L94 102"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function SymbolBars({ size = 130, className, onClick }: SymbolProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
      style={{ filter: 'drop-shadow(0 18px 24px rgba(3,45,96,0.25))' }}
      aria-label="Analytics Bars Symbol"
      role="img"
    >
      {/* Background Rounded Shield / Pill */}
      <rect
        x="24"
        y="24"
        width="112"
        height="112"
        rx="32"
        fill="url(#grad-analytics-chart)"
        stroke="rgba(255,255,255,0.75)"
        strokeWidth="4"
      />
      {/* 3 Rising Rounded Bars */}
      <rect x="42" y="80" width="18" height="40" rx="8" fill="white" fillOpacity="0.85" />
      <rect x="71" y="60" width="18" height="60" rx="8" fill="white" fillOpacity="0.95" />
      <rect x="100" y="44" width="18" height="76" rx="8" fill="#fde047" />
      {/* Trend Line with Dot */}
      <path
        d="M48 76L78 54L110 38"
        stroke="#ffffff"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <circle cx="110" cy="38" r="6" fill="#f59e0b" stroke="white" strokeWidth="2.5" />
    </svg>
  )
}

export function SymbolCrates({ size = 130, className, onClick }: SymbolProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
      style={{ filter: 'drop-shadow(0 18px 24px rgba(3,45,96,0.25))' }}
      aria-label="Inventory Crates Symbol"
      role="img"
    >
      {/* Bottom Crate */}
      <rect
        x="28"
        y="96"
        width="104"
        height="36"
        rx="10"
        fill="url(#grad-inventory-crates)"
        stroke="rgba(255,255,255,0.75)"
        strokeWidth="3.5"
      />
      {/* Middle Crate */}
      <rect
        x="36"
        y="62"
        width="88"
        height="32"
        rx="9"
        fill="url(#grad-inventory-crates)"
        stroke="rgba(255,255,255,0.75)"
        strokeWidth="3.5"
      />
      {/* Top Crate */}
      <rect
        x="46"
        y="30"
        width="68"
        height="30"
        rx="8"
        fill="#fde047"
        stroke="rgba(255,255,255,0.85)"
        strokeWidth="3.5"
      />
      {/* Slats */}
      <line x1="38" y1="114" x2="122" y2="114" stroke="rgba(255,255,255,0.5)" strokeWidth="3" strokeLinecap="round" />
      <line x1="44" y1="78" x2="116" y2="78" stroke="rgba(255,255,255,0.5)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export function SymbolSparkle({ size = 48, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M24 0C24 13.25 13.25 24 0 24C13.25 24 24 34.75 24 48C24 34.75 34.75 24 48 24C34.75 24 24 13.25 24 0Z"
        fill="url(#grad-sparkle)"
        filter="drop-shadow(0 4px 8px rgba(245, 158, 11, 0.4))"
      />
    </svg>
  )
}
