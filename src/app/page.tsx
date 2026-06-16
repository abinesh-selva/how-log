import Link from "next/link"
import type { Metadata } from "next"
import { JsonLd } from "@/components/shared/JsonLd"
import { buildFAQSchema, buildWebApplicationSchema } from "@/lib/schema/jsonld"

export const metadata: Metadata = {
  title: "How Long To Go — Date Calculators & Countdown Timers",
  description:
    "Free date calculators, age calculators, business day counters, and shareable countdown timers. Fast, accurate, ad-light.",
  openGraph: {
    title: "HowLongToGo — Date & Time Tools",
    description: "Calculate how long until any date, your exact age, business days, and more.",
    type: "website",
  },
}

const TOOLS = [
  {
    href: "/tools/age",
    label: "Age Calculator",
    body: "Your exact age in years, months, days — even seconds.",
    accent: "coral",
  },
  {
    href: "/tools/days-between",
    label: "Days Between Dates",
    body: "Count calendar days between any two dates in seconds.",
    accent: "teal",
  },
  {
    href: "/tools/business-days",
    label: "Business Day Counter",
    body: "Skip weekends and public holidays for any country.",
    accent: "green",
  },
  {
    href: "/tools/day-of-week",
    label: "Day of the Week",
    body: "Find out what day any date in history fell on.",
    accent: "pink",
  },
  {
    href: "/tools/date-calculator",
    label: "Date Calculator",
    body: "Add or subtract days, weeks, months, or years from any date.",
    accent: "blue",
  },
  {
    href: "/countdown/create",
    label: "Countdown Timer",
    body: "Create a shareable link that counts down to your event.",
    accent: "coral",
  },
]

const ACCENT_STYLES: Record<string, string> = {
  coral: "bg-[var(--coral)] text-white",
  teal:  "bg-[var(--teal)] text-white",
  green: "bg-[var(--green)] text-white",
  pink:  "bg-[var(--pink)] text-[var(--ink)]",
  blue:  "bg-[var(--blue-muted)] text-white",
}

const ACCENT_DOT: Record<string, string> = {
  coral: "bg-white/20",
  teal:  "bg-white/20",
  green: "bg-white/20",
  pink:  "bg-[var(--ink)]/10",
  blue:  "bg-white/20",
}

const faqs = [
  {
    question: "How do I calculate how many days until a date?",
    answer:
      "Enter your target date in the Days Between tool or the Date Calculator. We subtract today's date and show the exact count including whether the day has passed.",
  },
  {
    question: "Does the age calculator account for leap years?",
    answer:
      "Yes. We use the Luxon date library which handles leap years, DST shifts, and calendar edge cases precisely.",
  },
  {
    question: "Can I share my countdown with someone else?",
    answer:
      "Yes — create a countdown and you will get a permanent shareable link. Anyone with the link can see the live countdown with no account needed.",
  },
  {
    question: "Which countries do you support for business day calculations?",
    answer:
      "Currently United States, United Kingdom, Canada, Australia, and Germany. More countries are added regularly.",
  },
]

