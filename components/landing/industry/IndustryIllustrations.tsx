'use client'

import React from 'react'

export interface IndustryThemeConfig {
  gradient: string
  accentColor: string
  shadowColor: string
  iconName: string
  illustrationType:
    | 'warehouse'
    | 'books'
    | 'calendar'
    | 'ballet'
    | 'piano'
    | 'swim'
    | 'martial'
    | 'lotus'
    | 'wedding'
    | 'camera'
}

export const INDUSTRY_CONFIGS: Record<string, IndustryThemeConfig> = {
  'dance-academy': {
    gradient: 'linear-gradient(145deg, #f47ad8 0%, #c026d3 100%)',
    accentColor: '#a21caf',
    shadowColor: 'rgba(192, 38, 211, 0.45)',
    iconName: 'Heart',
    illustrationType: 'ballet',
  },
  'music-school': {
    gradient: 'linear-gradient(145deg, #2dd4bf 0%, #0f9488 100%)',
    accentColor: '#0f766e',
    shadowColor: 'rgba(15, 148, 136, 0.45)',
    iconName: 'Music',
    illustrationType: 'piano',
  },
  'swimming-academy': {
    gradient: 'linear-gradient(145deg, #38bdf8 0%, #0369a1 100%)',
    accentColor: '#0369a1',
    shadowColor: 'rgba(3, 105, 161, 0.45)',
    iconName: 'Waves',
    illustrationType: 'swim',
  },
  'martial-arts': {
    gradient: 'linear-gradient(145deg, #3b4a6b 0%, #111a33 100%)',
    accentColor: '#1e293b',
    shadowColor: 'rgba(17, 26, 51, 0.50)',
    iconName: 'Swords',
    illustrationType: 'martial',
  },
  'yoga-studio': {
    gradient: 'linear-gradient(145deg, #3ccf7a 0%, #1f9a52 100%)',
    accentColor: '#15803d',
    shadowColor: 'rgba(31, 154, 82, 0.45)',
    iconName: 'Sparkles',
    illustrationType: 'lotus',
  },
  'tuition-centre': {
    gradient: 'linear-gradient(145deg, #9b7bff 0%, #6a3fe0 100%)',
    accentColor: '#5b3fd0',
    shadowColor: 'rgba(106, 63, 224, 0.45)',
    iconName: 'GraduationCap',
    illustrationType: 'books',
  },
  'rental-business': {
    gradient: 'linear-gradient(145deg, #ffa02e 0%, #ff7a00 100%)',
    accentColor: '#ea6a00',
    shadowColor: 'rgba(255, 122, 0, 0.45)',
    iconName: 'Package',
    illustrationType: 'warehouse',
  },
  'event-company': {
    gradient: 'linear-gradient(145deg, #5b9bff 0%, #2f6bf0 100%)',
    accentColor: '#2f5fe0',
    shadowColor: 'rgba(47, 107, 240, 0.45)',
    iconName: 'PartyPopper',
    illustrationType: 'calendar',
  },
  'wedding-planner': {
    gradient: 'linear-gradient(145deg, #ffa6c9 0%, #ec5b9a 100%)',
    accentColor: '#be185d',
    shadowColor: 'rgba(236, 91, 154, 0.45)',
    iconName: 'CalendarHeart',
    illustrationType: 'wedding',
  },
  'photography-studio': {
    gradient: 'linear-gradient(145deg, #7b86ff 0%, #3f3fd6 100%)',
    accentColor: '#3730a3',
    shadowColor: 'rgba(63, 63, 214, 0.45)',
    iconName: 'Camera',
    illustrationType: 'camera',
  },
}

/* -------------------------------------------------------------------------- */
/*  Shared Soft-Clay SVG Kit (§5.3)                                           */
/* -------------------------------------------------------------------------- */

function SoftShadow({ id, cx = 80, cy = 130, rx = 65, ry = 10 }: { id: string; cx?: number; cy?: number; rx?: number; ry?: number }) {
  return (
    <>
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(20, 10, 40, 0.28)" />
          <stop offset="100%" stopColor="rgba(20, 10, 40, 0)" />
        </radialGradient>
      </defs>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={`url(#${id})`} />
    </>
  )
}

