import type { Metadata } from "next"
import Link from "next/link"
import { Arrow } from "@/components/ui/Arrow"

export const metadata: Metadata = {
  title: "Terms of Service — HowLongToGo",
  description: "The terms governing your use of HowLongToGo's free date calculation tools and countdown features.",
}

const UPDATED = "16 June 2026"

function Section({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-bold text-[var(--ink)] mb-3 flex items-center gap-3">
        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--coral)] text-white flex items-center justify-center text-xs font-bold">
          {num}
        </span>
        {title}
      </h2>
      <div className="text-[var(--ink-muted)] text-sm leading-relaxed space-y-3 pl-10">
        {children}
      </div>
    </section>
  )
}

export default function TermsPage() {
  return (
    <main>
      {/* Header strip */}
      <div className="bg-[var(--teal)] py-14 px-5">
        <div className="max-w-6xl mx-auto">
          <nav className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-white/50 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>›</span>
            <span className="text-white">Terms</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Terms of Service</h1>
          <p className="text-white/60 mt-2 text-sm">Last updated: {UPDATED}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-14 space-y-10">

        <p className="text-[var(--ink-muted)] text-sm leading-relaxed p-5 rounded-2xl bg-[var(--cream)] border border-[#E8E3DC]">
          By using HowLongToGo you agree to these terms. They are written in plain English —
          no hidden gotchas.
        </p>

        <Section num="1" title="Using the service">
          <p>
            HowLongToGo provides free date calculation tools and shareable countdown timers.
            You may use them for personal or commercial purposes at no charge.
          </p>
          <p>
            You must not use the service in any way that violates applicable law, harms other
            users, or attempts to disrupt, scrape excessively, or reverse-engineer the platform.
          </p>
        </Section>

        <Section num="2" title="Accuracy of calculations">
          <p>
            We take care to produce accurate results. However, date calculations depend on
            timezone context, calendar system, and local holiday rules — all of which can vary.
            <strong className="text-[var(--ink)]"> Do not rely on our tools for legal, medical, financial, or safety-critical
            decisions</strong> without independent verification.
          </p>
          <p>
            If you find a calculation error, please report it to{" "}
            <a href="mailto:hello@howlongtogo.app" className="text-[var(--coral)] hover:underline">
              hello@howlongtogo.app
            </a>{" "}
            and we will investigate promptly.
          </p>
        </Section>

        <Section num="3" title="Countdown timers and user content">
          <p>
            When you create a countdown, you provide an event title and date. You are responsible
            for the content you submit. You must not create countdowns that contain offensive,
            illegal, or harmful content.
          </p>
          <p>
            We reserve the right to remove any countdown that violates these terms without notice.
          </p>
        </Section>

        <Section num="4" title="Accounts (optional)">
          <p>
            Creating an account is optional. If you choose to create one, you are responsible for
            keeping your credentials secure. Notify us immediately if you suspect unauthorized
            access to your account.
          </p>
        </Section>

        <Section num="5" title="Intellectual property">
          <p>
            All original content, design, and code on HowLongToGo is our property or used with
            permission. You may not copy or redistribute significant portions of the site without
            written consent.
          </p>
          <p>
            Linking to any page on HowLongToGo is always allowed and encouraged.
          </p>
        </Section>

        <Section num="6" title="Disclaimer of warranties">
          <p>
            The service is provided <strong className="text-[var(--ink)]">"as is"</strong> without warranties of any kind,
            express or implied. We do not guarantee that the service will be uninterrupted,
            error-free, or available at any particular time.
          </p>
        </Section>

        <Section num="7" title="Limitation of liability">
          <p>
            To the maximum extent permitted by law, HowLongToGo shall not be liable for any
            indirect, incidental, special, or consequential damages arising from your use of the
            service, even if we have been advised of the possibility of such damages.
          </p>
        </Section>

        <Section num="8" title="Changes to these terms">
          <p>
            We may update these terms from time to time. When we do, the "Last updated" date at the
            top of this page will change. Continued use of HowLongToGo after changes are posted
            constitutes your agreement to the revised terms.
          </p>
        </Section>

        <Section num="9" title="Governing law">
          <p>
            These terms are governed by the laws of the jurisdiction in which HowLongToGo is
            registered, without regard to conflict of law principles.
          </p>
        </Section>

{/*        <Section num="10" title="Contact">
          <p>
            Questions about these terms:{" "}
            <a href="mailto:hello@howlongtogo.app" className="text-[var(--coral)] hover:underline">
              hello@howlongtogo.app
            </a>
          </p>
        </Section>*/}
      </div>
    </main>
  )
}
