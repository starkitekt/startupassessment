import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function AcceleratorLoading() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <Skeleton className="h-10 w-72" />
          <Skeleton className="h-6 w-96" />
        </div>
        <Skeleton className="h-10 w-48" />
      </header>

      <div>
        <Skeleton className="h-10 w-full sm:w-1/2 md:w-1/3 mb-6" /> {/* TabsList Skeleton */}
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/2 mb-2" />
            <Skeleton className="h-5 w-3/4" />
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-1" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
                <div className="p-4 pt-0">
                  <Skeleton className="h-9 w-full" />
                </div>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
