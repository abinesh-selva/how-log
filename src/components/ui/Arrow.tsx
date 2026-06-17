interface ArrowProps {
  size?: number
  className?: string
  direction?: "right" | "left" | "up" | "down"
}

const ROTATE = { right: 0, down: 90, left: 180, up: 270 }

export function Arrow({ size = 14, className = "", direction = "right" }: ArrowProps) {
  const deg = ROTATE[direction]
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className={className}
      style={deg ? { transform: `rotate(${deg}deg)` } : undefined}
    >
      <path
        d="M2 7h10M8 3.5l4 3.5-4 3.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
