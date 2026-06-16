import { DateTime, Duration } from "luxon"
import type { TimeDifference, AgeResult, BusinessDayResult, LifeStats } from "@/types"

export function getTimeDifference(from: Date, to: Date): TimeDifference {
  const fromDT = DateTime.fromJSDate(from)
  const toDT = DateTime.fromJSDate(to)
  const isPast = toDT < fromDT

  const [earlier, later] = isPast ? [toDT, fromDT] : [fromDT, toDT]
  const diff = later.diff(earlier, ["years", "months", "weeks", "days", "hours", "minutes", "seconds"]).toObject()

  const totalSeconds = Math.abs(later.diff(earlier, "seconds").seconds)
  const totalMinutes = Math.abs(later.diff(earlier, "minutes").minutes)
  const totalHours = Math.abs(later.diff(earlier, "hours").hours)
  const totalDays = Math.abs(later.diff(earlier, "days").days)

  return {
    years: Math.floor(diff.years ?? 0),
    months: Math.floor(diff.months ?? 0),
    weeks: Math.floor(diff.weeks ?? 0),
    days: Math.floor(diff.days ?? 0),
    hours: Math.floor(diff.hours ?? 0),
    minutes: Math.floor(diff.minutes ?? 0),
    seconds: Math.floor(diff.seconds ?? 0),
    totalDays: Math.floor(totalDays),
    totalHours: Math.floor(totalHours),
    totalMinutes: Math.floor(totalMinutes),
    totalSeconds: Math.floor(totalSeconds),
    isPast,
  }
}

export function calculateAge(birthDate: Date, referenceDate: Date = new Date()): AgeResult {
  const birth = DateTime.fromJSDate(birthDate)
  const ref = DateTime.fromJSDate(referenceDate)

  const diff = ref.diff(birth, ["years", "months", "weeks", "days", "hours"]).toObject()
  const totalDays = Math.floor(ref.diff(birth, "days").days)

  const thisYearBirthday = birth.set({ year: ref.year })
  const nextBirthdayDT =
    thisYearBirthday >= ref ? thisYearBirthday : thisYearBirthday.plus({ years: 1 })
  const daysUntilNextBirthday = Math.ceil(nextBirthdayDT.diff(ref, "days").days)

  return {
    years: Math.floor(diff.years ?? 0),
    months: Math.floor(diff.months ?? 0),
    weeks: Math.floor(diff.weeks ?? 0),
    days: Math.floor(diff.days ?? 0),
    hours: Math.floor(diff.hours ?? 0),
    totalDays,
    nextBirthday: nextBirthdayDT.toJSDate(),
    daysUntilNextBirthday,
    lifeStats: calculateLifeStats(totalDays),
  }
}

function calculateLifeStats(totalDays: number): LifeStats {
  const totalSeconds = totalDays * 86400
  return {
    heartbeats: Math.floor(totalSeconds * 1.1667), // ~70 bpm
    breaths: Math.floor(totalSeconds * 0.267),      // ~16 breaths/min
    sleepHours: Math.floor(totalDays * 8),
    fullMoons: Math.floor(totalDays / 29.53),
    leapYears: Math.floor(totalDays / 365.25 / 4),
  }
}

export function addToDate(
  date: Date,
  amount: number,
  unit: "days" | "weeks" | "months" | "years"
): Date {
  const dt = DateTime.fromJSDate(date)
  return dt.plus({ [unit]: amount }).toJSDate()
}

export function subtractFromDate(
  date: Date,
  amount: number,
  unit: "days" | "weeks" | "months" | "years"
): Date {
  const dt = DateTime.fromJSDate(date)
  return dt.minus({ [unit]: amount }).toJSDate()
}

export function getDayOfWeek(date: Date): string {
  return DateTime.fromJSDate(date).toFormat("cccc")
}

export function formatDate(date: Date, format: string = "MMMM d, yyyy"): string {
  return DateTime.fromJSDate(date).toFormat(format)
}

export function parseYearMonthDay(
  year: number,
  month: number,
  day: number
): Date {
  return DateTime.fromObject({ year, month, day }).toJSDate()
}

export function getNow(): Date {
  return new Date()
}
