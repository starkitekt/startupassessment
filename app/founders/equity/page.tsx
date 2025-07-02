import { ModernLayout } from "@/components/modern-layout"
import { FounderEquityContent } from "@/components/founders/founder-equity-content"

export default function FounderEquityPage() {
  return (
    <ModernLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Equity Management</h1>
          <p className="text-muted-foreground">
            Manage your cap table, track equity distribution, and monitor ownership changes across funding rounds.
          </p>
        </div>

        <FounderEquityContent />
      </div>
    </ModernLayout>
  )
}
