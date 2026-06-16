"use client"

interface NumberStepperProps {
  label?: string
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
  hint?: string
}

export function NumberStepper({ label, value, onChange, min = 0, max = 9999, hint }: NumberStepperProps) {
  function dec() { if (value > min) onChange(value - 1) }
  function inc() { if (value < max) onChange(value + 1) }

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-semibold text-[var(--ink)] tracking-wide">{label}</label>
      )}
      <div className="stepper">
        <button type="button" onClick={dec} aria-label="decrease">−</button>
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          onChange={(e) => {
            const n = parseInt(e.target.value, 10)
            if (!isNaN(n) && n >= min && n <= max) onChange(n)
          }}
          className="w-16"
        />
        <button type="button" onClick={inc} aria-label="increase">+</button>
      </div>
      {hint && <p className="text-xs text-[var(--ink-muted)]">{hint}</p>}
    </div>
  )
}
