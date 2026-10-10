'use client'

import { useMemo, useState } from 'react'

import { SkillCard } from '@/components/lab/skill-card'
import { CATEGORIES, type SkillCategory } from '@/content/categories'
import type { Skill } from '@/content/skills'
import { cn } from '@/lib/cn'

type PriceFilter = 'all' | 'free' | 'premium'

const CATEGORY_KEYS = CATEGORIES.map((category) => category.key)

export function SkillCatalog({ skills }: { skills: Skill[] }) {
  const [query, setQuery] = useState('')
  const [categories, setCategories] = useState<Set<SkillCategory>>(new Set())
  const [price, setPrice] = useState<PriceFilter>('all')

  const counts = useMemo(() => {
    const map = new Map<SkillCategory, number>()
    for (const key of CATEGORY_KEYS) map.set(key, 0)
    for (const skill of skills) map.set(skill.category, (map.get(skill.category) ?? 0) + 1)
    return map
  }, [skills])

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return skills.filter((skill) => {
      if (categories.size && !categories.has(skill.category)) return false
      if (price !== 'all' && skill.price !== price) return false
      if (!needle) return true
      return [skill.name, skill.tagline, skill.description, ...skill.tags].join(' ').toLowerCase().includes(needle)
    })
  }, [categories, price, query, skills])

  const toggleCategory = (key: SkillCategory) => {
    setCategories((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const reset = () => {
    setQuery('')
    setCategories(new Set())
    setPrice('all')
  }

  const activeFilters = categories.size > 0 || price !== 'all' || query.trim().length > 0

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-12">
      <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
        <div className="flex flex-col gap-2">
          <label className="font-mono text-label-xs uppercase tracking-[0.09em] text-ink-subtle" htmlFor="skills-search">
            Search
          </label>
          <input
            id="skills-search"
            className="input-base"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="avatar, deck, promo…"
          />
        </div>

        <fieldset className="flex flex-col gap-2.5">
          <legend className="mb-1 font-mono text-label-xs uppercase tracking-[0.09em] text-ink-subtle">Category</legend>
          {CATEGORIES.map((category) => {
            const checked = categories.has(category.key)
            return (
              <button
                key={category.key}
                type="button"
                aria-pressed={checked}
                onClick={() => toggleCategory(category.key)}
                className={cn(
                  'flex items-center justify-between gap-3 px-3 py-2 text-body-sm transition-colors',
                  checked ? 'bg-ink text-canvas' : 'bg-surface text-ink hover:bg-surface-alt',
                )}
              >
                <span className="flex items-center gap-2.5">
                  <span aria-hidden="true" className={cn('size-[7px]', checked ? 'bg-tint-cyan' : 'bg-line')} />
                  {category.label}
                </span>
                <span className={cn('font-mono text-label-xs tabular-nums', checked ? 'opacity-80' : 'text-ink-subtle')}>
                  {counts.get(category.key) ?? 0}
                </span>
              </button>
            )
          })}
        </fieldset>

        <fieldset className="flex flex-col gap-2.5">
          <legend className="mb-1 font-mono text-label-xs uppercase tracking-[0.09em] text-ink-subtle">Access</legend>
          <div className="flex gap-2">
            {(['all', 'free', 'premium'] as PriceFilter[]).map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={price === option}
                onClick={() => setPrice(option)}
                className={cn(
                  'flex-1 px-3 py-2 font-mono text-label-xs uppercase tracking-[0.08em] transition-colors',
                  price === option ? 'bg-ink text-canvas' : 'bg-surface text-ink-muted hover:bg-surface-alt hover:text-ink',
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </fieldset>

        {activeFilters ? (
          <button
            type="button"
            onClick={reset}
            className="self-start font-mono text-label-xs uppercase tracking-[0.08em] text-accent hover:underline hover:underline-offset-4"
          >
            Clear filters
          </button>
        ) : null}
      </aside>

      <div className="flex min-w-0 flex-col gap-6">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <h2 className="font-mono text-label-xs uppercase tracking-[0.09em] text-ink-subtle">
            {results.length} {results.length === 1 ? 'Skill' : 'Skills'}
          </h2>
          <span className="font-mono text-label-xs uppercase tracking-[0.09em] text-ink-subtle">Sorted by relevance</span>
        </div>

        {results.length === 0 ? (
          <div className="flex flex-col items-start gap-4 bg-surface p-10">
            <span className="font-mono text-label-sm uppercase tracking-[0.09em] text-accent">No matches</span>
            <p className="max-w-[34rem] text-body-sm text-ink-muted">
              Nothing in the catalog matches those filters yet. Try a different search, or clear the filters to see the full
              library.
            </p>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center bg-ink px-5 py-2.5 text-body-sm font-medium text-canvas transition-colors hover:bg-tint-cyan hover:text-ink"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((skill) => (
              <SkillCard key={skill.slug} skill={skill} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
