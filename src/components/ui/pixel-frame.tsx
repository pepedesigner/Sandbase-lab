import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

/** The dark plate a pixel scene sits on: plate ground, pixel grid, lime corner marks. */
export function PixelFrame({
  className,
  children,
  sweep = true,
}: {
  className?: string
  children: ReactNode
  sweep?: boolean
}) {
  return (
    <div
      className={cn('group relative w-full overflow-hidden bg-plate pixel-tile pixel-tile--on-dark', className)}
    >
      {children}
      {sweep ? (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-1/3 h-1/3 bg-tint-cyan opacity-0 mix-blend-exclusion transition-opacity group-hover:animate-sweep group-hover:opacity-100 motion-reduce:hidden"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-1/3 h-px bg-panel-fg opacity-0 transition-opacity group-hover:animate-sweep group-hover:opacity-100 motion-reduce:hidden"
          />
        </>
      ) : null}
      {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((position) => (
        <span key={position} className={`absolute size-2.5 bg-tint-cyan ${position}`} />
      ))}
    </div>
  )
}
