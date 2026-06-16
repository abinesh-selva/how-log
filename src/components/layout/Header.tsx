"use client"

import Link from "next/link"
import { useState } from "react"

const TOOLS = [
  { label: "Age Calculator",   href: "/tools/age",             icon: "🎂" },
  { label: "Days Between",     href: "/tools/days-between",    icon: "📅" },
  { label: "Business Days",    href: "/tools/business-days",   icon: "💼" },
  { label: "Day of the Week",  href: "/tools/day-of-week",     icon: "📆" },
  { label: "Date Calculator",  href: "/tools/date-calculator", icon: "➕" },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)

  return (
    <header className="bg-[var(--teal)] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-[var(--coral)] flex items-center justify-center text-white text-sm font-bold group-hover:scale-110 transition-transform">
            T
          </div>
          <span className="font-bold text-white text-lg tracking-tight">HowLongToGo</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          <div
            className="relative"
            onMouseEnter={() => setToolsOpen(true)}
            onMouseLeave={() => setToolsOpen(false)}
          >
            <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white/80 hover:text-white rounded-xl hover:bg-white/10 transition-colors">
              Tools
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {toolsOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[var(--cream-card)] py-2 overflow-hidden">
                {TOOLS.map((t) => (
                  <Link
                    key={t.href}
                    href={t.href}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[var(--ink)] hover:bg-[var(--cream)] hover:text-[var(--coral)] transition-colors"
                  >
                    <span className="text-base">{t.icon}</span>
                    {t.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/countdown/create" className="px-4 py-2 text-sm font-semibold text-white/80 hover:text-white rounded-xl hover:bg-white/10 transition-colors">
            Countdown
          </Link>
          <Link href="/holiday/US/christmas" className="px-4 py-2 text-sm font-semibold text-white/80 hover:text-white rounded-xl hover:bg-white/10 transition-colors">
            Holidays
          </Link>

          <Link
            href="/countdown/create"
            className="ml-3 px-5 py-2.5 bg-[var(--coral)] hover:bg-[var(--coral-dark)] text-white text-sm font-bold rounded-2xl transition-all active:scale-95 shadow-sm"
          >
            Create Countdown
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <div className="flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-white rounded-full transition-all origin-center ${open ? "rotate-45 translate-y-2" : "w-5"}`} />
            <span className={`block h-0.5 bg-white rounded-full transition-all ${open ? "opacity-0 w-0" : "w-5"}`} />
            <span className={`block h-0.5 bg-white rounded-full transition-all origin-center ${open ? "-rotate-45 -translate-y-2" : "w-5"}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[var(--teal-mid)] border-t border-white/10 px-5 py-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40 mb-3">Tools</p>
          <div className="space-y-1">
            {TOOLS.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                <span>{t.icon}</span>{t.label}
              </Link>
            ))}
          </div>
          <div className="border-t border-white/10 mt-3 pt-3 space-y-1">
            <Link href="/countdown/create" onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors">Countdown</Link>
            <Link href="/holiday/US/christmas" onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors">Holidays</Link>
          </div>
          <div className="mt-4">
            <Link
              href="/countdown/create"
              onClick={() => setOpen(false)}
              className="block text-center py-3 bg-[var(--coral)] text-white text-sm font-bold rounded-2xl"
            >
              Create Countdown
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
