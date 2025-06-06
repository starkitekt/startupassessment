"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
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
  MoreVertical,
  Trash2,
  Edit,
  MessageSquare,
  Paperclip,
  ChevronDown,
  ChevronUp,
  X,
  ArrowUpRight,
} from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
}

interface Task {
  id: string
  title: string
  description: string
  status: "todo" | "in-progress" | "review" | "done"
  priority: "low" | "medium" | "high" | "urgent"
  dueDate?: Date
  assignee?: User
  creator: User
  createdAt: Date
  updatedAt: Date
  tags: string[]
  comments: TaskComment[]
  attachments: TaskAttachment[]
  linkedTo?: {
    type: "startup" | "assessment" | "mentor" | "funding"
    id: string
    name: string
  }
}

interface TaskComment {
  id: string
  user: User
  content: string
  createdAt: Date
}

interface TaskAttachment {
  id: string
  name: string
  url: string
  type: string
  size: number
  uploadedBy: User
  uploadedAt: Date
}

interface TaskManagementSystemProps {
  userId?: string
  initialView?: "board" | "list"
  initialFilter?: "all" | "assigned" | "created"
}

export function TaskManagementSystem({
  userId = "u1",
  initialView = "board",
  initialFilter = "all",
}: TaskManagementSystemProps) {
  const { toast } = useToast()
  const [view, setView] = useState<"board" | "list">(initialView)
  const [filter, setFilter] = useState<"all" | "assigned" | "created">(initialFilter)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)
  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false)
  const [newTaskData, setNewTaskData] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    dueDate: undefined as Date | undefined,
    assigneeId: "",
    tags: [] as string[],
  })
  const [newComment, setNewComment] = useState("")
  const [loading, setLoading] = useState(false)

  // Mock data - in a real app, this would come from an API
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "t1",
      title: "Complete financial projections for Series A",
      description:
        "Create detailed 3-year financial projections for the upcoming Series A funding round. Include revenue forecasts, expense breakdowns, and cash flow analysis.",
      status: "todo",
      priority: "high",
      dueDate: new Date(2025, 5, 15),
      creator: {
        id: "u2",
        name: "Sarah Johnson",
        email: "sarah@example.com",
        avatarUrl: "/placeholder.svg?height=40&width=40",
      },
      assignee: {
        id: "u1",
        name: "Alex Thompson",
        email: "alex@example.com",
        avatarUrl: "/placeholder.svg?height=40&width=40",
      },
      createdAt: new Date(2025, 5, 1),
      updatedAt: new Date(2025, 5, 1),
      tags: ["finance", "funding"],
      comments: [
        {
          id: "c1",
          user: {
            id: "u2",
            name: "Sarah Johnson",
            email: "sarah@example.com",
            avatarUrl: "/placeholder.svg?height=40&width=40",
          },
          content: "Please make sure to include sensitivity analysis for different growth scenarios.",
          createdAt: new Date(2025, 5, 2),
        },
      ],
      attachments: [
        {
          id: "a1",
          name: "financial_template.xlsx",
          url: "#",
          type: "spreadsheet",
          size: 2500000,
          uploadedBy: {
            id: "u2",
            name: "Sarah Johnson",
            email: "sarah@example.com",
            avatarUrl: "/placeholder.svg?height=40&width=40",
          },
          uploadedAt: new Date(2025, 5, 1),
        },
      ],
      linkedTo: {
        type: "funding",
        id: "f1",
        name: "Series A Funding Application",
      },
    },
    {
      id: "t2",
      title: "Prepare pitch deck for investor meeting",
      description:
        "Create a compelling pitch deck for the upcoming investor meeting. Focus on traction metrics, market opportunity, and competitive advantage.",
      status: "in-progress",
      priority: "urgent",
      dueDate: new Date(2025, 5, 10),
      creator: {
        id: "u1",
        name: "Alex Thompson",
        email: "alex@example.com",
        avatarUrl: "/placeholder.svg?height=40&width=40",
      },
      assignee: {
        id: "u1",
        name: "Alex Thompson",
        email: "alex@example.com",
        avatarUrl: "/placeholder.svg?height=40&width=40",
      },
      createdAt: new Date(2025, 5, 3),
      updatedAt: new Date(2025, 5, 5),
      tags: ["presentation", "investors"],
      comments: [],
      attachments: [],
      linkedTo: {
        type: "startup",
        id: "s1",
        name: "TechInnovate",
      },
    },
    {
      id: "t3",
      title: "Schedule mentor meeting with David",
      description: "Coordinate a meeting with mentor David to discuss product roadmap and scaling strategy.",
      status: "done",
      priority: "medium",
      dueDate: new Date(2025, 5, 4),
      creator: {
        id: "u3",
        name: "Michael Chen",
        email: "michael@example.com",
        avatarUrl: "/placeholder.svg?height=40&width=40",
      },
      assignee: {
        id: "u1",
        name: "Alex Thompson",
        email: "alex@example.com",
        avatarUrl: "/placeholder.svg?height=40&width=40",
      },
      createdAt: new Date(2025, 5, 2),
      updatedAt: new Date(2025, 5, 4),
      tags: ["mentorship", "meeting"],
      comments: [
        {
          id: "c2",
          user: {
            id: "u1",
            name: "Alex Thompson",
            email: "alex@example.com",
            avatarUrl: "/placeholder.svg?height=40&width=40",
          },
          content: "Meeting scheduled for Thursday at 2pm.",
          createdAt: new Date(2025, 5, 3),
        },
        {
          id: "c3",
          user: {
            id: "u3",
            name: "Michael Chen",
            email: "michael@example.com",
            avatarUrl: "/placeholder.svg?height=40&width=40",
          },
          content: "Great, I'll prepare the agenda.",
          createdAt: new Date(2025, 5, 3),
        },
      ],
      attachments: [],
      linkedTo: {
        type: "mentor",
        id: "m1",
        name: "David Washington",
      },
    },
    {
      id: "t4",
      title: "Review competitor analysis report",
      description: "Review the competitor analysis report and provide feedback on market positioning strategy.",
      status: "review",
      priority: "low",
      dueDate: new Date(2025, 5, 12),
      creator: {
        id: "u2",
        name: "Sarah Johnson",
        email: "sarah@example.com",
        avatarUrl: "/placeholder.svg?height=40&width=40",
      },
      assignee: {
        id: "u3",
        name: "Michael Chen",
        email: "michael@example.com",
        avatarUrl: "/placeholder.svg?height=40&width=40",
      },
      createdAt: new Date(2025, 5, 6),
      updatedAt: new Date(2025, 5, 8),
      tags: ["market", "strategy"],
      comments: [],
      attachments: [
        {
          id: "a2",
          name: "competitor_analysis.pdf",
          url: "#",
          type: "pdf",
          size: 1800000,
          uploadedBy: {
            id: "u2",
            name: "Sarah Johnson",
            email: "sarah@example.com",
            avatarUrl: "/placeholder.svg?height=40&width=40",
          },
          uploadedAt: new Date(2025, 5, 6),
        },
      ],
    },
  ])

  const [users] = useState<User[]>([
    {
      id: "u1",
      name: "Alex Thompson",
      email: "alex@example.com",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "u2",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "u3",
      name: "Michael Chen",
      email: "michael@example.com",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
  ])

  const allTags = Array.from(new Set(tasks.flatMap((task) => task.tags)))

  const filteredTasks = tasks.filter((task) => {
    // Filter by search query
    if (
      searchQuery &&
      !task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !task.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by user role
    if (filter === "assigned" && task.assignee?.id !== userId) {
      return false
    }
    if (filter === "created" && task.creator.id !== userId) {
      return false
    }

    // Filter by priorities
    if (selectedPriorities.length > 0 && !selectedPriorities.includes(task.priority)) {
      return false
    }

    // Filter by tags
    if (selectedTags.length > 0 && !selectedTags.some((tag) => task.tags.includes(tag))) {
      return false
    }

    return true
  })

  const tasksByStatus = {
    todo: filteredTasks.filter((task) => task.status === "todo"),
    "in-progress": filteredTasks.filter((task) => task.status === "in-progress"),
    review: filteredTasks.filter((task) => task.status === "review"),
    done: filteredTasks.filter((task) => task.status === "done"),
  }

  const statusLabels = {
    todo: "To Do",
    "in-progress": "In Progress",
    review: "Review",
    done: "Done",
  }

  const priorityColors = {
    low: "bg-blue-100 text-blue-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-orange-100 text-orange-800",
    urgent: "bg-red-100 text-red-800",
  }

  const statusColors = {
    todo: "bg-gray-100 text-gray-800",
    "in-progress": "bg-blue-100 text-blue-800",
    review: "bg-yellow-100 text-yellow-800",
    done: "bg-green-100 text-green-800",
  }

  const handleCreateTask = async () => {
    if (!newTaskData.title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a task title.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const newTask: Task = {
        id: `t${tasks.length + 1}`,
        title: newTaskData.title,
        description: newTaskData.description,
        status: newTaskData.status as Task["status"],
        priority: newTaskData.priority as Task["priority"],
        dueDate: newTaskData.dueDate,
        assignee: newTaskData.assigneeId ? users.find((u) => u.id === newTaskData.assigneeId) : undefined,
        creator: users.find((u) => u.id === userId)!,
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: newTaskData.tags,
        comments: [],
        attachments: [],
      }

      setTasks((prev) => [...prev, newTask])
      setIsNewTaskDialogOpen(false)
      setNewTaskData({
        title: "",
        description: "",
        priority: "medium",
        status: "todo",
        dueDate: undefined,
        assigneeId: "",
        tags: [],
      })

      toast({
        title: "Task created",
        description: "Your task has been created successfully.",
      })
    } catch (error) {
      toast({
        title: "Error creating task",
        description: "There was an error creating your task. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateTaskStatus = async (taskId: string, newStatus: Task["status"]) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, status: newStatus, updatedAt: new Date() } : task)),
    )

    toast({
      title: "Task updated",
      description: `Task status changed to ${statusLabels[newStatus]}.`,
    })
  }

  const handleAddComment = async () => {
    if (!selectedTask || !newComment.trim()) return

    const comment: TaskComment = {
      id: `c${Date.now()}`,
      user: users.find((u) => u.id === userId)!,
      content: newComment,
      createdAt: new Date(),
    }

    setTasks((prev) =>
      prev.map((task) =>
        task.id === selectedTask.id ? { ...task, comments: [...task.comments, comment], updatedAt: new Date() } : task,
      ),
    )

    setSelectedTask((prev) => (prev ? { ...prev, comments: [...prev.comments, comment] } : null))
    setNewComment("")

    toast({
      title: "Comment added",
      description: "Your comment has been added to the task.",
    })
  }

  const handleDeleteTask = async (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
    setIsTaskDialogOpen(false)
    setSelectedTask(null)

    toast({
      title: "Task deleted",
      description: "The task has been deleted successfully.",
    })
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getDaysUntilDue = (dueDate: Date): number => {
    const today = new Date()
    const diffTime = dueDate.getTime() - today.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const TaskCard = ({ task }: { task: Task }) => (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => {
        setSelectedTask(task)
        setIsTaskDialogOpen(true)
      }}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-sm font-medium line-clamp-2">{task.title}</CardTitle>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={(e) => e.stopPropagation()}>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40" align="end">
              <div className="space-y-1">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-red-600 hover:text-red-700"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteTask(task.id)
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        {task.description && <CardDescription className="text-xs line-clamp-2">{task.description}</CardDescription>}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge className={`text-xs ${priorityColors[task.priority]}`}>{task.priority}</Badge>
            {task.dueDate && (
              <div
                className={`flex items-center text-xs ${
                  getDaysUntilDue(task.dueDate) < 0
                    ? "text-red-600"
                    : getDaysUntilDue(task.dueDate) <= 2
                      ? "text-orange-600"
                      : "text-muted-foreground"
                }`}
              >
                <CalendarIcon className="mr-1 h-3 w-3" />
                {format(task.dueDate, "MMM d")}
              </div>
            )}
          </div>

          {task.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {task.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {task.tags.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{task.tags.length - 2}
                </Badge>
              )}
            </div>
          )}

          <div className="flex items-center justify-between">
            {task.assignee && (
              <Avatar className="h-6 w-6">
                <AvatarImage src={task.assignee.avatarUrl || "/placeholder.svg"} alt={task.assignee.name} />
                <AvatarFallback className="text-xs">
                  {task.assignee.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            )}
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              {task.comments.length > 0 && (
                <div className="flex items-center">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  {task.comments.length}
                </div>
              )}
              {task.attachments.length > 0 && (
                <div className="flex items-center">
                  <Paperclip className="h-3 w-3 mr-1" />
                  {task.attachments.length}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Task Management</h2>
          <p className="text-muted-foreground">Organize and track your team's work</p>
        </div>
        <Dialog open={isNewTaskDialogOpen} onOpenChange={setIsNewTaskDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>Add a new task to your project. Fill in the details below.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={newTaskData.title}
                  onChange={(e) => setNewTaskData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter task title..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTaskData.description}
                  onChange={(e) => setNewTaskData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter task description..."
                  className="h-20"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select
                    value={newTaskData.priority}
                    onValueChange={(value) => setNewTaskData((prev) => ({ ...prev, priority: value }))}
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
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={newTaskData.status}
                    onValueChange={(value) => setNewTaskData((prev) => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="review">Review</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Assignee</Label>
                  <Select
                    value={newTaskData.assigneeId}
                    onValueChange={(value) => setNewTaskData((prev) => ({ ...prev, assigneeId: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select assignee..." />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newTaskData.dueDate ? format(newTaskData.dueDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={newTaskData.dueDate}
                        onSelect={(date) => setNewTaskData((prev) => ({ ...prev, dueDate: date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewTaskDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTask} disabled={loading}>
                Create Task
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="assigned">Assigned to Me</SelectItem>
              <SelectItem value="created">Created by Me</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
            {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          <Tabs value={view} onValueChange={(value: any) => setView(value)}>
            <TabsList>
              <TabsTrigger value="board">Board</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {showFilters && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Priority</Label>
                <div className="flex flex-wrap gap-2">
                  {["low", "medium", "high", "urgent"].map((priority) => (
                    <Button
                      key={priority}
                      variant={selectedPriorities.includes(priority) ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setSelectedPriorities((prev) =>
                          prev.includes(priority) ? prev.filter((p) => p !== priority) : [...prev, priority],
                        )
                      }}
                    >
                      {priority}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <Button
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
                      }}
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedPriorities([])
                  setSelectedTags([])
                }}
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {view === "board" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
            <div key={status} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{statusLabels[status as keyof typeof statusLabels]}</h3>
                <Badge variant="outline">{statusTasks.length}</Badge>
              </div>
              <div className="space-y-3">
                {statusTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
                {statusTasks.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p className="text-sm">No tasks</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredTasks.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No tasks found matching your criteria.</p>
                </div>
              ) : (
                filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-4 hover:bg-muted/50 cursor-pointer"
                    onClick={() => {
                      setSelectedTask(task)
                      setIsTaskDialogOpen(true)
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium truncate">{task.title}</h4>
                          <Badge className={`text-xs ${priorityColors[task.priority]}`}>{task.priority}</Badge>
                          <Badge className={`text-xs ${statusColors[task.status]}`}>{statusLabels[task.status]}</Badge>
                        </div>
                        {task.description && (
                          <p className="text-sm text-muted-foreground line-clamp-1">{task.description}</p>
                        )}
                        <div className="flex items-center gap-4 mt-2">
                          {task.assignee && (
                            <div className="flex items-center gap-1">
                              <Avatar className="h-5 w-5">
                                <AvatarImage
                                  src={task.assignee.avatarUrl || "/placeholder.svg"}
                                  alt={task.assignee.name}
                                />
                                <AvatarFallback className="text-xs">
                                  {task.assignee.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-muted-foreground">{task.assignee.name}</span>
                            </div>
                          )}
                          {task.dueDate && (
                            <div
                              className={`flex items-center text-xs ${
                                getDaysUntilDue(task.dueDate) < 0
                                  ? "text-red-600"
                                  : getDaysUntilDue(task.dueDate) <= 2
                                    ? "text-orange-600"
                                    : "text-muted-foreground"
                              }`}
                            >
                              <CalendarIcon className="mr-1 h-3 w-3" />
                              {format(task.dueDate, "MMM d, yyyy")}
                            </div>
                          )}
                          {task.tags.length > 0 && (
                            <div className="flex gap-1">
                              {task.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {task.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{task.tags.length - 3}
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        {task.comments.length > 0 && (
                          <div className="flex items-center">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            {task.comments.length}
                          </div>
                        )}
                        {task.attachments.length > 0 && (
                          <div className="flex items-center">
                            <Paperclip className="h-3 w-3 mr-1" />
                            {task.attachments.length}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Task Detail Dialog */}
      <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          {selectedTask && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <DialogTitle className="text-xl">{selectedTask.title}</DialogTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={`text-xs ${priorityColors[selectedTask.priority]}`}>
                        {selectedTask.priority}
                      </Badge>
                      <Select
                        value={selectedTask.status}
                        onValueChange={(value: Task["status"]) => handleUpdateTaskStatus(selectedTask.id, value)}
                      >
                        <SelectTrigger className="w-32 h-6">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todo">To Do</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="review">Review</SelectItem>
                          <SelectItem value="done">Done</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setIsTaskDialogOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                {selectedTask.description && (
                  <div>
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-sm text-muted-foreground">{selectedTask.description}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Created by:</span>
                        <div className="flex items-center gap-1">
                          <Avatar className="h-4 w-4">
                            <AvatarImage
                              src={selectedTask.creator.avatarUrl || "/placeholder.svg"}
                              alt={selectedTask.creator.name}
                            />
                            <AvatarFallback className="text-xs">
                              {selectedTask.creator.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span>{selectedTask.creator.name}</span>
                        </div>
                      </div>
                      {selectedTask.assignee && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Assigned to:</span>
                          <div className="flex items-center gap-1">
                            <Avatar className="h-4 w-4">
                              <AvatarImage
                                src={selectedTask.assignee.avatarUrl || "/placeholder.svg"}
                                alt={selectedTask.assignee.name}
                              />
                              <AvatarFallback className="text-xs">
                                {selectedTask.assignee.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span>{selectedTask.assignee.name}</span>
                          </div>
                        </div>
                      )}
                      {selectedTask.dueDate && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Due date:</span>
                          <span
                            className={
                              getDaysUntilDue(selectedTask.dueDate) < 0
                                ? "text-red-600"
                                : getDaysUntilDue(selectedTask.dueDate) <= 2
                                  ? "text-orange-600"
                                  : ""
                            }
                          >
                            {format(selectedTask.dueDate, "MMM d, yyyy")}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Created:</span>
                        <span>{format(selectedTask.createdAt, "MMM d, yyyy")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Updated:</span>
                        <span>{format(selectedTask.updatedAt, "MMM d, yyyy")}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedTask.tags.length > 0 ? (
                        selectedTask.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-sm text-muted-foreground">No tags</span>
                      )}
                    </div>

                    {selectedTask.linkedTo && (
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Linked to</h4>
                        <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                          <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{selectedTask.linkedTo.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {selectedTask.linkedTo.type}
                          </Badge>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {selectedTask.attachments.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Attachments</h4>
                    <div className="space-y-2">
                      {selectedTask.attachments.map((attachment) => (
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
                  <h4 className="font-medium mb-2">Comments ({selectedTask.comments.length})</h4>
                  <div className="space-y-4">
                    {selectedTask.comments.map((comment) => (
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
                          </div>
                          <p className="text-sm">{comment.content}</p>
                        </div>
                      </div>
                    ))}

                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={users.find((u) => u.id === userId)?.avatarUrl || "/placeholder.svg"}
                          alt="You"
                        />
                        <AvatarFallback className="text-xs">
                          {users
                            .find((u) => u.id === userId)
                            ?.name.split(" ")
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
    </div>
  )
}
