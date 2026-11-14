'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
  GraduationCap,
  Package,
  PartyPopper,
  CreditCard,
  BarChart3,
  Warehouse,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ArrowRight,
} from 'lucide-react'
import {
  TrainingScreen,
  RentalScreen,
  EventsScreen,
  BillingScreen,
  AnalyticsScreen,
  InventoryScreen,
} from './screens/ShowcaseScreens'
import { FloatingSymbols } from './FloatingSymbols'
import { cn } from '@/lib/utils'

export interface TabItem {
  id: string
  label: string
  icon: React.ElementType
  accentColor: string
  accentGradient: string
}

export const SHOWCASE_TABS: TabItem[] = [
  {
    id: 'training',
    label: 'Training',
    icon: GraduationCap,
    accentColor: '#0176d3',
    accentGradient: 'from-blue-500/10 via-blue-500/5 to-purple-500/10',
  },
  {
    id: 'rental',
    label: 'Rental',
    icon: Package,
    accentColor: '#0d9488',
    accentGradient: 'from-teal-500/10 via-cyan-500/5 to-blue-500/10',
  },
  {
    id: 'event',
    label: 'Events',
    icon: PartyPopper,
    accentColor: '#e5484d',
    accentGradient: 'from-rose-500/10 via-pink-500/5 to-orange-500/10',
  },
  {
    id: 'billing',
    label: 'Billing',
    icon: CreditCard,
    accentColor: '#2e844a',
    accentGradient: 'from-emerald-500/10 via-green-500/5 to-teal-500/10',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    accentColor: '#7526e3',
    accentGradient: 'from-purple-500/10 via-indigo-500/5 to-blue-500/10',
  },
  {
    id: 'inventory',
    label: 'Inventory',
    icon: Warehouse,
    accentColor: '#d97706',
    accentGradient: 'from-amber-500/10 via-orange-500/5 to-yellow-500/10',
  },
]

