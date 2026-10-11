import type { CSSProperties } from 'react'

import { SkillCard } from '@/components/lab/skill-card'
import type { Skill } from '@/content/skills'
import { cn } from '@/lib/cn'
import styles from './hero-skill-marquee.module.css'

const LANE_COUNT = 2

/**
 * The hero's Skill wall: two lanes of full-size cards looping upward. They run
 * at slightly different speeds so the block never reads as a static grid, and
 * the mask means cards fade in and out instead of hard-cutting. Hovering or
 * focusing a card stops the motion, and `prefers-reduced-motion` turns the
 * lanes into plain manual scrollers.
 */
export function HeroSkillMarquee({ skills }: { skills: Skill[] }) {
  const lanes = Array.from({ length: LANE_COUNT }, (_, lane) =>
    skills.filter((_, index) => index % LANE_COUNT === lane),
  )

  return (
    <div className="w-full">
      {/* The cards below are h3, so the region needs an h2 for screen-reader
       * heading order; visually the hero copy already does that job. */}
      <h2 className="sr-only">Featured Agent Skills</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
    </div>
  )
}
