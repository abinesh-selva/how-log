import { NextResponse } from "next/server"
import { generateObject } from "ai"
import { anthropic } from "@ai-sdk/anthropic"
import { z } from "zod"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

// Set up rate limiting to prevent abuse
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 m"), // 5 requests per minute
})

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1"
    const { success } = await ratelimit.limit(`nl-parse:${ip}`)

    if (!success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 })
    }

    const { query } = await req.json()
    if (!query) return NextResponse.json({ error: "Missing query" }, { status: 400 })

    const today = new Date().toISOString()

    const { object } = await generateObject({
      model: anthropic("claude-3-haiku-20240307"),
      schema: z.object({
        targetDate: z.string().describe("The extracted date in YYYY-MM-DD format"),
        title: z.string().describe("A short summary title of the event (e.g. 'Daughter's 18th Birthday')"),
      }),
      prompt: `Today is ${today}. Extract the exact target date from this user query: "${query}". Respond with the date in YYYY-MM-DD format and a short title.`,
    })

    return NextResponse.json(object)
  } catch (error) {
    console.error("NL Parse Error:", error)
    return NextResponse.json({ error: "Failed to parse natural language" }, { status: 500 })
  }
}
