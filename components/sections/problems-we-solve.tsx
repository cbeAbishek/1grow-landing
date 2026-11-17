'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ChevronDown,
  Calendar,
  Users,
  Check,
  TrendingUp,
} from 'lucide-react'
import { Container } from '@/components/layout/container'
import { ReferenceWave } from '@/components/layout/reference-wave'

// Decorative 3-stroke orange burst matching reference design
function OrangeBurst({ className }: { className?: string }) {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 30L2 34"
        stroke="#ea580c"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M14 22L26 10"
        stroke="#ff7a00"
        strokeWidth="3.8"
        strokeLinecap="round"
      />
      <path
        d="M28 8L34 2"
        stroke="#ea580c"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

// 3D Coin Stack Icon (Fee Collection)
function CoinStackIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="coinGrad1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff9a3c" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
        <linearGradient id="coinGrad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffb066" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
        <linearGradient id="coinRim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff2e5" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ff8533" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* Bottom Coin */}
      <ellipse cx="32" cy="45" rx="20" ry="8" fill="#c2410c" opacity="0.3" />
      <path d="M12 38 C12 43.5 21 47 32 47 C43 47 52 43.5 52 38 L52 44 C52 49.5 43 53 32 53 C21 53 12 49.5 12 44 Z" fill="url(#coinGrad1)" />
      <ellipse cx="32" cy="38" rx="20" ry="7.5" fill="url(#coinGrad2)" stroke="url(#coinRim)" strokeWidth="1" />

      {/* Middle Coin */}
      <path d="M12 28 C12 33.5 21 37 32 37 C43 37 52 33.5 52 28 L52 34 C52 39.5 43 43 32 43 C21 43 12 39.5 12 34 Z" fill="url(#coinGrad1)" />
      <ellipse cx="32" cy="28" rx="20" ry="7.5" fill="url(#coinGrad2)" stroke="url(#coinRim)" strokeWidth="1" />

      {/* Top Coin */}
      <path d="M12 18 C12 23.5 21 27 32 27 C43 27 52 23.5 52 18 L52 24 C52 29.5 43 33 32 33 C21 33 12 29.5 12 24 Z" fill="url(#coinGrad1)" />
      <ellipse cx="32" cy="18" rx="20" ry="7.5" fill="url(#coinGrad2)" stroke="url(#coinRim)" strokeWidth="1.2" />
      <ellipse cx="32" cy="18" rx="14" ry="5" fill="none" stroke="#fed7aa" strokeWidth="1" strokeDasharray="3 2" />
    </svg>
  )
}

// 3D Calendar Check Icon (Resource Scheduling)
function CalendarCheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="calBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#fff3ec" />
        </linearGradient>
        <linearGradient id="calOrange" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff8a00" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
      </defs>
      {/* Calendar back shadow */}
      <rect x="12" y="16" width="40" height="38" rx="10" fill="#ea580c" opacity="0.15" />
      {/* Calendar body */}
      <rect x="12" y="14" width="40" height="38" rx="10" fill="url(#calBg)" stroke="#fed7aa" strokeWidth="1.5" />
      {/* Top header strip */}
      <path d="M12 22 C12 17.5 15.5 14 20 14 L44 14 C48.5 14 52 17.5 52 22 L52 24 L12 24 Z" fill="url(#calOrange)" />
      {/* Rings */}
      <rect x="20" y="10" width="4" height="7" rx="2" fill="#9a3412" />
      <rect x="40" y="10" width="4" height="7" rx="2" fill="#9a3412" />
      {/* Big Orange Checkmark */}
      <path
        d="M24 35 L30 41 L42 27"
        stroke="#ea580c"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// 3D Team Avatars Icon (Staff Operations)
function TeamAvatarsIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="teamOrange" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff8a00" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
        <linearGradient id="teamPeach" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffba7a" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
      {/* Left Back Avatar */}
      <circle cx="21" cy="24" r="7" fill="url(#teamPeach)" />
      <path d="M10 44 C10 38 15 35 21 35 C27 35 32 38 32 44" fill="url(#teamPeach)" />

      {/* Right Back Avatar */}
      <circle cx="43" cy="24" r="7" fill="url(#teamPeach)" />
      <path d="M32 44 C32 38 37 35 43 35 C49 35 54 38 54 44" fill="url(#teamPeach)" />

      {/* Center Front Avatar */}
      <circle cx="32" cy="28" r="9" fill="url(#teamOrange)" stroke="#ffffff" strokeWidth="2" />
      <path d="M19 50 C19 43 25 39 32 39 C39 39 45 43 45 50" fill="url(#teamOrange)" stroke="#ffffff" strokeWidth="2" />
    </svg>
  )
}