/* -------------------------------------------------------------------------- */
/*  10 Soft 3D Clay Illustrations (§5.2, §5.3)                                */
/* -------------------------------------------------------------------------- */

/** 1. Rental Business: Warehouse, stacked boxes & hand trolley */
export function WarehouseIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="whShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(40, 20, 80, 0.35)" />
          <stop offset="100%" stopColor="rgba(40, 20, 80, 0)" />
        </radialGradient>
        <linearGradient id="roofGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff8ed" />
          <stop offset="100%" stopColor="#ffd9a0" />
        </linearGradient>
        <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f3eee5" />
        </linearGradient>
        <linearGradient id="doorGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5b3fd0" />
          <stop offset="100%" stopColor="#7a5cf0" />
        </linearGradient>
        <linearGradient id="boxGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8cf9a" />
          <stop offset="100%" stopColor="#e59f52" />
        </linearGradient>
      </defs>

      <ellipse cx="140" cy="168" rx="125" ry="12" fill="url(#whShadow)" />

      <g filter="drop-shadow(0 14px 18px rgba(60,40,120,0.22))">
        <rect x="75" y="70" width="130" height="90" rx="8" fill="url(#wallGrad)" />
        <rect x="100" y="90" width="80" height="70" rx="6" fill="url(#doorGrad)" />

        <path
          d="M60 76L140 28L220 76H60Z"
          fill="url(#roofGrad)"
          stroke="#ffe6b8"
          strokeWidth="3"
        />
        <path d="M140 28L220 76" stroke="rgba(255,255,255,0.7)" strokeWidth="4" strokeLinecap="round" />

        <rect x="108" y="112" width="34" height="42" rx="4" fill="url(#boxGrad)" stroke="#d98c3a" strokeWidth="1.5" />
        <line x1="108" y1="130" x2="142" y2="130" stroke="#ffd9a0" strokeWidth="3" />

        <rect x="138" y="120" width="36" height="34" rx="4" fill="url(#boxGrad)" stroke="#d98c3a" strokeWidth="1.5" />
        <line x1="138" y1="136" x2="174" y2="136" stroke="#ffd9a0" strokeWidth="3" />

        <rect x="118" y="86" width="32" height="28" rx="4" fill="url(#boxGrad)" stroke="#d98c3a" strokeWidth="1.5" />
        <line x1="118" y1="100" x2="150" y2="100" stroke="#ffd9a0" strokeWidth="2.5" />

        <g transform="translate(68, 110)">
          <path d="M4 0L14 36H28" stroke="#6344d4" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="12" y1="28" x2="26" y2="28" stroke="#7a5cf0" strokeWidth="3" />
          <circle cx="16" cy="40" r="7" fill="#2d264d" />
          <circle cx="16" cy="40" r="3" fill="#ffffff" />
        </g>
      </g>
    </svg>
  )
}

/** 2. Tuition Centre: Stack of books + pencil */
export function BooksIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <SoftShadow id="bkShadow" cx={80} cy={130} rx={70} ry={10} />

      <g filter="drop-shadow(0 14px 18px rgba(60,40,120,0.22))">
        {/* Bottom Book (Indigo) */}
        <g transform="translate(15, 88)">
          <rect x="0" y="0" width="130" height="26" rx="6" fill="#5b4bd6" />
          <rect x="18" y="4" width="108" height="18" rx="3" fill="#fff9ef" />
          <line x1="6" y1="3" x2="6" y2="23" stroke="#8475f4" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* Middle Book (Pink / Coral) */}
        <g transform="translate(24, 58) rotate(-4)">
          <rect x="0" y="0" width="122" height="24" rx="6" fill="#f26fb0" />
          <rect x="16" y="4" width="102" height="16" rx="3" fill="#fff9ef" />
          <line x1="6" y1="3" x2="6" y2="21" stroke="#fca5d0" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* Top Book (Cream / Warm Yellow) */}
        <g transform="translate(32, 28) rotate(3)">
          <rect x="0" y="0" width="112" height="22" rx="6" fill="#ffb84d" />
          <rect x="14" y="4" width="94" height="14" rx="3" fill="#fffcf5" />
          <line x1="6" y1="3" x2="6" y2="19" stroke="#ffe099" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* Diagonal Soft Pencil */}
        <g transform="translate(110, 14) rotate(42)">
          <rect x="0" y="0" width="10" height="42" rx="3" fill="#ff4d6d" />
          <polygon points="0,42 10,42 5,52" fill="#ffe0b2" />
          <polygon points="3,48 7,48 5,52" fill="#2d264d" />
        </g>
      </g>
    </svg>
  )
}

