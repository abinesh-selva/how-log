import Link from "next/link"
import type { Metadata } from "next"
import { JsonLd } from "@/components/shared/JsonLd"
import { buildFAQSchema, buildWebApplicationSchema } from "@/lib/schema/jsonld"
import { Arrow } from "@/components/ui/Arrow"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "HowLongToGo — Date Calculators & Countdown Timers",
  description:
    "Free date calculators, age calculator, business day counter, and shareable countdown timers. No ads. No account.",
}

const faqs = [
  {
    question: "How do I calculate how many days until a date?",
    answer:
      "Use the Days Between tool — enter today and your target date. Or visit any /date/month/day page for instant answers on popular dates.",
  },
  {
    question: "Does the age calculator account for leap years?",
    answer:
      "Yes. All calculations use the Luxon date library which handles leap years, DST shifts, and calendar edge cases precisely.",
  },
  {
    question: "Can I share my countdown with someone else?",
    answer:
      "Yes — create a countdown and you get a permanent shareable link. Anyone with the link sees the live countdown. No account needed.",
  },
  {
    question: "Which countries do you support for business day calculations?",
    answer:
      "Currently United States, United Kingdom, Canada, Australia, and Germany, with more countries added regularly.",
  },
]

const TRENDING = [
  { label: "How long since 2000?",      href: "/date/2000" },
  { label: "Days until Christmas",       href: "/date/december/25" },
  { label: "How long since 1990?",       href: "/date/1990" },
  { label: "100 days from today",        href: "/days-from-today/100" },
  { label: "How long since 1980?",       href: "/date/1980" },
  { label: "Days until New Year",        href: "/date/january/1" },
  { label: "30 days from today",         href: "/days-from-today/30" },
  { label: "How long since 1970?",       href: "/date/1970" },
  { label: "How long since 2010?",       href: "/date/2010" },
  { label: "180 days from today",        href: "/days-from-today/180" },
  { label: "Days until Halloween",       href: "/date/october/31" },
  { label: "Days until Valentine's Day", href: "/date/february/14" },
]

