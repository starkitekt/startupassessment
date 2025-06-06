"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
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
import { TrendingUp, Building2, DollarSign, Target, ArrowUpRight, AlertTriangle } from "lucide-react"

const portfolioMetrics = [
  { name: "Jan", value: 320, growth: 12 },
  { name: "Feb", value: 340, growth: 6.25 },
  { name: "Mar", value: 380, growth: 11.76 },
  { name: "Apr", value: 420, growth: 10.53 },
  { name: "May", value: 450, growth: 7.14 },
  { name: "Jun", value: 480, growth: 6.67 },
]

const sectorDistribution = [
  { name: "FinTech", value: 35, companies: 8 },
  { name: "HealthTech", value: 25, companies: 6 },
  { name: "EdTech", value: 20, companies: 5 },
  { name: "CleanTech", value: 15, companies: 3 },
  { name: "AgriTech", value: 5, companies: 2 },
]

const topPerformers = [
  {
    name: "TechNova",
    logo: "/placeholder.svg?height=40&width=40&text=TN",
    valuation: "₹25 Cr",
    growth: 45,
    stage: "Series A",
    sector: "FinTech",
  },
  {
    name: "GreenEarth",
    logo: "/placeholder.svg?height=40&width=40&text=GE",
    valuation: "₹5 Cr",
    growth: 38,
    stage: "Seed",
    sector: "CleanTech",
  },
  {
    name: "HealthPlus",
    logo: "/placeholder.svg?height=40&width=40&text=HP",
    valuation: "₹1.5 Cr",
    growth: 32,
    stage: "Pre-Seed",
    sector: "HealthTech",
  },
]

const riskAlerts = [
  {
    company: "EduLearn",
    issue: "Runway < 6 months",
    severity: "high",
    action: "Funding required",
  },
  {
    company: "AgriTech Solutions",
    issue: "Milestone delay",
    severity: "medium",
    action: "Review required",
  },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export function PortfolioOverview() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹480 Cr</div>
            <div className="flex items-center text-xs text-green-500">
              <TrendingUp className="mr-1 h-4 w-4" />
              <span>+6.7% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Companies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="flex items-center text-xs text-green-500">
              <Building2 className="mr-1 h-4 w-4" />
              <span>+2 new this quarter</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹45.6 Cr</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <DollarSign className="mr-1 h-4 w-4" />
              <span>Deployed capital</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. IRR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28.4%</div>
            <div className="flex items-center text-xs text-green-500">
              <Target className="mr-1 h-4 w-4" />
              <span>Above benchmark</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Portfolio Performance Trend</CardTitle>
            <CardDescription>Monthly portfolio valuation growth</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={portfolioMetrics} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip formatter={(value) => [`₹${value} Cr`, "Portfolio Value"]} />
                  <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sector Distribution</CardTitle>
            <CardDescription>Portfolio allocation by sector</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {sectorDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Allocation"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {sectorDistribution.map((sector, index) => (
                <div key={sector.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span>{sector.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{sector.value}%</div>
                    <div className="text-xs text-muted-foreground">{sector.companies} companies</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers and Risk Alerts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>Highest growth companies this quarter</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((company, index) => (
                <div key={company.name} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary/10 text-primary rounded-full text-sm font-bold">
                      #{index + 1}
                    </div>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={company.logo || "/placeholder.svg"} alt={company.name} />
                      <AvatarFallback>{company.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{company.name}</div>
                      <div className="text-sm text-muted-foreground">{company.sector}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{company.valuation}</div>
                    <div className="flex items-center text-sm text-green-600">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {company.growth}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Risk Alerts
            </CardTitle>
            <CardDescription>Companies requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskAlerts.map((alert, index) => (
                <div key={index} className="p-4 border rounded-lg bg-orange-50 border-orange-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{alert.company}</div>
                    <Badge
                      variant={alert.severity === "high" ? "destructive" : "secondary"}
                      className={
                        alert.severity === "high" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {alert.severity}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">{alert.issue}</div>
                  <Button size="sm" variant="outline" className="w-full">
                    {alert.action}
                  </Button>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <ArrowUpRight className="h-4 w-4 mr-2" />
                View All Alerts
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
