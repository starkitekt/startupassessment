"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from "recharts"
import { Search, Filter, Download, TrendingUp } from "lucide-react"

const investments = [
  {
    id: "INV001",
    company: "TechNova",
    logo: "/placeholder.svg?height=32&width=32&text=TN",
    round: "Series A",
    investmentDate: "2024-01-15",
    amount: "₹2.5 Cr",
    valuation: "₹25 Cr",
    ownership: "15%",
    currentValue: "₹3.2 Cr",
    irr: "28.4%",
    multiple: "1.28x",
    status: "Active",
    sector: "FinTech",
  },
  {
    id: "INV002",
    company: "GreenEarth",
    logo: "/placeholder.svg?height=32&width=32&text=GE",
    round: "Seed",
    investmentDate: "2024-03-20",
    amount: "₹75 L",
    valuation: "₹5 Cr",
    ownership: "18%",
    currentValue: "₹85 L",
    irr: "15.2%",
    multiple: "1.13x",
    status: "Active",
    sector: "CleanTech",
  },
  {
    id: "INV003",
    company: "HealthPlus",
    logo: "/placeholder.svg?height=32&width=32&text=HP",
    round: "Pre-Seed",
    investmentDate: "2024-02-10",
    amount: "₹30 L",
    valuation: "₹1.5 Cr",
    ownership: "22%",
    currentValue: "₹28 L",
    irr: "-8.5%",
    multiple: "0.93x",
    status: "Underperforming",
    sector: "HealthTech",
  },
  {
    id: "INV004",
    company: "EduLearn",
    logo: "/placeholder.svg?height=32&width=32&text=EL",
    round: "Series B",
    investmentDate: "2023-08-05",
    amount: "₹5 Cr",
    valuation: "₹50 Cr",
    ownership: "12%",
    currentValue: "₹7.2 Cr",
    irr: "35.8%",
    multiple: "1.44x",
    status: "Outperforming",
    sector: "EdTech",
  },
]

const performanceData = [
  { month: "Jan", invested: 2.5, currentValue: 2.8 },
  { month: "Feb", invested: 3.25, currentValue: 3.6 },
  { month: "Mar", invested: 4.0, currentValue: 4.5 },
  { month: "Apr", invested: 4.5, currentValue: 5.1 },
  { month: "May", invested: 5.0, currentValue: 5.8 },
  { month: "Jun", invested: 5.5, currentValue: 6.4 },
]

const sectorAllocation = [
  { sector: "FinTech", amount: 8.5, percentage: 35 },
  { sector: "HealthTech", amount: 6.2, percentage: 25 },
  { sector: "EdTech", amount: 5.0, percentage: 20 },
  { sector: "CleanTech", amount: 3.8, percentage: 15 },
  { sector: "AgriTech", amount: 1.2, percentage: 5 },
]

export function PortfolioInvestments() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sectorFilter, setSectorFilter] = useState("all")

  const filteredInvestments = investments.filter((investment) => {
    const matchesSearch = investment.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || investment.status === statusFilter
    const matchesSector = sectorFilter === "all" || investment.sector === sectorFilter
    return matchesSearch && matchesStatus && matchesSector
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-blue-100 text-blue-800">Active</Badge>
      case "Outperforming":
        return <Badge className="bg-green-100 text-green-800">Outperforming</Badge>
      case "Underperforming":
        return <Badge className="bg-red-100 text-red-800">Underperforming</Badge>
      case "Exited":
        return <Badge className="bg-gray-100 text-gray-800">Exited</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getIRRColor = (irr: string) => {
    const value = Number.parseFloat(irr.replace("%", ""))
    if (value > 20) return "text-green-600"
    if (value > 0) return "text-blue-600"
    return "text-red-600"
  }

  const totalInvested = investments.reduce(
    (sum, inv) => sum + Number.parseFloat(inv.amount.replace("₹", "").replace(" Cr", "").replace(" L", "") || "0"),
    0,
  )
  const totalCurrentValue = investments.reduce(
    (sum, inv) =>
      sum + Number.parseFloat(inv.currentValue.replace("₹", "").replace(" Cr", "").replace(" L", "") || "0"),
    0,
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Investment Portfolio</h2>
          <p className="text-muted-foreground">Track and analyze all investments and returns</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹8.55 Cr</div>
            <p className="text-xs text-muted-foreground">Across {investments.length} investments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹11.25 Cr</div>
            <div className="flex items-center text-xs text-green-500">
              <TrendingUp className="mr-1 h-4 w-4" />
              <span>+31.6% total return</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average IRR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">22.8%</div>
            <p className="text-xs text-muted-foreground">Weighted average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Best Performer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">EduLearn</div>
            <div className="flex items-center text-xs text-green-500">
              <TrendingUp className="mr-1 h-4 w-4" />
              <span>35.8% IRR</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Investment Performance</CardTitle>
            <CardDescription>Invested amount vs current value over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value} Cr`, ""]} />
                  <Line type="monotone" dataKey="invested" stroke="#8884d8" name="Invested" />
                  <Line type="monotone" dataKey="currentValue" stroke="#82ca9d" name="Current Value" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sector Allocation</CardTitle>
            <CardDescription>Investment distribution by sector</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sectorAllocation} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="sector" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value} Cr`, "Investment"]} />
                  <Bar dataKey="amount" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search investments..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Outperforming">Outperforming</SelectItem>
                <SelectItem value="Underperforming">Underperforming</SelectItem>
                <SelectItem value="Exited">Exited</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sectorFilter} onValueChange={setSectorFilter}>
              <SelectTrigger className="w-[150px]">
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
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Advanced
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Investments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Investment Details</CardTitle>
          <CardDescription>Comprehensive view of all investments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Round</TableHead>
                  <TableHead>Investment</TableHead>
                  <TableHead>Current Value</TableHead>
                  <TableHead>IRR</TableHead>
                  <TableHead>Multiple</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvestments.map((investment) => (
                  <TableRow key={investment.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={investment.logo || "/placeholder.svg"} alt={investment.company} />
                          <AvatarFallback>{investment.company.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{investment.company}</div>
                          <div className="text-sm text-muted-foreground">{investment.sector}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{investment.round}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{investment.amount}</TableCell>
                    <TableCell className="font-medium">{investment.currentValue}</TableCell>
                    <TableCell className={getIRRColor(investment.irr)}>{investment.irr}</TableCell>
                    <TableCell className="font-medium">{investment.multiple}</TableCell>
                    <TableCell>{getStatusBadge(investment.status)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(investment.investmentDate).toLocaleDateString()}
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
