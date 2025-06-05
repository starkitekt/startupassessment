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
import { TooltipProvider } from "@/components/ui/tooltip"
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
import Image from "next/image"

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
]
const STAGES = ["All", "Pre-Seed", "Seed", "Series A", "Series B", "Growth", "Exit", "Onboarding"]
const FUNDING_STATUSES = ["All", "Bootstrapped", "Seeking", "Funded", "Acquired"]
const MOU_STATUSES = ["All", "Pending eSign", "Sent", "Completed", "Discrepancy"]

// Unified Chart Colors from globals.css (via Tailwind)
const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
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

  const chartConfig = {
    value: { label: "Startups" },
    // Add other configs if needed
  }

  if (isLoading || isExchangeRateLoading) {
    return (
      <div className="space-y-6 p-4 md:p-6 lg:p-8">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-48 bg-muted" /> <Skeleton className="h-10 w-36 bg-muted" />
        </div>
        <Card className="bg-card border-border">
          <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <Skeleton className="h-10 w-full bg-muted" /> <Skeleton className="h-10 w-full bg-muted" />
              <Skeleton className="h-10 w-full bg-muted" /> <Skeleton className="h-10 w-full bg-muted" />
              <Skeleton className="h-10 w-full bg-muted" />
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Skeleton className="h-[350px] w-full xl:col-span-1 bg-muted" />
          <Skeleton className="h-[500px] w-full xl:col-span-2 bg-muted" />
        </div>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="space-y-8 p-4 md:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">Startup Portfolio</h1>
            <p className="text-lg text-muted-foreground">Manage and track all startups in your accelerator program.</p>
          </div>
          <Button onClick={handleAddNewStartup} className="w-full sm:w-auto jpmc-gradient text-primary-foreground">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Startup
          </Button>
        </div>

        <Card className="bg-card border-border shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-xl text-foreground">
              <Filter className="mr-2 h-5 w-5 text-primary" /> Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
              <div className="relative lg:col-span-1">
                <Label htmlFor="search-portfolio" className="text-muted-foreground">
                  Search
                </Label>
                <Search className="absolute left-3 top-9 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search-portfolio"
                  placeholder="Name, sector, tags..."
                  className="pl-10 bg-input border-border text-foreground focus:ring-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {[
                {
                  label: "Sector",
                  id: "filter-sector",
                  value: filters.sector,
                  options: SECTORS,
                  key: "sector" as keyof typeof filters,
                },
                {
                  label: "Stage",
                  id: "filter-stage",
                  value: filters.stage,
                  options: STAGES,
                  key: "stage" as keyof typeof filters,
                },
                {
                  label: "Funding Status",
                  id: "filter-funding",
                  value: filters.fundingStatus,
                  options: FUNDING_STATUSES,
                  key: "fundingStatus" as keyof typeof filters,
                },
                {
                  label: "MoU Status",
                  id: "filter-mou",
                  value: filters.mouStatus,
                  options: MOU_STATUSES,
                  key: "mouStatus" as keyof typeof filters,
                },
              ].map((filterItem) => (
                <div key={filterItem.id}>
                  <Label htmlFor={filterItem.id} className="text-muted-foreground">
                    {filterItem.label}
                  </Label>
                  <Select value={filterItem.value} onValueChange={(v) => handleFilterChange(filterItem.key, v)}>
                    <SelectTrigger
                      id={filterItem.id}
                      className="bg-input border-border text-foreground focus:ring-primary"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border text-popover-foreground">
                      {filterItem.options.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Card className="xl:col-span-1 bg-card border-border shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-foreground">Funding Status Distribution</CardTitle>
              <CardDescription className="text-muted-foreground">Overview of portfolio funding stages.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ChartContainer config={chartConfig} className="w-full h-full">
                <ResponsiveContainer>
                  <BarChart
                    data={fundingStatusCounts}
                    layout="vertical"
                    margin={{ left: 10, right: 30, top: 5, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={100}
                      interval={0}
                      stroke="hsl(var(--muted-foreground))"
                      tick={{ fontSize: 12 }}
                    />
                    <RechartsTooltip
                      content={<ChartTooltipContent indicator="dot" />}
                      cursor={{ fill: "hsl(var(--muted))" }}
                    />
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

          <Card className="xl:col-span-2 bg-card border-border shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-foreground">Portfolio Overview</CardTitle>
              <CardDescription className="text-muted-foreground">
                Displaying {filteredPortfolios.length} of {mockPortfolios.length} startups.
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-muted-foreground">Startup</TableHead>
                    <TableHead className="text-muted-foreground">Sector</TableHead>
                    <TableHead className="text-muted-foreground">Stage</TableHead>
                    <TableHead className="text-muted-foreground">MoU Status</TableHead>
                    <TableHead className="text-muted-foreground">Current Milestone</TableHead>
                    <TableHead className="text-muted-foreground">Mentor</TableHead>
                    <TableHead className="text-right text-muted-foreground">Health</TableHead>
                    <TableHead className="text-center text-muted-foreground">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPortfolios.length > 0 ? (
                    filteredPortfolios.map((startup) => (
                      <TableRow
                        key={startup.id}
                        className="border-border hover:bg-muted/50 cursor-pointer"
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
                              className="h-8 w-8 rounded-full object-cover border border-border"
                            />
                            <div>
                              <div className="font-medium text-foreground">{startup.name}</div>
                              <div className="text-xs text-muted-foreground">{startup.tags.join(", ")}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-border text-muted-foreground bg-muted">
                            {startup.sector}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-foreground">{startup.stage}</TableCell>
                        <TableCell>
                          <Badge
                            variant={startup.mouStatus === "Completed" ? "default" : "outline"}
                            className={cn(
                              "border-border text-xs",
                              startup.mouStatus === "Completed" && "bg-green-500/20 text-green-400 border-green-500/30",
                              startup.mouStatus === "Pending eSign" &&
                                "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
                              startup.mouStatus === "Sent" && "bg-blue-500/20 text-blue-400 border-blue-500/30",
                            )}
                          >
                            {startup.mouStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-foreground">{startup.currentMilestone}</TableCell>
                        <TableCell className="text-foreground">{startup.assignedMentor || "N/A"}</TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant="outline"
                            className={cn(
                              "border-border text-xs",
                              startup.healthScore > 80 &&
                                "bg-chart-positive/20 text-green-400 border-chart-positive/30",
                              startup.healthScore <= 60 && "bg-chart-negative/20 text-red-400 border-chart-negative/30",
                              startup.healthScore > 60 &&
                                startup.healthScore <= 80 &&
                                "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
                            )}
                          >
                            {startup.healthScore}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-muted-foreground hover:text-foreground"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="bg-popover border-border text-popover-foreground"
                            >
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
                              <DropdownMenuSeparator className="bg-border" />
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
                              <DropdownMenuSeparator className="bg-border" />
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
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
                    <TableRow className="border-border">
                      <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
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
