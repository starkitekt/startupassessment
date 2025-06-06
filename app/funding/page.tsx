import type { Metadata } from "next"
import FundingPageClient from "./FundingPageClient"

export const metadata: Metadata = {
  title: "Funding Management",
  description: "Manage funding applications and disbursements",
}

export default function FundingPage() {
  return <FundingPageClient />
}
