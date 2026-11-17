'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  GraduationCap,
  Music,
  Waves,
  Swords,
  Heart,
  BookOpen,
  Package,
  PartyPopper,
  CalendarHeart,
  Camera,
} from 'lucide-react'
import { Logo } from '@/components/logo'
import { navLinks, industries } from '@/content/landing'
import { cn } from '@/lib/utils'

const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  Music,
  Waves,
  Swords,
  Heart,
  BookOpen,
  Package,
  PartyPopper,
  CalendarHeart,
  Camera,
}

// Module accent colors matching 1Grow brand palette
const INDUSTRY_COLOR_CONFIG: Record<
  string,
  { accent: string; bg: string; hoverBg: string }
> = {
  'dance-academy': {
    accent: '#8b5cf6', // Training Purple
    bg: 'rgba(139, 92, 246, 0.12)',
    hoverBg: '#8b5cf6',
  },
  'music-school': {
    accent: '#7c3aed', // Purple/Violet
    bg: 'rgba(124, 58, 237, 0.12)',
    hoverBg: '#7c3aed',
  },
  'swimming-academy': {
    accent: '#0284c7', // Sky Blue
    bg: 'rgba(2, 132, 199, 0.12)',
    hoverBg: '#0284c7',
  },
  'martial-arts': {
    accent: '#dc2626', // Crimson Red
    bg: 'rgba(220, 38, 38, 0.12)',
    hoverBg: '#dc2626',
  },
  'yoga-studio': {
    accent: '#0d9488', // Analytics Teal / Green
    bg: 'rgba(13, 148, 136, 0.12)',
    hoverBg: '#0d9488',
  },
  'tuition-centre': {
    accent: '#6366f1', // Indigo
    bg: 'rgba(99, 102, 241, 0.12)',
    hoverBg: '#6366f1',
  },
  'rental-business': {
    accent: '#0176d3', // Rental Blue
    bg: 'rgba(1, 118, 211, 0.12)',
    hoverBg: '#0176d3',
  },
  'photography-studio': {
    accent: '#ea580c', // Inventory Amber/Orange
    bg: 'rgba(234, 88, 12, 0.12)',
    hoverBg: '#ea580c',
  },
  'event-company': {
    accent: '#e5484d', // Event Coral/Red
    bg: 'rgba(229, 72, 77, 0.12)',
    hoverBg: '#e5484d',
  },
  'wedding-planner': {
    accent: '#e11d48', // Rose / Pink
    bg: 'rgba(225, 29, 72, 0.12)',
    hoverBg: '#e11d48',
  },
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState<string>('')
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const solutionsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastScrollYRef = useRef(0)
  const drawerRef = useRef<HTMLDivElement>(null)

  // Track scroll position for shrink + hide on scroll down / show on scroll up
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY
          setScrolled(currentY > 40)

          // Hide / Show logic (past 240px)
          if (!solutionsOpen && !mobileOpen) {
            const diff = currentY - lastScrollYRef.current
            if (currentY > 240 && diff > 8) {
              setHidden(true)
            } else if (diff < -4) {
              setHidden(false)
            }
          } else {
            setHidden(false)
          }

          lastScrollYRef.current = currentY
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [solutionsOpen, mobileOpen])

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['platform', 'who-is-this-for', 'pricing', 'features', 'how-it-works']
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id)
            }
          })
        },
        { rootMargin: '-45% 0px -50% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        setSolutionsOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleMouseEnterSolutions = () => {
    if (solutionsTimeoutRef.current) clearTimeout(solutionsTimeoutRef.current)
    solutionsTimeoutRef.current = setTimeout(() => {
      setSolutionsOpen(true)
    }, 80)
  }

  const handleMouseLeaveSolutions = () => {
    if (solutionsTimeoutRef.current) clearTimeout(solutionsTimeoutRef.current)
    solutionsTimeoutRef.current = setTimeout(() => {
      setSolutionsOpen(false)
    }, 120)
  }

  const appLoginUrl = process.env.NEXT_PUBLIC_APP_LOGIN_URL

  return (
    <>
      {/* Desktop Floating Pill Nav (>=1024px) */}
      <header
        className={cn(
          'fixed left-0 right-0 z-60 pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.2,1,0.25,1)] hidden lg:block',
          scrolled ? 'top-3' : 'top-[var(--nav-top,16px)]',
          hidden && '-translate-y-[130%]'
        )}
      >
        <div className="mx-auto max-w-[1320px] px-6 grid grid-cols-[1fr_auto_1fr] items-center">
          {/* Left: Plain Logo mark + wordmark (36px high, pointer-events-auto) */}
          <div className="justify-self-start pointer-events-auto flex items-center">
            <Link
              href="/"
              aria-label="1Grow home"
              className="flex items-center gap-2 group transition-transform duration-200 hover:scale-[1.02]"
            >
              <Logo />
            </Link>
          </div>

          {/* Centre: Glass Link Pill */}
          <nav
            aria-label="Main navigation"
            onMouseLeave={() => setHoveredLink(null)}
            className={cn(
              'relative pointer-events-auto flex items-center px-2.5 rounded-full transition-all duration-250 ease-out',
              'bg-[var(--glass-bg,rgba(255,255,255,0.72))] border border-[var(--glass-border,rgba(3,45,96,0.08))]',
              'backdrop-blur-[16px] saturate-[1.3]',
              'shadow-[0_8px_32px_-8px_rgba(3,45,96,0.18)] dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)]',
              scrolled ? 'h-14 px-2' : 'h-[var(--nav-h,64px)]'
            )}
          >
            {navLinks.map((link) => {
              const isSolutions = link.label === 'Solutions'
              const isHovered = hoveredLink === link.href
              const isActive =
                (link.href.includes('pricing') && activeSection === 'pricing') ||
                (link.href.includes('features') && activeSection === 'features')

              if (isSolutions) {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => {
                      setHoveredLink(link.href)
                      handleMouseEnterSolutions()
                    }}
                    onMouseLeave={handleMouseLeaveSolutions}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        'relative z-10 flex items-center gap-1.5 h-11 px-4 text-[17px] font-semibold rounded-full transition-colors duration-150',
                        isHovered || solutionsOpen
                          ? 'text-[var(--accent-blue,#0176d3)]'
                          : 'text-[var(--color-nav-text,#18181b)]'
                      )}
                      aria-expanded={solutionsOpen}
                      aria-haspopup="true"
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={cn(
                          'size-4 transition-transform duration-200',
                          solutionsOpen && 'rotate-180 text-[var(--accent-blue,#0176d3)]'
                        )}
                        aria-hidden="true"
                      />
                    </Link>

                    {/* Sliding Capsule */}
                    {isHovered && (
                      <motion.div
                        layoutId="nav-hover-capsule"
                        className="absolute inset-0 z-0 rounded-full bg-white dark:bg-white/10 shadow-xs"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}

                    {/* Solutions Dropdown Card */}
                    <AnimatePresence>
                      {solutionsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.18 }}
                          className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[660px] rounded-[28px] p-6 z-50 pointer-events-auto bg-[var(--surface,#ffffff)]/95 dark:bg-[#111c30]/95 backdrop-blur-[20px] border border-[var(--glass-border,rgba(3,45,96,0.12))] shadow-[0_20px_48px_-12px_rgba(3,45,96,0.22)]"
                          role="menu"
                          aria-label="Industry solutions"
                        >
                          <div className="mb-3 flex items-center justify-between pb-2 border-b border-line">
                            <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent-blue,#0176d3)]">
                              Tailored For Indian Businesses
                            </p>
                            <span className="text-xs text-[var(--ink-3)]">10 Specialized Workflows</span>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            {industries.map((ind) => {
                              const IconComponent = iconMap[ind.icon] || Package
                              const colorCfg = INDUSTRY_COLOR_CONFIG[ind.id] || {
                                accent: '#0176d3',
                                bg: 'rgba(1, 118, 211, 0.12)',
                                hoverBg: '#0176d3',
                              }
                              return (
                                <Link
                                  key={ind.id}
                                  href={ind.href}
                                  onClick={() => setSolutionsOpen(false)}
                                  className="group flex items-start gap-3 rounded-[16px] p-2.5 transition-all duration-200 hover:bg-[var(--cloud-tint)] dark:hover:bg-white/5"
                                  role="menuitem"
                                >
                                  <div
                                    className="grid size-9 shrink-0 place-items-center rounded-xl transition-all duration-200 group-hover:scale-105"
                                    style={{
                                      backgroundColor: colorCfg.bg,
                                      color: colorCfg.accent,
                                    }}
                                  >
                                    <IconComponent className="size-4.5" aria-hidden="true" />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-sm font-semibold text-[var(--heading)] transition-colors duration-150">
                                      <span
                                        className="transition-colors group-hover:opacity-90"
                                        style={{ color: 'inherit' }}
                                      >
                                        {ind.name}
                                      </span>
                                    </p>
                                    <p className="line-clamp-1 text-xs text-[var(--ink-2)] mt-0.5">
                                      {ind.description}
                                    </p>
                                  </div>
                                </Link>
                              )
                            })}
                          </div>
                          <div className="mt-4 pt-3 border-t border-line flex items-center justify-between">
                            <span className="text-xs text-[var(--ink-3)]">Looking for all workflows?</span>
                            <Link
                              href="/solutions"
                              onClick={() => setSolutionsOpen(false)}
                              className="text-xs text-[var(--accent-blue,#0176d3)] font-semibold inline-flex items-center gap-1 hover:underline"
                            >
                              View all solutions <ArrowRight className="size-3.5" aria-hidden="true" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              }

              return (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setHoveredLink(link.href)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'relative z-10 flex items-center h-11 px-4 text-[17px] font-semibold rounded-full transition-colors duration-150',
                      isActive && 'text-[var(--accent-blue,#0176d3)]',
                      isHovered
                        ? 'text-[var(--accent-blue,#0176d3)]'
                        : 'text-[var(--color-nav-text,#18181b)]'
                    )}
                  >
                    <span>{link.label}</span>
                  </Link>

                  {/* Persistent Active Capsule */}
                  {isActive && !isHovered && (
                    <div className="absolute inset-0 z-0 rounded-full bg-[rgba(1,118,211,0.10)]" />
                  )}

                  {/* Sliding Hover Capsule */}
                  {isHovered && (
                    <motion.div
                      layoutId="nav-hover-capsule"
                      className="absolute inset-0 z-0 rounded-full bg-white dark:bg-white/10 shadow-xs"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                </div>
              )
            })}
          </nav>

          {/* Right: Actions Cluster (justify-self: end) */}
          <div className="justify-self-end pointer-events-auto flex items-center gap-3">
            {/* Optional Login Pill (only rendered when NEXT_PUBLIC_APP_LOGIN_URL is defined) */}
            {appLoginUrl && (
              <a
                href={appLoginUrl}
                className="group inline-flex items-center gap-1.5 h-12 px-5 rounded-full border border-[var(--glass-border,rgba(3,45,96,0.12))] bg-[var(--glass-bg,rgba(255,255,255,0.72))] backdrop-blur-md text-[14px] font-bold tracking-[0.04em] uppercase text-[var(--heading)] hover:bg-[rgba(1,118,211,0.08)] transition-all duration-150"
              >
                <span>Login</span>
                <ArrowRight className="size-3.5 transition-transform duration-150 group-hover:translate-x-1" />
              </a>
            )}

            {/* Join Wishlist Pill (Single primary blue #0176d3 per §1, §3.1) */}
            <Link
              href="/wishlist"
              className="wishlist-pill-shine group inline-flex items-center gap-2.5 h-12 px-6 rounded-full bg-[#0176d3] text-white text-[17px] font-bold shadow-[0_10px_24px_-6px_rgba(1,118,211,0.5)] hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-6px_rgba(1,118,211,0.6)] active:scale-[0.98] transition-all duration-150"
            >
              <span>Join Wishlist</span>
              {/* Pulsing White Dot */}
              <span className="size-2 rounded-full bg-white pulse-dot shadow-[0_0_8px_white]" />
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Floating Bar (<1024px) */}
      <header className="fixed top-3 left-3 right-3 z-60 lg:hidden pointer-events-auto">
        <div className="flex h-14 items-center justify-between px-4 rounded-full bg-[var(--glass-bg,rgba(255,255,255,0.85))] dark:bg-[var(--glass-bg,rgba(17,28,48,0.85))] border border-[var(--glass-border,rgba(3,45,96,0.12))] backdrop-blur-md shadow-md">
          <Link href="/" aria-label="1Grow home" className="flex items-center">
            <Logo />
          </Link>
          <div className="flex items-center">
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="grid size-11 place-items-center rounded-full text-[var(--color-nav-text)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-70 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#001039]/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer content */}
            <motion.div
              ref={drawerRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="fixed inset-y-0 right-0 w-[min(88vw,360px)] bg-[var(--bg)] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-line"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-line">
                  <Logo />
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="grid size-10 place-items-center rounded-full text-[var(--ink-2)] hover:bg-[var(--cloud-tint)]"
                    aria-label="Close menu"
                  >
                    <X className="size-5" />
                  </button>
                </div>

                <nav className="mt-4 flex flex-col" aria-label="Mobile drawer links">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex h-14 items-center justify-between border-b border-line text-[20px] font-semibold text-[var(--heading)] hover:text-[var(--accent-blue,#0176d3)] transition-colors"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="size-4 text-[var(--ink-3)]" />
                    </Link>
                  ))}
                </nav>

                {/* Mobile Solutions */}
                <div className="mt-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent-blue,#0176d3)] mb-3">
                    Key Solutions
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {industries.slice(0, 6).map((ind) => {
                      const colorCfg = INDUSTRY_COLOR_CONFIG[ind.id] || {
                        accent: '#0176d3',
                        bg: 'rgba(1, 118, 211, 0.12)',
                        hoverBg: '#0176d3',
                      }
                      return (
                        <Link
                          key={ind.id}
                          href={ind.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2 rounded-xl bg-[var(--cloud-tint)] dark:bg-white/5 p-2.5 text-xs font-semibold text-[var(--heading)] hover:text-[var(--accent-blue,#0176d3)] truncate"
                        >
                          <span
                            className="size-2 rounded-full shrink-0"
                            style={{ backgroundColor: colorCfg.accent }}
                            aria-hidden="true"
                          />
                          <span className="truncate">{ind.name}</span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="pt-6 border-t border-line mt-6">
                <Link
                  href="/wishlist"
                  onClick={() => setMobileOpen(false)}
                  className="w-full flex items-center justify-center gap-2 h-14 rounded-full bg-[#0176d3] text-white font-bold text-lg shadow-lg"
                >
                  <span>Join Wishlist</span>
                  <span className="size-2 rounded-full bg-white pulse-dot" />
                </Link>
                <p className="text-center text-xs text-[var(--ink-3)] mt-3">
                  Free 20-day trial · No credit card needed
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
