<<<<<<< HEAD
<div className="overflow-x-auto">
  <Table>
    <TableCell className="font-medium truncate max-w-[120px]">{assessment.id}</TableCell>
    <TableCell className="truncate max-w-[120px]">{assessment.startupName}</TableCell>
  </Table>
</div> 
=======
"use client"

import { Progress } from "@/components/ui/progress"

import { Label } from "@/components/ui/label"

import { useState, useMemo, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PlusCircle, Filter, Search, MoreHorizontal, Eye, Edit3, Trash2, Download, AlertCircle } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const mockAssessments = [
  {
    id: "ASS001",
    startupName: "Innovatech Solutions",
    type: "Seed Funding",
    currentStage: "Technical Review",
    submittedDate: "2024-01-15",
    status: "under-review",
    progress: 75,
  },
  {
    id: "ASS002",
    startupName: "HealthWell AI",
    type: "Series A",
    currentStage: "Final Approval",
    submittedDate: "2024-02-01",
    status: "approved",
    progress: 100,
  },
  {
    id: "ASS003",
    startupName: "EduSphere Learning",
    type: "Incubation",
    currentStage: "Initial Screening",
    submittedDate: "2024-02-20",
    status: "pending-docs",
    progress: 25,
  },
  {
    id: "ASS004",
    startupName: "AgriGrow Innovations",
    type: "Grant Application",
    currentStage: "Rejected",
    submittedDate: "2023-12-10",
    status: "rejected",
    progress: 0,
  },
]

const stages = [
  "All",
  "Initial Screening",
  "Technical Review",
  "Financial Review",
  "Due Diligence",
  "Final Approval",
  "Approved",
  "Rejected",
]
const statuses = ["All", "Pending Docs", "Under Review", "Approved", "Rejected"]
const types = ["All", "Seed Funding", "Series A", "Incubation", "Grant Application"]

