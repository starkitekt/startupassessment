"use client"

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

// Expanded Mock Data for Portfolio
const mockPortfolios = [
  {
    id: "STP001",
    name: "Innovatech Solutions",
    logoUrl: "/placeholder.svg?height=32&width=32",
    sector: "FinTech",
    stage: "Seed",
    fundingStatus: "Funded",
    totalFunding: 500000, // USD
    mrr: 15000,
    userGrowth: 25, // %
    assignedMentor: "Ananya Sharma",
    lastActivity: "2024-05-15",
    tags: ["AI", "Payments"],
    healthScore: 85, // out of 100
  },
  {
    id: "STP002",
    name: "HealthWell AI",
    logoUrl: "/placeholder.svg?height=32&width=32",
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
    logoUrl: "/placeholder.svg?height=32&width=32",
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
    logoUrl: "/placeholder.svg?height=32&width=32",
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
  // Add more diverse startups
]

const sectors = ["All", "FinTech", "HealthTech", "EdTech", "AgriTech", "SaaS", "E-commerce"]
const stages = ["All", "Pre-Seed", "Seed", "Series A", "Growth", "Exit"]
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
    // For now, navigate to a placeholder or show a toast. Later, this will open a form/modal.
    // router.push('/portfolio/new');
    toast({ title: "Add New Startup", description: "Startup creation form would open here." })
  }

  const viewStartupDetails = (startupId: string) => {
    router.push(`/portfolio/${startupId}`)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-jpmc-darkblue dark:text-jpmc-lightblue">Startup Portfolio</h1>
          <p className="text-muted-foreground">Manage and track all startups in your portfolio.</p>
        </div>
        <Button onClick={handleAddNewStartup} className="w-full sm:w-auto">
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Startup
        </Button>
      </div>

      {/* Filters Bar */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-xl">
            <Filter className="mr-2 h-5 w-5 text-jpmc-blue" /> Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
            <div className="relative">
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
              {" "}
              <Label htmlFor="filter-sector">Sector</Label>{" "}
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
              </Select>{" "}
            </div>
            <div>
              {" "}
              <Label htmlFor="filter-stage">Stage</Label>{" "}
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
              </Select>{" "}
            </div>
            <div>
              {" "}
              <Label htmlFor="filter-funding">Funding Status</Label>{" "}
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
              </Select>{" "}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Table */}
      <Card>
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
                <TableHead>Funding Status</TableHead>
                <TableHead className="text-right">MRR (USD)</TableHead>
                <TableHead className="text-right">Health</TableHead>
                <TableHead>Mentor</TableHead>
                <TableHead>Last Activity</TableHead>
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
                    <TableCell className="text-right text-numerical">${startup.mrr.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={
                          startup.healthScore > 80 ? "default" : startup.healthScore > 60 ? "outline" : "destructive"
                        }
                        className={cn(startup.healthScore > 80 && "bg-charting-positive/80 text-white")}
                      >
                        {startup.healthScore}%
                      </Badge>
                    </TableCell>
                    <TableCell>{startup.assignedMentor || "N/A"}</TableCell>
                    <TableCell>{new Date(startup.lastActivity).toLocaleDateString()}</TableCell>
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
                              toast({ title: `Editing ${startup.name}` })
                            }}
                          >
                            {" "}
                            <Edit3 className="mr-2 h-4 w-4" /> Edit Startup{" "}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={(e) => {
                              e.stopPropagation()
                              toast({ title: `Deleting ${startup.name}`, variant: "destructive" })
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
                  <TableCell colSpan={9} className="h-24 text-center">
                    No startups found matching your criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
