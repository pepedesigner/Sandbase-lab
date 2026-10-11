import { AGENTS, type AgentRef } from './agents'
import type { SkillCategory } from './categories'

export interface RunStep {
  label: string
  detail: string
  ms: number
}

export interface SkillFaq {
  q: string
  a: string
}

export interface ArtSpec {
  shape: number
  title: string
  sub?: string
  tone?: 'violet' | 'lime'
}

export interface Skill {
  slug: string
  name: string
  category: SkillCategory
  tagline: string
  /** One line naming the finished thing the Skill hands back. */
  delivers: string
  description: string
  version: string
  updated: string
  installs: number
  likes: number
  saves: number
  rating: number
  price: 'free' | 'premium'
  badge?: 'new' | 'popular'
  agentKeys: string[]
  generatesWith: string
  promptExample: string
  whatYouGet: string[]
  goodFit: string[]
  notFor: string[]
  tags: string[]
  faq: SkillFaq[]
  steps: RunStep[]
  art: ArtSpec
}

function agents(...keys: string[]): AgentRef[] {
  return keys.map((key) => AGENTS[key]).filter(Boolean)
}

export function skillAgents(skill: Skill): AgentRef[] {
  return agents(...skill.agentKeys)
}

/* Preview artwork lives in /public/skills/<slug>/ (see docs/previews.md).
 * Every Skill ships a card + main image; the gallery extras vary. */
const GALLERY_COUNTS: Record<string, number> = {
  'linear-agent-style-launch-video': 0,
  'velocity-matched-ui-sting': 1,
  'device-canvas-product-launch': 1,
}

export function skillCardImage(skill: Skill): string {
  return `/skills/${skill.slug}/card.webp`
}

export function skillMainImage(skill: Skill): string {
  return `/skills/${skill.slug}/main.webp`
}

export function skillGalleryImages(skill: Skill): string[] {
  const count = GALLERY_COUNTS[skill.slug] ?? 2
  return Array.from({ length: count }, (_, index) => `/skills/${skill.slug}/alt-${index + 1}.webp`)
}

const ALL_AGENTS = ['claude-code', 'codex', 'chatgpt', 'cursor', 'copilot'].filter((key) => AGENTS[key])
const CODE_AGENTS = ['claude-code', 'codex', 'cursor', 'opencode', 'windsurf']

