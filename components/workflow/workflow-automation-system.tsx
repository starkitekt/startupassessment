"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import {
  Workflow,
  Play,
  Pause,
  Plus,
  Edit,
  Trash2,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Zap,
  Mail,
  Bell,
  FileText,
  Users,
} from "lucide-react"

interface WorkflowTrigger {
  type: "event" | "schedule" | "condition"
  event?: string
  schedule?: string
  condition?: string
}

interface WorkflowAction {
  id: string
  type: "email" | "notification" | "task" | "approval" | "webhook"
  config: Record<string, any>
  delay?: number
}

interface WorkflowRule {
  id: string
  name: string
  description: string
  trigger: WorkflowTrigger
  actions: WorkflowAction[]
  enabled: boolean
  category: "funding" | "mentorship" | "procurement" | "calendar" | "general"
  lastRun?: Date
  runCount: number
  status: "active" | "paused" | "error"
}

const MOCK_WORKFLOWS: WorkflowRule[] = [
  {
    id: "1",
    name: "New Funding Application Alert",
    description: "Send notifications when a new funding application is submitted",
    trigger: {
      type: "event",
      event: "funding_application_submitted",
    },
    actions: [
      {
        id: "a1",
        type: "email",
        config: {
          to: "funding-team@incubator.com",
          subject: "New Funding Application",
          template: "funding_application_notification",
        },
      },
      {
        id: "a2",
        type: "notification",
        config: {
          message: "New funding application requires review",
          priority: "high",
        },
        delay: 5,
      },
    ],
    enabled: true,
    category: "funding",
    lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000),
    runCount: 23,
    status: "active",
  },
  {
    id: "2",
    name: "Mentorship Session Reminder",
    description: "Send reminders 24 hours before mentorship sessions",
    trigger: {
      type: "schedule",
      schedule: "24h_before_event",
    },
    actions: [
      {
        id: "a3",
        type: "email",
        config: {
          to: "{{mentor_email}}, {{startup_email}}",
          subject: "Mentorship Session Reminder",
          template: "mentorship_reminder",
        },
      },
    ],
    enabled: true,
    category: "mentorship",
    lastRun: new Date(Date.now() - 6 * 60 * 60 * 1000),
    runCount: 156,
    status: "active",
  },
  {
    id: "3",
    name: "Procurement Approval Workflow",
    description: "Route procurement requests for approval based on amount",
    trigger: {
      type: "event",
      event: "procurement_request_submitted",
    },
    actions: [
      {
        id: "a4",
        type: "approval",
        config: {
          approver: "{{manager_email}}",
          condition: "amount > 1000",
          timeout: "48h",
        },
      },
      {
        id: "a5",
        type: "task",
        config: {
          assignee: "procurement-team",
          title: "Review procurement request",
          priority: "medium",
        },
        delay: 10,
      },
    ],
    enabled: true,
    category: "procurement",
    lastRun: new Date(Date.now() - 30 * 60 * 1000),
    runCount: 45,
    status: "active",
  },
]

