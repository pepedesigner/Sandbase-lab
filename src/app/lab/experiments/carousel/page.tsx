import type { Metadata } from 'next'
import Link from 'next/link'

import { HeroCarousel } from '@/components/lab/hero-carousel'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { featuredSkills, getSkill, type Skill } from '@/content/skills'
import { MarqueeCarousel, SnapCarousel, SteppedCarousel } from '@/features/lab/carousels'

export const metadata: Metadata = {
  title: 'Carousel experiment',
  robots: { index: false, follow: false },
}

/* Two Skills from each category, so every vertical variant shows the same mix. */
const PICKS = [
  'dot-avatar-maker',
  'cadence-marketing-landing',
  'field-notes-deck',
  'yellow-sketchnote-deck',
  'hyperframes-pixel-promo',
  'velocity-matched-ui-sting',
  'apple-style-og',
  'monochrome-studio-portrait',
]

const VERTICAL = [
  {
    key: 'A',
    name: 'Continuous loop',
    summary:
      'The list scrolls upward at a constant speed and loops forever, so there is nothing to learn or click.',
    bestFor: 'Ambient placement where the content should feel alive without asking for attention.',
    watchOut:
      'Constant motion is the most distracting, so it leans on the pause control and the reduced-motion fallback more than the others.',
  },
  {
    key: 'B',
    name: 'Stepped autoplay',
    summary:
      'Advances one row every three seconds using the brand’s stepped easing, so it snaps between positions instead of gliding.',
    bestFor:
      'Staying inside the SandBase motion language — the stepped wipe is already used on cards and the announcement bar, so this reads as the same system.',
    watchOut: 'Autoplay still needs a pause mechanism, and the dots only stay readable while the list is short.',
  },
  {
    key: 'C',
    name: 'Snap & drag',
    summary: 'Native scrolling with scroll-snap: flick, drag or use the arrows and it always settles on a whole card.',
    bestFor: 'Content people actively browse — the most predictable option and the easiest to use with a keyboard.',
    watchOut: 'Nothing moves on its own, so as an ambient element it is the least eye-catching of the three.',
  },
]

