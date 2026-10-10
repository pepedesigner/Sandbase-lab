import Link from 'next/link'
import type { Metadata } from 'next'

import { WorksWithStrip } from '@/components/lab/agent-badges'
import { FaqList } from '@/components/lab/faq-item'
import { PriceCard } from '@/components/lab/price-card'
import { SkillGrid } from '@/components/lab/skill-card'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { CornerMarks } from '@/components/ui/corner-marks'
import { Section } from '@/components/ui/section'
import { WireHead } from '@/components/ui/wire-head'
import { CATEGORIES } from '@/content/categories'
import { GENERAL_FAQ } from '@/content/faq'
import { PLANS } from '@/content/pricing'
import { freeSkills, featuredSkills, skillsByCategory } from '@/content/skills'

export const metadata: Metadata = {
  title: 'Agent Skills with taste',
  description:
    'Browse original Agent Skills for web, slides, image and video work — then run any of them right in your browser. Built on the SandBase design language.',
}

const STUDIO_STEPS = [
  { n: '01', title: 'Design the result', body: 'We art-direct the finished output first: layout, type, colour and motion.' },
  { n: '02', title: 'Write the workflow', body: 'Original instructions, templates and scripts, packaged as one SKILL.md.' },
  { n: '03', title: 'Run it for real', body: 'Every Skill page shows a real result it made — and here you can run it yourself.' },
  { n: '04', title: 'Keep it current', body: 'The same studio updates each Skill as agents and models change.' },
]

const CONNECT_STEPS = [
  { n: '01', title: 'Discover a Skill', body: 'Browse the catalog and open any Skill to see what it produces.' },
  { n: '02', title: 'Run it in the browser', body: 'Try it instantly in the Lab workbench — no install, no keys.' },
  { n: '03', title: 'Install & verify', body: 'Copy the install command and your agent lives it in one line.' },
]

function SectionHead({
  eyebrow,
  title,
  lede,
  action,
  dark,
}: {
  eyebrow: string
  title: string
  lede?: string
  action?: { href: string; label: string }
  dark?: boolean
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className={dark ? 'sb-eyebrow text-tint-cyan' : 'sb-eyebrow'}>{eyebrow}</p>
      <WireHead
        title={title}
        lede={lede}
        dark={dark}
        action={
          action ? (
            <Link
              href={action.href}
              className={`font-mono text-label-sm font-bold uppercase tracking-[0.08em] hover:underline hover:underline-offset-4 ${dark ? 'text-tint-cyan' : 'text-accent'}`}
            >
              {action.label} ›
            </Link>
          ) : null
        }
      />
    </div>
  )
}

