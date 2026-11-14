'use client'

import React from 'react'
import Link from 'next/link'
import {
  Check,
  CheckCircle2,
  Clock,
  ArrowRight,
  Calendar,
  CreditCard,
  MessageSquare,
  Users,
  Award,
  Bell,
  Sparkles,
  FileSpreadsheet,
} from 'lucide-react'
import { Container } from '@/components/layout/container'
import { SectionHead } from '@/components/layout/section-head'
import { Reveal } from '@/components/motion/reveal'
import { WaveDivider } from '@/components/layout/wave-divider'
import {
  problems,
  comparisonRows,
  erpDefinition,
} from '@/content/landing'
import { cn } from '@/lib/utils'

export function ProblemsWeSolve() {
  const blocks = [
    {
      id: 'block-1',
      items: [problems[0], problems[1]],
      mediaType: 'fees',
      reversed: false,
    },
    {
      id: 'block-2',
      items: [problems[2], problems[3]],
      mediaType: 'dashboard',
      reversed: true,
    },
    {
      id: 'block-3',
      items: [problems[4], problems[5]],
      mediaType: 'staff',
      reversed: false,
    },
  ]

  return (
    <section
      id="problems-we-solve"
      data-band="tint"
      aria-labelledby="problems-heading"
      className="relative scroll-mt-24 pt-24 pb-36 sm:pt-28 sm:pb-44 bg-[var(--bg-tint)]"
    >
      <Container>
        <SectionHead
          id="problems-heading"
          eyebrow="Problems We Solve"
          title="Stop juggling spreadsheets, WhatsApp, and manual registers"
          lead="Every operational bottleneck you face daily — 1Grow already has an automated solution. See how manual chaos turns into verified business clarity."
        />

        {/* Alternating 12-Col Grid (6 Text / 6 Media) per §5 & §7.8 */}
        <div className="mt-16 space-y-20 lg:space-y-28">
          {blocks.map((block, idx) => (
            <div
              key={block.id}
              className={cn(
                'grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14 min-h-[520px]',
                block.reversed && 'lg:[&>*:first-child]:order-2',
              )}
            >
              {/* Text Column (6 cols) */}
              <div className="lg:col-span-6 space-y-7">
                {block.items.map((item, itemIdx) => (
                  <Reveal
                    key={item.category}
                    direction={block.reversed ? 'right' : 'left'}
                    delay={itemIdx * 0.1}
                    className="rounded-[28px] border border-line bg-[var(--surface)] p-7 sm:p-8 shadow-[var(--shadow-1)] card-spotlight"
                  >
                    <div className="inline-flex items-center gap-2 rounded-full bg-[var(--cloud-tint)] px-3.5 py-1 text-xs font-bold text-[var(--primary)] border border-[var(--accent-blue-200)]">
                      <span>{item.category}</span>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-[var(--heading)] mt-3 leading-snug">
                      {item.category === 'Fee Collection'
                        ? 'Automate recurring fees and payment reminders'
                        : item.category === 'Resource Scheduling'
                        ? 'Zero double-bookings across branches & studios'
                        : item.category === 'Executive Visibility'
                        ? 'Real-time revenue & attendance at a glance'
                        : item.category === 'Lead Follow-up'
                        ? 'Auto-capture and nurture parent enquiries'
                        : item.category === 'Staff Operations'
                        ? 'Central staff rosters with conflict detection'
                        : 'Instant certificates, invoices, and reports'}
                    </h3>

                    {/* Before (Manual Pain) with strike accent */}
                    <div className="mt-4 rounded-xl border border-red-200/70 bg-red-50/50 dark:bg-red-950/20 dark:border-red-900/40 p-4">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                        <span className="size-2 rounded-full bg-red-500" />
                        <span>Manual Way (Before)</span>
                      </div>
                      <p className="mt-1 text-base text-[var(--ink-2)] leading-relaxed">
                        {item.pain}
                      </p>
                    </div>

                    {/* After (1Grow Solution) */}
                    <div className="mt-3.5 rounded-xl border border-emerald-200/80 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-900/40 p-4">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        <Check className="size-3.5 stroke-[3]" />
                        <span>With 1Grow (Automated)</span>
                      </div>
                      <p className="mt-1 text-base font-semibold text-[var(--heading)] leading-relaxed">
                        {item.solution}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Media Column (6 cols) with gradient backdrop and zero overlap */}
              <div className="lg:col-span-6 relative">
                {/* Blob backdrop behind media */}
                <div
                  className="pointer-events-none absolute -inset-4 rounded-[40px] bg-gradient-to-br from-[#ff6b00]/15 via-[#f43f5e]/10 to-[#8b5cf6]/15 blur-2xl -z-10"
                  aria-hidden="true"
                />

                <Reveal
                  direction={block.reversed ? 'left' : 'right'}
                  className="relative rounded-[36px] border border-line bg-[var(--surface)] p-6 sm:p-8 pb-12 shadow-[var(--shadow-3)]"
                >
                  {/* Mock Window Header */}
                  <div className="flex items-center justify-between pb-5 mb-5 border-b border-line">
                    <div className="flex items-center gap-3">
                      <div className="grid size-9 place-items-center rounded-xl bg-[var(--cloud-tint)] text-[var(--primary)] font-bold">
                        {block.mediaType === 'fees' ? (
                          <CreditCard className="size-5" />
                        ) : block.mediaType === 'dashboard' ? (
                          <Sparkles className="size-5" />
                        ) : (
                          <Users className="size-5" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[var(--heading)]">
                          {block.mediaType === 'fees'
                            ? 'Fee Collection Automation'
                            : block.mediaType === 'dashboard'
                            ? 'Multi-Branch Executive Hub'
                            : 'Operations & Staff Rostering'}
                        </p>
                        <p className="text-xs text-[var(--ink-3)] font-mono">
                          1grow-system-live · SSL Verified
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-[var(--cloud-tint)] px-3 py-1 text-xs font-bold text-[var(--primary)] border border-[var(--accent-blue-200)]">
                      Real-time
                    </span>
                  </div>

                  {/* UI Mock Content */}
                  {block.mediaType === 'fees' ? (
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between rounded-2xl border border-line bg-[var(--surface-tint)] p-4">
                        <div className="flex items-center gap-3">
                          <div className="grid size-10 place-items-center rounded-xl bg-emerald-500/15 text-emerald-600 font-bold text-sm">
                            ₹
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[var(--heading)]">Aarav Sharma — Piano Batch A</p>
                            <p className="text-xs text-[var(--ink-3)]">WhatsApp payment link sent · Due today</p>
                          </div>
                        </div>
                        <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                          Paid ₹3,500
                        </span>
                      </div>

                      <div className="flex items-center justify-between rounded-2xl border border-line bg-[var(--surface)] p-4">
                        <div className="flex items-center gap-3">
                          <div className="grid size-10 place-items-center rounded-xl bg-amber-500/15 text-amber-600 font-bold text-sm">
                            ₹
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[var(--heading)]">Ananya Iyer — Bharatanatyam Jr.</p>
                            <p className="text-xs text-[var(--ink-3)]">Auto-reminder queued for 5:00 PM</p>
                          </div>
                        </div>
                        <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-700 dark:text-amber-400">
                          Reminder Active
                        </span>
                      </div>

                      <div className="flex items-center justify-between rounded-2xl border border-line bg-[var(--surface-tint)] p-4">
                        <div className="flex items-center gap-3">
                          <div className="grid size-10 place-items-center rounded-xl bg-sky-500/15 text-sky-600 font-bold text-sm">
                            ₹
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[var(--heading)]">Rohan Verma — Western Vocals</p>
                            <p className="text-xs text-[var(--ink-3)]">Auto-generated GST Invoice #INV-2041</p>
                          </div>
                        </div>
                        <span className="rounded-full bg-sky-500/15 px-3 py-1 text-xs font-bold text-sky-700 dark:text-sky-400">
                          Receipt Sent
                        </span>
                      </div>
                    </div>
                  ) : block.mediaType === 'dashboard' ? (
                    <div className="space-y-3.5">
                      <div className="grid grid-cols-2 gap-3.5 mb-2">
                        <div className="rounded-2xl border border-line bg-[var(--surface-tint)] p-4">
                          <p className="text-xs text-[var(--ink-3)]">Monthly Revenue</p>
                          <p className="text-xl font-bold font-display text-[var(--heading)] mt-1">₹8,64,200</p>
                          <span className="text-xs font-semibold text-[var(--success)]">+12.4% vs target</span>
                        </div>
                        <div className="rounded-2xl border border-line bg-[var(--surface-tint)] p-4">
                          <p className="text-xs text-[var(--ink-3)]">New Inquiries</p>
                          <p className="text-xl font-bold font-display text-[var(--heading)] mt-1">142 Leads</p>
                          <span className="text-xs font-semibold text-[var(--primary)]">86% via WhatsApp</span>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-line bg-[var(--surface)] p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="grid size-10 place-items-center rounded-xl bg-emerald-500/15 text-emerald-600">
                            <MessageSquare className="size-5" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[var(--heading)]">New Web Lead: Priya Menon</p>
                            <p className="text-[11px] text-[var(--ink-3)]">Kathak Weekend Batch · Auto-assigned</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-[var(--primary)]">Converted ✓</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3.5">
                      <div className="rounded-2xl border border-line bg-[var(--surface-tint)] p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="grid size-10 place-items-center rounded-xl bg-[var(--cloud-tint)] text-[var(--primary)]">
                            <Users className="size-5" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[var(--heading)]">Trainer S. Rangarajan</p>
                            <p className="text-[11px] text-[var(--ink-3)]">Mylapore &amp; Adyar · 0 Conflicts</p>
                          </div>
                        </div>
                        <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                          Available
                        </span>
                      </div>

                      <div className="rounded-2xl border border-line bg-[var(--surface)] p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="grid size-10 place-items-center rounded-xl bg-purple-500/15 text-purple-600">
                            <Award className="size-5" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[var(--heading)]">Course Completion Batch 2026</p>
                            <p className="text-[11px] text-[var(--ink-3)]">32 PDF Certificates Dispatched</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-purple-600 dark:text-purple-400">Instant PDF</span>
                      </div>
                    </div>
                  )}

                  {/* Floating Chip positioned outside card edge with zero collision (§1.4) */}
                  <div className="float-card absolute -bottom-5 right-6 flex items-center gap-2.5 rounded-full border border-line bg-[var(--surface)] px-4 py-2.5 shadow-[var(--shadow-2)]">
                    <CheckCircle2 className="size-4.5 text-[var(--success)]" />
                    <span className="text-xs font-bold text-[var(--heading)]">
                      {block.mediaType === 'fees'
                        ? 'Receipt Delivered via WhatsApp'
                        : block.mediaType === 'dashboard'
                        ? '3 Branches Synced Live'
                        : 'Biometric Attendance Synced'}
                    </span>
                  </div>
                </Reveal>
              </div>
            </div>
          ))}
        </div>

        {/* What is an ERP? Educational Explainer Block */}
        <Reveal className="mt-20">
          <div className="rounded-[32px] border border-[var(--accent-orange-200)] bg-[var(--cloud-tint)] p-8 sm:p-10 shadow-[var(--shadow-1)]">
            <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
              <FileSpreadsheet className="size-4" />
              <span>{erpDefinition.eyebrow}</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--heading)] mt-3">
              {erpDefinition.title}
            </h3>
            <p className="mt-3 text-base sm:text-lg leading-relaxed text-[var(--ink-2)]">
              {erpDefinition.text}
            </p>
          </div>
        </Reveal>

        {/* Manual vs Automated: Comparison Table with Slide-in Accent Bar (§6) */}
        <Reveal className="mt-20">
          <div className="rounded-[32px] border border-line bg-[var(--surface)] shadow-[var(--shadow-2)] overflow-hidden">
            <div className="p-8 sm:p-10 border-b border-line bg-[var(--surface-tint)]">
              <h3 className="text-center font-display text-2xl sm:text-3xl font-bold text-[var(--heading)]">
                Manual vs Automated: An Operational Comparison
              </h3>
              <p className="mx-auto mt-3 max-w-2xl text-center text-base text-[var(--ink-2)]">
                See how 1Grow replaces the error-prone WhatsApp and Excel approach with institutional reliability.
              </p>
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left text-base border-collapse">
                <thead>
                  <tr className="bg-[var(--heading)] text-white">
                    <th className="py-4.5 px-7 font-bold uppercase tracking-wider text-xs">
                      Operational Area
                    </th>
                    <th className="py-4.5 px-7 font-bold uppercase tracking-wider text-xs text-red-300">
                      WhatsApp + Excel (Status Quo)
                    </th>
                    <th className="py-4.5 px-7 font-bold uppercase tracking-wider text-xs bg-[var(--primary)] text-white">
                      1Grow Cloud ERP
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={row.area}
                      className={cn(
                        'group border-b border-line/60 transition-colors hover:bg-[var(--cloud-tint)] relative',
                        i % 2 === 1 && 'bg-[var(--surface-tint)]',
                      )}
                    >
                      <td className="py-5 px-7 font-bold text-[var(--heading)] relative">
                        {/* Slide-in accent bar on table row hover (§6) */}
                        <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-[var(--primary)] scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-center" />
                        {row.area}
                      </td>
                      <td className="py-5 px-7 text-red-700 dark:text-red-300 font-medium">
                        {row.manual}
                      </td>
                      <td className="py-5 px-7 text-[var(--primary)] dark:text-[var(--blue-60)] font-bold border-l-3 border-l-[var(--primary)]">
                        <div className="flex items-center gap-2.5">
                          <span className="grid size-5 place-items-center rounded-full bg-emerald-500/15 text-[var(--success)] shrink-0">
                            <Check className="size-3.5 stroke-[3]" aria-hidden="true" />
                          </span>
                          <span>{row.automated}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Stacked Card Mode */}
            <div className="sm:hidden p-5 space-y-4">
              {comparisonRows.map((row) => (
                <div
                  key={row.area}
                  className="rounded-2xl border border-line bg-[var(--surface)] p-5 shadow-xs"
                >
                  <p className="font-display font-bold text-base text-[var(--heading)] pb-2 border-b border-line">
                    {row.area}
                  </p>
                  <div className="mt-3 space-y-2.5 text-sm">
                    <div>
                      <span className="font-semibold text-red-600 uppercase tracking-wider text-xs">
                        WhatsApp + Excel:
                      </span>
                      <p className="text-[var(--ink-2)] mt-0.5">{row.manual}</p>
                    </div>
                    <div className="pt-2 border-t border-line/50">
                      <span className="font-semibold text-[var(--primary)] uppercase tracking-wider text-xs flex items-center gap-1">
                        <Check className="size-3.5 text-[var(--success)]" /> 1Grow ERP:
                      </span>
                      <p className="text-[var(--heading)] font-bold mt-0.5">{row.automated}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>

      {/* Wave ending transitioning into How-It-Works (light) (§4) */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none">
        <WaveDivider to="light" shape="A" />
      </div>
    </section>
  )
}