export default function CarouselExperimentPage() {
  const skills = PICKS.map((slug) => getSkill(slug)).filter((skill): skill is Skill => Boolean(skill))

  return (
    <>
      <section className="bg-canvas">
        <Container className="flex flex-col gap-4 border-b border-line py-12 md:py-16">
          <p className="sb-eyebrow">Lab experiment</p>
          <h1 className="text-h1 max-w-[34rem] text-ink">Which carousel?</h1>
          <p className="max-w-[48rem] text-lede text-ink-muted">
            Your hero coverflow first, then three ways to run the same eight Skill cards top to bottom. Everything below is
            live — scroll it, drag it, let it run. All four use the real preview artwork, so only the motion differs.
          </p>
        </Container>
      </section>

      {/* 0 · the coverflow as built */}
      <Section className="bg-canvas">
        <Container className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,28rem)_minmax(0,1fr)] lg:gap-14">
          <div className="bg-tint-blue p-6 text-tint-blue-fg">
            <HeroCarousel skills={featuredSkills(6)} />
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-tint-cyan px-2 py-0.5 font-mono text-label-xs font-bold uppercase tracking-[0.08em] text-ink">
                Your build
              </span>
              <h2 className="text-h2 text-ink">Hero coverflow</h2>
            </div>
            <p className="max-w-[40rem] text-body text-ink-muted">
              Three previews in a perspective deck — the active Skill flat and centred, its neighbours scaled, tilted and
              tucked behind. Advances every 5.6s behind a progress line.
            </p>
            <dl className="flex max-w-[40rem] flex-col gap-4 border-t border-line pt-5">
              <div className="flex flex-col gap-1">
                <dt className="font-mono text-label-xs uppercase tracking-[0.09em] text-ink-subtle">Best for</dt>
                <dd className="text-body-sm text-ink-muted">
                  The hero. A horizontal deck reads as “a set of work” better than a vertical list, and it sits naturally on
                  the tint-blue ground.
                </dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="font-mono text-label-xs uppercase tracking-[0.09em] text-ink-subtle">Watch out</dt>
                <dd className="flex flex-col gap-2 text-body-sm text-ink-muted">
                  <span>
                    Only hover and focus pause it, so on a touch screen nothing can stop it — that is a WCAG 2.2.2 gap, and
                    there is no manual navigation.
                  </span>
                  <span>
                    It renders the 1600×900 <code className="font-mono text-mono-xs">main</code> asset in a frame that is
                    about 380px wide, so roughly four times the pixels needed, three of them eagerly.
                  </span>
                  <span>Its six Skills also repeat in the “New from our studio” grid directly below.</span>
                </dd>
              </div>
            </dl>
          </div>
        </Container>
      </Section>

      {/* A / B / C · vertical options */}
      <Section className="bg-canvas !pt-0">
        <Container className="flex flex-col gap-14">
          {VERTICAL.map((variant) => (
            <div
              key={variant.key}
              className="grid grid-cols-1 gap-8 border-t border-line pt-8 lg:grid-cols-[minmax(0,28rem)_minmax(0,1fr)] lg:gap-14"
            >
              <div>
                {variant.key === 'A' ? <MarqueeCarousel skills={skills} /> : null}
                {variant.key === 'B' ? <SteppedCarousel skills={skills} /> : null}
                {variant.key === 'C' ? <SnapCarousel skills={skills} /> : null}
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <span className="grid size-7 place-items-center bg-ink font-mono text-label-xs font-bold text-canvas">
                    {variant.key}
                  </span>
                  <h2 className="text-h2 text-ink">{variant.name}</h2>
                </div>
                <p className="max-w-[40rem] text-body text-ink-muted">{variant.summary}</p>
                <dl className="flex max-w-[40rem] flex-col gap-4 border-t border-line pt-5">
                  <div className="flex flex-col gap-1">
                    <dt className="font-mono text-label-xs uppercase tracking-[0.09em] text-ink-subtle">Best for</dt>
                    <dd className="text-body-sm text-ink-muted">{variant.bestFor}</dd>
                  </div>
                  <div className="flex flex-col gap-1">
                    <dt className="font-mono text-label-xs uppercase tracking-[0.09em] text-ink-subtle">Watch out</dt>
                    <dd className="text-body-sm text-ink-muted">{variant.watchOut}</dd>
                  </div>
                </dl>
              </div>
            </div>
          ))}
        </Container>
      </Section>

      {/* recommendation */}
      <Section className="bg-tint-mint">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-16">
          <div className="flex flex-col gap-3">
            <p className="sb-eyebrow">Where I land</p>
            <h2 className="text-h2 text-ink">Keep the coverflow in the hero.</h2>
          </div>
          <div className="flex max-w-[42rem] flex-col gap-4 text-body-sm text-ink-muted">
            <p>
              It is the strongest visual on the page and the only one that belongs where you put it. A vertical carousel is a
              rail — it wants a column beside the catalog or a thin band between two sections, not the hero, where it would
              compete with the headline for the same eye movement.
            </p>
            <p>
              Two fixes before it ships: give it an explicit pause plus prev/next so a touch or keyboard user can drive it,
              and point it at the 768×432 <code className="font-mono text-mono-xs">card</code> asset — the frame is ~380px
              wide, so the 1600×900 <code className="font-mono text-mono-xs">main</code> one is wasted bytes.
            </p>
            <p>
              If you want a second, quieter carousel further down the page, <strong className="font-medium text-ink">B</strong>{' '}
              is the one to pick: the stepped easing is already the house motion, so it will not look bolted on.{' '}
              <strong className="font-medium text-ink">C</strong> is the safest to use and{' '}
              <strong className="font-medium text-ink">A</strong> is the weakest of the three — the most distracting and the
              least controllable.
            </p>
            <p>
              Everything here is real artwork, so the honest test is scrolling each one on a phone. The coverflow still wins on
              a phone, as long as it can be paused.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/lab"
                className="inline-flex items-center justify-center bg-ink px-5 py-2.5 text-body-sm font-medium text-canvas transition-colors hover:bg-tint-cyan hover:text-ink"
              >
                Back to Lab
              </Link>
              <Link
                href="/lab/skills"
                className="inline-flex items-center justify-center px-5 py-2.5 text-body-sm font-medium text-ink ring-1 ring-inset ring-line-control transition-colors hover:bg-tint-blue hover:text-tint-blue-fg hover:ring-0"
              >
                Browse the catalog
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