/** 3. Event Company: Calendar with check badge */
export function CalendarIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <SoftShadow id="calShadow" cx={80} cy={130} rx={65} ry={10} />

      <g filter="drop-shadow(0 14px 18px rgba(60,40,120,0.22))">
        <rect x="25" y="24" width="110" height="95" rx="14" fill="#ffffff" stroke="#e1e8fc" strokeWidth="2" />

        <path d="M25 38C25 30.268 31.268 24 39 24H121C128.732 24 135 30.268 135 38V48H25V38Z" fill="#6a7cf0" />

        <rect x="48" y="16" width="8" height="16" rx="4" fill="#3b4fc4" />
        <rect x="104" y="16" width="8" height="16" rx="4" fill="#3b4fc4" />

        <circle cx="48" cy="64" r="4" fill="#cdd6f7" />
        <circle cx="72" cy="64" r="4" fill="#cdd6f7" />
        <circle cx="96" cy="64" r="4" fill="#cdd6f7" />
        <circle cx="120" cy="64" r="4" fill="#cdd6f7" />

        <circle cx="48" cy="82" r="4" fill="#cdd6f7" />
        <circle cx="72" cy="82" r="4" fill="#cdd6f7" />
        <circle cx="96" cy="82" r="4" fill="#cdd6f7" />

        <circle cx="48" cy="100" r="4" fill="#cdd6f7" />
        <circle cx="72" cy="100" r="4" fill="#cdd6f7" />

        <g transform="translate(92, 78)">
          <circle cx="24" cy="24" r="22" fill="#ff9a2e" stroke="#ffffff" strokeWidth="4" />
          <path
            d="M16 24L22 30L32 18"
            stroke="#ffffff"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  )
}

/** 4. Dance Academy: Ballet slippers with ribbons + music note */
export function BalletIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <SoftShadow id="balletShadow" cx={80} cy={130} rx={60} ry={10} />

      <g filter="drop-shadow(0 14px 18px rgba(160,20,120,0.24))">
        {/* Left Slipper */}
        <g transform="translate(36, 40) rotate(-14)">
          <path
            d="M16 10 C22 10 32 30 30 65 C28 78 18 84 10 82 C2 80 0 70 2 58 C6 30 10 10 16 10Z"
            fill="url(#slipperGrad1)"
          />
          <path d="M12 24 C18 36 18 52 14 68" stroke="rgba(255,255,255,0.7)" strokeWidth="3" strokeLinecap="round" />
          {/* Ribbon Crisscross */}
          <path d="M4 28 C12 34 22 30 26 38" stroke="#fbcfe8" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M26 24 C18 32 8 38 4 46" stroke="#fbcfe8" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Right Slipper */}
        <g transform="translate(74, 46) rotate(10)">
          <path
            d="M16 10 C22 10 32 30 30 65 C28 78 18 84 10 82 C2 80 0 70 2 58 C6 30 10 10 16 10Z"
            fill="url(#slipperGrad2)"
          />
          <path d="M12 24 C18 36 18 52 14 68" stroke="rgba(255,255,255,0.7)" strokeWidth="3" strokeLinecap="round" />
          <path d="M4 28 C12 34 22 30 26 38" stroke="#fbcfe8" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M26 24 C18 32 8 38 4 46" stroke="#fbcfe8" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Floating Glossy Music Note */}
        <g transform="translate(108, 18) rotate(12)">
          <circle cx="8" cy="20" r="6" fill="#ffffff" />
          <rect x="12" y="4" width="3" height="17" rx="1.5" fill="#ffffff" />
          <path d="M14 4 C18 4 22 8 22 12" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
        </g>
      </g>

      <defs>
        <linearGradient id="slipperGrad1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fdf2f8" />
          <stop offset="100%" stopColor="#f472b6" />
        </linearGradient>
        <linearGradient id="slipperGrad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fce7f3" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
    </svg>
  )
}

