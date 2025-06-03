"use client"

import { AnalyticsContent } from "@/components/analytics-content" // To be created
import { TooltipProvider } from "@/components/ui/tooltip"

export default function AnalyticsPage() {
  return (
    <TooltipProvider>
      <AnalyticsContent />
    </TooltipProvider>
  )
}
