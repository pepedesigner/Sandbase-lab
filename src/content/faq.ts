export interface FaqEntry {
  q: string
  a: string
}

export const GENERAL_FAQ: FaqEntry[] = [
  {
    q: 'What is a Skill?',
    a: 'A Skill is a set of instructions, templates and scripts an agent follows to finish one kind of work — a deck, a landing page, a launch film, a set of avatars. It ships as a single SKILL.md plus its assets.',
  },
  {
    q: 'Who makes the Skills in Lab?',
    a: 'Our studio. Every Skill is designed, written and tested in house — from the example on its page to the scripts inside — and we keep it current as the models change.',
  },
  {
    q: 'Can I run one before installing?',
    a: 'That is what Lab is for. Open any Skill and run it on the page: no keys, no install, no cost. You get the transcript of the workflow and the result it made.',
  },
  {
    q: 'Does running one in the browser cost anything?',
    a: 'No. Browsing and running Skills on the page is free in this demo. Premium Skills unlock installation into your own agent, plus every new Skill we ship.',
  },
  {
    q: 'Will it work with my agent?',
    a: 'Any agent that can read and install Agent Skills. Every Skill page lists the hosts it is tested against — Claude Code, Codex, Cursor, Gemini CLI and more — with install guides.',
  },
  {
    q: 'Do I need an API key?',
    a: 'Not to run a Skill on the page. Some Skills call an outside model inside your own agent; each Skill page says what it needs before you install it.',
  },
  {
    q: 'How do I get updates?',
    a: 'Install it again when a new version ships, or re-open it here. Every Skill page shows its current version, and paid access includes every update.',
  },
]
