'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { AgentChip } from '@/components/lab/agent-badges'
import { SkillImage } from '@/components/lab/skill-image'
import { SkillBadge } from '@/components/lab/skill-card'
import { PixelFrame } from '@/components/ui/pixel-frame'
import { CopyButton } from '@/components/ui/copy-button'
import { CATEGORY_BY_KEY } from '@/content/categories'
import { installCommand, skillAgents, skillMainImage, type Skill } from '@/content/skills'
import { planRun, totalDuration, type RunLine } from '@/features/lab/run-simulator'
import { cn } from '@/lib/cn'

type Status = 'idle' | 'running' | 'done' | 'stopped'

const LINE_TONE: Record<RunLine['kind'], string> = {
  cmd: 'text-lime-300',
  prompt: 'text-tint-cyan',
  step: 'text-panel-fg',
  detail: 'text-panel-fg-muted',
  log: 'text-panel-fg-muted',
  ok: 'text-lime-300',
}

const PREFIX: Record<RunLine['kind'], string> = {
  cmd: '$',
  prompt: '›',
  step: '●',
  detail: ' ',
  log: ' ',
  ok: '✓',
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function RunWorkbench({ skill }: { skill: Skill }) {
  const category = CATEGORY_BY_KEY[skill.category]
  const agents = skillAgents(skill)
  const [prompt, setPrompt] = useState(skill.promptExample)
  const [lines, setLines] = useState<RunLine[]>([])
  const [status, setStatus] = useState<Status>('idle')
  const [elapsed, setElapsed] = useState(0)

  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const ticker = useRef<ReturnType<typeof setInterval> | null>(null)
  const startRef = useRef(0)
  const logRef = useRef<HTMLDivElement>(null)

  const plan = useMemo(() => planRun(skill, prompt), [skill, prompt])
  const total = useMemo(() => totalDuration(plan), [plan])
  const stepsTotal = skill.steps.length
  const stepsSeen = lines.filter((line) => line.kind === 'step').length

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    if (ticker.current) {
      clearInterval(ticker.current)
      ticker.current = null
    }
  }, [])

  useEffect(() => () => clearTimers(), [clearTimers])

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [lines])

  const stop = useCallback(() => {
    clearTimers()
    setStatus('stopped')
    setElapsed(startRef.current ? Date.now() - startRef.current : 0)
  }, [clearTimers])

  const run = useCallback(() => {
    clearTimers()
    setLines([])
    setElapsed(0)
    setStatus('running')
    startRef.current = Date.now()

    if (prefersReducedMotion()) {
      setLines(plan)
      setElapsed(total)
      setStatus('done')
      return
    }

    let cumulative = 0
    plan.forEach((line, index) => {
      cumulative += line.delay
      timers.current.push(
        setTimeout(() => setLines((prev) => [...prev, line]), cumulative),
      )
      if (index === plan.length - 1) {
        timers.current.push(setTimeout(() => setStatus('done'), cumulative + 120))
      }
    })
    ticker.current = setInterval(() => setElapsed(Date.now() - startRef.current), 100)
  }, [clearTimers, plan, total])

  const downloadTranscript = useCallback(() => {
    const header = [
      `SandBase Lab — run transcript`,
      `skill:  ${skill.slug} (${skill.version})`,
      `prompt: ${prompt}`,
      `agent:  ${skill.generatesWith}`,
      `time:   ${(elapsed / 1000).toFixed(2)}s`,
      ''.padEnd(52, '-'),
    ].join('\n')
    const body = lines.map((line) => `${PREFIX[line.kind]} ${line.text}`).join('\n')
    const blob = new Blob([`${header}\n${body}\n`], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `${skill.slug}-run.txt`
    anchor.click()
    URL.revokeObjectURL(url)
  }, [elapsed, lines, prompt, skill])

  const progress = plan.length ? Math.round((lines.length / plan.length) * 100) : 0
  const running = status === 'running'

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-10">
      {/* Left: skill + prompt */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <SkillBadge skill={skill} />
            <span className="font-mono text-label-xs uppercase tracking-[0.09em] text-ink-subtle">
              {category.label} · {skill.version}
            </span>
          </div>
          <h1 className="text-h1 text-ink">{skill.name}</h1>
          <p className="text-body-sm text-ink-muted">{skill.tagline}</p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-mono text-label-xs uppercase tracking-[0.09em] text-ink-subtle">Runs in</span>
          <div className="flex flex-wrap items-center gap-1.5">
            {agents.slice(0, 6).map((agent) => (
              <AgentChip key={agent.key} agent={agent} size={26} />
            ))}
          </div>
        </div>

        <label className="flex flex-col gap-2">
          <span className="font-mono text-label-xs uppercase tracking-[0.09em] text-ink-subtle">Your prompt</span>
          <textarea
            className="input-base min-h-[7.5rem]"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            spellCheck={false}
            disabled={running}
          />
        </label>

        <div className="flex flex-wrap items-center gap-3">
          {running ? (
            <button
              type="button"
              onClick={stop}
              className="inline-flex items-center justify-center bg-ink px-6 py-[13px] text-body font-medium text-canvas transition-colors hover:bg-tint-cyan hover:text-ink"
            >
              Stop
            </button>
          ) : (
            <button
              type="button"
              onClick={run}
              className="inline-flex items-center justify-center bg-ink px-6 py-[13px] text-body font-medium text-canvas transition-colors hover:bg-tint-cyan hover:text-ink"
            >
              {status === 'idle' ? 'Run in browser' : 'Run again'}
            </button>
          )}
          <button
            type="button"
            onClick={() => setPrompt(skill.promptExample)}
            disabled={running}
            className="font-mono text-label-sm uppercase tracking-[0.08em] text-ink-muted transition-colors hover:text-ink disabled:opacity-40"
          >
            Use example
          </button>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-line pt-4">
          <div className="flex min-w-0 items-center gap-2">
            <span className="font-mono text-label-xs text-ink-subtle">$</span>
            <code className="truncate font-mono text-mono-xs text-ink-muted">{installCommand(skill)}</code>
          </div>
          <CopyButton text={installCommand(skill)} subject="Install command" className="text-accent" />
        </div>

        <p className="text-body-xs text-ink-subtle">
          Runtime: <span className="text-ink-muted">{skill.generatesWith}</span>. This is a simulated run for the demo — no
          model calls, no keys, no cost.
        </p>
      </div>

      {/* Right: console */}
      <div className="flex min-w-0 flex-col gap-4">
        <div className="flex flex-col bg-ink text-panel-fg">
          <div className="flex flex-wrap items-center gap-3 border-b border-white/10 px-4 py-3">
            <span className="font-mono text-label-xs uppercase tracking-[0.09em] text-panel-fg-muted">
              {skill.slug}
            </span>
            <span className="ml-auto flex items-center gap-2 font-mono text-label-xs uppercase tracking-[0.09em]">
              <span
                aria-hidden="true"
                className={cn(
                  'size-[7px]',
                  running ? 'animate-pulse bg-tint-cyan' : status === 'done' ? 'bg-lime-300' : status === 'stopped' ? 'bg-tint-blue' : 'bg-white/30',
                )}
              />
              <span className="text-panel-fg-muted">
                {status === 'idle' ? 'ready' : status === 'running' ? 'running' : status === 'done' ? 'complete' : 'stopped'}
              </span>
            </span>
            <span className="font-mono text-label-xs tabular-nums text-panel-fg-muted">{(elapsed / 1000).toFixed(1)}s</span>
          </div>

          <div className="relative h-1 w-full bg-white/10">
            <div
              className="absolute inset-y-0 left-0 bg-tint-cyan transition-[width] duration-200 ease-out"
              style={{ width: `${status === 'idle' ? 0 : progress}%` }}
            />
          </div>

          <div ref={logRef} className="h-[22rem] overflow-y-auto px-4 py-3" aria-live="polite" aria-busy={running}>
            {lines.length === 0 ? (
              <p className="font-mono text-mono-xs text-panel-fg-muted">
                <span className="text-lime-300">$</span> waiting — press “Run in browser” to execute this Skill.
              </p>
            ) : (
              <ol className="flex flex-col gap-1.5">
                {lines.map((line) => (
                  <li key={line.id} className={cn('flex gap-2 font-mono text-mono-xs leading-relaxed', LINE_TONE[line.kind])}>
                    <span className="w-2.5 flex-none select-none opacity-70">{PREFIX[line.kind]}</span>
                    <span className="whitespace-pre-wrap break-words">{line.text}</span>
                  </li>
                ))}
                {running ? <li aria-hidden="true" className="font-mono text-mono-xs text-lime-300">▍</li> : null}
              </ol>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-white/10 px-4 py-2.5 font-mono text-label-xs text-panel-fg-muted">
            <span>
              step {Math.min(stepsSeen, stepsTotal)}/{stepsTotal}
            </span>
            <span>{progress}%</span>
            <span className="ml-auto">{skill.price === 'free' ? 'free' : 'premium'} · {category.output}</span>
          </div>
        </div>

        {status === 'done' ? (
          <div className="flex flex-col gap-4 bg-surface p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-label-xs uppercase tracking-[0.09em] text-accent">Result</span>
              <span className="font-mono text-label-xs tabular-nums text-ink-subtle">
                {skill.art.title} · {skill.art.sub}
              </span>
            </div>
            <PixelFrame className="aspect-[16/9]">
              <SkillImage skill={skill} src={skillMainImage(skill)} className="absolute inset-0" />
            </PixelFrame>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={downloadTranscript}
                className="inline-flex items-center justify-center bg-ink px-5 py-2.5 text-body-sm font-medium text-canvas transition-colors hover:bg-tint-cyan hover:text-ink"
              >
                Download transcript
              </button>
              <button
                type="button"
                onClick={run}
                className="inline-flex items-center justify-center px-5 py-2.5 text-body-sm font-medium text-ink ring-1 ring-inset ring-line-control transition-colors hover:bg-tint-blue hover:text-tint-blue-fg hover:ring-0"
              >
                Run again
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
