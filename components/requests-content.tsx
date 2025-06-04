"use client"

import { Label } from "@/components/ui/label"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { PlusCircle, Filter, Search, MoreHorizontal, Eye, Edit3, ListChecks, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { useUserRole, mockUsers } from "@/hooks/use-user-role"
import { RequestFormModal } from "./request-form-modal"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Skeleton } from "./ui/skeleton"

export type RequestStatus = "Pending" | "In Progress" | "On Hold" | "Completed" | "Rejected"
export type RequestPriority = "High" | "Medium" | "Low"
export type RequestType = "Feature" | "Bug" | "Task" | "Document Review" | "Access Request"

interface RequestComment {
  id: string
  userId: string
  userName: string
  text: string
  timestamp: string
}

export interface RequestItem {
  id: string
  title: string
  description: string
  priority: RequestPriority
  type: RequestType
  status: RequestStatus
  submittedBy: { id: string; name: string }
  assignedTo?: { id: string; name: string }
  createdAt: string
  updatedAt: string
  comments?: RequestComment[]
}

const initialMockRequests: RequestItem[] = [
  {
    id: "REQ-001",
    title: "Review Q3 Financial Projections",
    description: "Detailed review of the Q3 financial projections for StartupX.",
    priority: "High",
    type: "Document Review",
    status: "Pending",
    submittedBy: mockUsers[1],
    assignedTo: mockUsers[0],
    createdAt: "2024-05-20T10:00:00Z",
    updatedAt: "2024-05-20T10:00:00Z",
    comments: [],
  },
  {
    id: "REQ-002",
    title: "Develop New Dashboard Widget",
    description: "Create a new widget for the main dashboard showing active users.",
    priority: "Medium",
    type: "Feature",
    status: "In Progress",
    submittedBy: mockUsers[0],
    assignedTo: mockUsers[3],
    createdAt: "2024-05-18T14:30:00Z",
    updatedAt: "2024-05-21T11:00:00Z",
    comments: [],
  },
  {
    id: "REQ-003",
    title: "Fix Login Page Bug",
    description: "Users reporting issues with password reset link.",
    priority: "High",
    type: "Bug",
    status: "On Hold",
    submittedBy: mockUsers[3],
    createdAt: "2024-05-22T09:15:00Z",
    updatedAt: "2024-05-23T16:45:00Z",
    comments: [],
  },
  {
    id: "REQ-004",
    title: "Onboard New Client: Acme Corp",
    description: "Complete all onboarding steps for Acme Corp.",
    priority: "Medium",
    type: "Task",
    status: "Completed",
    submittedBy: mockUsers[1],
    assignedTo: mockUsers[1],
    createdAt: "2024-05-15T11:00:00Z",
    updatedAt: "2024-05-19T17:00:00Z",
    comments: [],
  },
]

const statuses: RequestStatus[] = ["Pending", "In Progress", "On Hold", "Completed", "Rejected"]
const priorities: RequestPriority[] = ["High", "Medium", "Low"]
const types: RequestType[] = ["Feature", "Bug", "Task", "Document Review", "Access Request"]

