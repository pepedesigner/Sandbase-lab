'use client'

import { cn } from '@/lib/cn'

/** A row that expands on click, using the grid-rows 0fr → 1fr technique. */
export function FaqItem({ q, a, className }: { q: string; a: string; className?: string }) {
  return (
    <details className={cn('group border-t border-line', className)}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
        <span className="text-body-lg font-medium text-ink" style={{ fontSize: '1.0625rem' }}>
          {q}
        </span>
        <span aria-hidden="true" className="relative grid size-5 flex-none place-items-center">
          <span className="absolute h-px w-3.5 bg-ink-muted transition-colors group-hover:bg-accent" />
          <span className="absolute h-3.5 w-px bg-ink-muted transition-transform duration-300 group-open:scale-y-0 group-hover:bg-accent" />
        </span>
      </summary>
      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-open:grid-rows-[1fr] motion-reduce:transition-none">
        <div className="overflow-hidden">
          <p className="max-w-[46rem] pb-6 pr-8 text-body-sm text-ink-muted">{a}</p>
        </div>
      </div>
    </details>
  )
}

export function FaqList({ items, className }: { items: { q: string; a: string }[]; className?: string }) {
  return (
    <div className={cn('border-b border-line', className)}>
      {items.map((item) => (
        <FaqItem key={item.q} q={item.q} a={item.a} />
      ))}
    </div>
  )
}
