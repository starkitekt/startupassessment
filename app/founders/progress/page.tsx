import { ModernLayout } from "@/components/modern-layout"
import { FounderProgressContent } from "@/components/founders/founder-progress-content"

export default function FounderProgressPage() {
  return (
    <ModernLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Progress Tracking</h1>
          <p className="text-muted-foreground">
            Monitor your startup's journey, track milestones, and measure growth across key metrics.
          </p>
        </div>

        <FounderProgressContent />
      </div>
    </ModernLayout>
  )
}
