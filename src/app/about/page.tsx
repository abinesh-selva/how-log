import type { Metadata } from "next"
import Link from "next/link"
import { Arrow } from "@/components/ui/Arrow"

export const metadata: Metadata = {
  title: "About — HowLongToGo",
  description:
    "HowLongToGo is a free collection of date calculators and countdown tools. Learn what we built and why.",
}

export default function AboutPage() {
  return (
    <main>
      {/* Header strip */}
      <div className="bg-[var(--teal)] py-14 px-5">
        <div className="max-w-6xl mx-auto">
          <nav className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-white/50 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>›</span>
            <span className="text-white">About</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-white">About HowLongToGo</h1>
          <p className="text-white/60 mt-2 text-base">Free date tools that are fast, accurate, and distraction-free.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-14 space-y-14">

        {/* Mission */}
        <section>
          <h2 className="text-xl font-bold text-[var(--ink)] mb-4 flex items-center gap-3">
            <span className="inline-block w-6 h-1 rounded-full bg-[var(--coral)]" />
            What we do
          </h2>
          <p className="text-[var(--ink-muted)] leading-relaxed">
            HowLongToGo is a free collection of date and time tools. We built it because most
            online calculators are slow, covered in ads, and require accounts for things that
            should take three seconds. Our tools are designed to give you an answer the moment
            you arrive — no sign-up, no paywalls, no clutter.
          </p>
        </section>

        {/* Tool list */}
        <section>
          <h2 className="text-xl font-bold text-[var(--ink)] mb-6 flex items-center gap-3">
            <span className="inline-block w-6 h-1 rounded-full bg-[var(--coral)]" />
            What you can do here
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: "Age Calculator",      body: "Your exact age — years, months, days, even heartbeats.", href: "/tools/age",             accent: "coral" },
              { label: "Days Between Dates",  body: "Count the calendar days between any two dates.",          href: "/tools/days-between",    accent: "teal"  },
              { label: "Business Day Counter",body: "Working days excluding weekends and public holidays.",    href: "/tools/business-days",   accent: "green" },
              { label: "Day of the Week",     body: "Find what day any date in history or the future fell on.",href: "/tools/day-of-week",     accent: "coral" },
              { label: "Date Calculator",     body: "Add or subtract days, weeks, months, or years.",         href: "/tools/date-calculator", accent: "teal"  },
              { label: "Countdown Builder",   body: "Create a shareable link that counts down to any event.",  href: "/countdown/create",      accent: "green" },
            ].map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="group flex items-start gap-4 p-5 rounded-2xl border-2 border-[#E8E3DC] hover:border-[var(--coral)] hover:bg-[var(--cream)] transition-colors"
              >
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  t.accent === "coral" ? "bg-[var(--coral)]" :
                  t.accent === "teal"  ? "bg-[var(--teal)]" :
                  "bg-[var(--green)]"
                }`} />
                <div>
                  <p className="font-semibold text-[var(--ink)] text-sm group-hover:text-[var(--coral)] transition-colors">{t.label}</p>
                  <p className="text-xs text-[var(--ink-muted)] mt-0.5 leading-relaxed">{t.body}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Values */}
        <section>
          <h2 className="text-xl font-bold text-[var(--ink)] mb-6 flex items-center gap-3">
            <span className="inline-block w-6 h-1 rounded-full bg-[var(--coral)]" />
            Our principles
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "No account required",
                body: "Every tool on this site works without signing in. Your data never leaves your browser — all calculations happen locally.",
              },
              {
                title: "Accuracy first",
                body: "Date math is deceptively complex. We handle leap years, daylight saving shifts, calendar edge cases, and country-specific public holidays correctly.",
              },
              {
                title: "Minimal footprint",
                body: "We don't run unnecessary trackers. We collect only what we need to keep the site running and improving.",
              },
              {
                title: "Always free",
                body: "The core tools are free and will stay free. If we ever add premium features, the free tier will remain fully functional.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-5 rounded-2xl bg-[var(--cream)] border border-[#E8E3DC]">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--coral)] mt-2 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-[var(--ink)] text-sm">{item.title}</p>
                  <p className="text-sm text-[var(--ink-muted)] mt-1 leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="bg-[var(--teal)] rounded-3xl px-8 py-10">
          <h2 className="text-xl font-bold text-white mb-2">Questions or feedback?</h2>
          <p className="text-white/60 text-sm leading-relaxed mb-6">
            Found a bug, need a country added to the holiday list, or just want to say hi?
            We read every message.
          </p>
          <a
            href="mailto:hello@howlongtogo.app"
            className="inline-block px-6 py-3 bg-[var(--coral)] hover:bg-[var(--coral-dark)] text-white font-bold text-sm rounded-2xl transition-colors"
          >
            <span className="flex items-center gap-2">Send a message <Arrow size={13} /></span>
          </a>
        </section>

      </div>
    </main>
  )
}