export function AssessmentContent() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({ stage: "All", status: "All", type: "All" })
  const router = useRouter()
  const searchParamsHook = useSearchParams() // Renamed to avoid conflict
  const { toast } = useToast()

  const [newAssessmentInfo, setNewAssessmentInfo] = useState<{ id: string; startupName: string; type: string } | null>(
    null,
  )

  useEffect(() => {
    const newId = searchParamsHook.get("newId")
    const newStartupName = searchParamsHook.get("startupName")
    const newType = searchParamsHook.get("type")

    if (newId && newStartupName && newType) {
      setNewAssessmentInfo({ id: newId, startupName: newStartupName, type: newType })
      // Optionally, clear the query params from URL to prevent re-trigger on refresh
      // router.replace('/assessments', undefined); // Next.js 13 App Router way
    }

    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [searchParamsHook, router])

  const handleFilterChange = (filterType: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }))
  }

  const filteredAssessments = useMemo(() => {
    return mockAssessments.filter((assessment) => {
      const searchMatch =
        assessment.startupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assessment.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assessment.id.toLowerCase().includes(searchTerm.toLowerCase())

      const stageMatch = filters.stage === "All" || assessment.currentStage === filters.stage
      const statusMatch =
        filters.status === "All" || assessment.status.toLowerCase().replace("-", " ") === filters.status.toLowerCase()
      const typeMatch = filters.type === "All" || assessment.type === filters.type

      return searchMatch && stageMatch && statusMatch && typeMatch
    })
  }, [searchTerm, filters])

  const handleNewAssessment = () => router.push("/assessments/new")
  const viewAssessmentDetails = (assessmentId: string) => router.push(`/assessments/${assessmentId}`)

  const handleExportAll = () => {
    toast({
      title: "Export All Assessments (Simulated)",
      description: "Assessment data is being prepared for export. This is a simulation; no file will be downloaded.",
      duration: 5000,
    })
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
    <TooltipProvider>
      <div className="space-y-8 lg:space-y-10 p-4 md:p-8">
        {newAssessmentInfo && (
          <Alert variant="default" className="bg-green-50 border-green-200 dark:bg-green-900/30 dark:border-green-700">
            <AlertCircle className="h-4 w-4 !text-green-600 dark:!text-green-400" />
            <AlertTitle className="text-green-700 dark:text-green-300">Assessment Initiated Successfully!</AlertTitle>
            <AlertDescription className="text-green-600 dark:text-green-400">
              Assessment <strong>{newAssessmentInfo.id}</strong> for startup{" "}
              <strong>{newAssessmentInfo.startupName}</strong> (Type: {newAssessmentInfo.type}) has been logged.
              <Button
                variant="ghost"
                size="sm"
                className="ml-2 h-auto p-0 text-green-700 dark:text-green-300 hover:text-green-800"
                onClick={() => setNewAssessmentInfo(null)}
              >
                Dismiss
              </Button>
            </AlertDescription>
          </Alert>
        )}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">Manage Assessments</h1>
            <p className="text-muted-foreground">Track and manage all startup assessment processes.</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button onClick={handleNewAssessment} className="w-full sm:w-auto jpmc-gradient text-white">
              <PlusCircle className="mr-2 h-4 w-4" /> New Assessment
            </Button>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" onClick={handleExportAll} className="w-full sm:w-auto">
                  <Download className="mr-2 h-4 w-4" /> Export All
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export a summary of all assessments (simulated).</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-lg font-semibold">
              <Filter className="mr-2 h-5 w-5 text-primary" /> Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
              <div className="relative">
                <Label htmlFor="search-assessments">Search</Label>
                <Search className="absolute left-3 top-9 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search-assessments"
                  placeholder="Startup, type, ID..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                {" "}
                <Label htmlFor="filter-type">Type</Label>{" "}
                <Select value={filters.type} onValueChange={(v) => handleFilterChange("type", v)}>
                  {" "}
                  <SelectTrigger id="filter-type">
                    <SelectValue />
                  </SelectTrigger>{" "}
                  <SelectContent>
                    {types.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>{" "}
                </Select>{" "}
              </div>
              <div>
                {" "}
                <Label htmlFor="filter-stage">Current Stage</Label>{" "}
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
                <Label htmlFor="filter-status">Status</Label>{" "}
                <Select value={filters.status} onValueChange={(v) => handleFilterChange("status", v)}>
                  {" "}
                  <SelectTrigger id="filter-status">
                    <SelectValue />
                  </SelectTrigger>{" "}
                  <SelectContent>
                    {statuses.map((s) => (
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

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Assessment Pipeline</CardTitle>
            <CardDescription>
              Displaying {filteredAssessments.length} of {mockAssessments.length} assessments.
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assessment ID</TableHead>
                  <TableHead>Startup Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Current Stage</TableHead>
                  <TableHead className="text-center">Progress</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssessments.length > 0 ? (
                  filteredAssessments.map((assessment) => (
                    <TableRow
                      key={assessment.id}
                      className="hover:bg-muted/50 cursor-pointer"
                      onClick={() => viewAssessmentDetails(assessment.id)}
                    >
                      <TableCell className="font-medium">{assessment.id}</TableCell>
                      <TableCell>{assessment.startupName}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{assessment.type}</Badge>
                      </TableCell>
                      <TableCell>{new Date(assessment.submittedDate).toLocaleDateString()}</TableCell>
                      <TableCell>{assessment.currentStage}</TableCell>
                      <TableCell className="text-center">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="w-20 mx-auto">
                              <Progress value={assessment.progress} className="h-2" />
                              <span className="text-xs">{assessment.progress}%</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{assessment.progress}% complete</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            assessment.status === "approved"
                              ? "default"
                              : assessment.status === "rejected"
                                ? "destructive"
                                : "outline"
                          }
                          className={cn(
                            assessment.status === "approved" &&
                              "bg-charting-positive text-charting-positive-foreground",
                            assessment.status === "rejected" &&
                              "bg-charting-negative text-charting-negative-foreground",
                            assessment.status === "under-review" &&
                              "border-blue-500 text-blue-500 dark:border-blue-400 dark:text-blue-400",
                            assessment.status === "pending-docs" &&
                              "border-amber-500 text-amber-500 dark:border-amber-400 dark:text-amber-400",
                          )}
                        >
                          {assessment.status.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
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
                                viewAssessmentDetails(assessment.id)
                              }}
                            >
                              {" "}
                              <Eye className="mr-2 h-4 w-4" /> View Details{" "}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation()
                                toast({ title: `Editing ${assessment.id} (Simulated)` })
                              }}
                            >
                              {" "}
                              <Edit3 className="mr-2 h-4 w-4" /> Edit{" "}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={(e) => {
                                e.stopPropagation()
                                toast({ title: `Deleting ${assessment.id} (Simulated)`, variant: "destructive" })
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
                    <TableCell colSpan={8} className="h-24 text-center">
                      No assessments found matching your criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}
>>>>>>> 92b17aa89294c95e372d38d4e5fa92c7c16a0941
