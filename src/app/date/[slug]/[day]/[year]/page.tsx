import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { DateTime } from "luxon"
import { getTimeDifference } from "@/lib/date/calculations"
import { buildFAQSchema, buildBreadcrumbSchema } from "@/lib/schema/jsonld"
import { JsonLd } from "@/components/shared/JsonLd"
import { ToolPageWrapper } from "@/components/shared/ToolPageWrapper"
import { CountUp } from "@/components/ui/CountUp"

interface Props {
  params: Promise<{ slug: string; day: string; year: string }>
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, day, year } = await params
  const y = parseInt(slug, 10)
  const m = resolveMonth(day)
  const d = parseInt(year, 10)
  
  if (isNaN(y) || !m || isNaN(d)) return {}

  const targetDT = DateTime.fromObject({ year: y, month: m, day: d })
  if (!targetDT.isValid) return {}

  const fullLabel = targetDT.toFormat("MMMM d, yyyy")
  const isFuture = targetDT > DateTime.local()
  const tense = isFuture ? "Until" : "Since"

  return {
    title: `How Long ${tense} ${fullLabel}?`,
    description: `Calculate exactly how many days, months, and years it has been ${isFuture ? "until" : "since"} ${fullLabel}.`,
  }
}

export default async function ExactDatePage({ params }: Props) {
  const { slug, day, year } = await params
  const y = parseInt(slug, 10)
  const m = resolveMonth(day)
  const d = parseInt(year, 10)

  if (isNaN(y) || !m || isNaN(d) || d < 1 || d > 31) {
    notFound()
  }

  const targetDT = DateTime.fromObject({ year: y, month: m, day: d })
  if (!targetDT.isValid) {
    notFound()
  }

  const now = new Date()
  const nowDT = DateTime.fromJSDate(now)

  const isFuture = targetDT > nowDT
  const diff = getTimeDifference(now, targetDT.toJSDate())
  const fullLabel = targetDT.toFormat("MMMM d, yyyy")

  const tense = isFuture ? "Until" : "Since"
  const tenseLower = isFuture ? "until" : "since"
  const verb = isFuture ? "will be" : "was"

  const faqs = [
    {
      question: `How long ${tenseLower} ${fullLabel}?`,
      answer: `It has been ${diff.years > 0 ? diff.years + " years, " : ""}${diff.months} months and ${diff.days} days ${tenseLower} ${fullLabel} — a total of ${diff.totalDays.toLocaleString()} days.`,
    },
    {
      question: `What day of the week ${verb} ${fullLabel}?`,
      answer: `${fullLabel} ${verb} a ${targetDT.toFormat("cccc")}.`,
    },
  ]

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Date", href: "/date" },
    { label: fullLabel },
  ]

  return (
    <>
      <JsonLd data={buildFAQSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs.map(b => ({ name: b.label, url: b.href || "" })))} />

      <ToolPageWrapper
        title={`How Long ${tense} ${fullLabel}?`}
        description={`Find out the exact time ${tenseLower} ${fullLabel} down to the day.`}
        breadcrumbs={breadcrumbs}
        accentColor="teal"
      >
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[#E8E3DC] mb-14">
          <p className="text-xl md:text-2xl text-[var(--ink)] leading-relaxed mb-10 text-center">
            {isFuture ? "There are exactly" : "It has been exactly"} <br/>
            <strong className="text-[var(--teal)] font-black text-3xl md:text-4xl block mt-2">
              {diff.years > 0 && <><CountUp end={diff.years} /> years, </>}
              <CountUp end={diff.months} /> months, and <CountUp end={diff.days} /> days
            </strong>
            <br/> {tenseLower} <strong className="text-[var(--ink)]">{fullLabel}</strong>.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Years", value: diff.years },
              { label: "Total Months", value: diff.years * 12 + diff.months },
              { label: "Total Weeks", value: Math.floor(diff.totalDays / 7) },
              { label: "Total Days", value: diff.totalDays },
            ].map(({ label, value }) => (
              <div key={label} className="bg-[var(--cream)] rounded-2xl p-5 text-center border border-[#E8E3DC]">
                <div className="text-3xl font-black text-[var(--teal)] tabular-nums">
                  <CountUp end={value} />
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.15em] text-[var(--ink-muted)] mt-2">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <section className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-[var(--ink)] mb-6 flex items-center gap-3">
            <span className="inline-block w-6 h-1 rounded-full bg-[var(--coral)]" />
            Common Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-white rounded-2xl p-6 border border-[#E8E3DC]">
                <h3 className="font-bold text-[var(--ink)] mb-2">{faq.question}</h3>
                <p className="text-[var(--ink-muted)] text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </ToolPageWrapper>
    </>
  )
}
