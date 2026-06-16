import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { buildFAQSchema, buildBreadcrumbSchema } from "@/lib/schema/jsonld"
import { JsonLd } from "@/components/shared/JsonLd"

interface Props {
  params: Promise<{ n: string }>
}

// Always fresh — the result changes every day
export const revalidate = 3600

const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"]
const DAY_NAMES = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

function fmt(d: Date) {
  return `${DAY_NAMES[d.getDay()]}, ${MONTH_NAMES[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
}

export async function generateStaticParams() {
  const standard = Array.from({ length: 365 }, (_, i) => ({ n: String(i + 1) }))
  const extra = [500, 730, 1000, 1095, 1825, 3650].map((n) => ({ n: String(n) }))
  return [...standard, ...extra]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { n } = await params
  const num = parseInt(n, 10)
  if (isNaN(num) || num < 1 || num > 36500) return {}

  const target = new Date()
  target.setDate(target.getDate() + num)

  return {
    title: `What Date is ${num} Days From Today? — ${fmt(target)}`,
    description: `${num} days from today is ${fmt(target)}. Find out the exact date, day of the week, and more.`,
  }
}

export default async function DaysFromTodayPage({ params }: Props) {
  const { n } = await params
  const num = parseInt(n, 10)
  if (isNaN(num) || num < 1 || num > 36500) notFound()

  const today = new Date()
  const target = new Date(today)
  target.setDate(today.getDate() + num)

  const todayFormatted = fmt(today)
  const targetFormatted = fmt(target)

  const faqs = [
    {
      question: `What date is ${num} days from today?`,
      answer: `${num} days from today (${todayFormatted}) is ${targetFormatted}.`,
    },
    {
      question: `What day of the week is ${num} days from today?`,
      answer: `${num} days from today falls on a ${DAY_NAMES[target.getDay()]}.`,
    },
    {
      question: `How many weeks is ${num} days?`,
      answer: `${num} days is ${Math.floor(num / 7)} weeks and ${num % 7} days.`,
    },
  ]

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Days From Today", url: "/days-from-today/30" },
    { name: `${num} Days`, url: `/days-from-today/${num}` },
  ]

  return (
    <>
      <JsonLd data={buildFAQSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />

      <main className="max-w-3xl mx-auto px-4 py-12">
        <nav className="text-sm text-slate-500 mb-8">
          Home / Days From Today / <span className="text-slate-900">{num} Days</span>
        </nav>

        <h1 className="text-4xl font-bold text-slate-900 mb-3">
          What Date is {num} Days From Today?
        </h1>
        <p className="text-xl text-slate-600 mb-10">
          {num} days from today ({todayFormatted}) is{" "}
          <strong className="text-slate-900">{targetFormatted}</strong>.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {[
            { label: "Target Date", value: `${MONTH_NAMES[target.getMonth()]} ${target.getDate()}, ${target.getFullYear()}` },
            { label: "Day of Week", value: DAY_NAMES[target.getDay()] },
            { label: "Weeks + Days", value: `${Math.floor(num / 7)}w ${num % 7}d` },
          ].map(({ label, value }) => (
            <div key={label} className="bg-slate-50 rounded-xl p-4 text-center border border-slate-200">
              <div className="text-lg font-bold text-blue-600">{value}</div>
              <div className="text-sm text-slate-500 mt-1">{label}</div>
            </div>
          ))}
        </div>

        <section className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="bg-white rounded-xl p-5 border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-1">{faq.question}</h3>
              <p className="text-slate-600 text-sm">{faq.answer}</p>
            </div>
          ))}
        </section>

        <div className="mt-10 flex flex-wrap gap-3">
          {[7, 14, 30, 60, 90, 100, 180, 365].filter((d) => d !== num).map((d) => (
            <a
              key={d}
              href={`/days-from-today/${d}`}
              className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 text-sm rounded-lg transition-colors"
            >
              {d} days from today
            </a>
          ))}
        </div>
      </main>
    </>
  )
}
