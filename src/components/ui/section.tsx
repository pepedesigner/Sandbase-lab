import type { ComponentProps } from 'react'

import { cn } from '@/lib/cn'

type SectionProps = ComponentProps<'section'>

/** Full-bleed band; the tint comes in via className. 88px at the artboard. */
export function Section({ className, ...props }: SectionProps) {
  return <section className={cn('py-14 md:py-22', className)} {...props} />
}
