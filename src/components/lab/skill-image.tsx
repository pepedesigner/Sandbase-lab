'use client'

import { useState } from 'react'

import { ArtifactPreview } from '@/components/lab/artifact-preview'
import type { Skill } from '@/content/skills'
import { cn } from '@/lib/cn'

/**
 * A Skill's preview artwork. Falls back to the procedural SVG scene if the
 * image cannot be loaded, so a card never renders empty.
 */
export function SkillImage({
  skill,
  src,
  seed = 0,
  priority = false,
  className,
}: {
  skill: Skill
  src: string
  seed?: number
  priority?: boolean
  className?: string
}) {
  const [failed, setFailed] = useState(false)

  if (failed) return <ArtifactPreview skill={skill} seed={seed} className={className} />

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={`${skill.name} — preview`}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      onError={() => setFailed(true)}
      className={cn('block h-full w-full object-cover', className)}
    />
  )
}
