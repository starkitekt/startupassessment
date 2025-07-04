"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StandardizedPageLayout } from "@/components/standardized-page-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Plus, Download, CalendarIcon, BarChart3, FileText, Eye, Settings, Share } from "lucide-react"
import { useState } from "react"

const reportTemplates = [
  {
    id: "RPT-001",
    name: "Monthly Compliance Report",
    description: "Comprehensive monthly compliance status across all modules",
    category: "Compliance",
    frequency: "Monthly",
    lastGenerated: "2024-01-01",
    status: "active",
  },
  {
    id: "RPT-002",
    name: "Risk Assessment Report",
    description: "Detailed risk analysis and mitigation strategies",
    category: "Risk Management",
    frequency: "Quarterly",
    lastGenerated: "2023-12-31",
    status: "active",
  },
  {
    id: "RPT-003",
    name: "Audit Trail Summary",
    description: "User activity and system events summary",
    category: "Audit",
    frequency: "Weekly",
    lastGenerated: "2024-01-08",
    status: "active",
  },
  {
    id: "RPT-004",
    name: "Tax Compliance Dashboard",
    description: "GST, Income Tax, and TDS compliance overview",
    category: "Taxation",
    frequency: "Monthly",
    lastGenerated: "2024-01-01",
    status: "active",
  },
]

const scheduledReports = [
  {
    id: "SCH-001",
    name: "Weekly Compliance Summary",
    nextRun: "2024-01-15",
    frequency: "Weekly",
    recipients: ["compliance@company.com", "ceo@company.com"],
    status: "scheduled",
  },
  {
    id: "SCH-002",
    name: "Monthly Board Report",
    nextRun: "2024-01-31",
    frequency: "Monthly",
    recipients: ["board@company.com"],
    status: "scheduled",
  },
  {
    id: "SCH-003",
    name: "Quarterly Risk Report",
    nextRun: "2024-03-31",
    frequency: "Quarterly",
    recipients: ["risk@company.com", "audit@company.com"],
    status: "scheduled",
  },
]

const dashboardWidgets = [
  { name: "Compliance Score", type: "metric", value: "94%", trend: "+2%" },
  { name: "Active Risk Events", type: "metric", value: "3", trend: "-1" },
  { name: "Pending Tasks", type: "metric", value: "17", trend: "+5" },
  { name: "Monthly Trends", type: "chart", data: "compliance_trends" },
  { name: "Risk Distribution", type: "chart", data: "risk_pie" },
  { name: "Module Performance", type: "chart", data: "module_bar" },
]

const complianceData = [
  { month: "Jul", score: 89, target: 90 },
  { month: "Aug", score: 91, target: 90 },
  { month: "Sep", score: 88, target: 90 },
  { month: "Oct", score: 92, target: 90 },
  { month: "Nov", score: 94, target: 90 },
  { month: "Dec", score: 94, target: 90 },
]

const modulePerformance = [
  { module: "Corporate", score: 94 },
  { module: "Taxation", score: 88 },
  { module: "Labor Law", score: 96 },
  { module: "Data Privacy", score: 82 },
  { module: "IP Management", score: 90 },
  { module: "POSH", score: 85 },
]

const riskData = [
  { name: "Low Risk", value: 65, color: "#10b981" },
  { name: "Medium Risk", value: 25, color: "#f59e0b" },
  { name: "High Risk", value: 10, color: "#ef4444" },
]

