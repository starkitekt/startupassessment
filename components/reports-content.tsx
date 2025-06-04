"use client"

import { Label } from "@/components/ui/label"
import { useState, useEffect, useMemo } from "react" // Added useEffect and useMemo
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip as RechartsTooltip,
} from "recharts" // Added RechartsTooltip
import { Download, Filter, Users, DollarSign, Activity, CheckSquare, BarChart2 } from "lucide-react" // Added BarChart2 for consistency
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { useGlobalSettings } from "@/contexts/global-settings-context"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock Data (ensure consistency)
const fundingData = [
  { month: "Jan", disbursed: 1.2, target: 1.5 },
  { month: "Feb", disbursed: 1.8, target: 1.6 },
  { month: "Mar", disbursed: 2.5, target: 2.0 },
  { month: "Apr", disbursed: 2.1, target: 2.2 },
  { month: "May", disbursed: 3.0, target: 2.8 },
  { month: "Jun", disbursed: 2.7, target: 3.0 },
]
const performanceData = [
  { name: "Startup A", revenue: 150000000, growth: 15, kpiScore: 85 },
  { name: "Startup B", revenue: 220000000, growth: 12, kpiScore: 78 },
  { name: "Startup C", revenue: 180000000, growth: 20, kpiScore: 92 },
]
// Standardized chart colors
const COMPLIANCE_CHART_COLORS = {
  Compliant: "hsl(var(--chart-positive))", // Green
  Pending: "hsl(var(--chart-accent1))", // Amber/Yellow
  "Non-compliant": "hsl(var(--chart-negative))", // Red
}
const complianceStatusData = [
  { name: "Compliant", value: 70, fill: COMPLIANCE_CHART_COLORS.Compliant },
  { name: "Pending", value: 20, fill: COMPLIANCE_CHART_COLORS.Pending },
  { name: "Non-compliant", value: 10, fill: COMPLIANCE_CHART_COLORS["Non-compliant"] },
]

