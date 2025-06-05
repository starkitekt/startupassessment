"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  FileText,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Paperclip,
  DollarSign,
  User,
  CalendarDays,
  ClipboardList,
  Edit,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { useGlobalSettings } from "@/contexts/global-settings-context"
import { DocumentUploader, DocumentList } from "@/components/document-uploader"
import { useDocuments } from "@/contexts/document-context"
import {
  AssessmentWorkflow,
  type AssessmentWorkflowData,
  type AssessmentStage,
  type AssessmentScore,
} from "@/components/assessment-workflow"

// Mock data for a single assessment - in a real app, this would be fetched
const mockAssessmentDetails = {
  id: "ASS001",
  startupName: "Innovatech Solutions",
  startupId: "STP001",
  applicant: "Rahul Sharma",
  type: "Seed Funding Application",
  currentStage: "Technical Review",
  overallProgress: 75,
  submittedDate: "2024-01-15",
  assignedReviewer: "Priya Sharma",
  fundingRequested: 5000000, // INR
  status: "under-review", // 'pending-docs', 'under-review', 'approved', 'rejected'
  description:
    "Innovatech is developing an AI-powered platform for personalized financial advice to millennials. Seeking seed funding to expand their engineering team and launch initial marketing campaigns.",
  documents: [
    { id: "DOC001", name: "Pitch Deck v2.pdf", type: "pitch-deck", uploadedAt: "2024-01-15", url: "#" },
    { id: "DOC002", name: "Financial Projections.xlsx", type: "financials", uploadedAt: "2024-01-16", url: "#" },
    { id: "DOC003", name: "Team Bio.docx", type: "team-info", uploadedAt: "2024-01-15", url: "#" },
  ],
  comments: [
    {
      id: "CMT001",
      user: "Priya Sharma",
      text: "Initial review looks promising. Need to verify market size claims.",
      timestamp: "2024-01-18T10:30:00Z",
    },
    {
      id: "CMT002",
      user: "Rajesh Kumar (Lead)",
      text: "Agreed. Let's schedule a follow-up call with the founders.",
      timestamp: "2024-01-19T14:00:00Z",
    },
  ],
  requestedDocuments: [
    { id: "REQ001", name: "Detailed Market Analysis Report", status: "pending" },
    { id: "REQ002", name: "Patent Application Copy", status: "submitted" },
  ],
}

const mockAssessmentWorkflow: AssessmentWorkflowData = {
  id: "ASS001",
  startupName: "Innovatech Solutions",
  currentStage: "technical-review",
  overallProgress: 60,
  scores: [
    {
      category: "Market Potential",
      score: 85,
      maxScore: 100,
      comments: "Strong market opportunity with clear value proposition",
      reviewerId: "reviewer1",
      reviewerName: "Priya Sharma",
      reviewedAt: new Date("2024-01-18"),
    },
  ],
  stageHistory: [
    {
      stage: "initial-screening",
      completedAt: new Date("2024-01-16"),
      completedBy: "Rajesh Kumar",
      notes: "Initial documentation review completed successfully",
    },
  ],
  canProceed: true,
  blockers: [],
}

type AssessmentDocument = (typeof mockAssessmentDetails.documents)[0]
type AssessmentComment = (typeof mockAssessmentDetails.comments)[0]
type RequestedDocument = (typeof mockAssessmentDetails.requestedDocuments)[0]

