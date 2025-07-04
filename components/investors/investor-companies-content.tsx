"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, Eye, TrendingUp, Building2, MapPin, Globe, Mail, Phone } from "lucide-react"

const portfolioCompanies = [
  {
    id: 1,
    name: "PayTech Solutions",
    sector: "FinTech",
    stage: "Series B",
    valuation: "₹45 Cr",
    investment: "₹8 Cr",
    ownership: "18%",
    healthScore: 85,
    growth: "+45%",
    founded: "2019",
    location: "Bangalore",
    employees: 120,
    revenue: "₹15 Cr",
    status: "Active",
    lastUpdate: "2 days ago",
    website: "paytech.com",
    email: "contact@paytech.com",
    phone: "+91 98765 43210",
    description: "Digital payment solutions for SMEs",
    keyMetrics: {
      mrr: "₹1.2 Cr",
      churn: "2.5%",
      cac: "₹2,500",
      ltv: "₹45,000",
    },
  },
  {
    id: 2,
    name: "HealthAI",
    sector: "HealthTech",
    stage: "Series A",
    valuation: "₹38 Cr",
    investment: "₹6 Cr",
    ownership: "16%",
    healthScore: 78,
    growth: "+38%",
    founded: "2020",
    location: "Mumbai",
    employees: 85,
    revenue: "₹8 Cr",
    status: "Active",
    lastUpdate: "1 day ago",
    website: "healthai.com",
    email: "info@healthai.com",
    phone: "+91 98765 43211",
    description: "AI-powered diagnostic solutions",
    keyMetrics: {
      mrr: "₹65 L",
      churn: "1.8%",
      cac: "₹3,200",
      ltv: "₹52,000",
    },
  },
  {
    id: 3,
    name: "EduPlatform",
    sector: "EdTech",
    stage: "Series A",
    valuation: "₹32 Cr",
    investment: "₹5 Cr",
    ownership: "15%",
    healthScore: 72,
    growth: "+32%",
    founded: "2018",
    location: "Delhi",
    employees: 95,
    revenue: "₹6 Cr",
    status: "Active",
    lastUpdate: "3 days ago",
    website: "eduplatform.com",
    email: "hello@eduplatform.com",
    phone: "+91 98765 43212",
    description: "Online learning platform for professionals",
    keyMetrics: {
      mrr: "₹50 L",
      churn: "3.2%",
      cac: "₹1,800",
      ltv: "₹28,000",
    },
  },
  {
    id: 4,
    name: "RetailTech",
    sector: "E-commerce",
    stage: "Seed",
    valuation: "₹28 Cr",
    investment: "₹4 Cr",
    ownership: "14%",
    healthScore: 68,
    growth: "+28%",
    founded: "2021",
    location: "Hyderabad",
    employees: 65,
    revenue: "₹4 Cr",
    status: "Active",
    lastUpdate: "1 week ago",
    website: "retailtech.com",
    email: "team@retailtech.com",
    phone: "+91 98765 43213",
    description: "B2B retail management platform",
    keyMetrics: {
      mrr: "₹35 L",
      churn: "4.1%",
      cac: "₹2,100",
      ltv: "₹32,000",
    },
  },
]

