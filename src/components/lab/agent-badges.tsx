import { AGENT_ORDER, AGENTS, type AgentRef } from '@/content/agents'
import { cn } from '@/lib/cn'

/** Brand logos ship for light backgrounds, so they sit on a small paper chip. */
export function AgentChip({ agent, size = 26, className }: { agent: AgentRef; size?: number; className?: string }) {
  return (
    <span
      title={agent.label}
      className={cn('inline-grid flex-none place-items-center bg-white ring-1 ring-black/10', className)}
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={agent.logo} alt={agent.label} width={size - 10} height={size - 10} style={{ width: size - 10, height: size - 10, objectFit: 'contain' }} loading="lazy" />
    </span>
  )
}

export function AgentRow({
  agents,
  size = 26,
  limit,
  className,
}: {
  agents: AgentRef[]
  size?: number
  limit?: number
  className?: string
}) {
  const shown = limit ? agents.slice(0, limit) : agents
  const extra = limit ? agents.length - shown.length : 0
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      {shown.map((agent) => (
        <AgentChip key={agent.key} agent={agent} size={size} />
      ))}
      {extra > 0 ? (
        <span className="font-mono text-label-xs text-ink-muted" aria-label={`${extra} more`}>
          +{extra}
        </span>
      ) : null}
    </div>
  )
}

/** The static "Works with" strip from the hero. */
export function WorksWithStrip({ className }: { className?: string }) {
  const agents = AGENT_ORDER.map((key) => AGENTS[key]).filter(Boolean)
  return (
    <div className={cn('flex flex-wrap items-center gap-2.5', className)}>
      {agents.map((agent) => (
        <AgentChip key={agent.key} agent={agent} size={30} />
      ))}
      <span className="ml-1 font-mono text-label-xs uppercase tracking-[0.08em] text-ink-muted">and more</span>
    </div>
  )
}
