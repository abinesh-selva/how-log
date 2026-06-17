// Custom SVG logo — a countdown ring mark
// r=9 circle: circumference ≈ 56.55  |  270° arc = 42.4  |  90° gap = 14.1

interface LogoProps {
  size?: number
}

export function LogoMark({ size = 32 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Squircle background */}
      <rect width="32" height="32" rx="9" fill="#0E3B36" />

      {/* Ghost ring (base track) */}
      <circle
        cx="16" cy="16" r="9"
        stroke="white" strokeWidth="1.5" strokeOpacity="0.12"
      />

      {/* Coral progress arc — 270° clockwise from 12 o'clock */}
      <circle
        cx="16" cy="16" r="9"
        stroke="#F07040" strokeWidth="2.5"
        strokeDasharray="42.4 14.1"
        strokeLinecap="round"
        transform="rotate(-90 16 16)"
      />

      {/* Centre pivot dot */}
      <circle cx="16" cy="16" r="2" fill="white" fillOpacity="0.75" />

      {/* Hour hand */}
      <line
        x1="16" y1="16" x2="16" y2="10"
        stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.9"
      />

      {/* Minute hand */}
      <line
        x1="16" y1="16" x2="21.5" y2="16"
        stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.7"
      />
    </svg>
  )
}

export function LogoMarkLight({ size = 32 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="32" height="32" rx="9" fill="white" fillOpacity="0.12" />
      <circle cx="16" cy="16" r="9" stroke="white" strokeWidth="1.5" strokeOpacity="0.2" />
      <circle
        cx="16" cy="16" r="9"
        stroke="white" strokeWidth="2.5"
        strokeDasharray="42.4 14.1"
        strokeLinecap="round"
        transform="rotate(-90 16 16)"
      />
      <circle cx="16" cy="16" r="2" fill="white" fillOpacity="0.8" />
      <line x1="16" y1="16" x2="16" y2="10" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="16" x2="21.5" y2="16" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.7" />
    </svg>
  )
}
