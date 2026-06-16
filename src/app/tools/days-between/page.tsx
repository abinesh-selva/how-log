import type { Metadata } from "next"
import { ToolPageWrapper } from "@/components/shared/ToolPageWrapper"
import { FAQSection } from "@/components/shared/FAQSection"
import { DaysBetweenClient } from "./DaysBetweenClient"
import { buildFAQSchema, buildHowToSchema } from "@/lib/schema/jsonld"
import { JsonLd } from "@/components/shared/JsonLd"

export const metadata: Metadata = {
  title: "Days Between Dates Calculator — Count Days, Weeks & Months",
  description:
    "Calculate the exact number of days, weeks, months, and years between any two dates. Free, instant, and accurate.",
}

const FAQS = [
  {
    question: "How do I calculate the days between two dates?",
    answer: "Enter a start date and an end date, then click Calculate. The result shows the exact number of calendar days, weeks, months, and years between the two dates.",
  },
  {
    question: "Does the calculator include both the start and end date?",
    answer: "The calculator counts the number of days from the start date up to (but not including) the end date. To include both dates, add 1 to the result.",
  },
  {
    question: "Can I calculate days between dates in the past?",
    answer: "Yes — enter any two dates, past or future. The calculator works for any dates between the years 1 and 9999.",
  },
  {
    question: "How many weeks are between two dates?",
    answer: "Divide the total days by 7. The calculator shows this automatically, including the remaining days after whole weeks.",
  },
]

const HOW_TO = [
  { name: "Enter the start date", text: "Select or type your start date in the Start Date field." },
  { name: "Enter the end date", text: "Select or type your end date in the End Date field." },
  { name: "Click Calculate", text: "Press the Calculate button to see the exact difference in days, weeks, months, and years." },
]

export default function DaysBetweenPage() {
  return (
    <>
      <JsonLd data={buildFAQSchema(FAQS)} />
      <JsonLd data={buildHowToSchema("Calculate Days Between Dates", "Find the exact number of days between any two dates.", HOW_TO)} />
      <ToolPageWrapper
        title="Days Between Dates"
        description="Calculate the exact number of days, weeks, months, and years between any two dates."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tools" }, { label: "Days Between Dates" }]}
      >
        <DaysBetweenClient />
        <FAQSection faqs={FAQS} />
      </ToolPageWrapper>
    </>
  )
}
