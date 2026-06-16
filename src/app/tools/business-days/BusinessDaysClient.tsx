"use client"

import { useState } from "react"
import { DateInput, parseDateFields } from "@/components/ui/DateInput"
import { Button } from "@/components/ui/Button"
import { Select } from "@/components/ui/Select"
import { StatGrid } from "@/components/shared/StatGrid"
import { ResultCard } from "@/components/shared/ResultCard"
import { COUNTRIES, getHolidayDates } from "./holidayData"

const EMPTY = { day: "", month: "", year: "" }

interface Result {
  calendarDays: number
  businessDays: number
  weekends: number
  holidays: number
  startFormatted: string
  endFormatted: string
}

function fmt(d: Date) {
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}

export function BusinessDaysClient() {
  const [start,   setStart]   = useState(EMPTY)
  const [end,     setEnd]     = useState(EMPTY)
  const [country, setCountry] = useState("US")
  const [result,  setResult]  = useState<Result | null>(null)
  const [error,   setError]   = useState("")

  function calculate() {
    setError("")
    const s = parseDateFields(start)
    const e = parseDateFields(end)
    if (!s || !e) { setError("Please fill in both dates with valid values."); return }

    const [earlier, later] = s <= e ? [s, e] : [e, s]
    const holidays = getHolidayDates(country, earlier.getFullYear(), later.getFullYear())
    const holidaySet = new Set(holidays.map((d) => d.toISOString().split("T")[0]))

    let calendarDays = 0, weekends = 0, holidayCount = 0, businessDays = 0
    const cur = new Date(earlier)
    while (cur <= later) {
      calendarDays++
      const dow = cur.getDay()
      const iso = cur.toISOString().split("T")[0]
      if (dow === 0 || dow === 6) { weekends++ }
      else if (holidaySet.has(iso)) { holidayCount++ }
      else { businessDays++ }
      cur.setDate(cur.getDate() + 1)
    }

    setResult({
      calendarDays,
      businessDays,
      weekends,
      holidays: holidayCount,
      startFormatted: fmt(earlier),
      endFormatted: fmt(later),
    })
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border-2 border-[#E8E3DC] p-6 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
          <DateInput label="Start Date" value={start} onChange={setStart} />
          <DateInput label="End Date"   value={end}   onChange={setEnd}   error={error} />
          <Select
            id="country"
            label="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            options={COUNTRIES}
          />
        </div>
        <Button variant="coral" size="lg" onClick={calculate} className="w-full sm:w-auto">
          Calculate Business Days
        </Button>
      </div>

      {result && (
        <ResultCard title={`${result.startFormatted} → ${result.endFormatted}`} variant="green">
          <p className="text-white/70 mb-6 text-sm">
            There are{" "}
            <strong className="text-white">{result.businessDays} business days</strong>{" "}
            between these dates ({result.calendarDays} calendar days total).
          </p>
          <StatGrid
            inverted
            stats={[
              { label: "Business Days",  value: result.businessDays, highlight: true },
              { label: "Calendar Days",  value: result.calendarDays               },
              { label: "Weekends",       value: result.weekends                   },
              { label: "Public Holidays",value: result.holidays                   },
            ]}
          />
        </ResultCard>
      )}
    </div>
  )
}
