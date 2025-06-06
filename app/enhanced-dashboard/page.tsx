"use client"
import { AccessibleKeyMetricsGrid, AccessibleGoalProgressCard } from "@/components/accessible-dashboard-cards"
import { AccessibleDataTable, type Column } from "@/components/accessible-data-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChartContainer } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Building2, FileText, DollarSign, Users, PlusCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface Portfolio {
  id: string
  name: string
  sector: string
  stage: string
  healthScore: number
  mrr: number
  logoUrl: string
}

interface RecentActivity {
  id: string
  type: string
  description: string
  time: string
  user: string
}

const mockPortfolios: Portfolio[] = [
  {
    id: "STP001",
    name: "Innovatech Solutions",
    sector: "FinTech",
    stage: "Seed",
    healthScore: 85,
    mrr: 1500000,
    logoUrl: "/placeholder.svg?height=32&width=32&text=IS",
  },
  {
    id: "STP002",
    name: "HealthWell AI",
    sector: "HealthTech",
    stage: "Series A",
    healthScore: 78,
    mrr: 4500000,
    logoUrl: "/placeholder.svg?height=32&width=32&text=HA",
  },
  {
    id: "STP003",
    name: "EduSphere Learning",
    sector: "EdTech",
    stage: "Pre-Seed",
    healthScore: 92,
    mrr: 200000,
    logoUrl: "/placeholder.svg?height=32&width=32&text=EL",
  },
]

const mockActivities: RecentActivity[] = [
  {
    id: "ACT001",
    type: "Assessment",
    description: "New application submitted by Innovatech Solutions",
    time: "2 hours ago",
    user: "System",
  },
  {
    id: "ACT002",
    type: "Funding",
    description: "Series A funding approved for HealthWell AI",
    time: "1 day ago",
    user: "Sarah Johnson",
  },
  {
    id: "ACT003",
    type: "Mentor",
    description: "Mentor meeting scheduled with EduSphere Learning",
    time: "2 days ago",
    user: "Mike Chen",
  },
]

const keyMetrics = [
  {
    id: "total-startups",
    title: "Total Startups",
    value: "1,247",
    trend: { value: "+12.5%", isPositive: true, description: "increase from last month" },
    icon: Building2,
    description: "Active startups in portfolio",
  },
  {
    id: "active-applications",
    title: "Active Applications",
    value: "89",
    trend: { value: "+8.2%", isPositive: true, description: "increase in applications" },
    icon: FileText,
    description: "Applications under review",
  },
  {
    id: "funding-disbursed",
    title: "Funding Disbursed",
    valueAsNumber: 248000000,
    trend: { value: "+15.3%", isPositive: true, description: "increase in funding" },
    icon: DollarSign,
    description: "Total funding this period",
  },
  {
    id: "active-mentors",
    title: "Active Mentors",
    value: "42",
    trend: { value: "+5", isPositive: true, description: "new mentors joined" },
    icon: Users,
    description: "Mentors actively engaged",
  },
]

const incubatorGoals = [
  {
    title: "Annual Funding Target",
    current: 24.8,
    target: 50,
    unit: "Cr",
    description: "Progress towards annual funding goal",
    trend: { value: "+12%", isPositive: true },
  },
  {
    title: "New Startups (Q3)",
    current: 12,
    target: 20,
    unit: "",
    description: "Onboarding progress this quarter",
    trend: { value: "+3", isPositive: true },
  },
]

const portfolioColumns: Column<Portfolio>[] = [
  {
    key: "name",
    header: "Company",
    sortable: true,
    render: (_, row) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={row.logoUrl || "/placeholder.svg"} alt={`${row.name} logo`} />
          <AvatarFallback>{row.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <span className="font-medium">{row.name}</span>
      </div>
    ),
    ariaLabel: (_, row) => `Company: ${row.name}`,
  },
  {
    key: "sector",
    header: "Sector",
    sortable: true,
    filterable: true,
    render: (value) => <Badge variant="outline">{value}</Badge>,
  },
  {
    key: "stage",
    header: "Stage",
    sortable: true,
    filterable: true,
    render: (value) => <Badge variant="secondary">{value}</Badge>,
  },
  {
    key: "healthScore",
    header: "Health Score",
    sortable: true,
    align: "right",
    render: (value) => (
      <span
        className={`font-medium ${value >= 80 ? "text-green-600" : value >= 60 ? "text-yellow-600" : "text-red-600"}`}
      >
        {value}/100
      </span>
    ),
    ariaLabel: (value) => `Health score: ${value} out of 100`,
  },
  {
    key: "mrr",
    header: "MRR",
    sortable: true,
    align: "right",
    render: (value) => `₹${(value / 100000).toFixed(1)}L`,
    ariaLabel: (value) => `Monthly recurring revenue: ${(value / 100000).toFixed(1)} lakhs`,
  },
]

