"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StandardizedPageLayout } from "@/components/standardized-page-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts"
import { Plus, AlertTriangle, TrendingUp, Shield, Target, Eye } from "lucide-react"

const riskMetrics = [
  { category: "Operational Risk", score: 85, trend: "improving", impact: "medium" },
  { category: "Compliance Risk", score: 92, trend: "stable", impact: "high" },
  { category: "Financial Risk", score: 78, trend: "declining", impact: "high" },
  { category: "Cybersecurity Risk", score: 88, trend: "improving", impact: "critical" },
  { category: "Regulatory Risk", score: 94, trend: "stable", impact: "high" },
  { category: "Reputational Risk", score: 82, trend: "improving", impact: "medium" },
]

const riskTrends = [
  { month: "Jul", operational: 82, compliance: 89, financial: 75, cyber: 85 },
  { month: "Aug", operational: 84, compliance: 91, financial: 76, cyber: 86 },
  { month: "Sep", operational: 83, compliance: 90, financial: 77, cyber: 87 },
  { month: "Oct", operational: 85, compliance: 92, financial: 78, cyber: 88 },
  { month: "Nov", operational: 85, compliance: 92, financial: 78, cyber: 88 },
  { month: "Dec", operational: 85, compliance: 92, financial: 78, cyber: 88 },
]

const riskDistribution = [
  { name: "Low Risk", value: 45, color: "#10b981" },
  { name: "Medium Risk", value: 35, color: "#f59e0b" },
  { name: "High Risk", value: 15, color: "#ef4444" },
  { name: "Critical Risk", value: 5, color: "#dc2626" },
]

const riskEvents = [
  {
    id: "RISK-2024-001",
    title: "Data Breach Vulnerability Detected",
    category: "Cybersecurity",
    severity: "high",
    probability: 65,
    impact: "critical",
    status: "active",
    assignedTo: "IT Security Team",
    dueDate: "2024-01-20",
  },
  {
    id: "RISK-2024-002",
    title: "Regulatory Change Impact Assessment",
    category: "Compliance",
    severity: "medium",
    probability: 80,
    impact: "high",
    status: "monitoring",
    assignedTo: "Legal Team",
    dueDate: "2024-01-25",
  },
  {
    id: "RISK-2024-003",
    title: "Key Personnel Dependency Risk",
    category: "Operational",
    severity: "medium",
    probability: 45,
    impact: "medium",
    status: "mitigated",
    assignedTo: "HR Team",
    dueDate: "2024-01-15",
  },
]

export default function RiskManagementPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-red-100 text-red-800"
      case "monitoring":
        return "bg-yellow-100 text-yellow-800"
      case "mitigated":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-600"
      case "high":
        return "text-orange-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "improving":
        return "text-green-600"
      case "declining":
        return "text-red-600"
      case "stable":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  const overallRiskScore = Math.round(riskMetrics.reduce((acc, risk) => acc + risk.score, 0) / riskMetrics.length)

  return (
    <StandardizedPageLayout
      title="Risk Management"
      description="Predictive analytics and risk assessment tools"
      actions={
        <>
          <Button variant="outline" size="sm">
            <Eye className="mr-2 h-4 w-4" />
            Risk Register
          </Button>
          <Button variant="outline" size="sm">
            <Target className="mr-2 h-4 w-4" />
            Risk Assessment
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Risk Event
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        {/* Overview Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Risk Score</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{overallRiskScore}%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+2%</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Risk Events</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{riskEvents.filter((event) => event.status === "active").length}</div>
              <p className="text-xs text-muted-foreground">
                {riskEvents.filter((event) => event.severity === "high").length} high severity
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Risk Trend</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Improving</div>
              <p className="text-xs text-muted-foreground">4 of 6 categories improving</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Risks</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Requires immediate attention</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Risk Overview</TabsTrigger>
            <TabsTrigger value="events">Risk Events</TabsTrigger>
            <TabsTrigger value="analytics">Risk Analytics</TabsTrigger>
            <TabsTrigger value="mitigation">Mitigation Plans</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Risk Category Assessment</CardTitle>
                  <CardDescription>Current risk scores across all categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {riskMetrics.map((risk, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{risk.category}</span>
                            <Badge variant="outline" className={getSeverityColor(risk.impact)}>
                              {risk.impact}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{risk.score}%</span>
                            <span className={`text-xs ${getTrendColor(risk.trend)}`}>{risk.trend}</span>
                          </div>
                        </div>
                        <Progress value={risk.score} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Risk Distribution</CardTitle>
                  <CardDescription>Current risk level distribution across the organization</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={riskDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {riskDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, ""]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {riskDistribution.map((risk, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: risk.color }} />
                        <span className="text-xs">{risk.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Risk Events</CardTitle>
                <CardDescription>Current risk events requiring attention and monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {riskEvents.map((event) => (
                    <div key={event.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{event.title}</h3>
                            <Badge variant="outline">{event.category}</Badge>
                            <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Assigned to: {event.assignedTo}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="mr-2 h-4 w-4" />
                            Details
                          </Button>
                          <Button size="sm">Update</Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Severity:</span>
                          <p className={`font-medium ${getSeverityColor(event.severity)}`}>{event.severity}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Probability:</span>
                          <p className="font-medium">{event.probability}%</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Impact:</span>
                          <p className={`font-medium ${getSeverityColor(event.impact)}`}>{event.impact}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Due Date:</span>
                          <p className="font-medium">{event.dueDate}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Risk Trends Over Time</CardTitle>
                  <CardDescription>Monthly risk score trends by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={riskTrends}>
                        <defs>
                          <linearGradient id="colorOperational" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorCompliance" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[70, 100]} />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="operational"
                          stroke="#3b82f6"
                          fill="url(#colorOperational)"
                          name="Operational"
                        />
                        <Area
                          type="monotone"
                          dataKey="compliance"
                          stroke="#10b981"
                          fill="url(#colorCompliance)"
                          name="Compliance"
                        />
                        <Area type="monotone" dataKey="financial" stroke="#f59e0b" fill="none" name="Financial" />
                        <Area type="monotone" dataKey="cyber" stroke="#ef4444" fill="none" name="Cybersecurity" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Risk Impact Analysis</CardTitle>
                  <CardDescription>Risk events by impact and probability</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={riskEvents} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis dataKey="category" type="category" width={100} />
                        <Tooltip />
                        <Bar dataKey="probability" fill="#3b82f6" name="Probability %" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="mitigation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Mitigation Plans</CardTitle>
                <CardDescription>Active mitigation strategies and their effectiveness</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Cybersecurity Enhancement Program</h3>
                      <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Comprehensive security upgrade including multi-factor authentication, endpoint protection, and
                      security awareness training.
                    </p>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Regulatory Compliance Monitoring</h3>
                      <Badge className="bg-green-100 text-green-800">Completed</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Implementation of automated compliance monitoring system with real-time alerts and reporting.
                    </p>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Business Continuity Planning</h3>
                      <Badge className="bg-yellow-100 text-yellow-800">Planning</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Development of comprehensive business continuity and disaster recovery plans for critical
                      operations.
                    </p>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>25%</span>
                    </div>
                    <Progress value={25} className="h-2" />
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
