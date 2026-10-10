/** The poster's registration marks: a square in each corner, in the ground's text colour. */
export function CornerMarks({
  size = 10,
  className = 'bg-tint-fg',
}: {
  size?: number
  className?: string
}) {
  return (
    <>
      {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos) => (
        <span
          key={pos}
          aria-hidden="true"
          className={`absolute ${pos} ${className}`}
          style={{ width: size, height: size }}
        />
      ))}
    </>
  )
}
