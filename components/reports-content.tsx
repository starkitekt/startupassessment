"use client"

import { Label } from "@/components/ui/label"
import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker" // Assuming this component is styled for dark theme
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
} from "recharts"
import { Download, Filter, Users, DollarSign, Activity, CheckSquare, BarChart2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { useGlobalSettings } from "@/contexts/global-settings-context"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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

const complianceStatusData = [
  { name: "Compliant", value: 70, fill: "hsl(var(--chart-positive))" },
  { name: "Pending", value: 20, fill: "hsl(var(--chart-3))" }, // Using chart-3 for neutral/pending
  { name: "Non-compliant", value: 10, fill: "hsl(var(--chart-negative))" },
]

export function ReportsContent() {
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const { formatCurrency, selectedCurrency } = useGlobalSettings()

  const reportChartConfig = useMemo(
    () => ({
      disbursed: { label: `Disbursed (${selectedCurrency.code} Cr)`, color: "hsl(var(--chart-1))" },
      target: { label: `Target (${selectedCurrency.code} Cr)`, color: "hsl(var(--chart-2))" },
      revenue: { label: `Revenue (${selectedCurrency.code})`, color: "hsl(var(--chart-1))" },
      growth: { label: "Growth (%)", color: "hsl(var(--chart-2))" },
      kpiScore: { label: "KPI Score", color: "hsl(var(--chart-3))" },
      value: { label: "Value" }, // Generic for Pie chart
    }),
    [selectedCurrency.code],
  )

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
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
    return (
      <div className="space-y-8 p-4 md:p-6 lg:p-8">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-48 bg-muted" /> <Skeleton className="h-10 w-32 bg-muted" />
        </div>
        <Skeleton className="h-12 w-full bg-muted" />
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-80 w-full bg-muted" /> <Skeleton className="h-80 w-full bg-muted" />
        </div>
        <Skeleton className="h-64 w-full bg-muted" />
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="space-y-8 p-4 md:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">Reports Center</h1>
            <p className="text-lg text-muted-foreground">Generate and view detailed reports on incubator activities.</p>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => handleExport("Consolidated Report")}
                className="w-full sm:w-auto jpmc-gradient text-primary-foreground"
              >
                <Download className="mr-2 h-4 w-4" /> Export Consolidated
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-popover text-popover-foreground border-border">
              <p>Download a comprehensive report (simulated).</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-foreground">
              <Filter className="mr-2 h-5 w-5 text-primary" /> Report Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: "Report Type",
                id: "report-type",
                defaultValue: "funding",
                options: [
                  { value: "funding", label: "Funding Reports" },
                  { value: "performance", label: "Performance Reports" },
                  { value: "compliance", label: "Compliance Reports" },
                  { value: "cohort", label: "Cohort Analysis" },
                ],
              },
              {
                label: "Sector",
                id: "sector-filter",
                placeholder: "All Sectors",
                options: [
                  { value: "all", label: "All Sectors" },
                  { value: "fintech", label: "FinTech" },
                  { value: "healthtech", label: "HealthTech" },
                  { value: "edtech", label: "EdTech" },
                ],
              },
              {
                label: "Cohort",
                id: "cohort-filter",
                placeholder: "All Cohorts",
                options: [
                  { value: "all", label: "All Cohorts" },
                  { value: "2023-q1", label: "2023 Q1" },
                  { value: "2023-q2", label: "2023 Q2" },
                ],
              },
            ].map((filterItem) => (
              <div key={filterItem.id}>
                <Label htmlFor={filterItem.id} className="text-sm font-medium text-muted-foreground">
                  {filterItem.label}
                </Label>
                {filterItem.id === "date-range" ? (
                  <DatePickerWithRange className="w-full bg-input border-border text-foreground focus:ring-primary" />
                ) : (
                  <Select defaultValue={filterItem.defaultValue}>
                    <SelectTrigger
                      id={filterItem.id}
                      className="w-full bg-input border-border text-foreground focus:ring-primary"
                    >
                      <SelectValue placeholder={filterItem.placeholder} />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border text-popover-foreground">
                      {filterItem.options.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            ))}
            <div>
              <Label htmlFor="date-range" className="text-sm font-medium text-muted-foreground">
                Date Range
              </Label>
              <DatePickerWithRange className="w-full bg-input border-border text-foreground focus:ring-primary" />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="funding" className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-4 bg-muted rounded-md p-1">
            {[
              { value: "funding", label: "Funding", icon: DollarSign },
              { value: "performance", label: "Performance", icon: Activity },
              { value: "compliance", label: "Compliance", icon: CheckSquare },
              { value: "cohort", label: "Cohort Analysis", icon: Users },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
              >
                <tab.icon className="mr-2 h-4 w-4" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="funding" className="mt-6 space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground">Monthly Funding Disbursal</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Comparison of disbursed vs. target funding ({selectedCurrency.code} Cr).
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ChartContainer config={reportChartConfig} className="w-full h-full">
                  <ResponsiveContainer>
                    <LineChart data={fundingData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={{ stroke: "hsl(var(--border))" }}
                        stroke="hsl(var(--muted-foreground))"
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        stroke="hsl(var(--muted-foreground))"
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) =>
                          formatCurrency(value * 10000000, selectedCurrency.code, {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 1,
                          })
                        }
                      />
                      <RechartsTooltip
                        content={<ChartTooltipContent indicator="dot" />}
                        cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 1, strokeDasharray: "3 3" }}
                        formatter={(value, name) =>
                          name === reportChartConfig.disbursed.label || name === reportChartConfig.target.label
                            ? formatCurrency(Number(value) * 10000000, selectedCurrency.code)
                            : String(value)
                        }
                      />
                      <Legend wrapperStyle={{ fontSize: "12px" }} />
                      <Line
                        type="monotone"
                        dataKey="disbursed"
                        name={reportChartConfig.disbursed.label}
                        stroke={reportChartConfig.disbursed.color}
                        strokeWidth={2.5}
                        dot={{ r: 4, fill: reportChartConfig.disbursed.color, strokeWidth: 0 }}
                        activeDot={{ r: 6, stroke: "hsl(var(--background))", strokeWidth: 2 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="target"
                        name={reportChartConfig.target.label}
                        stroke={reportChartConfig.target.color}
                        strokeDasharray="5 5"
                        strokeWidth={2}
                        dot={{ r: 4, fill: reportChartConfig.target.color, strokeWidth: 0 }}
                        activeDot={{ r: 6, stroke: "hsl(var(--background))", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
              <CardFooter className="border-t border-border pt-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" onClick={() => handleExport("Funding Disbursal Report")}>
                      <Download className="mr-2 h-4 w-4" /> Export Funding Data
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-popover text-popover-foreground border-border">
                    <p>Download detailed funding data (simulated).</p>
                  </TooltipContent>
                </Tooltip>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="mt-6 space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground">Startup Performance Overview</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Key performance indicators for selected startups.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-muted-foreground">Startup Name</TableHead>
                      <TableHead className="text-right text-muted-foreground">
                        Revenue (Monthly, {selectedCurrency.code})
                      </TableHead>
                      <TableHead className="text-right text-muted-foreground">Growth (MoM %)</TableHead>
                      <TableHead className="text-right text-muted-foreground">KPI Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {performanceData.map((startup) => (
                      <TableRow key={startup.name} className="border-border">
                        <TableCell className="font-medium text-foreground">{startup.name}</TableCell>
                        <TableCell className="text-right text-foreground tabular-nums">
                          {formatCurrency(startup.revenue)}
                        </TableCell>
                        <TableCell className="text-right text-foreground tabular-nums">{startup.growth}%</TableCell>
                        <TableCell className="text-right text-foreground tabular-nums">
                          {startup.kpiScore}/100
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="border-t border-border pt-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" onClick={() => handleExport("Startup Performance Report")}>
                      <Download className="mr-2 h-4 w-4" /> Export Performance Data
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-popover text-popover-foreground border-border">
                    <p>Download startup performance metrics (simulated).</p>
                  </TooltipContent>
                </Tooltip>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="mt-6 space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground">Portfolio Compliance Status</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Overall compliance distribution of startups.
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <ChartContainer config={reportChartConfig} className="w-full h-full max-h-[250px]">
                  <ResponsiveContainer>
                    <PieChart>
                      <RechartsTooltip content={<ChartTooltipContent nameKey="name" indicator="dot" />} />
                      <Pie
                        data={complianceStatusData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        stroke="hsl(var(--border))"
                      >
                        {complianceStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Legend wrapperStyle={{ fontSize: "12px" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
              <CardFooter className="border-t border-border pt-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" onClick={() => handleExport("Compliance Status Report")}>
                      <Download className="mr-2 h-4 w-4" /> Export Compliance Data
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-popover text-popover-foreground border-border">
                    <p>Download compliance status data (simulated).</p>
                  </TooltipContent>
                </Tooltip>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="cohort" className="mt-6 space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground">Cohort Analysis (Example)</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Performance metrics for the selected cohort.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Cohort analysis details would go here, potentially comparing different cohorts on metrics like average
                  funding, success rate, time to milestone, etc. This could involve more complex charts and tables.
                </p>
                <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-md mt-4 bg-muted/30">
                  <BarChart2 className="h-16 w-16 text-muted-foreground/50 mb-2" />
                  <p className="text-muted-foreground">Cohort-specific visualizations coming soon.</p>
                </div>
              </CardContent>
              <CardFooter className="border-t border-border pt-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" onClick={() => handleExport("Cohort Analysis Report")}>
                      <Download className="mr-2 h-4 w-4" /> Export Cohort Data
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-popover text-popover-foreground border-border">
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