export const SKILLS: Skill[] = [
  /* ---------------------------------------------------------------- Web */
  {
    slug: 'dot-avatar-maker',
    name: 'Dot Avatar Maker',
    category: 'web',
    tagline: 'Create character & styled art.',
    delivers: 'A transparent PNG avatar and a 3D page you can spin.',
    description:
      'A live 3D avatar studio as a single HTML file: 25 cute dot, animal and fantasy forms, 12 finishes from soft plush to glazed ceramic, 32 styles and 18 languages. Run it to design characters in your browser and download transparent PNGs or 3D pages you can spin — no image generation and no credits. Then have your agent rebrand it, add your own forms and colors, or build it into your product as a character creator.',
    version: 'v1.0.1',
    updated: 'Sep 30, 2026',
    installs: 347,
    likes: 16,
    saves: 19,
    rating: 5.0,
    price: 'free',
    badge: 'popular',
    agentKeys: [...ALL_AGENTS, 'gemini', 'openclaw', 'hermes', 'warp'],
    generatesWith: 'Host Agent LLM',
    promptExample: 'Make me a pink bunny in long plush with a hair bow for my profile picture.',
    whatYouGet: [
      'The studio’s complete source: one self-contained HTML file, yours to rebrand or build into your site.',
      '25 forms, 12 finishes, 32 styles, nine palette colors plus a custom picker, and 18 languages.',
      'A live studio that opens in your browser with one-click downloads: a transparent PNG or a spinny 3D page.',
    ],
    goodFit: [
      'Developers who want a ready-made character creator to rebrand and add to their product.',
      'Anyone who wants a cute avatar, sticker or mascot without drawing or prompting.',
      'Creators who need a consistent set of characters in matching colors and finishes.',
    ],
    notFor: [
      'Photorealistic portraits or a likeness of a real person.',
      'Animated video, rigged models or files for 3D printing.',
    ],
    tags: ['Web Design', 'Create Character', 'Build Website Page', 'Soft Vinyl Toy', '3D Character', 'Kawaii', 'Plush Toy'],
    faq: [
      { q: 'Do I get the source code?', a: 'Yes — the whole studio is one HTML file you can rebrand, extend or drop into a product.' },
      { q: 'Does it use AI image generation or cost credits?', a: 'No. Everything is drawn live in the browser from geometry and gradients, so there are no credits and no image model.' },
      { q: 'What can I download?', a: 'A 1024 × 1024 transparent PNG, or a 3D page of your character you can spin and share.' },
    ],
    steps: [
      { label: 'Reading SKILL.md', detail: 'dot-avatar-maker — 25 forms · 12 finishes · 18 languages', ms: 700 },
      { label: 'Interpreting your prompt', detail: 'pink · rabbit · long plush · hair bow', ms: 900 },
      { label: 'Composing the character', detail: 'form: rabbit · finish: long plush · palette: blush', ms: 1100 },
      { label: 'Rendering the studio', detail: 'building single-file HTML · 3D preview · PNG export', ms: 1200 },
      { label: 'Done', detail: 'avatar-01.png · 1024×1024 · transparent', ms: 400 },
    ],
    art: { shape: 0, title: 'pink bunny', sub: 'long plush', tone: 'violet' },
  },
  {
    slug: 'cobalt-serif-freelancer-site',
    name: 'Cobalt Serif Freelancer Site',
    category: 'web',
    tagline: 'A one-page portfolio with editorial type.',
    delivers: 'A one-page portfolio, ready to host.',
    description:
      'A single-page freelancer site built around a high-contrast serif, a cobalt ground and a strict grid. Your agent produces clean semantic HTML and CSS you can host anywhere, with sections for work, services, an about note and a contact block — all editable from one file.',
    version: 'v2.2.0',
    updated: 'Sep 22, 2026',
    installs: 44,
    likes: 6,
    saves: 9,
    rating: 4.8,
    price: 'premium',
    agentKeys: CODE_AGENTS,
    generatesWith: 'Host Agent LLM',
    promptExample: 'Build my portfolio for a brand designer — cobalt serif, three case studies, a contact block.',
    whatYouGet: [
      'One index.html plus a stylesheet, no build step and no dependencies.',
      'A work grid, services list, about note and contact block, all editable in one place.',
      'Responsive type scale and a print-friendly stylesheet.',
    ],
    goodFit: ['Designers and developers who want a fast, ownable portfolio.', 'Anyone who prefers static files over a site builder.'],
    notFor: ['Multi-page marketing sites or e-commerce.', 'Teams that need a CMS.'],
    tags: ['Web Design', 'Portfolio', 'Editorial', 'Serif', 'Static Site'],
    faq: [
      { q: 'Is there a build step?', a: 'No. It ships as a single HTML file and a stylesheet you can host on any static host.' },
      { q: 'Can I add more pages?', a: 'Yes — ask your agent to split sections into their own files; the type scale and grid carry over.' },
    ],
    steps: [
      { label: 'Reading SKILL.md', detail: 'cobalt-serif-freelancer-site — 1 page · 4 sections', ms: 650 },
      { label: 'Planning sections', detail: 'work grid · services · about · contact', ms: 850 },
      { label: 'Setting the type scale', detail: 'serif display · cobalt ground · strict grid', ms: 900 },
      { label: 'Writing HTML & CSS', detail: 'index.html · styles.css', ms: 1300 },
      { label: 'Done', detail: 'index.html ready to host', ms: 400 },
    ],
    art: { shape: 1, title: 'Aria Vogel', sub: 'Brand Designer', tone: 'violet' },
  },
  {
    slug: 'cadence-marketing-landing',
    name: 'Cadence Marketing Landing',
    category: 'web',
    tagline: 'A product landing page with rhythm.',
    delivers: 'A responsive landing page with your copy in it.',
    description:
      'A marketing landing page with a clear cadence: hero, proof strip, feature trio, pricing and a closing CTA. Your agent fills it with your copy and ships responsive HTML and CSS, with a motion pass that respects reduced-motion preferences.',
    version: 'v1.4.0',
    updated: 'Sep 18, 2026',
    installs: 203,
    likes: 7,
    saves: 12,
    rating: 4.6,
    price: 'free',
    agentKeys: [...CODE_AGENTS, 'gemini', 'chatgpt'],
    generatesWith: 'Host Agent LLM',
    promptExample: 'A landing page for our scheduling app — hero, three features, pricing and a signup CTA.',
    whatYouGet: [
      'A full landing page: hero, proof strip, feature trio, pricing and closing CTA.',
      'Sections that reflow to one column on mobile with a reduced-motion fallback.',
      'Plain HTML and CSS, ready for your copy.',
    ],
    goodFit: ['Founders shipping a first landing page.', 'Marketers who want a layout your agent can keep editing.'],
    notFor: ['Full app UIs or dashboards.', 'Pages that need a live backend.'],
    tags: ['Web Design', 'Marketing', 'Landing Page', 'Responsive', 'CTA'],
    faq: [
      { q: 'Can I swap the copy?', a: 'Yes — every string lives in one content block near the top of the file.' },
      { q: 'Is there animation?', a: 'A light scroll reveal, and it turns off under prefers-reduced-motion.' },
    ],
    steps: [
      { label: 'Reading SKILL.md', detail: 'cadence-marketing-landing — 5 blocks', ms: 600 },
      { label: 'Planning the cadence', detail: 'hero · proof · features · pricing · CTA', ms: 800 },
      { label: 'Writing sections', detail: 'responsive grid · mobile reflow', ms: 1150 },
      { label: 'Motion pass', detail: 'scroll reveal · reduced-motion fallback', ms: 850 },
      { label: 'Done', detail: 'landing.html ready', ms: 350 },
    ],
    art: { shape: 2, title: 'Cadence', sub: 'schedule less', tone: 'lime' },
  },
  {
    slug: 'sage-sneaker-store',
    name: 'Sage Sneaker Store',
    category: 'web',
    tagline: 'A small-batch storefront.',
    delivers: 'A product page with a size and colour picker.',
    description:
      'A storefront page for a small product run: a product hero, a size and color picker, a story block and a checkout CTA. Clean HTML and CSS your agent can wire to any cart, with a sage-on-bone palette that stays out of the way of the product.',
    version: 'v1.1.0',
    updated: 'Sep 12, 2026',
    installs: 138,
    likes: 4,
    saves: 7,
    rating: 4.5,
    price: 'free',
    agentKeys: CODE_AGENTS,
    generatesWith: 'Host Agent LLM',
    promptExample: 'A storefront page for a single sneaker drop — hero, size picker, story, and a checkout button.',
    whatYouGet: [
      'A product page with hero, option picker, story block and checkout CTA.',
      'A sage-and-bone palette with generous product imagery space.',
      'Static HTML and CSS you can wire to any cart.',
    ],
    goodFit: ['Small brands and drops.', 'Anyone prototyping a product page.'],
    notFor: ['Full catalogs or multi-product shops.', 'Pages that need a payment backend.'],
    tags: ['Web Design', 'E-commerce', 'Product Page', 'Storefront'],
    faq: [
      { q: 'Does it include a cart?', a: 'No — it ships the page and a checkout button for you to wire to your own cart.' },
      { q: 'Can I add more products?', a: 'Yes, duplicate the product block; the layout handles a grid of them.' },
    ],
    steps: [
      { label: 'Reading SKILL.md', detail: 'sage-sneaker-store — product page', ms: 600 },
      { label: 'Planning the layout', detail: 'hero · option picker · story · CTA', ms: 780 },
      { label: 'Setting the palette', detail: 'sage on bone · image-first spacing', ms: 720 },
      { label: 'Writing HTML & CSS', detail: 'product.html · styles.css', ms: 1050 },
      { label: 'Done', detail: 'product.html ready', ms: 350 },
    ],
    art: { shape: 3, title: 'Sage 01', sub: 'small batch', tone: 'lime' },
  },

  /* ------------------------------------------------------------- Slides */
  {
    slug: 'field-notes-deck',
    name: 'Field Notes Deck',
    category: 'slides',
    tagline: 'A working deck that looks handwritten.',
    delivers: 'A 12-slide deck you can present or print.',
    description:
      'A presentation system modelled on a field notebook: ruled grids, margin notes, a stamp for section breaks and a monospace caption style. Your agent turns an outline into a consistent deck you can present or export, with every slide built from the same small set of layouts.',
    version: 'v1.3.2',
    updated: 'Sep 26, 2026',
    installs: 179,
    likes: 6,
    saves: 10,
    rating: 4.7,
    price: 'free',
    agentKeys: [...CODE_AGENTS, 'chatgpt'],
    generatesWith: 'Host Agent LLM',
    promptExample: 'Turn my research outline into a 12-slide field-notes deck with margin notes.',
    whatYouGet: [
      'A titled deck with cover, section breaks, content and caption layouts.',
      'A ruled-grid system, margin notes and stamp accents.',
      'HTML you can present in a browser or export to PDF.',
    ],
    goodFit: ['Researchers and PMs who want a deck with a notebook feel.', 'Turning a written outline into slides fast.'],
    notFor: ['Photographic, image-heavy marketing decks.', 'Teams locked to PowerPoint templates.'],
    tags: ['Slides', 'Presentation', 'Editorial', 'Ruled Grid', 'Notes'],
    faq: [
      { q: 'How many slides?', a: 'As many as your outline needs — layouts repeat so the deck stays consistent.' },
      { q: 'Can I export it?', a: 'Present in the browser or print to PDF; the CSS includes print rules.' },
    ],
    steps: [
      { label: 'Reading SKILL.md', detail: 'field-notes-deck — 5 layouts', ms: 640 },
      { label: 'Outlining slides', detail: 'cover · 3 sections · captions · close', ms: 920 },
      { label: 'Laying out pages', detail: 'ruled grid · margin notes · stamps', ms: 1200 },
      { label: 'Rendering deck', detail: '12 slides · print stylesheet', ms: 1000 },
      { label: 'Done', detail: 'field-notes.pdf · 12 pages', ms: 400 },
    ],
    art: { shape: 0, title: 'Field Notes', sub: '12 slides', tone: 'lime' },
  },
  {
    slug: 'yellow-sketchnote-deck',
    name: 'Yellow Sketchnote Deck',
    category: 'slides',
    tagline: 'Sketchnotes, in highlighter yellow.',
    delivers: 'A sketchnote deck drawn from real vector markers.',
    description:
      'A sketchnote deck: hand-drawn arrows, highlighter fills and a bold caption voice that turns a talk or a workshop into visual notes. Your agent builds each slide from markers, boxes and connectors so the whole set reads as one page of notes.',
    version: 'v1.0.4',
    updated: 'Sep 20, 2026',
    installs: 170,
    likes: 5,
    saves: 8,
    rating: 4.6,
    price: 'free',
    agentKeys: [...CODE_AGENTS, 'chatgpt'],
    generatesWith: 'Host Agent LLM',
    promptExample: 'Make sketchnote slides from my workshop on onboarding — arrows, markers, one idea per slide.',
    whatYouGet: [
      'A sketchnote deck with markers, boxes, connectors and highlighter fills.',
      'A bold caption voice and one-idea-per-slide pacing.',
      'HTML and SVG you can present or export.',
    ],
    goodFit: ['Workshops, talks and training.', 'Turning messy notes into something visual.'],
    notFor: ['Formal corporate decks.', 'Data-heavy charts and tables.'],
    tags: ['Slides', 'Sketchnote', 'Workshop', 'Visual Notes', 'Highlighter'],
    faq: [
      { q: 'Is the hand-drawn look real vector art?', a: 'Yes — every arrow, box and marker is inline SVG, so it scales cleanly.' },
      { q: 'Can I change the highlight color?', a: 'Yes, one variable sets the highlighter across the deck.' },
    ],
    steps: [
      { label: 'Reading SKILL.md', detail: 'yellow-sketchnote-deck — marker system', ms: 620 },
      { label: 'Mapping ideas', detail: 'one idea per slide · 10 slides', ms: 860 },
      { label: 'Drawing markers', detail: 'arrows · boxes · connectors · highlighter', ms: 1150 },
      { label: 'Rendering deck', detail: 'inline SVG · export ready', ms: 950 },
      { label: 'Done', detail: 'sketchnotes.pdf · 10 pages', ms: 380 },
    ],
    art: { shape: 1, title: 'Onboarding', sub: 'sketchnotes', tone: 'lime' },
  },
  {
    slug: 'visual-canvas-deck',
    name: 'Visual Canvas Deck',
    category: 'slides',
    tagline: 'Full-bleed slides for a big-room talk.',
    delivers: 'A full-bleed keynote deck at 16:9.',
    description:
      'A keynote-grade deck built on full-bleed canvases, a large type scale and a restrained accent. Your agent composes covers, statement slides and diagram slides that hold up on a projector, keeping one idea and one image per page.',
    version: 'v2.0.1',
    updated: 'Sep 16, 2026',
    installs: 41,
    likes: 3,
    saves: 6,
    rating: 4.8,
    price: 'premium',
    agentKeys: CODE_AGENTS,
    generatesWith: 'Host Agent LLM',
    promptExample: 'A keynote deck for our launch — full-bleed cover, statement slides, and one architecture diagram.',
    whatYouGet: [
      'Full-bleed covers, statement slides and diagram slides.',
      'A large type scale tuned for projector legibility.',
      'Slides you can present in the browser or export.',
    ],
    goodFit: ['Keynotes and launch talks.', 'Anyone presenting to a large room.'],
    notFor: ['Dense internal reports.', 'Decks that need tables of data.'],
    tags: ['Slides', 'Keynote', 'Full-bleed', 'Typography', 'Launch'],
    faq: [
      { q: 'Does it support diagrams?', a: 'Yes — there is a diagram layout for flows and architectures.' },
      { q: 'What aspect ratio?', a: '16:9 by default; one variable switches to 4:3.' },
    ],
    steps: [
      { label: 'Reading SKILL.md', detail: 'visual-canvas-deck — 6 layouts', ms: 660 },
      { label: 'Structuring the talk', detail: 'cover · statements · diagram · close', ms: 940 },
      { label: 'Setting type scale', detail: 'projector legibility · one idea per page', ms: 880 },
      { label: 'Rendering deck', detail: '16:9 · export ready', ms: 1020 },
      { label: 'Done', detail: 'keynote.pdf · 14 pages', ms: 400 },
    ],
    art: { shape: 2, title: 'Launch Keynote', sub: '14 slides', tone: 'violet' },
  },
  {
    slug: 'consulting-storyline-deck',
    name: 'Consulting Storyline Deck',
    category: 'slides',
    tagline: 'An argument, slide by slide.',
    delivers: 'A governed storyline with exhibit pages.',
    description:
      'A consulting deck that builds an argument: situation, complication, question, answer, then evidence. Your agent turns a brief into a governed storyline with consistent exhibit pages and a single headline per slide.',
    version: 'v1.5.0',
    updated: 'Sep 10, 2026',
    installs: 111,
    likes: 1,
    saves: 4,
    rating: 4.4,
    price: 'free',
    agentKeys: [...CODE_AGENTS, 'chatgpt'],
    generatesWith: 'Host Agent LLM',
    promptExample: 'Turn this brief into a consulting storyline — S-C-Q-A, then three exhibit slides.',
    whatYouGet: [
      'A governed storyline: situation, complication, question, answer, evidence.',
      'Exhibit pages with a single headline and consistent framing.',
      'HTML you can present or export.',
    ],
    goodFit: ['Strategy and consulting work.', 'Making a brief persuasive.'],
    notFor: ['Visual or emotive decks.', 'Decks without a clear argument.'],
    tags: ['Slides', 'Consulting', 'Storyline', 'Strategy', 'Exhibit'],
    faq: [
      { q: 'Will it invent the argument?', a: 'No — it structures the argument from your brief and asks for the evidence it is missing.' },
      { q: 'Can I restyle the exhibits?', a: 'Yes, the exhibit frame and type scale are separate from your content.' },
    ],
    steps: [
      { label: 'Reading SKILL.md', detail: 'consulting-storyline-deck — S-C-Q-A', ms: 650 },
      { label: 'Building the storyline', detail: 'situation · complication · question · answer', ms: 900 },
      { label: 'Laying out exhibits', detail: 'one headline per slide · evidence frames', ms: 1100 },
      { label: 'Rendering deck', detail: 'export ready', ms: 900 },
      { label: 'Done', detail: 'storyline.pdf · 11 pages', ms: 380 },
    ],
    art: { shape: 3, title: 'Situation → Answer', sub: '11 slides', tone: 'violet' },
  },

  /* -------------------------------------------------------------- Video */
  {
    slug: 'hyperframes-pixel-promo',
    name: 'Pixel Promo Video',
    category: 'video',
    tagline: 'A promo rendered as code, not a timeline.',
    delivers: 'A 12-second promo clip, plus its frames.',
    description:
      'A short promo built from pixel-grid frames and stepped wipes, rendered in code so it is reproducible and endlessly tweakable. Your agent composes an intro, a product beat and an outro with a locked grid, keyframed motion and a caption track, then hands you the frames and a playable page.',
    version: 'v1.0.0',
    updated: 'Oct 2, 2026',
    installs: 34,
    likes: 8,
    saves: 6,
    rating: 4.9,
    price: 'premium',
    badge: 'new',
    agentKeys: ['claude-code', 'codex', 'chatgpt'],
    generatesWith: 'HyperFrames · Host Agent LLM',
    promptExample: 'A 12-second pixel promo for our app — intro, feature beat, outro, with captions.',
    whatYouGet: [
      'Intro, product beat and outro, on a locked pixel grid.',
      'Keyframed motion and a caption track as code you can edit.',
      'A playable page plus the individual frames.',
    ],
    goodFit: ['Product launches and social promos.', 'Teams that want reproducible motion instead of a timeline.'],
    notFor: ['Live-action footage editing.', 'Photoreal 3D renders.'],
    tags: ['Video', 'Promo', 'Pixel', 'Motion', 'Launch'],
    faq: [
      { q: 'Do I need a GPU?', a: 'No — frames render in code, so quality does not depend on your machine.' },
      { q: 'Can I change the length?', a: 'Yes — the beat durations are variables at the top of the file.' },
    ],
    steps: [
      { label: 'Reading SKILL.md', detail: 'hyperframes-pixel-promo — 3 beats', ms: 620 },
      { label: 'Blocking the beats', detail: 'intro 4s · feature 5s · outro 3s', ms: 880 },
      { label: 'Keyframing motion', detail: 'stepped wipes · pixel grid · captions', ms: 1250 },
      { label: 'Rendering frames', detail: '12s · 24fps · 288 frames', ms: 1400 },
      { label: 'Done', detail: 'promo.mp4 · 12s · 1920×1080', ms: 500 },
    ],
    art: { shape: 0, title: 'PIXEL PROMO', sub: '00:12', tone: 'lime' },
  },
  {
    slug: 'linear-agent-style-launch-video',
    name: 'Linear Agent Style Launch Video',
    category: 'video',
    tagline: 'The calm, precise launch-film look.',
    delivers: 'A 20-second launch film with captions.',
    description:
      'A launch film in the restrained, high-contrast style of a modern software brand: a slow build, precise type reveals and a single accent. Your agent scripts the beats, keyframes the reveals and renders a film with a matching caption track.',
    version: 'v1.1.0',
    updated: 'Oct 1, 2026',
    installs: 88,
    likes: 1,
    saves: 4,
    rating: 4.7,
    price: 'premium',
    badge: 'new',
    agentKeys: ['claude-code', 'codex', 'chatgpt'],
    generatesWith: 'Host Agent LLM',
    promptExample: 'A 20-second launch film in a precise, dark software style — one accent, slow build, type reveals.',
    whatYouGet: [
      'A scripted set of beats from cold open to logo lockup.',
      'Type reveals and a slow build with a single accent color.',
      'A playable page and an exported film.',
    ],
    goodFit: ['Software launches and changelogs.', 'Teams that want a premium, understated film.'],
    notFor: ['Upbeat, colorful social edits.', 'Footage-driven videos.'],
    tags: ['Video', 'Launch', 'Motion', 'Typography', 'Dark'],
    faq: [
      { q: 'What length?', a: 'Roughly 20 seconds by default; the beat list is easy to extend or trim.' },
      { q: 'Can I set the accent color?', a: 'Yes — one variable drives the accent across every beat.' },
    ],
    steps: [
      { label: 'Reading SKILL.md', detail: 'linear-agent-style-launch-video', ms: 640 },
      { label: 'Scripting beats', detail: 'cold open · build · reveal · lockup', ms: 920 },
      { label: 'Keyframing type', detail: 'precise reveals · single accent', ms: 1200 },
      { label: 'Rendering film', detail: '20s · 30fps', ms: 1350 },
      { label: 'Done', detail: 'launch-film.mp4 · 20s', ms: 480 },
    ],
    art: { shape: 1, title: 'AGENT', sub: '00:20', tone: 'violet' },
  },
  {
    slug: 'velocity-matched-ui-sting',
    name: 'Velocity-Matched UI Sting',
    category: 'video',
    tagline: 'A three-second sting that lands on the beat.',
    delivers: 'A three-second sting that lands on the beat.',
    description:
      'A short UI sting where every element enters on a matched velocity curve, so the motion feels intentional rather than decorative. Your agent builds the elements, tunes the curve and renders a sting you can drop at the end of a product clip.',
    version: 'v1.2.0',
    updated: 'Sep 24, 2026',
    installs: 609,
    likes: 26,
    saves: 18,
    rating: 4.8,
    price: 'free',
    agentKeys: [...CODE_AGENTS, 'gemini'],
    generatesWith: 'HyperFrames · Host Agent LLM',
    promptExample: 'A 3-second UI sting — elements enter on a matched curve and land together.',
    whatYouGet: [
      'A three-second sting with elements entering on a matched velocity curve.',
      'A logo or product lockup that lands on the final frame.',
      'A rendered clip plus the editable source.',
    ],
    goodFit: ['Ending product clips and reels.', 'Adding a precise, on-beat outro.'],
    notFor: ['Long-form videos.', 'Narrative sequences.'],
    tags: ['Video', 'Sting', 'Motion', 'UI', 'Outro'],
    faq: [
      { q: 'Can I change the lockup?', a: 'Yes — the final frame is a single component you can replace with your logo.' },
      { q: 'Does it loop?', a: 'It is a one-shot outro; the curve can be authored to loop if you need it.' },
    ],
    steps: [
      { label: 'Reading SKILL.md', detail: 'velocity-matched-ui-sting', ms: 580 },
      { label: 'Timing the beat', detail: '3s · 1 landing frame', ms: 760 },
      { label: 'Tuning the curve', detail: 'matched velocity across elements', ms: 980 },
      { label: 'Rendering sting', detail: '3s · 60fps', ms: 900 },
      { label: 'Done', detail: 'sting.mp4 · 00:03', ms: 360 },
    ],
    art: { shape: 2, title: 'UI STING', sub: '00:03', tone: 'lime' },
  },
  {
    slug: 'device-canvas-product-launch',
    name: 'Device-Canvas Product Launch',
    category: 'video',
    tagline: 'Your product on a device, in motion.',
    delivers: 'An 8-second device clip for a hero section.',
    description:
      'A launch clip that puts your product on a device canvas and moves it with intent: a slow orbit, a screen transition and a closing card. Your agent composites the device frame, animates the screen and renders a clip ready for a landing page hero.',
    version: 'v1.0.3',
    updated: 'Sep 19, 2026',
    installs: 330,
    likes: 11,
    saves: 9,
    rating: 4.6,
    price: 'free',
    agentKeys: [...CODE_AGENTS, 'chatgpt'],
    generatesWith: 'HyperFrames · Host Agent LLM',
    promptExample: 'A device-canvas clip for our mobile app — slow orbit, screen transition, closing card.',
    whatYouGet: [
      'A device frame with an animated screen and a closing card.',
      'A slow orbit and a screen transition you can retime.',
      'A clip sized for a landing-page hero.',
    ],
    goodFit: ['App and product launches.', 'Hero clips for a website.'],
    notFor: ['Multi-scene narratives.', 'Footage compositing.'],
    tags: ['Video', 'Product', 'Device', 'Motion', 'Hero'],
    faq: [
      { q: 'Do I supply screenshots?', a: 'Yes — drop your screen images in and the canvas places them on the device.' },
      { q: 'What sizes are supported?', a: 'Phone, tablet and laptop frames ship with the Skill.' },
    ],
    steps: [
      { label: 'Reading SKILL.md', detail: 'device-canvas-product-launch', ms: 600 },
      { label: 'Compositing device', detail: 'phone frame · screen slot', ms: 880 },
      { label: 'Animating motion', detail: 'slow orbit · screen transition · card', ms: 1150 },
      { label: 'Rendering clip', detail: '8s · 30fps · hero crop', ms: 1000 },
      { label: 'Done', detail: 'device-hero.mp4 · 00:08', ms: 420 },
    ],
    art: { shape: 3, title: 'PRODUCT', sub: '00:08', tone: 'violet' },
  },

  /* -------------------------------------------------------------- Image */
  {
    slug: 'apple-style-og',
    name: 'Apple Style OG Image',
    category: 'image',
    tagline: 'A calm, product-first share card.',
    delivers: 'A 1200x630 share card and a square variant.',
    description:
      'A social share card in the calm, product-first style of a premium hardware keynote: generous negative space, a soft gradient ground and one confident headline. Your agent composes the card to the right OG dimensions and exports a crisp PNG for every network.',
    version: 'v1.2.0',
    updated: 'Sep 28, 2026',
    installs: 41,
    likes: 3,
    saves: 5,
    rating: 4.7,
    price: 'premium',
    agentKeys: ['claude-code', 'codex', 'chatgpt', 'cursor'],
    generatesWith: 'Host Agent LLM',
    promptExample: 'An OG image for our launch post — calm gradient, one headline, generous space.',
    whatYouGet: [
      'A share card at 1200×630 and a square variant at 1080×1080.',
      'A soft gradient ground, one headline and a small product mark.',
      'Exported PNGs, plus the editable source.',
    ],
    goodFit: ['Blog and launch posts.', 'A consistent set of share cards.'],
    notFor: ['Photo-collage cards.', 'Cards that need many logos.'],
    tags: ['Image', 'OG Image', 'Social', 'Gradient', 'Share Card'],
    faq: [
      { q: 'Which sizes?', a: '1200×630 for links and 1080×1080 for social squares, both exported for you.' },
      { q: 'Can I add a logo?', a: 'Yes — there is a reserved mark slot in the corner.' },
    ],
    steps: [
      { label: 'Reading SKILL.md', detail: 'apple-style-og-image — 2 sizes', ms: 600 },
      { label: 'Setting the ground', detail: 'soft gradient · negative space', ms: 820 },
      { label: 'Placing the headline', detail: 'one line · confident scale', ms: 900 },
      { label: 'Exporting', detail: 'og-1200×630.png · square-1080.png', ms: 880 },
      { label: 'Done', detail: 'oG-image.png · 1200×630', ms: 360 },
    ],
    art: { shape: 0, title: 'Think different', sub: '1200 × 630', tone: 'violet' },
  },
  {
    slug: 'monochrome-studio-portrait',
    name: 'Monochrome Studio Portrait',
    category: 'image',
    tagline: 'A clean one-light portrait look.',
    delivers: 'A graded portrait still, croppable to 2:3.',
    description:
      'A portrait treatment with a single studio light, a seamless ground and a monochrome grade. Your agent sets the lighting direction, the crop and the grade, then renders a consistent series so a set of portraits reads as one shoot.',
    version: 'v1.4.0',
    updated: 'Sep 21, 2026',
    installs: 157,
    likes: 8,
    saves: 11,
    rating: 4.7,
    price: 'free',
    agentKeys: ['claude-code', 'chatgpt', 'codex'],
    generatesWith: 'Host Agent LLM',
    promptExample: 'A monochrome studio portrait — one key light, seamless ground, three-quarter crop.',
    whatYouGet: [
      'A one-light setup with a seamless ground and a monochrome grade.',
      'Consistent crops so a series reads as one shoot.',
      'Exported stills plus the editable setup.',
    ],
    goodFit: ['Team and profile photos.', 'A consistent series of portraits.'],
    notFor: ['Group photos.', 'Environmental or candid shots.'],
    tags: ['Image', 'Portrait', 'Monochrome', 'Studio', 'Lighting'],
    faq: [
      { q: 'Is this a real photograph?', a: 'It is a rendered still from your prompt — a consistent, credit-free portrait, not a photo of a real person.' },
      { q: 'Can I match my team?', a: 'Yes — reuse the same setup to keep a whole team consistent.' },
    ],
    steps: [
      { label: 'Reading SKILL.md', detail: 'monochrome-studio-portrait', ms: 600 },
      { label: 'Setting the light', detail: '1 key · seamless ground', ms: 840 },
      { label: 'Framing the crop', detail: 'three-quarter · consistent set', ms: 900 },
      { label: 'Grading & rendering', detail: 'monochrome · export', ms: 980 },
      { label: 'Done', detail: 'portrait-01.png · 2:3', ms: 380 },
    ],
    art: { shape: 1, title: 'STUDIO', sub: 'monochrome', tone: 'violet' },
  },
  {
    slug: 'hand-drawn-visual-notes',
    name: 'Hand-Drawn Visual Notes',
    category: 'image',
    tagline: 'Turn a page of text into visual notes.',
    delivers: 'A single-page explainer image, share-ready.',
    description:
      'A visual-note image system: hand-drawn icons, arrows and boxes that turn a block of text into a single explainer page. Your agent extracts the key points, picks icons and composes everything into a shareable, scroll-stopping image.',
    version: 'v1.0.5',
    updated: 'Sep 17, 2026',
    installs: 262,
    likes: 6,
    saves: 12,
    rating: 4.6,
    price: 'free',
    agentKeys: [...CODE_AGENTS, 'chatgpt'],
    generatesWith: 'Host Agent LLM',
    promptExample: 'Turn my article into visual notes — icons, arrows, one page, shareable.',
    whatYouGet: [
      'A single explainer page built from icons, arrows, boxes and captions.',
      'Key points pulled from your text, one page, share-ready.',
      'Exported PNG plus the editable source.',
    ],
    goodFit: ['Summarising articles and talks.', 'Social explainers and carousels.'],
    notFor: ['Photoreal imagery.', 'Long multi-page documents.'],
    tags: ['Image', 'Visual Notes', 'Illustration', 'Explainer', 'Shareable'],
    faq: [
      { q: 'How much text can it handle?', a: 'A typical article works well; it pulls the key points rather than every line.' },
      { q: 'Can I edit the icons?', a: 'Yes — the icon set is inline SVG you can swap or extend.' },
    ],
    steps: [
      { label: 'Reading SKILL.md', detail: 'hand-drawn-visual-notes', ms: 600 },
      { label: 'Extracting points', detail: 'key ideas · order', ms: 900 },
      { label: 'Drawing icons', detail: 'arrows · boxes · captions', ms: 1100 },
      { label: 'Composing page', detail: 'single page · export', ms: 950 },
      { label: 'Done', detail: 'visual-notes.png · 1600×2000', ms: 400 },
    ],
    art: { shape: 2, title: 'Visual Notes', sub: 'one page', tone: 'lime' },
  },
  {
    slug: 'grokbot-avatar',
    name: 'GrokBot Avatar',
    category: 'image',
    tagline: 'A friendly bot avatar in one shot.',
    delivers: 'Square avatars at 512, 256 and 128.',
    description:
      'A bot avatar generator: a rounded, friendly robot with a palette that fits your brand. Your agent sets the proportions, colors and expression and renders a set of avatars at profile sizes, ready to drop into a chat or a docs page.',
    version: 'v1.0.2',
    updated: 'Sep 14, 2026',
    installs: 211,
    likes: 7,
    saves: 10,
    rating: 4.5,
    price: 'free',
    agentKeys: ['chatgpt', 'codex'],
    generatesWith: 'Host Agent LLM',
    promptExample: 'A friendly bot avatar for our help center — rounded, teal, one expression.',
    whatYouGet: [
      'A rounded bot avatar with a brand palette and one expression.',
      'Profile-size exports for chat, docs and social.',
      'The editable source so you can add expressions.',
    ],
    goodFit: ['Help centres and chatbots.', 'Docs and community profiles.'],
    notFor: ['Photoreal character art.', 'Complex multi-character scenes.'],
    tags: ['Image', 'Avatar', 'Bot', 'Character', 'Profile'],
    faq: [
      { q: 'Can I get more expressions?', a: 'Yes — duplicate the face component and change the eyes and mouth.' },
      { q: 'What sizes?', a: 'It exports 512, 256 and 128 square PNGs.' },
    ],
    steps: [
      { label: 'Reading SKILL.md', detail: 'grokbot-avatar', ms: 580 },
      { label: 'Setting proportions', detail: 'rounded · friendly silhouette', ms: 820 },
      { label: 'Applying palette', detail: 'teal · single expression', ms: 880 },
      { label: 'Exporting sizes', detail: '512 · 256 · 128', ms: 820 },
      { label: 'Done', detail: 'bot-avatar.png · 512×512', ms: 360 },
    ],
    art: { shape: 3, title: 'BOT', sub: '512 × 512', tone: 'lime' },
  },
]

export function getSkill(slug: string): Skill | undefined {
  return SKILLS.find((skill) => skill.slug === slug)
}

export function skillsByCategory(category: SkillCategory): Skill[] {
  return SKILLS.filter((skill) => skill.category === category)
}

export function featuredSkills(limit = 8): Skill[] {
  return SKILLS.filter((skill) => skill.badge || skill.price === 'premium').slice(0, limit)
}

export function freeSkills(limit = 8): Skill[] {
  return SKILLS.filter((skill) => skill.price === 'free').slice(0, limit)
}

export function similarSkills(skill: Skill, limit = 6): Skill[] {
  return SKILLS.filter((item) => item.category === skill.category && item.slug !== skill.slug).slice(0, limit)
}

export function installCommand(skill: Skill): string {
  return `npx sandbase skill add ${skill.slug}`
}
