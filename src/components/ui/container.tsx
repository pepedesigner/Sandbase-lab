import type { ComponentProps } from 'react'

import { cn } from '@/lib/cn'

type ContainerProps = ComponentProps<'div'>

/** The shared horizontal measure that keeps page sections aligned. */
export function Container({ className, ...props }: ContainerProps) {
  return <div className={cn('page-measure', className)} {...props} />
}
