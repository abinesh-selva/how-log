import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getTimeDifference } from "@/lib/date/calculations"
import { buildFAQSchema, buildBreadcrumbSchema } from "@/lib/schema/jsonld"
import { JsonLd } from "@/components/shared/JsonLd"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return Array.from({ length: 201 }, (_, i) => ({ slug: String(1900 + i) }))
}

export const revalidate = 3600

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const y = parseInt(slug, 10)
  if (isNaN(y) || y < 1 || y > 9999) return {}

  const now = new Date()
  const isPast = y <= now.getFullYear()
  const verb = isPast ? "ago" : "from now"
  const diff = getTimeDifference(new Date(`${y}-01-01`), now)

  return {
    title: `How Long Ago Was ${y}? — ${diff.years} Years ${verb}`,
    description: `${y} was ${diff.years} years ${verb}. Find out exactly how many months, weeks, and days ${isPast ? `since ${y}` : `until ${y}`}.`,
  }
}

export default async function YearPage({ params }: Props) {
  const { slug } = await params
  const y = parseInt(slug, 10)
  if (isNaN(y) || y < 1 || y > 9999) notFound()

  const now = new Date()
  const targetDate = new Date(`${y}-01-01`)
  const diff = getTimeDifference(targetDate, now)
  const isPast = y < now.getFullYear()
  const isCurrent = y === now.getFullYear()
  const verb = isPast ? "ago" : "from now"

  const faqs = [
    {
      question: `How long ago was the year ${y}?`,
      answer: `The year ${y} was ${diff.years} years, ${diff.months} months, and ${diff.days} days ${verb} — approximately ${diff.totalDays.toLocaleString()} days ${verb}.`,
    },
    {
      question: `How many days since ${y}?`,
      answer: `There have been approximately ${diff.totalDays.toLocaleString()} days since January 1, ${y}.`,
    },
    {
      question: `What decade was ${y} in?`,
      answer: `The year ${y} was in the ${Math.floor(y / 10) * 10}s.`,
    },
  ]

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Year Calculator", url: "/date" },
    { name: String(y), url: `/date/${y}` },
  ]

  return (
    <>
      <JsonLd data={buildFAQSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />

      <main className="max-w-3xl mx-auto px-4 py-12">
        <nav className="text-sm text-slate-500 mb-8">
          <span>Home</span> / <span>Date</span> / <span className="text-slate-900">{y}</span>
        </nav>

        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          How Long Ago Was {y}?
        </h1>

        {isCurrent ? (
          <p className="text-xl text-slate-600 mb-10">
            {y} is the current year — we are currently {diff.months} months and {diff.days} days into {y}.
          </p>
        ) : (
          <p className="text-xl text-slate-600 mb-10">
            {y} was{" "}
            <strong className="text-slate-900">
              {diff.years} years, {diff.months} months
            </strong>{" "}
            {verb}.
          </p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Years", value: diff.years.toLocaleString() },
            { label: "Months", value: (diff.years * 12 + diff.months).toLocaleString() },
            { label: "Weeks", value: Math.floor(diff.totalDays / 7).toLocaleString() },
            { label: "Days", value: diff.totalDays.toLocaleString() },
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

        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Related Years</h2>
          <div className="flex flex-wrap gap-2">
            {[-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]
              .map((offset) => y + offset)
              .filter((yr) => yr >= 1 && yr <= 9999)
              .map((yr) => (
                <a
                  key={yr}
                  href={`/date/${yr}`}
                  className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 text-sm transition-colors"
                >
                  {yr}
                </a>
              ))}
          </div>
        </section>
      </main>
    </>
  )
}
