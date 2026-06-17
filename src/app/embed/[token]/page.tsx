import { notFound } from "next/navigation"
import { sql } from "@/lib/db"
import { EmbedCountdownClient } from "./EmbedCountdownClient"

export default async function EmbedPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params

  const rows = await sql`
    SELECT title, target_date, theme
    FROM countdowns
    WHERE share_token = ${token}
    LIMIT 1
  `

  if (rows.length === 0) {
    notFound()
  }

  const countdown = rows[0]

  // This layout deliberately omits the global RootLayout header/footer 
  // because it's an embed. Next.js 13+ App router makes this slightly tricky if it shares a root layout,
  // but we can handle the UI within the client to hide overflowing elements.
  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center p-4">
      <EmbedCountdownClient
        title={countdown.title}
        targetDate={countdown.target_date}
        theme={countdown.theme}
      />
    </div>
  )
}
