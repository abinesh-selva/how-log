"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { LogoMark } from "@/components/ui/Logo"
import { Arrow } from "@/components/ui/Arrow"

const TOOLS = [
  { label: "Age Calculator",   href: "/tools/age",             icon: "🎂" },
  { label: "Days Between",     href: "/tools/days-between",    icon: "📅" },
  { label: "Business Days",    href: "/tools/business-days",   icon: "💼" },
  { label: "Day of the Week",  href: "/tools/day-of-week",     icon: "📆" },
  { label: "Date Calculator",  href: "/tools/date-calculator", icon: "➕" },
]

export function Header() {
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [toolsOpen,  setToolsOpen]    = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!toolsOpen) return
    function onOutsideClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setToolsOpen(false)
      }
    }
    document.addEventListener("mousedown", onOutsideClick)
    return () => document.removeEventListener("mousedown", onOutsideClick)
  }, [toolsOpen])

  // Close dropdown on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setToolsOpen(false)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  function closeAll() {
    setToolsOpen(false)
    setMobileOpen(false)
  }

  return (
    <header className="bg-[var(--teal)] sticky top-0 z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="group-hover:scale-110 transition-transform">
            <LogoMark size={32} />
          </div>
          <span className="font-black text-white text-base tracking-tight">HowLongToGo</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">

          {/* Tools dropdown — click based */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setToolsOpen((v) => !v)}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl transition-colors ${
                toolsOpen ? "bg-white/15 text-white" : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              Tools
              <svg
                width="12" height="12" viewBox="0 0 12 12" fill="none"
                className={`transition-transform duration-200 ${toolsOpen ? "rotate-180" : ""}`}
              >
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Dropdown panel */}
            {toolsOpen && (
              <div className="absolute top-full left-0 mt-1 w-60 bg-white rounded-2xl shadow-2xl shadow-black/15 border border-[#E8E3DC] overflow-hidden">
                {/* Tip arrow */}
                <div className="absolute -top-1.5 left-6 w-3 h-3 bg-white border-l border-t border-[#E8E3DC] rotate-45" />

                <div className="py-2 relative">
                  {TOOLS.map((t) => (
                    <Link
                      key={t.href}
                      href={t.href}
                      onClick={closeAll}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-[var(--ink)] hover:bg-[var(--cream)] hover:text-[var(--coral)] transition-colors"
                    >
                      <span className="text-base w-5 text-center">{t.icon}</span>
                      {t.label}
                    </Link>
                  ))}

                  <div className="mx-4 my-1 border-t border-[#F0EBE3]" />

                  <Link
                    href="/countdown/create"
                    onClick={closeAll}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-black text-[var(--coral)] hover:bg-[var(--cream)] transition-colors"
                  >
                    <span className="text-base w-5 text-center">⏱</span>
                    Countdown Builder
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/holiday/US/christmas"
            className="px-4 py-2 text-sm font-semibold text-white/80 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
          >
            Holidays
          </Link>

          <Link
            href="/about"
            className="px-4 py-2 text-sm font-semibold text-white/80 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
          >
            About
          </Link>

          <Link
            href="/countdown/create"
            className="ml-3 px-5 py-2.5 bg-[var(--coral)] hover:bg-[var(--coral-dark)] text-white text-sm font-bold rounded-2xl transition-all active:scale-95 shadow-md shadow-[var(--coral)]/30"
          >
            Create Countdown
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <div className="flex flex-col gap-1.5 w-5">
            <span className={`block h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 px-5 py-5" style={{ background: "var(--teal-mid)" }}>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/35 mb-3">Tools</p>
          <div className="space-y-0.5">
            {TOOLS.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                onClick={closeAll}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                <span className="text-base">{t.icon}</span>
                {t.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-white/10 mt-4 pt-4 space-y-0.5">
            <Link href="/countdown/create" onClick={closeAll} className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors">
              <span>⏱</span> Countdown Builder
            </Link>
            <Link href="/holiday/US/christmas" onClick={closeAll} className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors">
              <span>🎄</span> Holidays
            </Link>
            <Link href="/about" onClick={closeAll} className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors">
              <span>ℹ️</span> About
            </Link>
          </div>

          <div className="mt-4">
            <Link
              href="/countdown/create"
              onClick={closeAll}
              className="block text-center py-3.5 bg-[var(--coral)] text-white text-sm font-black rounded-2xl shadow-lg shadow-[var(--coral)]/25"
            >
              <span className="flex items-center justify-center gap-2">Create Countdown <Arrow size={13} /></span>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
