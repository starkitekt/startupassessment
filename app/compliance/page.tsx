"use client" // Ensure client component for interactivity

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  CheckCircle,
  ClipboardCheck,
  FileText,
  Gavel,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  ListChecks,
} from "lucide-react"
import Link from "next/link"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const mockComplianceOverview = {
  overallStatus: "Good",
  overallProgress: 85,
  keyAreas: [
    {
      id: "data_privacy",
      name: "Data Privacy (GDPR/CCPA)",
      status: "Compliant",
      progress: 100,
      lastReview: "2025-05-20",
      riskLevel: "Low",
      relatedAudits: 2,
    },
    {
      id: "financial_reporting",
      name: "Financial Reporting Standards",
      status: "Partially Compliant",
      progress: 75,
      lastReview: "2025-04-10",
      riskLevel: "Medium",
      relatedAudits: 1,
    },
    {
      id: "startup_onboarding",
      name: "Startup Onboarding DD",
      status: "Compliant",
      progress: 100,
      lastReview: "2025-06-01",
      riskLevel: "Low",
      relatedAudits: 3,
    },
    {
      id: "ip_protection",
      name: "Intellectual Property Protection",
      status: "Needs Review",
      progress: 50,
      lastReview: "2025-03-15",
      riskLevel: "High",
      relatedAudits: 0,
    },
  ],
}

const mockPendingTasks = [
  {
    id: "task001",
    title: "Acknowledge Updated Data Security Policy",
    dueDate: "2025-07-10",
    priority: "High",
    relatedArea: "Data Privacy",
    assignedTo: "All Employees",
  },
  {
    id: "task002",
    title: "Submit Q2 Financial Attestation for Innovatech",
    dueDate: "2025-07-15",
    priority: "Medium",
    relatedArea: "Financial Reporting",
    assignedTo: "Finance Team",
  },
  {
    id: "task003",
    title: "Complete IP Protection Training Module",
    dueDate: "2025-07-30",
    priority: "Low",
    relatedArea: "IP Protection",
    assignedTo: "R&D Department",
  },
]

const mockPolicies = [
  {
    id: "pol001",
    name: "Data Security & Privacy Policy",
    version: "v3.1",
    lastUpdated: "2025-06-15",
    status: "Active",
    category: "Data Management",
  },
  {
    id: "pol002",
    name: "Code of Conduct",
    version: "v2.0",
    lastUpdated: "2025-01-20",
    status: "Active",
    category: "Ethics",
  },
  {
    id: "pol003",
    name: "Financial Reporting Guidelines",
    version: "v1.5",
    lastUpdated: "2025-03-01",
    status: "Active",
    category: "Finance",
  },
  {
    id: "pol004",
    name: "Incubation Program Agreement",
    version: "v4.2",
    lastUpdated: "2025-05-01",
    status: "Active",
    category: "Legal",
  },
]

const complianceStatusChartData = mockComplianceOverview.keyAreas.map((area, index) => ({
  name: area.name.split(" (")[0], // Shorter name for chart
  value: area.progress,
  fill: `hsl(var(--chart-${(index % 5) + 1}))`, // Cycle through chart colors
}))

const taskPriorityChartData = [
  {
    name: "High",
    value: mockPendingTasks.filter((t) => t.priority === "High").length,
    fill: "hsl(var(--chart-negative))",
  },
  {
    name: "Medium",
    value: mockPendingTasks.filter((t) => t.priority === "Medium").length,
    fill: "hsl(var(--chart-3))",
  },
  {
    name: "Low",
    value: mockPendingTasks.filter((t) => t.priority === "Low").length,
    fill: "hsl(var(--chart-positive))",
  },
]

const chartConfig = {
  value: { label: "Progress" },
  tasks: { label: "Tasks" },
}

