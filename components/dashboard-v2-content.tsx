"use client"

import React, { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  Building2,
  Users,
  DollarSign,
  FileText,
  CheckCircle,
  PlusCircle,
  Activity,
  Eye,
  ListFilter,
  BellRing,
  ClipboardCheck,
  PieChartIcon,
  BarChart3Icon,
  Briefcase,
  Target,
  Goal,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { useGlobalSettings } from "@/contexts/global-settings-context"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Snapshot data (can be expanded or fetched)
const mockPortfoliosSnapshot = [
  { id: "STP001", name: "Innovatech Solutions", sector: "FinTech", stage: "Seed", healthScore: 85, mrr: 15000 },
  { id: "STP002", name: "HealthWell AI", sector: "HealthTech", stage: "Series A", healthScore: 78, mrr: 45000 },
  { id: "STP003", name: "EduSphere Learning", sector: "EdTech", stage: "Pre-Seed", healthScore: 92, mrr: 2000 },
  { id: "STP004", name: "AgriGrow Innovations", sector: "AgriTech", stage: "Seed", healthScore: 80, mrr: 8000 },
  { id: "STP005", name: "Retail Rocket", sector: "E-commerce", stage: "Growth", healthScore: 70, mrr: 60000 },
  { id: "STP006", name: "SaaSify Ltd", sector: "SaaS", stage: "Series A", healthScore: 88, mrr: 75000 },
]

const keyMetricsData = [
  {
    title: "Total Startups",
    value: "1,247",
    trend: "+12.5%",
    icon: Building2,
    trendColor: "text-charting-positive",
    tooltip: "Total number of startups currently in the incubator program or portfolio.",
  },
  {
    title: "Active Applications",
    value: "89",
    trend: "+8.2%",
    icon: FileText,
    trendColor: "text-charting-positive",
    tooltip: "Number of startup applications currently under review or processing.",
  },
  {
    title: "Funding Disbursed",
    valueAsNumber: 248000000, // Base value in INR for example
    trend: "+15.3%",
    icon: DollarSign,
    trendColor: "text-charting-positive",
    tooltip: "Total funding disbursed to startups in the current fiscal period.",
  },
  {
    title: "Mentors Active",
    value: "42",
    trend: "+5",
    icon: Users,
    trendColor: "text-charting-positive",
    tooltip: "Number of mentors actively engaged with startups.",
  },
]

const fundingActivityData = [
  { month: "Jan", disbursed: 1.2, applications: 45 },
  { month: "Feb", disbursed: 1.8, applications: 52 },
  { month: "Mar", disbursed: 2.5, applications: 48 },
  { month: "Apr", disbursed: 2.1, applications: 61 },
  { month: "May", disbursed: 3.0, applications: 55 },
  { month: "Jun", disbursed: 2.7, applications: 67 },
]

const applicationFunnelData = [
  { stage: "Submitted", count: 500, color: "hsl(var(--chart-1))" },
  { stage: "Screened", count: 350, color: "hsl(var(--chart-2))" },
  { stage: "Assessed", count: 150, color: "hsl(var(--chart-3))" },
  { stage: "Approved", count: 75, color: "hsl(var(--chart-4))" },
  { stage: "Funded", count: 60, color: "hsl(var(--chart-5))" },
]

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
]

const pendingTasks = [
  { id: "TSK001", title: "Review Innovatech's Pitch Deck", dueDate: "Tomorrow", priority: "High" },
  { id: "TSK002", title: "Schedule Follow-up with HealthWell AI", dueDate: "In 3 days", priority: "Medium" },
]

const incubatorGoals = [
  {
    id: "goal1",
    name: "Annual Funding Disbursed",
    currentValue: 24.8,
    targetValue: 50,
    unit: "Cr",
    progress: (24.8 / 50) * 100,
  },
  {
    id: "goal2",
    name: "New Startups Onboarded (Q3)",
    currentValue: 12,
    targetValue: 20,
    unit: "",
    progress: (12 / 20) * 100,
  },
  { id: "goal3", name: "Successful Exits (YTD)", currentValue: 3, targetValue: 5, unit: "", progress: (3 / 5) * 100 },
]

const chartConfig = {
  disbursed: { label: "Disbursed (Cr)", color: "hsl(var(--chart-primary))" },
  applications: { label: "Applications", color: "hsl(var(--chart-secondary))" },
}

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-accent1))",
  "hsl(var(--chart-accent2))",
]

