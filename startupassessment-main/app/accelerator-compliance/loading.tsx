import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function AcceleratorComplianceLoading() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <Skeleton className="h-10 w-3/4 md:w-1/2" />
        <Skeleton className="h-6 w-full md:w-3/4" />
      </header>

      <section className="grid gap-8 md:grid-cols-2">
        {[1, 2].map((i) => (
          <Card key={i} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Skeleton className="h-12 w-12 rounded-lg" />
                <Skeleton className="h-8 w-48" />
              </div>
              <Skeleton className="h-5 w-full" />
            </CardHeader>
            <CardContent className="space-y-4 flex-grow">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <div>
                <Skeleton className="h-5 w-32 mb-2" />
                <ul className="space-y-2">
                  {[...Array(5)].map((_, j) => (
                    <Skeleton key={j} className="h-4 w-full" />
                  ))}
                </ul>
              </div>
              <Skeleton className="h-4 w-full" />
            </CardContent>
            <div className="p-6 pt-0 flex flex-col sm:flex-row gap-3">
              <Skeleton className="h-10 w-full sm:w-48" />
              <Skeleton className="h-10 w-full sm:w-48" />
            </div>
          </Card>
        ))}
      </section>

      <section>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/2 mb-2" />
            <Skeleton className="h-5 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