export default function ReportsAnalyticsPage() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [isNewReportOpen, setIsNewReportOpen] = useState(false)
  const [isDashboardOpen, setIsDashboardOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "scheduled":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <StandardizedPageLayout
      title="Reporting & Analytics"
      description="Customizable dashboards and automated report generation"
      actions={
        <>
          <Dialog open={isDashboardOpen} onOpenChange={setIsDashboardOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <BarChart3 className="mr-2 h-4 w-4" />
                Custom Dashboard
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create Custom Dashboard</DialogTitle>
                <DialogDescription>Build a personalized dashboard with selected widgets</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Dashboard Name</Label>
                  <Input placeholder="Enter dashboard name" />
                </div>
                <div className="space-y-2">
                  <Label>Select Widgets</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {dashboardWidgets.map((widget, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox id={`widget-${index}`} />
                        <Label htmlFor={`widget-${index}`} className="text-sm">
                          {widget.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Refresh Interval</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select interval" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5min">5 minutes</SelectItem>
                        <SelectItem value="15min">15 minutes</SelectItem>
                        <SelectItem value="30min">30 minutes</SelectItem>
                        <SelectItem value="1hour">1 hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Access Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select access" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="team">Team</SelectItem>
                        <SelectItem value="organization">Organization</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDashboardOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsDashboardOpen(false)}>Create Dashboard</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Schedule Reports
          </Button>
          <Dialog open={isNewReportOpen} onOpenChange={setIsNewReportOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Generate Custom Report</DialogTitle>
                <DialogDescription>Create a new compliance report with custom parameters</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Report Name</Label>
                  <Input placeholder="Enter report name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Report Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compliance">Compliance Overview</SelectItem>
                        <SelectItem value="risk">Risk Assessment</SelectItem>
                        <SelectItem value="audit">Audit Summary</SelectItem>
                        <SelectItem value="custom">Custom Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Format</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="html">HTML</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date From</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>Date To</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          Pick a date
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Include Modules</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Corporate", "Taxation", "Labor Law", "Data Privacy", "IP Management", "POSH"].map(
                      (module, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Checkbox id={`module-${index}`} defaultChecked />
                          <Label htmlFor={`module-${index}`} className="text-sm">
                            {module}
                          </Label>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsNewReportOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsNewReportOpen(false)}>Generate Report</Button>
              </div>
            </DialogContent>
          </Dialog>
        </>
      }
    >
      <div className="space-y-6">
        <Tabs defaultValue="dashboards" className="space-y-6">
          <TabsList>
            <TabsTrigger value="dashboards">Dashboards</TabsTrigger>
            <TabsTrigger value="reports">Report Templates</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboards" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Trends</CardTitle>
                  <CardDescription>Monthly compliance score vs target</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={complianceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[80, 100]} />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="score"
                          stroke="#3b82f6"
                          name="Compliance Score"
                          strokeWidth={2}
                        />
                        <Line type="monotone" dataKey="target" stroke="#10b981" name="Target" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Module Performance</CardTitle>
                  <CardDescription>Compliance scores by module</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={modulePerformance}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="module" />
                        <YAxis domain={[70, 100]} />
                        <Tooltip />
                        <Bar dataKey="score" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Risk Distribution</CardTitle>
                  <CardDescription>Current risk levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={riskData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {riskData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, ""]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-1 gap-1 mt-4">
                    {riskData.map((risk, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: risk.color }} />
                          <span className="text-sm">{risk.name}</span>
                        </div>
                        <span className="text-sm font-medium">{risk.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Metrics</CardTitle>
                  <CardDescription>Current performance indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Compliance Score</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">94%</span>
                      <span className="text-xs text-green-600">+2%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Active Risks</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">3</span>
                      <span className="text-xs text-green-600">-1</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Pending Tasks</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">17</span>
                      <span className="text-xs text-red-600">+5</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Documents</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">208</span>
                      <span className="text-xs text-blue-600">+12</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest compliance actions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                    <div>
                      <p className="text-sm font-medium">GST Return Filed</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                    <div>
                      <p className="text-sm font-medium">Board Meeting Scheduled</p>
                      <p className="text-xs text-muted-foreground">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
                    <div>
                      <p className="text-sm font-medium">Risk Assessment Updated</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                    <div>
                      <p className="text-sm font-medium">Patent Application Submitted</p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Report Templates</CardTitle>
                <CardDescription>Pre-configured report templates for common compliance needs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportTemplates.map((template) => (
                    <div key={template.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{template.name}</h3>
                            <Badge variant="outline">{template.category}</Badge>
                            <Badge className={getStatusColor(template.status)}>{template.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{template.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                          </Button>
                          <Button size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Generate
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                        <div>
                          <span>Frequency:</span>
                          <p className="font-medium">{template.frequency}</p>
                        </div>
                        <div>
                          <span>Last Generated:</span>
                          <p className="font-medium">{template.lastGenerated}</p>
                        </div>
                        <div>
                          <span>Template ID:</span>
                          <p className="font-medium">{template.id}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scheduled" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Reports</CardTitle>
                <CardDescription>Automated report generation and distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scheduledReports.map((report) => (
                    <div key={report.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{report.name}</h3>
                            <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Recipients: {report.recipients.join(", ")}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Settings className="mr-2 h-4 w-4" />
                            Configure
                          </Button>
                          <Button size="sm" variant="outline">
                            <Share className="mr-2 h-4 w-4" />
                            Share
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Next Run:</span>
                          <p className="font-medium">{report.nextRun}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Frequency:</span>
                          <p className="font-medium">{report.frequency}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Recipients:</span>
                          <p className="font-medium">{report.recipients.length} users</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Reports Generated</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+12%</span> from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Scheduled Reports</CardTitle>
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">3 running today</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Dashboard Views</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,847</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+18%</span> from last week
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Data Export</CardTitle>
                  <Download className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89</div>
                  <p className="text-xs text-muted-foreground">45 PDF, 44 Excel</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Report Usage Analytics</CardTitle>
                <CardDescription>Most frequently generated reports and usage patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <h3 className="font-medium">Monthly Compliance Report</h3>
                      <p className="text-sm text-muted-foreground">Generated 24 times this quarter</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">24</div>
                      <div className="text-xs text-muted-foreground">generations</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <h3 className="font-medium">Risk Assessment Report</h3>
                      <p className="text-sm text-muted-foreground">Generated 18 times this quarter</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">18</div>
                      <div className="text-xs text-muted-foreground">generations</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <h3 className="font-medium">Audit Trail Summary</h3>
                      <p className="text-sm text-muted-foreground">Generated 15 times this quarter</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-yellow-600">15</div>
                      <div className="text-xs text-muted-foreground">generations</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </StandardizedPageLayout>
  )
}
