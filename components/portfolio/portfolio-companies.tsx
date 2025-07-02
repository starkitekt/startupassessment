"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Building2,
  Users,
  Calendar,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit,
  MessageSquare,
} from "lucide-react"

const companies = [
  {
    id: "1",
    name: "TechNova",
    logo: "/placeholder.svg?height=40&width=40&text=TN",
    sector: "FinTech",
    stage: "Series A",
    valuation: "₹25 Cr",
    investment: "₹2.5 Cr",
    ownership: "15%",
    employees: 45,
    founded: "2022",
    monthlyRevenue: "₹45 L",
    growth: 12,
    healthScore: 85,
    lastUpdate: "2 days ago",
    status: "Active",
    milestones: { completed: 8, total: 10 },
  },
  {
    id: "2",
    name: "GreenEarth",
    logo: "/placeholder.svg?height=40&width=40&text=GE",
    sector: "CleanTech",
    stage: "Seed",
    valuation: "₹5 Cr",
    investment: "₹75 L",
    ownership: "18%",
    employees: 22,
    founded: "2023",
    monthlyRevenue: "₹12 L",
    growth: 8,
    healthScore: 78,
    lastUpdate: "1 week ago",
    status: "Active",
    milestones: { completed: 6, total: 8 },
  },
  {
    id: "3",
    name: "HealthPlus",
    logo: "/placeholder.svg?height=40&width=40&text=HP",
    sector: "HealthTech",
    stage: "Pre-Seed",
    valuation: "₹1.5 Cr",
    investment: "₹30 L",
    ownership: "22%",
    employees: 12,
    founded: "2023",
    monthlyRevenue: "₹4.5 L",
    growth: -2,
    healthScore: 65,
    lastUpdate: "3 days ago",
    status: "At Risk",
    milestones: { completed: 3, total: 6 },
  },
  {
    id: "4",
    name: "EduLearn",
    logo: "/placeholder.svg?height=40&width=40&text=EL",
    sector: "EdTech",
    stage: "Series B",
    valuation: "₹50 Cr",
    investment: "₹5 Cr",
    ownership: "12%",
    employees: 85,
    founded: "2021",
    monthlyRevenue: "₹1.2 Cr",
    growth: 15,
    healthScore: 92,
    lastUpdate: "1 day ago",
    status: "Active",
    milestones: { completed: 12, total: 12 },
  },
]

export function PortfolioCompanies() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sectorFilter, setSectorFilter] = useState("all")
  const [stageFilter, setStageFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSector = sectorFilter === "all" || company.sector === sectorFilter
    const matchesStage = stageFilter === "all" || company.stage === stageFilter
    const matchesStatus = statusFilter === "all" || company.status === statusFilter
    return matchesSearch && matchesSector && matchesStage && matchesStatus
  })

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "At Risk":
        return <Badge className="bg-red-100 text-red-800">At Risk</Badge>
      case "Exited":
        return <Badge className="bg-gray-100 text-gray-800">Exited</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Portfolio Companies</h2>
          <p className="text-muted-foreground">Detailed view of all portfolio companies</p>
        </div>
        <Button className="jpmc-gradient">
          <Plus className="mr-2 h-4 w-4" />
          Add Company
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search companies..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={sectorFilter} onValueChange={setSectorFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Sectors" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sectors</SelectItem>
                <SelectItem value="FinTech">FinTech</SelectItem>
                <SelectItem value="HealthTech">HealthTech</SelectItem>
                <SelectItem value="EdTech">EdTech</SelectItem>
                <SelectItem value="CleanTech">CleanTech</SelectItem>
              </SelectContent>
            </Select>
            <Select value={stageFilter} onValueChange={setStageFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Stages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="Pre-Seed">Pre-Seed</SelectItem>
                <SelectItem value="Seed">Seed</SelectItem>
                <SelectItem value="Series A">Series A</SelectItem>
                <SelectItem value="Series B">Series B</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="At Risk">At Risk</SelectItem>
                <SelectItem value="Exited">Exited</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Companies Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {filteredCompanies.map((company) => (
          <Card key={company.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={company.logo || "/placeholder.svg"} alt={company.name} />
                    <AvatarFallback>{company.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{company.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Badge variant="outline">{company.sector}</Badge>
                      <Badge variant="outline">{company.stage}</Badge>
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(company.status)}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Company
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Contact
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Valuation</span>
                  <p className="font-medium">{company.valuation}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Our Investment</span>
                  <p className="font-medium">{company.investment}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Ownership</span>
                  <p className="font-medium">{company.ownership}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Monthly Revenue</span>
                  <p className="font-medium">{company.monthlyRevenue}</p>
                </div>
              </div>

              {/* Growth and Health */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Growth Rate</span>
                  <div className="flex items-center">
                    {company.growth > 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                    )}
                    <span className={company.growth > 0 ? "text-green-600" : "text-red-600"}>{company.growth}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Health Score</span>
                  <span className={`font-medium ${getHealthScoreColor(company.healthScore)}`}>
                    {company.healthScore}/100
                  </span>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Milestones</span>
                    <span className="text-xs">
                      {company.milestones.completed}/{company.milestones.total}
                    </span>
                  </div>
                  <Progress value={(company.milestones.completed / company.milestones.total) * 100} className="h-2" />
                </div>
              </div>

              {/* Company Info */}
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{company.employees} employees</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>Founded {company.founded}</span>
                  </div>
                </div>
                <span>Updated {company.lastUpdate}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCompanies.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No companies found</h3>
            <p className="text-muted-foreground text-center mb-4">
              Try adjusting your search or filters to find companies
            </p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Company
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