export default function AssessmentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { formatCurrency, selectedCurrency } = useGlobalSettings()
  const assessmentId = params.assessmentId as string
  const { uploadDocuments, getDocumentsByEntity } = useDocuments()

  // In a real app, fetch assessment details based on assessmentId
  const [assessment, setAssessment] = useState(mockAssessmentDetails)
  const [newComment, setNewComment] = useState("")
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)
  const [isRequestDocsModalOpen, setIsRequestDocsModalOpen] = useState(false)
  const [docsToRequest, setDocsToRequest] = useState<string[]>([])

  // Simulate fetching data
  useEffect(() => {
    if (assessmentId) {
      // Replace with actual fetch logic
      const fetchedAssessment = { ...mockAssessmentDetails, id: assessmentId } // Simulate finding by ID
      setAssessment(fetchedAssessment)
    }
  }, [assessmentId])

  if (!assessment) {
    return <div className="p-6 text-center">Loading assessment details...</div>
  }

  const handleStageChange = async (newStage: AssessmentStage, notes: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast({
      title: "Stage Updated",
      description: `Assessment moved to ${newStage}`,
    })
  }

  const handleScoreUpdate = async (score: AssessmentScore) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    toast({
      title: "Score Added",
      description: "Assessment score has been recorded",
    })
  }

  const handleAddComment = () => {
    if (!newComment.trim()) {
      toast({ title: "Empty Comment", description: "Please enter your comment.", variant: "destructive" })
      return
    }
    const comment: AssessmentComment = {
      id: `CMT${Date.now()}`,
      user: "Current User (Simulated)", // Replace with actual user
      text: newComment,
      timestamp: new Date().toISOString(),
    }
    setAssessment((prev) => ({ ...prev!, comments: [...prev!.comments, comment] }))
    setNewComment("")
    setIsCommentModalOpen(false)
    toast({ title: "Comment Added", description: "Your comment has been successfully added." })
  }

  const handleRequestDocuments = () => {
    if (docsToRequest.length === 0) {
      toast({
        title: "No Documents Selected",
        description: "Please select documents to request.",
        variant: "destructive",
      })
      return
    }
    const newRequests: RequestedDocument[] = docsToRequest.map((docName) => ({
      id: `REQ${Date.now()}${Math.random()}`,
      name: docName,
      status: "pending",
    }))
    setAssessment((prev) => ({ ...prev!, requestedDocuments: [...prev!.requestedDocuments, ...newRequests] }))
    setDocsToRequest([])
    setIsRequestDocsModalOpen(false)
    toast({ title: "Documents Requested", description: `${newRequests.length} document(s) have been requested.` })
  }

  const handleApprove = () => {
    setAssessment((prev) => ({ ...prev!, status: "approved", currentStage: "Approved" }))
    toast({
      title: "Assessment Approved",
      description: `${assessment.startupName}'s application has been approved.`,
      className: "bg-green-500 text-white",
    })
  }

  const handleReject = () => {
    setAssessment((prev) => ({ ...prev!, status: "rejected", currentStage: "Rejected" }))
    toast({
      title: "Assessment Rejected",
      description: `${assessment.startupName}'s application has been rejected.`,
      variant: "destructive",
    })
  }

  const availableDocsToRequest = [
    "Business Plan vNext",
    "Updated Financials Q3",
    "Cap Table Details",
    "User Acquisition Strategy",
  ]

  return (
    <div className="space-y-6 p-4 md:p-6">
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Assessments
      </Button>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <CardTitle className="text-2xl flex items-center">
                <FileText className="mr-3 h-7 w-7 text-primary" />
                Assessment: {assessment.id}
              </CardTitle>
              <CardDescription>
                Details for {assessment.type} by {assessment.startupName}
              </CardDescription>
            </div>
            <Badge
              variant={
                assessment.status === "approved"
                  ? "default"
                  : assessment.status === "rejected"
                    ? "destructive"
                    : "outline"
              }
              className={cn(
                "mt-2 sm:mt-0 text-sm px-3 py-1",
                assessment.status === "approved" && "bg-charting-positive text-white",
                assessment.status === "rejected" && "bg-charting-negative text-white",
                assessment.status === "under-review" && "border-blue-500 text-blue-500",
                assessment.status === "pending-docs" && "border-amber-500 text-amber-500",
              )}
            >
              Status: {assessment.currentStage}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
            <div className="space-y-1">
              <h4 className="font-semibold flex items-center">
                <User className="mr-2 h-4 w-4 text-muted-foreground" />
                Applicant
              </h4>
              <p>
                {assessment.applicant} for{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto"
                  onClick={() => router.push(`/portfolio/${assessment.startupId}`)}
                >
                  {assessment.startupName}
                </Button>
              </p>
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold flex items-center">
                <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                Funding Requested
              </h4>
              <p>{formatCurrency(assessment.fundingRequested)}</p>
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold flex items-center">
                <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                Submitted On
              </h4>
              <p>{new Date(assessment.submittedDate).toLocaleDateString()}</p>
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold flex items-center">
                <User className="mr-2 h-4 w-4 text-muted-foreground" />
                Assigned Reviewer
              </h4>
              <p>{assessment.assignedReviewer}</p>
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold flex items-center">
                <ClipboardList className="mr-2 h-4 w-4 text-muted-foreground" />
                Overall Progress
              </h4>
              <p>{assessment.overallProgress}%</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-md mb-1">Description</h4>
            <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">{assessment.description}</p>
          </div>
          <Separator />

          {/* Documents Section */}
          <div>
            <h4 className="font-semibold text-md mb-2 flex items-center">
              <Paperclip className="mr-2 h-5 w-5 text-primary" />
              Documents
            </h4>
            <div className="space-y-4">
              <DocumentUploader
                onUpload={(files, type) => uploadDocuments(files, type, assessment.id)}
                documentType="financials"
              />
              <DocumentList
                documents={getDocumentsByEntity(assessment.id)}
                onView={(doc) => window.open(doc.url, "_blank")}
                onDelete={(id) => console.log("Delete:", id)}
              />
            </div>
          </div>
          <Separator />

          {/* Requested Documents Section */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold text-md flex items-center">
                <Paperclip className="mr-2 h-5 w-5 text-primary" />
                Requested Documents
              </h4>
              <Button variant="outline" size="sm" onClick={() => setIsRequestDocsModalOpen(true)}>
                <Edit className="mr-2 h-3.5 w-3.5" /> Request Documents
              </Button>
            </div>
            {assessment.requestedDocuments.length > 0 ? (
              <ul className="space-y-2">
                {assessment.requestedDocuments.map((doc) => (
                  <li key={doc.id} className="flex items-center justify-between p-2 border rounded-md text-sm">
                    <span>{doc.name}</span>
                    <Badge
                      variant={doc.status === "submitted" ? "default" : "outline"}
                      className={cn(doc.status === "submitted" && "bg-green-100 text-green-700")}
                    >
                      {doc.status}
                    </Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No documents currently requested.</p>
            )}
          </div>
          <Separator />

          {/* Comments Section */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold text-md flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                Internal Comments
              </h4>
              <Button variant="outline" size="sm" onClick={() => setIsCommentModalOpen(true)}>
                <Edit className="mr-2 h-3.5 w-3.5" /> Add Comment
              </Button>
            </div>
            {assessment.comments.length > 0 ? (
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {assessment.comments
                  .slice()
                  .reverse()
                  .map(
                    (
                      comment, // Show newest first
                    ) => (
                      <div key={comment.id} className="p-3 border rounded-md bg-muted/50 text-sm">
                        <p className="font-medium">{comment.user}</p>
                        <p className="text-xs text-muted-foreground mb-1">
                          {new Date(comment.timestamp).toLocaleString()}
                        </p>
                        <p>{comment.text}</p>
                      </div>
                    ),
                  )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No comments yet.</p>
            )}
          </div>
        </CardContent>
        <Separator />
        <div className="mt-6">
          <AssessmentWorkflow
            assessment={mockAssessmentWorkflow}
            onStageChange={handleStageChange}
            onScoreUpdate={handleScoreUpdate}
          />
        </div>
        <CardFooter className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t">
          <Button
            variant="destructive"
            onClick={handleReject}
            disabled={assessment.status === "rejected" || assessment.status === "approved"}
          >
            <ThumbsDown className="mr-2 h-4 w-4" /> Reject Application
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={handleApprove}
            disabled={assessment.status === "approved" || assessment.status === "rejected"}
          >
            <ThumbsUp className="mr-2 h-4 w-4" /> Approve Application
          </Button>
        </CardFooter>
      </Card>

      {/* Add Comment Modal */}
      <Dialog open={isCommentModalOpen} onOpenChange={setIsCommentModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Comment</DialogTitle>
            <DialogDescription>Share your thoughts or updates on this assessment.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="new-comment" className="sr-only">
              Comment
            </Label>
            <Textarea
              id="new-comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Type your comment here..."
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleAddComment}>Submit Comment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Request Documents Modal */}
      <Dialog open={isRequestDocsModalOpen} onOpenChange={setIsRequestDocsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Additional Documents</DialogTitle>
            <DialogDescription>Select the documents you need from the startup.</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-2">
            {availableDocsToRequest.map((docName) => (
              <div key={docName} className="flex items-center space-x-2">
                <Checkbox
                  id={`doc-${docName.replace(/\s+/g, "-")}`}
                  checked={docsToRequest.includes(docName)}
                  onCheckedChange={(checked) => {
                    return checked
                      ? setDocsToRequest([...docsToRequest, docName])
                      : setDocsToRequest(docsToRequest.filter((d) => d !== docName))
                  }}
                />
                <Label
                  htmlFor={`doc-${docName.replace(/\s+/g, "-")}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {docName}
                </Label>
              </div>
            ))}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleRequestDocuments}>Request Selected Documents</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
