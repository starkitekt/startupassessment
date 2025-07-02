"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Lightbulb,
  TrendingUp,
  AlertTriangle,
  Target,
  Brain,
  Zap,
  CheckCircle,
  Clock,
  ArrowRight,
  BarChart3,
  DollarSign,
} from "lucide-react"

const insights = [
  {
    id: "insight-1",
    type: "opportunity",
    title: "HealthTech Sector Momentum",
    description:
      "HealthTech applications show 28% higher success rates and 15% faster time-to-funding compared to other sectors.",
    impact: "High",
    confidence: 92,
    actionable: true,
    timeframe: "Next Quarter",
    metrics: {
      potentialValue: "₹12.5 Cr",
      affectedCompanies: 8,
      timeline: "3 months",
    },
    recommendations: [
      "Allocate additional resources to HealthTech pipeline",
      "Fast-track promising HealthTech applications",
      "Consider sector-specific mentorship programs",
    ],
  },
  {
    id: "insight-2",
    type: "risk",
    title: "Early-Stage Funding Gap",
    description:
      "Pre-seed startups experiencing 22% higher rejection rates due to funding constraints, potentially impacting future pipeline quality.",
    impact: "Medium",
    confidence: 87,
    actionable: true,
    timeframe: "Immediate",
    metrics: {
      potentialLoss: "₹8.2 Cr",
      affectedCompanies: 12,
      timeline: "6 weeks",
    },
    recommendations: [
      "Review pre-seed funding criteria",
      "Consider smaller initial investments",
      "Implement staged funding approach",
    ],
  },
  {
    id: "insight-3",
    type: "trend",
    title: "Application Quality Improvement",
    description:
      "Overall application quality has improved by 15% over the last quarter, resulting in higher approval rates despite stricter criteria.",
    impact: "High",
    confidence: 96,
    actionable: false,
    timeframe: "Ongoing",
    metrics: {
      improvement: "15%",
      affectedCompanies: 24,
      timeline: "Last quarter",
    },
    recommendations: [
      "Maintain current screening processes",
      "Document successful evaluation criteria",
      "Share best practices with other incubators",
    ],
  },
  {
    id: "insight-4",
    type: "prediction",
    title: "Q3 Application Surge",
    description:
      "Predictive models indicate a 25-30% increase in applications for Q3, with FinTech and CleanTech leading growth.",
    impact: "Medium",
    confidence: 78,
    actionable: true,
    timeframe: "Next Quarter",
    metrics: {
      expectedIncrease: "30%",
      additionalApplications: 45,
      timeline: "Q3 2024",
    },
    recommendations: [
      "Scale evaluation team capacity",
      "Prepare additional funding allocation",
      "Optimize application processing workflows",
    ],
  },
]

const aiMetrics = [
  {
    title: "Prediction Accuracy",
    value: "94.2%",
    change: "+2.1%",
    icon: Target,
    description: "Last 30 predictions",
  },
  {
    title: "Insights Generated",
    value: "156",
    change: "+23",
    icon: Lightbulb,
    description: "This month",
  },
  {
    title: "Actions Taken",
    value: "89%",
    change: "+5%",
    icon: CheckCircle,
    description: "Implementation rate",
  },
  {
    title: "Value Created",
    value: "₹2.8 Cr",
    change: "+₹450L",
    icon: DollarSign,
    description: "From AI recommendations",
  },
]

const getInsightIcon = (type: string) => {
  switch (type) {
    case "opportunity":
      return <TrendingUp className="h-5 w-5 text-green-500" />
    case "risk":
      return <AlertTriangle className="h-5 w-5 text-red-500" />
    case "trend":
      return <BarChart3 className="h-5 w-5 text-blue-500" />
    case "prediction":
      return <Brain className="h-5 w-5 text-purple-500" />
    default:
      return <Lightbulb className="h-5 w-5 text-yellow-500" />
  }
}

const getInsightColor = (type: string) => {
  switch (type) {
    case "opportunity":
      return "border-green-200 bg-green-50"
    case "risk":
      return "border-red-200 bg-red-50"
    case "trend":
      return "border-blue-200 bg-blue-50"
    case "prediction":
      return "border-purple-200 bg-purple-50"
    default:
      return "border-gray-200 bg-gray-50"
  }
}

const getImpactBadge = (impact: string) => {
  switch (impact) {
    case "High":
      return <Badge className="bg-red-100 text-red-800">High Impact</Badge>
    case "Medium":
      return <Badge className="bg-yellow-100 text-yellow-800">Medium Impact</Badge>
    case "Low":
      return <Badge className="bg-green-100 text-green-800">Low Impact</Badge>
    default:
      return <Badge variant="outline">{impact}</Badge>
  }
}

