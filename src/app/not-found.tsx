import Link from 'next/link'

import { Container } from '@/components/ui/container'

export default function NotFound() {
  return (
    <section className="bg-canvas">
      <Container className="flex flex-col items-start gap-6 py-20 md:py-28">
        <p className="sb-eyebrow">404</p>
        <h1 className="text-h1 max-w-[30rem] text-ink">That one is not in the Lab.</h1>
        <p className="max-w-[40rem] text-lede text-ink-muted">
          The page you were looking for does not exist. Head back to the catalog and pick a Skill you can run.
        </p>
        <Link
          href="/lab/skills"
          className="inline-flex items-center justify-center bg-ink px-6 py-[13px] text-body font-medium text-canvas transition-colors hover:bg-tint-cyan hover:text-ink"
        >
          Browse all Skills
        </Link>
      </Container>
    </section>
  )
}
