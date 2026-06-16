import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { buildFAQSchema, buildBreadcrumbSchema, buildEventSchema } from "@/lib/schema/jsonld"
import { JsonLd } from "@/components/shared/JsonLd"
import { StatGrid } from "@/components/shared/StatGrid"
import { HOLIDAY_DATA, getNextOccurrence } from "./holidayData"

interface Props {
  params: Promise<{ country: string; slug: string }>
}

export const revalidate = 3600

export async function generateStaticParams() {
  return Object.entries(HOLIDAY_DATA).flatMap(([country, holidays]) =>
    holidays.map((h) => ({ country, slug: h.slug }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country, slug } = await params
  const holidays = HOLIDAY_DATA[country.toUpperCase()]
  const holiday = holidays?.find((h) => h.slug === slug)
  if (!holiday) return {}

  const next = getNextOccurrence(holiday)
  const msUntil = next.getTime() - Date.now()
  const daysUntil = Math.ceil(msUntil / 86400000)

  return {
    title: `${holiday.name} ${next.getFullYear()} — ${daysUntil} Days Away`,
    description: `${holiday.name} ${next.getFullYear()} is on ${next.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} — ${daysUntil} days from today. Find the countdown, dates, and more.`,
  }
}

export default async function HolidayPage({ params }: Props) {
  const { country, slug } = await params
  const countryUpper = country.toUpperCase()
  const holidays = HOLIDAY_DATA[countryUpper]
  const holiday = holidays?.find((h) => h.slug === slug)
  if (!holiday) notFound()

  const now = new Date()
  const next = getNextOccurrence(holiday)
  const msUntil = next.getTime() - now.getTime()
  const daysUntil = Math.max(0, Math.ceil(msUntil / 86400000))
  const weeksUntil = Math.floor(daysUntil / 7)
  const nextFormatted = next.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })

  const past = new Date(next)
  past.setFullYear(past.getFullYear() - 1)
  const pastFormatted = past.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })

  const faqs = [
    {
      question: `When is ${holiday.name} ${next.getFullYear()}?`,
      answer: `${holiday.name} ${next.getFullYear()} falls on ${nextFormatted}.`,
    },
    {
      question: `How many days until ${holiday.name}?`,
      answer: `There are ${daysUntil} days (${weeksUntil} weeks) until ${holiday.name} ${next.getFullYear()}.`,
    },
    {
      question: `When was ${holiday.name} last year?`,
      answer: `${holiday.name} ${past.getFullYear()} was on ${pastFormatted}.`,
    },
  ]

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Holidays", url: "/holiday" },
    { name: holiday.countryName, url: `/holiday/${country}` },
    { name: holiday.name, url: `/holiday/${country}/${slug}` },
  ]

  return (
    <>
      <JsonLd data={buildFAQSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
      <JsonLd data={buildEventSchema(
        `${holiday.name} ${next.getFullYear()}`,
        next.toISOString().split("T")[0],
        holiday.description,
        `https://howlongtogo.com/holiday/${country}/${slug}`
      )} />

      <main className="max-w-3xl mx-auto px-4 py-12">
        <nav className="text-sm text-slate-500 mb-8">
          Home / Holidays / {holiday.countryName} / <span className="text-slate-900">{holiday.name}</span>
        </nav>

        <div className="text-4xl mb-3">{holiday.emoji}</div>
        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          {holiday.name} {next.getFullYear()}
        </h1>
        <p className="text-xl text-slate-600 mb-10">
          {nextFormatted} — <strong className="text-slate-900">{daysUntil} days away</strong>
        </p>

        <StatGrid
          stats={[
            { label: "Days Until", value: daysUntil, highlight: true },
            { label: "Weeks Until", value: weeksUntil },
            { label: "Month", value: next.toLocaleString("default", { month: "long" }) },
            { label: "Day", value: next.toLocaleString("default", { weekday: "long" }) },
          ]}
        />

        <div className="mt-10 bg-slate-50 rounded-xl p-6 border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">About {holiday.name}</h2>
          <p className="text-slate-600 text-sm leading-relaxed">{holiday.description}</p>
        </div>

        <section className="mt-10 space-y-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="bg-white rounded-xl p-5 border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-1">{faq.question}</h3>
              <p className="text-slate-600 text-sm">{faq.answer}</p>
            </div>
          ))}
        </section>
      </main>
    </>
  )
}
