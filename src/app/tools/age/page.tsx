import type { Metadata } from "next"
import { ToolPageWrapper } from "@/components/shared/ToolPageWrapper"
import { FAQSection } from "@/components/shared/FAQSection"
import { AgeCalculatorClient } from "./AgeCalculatorClient"
import { buildFAQSchema, buildHowToSchema } from "@/lib/schema/jsonld"
import { JsonLd } from "@/components/shared/JsonLd"

export const metadata: Metadata = {
  title: "Age Calculator — Find Your Exact Age in Years, Months & Days",
  description:
    "Calculate your exact age in years, months, weeks, and days from your date of birth. Also shows fascinating life statistics — heartbeats, full moons, and more.",
}

const FAQS = [
  {
    question: "How do I calculate my exact age?",
    answer:
      "Enter your date of birth and click Calculate Age. We show your exact age in years, months, weeks, and days, calculated from your birth date to today's date.",
  },
  {
    question: "How many days old am I?",
    answer:
      "The age calculator shows your total age in days. For example, a 30-year-old person is approximately 10,950 days old.",
  },
  {
    question: "How many heartbeats have I had?",
    answer:
      "The average human heart beats about 70 times per minute — roughly 100,800 times per day. Multiply your total days by that figure to get your estimated lifetime heartbeat count.",
  },
  {
    question: "When is my next birthday?",
    answer:
      "The calculator shows how many days until your next birthday, based on your date of birth and today's date.",
  },
  {
    question: "How many full moons have I seen?",
    answer:
      "There is a full moon approximately every 29.53 days. We divide your total days lived by 29.53 to estimate the number of full moons you have experienced.",
  },
]

const HOW_TO_STEPS = [
  { name: "Enter your date of birth", text: "Click the date field and enter your birth date, or use the date picker." },
  { name: "Click Calculate Age", text: "Press the Calculate Age button to compute your exact age." },
  { name: "View your results", text: "See your exact age in years, months, weeks, and days, plus life statistics." },
]

export default function AgePage() {
  return (
    <>
      <JsonLd data={buildFAQSchema(FAQS)} />
      <JsonLd data={buildHowToSchema("Calculate Your Exact Age", "Find out your exact age in years, months, weeks, and days.", HOW_TO_STEPS)} />
      <ToolPageWrapper
        title="Age Calculator"
        description="Find out your exact age in years, months, weeks, and days — plus fascinating life statistics."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tools", href: "/tools" }, { label: "Age Calculator" }]}
      >
        <AgeCalculatorClient />
        <FAQSection faqs={FAQS} />
      </ToolPageWrapper>
    </>
  )
}
