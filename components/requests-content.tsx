"use client"

import { useState, useMemo, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs" // Added Tabs
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { PlusCircle, Filter, Search, MoreHorizontal, Eye, Edit3, ListChecks, Trash2, CalendarDays } from "lucide-react" // Added CalendarDays
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { useUserRole, mockUsers } from "@/hooks/use-user-role"
import { RequestFormModal } from "./request-form-modal"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Skeleton } from "./ui/skeleton"
import { Label } from "@/components/ui/label"
import { format, parseISO } from "date-fns"

// --- Type Definitions ---
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
  dueDate?: string // Added dueDate
  comments?: RequestComment[]
}

// --- Mock Data ---
const initialMockRequests: RequestItem[] = [
  {
    id: "REQ-001",
    title: "Review Q3 Financial Projections for StartupX",
    description:
      "Detailed review of the Q3 financial projections for StartupX, focusing on revenue forecasts and operational expenses.",
    priority: "High",
    type: "Document Review",
    status: "Pending",
    submittedBy: mockUsers.find((u) => u.name.includes("Editor")) || mockUsers[1],
    assignedTo: mockUsers.find((u) => u.name.includes("Admin")) || mockUsers[0],
    createdAt: "2024-05-20T10:00:00Z",
    updatedAt: "2024-05-20T10:00:00Z",
    dueDate: "2024-06-15T10:00:00Z",
    comments: [],
  },
  {
    id: "REQ-002",
    title: "Develop New Dashboard Widget for Active Users",
    description: "Create a new widget for the main dashboard showing real-time active users and session durations.",
    priority: "Medium",
    type: "Feature",
    status: "In Progress",
    submittedBy: mockUsers.find((u) => u.name.includes("Admin")) || mockUsers[0],
    assignedTo: mockUsers.find((u) => u.name.includes("Sneha")) || mockUsers[3],
    createdAt: "2024-05-18T14:30:00Z",
    updatedAt: "2024-05-21T11:00:00Z",
    dueDate: "2024-07-01T10:00:00Z",
    comments: [],
  },
  {
    id: "REQ-003",
    title: "Bug Fix: User Login Issue on Mobile",
    description: "Users are reporting intermittent login failures on mobile devices (iOS and Android).",
    priority: "High",
    type: "Bug",
    status: "Pending",
    submittedBy: mockUsers.find((u) => u.name.includes("Viewer")) || mockUsers[2],
    createdAt: "2024-06-01T09:00:00Z",
    updatedAt: "2024-06-01T09:00:00Z",
    dueDate: "2024-06-10T10:00:00Z",
    comments: [],
  },
]

const STATUSES: ReadonlyArray<RequestStatus> = ["Pending", "In Progress", "On Hold", "Completed", "Rejected"]
const PRIORITIES: ReadonlyArray<RequestPriority> = ["High", "Medium", "Low"]
const TYPES: ReadonlyArray<RequestType> = ["Feature", "Bug", "Task", "Document Review", "Access Request"]

