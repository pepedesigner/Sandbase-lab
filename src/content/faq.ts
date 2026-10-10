export interface FaqEntry {
  q: string
  a: string
}

export const GENERAL_FAQ: FaqEntry[] = [
  {
    q: 'What is an Agent Skill?',
    a: 'A Skill is a reusable set of instructions and resources that helps an AI agent complete a specific kind of work — a landing page, a deck, a launch film. Each Skill ships as a single SKILL.md plus its templates and scripts.',
  },
  {
    q: 'Who makes the Skills in Lab?',
    a: 'Our own studio. Every Skill is designed, written and tested in house — from the example on its page to the templates and scripts inside the package — and we keep updating it after release.',
  },
  {
    q: 'How do I run a Skill in the browser?',
    a: 'Open any Skill and hit “Run in browser”. The Lab workbench walks through the same workflow the Skill hands your agent — reading SKILL.md, planning, generating and rendering — and shows the finished result. No install required to try it.',
  },
  {
    q: 'Does running a Skill in the browser cost anything?',
    a: 'No. Browsing and running Skills in Lab is free in this demo. Premium Skills unlock installation into your own agent, plus every future Skill we ship.',
  },
  {
    q: 'Will a Skill work with my agent?',
    a: 'The catalog works with any agent that can read and install Agent Skills. Each Skill page lists the hosts it is tested against — Claude Code, Codex, Cursor, Copilot, Gemini CLI and more — plus install guides.',
  },
  {
    q: 'Do I need an API key?',
    a: 'Not to browse or run Skills in Lab. Some Skills that generate images or video call an outside model in your own agent; each Skill page lists what it needs before you install it.',
  },
  {
    q: 'How do I get Skill updates?',
    a: 'Install it again when a new version is out, or re-open it in Lab. Every Skill page shows its current version, and paid access includes every update.',
  },
]
