"use client"

import { useState } from "react"
import { DateInput, parseDateFields } from "@/components/ui/DateInput"
import { Button } from "@/components/ui/Button"
import { StatGrid } from "@/components/shared/StatGrid"
import { ResultCard } from "@/components/shared/ResultCard"

const EMPTY = { day: "", month: "", year: "" }

interface Result {
  totalDays: number
  weeks: number
  remainderDays: number
  months: number
  years: number
  startFormatted: string
  endFormatted: string
}

function fmt(d: Date) {
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}

export function DaysBetweenClient() {
  const [start, setStart] = useState(EMPTY)
  const [end, setEnd]     = useState(EMPTY)
  const [result, setResult] = useState<Result | null>(null)
  const [error, setError]   = useState("")

  function calculate() {
    setError("")
    const s = parseDateFields(start)
    const e = parseDateFields(end)
    if (!s || !e) { setError("Please fill in both dates with valid values."); return }
    if (s.getTime() === e.getTime()) { setError("The two dates are the same."); return }

    const [earlier, later] = s <= e ? [s, e] : [e, s]
    const totalDays = Math.round((later.getTime() - earlier.getTime()) / 86400000)
    const weeks = Math.floor(totalDays / 7)
    const remainderDays = totalDays % 7

    let years = later.getFullYear() - earlier.getFullYear()
    let months = later.getMonth() - earlier.getMonth()
    if (months < 0) { years--; months += 12 }

    setResult({
      totalDays,
      weeks,
      remainderDays,
      months: years * 12 + months,
      years,
      startFormatted: fmt(earlier),
      endFormatted: fmt(later),
    })
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border-2 border-[#E8E3DC] p-6 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
          <DateInput label="Start Date" value={start} onChange={setStart} />
          <DateInput label="End Date" value={end} onChange={setEnd} error={error} />
        </div>
        <Button variant="coral" size="lg" onClick={calculate} className="w-full sm:w-auto">
          Calculate Days
        </Button>
      </div>

      {result && (
        <ResultCard title={`${result.startFormatted} → ${result.endFormatted}`} variant="teal">
          <p className="text-white/70 mb-6 text-sm">
            There are exactly{" "}
            <strong className="text-white">{result.totalDays.toLocaleString()} days</strong>{" "}
            between these two dates.
          </p>
          <StatGrid
            inverted
            stats={[
              { label: "Days",   value: result.totalDays,        highlight: true },
              { label: "Weeks",  value: result.weeks,            sub: `+ ${result.remainderDays} days` },
              { label: "Months", value: result.months                            },
              { label: "Years",  value: result.years,            sub: `+ ${result.months % 12} months` },
            ]}
          />
        </ResultCard>
      )}
    </div>
  )
}