export default function Home() {
  return (
    <>
      <JsonLd data={buildFAQSchema(faqs)} />
      <JsonLd data={buildWebApplicationSchema("HowLongToGo", "Free date calculators and countdown tools")} />

      <main>
        {/* ── Hero ────────────────────────────────────────────── */}
        <section className="bg-[var(--teal)] relative overflow-hidden">
          <div
            className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-10"
            style={{ background: "var(--coral)" }}
          />
          <div
            className="absolute bottom-0 left-1/4 w-48 h-48 rounded-full opacity-[0.07]"
            style={{ background: "var(--green)" }}
          />

          <div className="relative max-w-6xl mx-auto px-5 pt-20 pb-24 text-center">
            <p className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-5">
              Free · No account needed · No clutter
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] max-w-3xl mx-auto">
              Time answers,
              <br />
              <span className="text-[var(--coral)]">instantly.</span>
            </h1>
            <p className="mt-5 text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
              Age calculators, date counters, business day tools, and shareable countdowns — all in one place.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/tools/age"
                className="px-6 py-3.5 bg-[var(--coral)] hover:bg-[var(--coral-dark)] text-white font-bold text-sm rounded-2xl transition-all active:scale-95 shadow-lg shadow-black/20"
              >
                Calculate my age
              </Link>
              <Link
                href="/countdown/create"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-2xl transition-colors border border-white/20"
              >
                Create countdown →
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs text-white/40">
              <span>1,000+ pages of date info</span>
              <span>·</span>
              <span>5 free tools</span>
              <span>·</span>
              <span>Shareable countdowns</span>
            </div>
          </div>
        </section>

        {/* ── Tool cards ──────────────────────────────────────── */}
        <section className="bg-[var(--cream)] py-20 px-5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--ink-muted)] mb-3">Everything you need</p>
              <h2 className="text-3xl font-bold text-[var(--ink)]">Pick your tool</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {TOOLS.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group block rounded-3xl overflow-hidden hover:-translate-y-1 transition-transform duration-200"
                >
                  <div className={`${ACCENT_STYLES[tool.accent]} px-6 pt-5 pb-6 relative overflow-hidden`}>
                    <div className={`absolute top-3 right-4 w-14 h-14 rounded-full ${ACCENT_DOT[tool.accent]}`} />
                    <p className="font-bold text-base leading-tight relative">{tool.label}</p>
                  </div>
                  <div className="bg-white px-6 py-5 border-x border-b border-[#E8E3DC] rounded-b-3xl">
                    <p className="text-sm text-[var(--ink-muted)] leading-relaxed">{tool.body}</p>
                    <p className="mt-3 text-xs font-bold text-[var(--coral)] flex items-center gap-1">
                      Open tool
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5h6M5 2l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Popular lookups ─────────────────────────────────── */}
        <section className="bg-white py-20 px-5">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--ink-muted)] mb-2">Trending now</p>
                <h2 className="text-2xl font-bold text-[var(--ink)]">Popular date lookups</h2>
              </div>
              <Link href="/date/2000" className="text-sm font-semibold text-[var(--coral)] hover:underline">
                Browse all years →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: "How long since 2000?",       href: "/date/2000",           sub: "Jan 1, 2000" },
                { label: "How long since 1990?",       href: "/date/1990",           sub: "Jan 1, 1990" },
                { label: "How long until Christmas?",  href: "/date/december/25",    sub: "Dec 25" },
                { label: "100 days from today",        href: "/days-from-today/100", sub: "Future date" },
                { label: "How long since 1980?",       href: "/date/1980",           sub: "Jan 1, 1980" },
                { label: "How long until New Year?",   href: "/date/january/1",      sub: "Jan 1" },
                { label: "30 days from today",         href: "/days-from-today/30",  sub: "Future date" },
                { label: "How long since 1970?",       href: "/date/1970",           sub: "Jan 1, 1970" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-start gap-3 p-4 rounded-2xl border border-[#E8E3DC] hover:border-[var(--coral)] hover:bg-[var(--cream)] transition-colors"
                >
                  <div className="w-8 h-8 rounded-xl bg-[var(--cream-card)] flex-shrink-0 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <rect x="1" y="2" width="12" height="11" rx="2" stroke="var(--ink-muted)" strokeWidth="1.4"/>
                      <path d="M1 6h12" stroke="var(--ink-muted)" strokeWidth="1.4"/>
                      <path d="M5 1v2M9 1v2" stroke="var(--ink-muted)" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--ink)] group-hover:text-[var(--coral)] transition-colors leading-snug">{item.label}</p>
                    <p className="text-xs text-[var(--ink-muted)] mt-0.5">{item.sub}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Countdown CTA ───────────────────────────────────── */}
        <section className="bg-[var(--cream)] py-20 px-5">
          <div className="max-w-6xl mx-auto">
            <div className="bg-[var(--teal)] rounded-[2.5rem] px-8 py-14 md:px-14 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10" style={{ background: "var(--coral)", transform: "translate(30%, -30%)" }} />
              <div className="absolute bottom-0 left-20 w-40 h-40 rounded-full opacity-[0.07]" style={{ background: "var(--green)" }} />

              <div className="relative flex-1">
                <p className="text-white/50 text-xs font-bold uppercase tracking-[0.15em] mb-3">Shareable</p>
                <h2 className="text-3xl font-bold text-white leading-tight">Build a countdown for your moment</h2>
                <p className="mt-3 text-white/60 leading-relaxed text-sm max-w-sm">
                  Weddings, exams, vacations, game releases — create a beautiful live countdown and share the link with anyone.
                </p>
              </div>

              <div className="relative flex flex-col items-center gap-4 flex-shrink-0">
                <div className="bg-white/10 rounded-2xl px-10 py-6 text-center border border-white/10">
                  <p className="text-white/50 text-xs mb-2 font-semibold">Days until graduation</p>
                  <p className="text-5xl font-bold text-white tabular-nums">47</p>
                  <p className="text-white/40 text-xs mt-1">days to go</p>
                </div>
                <Link
                  href="/countdown/create"
                  className="px-7 py-3.5 bg-[var(--coral)] hover:bg-[var(--coral-dark)] text-white font-bold text-sm rounded-2xl transition-colors shadow-lg shadow-black/20"
                >
                  Create yours free →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────── */}
        <section className="bg-white py-20 px-5">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-8 flex items-center gap-3">
              <span className="inline-block w-6 h-1 rounded-full bg-[var(--coral)]" />
              Common Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details key={i} className="group rounded-2xl border-2 border-[#E8E3DC] open:border-[var(--coral)] bg-white overflow-hidden">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-semibold text-[var(--ink)] text-sm list-none select-none">
                    {faq.question}
                    <span className="ml-4 flex-shrink-0 w-6 h-6 rounded-full bg-[var(--cream-card)] group-open:bg-[var(--coral)] flex items-center justify-center transition-colors">
                      <svg className="group-open:rotate-180 transition-transform duration-200" width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-[var(--ink-muted)] leading-relaxed border-t border-[var(--cream-card)]">
                    <p className="pt-4">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
