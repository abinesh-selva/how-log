// Seed holiday data — extend this with a full 190-country dataset
// Format: { name, month, day, countryCode }
// These are fixed-date holidays. Moveable feasts (Easter, Thanksgiving) are computed separately.

export const FIXED_HOLIDAYS = [
  // United States
  { name: "New Year's Day", month: 1, day: 1, countryCode: "US" },
  { name: "Independence Day", month: 7, day: 4, countryCode: "US" },
  { name: "Veterans Day", month: 11, day: 11, countryCode: "US" },
  { name: "Christmas Day", month: 12, day: 25, countryCode: "US" },
  // United Kingdom
  { name: "New Year's Day", month: 1, day: 1, countryCode: "GB" },
  { name: "Christmas Day", month: 12, day: 25, countryCode: "GB" },
  { name: "Boxing Day", month: 12, day: 26, countryCode: "GB" },
  // Canada
  { name: "New Year's Day", month: 1, day: 1, countryCode: "CA" },
  { name: "Canada Day", month: 7, day: 1, countryCode: "CA" },
  { name: "Christmas Day", month: 12, day: 25, countryCode: "CA" },
  // Australia
  { name: "New Year's Day", month: 1, day: 1, countryCode: "AU" },
  { name: "Australia Day", month: 1, day: 26, countryCode: "AU" },
  { name: "Christmas Day", month: 12, day: 25, countryCode: "AU" },
  // Germany
  { name: "German Unity Day", month: 10, day: 3, countryCode: "DE" },
  { name: "Christmas Day", month: 12, day: 25, countryCode: "DE" },
  // France
  { name: "Bastille Day", month: 7, day: 14, countryCode: "FR" },
  { name: "Christmas Day", month: 12, day: 25, countryCode: "FR" },
  // India
  { name: "Republic Day", month: 1, day: 26, countryCode: "IN" },
  { name: "Independence Day", month: 8, day: 15, countryCode: "IN" },
  { name: "Gandhi Jayanti", month: 10, day: 2, countryCode: "IN" },
  // Ireland
  { name: "St. Patrick's Day", month: 3, day: 17, countryCode: "IE" },
  // Mexico
  { name: "Cinco de Mayo", month: 5, day: 5, countryCode: "MX" },
  { name: "Day of the Dead", month: 11, day: 2, countryCode: "MX" },
] as const

export function getHolidaysForYear(countryCode: string, year: number) {
  return FIXED_HOLIDAYS
    .filter((h) => h.countryCode === countryCode)
    .map((h) => ({
      name: h.name,
      date: new Date(year, h.month - 1, h.day),
      country: countryCode,
      countryCode: h.countryCode,
      type: "public" as const,
    }))
}
