"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
  LineChart,
  Line,
} from "recharts"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  DollarSign,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  TrendingUp,
  Target,
  Users,
  Building2,
  Eye,
  Edit,
  Send,
} from "lucide-react"

const fundingApplications = [
  {
    id: "FA001",
    company: {
      name: "TechNova",
      logo: "/placeholder.svg?height=40&width=40&text=TN",
      sector: "FinTech",
      stage: "Series A",
      employees: 45,
    },
    application: {
      requestedAmount: 25000000,
      submissionDate: "2024-06-15",
      status: "Under Review",
      currentStage: "Due Diligence",
      progress: 65,
      reviewer: "Sarah Johnson",
      nextMilestone: "Board Review",
      dueDate: "2024-07-15",
    },
    metrics: {
      monthlyRevenue: 4500000,
      growthRate: 12,
      burnRate: 800000,
      runway: 18,
    },
  },
  {
    id: "FA002",
    company: {
      name: "GreenEarth",
      logo: "/placeholder.svg?height=40&width=40&text=GE",
      sector: "CleanTech",
      stage: "Seed",
      employees: 22,
    },
    application: {
      requestedAmount: 7500000,
      submissionDate: "2024-06-01",
      status: "Approved",
      currentStage: "Documentation",
      progress: 90,
      reviewer: "Michael Chen",
      nextMilestone: "Fund Transfer",
      dueDate: "2024-07-01",
    },
    metrics: {
      monthlyRevenue: 1200000,
      growthRate: 8,
      burnRate: 300000,
      runway: 24,
    },
  },
  {
    id: "FA003",
    company: {
      name: "HealthPlus",
      logo: "/placeholder.svg?height=40&width=40&text=HP",
      sector: "HealthTech",
      stage: "Pre-Seed",
      employees: 12,
    },
    application: {
      requestedAmount: 3000000,
      submissionDate: "2024-05-20",
      status: "Pending Review",
      currentStage: "Initial Assessment",
      progress: 25,
      reviewer: "Alex Thompson",
      nextMilestone: "Technical Review",
      dueDate: "2024-07-30",
    },
    metrics: {
      monthlyRevenue: 450000,
      growthRate: -2,
      burnRate: 200000,
      runway: 8,
    },
  },
]

const disbursementSchedule = [
  {
    id: "DS001",
    company: "TechNova",
    amount: 10000000,
    milestone: "Product Launch",
    dueDate: "2024-08-15",
    status: "Pending",
    conditions: ["Beta testing complete", "User base > 1000", "Revenue target met"],
  },
  {
    id: "DS002",
    company: "GreenEarth",
    amount: 3750000,
    milestone: "Series A Prep",
    dueDate: "2024-07-01",
    status: "Ready",
    conditions: ["Legal docs signed", "Board approval", "Compliance check"],
  },
]

const fundingTrends = [
  { month: "Jan", applications: 12, approved: 5, disbursed: 18500000 },
  { month: "Feb", applications: 15, approved: 7, disbursed: 22000000 },
  { month: "Mar", applications: 18, approved: 8, disbursed: 31000000 },
  { month: "Apr", applications: 14, approved: 6, disbursed: 19500000 },
  { month: "May", applications: 20, approved: 9, disbursed: 28000000 },
  { month: "Jun", applications: 16, approved: 7, disbursed: 25500000 },
]

