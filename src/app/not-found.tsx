import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page Not Found — HowLongToGo",
}

const QUICK_LINKS = [
  { label: "Age Calculator",   href: "/tools/age"             },
  { label: "Days Between",     href: "/tools/days-between"    },
  { label: "Business Days",    href: "/tools/business-days"   },
  { label: "Day of the Week",  href: "/tools/day-of-week"     },
  { label: "Date Calculator",  href: "/tools/date-calculator" },
  { label: "Create Countdown", href: "/countdown/create"      },
]

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-5 py-20 bg-[var(--cream)]">
      <div className="text-center max-w-lg">
        <div className="text-8xl font-black text-[var(--teal)] leading-none mb-4">404</div>
        <h1 className="text-2xl font-black text-[var(--ink)] tracking-tighter mb-3">
          That page doesn&apos;t exist.
        </h1>
        <p className="text-[var(--ink-muted)] text-base mb-10">
          But time keeps moving. Here&apos;s where you can go from here:
        </p>

        <div className="flex flex-wrap gap-2.5 justify-center mb-10">
          {QUICK_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-4 py-2.5 rounded-full border-2 border-[#E0DAD1] bg-white text-sm font-semibold text-[var(--ink)] hover:border-[var(--coral)] hover:text-[var(--coral)] transition-all"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--teal)] text-white font-black text-sm rounded-2xl hover:bg-[var(--teal)]/90 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </main>
  )
}
