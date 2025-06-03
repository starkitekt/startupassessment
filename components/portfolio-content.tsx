"use client"

import { ChartTooltip } from "@/components/ui/chart"

import { Label } from "@/components/ui/label"

import React, { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PlusCircle, Filter, Search, MoreHorizontal, Eye, Edit3, Trash2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { useGlobalSettings } from "@/contexts/global-settings-context"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { BarChart, Bar, Cell, ResponsiveContainer, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

// Expanded Mock Data for Portfolio
const mockPortfolios = [
  {
    id: "STP001",
    name: "Innovatech Solutions",
    logoUrl: "/placeholder.svg?height=32&width=32&text=IS",
    sector: "FinTech",
    stage: "Seed",
    fundingStatus: "Funded",
    totalFunding: 500000,
    mrr: 15000,
    userGrowth: 25,
    assignedMentor: "Ananya Sharma",
    lastActivity: "2024-05-15",
    tags: ["AI", "Payments"],
    healthScore: 85,
  },
  {
    id: "STP002",
    name: "HealthWell AI",
    logoUrl: "/placeholder.svg?height=32&width=32&text=HA",
    sector: "HealthTech",
    stage: "Series A",
    fundingStatus: "Seeking",
    totalFunding: 1200000,
    mrr: 45000,
    userGrowth: 18,
    assignedMentor: "Vikram Singh",
    lastActivity: "2024-05-20",
    tags: ["Diagnostics", "ML"],
    healthScore: 78,
  },
  {
    id: "STP003",
    name: "EduSphere Learning",
    logoUrl: "/placeholder.svg?height=32&width=32&text=EL",
    sector: "EdTech",
    stage: "Pre-Seed",
    fundingStatus: "Bootstrapped",
    totalFunding: 50000,
    mrr: 2000,
    userGrowth: 35,
    assignedMentor: "Priya Desai",
    lastActivity: "2024-05-10",
    tags: ["K-12", "Gamification"],
    healthScore: 92,
  },
  {
    id: "STP004",
    name: "AgriGrow Innovations",
    logoUrl: "/placeholder.svg?height=32&width=32&text=AI",
    sector: "AgriTech",
    stage: "Seed",
    fundingStatus: "Funded",
    totalFunding: 300000,
    mrr: 8000,
    userGrowth: 22,
    assignedMentor: "Rohan Mehta",
    lastActivity: "2024-05-18",
    tags: ["IoT", "Sustainable Farming"],
    healthScore: 80,
  },
  {
    id: "STP005",
    name: "GreenCycle Solutions",
    logoUrl: "/placeholder.svg?height=32&width=32&text=GS",
    sector: "CleanTech",
    stage: "Series B",
    fundingStatus: "Funded",
    totalFunding: 5000000,
    mrr: 120000,
    userGrowth: 15,
    assignedMentor: "Sneha Patel",
    lastActivity: "2024-05-22",
    tags: ["Recycling", "Sustainability"],
    healthScore: 88,
  },
  {
    id: "STP006",
    name: "SecureData Systems",
    logoUrl: "/placeholder.svg?height=32&width=32&text=SS",
    sector: "Cybersecurity",
    stage: "Seed",
    fundingStatus: "Seeking",
    totalFunding: 200000,
    mrr: 5000,
    userGrowth: 40,
    assignedMentor: "Arjun Reddy",
    lastActivity: "2024-05-25",
    tags: ["Encryption", "Data Protection"],
    healthScore: 75,
  },
  {
    id: "STP007",
    name: "SmartRetail AI",
    logoUrl: "/placeholder.svg?height=32&width=32&text=SA",
    sector: "RetailTech",
    stage: "Pre-Seed",
    fundingStatus: "Bootstrapped",
    totalFunding: 10000,
    mrr: 1000,
    userGrowth: 50,
    assignedMentor: "Diya Sharma",
    lastActivity: "2024-05-01",
    tags: ["Analytics", "Personalization"],
    healthScore: 95,
  },
  {
    id: "STP008",
    name: "LogiChain Solutions",
    logoUrl: "/placeholder.svg?height=32&width=32&text=LS",
    sector: "Logistics",
    stage: "Series A",
    fundingStatus: "Funded",
    totalFunding: 2500000,
    mrr: 90000,
    userGrowth: 20,
    assignedMentor: "Rajesh Kumar",
    lastActivity: "2024-06-01",
    tags: ["Supply Chain", "AI"],
    healthScore: 82,
  },
  {
    id: "STP009",
    name: "TravelEasy Platform",
    logoUrl: "/placeholder.svg?height=32&width=32&text=TP",
    sector: "TravelTech",
    stage: "Seed",
    fundingStatus: "Seeking",
    totalFunding: 400000,
    mrr: 12000,
    userGrowth: 30,
    assignedMentor: "Priya Desai",
    lastActivity: "2024-05-28",
    tags: ["Booking", "AI Recommendations"],
    healthScore: 70,
  },
]

const sectors = [
  "All",
  "FinTech",
  "HealthTech",
  "EdTech",
  "AgriTech",
  "SaaS",
  "E-commerce",
  "CleanTech",
  "Cybersecurity",
  "RetailTech",
  "Logistics",
  "TravelTech",
  "Deep Tech",
]
const stages = ["All", "Pre-Seed", "Seed", "Series A", "Series B", "Growth", "Exit"]
const fundingStatuses = ["All", "Bootstrapped", "Seeking", "Funded", "Acquired"]

export function PortfolioContent() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    sector: "All",
    stage: "All",
    fundingStatus: "All",
  })
  const router = useRouter()
  const { toast } = useToast()
  const { formatCurrency, selectedCurrency } = useGlobalSettings()

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleFilterChange = (filterType: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }))
  }

  const filteredPortfolios = useMemo(() => {
    return mockPortfolios.filter((startup) => {
      const searchMatch =
        startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        startup.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (startup.tags && startup.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      const sectorMatch = filters.sector === "All" || startup.sector === filters.sector
      const stageMatch = filters.stage === "All" || startup.stage === filters.stage
      const fundingMatch = filters.fundingStatus === "All" || startup.fundingStatus === filters.fundingStatus
      return searchMatch && sectorMatch && stageMatch && fundingMatch
    })
  }, [searchTerm, filters])

  const handleAddNewStartup = () => {
    router.push("/portfolio/new")
  }

  const viewStartupDetails = (startupId: string) => {
    router.push(`/portfolio/${startupId}`)
  }

  const fundingStatusCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    mockPortfolios.forEach((startup) => {
      counts[startup.fundingStatus] = (counts[startup.fundingStatus] || 0) + 1
    })
    return Object.entries(counts).map(([name, value]) => ({
      name,
      value,
      fill:
        name === "Funded"
          ? "hsl(var(--chart-positive))"
          : name === "Seeking"
            ? "hsl(var(--chart-accent1))"
            : "hsl(var(--chart-neutral))",
    }))
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-6 p-4 md:p-6">
        <div className="flex items-center justify-between">
          {" "}
          <Skeleton className="h-10 w-48" /> <Skeleton className="h-10 w-36" />{" "}
        </div>
        <Card>
          {" "}
          <CardContent className="p-4 space-y-4">
            {" "}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {" "}
              <Skeleton className="h-10 w-full" /> <Skeleton className="h-10 w-full" />{" "}
              <Skeleton className="h-10 w-full" /> <Skeleton className="h-10 w-full" />{" "}
            </div>{" "}
          </CardContent>{" "}
        </Card>
        <Skeleton className="h-[400px] w-full" />
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="space-y-6 p-4 md:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-jpmc-darkblue dark:text-jpmc-lightblue">Startup Portfolio</h1>
            <p className="text-muted-foreground">Manage and track all startups in your portfolio.</p>
          </div>
          <Button onClick={handleAddNewStartup} className="w-full sm:w-auto jpmc-gradient text-white">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Startup
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-xl">
              <Filter className="mr-2 h-5 w-5 text-jpmc-blue" /> Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
              <div className="relative">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label htmlFor="search-portfolio" className="cursor-help">
                      Search
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Search by startup name, sector, or tags.</p>
                  </TooltipContent>
                </Tooltip>
                <Search className="absolute left-3 top-9 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search-portfolio"
                  placeholder="Name, sector, tags..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label htmlFor="filter-sector" className="cursor-help">
                      Sector
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Filter by industry sector.</p>
                  </TooltipContent>
                </Tooltip>
                <Select value={filters.sector} onValueChange={(v) => handleFilterChange("sector", v)}>
                  {" "}
                  <SelectTrigger id="filter-sector">
                    <SelectValue />
                  </SelectTrigger>{" "}
                  <SelectContent>
                    {sectors.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>{" "}
                </Select>
              </div>
              <div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label htmlFor="filter-stage" className="cursor-help">
                      Stage
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Filter by startup stage.</p>
                  </TooltipContent>
                </Tooltip>
                <Select value={filters.stage} onValueChange={(v) => handleFilterChange("stage", v)}>
                  {" "}
                  <SelectTrigger id="filter-stage">
                    <SelectValue />
                  </SelectTrigger>{" "}
                  <SelectContent>
                    {stages.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>{" "}
                </Select>
              </div>
              <div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label htmlFor="filter-funding" className="cursor-help">
                      Funding Status
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Filter by funding status.</p>
                  </TooltipContent>
                </Tooltip>
                <Select value={filters.fundingStatus} onValueChange={(v) => handleFilterChange("fundingStatus", v)}>
                  {" "}
                  <SelectTrigger id="filter-funding">
                    <SelectValue />
                  </SelectTrigger>{" "}
                  <SelectContent>
                    {fundingStatuses.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>{" "}
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Card className="xl:col-span-1">
            <CardHeader>
              <CardTitle>Funding Status Distribution</CardTitle>
              <CardDescription>Overview of portfolio funding stages.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[300px] w-full">
                <ResponsiveContainer>
                  <BarChart data={fundingStatusCounts} layout="vertical" margin={{ left: 20, right: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={80} interval={0} fontSize={12} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" name="Startups" radius={[0, 4, 4, 0]}>
                      {fundingStatusCounts.map((entry) => (
                        <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle>Portfolio Overview</CardTitle>
              <CardDescription>
                Displaying {filteredPortfolios.length} of {mockPortfolios.length} startups.
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Tooltip>
                        <TooltipTrigger className="cursor-help">Startup</TooltipTrigger>
                        <TooltipContent>
                          <p>Startup name and tags.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableHead>
                    <TableHead>
                      <Tooltip>
                        <TooltipTrigger className="cursor-help">Sector</TooltipTrigger>
                        <TooltipContent>
                          <p>Industry sector.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableHead>
                    <TableHead>
                      <Tooltip>
                        <TooltipTrigger className="cursor-help">Stage</TooltipTrigger>
                        <TooltipContent>
                          <p>Current stage.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableHead>
                    <TableHead>
                      <Tooltip>
                        <TooltipTrigger className="cursor-help">Funding</TooltipTrigger>
                        <TooltipContent>
                          <p>Funding status.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableHead>
                    <TableHead className="text-right">
                      <Tooltip>
                        <TooltipTrigger className="cursor-help">MRR ({selectedCurrency.code})</TooltipTrigger>
                        <TooltipContent>
                          <p>Monthly Recurring Revenue.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableHead>
                    <TableHead className="text-right">
                      <Tooltip>
                        <TooltipTrigger className="cursor-help">Health</TooltipTrigger>
                        <TooltipContent>
                          <p>Overall health score.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPortfolios.length > 0 ? (
                    filteredPortfolios.map((startup) => (
                      <TableRow
                        key={startup.id}
                        className="hover:bg-muted/50 cursor-pointer"
                        onClick={() => viewStartupDetails(startup.id)}
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img
                              src={startup.logoUrl || "/placeholder.svg"}
                              alt={startup.name}
                              className="h-8 w-8 rounded-full object-cover"
                            />
                            <div>
                              <div className="font-medium">{startup.name}</div>
                              <div className="text-xs text-muted-foreground">{startup.tags.join(", ")}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{startup.sector}</Badge>
                        </TableCell>
                        <TableCell>{startup.stage}</TableCell>
                        <TableCell>
                          <Badge
                            className={cn(
                              startup.fundingStatus === "Funded" && "status-funded",
                              startup.fundingStatus === "Seeking" && "status-pending",
                              startup.fundingStatus === "Bootstrapped" && "status-inactive",
                            )}
                          >
                            {startup.fundingStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right text-numerical">{formatCurrency(startup.mrr)}</TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant={
                              startup.healthScore > 80
                                ? "default"
                                : startup.healthScore > 60
                                  ? "outline"
                                  : "destructive"
                            }
                            className={cn(startup.healthScore > 80 && "bg-charting-positive/80 text-white")}
                          >
                            {startup.healthScore}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  viewStartupDetails(startup.id)
                                }}
                              >
                                {" "}
                                <Eye className="mr-2 h-4 w-4" /> View Details{" "}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  router.push(`/portfolio/${startup.id}/edit`)
                                }}
                              >
                                {" "}
                                <Edit3 className="mr-2 h-4 w-4" /> Edit Startup{" "}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toast({ title: `Deleting ${startup.name} (Simulated)`, variant: "destructive" })
                                }}
                              >
                                {" "}
                                <Trash2 className="mr-2 h-4 w-4" /> Delete{" "}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No startups found matching your criteria.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  )
}