/** 5. Music School: Rounded piano keys with floating notes */
export function PianoIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <SoftShadow id="pianoShadow" cx={80} cy={130} rx={65} ry={10} />

      <g filter="drop-shadow(0 14px 18px rgba(10,80,70,0.22))">
        {/* Curved Piano Base / Tray */}
        <rect x="20" y="55" width="120" height="65" rx="14" fill="#042f2c" stroke="#14b8a6" strokeWidth="2" />

        {/* White Keys */}
        <g transform="translate(26, 62)">
          {[0, 18, 36, 54, 72, 90].map((kx, idx) => (
            <g key={idx} transform={`translate(${kx}, 0)`}>
              <rect x="0" y="0" width="16" height="52" rx="4" fill="#f0fdfa" />
              <line x1="2" y1="4" x2="2" y2="48" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" />
            </g>
          ))}
          {/* Black Keys */}
          {[12, 30, 66, 84].map((bx, idx) => (
            <rect key={idx} x={bx} y="0" width="10" height="32" rx="3" fill="#0f172a" />
          ))}
        </g>

        {/* Floating Teal & White Notes */}
        <g transform="translate(40, 20) rotate(-8)">
          <circle cx="8" cy="18" r="5" fill="#a7f3d0" />
          <rect x="11" y="4" width="2.5" height="15" rx="1.2" fill="#a7f3d0" />
          <path d="M12 4 C16 4 20 7 20 11" stroke="#a7f3d0" strokeWidth="2.5" strokeLinecap="round" />
        </g>
        <g transform="translate(100, 16) rotate(14)">
          <circle cx="6" cy="16" r="4.5" fill="#ffffff" />
          <circle cx="20" cy="14" r="4.5" fill="#ffffff" />
          <rect x="9" y="3" width="2" height="14" fill="#ffffff" />
          <rect x="23" y="1" width="2" height="14" fill="#ffffff" />
          <path d="M10 4 L24 2" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  )
}

/** 6. Swimming Academy: Swim goggles over layered waves with lane float */
export function SwimIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <SoftShadow id="swimShadow" cx={80} cy={130} rx={65} ry={10} />

      <g filter="drop-shadow(0 14px 18px rgba(3,105,161,0.24))">
        {/* Layered Water Waves */}
        <path
          d="M20 95 C45 85 70 105 95 95 C120 85 135 98 145 95 V120 H20 Z"
          fill="#0284c7"
          opacity="0.8"
        />
        <path
          d="M15 106 C40 96 68 114 96 104 C122 96 138 108 148 106 V125 H15 Z"
          fill="#38bdf8"
        />

        {/* Lane Float Buoys */}
        <g transform="translate(26, 88)">
          <line x1="0" y1="8" x2="110" y2="8" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="16" cy="8" r="6" fill="#facc15" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="48" cy="8" r="6" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="80" cy="8" r="6" fill="#facc15" stroke="#ffffff" strokeWidth="1.5" />
        </g>

        {/* 3D Goggles Body */}
        <g transform="translate(38, 38)">
          {/* Strap */}
          <path d="M0 24 C14 10 70 10 84 24" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
          {/* Left Lens */}
          <rect x="12" y="10" width="28" height="22" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="3" />
          <path d="M16 14 C20 12 28 12 32 14" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          {/* Right Lens */}
          <rect x="46" y="10" width="28" height="22" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="3" />
          <path d="M50 14 C54 12 62 12 66 14" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          {/* Bridge */}
          <path d="M38 20 H48" stroke="#0284c7" strokeWidth="3.5" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  )
}