export default function Home() {
  // Server-side real numbers — updated every revalidate cycle
  const now = new Date()
  const daysSince2000 = Math.floor(
    (now.getTime() - new Date(2000, 0, 1).getTime()) / 86400000
  )
  const xmas = new Date(now.getFullYear(), 11, 25)
  if (xmas < now) xmas.setFullYear(xmas.getFullYear() + 1)
  const daysToXmas = Math.ceil((xmas.getTime() - now.getTime()) / 86400000)

  const ny = new Date(now.getFullYear() + 1, 0, 1)
  const daysToNY = Math.ceil((ny.getTime() - now.getTime()) / 86400000)

  return (
    <>
      <JsonLd data={buildFAQSchema(faqs)} />
      <JsonLd data={buildWebApplicationSchema("HowLongToGo", "Free date calculators and countdown tools")} />

      <main>

        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="bg-[var(--teal)] bg-dot-grid relative overflow-hidden">
          {/* Ambient blobs */}
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.06]"
            style={{ background: "radial-gradient(circle, var(--coral), transparent 70%)" }} />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-[0.05]"
            style={{ background: "radial-gradient(circle, var(--green), transparent 70%)" }} />

          <div className="relative max-w-7xl mx-auto px-5 py-24 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* Left ── copy */}
              <div>
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white leading-[0.88] tracking-tighter">
                  Time<br />
                  <span className="text-gradient-coral">answers</span>,<br />
                  instantly.
                </h1>

                <p className="mt-7 text-white/50 text-base md:text-lg max-w-sm leading-relaxed">
                  Five free date tools, a live countdown builder, and 1,024 pre-calculated date pages.
                </p>

                <div className="mt-10 flex flex-wrap gap-3">
                  <Link
                    href="/tools/age"
                    className="px-7 py-4 bg-[var(--coral)] hover:bg-[var(--coral-dark)] text-white font-black text-sm rounded-2xl transition-all active:scale-95 shadow-xl shadow-[var(--coral)]/25"
                  >
                    <span className="flex items-center gap-2">Calculate my age <Arrow size={13} /></span>
                  </Link>
                  <Link
                    href="/countdown/create"
                    className="px-7 py-4 text-white font-bold text-sm rounded-2xl border border-white/20 hover:bg-white/10 transition-colors"
                  >
                    Create countdown
                  </Link>
                </div>

                {/* Mini stat strip */}
                <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-6">
                  {[
                    { num: "1,024", label: "Pages" },
                    { num: "5",     label: "Free tools" },
                    { num: "0",     label: "Ads" },
                  ].map((s) => (
                    <div key={s.label}>
                      <p className="text-2xl font-black text-white tabular-nums">{s.num}</p>
                      <p className="text-white/35 text-[10px] font-black uppercase tracking-[0.15em] mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right ── floating metric cards (desktop only) */}
              <div className="hidden lg:block relative h-[420px]">
                {/* Main card */}
                <div className="absolute inset-x-0 top-6 bg-white/8 border border-white/12 backdrop-blur-sm rounded-3xl p-8 text-center"
                  style={{ background: "rgba(255,255,255,0.07)" }}>
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Days since Jan 1, 2000</p>
                  <p className="text-8xl font-black text-white tabular-nums leading-none">
                    {daysSince2000.toLocaleString()}
                  </p>
                  <p className="text-white/25 text-xs mt-4">Updated hourly · try the calculator below</p>
                  <div className="mt-5 flex justify-center gap-2">
                    {["days", "weeks", "months", "years"].map((u) => (
                      <span key={u} className="px-3 py-1 rounded-full text-white/40 text-[11px] font-semibold"
                        style={{ background: "rgba(255,255,255,0.08)" }}>
                        {u}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Floating badge – Christmas */}
                <div className="absolute -bottom-2 left-2 bg-[var(--coral)] rounded-2xl px-5 py-4 shadow-2xl shadow-black/30 animate-float">
                  <p className="text-white/70 text-[10px] font-black uppercase tracking-widest">Until Christmas</p>
                  <p className="text-4xl font-black text-white tabular-nums leading-none mt-1">{daysToXmas}</p>
                  <p className="text-white/50 text-[11px] mt-1">days to go</p>
                </div>

                {/* Floating badge – New Year */}
                <div className="absolute -bottom-2 right-2 bg-[var(--green)] rounded-2xl px-5 py-4 shadow-2xl shadow-black/30 animate-float-delayed">
                  <p className="text-white/70 text-[10px] font-black uppercase tracking-widest">Until New Year</p>
                  <p className="text-4xl font-black text-white tabular-nums leading-none mt-1">{daysToNY}</p>
                  <p className="text-white/50 text-[11px] mt-1">days to go</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Bento tool grid ───────────────────────────────────── */}
        <section className="bg-white py-20 px-5">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--coral)]">The toolkit</p>
              <h2 className="text-3xl sm:text-4xl font-black text-[var(--ink)] mt-2 tracking-tighter leading-tight">
                Every time tool<br className="hidden sm:block" /> you&apos;ll ever need.
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4">

              {/* Age Calculator — featured */}
              <Link
                href="/tools/age"
                className="col-span-2 md:col-span-4 group relative overflow-hidden bg-[var(--teal)] rounded-3xl p-7 md:p-9 flex flex-col justify-between min-h-[200px]"
              >
                <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full opacity-10"
                  style={{ background: "var(--coral)" }} />
                <div className="absolute right-12 bottom-4 w-24 h-24 rounded-full opacity-[0.06]"
                  style={{ background: "white" }} />
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-[var(--coral)]/20 text-[var(--coral)] text-[10px] font-black uppercase tracking-widest mb-4">
                    Most popular
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tight">Age Calculator</h3>
                  <p className="text-white/50 text-sm mt-2 max-w-xs leading-relaxed">
                    Not just years. Get your exact age in heartbeats, breaths, and full moons lived.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[var(--coral)] text-sm font-black mt-6 group-hover:gap-3 transition-all">
                  Calculate now <Arrow size={13} />
                </div>
              </Link>

              {/* Days Between */}
              <Link
                href="/tools/days-between"
                className="col-span-2 group relative overflow-hidden bg-[var(--coral)] rounded-3xl p-6 flex flex-col justify-between min-h-[160px]"
              >
                <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white opacity-10" />
                <div>
                  <p className="text-white/60 text-[10px] font-black uppercase tracking-widest">Days Between</p>
                  <h3 className="text-xl font-black text-white mt-2 leading-tight">Count the days</h3>
                  <p className="text-white/60 text-xs mt-1.5">Between any two dates, instantly.</p>
                </div>
                <div className="flex items-center gap-1.5 text-white text-sm font-black mt-4 group-hover:underline">Try it <Arrow size={12} /></div>
              </Link>

              {/* Business Days */}
              <Link
                href="/tools/business-days"
                className="col-span-1 md:col-span-2 group relative overflow-hidden rounded-3xl p-6 flex flex-col justify-between min-h-[160px]"
                style={{ background: "var(--ink)" }}
              >
                <div className="absolute right-0 top-0 w-20 h-20 rounded-full opacity-10"
                  style={{ background: "var(--green)", transform: "translate(30%, -30%)" }} />
                <div>
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Business Days</p>
                  <h3 className="text-xl font-black text-white mt-2 leading-tight">Skip weekends</h3>
                  <p className="text-white/40 text-xs mt-1.5">Holidays excluded by country.</p>
                </div>
                <div className="flex items-center gap-1.5 text-white/60 text-sm font-black mt-4 group-hover:text-white transition-colors">Try it <Arrow size={12} /></div>
              </Link>

              {/* Day of the Week */}
              <Link
                href="/tools/day-of-week"
                className="col-span-1 md:col-span-2 group relative overflow-hidden bg-[var(--cream-card)] rounded-3xl p-6 flex flex-col justify-between min-h-[160px]"
              >
                <div className="absolute right-2 bottom-2 w-16 h-16 rounded-full bg-[var(--pink)] opacity-40" />
                <div>
                  <p className="text-[var(--ink-muted)] text-[10px] font-black uppercase tracking-widest">Day of Week</p>
                  <h3 className="text-xl font-black text-[var(--ink)] mt-2 leading-tight">What day was it?</h3>
                  <p className="text-[var(--ink-muted)] text-xs mt-1.5">Any date, past or future.</p>
                </div>
                <div className="flex items-center gap-1.5 text-[var(--coral)] text-sm font-black mt-4 group-hover:underline">Try it <Arrow size={12} /></div>
              </Link>

              {/* Date Calculator */}
              <Link
                href="/tools/date-calculator"
                className="col-span-2 md:col-span-2 group relative overflow-hidden bg-[var(--green)] rounded-3xl p-6 flex flex-col justify-between min-h-[160px]"
              >
                <div className="absolute -left-4 -bottom-4 w-24 h-24 rounded-full bg-white opacity-[0.08]" />
                <div>
                  <p className="text-white/60 text-[10px] font-black uppercase tracking-widest">Date Calculator</p>
                  <h3 className="text-xl font-black text-white mt-2 leading-tight">Add or subtract</h3>
                  <p className="text-white/60 text-xs mt-1.5">Days, weeks, months, or years.</p>
                </div>
                <div className="flex items-center gap-1.5 text-white text-sm font-black mt-4 group-hover:underline">Try it <Arrow size={12} /></div>
              </Link>

            </div>
          </div>
        </section>

        {/* ── Stats strip ───────────────────────────────────────── */}
        <section className="py-14 px-5" style={{ background: "var(--ink)" }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
              {[
                { num: "1,024",  label: "Searchable pages" },
                { num: "5",      label: "Free tools"        },
                { num: "0",      label: "Ads"               },
                { num: "0",      label: "Sign-ups needed"   },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-4xl md:text-5xl font-black text-white tabular-nums">{s.num}</p>
                  <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.15em] mt-2">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Trending lookups ──────────────────────────────────── */}
        <section className="bg-[var(--cream)] py-20 px-5">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--coral)]">Trending</p>
                <h2 className="text-2xl sm:text-3xl font-black text-[var(--ink)] mt-1.5 tracking-tighter">
                  What people are searching
                </h2>
              </div>
              <Link href="/date/2000" className="hidden sm:block text-xs font-black text-[var(--ink-muted)] hover:text-[var(--coral)] uppercase tracking-widest transition-colors flex-shrink-0">
                <span className="flex items-center gap-1.5">All years <Arrow size={11} /></span>
              </Link>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {TRENDING.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2.5 rounded-full border-2 border-[#E0DAD1] bg-white text-sm font-semibold text-[var(--ink)] hover:border-[var(--coral)] hover:text-[var(--coral)] transition-all duration-150 active:scale-95"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Countdown CTA ─────────────────────────────────────── */}
        <section className="bg-[var(--coral)] py-20 px-5 relative overflow-hidden">
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full opacity-[0.12]"
            style={{ background: "white" }} />
          <div className="absolute left-1/3 bottom-0 w-48 h-48 rounded-full opacity-[0.06]"
            style={{ background: "var(--ink)", transform: "translateY(50%)" }} />

          <div className="relative max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

              <div>
                <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em] mb-5">Countdown builder</p>
                <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tighter">
                  Make your<br />moment count —<br />
                  <span className="text-white/70">literally.</span>
                </h2>
                <p className="mt-5 text-white/60 text-base leading-relaxed max-w-sm">
                  Create a live countdown to anything. Share it as a link. Works on any device. Free, forever.
                </p>
                <Link
                  href="/countdown/create"
                  className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-white text-[var(--coral)] font-black text-sm rounded-2xl hover:bg-[var(--cream)] transition-colors shadow-2xl shadow-black/20"
                >
                  <span className="flex items-center gap-2">Start building <Arrow size={13} /></span>
                </Link>
              </div>

              {/* Mock countdown widget */}
              <div className="flex justify-center lg:justify-end">
                <div className="w-full max-w-sm rounded-3xl p-7 border border-white/20"
                  style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)" }}>
                  <p className="text-white/60 text-[10px] font-black uppercase tracking-widest text-center mb-6">Days until graduation</p>
                  <div className="grid grid-cols-4 gap-2">
                    {[{ v: "47", l: "Days" }, { v: "14", l: "Hrs" }, { v: "32", l: "Mins" }, { v: "08", l: "Secs" }].map(({ v, l }) => (
                      <div key={l} className="rounded-2xl py-4 text-center" style={{ background: "rgba(255,255,255,0.18)" }}>
                        <p className="text-3xl font-black text-white tabular-nums leading-none">{v}</p>
                        <p className="text-white/60 text-[10px] font-bold mt-1.5">{l}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 text-center text-white/40 text-xs font-semibold tracking-wide">
                    🔗 howlongtogo.app/c/xyz123
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <section className="bg-white py-20 px-5">
          <div className="max-w-3xl mx-auto">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--coral)] mb-2">FAQ</p>
            <h2 className="text-2xl font-black text-[var(--ink)] mb-8 tracking-tighter">Common questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-2xl border-2 border-[#E8E3DC] open:border-[var(--coral)] bg-white overflow-hidden"
                >
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-bold text-[var(--ink)] text-sm list-none select-none">
                    {faq.question}
                    <span className="ml-4 flex-shrink-0 w-6 h-6 rounded-full bg-[var(--cream-card)] group-open:bg-[var(--coral)] flex items-center justify-center transition-colors">
                      <svg className="group-open:rotate-180 transition-transform duration-200" width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-5 pb-5 border-t border-[var(--cream-card)]">
                    <p className="pt-4 text-sm text-[var(--ink-muted)] leading-relaxed">{faq.answer}</p>
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
