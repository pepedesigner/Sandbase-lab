'use client'

import { buildSkillMarkdown } from '@/features/lab/skill-md'
import type { Skill } from '@/content/skills'
import { cn } from '@/lib/cn'

/** Downloads a generated SKILL.md for the Skill (demo: built from catalog data). */
export function DownloadSkillButton({ skill, className }: { skill: Skill; className?: string }) {
  const download = () => {
    const blob = new Blob([buildSkillMarkdown(skill)], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `${skill.slug}-SKILL.md`
    anchor.click()
    URL.revokeObjectURL(url)
  }
  return (
    <button
      type="button"
      onClick={download}
      className={cn(
        'inline-flex items-center justify-center px-6 py-[13px] text-body font-medium text-ink ring-1 ring-inset ring-line-control transition-colors hover:bg-tint-blue hover:text-tint-blue-fg hover:ring-0',
        className,
      )}
    >
      Download SKILL.md
    </button>
  )
}
