"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Building,
  Users,
  Calendar,
  FileText,
  BarChart3,
  PieChart,
  Target,
  Award,
  AlertTriangle,
  Plus,
  Eye,
  Edit,
  Download,
} from "lucide-react"

interface PortfolioCompany {
  id: string
  name: string
  logo: string
  sector: string
  stage: "pre-seed" | "seed" | "series-a" | "series-b" | "series-c" | "growth"
  foundedDate: Date
  investmentDate: Date
  totalRaised: number
  ourInvestment: number
  ownershipPercentage: number
  currentValuation: number
  lastValuationDate: Date
  monthlyRevenue: number
  monthlyGrowthRate: number
  burnRate: number
  runway: number
  employees: number
  founders: Founder[]
  keyMetrics: KeyMetric[]
  boardMembers: BoardMember[]
  nextMilestones: Milestone[]
  riskFactors: RiskFactor[]
  exitStrategy?: ExitStrategy
  status: "active" | "exited" | "failed" | "on-hold"
}

interface Founder {
  id: string
  name: string
  role: string
  linkedIn?: string
  email: string
}

interface KeyMetric {
  id: string
  name: string
  value: number
  unit: string
  trend: "up" | "down" | "stable"
  lastUpdated: Date
  target?: number
}

interface BoardMember {
  id: string
  name: string
  role: string
  organization: string
  joinDate: Date
}

interface Milestone {
  id: string
  title: string
  description: string
  targetDate: Date
  status: "not-started" | "in-progress" | "completed" | "delayed"
  category: "product" | "business" | "funding" | "team"
}

interface RiskFactor {
  id: string
  title: string
  description: string
  severity: "low" | "medium" | "high" | "critical"
  probability: number
  impact: number
  mitigation: string
  owner: string
}

interface ExitStrategy {
  type: "ipo" | "acquisition" | "merger" | "buyback"
  targetDate?: Date
  estimatedValuation?: number
  potentialAcquirers?: string[]
  status: "planning" | "in-progress" | "completed"
}

interface Investment {
  id: string
  companyId: string
  round: string
  amount: number
  date: Date
  leadInvestor: string
  valuation: number
  ownershipPercentage: number
  liquidationPreference: number
  boardSeats: number
}

interface DueDiligenceItem {
  id: string
  companyId: string
  category: "legal" | "financial" | "technical" | "market" | "team"
  title: string
  description: string
  status: "pending" | "in-review" | "completed" | "requires-action"
  assignee: string
  dueDate: Date
  documents: string[]
  notes: string
}

