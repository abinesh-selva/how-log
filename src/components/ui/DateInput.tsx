"use client"

import { useRef } from "react"

interface DateInputProps {
  label?: string
  value: { day: string; month: string; year: string }
  onChange: (v: { day: string; month: string; year: string }) => void
  error?: string
  hint?: string
  maxDate?: boolean  // if true, clamp to today
}

export function DateInput({ label, value, onChange, error, hint }: DateInputProps) {
  const monthRef = useRef<HTMLInputElement>(null)
  const yearRef  = useRef<HTMLInputElement>(null)

  function handleDay(v: string) {
    const clean = v.replace(/\D/g, "").slice(0, 2)
    onChange({ ...value, day: clean })
    if (clean.length === 2) monthRef.current?.focus()
  }

  function handleMonth(v: string) {
    const clean = v.replace(/\D/g, "").slice(0, 2)
    onChange({ ...value, month: clean })
    if (clean.length === 2) yearRef.current?.focus()
  }

  function handleYear(v: string) {
    const clean = v.replace(/\D/g, "").slice(0, 4)
    onChange({ ...value, year: clean })
  }

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-semibold text-[var(--ink)] tracking-wide">{label}</label>
      )}
      <div className={`date-field ${error ? "!border-red-400" : ""}`}>
        <input
          type="text"
          inputMode="numeric"
          placeholder="DD"
          value={value.day}
          onChange={(e) => handleDay(e.target.value)}
          className="w-9"
          maxLength={2}
        />
        <span className="sep">/</span>
        <input
          ref={monthRef}
          type="text"
          inputMode="numeric"
          placeholder="MM"
          value={value.month}
          onChange={(e) => handleMonth(e.target.value)}
          className="w-9"
          maxLength={2}
        />
        <span className="sep">/</span>
        <input
          ref={yearRef}
          type="text"
          inputMode="numeric"
          placeholder="YYYY"
          value={value.year}
          onChange={(e) => handleYear(e.target.value)}
          className="w-14"
          maxLength={4}
        />
        <span className="ml-auto text-[#C4BEB6] pointer-events-none pl-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="3"/>
            <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        </span>
      </div>
      {hint && !error && <p className="text-xs text-[var(--ink-muted)]">{hint}</p>}
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  )
}

/** Parse { day, month, year } to a JS Date, returns null if invalid */
export function parseDateFields(v: { day: string; month: string; year: string }): Date | null {
  const d = parseInt(v.day, 10), m = parseInt(v.month, 10), y = parseInt(v.year, 10)
  if (isNaN(d) || isNaN(m) || isNaN(y) || y < 1000 || y > 9999) return null
  const date = new Date(y, m - 1, d)
  if (date.getMonth() !== m - 1) return null // invalid day for month
  return date
}
