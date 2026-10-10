/** Links that leave the app get `target`/`rel`; on-page anchors do not. */
export function isExternal(href: string) {
  return /^https?:\/\//.test(href)
}

export function externalProps(href: string) {
  return isExternal(href)
    ? ({ target: '_blank', rel: 'noreferrer' } as const)
    : {}
}
