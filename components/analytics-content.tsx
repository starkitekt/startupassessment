"use client"

import { Label } from "@/components/ui/label"
import { useState, useMemo, useEffect } from "react" // Added useEffect
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
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
  Tooltip as RechartsTooltip,
} from "recharts"
import { TrendingUp, Filter, SlidersHorizontal, Briefcase, Target } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { useGlobalSettings } from "@/contexts/global-settings-context"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"
import {
  CHART_PALETTE,
  commonGridProps,
  commonXAxisProps,
  commonYAxisProps,
  commonLegendProps,
  commonLineStyle,
  commonBarStyle,
  getCurrencyTooltipFormatter,
  DYNAMIC_CHART_COLORS, // If needed for charts with dynamic series colors
} from "@/lib/chart-utils"

// Updated Mock Data with new color var names
const portfolioHealthData = [
  { risk: "Low", count: 45, avgValuation: 2.5, color: CHART_PALETTE.positive },
  { risk: "Medium", count: 30, avgValuation: 1.8, color: CHART_PALETTE.warning },
  { risk: "High", count: 15, avgValuation: 0.9, color: CHART_PALETTE.negative },
]
const funnelData = [
  // Colors defined directly in Bar component for funnel
  { stage: "Submitted", count: 500, conversion: 100 },
  { stage: "Screened", count: 350, conversion: 70 },
  { stage: "Assessed", count: 150, conversion: 42.8 },
  { stage: "Approved", count: 75, conversion: 50 },
  { stage: "Funded", count: 60, conversion: 80 },
]
const impactData = [
  { year: 2021, jobsCreated: 1200, revenueGenerated: 15 },
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

  // Updated chartConfig to use new CSS variables
  const analyticsChartConfig = useMemo(
    () => ({
      count: { label: "Count", color: CHART_PALETTE.primary },
      avgValuation: { label: `Avg Valuation (${selectedCurrency.code} Cr)`, color: CHART_PALETTE.secondary },
      jobsCreated: { label: "Jobs Created", color: CHART_PALETTE.primary },
      revenueGenerated: { label: `Revenue (${selectedCurrency.code} Cr)`, color: CHART_PALETTE.secondary },
    }),
    [selectedCurrency.code],
  )

  const keyMetricsChartConfig = useMemo(
    () => ({
      applications: { label: "Applications Received", color: CHART_PALETTE.primary },
      funded: { label: "Startups Funded", color: CHART_PALETTE.secondary },
    }),
    [],
  )

  useEffect(() => {
    // Changed from useState to useEffect for side effect
    const timer = setTimeout(() => setIsLoading(false), 1800)
    return () => clearTimeout(timer)
  }, [])

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
                    <ResponsiveContainer>
                      <BarChart
                        data={portfolioHealthData}
                        layout="vertical"
                        margin={{ right: 20, left: 10, top: 5, bottom: 5 }}
                      >
                        <CartesianGrid {...commonGridProps} horizontal={false} />
                        <XAxis type="number" dataKey="count" {...commonXAxisProps} />
                        <YAxis type="category" dataKey="risk" {...commonYAxisProps(60)} />
                        <RechartsTooltip
                          cursor={{ fill: "hsl(var(--muted) / 0.3)" }}
                          content={<ChartTooltipContent />}
                        />
                        <Bar dataKey="count" {...commonBarStyle}>
                          {portfolioHealthData.map((entry) => (
                            <Cell key={`cell-risk-${entry.risk}`} fill={entry.color} />
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
                    <ResponsiveContainer>
                      <ScatterChart margin={{ top: 20, right: 30, bottom: 10, left: 10 }}>
                        <CartesianGrid {...commonGridProps} />
                        <XAxis
                          type="number"
                          dataKey="avgValuation"
                          name={`Avg Valuation (${selectedCurrency.code} Cr)`}
                          unit="Cr"
                          tickFormatter={(value) =>
                            formatCurrency(value * 10000000, selectedCurrency.code, {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 1,
                            })
                          }
                          {...commonXAxisProps}
                        />
                        <YAxis type="category" dataKey="risk" name="Risk Category" {...commonYAxisProps(70)} />
                        <ZAxis type="number" dataKey="count" range={[100, 400]} name="Number of Startups" />
                        <RechartsTooltip
                          cursor={{ strokeDasharray: "3 3" }}
                          content={
                            <ChartTooltipContent
                              formatter={getCurrencyTooltipFormatter(
                                { formatCurrency, selectedCurrency },
                                false,
                                10000000,
                              )} // value is in Cr
                            />
                          }
                        />
                        <Legend {...commonLegendProps} />
                        <Scatter name="Portfolio Distribution" data={portfolioHealthData} fill={CHART_PALETTE.primary}>
                          {portfolioHealthData.map((entry, index) => (
                            <Cell key={`cell-scatter-${index}`} fill={entry.color} />
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
                  <ResponsiveContainer>
                    <BarChart data={funnelData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <CartesianGrid {...commonGridProps} vertical={false} />
                      <XAxis dataKey="stage" {...commonXAxisProps} />
                      <YAxis dataKey="count" {...commonYAxisProps(50)} />
                      <RechartsTooltip cursor={{ fill: "hsl(var(--muted) / 0.3)" }} content={<ChartTooltipContent />} />
                      <Legend {...commonLegendProps} />
                      <Bar dataKey="count" name="Applications at Stage" {...commonBarStyle}>
                        {funnelData.map((entry, index) => (
                          <Cell
                            key={`cell-funnel-analytics-${index}`}
                            fill={DYNAMIC_CHART_COLORS[index % DYNAMIC_CHART_COLORS.length]}
                          />
                        ))}
                      </Bar>
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
                    <ResponsiveContainer>
                      <LineChart data={impactData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid {...commonGridProps} />
                        <XAxis dataKey="year" {...commonXAxisProps} />
                        <YAxis dataKey="jobsCreated" {...commonYAxisProps(60)} />
                        <RechartsTooltip cursor={{ strokeDasharray: "3 3" }} content={<ChartTooltipContent />} />
                        <Legend {...commonLegendProps} />
                        <Line
                          type="monotone"
                          dataKey="jobsCreated"
                          name={analyticsChartConfig.jobsCreated.label}
                          stroke={analyticsChartConfig.jobsCreated.color}
                          {...commonLineStyle}
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
                    <ResponsiveContainer>
                      <BarChart data={impactData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid {...commonGridProps} vertical={false} />
                        <XAxis dataKey="year" {...commonXAxisProps} />
                        <YAxis
                          dataKey="revenueGenerated"
                          unit="Cr"
                          tickFormatter={(value) =>
                            formatCurrency(value * 10000000, selectedCurrency.code, { minimumFractionDigits: 0 })
                          }
                          {...commonYAxisProps(60)}
                        />
                        <RechartsTooltip
                          cursor={{ fill: "hsl(var(--muted) / 0.3)" }}
                          content={
                            <ChartTooltipContent
                              formatter={getCurrencyTooltipFormatter(
                                { formatCurrency, selectedCurrency },
                                false,
                                10000000,
                              )}
                            />
                          }
                        />
                        <Legend {...commonLegendProps} />
                        <Bar
                          dataKey="revenueGenerated"
                          name={analyticsChartConfig.revenueGenerated.label}
                          fill={analyticsChartConfig.revenueGenerated.color}
                          {...commonBarStyle}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Key Metrics Over Time</CardTitle>
            <CardDescription>Trends in applications and funding.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={keyMetricsChartConfig} className="h-[300px] w-full">
              <ResponsiveContainer>
                <LineChart data={keyMetricsOverTimeData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid {...commonGridProps} vertical={false} />
                  <XAxis dataKey="period" {...commonXAxisProps} />
                  <YAxis yAxisId="left" orientation="left" {...commonYAxisProps(50)} />
                  <YAxis yAxisId="right" orientation="right" {...commonYAxisProps(50)} />
                  <RechartsTooltip cursor={{ strokeDasharray: "3 3" }} content={<ChartTooltipContent />} />
                  <Legend {...commonLegendProps} />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="applications"
                    stroke={keyMetricsChartConfig.applications.color}
                    name="Applications"
                    {...commonLineStyle}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="funded"
                    stroke={keyMetricsChartConfig.funded.color}
                    name="Funded"
                    {...commonLineStyle}
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
