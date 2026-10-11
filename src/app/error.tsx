'use client'

import Link from 'next/link'

import { Container } from '@/components/ui/container'

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="bg-canvas">
      <Container className="flex flex-col items-start gap-6 py-20 md:py-28">
        <p className="sb-eyebrow">Something broke</p>
        <h1 className="text-h1 max-w-[32rem] text-ink">That page did not finish.</h1>
        <p className="max-w-[40rem] text-lede text-ink-muted">
          An unexpected error stopped this view from rendering. Try again, or head back to the catalog — the Skills are still
          there.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center bg-ink px-6 py-[13px] text-body font-medium text-canvas transition-colors hover:bg-tint-cyan hover:text-ink"
          >
            Try again
          </button>
          <Link
            href="/lab/skills"
            className="inline-flex items-center justify-center px-6 py-[13px] text-body font-medium text-ink ring-1 ring-inset ring-line-control transition-colors hover:bg-tint-blue hover:text-tint-blue-fg hover:ring-0"
          >
            Browse all Skills
          </Link>
        </div>
      </Container>
    </section>
  )
}
