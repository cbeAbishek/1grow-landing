'use client'

import React, { useState } from 'react'
import {
  Users,
  CreditCard,
  Calendar,
  Clock,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Check,
} from 'lucide-react'

// Screen 1: Training Screen
export function TrainingScreen() {
  const [metricPeriod, setMetricPeriod] = useState<'month' | 'quarter'>('month')

  return (
    <div className="h-full flex flex-col justify-between p-4 sm:p-6 text-left">
      {/* Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/20 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            Academy Management
          </span>
          <h4 className="text-lg sm:text-xl font-bold text-[var(--heading)]">
            Natyanjali School of Dance — Central Branch
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
            <span className="size-2 rounded-full bg-emerald-500" />
            Live Batch Active
          </span>
        </div>
      </div>

      {/* KPI Row (Clickable to toggle period §5.6) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4">
        <button
          onClick={() => setMetricPeriod((p) => (p === 'month' ? 'quarter' : 'month'))}
          className="text-left p-3 rounded-2xl bg-white/70 dark:bg-white/10 border border-white/30 backdrop-blur-xs transition-transform hover:scale-[1.02]"
        >
          <div className="flex items-center justify-between text-xs text-[var(--ink-2)]">
            <span>Total Revenue</span>
            <span className="text-[10px] text-purple-600 font-bold uppercase">{metricPeriod}</span>
          </div>
          <div className="mt-1 text-lg sm:text-2xl font-bold text-[var(--heading)]">
            {metricPeriod === 'month' ? '₹8.64L' : '₹25.8L'}
          </div>
          <span className="text-xs text-emerald-600 font-medium">+12.4% vs last period</span>
        </button>

        <div className="p-3 rounded-2xl bg-white/70 dark:bg-white/10 border border-white/30 backdrop-blur-xs">
          <div className="text-xs text-[var(--ink-2)]">Active Students</div>
          <div className="mt-1 text-lg sm:text-2xl font-bold text-[var(--heading)]">1,284</div>
          <span className="text-xs text-emerald-600 font-medium">+8.1% new enrollments</span>
        </div>

        <div className="col-span-2 sm:col-span-1 p-3 rounded-2xl bg-white/70 dark:bg-white/10 border border-white/30 backdrop-blur-xs">
          <div className="text-xs text-[var(--ink-2)]">Class Capacity</div>
          <div className="mt-1 text-lg sm:text-2xl font-bold text-[var(--heading)]">94%</div>
          <span className="text-xs text-emerald-600 font-medium">+3.2% utilization</span>
        </div>
      </div>

      {/* Main Visual: Attendance List + WhatsApp Reminder Bubble */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Attendance List */}
        <div className="md:col-span-2 rounded-2xl bg-white/60 dark:bg-white/10 p-3.5 border border-white/25">
          <div className="flex items-center justify-between text-xs font-bold text-[var(--ink-2)] mb-2.5">
            <span>Morning Batch (Bharatanatyam Jr.)</span>
            <span>24 / 26 Present</span>
          </div>
          <div className="space-y-2">
            {[
              { name: 'Aarav Sharma', status: 'Present', time: '09:00 AM', statusColor: 'text-emerald-600 bg-emerald-50' },
              { name: 'Ananya Iyer', status: 'Present', time: '09:02 AM', statusColor: 'text-emerald-600 bg-emerald-50' },
              { name: 'Rohan Verma', status: 'Fee Due', time: '₹3,500 pending', statusColor: 'text-amber-600 bg-amber-50' },
            ].map((s) => (
              <div key={s.name} className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg bg-white/50 dark:bg-black/20">
                <span className="font-semibold text-[var(--heading)]">{s.name}</span>
                <span className={`px-2 py-0.5 rounded-md font-bold ${s.statusColor}`}>
                  {s.status} · {s.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp Auto-Reminder Card */}
        <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-3.5 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
            <MessageSquare className="size-4" />
            <span>Auto WhatsApp Sync</span>
          </div>
          <p className="text-xs text-[var(--ink-2)] my-2 leading-relaxed">
            "Dear Parent, Rohan&apos;s batch attendance has been marked. Quarterly fee invoice is ready."
          </p>
          <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
            <CheckCircle2 className="size-3" />
            <span>Sent automatically via WhatsApp API</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Screen 2: Rental Screen
export function RentalScreen() {
  return (
    <div className="h-full flex flex-col justify-between p-4 sm:p-6 text-left">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/20 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            Rental Operations
          </span>
          <h4 className="text-lg sm:text-xl font-bold text-[var(--heading)]">
            Gear & Equipment Dispatch Schedule
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/15 text-teal-600 dark:text-teal-400">
            <ShieldCheck className="size-3.5" />
            Double-Booking Prevented
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4">
        <div className="p-3 rounded-2xl bg-white/70 dark:bg-white/10 border border-white/30">
          <div className="text-xs text-[var(--ink-2)]">Available Assets</div>
          <div className="mt-1 text-lg sm:text-2xl font-bold text-[var(--heading)]">248 items</div>
          <span className="text-xs text-teal-600 font-medium">Ready for dispatch</span>
        </div>
        <div className="p-3 rounded-2xl bg-white/70 dark:bg-white/10 border border-white/30">
          <div className="text-xs text-[var(--ink-2)]">Active Bookings</div>
          <div className="mt-1 text-lg sm:text-2xl font-bold text-[var(--heading)]">42 orders</div>
          <span className="text-xs text-emerald-600 font-medium">100% on schedule</span>
        </div>
        <div className="col-span-2 sm:col-span-1 p-3 rounded-2xl bg-white/70 dark:bg-white/10 border border-white/30">
          <div className="text-xs text-[var(--ink-2)]">Returns Due Today</div>
          <div className="mt-1 text-lg sm:text-2xl font-bold text-[var(--heading)]">14 returns</div>
          <span className="text-xs text-amber-600 font-medium">₹1.2L deposit hold</span>
        </div>
      </div>

      {/* Equipment availability table */}
      <div className="rounded-2xl bg-white/60 dark:bg-white/10 p-3.5 border border-white/25">
        <div className="text-xs font-bold text-[var(--ink-2)] mb-2">Live Equipment Status</div>
        <div className="space-y-2">
          {[
            { item: 'Sony FX3 Cinema Rig + 24-70mm', branch: 'Chennai Central', status: 'Dispatched', color: 'bg-blue-50 text-blue-600' },
            { item: 'JBL VRX Line Array Sound Set', branch: 'Coimbatore Hub', status: 'Available', color: 'bg-emerald-50 text-emerald-600' },
            { item: 'Stage LED Moving Heads × 8', branch: 'Chennai Central', status: 'Returned', color: 'bg-purple-50 text-purple-600' },
          ].map((r) => (
            <div key={r.item} className="flex items-center justify-between text-xs py-2 px-3 rounded-lg bg-white/50 dark:bg-black/20">
              <div>
                <span className="font-semibold text-[var(--heading)]">{r.item}</span>
                <span className="block text-[11px] text-[var(--ink-2)]">{r.branch}</span>
              </div>
              <span className={`px-2.5 py-1 rounded-md font-bold text-xs ${r.color}`}>
                {r.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Screen 3: Events Screen
export function EventsScreen() {
  return (
    <div className="h-full flex flex-col justify-between p-4 sm:p-6 text-left">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/20 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            Event Operations
          </span>
          <h4 className="text-lg sm:text-xl font-bold text-[var(--heading)]">
            Sharma Grand Wedding — 3-Day Itinerary
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-600 dark:text-rose-400">
            Budget ₹18.5L · 92% Allocated
          </span>
        </div>
      </div>

      {/* 3-Column Kanban Board */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
        {[
          {
            col: 'Proposal',
            tasks: ['Catering Menu Review', 'Venue Sound Check'],
            color: 'border-amber-400/40 bg-amber-500/5',
          },
          {
            col: 'In Progress',
            tasks: ['Mandap Floral Setup', 'Live Band Soundcheck'],
            color: 'border-blue-400/40 bg-blue-500/5',
          },
          {
            col: 'Completed',
            tasks: ['Vendor Advance Paid', 'Guest RSVP Synced'],
            color: 'border-emerald-400/40 bg-emerald-500/5',
          },
        ].map((k) => (
          <div key={k.col} className={`p-3 rounded-2xl border ${k.color} backdrop-blur-xs`}>
            <div className="text-xs font-bold uppercase text-[var(--heading)] mb-2 flex items-center justify-between">
              <span>{k.col}</span>
              <span className="text-[10px] bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded-full">
                {k.tasks.length}
              </span>
            </div>
            <div className="space-y-1.5">
              {k.tasks.map((t) => (
                <div key={t} className="text-xs p-2 rounded-lg bg-white/80 dark:bg-black/30 font-medium text-[var(--heading)] shadow-2xs">
                  {t}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Vendor Milestone */}
      <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-white/60 dark:bg-white/10 border border-white/20">
        <span className="font-semibold text-[var(--heading)]">Next Milestone: Sangeet Lighting Rig Delivery</span>
        <span className="text-emerald-600 font-bold">On Schedule (Today 4:00 PM)</span>
      </div>
    </div>
  )
}

// Screen 4: Billing Screen
export function BillingScreen() {
  return (
    <div className="h-full flex flex-col justify-between p-4 sm:p-6 text-left">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/20 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Fee & Invoice Automation
          </span>
          <h4 className="text-lg sm:text-xl font-bold text-[var(--heading)]">
            Instant UPI Links & Automated GST Receipts
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
            Auto-Reconciliation Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4">
        <div className="p-3 rounded-2xl bg-white/70 dark:bg-white/10 border border-white/30">
          <div className="text-xs text-[var(--ink-2)]">Collected This Month</div>
          <div className="mt-1 text-lg sm:text-2xl font-bold text-emerald-600">₹6.42L</div>
          <span className="text-xs text-[var(--ink-2)]">Via UPI, Cards, NetBanking</span>
        </div>
        <div className="p-3 rounded-2xl bg-white/70 dark:bg-white/10 border border-white/30">
          <div className="text-xs text-[var(--ink-2)]">Pending Reminders</div>
          <div className="mt-1 text-lg sm:text-2xl font-bold text-amber-600">₹84,000</div>
          <span className="text-xs text-[var(--ink-2)]">12 auto-prompts queued</span>
        </div>
        <div className="col-span-2 sm:col-span-1 p-3 rounded-2xl bg-white/70 dark:bg-white/10 border border-white/30">
          <div className="text-xs text-[var(--ink-2)]">Avg. Collection Time</div>
          <div className="mt-1 text-lg sm:text-2xl font-bold text-[var(--heading)]">4 hours</div>
          <span className="text-xs text-emerald-600 font-medium">Down from 5 days</span>
        </div>
      </div>

      <div className="rounded-2xl bg-white/60 dark:bg-white/10 p-3.5 border border-white/25">
        <div className="text-xs font-bold text-[var(--ink-2)] mb-2">Recent Invoices Generated</div>
        <div className="space-y-2">
          {[
            { student: 'Aarav Sharma — Piano Batch A', amount: '₹3,500', status: 'Paid', statusClass: 'text-emerald-600 bg-emerald-50' },
            { student: 'Ananya Iyer — Bharatanatyam Jr.', amount: '₹4,200', status: 'Reminder Active', statusClass: 'text-blue-600 bg-blue-50' },
            { student: 'Rohan Verma — Western Vocals', amount: '₹3,000', status: 'Receipt Sent', statusClass: 'text-purple-600 bg-purple-50' },
          ].map((inv) => (
            <div key={inv.student} className="flex items-center justify-between text-xs py-2 px-3 rounded-lg bg-white/50 dark:bg-black/20">
              <span className="font-semibold text-[var(--heading)]">{inv.student}</span>
              <div className="flex items-center gap-3">
                <span className="font-bold text-[var(--heading)]">{inv.amount}</span>
                <span className={`px-2.5 py-0.5 rounded-md font-bold text-[11px] ${inv.statusClass}`}>
                  {inv.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Screen 5: Analytics Screen
export function AnalyticsScreen() {
  return (
    <div className="h-full flex flex-col justify-between p-4 sm:p-6 text-left">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/20 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            Executive Intelligence
          </span>
          <h4 className="text-lg sm:text-xl font-bold text-[var(--heading)]">
            Multi-Branch Performance & Revenue Analytics
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/15 text-purple-600 dark:text-purple-400">
            Consolidated View
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
        {[
          { label: 'Monthly Growth', val: '+24.6%', color: 'text-emerald-600' },
          { label: 'Student Retention', val: '96.2%', color: 'text-purple-600' },
          { label: 'On-Time Payments', val: '91.8%', color: 'text-blue-600' },
          { label: 'Asset Utilization', val: '88.4%', color: 'text-amber-600' },
        ].map((k) => (
          <div key={k.label} className="p-3 rounded-2xl bg-white/70 dark:bg-white/10 border border-white/30">
            <div className="text-[11px] text-[var(--ink-2)]">{k.label}</div>
            <div className={`mt-1 text-lg sm:text-xl font-bold ${k.color}`}>{k.val}</div>
          </div>
        ))}
      </div>

      {/* SVG Bar Growth Graphic */}
      <div className="rounded-2xl bg-white/60 dark:bg-white/10 p-4 border border-white/25">
        <div className="flex items-center justify-between text-xs font-bold text-[var(--ink-2)] mb-3">
          <span>Branch Revenue Comparison (₹ in Lakhs)</span>
          <span>H1 2026</span>
        </div>
        <div className="grid grid-cols-4 gap-4 items-end h-28 pt-4">
          {[
            { branch: 'Chennai Main', val: 92, h: 'h-24', color: 'bg-purple-600' },
            { branch: 'Coimbatore', val: 78, h: 'h-20', color: 'bg-blue-600' },
            { branch: 'Madurai Hub', val: 64, h: 'h-16', color: 'bg-teal-600' },
            { branch: 'Bangalore West', val: 86, h: 'h-22', color: 'bg-orange-500' },
          ].map((b) => (
            <div key={b.branch} className="flex flex-col items-center gap-1.5 h-full justify-end">
              <span className="text-[11px] font-bold text-[var(--heading)]">₹{b.val}L</span>
              <div className={`w-full max-w-[48px] ${b.h} ${b.color} rounded-t-xl transition-all`} />
              <span className="text-[10px] text-[var(--ink-2)] truncate w-full text-center">{b.branch}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Screen 6: Inventory Screen
export function InventoryScreen() {
  return (
    <div className="h-full flex flex-col justify-between p-4 sm:p-6 text-left">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/20 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Asset & Warehouse Tracking
          </span>
          <h4 className="text-lg sm:text-xl font-bold text-[var(--heading)]">
            Multi-Location Stock & Maintenance Registry
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-600 dark:text-amber-400">
            <AlertCircle className="size-3.5" />
            1 Low Stock Alert
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4">
        <div className="p-3 rounded-2xl bg-white/70 dark:bg-white/10 border border-white/30">
          <div className="text-xs text-[var(--ink-2)]">Tracked Assets</div>
          <div className="mt-1 text-lg sm:text-2xl font-bold text-[var(--heading)]">1,420 units</div>
          <span className="text-xs text-emerald-600 font-medium">99.4% in good condition</span>
        </div>
        <div className="p-3 rounded-2xl bg-white/70 dark:bg-white/10 border border-white/30">
          <div className="text-xs text-[var(--ink-2)]">In Maintenance</div>
          <div className="mt-1 text-lg sm:text-2xl font-bold text-amber-600">8 units</div>
          <span className="text-xs text-[var(--ink-2)]">Service scheduled</span>
        </div>
        <div className="col-span-2 sm:col-span-1 p-3 rounded-2xl bg-white/70 dark:bg-white/10 border border-white/30">
          <div className="text-xs text-[var(--ink-2)]">Stock Transferred</div>
          <div className="mt-1 text-lg sm:text-2xl font-bold text-[var(--heading)]">32 shipments</div>
          <span className="text-xs text-blue-600 font-medium">Inter-branch synced</span>
        </div>
      </div>

      <div className="rounded-2xl bg-white/60 dark:bg-white/10 p-3.5 border border-white/25">
        <div className="text-xs font-bold text-[var(--ink-2)] mb-2">Live Warehouse Asset Register</div>
        <div className="space-y-2">
          {[
            { name: 'Classical Bharatanatyam Costume Sets (Grade 1-4)', qty: '18 in stock', alert: false },
            { name: 'Shure Wireless Vocal Mic Systems', qty: 'Only 2 units remaining', alert: true },
            { name: 'Heavy Duty Stage Trussing 10ft Bars', qty: '44 in stock', alert: false },
          ].map((item) => (
            <div key={item.name} className="flex items-center justify-between text-xs py-2 px-3 rounded-lg bg-white/50 dark:bg-black/20">
              <span className="font-semibold text-[var(--heading)]">{item.name}</span>
              <span className={`px-2.5 py-1 rounded-md font-bold text-xs ${item.alert ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'}`}>
                {item.qty}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
