"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { useToast } from "@/hooks/use-toast"
import {
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  Download,
  Filter,
  Calendar,
  DollarSign,
  Target,
  Activity,
  FileText,
  Settings,
  Plus,
  Eye,
  Share,
} from "lucide-react"

interface DashboardWidget {
  id: string
  title: string
  type: "metric" | "chart" | "table" | "list"
  chartType?: "line" | "bar" | "pie" | "area"
  dataSource: string
  filters: WidgetFilter[]
  position: { x: number; y: number; width: number; height: number }
  config: WidgetConfig
}

interface WidgetFilter {
  field: string
  operator: "equals" | "contains" | "greater_than" | "less_than" | "between"
  value: any
}

interface WidgetConfig {
  showLegend?: boolean
  showGrid?: boolean
  colors?: string[]
  aggregation?: "sum" | "average" | "count" | "max" | "min"
  groupBy?: string
  timeRange?: "7d" | "30d" | "90d" | "1y" | "custom"
}

interface Report {
  id: string
  name: string
  description: string
  category: "financial" | "operational" | "portfolio" | "compliance"
  schedule: "manual" | "daily" | "weekly" | "monthly" | "quarterly"
  recipients: string[]
  template: ReportTemplate
  lastGenerated?: Date
  nextScheduled?: Date
  status: "active" | "paused" | "draft"
}

interface ReportTemplate {
  sections: ReportSection[]
  format: "pdf" | "excel" | "csv" | "html"
  styling: ReportStyling
}

interface ReportSection {
  id: string
  title: string
  type: "summary" | "chart" | "table" | "text"
  content: any
  order: number
}

interface ReportStyling {
  theme: "light" | "dark" | "corporate"
  logo?: string
  colors: {
    primary: string
    secondary: string
    accent: string
  }
}

interface DataVisualization {
  id: string
  name: string
  type: "line" | "bar" | "pie" | "scatter" | "heatmap" | "funnel"
  dataSource: string
  xAxis: string
  yAxis: string[]
  filters: VisualizationFilter[]
  config: VisualizationConfig
}

interface VisualizationFilter {
  field: string
  operator: string
  value: any
  label: string
}

interface VisualizationConfig {
  title: string
  subtitle?: string
  showLegend: boolean
  showGrid: boolean
  colors: string[]
  animations: boolean
  responsive: boolean
}

interface PerformanceMetric {
  id: string
  name: string
  value: number
  previousValue: number
  target?: number
  unit: string
  trend: "up" | "down" | "stable"
  category: "financial" | "operational" | "growth" | "efficiency"
  lastUpdated: Date
}

