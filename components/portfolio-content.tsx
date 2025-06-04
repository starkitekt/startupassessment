"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  PlusCircle,
  Filter,
  Search,
  MoreHorizontal,
  Eye,
  Edit3,
  Trash2,
  UserCheck,
  BarChartHorizontalBig,
  ShieldCheck,
} from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { useGlobalSettings } from "@/contexts/global-settings-context"
import { TooltipProvider } from "@/components/ui/tooltip" // Added Tooltip components
import {
  BarChart,
  Bar,
  Cell,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
} from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { Label } from "@/components/ui/label"
import Image from "next/image" // Keep next/image

// Enhanced mock data for Accelerator flow
const mockPortfolios = [
  {
    id: "STP001",
    name: "Innovatech Solutions",
    logoUrl: "/placeholder.svg?height=32&width=32&text=IS",
    sector: "FinTech",
    stage: "Seed",
    fundingStatus: "Funded",
    totalFunding: 50000000,
    mrr: 1500000,
    userGrowth: 25,
    assignedMentor: "Ananya Sharma",
    lastActivity: "2024-05-15",
    tags: ["AI", "Payments"],
    healthScore: 85,
    currentMilestone: "Beta Launched",
    mouStatus: "Completed",
    nextMilestoneDueDate: "2024-07-15",
  },
  {
    id: "STP002",
    name: "HealthWell AI",
    logoUrl: "/placeholder.svg?height=32&width=32&text=HA",
    sector: "HealthTech",
    stage: "Series A",
    fundingStatus: "Seeking",
    totalFunding: 120000000,
    mrr: 4500000,
    userGrowth: 18,
    assignedMentor: "Vikram Singh",
    lastActivity: "2024-05-20",
    tags: ["Diagnostics", "ML"],
    healthScore: 78,
    currentMilestone: "Prototype Complete",
    mouStatus: "Pending eSign",
    nextMilestoneDueDate: "2024-06-30",
  },
  {
    id: "STP003",
    name: "EduSphere Learning",
    logoUrl: "/placeholder.svg?height=32&width=32&text=EL",
    sector: "EdTech",
    stage: "Pre-Seed",
    fundingStatus: "Bootstrapped",
    totalFunding: 5000000,
    mrr: 200000,
    userGrowth: 35,
    assignedMentor: "Priya Desai",
    lastActivity: "2024-05-10",
    tags: ["K-12", "Gamification"],
    healthScore: 92,
    currentMilestone: "Onboarding",
    mouStatus: "Sent",
    nextMilestoneDueDate: "2024-06-20",
  },
]

