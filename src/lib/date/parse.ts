import { DateTime } from "luxon"
import type { ParsedDateInput } from "@/types"

// Common date patterns — try these before calling the AI
const PATTERNS: { regex: RegExp; parse: (m: RegExpMatchArray) => Date | null }[] = [
  {
    // ISO: 2024-03-15
    regex: /^(\d{4})-(\d{2})-(\d{2})$/,
    parse: (m) => new Date(`${m[1]}-${m[2]}-${m[3]}`),
  },
  {
    // MM/DD/YYYY or M/D/YYYY
    regex: /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,
    parse: (m) => new Date(`${m[3]}-${m[1].padStart(2, "0")}-${m[2].padStart(2, "0")}`),
  },
  {
    // "March 15 2024" or "March 15, 2024"
    regex: /^([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})$/,
    parse: (m) => {
      const dt = DateTime.fromFormat(`${m[1]} ${m[2]} ${m[3]}`, "MMMM d yyyy")
      return dt.isValid ? dt.toJSDate() : null
    },
  },
  {
    // Just a year: "1985"
    regex: /^(\d{4})$/,
    parse: (m) => new Date(`${m[1]}-01-01`),
  },
]

export function tryParseDate(input: string): ParsedDateInput {
  const trimmed = input.trim()

  for (const { regex, parse } of PATTERNS) {
    const match = trimmed.match(regex)
    if (match) {
      const date = parse(match)
      if (date && !isNaN(date.getTime())) {
        return { date, confidence: "high", parsedBy: "regex", originalInput: input }
      }
    }
  }

  return { date: null, confidence: "low", parsedBy: "regex", originalInput: input }
}

export function isNaturalLanguage(input: string): boolean {
  const parsed = tryParseDate(input)
  return parsed.date === null
}
