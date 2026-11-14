'use client'

import React from 'react'
import Link from 'next/link'
import { Clock, ArrowRight, BookOpen } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { SectionHead } from '@/components/layout/section-head'
import { ActionButton } from '@/components/ui/action-button'
import { Reveal } from '@/components/motion/reveal'
import { WaveDivider } from '@/components/layout/wave-divider'
import { blogPosts } from '@/content/landing'
import { cn } from '@/lib/utils'

export function LatestBlogs() {
  const gradients = [
    'from-orange-500/20 via-amber-500/10 to-transparent',
    'from-rose-500/20 via-orange-500/10 to-transparent',
    'from-purple-500/20 via-pink-500/10 to-transparent',
  ]

  return (
    <section
      id="blog"
      data-band="light"
      aria-labelledby="blog-heading"
      className="relative scroll-mt-24 pt-24 pb-36 sm:pt-28 sm:pb-44 bg-[var(--bg)]"
    >
      <Container>
        <SectionHead
          id="blog-heading"
          eyebrow="Insights &amp; Updates"
          title="Latest from the blog"
          lead="Expert tips and operating playbooks for academy founders, rental operators, and event managers. Learn how to save hours every week and run a modern institution."
        />

        {/* 3-Col Grid with Horizontal Snap Rail on Mobile (§6, §7.15) */}
        <div className="mt-16 flex gap-7 overflow-x-auto pb-4 snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible sm:pb-0">
          {blogPosts.map((post, i) => (
            <Reveal
              key={post.slug}
              delay={i * 0.08}
              className="min-w-[85%] sm:min-w-0 snap-center shrink-0 flex-1 flex"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col justify-between w-full h-full rounded-[28px] border border-line bg-[var(--surface)] p-7 shadow-[var(--shadow-1)] transition-all duration-300 hover:-translate-y-2 hover:border-[var(--accent-orange-200)] hover:shadow-[var(--shadow-2)] card-spotlight"
              >
                <div>
                  {/* Gradient Art Header with image scale(1.06) on hover (§6) */}
                  <div
                    className={cn(
                      'aspect-video w-full rounded-[20px] bg-gradient-to-br flex items-center justify-center mb-6 overflow-hidden border border-line/50 transition-transform duration-300 group-hover:scale-[1.04]',
                      gradients[i % gradients.length],
                    )}
                  >
                    <BookOpen className="size-12 text-[var(--primary)]/70 transition-transform duration-300 group-hover:scale-110" />
                  </div>

                  {/* Category Pill & Reading Time */}
                  <div className="flex items-center gap-3 text-xs mb-3.5">
                    <span className="rounded-full bg-[var(--cloud-tint)] px-3 py-1 font-bold text-[var(--primary)] border border-[var(--accent-orange-200)]">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-[var(--ink-3)] font-semibold">
                      <Clock className="size-3.5" aria-hidden="true" />
                      {post.readingTime} min read
                    </span>
                  </div>

                  {/* Post Title -> Blue on hover (§6) */}
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--heading)] group-hover:text-[var(--primary)] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="mt-3 text-base text-[var(--ink-2)] leading-relaxed line-clamp-3">
                    {post.description}
                  </p>
                </div>

                {/* Read Full Article with sliding arrow */}
                <div className="mt-7 pt-4 border-t border-line/60 flex items-center gap-2 text-base font-bold text-[var(--primary)]">
                  <span>Read full article</span>
                  <ArrowRight className="size-4.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Section Footer: Outline Pill CTA */}
        <div className="mt-14 text-center">
          <ActionButton
            href="/blog"
            variant="secondary"
            showArrow
          >
            View all articles and guides
          </ActionButton>
        </div>
      </Container>

      {/* Wave ending transitioning into FAQ (tint) (§4) */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none">
        <WaveDivider to="tint" shape="C" />
      </div>
    </section>
  )
}
