import { Suspense } from "react"
import { ModernLayout } from "@/components/modern-layout"
import { FounderDashboardContent } from "@/components/founders/founder-dashboard-content"
import { Skeleton } from "@/components/ui/skeleton"

function FounderDashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="h-96" />
        <Skeleton className="h-96" />
      </div>
    </div>
  )
}

export default function FoundersPage() {
  return (
    <ModernLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Founder Hub</h1>
          <p className="text-muted-foreground">
            Your centralized dashboard for managing your startup journey, accessing resources, and connecting with the
            community.
          </p>
        </div>

        <Suspense fallback={<FounderDashboardSkeleton />}>
          <FounderDashboardContent />
        </Suspense>
      </div>
    </ModernLayout>
  )
}