export function InvestorCompaniesContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSector, setSelectedSector] = useState("all")
  const [selectedStage, setSelectedStage] = useState("all")
  const [selectedCompany, setSelectedCompany] = useState<(typeof portfolioCompanies)[0] | null>(null)

  const filteredCompanies = portfolioCompanies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.sector.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSector = selectedSector === "all" || company.sector === selectedSector
    const matchesStage = selectedStage === "all" || company.stage === selectedStage

    return matchesSearch && matchesSector && matchesStage
  })

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getHealthScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-100"
    if (score >= 60) return "bg-yellow-100"
    return "bg-red-100"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Portfolio Companies</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and monitor your portfolio companies</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={selectedSector} onValueChange={setSelectedSector}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All Sectors" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sectors</SelectItem>
                <SelectItem value="FinTech">FinTech</SelectItem>
                <SelectItem value="HealthTech">HealthTech</SelectItem>
                <SelectItem value="EdTech">EdTech</SelectItem>
                <SelectItem value="E-commerce">E-commerce</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStage} onValueChange={setSelectedStage}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All Stages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="Seed">Seed</SelectItem>
                <SelectItem value="Series A">Series A</SelectItem>
                <SelectItem value="Series B">Series B</SelectItem>
                <SelectItem value="Series C">Series C</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Companies Table */}
      <Card>
        <CardHeader>
          <CardTitle>Companies ({filteredCompanies.length})</CardTitle>
          <CardDescription>Overview of all portfolio companies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Sector</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Valuation</TableHead>
                  <TableHead>Investment</TableHead>
                  <TableHead>Ownership</TableHead>
                  <TableHead>Health Score</TableHead>
                  <TableHead>Growth</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCompanies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{company.name}</p>
                        <p className="text-sm text-gray-500">{company.location}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{company.sector}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{company.stage}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{company.valuation}</TableCell>
                    <TableCell>{company.investment}</TableCell>
                    <TableCell>{company.ownership}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-full ${getHealthScoreBg(company.healthScore)} flex items-center justify-center`}
                        >
                          <span className={`text-xs font-medium ${getHealthScoreColor(company.healthScore)}`}>
                            {company.healthScore}
                          </span>
                        </div>
                        <Progress value={company.healthScore} className="w-16" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="text-green-600 font-medium">{company.growth}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedCompany(company)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <Building2 className="h-5 w-5" />
                              {company.name}
                            </DialogTitle>
                            <DialogDescription>{company.description}</DialogDescription>
                          </DialogHeader>

                          <Tabs defaultValue="overview" className="w-full">
                            <TabsList className="grid w-full grid-cols-4">
                              <TabsTrigger value="overview">Overview</TabsTrigger>
                              <TabsTrigger value="metrics">Metrics</TabsTrigger>
                              <TabsTrigger value="contact">Contact</TabsTrigger>
                              <TabsTrigger value="documents">Documents</TabsTrigger>
                            </TabsList>

                            <TabsContent value="overview" className="space-y-4">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="space-y-2">
                                  <p className="text-sm text-gray-500">Valuation</p>
                                  <p className="text-lg font-semibold">{company.valuation}</p>
                                </div>
                                <div className="space-y-2">
                                  <p className="text-sm text-gray-500">Our Investment</p>
                                  <p className="text-lg font-semibold">{company.investment}</p>
                                </div>
                                <div className="space-y-2">
                                  <p className="text-sm text-gray-500">Ownership</p>
                                  <p className="text-lg font-semibold">{company.ownership}</p>
                                </div>
                                <div className="space-y-2">
                                  <p className="text-sm text-gray-500">Revenue</p>
                                  <p className="text-lg font-semibold">{company.revenue}</p>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="space-y-2">
                                  <p className="text-sm text-gray-500">Founded</p>
                                  <p className="font-medium">{company.founded}</p>
                                </div>
                                <div className="space-y-2">
                                  <p className="text-sm text-gray-500">Employees</p>
                                  <p className="font-medium">{company.employees}</p>
                                </div>
                                <div className="space-y-2">
                                  <p className="text-sm text-gray-500">Stage</p>
                                  <Badge variant="outline">{company.stage}</Badge>
                                </div>
                                <div className="space-y-2">
                                  <p className="text-sm text-gray-500">Health Score</p>
                                  <div className="flex items-center gap-2">
                                    <span className={`font-semibold ${getHealthScoreColor(company.healthScore)}`}>
                                      {company.healthScore}/100
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </TabsContent>

                            <TabsContent value="metrics" className="space-y-4">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <Card>
                                  <CardHeader className="pb-2">
                                    <CardTitle className="text-sm">MRR</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <p className="text-2xl font-bold">{company.keyMetrics.mrr}</p>
                                  </CardContent>
                                </Card>
                                <Card>
                                  <CardHeader className="pb-2">
                                    <CardTitle className="text-sm">Churn Rate</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <p className="text-2xl font-bold">{company.keyMetrics.churn}</p>
                                  </CardContent>
                                </Card>
                                <Card>
                                  <CardHeader className="pb-2">
                                    <CardTitle className="text-sm">CAC</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <p className="text-2xl font-bold">{company.keyMetrics.cac}</p>
                                  </CardContent>
                                </Card>
                                <Card>
                                  <CardHeader className="pb-2">
                                    <CardTitle className="text-sm">LTV</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <p className="text-2xl font-bold">{company.keyMetrics.ltv}</p>
                                  </CardContent>
                                </Card>
                              </div>
                            </TabsContent>

                            <TabsContent value="contact" className="space-y-4">
                              <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                  <Globe className="h-5 w-5 text-gray-500" />
                                  <div>
                                    <p className="font-medium">Website</p>
                                    <p className="text-blue-600">{company.website}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Mail className="h-5 w-5 text-gray-500" />
                                  <div>
                                    <p className="font-medium">Email</p>
                                    <p className="text-blue-600">{company.email}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Phone className="h-5 w-5 text-gray-500" />
                                  <div>
                                    <p className="font-medium">Phone</p>
                                    <p>{company.phone}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <MapPin className="h-5 w-5 text-gray-500" />
                                  <div>
                                    <p className="font-medium">Location</p>
                                    <p>{company.location}</p>
                                  </div>
                                </div>
                              </div>
                            </TabsContent>

                            <TabsContent value="documents" className="space-y-4">
                              <div className="text-center py-8">
                                <p className="text-gray-500">Document management coming soon</p>
                              </div>
                            </TabsContent>
                          </Tabs>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
