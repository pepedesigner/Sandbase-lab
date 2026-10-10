import type { Skill } from '@/content/skills'

export type RunLineKind = 'cmd' | 'prompt' | 'step' | 'detail' | 'log' | 'ok'

export interface RunLine {
  id: number
  kind: RunLineKind
  text: string
  /** milliseconds to wait before this line appears */
  delay: number
}

/**
 * Turn a Skill + the user's prompt into a deterministic, plausible transcript
 * of an agent running it. Each entry carries the delay before it should be
 * revealed, so the console can replay the run at a human pace.
 *
 * There is no model call behind this — the Lab demo simulates the run so the
 * experience works offline, with no keys and no cost.
 */
export function planRun(skill: Skill, prompt: string): RunLine[] {
  const lines: RunLine[] = []
  let id = 0
  const push = (kind: RunLineKind, text: string, delay: number) => {
    lines.push({ id: id++, kind, text, delay })
  }

  push('cmd', `sandbase lab run --skill ${skill.slug}`, 220)
  push('prompt', `prompt: ${prompt.trim() || skill.promptExample}`, 520)
  push('log', `resolving runtime · ${skill.generatesWith.toLowerCase()}`, 460)

  skill.steps.forEach((step) => {
    push('step', step.label, 260)
    push('detail', step.detail, Math.max(200, Math.round(step.ms * 0.35)))
    step.detail
      .split(' · ')
      .slice(0, 3)
      .forEach((fragment, index) => {
        push('log', `${index === 0 ? '→' : ' '} ${fragment.trim()}`, Math.max(160, Math.round(step.ms * 0.22)))
      })
    push('ok', `${step.label.toLowerCase()} — ok`, Math.max(140, Math.round(step.ms * 0.19)))
  })

  push('ok', `finished · ${skill.art.sub ?? skill.version} · ${skill.price === 'free' ? 'free' : 'pro'}`, 420)

  return lines
}

export function totalDuration(lines: RunLine[]): number {
  return lines.reduce((sum, line) => sum + line.delay, 0)
}
