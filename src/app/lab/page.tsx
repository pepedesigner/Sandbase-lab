import Link from 'next/link'
import type { Metadata } from 'next'

import { WorksWithStrip } from '@/components/lab/agent-badges'
import { FaqList } from '@/components/lab/faq-item'
import { HeroSkillMarquee } from '@/components/lab/hero-skill-marquee'
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
import { freeSkills, featuredSkills, SKILLS, skillsByCategory } from '@/content/skills'

export const metadata: Metadata = {
  title: 'Your ideas. Agents do the rest',
  description:
    'Agent Skills that make real things — decks, landing pages, launch films, character art — and run right on the page: no keys, no install, no cost.',
}

const STUDIO_STEPS = [
  { n: '01', title: 'Pick a Skill', body: 'A deck, a landing page, a launch film, a set of avatars — or a problem none of them cover.' },
  { n: '02', title: 'Bring your input', body: 'A sentence or a photo. The Skill page shows the result you get before you run it.' },
  { n: '03', title: 'Agents do the work', body: 'The Skill runs the same workflow your agent would — reading, planning, generating, rendering.' },
  { n: '04', title: 'Keep or install it', body: 'Download the result, or install the Skill in one line and make your own.' },
]

const CONNECT_STEPS = [
  { n: '01', title: 'Find a Skill', body: 'Browse the catalog and open any one to see the result it makes.' },
  { n: '02', title: 'Run it here', body: 'Try it on the page first — no install, no keys, no cost.' },
  { n: '03', title: 'Install in one line', body: 'Copy the command and your agent collects the SKILL.md, templates and scripts.' },
]

const HERO_STATS = [
  { value: String(SKILLS.length), label: 'Skills you can run' },
  { value: String(SKILLS.filter((skill) => skill.price === 'free').length), label: 'Free to try' },
  { value: String(CATEGORIES.length), label: 'Categories' },
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
      <p className={dark ? 'sb-eyebrow text-tint-mint-strong' : 'sb-eyebrow'}>{eyebrow}</p>
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
        <Container className="grid grid-cols-1 gap-10 py-16 md:py-22 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6 md:max-w-[42rem]">
              <p className="font-mono text-label-sm font-bold uppercase tracking-[0.12em] text-tint-blue-fg">
                SandBase Lab · Free to try
              </p>
              <h1 className="text-display text-balance text-tint-blue-fg">Your ideas. Agents do the rest.</h1>
              <p className="max-w-[42rem] text-lede-lg text-pretty text-tint-blue-fg">
                Agent Skills that make real things — decks, landing pages, launch films, character art. Open any one and it
                runs here on the page: no keys, no install, no cost.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/lab/skills"
                className="inline-flex items-center justify-center bg-ink px-6 py-[13px] text-body font-medium text-canvas transition-colors hover:bg-tint-cyan hover:text-ink"
              >
                Try a Skill
              </Link>
              <Link
                href="/lab/skills/dot-avatar-maker"
                className="inline-flex items-center justify-center px-6 py-[13px] text-body font-medium text-tint-blue-fg ring-1 ring-inset ring-tint-blue-fg transition-colors hover:bg-tint-blue-fg hover:text-tint-blue"
              >
                Explore everything
              </Link>
            </div>
            <dl className="grid grid-cols-3 gap-5 border-t border-tint-blue-fg/25 pt-6">
              {HERO_STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <dt className="font-mono text-h2 tabular-nums text-tint-blue-fg">{stat.value}</dt>
                  <dd className="font-mono text-label-xs uppercase tracking-[0.09em] text-tint-blue-fg">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <HeroSkillMarquee skills={SKILLS} />
          <div className="flex flex-col gap-3 border-t border-tint-blue-fg/25 pt-6 lg:col-span-2">
            <span className="font-mono text-label-xs uppercase tracking-[0.09em] text-tint-blue-fg">Works with</span>
            <WorksWithStrip />
          </div>
        </Container>
      </section>

      {/* Featured */}
      <Section className="bg-canvas">
        <Container className="flex flex-col gap-11">
          <SectionHead
            eyebrow="Featured Skills"
            title="Fresh from the studio"
            lede="Designed, written and tested by us, then runnable right here on the page. Not a prompt, not a mock-up."
            action={{ href: '/lab/skills', label: 'View all' }}
          />
          <SkillGrid skills={featuredSkills(8)} />
        </Container>
      </Section>

      {/* Free */}
      <Section className="bg-tint-mint">
        <Container className="flex flex-col gap-11">
          <SectionHead
            eyebrow="Free to try"
            title="Run one end to end, keep what it makes"
            lede="No card and no trial timer. Open a Skill, run it on the page, take the result."
            action={{ href: '/lab/skills', label: 'View free Skills' }}
          />
          <SkillGrid skills={freeSkills(8)} />
        </Container>
      </Section>

      {/* Trending by category */}
      <Section className="bg-canvas">
        <Container className="flex flex-col gap-14">
          <SectionHead
            eyebrow="Trending"
            title="Trending, by what you're making"
            lede="Each category ships a real, finished result you can open and remix."
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
                  View all ›
                </Link>
              </div>
              <SkillGrid skills={skillsByCategory(category.key)} className="lg:grid-cols-4" />
            </div>
          ))}
        </Container>
      </Section>

      {/* How it works */}
      <Section className="bg-panel">
        <Container className="flex flex-col gap-11">
          <SectionHead
            eyebrow="How it works"
            title="One Skill, solved end to end"
            lede="Each Skill chains a real workflow into a finished result. You watch the steps run, then keep the output."
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
            eyebrow="Install"
            title="Take it into your own agent"
            lede="Every Skill installs in one line and runs the same way inside the agent you already use."
            action={{ href: '/lab/skills', label: 'Find a Skill' }}
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
              Browse all Skills
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
            lede="Premium Skills install into your agent, and every new one we ship is included. Cancel anytime."
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
          <p className="font-mono text-label-sm font-bold uppercase tracking-[0.12em] text-tint-blue-fg">Creators</p>
          <h2 className="text-h2-cta max-w-[40rem] text-tint-blue-fg">Have an idea for a Skill?</h2>
          <p className="max-w-[42rem] text-lede text-tint-blue-fg">
            Tell us the problem and the result you want. We design it, write it and test it with you, and put your name on it.
            Early creators join revenue share first when it opens.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/lab/skills"
              className="inline-flex items-center justify-center bg-ink px-6 py-[13px] text-body font-medium text-canvas transition-colors hover:bg-tint-cyan hover:text-ink"
            >
              Browse all Skills
            </Link>
            <a
              href="https://www.sandbase.ai/lab/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-6 py-[13px] text-body font-medium text-tint-blue-fg ring-1 ring-inset ring-tint-blue-fg transition-colors hover:bg-tint-blue-fg hover:text-tint-blue"
            >
              Send your idea
            </a>
          </div>
        </Container>
      </Section>
    </>
  )
}
