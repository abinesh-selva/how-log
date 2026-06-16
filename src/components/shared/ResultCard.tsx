import { cn } from "@/lib/utils"

interface ResultCardProps {
  title?: string
  children: React.ReactNode
  className?: string
  variant?: "cream" | "teal" | "coral" | "green"
}

const VARIANTS = {
  cream: "bg-[var(--cream-card)] border border-[#D4CFC8]",
  teal:  "bg-[var(--teal)] text-white",
  coral: "bg-[var(--coral)] text-white",
  green: "bg-[var(--green)] text-white",
}

export function ResultCard({ title, children, className, variant = "cream" }: ResultCardProps) {
  return (
    <div className={cn("rounded-3xl p-6 md:p-8 animate-count", VARIANTS[variant], className)}>
      {title && (
        <h2 className={cn(
          "text-sm font-bold uppercase tracking-widest mb-5",
          variant === "cream" ? "text-[var(--ink-muted)]" : "opacity-70"
        )}>
          {title}
        </h2>
      )}
      {children}
    </div>
  )
}
