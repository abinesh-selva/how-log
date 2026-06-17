import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { DateTime } from "luxon"
import { getTimeDifference } from "@/lib/date/calculations"
import { buildFAQSchema, buildBreadcrumbSchema } from "@/lib/schema/jsonld"
import { JsonLd } from "@/components/shared/JsonLd"

interface Props {
  params: Promise<{ slug: string; day: string }>
}

export const revalidate = 3600

const MONTH_NAMES: Record<string, number> = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
}

function resolveMonth(raw: string): number | null {
  const lower = raw.toLowerCase()
  if (MONTH_NAMES[lower]) return MONTH_NAMES[lower]
  const n = parseInt(raw, 10)
  return n >= 1 && n <= 12 ? n : null
}

export async function generateStaticParams() {
  const params: { slug: string; day: string }[] = []
  Object.entries(MONTH_NAMES).forEach(([month, monthNum]) => {
    const daysInMonth = DateTime.fromObject({ month: monthNum, year: 2024 }).daysInMonth!
    for (let d = 1; d <= daysInMonth; d++) {
      params.push({ slug: month, day: String(d) })
    }
  })
  return params
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, day } = await params
  const monthNum = resolveMonth(slug)
  const dayNum = parseInt(day, 10)
  if (!monthNum || isNaN(dayNum)) return {}

  const monthLabel = DateTime.fromObject({ month: monthNum, day: dayNum, year: 2024 }).toFormat("MMMM d")

  return {
    title: `How Long Until ${monthLabel}?`,
    description: `Find out exactly how many days, weeks, and months until ${monthLabel}.`,
  }
}

export default async function MonthDayPage({ params }: Props) {
  const { slug, day } = await params
  const monthNum = resolveMonth(slug)
  const dayNum = parseInt(day, 10)
  if (!monthNum || isNaN(dayNum) || dayNum < 1 || dayNum > 31) notFound()

  const now = new Date()
  const nowDT = DateTime.fromJSDate(now)

  let targetDT = DateTime.fromObject({ year: nowDT.year, month: monthNum, day: dayNum })
  if (!targetDT.isValid) notFound()
  if (targetDT < nowDT) targetDT = targetDT.plus({ years: 1 })

  const diff = getTimeDifference(now, targetDT.toJSDate())
  const monthLabel = targetDT.toFormat("MMMM d")
  const fullLabel = targetDT.toFormat("MMMM d, yyyy")

  const faqs = [
    {
      question: `How long until ${monthLabel}?`,
      answer: `${monthLabel} ${targetDT.year} is in ${diff.months} months and ${diff.days} days — a total of ${diff.totalDays.toLocaleString()} days from today.`,
    },
    {
      question: `What day of the week is ${monthLabel} ${targetDT.year}?`,
      answer: `${fullLabel} falls on a ${targetDT.toFormat("cccc")}.`,
    },
  ]

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Date", url: "/date" },
    { name: monthLabel, url: `/date/${slug}/${day}` },
  ]

  return (
    <>
      <JsonLd data={buildFAQSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />

      <main className="max-w-6xl mx-auto px-4 py-12">
        <nav className="text-sm text-slate-500 mb-8">
          Home / Date / <span className="text-slate-900">{monthLabel}</span>
        </nav>

        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          How Long Until {monthLabel}?
        </h1>
        <p className="text-xl text-slate-600 mb-10">
          {fullLabel} is in{" "}
          <strong className="text-slate-900">
            {diff.months} months and {diff.days} days
          </strong>.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Months", value: diff.months.toLocaleString() },
            { label: "Weeks", value: Math.floor(diff.totalDays / 7).toLocaleString() },
            { label: "Days", value: diff.totalDays.toLocaleString() },
            { label: "Hours", value: diff.totalHours.toLocaleString() },
          ].map(({ label, value }) => (
            <div key={label} className="bg-slate-50 rounded-xl p-4 text-center border border-slate-200">
              <div className="text-2xl font-bold text-blue-600">{value}</div>
              <div className="text-sm text-slate-500 mt-1">{label}</div>
            </div>
          ))}
        </div>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-white rounded-xl p-5 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-1">{faq.question}</h3>
                <p className="text-slate-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
