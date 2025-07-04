"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Calendar,
  Users,
  Target,
  AlertTriangle,
  CheckCircle,
  Building2,
  BookOpen,
  FileText,
  Award,
  UserCheck,
} from "lucide-react"

const dailyMetrics = [
  { name: "Mon", startups: 12, mentors: 8, meetings: 15 },
  { name: "Tue", startups: 15, mentors: 10, meetings: 18 },
  { name: "Wed", startups: 18, mentors: 12, meetings: 22 },
  { name: "Thu", startups: 14, mentors: 9, meetings: 16 },
  { name: "Fri", startups: 16, mentors: 11, meetings: 20 },
  { name: "Sat", startups: 8, mentors: 5, meetings: 10 },
  { name: "Sun", startups: 6, mentors: 3, meetings: 8 },
]

const programStageData = [
  { name: "Pre-Incubation", value: 25, count: 8, color: "#8884d8" },
  { name: "Active Incubation", value: 45, count: 15, color: "#82ca9d" },
  { name: "Growth & Scaling", value: 20, count: 7, color: "#ffc658" },
  { name: "Exit & Alumni", value: 10, count: 3, color: "#ff7300" },
]

const milestoneData = [
  { month: "Jan", achieved: 85, target: 90 },
  { month: "Feb", achieved: 92, target: 90 },
  { month: "Mar", achieved: 88, target: 90 },
  { month: "Apr", achieved: 95, target: 90 },
  { month: "May", achieved: 87, target: 90 },
  { month: "Jun", achieved: 93, target: 90 },
]

const todayActivities = [
  {
    id: 1,
    type: "startup-checkin",
    title: "Weekly check-in with TechNova",
    time: "09:00 AM",
    status: "completed",
    priority: "high",
    participants: ["Sarah Chen", "Mike Johnson"],
  },
  {
    id: 2,
    type: "mentor-meeting",
    title: "Mentor matching session",
    time: "11:00 AM",
    status: "in-progress",
    priority: "medium",
    participants: ["David Wilson", "Lisa Park"],
  },
  {
    id: 3,
    type: "workshop",
    title: "Business Model Canvas Workshop",
    time: "02:00 PM",
    status: "upcoming",
    priority: "high",
    participants: ["15 startups"],
  },
  {
    id: 4,
    type: "review",
    title: "Portfolio health review",
    time: "04:00 PM",
    status: "upcoming",
    priority: "medium",
    participants: ["Internal team"],
  },
]

const urgentIssues = [
  {
    id: 1,
    startup: "HealthPlus",
    issue: "Milestone delay - MVP development behind schedule",
    severity: "high",
    daysOverdue: 5,
    assignedTo: "Alex Thompson",
  },
  {
    id: 2,
    startup: "GreenEarth",
    issue: "Mentor-startup compatibility issues",
    severity: "medium",
    daysOverdue: 2,
    assignedTo: "Sarah Johnson",
  },
  {
    id: 3,
    startup: "EduLearn",
    issue: "Resource allocation - additional technical support needed",
    severity: "medium",
    daysOverdue: 1,
    assignedTo: "Michael Chen",
  },
]

const recentAchievements = [
  {
    id: 1,
    startup: "TechNova",
    achievement: "Completed Series A pitch deck",
    date: "2 hours ago",
    mentor: "David Wilson",
    impact: "high",
  },
  {
    id: 2,
    startup: "AgriTech Solutions",
    achievement: "Secured first pilot customer",
    date: "1 day ago",
    mentor: "Lisa Park",
    impact: "high",
  },
  {
    id: 3,
    startup: "FinanceFlow",
    achievement: "Completed market validation phase",
    date: "2 days ago",
    mentor: "Robert Kim",
    impact: "medium",
  },
]

export function ProgramManagerDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("today")

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "startup-checkin":
        return <Building2 className="h-4 w-4" />
      case "mentor-meeting":
        return <Users className="h-4 w-4" />
      case "workshop":
        return <BookOpen className="h-4 w-4" />
      case "review":
        return <FileText className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "upcoming":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Program Manager Dashboard</h1>
          <p className="text-muted-foreground">Daily operations and portfolio oversight</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Review
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Startups</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">33</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+3</span> new this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Milestone Achievement</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">93%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+3%</span> vs target (90%)
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Mentors</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-600">85%</span> engagement rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Program Completion</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5%</span> vs last quarter
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Today's Activities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Today's Activities</CardTitle>
            <CardDescription>Your scheduled activities and check-ins</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                  <div className="flex-shrink-0">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate">{activity.title}</p>
                      <div className="flex items-center space-x-2">
                        <Badge className={getPriorityColor(activity.priority)}>{activity.priority}</Badge>
                        <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                      <p className="text-xs text-muted-foreground">{activity.participants.join(", ")}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Urgent Issues */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Urgent Issues
            </CardTitle>
            <CardDescription>Items requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {urgentIssues.map((issue) => (
                <div key={issue.id} className="p-3 border rounded-lg bg-orange-50 border-orange-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{issue.startup}</p>
                      <p className="text-xs text-muted-foreground mt-1">{issue.issue}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className={`text-xs font-medium ${getSeverityColor(issue.severity)}`}>
                          {issue.severity.toUpperCase()}
                        </span>
                        <span className="text-xs text-muted-foreground">{issue.daysOverdue} days overdue</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Button size="sm" variant="outline" className="w-full bg-transparent">
                      Resolve Issue
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Program Stage Distribution</CardTitle>
            <CardDescription>Current startup distribution across program stages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={programStageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {programStageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [
                      `${value}% (${programStageData.find((d) => d.name === name)?.count} startups)`,
                      name,
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {programStageData.map((stage, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stage.color }} />
                  <span className="text-xs">{stage.name}</span>
                  <span className="text-xs text-muted-foreground">({stage.count})</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Milestone Achievement Trends</CardTitle>
            <CardDescription>Monthly milestone completion rates vs targets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={milestoneData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, ""]} />
                  <Bar dataKey="target" fill="#e2e8f0" name="Target" />
                  <Bar dataKey="achieved" fill="#3b82f6" name="Achieved" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-green-500" />
            Recent Achievements
          </CardTitle>
          <CardDescription>Latest startup milestones and successes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAchievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{achievement.startup}</p>
                    <Badge
                      className={
                        achievement.impact === "high" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                      }
                    >
                      {achievement.impact} impact
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{achievement.achievement}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-muted-foreground">Mentor: {achievement.mentor}</p>
                    <p className="text-xs text-muted-foreground">{achievement.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Activity Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Activity Overview</CardTitle>
          <CardDescription>Daily engagement metrics across your portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyMetrics} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorStartups" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorMentors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorMeetings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="startups"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="url(#colorStartups)"
                  name="Startup Interactions"
                />
                <Area
                  type="monotone"
                  dataKey="mentors"
                  stackId="1"
                  stroke="#10b981"
                  fill="url(#colorMentors)"
                  name="Mentor Engagements"
                />
                <Area
                  type="monotone"
                  dataKey="meetings"
                  stackId="1"
                  stroke="#f59e0b"
                  fill="url(#colorMeetings)"
                  name="Total Meetings"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
