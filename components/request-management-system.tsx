"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"
import {
  Search,
  Plus,
  AlertCircle,
  FileText,
  Users,
  DollarSign,
  Settings,
  Clock,
  User,
  MessageSquare,
} from "lucide-react"

interface RMSUser {
  id: string
  name: string
  email: string
  role: "admin" | "editor" | "viewer"
  avatarUrl?: string
}

interface Request {
  id: string
  title: string
  description: string
  type: "funding" | "resource" | "support" | "access" | "other"
  status: "pending" | "in-review" | "approved" | "rejected" | "completed"
  priority: "low" | "medium" | "high" | "urgent"
  requester: RMSUser
  assignee?: RMSUser
  createdAt: Date
  updatedAt: Date
  dueDate?: Date
  amount?: number
  category: string
  tags: string[]
  comments: RequestComment[]
  attachments: RequestAttachment[]
  approvalHistory: ApprovalStep[]
}

interface RequestComment {
  id: string
  user: RMSUser
  content: string
  createdAt: Date
  isInternal: boolean
}

interface RequestAttachment {
  id: string
  name: string
  url: string
  type: string
  size: number
  uploadedBy: RMSUser
  uploadedAt: Date
}

interface ApprovalStep {
  id: string
  approver: RMSUser
  action: "approved" | "rejected" | "requested-changes"
  comment?: string
  timestamp: Date
}

interface RequestManagementSystemProps {
  userId?: string
  userRole?: "admin" | "editor" | "viewer"
  initialView?: "all" | "my-requests" | "assigned"
}

