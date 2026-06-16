import { cn } from "@/lib/utils"
import { type ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "coral" | "teal" | "ghost" | "outline"
  size?: "sm" | "md" | "lg"
}

export function Button({
  variant = "coral",
  size = "md",
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-200",
        "disabled:opacity-50 disabled:cursor-not-allowed select-none",
        variant === "coral"   && "bg-[var(--coral)] hover:bg-[var(--coral-dark)] text-white shadow-sm hover:shadow-md active:scale-[0.98]",
        variant === "teal"    && "bg-[var(--teal)] hover:bg-[var(--teal-mid)] text-white shadow-sm hover:shadow-md active:scale-[0.98]",
        variant === "outline" && "border-2 border-[var(--coral)] text-[var(--coral)] hover:bg-[var(--coral)] hover:text-white active:scale-[0.98]",
        variant === "ghost"   && "text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--cream-card)]",
        size === "sm" && "px-4 py-2 text-sm gap-1.5",
        size === "md" && "px-6 py-3 text-sm gap-2",
        size === "lg" && "px-8 py-4 text-base gap-2",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