export default function LabHomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate bg-tint-blue text-tint-blue-fg">
        <CornerMarks size={12} className="bg-tint-blue-fg" />
        <Container className="flex flex-col gap-10 py-16 md:py-22">
          <div className="flex flex-col gap-6 md:max-w-[52rem]">
            <p className="font-mono text-label-sm font-bold uppercase tracking-[0.12em] text-tint-blue-fg">
              SandBase Lab — Agent Skills
            </p>
            <h1 className="text-display text-balance text-tint-blue-fg">Agent Skills with taste.</h1>
            <p className="max-w-[42rem] text-lede-lg text-pretty text-tint-blue-fg">
              Original Skills for web, slides, image and video work — designed, written and tested by our studio. Browse the
              catalog, then run any Skill right here in the browser.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/lab/skills"
              className="inline-flex items-center justify-center bg-ink px-6 py-[13px] text-body font-medium text-canvas transition-colors hover:bg-tint-cyan hover:text-ink"
            >
              Browse Skills
            </Link>
            <Link
              href="/lab/skills/dot-avatar-maker"
              className="inline-flex items-center justify-center px-6 py-[13px] text-body font-medium text-tint-blue-fg ring-1 ring-inset ring-tint-blue-fg transition-colors hover:bg-tint-blue-fg hover:text-tint-blue"
            >
              Run one now
            </Link>
          </div>
          <div className="flex flex-col gap-3 border-t border-tint-blue-fg/25 pt-6">
            <span className="font-mono text-label-xs uppercase tracking-[0.09em] text-tint-blue-fg">Works with</span>
            <WorksWithStrip />
          </div>
        </Container>
      </section>

      {/* Featured */}
      <Section className="bg-canvas">
        <Container className="flex flex-col gap-11">
          <SectionHead
            eyebrow="Featured Agent Skills"
            title="New from our studio"
            lede="Every Skill here is designed, written and tested in-house — and runnable on this page."
            action={{ href: '/lab/skills', label: 'View all skills' }}
          />
          <SkillGrid skills={featuredSkills(8)} />
        </Container>
      </Section>

      {/* Free */}
      <Section className="bg-tint-mint">
        <Container className="flex flex-col gap-11">
          <SectionHead
            eyebrow="Free Agent Skills"
            title="Install one, run it end to end"
            lede="Keep what it makes. No card, no trial timer — and you can run it in the browser first."
            action={{ href: '/lab/skills', label: 'View free skills' }}
          />
          <SkillGrid skills={freeSkills(8)} />
        </Container>
      </Section>

      {/* Trending by category */}
      <Section className="bg-canvas">
        <Container className="flex flex-col gap-14">
          <SectionHead
            eyebrow="Trending Agent Skills"
            title="Trending, by what you are making"
            lede="Slides, web, images and video — each Skill ships a real, finished result."
          />
          {CATEGORIES.map((category) => (
            <div key={category.key} className="flex flex-col gap-6 border-t border-line pt-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <h3 className="text-h2 text-ink">{category.plural}</h3>
                  <p className="max-w-[40rem] text-body-sm text-ink-muted">{category.blurb}</p>
                </div>
                <Link
                  href="/lab/skills"
                  className="font-mono text-label-sm font-bold uppercase tracking-[0.08em] text-accent hover:underline hover:underline-offset-4"
                >
                  View all skills ›
                </Link>
              </div>
              <SkillGrid skills={skillsByCategory(category.key)} className="lg:grid-cols-4" />
            </div>
          ))}
        </Container>
      </Section>

      {/* Designed in-house */}
      <Section className="bg-panel">
        <Container className="flex flex-col gap-11">
          <SectionHead
            eyebrow="Every Skill is designed in-house"
            title="Designed, written and tested in-house"
            lede="Each one starts as a finished piece of work we design ourselves: a deck, a page, a film. Then we write the instructions, templates and scripts that let your agent make it again."
            dark
          />
          <div className="grid grid-cols-1 gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {STUDIO_STEPS.map((step) => (
              <div key={step.n} className="flex flex-col gap-3 bg-panel p-6">
                <span className="font-mono text-label-sm font-bold tracking-[0.1em] text-tint-mint-strong">{step.n}</span>
                <h3 className="text-card-title text-panel-fg">{step.title}</h3>
                <p className="text-body-sm text-panel-fg-muted">{step.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Connect your agent */}
      <Section className="bg-canvas">
        <Container className="flex flex-col gap-11">
          <SectionHead
            eyebrow="Agent-first installation"
            title="Connect your agent"
            lede="Give your agent practical, reusable workflows — or skip the setup and run a Skill right here."
            action={{ href: '/lab/skills', label: 'Pick a Skill' }}
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {CONNECT_STEPS.map((step) => (
              <div key={step.n} className="flex flex-col gap-3 bg-surface p-6">
                <span className="font-mono text-label-sm font-bold tracking-[0.1em] text-accent">{step.n}</span>
                <h3 className="text-card-title text-ink">{step.title}</h3>
                <p className="text-body-sm text-ink-muted">{step.body}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3 bg-surface p-5">
            <code className="font-mono text-mono-xs text-ink-muted">npx sandbase skill add &lt;skill&gt;</code>
            <ButtonLink href="/lab/skills" variant="secondary" size="sm" className="ml-auto">
              Browse the catalog
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* Pricing summary */}
      <Section className="bg-tint-mint">
        <Container className="flex flex-col gap-11">
          <SectionHead
            eyebrow="Simple access"
            title="One plan unlocks every Skill"
            lede="Full Premium access, plus every new Skill we ship. Cancel anytime."
            action={{ href: '/lab/pricing', label: 'See plans' }}
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {PLANS.map((plan) => (
              <PriceCard key={plan.id} plan={plan} />
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section className="bg-canvas" id="faq">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-16">
          <SectionHead eyebrow="Getting started" title="The essentials" lede="Choosing, running and installing your first Skill." />
          <FaqList items={GENERAL_FAQ} />
        </Container>
      </Section>

      {/* Final CTA */}
      <Section className="bg-tint-blue text-tint-blue-fg">
        <Container className="flex flex-col items-start gap-6">
          <h2 className="text-h2-cta max-w-[40rem] text-tint-blue-fg">Ready to extend your agent?</h2>
          <p className="max-w-[38rem] text-lede text-tint-blue-fg">
            Browse the catalog, run a Skill in the browser, then install it into the agent you already use.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/lab/skills"
              className="inline-flex items-center justify-center bg-ink px-6 py-[13px] text-body font-medium text-canvas transition-colors hover:bg-tint-cyan hover:text-ink"
            >
              Browse Skills
            </Link>
            <Link
              href="/lab/pricing"
              className="inline-flex items-center justify-center px-6 py-[13px] text-body font-medium text-tint-blue-fg ring-1 ring-inset ring-tint-blue-fg transition-colors hover:bg-tint-blue-fg hover:text-tint-blue"
            >
              See plans
            </Link>
          </div>
        </Container>
      </Section>
    </>
  )
}
