import type { Metadata } from "next"
import { ToolPageWrapper } from "@/components/shared/ToolPageWrapper"
import { FAQSection } from "@/components/shared/FAQSection"
import { BusinessDaysClient } from "./BusinessDaysClient"
import { buildFAQSchema, buildHowToSchema } from "@/lib/schema/jsonld"
import { JsonLd } from "@/components/shared/JsonLd"

export const metadata: Metadata = {
  title: "Business Days Calculator — Exclude Weekends & Public Holidays",
  description:
    "Calculate the exact number of working days between two dates. Excludes weekends and public holidays for the US, UK, Canada, Australia, and more.",
}

const FAQS = [
  {
    question: "What is a business day?",
    answer: "A business day is any weekday (Monday–Friday) that is not a public holiday. The calculator excludes both weekends and official public holidays for your selected country.",
  },
  {
    question: "Which countries are supported?",
    answer: "The calculator currently supports the United States, United Kingdom, Canada, Australia, Germany, France, India, Japan, New Zealand, and Ireland. More countries are being added.",
  },
  {
    question: "How do I calculate a deadline that is 30 business days away?",
    answer: "Enter today as the start date, then count forward. Alternatively, use our Date Calculator to add a specific number of business days to any date.",
  },
  {
    question: "Are bank holidays included?",
    answer: "Yes — the calculator uses the official public holiday schedule for each country, which includes bank holidays and national holidays.",
  },
]

const HOW_TO = [
  { name: "Select your start and end dates", text: "Enter the start date and end date of the period you want to measure." },
  { name: "Choose your country", text: "Select the country whose public holiday calendar to use for exclusions." },
  { name: "Click Calculate Business Days", text: "The result shows total business days, weekends, and public holidays in the period." },
]

export default function BusinessDaysPage() {
  return (
    <>
      <JsonLd data={buildFAQSchema(FAQS)} />
      <JsonLd data={buildHowToSchema("Calculate Business Days Between Dates", "Find the exact number of working days, excluding weekends and public holidays.", HOW_TO)} />
      <ToolPageWrapper
        title="Business Days Calculator"
        description="Count working days between two dates, excluding weekends and public holidays for your country."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Tools" }, { label: "Business Days" }]}
      >
        <BusinessDaysClient />
        <FAQSection faqs={FAQS} />
      </ToolPageWrapper>
    </>
  )
}
