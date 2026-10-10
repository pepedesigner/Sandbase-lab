import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { AgentChip } from '@/components/lab/agent-badges'
import { FaqList } from '@/components/lab/faq-item'
import { SkillBadge, SkillGrid } from '@/components/lab/skill-card'
import { SkillImage } from '@/components/lab/skill-image'
import { CopyButton } from '@/components/ui/copy-button'
import { Container } from '@/components/ui/container'
import { CornerMarks } from '@/components/ui/corner-marks'
import { PixelFrame } from '@/components/ui/pixel-frame'
import { Section } from '@/components/ui/section'
import { CATEGORY_BY_KEY } from '@/content/categories'
import {
  getSkill,
  installCommand,
  similarSkills,
  skillAgents,
  skillGalleryImages,
  skillMainImage,
  SKILLS,
} from '@/content/skills'
import { DownloadSkillButton } from '@/features/lab/DownloadSkillButton'

export function generateStaticParams() {
  return SKILLS.map((skill) => ({ slug: skill.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const skill = getSkill(params.slug)
  if (!skill) return { title: 'Skill not found' }
  return {
    title: `${skill.name} — ${skill.tagline}`,
    description: skill.description,
  }
}

export default function SkillDetailPage({ params }: { params: { slug: string } }) {
  const skill = getSkill(params.slug)
  if (!skill) notFound()

  const category = CATEGORY_BY_KEY[skill.category]
  const agents = skillAgents(skill)
  const related = similarSkills(skill, 4)
  const gallery = skillGalleryImages(skill)
  const command = installCommand(skill)

  const stats = [
    { label: 'Rating', value: skill.rating.toFixed(1) },
    { label: 'Installs', value: String(skill.installs) },
    { label: 'Likes', value: String(skill.likes) },
    { label: 'Saves', value: String(skill.saves) },
    { label: 'Updated', value: skill.updated },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative isolate bg-canvas">
        <Container className="flex flex-col gap-8 py-10 md:py-14">
          <div className="flex items-center gap-2 font-mono text-label-xs uppercase tracking-[0.09em] text-ink-subtle">
            <Link href="/lab/skills" className="transition-colors hover:text-ink">
              Catalog
            </Link>
            <span aria-hidden="true">/</span>
            <span>{category.label}</span>
            <span aria-hidden="true">/</span>
            <span className="text-ink-muted">{skill.slug}</span>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
            {/* Details */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-2">
                <SkillBadge skill={skill} />
                <span className="font-mono text-label-xs uppercase tracking-[0.09em] text-ink-subtle">
                  {category.label} · {skill.version}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="text-h1 text-balance text-ink">{skill.name}</h1>
                <p className="text-lede text-ink-muted">{skill.tagline}</p>
              </div>
              <p className="max-w-[40rem] text-body-sm text-ink-muted">{skill.description}</p>

              <dl className="flex flex-wrap gap-x-8 gap-y-3 border-y border-line py-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-0.5">
                    <dt className="font-mono text-label-xs uppercase tracking-[0.09em] text-ink-subtle">{stat.label}</dt>
                    <dd className="font-mono text-body-sm tabular-nums text-ink">{stat.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/lab/run/${skill.slug}`}
                  className="inline-flex items-center justify-center gap-2 bg-ink px-6 py-[13px] text-body font-medium text-canvas transition-colors hover:bg-tint-cyan hover:text-ink"
                >
                  <span aria-hidden="true" className="size-[7px] bg-tint-cyan" />
                  Run in browser
                </Link>
                <DownloadSkillButton skill={skill} />
              </div>

              <div className="flex items-center justify-between gap-4 bg-surface px-4 py-3">
                <code className="min-w-0 truncate font-mono text-mono-xs text-ink-muted">{command}</code>
                <CopyButton text={command} subject="Install command" className="text-accent" />
              </div>

              <div className="flex flex-col gap-3">
                <span className="font-mono text-label-xs uppercase tracking-[0.09em] text-ink-subtle">
                  Runs in {agents.length} agents · generates with {skill.generatesWith}
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {agents.map((agent) => (
                    <AgentChip key={agent.key} agent={agent} size={30} />
                  ))}
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div className="flex flex-col gap-4">
              <PixelFrame className="aspect-video">
                <SkillImage skill={skill} src={skillMainImage(skill)} priority className="absolute inset-0" />
              </PixelFrame>
              {gallery.length ? (
                <div className={gallery.length === 1 ? 'grid grid-cols-1 gap-4' : 'grid grid-cols-2 gap-4'}>
                  {gallery.map((src, index) => (
                    <PixelFrame key={src} sweep={false} className="aspect-video">
                      <SkillImage skill={skill} src={src} seed={index + 1} className="absolute inset-0" />
                    </PixelFrame>
                  ))}
                </div>
              ) : null}
              <p className="font-mono text-label-xs uppercase tracking-[0.09em] text-ink-subtle">
                Preview gallery — results this Skill produces
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* About */}
      <Section className="bg-tint-mint !pt-14 md:!pt-16">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-16">
          <div className="flex flex-col gap-3">
            <p className="sb-eyebrow">About this Skill</p>
            <h2 className="text-h2 text-ink">How it works</h2>
            <p className="text-body-sm text-ink-muted">
              Read the instructions, hand it a prompt, and it returns the finished artifact — the same workflow your agent
              follows after install.
            </p>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3 bg-surface p-5">
              <span className="font-mono text-label-xs uppercase tracking-[0.09em] text-ink-subtle">Example prompt</span>
              <p className="text-body text-ink">
                <span className="font-mono text-mono-xs text-accent">/{skill.slug}</span> {skill.promptExample}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div className="flex flex-col gap-3">
                <h3 className="font-mono text-label-sm uppercase tracking-[0.09em] text-ink-subtle">What you get</h3>
                <ul className="flex flex-col gap-3">
                  {skill.whatYouGet.map((item) => (
                    <li key={item} className="flex gap-2.5 text-body-sm text-ink-muted">
                      <span aria-hidden="true" className="mt-2 size-[7px] flex-none bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <h3 className="font-mono text-label-sm uppercase tracking-[0.09em] text-ink-subtle">Good fit</h3>
                  <ul className="flex flex-col gap-3">
                    {skill.goodFit.map((item) => (
                      <li key={item} className="flex gap-2.5 text-body-sm text-ink-muted">
                        <span aria-hidden="true" className="mt-2 size-[7px] flex-none bg-positive" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="font-mono text-label-sm uppercase tracking-[0.09em] text-ink-subtle">Not for</h3>
                  <ul className="flex flex-col gap-3">
                    {skill.notFor.map((item) => (
                      <li key={item} className="flex gap-2.5 text-body-sm text-ink-muted">
                        <span aria-hidden="true" className="mt-2 size-[7px] flex-none bg-line-control" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {skill.tags.map((tag) => (
                <span key={tag} className="bg-surface px-2.5 py-1 font-mono text-label-xs uppercase tracking-[0.06em] text-ink-muted">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section className="bg-canvas">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-16">
          <div className="flex flex-col gap-3">
            <p className="sb-eyebrow">FAQ</p>
            <h2 className="text-h2 text-ink">Questions, answered</h2>
          </div>
          <FaqList items={skill.faq} />
        </Container>
      </Section>

      {/* Run CTA */}
      <Section className="bg-tint-blue text-tint-blue-fg">
        <Container className="relative flex flex-col items-start gap-6">
          <CornerMarks size={12} className="bg-tint-blue-fg" />
          <h2 className="text-h2-cta max-w-[36rem] text-tint-blue-fg">Run {skill.name} right now.</h2>
          <p className="max-w-[36rem] text-lede text-tint-blue-fg">
            No install and no keys — open the workbench, edit the prompt and watch it build the result.
          </p>
          <Link
            href={`/lab/run/${skill.slug}`}
            className="inline-flex items-center justify-center bg-ink px-6 py-[13px] text-body font-medium text-canvas transition-colors hover:bg-tint-cyan hover:text-ink"
          >
            Run in browser
          </Link>
        </Container>
      </Section>

      {/* Similar */}
      {related.length ? (
        <Section className="bg-canvas">
          <Container className="flex flex-col gap-8">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-h2 text-ink">Similar Skills</h2>
              <Link
                href="/lab/skills"
                className="font-mono text-label-sm font-bold uppercase tracking-[0.08em] text-accent hover:underline hover:underline-offset-4"
              >
                View all skills ›
              </Link>
            </div>
            <SkillGrid skills={related} className="lg:grid-cols-4" />
          </Container>
        </Section>
      ) : null}
    </>
  )
}
