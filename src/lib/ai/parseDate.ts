import { generateObject } from "ai"
import { anthropic } from "@ai-sdk/anthropic"
import { z } from "zod"
import type { ParsedDateInput } from "@/types"

const DateSchema = z.object({
  date: z.string().nullable().describe("ISO date string (YYYY-MM-DD) or null if unparseable"),
  confidence: z.enum(["high", "medium", "low"]),
  explanation: z.string().optional(),
})

// Only called when regex parsing fails — cost-gated
export async function parseDateWithAI(input: string): Promise<ParsedDateInput> {
  try {
    const { object } = await generateObject({
      model: anthropic("claude-haiku-4-5-20251001"),
      schema: DateSchema,
      prompt: `Extract the target date from this natural language input. Today is ${new Date().toISOString().split("T")[0]}.

Input: "${input}"

Return the date in ISO format (YYYY-MM-DD). If the user says "next Friday", calculate the actual date. If it references a birthday or relative date, resolve it. Return null if truly unparseable.`,
    })

    const date = object.date ? new Date(object.date) : null
    const isValidDate = date !== null && !isNaN(date.getTime())

    return {
      date: isValidDate ? date : null,
      confidence: object.confidence,
      parsedBy: "ai",
      originalInput: input,
    }
  } catch {
    return { date: null, confidence: "low", parsedBy: "ai", originalInput: input }
  }
}
