import type { MetadataRoute } from "next"
import { HISTORICAL_EVENTS } from "@/lib/events/data"
import { FIXED_HOLIDAYS } from "@/lib/holidays/data"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://howlongtogo.com"

  // 1. Core Pages
  const corePages = [
    "",
    "/about",
    "/privacy",
    "/terms",
    "/event",
    "/holiday",
    "/countdown/create",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  // 2. Core Tools
  const toolPages = [
    "/tools/age",
    "/tools/business-days",
    "/tools/date-calculator",
    "/tools/day-of-week",
    "/tools/days-between",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }))

  // 3. Historical Events
  const eventPages = HISTORICAL_EVENTS.map((event) => ({
    url: `${baseUrl}/event/${event.slug}`,
    lastModified: new Date(event.date),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }))

  // 4. Holidays
  // Generate unique slugs for each holiday
  const holidaySlugs = Array.from(new Set(
    FIXED_HOLIDAYS.map(h => `/holiday/${h.countryCode}/${h.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`)
  ))
  const holidayPages = holidaySlugs.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }))

  // 5. Popular Years (e.g., 1900 - 2050)
  const yearPages: MetadataRoute.Sitemap = []
  for (let year = 1950; year <= 2050; year++) {
    yearPages.push({
      url: `${baseUrl}/date/${year}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })
  }

  // 6. Days From Today (1 - 365)
  const daysFromTodayPages: MetadataRoute.Sitemap = []
  for (let n = 1; n <= 365; n++) {
    daysFromTodayPages.push({
      url: `${baseUrl}/days-from-today/${n}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.5,
    })
  }

  return [
    ...corePages,
    ...toolPages,
    ...eventPages,
    ...holidayPages,
    ...yearPages,
    ...daysFromTodayPages,
  ]
}
