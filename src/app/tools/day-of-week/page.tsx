import type { Metadata } from "next"
import { ToolPageWrapper } from "@/components/shared/ToolPageWrapper"
import { FAQSection } from "@/components/shared/FAQSection"
import { DayOfWeekClient } from "./DayOfWeekClient"
import { buildFAQSchema } from "@/lib/schema/jsonld"
import { JsonLd } from "@/components/shared/JsonLd"

export const metadata: Metadata = {
  title: "Day of the Week Calculator — What Day Was Any Date?",
  description:
    "Find out what day of the week any date falls on. Works for any date in history or the future. Instantly shows the day name and a mini week calendar.",
}

const FAQS = [
  {
    question: "What day of the week was January 1, 2000?",
    answer: "January 1, 2000 was a Saturday.",
  },
  {
    question: "What day of the week will Christmas be in 2025?",
    answer: "Christmas Day (December 25) 2025 falls on a Thursday.",
  },
  {
    question: "How do I find what day of the week a historical date was?",
    answer: "Enter the date in the field above and press Find Day. The calculator works for any date from year 1 to year 9999.",
  },
  {
    question: "What day of the week am I born on?",
    answer: "Enter your birth date in the calculator and it will instantly tell you which day of the week you were born.",
  },
]

export default function DayOfWeekPage() {
  return (
    <>
      <JsonLd data={buildFAQSchema(FAQS)} />
      <ToolPageWrapper
        title="Day of the Week"
        description="Find out what day of the week any date falls on — past or future."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tools" }, { label: "Day of the Week" }]}
      >
        <DayOfWeekClient />
        <FAQSection faqs={FAQS} />
      </ToolPageWrapper>
    </>
  )
}
