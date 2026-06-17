import { NextResponse } from "next/server"
import { randomBytes } from "crypto"

const VALID_THEMES = new Set(["birthday", "wedding", "holiday", "graduation", "retirement", "baby", "anniversary", "default"])

function parseLocalDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00")
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { title, targetDate, theme } = body

    if (!title?.trim() || !targetDate || !theme) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    if (!VALID_THEMES.has(theme)) {
      return NextResponse.json({ error: "Invalid theme" }, { status: 400 })
    }

    const target = parseLocalDate(targetDate)
    if (isNaN(target.getTime()) || target <= new Date()) {
      return NextResponse.json({ error: "Target date must be a valid future date" }, { status: 400 })
    }

    const token = randomBytes(8).toString("hex") // 16-char URL-safe token
    const safeTitle = title.trim().slice(0, 100)

    const { sql } = await import("@/lib/db")
    await sql`
      INSERT INTO countdowns (title, target_date, theme, share_token, created_at)
      VALUES (${safeTitle}, ${targetDate}, ${theme}, ${token}, NOW())
    `

    return NextResponse.json({ token })
  } catch (error) {
    console.error("Countdown create error:", error)
    return NextResponse.json({ error: "Failed to create countdown" }, { status: 500 })
  }
}
