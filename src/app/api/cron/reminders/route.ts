import { NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { Resend } from "resend"

export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  try {
    // Basic authorization check for cron job
    const authHeader = req.headers.get("authorization")
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new Response("Unauthorized", { status: 401 })
    }

    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      console.warn("RESEND_API_KEY is not set. Skipping reminders.")
      return NextResponse.json({ success: false, reason: "No Resend API Key" })
    }

    const resend = new Resend(resendApiKey)

    // Find countdowns ending in exactly 7 days
    const upcoming7Days = await sql`
      SELECT id, title, target_date, share_token, user_email
      FROM countdowns
      WHERE user_email IS NOT NULL
        AND target_date = CURRENT_DATE + INTERVAL '7 days'
    ` as any[]

    // Find countdowns ending tomorrow (1 day)
    const upcoming1Day = await sql`
      SELECT id, title, target_date, share_token, user_email
      FROM countdowns
      WHERE user_email IS NOT NULL
        AND target_date = CURRENT_DATE + INTERVAL '1 day'
    ` as any[]

    const allReminders = [
      ...upcoming7Days.map(c => ({ ...c, days: 7 })),
      ...upcoming1Day.map(c => ({ ...c, days: 1 }))
    ]

    if (allReminders.length === 0) {
      return NextResponse.json({ success: true, count: 0, message: "No reminders to send" })
    }

    const emailPromises = allReminders.map(countdown => {
      const isTomorrow = countdown.days === 1
      const subject = isTomorrow 
        ? `Tomorrow: ${countdown.title}!` 
        : `1 Week Left: ${countdown.title}!`
      
      const link = `${process.env.NEXT_PUBLIC_BASE_URL || "https://howlongtogo.com"}/countdown/${countdown.share_token}`

      return resend.emails.send({
        from: "HowLongToGo <reminders@howlongtogo.com>",
        to: [countdown.user_email],
        subject: subject,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Your countdown is almost up!</h2>
            <p><strong>${countdown.title}</strong> is happening in exactly <strong>${countdown.days} ${countdown.days === 1 ? 'day' : 'days'}</strong>.</p>
            <p>
              <a href="${link}" style="display: inline-block; padding: 12px 24px; background: #ec4899; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">
                View Your Countdown
              </a>
            </p>
            <p style="color: #666; font-size: 12px; margin-top: 40px;">
              You are receiving this because you created a countdown on HowLongToGo while signed in.
            </p>
          </div>
        `
      })
    })

    const results = await Promise.allSettled(emailPromises)
    const successfulCount = results.filter(r => r.status === "fulfilled").length

    return NextResponse.json({ 
      success: true, 
      attempted: allReminders.length,
      successful: successfulCount 
    })

  } catch (error) {
    console.error("Cron Reminder Error:", error)
    return NextResponse.json({ error: "Failed to process reminders" }, { status: 500 })
  }
}
