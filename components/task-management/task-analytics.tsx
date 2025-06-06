"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Clock, CheckCircle, AlertTriangle, Download, Target, Activity } from "lucide-react"

interface TaskMetrics {
  totalTasks: number
  completedTasks: number
  overdueTasks: number
  avgCompletionTime: number
  productivityScore: number
  teamEfficiency: number
}

interface TeamPerformance {
  userId: string
  name: string
  avatar: string
  tasksCompleted: number
  tasksAssigned: number
  avgCompletionTime: number
  productivityScore: number
  onTimeCompletion: number
}

export function TaskAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d")
  const [selectedTeam, setSelectedTeam] = useState("all")

  const metrics: TaskMetrics = {
    totalTasks: 156,
    completedTasks: 124,
    overdueTasks: 8,
    avgCompletionTime: 2.4,
    productivityScore: 87,
    teamEfficiency: 92,
  }

  const teamPerformance: TeamPerformance[] = [
    {
      userId: "u1",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      tasksCompleted: 28,
      tasksAssigned: 32,
      avgCompletionTime: 1.8,
      productivityScore: 94,
      onTimeCompletion: 96,
    },
    {
      userId: "u2",
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      tasksCompleted: 24,
      tasksAssigned: 28,
      avgCompletionTime: 2.1,
      productivityScore: 89,
      onTimeCompletion: 89,
    },
    {
      userId: "u3",
      name: "Alex Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
      tasksCompleted: 22,
      tasksAssigned: 26,
      avgCompletionTime: 2.8,
      productivityScore: 82,
      onTimeCompletion: 85,
    },
  ]

  const taskDistribution = [
    { status: "Completed", count: 124, percentage: 79.5, color: "bg-green-500" },
    { status: "In Progress", count: 24, percentage: 15.4, color: "bg-blue-500" },
    { status: "Overdue", count: 8, percentage: 5.1, color: "bg-red-500" },
  ]

  const priorityBreakdown = [
    { priority: "High", count: 32, percentage: 20.5 },
    { priority: "Medium", count: 89, percentage: 57.1 },
    { priority: "Low", count: 35, percentage: 22.4 },
  ]

  const completionTrend = [
    { period: "Week 1", completed: 28, target: 30 },
    { period: "Week 2", completed: 32, target: 30 },
    { period: "Week 3", completed: 29, target: 30 },
    { period: "Week 4", completed: 35, target: 30 },
  ]

  const formatPercentage = (value: number) => `${value.toFixed(1)}%`
  const formatDays = (days: number) => `${days.toFixed(1)} days`

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Task Analytics</h2>
          <p className="text-muted-foreground">Comprehensive task performance insights</p>
        </div>
        <div className="flex items-center gap-2">
          <DatePickerWithRange />
          <Select value={selectedTeam} onValueChange={setSelectedTeam}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Teams</SelectItem>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Team Performance</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.totalTasks}</div>
                <p className="text-xs text-muted-foreground">
                  {formatPercentage((metrics.completedTasks / metrics.totalTasks) * 100)} completed
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Completion Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatDays(metrics.avgCompletionTime)}</div>
                <div className="flex items-center text-xs">
                  <TrendingDown className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-600">12% faster</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Productivity Score</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.productivityScore}%</div>
                <div className="flex items-center text-xs">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-600">+5% from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overdue Tasks</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{metrics.overdueTasks}</div>
                <p className="text-xs text-muted-foreground">
                  {formatPercentage((metrics.overdueTasks / metrics.totalTasks) * 100)} of total
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Task Distribution */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Task Status Distribution</CardTitle>
                <CardDescription>Breakdown of tasks by current status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {taskDistribution.map((item) => (
                    <div key={item.status} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{item.status}</span>
                        <span className="font-medium">
                          {item.count} ({formatPercentage(item.percentage)})
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Priority Breakdown</CardTitle>
                <CardDescription>Tasks categorized by priority level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {priorityBreakdown.map((item) => (
                    <div key={item.priority} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            item.priority === "High"
                              ? "destructive"
                              : item.priority === "Medium"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {item.priority}
                        </Badge>
                        <span className="text-sm">{item.count} tasks</span>
                      </div>
                      <span className="text-sm font-medium">{formatPercentage(item.percentage)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Performance Metrics</CardTitle>
              <CardDescription>Individual team member productivity and efficiency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {teamPerformance.map((member) => (
                  <div key={member.userId} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <h4 className="font-medium">{member.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {member.tasksCompleted}/{member.tasksAssigned} tasks completed
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{member.productivityScore}%</div>
                        <p className="text-xs text-muted-foreground">Productivity Score</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Completion Rate:</span>
                        <div className="font-medium">
                          {formatPercentage((member.tasksCompleted / member.tasksAssigned) * 100)}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Avg Time:</span>
                        <div className="font-medium">{formatDays(member.avgCompletionTime)}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">On-Time:</span>
                        <div className="font-medium">{formatPercentage(member.onTimeCompletion)}</div>
                      </div>
                    </div>

                    <Progress value={member.productivityScore} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Completion Trends</CardTitle>
              <CardDescription>Weekly task completion vs targets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completionTrend.map((week) => (
                  <div key={week.period} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>{week.period}</span>
                      <span className="font-medium">
                        {week.completed}/{week.target} tasks
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${week.completed >= week.target ? "bg-green-500" : "bg-blue-500"}`}
                        style={{ width: `${Math.min((week.completed / week.target) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Productivity Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                    <div className="flex items-center gap-2 text-green-800">
                      <TrendingUp className="h-4 w-4" />
                      <span className="font-medium">Peak Performance</span>
                    </div>
                    <p className="text-sm text-green-700 mt-1">Team productivity increased by 15% this month</p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <div className="flex items-center gap-2 text-blue-800">
                      <Activity className="h-4 w-4" />
                      <span className="font-medium">Optimal Workload</span>
                    </div>
                    <p className="text-sm text-blue-700 mt-1">Current task distribution is well-balanced across team</p>
                  </div>
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <div className="flex items-center gap-2 text-yellow-800">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium">Time Management</span>
                    </div>
                    <p className="text-sm text-yellow-700 mt-1">
                      Consider breaking down large tasks for better tracking
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm">
                    <div className="font-medium">Reduce Overdue Tasks</div>
                    <p className="text-muted-foreground">Implement automated reminders 24h before due dates</p>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">Optimize Task Assignment</div>
                    <p className="text-muted-foreground">Balance workload based on individual capacity and skills</p>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">Improve Estimation</div>
                    <p className="text-muted-foreground">
                      Use historical data to better estimate task completion times
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                name: "Weekly Performance Report",
                description: "Comprehensive weekly team performance analysis",
                lastGenerated: "2 days ago",
                schedule: "Weekly",
              },
              {
                name: "Monthly Productivity Summary",
                description: "Monthly productivity metrics and trends",
                lastGenerated: "1 week ago",
                schedule: "Monthly",
              },
              {
                name: "Task Completion Analysis",
                description: "Detailed analysis of task completion patterns",
                lastGenerated: "3 days ago",
                schedule: "Bi-weekly",
              },
              {
                name: "Team Efficiency Report",
                description: "Individual and team efficiency metrics",
                lastGenerated: "5 days ago",
                schedule: "Monthly",
              },
            ].map((report, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-base">{report.name}</CardTitle>
                  <CardDescription>{report.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Schedule:</span>
                      <span>{report.schedule}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Generated:</span>
                      <span>{report.lastGenerated}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button size="sm" className="flex-1">
                      Generate Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
