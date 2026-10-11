import Link from 'next/link'

import { AgentRow } from '@/components/lab/agent-badges'
import { SkillImage } from '@/components/lab/skill-image'
import { PixelFrame } from '@/components/ui/pixel-frame'
import { CATEGORY_BY_KEY } from '@/content/categories'
import { skillAgents, skillCardImage, type Skill } from '@/content/skills'
import { cn } from '@/lib/cn'

export function SkillBadge({ skill }: { skill: Skill }) {
  if (skill.badge === 'new') {
    return <span className="bg-tint-cyan px-1.5 py-0.5 font-mono text-label-xs uppercase tracking-[0.08em] text-ink">New</span>
  }
  if (skill.badge === 'popular') {
    return <span className="bg-tint-blue px-1.5 py-0.5 font-mono text-label-xs uppercase tracking-[0.08em] text-tint-blue-fg">Popular</span>
  }
  if (skill.price === 'premium') {
    return <span className="bg-ink px-1.5 py-0.5 font-mono text-label-xs uppercase tracking-[0.08em] text-canvas">Pro</span>
  }
  return <span className="bg-surface-alt px-1.5 py-0.5 font-mono text-label-xs uppercase tracking-[0.08em] text-ink">Free</span>
}

export function SkillCard({
  skill,
  decorative = false,
  className,
}: {
  skill: Skill
  decorative?: boolean
  className?: string
}) {
  const agents = skillAgents(skill)
  const category = CATEGORY_BY_KEY[skill.category]
  const classes = cn('group flex flex-col bg-surface transition-colors hover:bg-surface-alt', className)

  const content = (
    <>
      <PixelFrame className="aspect-video">
        <SkillImage skill={skill} src={skillCardImage(skill)} className="absolute inset-0" />
      </PixelFrame>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <SkillBadge skill={skill} />
          <span className="font-mono text-label-xs uppercase tracking-[0.09em] text-ink-subtle">{category.label}</span>
          <span className="ml-auto font-mono text-label-xs tabular-nums text-ink-subtle">{skill.installs} installs</span>
        </div>
        <h3 className="text-card-title text-ink">{skill.name}</h3>
        <p className="text-body-xs text-ink-muted">{skill.tagline}</p>
        <div className="mt-auto flex items-center justify-between pt-1">
          <AgentRow agents={agents} limit={4} size={24} />
          <span className="font-mono text-label-xs uppercase tracking-[0.08em] text-accent transition-colors group-hover:underline group-hover:underline-offset-4">
            Open ›
          </span>
        </div>
      </div>
    </>
  )

  /* The looping marquee renders the list twice; the second pass is a visual
   * stand-in only, so it is hidden from assistive tech and skipped by tab. */
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

export function SkillGrid({ skills, className }: { skills: Skill[]; className?: string }) {
  return (
    <div className={cn('grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4', className)}>
      {skills.map((skill) => (
        <SkillCard key={skill.slug} skill={skill} />
      ))}
    </div>
  )
}