const sectorAllocation = [
  { name: "FinTech", value: 35, amount: 84000000 },
  { name: "HealthTech", value: 25, amount: 60000000 },
  { name: "EdTech", value: 20, amount: 48000000 },
  { name: "CleanTech", value: 15, amount: 36000000 },
  { name: "AgriTech", value: 5, amount: 12000000 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function FundingPageClient() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [stageFilter, setStageFilter] = useState("all")

  const filteredApplications = fundingApplications.filter((app) => {
    const matchesSearch = app.company.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || app.application.status === statusFilter
    const matchesStage = stageFilter === "all" || app.company.stage === stageFilter
    return matchesSearch && matchesStatus && matchesStage
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "Under Review":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "Pending Review":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "Rejected":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "Under Review":
        return <Badge className="bg-blue-100 text-blue-800">Under Review</Badge>
      case "Pending Review":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending Review</Badge>
      case "Rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)} Cr`
    }
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)} L`
    }
    return `₹${amount.toLocaleString()}`
  }

  return (
    <div className="space-y-8 lg:space-y-10 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">Funding Management</h1>
          <p className="text-muted-foreground">
            Comprehensive funding application management, disbursement tracking, and financial analytics.
          </p>
        </div>
        <Button className="jpmc-gradient">
          <Plus className="mr-2 h-4 w-4" />
          New Application
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95</div>
            <div className="flex items-center text-xs text-green-500">
              <TrendingUp className="mr-1 h-4 w-4" />
              <span>+12% this month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approved Funding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹240 Cr</div>
            <div className="flex items-center text-xs text-green-500">
              <DollarSign className="mr-1 h-4 w-4" />
              <span>+18% this quarter</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Disbursed Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹195 Cr</div>
            <p className="text-xs text-muted-foreground">81.3% of approved funding</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68.4%</div>
            <div className="flex items-center text-xs text-green-500">
              <Target className="mr-1 h-4 w-4" />
              <span>+5.2% improvement</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Overview */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Funding Trends</CardTitle>
            <CardDescription>Monthly application and disbursement trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={fundingTrends} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorDisbursed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip
                    formatter={(value, name) => [
                      name === "disbursed" ? formatCurrency(Number(value)) : value,
                      name === "disbursed" ? "Disbursed" : name === "applications" ? "Applications" : "Approved",
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="disbursed"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#colorDisbursed)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sector Allocation</CardTitle>
            <CardDescription>Funding distribution by sector</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorAllocation}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {sectorAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Allocation"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {sectorAllocation.slice(0, 3).map((sector, index) => (
                <div key={sector.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span>{sector.name}</span>
                  </div>
                  <span className="font-medium">{formatCurrency(sector.amount)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="applications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="disbursements">Disbursements</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search applications..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Pending Review">Pending Review</SelectItem>
                    <SelectItem value="Under Review">Under Review</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={stageFilter} onValueChange={setStageFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="All Stages" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Stages</SelectItem>
                    <SelectItem value="Pre-Seed">Pre-Seed</SelectItem>
                    <SelectItem value="Seed">Seed</SelectItem>
                    <SelectItem value="Series A">Series A</SelectItem>
                    <SelectItem value="Series B">Series B</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Advanced
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Applications Grid */}
          <div className="grid gap-6">
            {filteredApplications.map((application) => (
              <Card key={application.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    {/* Company Info */}
                    <div className="flex items-center gap-4 lg:min-w-0 lg:flex-1">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={application.company.logo || "/placeholder.svg"}
                          alt={application.company.name}
                        />
                        <AvatarFallback>
                          <Building2 className="h-6 w-6" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-semibold">{application.company.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{application.company.sector}</Badge>
                          <Badge variant="outline">{application.company.stage}</Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Users className="h-3 w-3" />
                            <span>{application.company.employees} employees</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Application Details */}
                    <div className="lg:min-w-0 lg:flex-1">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-muted-foreground">Requested Amount</span>
                          <p className="text-lg font-semibold">
                            {formatCurrency(application.application.requestedAmount)}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Current Stage</span>
                          <p className="font-medium">{application.application.currentStage}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Reviewer</span>
                          <p className="font-medium">{application.application.reviewer}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Next Milestone</span>
                          <p className="font-medium">{application.application.nextMilestone}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{application.application.progress}%</span>
                        </div>
                        <Progress value={application.application.progress} className="h-2" />
                      </div>
                    </div>

                    {/* Status and Actions */}
                    <div className="flex flex-col items-end gap-4 lg:min-w-0">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(application.application.status)}
                        {getStatusBadge(application.application.status)}
                      </div>

                      <div className="text-right text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>Due: {new Date(application.application.dueDate).toLocaleDateString()}</span>
                        </div>
                        <div>Submitted: {new Date(application.application.submissionDate).toLocaleDateString()}</div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="mr-2 h-4 w-4" />
                          Review
                        </Button>
                        <Button size="sm">
                          <Edit className="mr-2 h-4 w-4" />
                          Manage
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="outline" className="px-2">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              View Documents
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Send className="mr-2 h-4 w-4" />
                              Send Message
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Export Data
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>

                  {/* Company Metrics */}
                  <div className="mt-6 pt-4 border-t">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Monthly Revenue</span>
                        <p className="font-medium">{formatCurrency(application.metrics.monthlyRevenue)}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Growth Rate</span>
                        <p
                          className={`font-medium ${application.metrics.growthRate > 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {application.metrics.growthRate > 0 ? "+" : ""}
                          {application.metrics.growthRate}%
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Burn Rate</span>
                        <p className="font-medium">{formatCurrency(application.metrics.burnRate)}/month</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Runway</span>
                        <p
                          className={`font-medium ${application.metrics.runway < 12 ? "text-red-600" : "text-green-600"}`}
                        >
                          {application.metrics.runway} months
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="disbursements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Disbursement Schedule</CardTitle>
              <CardDescription>Upcoming and pending fund disbursements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {disbursementSchedule.map((disbursement) => (
                  <Card key={disbursement.id} className="border-l-4 border-l-primary">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h4 className="font-semibold">{disbursement.company}</h4>
                          <p className="text-sm text-muted-foreground">{disbursement.milestone}</p>
                          <div className="text-lg font-bold">{formatCurrency(disbursement.amount)}</div>
                        </div>
                        <div className="text-right">
                          <Badge variant={disbursement.status === "Ready" ? "default" : "secondary"}>
                            {disbursement.status}
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-1">
                            Due: {new Date(disbursement.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h5 className="text-sm font-medium mb-2">Conditions:</h5>
                        <div className="space-y-1">
                          {disbursement.conditions.map((condition, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              <span>{condition}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Funding Pipeline</CardTitle>
              <CardDescription>Overview of funding pipeline and forecasts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={fundingTrends} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="applications" fill="#8884d8" name="Applications" />
                    <Bar dataKey="approved" fill="#82ca9d" name="Approved" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Approval Trends</CardTitle>
                <CardDescription>Monthly approval rates and patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={fundingTrends} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="approved" stroke="#8884d8" name="Approved" />
                      <Line type="monotone" dataKey="applications" stroke="#82ca9d" name="Applications" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Key funding performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Average Processing Time</span>
                    <span className="font-semibold">18 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Success Rate</span>
                    <span className="font-semibold">68.4%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Average Funding Size</span>
                    <span className="font-semibold">₹2.8 Cr</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Disbursed</span>
                    <span className="font-semibold">₹195 Cr</span>
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
