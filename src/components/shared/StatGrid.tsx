import { cn } from "@/lib/utils"

interface Stat {
  label: string
  value: string | number
  sub?: string
  highlight?: boolean
  accent?: "coral" | "teal" | "green" | "pink" | "blue"
}

interface StatGridProps {
  stats: Stat[]
  cols?: 2 | 3 | 4
  inverted?: boolean  // true when inside a dark colored card
}

const ACCENT_STYLES = {
  coral: "bg-[var(--coral)] text-white",
  teal:  "bg-[var(--teal)] text-white",
  green: "bg-[var(--green)] text-white",
  pink:  "bg-[var(--pink)] text-[var(--ink)]",
  blue:  "bg-[var(--blue-muted)] text-white",
}

export function StatGrid({ stats, cols = 4, inverted = false }: StatGridProps) {
  return (
    <div
      className={cn(
        "grid gap-3",
        cols === 2 && "grid-cols-2",
        cols === 3 && "grid-cols-2 sm:grid-cols-3",
        cols === 4 && "grid-cols-2 md:grid-cols-4"
      )}
    >
      {stats.map(({ label, value, sub, accent }, i) => (
        <div
          key={label}
          className={cn(
            "rounded-2xl p-5 text-center transition-transform hover:-translate-y-0.5",
            inverted
              ? i === 0
                ? "bg-white/20 text-white"
                : "bg-white/10 text-white"
              : accent
              ? ACCENT_STYLES[accent]
              : i === 0
              ? "bg-[var(--teal)] text-white"
              : "bg-[var(--cream-card)] text-[var(--ink)]"
          )}
        >
          <div className={cn(
            "text-2xl font-bold tabular-nums leading-none",
            inverted ? "text-white" : (!accent && i !== 0 ? "text-[var(--teal)]" : "")
          )}>
            {typeof value === "number" ? value.toLocaleString() : value}
          </div>
          <div className={cn(
            "text-xs font-semibold uppercase tracking-widest mt-2",
            inverted ? "text-white/60" : (accent || i === 0) ? "opacity-70" : "text-[var(--ink-muted)]"
          )}>
            {label}
          </div>
          {sub && (
            <div className={cn("text-xs mt-1", inverted ? "text-white/40" : (accent || i === 0) ? "opacity-50" : "text-[var(--ink-muted)]")}>
              {sub}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
