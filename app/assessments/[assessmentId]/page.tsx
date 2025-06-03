"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, ThumbsUp, ThumbsDown, MessageSquare, FileArchive } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Find assessment from mock data based on ID
const getAssessmentDetails = (id: string) => {
  const mockAssessments = [
    // Same as in assessment-content.tsx
    {
      id: "ASS001",
      startupName: "Innovatech Solutions",
      type: "Seed Funding",
      currentStage: "Technical Review",
      status: "under-review",
      details: "Detailed review of tech stack and scalability.",
    },
    {
      id: "ASS002",
      startupName: "HealthWell AI",
      type: "Series A",
      currentStage: "Final Approval",
      status: "approved",
      details: "Approved based on strong market potential and team.",
    },
  ]
  return mockAssessments.find((a) => a.id === id) || null
}

export default function AssessmentDetailPage() {
  const params = useParams()
  const assessmentId = params.assessmentId as string
  const assessment = getAssessmentDetails(assessmentId) // Fetch or find assessment data
  const router = useRouter()
  const { toast } = useToast()

  if (!assessment) {
    return (
      <div className="text-center py-10">
        <p>Assessment not found.</p>
        <Button onClick={() => router.push("/assessments")} className="mt-4">
          Back to Assessments
        </Button>
      </div>
    )
  }

  const handleAction = (action: string) => {
    toast({
      title: `Assessment Action: ${action}`,
      description: `Assessment ${assessmentId} has been ${action.toLowerCase()} (simulated).`,
    })
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Assessments
      </Button>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">Assessment: {assessment.id}</CardTitle>
              <CardDescription>
                For Startup:{" "}
                <Link href={`/portfolio/${assessment.startupId || "STP000"}`} className="text-primary hover:underline">
                  {assessment.startupName}
                </Link>{" "}
                - Type: {assessment.type}
              </CardDescription>
            </div>
            <Badge
              variant="outline"
              className={cn(
                assessment.status === "approved" && "status-approved border-green-500",
                assessment.status === "rejected" && "status-rejected border-red-500",
                assessment.status === "under-review" && "status-under-review border-blue-500",
              )}
            >
              Status: {assessment.currentStage}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {assessment.details ||
              "Detailed assessment information, review criteria, scores, and documents would be displayed here."}
          </p>

          {/* Placeholder for detailed content: forms, documents, comments */}
          <div className="p-6 border-2 border-dashed rounded-md min-h-[200px] flex items-center justify-center">
            <p className="text-muted-foreground">
              Detailed review interface and content sections (e.g., Scoring, Documents, Comments) would be here.
            </p>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={() => handleAction("Comment Added")}>
              <MessageSquare className="mr-2 h-4 w-4" /> Add Comment
            </Button>
            <Button variant="outline" onClick={() => handleAction("Documents Requested")}>
              <FileArchive className="mr-2 h-4 w-4" /> Request Documents
            </Button>
            <Button variant="destructive" onClick={() => handleAction("Rejected")}>
              <ThumbsDown className="mr-2 h-4 w-4" /> Reject
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => handleAction("Approved")}>
              <ThumbsUp className="mr-2 h-4 w-4" /> Approve
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
