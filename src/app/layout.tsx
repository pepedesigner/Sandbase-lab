import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import localFont from 'next/font/local'
import { JetBrains_Mono } from 'next/font/google'

import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import './globals.css'

/* Clash Grotesk is self-hosted from the SandBase webfont; JetBrains Mono covers
 * every label, id and log line. Both are loaded through next/font, so they are
 * bundled, preloaded and served from our own origin — no third-party request
 * and no render-blocking stylesheet. */
const clash = localFont({
  src: '../fonts/ClashGrotesk-Variable.woff2',
  variable: '--font-clash',
  weight: '200 700',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://lab.sandbase.ai'),
  title: {
    default: 'SandBase Lab — Agent Skills you can run in the browser',
    template: '%s | SandBase Lab',
  },
  description:
    'Browse original Agent Skills for design, web, slides, image and video work — then run any of them right in your browser. Built on the SandBase design language.',
  applicationName: 'SandBase Lab',
  openGraph: {
    title: 'SandBase Lab — Agent Skills you can run in the browser',
    description: 'Browse Agent Skills and run them right in your browser.',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'SandBase Lab' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SandBase Lab — Agent Skills you can run in the browser',
    description: 'Browse Agent Skills and run them right in your browser.',
    images: ['/og.png'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark light',
  themeColor: '#0e0b1a',
}

/**
 * Runs before hydration so the first painted frame already matches the stored
 * preference. Defaults to light (the paper risograph look) for a deterministic
 * first impression; System / Light / Dark are all selectable.
 */
const themeBootstrapScript = `(function(){try{var p=localStorage.getItem('lab-theme');if(p!=='light'&&p!=='dark'&&p!=='system')p='light';var d=p==='dark'||(p==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);var r=document.documentElement;r.classList.toggle('light-mode',!d);r.dataset.theme=d?'dark':'light';r.style.colorScheme=d?'dark':'light'}catch(e){}})()`

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${clash.variable} ${mono.variable} light-mode`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/icon.svg" />
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      </head>
      <body>
        <div className="app-shell">
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          <SiteHeader />
          <main id="main-content" className="site-main" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}
