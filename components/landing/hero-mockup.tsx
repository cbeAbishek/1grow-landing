'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  CreditCard,
  GraduationCap,
  LayoutDashboard,
  Package,
  Users,
  CheckCircle2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function HeroMockup() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center center'],
  })

  // Perspective tilt rotateX(8deg) -> 0deg on scroll (§5)
  const rotateX = useTransform(scrollYProgress, [0, 1], [8, 0])

  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Overview', active: true },
    { icon: Users, label: 'Leads' },
    { icon: GraduationCap, label: 'Students' },
    { icon: Package, label: 'Inventory' },
    { icon: CalendarDays, label: 'Schedule' },
    { icon: CreditCard, label: 'Billing' },
  ]

  const stats = [
    { label: 'Total Revenue', value: '₹8.64L', delta: '+12.4%', up: true },
    { label: 'Active Students', value: '1,284', delta: '+8.1%', up: true },
    { label: 'Class Capacity', value: '94%', delta: '+3.2%', up: true },
  ]

  const chartBars = [
    { m: 'Jan', primary: 44, secondary: 28 },
    { m: 'Feb', primary: 58, secondary: 36 },
    { m: 'Mar', primary: 52, secondary: 32 },
    { m: 'Apr', primary: 72, secondary: 46 },
    { m: 'May', primary: 66, secondary: 40 },
    { m: 'Jun', primary: 84, secondary: 54 },
    { m: 'Jul', primary: 78, secondary: 48 },
    { m: 'Aug', primary: 96, secondary: 62 },
    { m: 'Sep', primary: 88, secondary: 56 },
    { m: 'Oct', primary: 74, secondary: 44 },
    { m: 'Nov', primary: 92, secondary: 60 },
    { m: 'Dec', primary: 100, secondary: 68 },
  ]

  return (
    <div
      ref={containerRef}
      className="relative mx-auto mt-16 max-w-[1140px] px-2 sm:px-4"
      style={{ perspective: 1200 }}
      aria-hidden="true"
    >
      {/* Outer Window Frame with radius 36px, glow shadow-4 (§5) */}
      <motion.div
        style={{ rotateX }}
        className="relative overflow-hidden rounded-[36px] border border-line bg-[var(--surface)] shadow-[0_32px_64px_-12px_rgba(255,107,0,0.18)] transition-all"
      >
        {/* Top Browser Bar */}
        <div className="flex h-12 items-center justify-between border-b border-line bg-[var(--surface-2)]/60 px-5">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-[#ff5f57]" />
            <span className="size-3 rounded-full bg-[#febc2e]" />
            <span className="size-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex items-center gap-2 rounded-full border border-line bg-[var(--surface)] px-4 py-1 text-xs font-mono text-[var(--ink-2)]">
            <span className="size-2 rounded-full bg-[var(--success)]" />
            1grow.in/dashboard
          </div>
          <div className="w-12" />
        </div>

        {/* Dashboard Body: CSS Grid (220px sidebar | 1fr main) */}
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] min-h-[460px]">
          {/* Sidebar */}
          <aside className="hidden md:flex flex-col gap-1 border-r border-line bg-[var(--surface-tint)] p-4">
            <div className="mb-3 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[var(--ink-3)]">
              Main Navigation
            </div>
            {sidebarItems.map((item) => (
              <div
                key={item.label}
                className={cn(
                  'flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2 text-sm font-semibold transition-colors',
                  item.active
                    ? 'bg-[var(--primary)] text-white shadow-sm'
                    : 'text-[var(--ink-2)] hover:bg-[var(--surface)] hover:text-[var(--heading)]',
                )}
              >
                <item.icon className="size-4 shrink-0" />
                <span>{item.label}</span>
              </div>
            ))}
            <div className="mt-auto rounded-xl border border-line bg-[var(--surface)] p-3">
              <p className="text-xs font-semibold text-[var(--heading)]">Academy Plan</p>
              <p className="text-[11px] text-[var(--ink-3)] mt-0.5">3 Branches Active</p>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="p-5 sm:p-7">
            {/* Title Row with Badge as a Flex Sibling */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-line">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--primary)]">
                  Executive Dashboard
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--heading)] mt-0.5">
                  Revenue &amp; Student Operations
                </h3>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#f59e0b]/15 px-3.5 py-1 text-xs font-semibold text-[#8a5300] dark:text-[#f59e0b]">
                <span className="size-1.5 rounded-full bg-[#f59e0b]" />
                This Month (Live)
              </div>
            </div>

            {/* Stat Cards (3-up grid) */}
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-[20px] border border-line bg-[var(--surface)] p-4 sm:p-5 shadow-[var(--shadow-1)] transition-all hover:border-[var(--accent-orange-200)]"
                >
                  <p className="text-xs font-medium text-[var(--ink-3)] truncate">{s.label}</p>
                  <p className="font-display text-2xl sm:text-3xl font-bold text-[var(--heading)] mt-1.5">
                    {s.value}
                  </p>
                  <div className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[var(--success)]">
                    <ArrowUpRight className="size-3.5 shrink-0" />
                    <span>{s.delta} vs last month</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Chart Container */}
            <div className="mt-5 rounded-[20px] border border-line bg-[var(--surface-tint)] p-4 sm:p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <BarChart3 className="size-4 text-[var(--primary)]" />
                  <span className="text-sm font-bold text-[var(--heading)]">
                    Monthly Revenue vs Enrollments
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs font-medium text-[var(--ink-2)]">
                  <span className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-sm bg-[var(--primary)]" />
                    Revenue
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-sm bg-[var(--accent-blue-600)]" />
                    Enrollments
                  </span>
                </div>
              </div>

              {/* Chart SVG */}
              <div className="w-full">
                <svg viewBox="0 0 420 120" className="w-full h-28 sm:h-36">
                  {[0, 30, 60, 90, 120].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      y1={y}
                      x2="420"
                      y2={y}
                      stroke="currentColor"
                      className="text-line"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                    />
                  ))}
                  {chartBars.map((b, i) => {
                    const slotWidth = 35
                    const barWidth = 10
                    const x = i * slotWidth + 6
                    const primaryHeight = (b.primary / 100) * 100
                    const secondaryHeight = (b.secondary / 100) * 100
                    return (
                      <g key={b.m}>
                        <rect
                          x={x}
                          y={120 - primaryHeight}
                          width={barWidth}
                          height={primaryHeight}
                          rx="3"
                          fill="var(--primary)"
                        />
                        <rect
                          x={x + barWidth + 3}
                          y={120 - secondaryHeight}
                          width={barWidth}
                          height={secondaryHeight}
                          rx="3"
                          fill="var(--accent-blue-600)"
                        />
                      </g>
                    )
                  })}
                </svg>
                <div className="mt-1 flex justify-between px-1 text-[10px] text-[var(--ink-3)] font-mono">
                  {chartBars.map((b) => (
                    <span key={b.m}>{b.m}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Card A: New Enrollment positioned top:-28px; right:48px (§1.3, §5) */}
      <div className="float-card absolute -top-7 right-6 sm:right-12 z-20 flex items-center gap-3 rounded-[20px] border border-line bg-[var(--surface)] px-4 py-3 shadow-[var(--shadow-3)] backdrop-blur-md max-w-[250px]">
        <div className="grid size-10 place-items-center rounded-xl bg-[var(--cloud-tint)] text-[var(--primary)] shrink-0">
          <GraduationCap className="size-5" />
        </div>
        <div>
          <p className="text-xs font-semibold text-[var(--heading)] leading-tight">New Enrollment</p>
          <p className="text-xs text-[var(--success)] font-bold mt-0.5">+38 this week</p>
          <p className="text-[10px] text-[var(--ink-3)]">Dance &amp; Music</p>
        </div>
      </div>

      {/* Floating Card B: Payment Received positioned bottom:64px; left:-36px (§1.3, §5) */}
      <div className="float-card--b absolute bottom-16 -left-3 sm:-left-8 z-20 hidden sm:flex items-center gap-3 rounded-[20px] border border-line bg-[var(--surface)] px-4 py-3 shadow-[var(--shadow-3)] backdrop-blur-md max-w-[250px]">
        <div className="grid size-10 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
          <CreditCard className="size-5" />
        </div>
        <div>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400" />
            <p className="text-xs font-semibold text-[var(--heading)] leading-tight">Payment Received</p>
          </div>
          <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-display mt-0.5">
            ₹24,500
          </p>
          <p className="text-[10px] text-[var(--ink-3)]">WhatsApp Receipt</p>
        </div>
      </div>
    </div>
  )
}
