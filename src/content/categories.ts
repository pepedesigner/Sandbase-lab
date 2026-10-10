export type SkillCategory = 'web' | 'slides' | 'video' | 'image'

export interface Category {
  key: SkillCategory
  label: string
  output: string
  plural: string
  blurb: string
}

export const CATEGORIES: Category[] = [
  { key: 'web', label: 'Web', output: 'html', plural: 'Web Skills', blurb: 'Landing pages, portfolios and storefronts your agent can ship as real HTML.' },
  { key: 'slides', label: 'Slides', output: 'presentation', plural: 'Slide Skills', blurb: 'Decks with a point of view — narrative, layout and type handled for you.' },
  { key: 'video', label: 'Video', output: 'video', plural: 'Video Skills', blurb: 'Launch films, promos and motion stings rendered as code, not timelines.' },
  { key: 'image', label: 'Image', output: 'image', plural: 'Image Skills', blurb: 'Social cards, portraits and illustration systems with a consistent look.' },
]

export const CATEGORY_BY_KEY: Record<SkillCategory, Category> = CATEGORIES.reduce(
  (map, category) => ({ ...map, [category.key]: category }),
  {} as Record<SkillCategory, Category>,
)
