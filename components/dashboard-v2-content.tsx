"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import {
  TrendingUp,
  Building2,
  Users,
  DollarSign,
  FileText,
  AlertTriangle,
  CheckCircle,
  PlusCircle,
  Activity,
  Eye,
  ListFilter,
  BellRing,
  ClipboardCheck,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

// Using mockPortfolios from portfolio-content for snapshot
const mockPortfoliosSnapshot = [
  {
    id: "STP001",
    name: "Innovatech Solutions",
    logoUrl: "/placeholder.svg?height=32&width=32",
    sector: "FinTech",
    stage: "Seed",
    healthScore: 85,
    mrr: 15000,
  },
  {
    id: "STP002",
    name: "HealthWell AI",
    logoUrl: "/placeholder.svg?height=32&width=32",
    sector: "HealthTech",
    stage: "Series A",
    healthScore: 78,
    mrr: 45000,
  },
  {
    id: "STP003",
    name: "EduSphere Learning",
    logoUrl: "/placeholder.svg?height=32&width=32",
    sector: "EdTech",
    stage: "Pre-Seed",
    healthScore: 92,
    mrr: 2000,
  },
  {
    id: "STP004",
    name: "AgriGrow Innovations",
    logoUrl: "/placeholder.svg?height=32&width=32",
    sector: "AgriTech",
    stage: "Seed",
    healthScore: 80,
    mrr: 8000,
  },
]

const keyMetricsData = [
  { title: "Total Startups", value: "1,247", trend: "+12.5%", icon: Building2, trendColor: "text-charting-positive" },
  { title: "Active Applications", value: "89", trend: "+8.2%", icon: FileText, trendColor: "text-charting-positive" },
  {
    title: "Funding Disbursed",
    value: "₹24.8Cr",
    trend: "+15.3%",
    icon: DollarSign,
    trendColor: "text-charting-positive",
  },
  { title: "Mentors Active", value: "42", trend: "+5", icon: Users, trendColor: "text-charting-positive" },
]

const fundingActivityData = [
  { month: "Jan", disbursed: 1.2, applications: 45 },
  { month: "Feb", disbursed: 1.8, applications: 52 },
  { month: "Mar", disbursed: 2.5, applications: 48 },
  { month: "Apr", disbursed: 2.1, applications: 61 },
  { month: "May", disbursed: 3.0, applications: 55 },
  { month: "Jun", disbursed: 2.7, applications: 67 },
]

const chartConfig = {
  disbursed: { label: "Disbursed (Cr)", color: "hsl(var(--chart-primary))" },
  applications: { label: "Applications", color: "hsl(var(--chart-secondary))" },
}

const recentActivity = [
  {
    id: "ACT001",
    type: "New Application",
    description: "Innovatech Solutions submitted their Series A application.",
    time: "2 hours ago",
    icon: FileText,
    color: "text-blue-500",
  },
  {
    id: "ACT002",
    type: "Assessment Approved",
    description: "HealthWell AI's seed funding assessment was approved.",
    time: "1 day ago",
    icon: CheckCircle,
    color: "text-green-500",
  },
  {
    id: "ACT003",
    type: "Mentor Assigned",
    description: "Ananya Sharma assigned to EduSphere Learning.",
    time: "2 days ago",
    icon: Users,
    color: "text-purple-500",
  },
  {
    id: "ACT004",
    type: "Compliance Alert",
    description: "AgriGrow Innovations has pending GST filings.",
    time: "3 days ago",
    icon: AlertTriangle,
    color: "text-red-500",
  },
]

const pendingTasks = [
  { id: "TSK001", title: "Review Innovatech's Pitch Deck", dueDate: "Tomorrow", priority: "High" },
  { id: "TSK002", title: "Schedule Follow-up with HealthWell AI", dueDate: "In 3 days", priority: "Medium" },
  { id: "TSK003", title: "Finalize Q2 Report", dueDate: "Next Week", priority: "High" },
]