export function RequestsContent() {
  const [isLoading, setIsLoading] = useState(true)
  const [requests, setRequests] = useState<RequestItem[]>(initialMockRequests)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({ status: "All", priority: "All", type: "All", assignedTo: "All" })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRequest, setEditingRequest] = useState<RequestItem | null>(null)

  const { toast } = useToast()
  const { role, userId } = useUserRole()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700) // Simulate loading
    return () => clearTimeout(timer)
  }, [])

  const handleFilterChange = (filterKey: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [filterKey]: value }))
  }

  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      const searchMatch =
        req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.id.toLowerCase().includes(searchTerm.toLowerCase())
      const statusMatch = filters.status === "All" || req.status === filters.status
      const priorityMatch = filters.priority === "All" || req.priority === filters.priority
      const typeMatch = filters.type === "All" || req.type === filters.type
      const assignmentMatch =
        filters.assignedTo === "All" ||
        (filters.assignedTo === "Me" && req.assignedTo?.id === userId) ||
        (filters.assignedTo === "Unassigned" && !req.assignedTo) ||
        req.assignedTo?.id === filters.assignedTo

      // RBAC: Viewers only see requests submitted by them or assigned to them
      if (role === "viewer" && req.submittedBy.id !== userId && req.assignedTo?.id !== userId) {
        return false
      }
      return searchMatch && statusMatch && priorityMatch && typeMatch && assignmentMatch
    })
  }, [requests, searchTerm, filters, role, userId])

  const handleNewRequest = () => {
    setEditingRequest(null)
    setIsModalOpen(true)
  }

  const handleEditRequest = (request: RequestItem) => {
    setEditingRequest(request)
    setIsModalOpen(true)
  }

  const handleDeleteRequest = (requestId: string) => {
    setRequests((prev) => prev.filter((req) => req.id !== requestId))
    toast({ title: "Request Deleted", description: `Request ${requestId} has been deleted.`, variant: "destructive" })
  }

  const handleSubmitRequest = (newOrUpdatedRequest: RequestItem) => {
    setRequests((prev) => {
      const existingIndex = prev.findIndex((r) => r.id === newOrUpdatedRequest.id)
      if (existingIndex > -1) {
        const updatedRequests = [...prev]
        updatedRequests[existingIndex] = newOrUpdatedRequest
        return updatedRequests
      }
      return [newOrUpdatedRequest, ...prev]
    })
  }

  const handleChangeStatus = (requestId: string, newStatus: RequestStatus) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId ? { ...req, status: newStatus, updatedAt: new Date().toISOString() } : req,
      ),
    )
    toast({ title: "Status Updated", description: `Request ${requestId} status changed to ${newStatus}.` })
  }

  const canCreateRequest = role === "admin" || role === "editor"
  const canDeleteRequest = (requestOwnerId: string) =>
    role === "admin" || (role === "editor" && requestOwnerId === userId)
  const canEditRequest = (requestOwnerId: string, assigneeId?: string) =>
    role === "admin" || (role === "editor" && (requestOwnerId === userId || assigneeId === userId))
  const canChangeStatus = (assigneeId?: string) => role === "admin" || (role === "editor" && assigneeId === userId)

  if (isLoading) {
    return (
      <div className="space-y-6 p-4 md:p-6">
        <div className="flex items-center justify-between">
          {" "}
          <Skeleton className="h-10 w-1/3" /> <Skeleton className="h-10 w-36" />{" "}
        </div>
        <Card>
          {" "}
          <CardContent className="p-4 space-y-4">
            {" "}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {" "}
              <Skeleton className="h-10 w-full" /> <Skeleton className="h-10 w-full" />{" "}
              <Skeleton className="h-10 w-full" /> <Skeleton className="h-10 w-full" />{" "}
            </div>{" "}
          </CardContent>{" "}
        </Card>
        <Skeleton className="h-[400px] w-full" />
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="space-y-6 p-4 md:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-jpmc-darkblue dark:text-jpmc-lightblue">Request Management</h1>
            <p className="text-muted-foreground">Submit, track, and manage various operational requests.</p>
          </div>
          {canCreateRequest && (
            <Button onClick={handleNewRequest} className="w-full sm:w-auto jpmc-gradient text-white">
              <PlusCircle className="mr-2 h-4 w-4" /> New Request
            </Button>
          )}
        </div>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-xl">
              <Filter className="mr-2 h-5 w-5 text-jpmc-blue" /> Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
              <div className="relative md:col-span-2 lg:col-span-1">
                <Label htmlFor="search-requests">Search</Label>
                <Search className="absolute left-3 top-9 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search-requests"
                  placeholder="ID, title..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                {" "}
                <Label htmlFor="filter-req-status">Status</Label>{" "}
                <Select value={filters.status} onValueChange={(v) => handleFilterChange("status", v)}>
                  {" "}
                  <SelectTrigger id="filter-req-status">
                    <SelectValue />
                  </SelectTrigger>{" "}
                  <SelectContent>
                    {["All", ...statuses].map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>{" "}
                </Select>{" "}
              </div>
              <div>
                {" "}
                <Label htmlFor="filter-req-priority">Priority</Label>{" "}
                <Select value={filters.priority} onValueChange={(v) => handleFilterChange("priority", v)}>
                  {" "}
                  <SelectTrigger id="filter-req-priority">
                    <SelectValue />
                  </SelectTrigger>{" "}
                  <SelectContent>
                    {["All", ...priorities].map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>{" "}
                </Select>{" "}
              </div>
              <div>
                {" "}
                <Label htmlFor="filter-req-type">Type</Label>{" "}
                <Select value={filters.type} onValueChange={(v) => handleFilterChange("type", v)}>
                  {" "}
                  <SelectTrigger id="filter-req-type">
                    <SelectValue />
                  </SelectTrigger>{" "}
                  <SelectContent>
                    {["All", ...types].map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>{" "}
                </Select>{" "}
              </div>
              <div>
                {" "}
                <Label htmlFor="filter-req-assignee">Assigned To</Label>{" "}
                <Select value={filters.assignedTo} onValueChange={(v) => handleFilterChange("assignedTo", v)}>
                  {" "}
                  <SelectTrigger id="filter-req-assignee">
                    <SelectValue />
                  </SelectTrigger>{" "}
                  <SelectContent>
                    {" "}
                    <SelectItem value="All">All Users</SelectItem> <SelectItem value="Me">Assigned to Me</SelectItem>{" "}
                    <SelectItem value="Unassigned">Unassigned</SelectItem>{" "}
                    {mockUsers.map((u) => (
                      <SelectItem key={u.id} value={u.id}>
                        {u.name}
                      </SelectItem>
                    ))}{" "}
                  </SelectContent>{" "}
                </Select>{" "}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ListChecks className="mr-2 h-5 w-5 text-primary" /> Submitted Requests
            </CardTitle>
            <CardDescription>
              Displaying {filteredRequests.length} of {requests.length} total requests. Real-time updates would appear
              here in a live system.
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Submitted By</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((req) => (
                    <TableRow key={req.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{req.id}</TableCell>
                      <TableCell>
                        <Tooltip>
                          <TooltipTrigger className="cursor-default text-left">
                            <span className="font-medium block max-w-xs truncate">{req.title}</span>
                          </TooltipTrigger>
                          <TooltipContent side="top" align="start" className="max-w-sm">
                            <p className="font-bold">{req.title}</p>
                            <p className="text-xs text-muted-foreground">{req.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            req.status === "Completed"
                              ? "default"
                              : req.status === "Rejected"
                                ? "destructive"
                                : "outline"
                          }
                          className={cn(
                            req.status === "Completed" && "bg-green-500 text-white",
                            req.status === "In Progress" && "border-blue-500 text-blue-500",
                          )}
                        >
                          {req.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            req.priority === "High"
                              ? "destructive"
                              : req.priority === "Medium"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {req.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>{req.type}</TableCell>
                      <TableCell>{req.submittedBy.name}</TableCell>
                      <TableCell>
                        {req.assignedTo?.name || <span className="text-muted-foreground italic">Unassigned</span>}
                      </TableCell>
                      <TableCell>{new Date(req.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() =>
                                toast({
                                  title: "Viewing Request (Simulated)",
                                  description: `Details for ${req.id} would open.`,
                                })
                              }
                            >
                              <Eye className="mr-2 h-4 w-4" /> View Details
                            </DropdownMenuItem>
                            {canEditRequest(req.submittedBy.id, req.assignedTo?.id) && (
                              <DropdownMenuItem onClick={() => handleEditRequest(req)}>
                                <Edit3 className="mr-2 h-4 w-4" /> Edit Request
                              </DropdownMenuItem>
                            )}
                            {canChangeStatus(req.assignedTo?.id) && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                                {statuses
                                  .filter((s) => s !== req.status)
                                  .map((status) => (
                                    <DropdownMenuItem key={status} onClick={() => handleChangeStatus(req.id, status)}>
                                      Set to {status}
                                    </DropdownMenuItem>
                                  ))}
                              </>
                            )}
                            {canDeleteRequest(req.submittedBy.id) && (
                              <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteRequest(req.id)}>
                                <Trash2 className="mr-2 h-4 w-4" /> Delete Request
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      No requests found matching your criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <RequestFormModal
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          onSubmit={handleSubmitRequest}
          requestToEdit={editingRequest}
        />

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Collaboration Notes</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>
              <strong>Real-time Updates:</strong> In a production environment, this request list would update in
              real-time using technologies like WebSockets or server-sent events. Changes made by other users would
              reflect immediately.
            </p>
            <p>
              <strong>Notifications:</strong> Users would typically receive in-app and/or email notifications for events
              like new request assignments, status changes, comments on their requests, or mentions.
            </p>
            <p>
              <strong>Detailed View & Comments:</strong> Clicking "View Details" would ideally navigate to a dedicated
              page for that request, showing its full history, attached files, and a comment thread for discussion.
            </p>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}
