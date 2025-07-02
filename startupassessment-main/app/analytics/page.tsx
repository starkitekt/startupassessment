"use client"

import { AnalyticsContent } from "@/components/analytics-content"
import { TooltipProvider } from "@/components/ui/tooltip"

export default function AnalyticsPage() {
  return (
    <TooltipProvider>
      <div className="space-y-8 lg:space-y-10 p-4 md:p-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">Advanced Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive insights and data visualization for your incubator performance.
          </p>
        </div>
        <AnalyticsContent />
      </div>
    </TooltipProvider>
  )
}
