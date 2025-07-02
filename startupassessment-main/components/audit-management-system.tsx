"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
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
import { Search, Filter, Plus, CalendarIcon, AlertTriangle, CheckCircle, TrendingUp, Download, Eye } from "lucide-react"
import { STATUS_COLOR_MAP, PRIORITY_COLOR_MAP, SEVERITY_COLOR_MAP } from "@/lib/mappings"

interface AuditEngagement {
  id: string
  name: string
  type: "Financial" | "Operational" | "Compliance" | "IT" | "Risk"
  status: "Planning" | "In Progress" | "Review" | "Completed" | "On Hold"
  priority: "Low" | "Medium" | "High" | "Critical"
  startDate: Date
  endDate: Date
  plannedHours: number
  actualHours: number
  progress: number
  auditors: AuditUser[]
  auditees: AuditUser[]
  scope: string
  objectives: string[]
  findings: AuditFinding[]
  evidence: AuditEvidence[]
  createdAt: Date
  updatedAt: Date
}

interface AuditUser {
  id: string
  name: string
  role: string
  email: string
  avatarUrl?: string
}

interface AuditFinding {
  id: string
  title: string
  description: string
  severity: "Low" | "Medium" | "High" | "Critical"
  category: string
  status: "Open" | "In Progress" | "Resolved" | "Closed"
  assignee?: AuditUser
  dueDate?: Date
  evidence: string[]
  recommendations: string[]
  createdAt: Date
  updatedAt: Date
}

interface AuditEvidence {
  id: string
  name: string
  type: "Document" | "Interview" | "Observation" | "Test"
  description: string
  fileUrl?: string
  collectedBy: AuditUser
  collectedAt: Date
  verified: boolean
  tags: string[]
}

