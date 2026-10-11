'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { SkillBadge } from '@/components/lab/skill-card'
import { SkillImage } from '@/components/lab/skill-image'
import { PixelFrame } from '@/components/ui/pixel-frame'
import { CATEGORY_BY_KEY } from '@/content/categories'
import { skillCardImage, type Skill } from '@/content/skills'
import { cn } from '@/lib/cn'

const AUTOPLAY_MS = 5600

/** Signed distance from `active`, wrapped to [-count/2, count/2] so the deck loops. */
function deckOffset(index: number, active: number, count: number): number {
  const wrapped = ((index - active) % count + count) % count
  return wrapped > count / 2 ? wrapped - count : wrapped
}

/**
 * Hero coverflow: three previews at a time — the active Skill large in the
 * centre, its neighbours smaller and tilted away in perspective. It advances on
 * its own; hovering or focusing pauses it, and anyone who asks for reduced
 * motion gets a still deck.
 */
export function HeroCarousel({ skills, className }: { skills: Skill[]; className?: string }) {
  const count = skills.length
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  if (count === 0) return null

  const current = skills[active]
  const category = CATEGORY_BY_KEY[current.category]
  const autoplays = count > 1 && !reduced
  const paused = hovered || userPaused

  const go = (delta: number) => setActive((index) => (index + delta + count) % count)

  const advance = () => {
    if (paused) return
    setActive((index) => (index + 1) % count)
  }

  return (
    <div
      className={cn('flex flex-col', className)}
      role="group"
      aria-roledescription="carousel"
      aria-label="Featured Agent Skills"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
    >
      <div className="relative [perspective:1600px]">
        <div aria-hidden="true" className="mx-auto aspect-video w-[62%] opacity-0" />
        {skills.map((skill, index) => {
          const offset = deckOffset(index, active, count)
          const distance = Math.abs(offset)
          const isActive = distance === 0
          const hidden = distance > 1
          return (
            <div
              key={skill.slug}
              aria-hidden={hidden}
              className="absolute left-1/2 top-1/2 aspect-video w-[62%] transition-[transform,opacity] duration-700 ease-[cubic-bezier(.22,.61,.36,1)] motion-reduce:transition-none"
              style={{
                transform: `translate(calc(-50% + ${offset * 50}%), calc(-50% + ${distance * 7}%)) rotateY(${offset * -24}deg) scale(${1 - distance * 0.2})`,
                zIndex: 30 - distance,
                opacity: hidden ? 0 : isActive ? 1 : 0.7,
                pointerEvents: hidden || !isActive ? 'none' : 'auto',
              }}
            >
              <PixelFrame className="h-full w-full" sweep={false}>
                <Link
                  href={`/lab/skills/${skill.slug}`}
                  tabIndex={isActive ? 0 : -1}
                  aria-label={`${skill.name} — open Skill`}
                  className="absolute inset-0 block"
                >
                  <SkillImage
                    skill={skill}
                    src={skillCardImage(skill)}
                    priority={index < 2 || index === count - 1}
                    className="absolute inset-0"
                  />
                </Link>
              </PixelFrame>
            </div>
          )
        })}
      </div>

      <div className="mt-7 flex flex-col items-center gap-3 text-center">
        <div className="flex items-center gap-2">
          <SkillBadge skill={current} />
          <p className="text-card-title text-tint-blue-fg">{current.name}</p>
          <span className="font-mono text-label-xs uppercase tracking-[0.09em] text-tint-blue-fg/60">{category.label}</span>
        </div>
        <p className="max-w-[24rem] text-body-xs text-tint-blue-fg/80">{current.tagline}</p>
        <div className="h-px w-[10rem] overflow-hidden bg-tint-blue-fg/20">
          <div
            key={active}
            onAnimationEnd={advance}
            className="h-full origin-left bg-tint-blue-fg"
            style={{
              animationName: autoplays ? 'sb-progress' : 'none',
              animationDuration: `${AUTOPLAY_MS}ms`,
              animationTimingFunction: 'linear',
              animationFillMode: 'forwards',
              animationPlayState: paused ? 'paused' : 'running',
            }}
          />
        </div>

        <div className="mt-1 flex items-center gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous Skill"
            className="grid size-8 place-items-center font-mono text-body-sm text-tint-blue-fg ring-1 ring-inset ring-tint-blue-fg transition-colors hover:bg-tint-blue-fg hover:text-tint-blue"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => setUserPaused((value) => !value)}
            aria-pressed={userPaused}
            className="font-mono text-label-xs uppercase tracking-[0.08em] text-tint-blue-fg underline decoration-1 underline-offset-4 transition-colors hover:decoration-2"
          >
            {userPaused ? 'Play' : 'Pause'}
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next Skill"
            className="grid size-8 place-items-center font-mono text-body-sm text-tint-blue-fg ring-1 ring-inset ring-tint-blue-fg transition-colors hover:bg-tint-blue-fg hover:text-tint-blue"
          >
            →
          </button>
          <span className="font-mono text-label-xs tabular-nums text-tint-blue-fg/60">
            {String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  )
}
