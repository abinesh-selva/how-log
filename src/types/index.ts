export type TimeUnit = "years" | "months" | "weeks" | "days" | "hours" | "minutes" | "seconds"

export interface TimeDifference {
  years: number
  months: number
  weeks: number
  days: number
  hours: number
  minutes: number
  seconds: number
  totalDays: number
  totalHours: number
  totalMinutes: number
  totalSeconds: number
  isPast: boolean
}

export interface AgeResult {
  years: number
  months: number
  weeks: number
  days: number
  hours: number
  totalDays: number
  nextBirthday: Date
  daysUntilNextBirthday: number
  lifeStats: LifeStats
}

export interface LifeStats {
  heartbeats: number
  breaths: number
  sleepHours: number
  fullMoons: number
  leapYears: number
}

export interface BusinessDayResult {
  businessDays: number
  calendarDays: number
  weekends: number
  holidays: number
  startDate: Date
  endDate: Date
}

export interface Holiday {
  name: string
  date: Date
  country: string
  countryCode: string
  type: "public" | "observance" | "optional"
}

export interface Countdown {
  id: string
  title: string
  targetDate: Date
  timezone: string
  theme: CountdownTheme
  isRecurring: boolean
  userId?: string
  shareToken: string
  createdAt: Date
}

export type CountdownTheme =
  | "birthday"
  | "wedding"
  | "holiday"
  | "retirement"
  | "baby"
  | "graduation"
  | "anniversary"
  | "default"

export interface ParsedDateInput {
  date: Date | null
  confidence: "high" | "medium" | "low"
  parsedBy: "regex" | "ai"
  originalInput: string
}
