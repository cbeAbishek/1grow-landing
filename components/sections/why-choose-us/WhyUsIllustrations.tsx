'use client'

import React from 'react'

interface IllustrationProps {
  className?: string
}

// 1. Purpose-Built for Academies: Graduation cap & building / puzzle piece fitting into slot
export function DomainFitIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 240 180"
      fill="none"
      className={className}
      aria-hidden="true"
      style={{ filter: 'drop-shadow(0 14px 18px rgba(0,0,0,0.22))' }}
    >
      <defs>
        <linearGradient id="df-cap-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
        <linearGradient id="df-tile-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="df-gold-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <ellipse id="df-shadow" cx="120" cy="160" rx="90" ry="12" fill="rgba(0,0,0,0.28)" />
      </defs>

      {/* Contact Shadow */}
      <use href="#df-shadow" />

      {/* Base Platform / Academy building block */}
      <rect x="50" y="90" width="140" height="65" rx="20" fill="url(#df-tile-grad)" />
      {/* Gloss highlight on block */}
      <path
        d="M54 94 C65 92, 175 92, 186 94 C184 104, 180 114, 176 114 C120 114, 68 114, 64 114 Z"
        fill="rgba(255,255,255,0.3)"
      />
      {/* Academy pillars / slots */}
      <rect x="70" y="115" width="16" height="32" rx="6" fill="#1e40af" />
      <rect x="112" y="115" width="16" height="32" rx="6" fill="#1e40af" />
      <rect x="154" y="115" width="16" height="32" rx="6" fill="#1e40af" />

      {/* Graduation Cap */}
      {/* Skull cap */}
      <ellipse cx="120" cy="72" rx="36" ry="16" fill="#1e293b" />
      {/* Rhombus top */}
      <polygon points="120,32 185,58 120,84 55,58" fill="url(#df-cap-grad)" />
      {/* Cap highlight */}
      <polygon points="120,35 178,58 120,80 62,58" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="3" />
      {/* Button & Tassel */}
      <circle cx="120" cy="58" r="5" fill="url(#df-gold-grad)" />
      <path d="M120 58 Q148 64 154 86" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" fill="none" />
      <circle cx="154" cy="88" r="4" fill="url(#df-gold-grad)" />
    </svg>
  )
}

// 2. Automated Fee Collection: Wallet, floating gold coin and receipt slip
export function AutoPayIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 240 180"
      fill="none"
      className={className}
      aria-hidden="true"
      style={{ filter: 'drop-shadow(0 14px 18px rgba(0,0,0,0.22))' }}
    >
      <defs>
        <linearGradient id="ap-wallet" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#78350f" />
          <stop offset="100%" stopColor="#451a03" />
        </linearGradient>
        <linearGradient id="ap-coin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
      </defs>

      {/* Shadow */}
      <ellipse cx="120" cy="158" rx="80" ry="12" fill="rgba(0,0,0,0.25)" />

      {/* Receipt Slip emerging */}
      <rect x="75" y="38" width="55" height="75" rx="6" fill="#f8fafc" />
      <line x1="85" y1="52" x2="118" y2="52" stroke="#cbd5e1" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="85" y1="64" x2="114" y2="64" stroke="#cbd5e1" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="85" y1="76" x2="120" y2="76" stroke="#22c55e" strokeWidth="3.5" strokeLinecap="round" />

      {/* Leather Wallet Body */}
      <rect x="55" y="80" width="130" height="72" rx="18" fill="url(#ap-wallet)" />
      {/* Wallet Flap */}
      <path d="M55 96 C80 92, 160 92, 185 96 L185 106 C160 102, 80 102, 55 106 Z" fill="rgba(255,255,255,0.18)" />
      {/* Wallet Clasp / Badge */}
      <rect x="150" y="104" width="28" height="22" rx="7" fill="#fbbf24" />
      <circle cx="164" cy="115" r="4" fill="#92400e" />

      {/* Floating Gold Coin with Indian Rupee symbol */}
      <g transform="translate(142, 28)">
        <circle cx="28" cy="28" r="28" fill="url(#ap-coin)" />
        <circle cx="28" cy="28" r="23" fill="none" stroke="#fef9c3" strokeWidth="2.5" />
        <text x="28" y="37" fontSize="22" fontWeight="bold" fill="#78350f" textAnchor="middle" fontFamily="sans-serif">₹</text>
      </g>
    </svg>
  )
}

