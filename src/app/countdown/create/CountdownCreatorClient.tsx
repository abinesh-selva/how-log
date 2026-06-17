"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Select } from "@/components/ui/Select"
import type { CountdownTheme } from "@/types"

const THEMES: { value: CountdownTheme; label: string; emoji: string }[] = [
  { value: "birthday", label: "Birthday", emoji: "🎂" },
  { value: "wedding", label: "Wedding", emoji: "💍" },
  { value: "holiday", label: "Holiday / Vacation", emoji: "✈️" },
  { value: "graduation", label: "Graduation", emoji: "🎓" },
  { value: "retirement", label: "Retirement", emoji: "🏖️" },
  { value: "baby", label: "Baby Due Date", emoji: "👶" },
  { value: "anniversary", label: "Anniversary", emoji: "❤️" },
  { value: "default", label: "Other Event", emoji: "⏳" },
]

const THEME_COLORS: Record<CountdownTheme, string> = {
  birthday: "from-pink-500 to-rose-500",
  wedding: "from-purple-500 to-violet-500",
  holiday: "from-blue-500 to-cyan-500",
  graduation: "from-yellow-500 to-amber-500",
  retirement: "from-teal-500 to-emerald-500",
  baby: "from-sky-400 to-blue-400",
  anniversary: "from-red-500 to-pink-500",
  default: "from-slate-600 to-slate-700",
}

interface CountdownPreview {
  days: number
  hours: number
  minutes: number
  seconds: number
}

// Append T00:00:00 so the browser treats the date as local midnight, not UTC midnight
function parseLocalDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00")
}

function getCountdown(targetDate: string): CountdownPreview | null {
  if (!targetDate) return null
  const diff = parseLocalDate(targetDate).getTime() - Date.now()
  if (diff <= 0) return null
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)
  return { days, hours, minutes, seconds }
}

export function CountdownCreatorClient() {
  const [title, setTitle] = useState("")
  const [targetDate, setTargetDate] = useState("")
  const [theme, setTheme] = useState<CountdownTheme>("birthday")
  const [shareUrl, setShareUrl] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const [preview, setPreview] = useState<CountdownPreview | null>(() => getCountdown(targetDate))

  useEffect(() => {
    setPreview(getCountdown(targetDate))
    if (!targetDate) return
    const id = setInterval(() => setPreview(getCountdown(targetDate)), 1000)
    return () => clearInterval(id)
  }, [targetDate])

  const selectedTheme = THEMES.find((t) => t.value === theme)!
  const gradientClass = THEME_COLORS[theme]
  const minDate = new Date().toISOString().split("T")[0]

  async function handleCreate() {
    setError("")
    if (!title.trim()) { setError("Please enter a title for your countdown."); return }
    if (!targetDate) { setError("Please select a target date."); return }
    if (parseLocalDate(targetDate) <= new Date()) { setError("Target date must be in the future."); return }

    setLoading(true)
    try {
      const res = await fetch("/api/countdown/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, targetDate, theme }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Failed to create countdown")
      setShareUrl(`${window.location.origin}/countdown/${data.token}`)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  function copyUrl() {
    if (!shareUrl) return
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }).catch(() => {})
  }

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
        <Input
          id="cd-title"
          label="Countdown Title"
          type="text"
          placeholder="e.g. Sarah's 30th Birthday"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Input
          id="cd-date"
          label="Target Date"
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          min={minDate}
        />

        {/* Theme picker */}
        <div>
          <p className="text-sm font-medium text-slate-700 mb-2">Theme</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {THEMES.map((t) => (
              <button
                key={t.value}
                onClick={() => setTheme(t.value)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                  theme === t.value
                    ? "border-[var(--teal)] bg-[var(--teal)]/8 text-[var(--teal)]"
                    : "border-[#E0DAD1] text-[var(--ink-muted)] hover:border-[var(--coral)] hover:text-[var(--coral)]"
                }`}
              >
                <span>{t.emoji}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button onClick={handleCreate} size="lg" className="w-full" disabled={loading}>
          {loading ? "Creating…" : "Create Countdown"}
        </Button>
      </div>

      {/* Live Preview */}
      {preview && title && (
        <div className={`rounded-2xl bg-gradient-to-br ${gradientClass} p-8 text-white text-center`}>
          <p className="text-white/70 text-sm mb-1">Counting down to</p>
          <h2 className="text-2xl font-bold mb-6">
            {selectedTheme.emoji} {title || "Your Event"}
          </h2>
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "Days", value: preview.days },
              { label: "Hours", value: preview.hours },
              { label: "Minutes", value: preview.minutes },
              { label: "Seconds", value: preview.seconds },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/20 rounded-xl py-4">
                <div className="text-3xl font-bold tabular-nums">{String(value).padStart(2, "0")}</div>
                <div className="text-xs text-white/70 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Share URL */}
      {shareUrl && (
        <div className="bg-[var(--teal)] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🎉</span>
            <p className="text-white font-black text-base">Your countdown is live!</p>
          </div>
          <div className="flex gap-2 mb-3">
            <input
              readOnly
              value={shareUrl}
              className="flex-1 px-3 py-2 rounded-xl border border-white/20 bg-white/10 text-sm text-white font-mono placeholder-white/40 focus:outline-none"
            />
            <Button onClick={copyUrl} variant="teal" size="sm" className="bg-white !text-[var(--teal)] hover:bg-[var(--cream)] shrink-0 min-w-[72px]">
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
          <div className="flex gap-3">
            <a
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2.5 bg-[var(--coral)] hover:bg-[var(--coral-dark)] text-white text-sm font-black rounded-xl transition-colors"
            >
              View Countdown
            </a>
          </div>
          <p className="text-white/60 text-xs mt-3">Share this link with anyone — works on any device, free forever.</p>
        </div>
      )}
    </div>
  )
}
