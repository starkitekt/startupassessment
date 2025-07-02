"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Download, FileText, Calendar, TrendingUp, BarChart3, Target, DollarSign } from "lucide-react"

const quarterlyReports = [
  {
    id: "Q1-2024",
    title: "Q1 2024 Portfolio Report",
    period: "Jan - Mar 2024",
    status: "Published",
    date: "2024-04-05",
    type: "Quarterly",
    metrics: {
      totalValue: "₹420 Cr",
      growth: "+12.5%",
      newInvestments: 3,
      exits: 1,
    },
  },
  {
    id: "Q2-2024",
    title: "Q2 2024 Portfolio Report",
    period: "Apr - Jun 2024",
    status: "Draft",
    date: "2024-07-05",
    type: "Quarterly",
    metrics: {
      totalValue: "₹480 Cr",
      growth: "+14.3%",
      newInvestments: 2,
      exits: 0,
    },
  },
]

const performanceMetrics = [
  { metric: "Portfolio Value", q1: 420, q2: 480, growth: 14.3 },
  { metric: "IRR", q1: 24.5, q2: 28.4, growth: 15.9 },
  { metric: "Active Companies", q1: 22, q2: 24, growth: 9.1 },
  { metric: "Total Investment", q1: 42.5, q2: 45.6, growth: 7.3 },
]

const sectorPerformance = [
  { sector: "FinTech", value: 168, growth: 15.2, companies: 8 },
  { sector: "HealthTech", value: 120, growth: 12.8, companies: 6 },
  { sector: "EdTech", value: 96, growth: 18.5, companies: 5 },
  { sector: "CleanTech", value: 72, growth: 10.3, companies: 3 },
  { sector: "AgriTech", value: 24, growth: 8.7, companies: 2 },
]

const monthlyTrends = [
  { month: "Jan", value: 420, investments: 1 },
  { month: "Feb", value: 435, investments: 0 },
  { month: "Mar", value: 450, investments: 2 },
  { month: "Apr", value: 465, investments: 1 },
  { month: "May", value: 472, investments: 0 },
  { month: "Jun", value: 480, investments: 1 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export function PortfolioReports() {
  const [selectedPeriod, setSelectedPeriod] = useState("q2-2024")
  const [reportType, setReportType] = useState("quarterly")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Portfolio Reports</h2>
          <p className="text-muted-foreground">Generate and view comprehensive portfolio analytics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Report
          </Button>
          <Button className="jpmc-gradient">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Report Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Report Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="annual">Annual</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="q2-2024">Q2 2024</SelectItem>
                <SelectItem value="q1-2024">Q1 2024</SelectItem>
                <SelectItem value="q4-2023">Q4 2023</SelectItem>
              </SelectContent>
            </Select>
            <DatePickerWithRange />
            <Button variant="outline" className="ml-auto">
              <Download className="mr-2 h-4 w-4" />
              Export All
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="sectors">Sectors</TabsTrigger>
          <TabsTrigger value="reports">Generated Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹480 Cr</div>
                <div className="flex items-center text-xs text-green-500">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  <span>+14.3% this quarter</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">New Investments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">This quarter</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Exits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">Successful exit</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average IRR</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28.4%</div>
                <div className="flex items-center text-xs text-green-500">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  <span>+3.9% improvement</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Value Trend</CardTitle>
                <CardDescription>Monthly portfolio valuation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyTrends} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip formatter={(value) => [`₹${value} Cr`, "Portfolio Value"]} />
                      <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sector Performance</CardTitle>
                <CardDescription>Value distribution by sector</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sectorPerformance}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {sectorPerformance.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`₹${value} Cr`, "Value"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Quarter-over-quarter performance comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        {metric.metric === "Portfolio Value" && <DollarSign className="h-6 w-6 text-primary" />}
                        {metric.metric === "IRR" && <TrendingUp className="h-6 w-6 text-primary" />}
                        {metric.metric === "Active Companies" && <Target className="h-6 w-6 text-primary" />}
                        {metric.metric === "Total Investment" && <BarChart3 className="h-6 w-6 text-primary" />}
                      </div>
                      <div>
                        <h3 className="font-medium">{metric.metric}</h3>
                        <p className="text-sm text-muted-foreground">
                          Q1: {metric.metric.includes("Value") || metric.metric.includes("Investment") ? "₹" : ""}
                          {metric.q1}
                          {metric.metric === "IRR"
                            ? "%"
                            : metric.metric.includes("Value") || metric.metric.includes("Investment")
                              ? " Cr"
                              : ""}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">
                        {metric.metric.includes("Value") || metric.metric.includes("Investment") ? "₹" : ""}
                        {metric.q2}
                        {metric.metric === "IRR"
                          ? "%"
                          : metric.metric.includes("Value") || metric.metric.includes("Investment")
                            ? " Cr"
                            : ""}
                      </div>
                      <div className="flex items-center text-sm text-green-600">
                        <TrendingUp className="h-3 w-3 mr-1" />+{metric.growth}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sectors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sector Analysis</CardTitle>
              <CardDescription>Detailed breakdown by industry sector</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sectorPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="sector" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${value} Cr`, "Value"]} />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {sectorPerformance.map((sector, index) => (
                  <Card key={sector.sector}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{sector.sector}</h3>
                        <Badge variant="outline">{sector.companies} companies</Badge>
                      </div>
                      <div className="text-2xl font-bold mb-1">₹{sector.value} Cr</div>
                      <div className="flex items-center text-sm text-green-600">
                        <TrendingUp className="h-3 w-3 mr-1" />+{sector.growth}% growth
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid gap-6">
            {quarterlyReports.map((report) => (
              <Card key={report.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{report.title}</h3>
                        <Badge variant={report.status === "Published" ? "default" : "secondary"}>{report.status}</Badge>
                      </div>
                      <p className="text-muted-foreground">{report.period}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div>
                          <span className="text-sm text-muted-foreground">Portfolio Value</span>
                          <p className="font-medium">{report.metrics.totalValue}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Growth</span>
                          <p className="font-medium text-green-600">{report.metrics.growth}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">New Investments</span>
                          <p className="font-medium">{report.metrics.newInvestments}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Exits</span>
                          <p className="font-medium">{report.metrics.exits}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
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
