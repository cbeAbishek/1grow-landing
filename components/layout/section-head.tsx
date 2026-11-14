import React from 'react'
import { cn } from '@/lib/utils'

export interface SectionHeadProps {
  eyebrow?: string
  title: React.ReactNode
  lead?: React.ReactNode
  align?: 'center' | 'left'
  className?: string
  id?: string
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  align = 'center',
  className,
  id,
}: SectionHeadProps) {
  return (
    <header
      className={cn(
        'section-head',
        align === 'left' ? 'text-left max-w-2xl mx-0' : 'text-center mx-auto max-w-[760px]',
        className,
      )}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 id={id} className="font-display">
        {title}
      </h2>
      {lead && <p className="lead">{lead}</p>}
    </header>
  )
}
