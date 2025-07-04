"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts"
import {
  TrendingUp,
  DollarSign,
  Building2,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download,
  RefreshCw,
} from "lucide-react"

const portfolioMetrics = [
  {
    title: "Total Portfolio Value",
    value: "₹480 Cr",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    description: "Across 45 active investments",
  },
  {
    title: "Active Companies",
    value: "45",
    change: "+3",
    trend: "up",
    icon: Building2,
    description: "Portfolio companies",
  },
  {
    title: "Total Returns",
    value: "2.8x",
    change: "+0.3x",
    trend: "up",
    icon: TrendingUp,
    description: "Average multiple",
  },
  {
    title: "IRR",
    value: "28.5%",
    change: "+2.1%",
    trend: "up",
    icon: Target,
    description: "Internal rate of return",
  },
]

const performanceData = [
  { month: "Jan", portfolio: 420, benchmark: 400, target: 450 },
  { month: "Feb", portfolio: 435, benchmark: 410, target: 460 },
  { month: "Mar", portfolio: 445, benchmark: 415, target: 470 },
  { month: "Apr", portfolio: 460, benchmark: 425, target: 480 },
  { month: "May", portfolio: 470, benchmark: 430, target: 490 },
  { month: "Jun", portfolio: 480, benchmark: 440, target: 500 },
]

const sectorAllocation = [
  { name: "FinTech", value: 28, amount: "₹134 Cr", color: "#3b82f6" },
  { name: "HealthTech", value: 22, amount: "₹106 Cr", color: "#10b981" },
  { name: "EdTech", value: 18, amount: "₹86 Cr", color: "#f59e0b" },
  { name: "E-commerce", value: 15, amount: "₹72 Cr", color: "#ef4444" },
  { name: "SaaS", value: 12, amount: "₹58 Cr", color: "#8b5cf6" },
  { name: "Others", value: 5, amount: "₹24 Cr", color: "#6b7280" },
]

const topPerformers = [
  { name: "PayTech Solutions", sector: "FinTech", valuation: "₹45 Cr", growth: "+45%", stage: "Series B" },
  { name: "HealthAI", sector: "HealthTech", valuation: "₹38 Cr", growth: "+38%", stage: "Series A" },
  { name: "EduPlatform", sector: "EdTech", valuation: "₹32 Cr", growth: "+32%", stage: "Series A" },
  { name: "RetailTech", sector: "E-commerce", valuation: "₹28 Cr", growth: "+28%", stage: "Seed" },
]

const recentActivities = [
  {
    type: "investment",
    company: "AI Diagnostics",
    action: "Series A funding completed",
    amount: "₹15 Cr",
    time: "2 hours ago",
  },
  {
    type: "exit",
    company: "FoodTech Pro",
    action: "Partial exit executed",
    amount: "₹8 Cr",
    time: "1 day ago",
  },
  {
    type: "milestone",
    company: "GreenEnergy",
    action: "Revenue milestone achieved",
    amount: "₹5 Cr ARR",
    time: "2 days ago",
  },
  {
    type: "investment",
    company: "LogisTech",
    action: "Follow-on investment",
    amount: "₹12 Cr",
    time: "3 days ago",
  },
]

export function InvestorDashboardContent() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("6M")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Investment Portfolio</h1>
          <p className="text-gray-600 dark:text-gray-400">Monitor your investment performance and portfolio health</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {portfolioMetrics.map((metric) => {
          const Icon = metric.icon
          return (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {metric.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                  )}
                  <span className={metric.trend === "up" ? "text-green-500" : "text-red-500"}>{metric.change}</span>
                  <span className="ml-1">{metric.description}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Performance Chart and Sector Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Portfolio Performance</CardTitle>
                <CardDescription>Performance vs benchmark over time</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                {["3M", "6M", "1Y", "2Y"].map((period) => (
                  <Button
                    key={period}
                    variant={selectedTimeframe === period ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTimeframe(period)}
                  >
                    {period}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                portfolio: { label: "Portfolio", color: "#3b82f6" },
                benchmark: { label: "Benchmark", color: "#6b7280" },
                target: { label: "Target", color: "#10b981" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="portfolio"
                    stroke="var(--color-portfolio)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-portfolio)" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="benchmark"
                    stroke="var(--color-benchmark)"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="var(--color-target)"
                    strokeWidth={2}
                    strokeDasharray="3 3"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Sector Allocation */}
        <Card>
          <CardHeader>
            <CardTitle>Sector Allocation</CardTitle>
            <CardDescription>Investment distribution across sectors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row items-center gap-4">
              <div className="w-full lg:w-1/2">
                <ChartContainer
                  config={{
                    value: { label: "Value" },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sectorAllocation}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {sectorAllocation.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload
                            return (
                              <div className="bg-white dark:bg-gray-800 p-2 border rounded shadow">
                                <p className="font-medium">{data.name}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {data.value}% ({data.amount})
                                </p>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              <div className="w-full lg:w-1/2 space-y-2">
                {sectorAllocation.map((sector) => (
                  <div key={sector.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: sector.color }} />
                      <span className="text-sm font-medium">{sector.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{sector.value}%</div>
                      <div className="text-xs text-gray-500">{sector.amount}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers and Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>Best performing portfolio companies this quarter</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((company, index) => (
                <div key={company.name} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{company.name}</p>
                      <p className="text-sm text-gray-500">{company.sector}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{company.valuation}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {company.stage}
                      </Badge>
                      <span className="text-sm text-green-600 font-medium">{company.growth}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest portfolio updates and transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    {activity.type === "investment" && <DollarSign className="h-4 w-4 text-green-600" />}
                    {activity.type === "exit" && <TrendingUp className="h-4 w-4 text-blue-600" />}
                    {activity.type === "milestone" && <Target className="h-4 w-4 text-purple-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.company}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{activity.action}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm font-medium text-green-600">{activity.amount}</span>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
