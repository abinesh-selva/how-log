"use client"

import { useState } from "react"
import { DateInput, parseDateFields } from "@/components/ui/DateInput"
import { Button } from "@/components/ui/Button"
import { ResultCard } from "@/components/shared/ResultCard"

const DAY_NAMES   = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"]

interface Result {
  dayName: string
  dayIndex: number
  dateFormatted: string
  weekCalendar: { date: Date; isTarget: boolean }[]
}

const EMPTY = { day: "", month: "", year: "" }

export function DayOfWeekClient() {
  const [date,   setDate]   = useState(EMPTY)
  const [result, setResult] = useState<Result | null>(null)
  const [error,  setError]  = useState("")

  function calculate() {
    setError("")
    const d = parseDateFields(date)
    if (!d) { setError("Please enter a valid date (DD / MM / YYYY)."); return }

    // Use noon to avoid DST edge cases
    const noon = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12)
    const dayIndex = noon.getDay()
    const dateFormatted = `${MONTH_NAMES[noon.getMonth()]} ${noon.getDate()}, ${noon.getFullYear()}`

    const startOfWeek = new Date(noon)
    const diff = noon.getDay() === 0 ? -6 : 1 - noon.getDay()
    startOfWeek.setDate(noon.getDate() + diff)

    const weekCalendar = Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      return { date: day, isTarget: day.toDateString() === noon.toDateString() }
    })

    setResult({ dayName: DAY_NAMES[dayIndex], dayIndex, dateFormatted, weekCalendar })
  }

  const isWeekend = result && (result.dayIndex === 0 || result.dayIndex === 6)

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border-2 border-[#E8E3DC] p-6 md:p-8">
        <div className="flex flex-col sm:flex-row gap-5 items-end">
          <div className="flex-1">
            <DateInput
              label="Enter any date"
              value={date}
              onChange={setDate}
              error={error}
              hint="Works for any date — past or future."
            />
          </div>
          <Button variant="coral" size="lg" onClick={calculate} className="w-full sm:w-auto">
            Find Day
          </Button>
        </div>
      </div>

      {result && (
        <ResultCard variant={isWeekend ? "coral" : "teal"}>
          <div className="text-center mb-8">
            <p className="text-white/60 text-sm mb-2">{result.dateFormatted} fell on a</p>
            <p className="text-5xl md:text-6xl font-bold text-white">{result.dayName}</p>
            {isWeekend && <p className="text-white/50 text-xs mt-2 font-semibold uppercase tracking-widest">Weekend</p>}
          </div>

          {/* Mini week calendar */}
          <div className="border-t border-white/10 pt-5">
            <p className="text-xs text-white/40 text-center mb-4 uppercase tracking-wider font-semibold">Week View</p>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d) => (
                <div key={d} className="font-bold text-white/40 pb-2">{d}</div>
              ))}
              {result.weekCalendar.map(({ date: d, isTarget }, i) => (
                <div
                  key={i}
                  className={`rounded-xl py-2.5 font-semibold transition-colors ${
                    isTarget
                      ? "bg-white text-[var(--teal)] shadow-sm"
                      : (d.getDay() === 0 || d.getDay() === 6)
                      ? "text-white/30"
                      : "text-white/70"
                  }`}
                >
                  {d.getDate()}
                </div>
              ))}
            </div>
          </div>
        </ResultCard>
      )}
    </div>
  )
}