export function WorkflowAutomationSystem() {
  const [workflows, setWorkflows] = useState<WorkflowRule[]>(MOCK_WORKFLOWS)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowRule | null>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const { toast } = useToast()

  const getStatusIcon = (status: WorkflowRule["status"]) => {
    switch (status) {
      case "active":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "paused":
        return <Pause className="h-4 w-4 text-yellow-500" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getCategoryIcon = (category: WorkflowRule["category"]) => {
    switch (category) {
      case "funding":
        return <Zap className="h-4 w-4" />
      case "mentorship":
        return <Users className="h-4 w-4" />
      case "procurement":
        return <FileText className="h-4 w-4" />
      case "calendar":
        return <Clock className="h-4 w-4" />
      default:
        return <Workflow className="h-4 w-4" />
    }
  }

  const getActionIcon = (type: WorkflowAction["type"]) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />
      case "notification":
        return <Bell className="h-4 w-4" />
      case "task":
        return <CheckCircle2 className="h-4 w-4" />
      case "approval":
        return <Users className="h-4 w-4" />
      default:
        return <Zap className="h-4 w-4" />
    }
  }

  const toggleWorkflow = (id: string) => {
    setWorkflows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, enabled: !w.enabled, status: !w.enabled ? "active" : "paused" } : w)),
    )

    const workflow = workflows.find((w) => w.id === id)
    toast({
      title: workflow?.enabled ? "Workflow Paused" : "Workflow Activated",
      description: `${workflow?.name} has been ${workflow?.enabled ? "paused" : "activated"}`,
    })
  }

  const deleteWorkflow = (id: string) => {
    setWorkflows((prev) => prev.filter((w) => w.id !== id))
    toast({
      title: "Workflow Deleted",
      description: "The workflow has been permanently deleted",
    })
  }

  const runWorkflow = (id: string) => {
    setWorkflows((prev) => prev.map((w) => (w.id === id ? { ...w, lastRun: new Date(), runCount: w.runCount + 1 } : w)))

    const workflow = workflows.find((w) => w.id === id)
    toast({
      title: "Workflow Executed",
      description: `${workflow?.name} has been executed successfully`,
    })
  }

  const formatLastRun = (date?: Date) => {
    if (!date) return "Never"
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))

    if (hours < 1) return "Just now"
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Workflow Automation</h1>
          <p className="text-muted-foreground">Automate repetitive tasks and processes</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Workflow
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Workflow</DialogTitle>
              <DialogDescription>Set up automated actions based on triggers and conditions</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Workflow Name</Label>
                  <Input placeholder="Enter workflow name" />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="funding">Funding</SelectItem>
                      <SelectItem value="mentorship">Mentorship</SelectItem>
                      <SelectItem value="procurement">Procurement</SelectItem>
                      <SelectItem value="calendar">Calendar</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Describe what this workflow does" />
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Trigger</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Trigger Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select trigger" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="event">Event</SelectItem>
                        <SelectItem value="schedule">Schedule</SelectItem>
                        <SelectItem value="condition">Condition</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Event/Schedule</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select event" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="funding_application_submitted">Funding Application Submitted</SelectItem>
                        <SelectItem value="mentorship_session_scheduled">Mentorship Session Scheduled</SelectItem>
                        <SelectItem value="procurement_request_created">Procurement Request Created</SelectItem>
                        <SelectItem value="deadline_approaching">Deadline Approaching</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Actions</h3>
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Send Email Notification</span>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Send email to funding team when new application is submitted
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Action
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  toast({
                    title: "Workflow Created",
                    description: "Your new workflow has been created successfully",
                  })
                  setIsCreateOpen(false)
                }}
              >
                Create Workflow
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Workflows</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="history">Execution History</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4">
            {workflows.map((workflow) => (
              <Card key={workflow.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="flex items-center gap-2 mt-1">
                        {getCategoryIcon(workflow.category)}
                        {getStatusIcon(workflow.status)}
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{workflow.name}</h3>
                          <Badge variant={workflow.enabled ? "default" : "secondary"}>
                            {workflow.enabled ? "Active" : "Paused"}
                          </Badge>
                          <Badge variant="outline" className="capitalize">
                            {workflow.category}
                          </Badge>
                        </div>

                        <p className="text-sm text-muted-foreground">{workflow.description}</p>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Last run: {formatLastRun(workflow.lastRun)}</span>
                          <span>•</span>
                          <span>Executed {workflow.runCount} times</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Actions:</span>
                          {workflow.actions.map((action, index) => (
                            <div key={action.id} className="flex items-center gap-1">
                              {index > 0 && <ArrowRight className="h-3 w-3 text-muted-foreground" />}
                              <div className="flex items-center gap-1 px-2 py-1 bg-muted rounded text-xs">
                                {getActionIcon(action.type)}
                                <span className="capitalize">{action.type}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Switch checked={workflow.enabled} onCheckedChange={() => toggleWorkflow(workflow.id)} />

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => runWorkflow(workflow.id)}
                        disabled={!workflow.enabled}
                      >
                        <Play className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedWorkflow(workflow)
                          setIsEditOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>

                      <Button variant="outline" size="sm" onClick={() => deleteWorkflow(workflow.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                name: "Application Review Process",
                description: "Automate the review process for new startup applications",
                category: "funding",
                actions: ["email", "task", "approval"],
              },
              {
                name: "Mentor Onboarding",
                description: "Welcome new mentors and set up their profiles",
                category: "mentorship",
                actions: ["email", "task", "notification"],
              },
              {
                name: "Expense Approval",
                description: "Route expense requests for approval based on amount",
                category: "procurement",
                actions: ["approval", "email", "task"],
              },
              {
                name: "Event Reminders",
                description: "Send reminders for upcoming events and deadlines",
                category: "calendar",
                actions: ["email", "notification"],
              },
            ].map((template, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(template.category as any)}
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                  <div className="flex items-center gap-2 mb-4">
                    {template.actions.map((action, actionIndex) => (
                      <div key={actionIndex} className="flex items-center gap-1">
                        {actionIndex > 0 && <ArrowRight className="h-3 w-3 text-muted-foreground" />}
                        <div className="flex items-center gap-1 px-2 py-1 bg-muted rounded text-xs">
                          {getActionIcon(action as any)}
                          <span className="capitalize">{action}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full" size="sm">
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Executions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    workflow: "New Funding Application Alert",
                    timestamp: new Date(Date.now() - 30 * 60 * 1000),
                    status: "success",
                    duration: "1.2s",
                  },
                  {
                    workflow: "Mentorship Session Reminder",
                    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
                    status: "success",
                    duration: "0.8s",
                  },
                  {
                    workflow: "Procurement Approval Workflow",
                    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
                    status: "error",
                    duration: "2.1s",
                  },
                ].map((execution, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          execution.status === "success" ? "bg-green-500" : "bg-red-500"
                        }`}
                      />
                      <div>
                        <p className="font-medium">{execution.workflow}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatLastRun(execution.timestamp)} • {execution.duration}
                        </p>
                      </div>
                    </div>
                    <Badge variant={execution.status === "success" ? "default" : "destructive"}>
                      {execution.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Workflow Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Workflow</DialogTitle>
            <DialogDescription>Modify the workflow configuration</DialogDescription>
          </DialogHeader>
          {selectedWorkflow && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Workflow Name</Label>
                  <Input defaultValue={selectedWorkflow.name} />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select defaultValue={selectedWorkflow.category}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="funding">Funding</SelectItem>
                      <SelectItem value="mentorship">Mentorship</SelectItem>
                      <SelectItem value="procurement">Procurement</SelectItem>
                      <SelectItem value="calendar">Calendar</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea defaultValue={selectedWorkflow.description} />
              </div>

              <div className="flex items-center justify-between">
                <Label>Enabled</Label>
                <Switch defaultChecked={selectedWorkflow.enabled} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                toast({
                  title: "Workflow Updated",
                  description: "Your workflow has been updated successfully",
                })
                setIsEditOpen(false)
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
