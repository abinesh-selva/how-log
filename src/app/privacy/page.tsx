import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy — HowLongToGo",
  description: "How HowLongToGo handles your data — what we collect, what we don't, and how we keep things private.",
}

const UPDATED = "16 June 2026"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-bold text-[var(--ink)] mb-3 flex items-center gap-3">
        <span className="inline-block w-5 h-1 rounded-full bg-[var(--coral)] flex-shrink-0" />
        {title}
      </h2>
      <div className="text-[var(--ink-muted)] text-sm leading-relaxed space-y-3 pl-8">
        {children}
      </div>
    </section>
  )
}

export default function PrivacyPage() {
  return (
    <main>
      {/* Header strip */}
      <div className="bg-[var(--teal)] py-14 px-5">
        <div className="max-w-3xl mx-auto">
          <nav className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-white/50 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>›</span>
            <span className="text-white">Privacy</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Privacy Policy</h1>
          <p className="text-white/60 mt-2 text-sm">Last updated: {UPDATED}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 py-14 space-y-10">

        <p className="text-[var(--ink-muted)] text-sm leading-relaxed p-5 rounded-2xl bg-[var(--cream)] border border-[#E8E3DC]">
          The short version: we don't sell your data, we don't require an account to use our
          tools, and all date calculations happen in your browser — nothing is sent to our servers.
        </p>

        <Section title="What we collect">
          <p>
            <strong className="text-[var(--ink)]">Nothing by default.</strong> All five date tools
            (Age Calculator, Days Between, Business Days, Day of the Week, Date Calculator) run
            entirely in your browser. No date you enter is transmitted to our servers.
          </p>
          <p>
            If you create a <strong className="text-[var(--ink)]">countdown timer</strong>, we store
            the following in our database so the shareable link works: the event title, target date,
            and visual theme you chose. We do not link this to any personal account unless you are
            signed in.
          </p>
          <p>
            We use standard server logs, which record your IP address, browser type, and the pages
            you visit. These are stored for up to 30 days for security and diagnostic purposes, then
            permanently deleted.
          </p>
        </Section>

        <Section title="Cookies">
          <p>
            We set a minimal session cookie if you sign in (optional, for saving countdowns to an
            account). We do not use advertising cookies or third-party tracking cookies.
          </p>
          <p>
            We may use a first-party analytics tool to count page views and understand which tools
            people use most. This data is aggregated and cannot identify you personally.
          </p>
        </Section>

        <Section title="Third-party services">
          <p>
            Our infrastructure runs on Vercel (hosting) and Neon (database). Both are
            GDPR-compliant services operating under standard data processing agreements.
          </p>
          <p>
            We do not share your data with advertisers, data brokers, or any third party for
            commercial purposes.
          </p>
        </Section>

        <Section title="Data retention">
          <p>
            Countdown timers are retained indefinitely so shareable links keep working. If you
            created a countdown and want it removed, email us with the share URL and we will delete
            it within 48 hours.
          </p>
          <p>
            Server logs are deleted after 30 days. Anonymous analytics aggregates are kept
            indefinitely.
          </p>
        </Section>

        <Section title="Your rights">
          <p>
            If you are in the EU or UK, you have the right to access, correct, or delete any
            personal data we hold about you. To exercise those rights, email{" "}
            <a href="mailto:privacy@howlongtogo.app" className="text-[var(--coral)] hover:underline">
              privacy@howlongtogo.app
            </a>
            . We will respond within 30 days.
          </p>
        </Section>

        <Section title="Children">
          <p>
            HowLongToGo is not directed at children under 13. We do not knowingly collect personal
            information from children. If you believe a child has submitted personal information,
            contact us and we will delete it promptly.
          </p>
        </Section>

        <Section title="Changes to this policy">
          <p>
            If we make material changes, we will update the "Last updated" date at the top of this
            page. Continued use of the site after changes constitutes acceptance of the updated
            policy.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions about this policy:{" "}
            <a href="mailto:privacy@howlongtogo.app" className="text-[var(--coral)] hover:underline">
              privacy@howlongtogo.app
            </a>
          </p>
        </Section>

        <div className="flex gap-4 pt-4 border-t border-[#E8E3DC]">
          <Link href="/terms" className="text-sm font-semibold text-[var(--coral)] hover:underline">
            Terms of Service →
          </Link>
          <Link href="/about" className="text-sm font-semibold text-[var(--ink-muted)] hover:text-[var(--ink)] hover:underline">
            About us →
          </Link>
        </div>

      </div>
    </main>
  )
}
