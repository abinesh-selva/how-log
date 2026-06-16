import type { Metadata } from "next"
import { ToolPageWrapper } from "@/components/shared/ToolPageWrapper"
import { FAQSection } from "@/components/shared/FAQSection"
import { DateCalculatorClient } from "./DateCalculatorClient"
import { buildFAQSchema, buildHowToSchema } from "@/lib/schema/jsonld"
import { JsonLd } from "@/components/shared/JsonLd"

export const metadata: Metadata = {
  title: "Date Calculator — Add or Subtract Days, Weeks, Months & Years",
  description:
    "Add or subtract any number of days, weeks, months, or years from any date. Find future deadlines, expiry dates, anniversaries, and more.",
}

const FAQS = [
  {
    question: "How do I add 90 days to a date?",
    answer: "Enter your start date, set the amount to 90, select Days, choose Add, then click Calculate Date. The result shows the exact date 90 days later.",
  },
  {
    question: "What date is 6 months from today?",
    answer: "Enter today's date, set the amount to 6, select Months, choose Add, and click Calculate Date to find the exact date.",
  },
  {
    question: "How do I calculate a date 2 years ago?",
    answer: "Enter the reference date, set the amount to 2, select Years, choose Subtract, and click Calculate Date.",
  },
  {
    question: "What is 100 days from today?",
    answer: "Enter today as the start date, set 100 days, choose Add, and click Calculate. You can also visit our dedicated page at /days-from-today/100.",
  },
]

const HOW_TO = [
  { name: "Enter a start date", text: "Select the date you want to add to or subtract from." },
  { name: "Choose Add or Subtract", text: "Toggle between adding time to the date or subtracting time from it." },
  { name: "Enter the amount and unit", text: "Enter a number and select whether to use days, weeks, months, or years." },
  { name: "Click Calculate Date", text: "The result shows the exact date after applying your calculation." },
]

export default function DateCalculatorPage() {
  return (
    <>
      <JsonLd data={buildFAQSchema(FAQS)} />
      <JsonLd data={buildHowToSchema("Add or Subtract Time from a Date", "Calculate a future or past date by adding or subtracting days, weeks, months, or years.", HOW_TO)} />
      <ToolPageWrapper
        title="Date Calculator"
        description="Add or subtract days, weeks, months, or years from any date to find a future or past date."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tools" }, { label: "Date Calculator" }]}
      >
        <DateCalculatorClient />
        <FAQSection faqs={FAQS} />
      </ToolPageWrapper>
    </>
  )
}
