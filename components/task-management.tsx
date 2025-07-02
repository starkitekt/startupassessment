"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Filter, MoreHorizontal, Calendar, CheckCircle, Clock, AlertCircle, XCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Sample data
const tasks = [
  {
    id: "task1",
    title: "Review TechNova's application",
    description: "Evaluate the technical feasibility and market potential",
    status: "In Progress",
    priority: "High",
    dueDate: "2025-07-15",
    assignee: {
      name: "Rahul Sharma",
      avatar: "/placeholder.svg?height=32&width=32&text=RS",
    },
    project: "Application Review",
    progress: 60,
  },
  {
    id: "task2",
    title: "Schedule mentor meeting for GreenEarth",
    description: "Connect with sustainability experts for guidance",
    status: "To Do",
    priority: "Medium",
    dueDate: "2025-07-20",
    assignee: {
      name: "Priya Patel",
      avatar: "/placeholder.svg?height=32&width=32&text=PP",
    },
    project: "Mentorship Program",
    progress: 0,
  },
  {
    id: "task3",
    title: "Prepare funding report for Q2",
    description: "Compile disbursement data and success metrics",
    status: "Completed",
    priority: "High",
    dueDate: "2025-07-01",
    assignee: {
      name: "Vikram Singh",
      avatar: "/placeholder.svg?height=32&width=32&text=VS",
    },
    project: "Financial Reporting",
    progress: 100,
  },
  {
    id: "task4",
    title: "Update compliance documentation",
    description: "Ensure all startups have submitted required legal documents",
    status: "In Progress",
    priority: "Medium",
    dueDate: "2025-07-18",
    assignee: {
      name: "Ananya Desai",
      avatar: "/placeholder.svg?height=32&width=32&text=AD",
    },
    project: "Compliance",
    progress: 40,
  },
  {
    id: "task5",
    title: "Organize pitch day event",
    description: "Coordinate venue, schedule, and participant logistics",
    status: "To Do",
    priority: "High",
    dueDate: "2025-07-30",
    assignee: {
      name: "Rahul Sharma",
      avatar: "/placeholder.svg?height=32&width=32&text=RS",
    },
    project: "Events",
    progress: 0,
  },
  {
    id: "task6",
    title: "Review HealthPlus milestone achievement",
    description: "Validate reported metrics and provide feedback",
    status: "Blocked",
    priority: "High",
    dueDate: "2025-07-10",
    assignee: {
      name: "Priya Patel",
      avatar: "/placeholder.svg?height=32&width=32&text=PP",
    },
    project: "Portfolio Management",
    progress: 25,
  },
]

export function TaskManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || task.status === statusFilter
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const todoTasks = filteredTasks.filter((task) => task.status === "To Do")
  const inProgressTasks = filteredTasks.filter((task) => task.status === "In Progress")
  const blockedTasks = filteredTasks.filter((task) => task.status === "Blocked")
  const completedTasks = filteredTasks.filter((task) => task.status === "Completed")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "To Do":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "In Progress":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "Blocked":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "To Do":
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
            To Do
          </Badge>
        )
      case "In Progress":
        return (
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
            In Progress
          </Badge>
        )
      case "Blocked":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
            Blocked
          </Badge>
        )
      case "Completed":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            Completed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge className="bg-red-500">High</Badge>
      case "Medium":
        return <Badge className="bg-yellow-500">Medium</Badge>
      case "Low":
        return <Badge className="bg-green-500">Low</Badge>
      default:
        return <Badge>{priority}</Badge>
    }
  }

  const TaskCard = ({ task }: { task: (typeof tasks)[0] }) => (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              {getPriorityBadge(task.priority)}
              {task.dueDate && (
                <Badge variant="outline" className="text-xs">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(task.dueDate).toLocaleDateString()}
                </Badge>
              )}
            </div>
            <CardTitle className="text-base font-medium leading-tight">{task.title}</CardTitle>
            <CardDescription className="text-sm line-clamp-2">{task.description}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit Task</DropdownMenuItem>
              <DropdownMenuItem>Change Status</DropdownMenuItem>
              <DropdownMenuItem>Reassign</DropdownMenuItem>
              <DropdownMenuItem>Delete Task</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
              <AvatarFallback className="text-xs">{task.assignee.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{task.assignee.name}</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {task.project}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{task.progress}%</span>
          </div>
          <Progress value={task.progress} className="h-2" />
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="text-xs text-muted-foreground">Updated {task.lastUpdate || "recently"}</div>
          {getStatusBadge(task.status)}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="To Do">To Do</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Blocked">Blocked</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Button className="jpmc-gradient">
          <Plus className="mr-2 h-4 w-4" /> New Task
        </Button>
      </div>

      {/* Task Views */}
      <Tabs defaultValue="board" className="space-y-6">
        <TabsList>
          <TabsTrigger value="board">Board View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        <TabsContent value="board">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* To Do Column */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold">To Do</h3>
                <Badge variant="outline" className="ml-auto">
                  {todoTasks.length}
                </Badge>
              </div>
              <div className="space-y-4">
                {todoTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
                {todoTasks.length === 0 && (
                  <Card className="bg-muted/50 border-dashed">
                    <CardContent className="flex items-center justify-center p-6">
                      <p className="text-sm text-muted-foreground">No tasks to do</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* In Progress Column */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-yellow-500" />
                <h3 className="font-semibold">In Progress</h3>
                <Badge variant="outline" className="ml-auto">
                  {inProgressTasks.length}
                </Badge>
              </div>
              <div className="space-y-4">
                {inProgressTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
                {inProgressTasks.length === 0 && (
                  <Card className="bg-muted/50 border-dashed">
                    <CardContent className="flex items-center justify-center p-6">
                      <p className="text-sm text-muted-foreground">No tasks in progress</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Blocked Column */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <h3 className="font-semibold">Blocked</h3>
                <Badge variant="outline" className="ml-auto">
                  {blockedTasks.length}
                </Badge>
              </div>
              <div className="space-y-4">
                {blockedTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
                {blockedTasks.length === 0 && (
                  <Card className="bg-muted/50 border-dashed">
                    <CardContent className="flex items-center justify-center p-6">
                      <p className="text-sm text-muted-foreground">No blocked tasks</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Completed Column */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <h3 className="font-semibold">Completed</h3>
                <Badge variant="outline" className="ml-auto">
                  {completedTasks.length}
                </Badge>
              </div>
              <div className="space-y-4">
                {completedTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
                {completedTasks.length === 0 && (
                  <Card className="bg-muted/50 border-dashed">
                    <CardContent className="flex items-center justify-center p-6">
                      <p className="text-sm text-muted-foreground">No completed tasks</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>All Tasks</CardTitle>
              <CardDescription>View and manage all tasks in a list format</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <Card key={task.id} className="bg-card border border-border">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(task.status)}
                              <h3 className="font-medium">{task.title}</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">{task.description}</p>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            {getStatusBadge(task.status)}
                            {getPriorityBadge(task.priority)}
                            <Badge variant="outline">{task.project}</Badge>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 gap-4">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
                              <AvatarFallback>{task.assignee.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{task.assignee.name}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit Task</DropdownMenuItem>
                                <DropdownMenuItem>Change Status</DropdownMenuItem>
                                <DropdownMenuItem>Reassign</DropdownMenuItem>
                                <DropdownMenuItem>Delete Task</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <XCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-2 text-lg font-medium">No tasks found</h3>
                    <p className="text-sm text-muted-foreground">Try adjusting your filters or search term</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
