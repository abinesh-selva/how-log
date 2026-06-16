export const COUNTRIES = [
  { value: "US", label: "United States" },
  { value: "GB", label: "United Kingdom" },
  { value: "CA", label: "Canada" },
  { value: "AU", label: "Australia" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
  { value: "IN", label: "India" },
  { value: "JP", label: "Japan" },
  { value: "NZ", label: "New Zealand" },
  { value: "IE", label: "Ireland" },
]

// Fixed-date public holidays per country
const FIXED: Record<string, { month: number; day: number }[]> = {
  US: [
    { month: 1, day: 1 },   // New Year's Day
    { month: 7, day: 4 },   // Independence Day
    { month: 11, day: 11 }, // Veterans Day
    { month: 12, day: 25 }, // Christmas
  ],
  GB: [
    { month: 1, day: 1 },
    { month: 12, day: 25 },
    { month: 12, day: 26 }, // Boxing Day
  ],
  CA: [
    { month: 1, day: 1 },
    { month: 7, day: 1 },   // Canada Day
    { month: 12, day: 25 },
    { month: 12, day: 26 },
  ],
  AU: [
    { month: 1, day: 1 },
    { month: 1, day: 26 },  // Australia Day
    { month: 12, day: 25 },
    { month: 12, day: 26 },
  ],
  DE: [
    { month: 1, day: 1 },
    { month: 10, day: 3 },  // German Unity Day
    { month: 12, day: 25 },
    { month: 12, day: 26 },
  ],
  FR: [
    { month: 1, day: 1 },
    { month: 5, day: 1 },   // Labour Day
    { month: 7, day: 14 },  // Bastille Day
    { month: 12, day: 25 },
  ],
  IN: [
    { month: 1, day: 26 },  // Republic Day
    { month: 8, day: 15 },  // Independence Day
    { month: 10, day: 2 },  // Gandhi Jayanti
  ],
  JP: [
    { month: 1, day: 1 },
    { month: 2, day: 11 },
    { month: 11, day: 3 },
    { month: 11, day: 23 },
  ],
  NZ: [
    { month: 1, day: 1 },
    { month: 2, day: 6 },   // Waitangi Day
    { month: 12, day: 25 },
    { month: 12, day: 26 },
  ],
  IE: [
    { month: 1, day: 1 },
    { month: 3, day: 17 },  // St Patrick's Day
    { month: 12, day: 25 },
    { month: 12, day: 26 },
  ],
}

export function getHolidayDates(countryCode: string, fromYear: number, toYear: number): Date[] {
  const fixed = FIXED[countryCode] ?? []
  const dates: Date[] = []
  for (let y = fromYear; y <= toYear; y++) {
    fixed.forEach(({ month, day }) => {
      dates.push(new Date(y, month - 1, day))
    })
  }
  return dates
}
