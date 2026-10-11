import Link from 'next/link'

import { SkillImage } from '@/components/lab/skill-image'
import { SkillBadge } from '@/components/lab/skill-card'
import { PixelFrame } from '@/components/ui/pixel-frame'
import { CATEGORY_BY_KEY } from '@/content/categories'
import { skillCardImage, type Skill } from '@/content/skills'
import { cn } from '@/lib/cn'

/**
 * A compact, one-row version of a Skill — a thumbnail plus its key facts.
 * Sized to a fixed height so vertical carousels can translate by a known pitch.
 *
 * `decorative` renders the marquee's duplicated second pass: identical to look
 * at, but hidden from assistive tech and skipped by the keyboard so the loop
 * does not add duplicate links.
 */
export function SkillCarouselCard({
  skill,
  decorative = false,
  className,
}: {
  skill: Skill
  decorative?: boolean
  className?: string
}) {
  const category = CATEGORY_BY_KEY[skill.category]
  const classes = cn(
    'group flex h-full items-stretch gap-4 bg-surface p-3 transition-colors hover:bg-surface-alt',
    className,
  )

  const content = (
    <>
      <PixelFrame sweep={false} className="aspect-video w-32 flex-none">
        <SkillImage skill={skill} src={skillCardImage(skill)} className="absolute inset-0" />
      </PixelFrame>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5">
        <div className="flex items-center gap-2">
          <SkillBadge skill={skill} />
          <span className="font-mono text-label-xs uppercase tracking-[0.09em] text-ink-subtle">{category.label}</span>
        </div>
        <h3 className="truncate text-card-title text-ink">{skill.name}</h3>
        <p className="truncate text-body-xs text-ink-muted">{skill.tagline}</p>
      </div>
      <span className="self-center pr-1 font-mono text-label-xs tabular-nums text-ink-subtle">{skill.installs}</span>
    </>
  )

  if (decorative) {
    return (
      <div aria-hidden="true" className={classes}>
        {content}
      </div>
    )
  }

  return (
    <Link href={`/lab/skills/${skill.slug}`} className={classes}>
      {content}
    </Link>
  )
}
