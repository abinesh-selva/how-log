"use client"

import { useState } from "react"
import { DateInput, parseDateFields } from "@/components/ui/DateInput"
import { NumberStepper } from "@/components/ui/NumberStepper"
import { Button } from "@/components/ui/Button"
import { Select } from "@/components/ui/Select"
import { ResultCard } from "@/components/shared/ResultCard"

type Mode = "add" | "subtract"
type Unit = "days" | "weeks" | "months" | "years"

const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"]
const DAY_NAMES   = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

function fmt(d: Date) {
  return `${MONTH_NAMES[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} (${DAY_NAMES[d.getDay()]})`
}

const EMPTY = { day: "", month: "", year: "" }

export function DateCalculatorClient() {
  const today = new Date()
  const [startDate, setStartDate] = useState({
    day:   String(today.getDate()).padStart(2, "0"),
    month: String(today.getMonth() + 1).padStart(2, "0"),
    year:  String(today.getFullYear()),
  })
  const [amount, setAmount]   = useState(30)
  const [unit, setUnit]       = useState<Unit>("days")
  const [mode, setMode]       = useState<Mode>("add")
  const [result, setResult]   = useState<{ date: Date; formatted: string } | null>(null)
  const [error,  setError]    = useState("")

  function calculate() {
    setError("")
    const base = parseDateFields(startDate)
    if (!base) { setError("Please enter a valid start date."); return }
    if (amount < 0) { setError("Please enter a positive number."); return }

    const out = new Date(base.getFullYear(), base.getMonth(), base.getDate(), 12)
    const sign = mode === "add" ? 1 : -1

    if (unit === "days")   out.setDate(out.getDate() + sign * amount)
    if (unit === "weeks")  out.setDate(out.getDate() + sign * amount * 7)
    if (unit === "months") out.setMonth(out.getMonth() + sign * amount)
    if (unit === "years")  out.setFullYear(out.getFullYear() + sign * amount)

    setResult({ date: out, formatted: fmt(out) })
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border-2 border-[#E8E3DC] p-6 md:p-8 space-y-6">
        <DateInput label="Start Date" value={startDate} onChange={setStartDate} />

        {/* Add / Subtract toggle */}
        <div>
          <p className="text-sm font-semibold text-[var(--ink)] mb-2 tracking-wide">Operation</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setMode("add")}
              className={`flex-1 py-3 rounded-2xl text-sm font-bold border-2 transition-colors ${
                mode === "add"
                  ? "bg-[var(--teal)] text-white border-[var(--teal)]"
                  : "bg-white text-[var(--ink-muted)] border-[#D4CFC8] hover:border-[var(--teal)]/50"
              }`}
            >
              + Add
            </button>
            <button
              type="button"
              onClick={() => setMode("subtract")}
              className={`flex-1 py-3 rounded-2xl text-sm font-bold border-2 transition-colors ${
                mode === "subtract"
                  ? "bg-[var(--coral)] text-white border-[var(--coral)]"
                  : "bg-white text-[var(--ink-muted)] border-[#D4CFC8] hover:border-[var(--coral)]/50"
              }`}
            >
              − Subtract
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <NumberStepper
            label="Amount"
            value={amount}
            onChange={setAmount}
            min={1}
            max={9999}
          />
          <Select
            id="dc-unit"
            label="Unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value as Unit)}
            options={[
              { value: "days",   label: "Days"   },
              { value: "weeks",  label: "Weeks"  },
              { value: "months", label: "Months" },
              { value: "years",  label: "Years"  },
            ]}
          />
        </div>

        {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

        <Button variant="coral" size="lg" onClick={calculate} className="w-full">
          Calculate Date
        </Button>
      </div>

      {result && (
        <ResultCard variant={mode === "add" ? "teal" : "coral"}>
          <p className="text-white/60 text-sm text-center mb-3">
            {mode === "add" ? "Adding" : "Subtracting"} {amount} {unit}
            {" "}{mode === "add" ? "to" : "from"}{" "}
            {MONTH_NAMES[parseDateFields(startDate)!.getMonth()]}{" "}
            {parseDateFields(startDate)!.getDate()},{" "}
            {parseDateFields(startDate)!.getFullYear()}
          </p>
          <p className="text-center text-2xl md:text-3xl font-bold text-white">{result.formatted}</p>
        </ResultCard>
      )}
    </div>
  )
}
