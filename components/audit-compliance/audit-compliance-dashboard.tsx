"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
} from "recharts"
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Building2,
  Calculator,
  Users,
  Lock,
  Award,
  UserCheck,
  Calendar,
  Bell,
} from "lucide-react"
import { CorporateComplianceModule } from "./corporate-compliance-module"
import { TaxationComplianceModule } from "./taxation-compliance-module"
import { LaborLawComplianceModule } from "./labor-law-compliance-module"
import { DataPrivacyComplianceModule } from "./data-privacy-compliance-module"
import { IPManagementModule } from "./ip-management-module"
import { POSHComplianceModule } from "./posh-compliance-module"
import { AuditTrailSystem } from "./audit-trail-system"

const complianceHealthData = [
  { name: "Jan", score: 78, target: 85 },
  { name: "Feb", score: 82, target: 85 },
  { name: "Mar", score: 85, target: 85 },
  { name: "Apr", score: 88, target: 85 },
  { name: "May", score: 91, target: 85 },
  { name: "Jun", score: 94, target: 85 },
]

const complianceModules = [
  {
    name: "Corporate Governance",
    score: 94,
    status: "compliant",
    lastUpdated: "2 days ago",
    pendingTasks: 2,
    icon: Building2,
    color: "#10b981",
  },
  {
    name: "Taxation",
    score: 88,
    status: "attention",
    lastUpdated: "1 day ago",
    pendingTasks: 5,
    icon: Calculator,
    color: "#f59e0b",
  },
  {
    name: "Labor Law",
    score: 96,
    status: "compliant",
    lastUpdated: "3 days ago",
    pendingTasks: 1,
    icon: Users,
    color: "#10b981",
  },
  {
    name: "Data Privacy (DPDPA)",
    score: 82,
    status: "attention",
    lastUpdated: "1 day ago",
    pendingTasks: 4,
    icon: Lock,
    color: "#f59e0b",
  },
  {
    name: "Intellectual Property",
    score: 90,
    status: "compliant",
    lastUpdated: "5 days ago",
    pendingTasks: 2,
    icon: Award,
    color: "#10b981",
  },
  {
    name: "POSH Compliance",
    score: 85,
    status: "compliant",
    lastUpdated: "1 week ago",
    pendingTasks: 3,
    icon: UserCheck,
    color: "#10b981",
  },
]

const riskDistribution = [
  { name: "Low Risk", value: 65, count: 13, color: "#10b981" },
  { name: "Medium Risk", value: 25, count: 5, color: "#f59e0b" },
  { name: "High Risk", value: 10, count: 2, color: "#ef4444" },
]

const upcomingDeadlines = [
  {
    id: 1,
    title: "GST Return Filing (GSTR-3B)",
    dueDate: "2024-01-20",
    category: "Taxation",
    priority: "high",
    daysLeft: 3,
  },
  {
    id: 2,
    title: "Annual Return (Form MGT-7)",
    dueDate: "2024-01-25",
    category: "Corporate",
    priority: "medium",
    daysLeft: 8,
  },
  {
    id: 3,
    title: "EPF Monthly Return",
    dueDate: "2024-01-15",
    category: "Labor Law",
    priority: "high",
    daysLeft: 1,
  },
  {
    id: 4,
    title: "Data Breach Assessment Report",
    dueDate: "2024-01-30",
    category: "Data Privacy",
    priority: "medium",
    daysLeft: 13,
  },
]

const recentActivities = [
  {
    id: 1,
    action: "GST Return Filed Successfully",
    module: "Taxation",
    timestamp: "2 hours ago",
    user: "Priya Sharma",
    status: "success",
  },
  {
    id: 2,
    action: "Board Meeting Minutes Updated",
    module: "Corporate",
    timestamp: "5 hours ago",
    user: "Rajesh Kumar",
    status: "success",
  },
  {
    id: 3,
    action: "Data Processing Agreement Reviewed",
    module: "Data Privacy",
    timestamp: "1 day ago",
    user: "Anita Desai",
    status: "pending",
  },
  {
    id: 4,
    action: "Patent Application Status Updated",
    module: "IP Management",
    timestamp: "2 days ago",
    user: "Vikram Singh",
    status: "success",
  },
]

