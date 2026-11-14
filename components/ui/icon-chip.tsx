import React from 'react'
import { cn } from '@/lib/utils'

export interface IconChipProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  shape?: 'circle' | 'squircle'
  variant?: 'default' | 'dark' | 'accent'
}

export function IconChip({
  children,
  className,
  size = 'md',
  shape = 'circle',
  variant = 'default',
  ...props
}: IconChipProps) {
  return (
    <div
      className={cn(
        'grid place-items-center transition-colors duration-300 shrink-0',
        size === 'sm' && 'size-9',
        size === 'md' && 'size-12',
        size === 'lg' && 'size-14',
        shape === 'circle' && 'rounded-full',
        shape === 'squircle' && 'rounded-2xl',
        variant === 'default' && 'bg-[var(--cloud-tint)] text-[var(--blue-50)] group-hover:bg-[var(--blue-50)] group-hover:text-white',
        variant === 'dark' && 'bg-white/10 text-white',
        variant === 'accent' && 'bg-primary/10 text-primary',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
