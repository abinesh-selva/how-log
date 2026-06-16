import type { Metadata } from "next"
import { ToolPageWrapper } from "@/components/shared/ToolPageWrapper"
import { CountdownCreatorClient } from "./CountdownCreatorClient"

export const metadata: Metadata = {
  title: "Create a Countdown — Free Shareable Countdown Timer",
  description:
    "Create a beautiful, shareable countdown to any event — birthday, wedding, holiday, graduation, retirement, and more. Get a unique link to share with anyone.",
}

export default function CreateCountdownPage() {
  return (
    <ToolPageWrapper
      title="Create a Countdown"
      description="Build a beautiful, shareable countdown to any event. Choose a theme, set your date, and share the link."
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Countdown" }, { label: "Create" }]}
    >
      <CountdownCreatorClient />
    </ToolPageWrapper>
  )
}
