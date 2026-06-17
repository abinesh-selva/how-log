import { Metadata } from "next"
import Link from "next/link"
import { HISTORICAL_EVENTS } from "@/lib/events/data"
import { ToolPageWrapper } from "@/components/shared/ToolPageWrapper"
import { JsonLd } from "@/components/shared/JsonLd"
import { buildBreadcrumbSchema } from "@/lib/schema/jsonld"

export const metadata: Metadata = {
  title: "Historical Events — How Long Ago Was It?",
  description: "Browse major historical events and find out exactly how long ago they happened in days, months, and years.",
}

export default function EventsHubPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Historical Events" },
  ]

  // Group events by category
  const eventsByCategory = HISTORICAL_EVENTS.reduce((acc, event) => {
    if (!acc[event.category]) acc[event.category] = []
    acc[event.category].push(event)
    return acc
  }, {} as Record<string, typeof HISTORICAL_EVENTS>)

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs.map(b => ({ name: b.label, url: b.href || "" })))} />

      <ToolPageWrapper
        title="Historical Events"
        description="Explore significant moments in human history and discover exactly how much time has passed since they occurred."
        breadcrumbs={breadcrumbs}
        accentColor="coral"
      >
        <div className="space-y-12 mb-16">
          {Object.entries(eventsByCategory).map(([category, events]) => (
            <section key={category}>
              <h2 className="text-2xl font-black text-[var(--ink)] mb-6 flex items-center gap-3">
                <span className="inline-block w-6 h-1 rounded-full bg-[var(--indigo)]" />
                {category}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {events.map(event => (
                  <Link 
                    href={`/event/${event.slug}`} 
                    key={event.slug}
                    className="group bg-white rounded-2xl p-6 border border-[#E8E3DC] hover:border-[var(--indigo)] hover:shadow-md transition-all block"
                  >
                    <div className="text-sm font-bold text-[var(--indigo)] mb-2">
                      {new Date(event.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <h3 className="text-xl font-bold text-[var(--ink)] mb-2 group-hover:text-[var(--indigo)] transition-colors">
                      {event.name}
                    </h3>
                    <p className="text-[var(--ink-muted)] text-sm line-clamp-2">
                      {event.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </ToolPageWrapper>
    </>
  )
}