/** 7. Martial Arts: Black belt knot + red accent stripe */
export function MartialIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <SoftShadow id="maShadow" cx={80} cy={130} rx={60} ry={10} />

      <g filter="drop-shadow(0 14px 18px rgba(10,15,30,0.32))">
        {/* Uniform Collar (Folded V) */}
        <path d="M40 32 L80 85 L120 32" stroke="#f8fafc" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M40 32 L80 85 L120 32" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        {/* Black Belt Horizontal Band */}
        <rect x="25" y="80" width="110" height="20" rx="4" fill="#0f172a" />
        <rect x="100" y="80" width="18" height="20" fill="#dc2626" />
        <line x1="25" y1="83" x2="135" y2="83" stroke="#334155" strokeWidth="1.5" />

        {/* Central Belt Knot */}
        <g transform="translate(68, 74)">
          <rect x="0" y="0" width="24" height="28" rx="6" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
          {/* Left Hanging Belt Tail */}
          <path d="M4 26 L-4 54 C-5 58 -2 60 2 60 L12 60 L14 26 Z" fill="#0f172a" />
          {/* Right Hanging Belt Tail with Red Stripes */}
          <path d="M18 26 L26 54 C27 58 24 60 20 60 L10 60 L8 26 Z" fill="#0f172a" />
          <rect x="18" y="44" width="8" height="3" fill="#dc2626" />
          <rect x="17" y="49" width="8" height="3" fill="#dc2626" />
        </g>
      </g>
    </svg>
  )
}

/** 8. Yoga Studio: Lotus flower on a rolled mat */
export function LotusIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <SoftShadow id="yogaShadow" cx={80} cy={130} rx={65} ry={10} />

      <g filter="drop-shadow(0 14px 18px rgba(20,80,40,0.22))">
        {/* Rolled Yoga Mat */}
        <g transform="translate(24, 96)">
          <rect x="16" y="0" width="96" height="18" rx="7" fill="#86efac" />
          <ellipse cx="16" cy="9" rx="8" ry="9" fill="#22c55e" />
          <ellipse cx="16" cy="9" rx="4" ry="5" fill="#15803d" />
          <line x1="20" y1="3" x2="108" y2="3" stroke="#bbf7d0" strokeWidth="2" />
        </g>

        {/* Blooming Lotus Flower */}
        <g transform="translate(80, 72)">
          {/* Outer Left Petal */}
          <path d="M0 16 C-24 10 -38 -8 -28 -24 C-20 -10 -8 4 0 16Z" fill="#a7f3d0" />
          {/* Outer Right Petal */}
          <path d="M0 16 C24 10 38 -8 28 -24 C20 -10 8 4 0 16Z" fill="#a7f3d0" />
          {/* Mid Left Petal */}
          <path d="M0 16 C-18 6 -24 -18 -12 -30 C-6 -14 0 2 0 16Z" fill="#dcfce7" />
          {/* Mid Right Petal */}
          <path d="M0 16 C18 6 24 -18 12 -30 C6 -14 0 2 0 16Z" fill="#dcfce7" />
          {/* Central Petal */}
          <path d="M0 16 C-10 0 -8 -28 0 -36 C8 -28 10 0 0 16Z" fill="#ffffff" />
          <path d="M0 10 L0 -28" stroke="#86efac" strokeWidth="2" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  )
}

