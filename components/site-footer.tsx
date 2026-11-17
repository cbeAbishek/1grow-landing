'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Globe,
  MessageCircle,
  Send,
  ArrowUp,
  Compass,
  Layers,
  BookOpen,
  Share2,
} from 'lucide-react'
import { Logo } from '@/components/logo'
import { Container } from '@/components/layout/container'

const socials = [
  { icon: Globe, label: 'Website', href: '/' },
  { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/919566372450' },
  { icon: Send, label: 'Telegram', href: '#' },
]

const navColumns = [
  {
    title: 'EXPLORE',
    icon: Compass,
    links: [
      { label: 'About 1Grow', href: '/about' },
      { label: 'Use Cases', href: '/use-cases' },
      { label: 'Success Stories', href: '/blog' },
      { label: 'Live Demo', href: '/demo' },
    ],
  },
  {
    title: 'PRODUCT',
    icon: Layers,
    links: [
      { label: 'Features', href: '/features' },
      { label: 'Solutions', href: '/solutions' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'For Institutions', href: '/solutions' },
    ],
  },
  {
    title: 'RESOURCES',
    icon: BookOpen,
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Tutorials', href: '/tutorials' },
      { label: 'Help Center', href: '/contact' },
      { label: 'Documentation', href: '/terms-and-conditions' },
    ],
  },
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
      id="site-footer"
      className="relative pt-12 pb-10 transition-colors duration-300"
      style={{
        backgroundColor: 'var(--footer-bg, #ffd3c4)',
        color: 'var(--footer-text, #43281c)',
      }}
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">Footer</h2>

      <Container className="max-w-[1280px]">
        {/* Top Content: Centered Brand & Description */}
        <div className="flex flex-col items-center text-center max-w-xl mx-auto space-y-4">
          <Link href="/" aria-label="1Grow home" className="inline-flex">
            <Logo />
          </Link>
          <p className="text-[15.5px] sm:text-[17px] leading-[1.65] text-[var(--footer-text-muted,#7c5948)] dark:text-[var(--footer-text-muted,#a89487)]">
            The intelligent cloud operating system for Training Institutes,
            Rental Businesses, and Event Companies. Built for Indian businesses with support in Tamil, Hindi &amp; English.
          </p>
        </div>

        {/* Subtle Horizontal Peach Divider 1 */}
        <div className="my-10 sm:my-12 border-t border-[var(--footer-border,#ebb7a6)] dark:border-white/10" />

        {/* Navigation Row: 4 Columns with Peach Heading Icons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-10">
          {navColumns.map((col) => {
            const Icon = col.icon
            return (
              <div key={col.title} className="space-y-4">
                <p className="text-[13.5px] sm:text-sm font-bold uppercase tracking-wider text-[var(--footer-text,#43281c)] dark:text-[var(--footer-text,#f5ece6)] flex items-center gap-2">
                  <Icon className="size-4.5 text-[#ea580c]" aria-hidden="true" />
                  <span>{col.title}</span>
                </p>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[15px] sm:text-[16px] text-[var(--footer-text-muted,#7c5948)] dark:text-[var(--footer-text-muted,#a89487)] hover:text-[#ea580c] dark:hover:text-[#ea580c] transition-colors leading-normal"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}

          {/* Column 4: CONNECT */}
          <div className="space-y-4">
            <p className="text-[13.5px] sm:text-sm font-bold uppercase tracking-wider text-[var(--footer-text,#43281c)] dark:text-[var(--footer-text,#f5ece6)] flex items-center gap-2">
              <Share2 className="size-4.5 text-[#ea580c]" aria-hidden="true" />
              <span>CONNECT</span>
            </p>

            {/* Social Icons */}
            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              {socials.map((social) => {
                const SocialIcon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="grid size-9 sm:size-10 place-items-center rounded-full border border-[var(--footer-border,#ebb7a6)] dark:border-white/10 bg-white/60 dark:bg-white/5 text-[var(--footer-text,#43281c)] dark:text-[var(--footer-text,#f5ece6)] hover:bg-[#ea580c] hover:text-white hover:border-[#ea580c] transition-all focus-visible:outline-2 focus-visible:outline-[#ea580c]"
                  >
                    <SocialIcon className="size-4 sm:size-4.5" aria-hidden="true" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Subtle Horizontal Peach Divider 2 */}
        <div className="mt-12 mb-8 border-t border-[var(--footer-border,#ebb7a6)] dark:border-white/10" />

        {/* Bottom Row: Copyright & Legal (Left) + Status Pill (Right) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] sm:text-[14px] text-[var(--footer-text-muted,#7c5948)] dark:text-[var(--footer-text-muted,#a89487)] sm:pr-14 lg:pr-0">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-5 gap-y-2">
            <p className="whitespace-nowrap">
              &copy; {currentYear} 1Grow. All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              <Link href="/privacy-policy" className="hover:text-[#ea580c] transition-colors">
                Privacy Policy
              </Link>
              <span>&middot;</span>
              <Link href="/terms-and-conditions" className="hover:text-[#ea580c] transition-colors">
                Terms &amp; Conditions
              </Link>
              <span>&middot;</span>
              <Link href="/refund-policy" className="hover:text-[#ea580c] transition-colors">
                Refund Policy
              </Link>
            </div>
          </div>

          {/* Status Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--footer-border,#ebb7a6)] dark:border-white/10 bg-white/60 dark:bg-white/5 text-[12.5px] sm:text-[13px] font-medium text-[var(--footer-text,#43281c)] dark:text-[var(--footer-text,#f5ece6)] shadow-2xs">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full size-2 bg-emerald-500" />
            </span>
            <span>Platform v2.0 &middot; Stable</span>
          </div>
        </div>
      </Container>

      {/* Floating Back to Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 grid size-11 place-items-center rounded-full border border-[var(--footer-border,#ebb7a6)] dark:border-white/10 bg-white dark:bg-neutral-900 text-[var(--footer-text,#43281c)] dark:text-[var(--footer-text,#f5ece6)] shadow-md transition-all duration-200 hover:bg-[#ea580c] hover:text-white hover:border-[#ea580c] hover:scale-105 focus-visible:outline-2 focus-visible:outline-[#ea580c] animate-in fade-in-0 slide-in-from-bottom-2 cursor-pointer"
          aria-label="Scroll back to top of page"
        >
          <ArrowUp className="size-5" />
        </button>
      )}
    </footer>
  )
}
