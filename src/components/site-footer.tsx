import Link from 'next/link'

import { SiteLogo } from './site-logo'
import styles from './site-footer.module.css'

const SANDBASE = 'https://www.sandbase.ai'
const REPO = 'https://github.com/pepedesigner/Sandbase-lab'
const tagline = 'Agent Skills with taste — browse the catalog, then run any Skill straight in your browser.'

type FooterLink = { to: string; label: string; external?: boolean }

const footerSections: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Lab',
    links: [
      { to: '/lab/skills', label: 'All Skills' },
      { to: '/lab/pricing', label: 'Pricing' },
      { to: '/lab/skills/dot-avatar-maker', label: 'Run a Skill' },
      { to: '/lab#faq', label: 'FAQ' },
    ],
  },
  {
    title: 'SandBase',
    links: [
      { to: `${SANDBASE}/agents`, label: 'Agents', external: true },
      { to: `${SANDBASE}/models`, label: 'Models', external: true },
      { to: `${SANDBASE}/skills`, label: 'Skills', external: true },
      { to: `${SANDBASE}/landing/sandbox`, label: 'Sandbox', external: true },
    ],
  },
  {
    title: 'Build',
    links: [
      { to: `${SANDBASE}/console/agents`, label: 'Build Agent', external: true },
      { to: `${SANDBASE}/console/endpoints`, label: 'Published Agents', external: true },
      { to: `${SANDBASE}/console/deployments`, label: 'Schedules', external: true },
      { to: `${SANDBASE}/console/sessions`, label: 'Runs', external: true },
    ],
  },
  {
    title: 'Learn',
    links: [
      { to: `${SANDBASE}/docs/`, label: 'Docs', external: true },
      { to: `${SANDBASE}/pricing`, label: 'Pricing', external: true },
      { to: `${SANDBASE}/blog/`, label: 'Blog', external: true },
      { to: REPO, label: 'GitHub', external: true },
    ],
  },
]

const socialLinks = [
  {
    href: 'https://github.com/pepedesigner/Sandbase-lab',
    label: 'GitHub',
    icon: <path d="M12 1.7a10.5 10.5 0 0 0-3.32 20.46c.52.1.72-.22.72-.5v-1.84c-2.93.64-3.55-1.24-3.55-1.24-.48-1.22-1.17-1.54-1.17-1.54-.96-.66.07-.64.07-.64 1.06.07 1.62 1.09 1.62 1.09.94 1.61 2.47 1.15 3.07.88.1-.68.37-1.15.67-1.41-2.34-.27-4.8-1.17-4.8-5.19 0-1.15.41-2.08 1.08-2.82-.11-.27-.47-1.34.1-2.79 0 0 .88-.28 2.89 1.08A10 10 0 0 1 12 6.9c.89 0 1.78.12 2.63.35 2-1.36 2.88-1.08 2.88-1.08.58 1.45.22 2.52.11 2.79.67.74 1.08 1.67 1.08 2.82 0 4.03-2.47 4.92-4.82 5.18.38.33.72.97.72 1.96v2.74c0 .28.19.6.73.5A10.5 10.5 0 0 0 12 1.7Z" />,
  },
  {
    href: 'https://x.com/sandbaseai',
    label: 'X.com',
    icon: <path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.39L6.48 22H3.36l7.24-8.28L2.96 2h6.4l4.42 5.84L18.9 2Zm-1.1 17.84h1.72L8.42 4.05H6.57L17.8 19.84Z" />,
  },
  {
    href: 'https://www.linkedin.com/company/sandbaseai',
    label: 'LinkedIn',
    icon: <path d="M5.34 3.5A1.84 1.84 0 1 1 1.67 3.5a1.84 1.84 0 0 1 3.67 0ZM5.5 7H1.5v15h4V7Zm6.33 0H8v15h4v-7.43c0-1.96.37-3.86 2.8-3.86 2.4 0 2.43 2.24 2.43 3.99V22h4v-8.23c0-4.04-.87-7.15-5.6-7.15-2.27 0-3.79 1.25-4.41 2.43h-.06V7h-3.83v15h4V14.57c0-1.96.37-3.86 2.8-3.86" />,
  },
]

export function SiteFooter() {
  return (
    <footer data-site-footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.brand}>
            <SiteLogo withLab />
            <p>{tagline}</p>
            <ul className={styles.socials}>
              {socialLinks.map((item) => (
                <li key={item.href}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className={`${styles.link} ${styles.socialLink}`}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">{item.icon}</svg>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <nav aria-label="Footer" className={styles.nav}>
            <div className={styles.navGrid}>
              {footerSections.map((section) => (
                <div key={section.title} className={styles.group}>
                  <h2>{section.title}</h2>
                  <ul>
                    {section.links.map((item) =>
                      item.external ? (
                        <li key={item.to + item.label}>
                          <a href={item.to} target="_blank" rel="noopener noreferrer" className={styles.link}>
                            {item.label}
                          </a>
                        </li>
                      ) : (
                        <li key={item.to + item.label}>
                          <Link href={item.to} className={styles.link}>
                            {item.label}
                          </Link>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
        </div>
        <div className={styles.bottom}>
          <p>© 2026 SandBase Lab — a demo built on the SandBase design language.</p>
          <div className={styles.status}>
            <span className={styles.statusLink}>
              <span aria-hidden="true" className={styles.statusDot} />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
