"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts"
import { TrendingUp, Filter, SlidersHorizontal, Briefcase, Target } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { useGlobalSettings } from "@/contexts/global-settings-context"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"

// Mock Data
const portfolioHealthData = [
  { risk: "Low", count: 45, avgValuation: 2.5, color: "var(--color-green)" },
  { risk: "Medium", count: 30, avgValuation: 1.8, color: "var(--color-amber)" },
  { risk: "High", count: 15, avgValuation: 0.9, color: "var(--color-red)" },
]
const funnelData = [
  { stage: "Submitted", count: 500, conversion: 100 },
  { stage: "Screened", count: 350, conversion: 70 },
  { stage: "Assessed", count: 150, conversion: 42.8 },
  { stage: "Approved", count: 75, conversion: 50 },
  { stage: "Funded", count: 60, conversion: 80 },
]
const impactData = [
  { year: 2021, jobsCreated: 1200, revenueGenerated: 15 }, // revenue in Cr
  { year: 2022, jobsCreated: 1800, revenueGenerated: 25 },
  { year: 2023, jobsCreated: 2500, revenueGenerated: 40 },
  { year: 2024, jobsCreated: 3100, revenueGenerated: 55 },
]

const keyMetricsOverTimeData = [
  { period: "2023 Q1", applications: 120, funded: 15 },
  { period: "2023 Q2", applications: 150, funded: 20 },
  { period: "2023 Q3", applications: 130, funded: 18 },
  { period: "2023 Q4", applications: 160, funded: 22 },
  { period: "2024 Q1", applications: 170, funded: 25 },
]

