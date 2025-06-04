"use client"

import { useState, useMemo, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PlusCircle, Filter, Search, MoreHorizontal, Eye, Edit3, Trash2, FileText } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Label } from "@/components/ui/label"
import type { AuditEngagement } from "@/types/audit"
import { mockAuditEngagements, AUDIT_STATUSES, AUDIT_TYPES } from "@/types/audit"
import { AuditFormModal } from "./audit-form-modal"
import { format } from "date-fns"

export function AuditsContent() {
  const [isLoading, setIsLoading] = useState(true)
  const [audits, setAudits] = useState<AuditEngagement[]>(mockAuditEngagements)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({ status: "All", type: "All" })
  const router = useRouter()
  const { toast } = useToast()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAudit, setEditingAudit] = useState<AuditEngagement | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700)
    return () => clearTimeout(timer)
  }, [])

  const handleFilterChange = (filterType: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }))
  }

  const filteredAudits = useMemo(() => {
    return audits
      .filter((audit) => {
        const searchMatch =
          audit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          audit.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          audit.scopeDescription.toLowerCase().includes(searchTerm.toLowerCase())

        const statusMatch = filters.status === "All" || audit.status === filters.status
        const typeMatch = filters.type === "All" || audit.type === filters.type
        return searchMatch && statusMatch && typeMatch
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [audits, searchTerm, filters])

  const handleNewAudit = useCallback(() => {
    setEditingAudit(null)
    setIsModalOpen(true)
  }, [])

  const handleEditAudit = useCallback((audit: AuditEngagement) => {
    setEditingAudit(audit)
    setIsModalOpen(true)
  }, [])

  const handleDeleteAudit = useCallback(
    (auditId: string) => {
      setAudits((prev) => prev.filter((a) => a.id !== auditId))
      toast({
        title: "Audit Deleted",
        description: `Audit engagement ${auditId} has been removed.`,
        variant: "destructive",
      })
    },
    [toast],
  )

  const handleSubmitAudit = useCallback(
    (data: AuditEngagement) => {
      setAudits((prev) => {
        const existingIndex = prev.findIndex((a) => a.id === data.id)
        if (existingIndex > -1) {
          const updatedAudits = [...prev]
          updatedAudits[existingIndex] = data
          return updatedAudits
        }
        return [data, ...prev]
      })
      toast({
        title: editingAudit ? "Audit Updated" : "Audit Created",
        description: `Audit engagement "${data.name}" has been saved.`,
      })
      setEditingAudit(null)
    },
    [toast, editingAudit],
  )

  const viewAuditDetails = (auditId: string) => {
    // router.push(`/audits/${auditId}`) // Placeholder for actual navigation
    toast({ title: "View Audit Details (Simulated)", description: `Navigating to details for ${auditId}.` })
  }

  if (isLoading) {
    return (
      <div className="space-y-6 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-48" /> <Skeleton className="h-10 w-36" />
        </div>
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Skeleton className="h-10 w-full" /> <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" /> <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>
        <Skeleton className="h-[400px] w-full" />
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="space-y-8 lg:space-y-10 p-4 md:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">Audit Engagements</h1>
            <p className="text-muted-foreground">Manage and track all audit activities and engagements.</p>
          </div>
          <Button onClick={handleNewAudit} className="w-full sm:w-auto jpmc-gradient text-white">
            <PlusCircle className="mr-2 h-4 w-4" /> New Audit Engagement
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
              <div className="relative md:col-span-2">
                <Label htmlFor="search-audits">Search</Label>
                <Search className="absolute left-3 top-9 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search-audits"
                  placeholder="ID, name, scope..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="filter-audit-status">Status</Label>
                <Select value={filters.status} onValueChange={(v) => handleFilterChange("status", v)}>
                  <SelectTrigger id="filter-audit-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["All", ...AUDIT_STATUSES].map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="filter-audit-type">Type</Label>
                <Select value={filters.type} onValueChange={(v) => handleFilterChange("type", v)}>
                  <SelectTrigger id="filter-audit-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["All", ...AUDIT_TYPES].map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5 text-primary" /> Audit List
            </CardTitle>
            <CardDescription>
              Displaying {filteredAudits.length} of {audits.length} audit engagements.
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Audit ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Planned Dates</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAudits.length > 0 ? (
                  filteredAudits.map((audit) => (
                    <TableRow
                      key={audit.id}
                      className="hover:bg-muted/50 cursor-pointer"
                      onClick={() => viewAuditDetails(audit.id)}
                    >
                      <TableCell className="font-medium">{audit.id}</TableCell>
                      <TableCell>
                        <Tooltip>
                          <TooltipTrigger className="cursor-default text-left block max-w-xs truncate">
                            <span className="font-medium">{audit.name}</span>
                          </TooltipTrigger>
                          <TooltipContent
                            side="top"
                            align="start"
                            className="max-w-sm bg-background border shadow-lg p-2 rounded-md"
                          >
                            <p className="font-bold text-foreground">{audit.name}</p>
                            <p className="text-xs text-muted-foreground">{audit.scopeDescription}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{audit.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            audit.status === "Completed"
                              ? "default"
                              : audit.status === "Planned"
                                ? "outline"
                                : "secondary"
                          }
                          className={cn(
                            audit.status === "Completed" && "bg-charting-positive text-white",
                            audit.status === "In Progress" && "bg-blue-500 text-white dark:bg-blue-600",
                            audit.status === "Pending Review" && "bg-amber-500 text-white dark:bg-amber-600",
                            audit.status === "On Hold" && "bg-slate-500 text-white dark:bg-slate-600",
                          )}
                        >
                          {audit.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {format(new Date(audit.auditPeriodStart), "MMM dd, yyyy")} -{" "}
                        {format(new Date(audit.auditPeriodEnd), "MMM dd, yyyy")}
                      </TableCell>
                      <TableCell>
                        {format(new Date(audit.plannedStartDate), "MMM dd, yyyy")} -{" "}
                        {format(new Date(audit.plannedEndDate), "MMM dd, yyyy")}
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
                                viewAuditDetails(audit.id)
                              }}
                            >
                              <Eye className="mr-2 h-4 w-4" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEditAudit(audit)
                              }}
                            >
                              <Edit3 className="mr-2 h-4 w-4" /> Edit Engagement
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600 hover:!text-red-600 dark:hover:!text-red-500"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteAudit(audit.id)
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
                    <TableCell colSpan={7} className="h-24 text-center">
                      No audit engagements found matching your criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <AuditFormModal
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          onSubmit={handleSubmitAudit}
          auditToEdit={editingAudit}
        />
      </div>
    </TooltipProvider>
  )
}
