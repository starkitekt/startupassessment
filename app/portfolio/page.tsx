import { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProgramManagerDashboard } from "@/components/program-manager/program-manager-dashboard"
import { StartupCoordination } from "@/components/program-manager/startup-coordination"
import { MentorNetworkManagement } from "@/components/program-manager/mentor-network-management"
import { Skeleton } from "@/components/ui/skeleton"

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-96" />
        <Skeleton className="h-96" />
      </div>
    </div>
  )
}

export default function PortfolioPage() {
  return (
    <div className="container mx-auto p-6">
      <Suspense fallback={<LoadingSkeleton />}>
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="startups">Startup Coordination</TabsTrigger>
            <TabsTrigger value="mentors">Mentor Network</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <ProgramManagerDashboard />
          </TabsContent>

          <TabsContent value="startups">
            <StartupCoordination />
          </TabsContent>

          <TabsContent value="mentors">
            <MentorNetworkManagement />
          </TabsContent>

          <TabsContent value="analytics">
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">Advanced Analytics</h3>
              <p className="text-muted-foreground">Detailed program analytics and reporting coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </Suspense>
    </div>
  )
}
