"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import {
  ResponsiveContainer,
  LineChart,
  Line,
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
import { Search, Filter, Download, Eye, CalendarIcon, Activity, Users, Shield, AlertTriangle } from "lucide-react"

const auditLogs = [
  {
    id: "LOG-2024-001234",
    timestamp: "2024-01-12 14:30:25",
    user: "priya.sharma@company.com",
    action: "GST Return Filed",
    module: "Taxation",
    details: "GSTR-3B for December 2023 filed successfully",
    ipAddress: "192.168.1.45",
    userAgent: "Chrome 120.0.0.0",
    status: "success",
    riskLevel: "low",
  },
  {
    id: "LOG-2024-001235",
    timestamp: "2024-01-12 14:25:10",
    user: "rajesh.kumar@company.com",
    action: "Board Meeting Minutes Updated",
    module: "Corporate",
    details: "Q4 board meeting minutes uploaded and approved",
    ipAddress: "192.168.1.32",
    userAgent: "Chrome 120.0.0.0",
    status: "success",
    riskLevel: "medium",
  },
  {
    id: "LOG-2024-001236",
    timestamp: "2024-01-12 14:20:45",
    user: "anita.desai@company.com",
    action: "Data Processing Agreement Modified",
    module: "Data Privacy",
    details: "Updated DPA with new vendor - TechSolutions Ltd",
    ipAddress: "192.168.1.28",
    userAgent: "Firefox 121.0.0.0",
    status: "success",
    riskLevel: "high",
  },
  {
    id: "LOG-2024-001237",
    timestamp: "2024-01-12 14:15:30",
    user: "system@company.com",
    action: "Automated Backup Failed",
    module: "System",
    details: "Daily compliance data backup failed - storage full",
    ipAddress: "127.0.0.1",
    userAgent: "System Process",
    status: "error",
    riskLevel: "high",
  },
  {
    id: "LOG-2024-001238",
    timestamp: "2024-01-12 14:10:15",
    user: "vikram.singh@company.com",
    action: "Patent Application Submitted",
    module: "IP Management",
    details: "New patent application for AI recommendation engine",
    ipAddress: "192.168.1.55",
    userAgent: "Safari 17.2.0",
    status: "success",
    riskLevel: "low",
  },
]

const userActivity = [
  {
    user: "priya.sharma@company.com",
    role: "Compliance Manager",
    lastLogin: "2024-01-12 14:30:00",
    actionsToday: 15,
    totalActions: 342,
    riskScore: 2,
    status: "active",
  },
  {
    user: "rajesh.kumar@company.com",
    role: "Legal Counsel",
    lastLogin: "2024-01-12 14:25:00",
    actionsToday: 8,
    totalActions: 198,
    riskScore: 1,
    status: "active",
  },
  {
    user: "anita.desai@company.com",
    role: "Data Protection Officer",
    lastLogin: "2024-01-12 14:20:00",
    actionsToday: 12,
    totalActions: 267,
    riskScore: 3,
    status: "active",
  },
  {
    user: "vikram.singh@company.com",
    role: "IP Manager",
    lastLogin: "2024-01-12 14:10:00",
    actionsToday: 5,
    totalActions: 89,
    riskScore: 1,
    status: "active",
  },
]

const systemEvents = [
  {
    id: "SYS-2024-001",
    timestamp: "2024-01-12 14:35:00",
    event: "Database Connection Pool Exhausted",
    severity: "high",
    module: "System",
    description: "Maximum database connections reached during peak usage",
    resolved: false,
    impact: "Performance degradation",
  },
  {
    id: "SYS-2024-002",
    timestamp: "2024-01-12 14:30:00",
    event: "SSL Certificate Renewal",
    severity: "medium",
    module: "Security",
    description: "SSL certificate renewed for compliance.company.com",
    resolved: true,
    impact: "None",
  },
  {
    id: "SYS-2024-003",
    timestamp: "2024-01-12 14:25:00",
    event: "Failed Login Attempts Detected",
    severity: "medium",
    module: "Security",
    description: "Multiple failed login attempts from IP 203.0.113.45",
    resolved: true,
    impact: "Security alert triggered",
  },
]