/** 9. Wedding Planner: Two interlocking rings, heart & flower sprig */
export function WeddingIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <SoftShadow id="wedShadow" cx={80} cy={130} rx={60} ry={10} />

      <g filter="drop-shadow(0 14px 18px rgba(180,20,90,0.24))">
        {/* Flower Sprig */}
        <g transform="translate(40, 75) rotate(-22)">
          <path d="M0 30 Q25 15 50 0" stroke="#fbcfe8" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="14" cy="20" rx="6" ry="3" fill="#f472b6" transform="rotate(-30 14 20)" />
          <ellipse cx="32" cy="12" rx="6" ry="3" fill="#f472b6" transform="rotate(30 32 12)" />
        </g>

        {/* Ring 1 (Gold Left) */}
        <g transform="translate(56, 60)">
          <ellipse cx="18" cy="24" rx="18" ry="24" fill="none" stroke="#fde047" strokeWidth="6" />
          <ellipse cx="18" cy="24" rx="18" ry="24" fill="none" stroke="#eab308" strokeWidth="1.5" />
          <path d="M6 14 C10 8 18 6 24 8" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* Ring 2 (Rose Gold Right with Diamond) */}
        <g transform="translate(74, 52)">
          <ellipse cx="18" cy="24" rx="18" ry="24" fill="none" stroke="#fed7aa" strokeWidth="6" />
          <path d="M8 12 C12 6 20 5 26 7" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
          {/* Diamond Solitaire */}
          <polygon points="18, -4 26, 4 18, 12 10, 4" fill="#ffffff" stroke="#f472b6" strokeWidth="1.5" />
        </g>

        {/* Floating Glossy Heart */}
        <g transform="translate(78, 22)">
          <path
            d="M12 4 C8 -2 0 0 0 7 C0 14 12 22 12 22 C12 22 24 14 24 7 C24 0 16 -2 12 4 Z"
            fill="#fb7185"
            stroke="#ffffff"
            strokeWidth="1.5"
          />
          <path d="M4 6 C4 4 6 2 8 3" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  )
}

/** 10. Photography Studio: Camera with softbox lens flare */
export function CameraIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <SoftShadow id="camShadow" cx={80} cy={130} rx={65} ry={10} />

      <g filter="drop-shadow(0 14px 18px rgba(40,40,140,0.24))">
        {/* Softbox / Flash Panel on the Left */}
        <g transform="translate(20, 28) rotate(-12)">
          <rect x="0" y="0" width="28" height="44" rx="6" fill="#312e81" stroke="#818cf8" strokeWidth="2" />
          <rect x="3" y="3" width="22" height="38" rx="4" fill="#e0e7ff" />
          <path d="M6 8 L22 36" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Camera Main Body */}
        <g transform="translate(46, 45)">
          <rect x="0" y="14" width="88" height="58" rx="12" fill="#1e1b4b" stroke="#4338ca" strokeWidth="2" />
          <rect x="4" y="24" width="80" height="28" rx="4" fill="#312e81" />

          {/* Shutter Button & Top Turret */}
          <rect x="14" y="8" width="14" height="6" rx="2" fill="#fbbf24" />
          <rect x="36" y="6" width="22" height="8" rx="3" fill="#3730a3" />

          {/* Big Lens */}
          <g transform="translate(44, 43)">
            <circle cx="0" cy="0" r="22" fill="#0f172a" stroke="#6366f1" strokeWidth="3" />
            <circle cx="0" cy="0" r="15" fill="#1e1b4b" />
            <circle cx="0" cy="0" r="8" fill="#38bdf8" />
            <circle cx="-3" cy="-3" r="3" fill="#ffffff" />
          </g>
        </g>

        {/* Small Light Burst */}
        <g transform="translate(126, 26)">
          <path d="M0 6 L8 0 L6 8 L14 10 L6 12 L8 20 L0 14 L-6 20 L-4 12 L-12 10 L-4 8 L-6 0 Z" fill="#fef08a" />
        </g>
      </g>
    </svg>
  )
}

/** Unified Illustration Dispatcher */
export function IndustryIllustration({
  type,
  className,
}: {
  type?: IndustryThemeConfig['illustrationType']
  className?: string
}) {
  switch (type) {
    case 'warehouse':
      return <WarehouseIllustration className={className} />
    case 'books':
      return <BooksIllustration className={className} />
    case 'calendar':
      return <CalendarIllustration className={className} />
    case 'ballet':
      return <BalletIllustration className={className} />
    case 'piano':
      return <PianoIllustration className={className} />
    case 'swim':
      return <SwimIllustration className={className} />
    case 'martial':
      return <MartialIllustration className={className} />
    case 'lotus':
      return <LotusIllustration className={className} />
    case 'wedding':
      return <WeddingIllustration className={className} />
    case 'camera':
      return <CameraIllustration className={className} />
    default:
      return <WarehouseIllustration className={className} />
  }
}
