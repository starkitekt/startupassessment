"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/hooks/use-toast"
import { AlertTriangle, CheckCircle, Clock, Plus, CalendarIcon, Target, TrendingUp, Settings } from "lucide-react"
import { format } from "date-fns"
import { STATUS_COLOR_MAP, STATUS_ICON_MAP, SEVERITY_COLOR_MAP } from "@/lib/mappings"

interface ComplianceIssue {
  id: string
  title: string
  description: string
  severity: "low" | "medium" | "high" | "critical"
  category: string
  regulation: string
  status: "open" | "in_progress" | "resolved" | "closed"
  assigneeId?: string
  dueDate: Date
  createdAt: Date
  updatedAt: Date
  remediationPlan?: RemediationPlan
  evidence: Evidence[]
  comments: Comment[]
}

interface RemediationPlan {
  id: string
  description: string
  steps: RemediationStep[]
  estimatedCost: number
  estimatedHours: number
  priority: number
  approvedBy?: string
  approvedAt?: Date
}

interface RemediationStep {
  id: string
  title: string
  description: string
  assigneeId?: string
  dueDate: Date
  status: "pending" | "in_progress" | "completed"
  dependencies: string[]
  evidence?: Evidence[]
}

interface Evidence {
  id: string
  name: string
  type: "document" | "screenshot" | "report" | "other"
  url: string
  uploadedBy: string
  uploadedAt: Date
}

interface Comment {
  id: string
  userId: string
  content: string
  createdAt: Date
}

