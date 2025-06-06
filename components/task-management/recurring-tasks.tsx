"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Repeat, Settings, Pause, MoreHorizontal, CheckCircle } from "lucide-react"
import { format } from "date-fns"

interface RecurringTask {
  id: string
  title: string
  description: string
  recurrencePattern: RecurrencePattern
  assigneeId?: string
  priority: "low" | "medium" | "high" | "urgent"
  estimatedHours: number
  isActive: boolean
  createdAt: Date
  nextDueDate: Date
  lastGenerated?: Date
  totalInstances: number
  completedInstances: number
  tags: string[]
}

interface RecurrencePattern {
  type: "daily" | "weekly" | "monthly" | "quarterly" | "yearly" | "custom"
  interval: number
  daysOfWeek?: number[]
  dayOfMonth?: number
  endDate?: Date
  maxOccurrences?: number
}

export function RecurringTasks() {
  const { toast } = useToast()
  const [recurringTasks, setRecurringTasks] = useState<RecurringTask[]>([
    {
      id: "rt-1",
      title: "Weekly Team Standup",
      description: "Conduct weekly team standup meeting and update project status",
      recurrencePattern: {
        type: "weekly",
        interval: 1,
        daysOfWeek: [1], // Monday
      },
      assigneeId: "u1",
      priority: "medium",
      estimatedHours: 1,
      isActive: true,
      createdAt: new Date("2024-01-01"),
      nextDueDate: new Date("2024-01-29"),
      lastGenerated: new Date("2024-01-22"),
      totalInstances: 4,
      completedInstances: 3,
      tags: ["meeting", "team"],
    },
    {
      id: "rt-2",
      title: "Monthly Portfolio Review",
      description: "Review portfolio performance and prepare monthly report",
      recurrencePattern: {
        type: "monthly",
        interval: 1,
        dayOfMonth: 1,
      },
      assigneeId: "u2",
      priority: "high",
      estimatedHours: 4,
      isActive: true,
      createdAt: new Date("2024-01-01"),
      nextDueDate: new Date("2024-02-01"),
      lastGenerated: new Date("2024-01-01"),
      totalInstances: 1,
      completedInstances: 1,
      tags: ["portfolio", "report"],
    },
  ])

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    recurrencePattern: {
      type: "weekly" as const,
      interval: 1,
      daysOfWeek: [1],
    },
    assigneeId: "",
    priority: "medium" as const,
    estimatedHours: 1,
    tags: [] as string[],
  })

  const recurrenceTypes = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "quarterly", label: "Quarterly" },
    { value: "yearly", label: "Yearly" },
    { value: "custom", label: "Custom" },
  ]

  const daysOfWeek = [
    { value: 0, label: "Sunday" },
    { value: 1, label: "Monday" },
    { value: 2, label: "Tuesday" },
    { value: 3, label: "Wednesday" },
    { value: 4, label: "Thursday" },
    { value: 5, label: "Friday" },
    { value: 6, label: "Saturday" },
  ]

  const users = [
    { id: "u1", name: "Sarah Johnson" },
    { id: "u2", name: "Michael Chen" },
    { id: "u3", name: "Alex Thompson" },
  ]

  const handleCreateTask = () => {
    const task: RecurringTask = {
      id: `rt-${Date.now()}`,
      title: newTask.title,
      description: newTask.description,
      recurrencePattern: newTask.recurrencePattern,
      assigneeId: newTask.assigneeId || undefined,
      priority: newTask.priority,
      estimatedHours: newTask.estimatedHours,
      isActive: true,
      createdAt: new Date(),
      nextDueDate: calculateNextDueDate(newTask.recurrencePattern),
      totalInstances: 0,
      completedInstances: 0,
      tags: newTask.tags,
    }

    setRecurringTasks([...recurringTasks, task])
    setIsCreateDialogOpen(false)
    setNewTask({
      title: "",
      description: "",
      recurrencePattern: {
        type: "weekly",
        interval: 1,
        daysOfWeek: [1],
      },
      assigneeId: "",
      priority: "medium",
      estimatedHours: 1,
      tags: [],
    })

    toast({
      title: "Recurring task created",
      description: "Your recurring task has been created and scheduled.",
    })
  }

  const calculateNextDueDate = (pattern: RecurrencePattern): Date => {
    const now = new Date()
    // Simplified calculation - in real implementation, this would be more complex
    switch (pattern.type) {
      case "daily":
        return new Date(now.getTime() + pattern.interval * 24 * 60 * 60 * 1000)
      case "weekly":
        return new Date(now.getTime() + pattern.interval * 7 * 24 * 60 * 60 * 1000)
      case "monthly":
        const nextMonth = new Date(now)
        nextMonth.setMonth(now.getMonth() + pattern.interval)
        return nextMonth
      default:
        return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
    }
  }

  const toggleTaskStatus = (taskId: string) => {
    setRecurringTasks((tasks) =>
      tasks.map((task) => (task.id === taskId ? { ...task, isActive: !task.isActive } : task)),
    )
  }

  const getRecurrenceDescription = (pattern: RecurrencePattern): string => {
    switch (pattern.type) {
      case "daily":
        return `Every ${pattern.interval} day${pattern.interval > 1 ? "s" : ""}`
      case "weekly":
        return `Every ${pattern.interval} week${pattern.interval > 1 ? "s" : ""}`
      case "monthly":
        return `Every ${pattern.interval} month${pattern.interval > 1 ? "s" : ""}`
      case "quarterly":
        return "Every quarter"
      case "yearly":
        return "Every year"
      default:
        return "Custom schedule"
    }
  }

  const getCompletionRate = (task: RecurringTask): number => {
    return task.totalInstances > 0 ? (task.completedInstances / task.totalInstances) * 100 : 0
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Recurring Tasks</h2>
          <p className="text-muted-foreground">Manage automated recurring task schedules</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Repeat className="mr-2 h-4 w-4" />
              Create Recurring Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Recurring Task</DialogTitle>
              <DialogDescription>Set up a task that will automatically repeat on a schedule.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Task Title</Label>
                <Input
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Enter task title..."
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Describe the task..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Recurrence Type</Label>
                  <Select
                    value={newTask.recurrencePattern.type}
                    onValueChange={(value) =>
                      setNewTask({
                        ...newTask,
                        recurrencePattern: { ...newTask.recurrencePattern, type: value as any },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {recurrenceTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Interval</Label>
                  <Input
                    type="number"
                    min="1"
                    value={newTask.recurrencePattern.interval}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        recurrencePattern: {
                          ...newTask.recurrencePattern,
                          interval: Number.parseInt(e.target.value) || 1,
                        },
                      })
                    }
                  />
                </div>
              </div>
              {newTask.recurrencePattern.type === "weekly" && (
                <div className="space-y-2">
                  <Label>Days of Week</Label>
                  <div className="flex flex-wrap gap-2">
                    {daysOfWeek.map((day) => (
                      <Button
                        key={day.value}
                        type="button"
                        variant={newTask.recurrencePattern.daysOfWeek?.includes(day.value) ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          const currentDays = newTask.recurrencePattern.daysOfWeek || []
                          const newDays = currentDays.includes(day.value)
                            ? currentDays.filter((d) => d !== day.value)
                            : [...currentDays, day.value]
                          setNewTask({
                            ...newTask,
                            recurrencePattern: { ...newTask.recurrencePattern, daysOfWeek: newDays },
                          })
                        }}
                      >
                        {day.label.slice(0, 3)}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Assignee</Label>
                  <Select
                    value={newTask.assigneeId}
                    onValueChange={(value) => setNewTask({ ...newTask, assigneeId: value })}
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
                  <Label>Priority</Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value) => setNewTask({ ...newTask, priority: value as any })}
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
              <div className="space-y-2">
                <Label>Estimated Hours</Label>
                <Input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={newTask.estimatedHours}
                  onChange={(e) => setNewTask({ ...newTask, estimatedHours: Number.parseFloat(e.target.value) || 1 })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTask}>Create Task</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active Tasks</TabsTrigger>
          <TabsTrigger value="paused">Paused Tasks</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4">
            {recurringTasks
              .filter((task) => task.isActive)
              .map((task) => (
                <Card key={task.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {task.title}
                          <Badge variant="outline">{getRecurrenceDescription(task.recurrencePattern)}</Badge>
                        </CardTitle>
                        <CardDescription>{task.description}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch checked={task.isActive} onCheckedChange={() => toggleTaskStatus(task.id)} />
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Next Due:</span>
                          <p className="font-medium">{format(task.nextDueDate, "MMM d, yyyy")}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Assignee:</span>
                          <p className="font-medium">
                            {task.assigneeId ? users.find((u) => u.id === task.assigneeId)?.name : "Unassigned"}
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Priority:</span>
                          <Badge
                            variant={
                              task.priority === "urgent"
                                ? "destructive"
                                : task.priority === "high"
                                  ? "default"
                                  : task.priority === "medium"
                                    ? "secondary"
                                    : "outline"
                            }
                            className="text-xs"
                          >
                            {task.priority}
                          </Badge>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Est. Hours:</span>
                          <p className="font-medium">{task.estimatedHours}h</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Completion Rate</span>
                          <span>
                            {task.completedInstances}/{task.totalInstances} ({getCompletionRate(task).toFixed(0)}%)
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${getCompletionRate(task)}%` }}
                          />
                        </div>
                      </div>

                      {task.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {task.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Settings className="mr-2 h-4 w-4" />
                          Edit Schedule
                        </Button>
                        <Button size="sm" variant="outline">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Generate Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="paused" className="space-y-4">
          <div className="grid gap-4">
            {recurringTasks
              .filter((task) => !task.isActive)
              .map((task) => (
                <Card key={task.id} className="opacity-60">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {task.title}
                          <Badge variant="secondary">Paused</Badge>
                        </CardTitle>
                        <CardDescription>{task.description}</CardDescription>
                      </div>
                      <Switch checked={task.isActive} onCheckedChange={() => toggleTaskStatus(task.id)} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      This recurring task is currently paused. Toggle the switch to reactivate.
                    </p>
                  </CardContent>
                </Card>
              ))}
            {recurringTasks.filter((task) => !task.isActive).length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <Pause className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No paused recurring tasks</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                name: "Weekly Team Meeting",
                description: "Regular team standup and progress review",
                recurrence: "Weekly on Mondays",
                estimatedHours: 1,
              },
              {
                name: "Monthly Report Generation",
                description: "Generate and distribute monthly performance reports",
                recurrence: "Monthly on 1st",
                estimatedHours: 3,
              },
              {
                name: "Quarterly Review",
                description: "Comprehensive quarterly business review",
                recurrence: "Every 3 months",
                estimatedHours: 8,
              },
              {
                name: "Daily Backup Check",
                description: "Verify system backups completed successfully",
                recurrence: "Daily",
                estimatedHours: 0.5,
              },
            ].map((template, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-base">{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Recurrence:</span>
                      <span>{template.recurrence}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Est. Hours:</span>
                      <span>{template.estimatedHours}h</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-4">
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