export function DashboardV2Content() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()
  const { formatCurrency, selectedCountry, selectedCurrency } = useGlobalSettings()

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const portfolioHealthDistribution = useMemo(() => {
    const low = mockPortfoliosSnapshot.filter((s) => s.healthScore >= 80).length
    const medium = mockPortfoliosSnapshot.filter((s) => s.healthScore >= 60 && s.healthScore < 80).length
    const high = mockPortfoliosSnapshot.filter((s) => s.healthScore < 60).length
    return [
      { name: "Low Risk (>=80%)", value: low, fill: "var(--color-green)" },
      { name: "Medium Risk (60-79%)", value: medium, fill: "var(--color-amber)" },
      { name: "High Risk (<60%)", value: high, fill: "var(--color-red)" },
    ]
  }, [])

  const sectorDistribution = useMemo(() => {
    const counts: Record<string, number> = {}
    mockPortfoliosSnapshot.forEach((s) => {
      counts[s.sector] = (counts[s.sector] || 0) + 1
    })
    return Object.entries(counts).map(([name, value], index) => ({ name, value, fill: COLORS[index % COLORS.length] }))
  }, [])

  const stageDistribution = useMemo(() => {
    const counts: Record<string, number> = {}
    mockPortfoliosSnapshot.forEach((s) => {
      counts[s.stage] = (counts[s.stage] || 0) + 1
    })
    return Object.entries(counts).map(([name, value], index) => ({ name, value, fill: COLORS[index % COLORS.length] }))
  }, [])

  const handleViewAllPortfolio = () => router.push("/portfolio")
  const handleViewStartup = (startupId: string) => router.push(`/portfolio/${startupId}`)
  const handleNewAssessment = () => router.push("/assessments/new")
  const handleViewAllTasks = () => router.push("/tasks")

  if (isLoading) {
    return (
      <div className="space-y-6 lg:space-y-8 p-4 md:p-6">
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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-72 w-full" />
          <Skeleton className="h-72 w-full" />
          <Skeleton className="h-72 w-full" />
        </div>
        <Skeleton className="h-96 rounded-lg" />
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="space-y-6 lg:space-y-8 p-4 md:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Incubator Dashboard</h1>
            <p className="text-sm text-primary dark:text-primary/80">
              Displaying data for {selectedCountry.name} in {selectedCurrency.code}.
            </p>
            <p className="text-muted-foreground">Comprehensive overview of key metrics and performance.</p>
          </div>
          <Button onClick={handleNewAssessment} size="lg" className="jpmc-gradient text-white">
            <PlusCircle className="mr-2 h-5 w-5" /> New Assessment
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {keyMetricsData.map((metric) => (
            <Card key={metric.title} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CardTitle className="text-sm font-medium cursor-help">{metric.title}</CardTitle>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{metric.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
                <metric.icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-numerical">
                  {metric.title === "Funding Disbursed" && metric.valueAsNumber
                    ? formatCurrency(metric.valueAsNumber)
                    : metric.value}
                </div>
                <p className={cn("text-xs text-muted-foreground flex items-center", metric.trendColor)}>
                  <TrendingUp className="h-3 w-3 mr-1" /> {metric.trend}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
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
                        tickFormatter={(value) =>
                          formatCurrency(value * 10000000, selectedCurrency.code, {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })
                        }
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        stroke="hsl(var(--chart-secondary))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <ChartTooltip
                        cursor={false}
                        content={
                          <ChartTooltipContent
                            indicator="dashed"
                            hideLabel={false}
                            formatter={(value, name) =>
                              name === `Disbursed (${selectedCurrency.code} Cr)`
                                ? formatCurrency(Number(value) * 10000000, selectedCurrency.code) // Pass selectedCurrency.code explicitly
                                : value
                            }
                          />
                        }
                      />
                      <Legend verticalAlign="top" height={40} />
                      <Bar
                        yAxisId="left"
                        dataKey="disbursed"
                        name={`Disbursed (${selectedCurrency.code} Cr)`}
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar yAxisId="right" dataKey="applications" name="Applications" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Goal className="mr-2 h-5 w-5 text-primary" /> Incubator Goals Progress
                </CardTitle>
                <CardDescription>Tracking key performance indicators against targets.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {incubatorGoals.map((goal) => (
                  <div key={goal.id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{goal.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {goal.unit === "Cr"
                          ? formatCurrency(goal.currentValue * 10000000, selectedCurrency.code)
                          : goal.currentValue}{" "}
                        /
                        {goal.unit === "Cr"
                          ? formatCurrency(goal.targetValue * 10000000, selectedCurrency.code, {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })
                          : goal.targetValue}{" "}
                        {goal.unit !== "Cr" ? goal.unit : ""}
                      </span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2 h-5 w-5 text-primary" /> Application Funnel
                </CardTitle>
                <CardDescription>Conversion through application stages.</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}} className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={applicationFunnelData} layout="vertical" margin={{ left: 10, right: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" />
                      <YAxis dataKey="stage" type="category" width={80} interval={0} fontSize={11} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="count" name="Applications" radius={[0, 4, 4, 0]}>
                        {applicationFunnelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChartIcon className="mr-2 h-5 w-5 text-primary" /> Portfolio Health
                </CardTitle>
                <CardDescription>Distribution of startups by risk assessment.</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}} className="h-[250px] w-full">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={portfolioHealthDistribution}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={70} // Adjusted for better label fit
                        labelLine={false}
                        label={({ name, percent }) => `${name.split(" ")[0]}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {portfolioHealthDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend verticalAlign="bottom" height={36} iconSize={10} wrapperStyle={{ fontSize: "12px" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {" "}
          {/* Changed to 2 columns for better fit */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3Icon className="mr-2 h-5 w-5 text-primary" /> Sector Distribution
              </CardTitle>
              <CardDescription>Number of startups per sector.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[250px] w-full">
                <ResponsiveContainer>
                  <BarChart data={sectorDistribution} layout="vertical" margin={{ left: 10, right: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={80} interval={0} fontSize={11} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" name="Startups" radius={[0, 4, 4, 0]}>
                      {sectorDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </ChartContainer>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="mr-2 h-5 w-5 text-primary" /> Stage Distribution
              </CardTitle>
              <CardDescription>Number of startups per investment stage.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[250px] w-full">
                <ResponsiveContainer>
                  <BarChart data={stageDistribution} margin={{ left: -10, right: 10, bottom: 30 }}>
                    {" "}
                    {/* Added bottom margin for labels */}
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" fontSize={11} interval={0} angle={-40} textAnchor="end" height={60} />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" name="Startups" radius={[4, 4, 0, 0]}>
                      {stageDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Building2 className="mr-2 h-5 w-5 text-primary" /> Portfolio Snapshot
                </CardTitle>
                <CardDescription>Quick overview of recent or key startups.</CardDescription>
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
                    <TableHead className="text-right">MRR ({selectedCurrency.code})</TableHead>
                    <TableHead className="text-center">Health</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPortfoliosSnapshot.slice(0, 4).map((startup) => (
                    <TableRow key={startup.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={`/placeholder.svg?height=32&width=32&text=${startup.name.substring(0, 1)}`}
                              alt={startup.name}
                            />
                            <AvatarFallback>{startup.name.substring(0, 1)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{startup.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{startup.sector}</Badge>
                      </TableCell>
                      <TableCell>{startup.stage}</TableCell>
                      <TableCell className="text-right text-numerical">{formatCurrency(startup.mrr)}</TableCell>
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
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ClipboardCheck className="mr-2 h-5 w-5 text-primary" /> Your Pending Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                {pendingTasks.length > 0 ? (
                  <ul className="space-y-2">
                    {pendingTasks.map((task) => (
                      <li key={task.id} className="flex items-center justify-between p-2 border rounded-md text-sm">
                        <div>
                          <p className="font-medium">{task.title}</p>
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
                  <p className="text-muted-foreground text-center py-4 text-sm">No pending tasks.</p>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" onClick={handleViewAllTasks}>
                  View All Tasks
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BellRing className="mr-2 h-5 w-5 text-primary" /> Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 max-h-[150px] overflow-y-auto">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 text-sm">
                    <activity.icon className={cn("h-4 w-4 mt-0.5 flex-shrink-0", activity.color)} />
                    <div>
                      <p className="font-medium leading-tight">{activity.type}</p>
                      <p className="text-xs text-muted-foreground leading-tight">{activity.description}</p>
                      <p className="text-xs text-muted-foreground/70">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