export function ShowcasePanel() {
  const [activeTab, setActiveTab] = useState('training')
  const [isPaused, setIsPaused] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  // Pointer Tilt (§5.5)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotY = useSpring(useTransform(mx, [0, 1], [-4, 4]), { stiffness: 150, damping: 20 })
  const rotX = useSpring(useTransform(my, [0, 1], [3, -3]), { stiffness: 150, damping: 20 })

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!panelRef.current) return
    const rect = panelRef.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width)
    my.set((e.clientY - rect.top) / rect.height)
  }

  const handlePointerLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  const activeIndex = SHOWCASE_TABS.findIndex((t) => t.id === activeTab)
  const currentTab = SHOWCASE_TABS[activeIndex] || SHOWCASE_TABS[0]

  const nextTab = () => {
    const nextIdx = (activeIndex + 1) % SHOWCASE_TABS.length
    setActiveTab(SHOWCASE_TABS[nextIdx].id)
  }

  const prevTab = () => {
    const prevIdx = (activeIndex - 1 + SHOWCASE_TABS.length) % SHOWCASE_TABS.length
    setActiveTab(SHOWCASE_TABS[prevIdx].id)
  }

  // Keyboard navigation (§5.6)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      nextTab()
    } else if (e.key === 'ArrowLeft') {
      prevTab()
    } else if (e.key === ' ') {
      e.preventDefault()
      setIsPaused((p) => !p)
    }
  }

  return (
    <div className="relative mx-auto mt-14 max-w-[1240px] px-3 sm:px-6">
      {/* Outer Frosted Panel */}
      <motion.div
        ref={panelRef}
        data-paused={isPaused ? 'true' : 'false'}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        style={{
          rotateX: rotX,
          rotateY: rotY,
          transformPerspective: 1200,
        }}
        className={cn(
          'showcase-panel relative z-10 rounded-[36px] p-3 sm:p-5 outline-none',
          'bg-[rgba(255,255,255,0.70)] dark:bg-[rgba(17,28,48,0.70)]',
          'border-[1.5px] border-white/80 dark:border-white/10',
          'backdrop-blur-[18px]',
          'shadow-[0_40px_80px_-24px_rgba(1,118,211,0.30),0_2px_0_rgba(255,255,255,0.9)_inset] dark:shadow-[0_40px_80px_-24px_rgba(0,0,0,0.7)]'
        )}
      >
        {/* Floating 3D Sticker Symbols (§6) */}
        <FloatingSymbols onSelectModule={(mod) => setActiveTab(mod)} />

        {/* Tab Row + Controls (§5.1) */}
        <div className="relative z-30 flex flex-wrap items-center justify-between gap-3 mb-4">
          {/* Scrollable Tabs */}
          <div
            role="tablist"
            aria-label="Product Showcase Modules"
            className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full no-scrollbar"
          >
            {SHOWCASE_TABS.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id

              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`showcase-panel-${tab.id}`}
                  onClick={() => {
                    setActiveTab(tab.id)
                    setIsPaused(true)
                  }}
                  className={cn(
                    'relative flex items-center gap-2 h-12 px-4 rounded-full text-[15px] sm:text-[16px] font-semibold transition-all duration-200 shrink-0 select-none',
                    isActive
                      ? 'bg-white dark:bg-white/15 text-[var(--heading)] shadow-xs font-bold'
                      : 'bg-white/50 dark:bg-white/5 text-[var(--ink-2)] hover:bg-white/80 hover:text-[var(--heading)]'
                  )}
                >
                  <Icon className="size-4.5" style={{ color: tab.accentColor }} />
                  <span>{tab.label}</span>

                  {/* Active 6s Progress Underline (§5.4, §16.3) */}
                  {isActive && (
                    <span
                      key={tab.id}
                      className="tab-progress-bar"
                      aria-hidden="true"
                    >
                      <span
                        className="tab-progress-fill"
                        style={{ backgroundColor: tab.accentColor }}
                        onAnimationEnd={nextTab}
                      />
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Controls: Prev / Next / Play-Pause / See All Modules */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={prevTab}
              className="grid size-10 place-items-center rounded-full bg-white/70 dark:bg-white/10 hover:bg-white text-[var(--heading)] shadow-xs transition-transform active:scale-95"
              aria-label="Previous module tab"
            >
              <ChevronLeft className="size-4.5" />
            </button>
            <button
              onClick={nextTab}
              className="grid size-10 place-items-center rounded-full bg-white/70 dark:bg-white/10 hover:bg-white text-[var(--heading)] shadow-xs transition-transform active:scale-95"
              aria-label="Next module tab"
            >
              <ChevronRight className="size-4.5" />
            </button>
            <button
              onClick={() => setIsPaused((p) => !p)}
              className="grid size-10 place-items-center rounded-full bg-white/70 dark:bg-white/10 hover:bg-white text-[var(--heading)] shadow-xs transition-transform active:scale-95"
              aria-label={isPaused ? 'Play autoplay' : 'Pause autoplay'}
              aria-pressed={isPaused}
            >
              {isPaused ? <Play className="size-4 fill-current" /> : <Pause className="size-4 fill-current" />}
            </button>
            <a
              href="#platform"
              className="hidden sm:inline-flex items-center gap-1.5 h-10 px-4 rounded-full bg-[#0176d3] text-white text-xs font-bold shadow-xs hover:bg-[#0b5cab] transition-colors"
            >
              <span>See all modules</span>
              <ArrowRight className="size-3.5" />
            </a>
          </div>
        </div>

        {/* Framed Screen Surface (§5.1, §5.2) */}
        <div
          id={`showcase-panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={activeTab}
          className={cn(
            'relative z-20 overflow-hidden rounded-[28px] border border-white/60 dark:border-white/10 shadow-inner',
            'min-h-[460px] sm:min-h-[520px] bg-gradient-to-br',
            currentTab.accentGradient
          )}
        >
          {/* Subtle Dot Grid Background */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
            aria-hidden="true"
          />

          {/* Morphing Screen Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.35, ease: [0.2, 1, 0.25, 1] }}
              className="h-full"
            >
              {activeTab === 'training' && <TrainingScreen />}
              {activeTab === 'rental' && <RentalScreen />}
              {activeTab === 'event' && <EventsScreen />}
              {activeTab === 'billing' && <BillingScreen />}
              {activeTab === 'analytics' && <AnalyticsScreen />}
              {activeTab === 'inventory' && <InventoryScreen />}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
