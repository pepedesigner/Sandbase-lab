export interface Plan {
  id: string
  name: string
  price: string
  cadence: string
  blurb: string
  features: string[]
  cta: string
  highlight?: boolean
  tag?: string
}

export const PLANS: Plan[] = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: '$9.99',
    cadence: '/ month',
    blurb: 'Every Premium Skill, billed monthly.',
    features: [
      'Every Premium Skill, unlocked',
      'Install from the page or the CLI',
      'Every update, as it ships',
      'New Premium Skills included',
      'Cancel whenever you need',
    ],
    cta: 'Subscribe for $9.99/month',
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: '$79',
    cadence: '/ year',
    blurb: 'Every Premium Skill, for a lower annual price.',
    features: [
      'Every Premium Skill, unlocked',
      'Install from the page or the CLI',
      'Every update, as it ships',
      'New Premium Skills included',
      'Save 34% a year',
    ],
    cta: 'Subscribe yearly for $79',
    highlight: true,
    tag: 'Most popular',
  },
  {
    id: 'lifetime',
    name: 'Founding Lifetime',
    price: '$169',
    cadence: 'one-time',
    blurb: 'Founding price. It rises as the library grows.',
    features: [
      'Every Premium Skill, unlocked',
      'Install from the page or the CLI',
      'Every update, as it ships',
      'New Premium Skills included',
      'No subscription or renewal bill',
    ],
    cta: 'Get lifetime access for $169',
    tag: 'Founding offer',
  },
]

export const PRICING_NOTES = [
  'Free Skills only need a free account.',
  'One plan covers every Premium Skill we design.',
  'Cancel anytime. Payments are non-refundable.',
]
