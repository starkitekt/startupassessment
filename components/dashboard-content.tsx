"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts" // Added Legend
import {
  TrendingUp,
  TrendingDown,
  Building2,
  Users,
  DollarSign,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  PlusCircle,
} from "lucide-react"
import { useRouter } from "next/navigation" // For navigation
import { useToast } from "@/components/ui/use-toast" // For feedback

const monthlyData = [
  { month: "Jan", applications: 45, approved: 12, funding: 2.5 },
  { month: "Feb", applications: 52, approved: 15, funding: 3.2 },
  { month: "Mar", applications: 48, approved: 18, funding: 4.1 },
  { month: "Apr", applications: 61, approved: 22, funding: 5.8 },
  { month: "May", applications: 55, approved: 19, funding: 4.9 },
  { month: "Jun", applications: 67, approved: 25, funding: 6.2 },
]

const sectorData = [
  { name: "FinTech", value: 35, color: "hsl(var(--chart-primary))" },
  { name: "HealthTech", value: 28, color: "hsl(var(--chart-secondary))" },
  { name: "EdTech", value: 22, color: "hsl(var(--chart-accent1))" },
  { name: "AgriTech", value: 15, color: "hsl(var(--chart-accent2))" },
]

const recentApplications = [
  {
    id: "APP-2024-001",
    company: "TechFlow Solutions",
    sector: "FinTech",
    stage: "Under Review",
    submittedDate: "2024-01-15",
    reviewer: "Priya Sharma",
  },
  {
    id: "APP-2024-002",
    company: "HealthCare AI",
    sector: "HealthTech",
    stage: "Approved",
    submittedDate: "2024-01-14",
    reviewer: "Amit Kumar",
  },
  {
    id: "APP-2024-003",
    company: "EduNext Platform",
    sector: "EdTech",
    stage: "Pending Documents",
    submittedDate: "2024-01-13",
    reviewer: "Rajesh Gupta",
  },
]

export function DashboardContent() {
  const router = useRouter()
  const { toast } = useToast()

  const handleNewAssessment = () => {
    // router.push("/assessments/new"); // Ideal navigation
    toast({ title: "New Assessment", description: "Assessment creation flow would start here." })
  }

  const handleReviewApplication = (appId: string) => {
    // router.push(`/assessments/${appId}`); // Ideal navigation
    toast({ title: "Review Application", description: `Opening assessment ${appId} for review.` })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-jpmc-darkblue dark:text-jpmc-lightblue">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your incubator.</p>
        </div>
        <div className="flex space-x-2 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none">
            Export Report
          </Button>
          <Button onClick={handleNewAssessment} className="jpmc-gradient text-white flex-1 sm:flex-none">
            <PlusCircle className="mr-2 h-4 w-4" /> New Assessment
          </Button>
        </div>
      </div>

      {/* Key Metrics (No changes needed here unless for styling) */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Startups</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-numerical">1,247</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-charting-positive flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.5%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
        {/* ... other metric cards ... use charting-positive/negative for trend colors */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-numerical">89</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-charting-positive flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8.2%
              </span>
              from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Funding Disbursed</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-numerical">₹24.8Cr</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-charting-positive flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +15.3%
              </span>
              from last quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-numerical">68.4%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-charting-negative flex items-center">
                <TrendingDown className="h-3 w-3 mr-1" />
                -2.1%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Application Trends</CardTitle>
            <CardDescription>Monthly application and approval statistics.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                applications: { label: "Applications", color: "hsl(var(--chart-primary))" },
                approved: { label: "Approved", color: "hsl(var(--chart-positive))" },
              }}
              className="h-[300px] w-full"
            >
              <ResponsiveContainer>
                <BarChart data={monthlyData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
                  <Legend verticalAlign="top" height={36} />
                  <Bar dataKey="applications" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="approved" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sector Distribution</CardTitle>
            <CardDescription>Breakdown of startups by industry sector.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ChartContainer
              config={
                {
                  /* Config for Pie chart if needed */
                }
              }
              className="h-[300px] w-full max-w-md"
            >
              <ResponsiveContainer>
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                  <Pie
                    data={sectorData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    labelLine={false}
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                      const RADIAN = Math.PI / 180
                      const radius = innerRadius + (outerRadius - innerRadius) * 0.5
                      const x = cx + radius * Math.cos(-midAngle * RADIAN)
                      const y = cy + radius * Math.sin(-midAngle * RADIAN)
                      return (
                        <text
                          x={x}
                          y={y}
                          fill="white"
                          textAnchor={x > cx ? "start" : "end"}
                          dominantBaseline="central"
                          fontSize={12}
                        >
                          {`${(percent * 100).toFixed(0)}%`}
                        </text>
                      )
                    }}
                  >
                    {sectorData.map((entry) => (
                      <Cell key={`cell-${entry.name}`} fill={entry.color} stroke={entry.color} />
                    ))}
                  </Pie>
                  <Legend
                    layout="radial"
                    verticalAlign="middle"
                    align="right"
                    iconSize={10}
                    wrapperStyle={{ fontSize: "12px", lineHeight: "20px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Latest startup applications requiring attention.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentApplications.map(
                (
                  app: any, // Added type for app
                ) => (
                  <div
                    key={app.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border rounded-lg hover:shadow-sm transition-shadow"
                  >
                    <div className="space-y-0.5 mb-2 sm:mb-0">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-sm">{app.company}</h4>
                        <Badge variant="outline" className="text-xs">
                          {app.sector}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {app.id} • Submitted {new Date(app.submittedDate).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground">Reviewer: {app.reviewer}</p>
                    </div>
                    <div className="flex items-center space-x-2 w-full sm:w-auto">
                      <Badge
                        className={
                          ("text-xs w-full sm:w-auto justify-center",
                          app.stage === "Approved" && "status-approved",
                          app.stage === "Under Review" && "status-under-review",
                          app.stage === "Pending Documents" && "status-pending")
                        }
                      >
                        {app.stage === "Approved" && <CheckCircle className="h-3 w-3 mr-1" />}
                        {app.stage === "Under Review" && <Clock className="h-3 w-3 mr-1" />}
                        {app.stage === "Pending Documents" && <AlertCircle className="h-3 w-3 mr-1" />}
                        {app.stage}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto"
                        onClick={() => handleReviewApplication(app.id)}
                      >
                        Review
                      </Button>
                    </div>
                  </div>
                ),
              )}
            </div>
          </CardContent>
        </Card>
        {/* ... Quick Actions Card (no major changes needed for charts) ... */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used functions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline" onClick={handleNewAssessment}>
              <FileText className="h-4 w-4 mr-2" />
              New Assessment
            </Button>
            <Button className="w-full justify-start" variant="outline" onClick={() => router.push("/portfolio")}>
              <Building2 className="h-4 w-4 mr-2" />
              View Portfolio
            </Button>
            <Button className="w-full justify-start" variant="outline" onClick={() => router.push("/mentors")}>
              <Users className="h-4 w-4 mr-2" />
              Manage Mentors
            </Button>
            <Button
              className="w-full justify-start"
              variant="outline"
              onClick={() =>
                toast({ title: "Processing Funding", description: "Funding processing flow would start." })
              }
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Process Funding
            </Button>

            <div className="pt-3 border-t">
              <h4 className="font-medium mb-2 text-sm">System Health</h4>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span>API Status</span>
                  <Badge className="status-active text-xs">Online</Badge>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Database</span>
                  <Badge className="status-active text-xs">Healthy</Badge>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Storage</span>
                  <span className="text-numerical">78% Used</span>
                </div>
                <Progress value={78} className="h-1.5" indicatorClassName="bg-charting-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
