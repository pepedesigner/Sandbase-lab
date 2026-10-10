import type { CSSProperties } from 'react'

import { cn } from '@/lib/cn'

/*
 * An icon from /public/icons, drawn as a CSS mask filled with currentColor so
 * it takes the surrounding text colour on any surface.
 */
export function Icon({
  name,
  size = 14,
  className,
}: {
  name: string
  size?: number
  className?: string
}) {
  const url = `url(/icons/${name}.svg)`
  return (
    <span
      aria-hidden="true"
      className={cn('inline-block flex-none bg-current align-middle', className)}
      style={
        {
          width: size,
          height: size,
          WebkitMaskImage: url,
          maskImage: url,
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
        } as CSSProperties
      }
    />
  )
}
