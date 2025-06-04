"use client"

import { RequestsContent } from "@/components/requests-content"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

function RequestsPageSkeleton() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-10 w-36" />
      </div>
      <Skeleton className="h-16 w-full" /> {/* Filters card */}
      <Skeleton className="h-[400px] w-full" /> {/* Table card */}
    </div>
  )
}

export default function RequestsPage() {
  return (
    <Suspense fallback={<RequestsPageSkeleton />}>
      <RequestsContent />
    </Suspense>
  )
}