export function ComplianceRemediation() {
  const { toast } = useToast()
  const [issues, setIssues] = useState<ComplianceIssue[]>([
    {
      id: "issue-1",
      title: "Inadequate Data Encryption",
      description: "Customer data is not encrypted at rest in the database",
      severity: "high",
      category: "Data Security",
      regulation: "GDPR Article 32",
      status: "in_progress",
      assigneeId: "u1",
      dueDate: new Date("2024-02-15"),
      createdAt: new Date("2024-01-10"),
      updatedAt: new Date("2024-01-20"),
      remediationPlan: {
        id: "plan-1",
        description: "Implement database encryption and update security policies",
        steps: [
          {
            id: "step-1",
            title: "Enable database encryption",
            description: "Configure TDE (Transparent Data Encryption) on production database",
            assigneeId: "u1",
            dueDate: new Date("2024-02-01"),
            status: "completed",
            dependencies: [],
          },
          {
            id: "step-2",
            title: "Update security policies",
            description: "Revise data handling policies to include encryption requirements",
            assigneeId: "u2",
            dueDate: new Date("2024-02-10"),
            status: "in_progress",
            dependencies: ["step-1"],
          },
        ],
        estimatedCost: 15000,
        estimatedHours: 40,
        priority: 1,
        approvedBy: "u3",
        approvedAt: new Date("2024-01-12"),
      },
      evidence: [],
      comments: [],
    },
    {
      id: "issue-2",
      title: "Missing Access Control Documentation",
      description: "User access controls are not properly documented",
      severity: "medium",
      category: "Access Management",
      regulation: "SOX Section 404",
      status: "open",
      assigneeId: "u2",
      dueDate: new Date("2024-02-28"),
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-15"),
      evidence: [],
      comments: [],
    },
  ])

  const [isCreatePlanDialogOpen, setIsCreatePlanDialogOpen] = useState(false)
  const [selectedIssue, setSelectedIssue] = useState<ComplianceIssue | null>(null)
  const [newPlan, setNewPlan] = useState({
    description: "",
    estimatedCost: 0,
    estimatedHours: 0,
    priority: 1,
    steps: [{ title: "", description: "", assigneeId: "", dueDate: new Date() }],
  })

  const users = [
    { id: "u1", name: "Sarah Johnson", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "u2", name: "Michael Chen", avatar: "/placeholder.svg?height=40&width=40" },
    { id: "u3", name: "Alex Thompson", avatar: "/placeholder.svg?height=40&width=40" },
  ]

  const handleCreatePlan = () => {
    if (!selectedIssue) return

    const plan: RemediationPlan = {
      id: `plan-${Date.now()}`,
      description: newPlan.description,
      steps: newPlan.steps.map((step, index) => ({
        id: `step-${Date.now()}-${index}`,
        title: step.title,
        description: step.description,
        assigneeId: step.assigneeId || undefined,
        dueDate: step.dueDate,
        status: "pending",
        dependencies: [],
      })),
      estimatedCost: newPlan.estimatedCost,
      estimatedHours: newPlan.estimatedHours,
      priority: newPlan.priority,
    }

    setIssues(
      issues.map((issue) =>
        issue.id === selectedIssue.id
          ? { ...issue, remediationPlan: plan, status: "in_progress", updatedAt: new Date() }
          : issue,
      ),
    )

    setIsCreatePlanDialogOpen(false)
    setSelectedIssue(null)
    setNewPlan({
      description: "",
      estimatedCost: 0,
      estimatedHours: 0,
      priority: 1,
      steps: [{ title: "", description: "", assigneeId: "", dueDate: new Date() }],
    })

    toast({
      title: "Remediation plan created",
      description: "The remediation plan has been created and assigned.",
    })
  }

  const updateIssueStatus = (issueId: string, status: ComplianceIssue["status"]) => {
    setIssues(issues.map((issue) => (issue.id === issueId ? { ...issue, status, updatedAt: new Date() } : issue)))
  }

  const calculatePlanProgress = (plan: RemediationPlan): number => {
    if (plan.steps.length === 0) return 0
    const completedSteps = plan.steps.filter((step) => step.status === "completed").length
    return (completedSteps / plan.steps.length) * 100
  }

  const getDaysUntilDue = (dueDate: Date): number => {
    const today = new Date()
    const diffTime = dueDate.getTime() - today.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Compliance Remediation</h2>
          <p className="text-muted-foreground">Track and manage compliance issue remediation</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Issue
        </Button>
      </div>

      <Tabs defaultValue="issues">
        <TabsList>
          <TabsTrigger value="issues">Issues</TabsTrigger>
          <TabsTrigger value="plans">Remediation Plans</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="issues" className="space-y-4">
          <div className="grid gap-4">
            {issues.map((issue) => (
              <Card key={issue.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {STATUS_ICON_MAP[issue.status] || <Clock className="h-4 w-4" />}
                        {issue.title}
                        <Badge className={SEVERITY_COLOR_MAP[issue.severity] || "bg-gray-100 text-gray-800 border-gray-200"}>{issue.severity}</Badge>
                      </CardTitle>
                      <CardDescription>{issue.description}</CardDescription>
                    </div>
                    <Badge className={STATUS_COLOR_MAP[issue.status] || "bg-gray-100 text-gray-800"}>{issue.status.replace("_", " ")}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Category:</span>
                        <p className="font-medium">{issue.category}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Regulation:</span>
                        <p className="font-medium">{issue.regulation}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Assignee:</span>
                        <p className="font-medium">
                          {issue.assigneeId ? users.find((u) => u.id === issue.assigneeId)?.name : "Unassigned"}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Due Date:</span>
                        <p
                          className={`font-medium ${
                            getDaysUntilDue(issue.dueDate) < 0
                              ? "text-red-600"
                              : getDaysUntilDue(issue.dueDate) <= 7
                                ? "text-orange-600"
                                : ""
                          }`}
                        >
                          {format(issue.dueDate, "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>

                    {issue.remediationPlan && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Remediation Progress</span>
                          <span>{calculatePlanProgress(issue.remediationPlan).toFixed(0)}%</span>
                        </div>
                        <Progress value={calculatePlanProgress(issue.remediationPlan)} className="h-2" />
                        <div className="text-xs text-muted-foreground">
                          {issue.remediationPlan.steps.filter((s) => s.status === "completed").length} of{" "}
                          {issue.remediationPlan.steps.length} steps completed
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      {!issue.remediationPlan ? (
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedIssue(issue)
                            setIsCreatePlanDialogOpen(true)
                          }}
                        >
                          <Target className="mr-2 h-4 w-4" />
                          Create Plan
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline">
                          <Settings className="mr-2 h-4 w-4" />
                          Manage Plan
                        </Button>
                      )}
                      <Select value={issue.status} onValueChange={(value) => updateIssueStatus(issue.id, value as any)}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="plans" className="space-y-4">
          <div className="grid gap-4">
            {issues
              .filter((issue) => issue.remediationPlan)
              .map((issue) => (
                <Card key={issue.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      {issue.title} - Remediation Plan
                    </CardTitle>
                    <CardDescription>{issue.remediationPlan?.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Estimated Cost:</span>
                          <p className="font-medium">${issue.remediationPlan?.estimatedCost.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Estimated Hours:</span>
                          <p className="font-medium">{issue.remediationPlan?.estimatedHours}h</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Priority:</span>
                          <p className="font-medium">P{issue.remediationPlan?.priority}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Overall Progress</span>
                          <span>{calculatePlanProgress(issue.remediationPlan!).toFixed(0)}%</span>
                        </div>
                        <Progress value={calculatePlanProgress(issue.remediationPlan!)} className="h-2" />
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium">Remediation Steps</h4>
                        {issue.remediationPlan?.steps.map((step, index) => (
                          <div key={step.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                                step.status === "completed"
                                  ? "bg-green-500 text-white"
                                  : step.status === "in_progress"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-600"
                              }`}
                            >
                              {index + 1}
                            </div>
                            <div className="flex-1 space-y-1">
                              <h5 className="font-medium">{step.title}</h5>
                              <p className="text-sm text-muted-foreground">{step.description}</p>
                              <div className="flex items-center gap-4 text-xs">
                                <span className="text-muted-foreground">Due: {format(step.dueDate, "MMM d")}</span>
                                {step.assigneeId && (
                                  <span className="text-muted-foreground">
                                    Assigned to: {users.find((u) => u.id === step.assigneeId)?.name}
                                  </span>
                                )}
                              </div>
                            </div>
                            <Badge
                              variant={
                                step.status === "completed"
                                  ? "default"
                                  : step.status === "in_progress"
                                    ? "secondary"
                                    : "outline"
                              }
                              className="text-xs"
                            >
                              {step.status.replace("_", " ")}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{issues.length}</div>
                <p className="text-xs text-muted-foreground">{issues.filter((i) => i.status === "open").length} open</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{issues.filter((i) => i.status === "in_progress").length}</div>
                <p className="text-xs text-muted-foreground">
                  {issues.filter((i) => i.remediationPlan).length} with plans
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resolved</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{issues.filter((i) => i.status === "resolved").length}</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Resolution Time</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12 days</div>
                <p className="text-xs text-muted-foreground">-2 days from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Issues by Severity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["critical", "high", "medium", "low"].map((severity) => {
                    const count = issues.filter((i) => i.severity === severity).length
                    const percentage = issues.length > 0 ? (count / issues.length) * 100 : 0
                    return (
                      <div key={severity} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize">{severity}</span>
                          <span>
                            {count} ({percentage.toFixed(0)}%)
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              severity === "critical"
                                ? "bg-red-500"
                                : severity === "high"
                                  ? "bg-orange-500"
                                  : severity === "medium"
                                    ? "bg-yellow-500"
                                    : "bg-blue-500"
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Remediation Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {issues
                    .filter((i) => i.remediationPlan)
                    .map((issue) => (
                      <div key={issue.id} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="truncate">{issue.title}</span>
                          <span>{calculatePlanProgress(issue.remediationPlan!).toFixed(0)}%</span>
                        </div>
                        <Progress value={calculatePlanProgress(issue.remediationPlan!)} className="h-1" />
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Remediation Plan Dialog */}
      <Dialog open={isCreatePlanDialogOpen} onOpenChange={setIsCreatePlanDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Remediation Plan</DialogTitle>
            <DialogDescription>
              Create a detailed plan to address the compliance issue: {selectedIssue?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Plan Description</Label>
              <Textarea
                value={newPlan.description}
                onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                placeholder="Describe the overall remediation approach..."
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Estimated Cost ($)</Label>
                <Input
                  type="number"
                  value={newPlan.estimatedCost}
                  onChange={(e) => setNewPlan({ ...newPlan, estimatedCost: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>Estimated Hours</Label>
                <Input
                  type="number"
                  value={newPlan.estimatedHours}
                  onChange={(e) => setNewPlan({ ...newPlan, estimatedHours: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select
                  value={newPlan.priority.toString()}
                  onValueChange={(value) => setNewPlan({ ...newPlan, priority: Number(value) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">P1 - Critical</SelectItem>
                    <SelectItem value="2">P2 - High</SelectItem>
                    <SelectItem value="3">P3 - Medium</SelectItem>
                    <SelectItem value="4">P4 - Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-3">
              <Label>Remediation Steps</Label>
              {newPlan.steps.map((step, index) => (
                <div key={index} className="p-3 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Step {index + 1}</h4>
                    {newPlan.steps.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setNewPlan({
                            ...newPlan,
                            steps: newPlan.steps.filter((_, i) => i !== index),
                          })
                        }
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        value={step.title}
                        onChange={(e) => {
                          const newSteps = [...newPlan.steps]
                          newSteps[index].title = e.target.value
                          setNewPlan({ ...newPlan, steps: newSteps })
                        }}
                        placeholder="Step title..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Assignee</Label>
                      <Select
                        value={step.assigneeId}
                        onValueChange={(value) => {
                          const newSteps = [...newPlan.steps]
                          newSteps[index].assigneeId = value
                          setNewPlan({ ...newPlan, steps: newSteps })
                        }}
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
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={step.description}
                      onChange={(e) => {
                        const newSteps = [...newPlan.steps]
                        newSteps[index].description = e.target.value
                        setNewPlan({ ...newPlan, steps: newSteps })
                      }}
                      placeholder="Describe what needs to be done..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Due Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {format(step.dueDate, "PPP")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={step.dueDate}
                          onSelect={(date) => {
                            if (date) {
                              const newSteps = [...newPlan.steps]
                              newSteps[index].dueDate = date
                              setNewPlan({ ...newPlan, steps: newSteps })
                            }
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setNewPlan({
                    ...newPlan,
                    steps: [...newPlan.steps, { title: "", description: "", assigneeId: "", dueDate: new Date() }],
                  })
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Step
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreatePlanDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreatePlan}>Create Plan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