// 3. WhatsApp Automation: Overlapping chat bubbles with double-ticks & bell (no brand logo)
export function WhatsAppIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 240 180"
      fill="none"
      className={className}
      aria-hidden="true"
      style={{ filter: 'drop-shadow(0 14px 18px rgba(0,0,0,0.22))' }}
    >
      <defs>
        <linearGradient id="wa-bubble-1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
        <linearGradient id="wa-bubble-2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
      </defs>

      {/* Shadow */}
      <ellipse cx="120" cy="158" rx="85" ry="12" fill="rgba(0,0,0,0.22)" />

      {/* Back Chat Bubble (White/Slate) */}
      <path
        d="M50 45 C50 32, 140 32, 140 45 L140 85 C140 98, 70 98, 50 110 L50 45 Z"
        fill="url(#wa-bubble-1)"
      />
      {/* Sound / text lines */}
      <line x1="68" y1="56" x2="115" y2="56" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
      <line x1="68" y1="70" x2="105" y2="70" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />

      {/* Front Chat Bubble (Green) */}
      <path
        d="M85 75 C85 62, 185 62, 185 75 L185 118 C185 130, 115 130, 100 142 L105 125 C90 125, 85 118, 85 105 Z"
        fill="url(#wa-bubble-2)"
      />
      {/* Double tick mark */}
      <path
        d="M112 95 L120 103 L138 85 M125 95 L133 103 L150 85"
        stroke="#ffffff"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Small Notification Bell */}
      <circle cx="180" cy="50" r="18" fill="#f59e0b" />
      <circle cx="180" cy="50" r="14" fill="#fbbf24" />
      <path d="M174 54 C174 46, 186 46, 186 54 L172 54" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="180" cy="57" r="2.5" fill="#78350f" />
    </svg>
  )
}

// 4. Real-Time Analytics: Three rounded 3D bars with rising trend line and data node
export function AnalyticsIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 240 180"
      fill="none"
      className={className}
      aria-hidden="true"
      style={{ filter: 'drop-shadow(0 14px 18px rgba(0,0,0,0.22))' }}
    >
      <defs>
        <linearGradient id="an-card-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f1f5f9" />
        </linearGradient>
        <linearGradient id="an-bar-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="an-bar-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="an-bar-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
      </defs>

      {/* Shadow */}
      <ellipse cx="120" cy="158" rx="85" ry="12" fill="rgba(0,0,0,0.25)" />

      {/* Glass card panel */}
      <rect x="45" y="40" width="150" height="110" rx="18" fill="url(#an-card-bg)" />
      <rect x="46" y="41" width="148" height="108" rx="17" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" />

      {/* 3 Analytics Bars */}
      <rect x="68" y="98" width="22" height="42" rx="7" fill="url(#an-bar-1)" />
      <rect x="108" y="74" width="22" height="66" rx="7" fill="url(#an-bar-2)" />
      <rect x="148" y="55" width="22" height="85" rx="7" fill="url(#an-bar-3)" />

      {/* Rising Trend Line with Glowing Nodes */}
      <path
        d="M72 90 Q112 60 160 48"
        stroke="#ffedd5"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="160" cy="48" r="7" fill="#ea580c" stroke="#ffffff" strokeWidth="2.5" />
      <circle cx="119" cy="67" r="5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
      <circle cx="79" cy="88" r="5" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
    </svg>
  )
}

