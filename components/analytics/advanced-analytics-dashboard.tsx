"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Building2,
  Target,
  Download,
  Filter,
  RefreshCw,
} from "lucide-react"

interface AnalyticsMetric {
  title: string
  value: string
  change: number
  trend: "up" | "down" | "stable"
  icon: React.ReactNode
}

interface ChartData {
  name: string
  value: number
  [key: string]: any
}

const ANALYTICS_METRICS: AnalyticsMetric[] = [
  {
    title: "Total Revenue",
    value: "$2.4M",
    change: 12.5,
    trend: "up",
    icon: <DollarSign className="h-5 w-5" />,
  },
  {
    title: "Active Startups",
    value: "156",
    change: 8.2,
    trend: "up",
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    title: "Mentorship Sessions",
    value: "1,247",
    change: -3.1,
    trend: "down",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Success Rate",
    value: "73%",
    change: 5.4,
    trend: "up",
    icon: <Target className="h-5 w-5" />,
  },
]

const REVENUE_DATA: ChartData[] = [
  { month: "Jan", revenue: 180000, expenses: 120000, profit: 60000 },
  { month: "Feb", revenue: 220000, expenses: 140000, profit: 80000 },
  { month: "Mar", revenue: 280000, expenses: 160000, profit: 120000 },
  { month: "Apr", revenue: 320000, expenses: 180000, profit: 140000 },
  { month: "May", revenue: 380000, expenses: 200000, profit: 180000 },
  { month: "Jun", revenue: 420000, expenses: 220000, profit: 200000 },
]

const STARTUP_STAGES_DATA: ChartData[] = [
  { name: "Ideation", value: 35, color: "#8884d8" },
  { name: "MVP", value: 28, color: "#82ca9d" },
  { name: "Growth", value: 22, color: "#ffc658" },
  { name: "Scale", value: 15, color: "#ff7300" },
]

const PROCUREMENT_DATA: ChartData[] = [
  { category: "Technology", amount: 45000, requests: 23 },
  { category: "Office Supplies", amount: 12000, requests: 67 },
  { category: "Marketing", amount: 28000, requests: 15 },
  { category: "Legal", amount: 35000, requests: 8 },
  { category: "Consulting", amount: 52000, requests: 12 },
]

const CALENDAR_UTILIZATION_DATA: ChartData[] = [
  { day: "Mon", meetings: 12, deadlines: 5, events: 3 },
  { day: "Tue", meetings: 15, deadlines: 8, events: 2 },
  { day: "Wed", meetings: 18, deadlines: 6, events: 4 },
  { day: "Thu", meetings: 14, deadlines: 9, events: 1 },
  { day: "Fri", meetings: 10, deadlines: 4, events: 6 },
  { day: "Sat", meetings: 3, deadlines: 2, events: 8 },
  { day: "Sun", meetings: 1, deadlines: 1, events: 5 },
]

export function AdvancedAnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("30d")
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(["revenue", "startups", "mentorship"])

  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <div className="h-4 w-4" />
    }
  }

  const formatChange = (change: number) => {
    const sign = change >= 0 ? "+" : ""
    return `${sign}${change.toFixed(1)}%`
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Advanced Analytics</h1>
          <p className="text-muted-foreground">Comprehensive insights across all platform modules</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {ANALYTICS_METRICS.map((metric) => (
          <Card key={metric.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <div className="flex items-center gap-1 text-sm">
                    {getTrendIcon(metric.trend)}
                    <span
                      className={
                        metric.trend === "up"
                          ? "text-green-500"
                          : metric.trend === "down"
                            ? "text-red-500"
                            : "text-gray-500"
                      }
                    >
                      {formatChange(metric.change)}
                    </span>
                    <span className="text-muted-foreground">vs last period</span>
                  </div>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">{metric.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="procurement">Procurement</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={REVENUE_DATA}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, ""]} />
                    <Area type="monotone" dataKey="revenue" stackId="1" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="expenses" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Startup Distribution by Stage</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={STARTUP_STAGES_DATA}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {STARTUP_STAGES_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={REVENUE_DATA}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, ""]} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="expenses" stroke="#82ca9d" strokeWidth={2} />
                  <Line type="monotone" dataKey="profit" stroke="#ffc658" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operations" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Application Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Pending Review</span>
                    <Badge variant="secondary">23</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Under Assessment</span>
                    <Badge variant="secondary">15</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Approved</span>
                    <Badge variant="default">8</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Rejected</span>
                    <Badge variant="destructive">12</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Task Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Completed</span>
                      <span>78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>In Progress</span>
                      <span>15%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "15%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overdue</span>
                      <span>7%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: "7%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mentor Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">94%</div>
                    <div className="text-sm text-muted-foreground">Active Mentors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">4.8</div>
                    <div className="text-sm text-muted-foreground">Avg Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">1,247</div>
                    <div className="text-sm text-muted-foreground">Sessions This Month</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="procurement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Procurement Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={PROCUREMENT_DATA}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" fill="#8884d8" name="Amount ($)" />
                  <Bar dataKey="requests" fill="#82ca9d" name="Requests" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Calendar Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={CALENDAR_UTILIZATION_DATA}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="meetings" stackId="a" fill="#8884d8" />
                  <Bar dataKey="deadlines" stackId="a" fill="#82ca9d" />
                  <Bar dataKey="events" stackId="a" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
