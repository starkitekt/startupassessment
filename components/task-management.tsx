"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import {
  Plus,
  CalendarIcon,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  Filter,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useUserRole, mockUsers } from "@/hooks/use-user-role"

export type TaskPriority = "low" | "medium" | "high" | "urgent"
export type TaskStatus = "todo" | "in-progress" | "review" | "completed" | "cancelled"
export type TaskCategory = "assessment" | "funding" | "compliance" | "mentoring" | "general"

export interface Task {
  id: string
  title: string
  description: string
  priority: TaskPriority
  status: TaskStatus
  category: TaskCategory
  assignedTo?: {
    id: string
    name: string
  }
  createdBy: {
    id: string
    name: string
  }
  dueDate?: Date
  createdAt: Date
  updatedAt: Date
  completedAt?: Date
  tags: string[]
  dependencies?: string[] // Task IDs that must be completed first
  estimatedHours?: number
  actualHours?: number
  comments: {
    id: string
    userId: string
    userName: string
    text: string
    createdAt: Date
  }[]
}

interface TaskFormData {
  title: string
  description: string
  priority: TaskPriority
  category: TaskCategory
  assignedToId?: string
  dueDate?: Date
  estimatedHours?: number
  tags: string[]
}

interface TaskManagementProps {
  initialTasks?: Task[]
  canCreateTasks?: boolean
  canAssignTasks?: boolean
}

