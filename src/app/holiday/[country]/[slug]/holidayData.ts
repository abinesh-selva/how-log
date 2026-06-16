export interface HolidayDef {
  slug: string
  name: string
  emoji: string
  countryName: string
  description: string
  month: number
  day: number | null       // null = computed (Easter, Thanksgiving, etc.)
  getDate?: (year: number) => Date
}

function getNthWeekday(year: number, month: number, weekday: number, n: number): Date {
  const first = new Date(year, month - 1, 1)
  const diff = (weekday - first.getDay() + 7) % 7
  const date = new Date(year, month - 1, 1 + diff + (n - 1) * 7)
  return date
}

function getLastWeekday(year: number, month: number, weekday: number): Date {
  const last = new Date(year, month, 0) // last day of month
  const diff = (last.getDay() - weekday + 7) % 7
  return new Date(year, month - 1, last.getDate() - diff)
}

export const HOLIDAY_DATA: Record<string, HolidayDef[]> = {
  US: [
    {
      slug: "christmas",
      name: "Christmas Day",
      emoji: "🎄",
      countryName: "United States",
      description: "Christmas Day is celebrated on December 25 each year. It marks the birth of Jesus Christ for Christians, but is also widely observed as a cultural holiday involving gift-giving, family gatherings, and festive decorations.",
      month: 12,
      day: 25,
    },
    {
      slug: "thanksgiving",
      name: "Thanksgiving",
      emoji: "🦃",
      countryName: "United States",
      description: "US Thanksgiving is celebrated on the fourth Thursday of November. It is a national holiday for giving thanks for the harvest and blessings of the past year, traditionally observed with a large family meal.",
      month: 11,
      day: null,
      getDate: (year) => getNthWeekday(year, 11, 4, 4),
    },
    {
      slug: "new-years-day",
      name: "New Year's Day",
      emoji: "🎆",
      countryName: "United States",
      description: "New Year's Day is celebrated on January 1 each year. It marks the start of the new calendar year and is observed with fireworks, parties, and resolutions for the year ahead.",
      month: 1,
      day: 1,
    },
    {
      slug: "halloween",
      name: "Halloween",
      emoji: "🎃",
      countryName: "United States",
      description: "Halloween is observed on October 31 each year. It is celebrated with costumes, trick-or-treating, jack-o-lanterns, and spooky decorations. Its roots lie in the ancient Celtic festival of Samhain.",
      month: 10,
      day: 31,
    },
    {
      slug: "independence-day",
      name: "Independence Day",
      emoji: "🇺🇸",
      countryName: "United States",
      description: "Independence Day, commonly known as the Fourth of July, celebrates the adoption of the Declaration of Independence on July 4, 1776. It is observed with fireworks, parades, barbecues, and concerts.",
      month: 7,
      day: 4,
    },
    {
      slug: "valentines-day",
      name: "Valentine's Day",
      emoji: "❤️",
      countryName: "United States",
      description: "Valentine's Day is celebrated on February 14 each year. It is a day for expressing love and affection, typically through cards, flowers, chocolates, and gifts.",
      month: 2,
      day: 14,
    },
    {
      slug: "mothers-day",
      name: "Mother's Day",
      emoji: "💐",
      countryName: "United States",
      description: "Mother's Day in the United States is celebrated on the second Sunday of May. It honors mothers and motherhood with gifts, cards, and family gatherings.",
      month: 5,
      day: null,
      getDate: (year) => getNthWeekday(year, 5, 0, 2),
    },
    {
      slug: "fathers-day",
      name: "Father's Day",
      emoji: "👔",
      countryName: "United States",
      description: "Father's Day in the United States is celebrated on the third Sunday of June. It honors fathers and fatherhood with gifts, cards, and family gatherings.",
      month: 6,
      day: null,
      getDate: (year) => getNthWeekday(year, 6, 0, 3),
    },
  ],
  GB: [
    {
      slug: "christmas",
      name: "Christmas Day",
      emoji: "🎄",
      countryName: "United Kingdom",
      description: "Christmas Day is celebrated on December 25 in the United Kingdom. It is one of the most important public holidays, observed with family gatherings, gift exchanges, and traditional meals.",
      month: 12,
      day: 25,
    },
    {
      slug: "boxing-day",
      name: "Boxing Day",
      emoji: "📦",
      countryName: "United Kingdom",
      description: "Boxing Day is a public holiday on December 26 in the United Kingdom. Traditionally a day for giving gifts to those in need, it is now also associated with sporting events and shopping sales.",
      month: 12,
      day: 26,
    },
    {
      slug: "new-years-day",
      name: "New Year's Day",
      emoji: "🎆",
      countryName: "United Kingdom",
      description: "New Year's Day is a public holiday on January 1 in the United Kingdom. It marks the start of the calendar year and is associated with resolutions, celebrations, and fireworks.",
      month: 1,
      day: 1,
    },
  ],
}

export function getNextOccurrence(holiday: HolidayDef): Date {
  const now = new Date()
  const currentYear = now.getFullYear()

  for (const year of [currentYear, currentYear + 1]) {
    const date = holiday.getDate
      ? holiday.getDate(year)
      : new Date(year, holiday.month - 1, holiday.day!)
    if (date > now) return date
  }

  // Fallback — next year
  return holiday.getDate
    ? holiday.getDate(currentYear + 1)
    : new Date(currentYear + 1, holiday.month - 1, holiday.day!)
}
