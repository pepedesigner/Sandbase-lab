import type { MetadataRoute } from 'next'

import { SKILLS } from '@/content/skills'

const BASE_URL = 'https://lab.sandbase.ai'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return [
    { url: `${BASE_URL}/lab`, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/lab/skills`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/lab/pricing`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    ...SKILLS.flatMap((skill) => [
      { url: `${BASE_URL}/lab/skills/${skill.slug}`, lastModified, changeFrequency: 'monthly' as const, priority: 0.8 },
      { url: `${BASE_URL}/lab/run/${skill.slug}`, lastModified, changeFrequency: 'monthly' as const, priority: 0.6 },
    ]),
  ]
}
