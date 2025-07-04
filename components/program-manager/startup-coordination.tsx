"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Filter, Plus, Calendar, MessageSquare, CheckCircle, AlertTriangle, Eye } from "lucide-react"

interface Startup {
  id: string
  name: string
  logo: string
  stage: "pre-incubation" | "active-incubation" | "growth-scaling" | "exit-alumni"
  founders: Founder[]
  sector: string
  currentMilestone: string
  nextMilestone: string
  healthScore: number
  lastCheckin: string
  nextCheckin: string
  mentor: string
  progress: number
  urgentIssues: string[]
  recentAchievements: string[]
  kpis: KPI[]
}

interface Founder {
  name: string
  role: string
  email: string
  phone: string
  avatar: string
}

interface KPI {
  name: string
  current: number
  target: number
  unit: string
  trend: "up" | "down" | "stable"
}

const mockStartups: Startup[] = [
  {
    id: "1",
    name: "TechNova",
    logo: "/placeholder.svg?height=40&width=40&text=TN",
    stage: "active-incubation",
    founders: [
      {
        name: "Sarah Chen",
        role: "CEO",
        email: "sarah@technova.com",
        phone: "+1-555-0123",
        avatar: "/placeholder.svg?height=32&width=32&text=SC",
      },
      {
        name: "Mike Johnson",
        role: "CTO",
        email: "mike@technova.com",
        phone: "+1-555-0124",
        avatar: "/placeholder.svg?height=32&width=32&text=MJ",
      },
    ],
    sector: "FinTech",
    currentMilestone: "MVP Development",
    nextMilestone: "Beta Testing",
    healthScore: 85,
    lastCheckin: "2 days ago",
    nextCheckin: "Tomorrow",
    mentor: "David Wilson",
    progress: 75,
    urgentIssues: [],
    recentAchievements: ["Completed user research", "Secured first pilot customer"],
    kpis: [
      { name: "User Signups", current: 1250, target: 1500, unit: "users", trend: "up" },
      { name: "Monthly Revenue", current: 15000, target: 20000, unit: "$", trend: "up" },
      { name: "Customer Retention", current: 85, target: 90, unit: "%", trend: "stable" },
    ],
  },
  {
    id: "2",
    name: "GreenEarth",
    logo: "/placeholder.svg?height=40&width=40&text=GE",
    stage: "pre-incubation",
    founders: [
      {
        name: "Lisa Park",
        role: "CEO",
        email: "lisa@greenearth.com",
        phone: "+1-555-0125",
        avatar: "/placeholder.svg?height=32&width=32&text=LP",
      },
    ],
    sector: "CleanTech",
    currentMilestone: "Business Plan Refinement",
    nextMilestone: "Market Validation",
    healthScore: 72,
    lastCheckin: "1 week ago",
    nextCheckin: "In 2 days",
    mentor: "Robert Kim",
    progress: 45,
    urgentIssues: ["Mentor compatibility issues"],
    recentAchievements: ["Completed market research"],
    kpis: [
      { name: "Market Size", current: 500000, target: 1000000, unit: "$", trend: "up" },
      { name: "Prototype Tests", current: 15, target: 25, unit: "tests", trend: "up" },
    ],
  },
  {
    id: "3",
    name: "HealthPlus",
    logo: "/placeholder.svg?height=40&width=40&text=HP",
    stage: "active-incubation",
    founders: [
      {
        name: "Dr. Alex Rodriguez",
        role: "CEO",
        email: "alex@healthplus.com",
        phone: "+1-555-0126",
        avatar: "/placeholder.svg?height=32&width=32&text=AR",
      },
    ],
    sector: "HealthTech",
    currentMilestone: "Regulatory Approval",
    nextMilestone: "Clinical Trials",
    healthScore: 68,
    lastCheckin: "3 days ago",
    nextCheckin: "Today",
    mentor: "Dr. Jennifer Lee",
    progress: 60,
    urgentIssues: ["Regulatory documentation delays", "Additional funding needed"],
    recentAchievements: ["FDA pre-submission meeting completed"],
    kpis: [
      { name: "Clinical Partners", current: 3, target: 5, unit: "partners", trend: "stable" },
      { name: "Regulatory Milestones", current: 7, target: 10, unit: "milestones", trend: "up" },
    ],
  },
]

