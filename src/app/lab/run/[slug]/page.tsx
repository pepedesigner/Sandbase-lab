import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Container } from '@/components/ui/container'
import { getSkill, SKILLS } from '@/content/skills'
import { RunWorkbench } from '@/features/lab/RunConsole'

export function generateStaticParams() {
  return SKILLS.map((skill) => ({ slug: skill.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const skill = getSkill(params.slug)
  if (!skill) return { title: 'Skill not found' }
  return {
    title: `Run ${skill.name}`,
    description: `Run ${skill.name} in the SandBase Lab workbench — a simulated agent run with a live transcript and result preview.`,
  }
}

export default function RunPage({ params }: { params: { slug: string } }) {
  const skill = getSkill(params.slug)
  if (!skill) notFound()

  return (
    <section className="bg-canvas">
      <Container className="flex flex-col gap-8 py-10 md:py-14">
        <div className="flex flex-wrap items-center gap-2 font-mono text-label-xs uppercase tracking-[0.09em] text-ink-subtle">
          <Link href="/lab/skills" className="transition-colors hover:text-ink">
            Catalog
          </Link>
          <span aria-hidden="true">/</span>
          <Link href={`/lab/skills/${skill.slug}`} className="transition-colors hover:text-ink">
            {skill.name}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-ink-muted">run</span>
        </div>
        <div className="flex flex-col gap-3 border-b border-line pb-6">
          <p className="sb-eyebrow">Lab workbench</p>
          <h1 className="text-h1 max-w-[36rem] text-ink">Run this Skill in your browser.</h1>
          <p className="max-w-[44rem] text-lede text-ink-muted">
            Edit the prompt and press run. The workbench replays the same workflow the Skill hands your agent and renders the
            result — simulated here, so it works without keys or cost.
          </p>
        </div>
        <RunWorkbench skill={skill} />
      </Container>
    </section>
  )
}
