"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { TrendingUp, Brain, AlertCircle, CheckCircle } from "lucide-react"

const aiInsights = [
  {
    id: 1,
    type: "opportunity",
    title: "FinTech Sector Outperforming",
    description: "Your FinTech investments are showing 15% higher returns than market average",
    confidence: 92,
    impact: "High",
    action: "Consider increasing allocation to FinTech",
    icon: TrendingUp,
  },
  {
    id: 2,
    type: "risk",
    title: "Concentration Risk Alert",
    description: "28% of portfolio concentrated in FinTech sector",
    confidence: 87,
    impact: "Medium",
    action: "Diversify into other high-growth sectors",
    icon: AlertCircle,
  },
  {
    id: 3,
    type: "performance",
    title: "Series A Companies Excelling",
    description: "Series A investments showing 35% average growth",
    confidence: 94,
    impact: "High",
    action: "Focus on Series A opportunities",
    icon: CheckCircle,
  },
]

const performanceComparison = [
  { period: "Q1 2023", portfolio: 15.2, benchmark: 12.8, sector: 14.1 },
  { period: "Q2 2023", portfolio: 18.5, benchmark: 14.2, sector: 16.3 },
  { period: "Q3 2023", portfolio: 22.1, benchmark: 16.5, sector: 18.7 },
  { period: "Q4 2023", portfolio: 25.8, benchmark: 18.9, sector: 21.2 },
  { period: "Q1 2024", portfolio: 28.5, benchmark: 21.3, sector: 23.8 },
]

const sectorAnalysis = [
  { sector: "FinTech", investments: 12, totalValue: 134, avgReturn: 28.5, riskScore: 6.2 },
  { sector: "HealthTech", investments: 8, totalValue: 106, avgReturn: 24.3, riskScore: 5.8 },
  { sector: "EdTech", investments: 6, totalValue: 86, avgReturn: 22.1, riskScore: 6.5 },
  { sector: "E-commerce", investments: 5, totalValue: 72, avgReturn: 19.8, riskScore: 7.1 },
  { sector: "SaaS", investments: 4, totalValue: 58, avgReturn: 26.2, riskScore: 5.5 },
]

const vintageAnalysis = [
  { year: "2019", investments: 8, currentValue: 95, multiple: 2.8, irr: 32.1 },
  { year: "2020", investments: 12, currentValue: 145, multiple: 2.5, irr: 28.7 },
  { year: "2021", investments: 15, currentValue: 180, multiple: 2.2, irr: 25.3 },
  { year: "2022", investments: 10, currentValue: 85, multiple: 1.8, irr: 22.9 },
  { year: "2023", investments: 6, currentValue: 45, multiple: 1.3, irr: 18.5 },
]

const riskReturnData = [
  { risk: 5.5, return: 26.2, sector: "SaaS", size: 58 },
  { risk: 5.8, return: 24.3, sector: "HealthTech", size: 106 },
  { risk: 6.2, return: 28.5, sector: "FinTech", size: 134 },
  { risk: 6.5, return: 22.1, sector: "EdTech", size: 86 },
  { risk: 7.1, return: 19.8, sector: "E-commerce", size: 72 },
]

export function InvestorAnalyticsContent() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1Y")

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "opportunity":
        return TrendingUp
      case "risk":
        return AlertCircle
      case "performance":
        return CheckCircle
      default:
        return Brain
    }
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case "opportunity":
        return "text-green-600 bg-green-100"
      case "risk":
        return "text-red-600 bg-red-100"
      case "performance":
        return "text-blue-600 bg-blue-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Investment Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400">Advanced analytics and insights for your portfolio</p>
        </div>
        <div className="flex items-center gap-2">
          {["6M", "1Y", "2Y", "5Y"].map((period) => (
            <Button
              key={period}
              variant={selectedTimeframe === period ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTimeframe(period)}
            >
              {period}
            </Button>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI-Powered Insights
          </CardTitle>
          <CardDescription>Machine learning insights based on your portfolio performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiInsights.map((insight) => {
              const Icon = getInsightIcon(insight.type)
              return (
                <div key={insight.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div className={`p-2 rounded-full ${getInsightColor(insight.type)}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {insight.confidence}% confidence
                    </Badge>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{insight.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{insight.description}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Impact:</span>
                      <Badge variant={insight.impact === "High" ? "destructive" : "secondary"} className="text-xs">
                        {insight.impact}
                      </Badge>
                    </div>
                    <p className="text-xs font-medium text-blue-600">{insight.action}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="sectors">Sectors</TabsTrigger>
          <TabsTrigger value="vintage">Vintage</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Comparison</CardTitle>
              <CardDescription>Portfolio performance vs benchmarks over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  portfolio: { label: "Portfolio", color: "#3b82f6" },
                  benchmark: { label: "Market Benchmark", color: "#6b7280" },
                  sector: { label: "Sector Average", color: "#10b981" },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceComparison}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="portfolio"
                      stroke="var(--color-portfolio)"
                      strokeWidth={3}
                      dot={{ fill: "var(--color-portfolio)", strokeWidth: 2, r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="benchmark"
                      stroke="var(--color-benchmark)"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                    <Line
                      type="monotone"
                      dataKey="sector"
                      stroke="var(--color-sector)"
                      strokeWidth={2}
                      strokeDasharray="3 3"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sectors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sector Analysis</CardTitle>
              <CardDescription>Performance breakdown by investment sectors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sectorAnalysis.map((sector) => (
                  <div key={sector.sector} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{sector.sector}</h3>
                      <Badge variant="secondary">{sector.investments} investments</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Total Value</p>
                        <p className="font-semibold">₹{sector.totalValue} Cr</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Avg Return</p>
                        <p className="font-semibold text-green-600">{sector.avgReturn}%</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Risk Score</p>
                        <p className="font-semibold">{sector.riskScore}/10</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vintage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vintage Year Analysis</CardTitle>
              <CardDescription>Performance by investment year</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  multiple: { label: "Multiple", color: "#3b82f6" },
                  irr: { label: "IRR %", color: "#10b981" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={vintageAnalysis}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="multiple" fill="var(--color-multiple)" />
                    <Bar dataKey="irr" fill="var(--color-irr)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Risk-Return Analysis</CardTitle>
              <CardDescription>Risk vs return profile by sector (bubble size = investment amount)</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  return: { label: "Return %", color: "#3b82f6" },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart data={riskReturnData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="risk" name="Risk Score" />
                    <YAxis dataKey="return" name="Return %" />
                    <ChartTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="bg-white dark:bg-gray-800 p-3 border rounded shadow">
                              <p className="font-medium">{data.sector}</p>
                              <p className="text-sm">Risk: {data.risk}/10</p>
                              <p className="text-sm">Return: {data.return}%</p>
                              <p className="text-sm">Value: ₹{data.size} Cr</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Scatter dataKey="return" fill="var(--color-return)" />
                  </ScatterChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
