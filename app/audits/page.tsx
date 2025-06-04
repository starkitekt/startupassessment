"use client"

import { Suspense } from "react"
import { AuditsContent } from "@/components/audits-content"
import AuditsLoading from "./loading" // Ensure this path is correct

export default function AuditsPage() {
  return (
    <Suspense fallback={<AuditsLoading />}>
      <AuditsContent />
    </Suspense>
  )
}
