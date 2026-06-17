import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { HOLIDAY_DATA } from "./[slug]/holidayData"
import { buildBreadcrumbSchema } from "@/lib/schema/jsonld"
import { JsonLd } from "@/components/shared/JsonLd"

interface Props {
  params: Promise<{ country: string }>
}

export async function generateStaticParams() {
  return Object.keys(HOLIDAY_DATA).map((country) => ({
    country,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params
  const holidays = HOLIDAY_DATA[country.toUpperCase()]
  
  if (!holidays || holidays.length === 0) return {}

  const countryName = holidays[0].countryName

  return {
    title: `Public Holidays & Festivals in ${countryName}`,
    description: `Countdown to the most famous public holidays and festivals in ${countryName}.`,
  }
}

export default async function CountryHolidayPage({ params }: Props) {
  const { country } = await params
  const countryUpper = country.toUpperCase()
  const holidays = HOLIDAY_DATA[countryUpper]

  if (!holidays || holidays.length === 0) {
    notFound()
  }

  const countryName = holidays[0].countryName

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Holidays", url: "/holiday" },
    { name: countryName, url: `/holiday/${country}` },
  ]

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link> /{" "}
          <Link href="/holiday" className="hover:text-slate-900 transition-colors">Holidays</Link> /{" "}
          <span className="text-slate-900">{countryName}</span>
        </nav>
        
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            Holidays in {countryName}
          </h1>
          <p className="text-xl text-slate-600">
            Explore countdowns for famous events and public holidays in {countryName}.
          </p>
        </header>

        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {holidays.map(h => (
              <li key={h.slug}>
                <Link 
                  href={`/holiday/${countryUpper}/${h.slug}`}
                  className="group flex items-center p-4 rounded-xl border border-transparent hover:border-slate-200 hover:bg-slate-50 transition-all"
                >
                  <div className="bg-white border border-slate-100 p-3 rounded-lg mr-4 group-hover:shadow-sm transition-all">
                    <span className="text-3xl block leading-none">{h.emoji}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-lg text-slate-900 block">{h.name}</span>
                    <span className="text-sm text-slate-500 line-clamp-1">{h.description}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  )
}
