import Link from 'next/link'

import { LogoMark } from './design-logo'
import styles from './site-logo.module.css'

export function BrandMark({ className }: { className?: string }) {
  return (
    <span className={[styles.mark, className].filter(Boolean).join(' ')} aria-hidden="true">
      <LogoMark className={styles.markImage} />
    </span>
  )
}

/** Wordmark + optional "Lab" tag. Links home. */
export function SiteLogo({ withLab = false }: { withLab?: boolean }) {
  return (
    <Link href="/lab" aria-label="SandBase Lab home" className={`${styles.logo} group`}>
      <BrandMark />
      <span className={styles.wordmark} aria-hidden="true">
        SandBase
      </span>
      {withLab ? (
        <span className={styles.labTag} aria-hidden="true">
          Lab
        </span>
      ) : null}
    </Link>
  )
}