export function AdvancedAnalyticsSystem() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedDashboard, setSelectedDashboard] = useState<string>("default")
  const [isEditMode, setIsEditMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  // Mock data
  const [dashboards, setDashboards] = useState([
    { id: "default", name: "Executive Dashboard", description: "High-level KPIs and metrics" },
    { id: "portfolio", name: "Portfolio Performance", description: "Investment and portfolio analytics" },
    { id: "operations", name: "Operations Dashboard", description: "Operational metrics and efficiency" },
  ])

  const [widgets, setWidgets] = useState<DashboardWidget[]>([
    {
      id: "widget-1",
      title: "Total Portfolio Value",
      type: "metric",
      dataSource: "portfolio",
      filters: [],
      position: { x: 0, y: 0, width: 3, height: 2 },
      config: { aggregation: "sum" },
    },
    {
      id: "widget-2",
      title: "Monthly Revenue Trend",
      type: "chart",
      chartType: "line",
      dataSource: "revenue",
      filters: [],
      position: { x: 3, y: 0, width: 6, height: 4 },
      config: { showLegend: true, showGrid: true, timeRange: "90d" },
    },
    {
      id: "widget-3",
      title: "Investment Distribution",
      type: "chart",
      chartType: "pie",
      dataSource: "investments",
      filters: [],
      position: { x: 9, y: 0, width: 3, height: 4 },
      config: { showLegend: true, groupBy: "stage" },
    },
  ])

  const [reports, setReports] = useState<Report[]>([
    {
      id: "report-1",
      name: "Monthly Portfolio Report",
      description: "Comprehensive monthly portfolio performance report",
      category: "portfolio",
      schedule: "monthly",
      recipients: ["ceo@company.com", "cfo@company.com"],
      template: {
        sections: [
          { id: "s1", title: "Executive Summary", type: "summary", content: {}, order: 1 },
          { id: "s2", title: "Portfolio Performance", type: "chart", content: {}, order: 2 },
          { id: "s3", title: "Investment Details", type: "table", content: {}, order: 3 },
        ],
        format: "pdf",
        styling: {
          theme: "corporate",
          colors: { primary: "#1f2937", secondary: "#6b7280", accent: "#3b82f6" },
        },
      },
      lastGenerated: new Date("2024-01-15"),
      nextScheduled: new Date("2024-02-15"),
      status: "active",
    },
    {
      id: "report-2",
      name: "Weekly Operations Summary",
      description: "Weekly operational metrics and KPIs",
      category: "operational",
      schedule: "weekly",
      recipients: ["operations@company.com"],
      template: {
        sections: [
          { id: "s1", title: "Key Metrics", type: "summary", content: {}, order: 1 },
          { id: "s2", title: "Trends Analysis", type: "chart", content: {}, order: 2 },
        ],
        format: "excel",
        styling: {
          theme: "light",
          colors: { primary: "#059669", secondary: "#10b981", accent: "#34d399" },
        },
      },
      lastGenerated: new Date("2024-01-20"),
      nextScheduled: new Date("2024-01-27"),
      status: "active",
    },
  ])

  const [visualizations, setVisualizations] = useState<DataVisualization[]>([
    {
      id: "viz-1",
      name: "Revenue Growth Analysis",
      type: "line",
      dataSource: "revenue_data",
      xAxis: "month",
      yAxis: ["revenue", "target"],
      filters: [{ field: "year", operator: "equals", value: 2024, label: "Year 2024" }],
      config: {
        title: "Monthly Revenue vs Target",
        showLegend: true,
        showGrid: true,
        colors: ["#3b82f6", "#ef4444"],
        animations: true,
        responsive: true,
      },
    },
    {
      id: "viz-2",
      name: "Investment Distribution",
      type: "pie",
      dataSource: "investment_data",
      xAxis: "stage",
      yAxis: ["amount"],
      filters: [],
      config: {
        title: "Investment by Stage",
        showLegend: true,
        showGrid: false,
        colors: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
        animations: true,
        responsive: true,
      },
    },
  ])

  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([
    {
      id: "metric-1",
      name: "Total Portfolio Value",
      value: 45000000,
      previousValue: 42000000,
      target: 50000000,
      unit: "USD",
      trend: "up",
      category: "financial",
      lastUpdated: new Date("2024-01-20"),
    },
    {
      id: "metric-2",
      name: "Active Startups",
      value: 24,
      previousValue: 22,
      target: 30,
      unit: "count",
      trend: "up",
      category: "operational",
      lastUpdated: new Date("2024-01-20"),
    },
    {
      id: "metric-3",
      name: "Average Deal Size",
      value: 1800000,
      previousValue: 1650000,
      unit: "USD",
      trend: "up",
      category: "financial",
      lastUpdated: new Date("2024-01-20"),
    },
    {
      id: "metric-4",
      name: "Time to Decision",
      value: 28,
      previousValue: 35,
      target: 21,
      unit: "days",
      trend: "down",
      category: "efficiency",
      lastUpdated: new Date("2024-01-20"),
    },
  ])

  const handleCreateDashboard = async (name: string, description: string) => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newDashboard = {
        id: `dashboard-${Date.now()}`,
        name,
        description,
      }

      setDashboards([...dashboards, newDashboard])

      toast({
        title: "Dashboard created",
        description: "New dashboard has been created successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create dashboard",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateReport = async (reportId: string) => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setReports(reports.map((report) => (report.id === reportId ? { ...report, lastGenerated: new Date() } : report)))

      toast({
        title: "Report generated",
        description: "Report has been generated and sent to recipients",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate report",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatPercentage = (value: number) => {
    return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`
  }

  const calculateChange = (current: number, previous: number) => {
    return ((current - previous) / previous) * 100
  }

  const getMetricIcon = (category: string) => {
    switch (category) {
      case "financial":
        return DollarSign
      case "operational":
        return Activity
      case "growth":
        return TrendingUp
      case "efficiency":
        return Target
      default:
        return BarChart3
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Advanced Analytics</h1>
          <p className="text-muted-foreground">Comprehensive analytics and reporting platform</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Dashboard
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard">Dashboards</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="visualizations">Visualizations</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Select value={selectedDashboard} onValueChange={setSelectedDashboard}>
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Select dashboard" />
                </SelectTrigger>
                <SelectContent>
                  {dashboards.map((dashboard) => (
                    <SelectItem key={dashboard.id} value={dashboard.id}>
                      {dashboard.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <DatePickerWithRange />
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => setIsEditMode(!isEditMode)}>
                <Settings className="mr-2 h-4 w-4" />
                {isEditMode ? "Done" : "Edit"}
              </Button>
              <Button variant="outline" size="sm">
                <Share className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          <div className="grid gap-6">
            {/* Key Metrics Row */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {performanceMetrics.slice(0, 4).map((metric) => {
                const Icon = getMetricIcon(metric.category)
                const change = calculateChange(metric.value, metric.previousValue)
                const isPositive = metric.trend === "up" ? change > 0 : change < 0

                return (
                  <Card key={metric.id}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {metric.unit === "USD" ? formatCurrency(metric.value) : metric.value.toLocaleString()}
                        {metric.unit !== "USD" && metric.unit !== "count" && ` ${metric.unit}`}
                      </div>
                      <div className="flex items-center space-x-2 text-xs">
                        {isPositive ? (
                          <TrendingUp className="h-3 w-3 text-green-500" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-red-500" />
                        )}
                        <span className={isPositive ? "text-green-600" : "text-red-600"}>
                          {formatPercentage(Math.abs(change))}
                        </span>
                        <span className="text-muted-foreground">from last period</span>
                      </div>
                      {metric.target && (
                        <div className="mt-2">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Progress to target</span>
                            <span>{Math.round((metric.value / metric.target) * 100)}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                            <div
                              className="bg-primary h-1.5 rounded-full"
                              style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Charts Row */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Performance Trend</CardTitle>
                  <CardDescription>Monthly portfolio value over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
                    <div className="text-center space-y-2">
                      <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground" />
                      <p className="text-muted-foreground">Portfolio performance chart would be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Investment Distribution</CardTitle>
                  <CardDescription>Allocation by stage and sector</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
                    <div className="text-center space-y-2">
                      <PieChart className="h-12 w-12 mx-auto text-muted-foreground" />
                      <p className="text-muted-foreground">Investment distribution chart would be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Additional Widgets */}
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Startups</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "TechFlow Solutions", growth: 45, value: "$2.5M" },
                      { name: "AI Innovations", growth: 38, value: "$1.8M" },
                      { name: "GreenTech Labs", growth: 32, value: "$1.2M" },
                    ].map((startup, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{startup.name}</p>
                          <p className="text-sm text-muted-foreground">{startup.value} valuation</p>
                        </div>
                        <div className="flex items-center text-green-600">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          <span className="text-sm font-medium">{startup.growth}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: "Investment approved", company: "TechFlow Solutions", time: "2 hours ago" },
                      { action: "Milestone completed", company: "AI Innovations", time: "1 day ago" },
                      { action: "Report generated", company: "Portfolio Summary", time: "2 days ago" },
                    ].map((activity, index) => (
                      <div key={index} className="space-y-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.company} • {activity.time}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Milestones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { title: "Series A Closing", company: "TechFlow", date: "Feb 15" },
                      { title: "Product Launch", company: "AI Innovations", date: "Feb 20" },
                      { title: "Board Meeting", company: "GreenTech", date: "Feb 25" },
                    ].map((milestone, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{milestone.title}</p>
                          <p className="text-xs text-muted-foreground">{milestone.company}</p>
                        </div>
                        <Badge variant="outline">{milestone.date}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Automated Reports</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Report
            </Button>
          </div>

          <div className="grid gap-6">
            {reports.map((report) => (
              <Card key={report.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold">{report.name}</h3>
                        <Badge variant="outline">{report.category}</Badge>
                        <Badge
                          className={
                            report.status === "active"
                              ? "bg-green-100 text-green-800"
                              : report.status === "paused"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                          }
                        >
                          {report.status}
                        </Badge>
                      </div>

                      <p className="text-muted-foreground">{report.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Schedule:</span>
                          <p className="font-medium capitalize">{report.schedule}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Format:</span>
                          <p className="font-medium uppercase">{report.template.format}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Recipients:</span>
                          <p className="font-medium">{report.recipients.length} people</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Last Generated:</span>
                          <p className="font-medium">
                            {report.lastGenerated ? report.lastGenerated.toLocaleDateString() : "Never"}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Report Sections</h4>
                        <div className="flex flex-wrap gap-1">
                          {report.template.sections.map((section) => (
                            <Badge key={section.id} variant="secondary" className="text-xs">
                              {section.title}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {report.nextScheduled && (
                        <div className="flex items-center space-x-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            Next scheduled: {report.nextScheduled.toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleGenerateReport(report.id)}
                        disabled={loading}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Generate Now
                      </Button>
                      <Button size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        Configure
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="visualizations" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Data Visualizations</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Visualization
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {visualizations.map((viz) => (
              <Card key={viz.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{viz.name}</CardTitle>
                      <CardDescription>
                        {viz.type.charAt(0).toUpperCase() + viz.type.slice(1)} chart • {viz.dataSource}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">{viz.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
                    <div className="text-center space-y-2">
                      {viz.type === "pie" ? (
                        <PieChart className="h-12 w-12 mx-auto text-muted-foreground" />
                      ) : (
                        <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground" />
                      )}
                      <p className="text-muted-foreground">{viz.config.title}</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Data Source:</span>
                      <span>{viz.dataSource}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">X-Axis:</span>
                      <span>{viz.xAxis}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Y-Axis:</span>
                      <span>{viz.yAxis.join(", ")}</span>
                    </div>
                  </div>

                  {viz.filters.length > 0 && (
                    <div className="mt-4">
                      <h5 className="text-sm font-medium mb-2">Active Filters</h5>
                      <div className="flex flex-wrap gap-1">
                        {viz.filters.map((filter, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {filter.label}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Settings className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Performance Metrics</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Metric
            </Button>
          </div>

          <div className="grid gap-4">
            {performanceMetrics.map((metric) => {
              const Icon = getMetricIcon(metric.category)
              const change = calculateChange(metric.value, metric.previousValue)
              const isPositive = metric.trend === "up" ? change > 0 : change < 0

              return (
                <Card key={metric.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-muted rounded-lg">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{metric.name}</h3>
                          <p className="text-sm text-muted-foreground capitalize">{metric.category}</p>
                        </div>
                      </div>

                      <div className="text-right space-y-1">
                        <div className="text-2xl font-bold">
                          {metric.unit === "USD" ? formatCurrency(metric.value) : metric.value.toLocaleString()}
                          {metric.unit !== "USD" && metric.unit !== "count" && ` ${metric.unit}`}
                        </div>
                        <div className="flex items-center space-x-2">
                          {isPositive ? (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-500" />
                          )}
                          <span className={`text-sm ${isPositive ? "text-green-600" : "text-red-600"}`}>
                            {formatPercentage(Math.abs(change))}
                          </span>
                        </div>
                      </div>
                    </div>

                    {metric.target && (
                      <div className="mt-4">
                        <div className="flex justify-between text-sm text-muted-foreground mb-2">
                          <span>Progress to target</span>
                          <span>
                            {metric.unit === "USD" ? formatCurrency(metric.target) : metric.target.toLocaleString()}
                            {metric.unit !== "USD" && metric.unit !== "count" && ` ${metric.unit}`}
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {Math.round((metric.value / metric.target) * 100)}% of target achieved
                        </p>
                      </div>
                    )}

                    <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                      <span>Last updated: {metric.lastUpdated.toLocaleDateString()}</span>
                      <Button size="sm" variant="ghost">
                        <Settings className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">AI-Powered Insights</h2>
            <Button>
              <Activity className="mr-2 h-4 w-4" />
              Generate Insights
            </Button>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
                <CardDescription>AI-generated insights from your data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      type: "opportunity",
                      title: "Portfolio Diversification Opportunity",
                      description:
                        "Your portfolio is heavily weighted towards SaaS companies (65%). Consider diversifying into HealthTech or CleanTech for better risk distribution.",
                      confidence: 85,
                      impact: "Medium",
                    },
                    {
                      type: "warning",
                      title: "Funding Velocity Decline",
                      description:
                        "Average time from application to funding decision has increased by 23% over the last quarter. Consider streamlining the review process.",
                      confidence: 92,
                      impact: "High",
                    },
                    {
                      type: "success",
                      title: "Strong Portfolio Performance",
                      description:
                        "Your portfolio companies are outperforming market benchmarks by 18% on average. Top performers are in AI/ML and FinTech sectors.",
                      confidence: 96,
                      impact: "High",
                    },
                  ].map((insight, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{insight.title}</h4>
                            <Badge
                              variant={
                                insight.type === "opportunity"
                                  ? "default"
                                  : insight.type === "warning"
                                    ? "destructive"
                                    : "secondary"
                              }
                            >
                              {insight.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{insight.description}</p>
                          <div className="flex items-center space-x-4 text-xs">
                            <span className="text-muted-foreground">Confidence: {insight.confidence}%</span>
                            <span className="text-muted-foreground">Impact: {insight.impact}</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Predictive Analytics</CardTitle>
                  <CardDescription>Forecasts based on historical data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Portfolio Value Forecast</h4>
                      <div className="text-2xl font-bold text-green-600">$52.3M</div>
                      <p className="text-xs text-muted-foreground">Projected value in 12 months (+16.2%)</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Expected Exits</h4>
                      <div className="text-2xl font-bold">3-4</div>
                      <p className="text-xs text-muted-foreground">Companies likely to exit in next 18 months</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Funding Requirements</h4>
                      <div className="text-2xl font-bold">$8.5M</div>
                      <p className="text-xs text-muted-foreground">Estimated follow-on funding needed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Risk Analysis</CardTitle>
                  <CardDescription>Potential risks and mitigation strategies</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { risk: "Market Concentration", level: "Medium", companies: 3 },
                      { risk: "Funding Gap", level: "Low", companies: 1 },
                      { risk: "Team Turnover", level: "High", companies: 2 },
                    ].map((risk, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{risk.risk}</p>
                          <p className="text-xs text-muted-foreground">{risk.companies} companies affected</p>
                        </div>
                        <Badge
                          variant={
                            risk.level === "High" ? "destructive" : risk.level === "Medium" ? "default" : "secondary"
                          }
                        >
                          {risk.level}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
