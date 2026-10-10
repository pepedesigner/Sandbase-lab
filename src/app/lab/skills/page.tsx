import type { Metadata } from 'next'

import { SkillCatalog } from '@/features/lab/SkillCatalog'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { SKILLS } from '@/content/skills'

export const metadata: Metadata = {
  title: 'All Skills',
  description: 'Browse every Agent Skill in SandBase Lab — search by name, filter by category and access, then run any of them in the browser.',
}

export default function SkillsPage() {
  const free = SKILLS.filter((skill) => skill.price === 'free').length
  return (
    <>
      <section className="bg-canvas">
        <Container className="flex flex-col gap-4 border-b border-line py-12 md:py-16">
          <p className="sb-eyebrow">Catalog</p>
          <h1 className="text-h1 max-w-[34rem] text-ink">Every Skill, one place.</h1>
          <p className="max-w-[44rem] text-lede text-ink-muted">
            {SKILLS.length} original Agent Skills across web, slides, image and video — {free} of them free. Open any Skill to
            see what it makes, or run it right in your browser.
          </p>
        </Container>
      </section>
      <Section className="bg-canvas !pt-10 md:!pt-12">
        <Container>
          <SkillCatalog skills={SKILLS} />
        </Container>
      </Section>
    </>
  )
}
