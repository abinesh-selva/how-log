import Link from "next/link"

const TOOLS = [
  { label: "Age Calculator",   href: "/tools/age" },
  { label: "Days Between",     href: "/tools/days-between" },
  { label: "Business Days",    href: "/tools/business-days" },
  { label: "Day of the Week",  href: "/tools/day-of-week" },
  { label: "Date Calculator",  href: "/tools/date-calculator" },
]

const POPULAR = [
  { label: "How long ago was 2000?",  href: "/date/2000" },
  { label: "How long ago was 1990?",  href: "/date/1990" },
  { label: "How long until Christmas?", href: "/date/december/25" },
  { label: "How long until New Year?",  href: "/date/january/1" },
  { label: "100 days from today",      href: "/days-from-today/100" },
  { label: "30 days from today",       href: "/days-from-today/30" },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[var(--teal)] text-white/60">
      <div className="max-w-6xl mx-auto px-5 pt-16 pb-10">

        {/* CTA strip */}
        <div className="bg-[var(--coral)] rounded-3xl px-8 py-8 mb-14 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <p className="text-white font-bold text-xl">Start your countdown today</p>
            <p className="text-white/80 text-sm mt-1">Create a shareable countdown to any moment that matters.</p>
          </div>
          <Link
            href="/countdown/create"
            className="flex-shrink-0 px-6 py-3 bg-white text-[var(--coral)] font-bold text-sm rounded-2xl hover:bg-[var(--cream)] transition-colors"
          >
            Create Free Countdown →
          </Link>
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-full bg-[var(--coral)] flex items-center justify-center text-white text-xs font-bold">T</div>
              <span className="text-white font-bold text-base">HowLongToGo</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Free date calculators, live countdowns, and time tools for every occasion.
            </p>
          </div>

          <div>
            <p className="text-white text-xs font-bold uppercase tracking-[0.15em] mb-4">Tools</p>
            <ul className="space-y-2.5">
              {TOOLS.map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className="text-sm hover:text-white transition-colors">{t.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white text-xs font-bold uppercase tracking-[0.15em] mb-4">Popular</p>
            <ul className="space-y-2.5">
              {POPULAR.map((d) => (
                <li key={d.href}>
                  <Link href={d.href} className="text-sm hover:text-white transition-colors">{d.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <p>© {year} HowLongToGo. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
