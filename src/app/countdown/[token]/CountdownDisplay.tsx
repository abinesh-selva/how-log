"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import type { CountdownTheme } from "@/types"
import { EmojiRain } from "@/components/ui/EmojiRain"

import { VantaFog } from "@/components/ui/VantaFog"

const THEME_HEX_COLORS: Record<CountdownTheme, number> = {
  birthday: 0xec4899,
  wedding: 0xa855f7,
  holiday: 0x06b6d4,
  graduation: 0xf59e0b,
  retirement: 0x14b8a6,
  baby: 0x38bdf8,
  anniversary: 0xf43f5e,
  default: 0x475569,
}

const THEME_EMOJIS: Record<CountdownTheme, string> = {
  birthday: "🎂", wedding: "💍", holiday: "✈️",
  graduation: "🎓", retirement: "🏖️", baby: "👶",
  anniversary: "❤️", default: "⏳",
}

interface Props {
  title: string
  targetDate: string
  theme: CountdownTheme
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  isExpired: boolean
}

function parseLocalDate(dateStr: string) {
  // Treat DATE strings as local midnight, not UTC midnight
  return /^\d{4}-\d{2}-\d{2}$/.test(dateStr)
    ? new Date(dateStr + "T00:00:00")
    : new Date(dateStr)
}

function calcTimeLeft(targetDate: string): TimeLeft {
  const diff = parseLocalDate(targetDate).getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true }
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    isExpired: false,
  }
}

export function CountdownDisplay({ title, targetDate, theme }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)
  const [isShared, setIsShared] = useState(false)

  useEffect(() => {
    setTimeLeft(calcTimeLeft(targetDate))
    const timer = setInterval(() => setTimeLeft(calcTimeLeft(targetDate)), 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  const hexColor = THEME_HEX_COLORS[theme]
  const emoji = THEME_EMOJIS[theme]
  const dateFormatted = parseLocalDate(targetDate).toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  })

  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ title: `Countdown to ${title}`, url: window.location.href })
      } else {
        throw new Error("Web Share not supported")
      }
    } catch (err: any) {
      if (err.name !== "AbortError") {
        try {
          await navigator.clipboard.writeText(window.location.href)
          setIsShared(true)
          setTimeout(() => setIsShared(false), 2000)
        } catch (clipboardErr) {
          console.error("Failed to copy to clipboard", clipboardErr)
        }
      }
    }
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] relative overflow-hidden flex items-center justify-center bg-slate-900 px-4 py-12">
      <VantaFog color={hexColor} baseColor={0x0f172a} opacity={1} />
      <EmojiRain emoji={emoji} count={30} />
      <div className="text-white text-center max-w-xl w-full relative z-10">
        <p className="text-white/70 text-sm font-medium uppercase tracking-widest mb-2">Counting down to</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-1">
          {emoji} {title}
        </h1>
        <p className="text-white/60 text-sm mb-10">{dateFormatted}</p>

        {timeLeft === null ? (
          /* Loading skeleton — shown only before first client tick */
          <div className="grid grid-cols-4 gap-3 md:gap-5 mb-10">
            {["Days", "Hours", "Minutes", "Seconds"].map((label) => (
              <div key={label} className="bg-white/20 backdrop-blur rounded-2xl py-5 md:py-7">
                <div className="text-4xl md:text-5xl font-bold tabular-nums leading-none opacity-30">--</div>
                <div className="text-xs md:text-sm text-white/70 mt-2 uppercase tracking-wide">{label}</div>
              </div>
            ))}
          </div>
        ) : timeLeft.isExpired ? (
          <div className="text-5xl font-bold animate-pulse mb-10">🎉 It&apos;s here!</div>
        ) : (
          <div className="grid grid-cols-4 gap-3 md:gap-5 mb-10">
            {[
              { label: "Days",    value: timeLeft.days    },
              { label: "Hours",   value: timeLeft.hours   },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/20 backdrop-blur rounded-2xl py-5 md:py-7">
                <div className="text-4xl md:text-5xl font-bold tabular-nums leading-none">
                  {String(value).padStart(2, "0")}
                </div>
                <div className="text-xs md:text-sm text-white/70 mt-2 uppercase tracking-wide">{label}</div>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={share}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-medium transition-colors backdrop-blur min-w-[160px]"
          >
            {isShared ? "Copied Link!" : "Share Countdown"}
          </button>
          <Link
            href="/countdown/create"
            className="px-6 py-3 bg-white text-slate-900 hover:bg-white/90 rounded-xl text-sm font-medium transition-colors"
          >
            Create Your Own
          </Link>
        </div>
      </div>
    </div>
  )
}
