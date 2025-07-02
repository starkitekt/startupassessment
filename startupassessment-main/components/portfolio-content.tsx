"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Plus, Search, Filter, ArrowUpDown, Download } from "lucide-react"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Sample data
const portfolioData = [
  {
    id: "1",
    name: "TechNova",
    logo: "/placeholder.svg?height=40&width=40&text=TN",
    sector: "FinTech",
    stage: "Series A",
    investment: "₹2.5 Cr",
    valuation: "₹25 Cr",
    status: "Active",
    performance: "High",
  },
  {
    id: "2",
    name: "GreenEarth",
    logo: "/placeholder.svg?height=40&width=40&text=GE",
    sector: "CleanTech",
    stage: "Seed",
    investment: "₹75 L",
    valuation: "₹5 Cr",
    status: "Active",
    performance: "Medium",
  },
  {
    id: "3",
    name: "HealthPlus",
    logo: "/placeholder.svg?height=40&width=40&text=HP",
    sector: "HealthTech",
    stage: "Pre-Seed",
    investment: "₹30 L",
    valuation: "₹1.5 Cr",
    status: "Active",
    performance: "Low",
  },
  {
    id: "4",
    name: "EduLearn",
    logo: "/placeholder.svg?height=40&width=40&text=EL",
    sector: "EdTech",
    stage: "Series B",
    investment: "₹5 Cr",
    valuation: "₹50 Cr",
    status: "Active",
    performance: "High",
  },
  {
    id: "5",
    name: "AgriTech Solutions",
    logo: "/placeholder.svg?height=40&width=40&text=AT",
    sector: "AgriTech",
    stage: "Seed",
    investment: "₹60 L",
    valuation: "₹4 Cr",
    status: "Active",
    performance: "Medium",
  },
]

const performanceData = [
  { month: "Jan", value: 4000 },
  { month: "Feb", value: 3000 },
  { month: "Mar", value: 5000 },
  { month: "Apr", value: 2780 },
  { month: "May", value: 1890 },
  { month: "Jun", value: 2390 },
  { month: "Jul", value: 3490 },
]

const sectorData = [
  { name: "FinTech", value: 35 },
  { name: "HealthTech", value: 25 },
  { name: "EdTech", value: 20 },
  { name: "CleanTech", value: 15 },
  { name: "AgriTech", value: 5 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export function PortfolioContent() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredData = portfolioData.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const getPerformanceBadge = (performance: string) => {
    switch (performance) {
      case "High":
        return <Badge className="bg-green-500">High</Badge>
      case "Medium":
        return <Badge className="bg-yellow-500">Medium</Badge>
      case "Low":
        return <Badge className="bg-red-500">Low</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Portfolio Overview Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Startups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹45.6 Cr</div>
            <p className="text-xs text-muted-foreground">+₹3.2 Cr from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Valuation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹320 Cr</div>
            <p className="text-xs text-muted-foreground">+₹15 Cr from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Growth Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18.5%</div>
            <p className="text-xs text-muted-foreground">+2.3% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
            <CardDescription>Monthly valuation growth across portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sector Distribution</CardTitle>
            <CardDescription>Portfolio breakdown by industry sector</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {sectorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Table */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
          <div>
            <CardTitle>Portfolio Companies</CardTitle>
            <CardDescription>Manage your startup investments</CardDescription>
          </div>
          <Button className="jpmc-gradient">
            <Plus className="mr-2 h-4 w-4" /> Add Company
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 mb-4">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search companies..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
              <Button variant="outline" size="sm">
                <ArrowUpDown className="mr-2 h-4 w-4" /> Sort
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" /> Export
              </Button>
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Sector</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Investment</TableHead>
                  <TableHead>Valuation</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={company.logo || "/placeholder.svg"} alt={company.name} />
                          <AvatarFallback>{company.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{company.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>{company.sector}</TableCell>
                    <TableCell>{company.stage}</TableCell>
                    <TableCell>{company.investment}</TableCell>
                    <TableCell>{company.valuation}</TableCell>
                    <TableCell>{getPerformanceBadge(company.performance)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Edit company</DropdownMenuItem>
                          <DropdownMenuItem>View reports</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