// 5. Secure & Private: 3D Shield with padlock and subtle orbital rings
export function SecureIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 240 180"
      fill="none"
      className={className}
      aria-hidden="true"
      style={{ filter: 'drop-shadow(0 14px 18px rgba(0,0,0,0.22))' }}
    >
      <defs>
        <linearGradient id="sc-shield" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#6b21a8" />
        </linearGradient>
        <linearGradient id="sc-lock" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#eab308" />
        </linearGradient>
      </defs>

      {/* Shadow */}
      <ellipse cx="120" cy="158" rx="75" ry="12" fill="rgba(0,0,0,0.25)" />

      {/* Orbital Ring */}
      <ellipse cx="120" cy="90" rx="90" ry="28" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeDasharray="6 6" fill="none" />

      {/* Shield Body */}
      <path
        d="M120 30 C155 30 180 44 180 72 C180 115 145 138 120 152 C95 138 60 115 60 72 C60 44 85 30 120 30 Z"
        fill="url(#sc-shield)"
      />
      {/* Shield inner highlight */}
      <path
        d="M120 36 C150 36 172 48 172 72 C172 108 142 128 120 142 C98 128 68 108 68 72 C68 48 90 36 120 36 Z"
        fill="none"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="3"
      />

      {/* Padlock */}
      {/* Shackle */}
      <path d="M106 82 C106 70 134 70 134 82 L134 90 L106 90 Z" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" fill="none" />
      {/* Body */}
      <rect x="98" y="88" width="44" height="34" rx="9" fill="url(#sc-lock)" />
      {/* Keyhole */}
      <circle cx="120" cy="102" r="3.5" fill="#713f12" />
      <polygon points="118,103 122,103 121,112 119,112" fill="#713f12" />
    </svg>
  )
}

// 6. Multi-Branch Ready: 3 connected branch node pins over layered map tile
export function MultiBranchIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 240 180"
      fill="none"
      className={className}
      aria-hidden="true"
      style={{ filter: 'drop-shadow(0 14px 18px rgba(0,0,0,0.22))' }}
    >
      <defs>
        <linearGradient id="mb-map" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fed7aa" />
          <stop offset="100%" stopColor="#fdba74" />
        </linearGradient>
      </defs>

      {/* Shadow */}
      <ellipse cx="120" cy="158" rx="85" ry="12" fill="rgba(0,0,0,0.25)" />

      {/* Map Tile Isometric Base */}
      <polygon points="120,85 195,115 120,145 45,115" fill="url(#mb-map)" />
      <polygon points="45,115 120,145 120,154 45,124" fill="#ea580c" />
      <polygon points="195,115 120,145 120,154 195,124" fill="#c2410c" />

      {/* Connecting Network Path */}
      <path
        d="M80 82 Q120 62 160 88"
        stroke="#ffffff"
        strokeWidth="3.5"
        strokeDasharray="4 4"
        fill="none"
      />
      <path
        d="M80 82 Q100 112 120 120"
        stroke="#ffffff"
        strokeWidth="3.5"
        strokeDasharray="4 4"
        fill="none"
      />
      <path
        d="M160 88 Q140 112 120 120"
        stroke="#ffffff"
        strokeWidth="3.5"
        strokeDasharray="4 4"
        fill="none"
      />

      {/* Pin 1 (Left Branch) */}
      <g transform="translate(68, 55)">
        <ellipse cx="12" cy="27" rx="6" ry="3" fill="rgba(0,0,0,0.25)" />
        <path d="M12 0 C5.5 0 0 5.5 0 12 C0 20 12 28 12 28 C12 28 24 20 24 12 C24 5.5 18.5 0 12 0 Z" fill="#ef4444" />
        <circle cx="12" cy="11" r="4.5" fill="#ffffff" />
      </g>

      {/* Pin 2 (Right Branch) */}
      <g transform="translate(148, 60)">
        <ellipse cx="12" cy="27" rx="6" ry="3" fill="rgba(0,0,0,0.25)" />
        <path d="M12 0 C5.5 0 0 5.5 0 12 C0 20 12 28 12 28 C12 28 24 20 24 12 C24 5.5 18.5 0 12 0 Z" fill="#3b82f6" />
        <circle cx="12" cy="11" r="4.5" fill="#ffffff" />
      </g>

      {/* Pin 3 (Central HQ Branch) */}
      <g transform="translate(108, 92)">
        <ellipse cx="12" cy="27" rx="6" ry="3" fill="rgba(0,0,0,0.25)" />
        <path d="M12 0 C5.5 0 0 5.5 0 12 C0 20 12 28 12 28 C12 28 24 20 24 12 C24 5.5 18.5 0 12 0 Z" fill="#10b981" />
        <circle cx="12" cy="11" r="4.5" fill="#ffffff" />
      </g>
    </svg>
  )
}

