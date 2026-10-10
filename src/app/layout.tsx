import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import './globals.css'

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
    <html lang="en" data-theme="light" className="light-mode" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="/ClashGrotesk-Variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;700&family=JetBrains+Mono:wght@400;500;700&family=Manrope:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
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