export function AIInsights() {
  return (
    <div className="space-y-6">
      {/* AI Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {aiMetrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center text-xs text-green-500">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  <span>{metric.change}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Tabs defaultValue="insights" className="space-y-6">
        <TabsList>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid gap-6">
            {insights.map((insight) => (
              <Card key={insight.id} className={`border-l-4 ${getInsightColor(insight.type)}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {getInsightIcon(insight.type)}
                      <div>
                        <CardTitle className="text-lg">{insight.title}</CardTitle>
                        <CardDescription className="mt-1">{insight.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getImpactBadge(insight.impact)}
                      <Badge variant="outline" className="text-xs">
                        {insight.confidence}% confidence
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 p-4 bg-white rounded-lg border">
                    {Object.entries(insight.metrics).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-lg font-semibold">{value}</div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      Recommended Actions
                    </h4>
                    <div className="space-y-2">
                      {insight.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <ArrowRight className="h-3 w-3 text-muted-foreground" />
                          <span>{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Timeframe: {insight.timeframe}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {insight.actionable && (
                        <Button size="sm" className="jpmc-gradient">
                          Take Action
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-500" />
                  Market Predictions
                </CardTitle>
                <CardDescription>AI-powered market trend forecasts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">FinTech Growth</h4>
                      <p className="text-sm text-muted-foreground">Next 6 months</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-green-600">+18%</div>
                      <div className="text-xs text-muted-foreground">85% confidence</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Application Volume</h4>
                      <p className="text-sm text-muted-foreground">Q3 2024</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-blue-600">+25%</div>
                      <div className="text-xs text-muted-foreground">78% confidence</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Success Rate</h4>
                      <p className="text-sm text-muted-foreground">Next cohort</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-green-600">72%</div>
                      <div className="text-xs text-muted-foreground">92% confidence</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-500" />
                  Performance Forecasts
                </CardTitle>
                <CardDescription>Portfolio performance predictions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Portfolio Value Growth</span>
                      <span className="text-sm text-green-600">+12.5%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">85% confidence</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">New Investments</span>
                      <span className="text-sm text-blue-600">8-12 companies</span>
                    </div>
                    <Progress value={78} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">78% confidence</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Average IRR</span>
                      <span className="text-sm text-green-600">32.1%</span>
                    </div>
                    <Progress value={91} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">91% confidence</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Priority Recommendations
                </CardTitle>
                <CardDescription>AI-generated action items ranked by impact</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      priority: "High",
                      title: "Expand HealthTech Focus",
                      description:
                        "Allocate 30% more resources to HealthTech pipeline based on superior performance metrics",
                      impact: "₹12.5 Cr potential value",
                      timeline: "2 weeks",
                    },
                    {
                      priority: "Medium",
                      title: "Optimize Pre-Seed Criteria",
                      description:
                        "Adjust evaluation criteria to reduce rejection rates while maintaining quality standards",
                      impact: "15% improvement in pipeline",
                      timeline: "1 month",
                    },
                    {
                      priority: "Medium",
                      title: "Scale Evaluation Team",
                      description: "Prepare for 30% increase in Q3 applications by expanding evaluation capacity",
                      impact: "Maintain processing speed",
                      timeline: "6 weeks",
                    },
                  ].map((rec, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            variant={rec.priority === "High" ? "destructive" : "secondary"}
                            className={
                              rec.priority === "High" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {rec.priority} Priority
                          </Badge>
                          <span className="text-sm text-muted-foreground">{rec.timeline}</span>
                        </div>
                        <h4 className="font-medium mb-1">{rec.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                        <div className="text-sm font-medium text-green-600">{rec.impact}</div>
                      </div>
                      <Button size="sm" variant="outline">
                        Implement
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>AI Model Performance</CardTitle>
                <CardDescription>Accuracy and reliability metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Prediction Accuracy</span>
                      <span className="text-sm font-semibold">94.2%</span>
                    </div>
                    <Progress value={94.2} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Model Confidence</span>
                      <span className="text-sm font-semibold">87.5%</span>
                    </div>
                    <Progress value={87.5} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Data Quality Score</span>
                      <span className="text-sm font-semibold">96.8%</span>
                    </div>
                    <Progress value={96.8} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Usage Statistics</CardTitle>
                <CardDescription>AI insights utilization metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Insights Generated</span>
                    <span className="font-semibold">156 this month</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Actions Implemented</span>
                    <span className="font-semibold">89% success rate</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Value Generated</span>
                    <span className="font-semibold">₹2.8 Cr</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Time Saved</span>
                    <span className="font-semibold">240 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
