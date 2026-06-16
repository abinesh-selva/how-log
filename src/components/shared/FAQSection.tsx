"use client"

import { useState } from "react"

interface FAQ {
  question: string
  answer: string
}

export function FAQSection({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="mt-14">
      <h2 className="text-xl font-bold text-[var(--ink)] mb-5 flex items-center gap-3">
        <span className="inline-block w-7 h-1 rounded-full bg-[var(--coral)]" />
        Common Questions
      </h2>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className={`rounded-2xl overflow-hidden border-2 transition-colors duration-200 ${
              open === i ? "border-[var(--coral)] bg-white" : "border-[#D4CFC8] bg-white hover:border-[var(--coral)]/40"
            }`}
          >
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-[var(--ink)] text-sm"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span>{faq.question}</span>
              <span className={`ml-4 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-200 ${
                open === i ? "bg-[var(--coral)] text-white" : "bg-[var(--cream-card)] text-[var(--ink-muted)]"
              }`}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path
                    d={open === i ? "M1 7l4-4 4 4" : "M1 3l4 4 4-4"}
                    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
            {open === i && (
              <div className="px-5 pb-5 text-[var(--ink-muted)] text-sm leading-relaxed border-t border-[var(--cream-card)]">
                <p className="pt-4">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
