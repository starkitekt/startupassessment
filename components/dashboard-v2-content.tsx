"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
} from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart" // ChartTooltip is part of RechartsTooltip
import {
  CHART_PALETTE,
  commonGridProps,
  commonXAxisProps,
  commonYAxisProps,
  commonLegendProps,
  commonBarStyle,
  getCurrencyTooltipFormatter,
  commonPieLabel,
  commonPieProps,
  DYNAMIC_CHART_COLORS,
} from "@/lib/chart-utils"
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
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { useGlobalSettings } from "@/contexts/global-settings-context"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// --- Mock Data Definitions ---
const mockPortfoliosSnapshot = [
  { id: "STP001", name: "Innovatech Solutions", sector: "FinTech", stage: "Seed", healthScore: 85, mrr: 1500000 },
  { id: "STP002", name: "HealthWell AI", sector: "HealthTech", stage: "Series A", healthScore: 78, mrr: 4500000 },
  { id: "STP003", name: "EduSphere Learning", sector: "EdTech", stage: "Pre-Seed", healthScore: 92, mrr: 200000 },
  { id: "STP004", name: "AgriGrow Innovations", sector: "AgriTech", stage: "Seed", healthScore: 80, mrr: 800000 },
  { id: "STP005", name: "Retail Rocket", sector: "E-commerce", stage: "Growth", healthScore: 70, mrr: 6000000 },
  { id: "STP006", name: "SaaSify Ltd", sector: "SaaS", stage: "Series A", healthScore: 88, mrr: 7500000 },
]