export function AuditComplianceDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant":
        return "bg-green-100 text-green-800"
      case "attention":
        return "bg-yellow-100 text-yellow-800"
      case "critical":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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

  const getActivityStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const overallComplianceScore = Math.round(
    complianceModules.reduce((acc, module) => acc + module.score, 0) / complianceModules.length,
  )

  return (
    <div className="space-y-6">
      {/* Header Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Compliance Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{overallComplianceScore}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+3%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">17</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">5 high priority</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">Medium</div>
            <p className="text-xs text-muted-foreground">2 high-risk items</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Deadline</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1 Day</div>
            <p className="text-xs text-muted-foreground">EPF Monthly Return</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="corporate">Corporate</TabsTrigger>
          <TabsTrigger value="taxation">Taxation</TabsTrigger>
          <TabsTrigger value="labor">Labor Law</TabsTrigger>
          <TabsTrigger value="privacy">Data Privacy</TabsTrigger>
          <TabsTrigger value="ip">IP Management</TabsTrigger>
          <TabsTrigger value="posh">POSH</TabsTrigger>
          <TabsTrigger value="audit-trail">Audit Trail</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Compliance Health Trend */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Health Trend</CardTitle>
                <CardDescription>Monthly compliance score vs target</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={complianceHealthData}>
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[70, 100]} />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="score"
                        stroke="#3b82f6"
                        fill="url(#colorScore)"
                        name="Compliance Score"
                      />
                      <Area type="monotone" dataKey="target" stroke="#10b981" fill="none" name="Target" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Distribution</CardTitle>
                <CardDescription>Current risk assessment across all modules</CardDescription>
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
                      <Tooltip
                        formatter={(value, name) => [
                          `${value}% (${riskDistribution.find((d) => d.name === name)?.count} items)`,
                          name,
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4">
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

          {/* Compliance Modules Status */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance Modules Status</CardTitle>
              <CardDescription>Current status across all compliance areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {complianceModules.map((module, index) => {
                  const IconComponent = module.icon
                  return (
                    <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-5 w-5" style={{ color: module.color }} />
                          <h3 className="font-medium">{module.name}</h3>
                        </div>
                        <Badge className={getStatusColor(module.status)}>{module.status}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Compliance Score</span>
                          <span className="font-medium">{module.score}%</span>
                        </div>
                        <Progress value={module.score} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Last updated: {module.lastUpdated}</span>
                          <span>{module.pendingTasks} pending tasks</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Deadlines and Recent Activities */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-orange-500" />
                  Upcoming Deadlines
                </CardTitle>
                <CardDescription>Critical compliance deadlines requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingDeadlines.map((deadline) => (
                    <div key={deadline.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{deadline.title}</h4>
                        <p className="text-xs text-muted-foreground">{deadline.category}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${getPriorityColor(deadline.priority)}`}>
                          {deadline.daysLeft} days left
                        </div>
                        <div className="text-xs text-muted-foreground">{deadline.dueDate}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest compliance actions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="mt-1">{getActivityStatusIcon(activity.status)}</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-muted-foreground">{activity.module}</span>
                          <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">by {activity.user}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="corporate">
          <CorporateComplianceModule />
        </TabsContent>

        <TabsContent value="taxation">
          <TaxationComplianceModule />
        </TabsContent>

        <TabsContent value="labor">
          <LaborLawComplianceModule />
        </TabsContent>

        <TabsContent value="privacy">
          <DataPrivacyComplianceModule />
        </TabsContent>

        <TabsContent value="ip">
          <IPManagementModule />
        </TabsContent>

        <TabsContent value="posh">
          <POSHComplianceModule />
        </TabsContent>

        <TabsContent value="audit-trail">
          <AuditTrailSystem />
        </TabsContent>
      </Tabs>
    </div>
  )
}