const activityColumns: Column<RecentActivity>[] = [
  {
    key: "type",
    header: "Type",
    render: (value) => <Badge variant="outline">{value}</Badge>,
  },
  {
    key: "description",
    header: "Description",
    render: (value) => <span className="text-sm">{value}</span>,
  },
  {
    key: "time",
    header: "Time",
    align: "right",
    render: (value) => <span className="text-xs text-muted-foreground">{value}</span>,
  },
  {
    key: "user",
    header: "User",
    render: (value) => <span className="text-sm font-medium">{value}</span>,
  },
]

export default function EnhancedDashboard() {
  const router = useRouter()

  const handleMetricClick = (metricId: string) => {
    switch (metricId) {
      case "total-startups":
        router.push("/portfolio")
        break
      case "active-applications":
        router.push("/assessments")
        break
      case "funding-disbursed":
        router.push("/funding")
        break
      case "active-mentors":
        router.push("/mentors")
        break
    }
  }

  const portfolioActions = {
    view: (row: Portfolio) => router.push(`/portfolio/${row.id}`),
    edit: (row: Portfolio) => router.push(`/portfolio/${row.id}/edit`),
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <section aria-labelledby="dashboard-title">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 id="dashboard-title" className="text-3xl lg:text-4xl font-bold tracking-tight">
              Incubator Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Comprehensive overview of your startup incubator metrics and performance
            </p>
          </div>
          <Button className="jpmc-gradient text-white w-full sm:w-auto">
            <PlusCircle className="mr-2 h-5 w-5" aria-hidden="true" />
            New Assessment
          </Button>
        </div>
      </section>

      {/* Key Metrics */}
      <AccessibleKeyMetricsGrid metrics={keyMetrics} onMetricClick={handleMetricClick} />

      {/* Charts and Goals Section */}
      <section aria-labelledby="charts-section-title">
        <h2 id="charts-section-title" className="sr-only">
          Performance Charts and Goals
        </h2>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance Trends</CardTitle>
                <CardDescription>Application submissions and funding disbursements over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]" role="img" aria-label="Line chart showing monthly performance trends">
                  <ChartContainer
                    config={{
                      applications: { label: "Applications", color: "hsl(var(--chart-1))" },
                      funding: { label: "Funding (Cr)", color: "hsl(var(--chart-2))" },
                    }}
                    className="w-full h-full"
                  >
                    <ResponsiveContainer>
                      <LineChart
                        data={[
                          { month: "Jan", applications: 45, funding: 1.2 },
                          { month: "Feb", applications: 52, funding: 1.8 },
                          { month: "Mar", applications: 48, funding: 2.5 },
                          { month: "Apr", applications: 61, funding: 2.1 },
                          { month: "May", applications: 55, funding: 3.0 },
                          { month: "Jun", applications: 67, funding: 2.7 },
                        ]}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Line
                          type="monotone"
                          dataKey="applications"
                          stroke="var(--color-applications)"
                          strokeWidth={2}
                        />
                        <Line type="monotone" dataKey="funding" stroke="var(--color-funding)" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  Chart shows monthly application submissions and funding disbursements in crores
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Goals Progress */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Incubator Goals</h3>
            {incubatorGoals.map((goal, index) => (
              <AccessibleGoalProgressCard key={index} {...goal} />
            ))}
          </div>
        </div>
      </section>

      {/* Data Tables Section */}
      <section aria-labelledby="data-tables-title" className="grid gap-6 lg:grid-cols-2">
        <h2 id="data-tables-title" className="sr-only">
          Portfolio and Activity Data
        </h2>

        {/* Portfolio Snapshot */}
        <AccessibleDataTable
          data={mockPortfolios}
          columns={portfolioColumns}
          title="Portfolio Snapshot"
          description="Recent portfolio company overview"
          searchableColumns={["name", "sector"]}
          filterableColumns={[
            {
              key: "sector",
              options: [
                { label: "FinTech", value: "FinTech" },
                { label: "HealthTech", value: "HealthTech" },
                { label: "EdTech", value: "EdTech" },
              ],
            },
            {
              key: "stage",
              options: [
                { label: "Pre-Seed", value: "Pre-Seed" },
                { label: "Seed", value: "Seed" },
                { label: "Series A", value: "Series A" },
              ],
            },
          ]}
          actions={portfolioActions}
          pageSize={5}
          emptyMessage="No portfolio companies found"
        />

        {/* Recent Activity */}
        <AccessibleDataTable
          data={mockActivities}
          columns={activityColumns}
          title="Recent Activity"
          description="Latest system activities and updates"
          searchableColumns={["description", "type"]}
          pageSize={5}
          emptyMessage="No recent activities"
        />
      </section>
    </div>
  )
}
