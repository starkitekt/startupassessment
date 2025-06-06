"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"
import {
  Search,
  Filter,
  Plus,
  CalendarIcon,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Paperclip,
  Send,
} from "lucide-react"

interface RequestUser {
  id: string
  name: string
  role: string
  email: string
  avatarUrl?: string
}

interface RequestComment {
  id: string
  user: RequestUser
  content: string
  createdAt: Date
  type: "comment" | "status_change" | "approval" | "rejection"
}

interface RequestAttachment {
  id: string
  name: string
  url: string
  type: string
  size: number
  uploadedBy: RequestUser
  uploadedAt: Date
}

interface ApprovalStep {
  id: string
  approver: RequestUser
  status: "pending" | "approved" | "rejected" | "skipped"
  comments?: string
  decidedAt?: Date
  order: number
}

interface Request {
  id: string
  title: string
  description: string
  type: "Access" | "Budget" | "Resource" | "Policy" | "Technical" | "Other"
  priority: "Low" | "Medium" | "High" | "Urgent"
  status: "Draft" | "Submitted" | "Under Review" | "Approved" | "Rejected" | "Completed" | "Cancelled"
  submitter: RequestUser
  assignee?: RequestUser
  dueDate?: Date
  createdAt: Date
  updatedAt: Date
  tags: string[]
  comments: RequestComment[]
  attachments: RequestAttachment[]
  approvalWorkflow: ApprovalStep[]
  estimatedCost?: number
  businessJustification: string
  impactAssessment: string
  linkedTo?: {
    type: "startup" | "portfolio" | "assessment"
    id: string
    name: string
  }
}