export function ReportsContent() {
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const { formatCurrency, selectedCurrency } = useGlobalSettings()

  const chartConfig = useMemo(
    () => ({
      // useMemo for chartConfig
      disbursed: { label: `Disbursed (${selectedCurrency.code} Cr)`, color: "hsl(var(--chart-1))" }, // Primary chart color
      target: { label: `Target (${selectedCurrency.code} Cr)`, color: "hsl(var(--chart-2))" }, // Secondary chart color
      revenue: { label: `Revenue (${selectedCurrency.code})`, color: "hsl(var(--chart-1))" },
      growth: { label: "Growth (%)", color: "hsl(var(--chart-2))" },
      kpiScore: { label: "KPI Score", color: "hsl(var(--chart-3))" },
    }),
    [selectedCurrency.code],
  )

  useEffect(() => {
    // Changed from useState to useEffect for loading
    const timer = setTimeout(() => setIsLoading(false), 1000) // Reduced loading time
    return () => clearTimeout(timer)
  }, [])

  const handleExport = (reportName: string) => {
    toast({
      title: "Export Initiated (Simulated)",
      description: `${reportName}.csv is being generated. This is a simulation.`,
      duration: 3000,
    })
  }

  if (isLoading) {
    // Skeleton remains largely the same, ensure consistency if modified
    return (
      <div className="space-y-6 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-48" /> <Skeleton className="h-10 w-32" />
        </div>
        <Skeleton className="h-12 w-full" />
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-80 w-full" /> <Skeleton className="h-80 w-full" />
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="space-y-8 lg:space-y-10 p-4 md:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">Reports Center</h1>
            <p className="text-muted-foreground">Generate and view detailed reports on incubator activities.</p>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => handleExport("Consolidated Report")}
                className="w-full sm:w-auto jpmc-gradient text-white"
              >
                <Download className="mr-2 h-4 w-4" /> Export Consolidated
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download a comprehensive report (simulated).</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg font-semibold">
              <Filter className="mr-2 h-5 w-5 text-jpmc-blue" /> Report Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Label htmlFor="report-type" className="text-sm font-medium">
                Report Type
              </Label>
              <Select defaultValue="funding">
                <SelectTrigger id="report-type">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="funding">Funding Reports</SelectItem>
                  <SelectItem value="performance">Performance Reports</SelectItem>
                  <SelectItem value="compliance">Compliance Reports</SelectItem>
                  <SelectItem value="cohort">Cohort Analysis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="date-range" className="text-sm font-medium">
                Date Range
              </Label>
              <DatePickerWithRange className="w-full" />
            </div>
            <div>
              <Label htmlFor="sector-filter" className="text-sm font-medium">
                Sector
              </Label>
              <Select>
                <SelectTrigger id="sector-filter">
                  <SelectValue placeholder="All Sectors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sectors</SelectItem> <SelectItem value="fintech">FinTech</SelectItem>
                  <SelectItem value="healthtech">HealthTech</SelectItem> <SelectItem value="edtech">EdTech</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="cohort-filter" className="text-sm font-medium">
                Cohort
              </Label>
              <Select>
                <SelectTrigger id="cohort-filter">
                  <SelectValue placeholder="All Cohorts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cohorts</SelectItem> <SelectItem value="2023-q1">2023 Q1</SelectItem>
                  <SelectItem value="2023-q2">2023 Q2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="funding" className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="funding">
              <DollarSign className="mr-2 h-4 w-4" />
              Funding
            </TabsTrigger>
            <TabsTrigger value="performance">
              <Activity className="mr-2 h-4 w-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="compliance">
              <CheckSquare className="mr-2 h-4 w-4" />
              Compliance
            </TabsTrigger>
            <TabsTrigger value="cohort">
              <Users className="mr-2 h-4 w-4" />
              Cohort Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="funding" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Monthly Funding Disbursal</CardTitle>
                <CardDescription>
                  Comparison of disbursed vs. target funding ({selectedCurrency.code} Cr).
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[350px] w-full">
                  <ResponsiveContainer>
                    <LineChart data={fundingData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                      {" "}
                      {/* Adjusted left margin */}
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" tickLine={false} axisLine={{ strokeOpacity: 0.5 }} />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) =>
                          formatCurrency(value * 10000000, selectedCurrency.code, {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 1,
                          })
                        }
                      />
                      <RechartsTooltip
                        content={
                          <ChartTooltipContent
                            formatter={(value, name) =>
                              name === chartConfig.disbursed.label || name === chartConfig.target.label
                                ? formatCurrency(Number(value) * 10000000, selectedCurrency.code)
                                : String(value)
                            }
                          />
                        }
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="disbursed"
                        name={chartConfig.disbursed.label}
                        stroke={chartConfig.disbursed.color}
                        strokeWidth={2.5}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="target"
                        name={chartConfig.target.label}
                        stroke={chartConfig.target.color}
                        strokeDasharray="5 5"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
              <CardFooter>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" onClick={() => handleExport("Funding Disbursal Report")}>
                      <Download className="mr-2 h-4 w-4" /> Export Funding Data
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Download detailed funding data (simulated).</p>
                  </TooltipContent>
                </Tooltip>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Startup Performance Overview</CardTitle>
                <CardDescription>Key performance indicators for selected startups.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Startup Name</TableHead>
                      <TableHead className="text-right">Revenue (Monthly, {selectedCurrency.code})</TableHead>
                      <TableHead className="text-right">Growth (MoM %)</TableHead>
                      <TableHead className="text-right">KPI Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {performanceData.map((startup) => (
                      <TableRow key={startup.name}>
                        <TableCell className="font-medium">{startup.name}</TableCell>
                        <TableCell className="text-right text-numerical">{formatCurrency(startup.revenue)}</TableCell>
                        <TableCell className="text-right text-numerical">{startup.growth}%</TableCell>
                        <TableCell className="text-right text-numerical">{startup.kpiScore}/100</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" onClick={() => handleExport("Startup Performance Report")}>
                      <Download className="mr-2 h-4 w-4" /> Export Performance Data
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Download startup performance metrics (simulated).</p>
                  </TooltipContent>
                </Tooltip>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Portfolio Compliance Status</CardTitle>
                <CardDescription>Overall compliance distribution of startups.</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <ChartContainer config={{}} className="h-[300px] w-full max-w-xs">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <RechartsTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                      <Pie
                        data={complianceStatusData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {complianceStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Legend iconSize={10} wrapperStyle={{ fontSize: "12px" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
              <CardFooter>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" onClick={() => handleExport("Compliance Status Report")}>
                      <Download className="mr-2 h-4 w-4" /> Export Compliance Data
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Download compliance status data (simulated).</p>
                  </TooltipContent>
                </Tooltip>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="cohort" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Cohort Analysis (Example)</CardTitle>
                <CardDescription>Performance metrics for the selected cohort.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Cohort analysis details would go here, potentially comparing different cohorts on metrics like average
                  funding, success rate, time to milestone, etc. This could involve more complex charts and tables.
                </p>
                <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed rounded-md mt-4 bg-muted/20">
                  <BarChart2 className="h-16 w-16 text-muted-foreground/50 mb-2" />
                  <p className="text-muted-foreground">Cohort-specific visualizations coming soon.</p>
                </div>
              </CardContent>
              <CardFooter>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" onClick={() => handleExport("Cohort Analysis Report")}>
                      <Download className="mr-2 h-4 w-4" /> Export Cohort Data
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Download cohort analysis data (simulated).</p>
                  </TooltipContent>
                </Tooltip>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </TooltipProvider>
  )
}
