"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PlusCircle, Building2, FileText, DollarSign, Users, CheckCircle } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { useGlobalSettings } from "@/contexts/global-settings-context"
import { TooltipProvider } from "@/components/ui/tooltip"

// Import modular components
import { KeyMetricsCards } from "./dashboard-v2/key-metrics-cards"
import { FundingApplicationChart } from "./dashboard-v2/funding-application-chart"
import { ApplicationFunnelChart } from "./dashboard-v2/application-funnel-chart"
import { PortfolioHealthChart } from "./dashboard-v2/portfolio-health-chart"
import { SectorDistributionChart } from "./dashboard-v2/sector-distribution-chart"
import { StageDistributionChart } from "./dashboard-v2/stage-distribution-chart"
import { PortfolioSnapshotTable } from "./dashboard-v2/portfolio-snapshot-table"
import { PendingTasksCard } from "./dashboard-v2/pending-tasks-card"
import { RecentActivityCard } from "./dashboard-v2/recent-activity-card"
import { IncubatorGoalsProgress } from "./dashboard-v2/incubator-goals-progress"

// --- Mock Data Definitions ---
const mockPortfoliosSnapshot = [
  {
    id: "STP001",
    name: "Innovatech Solutions",
    logoUrl: "/placeholder.svg?height=32&width=32&text=IS",
    sector: "FinTech",
    stage: "Seed",
    healthScore: 85,
    mrr: 1500000,
  }, // e.g. 15 Lakh INR
  {
    id: "STP002",
    name: "HealthWell AI",
    logoUrl: "/placeholder.svg?height=32&width=32&text=HA",
    sector: "HealthTech",
    stage: "Series A",
    healthScore: 78,
    mrr: 4500000,
  },
  {
    id: "STP003",
    name: "EduSphere Learning",
    logoUrl: "/placeholder.svg?height=32&width=32&text=EL",
    sector: "EdTech",
    stage: "Pre-Seed",
    healthScore: 92,
    mrr: 200000,
  },
  {
    id: "STP004",
    name: "AgriGrow Innovations",
    logoUrl: "/placeholder.svg?height=32&width=32&text=AG",
    sector: "AgriTech",
    stage: "Seed",
    healthScore: 80,
    mrr: 800000,
  },
  {
    id: "STP005",
    name: "Retail Rocket",
    logoUrl: "/placeholder.svg?height=32&width=32&text=RR",
    sector: "E-commerce",
    stage: "Growth",
    healthScore: 70,
    mrr: 6000000,
  },
  {
    id: "STP006",
    name: "SaaSify Ltd",
    logoUrl: "/placeholder.svg?height=32&width=32&text=SL",
    sector: "SaaS",
    stage: "Series A",
    healthScore: 88,
    mrr: 7500000,
  },
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
    valueAsNumber: 248000000, // Base value in INR (24.8 Cr)
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
    currentValueInBase: 24.8 * 10000000, // 24.8 Cr INR
    targetValueInBase: 50 * 10000000, // 50 Cr INR
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

const CHART_COLORS = [
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
  const { selectedCountry, selectedCurrency, isExchangeRateLoading } = useGlobalSettings()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const portfolioHealthDistribution = useMemo(() => {
    const healthy = mockPortfoliosSnapshot.filter((s) => s.healthScore >= 80).length
    const average = mockPortfoliosSnapshot.filter((s) => s.healthScore >= 60 && s.healthScore < 80).length
    const atRisk = mockPortfoliosSnapshot.filter((s) => s.healthScore < 60).length
    return [
      { name: "Healthy (>=80%)", value: healthy, fill: "var(--chart-positive)" },
      { name: "Average (60-79%)", value: average, fill: "var(--chart-accent1)" },
      { name: "At Risk (<60%)", value: atRisk, fill: "var(--chart-negative)" },
    ]
  }, [])

  const sectorDistribution = useMemo(() => {
    const counts: Record<string, number> = {}
    mockPortfoliosSnapshot.forEach((s) => {
      counts[s.sector] = (counts[s.sector] || 0) + 1
    })
    return Object.entries(counts).map(([name, value], index) => ({
      name,
      value,
      fill: CHART_COLORS[index % CHART_COLORS.length],
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
      fill: CHART_COLORS[index % CHART_COLORS.length],
    }))
  }, [])

  const handleViewAllPortfolio = () => router.push("/portfolio")
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
      <div className="space-y-8 lg:space-y-10 p-4 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">Incubator Dashboard</h1>
            <p className="text-sm text-primary dark:text-primary/80">
              Displaying data for {selectedCountry.name} in {selectedCurrency.code}.
            </p>
            <p className="text-muted-foreground">Comprehensive overview of key metrics and performance.</p>
          </div>
          <Button onClick={handleNewAssessment} size="lg" className="jpmc-gradient text-white">
            <PlusCircle className="mr-2 h-5 w-5" /> New Assessment
          </Button>
        </div>

        <KeyMetricsCards metrics={keyMetricsData} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <FundingApplicationChart data={fundingActivityData} />
            <IncubatorGoalsProgress goals={incubatorGoals} />
          </div>

          <div className="space-y-6">
            <ApplicationFunnelChart data={applicationFunnelData} />
            <PortfolioHealthChart data={portfolioHealthDistribution} />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          <SectorDistributionChart data={sectorDistribution} />
          <StageDistributionChart data={stageDistribution} />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <PortfolioSnapshotTable data={mockPortfoliosSnapshot} onViewAllPortfolio={handleViewAllPortfolio} />
          <div className="space-y-6">
            <PendingTasksCard tasks={pendingTasks} onViewAllTasks={handleViewAllTasks} />
            <RecentActivityCard activity={recentActivity} />
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