export function RequestManagementComplete() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null)
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false)
  const [isNewRequestDialogOpen, setIsNewRequestDialogOpen] = useState(false)
  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false)
  const [selectedApprovalStep, setSelectedApprovalStep] = useState<ApprovalStep | null>(null)
  const [newComment, setNewComment] = useState("")
  const [loading, setLoading] = useState(false)

  // Mock data
  const [requests, setRequests] = useState<Request[]>([
    {
      id: "REQ-001",
      title: "Additional Budget for Marketing Campaign",
      description:
        "Request for additional $50,000 budget allocation for Q1 marketing campaign to support three new startups in our portfolio.",
      type: "Budget",
      priority: "High",
      status: "Under Review",
      submitter: {
        id: "u1",
        name: "Sarah Johnson",
        role: "Marketing Manager",
        email: "sarah@example.com",
        avatarUrl: "/placeholder.svg?height=40&width=40",
      },
      assignee: {
        id: "u2",
        name: "Michael Chen",
        role: "Finance Director",
        email: "michael@example.com",
        avatarUrl: "/placeholder.svg?height=40&width=40",
      },
      dueDate: new Date(2024, 11, 15),
      createdAt: new Date(2024, 10, 1),
      updatedAt: new Date(2024, 10, 5),
      tags: ["marketing", "budget", "Q1"],
      comments: [
        {
          id: "c1",
          user: {
            id: "u2",
            name: "Michael Chen",
            role: "Finance Director",
            email: "michael@example.com",
          },
          content: "Please provide detailed breakdown of the marketing spend allocation.",
          createdAt: new Date(2024, 10, 3),
          type: "comment",
        },
        {
          id: "c2",
          user: {
            id: "u1",
            name: "Sarah Johnson",
            role: "Marketing Manager",
            email: "sarah@example.com",
          },
          content: "I've attached the detailed budget breakdown document.",
          createdAt: new Date(2024, 10, 4),
          type: "comment",
        },
      ],
      attachments: [
        {
          id: "a1",
          name: "Marketing_Budget_Breakdown_Q1.xlsx",
          url: "/documents/marketing-budget.xlsx",
          type: "spreadsheet",
          size: 2500000,
          uploadedBy: {
            id: "u1",
            name: "Sarah Johnson",
            role: "Marketing Manager",
            email: "sarah@example.com",
          },
          uploadedAt: new Date(2024, 10, 4),
        },
      ],
      approvalWorkflow: [
        {
          id: "step1",
          approver: {
            id: "u2",
            name: "Michael Chen",
            role: "Finance Director",
            email: "michael@example.com",
          },
          status: "pending",
          order: 1,
        },
        {
          id: "step2",
          approver: {
            id: "u3",
            name: "Alex Thompson",
            role: "CEO",
            email: "alex@example.com",
          },
          status: "pending",
          order: 2,
        },
      ],
      estimatedCost: 50000,
      businessJustification:
        "Increased marketing spend will help accelerate growth for our portfolio companies and improve their market visibility.",
      impactAssessment:
        "Expected 25% increase in lead generation and 15% improvement in brand awareness for target startups.",
      linkedTo: {
        type: "portfolio",
        id: "p1",
        name: "Q1 Portfolio Growth Initiative",
      },
    },
  ])

  const [newRequestData, setNewRequestData] = useState({
    title: "",
    description: "",
    type: "Other",
    priority: "Medium",
    dueDate: undefined as Date | undefined,
    assigneeId: "",
    tags: [] as string[],
    businessJustification: "",
    impactAssessment: "",
    estimatedCost: "",
    approverIds: [] as string[],
  })

  const mockUsers: RequestUser[] = [
    {
      id: "u1",
      name: "Sarah Johnson",
      role: "Marketing Manager",
      email: "sarah@example.com",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "u2",
      name: "Michael Chen",
      role: "Finance Director",
      email: "michael@example.com",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "u3",
      name: "Alex Thompson",
      role: "CEO",
      email: "alex@example.com",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
  ]

  const filteredRequests = requests.filter((request) => {
    const searchMatch =
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.description.toLowerCase().includes(searchQuery.toLowerCase())

    const tabMatch =
      activeTab === "all" ||
      (activeTab === "my-requests" && request.submitter.id === "u1") ||
      (activeTab === "pending-approval" &&
        request.approvalWorkflow.some((step) => step.approver.id === "u1" && step.status === "pending")) ||
      (activeTab === "completed" && ["Approved", "Completed"].includes(request.status))

    return searchMatch && tabMatch
  })

  const handleCreateRequest = async () => {
    if (!newRequestData.title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a request title.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const approvalWorkflow: ApprovalStep[] = newRequestData.approverIds.map((approverId, index) => ({
        id: `step${index + 1}`,
        approver: mockUsers.find((u) => u.id === approverId)!,
        status: "pending" as const,
        order: index + 1,
      }))

      const newRequest: Request = {
        id: `REQ-${String(requests.length + 1).padStart(3, "0")}`,
        title: newRequestData.title,
        description: newRequestData.description,
        type: newRequestData.type as Request["type"],
        priority: newRequestData.priority as Request["priority"],
        status: "Submitted",
        submitter: mockUsers[0], // Current user
        assignee: newRequestData.assigneeId ? mockUsers.find((u) => u.id === newRequestData.assigneeId) : undefined,
        dueDate: newRequestData.dueDate,
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: newRequestData.tags,
        comments: [],
        attachments: [],
        approvalWorkflow,
        estimatedCost: newRequestData.estimatedCost ? Number.parseFloat(newRequestData.estimatedCost) : undefined,
        businessJustification: newRequestData.businessJustification,
        impactAssessment: newRequestData.impactAssessment,
      }

      setRequests((prev) => [...prev, newRequest])
      setIsNewRequestDialogOpen(false)

      // Reset form
      setNewRequestData({
        title: "",
        description: "",
        type: "Other",
        priority: "Medium",
        dueDate: undefined,
        assigneeId: "",
        tags: [],
        businessJustification: "",
        impactAssessment: "",
        estimatedCost: "",
        approverIds: [],
      })

      toast({
        title: "Request submitted",
        description: "Your request has been submitted for approval.",
      })
    } catch (error) {
      toast({
        title: "Error creating request",
        description: "There was an error creating your request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleApprovalDecision = async (decision: "approved" | "rejected", comments?: string) => {
    if (!selectedRequest || !selectedApprovalStep) return

    const updatedWorkflow = selectedRequest.approvalWorkflow.map((step) =>
      step.id === selectedApprovalStep.id ? { ...step, status: decision, comments, decidedAt: new Date() } : step,
    )

    // Check if all approvals are complete
    const allApproved = updatedWorkflow.every((step) => step.status === "approved")
    const anyRejected = updatedWorkflow.some((step) => step.status === "rejected")

    let newStatus: Request["status"] = selectedRequest.status
    if (anyRejected) {
      newStatus = "Rejected"
    } else if (allApproved) {
      newStatus = "Approved"
    }

    const statusComment: RequestComment = {
      id: `c${Date.now()}`,
      user: selectedApprovalStep.approver,
      content: `${decision === "approved" ? "Approved" : "Rejected"} the request${comments ? `: ${comments}` : ""}`,
      createdAt: new Date(),
      type: decision === "approved" ? "approval" : "rejection",
    }

    setRequests((prev) =>
      prev.map((req) =>
        req.id === selectedRequest.id
          ? {
              ...req,
              status: newStatus,
              approvalWorkflow: updatedWorkflow,
              comments: [...req.comments, statusComment],
              updatedAt: new Date(),
            }
          : req,
      ),
    )

    setSelectedRequest((prev) =>
      prev
        ? {
            ...prev,
            status: newStatus,
            approvalWorkflow: updatedWorkflow,
            comments: [...prev.comments, statusComment],
          }
        : null,
    )

    setIsApprovalDialogOpen(false)
    setSelectedApprovalStep(null)

    toast({
      title: `Request ${decision}`,
      description: `The request has been ${decision}.`,
    })
  }

  const handleAddComment = async () => {
    if (!selectedRequest || !newComment.trim()) return

    const comment: RequestComment = {
      id: `c${Date.now()}`,
      user: mockUsers[0], // Current user
      content: newComment,
      createdAt: new Date(),
      type: "comment",
    }

    setRequests((prev) =>
      prev.map((req) =>
        req.id === selectedRequest.id ? { ...req, comments: [...req.comments, comment], updatedAt: new Date() } : req,
      ),
    )

    setSelectedRequest((prev) => (prev ? { ...prev, comments: [...prev.comments, comment] } : null))

    setNewComment("")

    toast({
      title: "Comment added",
      description: "Your comment has been added to the request.",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Draft":
        return "bg-gray-100 text-gray-800"
      case "Submitted":
        return "bg-blue-100 text-blue-800"
      case "Under Review":
        return "bg-yellow-100 text-yellow-800"
      case "Approved":
        return "bg-green-100 text-green-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Cancelled":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Low":
        return "bg-blue-100 text-blue-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "High":
        return "bg-orange-100 text-orange-800"
      case "Urgent":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getApprovalProgress = (workflow: ApprovalStep[]) => {
    const completed = workflow.filter((step) => step.status === "approved" || step.status === "rejected").length
    return (completed / workflow.length) * 100
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Request Management</h2>
          <p className="text-muted-foreground">Submit, track, and manage organizational requests</p>
        </div>
        <Dialog open={isNewRequestDialogOpen} onOpenChange={setIsNewRequestDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Request
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Request</DialogTitle>
              <DialogDescription>Submit a new request for approval and processing.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="request-title">Title *</Label>
                <Input
                  id="request-title"
                  value={newRequestData.title}
                  onChange={(e) => setNewRequestData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter request title..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="request-description">Description</Label>
                <Textarea
                  id="request-description"
                  value={newRequestData.description}
                  onChange={(e) => setNewRequestData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your request in detail..."
                  className="h-20"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select
                    value={newRequestData.type}
                    onValueChange={(value) => setNewRequestData((prev) => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Access">Access Request</SelectItem>
                      <SelectItem value="Budget">Budget Request</SelectItem>
                      <SelectItem value="Resource">Resource Request</SelectItem>
                      <SelectItem value="Policy">Policy Change</SelectItem>
                      <SelectItem value="Technical">Technical Support</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select
                    value={newRequestData.priority}
                    onValueChange={(value) => setNewRequestData((prev) => ({ ...prev, priority: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="business-justification">Business Justification</Label>
                <Textarea
                  id="business-justification"
                  value={newRequestData.businessJustification}
                  onChange={(e) => setNewRequestData((prev) => ({ ...prev, businessJustification: e.target.value }))}
                  placeholder="Explain the business need and justification..."
                  className="h-16"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="impact-assessment">Impact Assessment</Label>
                <Textarea
                  id="impact-assessment"
                  value={newRequestData.impactAssessment}
                  onChange={(e) => setNewRequestData((prev) => ({ ...prev, impactAssessment: e.target.value }))}
                  placeholder="Describe the expected impact and benefits..."
                  className="h-16"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="estimated-cost">Estimated Cost (Optional)</Label>
                  <Input
                    id="estimated-cost"
                    type="number"
                    value={newRequestData.estimatedCost}
                    onChange={(e) => setNewRequestData((prev) => ({ ...prev, estimatedCost: e.target.value }))}
                    placeholder="Enter amount..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Due Date (Optional)</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newRequestData.dueDate ? format(newRequestData.dueDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={newRequestData.dueDate}
                        onSelect={(date) => setNewRequestData((prev) => ({ ...prev, dueDate: date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Approvers</Label>
                <div className="space-y-2">
                  {mockUsers
                    .filter((u) => u.id !== "u1")
                    .map((user) => (
                      <div key={user.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`approver-${user.id}`}
                          checked={newRequestData.approverIds.includes(user.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewRequestData((prev) => ({ ...prev, approverIds: [...prev.approverIds, user.id] }))
                            } else {
                              setNewRequestData((prev) => ({
                                ...prev,
                                approverIds: prev.approverIds.filter((id) => id !== user.id),
                              }))
                            }
                          }}
                          className="rounded border-gray-300"
                        />
                        <label htmlFor={`approver-${user.id}`} className="flex items-center gap-2 text-sm">
                          <Avatar className="h-5 w-5">
                            <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback className="text-xs">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span>{user.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {user.role}
                          </Badge>
                        </label>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewRequestDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateRequest} disabled={loading}>
                Submit Request
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search requests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="my-requests">My Requests</TabsTrigger>
          <TabsTrigger value="pending-approval">Pending Approval</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          <div className="grid gap-4">
            {filteredRequests.map((request) => (
              <Card key={request.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{request.title}</CardTitle>
                      <CardDescription>{request.description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(request.priority)}>{request.priority}</Badge>
                      <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedRequest(request)
                          setIsRequestDialogOpen(true)
                        }}
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>Approval Progress</span>
                      <span>{Math.round(getApprovalProgress(request.approvalWorkflow))}%</span>
                    </div>
                    <Progress value={getApprovalProgress(request.approvalWorkflow)} className="h-2" />

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Submitted by</div>
                        <div className="flex items-center gap-1">
                          <Avatar className="h-4 w-4">
                            <AvatarImage
                              src={request.submitter.avatarUrl || "/placeholder.svg"}
                              alt={request.submitter.name}
                            />
                            <AvatarFallback className="text-xs">
                              {request.submitter.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{request.submitter.name}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Type</div>
                        <div className="font-medium">{request.type}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Created</div>
                        <div className="font-medium">{format(request.createdAt, "MMM d, yyyy")}</div>
                      </div>
                    </div>

                    {request.estimatedCost && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Estimated Cost:</span>
                        <span className="font-medium">${request.estimatedCost.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <div className="text-sm text-muted-foreground">Next Approver:</div>
                      {(() => {
                        const nextApprover = request.approvalWorkflow.find((step) => step.status === "pending")
                        return nextApprover ? (
                          <div className="flex items-center gap-1">
                            <Avatar className="h-5 w-5">
                              <AvatarImage
                                src={nextApprover.approver.avatarUrl || "/placeholder.svg"}
                                alt={nextApprover.approver.name}
                              />
                              <AvatarFallback className="text-xs">
                                {nextApprover.approver.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{nextApprover.approver.name}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">All approvals complete</span>
                        )
                      })()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Request Detail Dialog */}
      <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
          {selectedRequest && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <DialogTitle>{selectedRequest.title}</DialogTitle>
                    <DialogDescription>
                      {selectedRequest.type} • Submitted by {selectedRequest.submitter.name} on{" "}
                      {format(selectedRequest.createdAt, "MMM d, yyyy")}
                    </DialogDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(selectedRequest.priority)}>{selectedRequest.priority}</Badge>
                    <Badge className={getStatusColor(selectedRequest.status)}>{selectedRequest.status}</Badge>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedRequest.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Business Justification</h4>
                    <p className="text-sm text-muted-foreground">{selectedRequest.businessJustification}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Impact Assessment</h4>
                    <p className="text-sm text-muted-foreground">{selectedRequest.impactAssessment}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Approval Workflow</h4>
                  <div className="space-y-2">
                    {selectedRequest.approvalWorkflow.map((step, index) => (
                      <div key={step.id} className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs font-medium">
                            {index + 1}
                          </div>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={step.approver.avatarUrl || "/placeholder.svg"}
                                alt={step.approver.name}
                              />
                              <AvatarFallback className="text-xs">
                                {step.approver.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-sm">{step.approver.name}</div>
                              <div className="text-xs text-muted-foreground">{step.approver.role}</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {step.status === "pending" && (
                            <Button
                              size="sm"
                              onClick={() => {
                                setSelectedApprovalStep(step)
                                setIsApprovalDialogOpen(true)
                              }}
                            >
                              Review
                            </Button>
                          )}
                          {step.status === "approved" && <CheckCircle className="h-5 w-5 text-green-600" />}
                          {step.status === "rejected" && <XCircle className="h-5 w-5 text-red-600" />}
                          {step.status === "pending" && <Clock className="h-5 w-5 text-yellow-600" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedRequest.attachments.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Attachments</h4>
                    <div className="space-y-2">
                      {selectedRequest.attachments.map((attachment) => (
                        <div key={attachment.id} className="flex items-center justify-between p-2 border rounded-md">
                          <div className="flex items-center gap-2">
                            <Paperclip className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">{attachment.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {formatFileSize(attachment.size)} • Uploaded by {attachment.uploadedBy.name}
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-medium mb-2">Comments & Activity ({selectedRequest.comments.length})</h4>
                  <div className="space-y-4">
                    {selectedRequest.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={comment.user.avatarUrl || "/placeholder.svg"} alt={comment.user.name} />
                          <AvatarFallback className="text-xs">
                            {comment.user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium">{comment.user.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {format(comment.createdAt, "MMM d, yyyy at h:mm a")}
                            </span>
                            {comment.type !== "comment" && (
                              <Badge variant="outline" className="text-xs">
                                {comment.type === "approval"
                                  ? "Approved"
                                  : comment.type === "rejection"
                                    ? "Rejected"
                                    : "Status Change"}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm">{comment.content}</p>
                        </div>
                      </div>
                    ))}

                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={mockUsers[0].avatarUrl || "/placeholder.svg"} alt="You" />
                        <AvatarFallback className="text-xs">
                          {mockUsers[0].name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <Textarea
                          placeholder="Add a comment..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="h-20"
                        />
                        <Button size="sm" onClick={handleAddComment} disabled={!newComment.trim()}>
                          <Send className="mr-2 h-4 w-4" />
                          Add Comment
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Approval Decision Dialog */}
      <Dialog open={isApprovalDialogOpen} onOpenChange={setIsApprovalDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedApprovalStep && (
            <>
              <DialogHeader>
                <DialogTitle>Review Request</DialogTitle>
                <DialogDescription>
                  Make a decision on this request as {selectedApprovalStep.approver.name}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="approval-comments">Comments (Optional)</Label>
                  <Textarea
                    id="approval-comments"
                    placeholder="Add any comments about your decision..."
                    className="h-20"
                  />
                </div>
              </div>
              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setIsApprovalDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    const comments = (document.getElementById("approval-comments") as HTMLTextAreaElement)?.value
                    handleApprovalDecision("rejected", comments)
                  }}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject
                </Button>
                <Button
                  onClick={() => {
                    const comments = (document.getElementById("approval-comments") as HTMLTextAreaElement)?.value
                    handleApprovalDecision("approved", comments)
                  }}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