export function TaskManagement({
  initialTasks = [],
  canCreateTasks = true,
  canAssignTasks = true,
}: TaskManagementProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    category: "all",
    assignedTo: "all",
  })
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    priority: "medium",
    category: "general",
    tags: [],
  })

  const { role, userId, userName } = useUserRole()
  const { toast } = useToast()

  // Mock initial tasks
  useState(() => {
    if (initialTasks.length === 0) {
      const mockTasks: Task[] = [
        {
          id: "TASK001",
          title: "Review TechStart Solutions Assessment",
          description: "Complete technical and financial review for TechStart Solutions funding application",
          priority: "high",
          status: "in-progress",
          category: "assessment",
          assignedTo: { id: "user456", name: "Priya Sharma" },
          createdBy: { id: "user123", name: "Rajesh Kumar" },
          dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
          updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
          tags: ["assessment", "funding", "urgent"],
          estimatedHours: 8,
          actualHours: 5,
          comments: [
            {
              id: "CMT001",
              userId: "user456",
              userName: "Priya Sharma",
              text: "Started the technical review. Financial documents look good so far.",
              createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
            },
          ],
        },
        {
          id: "TASK002",
          title: "Prepare Q1 Compliance Report",
          description: "Compile compliance data for Q1 and prepare report for regulatory submission",
          priority: "medium",
          status: "todo",
          category: "compliance",
          assignedTo: { id: "user789", name: "Amit Singh" },
          createdBy: { id: "user123", name: "Rajesh Kumar" },
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
          updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          tags: ["compliance", "report", "quarterly"],
          estimatedHours: 12,
          comments: [],
        },
        {
          id: "TASK003",
          title: "Schedule Mentor Matching Session",
          description: "Organize mentor matching session for new cohort startups",
          priority: "low",
          status: "completed",
          category: "mentoring",
          assignedTo: { id: "user101", name: "Sneha Patel" },
          createdBy: { id: "user123", name: "Rajesh Kumar" },
          dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Yesterday
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
          updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          tags: ["mentoring", "cohort", "matching"],
          estimatedHours: 4,
          actualHours: 3,
          comments: [
            {
              id: "CMT002",
              userId: "user101",
              userName: "Sneha Patel",
              text: "Session completed successfully. All startups matched with mentors.",
              createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            },
          ],
        },
      ]
      setTasks(mockTasks)
    }
  })

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const searchMatch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const statusMatch = filters.status === "all" || task.status === filters.status
      const priorityMatch = filters.priority === "all" || task.priority === filters.priority
      const categoryMatch = filters.category === "all" || task.category === filters.category
      const assigneeMatch =
        filters.assignedTo === "all" ||
        (filters.assignedTo === "me" && task.assignedTo?.id === userId) ||
        (filters.assignedTo === "unassigned" && !task.assignedTo) ||
        task.assignedTo?.id === filters.assignedTo

      return searchMatch && statusMatch && priorityMatch && categoryMatch && assigneeMatch
    })
  }, [tasks, searchTerm, filters, userId])

  const handleCreateTask = () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in title and description",
        variant: "destructive",
      })
      return
    }

    const newTask: Task = {
      id: `TASK${Date.now()}`,
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      status: "todo",
      category: formData.category,
      assignedTo: formData.assignedToId ? mockUsers.find((u) => u.id === formData.assignedToId) : undefined,
      createdBy: { id: userId, name: userName },
      dueDate: formData.dueDate,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: formData.tags,
      estimatedHours: formData.estimatedHours,
      comments: [],
    }

    setTasks((prev) => [newTask, ...prev])
    setFormData({
      title: "",
      description: "",
      priority: "medium",
      category: "general",
      tags: [],
    })
    setIsCreateModalOpen(false)

    toast({
      title: "Task Created",
      description: `Task "${newTask.title}" has been created successfully`,
    })
  }

  const handleUpdateTaskStatus = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
              updatedAt: new Date(),
              completedAt: newStatus === "completed" ? new Date() : undefined,
            }
          : task,
      ),
    )

    toast({
      title: "Task Updated",
      description: `Task status changed to ${newStatus}`,
    })
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
    toast({
      title: "Task Deleted",
      description: "Task has been deleted successfully",
    })
  }

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-700 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-700 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-700 border-green-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700"
      case "in-progress":
        return "bg-blue-100 text-blue-700"
      case "review":
        return "bg-purple-100 text-purple-700"
      case "cancelled":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "review":
        return <AlertCircle className="h-4 w-4 text-purple-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Task Management</h1>
          <p className="text-muted-foreground">Organize and track your team's tasks and projects</p>
        </div>
        {canCreateTasks && (
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button className="jpmc-gradient">
                <Plus className="h-4 w-4 mr-2" />
                Create Task
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="task-title">Title *</Label>
                    <Input
                      id="task-title"
                      value={formData.title}
                      onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter task title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="task-category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value as TaskCategory }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="assessment">Assessment</SelectItem>
                        <SelectItem value="funding">Funding</SelectItem>
                        <SelectItem value="compliance">Compliance</SelectItem>
                        <SelectItem value="mentoring">Mentoring</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="task-description">Description *</Label>
                  <Textarea
                    id="task-description"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the task in detail"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="task-priority">Priority</Label>
                    <Select
                      value={formData.priority}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, priority: value as TaskPriority }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="task-estimated-hours">Estimated Hours</Label>
                    <Input
                      id="task-estimated-hours"
                      type="number"
                      value={formData.estimatedHours || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          estimatedHours: e.target.value ? Number.parseInt(e.target.value) : undefined,
                        }))
                      }
                      placeholder="Hours"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {canAssignTasks && (
                    <div>
                      <Label htmlFor="task-assignee">Assign To</Label>
                      <Select
                        value={formData.assignedToId || ""}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, assignedToId: value || undefined }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select assignee" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Unassigned</SelectItem>
                          {mockUsers.map((user) => (
                            <SelectItem key={user.id} value={user.id}>
                              {user.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <div>
                    <Label>Due Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.dueDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.dueDate ? format(formData.dueDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.dueDate}
                          onSelect={(date) => setFormData((prev) => ({ ...prev, dueDate: date }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateTask}>Create Task</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={filters.status}
              onValueChange={(value) => setFilters((prev) => ({ ...prev, status: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="review">Review</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filters.priority}
              onValueChange={(value) => setFilters((prev) => ({ ...prev, priority: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filters.category}
              onValueChange={(value) => setFilters((prev) => ({ ...prev, category: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="assessment">Assessment</SelectItem>
                <SelectItem value="funding">Funding</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
                <SelectItem value="mentoring">Mentoring</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filters.assignedTo}
              onValueChange={(value) => setFilters((prev) => ({ ...prev, assignedTo: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Assignee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Assignees</SelectItem>
                <SelectItem value="me">Assigned to Me</SelectItem>
                <SelectItem value="unassigned">Unassigned</SelectItem>
                {mockUsers.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
              <p className="text-muted-foreground">
                {searchTerm || Object.values(filters).some((f) => f !== "all")
                  ? "Try adjusting your search or filters"
                  : "Create your first task to get started"}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredTasks.map((task) => (
            <Card key={task.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(task.status)}
                      <h3 className="font-semibold text-lg">{task.title}</h3>
                      <Badge className={cn("text-xs", getPriorityColor(task.priority))}>{task.priority}</Badge>
                      <Badge className={cn("text-xs", getStatusColor(task.status))}>
                        {task.status.replace("-", " ")}
                      </Badge>
                    </div>

                    <p className="text-muted-foreground">{task.description}</p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      {task.assignedTo && (
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{task.assignedTo.name}</span>
                        </div>
                      )}
                      {task.dueDate && (
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-4 w-4" />
                          <span>Due {format(task.dueDate, "MMM d, yyyy")}</span>
                        </div>
                      )}
                      {task.estimatedHours && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>
                            {task.actualHours
                              ? `${task.actualHours}/${task.estimatedHours}h`
                              : `${task.estimatedHours}h`}
                          </span>
                        </div>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {task.category}
                      </Badge>
                    </div>

                    {task.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {task.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {task.comments.length > 0 && (
                      <div className="text-sm text-muted-foreground">
                        Latest: {task.comments[task.comments.length - 1].text.substring(0, 100)}
                        {task.comments[task.comments.length - 1].text.length > 100 && "..."}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <Select
                      value={task.status}
                      onValueChange={(value) => handleUpdateTaskStatus(task.id, value as TaskStatus)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todo">To Do</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="review">Review</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-40" align="end">
                        <div className="space-y-1">
                          <Button variant="ghost" size="sm" className="w-full justify-start">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-red-600 hover:text-red-600"
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
