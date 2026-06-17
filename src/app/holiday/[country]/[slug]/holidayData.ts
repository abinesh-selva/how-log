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
  IN: [
    {
      slug: "diwali",
      name: "Diwali",
      emoji: "🪔",
      countryName: "India",
      description: "Diwali is the Hindu festival of lights, symbolizing the spiritual victory of light over darkness, good over evil, and knowledge over ignorance.",
      month: 11, // approx, used for generic sorting if needed
      day: null,
      getDate: (year) => {
        const dates: Record<number, string> = { 2024: "10-31", 2025: "10-20", 2026: "11-08", 2027: "10-29", 2028: "10-17", 2029: "11-05", 2030: "10-26" };
        const d = dates[year] || "11-01"; // Fallback
        const [m, day] = d.split("-").map(Number);
        return new Date(year, m - 1, day);
      },
    },
    {
      slug: "holi",
      name: "Holi",
      emoji: "🎨",
      countryName: "India",
      description: "Holi is a popular ancient Hindu festival, also known as the Festival of Spring, the Festival of Colours, or the Festival of Love.",
      month: 3,
      day: null,
      getDate: (year) => {
        const dates: Record<number, string> = { 2024: "03-25", 2025: "03-14", 2026: "03-03", 2027: "03-22", 2028: "03-11", 2029: "02-28", 2030: "03-19" };
        const d = dates[year] || "03-15"; // Fallback
        const [m, day] = d.split("-").map(Number);
        return new Date(year, m - 1, day);
      },
    },
    {
      slug: "republic-day",
      name: "Republic Day",
      emoji: "🇮🇳",
      countryName: "India",
      description: "Republic Day honors the date on which the Constitution of India came into effect on 26 January 1950, replacing the Government of India Act as the governing document of India.",
      month: 1,
      day: 26,
    },
    {
      slug: "independence-day",
      name: "Independence Day",
      emoji: "🇮🇳",
      countryName: "India",
      description: "Independence Day is celebrated annually on 15 August as a public holiday in India commemorating the nation's independence from the United Kingdom on 15 August 1947.",
      month: 8,
      day: 15,
    },
    {
      slug: "gandhi-jayanti",
      name: "Gandhi Jayanti",
      emoji: "🕊️",
      countryName: "India",
      description: "Gandhi Jayanti is an event celebrated in India to mark the birthday of Mahatma Gandhi. It is celebrated annually on 2 October, and it is one of the three national holidays of India.",
      month: 10,
      day: 2,
    },
  ],
  CN: [
    {
      slug: "lunar-new-year",
      name: "Lunar New Year",
      emoji: "🐉",
      countryName: "China",
      description: "Lunar New Year is the festival that celebrates the beginning of a new year on the traditional lunisolar Chinese calendar. It is traditionally a time to honor deities and ancestors.",
      month: 2, // approx
      day: null,
      getDate: (year) => {
        const dates: Record<number, string> = { 2024: "02-10", 2025: "01-29", 2026: "02-17", 2027: "02-06", 2028: "01-26", 2029: "02-13", 2030: "02-03" };
        const d = dates[year] || "02-01"; // Fallback
        const [m, day] = d.split("-").map(Number);
        return new Date(year, m - 1, day);
      },
    },
  ],
  IE: [
    {
      slug: "st-patricks-day",
      name: "St. Patrick's Day",
      emoji: "☘️",
      countryName: "Ireland",
      description: "St. Patrick's Day is a cultural and religious celebration held on 17 March, the traditional death date of Saint Patrick, the foremost patron saint of Ireland.",
      month: 3,
      day: 17,
    },
  ],
  MX: [
    {
      slug: "day-of-the-dead",
      name: "Day of the Dead",
      emoji: "💀",
      countryName: "Mexico",
      description: "Day of the Dead (Día de los Muertos) is a Mexican holiday where families welcome back the souls of their deceased relatives for a brief reunion that includes food, drink and celebration.",
      month: 11,
      day: 2,
    },
    {
      slug: "cinco-de-mayo",
      name: "Cinco de Mayo",
      emoji: "🎉",
      countryName: "Mexico",
      description: "Cinco de Mayo is a yearly celebration held on May 5, which commemorates the anniversary of Mexico's victory over the French Empire at the Battle of Puebla in 1862.",
      month: 5,
      day: 5,
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
