import { DateTime } from "luxon"
import type { BusinessDayResult, Holiday } from "@/types"

export function calculateBusinessDays(
  startDate: Date,
  endDate: Date,
  holidays: Holiday[] = []
): BusinessDayResult {
  const start = DateTime.fromJSDate(startDate).startOf("day")
  const end = DateTime.fromJSDate(endDate).startOf("day")

  const [earlier, later] = start <= end ? [start, end] : [end, start]

  const holidaySet = new Set(
    holidays.map((h) => DateTime.fromJSDate(h.date).toISODate())
  )

  let calendarDays = 0
  let weekends = 0
  let holidayCount = 0
  let businessDays = 0

  let current = earlier
  while (current <= later) {
    calendarDays++
    const dayOfWeek = current.weekday // 6 = Sat, 7 = Sun (Luxon ISO weekday)
    const iso = current.toISODate()!

    if (dayOfWeek === 6 || dayOfWeek === 7) {
      weekends++
    } else if (holidaySet.has(iso)) {
      holidayCount++
    } else {
      businessDays++
    }
    current = current.plus({ days: 1 })
  }

  return {
    businessDays,
    calendarDays,
    weekends,
    holidays: holidayCount,
    startDate: earlier.toJSDate(),
    endDate: later.toJSDate(),
  }
}

export function addBusinessDays(startDate: Date, days: number, holidays: Holiday[] = []): Date {
  const holidaySet = new Set(
    holidays.map((h) => DateTime.fromJSDate(h.date).toISODate())
  )

  let current = DateTime.fromJSDate(startDate).startOf("day")
  let remaining = Math.abs(days)
  const direction = days >= 0 ? 1 : -1

  while (remaining > 0) {
    current = current.plus({ days: direction })
    const dayOfWeek = current.weekday
    const iso = current.toISODate()!
    if (dayOfWeek !== 6 && dayOfWeek !== 7 && !holidaySet.has(iso)) {
      remaining--
    }
  }

  return current.toJSDate()
}
