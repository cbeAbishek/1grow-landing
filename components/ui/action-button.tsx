import React from 'react'
import Link from 'next/link'
import { ArrowRight, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ActionVariant =
  | 'primary'
  | 'primary-rect'
  | 'secondary'
  | 'secondary-rect'
  | 'pill'
  | 'pill-header'
  | 'secondary-dark'
  | 'tertiary'

export interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ActionVariant
  href?: string
  loading?: boolean
  external?: boolean
  icon?: React.ReactNode
  showArrow?: boolean
}

export function ActionButton({
  children,
  className,
  variant = 'primary',
  href,
  loading = false,
  disabled,
  external,
  icon,
  showArrow = false,
  ...props
}: ActionButtonProps) {
  const isTertiary = variant === 'tertiary'

  const content = (
    <>
      {loading ? (
        <Loader2 className="size-4.5 animate-spin" aria-hidden="true" />
      ) : (
        icon && <span className="shrink-0">{icon}</span>
      )}
      <span className="whitespace-nowrap">{children}</span>
      {showArrow && (
        <ArrowRight
          className="size-4.5 shrink-0 btn-arrow"
          aria-hidden="true"
        />
      )}
    </>
  )

  const variantClass = cn(
    (variant === 'primary' || variant === 'primary-rect' || variant === 'pill') &&
      'btn btn--primary btn--shine',
    (variant === 'secondary' || variant === 'secondary-rect') &&
      'btn btn--secondary',
    variant === 'pill-header' &&
      'btn btn--primary btn--header btn--shine',
    variant === 'secondary-dark' &&
      'btn border-2 border-white/90 text-white bg-transparent hover:bg-white/15 active:border-white transition-all duration-200',
    isTertiary && 'link-arrow group inline-flex items-center gap-1.5',
    (disabled || loading) && 'pointer-events-none opacity-60 cursor-not-allowed',
    className,
  )

  if (href) {
    if (external || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) {
      return (
        <a
          href={href}
          className={variantClass}
          target={external || href.startsWith('http') ? '_blank' : undefined}
          rel={external || href.startsWith('http') ? 'noopener noreferrer' : undefined}
          aria-busy={loading ? 'true' : undefined}
        >
          {content}
        </a>
      )
    }

    return (
      <Link href={href} className={variantClass} aria-busy={loading ? 'true' : undefined}>
        {content}
      </Link>
    )
  }

  return (
    <button
      className={variantClass}
      disabled={disabled || loading}
      aria-busy={loading ? 'true' : undefined}
      {...props}
    >
      {content}
    </button>
  )
}
