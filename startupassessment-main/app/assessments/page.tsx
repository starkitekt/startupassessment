"use client" // Keep this if AssessmentContent or its children need client-side interactivity beyond searchParams

import { Suspense } from "react"
import { AssessmentContent } from "@/components/assessment-content"
import { Skeleton } from "@/components/ui/skeleton" // For the fallback UI

// Define a fallback component for Suspense
function AssessmentPageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-48" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-10 w-36" />
        </div>
      </div>
      <Skeleton className="h-20 w-full" /> {/* For Filters Card */}
      <Skeleton className="h-[400px] w-full" /> {/* For Table Card */}
    </div>
  )
}

export default function AssessmentsPage() {
  return (
    <Suspense fallback={<AssessmentPageSkeleton />}>
      <AssessmentContent />
    </Suspense>
  )
}
