'use client'

import React from 'react'

interface TileIconProps {
  name: string
  accentColor?: string
  primaryColor?: string
  isActive?: boolean
}

export function TileIcon({
  name,
  accentColor = '#0176d3',
  primaryColor = '#0f172a',
  isActive = true,
}: TileIconProps) {
  switch (name) {
    case 'calendar':
      return (
        <svg
          viewBox="0 0 52 52"
          className="size-[44px] overflow-visible"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Calendar Body */}
          <rect
            x="7"
            y="10"
            width="38"
            height="35"
            rx="8"
            stroke={primaryColor}
            strokeWidth="2.5"
            fill={accentColor}
            fillOpacity="0.12"
          />
          {/* Header Bar */}
          <path d="M7 19H45" stroke={primaryColor} strokeWidth="2.5" />
          {/* Binders */}
          <path d="M16 6V12" stroke={accentColor} strokeWidth="3" />
          <path d="M36 6V12" stroke={accentColor} strokeWidth="3" />
          {/* Checkmark drawing */}
          <path
            d="M17 31L23 37L35 25"
            stroke={accentColor}
            strokeWidth="3.5"
            strokeDasharray="28"
            strokeDashoffset={isActive ? '0' : '28'}
            className={isActive ? 'animate-draw-check' : ''}
          />
        </svg>
      )

    case 'qr':
      return (
        <svg viewBox="0 0 52 52" className="size-[44px] overflow-visible" fill="none">
          {/* 3 Corner Markers */}
          <rect x="8" y="8" width="13" height="13" rx="3" stroke={primaryColor} strokeWidth="2.5" />
          <rect x="12" y="12" width="5" height="5" rx="1" fill={accentColor} />

          <rect x="31" y="8" width="13" height="13" rx="3" stroke={primaryColor} strokeWidth="2.5" />
          <rect x="35" y="12" width="5" height="5" rx="1" fill={accentColor} />

          <rect x="8" y="31" width="13" height="13" rx="3" stroke={primaryColor} strokeWidth="2.5" />
          <rect x="12" y="35" width="5" height="5" rx="1" fill={accentColor} />

          {/* Dots */}
          <rect x="25" y="12" width="3" height="3" rx="1" fill={primaryColor} fillOpacity="0.8" />
          <rect x="25" y="24" width="4" height="4" rx="1" fill={accentColor} />
          <rect x="34" y="25" width="4" height="4" rx="1" fill={primaryColor} />
          <rect x="25" y="36" width="3" height="3" rx="1" fill={primaryColor} fillOpacity="0.8" />
          <rect x="35" y="35" width="8" height="8" rx="2" stroke={primaryColor} strokeWidth="2" fill={accentColor} fillOpacity="0.2" />

          {/* Laser Scan Beam */}
          {isActive && (
            <line
              x1="6"
              y1="10"
              x2="46"
              y2="10"
              stroke="#ef4444"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="animate-qr-scan"
            />
          )}
        </svg>
      )

    case 'shield':
      return (
        <svg viewBox="0 0 52 52" className="size-[44px] overflow-visible" fill="none">
          {/* Outer Pulsing Aura */}
          {isActive && (
            <path
              d="M26 6L43 12V24C43 35 35 44 26 47C17 44 9 35 9 24V12L26 6Z"
              stroke={accentColor}
              strokeWidth="1.5"
              strokeOpacity="0.4"
              className="animate-shield-pulse"
            />
          )}
          {/* Shield Outline */}
          <path
            d="M26 8L41 13.5V24C41 33.5 34 41.5 26 44.5C18 41.5 11 33.5 11 24V13.5L26 8Z"
            stroke={primaryColor}
            strokeWidth="2.5"
            strokeLinejoin="round"
            fill={accentColor}
            fillOpacity="0.14"
          />
          {/* Inner Check */}
          <path
            d="M19 25L24 30L33 20"
            stroke={accentColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )

    case 'clock':
      return (
        <svg viewBox="0 0 52 52" className="size-[44px] overflow-visible" fill="none">
          <circle cx="26" cy="26" r="19" stroke={primaryColor} strokeWidth="2.5" fill={accentColor} fillOpacity="0.12" />
          {/* Hour Marks */}
          <line x1="26" y1="10" x2="26" y2="13" stroke={primaryColor} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="42" y1="26" x2="39" y2="26" stroke={primaryColor} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="26" y1="42" x2="26" y2="39" stroke={primaryColor} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="10" y1="26" x2="13" y2="26" stroke={primaryColor} strokeWidth="2.5" strokeLinecap="round" />
          {/* Center Point */}
          <circle cx="26" cy="26" r="3" fill={accentColor} />
          {/* Hour Hand */}
          <line x1="26" y1="26" x2="33" y2="26" stroke={primaryColor} strokeWidth="3" strokeLinecap="round" />
          {/* Animated Minute Hand */}
          <line
            x1="26"
            y1="26"
            x2="26"
            y2="14"
            stroke={accentColor}
            strokeWidth="3"
            strokeLinecap="round"
            className={isActive ? 'animate-clock-hand origin-[26px_26px]' : ''}
          />
        </svg>
      )

    case 'users':
      return (
        <svg viewBox="0 0 52 52" className="size-[44px] overflow-visible" fill="none">
          {/* Back User */}
          <circle cx="35" cy="19" r="6" stroke={primaryColor} strokeWidth="2" strokeOpacity="0.6" />
          <path
            d="M28 39C28 33 32 30 38 30C44 30 48 33 48 39"
            stroke={primaryColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeOpacity="0.6"
          />
          {/* Front Main User */}
          <circle
            cx="21"
            cy="18"
            r="8"
            stroke={primaryColor}
            strokeWidth="2.5"
            fill={accentColor}
            fillOpacity="0.16"
          />
          <path
            d="M10 42C10 34.5 15 31 22 31C29 31 34 34.5 34 42"
            stroke={primaryColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            fill={accentColor}
            fillOpacity="0.12"
          />
          {/* Verified Badge */}
          <circle cx="27" cy="23" r="4.5" fill={accentColor} />
          <path d="M25 23L26.5 24.5L29 22" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )

    case 'wallet':
      return (
        <svg viewBox="0 0 52 52" className="size-[44px] overflow-visible" fill="none">
          {/* Wallet Base */}
          <rect
            x="7"
            y="14"
            width="38"
            height="27"
            rx="7"
            stroke={primaryColor}
            strokeWidth="2.5"
            fill={accentColor}
            fillOpacity="0.12"
          />
          {/* Wallet Flap */}
          <path d="M7 21C7 16 11 13 16 13H36C41 13 45 16 45 21" stroke={primaryColor} strokeWidth="2.5" />
          {/* Clasp */}
          <rect x="33" y="23" width="12" height="10" rx="3.5" fill={accentColor} stroke={primaryColor} strokeWidth="2" />
          <circle cx="37" cy="28" r="1.5" fill="white" />
          {/* Dropping Coin */}
          {isActive && (
            <circle
              cx="22"
              cy="8"
              r="6"
              fill="#fbbf24"
              stroke="#d97706"
              strokeWidth="1.5"
              className="animate-coin-drop"
            />
          )}
        </svg>
      )

    case 'bell':
      return (
        <svg
          viewBox="0 0 52 52"
          className={`size-[44px] overflow-visible ${isActive ? 'animate-bell-ring origin-[26px_9px]' : ''}`}
          fill="none"
        >
          {/* Hanging Loop */}
          <path d="M24 9C24 7.5 25 6 26 6C27 6 28 7.5 28 9" stroke={primaryColor} strokeWidth="2.5" strokeLinecap="round" />
          {/* Bell Body */}
          <path
            d="M12 37C14 37 16 35 17 31V21C17 15 21 11 26 11C31 11 35 15 35 21V31C36 35 38 37 40 37H12Z"
            stroke={primaryColor}
            strokeWidth="2.5"
            strokeLinejoin="round"
            fill={accentColor}
            fillOpacity="0.15"
          />
          {/* Clapper */}
          <path d="M22 41C22.5 43 24 44.5 26 44.5C28 44.5 29.5 43 30 41" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
          {/* Sound Ring */}
          <circle cx="26" cy="21" r="2" fill={accentColor} />
        </svg>
      )

    case 'bars':
      return (
        <svg viewBox="0 0 52 52" className="size-[44px] overflow-visible" fill="none">
          {/* Base Axis */}
          <line x1="8" y1="44" x2="44" y2="44" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" />
          {/* Bar 1 */}
          <rect
            x="11"
            y="28"
            width="7"
            height="14"
            rx="3"
            fill={primaryColor}
            fillOpacity="0.6"
            className={isActive ? 'animate-bar-grow-1 origin-bottom' : ''}
          />
          {/* Bar 2 */}
          <rect
            x="22"
            y="18"
            width="7"
            height="24"
            rx="3"
            fill={primaryColor}
            className={isActive ? 'animate-bar-grow-2 origin-bottom' : ''}
          />
          {/* Bar 3 */}
          <rect
            x="33"
            y="10"
            width="7"
            height="32"
            rx="3"
            fill={accentColor}
            className={isActive ? 'animate-bar-grow-3 origin-bottom' : ''}
          />
          {/* Trend Dot */}
          <circle cx="36.5" cy="8" r="3" fill="#fbbf24" stroke={primaryColor} strokeWidth="1.5" />
        </svg>
      )

    case 'box':
      return (
        <svg viewBox="0 0 52 52" className="size-[44px] overflow-visible" fill="none">
          {/* Isometric Box Base */}
          <path
            d="M26 18L42 27V39L26 48L10 39V27L26 18Z"
            stroke={primaryColor}
            strokeWidth="2"
            fill={accentColor}
            fillOpacity="0.14"
          />
          <path d="M26 18V48" stroke={primaryColor} strokeWidth="1.5" />
          <path d="M10 27L26 36L42 27" stroke={primaryColor} strokeWidth="1.5" />
          {/* Floating Lid */}
          <path
            d="M26 8L42 17L26 26L10 17L26 8Z"
            fill={accentColor}
            stroke={primaryColor}
            strokeWidth="2.5"
            className={isActive ? 'animate-lid-float' : ''}
          />
        </svg>
      )

    case 'popper':
      return (
        <svg viewBox="0 0 52 52" className="size-[44px] overflow-visible" fill="none">
          {/* Cone */}
          <path
            d="M10 44L17 21L37 41L10 44Z"
            fill={accentColor}
            stroke={primaryColor}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path d="M14 31L26 43" stroke={primaryColor} strokeWidth="2" />
          <path d="M16 24L34 42" stroke={primaryColor} strokeWidth="1.5" />
          {/* Confetti Particles */}
          <circle cx="36" cy="18" r="3" fill="#f59e0b" className={isActive ? 'animate-confetti-1' : ''} />
          <circle cx="28" cy="12" r="2.5" fill="#3b82f6" className={isActive ? 'animate-confetti-2' : ''} />
          <circle cx="43" cy="27" r="3" fill="#10b981" className={isActive ? 'animate-confetti-3' : ''} />
          <path d="M24 16C28 10 36 12 40 6" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )

    case 'barcode':
      return (
        <svg viewBox="0 0 52 52" className="size-[44px] overflow-visible" fill="none">
          {/* Outer Box */}
          <rect
            x="7"
            y="10"
            width="38"
            height="32"
            rx="6"
            stroke={primaryColor}
            strokeWidth="2"
            fill={accentColor}
            fillOpacity="0.1"
          />
          {/* Barcode Stripes */}
          <line x1="13" y1="16" x2="13" y2="36" stroke={primaryColor} strokeWidth="2.5" />
          <line x1="18" y1="16" x2="18" y2="36" stroke={primaryColor} strokeWidth="1.5" />
          <line x1="22" y1="16" x2="22" y2="36" stroke={primaryColor} strokeWidth="3" />
          <line x1="28" y1="16" x2="28" y2="36" stroke={primaryColor} strokeWidth="1.5" />
          <line x1="32" y1="16" x2="32" y2="36" stroke={primaryColor} strokeWidth="3.5" />
          <line x1="38" y1="16" x2="38" y2="36" stroke={primaryColor} strokeWidth="2" />
          {/* Red Scan Laser */}
          {isActive && (
            <line
              x1="9"
              y1="26"
              x2="43"
              y2="26"
              stroke="#ef4444"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="animate-barcode-pulse"
            />
          )}
        </svg>
      )

    case 'file':
    case 'fileCheck':
      return (
        <svg viewBox="0 0 52 52" className="size-[44px] overflow-visible" fill="none">
          <path
            d="M12 9C12 7.5 13.5 6 15 6H31L41 16V43C41 44.5 39.5 46 38 46H15C13.5 46 12 44.5 12 43V9Z"
            stroke={primaryColor}
            strokeWidth="2.5"
            strokeLinejoin="round"
            fill={accentColor}
            fillOpacity="0.12"
          />
          <path d="M30 6V17H41" stroke={primaryColor} strokeWidth="2" strokeLinejoin="round" />
          {name === 'fileCheck' ? (
            <path
              d="M18 29L23 34L34 22"
              stroke={accentColor}
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <>
              <line x1="18" y1="24" x2="34" y2="24" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
              <line x1="18" y1="31" x2="30" y2="31" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" />
              <line x1="18" y1="38" x2="26" y2="38" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" />
            </>
          )}
        </svg>
      )

    case 'building':
      return (
        <svg viewBox="0 0 52 52" className="size-[44px] overflow-visible" fill="none">
          {/* Left Tower */}
          <rect
            x="9"
            y="16"
            width="16"
            height="29"
            rx="3"
            stroke={primaryColor}
            strokeWidth="2"
            fill={accentColor}
            fillOpacity="0.1"
          />
          {/* Right Tower */}
          <rect
            x="25"
            y="8"
            width="18"
            height="37"
            rx="3"
            stroke={primaryColor}
            strokeWidth="2.5"
            fill={accentColor}
            fillOpacity="0.15"
          />
          {/* Windows */}
          <rect x="14" y="21" width="3" height="3" rx="1" fill={accentColor} />
          <rect x="14" y="28" width="3" height="3" rx="1" fill={primaryColor} />
          <rect x="14" y="35" width="3" height="3" rx="1" fill={accentColor} />

          <rect x="30" y="14" width="3.5" height="3.5" rx="1" fill={primaryColor} />
          <rect x="36" y="14" width="3.5" height="3.5" rx="1" fill={accentColor} />
          <rect x="30" y="21" width="3.5" height="3.5" rx="1" fill={accentColor} />
          <rect x="36" y="21" width="3.5" height="3.5" rx="1" fill={primaryColor} />
          <rect x="30" y="28" width="3.5" height="3.5" rx="1" fill={primaryColor} />
          <rect x="36" y="28" width="3.5" height="3.5" rx="1" fill={accentColor} />
        </svg>
      )

    case 'trending':
      return (
        <svg viewBox="0 0 52 52" className="size-[44px] overflow-visible" fill="none">
          <line x1="8" y1="44" x2="44" y2="44" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" />
          <polyline
            points="12,34 23,24 32,30 43,14"
            stroke={accentColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline points="35,14 43,14 43,22" stroke={accentColor} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="43" cy="14" r="3.5" fill="#f59e0b" stroke={primaryColor} strokeWidth="1.5" />
        </svg>
      )

    case 'phone':
      return (
        <svg viewBox="0 0 52 52" className="size-[44px] overflow-visible" fill="none">
          <rect
            x="13"
            y="7"
            width="26"
            height="39"
            rx="6"
            stroke={primaryColor}
            strokeWidth="2.5"
            fill={accentColor}
            fillOpacity="0.12"
          />
          <circle cx="26" cy="40" r="2" fill={primaryColor} />
          <line x1="21" y1="12" x2="31" y2="12" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" />
          {/* Screen Checkmark */}
          <path
            d="M20 25L24 29L32 20"
            stroke={accentColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )

    case 'message':
      return (
        <svg viewBox="0 0 52 52" className="size-[44px] overflow-visible" fill="none">
          <path
            d="M9 13C9 9.5 12 7 16 7H36C40 7 43 9.5 43 13V31C43 34.5 40 37 36 37H24L14 45V37H16C12 37 9 34.5 9 31V13Z"
            stroke={primaryColor}
            strokeWidth="2.5"
            strokeLinejoin="round"
            fill={accentColor}
            fillOpacity="0.12"
          />
          {/* Typing Dots */}
          <circle cx="20" cy="22" r="2.5" fill={accentColor} className={isActive ? 'animate-bounce [animation-delay:0ms]' : ''} />
          <circle cx="26" cy="22" r="2.5" fill={primaryColor} className={isActive ? 'animate-bounce [animation-delay:150ms]' : ''} />
          <circle cx="32" cy="22" r="2.5" fill={accentColor} className={isActive ? 'animate-bounce [animation-delay:300ms]' : ''} />
        </svg>
      )

    default: // generic check/badge
      return (
        <svg viewBox="0 0 52 52" className="size-[44px] overflow-visible" fill="none">
          <circle cx="26" cy="26" r="18" stroke={primaryColor} strokeWidth="2.5" fill={accentColor} fillOpacity="0.12" />
          <path
            d="M17 26L23 32L35 20"
            stroke={accentColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
  }
}
