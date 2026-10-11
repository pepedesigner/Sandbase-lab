import Link from 'next/link'

import { cn } from '@/lib/cn'
import type { Plan } from '@/content/pricing'

export function PriceCard({ plan, className }: { plan: Plan; className?: string }) {
  const dark = plan.highlight
  return (
    <div
      className={cn(
        'flex flex-col gap-5 p-6',
        dark ? 'bg-ink text-canvas' : 'bg-surface text-ink',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className={cn('font-mono text-label-sm uppercase tracking-[0.09em]', dark ? 'text-canvas/80' : 'text-ink-subtle')}>
          {plan.name}
        </h3>
        {plan.tag ? (
          <span className={cn('px-1.5 py-0.5 font-mono text-label-xs uppercase tracking-[0.08em]', dark ? 'bg-tint-yellow text-tint-yellow-fg' : 'bg-tint-mint-strong text-tint-yellow-fg')}>
            {plan.tag}
          </span>
        ) : null}
      </div>
      <div className="flex items-end gap-2">
        <span className="text-plan-value tabular-nums">{plan.price}</span>
        <span className={cn('pb-2 text-body-sm', dark ? 'opacity-70' : 'text-ink-muted')}>{plan.cadence}</span>
      </div>
      <p className={cn('text-body-sm', dark ? 'opacity-80' : 'text-ink-muted')}>{plan.blurb}</p>
      <ul className={cn('flex flex-col gap-2.5 text-body-xs', dark ? 'opacity-90' : 'text-ink-muted')}>
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <span aria-hidden="true" className={cn('mt-1.5 size-[7px] flex-none', dark ? 'bg-tint-cyan' : 'bg-accent')} />
            {feature}
          </li>
        ))}
      </ul>
      <Link
        href="/lab/skills"
        className={cn(
          'mt-2 inline-flex items-center justify-center px-6 py-[13px] text-body font-medium transition-colors',
          dark
            ? 'bg-tint-yellow text-tint-yellow-fg hover:bg-canvas hover:text-ink'
            : 'bg-ink text-canvas hover:bg-tint-cyan hover:text-ink',
        )}
      >
        {plan.cta}
      </Link>
    </div>
  )
}
