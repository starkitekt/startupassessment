import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ComplianceLoading() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <Skeleton className="h-10 w-72" />
          <Skeleton className="h-6 w-96" />
        </div>
        <Skeleton className="h-10 w-40" />
      </header>

      <div>
        <Skeleton className="h-10 w-full sm:w-1/2 md:w-1/3 mb-6" /> {/* TabsList Skeleton */}
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/2 mb-2" />
            <div className="flex items-center gap-2 mt-1">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-6 w-16" />
            </div>
            <Skeleton className="h-5 w-1/3 mt-1" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-6 w-1/4 mb-3" />
            <div className="grid gap-4 md:grid-cols-2">
              {[1, 2].map((i) => (
                <Card key={i} className="bg-muted/20">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-5 w-3/5" />
                      <Skeleton className="h-5 w-1/4" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-1 text-sm">
                    <Skeleton className="h-1.5 w-full mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-5 w-1/3 mt-1" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
