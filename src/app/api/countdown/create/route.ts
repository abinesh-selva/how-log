import { NextResponse } from "next/server"
import { randomBytes } from "crypto"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { title, targetDate, theme } = body

    if (!title || !targetDate || !theme) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const target = new Date(targetDate)
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
