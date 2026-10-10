'use client'

import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/cn'

/* The COPY affordance beside a command. `subject` names what is copied for
 * screen readers; the visual label stays the bare verb. */
export function CopyButton({
  text,
  subject,
  className,
}: {
  text: string
  subject: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)
  const resetTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => () => clearTimeout(resetTimer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      clearTimeout(resetTimer.current)
      resetTimer.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable: the command stays selectable.
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className={cn('shrink-0 font-mono text-label-xs font-medium uppercase transition-colors', className)}
      >
        {copied ? 'COPIED' : 'COPY'}
        <span className="sr-only"> {subject}</span>
      </button>
      <p role="status" aria-live="polite" className="sr-only">
        {copied ? `${subject} copied to clipboard` : ''}
      </p>
    </>
  )
}
