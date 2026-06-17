import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { buildFAQSchema, buildBreadcrumbSchema } from "@/lib/schema/jsonld"
import { JsonLd } from "@/components/shared/JsonLd"
import { StatGrid } from "@/components/shared/StatGrid"
import { calculateAge } from "@/lib/date/calculations"
import { getZodiacSign, getZodiacEmoji } from "@/lib/date/zodiac"

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

  const ageData = calculateAge(birth)
  
  const zodiac = getZodiacSign(d, m)
  const zodiacEmoji = getZodiacEmoji(zodiac)

  const mName = MONTH_NAMES[m]
  const dateLabel = `${mName} ${d}, ${y}`

  const faqs = [
    {
      question: `How old am I if I was born on ${dateLabel}?`,
      answer: `If you were born on ${dateLabel}, you are ${ageData.years} years, ${ageData.months} months, and ${ageData.days} days old as of today.`,
    },
    {
      question: `How many days old am I if born ${dateLabel}?`,
      answer: `You have been alive for ${ageData.totalDays.toLocaleString()} days.`,
    },
    {
      question: `What is my zodiac sign if I was born on ${dateLabel}?`,
      answer: `Your zodiac sign is ${zodiac} ${zodiacEmoji}.`,
    }
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

      <main className="max-w-6xl mx-auto px-4 py-12">
        <nav className="text-sm text-slate-500 mb-8">
          Home / <a href="/tools/age" className="hover:text-blue-600">Age Calculator</a> /{" "}
          <span className="text-slate-900">{dateLabel}</span>
        </nav>

        <h1 className="text-4xl font-bold text-slate-900 mb-3">
          Age if Born {dateLabel}
        </h1>
        <p className="text-xl text-slate-600 mb-10">
          If you were born on <strong className="text-slate-900">{dateLabel}</strong>, you are{" "}
          <strong className="text-slate-900">{ageData.years} years, {ageData.months} months, and {ageData.days} days</strong> old today.
        </p>

        <StatGrid
          stats={[
            { label: "Years", value: ageData.years, highlight: true },
            { label: "Months", value: ageData.years * 12 + ageData.months },
            { label: "Weeks", value: Math.floor(ageData.totalDays / 7) },
            { label: "Days", value: ageData.totalDays },
          ]}
        />

        <div className="mt-12 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Fascinating Life Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-6 rounded-xl text-center">
              <div className="text-4xl mb-3">{zodiacEmoji}</div>
              <div className="text-lg font-bold text-slate-900">{zodiac}</div>
              <div className="text-sm text-slate-500 uppercase tracking-widest font-bold mt-1">Zodiac Sign</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl text-center">
              <div className="text-4xl mb-3">🌕</div>
              <div className="text-lg font-bold text-slate-900">{ageData.lifeStats.fullMoons.toLocaleString()}</div>
              <div className="text-sm text-slate-500 uppercase tracking-widest font-bold mt-1">Full Moons Seen</div>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl text-center">
              <div className="text-4xl mb-3">📅</div>
              <div className="text-lg font-bold text-slate-900">{ageData.lifeStats.leapYears.toLocaleString()}</div>
              <div className="text-sm text-slate-500 uppercase tracking-widest font-bold mt-1">Leap Years</div>
            </div>
          </div>
        </div>

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
