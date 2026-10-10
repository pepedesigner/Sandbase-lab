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
    blurb: 'Full Premium access, billed monthly.',
    features: [
      'Access all Premium Skills',
      'Install from the web or CLI',
      'Run Skills in the browser',
      'Ongoing Skill updates',
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
    blurb: 'Full Premium access for a lower annual price.',
    features: [
      'Access all Premium Skills',
      'Install from the web or CLI',
      'Run Skills in the browser',
      'Ongoing Skill updates',
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
    blurb: 'Founding price — increases as the library grows.',
    features: [
      'Access all Premium Skills',
      'Install from the web or CLI',
      'Run Skills in the browser',
      'Ongoing Skill updates',
      'New Premium Skills included',
      'No subscription or renewal bill',
    ],
    cta: 'Get lifetime access for $169',
    tag: 'Founding offer',
  },
]

export const PRICING_NOTES = [
  'Free Skills only need a free account.',
  'One plan unlocks every Skill our studio designs.',
  'Cancel anytime. Payments are non-refundable.',
]
