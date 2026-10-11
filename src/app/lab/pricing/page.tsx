import type { Metadata } from 'next'

import { FaqList } from '@/components/lab/faq-item'
import { PriceCard } from '@/components/lab/price-card'
import { Container } from '@/components/ui/container'
import { CornerMarks } from '@/components/ui/corner-marks'
import { Section } from '@/components/ui/section'
import { GENERAL_FAQ } from '@/content/faq'
import { PLANS, PRICING_NOTES } from '@/content/pricing'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Premium Skills install into your agent, and every new one we ship is included. Free Skills only need a free account.',
}

export default function PricingPage() {
  return (
    <>
      <section className="relative isolate bg-tint-blue text-tint-blue-fg">
        <CornerMarks size={12} className="bg-tint-blue-fg" />
        <Container className="flex flex-col gap-5 py-14 md:py-18">
          <p className="font-mono text-label-sm font-bold uppercase tracking-[0.12em] text-tint-blue-fg">Pricing</p>
          <h1 className="text-display max-w-[36rem] text-balance text-tint-blue-fg">One plan, every Skill.</h1>
          <p className="max-w-[44rem] text-lede-lg text-tint-blue-fg">
            Premium Skills install into the agent you already use, and every new one we ship is included. Cancel anytime — and
            you can run any Skill on the page before you subscribe.
          </p>
        </Container>
      </section>

      <Section className="bg-tint-mint !pt-12 md:!pt-16">
        <Container className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <p className="sb-eyebrow">Plans</p>
            <h2 className="text-h2 max-w-[30rem] text-ink">Pick the access that fits.</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {PLANS.map((plan) => (
              <PriceCard key={plan.id} plan={plan} />
            ))}
          </div>
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-2">
            {PRICING_NOTES.map((note) => (
              <li key={note} className="flex items-center gap-2 text-body-xs text-ink-muted">
                <span aria-hidden="true" className="size-[7px] bg-accent" />
                {note}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section className="bg-canvas">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-16">
          <div className="flex flex-col gap-3">
            <p className="sb-eyebrow">FAQ</p>
            <h2 className="text-h2 text-ink">Before you subscribe</h2>
          </div>
          <FaqList items={GENERAL_FAQ} />
        </Container>
      </Section>
    </>
  )
}
