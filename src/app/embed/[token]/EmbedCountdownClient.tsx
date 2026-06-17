"use client"

import { useEffect, useState } from "react"
import type { CountdownTheme } from "@/types"
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

export function EmbedCountdownClient({ title, targetDate, theme }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)

  useEffect(() => {
    setTimeLeft(calcTimeLeft(targetDate))
    const timer = setInterval(() => setTimeLeft(calcTimeLeft(targetDate)), 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  const hexColor = THEME_HEX_COLORS[theme]

  return (
    <div className="w-full h-full relative overflow-hidden rounded-2xl flex flex-col items-center justify-center bg-slate-900 border border-white/10 shadow-2xl">
      <div className="absolute inset-0">
        <VantaFog color={hexColor} baseColor={0x0f172a} opacity={0.6} />
      </div>
      
      <div className="relative z-10 text-center w-full px-4">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-6 line-clamp-2">
          {title}
        </h2>

        {timeLeft === null ? (
          <div className="animate-pulse flex gap-2 justify-center">
             <div className="w-16 h-16 bg-white/10 rounded-xl" />
             <div className="w-16 h-16 bg-white/10 rounded-xl" />
             <div className="w-16 h-16 bg-white/10 rounded-xl" />
          </div>
        ) : timeLeft.isExpired ? (
          <div className="text-3xl font-bold text-white animate-bounce">🎉 Arrived!</div>
        ) : (
          <div className="grid grid-cols-4 gap-2 md:gap-3 max-w-md mx-auto">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hrs", value: timeLeft.hours },
              { label: "Min", value: timeLeft.minutes },
              { label: "Sec", value: timeLeft.seconds },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/10 backdrop-blur-md rounded-xl py-3 border border-white/5 shadow-inner">
                <div className="text-2xl md:text-3xl font-black text-white tabular-nums leading-none">
                  {String(value).padStart(2, "0")}
                </div>
                <div className="text-[10px] md:text-xs text-white/60 mt-1 uppercase tracking-wider font-bold">
                  {label}
                </div>
              </div>
            ))}
          </div>
        )}
        
        <a 
          href="https://howlongtogo.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block mt-6 text-[10px] text-white/40 hover:text-white/80 transition-colors uppercase tracking-widest font-bold"
        >
          Powered by HowLongToGo
        </a>
      </div>
    </div>
  )
}