// --- Component ---
export function RequestsContent() {
  const [isLoading, setIsLoading] = useState(true)
  const [requests, setRequests] = useState<RequestItem[]>(initialMockRequests)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({ status: "All", priority: "All", type: "All", assignedTo: "All" })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRequest, setEditingRequest] = useState<RequestItem | null>(null)
  const [activeTab, setActiveTab] = useState("list") // "list" or "calendar"

  const { toast } = useToast()
  const { role, userId } = useUserRole()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700)
    return () => clearTimeout(timer)
  }, [])

  const handleFilterChange = (filterKey: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [filterKey]: value }))
  }

  const filteredRequests = useMemo(() => {
    const sortedRequests = [...requests]
    if (activeTab === "calendar") {
      // Sort by due date for calendar view, requests without due date last
      sortedRequests.sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      })
    } else {
      // Default sort by creation date for list view
      sortedRequests.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    return sortedRequests.filter((req) => {
      const searchMatch =
        req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.description.toLowerCase().includes(searchTerm.toLowerCase())

      const statusMatch = filters.status === "All" || req.status === filters.status
      const priorityMatch = filters.priority === "All" || req.priority === filters.priority
      const typeMatch = filters.type === "All" || req.type === filters.type
      const assignmentMatch =
        filters.assignedTo === "All" ||
        (filters.assignedTo === "Me" && req.assignedTo?.id === userId) ||
        (filters.assignedTo === "Unassigned" && !req.assignedTo) ||
        req.assignedTo?.id === filters.assignedTo

      if (role === "viewer" && req.submittedBy.id !== userId && req.assignedTo?.id !== userId) {
        return false
      }
      return searchMatch && statusMatch && priorityMatch && typeMatch && assignmentMatch
    })
  }, [requests, searchTerm, filters, role, userId, activeTab])

  const handleNewRequest = useCallback(() => {
    setEditingRequest(null)
    setIsModalOpen(true)
  }, [])

  const handleEditRequest = useCallback((request: RequestItem) => {
    setEditingRequest(request)
    setIsModalOpen(true)
  }, [])

  const handleDeleteRequest = useCallback(
    (requestId: string) => {
      setRequests((prev) => prev.filter((req) => req.id !== requestId))
      toast({ title: "Request Deleted", description: `Request ${requestId} has been deleted.`, variant: "destructive" })
    },
    [toast],
  )

  const handleSubmitRequest = useCallback(
    (newOrUpdatedRequest: RequestItem, notifyByEmail: boolean) => {
      setRequests((prev) => {
        const existingIndex = prev.findIndex((r) => r.id === newOrUpdatedRequest.id)
        if (existingIndex > -1) {
          const updatedRequests = [...prev]
          updatedRequests[existingIndex] = { ...newOrUpdatedRequest, updatedAt: new Date().toISOString() }
          return updatedRequests
        }
        return [
          { ...newOrUpdatedRequest, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
          ...prev,
        ]
      })
      toast({
        title: editingRequest ? "Request Updated" : "Request Created",
        description: `${newOrUpdatedRequest.title} has been saved. ${notifyByEmail ? "(Simulated email notification sent)" : ""}`,
      })
      setEditingRequest(null)
    },
    [toast, editingRequest],
  )

  const handleChangeStatus = useCallback(
    (requestId: string, newStatus: RequestStatus) => {
      setRequests((prev) =>
        prev.map((req) =>
          req.id === requestId ? { ...req, status: newStatus, updatedAt: new Date().toISOString() } : req,
        ),
      )
      toast({ title: "Status Updated", description: `Request ${requestId} status changed to ${newStatus}.` })
    },
    [toast],
  )

  const canCreateRequest = useMemo(() => role === "admin" || role === "editor", [role])
  const canDeleteRequest = useCallback(
    (requestOwnerId: string) => role === "admin" || (role === "editor" && requestOwnerId === userId),
    [role, userId],
  )
  const canEditRequest = useCallback(
    (requestOwnerId: string, assigneeId?: string) =>
      role === "admin" || (role === "editor" && (requestOwnerId === userId || assigneeId === userId)),
    [role, userId],
  )
  const canChangeStatus = useCallback(
    (assigneeId?: string) => role === "admin" || (role === "editor" && assigneeId === userId),
    [role, userId],
  )

  if (isLoading) {
    // Skeleton remains the same
    return (
      <div className="space-y-6 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-1/3" /> <Skeleton className="h-10 w-36" />
        </div>
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          </CardContent>
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
              <Filter className="mr-2 h-5 w-5 text-primary" /> Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
              <div className="relative md:col-span-2 lg:col-span-1">
                <Label htmlFor="search-requests">Search</Label>
                <Search className="absolute left-3 top-9 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search-requests"
                  placeholder="ID, title, description..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="filter-req-status">Status</Label>
                <Select value={filters.status} onValueChange={(v) => handleFilterChange("status", v)}>
                  <SelectTrigger id="filter-req-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["All", ...STATUSES].map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="filter-req-priority">Priority</Label>
                <Select value={filters.priority} onValueChange={(v) => handleFilterChange("priority", v)}>
                  <SelectTrigger id="filter-req-priority">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["All", ...PRIORITIES].map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="filter-req-type">Type</Label>
                <Select value={filters.type} onValueChange={(v) => handleFilterChange("type", v)}>
                  <SelectTrigger id="filter-req-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["All", ...TYPES].map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="filter-req-assignee">Assigned To</Label>
                <Select value={filters.assignedTo} onValueChange={(v) => handleFilterChange("assignedTo", v)}>
                  <SelectTrigger id="filter-req-assignee">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Users</SelectItem>
                    <SelectItem value="Me">Assigned to Me</SelectItem>
                    <SelectItem value="Unassigned">Unassigned</SelectItem>
                    {mockUsers.map((u) => (
                      <SelectItem key={u.id} value={u.id}>
                        {u.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 md:w-1/3">
            <TabsTrigger value="list">
              <ListChecks className="mr-2 h-4 w-4" /> List View
            </TabsTrigger>
            <TabsTrigger value="calendar">
              <CalendarDays className="mr-2 h-4 w-4" /> Calendar View
            </TabsTrigger>
          </TabsList>
          <TabsContent value="list">
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ListChecks className="mr-2 h-5 w-5 text-primary" /> Submitted Requests
                </CardTitle>
                <CardDescription>
                  Displaying {filteredRequests.length} of {requests.length} total requests.
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
                      <TableHead>Due Date</TableHead>
                      <TableHead>Assigned To</TableHead>
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
                              <TooltipTrigger className="cursor-default text-left block max-w-xs truncate">
                                <span className="font-medium">{req.title}</span>
                              </TooltipTrigger>
                              <TooltipContent
                                side="top"
                                align="start"
                                className="max-w-sm bg-background border shadow-lg p-2 rounded-md"
                              >
                                <p className="font-bold text-foreground">{req.title}</p>
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
                                req.status === "Completed" &&
                                  "bg-green-500 text-white dark:bg-green-600 dark:text-white",
                                req.status === "In Progress" &&
                                  "border-blue-500 text-blue-500 dark:border-blue-400 dark:text-blue-400",
                                req.status === "Pending" &&
                                  "border-amber-500 text-amber-500 dark:border-amber-400 dark:text-amber-400",
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
                              className={cn(
                                req.priority === "High" && "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
                                req.priority === "Medium" &&
                                  "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
                                req.priority === "Low" &&
                                  "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
                              )}
                            >
                              {req.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {req.dueDate ? (
                              format(parseISO(req.dueDate), "MMM d, yyyy")
                            ) : (
                              <span className="text-muted-foreground italic">N/A</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {req.assignedTo?.name || <span className="text-muted-foreground italic">Unassigned</span>}
                          </TableCell>
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
                                    {STATUSES.filter((s) => s !== req.status).map((status) => (
                                      <DropdownMenuItem key={status} onClick={() => handleChangeStatus(req.id, status)}>
                                        Set to {status}
                                      </DropdownMenuItem>
                                    ))}
                                  </>
                                )}
                                {canDeleteRequest(req.submittedBy.id) && (
                                  <DropdownMenuItem
                                    className="text-red-600 hover:!text-red-600 dark:hover:!text-red-500"
                                    onClick={() => handleDeleteRequest(req.id)}
                                  >
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
                        <TableCell colSpan={7} className="h-24 text-center">
                          No requests found matching your criteria.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="calendar">
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarDays className="mr-2 h-5 w-5 text-primary" /> Requests Calendar View (Simplified)
                </CardTitle>
                <CardDescription>
                  Showing {filteredRequests.filter((r) => r.dueDate).length} requests with due dates. Full calendar
                  component to be implemented.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredRequests.filter((r) => r.dueDate).length > 0 ? (
                  <ul className="space-y-3">
                    {filteredRequests
                      .filter((r) => r.dueDate)
                      .map((req) => (
                        <li key={req.id} className="p-3 border rounded-md hover:bg-muted/50">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold">{req.title}</p>
                              <p className="text-sm text-muted-foreground">
                                Due: {format(parseISO(req.dueDate!), "PPP")}
                              </p>
                            </div>
                            <Badge
                              variant={
                                req.priority === "High"
                                  ? "destructive"
                                  : req.priority === "Medium"
                                    ? "secondary"
                                    : "outline"
                              }
                              className="text-xs"
                            >
                              {req.priority}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Assigned to: {req.assignedTo?.name || "Unassigned"}
                          </p>
                        </li>
                      ))}
                  </ul>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No requests with due dates found matching your criteria.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <RequestFormModal
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          onSubmit={handleSubmitRequest}
          requestToEdit={editingRequest}
        />

        <Card className="mt-6 bg-muted/50 dark:bg-muted/20">
          <CardHeader>
            <CardTitle className="text-lg">Collaboration & Workflow Notes</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>
              <strong>Email Notifications:</strong> Simulated email notifications are mentioned in toasts. Real
              integration would use a backend email service.
            </p>
            <p>
              <strong>Calendar View:</strong> A simplified list view for due dates is provided. A full interactive
              calendar (e.g., using a library like FullCalendar or react-big-calendar) would offer drag-and-drop
              scheduling and more views.
            </p>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}
