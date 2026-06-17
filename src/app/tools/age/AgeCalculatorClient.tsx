"use client"

import { useState } from "react"
import { DateInput, parseDateFields } from "@/components/ui/DateInput"
import { Button } from "@/components/ui/Button"
import { StatGrid } from "@/components/shared/StatGrid"
import { ResultCard } from "@/components/shared/ResultCard"
import type { AgeResult } from "@/types"
import { getZodiacSign, getZodiacEmoji } from "@/lib/date/zodiac"

const EMPTY = { day: "", month: "", year: "" }

export function AgeCalculatorClient() {
  const [dob, setDob] = useState(EMPTY)
  const [result, setResult] = useState<AgeResult | null>(null)
  const [error, setError] = useState("")

  function calculate() {
    setError("")
    const birth = parseDateFields(dob)
    if (!birth) { setError("Please enter a valid date of birth (DD / MM / YYYY)."); return }
    if (birth > new Date()) { setError("Date of birth cannot be in the future."); return }

    const now = new Date()
    let years = now.getFullYear() - birth.getFullYear()
    let months = now.getMonth() - birth.getMonth()
    let days = now.getDate() - birth.getDate()

    if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate() }
    if (months < 0) { years--; months += 12 }

    const totalMs = now.getTime() - birth.getTime()
    const totalDays = Math.floor(totalMs / 86400000)
    const totalHours = Math.floor(totalMs / 3600000)

    const thisYearBd = new Date(now.getFullYear(), birth.getMonth(), birth.getDate())
    const nextBd = thisYearBd >= now
      ? thisYearBd
      : new Date(now.getFullYear() + 1, birth.getMonth(), birth.getDate())
    const daysUntilNextBd = Math.ceil((nextBd.getTime() - now.getTime()) / 86400000)

    setResult({
      years,
      months,
      weeks: Math.floor(totalDays / 7),
      days,
      hours: totalHours,
      totalDays,
      nextBirthday: nextBd,
      daysUntilNextBirthday: daysUntilNextBd,
      lifeStats: {
        heartbeats: Math.floor(totalDays * 86400 * 1.1667),
        breaths: Math.floor(totalDays * 86400 * 0.267),
        sleepHours: Math.floor(totalDays * 8),
        fullMoons: Math.floor(totalDays / 29.53),
        leapYears: Math.floor(years / 4),
      },
    })
  }

  const mainStats = result ? [
    { label: "Years",  value: result.years,                      highlight: true },
    { label: "Months", value: result.years * 12 + result.months              },
    { label: "Weeks",  value: Math.floor(result.totalDays / 7)               },
    { label: "Days",   value: result.totalDays                               },
  ] : []

  const birthDay = parseInt(dob.day, 10)
  const birthMonth = parseInt(dob.month, 10)
  const zodiac = birthDay && birthMonth ? getZodiacSign(birthDay, birthMonth) : ""
  const zodiacEmoji = zodiac ? getZodiacEmoji(zodiac) : ""

  const lifeStats = result ? [
    { label: "Zodiac Sign",      value: `${zodiac} ${zodiacEmoji}`                   },
    { label: "Heartbeats",       value: result.lifeStats.heartbeats.toLocaleString() },
    { label: "Breaths",          value: result.lifeStats.breaths.toLocaleString()    },
    { label: "Hours Slept",      value: result.lifeStats.sleepHours.toLocaleString() },
    { label: "Full Moons",       value: result.lifeStats.fullMoons                  },
    { label: "Leap Years Lived", value: result.lifeStats.leapYears                  },
    { label: "Next Birthday In", value: `${result.daysUntilNextBirthday} days`      },
  ] : []

  return (
    <div className="space-y-6">
      {/* Input card */}
      <div className="bg-white rounded-3xl border-2 border-[#E8E3DC] p-6 md:p-8">
        <div className="flex flex-col sm:flex-row gap-5 items-end">
          <div className="flex-1">
            <DateInput
              label="Date of Birth"
              value={dob}
              onChange={setDob}
              error={error}
              hint="Enter your birth date — we'll do the rest."
            />
          </div>
          <Button variant="coral" size="lg" onClick={calculate} className="w-full sm:w-auto">
            Calculate Age
          </Button>
        </div>
      </div>

      {/* Results */}
      {result && (
        <>
          <ResultCard title="Your Exact Age" variant="teal">
            <p className="text-white/70 mb-6 text-sm">
              You are exactly{" "}
              <strong className="text-white">
                {result.years} years, {result.months} months, and {result.days} days
              </strong>{" "}
              old.
            </p>
            <StatGrid stats={mainStats} cols={4} inverted />
          </ResultCard>

          <ResultCard title="Life Statistics" variant="cream">
            <p className="text-[var(--ink-muted)] mb-6 text-sm">
              Some fascinating numbers from your {result.totalDays.toLocaleString()} days on Earth:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              {lifeStats.map(({ label, value }) => (
                <div key={label} className="text-center">
                  <p className="text-xl font-bold text-[var(--coral)]">{value}</p>
                  <p className="text-xs text-[var(--ink-muted)] mt-1">{label}</p>
                </div>
              ))}
            </div>
          </ResultCard>
        </>
      )}
    </div>
  )
}
