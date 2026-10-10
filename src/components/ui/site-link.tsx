import Link from 'next/link'
import type { ComponentProps } from 'react'

import { isExternal } from '@/components/ui/link-utils'

/**
 * One link primitive for the whole site. Internal hrefs go through
 * `next/link` for client navigation; anything with an http(s) origin is a
 * plain anchor so it opens in a new tab.
 */
export function SiteLink({ href = '', children, ...props }: ComponentProps<'a'>) {
  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noreferrer" {...props}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  )
}
