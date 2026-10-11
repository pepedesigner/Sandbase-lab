'use client'

import type { CSSProperties } from 'react'
import { useState } from 'react'

import { SkillCard } from '@/components/lab/skill-card'
import type { Skill } from '@/content/skills'
import { cn } from '@/lib/cn'
import styles from './hero-skill-marquee.module.css'

const LANE_COUNT = 2

/**
 * The hero's Skill wall: two lanes of full-size cards looping upward. They run
 * at slightly different speeds so the block never reads as a static grid, and
 * the mask means cards fade in and out instead of hard-cutting. Hover, focus or
 * the button stops it; `prefers-reduced-motion` turns it into a manual scroller.
 */
export function HeroSkillMarquee({ skills }: { skills: Skill[] }) {
  const [userPaused, setUserPaused] = useState(false)
  const lanes = Array.from({ length: LANE_COUNT }, (_, lane) =>
    skills.filter((_, index) => index % LANE_COUNT === lane),
  )

  return (
    <div className="flex w-full flex-col gap-4">
      {/* The cards below are h3, so the region needs an h2 for screen-reader
       * heading order; visually the hero copy already does that job. */}
      <h2 className="sr-only">Featured Agent Skills</h2>
      <div className={cn('grid grid-cols-1 gap-5 sm:grid-cols-2', userPaused && styles.paused)}>
        {lanes.map((lane, laneIndex) => (
          <div key={laneIndex} className={cn(styles.lane, laneIndex > 0 && 'hidden sm:block')}>
            <div className={styles.track} style={{ '--lane-duration': `${38 + laneIndex * 6}s` } as CSSProperties}>
              {[...lane, ...lane].map((skill, index) => (
                <div key={`${skill.slug}-${index}`} className={styles.item}>
                  <SkillCard skill={skill} decorative={index >= lane.length} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <span className="font-mono text-label-xs uppercase tracking-[0.09em] text-tint-blue-fg/70">
          The whole library · looping · pauses on hover
        </span>
        <button
          type="button"
          onClick={() => setUserPaused((value) => !value)}
          aria-pressed={userPaused}
          className="font-mono text-label-xs uppercase tracking-[0.08em] text-tint-blue-fg underline decoration-1 underline-offset-4 transition-colors hover:decoration-2"
        >
          {userPaused ? 'Play' : 'Pause'}
        </button>
      </div>
    </div>
  )
}
