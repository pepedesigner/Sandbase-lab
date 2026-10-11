import type { Metadata } from 'next'

import { SkillCatalog } from '@/features/lab/SkillCatalog'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { SKILLS } from '@/content/skills'

export const metadata: Metadata = {
  title: 'All Skills',
  description: 'Every Skill in SandBase Lab. Search by name, filter by category, then open one and run it on the page.',
}

export default function SkillsPage() {
  const free = SKILLS.filter((skill) => skill.price === 'free').length
  return (
    <>
      <section className="bg-canvas">
        <Container className="flex flex-col gap-4 border-b border-line py-12 md:py-16">
          <p className="sb-eyebrow">All Skills</p>
          <h1 className="text-h1 max-w-[34rem] text-ink">Every Skill, ready to run.</h1>
          <p className="max-w-[44rem] text-lede text-ink-muted">
            {SKILLS.length} Skills across web, slides, image and video, and {free} of them free to try. Open one to see the
            result it makes, or run it right here.
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
