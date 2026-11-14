'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export interface CounterProps {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

export function Counter({
  value,
  prefix = '',
  suffix = '',
  duration = 1200,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.4 })
  const [displayValue, setDisplayValue] = useState<number>(value)
  const hasAnimated = useRef(false)

  useEffect(() => {
    // Only animate once when scrolled into view
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setDisplayValue(value)
      return
    }

    let startTime: number | null = null
    let animationFrame: number

    const easeOutExpo = (x: number): number => {
      return x === 1 ? 1 : 1 - Math.pow(2, -10 * x)
    }

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const easedProgress = easeOutExpo(progress)
      const current = Math.floor(easedProgress * value)

      setDisplayValue(current)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setDisplayValue(value)
      }
    }

    // Start counter from 0 on first in-view trigger
    setDisplayValue(0)
    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [isInView, value, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      <span>{displayValue.toLocaleString('en-IN')}</span>
      {suffix}
    </span>
  )
}
