"use client"

import { useEffect, useState } from "react"

interface EmojiRainProps {
  emoji: string
  count?: number
}

interface Drop {
  id: number
  left: string
  animationDuration: string
  animationDelay: string
  fontSize: string
}

export function EmojiRain({ emoji, count = 20 }: EmojiRainProps) {
  const [drops, setDrops] = useState<Drop[]>([])

  useEffect(() => {
    // Generate random positions and delays only on the client
    // to avoid React hydration mismatches
    const newDrops: Drop[] = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      animationDuration: `${3 + Math.random() * 4}s`,
      animationDelay: `${Math.random() * 5}s`,
      fontSize: `${1 + Math.random() * 1.5}rem`,
    }))
    setDrops(newDrops)
  }, [count])

  if (drops.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="absolute top-0 animate-emoji-rain opacity-60"
          style={{
            left: drop.left,
            animationDuration: drop.animationDuration,
            animationDelay: drop.animationDelay,
            fontSize: drop.fontSize,
          }}
        >
          {emoji}
        </div>
      ))}
    </div>
  )
}
