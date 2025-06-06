"use client"

import type React from "react"

import { useState, useMemo, useRef, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronUp, ChevronDown, Search, Download, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export interface Column<T> {
  key: keyof T
  header: string
  sortable?: boolean
  filterable?: boolean
  render?: (value: any, row: T) => React.ReactNode
  width?: string
  align?: "left" | "center" | "right"
  ariaLabel?: (value: any, row: T) => string
}

export interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  searchableColumns?: (keyof T)[]
  filterableColumns?: { key: keyof T; options: { label: string; value: string }[] }[]
  title?: string
  description?: string
  actions?: {
    view?: (row: T) => void
    edit?: (row: T) => void
    delete?: (row: T) => void
    custom?: Array<{
      label: string
      icon?: React.ElementType
      action: (row: T) => void
      ariaLabel?: (row: T) => string
    }>
  }
  onExport?: () => void
  className?: string
  emptyMessage?: string
  loading?: boolean
  pageSize?: number
}

export function AccessibleDataTable<T extends Record<string, any>>({
  data,
  columns,
  searchableColumns = [],
  filterableColumns = [],
  title,
  description,
  actions,
  onExport,
  className,
  emptyMessage = "No data available",
  loading = false,
  pageSize = 10,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: "asc" | "desc" } | null>(null)
  const [filters, setFilters] = useState<Record<string, string>>({})
  const [currentPage, setCurrentPage] = useState(1)
  const [announcementMessage, setAnnouncementMessage] = useState("")

  const tableRef = useRef<HTMLTableElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Filter and search data
  const filteredData = useMemo(() => {
    let filtered = data

    // Apply search
    if (searchTerm && searchableColumns.length > 0) {
      filtered = filtered.filter((row) =>
        searchableColumns.some((col) => String(row[col]).toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "all") {
        filtered = filtered.filter((row) => String(row[key]) === value)
      }
    })

    return filtered
  }, [data, searchTerm, searchableColumns, filters])

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1
      }
      return 0
    })
  }, [filteredData, sortConfig])

  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return sortedData.slice(startIndex, startIndex + pageSize)
  }, [sortedData, currentPage, pageSize])

  const totalPages = Math.ceil(sortedData.length / pageSize)

  const handleSort = (key: keyof T) => {
    const column = columns.find((col) => col.key === key)
    if (!column?.sortable) return

    let direction: "asc" | "desc" = "asc"
    if (sortConfig?.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }

    setSortConfig({ key, direction })
    setAnnouncementMessage(`Table sorted by ${column.header} in ${direction}ending order`)
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setCurrentPage(1)
    setAnnouncementMessage(`Filter applied to ${key}`)
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
    if (value) {
      setAnnouncementMessage(`Search applied: ${filteredData.length} results found`)
    } else {
      setAnnouncementMessage("Search cleared")
    }
  }

  // Keyboard navigation for table
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!tableRef.current?.contains(e.target as Node)) return

      const focusableElements = tableRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ) as NodeListOf<HTMLElement>

      const currentIndex = Array.from(focusableElements).indexOf(e.target as HTMLElement)

      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault()
        const nextIndex =
          e.key === "ArrowDown"
            ? Math.min(currentIndex + 1, focusableElements.length - 1)
            : Math.max(currentIndex - 1, 0)
        focusableElements[nextIndex]?.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className={cn("space-y-4", className)}>
      {/* Screen reader announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announcementMessage}
      </div>

      {title && (
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      )}

      {/* Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              {searchableColumns.length > 0 && (
                <div className="relative max-w-sm">
                  <label htmlFor="table-search" className="sr-only">
                    Search table data
                  </label>
                  <Search
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <Input
                    id="table-search"
                    ref={searchInputRef}
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-9"
                    aria-describedby="search-help"
                  />
                  <div id="search-help" className="sr-only">
                    Search across {searchableColumns.join(", ")} columns
                  </div>
                </div>
              )}

              {/* Filters */}
              {filterableColumns.map(({ key, options }) => (
                <div key={String(key)} className="min-w-[150px]">
                  <label htmlFor={`filter-${String(key)}`} className="sr-only">
                    Filter by {String(key)}
                  </label>
                  <Select
                    value={filters[String(key)] || "all"}
                    onValueChange={(value) => handleFilterChange(String(key), value)}
                  >
                    <SelectTrigger id={`filter-${String(key)}`}>
                      <SelectValue placeholder={`Filter ${String(key)}`} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All {String(key)}</SelectItem>
                      {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>

            {onExport && (
              <Button variant="outline" onClick={onExport} className="w-full sm:w-auto" aria-describedby="export-help">
                <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                Export
                <span id="export-help" className="sr-only">
                  Export table data to CSV
                </span>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table ref={tableRef} className="w-full">
              <TableHeader>
                <TableRow>
                  {columns.map((column) => (
                    <TableHead
                      key={String(column.key)}
                      className={cn(
                        "font-medium",
                        column.align === "center" && "text-center",
                        column.align === "right" && "text-right",
                        column.width && `w-${column.width}`,
                      )}
                    >
                      {column.sortable ? (
                        <Button
                          variant="ghost"
                          onClick={() => handleSort(column.key)}
                          className="h-auto p-0 font-medium hover:bg-transparent"
                          aria-label={`Sort by ${column.header}`}
                          aria-sort={
                            sortConfig?.key === column.key
                              ? sortConfig.direction === "asc"
                                ? "ascending"
                                : "descending"
                              : "none"
                          }
                        >
                          <span>{column.header}</span>
                          <div className="ml-2 flex flex-col">
                            <ChevronUp
                              className={cn(
                                "h-3 w-3",
                                sortConfig?.key === column.key && sortConfig.direction === "asc"
                                  ? "text-foreground"
                                  : "text-muted-foreground",
                              )}
                              aria-hidden="true"
                            />
                            <ChevronDown
                              className={cn(
                                "h-3 w-3 -mt-1",
                                sortConfig?.key === column.key && sortConfig.direction === "desc"
                                  ? "text-foreground"
                                  : "text-muted-foreground",
                              )}
                              aria-hidden="true"
                            />
                          </div>
                        </Button>
                      ) : (
                        column.header
                      )}
                    </TableHead>
                  ))}
                  {actions && (
                    <TableHead className="text-center w-16">
                      <span className="sr-only">Actions</span>
                      Actions
                    </TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={columns.length + (actions ? 1 : 0)} className="h-24 text-center">
                      <div aria-live="polite">Loading...</div>
                    </TableCell>
                  </TableRow>
                ) : paginatedData.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length + (actions ? 1 : 0)}
                      className="h-24 text-center text-muted-foreground"
                    >
                      {emptyMessage}
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedData.map((row, index) => (
                    <TableRow key={index} className="hover:bg-muted/50">
                      {columns.map((column) => {
                        const value = row[column.key]
                        const content = column.render ? column.render(value, row) : value

                        return (
                          <TableCell
                            key={String(column.key)}
                            className={cn(
                              column.align === "center" && "text-center",
                              column.align === "right" && "text-right",
                            )}
                            aria-label={column.ariaLabel ? column.ariaLabel(value, row) : undefined}
                          >
                            {content}
                          </TableCell>
                        )
                      })}
                      {actions && (
                        <TableCell className="text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                aria-label={`Actions for row ${index + 1}`}
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {actions.view && (
                                <DropdownMenuItem onClick={() => actions.view!(row)}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </DropdownMenuItem>
                              )}
                              {actions.edit && (
                                <DropdownMenuItem onClick={() => actions.edit!(row)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                              )}
                              {actions.custom?.map((customAction, actionIndex) => (
                                <DropdownMenuItem
                                  key={actionIndex}
                                  onClick={() => customAction.action(row)}
                                  aria-label={customAction.ariaLabel ? customAction.ariaLabel(row) : customAction.label}
                                >
                                  {customAction.icon && <customAction.icon className="mr-2 h-4 w-4" />}
                                  {customAction.label}
                                </DropdownMenuItem>
                              ))}
                              {actions.delete && (
                                <DropdownMenuItem
                                  onClick={() => actions.delete!(row)}
                                  className="text-red-600 hover:text-red-700 focus:text-red-700"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, sortedData.length)} of{" "}
            {sortedData.length} results
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              aria-label="Go to previous page"
            >
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    aria-label={`Go to page ${pageNum}`}
                    aria-current={currentPage === pageNum ? "page" : undefined}
                  >
                    {pageNum}
                  </Button>
                )
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              aria-label="Go to next page"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
