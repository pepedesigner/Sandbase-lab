'use client'

import { useEffect, useRef, useState } from 'react'

import { SkillCarouselCard } from '@/components/lab/skill-carousel-card'
import type { Skill } from '@/content/skills'
import { cn } from '@/lib/cn'
import styles from './carousels.module.css'

/** item height (96) + its bottom margin (12) */
const PITCH = 108
const VISIBLE = 3

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function StepButton({
  label,
  glyph,
  onClick,
  disabled,
}: {
  label: string
  glyph: string
  onClick: () => void
  disabled: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="grid size-9 place-items-center bg-surface font-mono text-body-sm text-ink transition-colors hover:bg-tint-blue hover:text-tint-blue-fg disabled:opacity-35 disabled:hover:bg-surface disabled:hover:text-ink"
    >
      {glyph}
    </button>
  )
}

function PlayToggle({ paused, onToggle }: { paused: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={paused}
      className="font-mono text-label-xs uppercase tracking-[0.08em] text-ink-muted transition-colors hover:text-ink"
    >
      {paused ? 'Play' : 'Pause'}
    </button>
  )
}

function Dots({ count, index, onSelect }: { count: number; index: number; onSelect: (index: number) => void }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: count }, (_, position) => (
        <button
          key={position}
          type="button"
          aria-label={`Go to position ${position + 1} of ${count}`}
          aria-current={position === index || undefined}
          onClick={() => onSelect(position)}
          className={cn('size-2 transition-colors', position === index ? 'bg-accent' : 'bg-line hover:bg-ink-muted')}
        />
      ))}
    </div>
  )
}

function Caption({ children, right }: { children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="mt-3 flex min-h-9 flex-wrap items-center justify-between gap-x-4 gap-y-2">
      <span className="font-mono text-label-xs uppercase tracking-[0.09em] text-ink-subtle">{children}</span>
      {right}
    </div>
  )
}

/* --------------------------------------------------- A · continuous loop */
export function MarqueeCarousel({ skills }: { skills: Skill[] }) {
  const [userPaused, setUserPaused] = useState(false)
  return (
    <div>
      <div className={cn(styles.viewport, styles.marquee, userPaused && styles.marqueePaused)}>
        <div className={styles.marqueeTrack}>
          {skills.map((skill) => (
            <div key={skill.slug} className={styles.item}>
              <SkillCarouselCard skill={skill} />
            </div>
          ))}
          {skills.map((skill) => (
            <div key={`duplicate-${skill.slug}`} className={styles.item}>
              <SkillCarouselCard skill={skill} decorative />
            </div>
          ))}
        </div>
      </div>
      <Caption right={<PlayToggle paused={userPaused} onToggle={() => setUserPaused((value) => !value)} />}>
        Endless · pauses on hover
      </Caption>
    </div>
  )
}

/* -------------------------------------------------- B · stepped autoplay */
export function SteppedCarousel({ skills }: { skills: Skill[] }) {
  const max = Math.max(0, skills.length - VISIBLE)
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const paused = hovered || userPaused

  useEffect(() => {
    if (paused || max === 0 || prefersReducedMotion()) return
    const timer = setInterval(() => setIndex((value) => (value >= max ? 0 : value + 1)), 3000)
    return () => clearInterval(timer)
  }, [max, paused])

  return (
    <div>
      <div
        className={cn(styles.viewport, styles.stepped)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocusCapture={() => setHovered(true)}
        onBlurCapture={() => setHovered(false)}
      >
        <div className={styles.steppedTrack} style={{ transform: `translateY(${-index * PITCH}px)` }}>
          {skills.map((skill) => (
            <div key={skill.slug} className={styles.item}>
              <SkillCarouselCard skill={skill} />
            </div>
          ))}
        </div>
      </div>
      <Caption
        right={
          <div className="flex items-center gap-3">
            <Dots count={max + 1} index={index} onSelect={setIndex} />
            <StepButton label="Previous" glyph="↑" onClick={() => setIndex((v) => Math.max(0, v - 1))} disabled={index === 0} />
            <StepButton label="Next" glyph="↓" onClick={() => setIndex((v) => Math.min(max, v + 1))} disabled={index === max} />
            <PlayToggle paused={userPaused} onToggle={() => setUserPaused((value) => !value)} />
          </div>
        }
      >
        Jumps a row every 3s · snapped easing
      </Caption>
    </div>
  )
}

/* ------------------------------------------------------ C · snap & drag */
export function SnapCarousel({ skills }: { skills: Skill[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const last = skills.length - 1

  const handleScroll = () => {
    const element = ref.current
    if (!element) return
    setIndex(Math.max(0, Math.min(last, Math.round(element.scrollTop / PITCH))))
  }

  const go = (next: number) => {
    const element = ref.current
    if (!element) return
    const clamped = Math.max(0, Math.min(last, next))
    element.scrollTo({ top: clamped * PITCH, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  return (
    <div>
      <div
        ref={ref}
        onScroll={handleScroll}
        tabIndex={0}
        role="group"
        aria-label="Skill previews, scrollable"
        className={cn(styles.viewport, styles.snap)}
      >
        {skills.map((skill) => (
          <div key={skill.slug} className={cn(styles.item, styles.snapItem)}>
            <SkillCarouselCard skill={skill} />
          </div>
        ))}
      </div>
      <Caption
        right={
          <div className="flex items-center gap-3">
            <span className="font-mono text-label-xs tabular-nums text-ink-subtle">
              {String(index + 1).padStart(2, '0')} / {String(skills.length).padStart(2, '0')}
            </span>
            <StepButton label="Previous" glyph="↑" onClick={() => go(index - 1)} disabled={index === 0} />
            <StepButton label="Next" glyph="↓" onClick={() => go(index + 1)} disabled={index === last} />
          </div>
        }
      >
        Scroll or drag · snaps to each card
      </Caption>
    </div>
  )
}
