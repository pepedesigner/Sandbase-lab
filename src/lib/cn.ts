export function cn(...values: unknown[]) {
  return values.flat(Infinity).filter(Boolean).join(' ')
}