export function AuditManagementSystem() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("engagements")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEngagement, setSelectedEngagement] = useState<AuditEngagement | null>(null)
  const [isEngagementDialogOpen, setIsEngagementDialogOpen] = useState(false)
  const [isNewEngagementDialogOpen, setIsNewEngagementDialogOpen] = useState(false)
  const [isFindingDialogOpen, setIsFindingDialogOpen] = useState(false)
  const [selectedFinding, setSelectedFinding] = useState<AuditFinding | null>(null)
  const [loading, setLoading] = useState(false)

  // Mock data
  const [engagements, setEngagements] = useState<AuditEngagement[]>([
    {
      id: "AUD-001",
      name: "Q4 Financial Audit - TechStart Solutions",
      type: "Financial",
      status: "In Progress",
      priority: "High",
      startDate: new Date(2024, 11, 1),
      endDate: new Date(2024, 11, 31),
      plannedHours: 120,
      actualHours: 85,
      progress: 70,
      auditors: [
        {
          id: "u1",
          name: "Sarah Johnson",
          role: "Lead Auditor",
          email: "sarah@example.com",
          avatarUrl: "/placeholder.svg?height=40&width=40",
        },
        {
          id: "u2",
          name: "Michael Chen",
          role: "Senior Auditor",
          email: "michael@example.com",
          avatarUrl: "/placeholder.svg?height=40&width=40",
        },
      ],
      auditees: [
        {
          id: "u3",
          name: "Alex Thompson",
          role: "CFO",
          email: "alex@techstart.com",
          avatarUrl: "/placeholder.svg?height=40&width=40",
        },
      ],
      scope: "Review of financial statements, internal controls, and compliance with accounting standards",
      objectives: [
        "Verify accuracy of financial statements",
        "Assess internal control effectiveness",
        "Ensure regulatory compliance",
        "Identify areas for improvement",
      ],
      findings: [
        {
          id: "F001",
          title: "Inadequate segregation of duties in accounts payable",
          description:
            "The same individual can create vendors, enter invoices, and approve payments without oversight.",
          severity: "High",
          category: "Internal Controls",
          status: "Open",
          assignee: {
            id: "u3",
            name: "Alex Thompson",
            role: "CFO",
            email: "alex@techstart.com",
          },
          dueDate: new Date(2024, 11, 15),
          evidence: ["E001", "E002"],
          recommendations: [
            "Implement three-way matching process",
            "Separate vendor creation from payment approval",
            "Establish monthly review procedures",
          ],
          createdAt: new Date(2024, 10, 15),
          updatedAt: new Date(2024, 10, 20),
        },
      ],
      evidence: [
        {
          id: "E001",
          name: "Accounts Payable Process Documentation",
          type: "Document",
          description: "Current process flow and control documentation",
          fileUrl: "/documents/ap-process.pdf",
          collectedBy: {
            id: "u2",
            name: "Michael Chen",
            role: "Senior Auditor",
            email: "michael@example.com",
          },
          collectedAt: new Date(2024, 10, 10),
          verified: true,
          tags: ["process", "controls"],
        },
      ],
      createdAt: new Date(2024, 9, 15),
      updatedAt: new Date(2024, 10, 20),
    },
  ])

  const [newEngagementData, setNewEngagementData] = useState({
    name: "",
    type: "Financial",
    priority: "Medium",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    plannedHours: "",
    scope: "",
    objectives: [""],
    auditorIds: [] as string[],
    auditeeIds: [] as string[],
  })

  const [newFindingData, setNewFindingData] = useState({
    title: "",
    description: "",
    severity: "Medium",
    category: "",
    assigneeId: "",
    dueDate: undefined as Date | undefined,
    recommendations: [""],
  })

  const mockUsers: AuditUser[] = [
    {
      id: "u1",
      name: "Sarah Johnson",
      role: "Lead Auditor",
      email: "sarah@example.com",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "u2",
      name: "Michael Chen",
      role: "Senior Auditor",
      email: "michael@example.com",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "u3",
      name: "Alex Thompson",
      role: "CFO",
      email: "alex@techstart.com",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
  ]

  const filteredEngagements = engagements.filter(
    (engagement) =>
      engagement.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      engagement.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreateEngagement = async () => {
    if (!newEngagementData.name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter an engagement name.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const newEngagement: AuditEngagement = {
        id: `AUD-${String(engagements.length + 1).padStart(3, "0")}`,
        name: newEngagementData.name,
        type: newEngagementData.type as AuditEngagement["type"],
        status: "Planning",
        priority: newEngagementData.priority as AuditEngagement["priority"],
        startDate: newEngagementData.startDate!,
        endDate: newEngagementData.endDate!,
        plannedHours: Number.parseInt(newEngagementData.plannedHours),
        actualHours: 0,
        progress: 0,
        auditors: newEngagementData.auditorIds.map((id) => mockUsers.find((u) => u.id === id)!).filter(Boolean),
        auditees: newEngagementData.auditeeIds.map((id) => mockUsers.find((u) => u.id === id)!).filter(Boolean),
        scope: newEngagementData.scope,
        objectives: newEngagementData.objectives.filter((obj) => obj.trim()),
        findings: [],
        evidence: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      setEngagements((prev) => [...prev, newEngagement])
      setIsNewEngagementDialogOpen(false)

      // Reset form
      setNewEngagementData({
        name: "",
        type: "Financial",
        priority: "Medium",
        startDate: undefined,
        endDate: undefined,
        plannedHours: "",
        scope: "",
        objectives: [""],
        auditorIds: [],
        auditeeIds: [],
      })

      toast({
        title: "Engagement created",
        description: "Audit engagement has been created successfully.",
      })
    } catch (error) {
      toast({
        title: "Error creating engagement",
        description: "There was an error creating the engagement. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateFinding = async () => {
    if (!selectedEngagement || !newFindingData.title.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter a finding title.",
        variant: "destructive",
      })
      return
    }

    const newFinding: AuditFinding = {
      id: `F${String(selectedEngagement.findings.length + 1).padStart(3, "0")}`,
      title: newFindingData.title,
      description: newFindingData.description,
      severity: newFindingData.severity as AuditFinding["severity"],
      category: newFindingData.category,
      status: "Open",
      assignee: newFindingData.assigneeId ? mockUsers.find((u) => u.id === newFindingData.assigneeId) : undefined,
      dueDate: newFindingData.dueDate,
      evidence: [],
      recommendations: newFindingData.recommendations.filter((rec) => rec.trim()),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setEngagements((prev) =>
      prev.map((eng) =>
        eng.id === selectedEngagement.id
          ? { ...eng, findings: [...eng.findings, newFinding], updatedAt: new Date() }
          : eng,
      ),
    )

    setSelectedEngagement((prev) => (prev ? { ...prev, findings: [...prev.findings, newFinding] } : null))

    setIsFindingDialogOpen(false)
    setNewFindingData({
      title: "",
      description: "",
      severity: "Medium",
      category: "",
      assigneeId: "",
      dueDate: undefined,
      recommendations: [""],
    })

    toast({
      title: "Finding created",
      description: "Audit finding has been created successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Audit & Compliance</h2>
          <p className="text-muted-foreground">Manage audit engagements, findings, and compliance tracking</p>
        </div>
        <Dialog open={isNewEngagementDialogOpen} onOpenChange={setIsNewEngagementDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Engagement
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Audit Engagement</DialogTitle>
              <DialogDescription>
                Set up a new audit engagement with scope, timeline, and team assignments.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="engagement-name">Engagement Name *</Label>
                <Input
                  id="engagement-name"
                  value={newEngagementData.name}
                  onChange={(e) => setNewEngagementData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter engagement name..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select
                    value={newEngagementData.type}
                    onValueChange={(value) => setNewEngagementData((prev) => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Financial">Financial</SelectItem>
                      <SelectItem value="Operational">Operational</SelectItem>
                      <SelectItem value="Compliance">Compliance</SelectItem>
                      <SelectItem value="IT">IT</SelectItem>
                      <SelectItem value="Risk">Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select
                    value={newEngagementData.priority}
                    onValueChange={(value) => setNewEngagementData((prev) => ({ ...prev, priority: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newEngagementData.startDate ? format(newEngagementData.startDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={newEngagementData.startDate}
                        onSelect={(date) => setNewEngagementData((prev) => ({ ...prev, startDate: date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newEngagementData.endDate ? format(newEngagementData.endDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={newEngagementData.endDate}
                        onSelect={(date) => setNewEngagementData((prev) => ({ ...prev, endDate: date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="planned-hours">Planned Hours</Label>
                <Input
                  id="planned-hours"
                  type="number"
                  value={newEngagementData.plannedHours}
                  onChange={(e) => setNewEngagementData((prev) => ({ ...prev, plannedHours: e.target.value }))}
                  placeholder="Enter planned hours..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="scope">Scope</Label>
                <Textarea
                  id="scope"
                  value={newEngagementData.scope}
                  onChange={(e) => setNewEngagementData((prev) => ({ ...prev, scope: e.target.value }))}
                  placeholder="Describe the audit scope..."
                  className="h-20"
                />
              </div>
              <div className="space-y-2">
                <Label>Objectives</Label>
                {newEngagementData.objectives.map((objective, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={objective}
                      onChange={(e) => {
                        const newObjectives = [...newEngagementData.objectives]
                        newObjectives[index] = e.target.value
                        setNewEngagementData((prev) => ({ ...prev, objectives: newObjectives }))
                      }}
                      placeholder={`Objective ${index + 1}...`}
                    />
                    {index === newEngagementData.objectives.length - 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          setNewEngagementData((prev) => ({ ...prev, objectives: [...prev.objectives, ""] }))
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewEngagementDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateEngagement} disabled={loading}>
                Create Engagement
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search engagements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="engagements">Engagements</TabsTrigger>
          <TabsTrigger value="findings">Findings</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="engagements" className="space-y-4">
          <div className="grid gap-4">
            {filteredEngagements.map((engagement) => (
              <Card key={engagement.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{engagement.name}</CardTitle>
                      <CardDescription>
                        {engagement.type} • {format(engagement.startDate, "MMM d")} -{" "}
                        {format(engagement.endDate, "MMM d, yyyy")}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={PRIORITY_COLOR_MAP[engagement.priority] || "bg-gray-100 text-gray-800"}>{engagement.priority}</Badge>
                      <Badge className={STATUS_COLOR_MAP[engagement.status] || "bg-gray-100 text-gray-800"}>{engagement.status}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedEngagement(engagement)
                          setIsEngagementDialogOpen(true)
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{engagement.progress}%</span>
                    </div>
                    <Progress value={engagement.progress} className="h-2" />

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Hours</div>
                        <div className="font-medium">
                          {engagement.actualHours} / {engagement.plannedHours}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Findings</div>
                        <div className="font-medium">{engagement.findings.length}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Team</div>
                        <div className="flex -space-x-1">
                          {engagement.auditors.slice(0, 3).map((auditor) => (
                            <Avatar key={auditor.id} className="h-6 w-6 border-2 border-background">
                              <AvatarImage src={auditor.avatarUrl || "/placeholder.svg"} alt={auditor.name} />
                              <AvatarFallback className="text-xs">
                                {auditor.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {engagement.auditors.length > 3 && (
                            <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs">
                              +{engagement.auditors.length - 3}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="findings" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Audit Findings</h3>
            <Dialog open={isFindingDialogOpen} onOpenChange={setIsFindingDialogOpen}>
              <DialogTrigger asChild>
                <Button disabled={!selectedEngagement}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Finding
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Finding</DialogTitle>
                  <DialogDescription>Document a new audit finding with recommendations.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="finding-title">Title *</Label>
                    <Input
                      id="finding-title"
                      value={newFindingData.title}
                      onChange={(e) => setNewFindingData((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter finding title..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="finding-description">Description</Label>
                    <Textarea
                      id="finding-description"
                      value={newFindingData.description}
                      onChange={(e) => setNewFindingData((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe the finding..."
                      className="h-20"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Severity</Label>
                      <Select
                        value={newFindingData.severity}
                        onValueChange={(value) => setNewFindingData((prev) => ({ ...prev, severity: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="finding-category">Category</Label>
                      <Input
                        id="finding-category"
                        value={newFindingData.category}
                        onChange={(e) => setNewFindingData((prev) => ({ ...prev, category: e.target.value }))}
                        placeholder="e.g., Internal Controls"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Recommendations</Label>
                    {newFindingData.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={recommendation}
                          onChange={(e) => {
                            const newRecommendations = [...newFindingData.recommendations]
                            newRecommendations[index] = e.target.value
                            setNewFindingData((prev) => ({ ...prev, recommendations: newRecommendations }))
                          }}
                          placeholder={`Recommendation ${index + 1}...`}
                        />
                        {index === newFindingData.recommendations.length - 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              setNewFindingData((prev) => ({ ...prev, recommendations: [...prev.recommendations, ""] }))
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsFindingDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateFinding}>Create Finding</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {engagements.flatMap((engagement) =>
              engagement.findings.map((finding) => (
                <Card key={finding.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-base">{finding.title}</CardTitle>
                        <CardDescription>{finding.description}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={SEVERITY_COLOR_MAP[finding.severity] || "bg-gray-100 text-gray-800"}>{finding.severity}</Badge>
                        <Badge variant="outline">{finding.status}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Category:</span>
                        <span>{finding.category}</span>
                      </div>
                      {finding.assignee && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Assigned to:</span>
                          <div className="flex items-center gap-1">
                            <Avatar className="h-4 w-4">
                              <AvatarImage
                                src={finding.assignee.avatarUrl || "/placeholder.svg"}
                                alt={finding.assignee.name}
                              />
                              <AvatarFallback className="text-xs">
                                {finding.assignee.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span>{finding.assignee.name}</span>
                          </div>
                        </div>
                      )}
                      {finding.dueDate && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Due date:</span>
                          <span>{format(finding.dueDate, "MMM d, yyyy")}</span>
                        </div>
                      )}
                      {finding.recommendations.length > 0 && (
                        <div className="mt-3">
                          <div className="text-sm font-medium mb-1">Recommendations:</div>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {finding.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-xs mt-1">•</span>
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )),
            )}
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87%</div>
                <p className="text-xs text-muted-foreground">+2% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Open Issues</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">3 critical, 9 medium</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resolved This Month</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Compliance Areas</CardTitle>
              <CardDescription>Overview of compliance status across different areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { area: "Financial Reporting", score: 92, issues: 2 },
                  { area: "Data Privacy", score: 88, issues: 3 },
                  { area: "Operational Controls", score: 85, issues: 4 },
                  { area: "IT Security", score: 90, issues: 3 },
                ].map((item) => (
                  <div key={item.area} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="font-medium">{item.area}</div>
                      <div className="text-sm text-muted-foreground">{item.issues} open issues</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={item.score} className="w-20 h-2" />
                      <span className="text-sm font-medium w-10">{item.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Audit Summary Report</CardTitle>
                <CardDescription>Comprehensive overview of all audit activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">Last generated: 2 days ago</div>
                  <Button size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Compliance Dashboard</CardTitle>
                <CardDescription>Real-time compliance metrics and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">Updated: Real-time</div>
                  <Button size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Findings Report</CardTitle>
                <CardDescription>Detailed analysis of audit findings and remediation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">Last generated: 1 week ago</div>
                  <Button size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Risk Assessment</CardTitle>
                <CardDescription>Comprehensive risk analysis and mitigation strategies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">Last generated: 3 days ago</div>
                  <Button size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Engagement Detail Dialog */}
      <Dialog open={isEngagementDialogOpen} onOpenChange={setIsEngagementDialogOpen}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
          {selectedEngagement && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedEngagement.name}</DialogTitle>
                <DialogDescription>
                  {selectedEngagement.type} audit • {format(selectedEngagement.startDate, "MMM d")} -{" "}
                  {format(selectedEngagement.endDate, "MMM d, yyyy")}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Status & Progress</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge className={STATUS_COLOR_MAP[selectedEngagement.status] || "bg-gray-100 text-gray-800"}>{selectedEngagement.status}</Badge>
                        <Badge className={PRIORITY_COLOR_MAP[selectedEngagement.priority] || "bg-gray-100 text-gray-800"}>
                          {selectedEngagement.priority}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{selectedEngagement.progress}%</span>
                        </div>
                        <Progress value={selectedEngagement.progress} className="h-2" />
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Hours: </span>
                        {selectedEngagement.actualHours} / {selectedEngagement.plannedHours}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Team</h4>
                    <div className="space-y-2">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Auditors</div>
                        <div className="space-y-1">
                          {selectedEngagement.auditors.map((auditor) => (
                            <div key={auditor.id} className="flex items-center gap-2 text-sm">
                              <Avatar className="h-5 w-5">
                                <AvatarImage src={auditor.avatarUrl || "/placeholder.svg"} alt={auditor.name} />
                                <AvatarFallback className="text-xs">
                                  {auditor.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span>{auditor.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {auditor.role}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Auditees</div>
                        <div className="space-y-1">
                          {selectedEngagement.auditees.map((auditee) => (
                            <div key={auditee.id} className="flex items-center gap-2 text-sm">
                              <Avatar className="h-5 w-5">
                                <AvatarImage src={auditee.avatarUrl || "/placeholder.svg"} alt={auditee.name} />
                                <AvatarFallback className="text-xs">
                                  {auditee.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span>{auditee.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {auditee.role}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Scope</h4>
                  <p className="text-sm text-muted-foreground">{selectedEngagement.scope}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Objectives</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {selectedEngagement.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-xs mt-1">•</span>
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Findings ({selectedEngagement.findings.length})</h4>
                    <Button
                      size="sm"
                      onClick={() => {
                        setIsFindingDialogOpen(true)
                        setIsEngagementDialogOpen(false)
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Finding
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {selectedEngagement.findings.map((finding) => (
                      <div key={finding.id} className="p-3 border rounded-md">
                        <div className="flex items-start justify-between mb-1">
                          <div className="font-medium text-sm">{finding.title}</div>
                          <Badge className={SEVERITY_COLOR_MAP[finding.severity] || "bg-gray-100 text-gray-800"}>
                            {finding.severity}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{finding.description}</p>
                      </div>
                    ))}
                    {selectedEngagement.findings.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">No findings yet</p>
                    )}
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
