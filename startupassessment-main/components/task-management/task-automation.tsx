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
import {
  Zap,
  Plus,
  Settings,
  Clock,
  Users,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Calendar,
  Mail,
  MessageSquare,
} from "lucide-react"

interface AutomationRule {
  id: string
  name: string
  description: string
  trigger: AutomationTrigger
  conditions: AutomationCondition[]
  actions: AutomationAction[]
  isActive: boolean
  createdAt: Date
  lastTriggered?: Date
  triggerCount: number
}

interface AutomationTrigger {
  type: "task_created" | "task_updated" | "due_date_approaching" | "status_changed" | "assignee_changed" | "schedule"
  config: any
}

interface AutomationCondition {
  field: string
  operator: "equals" | "not_equals" | "contains" | "greater_than" | "less_than"
  value: any
}

interface AutomationAction {
  type: "assign_user" | "change_status" | "send_notification" | "create_subtask" | "update_priority" | "add_comment"
  config: any
}

export function TaskAutomation() {
  const { toast } = useToast()
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>([
    {
      id: "rule-1",
      name: "Auto-assign urgent tasks",
      description: "Automatically assign urgent tasks to available team leads",
      trigger: { type: "task_created", config: {} },
      conditions: [{ field: "priority", operator: "equals", value: "urgent" }],
      actions: [{ type: "assign_user", config: { userId: "team-lead" } }],
      isActive: true,
      createdAt: new Date("2024-01-15"),
      lastTriggered: new Date("2024-01-20"),
      triggerCount: 12,
    },
    {
      id: "rule-2",
      name: "Due date reminders",
      description: "Send notifications 24 hours before task due date",
      trigger: { type: "due_date_approaching", config: { hours: 24 } },
      conditions: [],
      actions: [{ type: "send_notification", config: { type: "email" } }],
      isActive: true,
      createdAt: new Date("2024-01-10"),
      lastTriggered: new Date("2024-01-19"),
      triggerCount: 45,
    },
  ])

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newRule, setNewRule] = useState({
    name: "",
    description: "",
    trigger: { type: "task_created", config: {} },
    conditions: [{ field: "", operator: "equals", value: "" }],
    actions: [{ type: "assign_user", config: {} }],
  })

  const triggerTypes = [
    { value: "task_created", label: "Task Created", icon: Plus },
    { value: "task_updated", label: "Task Updated", icon: Settings },
    { value: "due_date_approaching", label: "Due Date Approaching", icon: Clock },
    { value: "status_changed", label: "Status Changed", icon: CheckCircle },
    { value: "assignee_changed", label: "Assignee Changed", icon: Users },
    { value: "schedule", label: "Scheduled", icon: Calendar },
  ]

  const actionTypes = [
    { value: "assign_user", label: "Assign User", icon: Users },
    { value: "change_status", label: "Change Status", icon: CheckCircle },
    { value: "send_notification", label: "Send Notification", icon: Mail },
    { value: "create_subtask", label: "Create Subtask", icon: Plus },
    { value: "update_priority", label: "Update Priority", icon: AlertTriangle },
    { value: "add_comment", label: "Add Comment", icon: MessageSquare },
  ]

  const handleCreateRule = () => {
    const rule: AutomationRule = {
      id: `rule-${Date.now()}`,
      name: newRule.name,
      description: newRule.description,
      trigger: newRule.trigger,
      conditions: newRule.conditions.filter((c) => c.field && c.value),
      actions: newRule.actions,
      isActive: true,
      createdAt: new Date(),
      triggerCount: 0,
    }

    setAutomationRules([...automationRules, rule])
    setIsCreateDialogOpen(false)
    setNewRule({
      name: "",
      description: "",
      trigger: { type: "task_created", config: {} },
      conditions: [{ field: "", operator: "equals", value: "" }],
      actions: [{ type: "assign_user", config: {} }],
    })

    toast({
      title: "Automation rule created",
      description: "Your automation rule has been created and activated.",
    })
  }

  const toggleRule = (ruleId: string) => {
    setAutomationRules((rules) =>
      rules.map((rule) => (rule.id === ruleId ? { ...rule, isActive: !rule.isActive } : rule)),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Task Automation</h2>
          <p className="text-muted-foreground">Automate repetitive task management workflows</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Zap className="mr-2 h-4 w-4" />
              Create Rule
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Automation Rule</DialogTitle>
              <DialogDescription>Set up automated actions based on task events and conditions.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Rule Name</Label>
                <Input
                  value={newRule.name}
                  onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                  placeholder="Enter rule name..."
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={newRule.description}
                  onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
                  placeholder="Describe what this rule does..."
                />
              </div>
              <div className="space-y-2">
                <Label>Trigger</Label>
                <Select
                  value={newRule.trigger.type}
                  onValueChange={(value) =>
                    setNewRule({
                      ...newRule,
                      trigger: { type: value as any, config: {} },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {triggerTypes.map((trigger) => (
                      <SelectItem key={trigger.value} value={trigger.value}>
                        {trigger.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Actions</Label>
                <Select
                  value={newRule.actions[0]?.type}
                  onValueChange={(value) =>
                    setNewRule({
                      ...newRule,
                      actions: [{ type: value as any, config: {} }],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {actionTypes.map((action) => (
                      <SelectItem key={action.value} value={action.value}>
                        {action.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateRule}>Create Rule</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="rules">
        <TabsList>
          <TabsTrigger value="rules">Automation Rules</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="space-y-4">
          <div className="grid gap-4">
            {automationRules.map((rule) => (
              <Card key={rule.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {rule.name}
                        <Badge variant={rule.isActive ? "default" : "secondary"}>
                          {rule.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </CardTitle>
                      <CardDescription>{rule.description}</CardDescription>
                    </div>
                    <Switch checked={rule.isActive} onCheckedChange={() => toggleRule(rule.id)} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Trigger:</span>
                        <p className="font-medium">{rule.trigger.type.replace("_", " ")}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Actions:</span>
                        <p className="font-medium">{rule.actions.length} configured</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Triggered:</span>
                        <p className="font-medium">{rule.triggerCount} times</p>
                      </div>
                    </div>
                    {rule.lastTriggered && (
                      <div className="text-xs text-muted-foreground">
                        Last triggered: {rule.lastTriggered.toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Rules</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{automationRules.filter((r) => r.isActive).length}</div>
                <p className="text-xs text-muted-foreground">{automationRules.length} total rules</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Triggers</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {automationRules.reduce((sum, rule) => sum + rule.triggerCount, 0)}
                </div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Time Saved</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24h</div>
                <p className="text-xs text-muted-foreground">Estimated this month</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                name: "Urgent Task Assignment",
                description: "Auto-assign urgent tasks to team leads",
                trigger: "Task Created",
                actions: ["Assign User", "Send Notification"],
              },
              {
                name: "Due Date Reminders",
                description: "Send reminders before due dates",
                trigger: "Due Date Approaching",
                actions: ["Send Notification"],
              },
              {
                name: "Status Change Notifications",
                description: "Notify stakeholders of status changes",
                trigger: "Status Changed",
                actions: ["Send Notification", "Add Comment"],
              },
              {
                name: "Overdue Task Escalation",
                description: "Escalate overdue tasks to managers",
                trigger: "Schedule",
                actions: ["Change Priority", "Assign User", "Send Notification"],
              },
            ].map((template, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-base">{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">Trigger:</span>
                      <Badge variant="outline">{template.trigger}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">Actions:</span>
                      <div className="flex gap-1">
                        {template.actions.map((action, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {action}
                          </Badge>
                        ))}
                      </div>
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