// Hanging Pin / Ring connecting the orange tab to the dashboard panel
function HangingPin({ className }: { className?: string }) {
  return (
    <div
      className={`absolute w-3 sm:w-3.5 h-7 sm:h-8 pointer-events-none select-none z-30 ${className}`}
      style={{ filter: 'drop-shadow(0 2px 2.5px rgba(0,0,0,0.22))' }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 14 32" fill="none" className="w-full h-full">
        <defs>
          <linearGradient id="hangingPinGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff3e0" />
            <stop offset="25%" stopColor="#fbbf24" />
            <stop offset="65%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#9a3412" />
          </linearGradient>
        </defs>
        {/* Ring loop bridging above tab, across tab face, and down into dashboard panel */}
        <path
          d="M2.5 30V7C2.5 3.8 4.7 1.5 7 1.5C9.3 1.5 11.5 3.8 11.5 7V30"
          stroke="url(#hangingPinGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Specular highlight on top arch */}
        <path
          d="M4 6C4.6 3.5 5.6 2.5 7 2.5C8.4 2.5 9.4 3.5 10 6"
          stroke="#ffffff"
          strokeWidth="1"
          strokeLinecap="round"
          strokeOpacity="0.9"
        />
        {/* Tab rivet / attachment anchor */}
        <circle cx="7" cy="18" r="1.6" fill="#7c2d12" />
        <circle cx="7" cy="18" r="0.8" fill="#fed7aa" />
        {/* Bottom panel contact anchor */}
        <circle cx="7" cy="29" r="1.2" fill="#9a3412" opacity="0.85" />
      </svg>
    </div>
  )
}

// Hanging Tab Component attached directly against dashboard top edge
interface HangingTabProps {
  label: string
  icon: 'fee' | 'schedule' | 'staff'
  align?: 'left' | 'center'
}

function HangingTab({ label, icon, align = 'left' }: HangingTabProps) {
  return (
    <div
      className={`absolute -top-4 sm:-top-4.5 z-20 ${
        align === 'center'
          ? 'left-1/2 -translate-x-1/2'
          : 'left-1/2 -translate-x-1/2 sm:left-8 sm:translate-x-0'
      }`}
    >
      <div className="relative inline-flex items-center gap-2 sm:gap-2.5 px-4.5 sm:px-6 py-2 sm:py-2.5 rounded-[18px] sm:rounded-[20px] bg-gradient-to-r from-[#ff8a00] to-[#ff5000] text-white shadow-[0_12px_24px_-6px_rgba(255,80,0,0.45),0_2px_4px_rgba(0,0,0,0.08)] border border-white/35 select-none">
        {/* Left Hanging Pin / Ring */}
        <HangingPin className="-top-3 left-3.5 sm:left-4" />

        {/* Right Hanging Pin / Ring */}
        <HangingPin className="-top-3 right-3.5 sm:right-4" />

        {/* Tab Icon */}
        <div className="grid size-4.5 sm:size-5 place-items-center shrink-0">
          {icon === 'fee' && (
            <svg viewBox="0 0 24 24" fill="none" className="size-4 sm:size-4.5" stroke="currentColor" strokeWidth="2.2">
              <ellipse cx="12" cy="7" rx="8" ry="3" />
              <path d="M4 7v5c0 1.66 3.58 3 8 3s8-1.34 8-3V7" />
              <path d="M4 12v5c0 1.66 3.58 3 8 3s8-1.34 8-3v-5" />
            </svg>
          )}
          {icon === 'schedule' && <Calendar className="size-4 sm:size-4.5 stroke-[2.2]" />}
          {icon === 'staff' && <Users className="size-4 sm:size-4.5 stroke-[2.2]" />}
        </div>

        {/* Tab Label */}
        <span className="font-display text-xs sm:text-sm font-bold tracking-tight text-white drop-shadow-xs whitespace-nowrap">
          {label}
        </span>
      </div>
    </div>
  )
}

export function ProblemsWeSolve() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="problems-we-solve"
      data-band="blush"
      aria-labelledby="problems-heading"
      className="relative scroll-mt-24 pt-20 sm:pt-24 pb-52 sm:pb-60 lg:pb-72 overflow-hidden transition-colors duration-300"
      style={{
        background:
          'var(--problems-section-bg, linear-gradient(180deg, #fff2f5 0%, #fde8ef 45%, #fbdfeb 100%))',
      }}
    >
      {/* Soft Ambient Radial Rose Highlights - strictly clipped */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute top-12 -left-20 size-[500px] rounded-full bg-[#fde2f3]/60 blur-[90px]" />
        <div className="absolute top-1/3 -right-20 size-[550px] rounded-full bg-[#f8d7e8]/50 blur-[100px]" />
        <div className="absolute bottom-24 left-1/4 size-[450px] rounded-full bg-[#fef5fa]/80 blur-[80px]" />
      </div>

      <Container className="relative z-10 max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#fff0ea] text-[#ea580c] border border-[#ea580c]/30 shadow-xs mb-4">
              PROBLEMS WE SOLVE
            </div>

            {/* Heading with Burst decor */}
            <div className="relative inline-block text-center">
              <h2
                id="problems-heading"
                className="font-display text-3xl sm:text-4xl lg:text-[52px] font-bold text-gray-950 dark:text-white tracking-tight leading-[1.12] text-balance"
              >
                Stop juggling spreadsheets, WhatsApp, and manual registers
              </h2>
              <OrangeBurst className="absolute -top-4 -right-3 sm:-right-8 pointer-events-none" />
            </div>

            {/* Supporting Copy */}
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-gray-600 dark:text-zinc-300 max-w-2xl mx-auto">
              Every operational bottleneck you face daily — 1Grow already has an automated solution.
              See how manual chaos turns into verified business clarity.
            </p>
          </motion.div>
        </div>

        {/* Exactly Three Alternating Feature Rows */}
        <div className="space-y-16 sm:space-y-20 lg:space-y-24">
          {/* ========================================================= */}
          {/* FEATURE 1: Fee Collection (Text Left, Dashboard Right)   */}
          {/* ========================================================= */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
          >
            {/* Text Column (Left) */}
            <div className="lg:col-span-5 space-y-4">
              {/* 3D Squircle Icon */}
              <div className="size-14 sm:size-16 rounded-[20px] sm:rounded-[24px] bg-gradient-to-br from-white via-[#fff4ee] to-[#fedecf] shadow-[0_12px_24px_-8px_rgba(234,88,12,0.22)] border border-white/80 p-2.5 flex items-center justify-center">
                <CoinStackIcon className="w-full h-full" />
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-950 dark:text-white leading-tight tracking-tight pt-1">
                Automate recurring fees and payment reminders
              </h3>

              <p className="text-base sm:text-lg text-gray-600 dark:text-zinc-300 leading-relaxed">
                Send payment links, auto-reminders, and collect fees on time without manual follow-ups.
              </p>
            </div>

            {/* Dashboard Column (Right) */}
            <div className="lg:col-span-7 relative pt-4 sm:pt-5">
              {/* Decorative 3-stroke Orange Burst (top right of card) */}
              <OrangeBurst className="absolute -top-2 -right-2 sm:-right-4 pointer-events-none hidden sm:block" />

              {/* Unified Dashboard Component: Tab, Pins & Dashboard Panel */}
              <div className="relative">
                {/* Hanging Tab attached directly against dashboard top edge */}
                <HangingTab label="Fee Collection" icon="fee" align="left" />

                {/* White Dashboard Card */}
                <div className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden bg-white dark:bg-[#1c1317] border border-white/95 dark:border-white/10 shadow-[0_24px_50px_-12px_rgba(244,63,94,0.14),0_8px_20px_-6px_rgba(0,0,0,0.05)] p-6 sm:p-8 pt-8 sm:pt-9">
                {/* Header Dropdown */}
                <div className="flex justify-end mb-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/90 dark:bg-white/10 text-xs font-bold text-gray-800 dark:text-zinc-200 border border-black/5 shadow-xs">
                    <span>This Month</span>
                    <ChevronDown className="size-3.5 stroke-[2.5]" />
                  </div>
                </div>

                {/* Metrics + Donut Row */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 sm:gap-4 items-center">
                  {/* Total Collected Metric Box (5 cols) */}
                  <div className="sm:col-span-5 rounded-2xl p-4 sm:p-4.5 bg-[#fffaf6] dark:bg-white/5 border border-orange-100/80 dark:border-white/5">
                    <span className="text-xs font-semibold text-gray-500 dark:text-zinc-400 block">
                      Total Collected
                    </span>
                    <p className="font-display text-2xl lg:text-3xl font-bold text-gray-950 dark:text-white mt-1">
                      ₹8,64,200
                    </p>
                    <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-2">
                      <TrendingUp className="size-3.5" />
                      <span>+12.4%</span>
                    </div>
                  </div>

                  {/* Pending Metric Box (4 cols) */}
                  <div className="sm:col-span-4 rounded-2xl p-4 sm:p-4.5 bg-[#fffaf6] dark:bg-white/5 border border-orange-100/80 dark:border-white/5">
                    <span className="text-xs font-semibold text-gray-500 dark:text-zinc-400 block">
                      Pending
                    </span>
                    <p className="font-display text-2xl lg:text-3xl font-bold text-[#ea580c] dark:text-orange-400 mt-1">
                      ₹1,32,500
                    </p>
                  </div>

                  {/* Donut Gauge (3 cols) */}
                  <div className="sm:col-span-3 flex flex-col items-center justify-center p-2">
                    <div className="relative size-20 sm:size-22">
                      <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                        {/* Background track */}
                        <path
                          className="text-orange-500"
                          stroke="currentColor"
                          strokeWidth="3.6"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        {/* Green 87% progress arc */}
                        <motion.path
                          className="text-emerald-500"
                          stroke="currentColor"
                          strokeWidth="3.6"
                          strokeDasharray="87, 100"
                          strokeLinecap="round"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          initial={shouldReduceMotion ? { strokeDasharray: '87, 100' } : { strokeDasharray: '0, 100' }}
                          whileInView={{ strokeDasharray: '87, 100' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                        />
                      </svg>
                      {/* Inside Gauge Text */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="font-display text-sm sm:text-base font-bold text-gray-950 dark:text-white leading-none">
                          87%
                        </span>
                        <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-400 mt-0.5">
                          Collected
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

          {/* ========================================================= */}
          {/* FEATURE 2: Resource Scheduling (Dashboard Left, Text Right) */}
          {/* ========================================================= */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
          >
            {/* Dashboard Column (Left on desktop) */}
            <div className="lg:col-span-7 relative pt-4 sm:pt-5 lg:order-1 order-2">
              {/* Decorative 3-stroke Orange Burst (top left of card, pointing outward) */}
              <div className="absolute -top-2 -left-3 sm:-left-5 pointer-events-none hidden sm:block -scale-x-100">
                <OrangeBurst />
              </div>

              {/* Unified Dashboard Component: Tab, Pins & Dashboard Panel */}
              <div className="relative">
                {/* Hanging Tab attached directly against dashboard top edge */}
                <HangingTab label="Resource Scheduling" icon="schedule" align="center" />

                {/* White Dashboard Card */}
                <div className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden bg-white dark:bg-[#1c1317] border border-white/95 dark:border-white/10 shadow-[0_24px_50px_-12px_rgba(244,63,94,0.14),0_8px_20px_-6px_rgba(0,0,0,0.05)] p-5 sm:p-7 pt-8 sm:pt-9">
                {/* Header Row */}
                <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-gray-100 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-lg bg-orange-100 dark:bg-orange-950/40 text-[#ea580c] grid place-items-center">
                      <Calendar className="size-3.5 stroke-[2.5]" />
                    </div>
                    <span className="font-display text-sm font-bold text-gray-950 dark:text-white">
                      Schedule
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/90 dark:bg-white/10 text-xs font-bold text-gray-800 dark:text-zinc-200 border border-black/5 shadow-xs">
                    <span>Week View</span>
                    <ChevronDown className="size-3.5 stroke-[2.5]" />
                  </div>
                </div>

                {/* Timetable Grid */}
                <div className="w-full overflow-x-auto">
                  <table className="w-full min-w-[340px] text-center border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-white/10 text-xs font-semibold text-gray-500 dark:text-zinc-400">
                        <th className="py-2 px-2 text-left font-normal w-18"></th>
                        <th className="py-2 px-2">Mon</th>
                        <th className="py-2 px-2">Tue</th>
                        <th className="py-2 px-2">Wed</th>
                        <th className="py-2 px-2">Thu</th>
                        <th className="py-2 px-2">Fri</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-white/5 text-xs">
                      {/* 4:00 PM Row */}
                      <tr>
                        <td className="py-2.5 px-2 text-left font-medium text-gray-600 dark:text-zinc-400 whitespace-nowrap">
                          4:00 PM
                        </td>
                        <td className="p-1.5">
                          <span className="inline-block px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                            Yoga
                          </span>
                        </td>
                        <td className="p-1.5"></td>
                        <td className="p-1.5"></td>
                        <td className="p-1.5">
                          <span className="inline-block px-3 py-1 rounded-lg bg-amber-100 text-amber-900 font-bold border border-amber-200">
                            Piano
                          </span>
                        </td>
                        <td className="p-1.5">
                          <span className="inline-block px-3 py-1 rounded-lg bg-indigo-100 text-indigo-900 font-bold border border-indigo-200">
                            Dance
                          </span>
                        </td>
                      </tr>

                      {/* 5:00 PM Row */}
                      <tr>
                        <td className="py-2.5 px-2 text-left font-medium text-gray-600 dark:text-zinc-400 whitespace-nowrap">
                          5:00 PM
                        </td>
                        <td className="p-1.5"></td>
                        <td className="p-1.5"></td>
                        <td className="p-1.5"></td>
                        <td className="p-1.5"></td>
                        <td className="p-1.5"></td>
                      </tr>

                      {/* 6:00 PM Row */}
                      <tr>
                        <td className="py-2.5 px-2 text-left font-medium text-gray-600 dark:text-zinc-400 whitespace-nowrap">
                          6:00 PM
                        </td>
                        <td className="p-1.5"></td>
                        <td className="p-1.5">
                          <span className="inline-block px-3 py-1 rounded-lg bg-orange-100 text-orange-900 font-bold border border-orange-200">
                            Tuition
                          </span>
                        </td>
                        <td className="p-1.5"></td>
                        <td className="p-1.5">
                          <span className="inline-block px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                            Yoga
                          </span>
                        </td>
                        <td className="p-1.5"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

            {/* Text Column (Right on desktop) */}
            <div className="lg:col-span-5 space-y-4 lg:order-2 order-1">
              {/* 3D Squircle Icon */}
              <div className="size-14 sm:size-16 rounded-[20px] sm:rounded-[24px] bg-gradient-to-br from-white via-[#fff4ee] to-[#fedecf] shadow-[0_12px_24px_-8px_rgba(234,88,12,0.22)] border border-white/80 p-2.5 flex items-center justify-center">
                <CalendarCheckIcon className="w-full h-full" />
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-950 dark:text-white leading-tight tracking-tight pt-1">
                Zero double-bookings
              </h3>

              <p className="text-base sm:text-lg text-gray-600 dark:text-zinc-300 leading-relaxed">
                Manage classes, rooms, and staff with a clear, conflict-free schedule across branches.
              </p>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* FEATURE 3: Staff Operations (Text Left, Dashboard Right)   */}
          {/* ========================================================= */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
          >
            {/* Text Column (Left) */}
            <div className="lg:col-span-5 space-y-4">
              {/* 3D Squircle Icon */}
              <div className="size-14 sm:size-16 rounded-[20px] sm:rounded-[24px] bg-gradient-to-br from-white via-[#fff4ee] to-[#fedecf] shadow-[0_12px_24px_-8px_rgba(234,88,12,0.22)] border border-white/80 p-2.5 flex items-center justify-center">
                <TeamAvatarsIcon className="w-full h-full" />
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-950 dark:text-white leading-tight tracking-tight pt-1">
                Central staff rosters with conflict detection
              </h3>

              <p className="text-base sm:text-lg text-gray-600 dark:text-zinc-300 leading-relaxed">
                Manage staff schedules, roles, and availability in one place with smart conflict alerts.
              </p>
            </div>

            {/* Dashboard Column (Right) */}
            <div className="lg:col-span-7 relative pt-4 sm:pt-5">
              {/* Unified Dashboard Component: Tab, Pins & Dashboard Panel */}
              <div className="relative">
                {/* Hanging Tab attached directly against dashboard top edge */}
                <HangingTab label="Staff Operations" icon="staff" align="center" />

                {/* White Dashboard Card */}
                <div className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden bg-white dark:bg-[#1c1317] border border-white/95 dark:border-white/10 shadow-[0_24px_50px_-12px_rgba(244,63,94,0.14),0_8px_20px_-6px_rgba(0,0,0,0.05)] p-5 sm:p-7 pt-8 sm:pt-9">
                {/* Header Row */}
                <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-gray-100 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-lg bg-orange-100 dark:bg-orange-950/40 text-[#ea580c] grid place-items-center">
                      <Users className="size-3.5 stroke-[2.5]" />
                    </div>
                    <span className="font-display text-sm font-bold text-gray-950 dark:text-white">
                      Staff Roster
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/90 dark:bg-white/10 text-xs font-bold text-gray-800 dark:text-zinc-200 border border-black/5 shadow-xs">
                    <span>This Week</span>
                    <ChevronDown className="size-3.5 stroke-[2.5]" />
                  </div>
                </div>

                {/* Staff Roster Table */}
                <div className="w-full overflow-x-auto">
                  <table className="w-full min-w-[360px] text-center border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-white/10 text-xs font-semibold text-gray-500 dark:text-zinc-400">
                        <th className="py-2 px-3 text-left">Staff</th>
                        <th className="py-2 px-2.5">Mon</th>
                        <th className="py-2 px-2.5">Tue</th>
                        <th className="py-2 px-2.5">Wed</th>
                        <th className="py-2 px-2.5">Thu</th>
                        <th className="py-2 px-2.5">Fri</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-white/5 text-xs">
                      {/* Row 1: Rohan Kumar */}
                      <tr>
                        <td className="py-3 px-3 text-left">
                          <div className="flex items-center gap-2.5">
                            <span className="size-7 rounded-full bg-blue-100 text-blue-700 font-bold text-xs grid place-items-center shrink-0">
                              RK
                            </span>
                            <span className="font-bold text-gray-950 dark:text-white whitespace-nowrap">
                              Rohan Kumar
                            </span>
                          </div>
                        </td>
                        {[1, 2, 3, 4, 5].map((d) => (
                          <td key={d} className="p-2">
                            <span className="inline-grid size-5 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                              <Check className="size-3 stroke-[3]" />
                            </span>
                          </td>
                        ))}
                      </tr>

                      {/* Row 2: Sneha Mehta (Wed is dash / unavailable) */}
                      <tr>
                        <td className="py-3 px-3 text-left">
                          <div className="flex items-center gap-2.5">
                            <span className="size-7 rounded-full bg-orange-100 text-orange-700 font-bold text-xs grid place-items-center shrink-0">
                              SM
                            </span>
                            <span className="font-bold text-gray-950 dark:text-white whitespace-nowrap">
                              Sneha Mehta
                            </span>
                          </div>
                        </td>
                        <td className="p-2">
                          <span className="inline-grid size-5 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                            <Check className="size-3 stroke-[3]" />
                          </span>
                        </td>
                        <td className="p-2">
                          <span className="inline-grid size-5 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                            <Check className="size-3 stroke-[3]" />
                          </span>
                        </td>
                        <td className="p-2">
                          <span className="inline-grid size-5 place-items-center rounded-full bg-gray-100 text-gray-400 font-bold text-sm">
                            —
                          </span>
                        </td>
                        <td className="p-2">
                          <span className="inline-grid size-5 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                            <Check className="size-3 stroke-[3]" />
                          </span>
                        </td>
                        <td className="p-2">
                          <span className="inline-grid size-5 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                            <Check className="size-3 stroke-[3]" />
                          </span>
                        </td>
                      </tr>

                      {/* Row 3: Arun Gopal */}
                      <tr>
                        <td className="py-3 px-3 text-left">
                          <div className="flex items-center gap-2.5">
                            <span className="size-7 rounded-full bg-pink-100 text-pink-700 font-bold text-xs grid place-items-center shrink-0">
                              AG
                            </span>
                            <span className="font-bold text-gray-950 dark:text-white whitespace-nowrap">
                              Arun Gopal
                            </span>
                          </div>
                        </td>
                        {[1, 2, 3, 4, 5].map((d) => (
                          <td key={d} className="p-2">
                            <span className="inline-grid size-5 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                              <Check className="size-3 stroke-[3]" />
                            </span>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          </motion.div>
        </div>
      </Container>

      {/* Reference 3-Layer Static Wave transitioning into How It Works (Lavender) */}
      <ReferenceWave
        colors={[
          'var(--wave-lavender-1)',
          'var(--wave-lavender-2)',
          'var(--wave-lavender-3)',
        ]}
      />
    </section>
  )
}
