import type { Metadata } from "next"
import Link from "next/link"
import { HOLIDAY_DATA } from "./[country]/[slug]/holidayData"
import { buildBreadcrumbSchema } from "@/lib/schema/jsonld"
import { JsonLd } from "@/components/shared/JsonLd"

export const metadata: Metadata = {
  title: "Public Holidays & Festivals Countdown Directory",
  description: "Find countdowns to famous public holidays and cultural festivals around the world. See how many days are left until your favorite celebration.",
}

export default function HolidayDirectoryPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Holidays", url: "/holiday" },
  ]

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <nav className="text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link> / <span className="text-slate-900">Holidays</span>
        </nav>
        
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Holidays & Festivals Directory
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Select a country to explore countdowns for its famous public holidays, national events, and cultural festivals.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(HOLIDAY_DATA).map(([countryCode, holidays]) => {
            const countryName = holidays[0]?.countryName || countryCode
            return (
              <div key={countryCode} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-6 border-b border-slate-100 pb-4">
                  <h2 className="text-2xl font-bold text-slate-900">{countryName}</h2>
                </div>
                <ul className="space-y-4">
                  {holidays.map(h => (
                    <li key={h.slug}>
                      <Link 
                        href={`/holiday/${countryCode}/${h.slug}`}
                        className="group flex items-center text-slate-700 hover:text-blue-600 transition-colors"
                      >
                        <div className="bg-slate-50 p-2 rounded-lg mr-4 group-hover:bg-blue-50 group-hover:scale-110 transition-all">
                          <span className="text-2xl block leading-none">{h.emoji}</span>
                        </div>
                        <span className="font-medium text-lg">{h.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </main>
    </>
  )
}
