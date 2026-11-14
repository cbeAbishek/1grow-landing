'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Globe, Mail, MessageCircle, Send, ArrowUp } from 'lucide-react'
import { Logo } from '@/components/logo'
import { Container } from '@/components/layout/container'
import { footerColumns, LAST_REVIEWED_DATE } from '@/content/landing'

const socials = [
  { icon: Globe, label: 'Website', href: '/' },
  { icon: Mail, label: 'Email', href: 'mailto:support@1grow.in' },
  { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/919566372450' },
  { icon: Send, label: 'Telegram', href: '#' },
]

export function SiteFooter() {
  const currentYear = new Date().getFullYear()
  const [showTopBtn, setShowTopBtn] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 800)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      data-band="light"
      className="relative border-t border-line bg-[var(--bg)] pt-16 pb-10"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">Footer</h2>

      <Container>
        {/* 12-Column Grid: Brand Block (5 cols) + 4 Link Columns (7 cols) */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Brand Block */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" aria-label="1Grow home" className="inline-flex">
              <Logo />
            </Link>
            <p className="text-sm leading-relaxed text-[var(--ink-2)] max-w-[340px]">
              The intelligent cloud operating system for Training Institutes,
              Rental Businesses, and Event Companies. Built for Indian businesses with support in Tamil, Hindi &amp; English.
            </p>

            {/* Social Icons: 40px round ghost buttons (§7.17) */}
            <div className="pt-2 flex items-center gap-2">
              {socials.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="grid size-10 place-items-center rounded-full border border-line bg-[var(--surface)] text-[var(--ink-2)] transition-colors hover:bg-[var(--cloud-tint)] hover:text-[var(--primary)] hover:border-[var(--accent-orange-200)] focus-visible:outline-2 focus-visible:outline-[var(--primary)]"
                  >
                    <Icon className="size-4.5" aria-hidden="true" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* 4 Link Columns (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {footerColumns.map((col) => (
              <div key={col.title} className="space-y-3.5">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--ink-3)]">
                  {col.title}
                </p>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-[var(--ink-2)] hover:text-[var(--primary)] hover:underline transition-colors leading-normal"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar (§7.17 flex-wrap without awkward breaks) */}
        <div className="mt-14 pt-6 border-t border-line flex flex-wrap items-center justify-between gap-y-4 gap-x-6 text-xs text-[var(--ink-3)]">
          <p className="whitespace-nowrap">
            &copy; {currentYear} 1Grow. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 whitespace-nowrap">
            <Link href="/privacy-policy" className="hover:text-[var(--primary)] hover:underline transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-[var(--primary)] hover:underline transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/refund-policy" className="hover:text-[var(--primary)] hover:underline transition-colors">
              Refund Policy
            </Link>
          </div>

          <p className="whitespace-nowrap">
            Built by{' '}
            <a
              href="https://nexgenads.space"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--heading)] hover:text-[var(--primary)] hover:underline transition-colors"
            >
              NexGenAds Technologies Pvt Ltd
            </a>{' '}
            &middot; Last reviewed: {LAST_REVIEWED_DATE}
          </p>
        </div>
      </Container>

      {/* Floating Back to Top Button (§7.17) */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 grid size-11 place-items-center rounded-full border border-line bg-[var(--surface)] text-[var(--heading)] shadow-[var(--shadow-3)] transition-all duration-200 hover:bg-[var(--cloud-tint)] hover:text-[var(--primary)] hover:scale-105 focus-visible:outline-2 focus-visible:outline-[var(--primary)] animate-in fade-in-0 slide-in-from-bottom-2"
          aria-label="Scroll back to top of page"
        >
          <ArrowUp className="size-5" />
        </button>
      )}
    </footer>
  )
}