const complianceMetrics = [
  { date: "2024-01-08", actions: 45, errors: 2, users: 12 },
  { date: "2024-01-09", actions: 52, errors: 1, users: 14 },
  { date: "2024-01-10", actions: 38, errors: 3, users: 11 },
  { date: "2024-01-11", actions: 61, errors: 0, users: 15 },
  { date: "2024-01-12", actions: 48, errors: 1, users: 13 },
]

const moduleActivity = [
  { module: "Taxation", actions: 156, percentage: 32 },
  { module: "Corporate", actions: 98, percentage: 20 },
  { module: "Data Privacy", actions: 87, percentage: 18 },
  { module: "Labor Law", actions: 76, percentage: 16 },
  { module: "IP Management", actions: 45, percentage: 9 },
  { module: "POSH", actions: 25, percentage: 5 },
]

const riskDistribution = [
  { name: "Low Risk", value: 65, color: "#10b981" },
  { name: "Medium Risk", value: 25, color: "#f59e0b" },
  { name: "High Risk", value: 10, color: "#ef4444" },
]

export function AuditTrailSystem() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedModule, setSelectedModule] = useState("all")
  const [selectedUser, setSelectedUser] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return "text-green-600"
      case "medium":
        return "text-yellow-600"
      case "high":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "text-green-600"
      case "medium":
        return "text-yellow-600"
      case "high":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesModule = selectedModule === "all" || log.module === selectedModule
    const matchesUser = selectedUser === "all" || log.user === selectedUser
    return matchesSearch && matchesModule && matchesUser
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Audit Trail System</h2>
          <p className="text-muted-foreground">Comprehensive audit logging and compliance monitoring</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Advanced Filter
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Advanced Audit Log Filters</DialogTitle>
                <DialogDescription>Filter audit logs by various criteria</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Risk Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select risk level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="low">Low Risk</SelectItem>
                        <SelectItem value="medium">Medium Risk</SelectItem>
                        <SelectItem value="high">High Risk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="success">Success</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>IP Address</Label>
                  <Input placeholder="Enter IP address or range" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsFilterOpen(false)}>
                  Clear
                </Button>
                <Button onClick={() => setIsFilterOpen(false)}>Apply Filters</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Logs
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Actions Today</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">13</div>
            <p className="text-xs text-muted-foreground">4 users online now</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Events</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">1 unresolved</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.1%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">-0.5%</span> from last week
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="logs" className="space-y-6">
        <TabsList>
          <TabsTrigger value="logs">Audit Logs</TabsTrigger>
          <TabsTrigger value="users">User Activity</TabsTrigger>
          <TabsTrigger value="system">System Events</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="logs" className="space-y-6">
          {/* Search and Filter Bar */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search audit logs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedModule} onValueChange={setSelectedModule}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="All Modules" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Modules</SelectItem>
                    <SelectItem value="Taxation">Taxation</SelectItem>
                    <SelectItem value="Corporate">Corporate</SelectItem>
                    <SelectItem value="Data Privacy">Data Privacy</SelectItem>
                    <SelectItem value="Labor Law">Labor Law</SelectItem>
                    <SelectItem value="IP Management">IP Management</SelectItem>
                    <SelectItem value="POSH">POSH</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedUser} onValueChange={setSelectedUser}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="All Users" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="priya.sharma@company.com">Priya Sharma</SelectItem>
                    <SelectItem value="rajesh.kumar@company.com">Rajesh Kumar</SelectItem>
                    <SelectItem value="anita.desai@company.com">Anita Desai</SelectItem>
                    <SelectItem value="vikram.singh@company.com">Vikram Singh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Audit Logs Table */}
          <Card>
            <CardHeader>
              <CardTitle>Audit Log Entries</CardTitle>
              <CardDescription>Detailed audit trail of all compliance activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredLogs.map((log) => (
                  <div key={log.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{log.action}</h3>
                          <Badge variant="outline">{log.module}</Badge>
                          <Badge className={getStatusColor(log.status)}>{log.status}</Badge>
                          <span className={`text-xs font-medium ${getRiskColor(log.riskLevel)}`}>
                            {log.riskLevel} risk
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{log.details}</p>
                        <div className="grid grid-cols-4 gap-4 text-xs text-muted-foreground">
                          <div>
                            <span>User:</span>
                            <p className="font-medium">{log.user}</p>
                          </div>
                          <div>
                            <span>Timestamp:</span>
                            <p className="font-medium">{log.timestamp}</p>
                          </div>
                          <div>
                            <span>IP Address:</span>
                            <p className="font-medium">{log.ipAddress}</p>
                          </div>
                          <div>
                            <span>User Agent:</span>
                            <p className="font-medium">{log.userAgent}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="mr-2 h-4 w-4" />
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Activity Monitoring</CardTitle>
              <CardDescription>Track user actions and identify unusual patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userActivity.map((user, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium">{user.user}</h3>
                        <p className="text-sm text-muted-foreground">{user.role}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                        <span
                          className={`text-sm font-medium ${getRiskColor(user.riskScore <= 2 ? "low" : user.riskScore <= 4 ? "medium" : "high")}`}
                        >
                          Risk: {user.riskScore}/5
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Last Login:</span>
                        <p className="font-medium">{user.lastLogin}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Actions Today:</span>
                        <p className="font-medium">{user.actionsToday}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Total Actions:</span>
                        <p className="font-medium">{user.totalActions}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Risk Score:</span>
                        <p
                          className={`font-medium ${getRiskColor(user.riskScore <= 2 ? "low" : user.riskScore <= 4 ? "medium" : "high")}`}
                        >
                          {user.riskScore}/5
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Events & Alerts</CardTitle>
              <CardDescription>Monitor system-level events and security alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemEvents.map((event) => (
                  <div key={event.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{event.event}</h3>
                          <Badge variant="outline">{event.module}</Badge>
                          <span className={`text-xs font-medium ${getSeverityColor(event.severity)}`}>
                            {event.severity} severity
                          </span>
                          {event.resolved && <Badge className="bg-green-100 text-green-800">Resolved</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                        <div className="grid grid-cols-3 gap-4 text-xs text-muted-foreground">
                          <div>
                            <span>Timestamp:</span>
                            <p className="font-medium">{event.timestamp}</p>
                          </div>
                          <div>
                            <span>Impact:</span>
                            <p className="font-medium">{event.impact}</p>
                          </div>
                          <div>
                            <span>Status:</span>
                            <p className={`font-medium ${event.resolved ? "text-green-600" : "text-red-600"}`}>
                              {event.resolved ? "Resolved" : "Unresolved"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="mr-2 h-4 w-4" />
                          Details
                        </Button>
                        {!event.resolved && <Button size="sm">Resolve</Button>}
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
                <CardTitle>Activity Trends</CardTitle>
                <CardDescription>Daily compliance activity and error trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={complianceMetrics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickFormatter={(value) => format(new Date(value), "MMM dd")} />
                      <YAxis />
                      <Tooltip labelFormatter={(value) => format(new Date(value), "PPP")} />
                      <Line type="monotone" dataKey="actions" stroke="#3b82f6" name="Actions" strokeWidth={2} />
                      <Line type="monotone" dataKey="errors" stroke="#ef4444" name="Errors" strokeWidth={2} />
                      <Line type="monotone" dataKey="users" stroke="#10b981" name="Active Users" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Module Activity Distribution</CardTitle>
                <CardDescription>Activity breakdown by compliance module</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={moduleActivity} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="module" type="category" width={100} />
                      <Tooltip />
                      <Bar dataKey="actions" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Risk Distribution</CardTitle>
                <CardDescription>Distribution of actions by risk level</CardDescription>
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

            <Card>
              <CardHeader>
                <CardTitle>Compliance Metrics Summary</CardTitle>
                <CardDescription>Key performance indicators for audit trail</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">487</div>
                    <div className="text-sm text-blue-600">Total Actions This Week</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">97.9%</div>
                    <div className="text-sm text-green-600">Success Rate</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">15</div>
                    <div className="text-sm text-yellow-600">Active Users</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">6</div>
                    <div className="text-sm text-purple-600">Compliance Modules</div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Data Retention Period</span>
                    <span className="font-medium">7 years</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-muted-foreground">Last Backup</span>
                    <span className="font-medium">2024-01-12 02:00:00</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-muted-foreground">Storage Used</span>
                    <span className="font-medium">2.3 GB / 10 GB</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
