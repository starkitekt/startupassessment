import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function AuditsLoading() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-10 w-40" /> {/* Button Skeleton */}
      </div>
      <Card>
        <CardHeader className="pb-4">
          <Skeleton className="h-6 w-1/4" /> {/* Filters Title Skeleton */}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-1/3" /> {/* Label Skeleton */}
                <Skeleton className="h-10 w-full" /> {/* Input/Select Skeleton */}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/3" /> {/* Table Title Skeleton */}
          <Skeleton className="h-4 w-1/2" /> {/* Table Description Skeleton */}
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" /> // Table Row Skeleton
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
