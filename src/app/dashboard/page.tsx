import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { sql } from "@/lib/db"
import Link from "next/link"
import { DateTime } from "luxon"

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user?.email) {
    redirect("/login")
  }

  // Fetch countdowns linked to this user's email
  const countdowns = await sql`
    SELECT * FROM countdowns 
    WHERE user_email = ${session.user.email} 
    ORDER BY target_date ASC
  `

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <header className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-3xl font-black text-[var(--ink)] mb-2">My Countdowns</h1>
          <p className="text-[var(--ink-muted)]">Signed in as {session.user.email}</p>
        </div>
        <Link
          href="/countdown/create"
          className="bg-[var(--coral)] text-white px-6 py-3 rounded-2xl font-bold hover:bg-[#ff5252] transition-colors shadow-sm"
        >
          + New Countdown
        </Link>
      </header>

      {countdowns.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#E8E3DC]">
          <div className="text-5xl mb-4">⏳</div>
          <h2 className="text-xl font-bold text-[var(--ink)] mb-2">No countdowns yet</h2>
          <p className="text-[var(--ink-muted)] mb-6">Create your first countdown to start tracking important dates.</p>
          <Link
            href="/countdown/create"
            className="inline-block bg-[var(--indigo)] text-white px-6 py-3 rounded-2xl font-bold hover:bg-[#3d4cba] transition-colors"
          >
            Create Countdown
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {countdowns.map((cd) => (
            <Link
              key={cd.share_token}
              href={`/countdown/${cd.share_token}`}
              className="bg-white p-6 rounded-3xl border border-[#E8E3DC] hover:border-[var(--indigo)] hover:shadow-md transition-all group block relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-[var(--coral)] group-hover:bg-[var(--indigo)] transition-colors" />
              <div className="pl-4">
                <div className="text-sm font-bold text-[var(--indigo)] uppercase tracking-wider mb-1">
                  {cd.theme}
                </div>
                <h3 className="text-xl font-black text-[var(--ink)] mb-2">
                  {cd.title}
                </h3>
                <div className="text-[var(--ink-muted)] text-sm">
                  Target: {DateTime.fromJSDate(cd.target_date).toFormat("MMMM d, yyyy")}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
