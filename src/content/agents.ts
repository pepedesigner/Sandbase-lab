export interface AgentRef {
  key: string
  label: string
  logo: string
}

/** Coding agents / hosts a Skill can run inside. Logos live in /public/logos/agents. */
export const AGENTS: Record<string, AgentRef> = {
  'claude-code': { key: 'claude-code', label: 'Claude Code', logo: '/logos/agents/claude-code.png' },
  codex: { key: 'codex', label: 'Codex', logo: '/logos/agents/codex.png' },
  chatgpt: { key: 'chatgpt', label: 'ChatGPT', logo: '/logos/agents/chatgpt.svg' },
  cursor: { key: 'cursor', label: 'Cursor', logo: '/logos/agents/cursor.png' },
  gemini: { key: 'gemini', label: 'Gemini CLI', logo: '/logos/agents/gemini-cli.png' },
  antigravity: { key: 'antigravity', label: 'Antigravity', logo: '/logos/agents/antigravity.png' },
  opencode: { key: 'opencode', label: 'OpenCode', logo: '/logos/agents/opencode.jpg' },
  openclaw: { key: 'openclaw', label: 'OpenClaw', logo: '/logos/agents/openclaw.png' },
  hermes: { key: 'hermes', label: 'Hermes', logo: '/logos/agents/hermes.png' },
  windsurf: { key: 'windsurf', label: 'Windsurf', logo: '/logos/agents/windsurf.png' },
  warp: { key: 'warp', label: 'Warp', logo: '/logos/agents/warp.png' },
  trae: { key: 'trae', label: 'TRAE', logo: '/logos/agents/trae.png' },
  kimi: { key: 'kimi', label: 'Kimi CLI', logo: '/logos/agents/kimi-cli.png' },
  qwen: { key: 'qwen', label: 'Qwen Code', logo: '/logos/agents/qwen-code.jpg' },
  kiro: { key: 'kiro', label: 'Kiro', logo: '/logos/agents/kiro-cli.svg' },
  amp: { key: 'amp', label: 'Amp', logo: '/logos/agents/amp.jpg' },
}

export const AGENT_ORDER = [
  'claude-code',
  'codex',
  'chatgpt',
  'cursor',
  'gemini',
  'antigravity',
  'opencode',
  'openclaw',
  'hermes',
  'windsurf',
  'warp',
  'trae',
  'kimi',
  'qwen',
  'kiro',
  'amp',
]
