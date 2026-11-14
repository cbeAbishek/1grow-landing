'use client'

import React, { useEffect, useState } from 'react'
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

const ease = [0.2, 1, 0.25, 1] as const

export interface RevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'scale'
  className?: string
}

export function Reveal({
  children,
  delay = 0,
  direction = 'up',
  className,
  ...props
}: RevealProps) {
  const [mounted, setMounted] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    setMounted(true)
  }, [])

  const variants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.15, delay, ease: 'easeOut' as const },
        },
      }
    : direction === 'left'
    ? {
        hidden: { opacity: 0, x: -48 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.7, delay, ease },
        },
      }
    : direction === 'right'
    ? {
        hidden: { opacity: 0, x: 48 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.7, delay, ease },
        },
      }
    : direction === 'scale'
    ? {
        hidden: { opacity: 0, scale: 0.92 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.7, delay, ease },
        },
      }
    : {
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, delay, ease },
        },
      }

  return (
    <motion.div
      variants={variants}
      initial={mounted ? 'hidden' : false}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -60px 0px' }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}
