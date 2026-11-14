import React from 'react'
import { cn } from '@/lib/utils'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  size?: 'default' | 'narrow' | 'wide'
}

export function Container({
  children,
  className,
  size = 'default',
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-5 sm:px-8 lg:px-16',
        size === 'default' && 'max-w-[80rem]',
        size === 'narrow' && 'max-w-4xl',
        size === 'wide' && 'max-w-[90rem]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