export function DashboardV2Content() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleViewAllPortfolio = () => router.push("/portfolio")
  const handleViewStartup = (startupId: string) => router.push(`/portfolio/${startupId}`)
  const handleNewAssessment = () => router.push("/assessments/new") // Or open modal

  if (isLoading) {
    return (
      <div className="space-y-6 lg:space-y-8">
        <Skeleton className="h-10 w-1/3" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-lg" />
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <Skeleton className="lg:col-span-2 h-80 rounded-lg" />
          <Skeleton className="lg:col-span-1 h-80 rounded-lg" />
        </div>
        <Skeleton className="h-96 rounded-lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Welcome Back, Rajesh!</h1>
          <p className="text-muted-foreground">Here’s your incubator's performance overview.</p>
        </div>
        <Button onClick={handleNewAssessment} size="lg">
          <PlusCircle className="mr-2 h-5 w-5" /> New Assessment
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {keyMetricsData.map((metric) => (
          <Card key={metric.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-numerical">{metric.value}</div>
              <p className={cn("text-xs text-muted-foreground flex items-center", metric.trendColor)}>
                <TrendingUp className="h-3 w-3 mr-1" /> {metric.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Funding Activity Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5 text-primary" /> Funding & Application Activity
            </CardTitle>
            <CardDescription>Monthly trends for funding disbursed and applications received.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer>
                <BarChart data={fundingActivityData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={{ strokeOpacity: 0.5 }} />
                  <YAxis
                    yAxisId="left"
                    orientation="left"
                    stroke="hsl(var(--chart-primary))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `₹${value}Cr`}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="hsl(var(--chart-secondary))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" hideLabel={false} />} />
                  <Legend verticalAlign="top" height={40} />
                  <Bar yAxisId="left" dataKey="disbursed" name="Disbursed (Cr)" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="applications" name="Applications" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Recent Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BellRing className="mr-2 h-5 w-5 text-primary" /> Recent Activity
            </CardTitle>
            <CardDescription>Latest updates and system events.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 max-h-[300px] overflow-y-auto">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <activity.icon className={cn("h-5 w-5 mt-0.5 flex-shrink-0", activity.color)} />
                <div>
                  <p className="text-sm font-medium leading-tight">{activity.type}</p>
                  <p className="text-xs text-muted-foreground leading-tight">{activity.description}</p>
                  <p className="text-xs text-muted-foreground/70">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Snapshot */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Building2 className="mr-2 h-5 w-5 text-primary" /> Portfolio Snapshot
            </CardTitle>
            <CardDescription>Quick overview of top performing or recent startups.</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={handleViewAllPortfolio}>
            <ListFilter className="mr-2 h-4 w-4" /> View All Portfolio
          </Button>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Startup</TableHead>
                <TableHead>Sector</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead className="text-right">MRR (USD)</TableHead>
                <TableHead className="text-center">Health</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPortfoliosSnapshot.slice(0, 5).map(
                (
                  startup, // Show first 5
                ) => (
                  <TableRow key={startup.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={startup.logoUrl || "/placeholder.svg"} alt={startup.name} />
                          <AvatarFallback>{startup.name.substring(0, 1)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{startup.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{startup.sector}</Badge>
                    </TableCell>
                    <TableCell>{startup.stage}</TableCell>
                    <TableCell className="text-right text-numerical">${startup.mrr.toLocaleString()}</TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={
                          startup.healthScore > 80 ? "default" : startup.healthScore > 60 ? "outline" : "destructive"
                        }
                        className={cn(startup.healthScore > 80 && "bg-charting-positive text-white")}
                      >
                        {startup.healthScore}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="sm" onClick={() => handleViewStartup(startup.id)}>
                        <Eye className="mr-1 h-4 w-4" /> View
                      </Button>
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pending Tasks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ClipboardCheck className="mr-2 h-5 w-5 text-primary" /> Your Pending Tasks
          </CardTitle>
          <CardDescription>Action items requiring your attention.</CardDescription>
        </CardHeader>
        <CardContent>
          {pendingTasks.length > 0 ? (
            <ul className="space-y-2">
              {pendingTasks.map((task) => (
                <li key={task.id} className="flex items-center justify-between p-2 border rounded-md">
                  <div>
                    <p className="text-sm font-medium">{task.title}</p>
                    <p className="text-xs text-muted-foreground">Due: {task.dueDate}</p>
                  </div>
                  <Badge
                    variant={task.priority === "High" ? "destructive" : "secondary"}
                    className={cn(task.priority === "High" && "bg-red-500 text-white")}
                  >
                    {task.priority}
                  </Badge>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-center py-4">No pending tasks. Well done!</p>
          )}
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm">
            View All Tasks
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
