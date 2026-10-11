'use client'

import { useCallback, useEffect, useState, useSyncExternalStore } from 'react'

export type ThemePreference = 'system' | 'light' | 'dark'
const STORAGE_KEY = 'lab-theme'
const EVENT = 'lab:theme'

function readPreference(): ThemePreference {
  if (typeof localStorage === 'undefined') return 'light'
  const value = localStorage.getItem(STORAGE_KEY)
  return value === 'light' || value === 'dark' || value === 'system' ? value : 'light'
}

function apply(preference: ThemePreference) {
  const dark = preference === 'dark' || (preference === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  const root = document.documentElement
  root.classList.toggle('light-mode', !dark)
  root.dataset.theme = dark ? 'dark' : 'light'
  root.style.colorScheme = dark ? 'dark' : 'light'
}

let listeners: Array<() => void> = []
function subscribe(listener: () => void) {
  listeners.push(listener)
  const onStorage = () => listener()
  window.addEventListener(EVENT, onStorage)
  window.addEventListener('storage', onStorage)
  return () => {
    listeners = listeners.filter((item) => item !== listener)
    window.removeEventListener(EVENT, onStorage)
    window.removeEventListener('storage', onStorage)
  }
}
function emit() {
  for (const listener of listeners) listener()
}

/** Theme preference store, mirroring the SandBase website switcher. */
function useTheme() {
  const preference = useSyncExternalStore(subscribe, readPreference, () => 'light' as ThemePreference)
  const setPreference = useCallback((next: ThemePreference) => {
    localStorage.setItem(STORAGE_KEY, next)
    apply(next)
    emit()
  }, [])
  return { preference, setPreference }
}

const CYCLE: ThemePreference[] = ['light', 'dark', 'system']

/** A compact labelled control; click cycles Light → Dark → System. */
export function ThemeToggle() {
  const { preference, setPreference } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const current = mounted ? preference : 'light'
  const next = CYCLE[(CYCLE.indexOf(current) + 1) % CYCLE.length]
  return (
    <button
      type="button"
      onClick={() => setPreference(next)}
      title={`Colour theme: ${current} — click for ${next}`}
      aria-label={`Colour theme: ${current}. Change to ${next}.`}
      className="inline-flex items-center gap-2 border-0 bg-transparent p-0 font-mono text-label-xs uppercase tracking-[0.08em] text-ink-muted transition-colors hover:text-ink"
    >
      <span aria-hidden="true" className="size-[7px] bg-accent" />
      <span>{current}</span>
    </button>
  )
}
