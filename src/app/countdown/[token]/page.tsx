import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CountdownDisplay } from "./CountdownDisplay"
import type { CountdownTheme } from "@/types"

interface Props {
  params: Promise<{ token: string }>
}

async function getCountdown(token: string) {
  // In production this hits the DB. For now, return null to show 404 for unknown tokens.
  // Will be wired to Neon once DB schema is set up.
  try {
    const { sql } = await import("@/lib/db")
    const rows = await sql`
      SELECT title, target_date, theme FROM countdowns
      WHERE share_token = ${token} LIMIT 1
    `
    if (!rows.length) return null
    return rows[0] as { title: string; target_date: string; theme: CountdownTheme }
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { token } = await params
  const data = await getCountdown(token)
  if (!data) return { title: "Countdown Not Found" }

  return {
    title: `Countdown to ${data.title}`,
    description: `See the live countdown to ${data.title} on ${new Date(data.target_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}.`,
    openGraph: { title: `Countdown to ${data.title}`, type: "website" },
  }
}

export default async function CountdownPage({ params }: Props) {
  const { token } = await params
  const data = await getCountdown(token)
  if (!data) notFound()

  return (
    <CountdownDisplay
      title={data.title}
      targetDate={data.target_date}
      theme={data.theme}
    />
  )
}