const SECTORS = [
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
const STAGES = ["All", "Pre-Seed", "Seed", "Series A", "Series B", "Growth", "Exit", "Onboarding"]
const FUNDING_STATUSES = ["All", "Bootstrapped", "Seeking", "Funded", "Acquired"]
const MOU_STATUSES = ["All", "Pending eSign", "Sent", "Completed", "Discrepancy"]
const CHART_COLORS = [
  "hsl(var(--chart-positive))",
  "hsl(var(--chart-accent1))",
  "hsl(var(--chart-neutral))",
  "hsl(var(--chart-secondary))",
  "hsl(var(--chart-primary))",
]

export function PortfolioContent() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({ sector: "All", stage: "All", fundingStatus: "All", mouStatus: "All" })
  const router = useRouter()
  const { toast } = useToast()
  const { formatCurrency, selectedCurrency, isExchangeRateLoading } = useGlobalSettings()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700)
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
      const mouMatch = filters.mouStatus === "All" || startup.mouStatus === filters.mouStatus
      return searchMatch && sectorMatch && stageMatch && fundingMatch && mouMatch
    })
  }, [searchTerm, filters])

  const fundingStatusCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    mockPortfolios.forEach((startup) => {
      counts[startup.fundingStatus] = (counts[startup.fundingStatus] || 0) + 1
    })
    return Object.entries(counts).map(([name, value], index) => ({
      name,
      value,
      fill: CHART_COLORS[index % CHART_COLORS.length],
    }))
  }, [])

  const handleAddNewStartup = () => router.push("/portfolio/new")
  const viewStartupDetails = (startupId: string) => router.push(`/portfolio/${startupId}`)

  if (isLoading || isExchangeRateLoading) {
    // Skeleton remains the same
    return (
      <div className="space-y-6 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-48" /> <Skeleton className="h-10 w-36" />
        </div>
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {" "}
              {/* Added one more for MoU status */}
              <Skeleton className="h-10 w-full" /> <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" /> <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Skeleton className="h-[350px] w-full xl:col-span-1" />
          <Skeleton className="h-[500px] w-full xl:col-span-2" />
        </div>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="space-y-8 lg:space-y-10 p-4 md:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">Startup Portfolio</h1>
            <p className="text-muted-foreground">Manage and track all startups in your accelerator program.</p>
          </div>
          <Button onClick={handleAddNewStartup} className="w-full sm:w-auto jpmc-gradient text-white">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Startup
          </Button>
        </div>

        <Card className="border-muted shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-xl">
              <Filter className="mr-2 h-5 w-5 text-jpmc-blue" /> Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
              {" "}
              {/* Adjusted for 5 filters */}
              <div className="relative lg:col-span-1">
                {" "}
                {/* Search takes less space */}
                <Label htmlFor="search-portfolio">Search</Label>
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
                <Label htmlFor="filter-sector">Sector</Label>
                <Select value={filters.sector} onValueChange={(v) => handleFilterChange("sector", v)}>
                  <SelectTrigger id="filter-sector">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SECTORS.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="filter-stage">Stage</Label>
                <Select value={filters.stage} onValueChange={(v) => handleFilterChange("stage", v)}>
                  <SelectTrigger id="filter-stage">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STAGES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="filter-funding">Funding Status</Label>
                <Select value={filters.fundingStatus} onValueChange={(v) => handleFilterChange("fundingStatus", v)}>
                  <SelectTrigger id="filter-funding">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FUNDING_STATUSES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="filter-mou">MoU Status</Label>
                <Select value={filters.mouStatus} onValueChange={(v) => handleFilterChange("mouStatus", v)}>
                  <SelectTrigger id="filter-mou">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MOU_STATUSES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Card className="xl:col-span-1 border-muted shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle>Funding Status Distribution</CardTitle>
              <CardDescription>Overview of portfolio funding stages.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[300px] w-full">
                <ResponsiveContainer>
                  <BarChart
                    data={fundingStatusCounts}
                    layout="vertical"
                    margin={{ left: 20, right: 10, top: 5, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={80} interval={0} fontSize={12} />
                    <RechartsTooltip content={<ChartTooltipContent />} />
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

          <Card className="xl:col-span-2 border-muted shadow-sm hover:shadow-md transition-shadow duration-200">
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
                    <TableHead>Startup</TableHead>
                    <TableHead>Sector</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>MoU Status</TableHead>
                    <TableHead>Current Milestone</TableHead>
                    <TableHead>Mentor</TableHead>
                    <TableHead className="text-right">Health</TableHead>
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
                            <Image
                              src={
                                startup.logoUrl || `/placeholder.svg?height=32&width=32&text=${startup.name.charAt(0)}`
                              }
                              alt={startup.name}
                              width={32}
                              height={32}
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
                            variant={startup.mouStatus === "Completed" ? "default" : "outline"}
                            className={cn(
                              startup.mouStatus === "Completed" &&
                                "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200",
                              startup.mouStatus === "Pending eSign" &&
                                "bg-amber-100 text-amber-700 dark:bg-amber-800 dark:text-amber-200",
                            )}
                          >
                            {startup.mouStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>{startup.currentMilestone}</TableCell>
                        <TableCell>{startup.assignedMentor || "N/A"}</TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant={
                              startup.healthScore > 80
                                ? "default"
                                : startup.healthScore > 60
                                  ? "outline"
                                  : "destructive"
                            }
                            className={cn(
                              startup.healthScore > 80 && "bg-charting-positive text-charting-positive-foreground",
                              startup.healthScore <= 60 && "bg-charting-negative text-charting-negative-foreground",
                            )}
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
                                <Eye className="mr-2 h-4 w-4" /> View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  router.push(`/portfolio/${startup.id}/edit`)
                                }}
                              >
                                <Edit3 className="mr-2 h-4 w-4" /> Edit Startup
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toast({ title: "Manage Milestones (Simulated)" })
                                }}
                              >
                                <BarChartHorizontalBig className="mr-2 h-4 w-4" /> Manage Milestones
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toast({ title: "Assign Mentor (Simulated)" })
                                }}
                              >
                                <UserCheck className="mr-2 h-4 w-4" /> Assign Mentor
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation()
                                  router.push(`/audits?startupId=${startup.id}`)
                                }}
                              >
                                <ShieldCheck className="mr-2 h-4 w-4" /> View Audit History
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-red-600 hover:!text-red-600 dark:hover:!text-red-500"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toast({
                                    title: `Simulated Deletion: ${startup.name}`,
                                    description: "This is a UI demonstration.",
                                    variant: "destructive",
                                  })
                                }}
                              >
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        No startups found.
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
