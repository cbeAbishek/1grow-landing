'use client'

import React, { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { WhyUsCard, type CardConfig } from './WhyUsCard'
import { cn } from '@/lib/utils'

// Data for all 8 cards verbatim matching §6.2, §6.4
const CARDS: CardConfig[] = [
  // Page 1
  {
    number: 1,
    slot: 1,
    title: 'Purpose-Built for Academies',
    tag: '/DomainFit',
    description:
      'Not a generic CRM. Built for training institutes, rental firms, and event companies. Our features match how you work.',
    icon: 'Users',
    gradient: 'linear-gradient(135deg, #0b2d6b 0%, #1f56d6 100%)',
    textColor: 'white',
    toneRgb: '31, 86, 214',
    toneHex: '#1f56d6',
  },
  {
    number: 2,
    slot: 2,
    title: 'Automated Fee Collection',
    tag: '<AutoPay>',
    description:
      'Send WhatsApp reminders, payment links, and digital receipts on auto-pilot. Zero manual work for your team.',
    icon: 'Wallet',
    gradient: 'linear-gradient(135deg, #ffd24a 0%, #f5a30a 100%)',
    textColor: 'dark',
    toneRgb: '245, 163, 10',
    toneHex: '#d97706',
  },
  {
    number: 3,
    slot: 3,
    title: 'WhatsApp Automation',
    tag: '{WhatsApp}',
    description:
      'Send attendance, fee alerts, class updates, and promotions via WhatsApp. All automatic, all on time.',
    icon: 'Bell',
    gradient: 'linear-gradient(135deg, #44e6c4 0%, #17c2a3 100%)',
    textColor: 'dark',
    toneRgb: '23, 194, 163',
    toneHex: '#0d9488',
  },
  {
    number: 4,
    slot: 4,
    title: 'Real-Time Analytics',
    tag: '[Analytics]',
    description:
      'See revenue, attendance, and branch comparisons on live dashboards. Data you can act on, right now.',
    icon: 'BarChart3',
    gradient: 'linear-gradient(135deg, #2b78ff 0%, #0b4de0 100%)',
    textColor: 'white',
    toneRgb: '11, 77, 224',
    toneHex: '#0b4de0',
  },
  // Page 2
  {
    number: 5,
    slot: 1,
    title: 'Secure & Private',
    tag: '/Encrypted',
    description:
      'Role-based access, encrypted data, audit logs, and true multi-tenant isolation. Each business stays separate.',
    icon: 'ShieldCheck',
    gradient: 'linear-gradient(135deg, #8b4bf0 0%, #5b21b6 100%)',
    textColor: 'white',
    toneRgb: '91, 33, 182',
    toneHex: '#5b21b6',
  },
  {
    number: 6,
    slot: 2,
    title: 'Multi-Branch Ready',
    tag: '<MultiBranch>',
    description:
      'Manage unlimited branches from one dashboard. See cross-location reports, staff, and inventory in one view.',
    icon: 'Layers',
    gradient: 'linear-gradient(135deg, #ff9a57 0%, #f26122 100%)',
    textColor: 'dark',
    toneRgb: '242, 97, 34',
    toneHex: '#ea580c',
  },
  {
    number: 7,
    slot: 3,
    title: 'Local Support',
    tag: '{Support}',
    description:
      'Get help in Tamil, Hindi, and English. We understand Indian businesses because we are one.',
    icon: 'HeadphonesIcon',
    gradient: 'linear-gradient(135deg, #ffa6d2 0%, #ee6fb4 100%)',
    textColor: 'dark',
    toneRgb: '238, 111, 180',
    toneHex: '#db2777',
  },
  {
    number: 8,
    slot: 4,
    title: '20-Day Free Trial',
    tag: '[ZeroRisk]',
    description:
      'Full access to all modules. Unlimited staff users. Mobile access included. No credit card needed.',
    icon: 'Check',
    gradient: 'linear-gradient(135deg, #12945a 0%, #0a6b40 100%)',
    textColor: 'white',
    toneRgb: '10, 107, 64',
    toneHex: '#0a6b40',
  },
]

export function WhyUsBento() {
  const [page, setPage] = useState<1 | 2>(1)
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const togglePage = () => {
    setPage((prev) => (prev === 1 ? 2 : 1))

    // Smooth scroll if grid top scrolled out of view (§6.5)
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      if (rect.top < 100) {
        window.scrollTo({
          top: window.scrollY + rect.top - 120,
          behavior: 'smooth',
        })
      }
    }
  }

  const page1Cards = CARDS.slice(0, 4)
  const page2Cards = CARDS.slice(4, 8)
  const visibleCards = page === 1 ? page1Cards : page2Cards

  return (
    <div ref={containerRef} className="w-full">
      {/* Screen Reader Live Announcement */}
      <div className="sr-only" aria-live="polite">
        {page === 1 ? 'Showing cards 1 to 4 of 8' : 'Showing cards 5 to 8 of 8'}
      </div>

      {/* Bento Grid Container with Role Region & Label */}
      <div
        id="whyus-grid"
        role="region"
        aria-label="Why academies choose 1Grow"
        className="relative w-full max-w-[1240px] mx-auto min-h-[920px] sm:min-h-[900px] lg:min-h-[890px]"
      >
        {!mounted ? (
          // SSR & No-JS Fallback: All 8 cards present in markup (§6.5)
          <>
            <div data-page="1" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6">
              {page1Cards.map((card, i) => (
                <WhyUsCard key={card.number} config={card} index={i} />
              ))}
            </div>
            <div data-page="2" hidden className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 mt-6">
              {page2Cards.map((card, i) => (
                <WhyUsCard key={card.number} config={card} index={i} />
              ))}
            </div>
          </>
        ) : (
          // Client Interactive Bento with in-place Swap
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6"
            >
              {visibleCards.map((card, i) => (
                <WhyUsCard key={card.number} config={card} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Centered "Click here" / "View less" Pill Button + Page Indicator (§6.5) */}
      <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 select-none">
        <button
          type="button"
          onClick={togglePage}
          aria-controls="whyus-grid"
          aria-expanded={page === 2}
          className="group inline-flex items-center justify-center gap-3 h-14 px-8 rounded-full bg-[#16a34a] hover:bg-[#15803d] active:scale-[0.98] text-white font-display text-[17px] font-bold shadow-[0_12px_28px_-8px_rgba(22,163,74,0.45)] transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16a34a]"
        >
          <span>{page === 1 ? 'Click here' : 'Click here'}</span>
          <ChevronDown
            className={cn(
              'size-5 transition-transform duration-300',
              page === 2 && 'rotate-180'
            )}
            aria-hidden="true"
          />
        </button>

        {/* 2-Dot Page Indicator */}
        <div className="flex items-center gap-2 px-3 py-2" aria-hidden="true">
          <span
            className={cn(
              'h-2.5 rounded-full transition-all duration-300',
              page === 1 ? 'w-7 bg-[#16a34a]' : 'w-2.5 bg-[#16a34a]/30'
            )}
          />
          <span
            className={cn(
              'h-2.5 rounded-full transition-all duration-300',
              page === 2 ? 'w-7 bg-[#16a34a]' : 'w-2.5 bg-[#16a34a]/30'
            )}
          />
        </div>
      </div>
    </div>
  )
}
