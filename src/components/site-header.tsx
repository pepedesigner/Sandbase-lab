'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { SiteLogo } from './site-logo'
import { ThemeToggle } from '@/lib/theme'
import styles from './site-header.module.css'

const SANDBASE = 'https://www.sandbase.ai'

/** Every SandBase surface, plus the new Lab entry. Non-Lab items point at the
 * real site so the demo doubles as the "navigation now has a Lab" story. */
const NAV: Array<{ label: string; href: string; internal?: boolean }> = [
  { label: 'Explore', href: `${SANDBASE}/models` },
  { label: 'Agents', href: `${SANDBASE}/agents` },
  { label: 'Sandbox', href: `${SANDBASE}/landing/sandbox` },
  { label: 'Skills', href: `${SANDBASE}/skills` },
  { label: 'Lab', href: '/lab', internal: true },
  { label: 'Docs', href: `${SANDBASE}/docs/` },
  { label: 'Pricing', href: `${SANDBASE}/pricing` },
]

function GitHubIcon() {
  return (
    <a
      href="https://github.com/pepedesigner/Sandbase-lab"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Source on GitHub"
      className={styles.github}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    </a>
  )
}

export function SiteHeader() {
  const pathname = usePathname() ?? '/'
  const [drawerOpen, setDrawerOpen] = useState(false)
  const drawerTriggerRef = useRef<HTMLButtonElement>(null)
  const labActive = pathname === '/lab' || pathname.startsWith('/lab/')

  useEffect(() => setDrawerOpen(false), [pathname])
  useEffect(() => {
    if (!drawerOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      setDrawerOpen(false)
      drawerTriggerRef.current?.focus()
    }
    document.addEventListener('keydown', closeWithEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeWithEscape)
    }
  }, [drawerOpen])

  const closeDrawer = () => setDrawerOpen(false)

  return (
    <>
      <Link href="/lab/skills" className={styles.announcement} aria-label="SandBase Lab is live: run Agent Skills right in your browser.">
        <span aria-hidden="true" className={styles.announcementWipe} />
        <span className={styles.announcementName}>SandBase Lab</span>
        <span className={styles.announcementMessage}>Agent Skills you can run right in the browser.</span>
        <span className={styles.announcementCta}>Run one now</span>
      </Link>
      <header data-site-header className={styles.header}>
        <div className={styles.bar}>
          <SiteLogo withLab />
          <nav className={styles.desktopNav} aria-label="Primary navigation">
            {NAV.map((item) =>
              item.internal ? (
                <Link key={item.label} href={item.href} className={styles.navLink} data-active={labActive || undefined} aria-current={labActive ? 'page' : undefined}>
                  {item.label}
                </Link>
              ) : (
                <a key={item.label} href={item.href} className={styles.navLink} target="_blank" rel="noopener noreferrer">
                  {item.label}
                </a>
              ),
            )}
          </nav>
          <div className={styles.desktopActions}>
            <ThemeToggle />
            <GitHubIcon />
            <a href={`${SANDBASE}/login`} target="_blank" rel="noopener noreferrer" className={styles.signIn}>
              Sign in
            </a>
            <Link href="/lab/skills" className={styles.start}>
              Start running
            </Link>
          </div>
          <button
            ref={drawerTriggerRef}
            type="button"
            aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen((value) => !value)}
            className={styles.mobileButton}
          >
            {drawerOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>
      {drawerOpen ? (
        <div className={styles.drawerRoot} role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <button type="button" aria-label="Close menu" className={styles.backdrop} onClick={closeDrawer} />
          <div className={styles.drawer}>
            <div className={styles.drawerCloseRow}>
              <button
                type="button"
                aria-label="Close navigation panel"
                onClick={() => {
                  closeDrawer()
                  drawerTriggerRef.current?.focus()
                }}
                className={styles.drawerClose}
              >
                ×
              </button>
            </div>
            <nav className={styles.mobileNav} aria-label="Mobile navigation">
              {NAV.map((item) =>
                item.internal ? (
                  <Link key={item.label} href={item.href} className={styles.mobileNavLink} data-active={labActive || undefined} onClick={closeDrawer}>
                    {item.label}
                  </Link>
                ) : (
                  <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className={styles.mobileNavLink} onClick={closeDrawer}>
                    {item.label}
                  </a>
                ),
              )}
            </nav>
            <div className={styles.drawerActions}>
              <div className={styles.drawerTheme}>
                <span className={styles.drawerThemeLabel}>Theme</span>
                <ThemeToggle />
              </div>
              <a href={`${SANDBASE}/login`} target="_blank" rel="noopener noreferrer" className={styles.signIn} onClick={closeDrawer}>
                Sign in
              </a>
              <Link href="/lab/skills" className={styles.start} onClick={closeDrawer}>
                Start running
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
