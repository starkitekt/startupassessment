"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  Search,
  Clock,
  FileText,
  Users,
  Building2,
  BarChart2,
  Settings,
  ArrowRight,
  Zap,
  Globe,
  TrendingUp,
} from "lucide-react"

interface SearchResult {
  id: string
  title: string
  description: string
  type: "startup" | "mentor" | "assessment" | "report" | "page" | "setting"
  category: string
  href: string
  icon: React.ElementType
  relevance: number
  lastAccessed?: Date
}

interface AdvancedSearchProps {
  isOpen: boolean
  onClose: () => void
}

// Mock search data - in a real app, this would come from an API
const mockSearchData: SearchResult[] = [
  {
    id: "1",
    title: "TechStart Solutions",
    description: "AI-powered startup in Series A funding stage",
    type: "startup",
    category: "Portfolio",
    href: "/portfolio/1",
    icon: Building2,
    relevance: 95,
    lastAccessed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "2",
    title: "Dr. Sarah Chen",
    description: "Senior Technology Mentor specializing in AI/ML",
    type: "mentor",
    category: "Mentors",
    href: "/mentors/2",
    icon: Users,
    relevance: 88,
    lastAccessed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: "3",
    title: "Q3 2024 Portfolio Assessment",
    description: "Quarterly evaluation of all portfolio companies",
    type: "assessment",
    category: "Assessments",
    href: "/assessments/3",
    icon: FileText,
    relevance: 82,
    lastAccessed: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: "4",
    title: "Portfolio Performance Report",
    description: "Comprehensive analysis of portfolio metrics",
    type: "report",
    category: "Reports",
    href: "/reports/4",
    icon: BarChart2,
    relevance: 78,
  },
  {
    id: "5",
    title: "Analytics Dashboard",
    description: "Data insights and performance metrics",
    type: "page",
    category: "Navigation",
    href: "/analytics",
    icon: TrendingUp,
    relevance: 75,
  },
  {
    id: "6",
    title: "Global Settings",
    description: "Configure country and currency preferences",
    type: "setting",
    category: "Settings",
    href: "/settings",
    icon: Settings,
    relevance: 70,
  },
]

const recentSearches = ["TechStart Solutions", "AI startups", "Q3 assessments", "mentor network", "portfolio metrics"]

const quickActions = [
  { name: "Add New Startup", href: "/portfolio/new", icon: Building2 },
  { name: "Create Assessment", href: "/assessments/new", icon: FileText },
  { name: "Add Mentor", href: "/mentors/new", icon: Users },
  { name: "Generate Report", href: "/reports", icon: BarChart2 },
]

export function AdvancedSearch({ isOpen, onClose }: AdvancedSearchProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [searchType, setSearchType] = useState<"global" | "page" | "contextual">("global")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Perform search
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)

    // Simulate API delay
    const searchTimeout = setTimeout(() => {
      let filteredResults = mockSearchData.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()),
      )

      // Apply search type filtering
      if (searchType === "page") {
        const currentPage = pathname.split("/")[1] || "dashboard"
        filteredResults = filteredResults.filter(
          (item) => item.href.includes(currentPage) || item.category.toLowerCase().includes(currentPage),
        )
      } else if (searchType === "contextual") {
        // Context-aware search based on current page
        const currentPage = pathname.split("/")[1] || "dashboard"
        filteredResults = filteredResults.map((item) => ({
          ...item,
          relevance: item.href.includes(currentPage) ? item.relevance + 20 : item.relevance,
        }))
      }

      // Sort by relevance
      filteredResults.sort((a, b) => b.relevance - a.relevance)

      setResults(filteredResults)
      setSelectedIndex(0)
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(searchTimeout)
  }, [query, searchType, pathname])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1))
          break
        case "ArrowUp":
          e.preventDefault()
          setSelectedIndex((prev) => Math.max(prev - 1, 0))
          break
        case "Enter":
          e.preventDefault()
          if (results[selectedIndex]) {
            handleResultClick(results[selectedIndex])
          }
          break
        case "Escape":
          e.preventDefault()
          onClose()
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, results, selectedIndex, onClose])

  const handleResultClick = (result: SearchResult) => {
    router.push(result.href)
    onClose()
  }

  const handleQuickAction = (href: string) => {
    router.push(href)
    onClose()
  }

  const getSearchTypeDescription = () => {
    switch (searchType) {
      case "global":
        return "Search across all sections and data"
      case "page":
        return `Search within current page (${pathname.split("/")[1] || "dashboard"})`
      case "contextual":
        return "Smart search with context-aware results"
      default:
        return ""
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Advanced Search
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-full">
          {/* Search Input and Type Selector */}
          <div className="px-6 py-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                ref={inputRef}
                placeholder="Search startups, mentors, assessments, reports..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-4 h-12 text-base"
              />
              {isLoading && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                </div>
              )}
            </div>

            <Tabs value={searchType} onValueChange={(value) => setSearchType(value as any)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="global" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Global
                </TabsTrigger>
                <TabsTrigger value="page" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Current Page
                </TabsTrigger>
                <TabsTrigger value="contextual" className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Smart
                </TabsTrigger>
              </TabsList>
              <p className="text-xs text-muted-foreground mt-2">{getSearchTypeDescription()}</p>
            </Tabs>
          </div>

          <Separator />

          <ScrollArea className="flex-1">
            <div className="px-6 py-4">
              {query && results.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Search Results ({results.length})</h3>
                  {results.map((result, index) => (
                    <div
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors",
                        index === selectedIndex ? "bg-primary/10 border border-primary/20" : "hover:bg-muted/50",
                      )}
                    >
                      <div className="flex-shrink-0">
                        <result.icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-sm truncate">{result.title}</p>
                          <Badge variant="secondary" className="text-xs">
                            {result.category}
                          </Badge>
                          {result.lastAccessed && (
                            <Badge variant="outline" className="text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              Recent
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{result.description}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    </div>
                  ))}
                </div>
              )}

              {query && results.length === 0 && !isLoading && (
                <div className="text-center py-8">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No results found</h3>
                  <p className="text-muted-foreground">Try adjusting your search terms or search type</p>
                </div>
              )}

              {!query && (
                <div className="space-y-6">
                  {/* Quick Actions */}
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {quickActions.map((action) => (
                        <Button
                          key={action.name}
                          variant="outline"
                          className="justify-start h-auto p-3"
                          onClick={() => handleQuickAction(action.href)}
                        >
                          <action.icon className="h-4 w-4 mr-2" />
                          <span className="text-sm">{action.name}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Recent Searches */}
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Recent Searches</h3>
                    <div className="space-y-1">
                      {recentSearches.map((search, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          className="w-full justify-start h-auto p-2 text-left"
                          onClick={() => setQuery(search)}
                        >
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">{search}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="px-6 py-3 border-t bg-muted/30">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>Esc Close</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-background border rounded text-xs">Ctrl</kbd>
                <span>+</span>
                <kbd className="px-1.5 py-0.5 bg-background border rounded text-xs">K</kbd>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
