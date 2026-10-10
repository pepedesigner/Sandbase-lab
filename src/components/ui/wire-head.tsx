import type { ReactNode } from 'react'

/* Section header: title, lede beneath it, optional action on the right. */
export function WireHead({
  title,
  lede,
  titleId,
  action,
  dark,
}: {
  title: ReactNode
  lede?: ReactNode
  titleId?: string
  action?: ReactNode
  dark?: boolean
}) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
      <div className="flex flex-col gap-3.5">
        <h2
          id={titleId}
          className={`max-w-[34ch] text-h2 text-balance ${dark ? 'text-panel-fg' : 'text-ink'}`}
        >
          {title}
        </h2>
        {lede ? (
          <p
            className={`max-w-[36rem] text-lede text-pretty ${dark ? 'text-panel-fg-muted' : 'text-ink-muted'}`}
          >
            {lede}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0 md:pb-1">{action}</div> : null}
    </div>
  )
}
