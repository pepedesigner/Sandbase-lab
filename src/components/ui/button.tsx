import type { ComponentProps } from 'react'

import { cn } from '@/lib/cn'

type ButtonLinkProps = ComponentProps<'a'> & {
  href: string
  variant?: 'primary' | 'secondary' | 'inverse' | 'tint'
  size?: 'sm' | 'md'
}

/* Square-cornered, borderless. Primary flips to lime on hover, secondary to violet. */
const VARIANTS = {
  primary: 'bg-ink text-canvas hover:bg-tint-cyan hover:text-ink',
  secondary:
    'bg-surface text-ink ring-1 ring-inset ring-line-control hover:bg-tint-blue hover:text-tint-blue-fg hover:ring-0',
  inverse: 'bg-tint-cyan text-ink hover:bg-surface',
  tint: 'bg-tint-fg text-panel-fg hover:bg-tint-cyan hover:text-tint-fg',
} as const

const SIZES = {
  sm: 'pl-5 pr-[18px] py-2.5 text-body',
  md: 'pl-6 pr-[22px] py-[13px] text-body',
} as const

export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        'inline-flex items-center justify-center rounded-none font-medium tracking-[0.01em] whitespace-nowrap transition-colors',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    >
      {children}
    </a>
  )
}
