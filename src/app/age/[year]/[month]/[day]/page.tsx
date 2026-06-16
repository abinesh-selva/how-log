import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { buildFAQSchema, buildBreadcrumbSchema } from "@/lib/schema/jsonld"
import { JsonLd } from "@/components/shared/JsonLd"
import { StatGrid } from "@/components/shared/StatGrid"

interface Props {
  params: Promise<{ year: string; month: string; day: string }>
}

export const revalidate = 86400

const MONTH_NAMES = [
  "", "January","February","March","April","May","June",
  "July","August","September","October","November","December",
]

export async function generateStaticParams() {
  // Seed most-searched birth years (1950–2010), Jan 1 only as representative
  return Array.from({ length: 61 }, (_, i) => ({
    year: String(1950 + i), month: "1", day: "1",
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year, month, day } = await params
  const y = parseInt(year, 10), m = parseInt(month, 10), d = parseInt(day, 10)
  if (isNaN(y) || isNaN(m) || isNaN(d)) return {}

  const mName = MONTH_NAMES[m] ?? ""
  return {
    title: `Age if Born ${mName} ${d}, ${y} — How Old Am I?`,
    description: `If you were born on ${mName} ${d}, ${y}, find out your exact age today in years, months, weeks, and days.`,
  }
}

export default async function AgeProgrammaticPage({ params }: Props) {
  const { year, month, day } = await params
  const y = parseInt(year, 10), m = parseInt(month, 10), d = parseInt(day, 10)
  if (isNaN(y) || isNaN(m) || m < 1 || m > 12 || isNaN(d) || d < 1 || d > 31) notFound()

  const birth = new Date(y, m - 1, d)
  if (isNaN(birth.getTime())) notFound()

  const now = new Date()
  if (birth > now) notFound()

  let years = now.getFullYear() - birth.getFullYear()
  let months = now.getMonth() - birth.getMonth()
  let days = now.getDate() - birth.getDate()
  if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate() }
  if (months < 0) { years--; months += 12 }

  const totalMs = now.getTime() - birth.getTime()
  const totalDays = Math.floor(totalMs / 86400000)

  const mName = MONTH_NAMES[m]
  const dateLabel = `${mName} ${d}, ${y}`

  const faqs = [
    {
      question: `How old am I if I was born on ${dateLabel}?`,
      answer: `If you were born on ${dateLabel}, you are ${years} years, ${months} months, and ${days} days old as of today.`,
    },
    {
      question: `How many days old am I if born ${dateLabel}?`,
      answer: `You have been alive for ${totalDays.toLocaleString()} days.`,
    },
  ]

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Age Calculator", url: "/tools/age" },
    { name: dateLabel, url: `/age/${year}/${month}/${day}` },
  ]

  return (
    <>
      <JsonLd data={buildFAQSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />

      <main className="max-w-3xl mx-auto px-4 py-12">
        <nav className="text-sm text-slate-500 mb-8">
          Home / <a href="/tools/age" className="hover:text-blue-600">Age Calculator</a> /{" "}
          <span className="text-slate-900">{dateLabel}</span>
        </nav>

        <h1 className="text-4xl font-bold text-slate-900 mb-3">
          Age if Born {dateLabel}
        </h1>
        <p className="text-xl text-slate-600 mb-10">
          If you were born on <strong className="text-slate-900">{dateLabel}</strong>, you are{" "}
          <strong className="text-slate-900">{years} years, {months} months, and {days} days</strong> old today.
        </p>

        <StatGrid
          stats={[
            { label: "Years", value: years, highlight: true },
            { label: "Months", value: years * 12 + months },
            { label: "Weeks", value: Math.floor(totalDays / 7) },
            { label: "Days", value: totalDays },
          ]}
        />

        <section className="mt-10 space-y-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="bg-white rounded-xl p-5 border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-1">{faq.question}</h3>
              <p className="text-slate-600 text-sm">{faq.answer}</p>
            </div>
          ))}
        </section>

        <div className="mt-10 p-5 bg-slate-50 rounded-xl border border-slate-200 text-center">
          <p className="text-slate-600 text-sm mb-3">Want to calculate for a different date?</p>
          <a href="/tools/age" className="inline-block px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
            Open Age Calculator
          </a>
        </div>
      </main>
    </>
  )
}