export default function CompliancePage() {
  const getStatusColor = (status: string) => {
    if (status === "Compliant") return "bg-green-500/20 text-green-400 border-green-500/30"
    if (status === "Partially Compliant") return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    if (status === "Needs Review") return "bg-amber-500/20 text-amber-400 border-amber-500/30"
    return "bg-red-500/20 text-red-400 border-red-500/30" // Critical or other
  }
  const getRiskColor = (risk: string) => {
    if (risk === "Low") return "text-green-400"
    if (risk === "Medium") return "text-yellow-400"
    return "text-red-400" // High
  }
  const getPriorityColor = (priority: string) => {
    if (priority === "High") return "text-red-400"
    if (priority === "Medium") return "text-yellow-400"
    return "text-green-400"
  }

  return (
    <div className="space-y-8 p-4 md:p-6 lg:p-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl flex items-center gap-2">
            <Gavel className="h-8 w-8 text-primary" /> Compliance Center
          </h1>
          <p className="text-lg text-muted-foreground">
            Monitor, manage, and maintain adherence to regulatory standards and internal policies.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/audits">
            <ShieldCheck className="mr-2 h-4 w-4" /> View Audit Logs
          </Link>
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" /> Compliance Progress by Area
            </CardTitle>
            <CardDescription>Overview of compliance levels across key regulatory areas.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer config={chartConfig} className="w-full h-full">
              <ResponsiveContainer>
                <BarChart data={complianceStatusChartData} layout="vertical" margin={{ left: 10, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={150}
                    interval={0}
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fontSize: 12 }}
                  />
                  <RechartsTooltip
                    content={<ChartTooltipContent />}
                    cursor={{ fill: "hsl(var(--muted))" }}
                    formatter={(value) => `${value}%`}
                  />
                  <Bar dataKey="value" name="Progress" radius={[0, 4, 4, 0]}>
                    {complianceStatusChartData.map((entry) => (
                      <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListChecks className="h-5 w-5 text-primary" /> Pending Tasks by Priority
            </CardTitle>
            <CardDescription>Distribution of outstanding compliance tasks.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <ChartContainer config={chartConfig} className="w-full h-full max-h-[250px]">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={taskPriorityChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    labelLine={false}
                    label={({ name, percent, value }) => `${name} (${value})`}
                  >
                    {taskPriorityChartData.map((entry) => (
                      <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <RechartsTooltip content={<ChartTooltipContent />} />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="dashboard">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-6">
          <TabsTrigger value="dashboard">Key Compliance Areas</TabsTrigger>
          <TabsTrigger value="my-tasks">My Compliance Tasks</TabsTrigger>
          <TabsTrigger value="policies">Policies & Procedures</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <Card>
            <CardHeader>
              <CardTitle>Overall Compliance Status</CardTitle>
              <div className="flex items-center gap-3 mt-1">
                <Progress
                  value={mockComplianceOverview.overallProgress}
                  className="w-full h-3 bg-muted"
                  indicatorClassName="bg-primary"
                />
                <span className="text-xl font-bold text-primary">{mockComplianceOverview.overallProgress}%</span>
              </div>
              <CardDescription>
                Current status:{" "}
                <span className={cn("font-semibold", getRiskColor(mockComplianceOverview.overallStatus))}>
                  {mockComplianceOverview.overallStatus}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {mockComplianceOverview.keyAreas.map((area) => (
                  <Card
                    key={area.id}
                    className="bg-card border border-border shadow-sm hover:shadow-md transition-shadow"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-md">{area.name}</CardTitle>
                        <Badge variant="outline" className={cn("text-xs", getStatusColor(area.status))}>
                          {area.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Progress value={area.progress} className="h-1.5 bg-muted" />
                        <span>{area.progress}%</span>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Last Reviewed: {area.lastReview}</span>
                        <span>
                          Risk: <span className={getRiskColor(area.riskLevel)}>{area.riskLevel}</span>
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Related Audits: {area.relatedAudits}</p>
                      <Button variant="link" size="sm" className="p-0 h-auto text-primary" asChild>
                        <Link href={`/compliance/areas/${area.id}`}>
                          View Details & Actions <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="my-tasks">
          <Card>
            <CardHeader>
              <CardTitle>My Pending Compliance Tasks</CardTitle>
              <CardDescription>Actions required to maintain compliance.</CardDescription>
            </CardHeader>
            <CardContent>
              {mockPendingTasks.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task</TableHead>
                      <TableHead>Related Area</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPendingTasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell className="font-medium">{task.title}</TableCell>
                        <TableCell>{task.relatedArea}</TableCell>
                        <TableCell>{task.assignedTo}</TableCell>
                        <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              "font-semibold border-opacity-50",
                              task.priority === "High" && "border-red-500 text-red-400",
                              task.priority === "Medium" && "border-yellow-500 text-yellow-400",
                              task.priority === "Low" && "border-green-500 text-green-400",
                            )}
                          >
                            {task.priority}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="default" size="sm" asChild className="jpmc-gradient">
                            <Link href={`/compliance/tasks/${task.id}`}>
                              <CheckCircle className="mr-1.5 h-3.5 w-3.5" /> Complete Task
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <ClipboardCheck className="mx-auto h-12 w-12 mb-3" />
                  <p className="text-lg">No pending compliance tasks. Well done!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies">
          <Card>
            <CardHeader>
              <CardTitle>Policies & Procedures Library</CardTitle>
              <CardDescription>Access all organizational policies and standard operating procedures.</CardDescription>
            </CardHeader>
            <CardContent>
              {mockPolicies.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Policy Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Version</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPolicies.map((policy) => (
                      <TableRow key={policy.id}>
                        <TableCell className="font-medium">{policy.name}</TableCell>
                        <TableCell>{policy.category}</TableCell>
                        <TableCell>{policy.version}</TableCell>
                        <TableCell>{new Date(policy.lastUpdated).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge
                            variant={policy.status === "Active" ? "default" : "outline"}
                            className={cn(policy.status === "Active" && "bg-green-600/80 text-primary-foreground")}
                          >
                            {policy.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/compliance/policies/${policy.id}`}>
                              <BookOpen className="mr-1.5 h-3.5 w-3.5" /> View Policy
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="mx-auto h-12 w-12 mb-3" />
                  <p className="text-lg">No policies found. Please check back later.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