export function AdvancedPortfolioSystem() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedCompany, setSelectedCompany] = useState<PortfolioCompany | null>(null)
  const [portfolioFilter, setPortfolioFilter] = useState("all")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  // Mock data
  const [portfolioCompanies, setPortfolioCompanies] = useState<PortfolioCompany[]>([
    {
      id: "company-1",
      name: "TechFlow Solutions",
      logo: "/placeholder.svg?height=50&width=50",
      sector: "SaaS",
      stage: "series-a",
      foundedDate: new Date("2022-03-15"),
      investmentDate: new Date("2023-06-20"),
      totalRaised: 5000000,
      ourInvestment: 1500000,
      ownershipPercentage: 15,
      currentValuation: 25000000,
      lastValuationDate: new Date("2024-01-15"),
      monthlyRevenue: 450000,
      monthlyGrowthRate: 12,
      burnRate: 280000,
      runway: 18,
      employees: 45,
      founders: [
        {
          id: "founder-1",
          name: "Sarah Johnson",
          role: "CEO",
          linkedIn: "https://linkedin.com/in/sarahjohnson",
          email: "sarah@techflow.com",
        },
        {
          id: "founder-2",
          name: "Michael Chen",
          role: "CTO",
          linkedIn: "https://linkedin.com/in/michaelchen",
          email: "michael@techflow.com",
        },
      ],
      keyMetrics: [
        {
          id: "metric-1",
          name: "Monthly Recurring Revenue",
          value: 450000,
          unit: "USD",
          trend: "up",
          lastUpdated: new Date("2024-01-20"),
          target: 500000,
        },
        {
          id: "metric-2",
          name: "Customer Acquisition Cost",
          value: 120,
          unit: "USD",
          trend: "down",
          lastUpdated: new Date("2024-01-20"),
          target: 100,
        },
        {
          id: "metric-3",
          name: "Net Revenue Retention",
          value: 115,
          unit: "%",
          trend: "up",
          lastUpdated: new Date("2024-01-20"),
          target: 120,
        },
      ],
      boardMembers: [
        {
          id: "board-1",
          name: "David Wilson",
          role: "Board Chair",
          organization: "Venture Partners",
          joinDate: new Date("2023-06-20"),
        },
      ],
      nextMilestones: [
        {
          id: "milestone-1",
          title: "Launch Enterprise Product",
          description: "Release enterprise-grade features for large customers",
          targetDate: new Date("2024-03-15"),
          status: "in-progress",
          category: "product",
        },
        {
          id: "milestone-2",
          title: "Series B Fundraising",
          description: "Raise $10M Series B round",
          targetDate: new Date("2024-06-30"),
          status: "not-started",
          category: "funding",
        },
      ],
      riskFactors: [
        {
          id: "risk-1",
          title: "Market Competition",
          description: "Increasing competition from well-funded competitors",
          severity: "medium",
          probability: 70,
          impact: 60,
          mitigation: "Focus on product differentiation and customer retention",
          owner: "CEO",
        },
      ],
      status: "active",
    },
  ])

  const [investments, setInvestments] = useState<Investment[]>([
    {
      id: "inv-1",
      companyId: "company-1",
      round: "Series A",
      amount: 1500000,
      date: new Date("2023-06-20"),
      leadInvestor: "Venture Partners",
      valuation: 15000000,
      ownershipPercentage: 15,
      liquidationPreference: 1,
      boardSeats: 1,
    },
  ])

  const [dueDiligenceItems, setDueDiligenceItems] = useState<DueDiligenceItem[]>([
    {
      id: "dd-1",
      companyId: "company-1",
      category: "financial",
      title: "Q4 Financial Review",
      description: "Review Q4 financial statements and projections",
      status: "in-review",
      assignee: "Financial Analyst",
      dueDate: new Date("2024-02-15"),
      documents: ["Q4_Financials.pdf", "Projections_2024.xlsx"],
      notes: "Initial review shows strong growth metrics",
    },
  ])

  const calculatePortfolioValue = () => {
    return portfolioCompanies.reduce((total, company) => {
      return total + (company.currentValuation * company.ownershipPercentage) / 100
    }, 0)
  }

  const calculateTotalInvestment = () => {
    return portfolioCompanies.reduce((total, company) => total + company.ourInvestment, 0)
  }

  const calculateUnrealizedGains = () => {
    const currentValue = calculatePortfolioValue()
    const totalInvestment = calculateTotalInvestment()
    return currentValue - totalInvestment
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "pre-seed":
        return "bg-gray-100 text-gray-800"
      case "seed":
        return "bg-blue-100 text-blue-800"
      case "series-a":
        return "bg-green-100 text-green-800"
      case "series-b":
        return "bg-yellow-100 text-yellow-800"
      case "series-c":
        return "bg-orange-100 text-orange-800"
      case "growth":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRiskColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "critical":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredCompanies = portfolioCompanies.filter((company) => {
    if (portfolioFilter === "all") return true
    if (portfolioFilter === "active") return company.status === "active"
    if (portfolioFilter === "high-growth") return company.monthlyGrowthRate > 10
    if (portfolioFilter === "at-risk") return company.runway < 12
    return company.stage === portfolioFilter
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Portfolio Management</h1>
          <p className="text-muted-foreground">Advanced portfolio tracking and management</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Investment
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="due-diligence">Due Diligence</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="exits">Exits</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(calculatePortfolioValue())}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+12.5%</span> from last quarter
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(calculateTotalInvestment())}</div>
                <p className="text-xs text-muted-foreground">Across {portfolioCompanies.length} companies</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unrealized Gains</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(calculateUnrealizedGains())}</div>
                <p className="text-xs text-muted-foreground">
                  {formatPercentage((calculateUnrealizedGains() / calculateTotalInvestment()) * 100)} return
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Companies</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {portfolioCompanies.filter((c) => c.status === "active").length}
                </div>
                <p className="text-xs text-muted-foreground">2 fundraising, 1 exit planning</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>Companies with highest growth rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {portfolioCompanies
                    .sort((a, b) => b.monthlyGrowthRate - a.monthlyGrowthRate)
                    .slice(0, 3)
                    .map((company) => (
                      <div key={company.id} className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                          <Building className="h-5 w-5" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">{company.name}</p>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStageColor(company.stage)}>{company.stage}</Badge>
                            <span className="text-xs text-muted-foreground">{company.sector}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-green-600">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            <span className="text-sm font-medium">{formatPercentage(company.monthlyGrowthRate)}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">monthly growth</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Alerts</CardTitle>
                <CardDescription>Companies requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {portfolioCompanies
                    .filter(
                      (company) =>
                        company.runway < 12 ||
                        company.riskFactors.some((r) => r.severity === "high" || r.severity === "critical"),
                    )
                    .slice(0, 3)
                    .map((company) => (
                      <div key={company.id} className="flex items-center space-x-4">
                        <AlertTriangle className="h-5 w-5 text-orange-500" />
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">{company.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {company.runway < 12 ? `${company.runway} months runway` : "High risk factors identified"}
                          </p>
                        </div>
                        <Button size="sm" variant="outline">
                          Review
                        </Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Portfolio Distribution</CardTitle>
              <CardDescription>Investment allocation by stage and sector</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-medium mb-4">By Stage</h4>
                  <div className="space-y-2">
                    {["seed", "series-a", "series-b", "growth"].map((stage) => {
                      const companies = portfolioCompanies.filter((c) => c.stage === stage)
                      const percentage = (companies.length / portfolioCompanies.length) * 100
                      return (
                        <div key={stage} className="flex items-center justify-between">
                          <span className="text-sm capitalize">{stage.replace("-", " ")}</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={percentage} className="w-20 h-2" />
                            <span className="text-xs text-muted-foreground w-8">{Math.round(percentage)}%</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-4">By Sector</h4>
                  <div className="space-y-2">
                    {["SaaS", "FinTech", "HealthTech", "EdTech"].map((sector) => {
                      const companies = portfolioCompanies.filter((c) => c.sector === sector)
                      const percentage = (companies.length / portfolioCompanies.length) * 100
                      return (
                        <div key={sector} className="flex items-center justify-between">
                          <span className="text-sm">{sector}</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={percentage} className="w-20 h-2" />
                            <span className="text-xs text-muted-foreground w-8">{Math.round(percentage)}%</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="companies" className="space-y-4">
          <div className="flex items-center space-x-4">
            <Select value={portfolioFilter} onValueChange={setPortfolioFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter companies" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Companies</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="high-growth">High Growth</SelectItem>
                <SelectItem value="at-risk">At Risk</SelectItem>
                <SelectItem value="seed">Seed Stage</SelectItem>
                <SelectItem value="series-a">Series A</SelectItem>
                <SelectItem value="series-b">Series B</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>

          <div className="grid gap-6">
            {filteredCompanies.map((company) => (
              <Card key={company.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                        <Building className="h-8 w-8" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-xl font-semibold">{company.name}</h3>
                          <Badge className={getStageColor(company.stage)}>{company.stage}</Badge>
                          <Badge variant="outline">{company.sector}</Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Valuation:</span>
                            <p className="font-medium">{formatCurrency(company.currentValuation)}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Our Investment:</span>
                            <p className="font-medium">{formatCurrency(company.ourInvestment)}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Ownership:</span>
                            <p className="font-medium">{formatPercentage(company.ownershipPercentage)}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Monthly Revenue:</span>
                            <p className="font-medium">{formatCurrency(company.monthlyRevenue)}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            {company.monthlyGrowthRate > 0 ? (
                              <TrendingUp className="h-4 w-4 text-green-500" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-500" />
                            )}
                            <span className={company.monthlyGrowthRate > 0 ? "text-green-600" : "text-red-600"}>
                              {formatPercentage(company.monthlyGrowthRate)} growth
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{company.runway} months runway</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{company.employees} employees</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Manage
                      </Button>
                    </div>
                  </div>

                  {company.riskFactors.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="text-sm font-medium mb-2">Risk Factors</h4>
                      <div className="flex flex-wrap gap-2">
                        {company.riskFactors.slice(0, 3).map((risk) => (
                          <Badge key={risk.id} className={getRiskColor(risk.severity)}>
                            {risk.title}
                          </Badge>
                        ))}
                        {company.riskFactors.length > 3 && (
                          <Badge variant="outline">+{company.riskFactors.length - 3} more</Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {company.nextMilestones.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="text-sm font-medium mb-2">Upcoming Milestones</h4>
                      <div className="space-y-1">
                        {company.nextMilestones.slice(0, 2).map((milestone) => (
                          <div key={milestone.id} className="flex items-center justify-between text-sm">
                            <span>{milestone.title}</span>
                            <span className="text-muted-foreground">{milestone.targetDate.toLocaleDateString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="investments" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Investment History</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Record Investment
            </Button>
          </div>

          <div className="grid gap-4">
            {investments.map((investment) => {
              const company = portfolioCompanies.find((c) => c.id === investment.companyId)
              return (
                <Card key={investment.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold">{company?.name}</h3>
                          <Badge variant="outline">{investment.round}</Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Investment Amount:</span>
                            <p className="font-medium">{formatCurrency(investment.amount)}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Valuation:</span>
                            <p className="font-medium">{formatCurrency(investment.valuation)}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Ownership:</span>
                            <p className="font-medium">{formatPercentage(investment.ownershipPercentage)}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Board Seats:</span>
                            <p className="font-medium">{investment.boardSeats}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              Invested: {investment.date.toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Lead: {investment.leadInvestor}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <FileText className="mr-2 h-4 w-4" />
                          Documents
                        </Button>
                        <Button size="sm">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="due-diligence" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Due Diligence</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Item
            </Button>
          </div>

          <div className="grid gap-4">
            {dueDiligenceItems.map((item) => {
              const company = portfolioCompanies.find((c) => c.id === item.companyId)
              return (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{item.title}</h3>
                          <Badge variant="outline">{item.category}</Badge>
                          <Badge
                            className={
                              item.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : item.status === "in-review"
                                  ? "bg-blue-100 text-blue-800"
                                  : item.status === "requires-action"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-gray-100 text-gray-800"
                            }
                          >
                            {item.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <Building className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{company?.name}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Assigned: {item.assignee}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Due: {item.dueDate.toLocaleDateString()}</span>
                          </div>
                        </div>
                        {item.documents.length > 0 && (
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{item.documents.length} document(s)</span>
                          </div>
                        )}
                        {item.notes && <p className="text-sm bg-muted p-2 rounded">{item.notes}</p>}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                        <Button size="sm">
                          <Edit className="mr-2 h-4 w-4" />
                          Update
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Performance Analytics</CardTitle>
                <CardDescription>Comprehensive performance metrics and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Total Portfolio IRR</h4>
                    <div className="text-2xl font-bold text-green-600">24.5%</div>
                    <p className="text-xs text-muted-foreground">Internal Rate of Return</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Average Revenue Growth</h4>
                    <div className="text-2xl font-bold">15.2%</div>
                    <p className="text-xs text-muted-foreground">Monthly average across portfolio</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Success Rate</h4>
                    <div className="text-2xl font-bold">67%</div>
                    <p className="text-xs text-muted-foreground">Companies meeting milestones</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Growth Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
                    <div className="text-center space-y-2">
                      <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground" />
                      <p className="text-muted-foreground">Revenue growth chart would be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Valuation Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
                    <div className="text-center space-y-2">
                      <PieChart className="h-12 w-12 mx-auto text-muted-foreground" />
                      <p className="text-muted-foreground">Valuation trends chart would be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="exits" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Exit Planning & Management</h2>
            <Button>
              <Target className="mr-2 h-4 w-4" />
              Plan Exit
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Exit Pipeline</CardTitle>
              <CardDescription>Companies in various stages of exit planning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {portfolioCompanies
                  .filter((company) => company.exitStrategy)
                  .map((company) => (
                    <div key={company.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{company.name}</h3>
                          <Badge variant="outline">{company.exitStrategy?.type}</Badge>
                          <Badge
                            className={
                              company.exitStrategy?.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : company.exitStrategy?.status === "in-progress"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-800"
                            }
                          >
                            {company.exitStrategy?.status}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          {company.exitStrategy?.targetDate && (
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>Target: {company.exitStrategy.targetDate.toLocaleDateString()}</span>
                            </div>
                          )}
                          {company.exitStrategy?.estimatedValuation && (
                            <div className="flex items-center space-x-1">
                              <DollarSign className="h-4 w-4" />
                              <span>Est. Value: {formatCurrency(company.exitStrategy.estimatedValuation)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="mr-2 h-4 w-4" />
                          Details
                        </Button>
                        <Button size="sm">
                          <Edit className="mr-2 h-4 w-4" />
                          Manage
                        </Button>
                      </div>
                    </div>
                  ))}

                {portfolioCompanies.filter((company) => company.exitStrategy).length === 0 && (
                  <div className="text-center py-8">
                    <Award className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Active Exit Plans</h3>
                    <p className="text-muted-foreground mb-4">
                      Start planning exits for your portfolio companies to maximize returns
                    </p>
                    <Button>Plan First Exit</Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
