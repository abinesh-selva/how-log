import { Metadata } from "next"
import { notFound } from "next/navigation"
import { DateTime } from "luxon"
import { HISTORICAL_EVENTS, getEventBySlug } from "@/lib/events/data"
import { ToolPageWrapper } from "@/components/shared/ToolPageWrapper"
import { CountUp } from "@/components/ui/CountUp"
import { getTimeDifference } from "@/lib/date/calculations"
import { JsonLd } from "@/components/shared/JsonLd"
import { buildFAQSchema, buildBreadcrumbSchema, buildArticleSchema } from "@/lib/schema/jsonld"

export const revalidate = 86400 // Revalidate daily

export async function generateStaticParams() {
  return HISTORICAL_EVENTS.map((event) => ({
    slug: event.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const event = getEventBySlug(slug)
  
  if (!event) return {}

  return {
    title: `How Long Ago Was ${event.name}?`,
    description: `Find out exactly how many days, months, and years it has been since ${event.name} on ${new Date(event.date).toLocaleDateString()}.`,
  }
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = getEventBySlug(slug)

  if (!event) {
    notFound()
  }

  const targetDT = DateTime.fromISO(event.date)
  const now = new Date()
  const diff = getTimeDifference(now, targetDT.toJSDate())
  const fullLabel = targetDT.toFormat("MMMM d, yyyy")

  const faqs = [
    {
      question: `How long ago was ${event.name}?`,
      answer: `It has been ${diff.years > 0 ? diff.years + " years, " : ""}${diff.months} months and ${diff.days} days since ${event.name} — a total of ${diff.totalDays.toLocaleString()} days since ${fullLabel}.`,
    },
    {
      question: `What day of the week was ${event.name}?`,
      answer: `${event.name} happened on a ${targetDT.toFormat("cccc")}.`,
    },
  ]

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Events", href: "/event" },
    { label: event.name },
  ]

  return (
    <>
      <JsonLd data={buildFAQSchema(faqs)} />
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs.map(b => ({ name: b.label, url: b.href || "" })))} />
      <JsonLd data={buildArticleSchema({
        headline: `How Long Ago Was ${event.name}?`,
        description: event.description,
        datePublished: new Date().toISOString(),
        authorName: "HowLongToGo",
        authorUrl: "https://howlongtogo.com",
      })} />

      <ToolPageWrapper
        title={`How Long Ago Was ${event.name}?`}
        description={`Find out exactly how much time has passed since this historical event.`}
        breadcrumbs={breadcrumbs}
        accentColor="coral"
      >
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[#E8E3DC] mb-14 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--indigo)] to-[var(--teal)]" />
          
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--cream)] text-[var(--indigo)] text-sm font-bold tracking-wide uppercase mb-4">
              {event.category}
            </span>
            <p className="text-xl md:text-2xl text-[var(--ink)] leading-relaxed">
              It has been exactly <br/>
              <strong className="text-[var(--indigo)] font-black text-3xl md:text-5xl block mt-4 mb-2">
                {diff.years > 0 && <><CountUp end={diff.years} /> years, </>}
                <CountUp end={diff.months} /> months, and <CountUp end={diff.days} /> days
              </strong>
              since <strong>{event.name}</strong> on {fullLabel}.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: "Total Years", value: diff.years },
              { label: "Total Months", value: diff.years * 12 + diff.months },
              { label: "Total Weeks", value: Math.floor(diff.totalDays / 7) },
              { label: "Total Days", value: diff.totalDays },
            ].map(({ label, value }) => (
              <div key={label} className="bg-[var(--cream)] rounded-2xl p-5 text-center border border-[#E8E3DC]">
                <div className="text-3xl font-black text-[var(--indigo)] tabular-nums">
                  <CountUp end={value} />
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.15em] text-[var(--ink-muted)] mt-2">{label}</div>
              </div>
            ))}
          </div>

          <div className="bg-[var(--cream)] rounded-2xl p-6 md:p-8 text-[var(--ink)] leading-relaxed text-lg border-l-4 border-[var(--indigo)]">
            <h3 className="font-bold mb-2">About this event:</h3>
            <p className="mb-4">{event.description}</p>
            <p className="font-medium text-[var(--ink-muted)]">Significance: {event.significance}</p>
            {event.wikipediaUrl && (
              <a 
                href={event.wikipediaUrl} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-[var(--indigo)] hover:underline font-bold text-sm"
              >
                Read more on Wikipedia →
              </a>
            )}
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