export function AnalyticsContent() {
  const [isLoading, setIsLoading] = useState(true)
  const { formatCurrency, selectedCurrency } = useGlobalSettings()
  const { toast } = useToast()

  const analyticsChartConfig = {
    count: { label: "Count", color: "hsl(var(--chart-1))" },
    avgValuation: { label: `Avg Valuation (${selectedCurrency.code} Cr)`, color: "hsl(var(--chart-2))" },
    jobsCreated: { label: "Jobs Created", color: "hsl(var(--chart-1))" },
    revenueGenerated: { label: `Revenue (${selectedCurrency.code} Cr)`, color: "hsl(var(--chart-2))" },
  }

  const keyMetricsChartConfig = {
    applications: { label: "Applications Received", color: "hsl(var(--chart-1))" },
    funded: { label: "Startups Funded", color: "hsl(var(--chart-2))" },
  }

  useState(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800)
    return () => clearTimeout(timer)
  })

  const handleCustomizeDashboard = () => {
    toast({
      title: "Customize Dashboard (Planned Feature)",
      description:
        "In a full version, you would be able to add, remove, and rearrange analytical widgets here. (Simulated interaction)",
      duration: 5000,
    })
  }

  if (isLoading) {
    return (
      <div className="space-y-6 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-56" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Skeleton className="h-12 w-full" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-72 w-full" />
          <Skeleton className="h-72 w-full" />
          <Skeleton className="h-72 w-full" />
        </div>
        <Skeleton className="h-80 w-full" />
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="space-y-6 p-4 md:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-jpmc-darkblue dark:text-jpmc-lightblue">Advanced Analytics</h1>
            <p className="text-muted-foreground">Deep dive into portfolio performance and trends.</p>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" onClick={handleCustomizeDashboard}>
                <SlidersHorizontal className="mr-2 h-4 w-4" /> Customize Dashboard
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Rearrange and select analytics widgets (planned feature).</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="mr-2 h-5 w-5 text-jpmc-blue" /> Global Analytics Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <Label htmlFor="analytics-date-range" className="text-sm font-medium">
                Date Range
              </Label>
              <DatePickerWithRange className="w-full" />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Investment Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="seed">Seed</SelectItem>
                <SelectItem value="series-a">Series A</SelectItem>
                <SelectItem value="growth">Growth</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="north">North India</SelectItem>
                <SelectItem value="south">South India</SelectItem>
                <SelectItem value="east">East India</SelectItem>
                <SelectItem value="west">West India</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Tabs defaultValue="portfolioHealth" className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3">
            <TabsTrigger value="portfolioHealth">
              <Briefcase className="mr-2 h-4 w-4" />
              Portfolio Health
            </TabsTrigger>
            <TabsTrigger value="funnelAnalysis">
              <Target className="mr-2 h-4 w-4" />
              Funnel Analysis
            </TabsTrigger>
            <TabsTrigger value="impactAnalysis">
              <TrendingUp className="mr-2 h-4 w-4" />
              Impact Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="portfolioHealth" className="mt-6 space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Risk Distribution</CardTitle>
                  <CardDescription>Portfolio breakdown by risk category.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={analyticsChartConfig} className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={portfolioHealthData} layout="vertical" margin={{ right: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" dataKey="count" />
                        <YAxis type="category" dataKey="risk" width={60} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                          {portfolioHealthData.map((entry) => (
                            <Cell key={`cell-${entry.risk}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Valuation vs. Risk</CardTitle>
                  <CardDescription>Startup valuation ({selectedCurrency.code} Cr) against risk score.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={analyticsChartConfig} className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid />
                        <XAxis
                          type="number"
                          dataKey="avgValuation"
                          name={`Avg Valuation (${selectedCurrency.code} Cr)`}
                          unit="Cr"
                          tickFormatter={(value) => formatCurrency(value * 10000000, selectedCurrency.code, 0)}
                        />
                        <YAxis type="category" dataKey="risk" name="Risk Category" />
                        <ZAxis type="number" dataKey="count" range={[100, 500]} name="Number of Startups" />
                        <ChartTooltip
                          cursor={{ strokeDasharray: "3 3" }}
                          content={
                            <ChartTooltipContent
                              formatter={(value, name) =>
                                name === `Avg Valuation (${selectedCurrency.code} Cr)`
                                  ? formatCurrency(Number(value) * 10000000)
                                  : value
                              }
                            />
                          }
                        />
                        <Legend />
                        <Scatter name="Portfolio Distribution" data={portfolioHealthData}>
                          {portfolioHealthData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Scatter>
                      </ScatterChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Sector Performance Hotspots</CardTitle>
                  <CardDescription>Identify top performing sectors.</CardDescription>
                </CardHeader>
                <CardContent className="h-[250px] flex items-center justify-center">
                  <p className="text-muted-foreground">Heatmap or bubble chart here.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="funnelAnalysis" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Funnel Conversion</CardTitle>
                <CardDescription>Conversion rates at each stage of the application pipeline.</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={analyticsChartConfig} className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={funnelData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="stage" />
                      <YAxis dataKey="count" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar
                        dataKey="count"
                        name="Applications at Stage"
                        fill="var(--color-count)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="impactAnalysis" className="mt-6 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Jobs Created Over Time</CardTitle>
                  <CardDescription>Cumulative jobs created by portfolio companies.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={analyticsChartConfig} className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={impactData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis dataKey="jobsCreated" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="jobsCreated"
                          name={analyticsChartConfig.jobsCreated.label}
                          stroke="var(--color-jobsCreated)"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Generated by Portfolio</CardTitle>
                  <CardDescription>
                    Total revenue generated by portfolio companies ({selectedCurrency.code} Cr).
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={analyticsChartConfig} className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={impactData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis
                          dataKey="revenueGenerated"
                          unit="Cr"
                          tickFormatter={(value) => formatCurrency(value * 10000000, selectedCurrency.code, 0)}
                        />
                        <ChartTooltip
                          content={
                            <ChartTooltipContent
                              formatter={(value, name) =>
                                name === analyticsChartConfig.revenueGenerated.label
                                  ? formatCurrency(Number(value) * 10000000)
                                  : value
                              }
                            />
                          }
                        />
                        <Legend />
                        <Bar
                          dataKey="revenueGenerated"
                          name={analyticsChartConfig.revenueGenerated.label}
                          fill="var(--color-revenueGenerated)"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        <Card className="col-span-full md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Key Metrics Over Time</CardTitle>
            <CardDescription>Trends in applications and funding.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={keyMetricsChartConfig} className="h-[300px] w-full">
              <ResponsiveContainer>
                <LineChart data={keyMetricsOverTimeData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="period" tickLine={false} axisLine={false} fontSize={12} />
                  <YAxis yAxisId="left" orientation="left" tickLine={false} axisLine={false} fontSize={12} />
                  <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} fontSize={12} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="applications"
                    stroke="var(--color-applications)"
                    strokeWidth={2}
                    name="Applications"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="funded"
                    stroke="var(--color-funded)"
                    strokeWidth={2}
                    name="Funded"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}