export function StartupCoordination() {
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [stageFilter, setStageFilter] = useState("all")
  const [isCheckinDialogOpen, setIsCheckinDialogOpen] = useState(false)
  const [checkinNotes, setCheckinNotes] = useState("")

  const filteredStartups = mockStartups.filter((startup) => {
    const matchesSearch = startup.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStage = stageFilter === "all" || startup.stage === stageFilter
    return matchesSearch && matchesStage
  })

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "pre-incubation":
        return "bg-blue-100 text-blue-800"
      case "active-incubation":
        return "bg-green-100 text-green-800"
      case "growth-scaling":
        return "bg-yellow-100 text-yellow-800"
      case "exit-alumni":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const formatStage = (stage: string) => {
    return stage
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const handleCheckin = (startup: Startup) => {
    setSelectedStartup(startup)
    setIsCheckinDialogOpen(true)
  }

  const submitCheckin = () => {
    // Handle checkin submission
    setIsCheckinDialogOpen(false)
    setCheckinNotes("")
    setSelectedStartup(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Startup Coordination</h1>
          <p className="text-muted-foreground">Manage check-ins, milestones, and startup progress</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Schedule Check-in
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search startups..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={stageFilter} onValueChange={setStageFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="pre-incubation">Pre-Incubation</SelectItem>
                <SelectItem value="active-incubation">Active Incubation</SelectItem>
                <SelectItem value="growth-scaling">Growth & Scaling</SelectItem>
                <SelectItem value="exit-alumni">Exit & Alumni</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Startup Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {filteredStartups.map((startup) => (
          <Card key={startup.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={startup.logo || "/placeholder.svg"} alt={startup.name} />
                    <AvatarFallback>{startup.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{startup.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Badge variant="outline">{startup.sector}</Badge>
                      <Badge className={getStageColor(startup.stage)}>{formatStage(startup.stage)}</Badge>
                    </CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${getHealthScoreColor(startup.healthScore)}`}>
                    {startup.healthScore}
                  </div>
                  <div className="text-xs text-muted-foreground">Health Score</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Current: {startup.currentMilestone}</span>
                  <span>{startup.progress}%</span>
                </div>
                <Progress value={startup.progress} className="h-2" />
                <div className="text-xs text-muted-foreground mt-1">Next: {startup.nextMilestone}</div>
              </div>

              {/* Founders */}
              <div>
                <div className="text-sm font-medium mb-2">Founders</div>
                <div className="flex items-center gap-2">
                  {startup.founders.map((founder, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={founder.avatar || "/placeholder.svg"} alt={founder.name} />
                        <AvatarFallback className="text-xs">
                          {founder.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs">{founder.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Check-in Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Last Check-in:</span>
                  <p className="font-medium">{startup.lastCheckin}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Next Check-in:</span>
                  <p className="font-medium">{startup.nextCheckin}</p>
                </div>
              </div>

              {/* Urgent Issues */}
              {startup.urgentIssues.length > 0 && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium text-red-800">Urgent Issues</span>
                  </div>
                  <ul className="text-xs text-red-700 space-y-1">
                    {startup.urgentIssues.map((issue, index) => (
                      <li key={index}>• {issue}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recent Achievements */}
              {startup.recentAchievements.length > 0 && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium text-green-800">Recent Achievements</span>
                  </div>
                  <ul className="text-xs text-green-700 space-y-1">
                    {startup.recentAchievements.map((achievement, index) => (
                      <li key={index}>• {achievement}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t">
                <Button size="sm" onClick={() => handleCheckin(startup)}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Check-in
                </Button>
                <Button size="sm" variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Button>
                <Button size="sm" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Check-in Dialog */}
      <Dialog open={isCheckinDialogOpen} onOpenChange={setIsCheckinDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Check-in with {selectedStartup?.name}</DialogTitle>
            <DialogDescription>Record progress, issues, and next steps</DialogDescription>
          </DialogHeader>
          {selectedStartup && (
            <div className="space-y-6">
              {/* Startup Info */}
              <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedStartup.logo || "/placeholder.svg"} alt={selectedStartup.name} />
                  <AvatarFallback>{selectedStartup.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedStartup.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedStartup.sector} • {formatStage(selectedStartup.stage)}
                  </p>
                </div>
              </div>

              {/* Current KPIs */}
              <div>
                <h4 className="font-medium mb-3">Current KPIs</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedStartup.kpis.map((kpi, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{kpi.name}</span>
                        <span
                          className={`text-xs ${kpi.trend === "up" ? "text-green-600" : kpi.trend === "down" ? "text-red-600" : "text-gray-600"}`}
                        >
                          {kpi.trend === "up" ? "↗" : kpi.trend === "down" ? "↘" : "→"}
                        </span>
                      </div>
                      <div className="text-lg font-bold">
                        {kpi.unit === "$" ? "$" : ""}
                        {kpi.current.toLocaleString()}
                        {kpi.unit !== "$" ? ` ${kpi.unit}` : ""}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Target: {kpi.unit === "$" ? "$" : ""}
                        {kpi.target.toLocaleString()}
                        {kpi.unit !== "$" ? ` ${kpi.unit}` : ""}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Check-in Notes */}
              <div>
                <label className="text-sm font-medium mb-2 block">Check-in Notes</label>
                <Textarea
                  placeholder="Record progress updates, challenges, achievements, and next steps..."
                  value={checkinNotes}
                  onChange={(e) => setCheckinNotes(e.target.value)}
                  className="h-32"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCheckinDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={submitCheckin}>Submit Check-in</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
