import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  // `dark:` follows the site theme toggle (data-theme on <html>), not the OS.
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--color-canvas)', surface: 'var(--color-surface)',
        'surface-alt': 'var(--color-surface-alt)', line: 'var(--color-line)',
        'line-control': 'var(--color-line-control)', 'line-strong': 'var(--color-line-strong)',
        ink: 'var(--color-ink)', 'ink-muted': 'var(--color-ink-muted)', 'ink-subtle': 'var(--color-ink-subtle)',
        accent: 'var(--color-accent)', panel: 'var(--color-panel)', 'panel-fg': 'var(--color-panel-fg)',
        'panel-fg-muted': 'var(--color-panel-fg-muted)', 'panel-fg-label': 'var(--color-panel-fg-label)', 'panel-code': 'var(--color-panel-code)',
        'tint-cyan': 'var(--color-tint-cyan)', 'tint-blue': 'var(--color-tint-blue)', 'tint-blue-fg': 'var(--color-tint-blue-fg)',
        'tint-fg': 'var(--color-tint-yellow-fg)',
        'tint-mint': 'var(--color-tint-mint)', 'tint-mint-strong': 'var(--color-tint-mint-strong)',
        'tint-yellow': 'var(--color-tint-yellow)', 'tint-yellow-fg': 'var(--color-tint-yellow-fg)',
        'positive-bright': 'var(--color-positive-bright)', positive: 'var(--color-positive)',
        plate: 'var(--color-plate)',
      },
      keyframes: {
        sweep: { from: { transform: 'translateY(0)' }, to: { transform: 'translateY(400%)' } },
        lights: { '0%': { fill: 'var(--color-tint-blue)' }, '33.333%,100%': { fill: 'var(--color-ink)' } },
      },
      animation: {
        sweep: 'sweep 1.6s cubic-bezier(0.4,0,0.2,1) infinite',
        lights: 'lights 1.2s step-end infinite',
      },
      borderRadius: { button: '0', chip: '0', card: '4px', panel: '4px' },
      fontSize: {
        hero: ['clamp(2.5rem, 1.5rem + 3.4vw, 3.75rem)', { lineHeight: '1.06', letterSpacing: '-.025em', fontWeight: '500' }],
        display: ['clamp(2.75rem, 1.5rem + 4vw, 4.5rem)', { lineHeight: '1.03', letterSpacing: '-.025em', fontWeight: '500' }],
        'catalog-title': ['4rem', { lineHeight: '1.03', letterSpacing: '-.025em', fontWeight: '500' }],
        h1: ['clamp(2rem, 1.2rem + 2.5vw, 2.8125rem)', { lineHeight: '1.155', letterSpacing: '-.02em', fontWeight: '500' }],
        h2: ['clamp(1.75rem, 1.35rem + 1.3vw, 2.25rem)', { lineHeight: '1.055', letterSpacing: '-.01em', fontWeight: '500' }],
        'h2-cta': ['clamp(1.875rem, 1.3rem + 1.9vw, 2.625rem)', { lineHeight: '1.19', letterSpacing: '-.021em', fontWeight: '500' }],
        'lede-lg': ['1.125rem', { lineHeight: '1.75rem' }], lede: ['1.0625rem', { lineHeight: '1.625rem' }],
        'card-title': ['1.375rem', { lineHeight: '1.625rem', fontWeight: '500' }], 'plan-value': ['clamp(2.25rem, 1.8rem + 1.5vw, 2.875rem)', { lineHeight: '1.04', fontWeight: '500' }],
        body: ['1rem', { lineHeight: '1.5rem' }], 'body-sm': ['.9375rem', { lineHeight: '1.4375rem' }], 'body-xs': ['.90625rem', { lineHeight: '1.375rem' }],
        'label-sm': ['.6875rem', { letterSpacing: '.08em' }], label: ['.71875rem', { letterSpacing: '.08em' }], 'label-xs': ['.625rem', { letterSpacing: '.09em' }], 'mono-xs': '.6875rem',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        65: '16.25rem',
        85: '21.25rem',
      },
    },
  },
  plugins: [],
}

export default config