export function RequestManagementSystem({
  userId = "u1",
  userRole = "editor",
  initialView = "all",
}: RequestManagementSystemProps) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState(initialView)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedPriority, setSelectedPriority] = useState<string>("all")
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null)
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false)
  const [isNewRequestDialogOpen, setIsNewRequestDialogOpen] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [loading, setLoading] = useState(false)

  const [newRequestData, setNewRequestData] = useState({
    title: "",
    description: "",
    type: "support" as Request["type"],
    priority: "medium" as Request["priority"],
    category: "",
    amount: "",
    dueDate: undefined as Date | undefined,
    tags: [] as string[],
  })

  // Mock data - in a real app, this would come from an API
  const [requests, setRequests] = useState<Request[]>([
    {
      id: "r1",
      title: "Additional funding for marketing campaign",
      description:
        "We need additional budget allocation for our Q2 marketing campaign to expand our reach in the European market.",
      type: "funding",
      status: "pending",
      priority: "high",
      requester: {
        id: "u1",
        name: "Alex Thompson",
        email: "alex@example.com",
        role: "editor",
        avatarUrl: "/placeholder.svg?height=40&width=40",
      },
      assignee: {
        id: "u2",
        name: "Sarah Johnson",
        email: "sarah@example.com",
        role: "admin",
        avatarUrl: "/placeholder.svg?height=40&width=40",
      },
      createdAt: new Date(2025, 5, 1),
      updatedAt: new Date(2025, 5, 3),
      dueDate: new Date(2025, 5, 15),
      amount: 25000,
      category: "Marketing",
      tags: ["marketing", "funding", "europe"],
      comments: [],
      attachments: [],
      approvalHistory: [],
    },
    {
      id: "r2",
      title: "Access to premium analytics tools",
      description: "Request access to advanced analytics tools for better data insights and reporting capabilities.",
      type: "access",
      status: "approved",
      priority: "medium",
      requester: {
        id: "u3",
        name: "Michael Chen",
        email: "michael@example.com",
        role: "editor",
        avatarUrl: "/placeholder.svg?height=40&width=40",
      },
      assignee: {
        id: "u2",
        name: "Sarah Johnson",
        email: "sarah@example.com",
        role: "admin",
        avatarUrl: "/placeholder.svg?height=40&width=40",
      },
      createdAt: new Date(2025, 4, 28),
      updatedAt: new Date(2025, 5, 1),
      category: "Tools & Software",
      tags: ["analytics", "tools", "access"],
      comments: [],
      attachments: [],
      approvalHistory: [],
    },
  ])

  const [users] = useState<RMSUser[]>([
    {
      id: "u1",
      name: "Alex Thompson",
      email: "alex@example.com",
      role: "editor",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "u2",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "admin",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "u3",
      name: "Michael Chen",
      email: "michael@example.com",
      role: "editor",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
  ])

  const requestTypes = [
    { value: "funding", label: "Funding", icon: <DollarSign className="h-4 w-4" /> },
    { value: "resource", label: "Resource", icon: <FileText className="h-4 w-4" /> },
    { value: "support", label: "Support", icon: <Users className="h-4 w-4" /> },
    { value: "access", label: "Access", icon: <Settings className="h-4 w-4" /> },
    { value: "other", label: "Other", icon: <AlertCircle className="h-4 w-4" /> },
  ]

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    "in-review": "bg-blue-100 text-blue-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    completed: "bg-gray-100 text-gray-800",
  }

  const priorityColors = {
    low: "bg-blue-100 text-blue-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-orange-100 text-orange-800",
    urgent: "bg-red-100 text-red-800",
  }

  const filteredRequests = requests.filter((request) => {
    // Filter by tab
    if (activeTab === "my-requests" && request.requester.id !== userId) {
      return false
    }
    if (activeTab === "assigned" && request.assignee?.id !== userId) {
      return false
    }

    // Filter by search query
    if (
      searchQuery &&
      !request.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !request.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by type
    if (selectedType !== "all" && request.type !== selectedType) {
      return false
    }

    // Filter by status
    if (selectedStatus !== "all" && request.status !== selectedStatus) {
      return false
    }

    // Filter by priority
    if (selectedPriority !== "all" && request.priority !== selectedPriority) {
      return false
    }

    return true
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
      const newRequest: Request = {
        id: `r${requests.length + 1}`,
        title: newRequestData.title,
        description: newRequestData.description,
        type: newRequestData.type,
        status: "pending",
        priority: newRequestData.priority,
        requester: users.find((u) => u.id === userId)!,
        createdAt: new Date(),
        updatedAt: new Date(),
        dueDate: newRequestData.dueDate,
        amount: newRequestData.amount ? Number.parseFloat(newRequestData.amount) : undefined,
        category: newRequestData.category,
        tags: newRequestData.tags,
        comments: [],
        attachments: [],
        approvalHistory: [],
      }

      setRequests((prev) => [...prev, newRequest])
      setIsNewRequestDialogOpen(false)
      setNewRequestData({
        title: "",
        description: "",
        type: "support",
        priority: "medium",
        category: "",
        amount: "",
        dueDate: undefined,
        tags: [],
      })

      toast({
        title: "Request created",
        description: "Your request has been submitted successfully.",
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

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getTypeIcon = (type: Request["type"]) => {
    const typeConfig = requestTypes.find((t) => t.value === type)
    return typeConfig?.icon || <AlertCircle className="h-4 w-4" />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Request Management</h2>
          <p className="text-muted-foreground">Manage and track internal requests</p>
        </div>
        <Dialog open={isNewRequestDialogOpen} onOpenChange={setIsNewRequestDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Request
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Request</DialogTitle>
              <DialogDescription>Submit a new request for review and approval.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={newRequestData.title}
                  onChange={(e) => setNewRequestData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter request title..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={newRequestData.description}
                  onChange={(e) => setNewRequestData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Provide detailed description of your request..."
                  className="h-24"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select
                    value={newRequestData.type}
                    onValueChange={(value: Request["type"]) => setNewRequestData((prev) => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {requestTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            {type.icon}
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select
                    value={newRequestData.priority}
                    onValueChange={(value: Request["priority"]) =>
                      setNewRequestData((prev) => ({ ...prev, priority: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="my-requests">My Requests</TabsTrigger>
          <TabsTrigger value="assigned">Assigned to Me</TabsTrigger>
        </TabsList>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search requests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {requestTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-review">In Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 mt-6">
          {filteredRequests.map((request) => (
            <Card
              key={request.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => {
                setSelectedRequest(request)
                setIsRequestDialogOpen(true)
              }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(request.type)}
                    <div>
                      <CardTitle className="text-lg">{request.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {request.description.length > 100
                          ? `${request.description.substring(0, 100)}...`
                          : request.description}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={priorityColors[request.priority]}>{request.priority}</Badge>
                    <Badge className={statusColors[request.status]}>{request.status}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {request.requester.name}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {format(request.createdAt, "MMM d, yyyy")}
                    </div>
                    {request.amount && (
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {formatCurrency(request.amount)}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    {request.comments.length}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredRequests.length === 0 && (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No requests found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery || selectedType !== "all" || selectedStatus !== "all" || selectedPriority !== "all"
                      ? "Try adjusting your filters to see more results."
                      : "Create your first request to get started."}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </Tabs>

      {/* Request Detail Dialog */}
      <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          {selectedRequest && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <DialogTitle className="text-xl">{selectedRequest.title}</DialogTitle>
                    <DialogDescription className="mt-2">{selectedRequest.description}</DialogDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={priorityColors[selectedRequest.priority]}>{selectedRequest.priority}</Badge>
                    <Badge className={statusColors[selectedRequest.status]}>{selectedRequest.status}</Badge>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label className="font-medium">Requester</Label>
                    <p className="text-muted-foreground">{selectedRequest.requester.name}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Category</Label>
                    <p className="text-muted-foreground">{selectedRequest.category}</p>
                  </div>
                  <div>
                    <Label className="font-medium">Created</Label>
                    <p className="text-muted-foreground">{format(selectedRequest.createdAt, "PPP")}</p>
                  </div>
                  {selectedRequest.dueDate && (
                    <div>
                      <Label className="font-medium">Due Date</Label>
                      <p className="text-muted-foreground">{format(selectedRequest.dueDate, "PPP")}</p>
                    </div>
                  )}
                  {selectedRequest.amount && (
                    <div>
                      <Label className="font-medium">Amount</Label>
                      <p className="text-muted-foreground">{formatCurrency(selectedRequest.amount)}</p>
                    </div>
                  )}
                  {selectedRequest.assignee && (
                    <div>
                      <Label className="font-medium">Assignee</Label>
                      <p className="text-muted-foreground">{selectedRequest.assignee.name}</p>
                    </div>
                  )}
                </div>

                {selectedRequest.tags.length > 0 && (
                  <div>
                    <Label className="font-medium">Tags</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedRequest.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