const keyMetricsData = [
  {
    title: "Total Startups",
    value: "1,247",
    trend: "+12.5%",
    icon: Building2,
    trendColor: "text-charting-positive",
    tooltip: "Total startups in program.",
  },
  {
    title: "Active Applications",
    value: "89",
    trend: "+8.2%",
    icon: FileText,
    trendColor: "text-charting-positive",
    tooltip: "Applications under review.",
  },
  {
    title: "Funding Disbursed",
    valueAsNumber: 248000000,
    trend: "+15.3%",
    icon: DollarSign,
    trendColor: "text-charting-positive",
    tooltip: "Total funding disbursed.",
  },
  {
    title: "Mentors Active",
    value: "42",
    trend: "+5",
    icon: Users,
    trendColor: "text-charting-positive",
    tooltip: "Active mentors.",
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
  // Colors will be applied via Cell fill
  { stage: "Submitted", count: 500 },
  { stage: "Screened", count: 350 },
  { stage: "Assessed", count: 150 },
  { stage: "Approved", count: 75 },
  { stage: "Funded", count: 60 },
]

const recentActivity = [
  {
    id: "ACT001",
    type: "New Application",
    description: "Innovatech Solutions submitted Series A application.",
    time: "2 hours ago",
    icon: FileText,
    color: "text-charting-blue-primary",
  },
  {
    id: "ACT002",
    type: "Assessment Approved",
    description: "HealthWell AI seed funding approved.",
    time: "1 day ago",
    icon: CheckCircle,
    color: "text-charting-positive",
  },
  {
    id: "ACT003",
    type: "Mentor Assigned",
    description: "Ananya Sharma assigned to EduSphere.",
    time: "2 days ago",
    icon: Users,
    color: "text-charting-accent-purple",
  },
]

const pendingTasks = [
  { id: "TSK001", title: "Review Innovatech's Pitch Deck", dueDate: "Tomorrow", priority: "High" },
  { id: "TSK002", title: "Follow-up: HealthWell AI", dueDate: "In 3 days", priority: "Medium" },
]

const incubatorGoals = [
  {
    id: "goal1",
    name: "Annual Funding Disbursed",
    currentValueInBase: 24.8 * 10000000,
    targetValueInBase: 50 * 10000000,
    unit: "Cr",
    progress: (24.8 / 50) * 100,
  },
  {
    id: "goal2",
    name: "New Startups Onboarded (Q3)",
    currentValueInBase: 12,
    targetValueInBase: 20,
    unit: "",
    progress: (12 / 20) * 100,
  },
  {
    id: "goal3",
    name: "Successful Exits (YTD)",
    currentValueInBase: 3,
    targetValueInBase: 5,
    unit: "",
    progress: (3 / 5) * 100,
  },
]

// --- Component ---
export function DashboardV2Content() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { formatCurrency, selectedCountry, selectedCurrency, isExchangeRateLoading } = useGlobalSettings()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const chartConfig = useMemo(
    () => ({
      disbursed: { label: `Disbursed (${selectedCurrency.code} Cr)`, color: CHART_PALETTE.primary },
      applications: { label: "Applications", color: CHART_PALETTE.secondary },
    }),
    [selectedCurrency.code],
  )

  const portfolioHealthDistribution = useMemo(
    () => [
      {
        name: "Healthy (>=80%)",
        value: mockPortfoliosSnapshot.filter((s) => s.healthScore >= 80).length,
        fill: "hsl(var(--chart-positive))",
      },
      {
        name: "Average (60-79%)",
        value: mockPortfoliosSnapshot.filter((s) => s.healthScore >= 60 && s.healthScore < 80).length,
        fill: "hsl(var(--chart-warning))",
      },
      {
        name: "At Risk (<60%)",
        value: mockPortfoliosSnapshot.filter((s) => s.healthScore < 60).length,
        fill: "hsl(var(--chart-negative))",
      },
    ],
    [],
  )

  const sectorDistribution = useMemo(() => {
    const counts: Record<string, number> = {}
    mockPortfoliosSnapshot.forEach((s) => {
      counts[s.sector] = (counts[s.sector] || 0) + 1
    })
    return Object.entries(counts).map(([name, value], index) => ({
      name,
      value,
      fill: DYNAMIC_CHART_COLORS[index % DYNAMIC_CHART_COLORS.length],
    }))
  }, [])

  const stageDistribution = useMemo(() => {
    const counts: Record<string, number> = {}
    mockPortfoliosSnapshot.forEach((s) => {
      counts[s.stage] = (counts[s.stage] || 0) + 1
    })
    return Object.entries(counts).map(([name, value], index) => ({
      name,
      value,
      fill: DYNAMIC_CHART_COLORS[index % DYNAMIC_CHART_COLORS.length],
    }))
  }, [])

  const handleViewAllPortfolio = () => router.push("/portfolio")
  const handleViewStartup = (startupId: string) => router.push(`/portfolio/${startupId}`)
  const handleNewAssessment = () => router.push("/assessments/new")
  const handleViewAllTasks = () => router.push("/tasks")

  if (isLoading || isExchangeRateLoading) {
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
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-72 w-full" />
          ))}
        </div>
        <Skeleton className="h-96 rounded-lg" />
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="space-y-8 lg:space-y-10 p-4 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">Incubator Dashboard</h1>
            <p className="text-sm text-primary dark:text-primary/80">
              Displaying data for {selectedCountry.name} in {selectedCurrency.code}.
            </p>
            <p className="text-muted-foreground">Comprehensive overview of key metrics and performance.</p>
          </div>
          <Button onClick={handleNewAssessment} size="lg" className="bg-jpmc-blue hover:bg-jpmc-darkblue text-white">
            <PlusCircle className="mr-2 h-5 w-5" /> New Assessment
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {keyMetricsData.map((metric) => (
            <Card key={metric.title} className="border hover:shadow-lg transition-shadow duration-200 ease-in-out">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CardTitle className="text-sm font-medium cursor-help">{metric.title}</CardTitle>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{metric.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
                <metric.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-numerical">
                  {metric.valueAsNumber ? formatCurrency(metric.valueAsNumber) : metric.value}
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
            <Card className="border hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-primary" /> Funding & Application Activity
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Monthly trends for funding and applications.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <ResponsiveContainer>
                    <BarChart
                      data={fundingActivityData}
                      margin={{ top: 5, right: 5, left: -15 /* Adjust for YAxis labels */, bottom: 5 }}
                    >
                      <CartesianGrid {...commonGridProps} vertical={false} />
                      <XAxis dataKey="month" {...commonXAxisProps} />
                      <YAxis
                        yAxisId="left"
                        orientation="left"
                        stroke={chartConfig.disbursed.color}
                        {...commonYAxisProps(70)} // Specify width
                        tickFormatter={(value) =>
                          formatCurrency(value * 10000000, selectedCurrency.code, {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 1,
                          })
                        }
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        stroke={chartConfig.applications.color}
                        {...commonYAxisProps(50)} // Specify width
                      />
                      <RechartsTooltip
                        cursor={{ fill: "hsl(var(--muted) / 0.3)" }} // Subtle cursor
                        content={
                          <ChartTooltipContent
                            formatter={getCurrencyTooltipFormatter({ formatCurrency, selectedCurrency })}
                            indicator="dashed"
                          />
                        }
                      />
                      <Legend {...commonLegendProps} />
                      <Bar
                        yAxisId="left"
                        dataKey="disbursed"
                        name={chartConfig.disbursed.label}
                        fill={chartConfig.disbursed.color}
                        {...commonBarStyle}
                      />
                      <Bar
                        yAxisId="right"
                        dataKey="applications"
                        name={chartConfig.applications.label}
                        fill={chartConfig.applications.color}
                        {...commonBarStyle}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="border hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Goal className="mr-2 h-5 w-5 text-primary" /> Incubator Goals Progress
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Tracking KPIs against targets.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {incubatorGoals.map((goal) => (
                  <div key={goal.id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{goal.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {goal.unit === "Cr" ? formatCurrency(goal.currentValueInBase) : goal.currentValueInBase} /{" "}
                        {goal.unit === "Cr"
                          ? formatCurrency(goal.targetValueInBase, selectedCurrency.code, {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })
                          : goal.targetValueInBase}{" "}
                        {goal.unit !== "Cr" ? goal.unit : ""}
                      </span>
                    </div>
                    <Progress
                      value={goal.progress}
                      className="h-2 bg-muted"
                      indicatorClassName="bg-charting-blue-primary"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2 h-5 w-5 text-primary" /> Application Funnel
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">Conversion through stages.</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}} className="h-[300px] w-full">
                  <ResponsiveContainer>
                    <BarChart
                      data={applicationFunnelData}
                      layout="vertical"
                      margin={{ left: 10, right: 10, top: 5, bottom: 5 }}
                    >
                      <CartesianGrid {...commonGridProps} horizontal={false} />
                      <XAxis type="number" {...commonXAxisProps} />
                      <YAxis dataKey="stage" type="category" {...commonYAxisProps(80)} interval={0} />
                      <RechartsTooltip cursor={{ fill: "hsl(var(--muted) / 0.3)" }} content={<ChartTooltipContent />} />
                      <Bar dataKey="count" name="Applications" {...commonBarStyle}>
                        {applicationFunnelData.map((entry, index) => (
                          <Cell
                            key={`cell-funnel-${index}`}
                            fill={DYNAMIC_CHART_COLORS[index % DYNAMIC_CHART_COLORS.length]}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="border hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChartIcon className="mr-2 h-5 w-5 text-primary" /> Portfolio Health
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Risk assessment distribution.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}} className="h-[250px] w-full">
                  <ResponsiveContainer>
                    <PieChart margin={{ top: 0, right: 0, bottom: 30, left: 0 }}>
                      <RechartsTooltip cursor={{ fill: "hsl(var(--muted) / 0.3)" }} content={<ChartTooltipContent />} />
                      <Pie
                        data={portfolioHealthDistribution}
                        dataKey="value"
                        nameKey="name"
                        {...commonPieProps}
                        label={commonPieLabel}
                        stroke={CHART_PALETTE.background} // Add border to pie segments
                        strokeWidth={1}
                      >
                        {portfolioHealthDistribution.map((entry) => (
                          <Cell key={`cell-health-${entry.name}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Legend {...commonLegendProps} verticalAlign="bottom" />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3Icon className="mr-2 h-5 w-5 text-primary" /> Sector Distribution
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">Startups per sector.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[250px] w-full">
                <ResponsiveContainer>
                  <BarChart
                    data={sectorDistribution}
                    layout="vertical"
                    margin={{ left: 10, right: 10, top: 5, bottom: 5 }}
                  >
                    <CartesianGrid {...commonGridProps} horizontal={false} />
                    <XAxis type="number" {...commonXAxisProps} />
                    <YAxis dataKey="name" type="category" {...commonYAxisProps(80)} interval={0} />
                    <RechartsTooltip cursor={{ fill: "hsl(var(--muted) / 0.3)" }} content={<ChartTooltipContent />} />
                    <Bar dataKey="value" name="Startups" {...commonBarStyle}>
                      {sectorDistribution.map((entry) => (
                        <Cell key={`cell-sector-${entry.name}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className="border hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="mr-2 h-5 w-5 text-primary" /> Stage Distribution
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Startups per investment stage.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[250px] w-full">
                <ResponsiveContainer>
                  <BarChart
                    data={stageDistribution}
                    margin={{ left: -10, right: 10, bottom: 50 /* Increased bottom margin */, top: 5 }}
                  >
                    <CartesianGrid {...commonGridProps} vertical={false} />
                    <XAxis
                      dataKey="name"
                      {...commonXAxisProps}
                      interval={0}
                      angle={-40}
                      textAnchor="end"
                      height={60 /* Adjusted height */}
                    />
                    <YAxis {...commonYAxisProps(50)} />
                    <RechartsTooltip cursor={{ fill: "hsl(var(--muted) / 0.3)" }} content={<ChartTooltipContent />} />
                    <Bar dataKey="value" name="Startups" {...commonBarStyle}>
                      {stageDistribution.map((entry) => (
                        <Cell key={`cell-stage-${entry.name}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2 border hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Building2 className="mr-2 h-5 w-5 text-primary" /> Portfolio Snapshot
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Quick overview of key startups.
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={handleViewAllPortfolio}>
                <ListFilter className="mr-2 h-4 w-4" /> View All
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
                          className={cn(
                            startup.healthScore > 80 && "bg-charting-positive text-white",
                            startup.healthScore <= 60 && "bg-charting-negative text-white",
                            startup.healthScore > 60 && startup.healthScore <= 80 && "bg-charting-warning text-black",
                          )}
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
            <Card className="border hover:shadow-lg transition-shadow">
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
                          className={cn(task.priority === "High" && "bg-charting-negative text-white")}
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
            <Card className="border hover:shadow-lg transition-shadow">
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
