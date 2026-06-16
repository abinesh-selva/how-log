import { cn } from "@/lib/utils"
import { type InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
}

export function Input({ label, hint, error, className, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-[var(--ink)] tracking-wide">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "w-full h-[52px] px-4 rounded-2xl border-2 border-[#D4CFC8] bg-white",
          "text-[15px] font-medium text-[var(--ink)] placeholder:text-[#B8B2AA]",
          "outline-none transition-all duration-200",
          "focus:border-[var(--coral)] focus:shadow-[0_0_0_3px_rgba(240,112,64,0.15)]",
          error && "border-red-400 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]",
          className
        )}
        {...props}
      />
      {hint && !error && <p className="text-xs text-[var(--ink-muted)]">{hint}</p>}
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  )
}