// 7. Local Support: Support headset with multilingual speech bubbles
export function SupportIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 240 180"
      fill="none"
      className={className}
      aria-hidden="true"
      style={{ filter: 'drop-shadow(0 14px 18px rgba(0,0,0,0.22))' }}
    >
      <defs>
        <linearGradient id="sp-headset" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f472b6" />
        </linearGradient>
      </defs>

      {/* Shadow */}
      <ellipse cx="120" cy="158" rx="80" ry="12" fill="rgba(0,0,0,0.22)" />

      {/* Speech Bubble */}
      <rect x="130" y="32" width="65" height="42" rx="14" fill="#ffffff" />
      <polygon points="142,74 150,74 138,84" fill="#ffffff" />
      <text x="162" y="58" fontSize="16" fontWeight="bold" fill="#db2777" textAnchor="middle" fontFamily="sans-serif">24/7</text>

      {/* Headset Arc */}
      <path
        d="M72 105 C72 58 168 58 168 105"
        stroke="url(#sp-headset)"
        strokeWidth="11"
        strokeLinecap="round"
        fill="none"
      />

      {/* Left Earpad */}
      <rect x="62" y="95" width="22" height="38" rx="10" fill="#be185d" />
      <rect x="65" y="98" width="16" height="32" rx="7" fill="#f43f5e" />

      {/* Right Earpad */}
      <rect x="156" y="95" width="22" height="38" rx="10" fill="#be185d" />
      <rect x="159" y="98" width="16" height="32" rx="7" fill="#f43f5e" />

      {/* Microphone Boom */}
      <path
        d="M72 118 Q75 142 108 140"
        stroke="#be185d"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="112" cy="140" r="6" fill="#fbbf24" />
    </svg>
  )
}

// 8. 20-Day Free Trial: Golden ticket badge with check and big "20"
export function FreeTrialIllustration({ className }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 240 180"
      fill="none"
      className={className}
      aria-hidden="true"
      style={{ filter: 'drop-shadow(0 14px 18px rgba(0,0,0,0.22))' }}
    >
      <defs>
        <linearGradient id="ft-badge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="ft-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#eab308" />
        </linearGradient>
      </defs>

      {/* Shadow */}
      <ellipse cx="120" cy="158" rx="80" ry="12" fill="rgba(0,0,0,0.25)" />

      {/* Big Golden Ticket / Card Base */}
      <rect x="52" y="45" width="136" height="88" rx="18" fill="url(#ft-badge)" />
      {/* Dashed voucher divider */}
      <line x1="145" y1="46" x2="145" y2="132" stroke="rgba(255,255,255,0.4)" strokeWidth="3" strokeDasharray="6 6" />

      {/* Left voucher notch */}
      <circle cx="145" cy="45" r="9" fill="#0d1a14" />
      {/* Right voucher notch */}
      <circle cx="145" cy="133" r="9" fill="#0d1a14" />

      {/* "20" Days numeral */}
      <text x="96" y="104" fontSize="48" fontWeight="900" fill="#ffffff" textAnchor="middle" fontFamily="sans-serif">
        20
      </text>
      <text x="96" y="122" fontSize="13" fontWeight="bold" fill="rgba(255,255,255,0.85)" textAnchor="middle" letterSpacing="0.08em" fontFamily="sans-serif">
        DAYS FREE
      </text>

      {/* Verified Seal Badge with Checkmark */}
      <circle cx="168" cy="90" r="18" fill="url(#ft-gold)" />
      <path
        d="M161 90 L166 95 L176 84"
        stroke="#78350f"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}
