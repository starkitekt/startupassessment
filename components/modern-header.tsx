"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  Bell,
  Menu,
  X,
  ChevronRight,
  Calendar,
  MessageSquare,
  FileText,
  CheckCircle,
  Building,
  BarChart,
  Users,
  CheckSquare,
  File,
  DollarSign,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { searchContent, type SearchResult, getTypeLabel } from "@/lib/search-service"

interface ModernHeaderProps {
  onMobileMenuToggle?: () => void
  isMobileMenuOpen?: boolean
}

export function ModernHeader({ onMobileMenuToggle, isMobileMenuOpen = false }: ModernHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: "New application submitted",
      description: "TechNova has submitted a new funding application",
      time: "2 min ago",
      unread: true,
      type: "application",
    },
    {
      id: 2,
      title: "Funding milestone reached",
      description: "HealthAI has reached their Series A funding milestone",
      time: "1 hour ago",
      unread: true,
      type: "funding",
    },
    {
      id: 3,
      title: "Mentor session scheduled",
      description: "Session with Sarah Johnson scheduled for tomorrow at 2 PM",
      time: "3 hours ago",
      unread: false,
      type: "calendar",
    },
    {
      id: 4,
      title: "Task completed",
      description: "Due diligence for Project Gamma has been completed",
      time: "Yesterday",
      unread: false,
      type: "task",
    },
  ]

  const unreadCount = notifications.filter((n) => n.unread).length

  // Handle search input changes
  useEffect(() => {
    const handleSearch = async () => {
      if (searchQuery.trim().length >= 2) {
        setIsSearching(true)
        try {
          const results = await searchContent(searchQuery)
          setSearchResults(results)
          setShowSearchResults(true)
        } catch (error) {
          console.error("Search error:", error)
          toast({
            title: "Search error",
            description: "An error occurred while searching. Please try again.",
            variant: "destructive",
          })
        } finally {
          setIsSearching(false)
        }
      } else {
        setSearchResults([])
        setShowSearchResults(false)
      }
    }

    const debounceTimer = setTimeout(handleSearch, 300)
    return () => clearTimeout(debounceTimer)
  }, [searchQuery, toast])

  // Handle click outside search results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const searchContainer = document.getElementById("search-container")
      if (searchContainer && !searchContainer.contains(event.target as Node)) {
        setShowSearchResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Get current page title
  const getPageTitle = () => {
    if (pathname === "/") return "Dashboard"
    const segments = pathname.split("/").filter(Boolean)
    if (segments.length === 0) return "Dashboard"

    // Handle specific routes
    const routeMap: Record<string, string> = {
      accelerator: "Accelerator Hub",
      programs: "Program Management",
      portfolio: "Portfolio Management",
      analytics: "Analytics",
      assessments: "Applications",
      tasks: "Task Management",
      funding: "Funding",
      calendar: "Calendar",
      mentors: "Mentor Matching",
      requests: "Request Management",
      csr: "CSR Portal",
      audits: "Audit Management",
      compliance: "Compliance Center",
      settings: "Settings & Profile",
    }

    return routeMap[segments[0]] || segments[0].charAt(0).toUpperCase() + segments[0].slice(1)
  }

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim().length >= 2) {
      toast({
        title: "Search results",
        description: `Found ${searchResults.length} results for "${searchQuery}"`,
      })
    }
  }

  // Get notification icon based on type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "application":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "funding":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "calendar":
        return <Calendar className="h-4 w-4 text-purple-500" />
      case "task":
        return <CheckCircle className="h-4 w-4 text-amber-500" />
      default:
        return <MessageSquare className="h-4 w-4 text-gray-500" />
    }
  }

  // Get search result icon based on type
  const getSearchResultIcon = (type: string) => {
    switch (type) {
      case "startup":
        return <Building className="h-4 w-4 text-blue-500" />
      case "application":
        return <FileText className="h-4 w-4 text-green-500" />
      case "report":
        return <BarChart className="h-4 w-4 text-purple-500" />
      case "mentor":
        return <Users className="h-4 w-4 text-amber-500" />
      case "task":
        return <CheckSquare className="h-4 w-4 text-red-500" />
      case "event":
        return <Calendar className="h-4 w-4 text-indigo-500" />
      case "document":
        return <File className="h-4 w-4 text-gray-500" />
      case "funding":
        return <DollarSign className="h-4 w-4 text-emerald-500" />
      default:
        return <Search className="h-4 w-4 text-gray-500" />
    }
  }

  // Navigate to search result
  const navigateToResult = (url: string) => {
    router.push(url)
    setSearchQuery("")
    setShowSearchResults(false)
  }

  return (
    <header className="fixed top-0 left-16 right-0 z-30 h-16 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Mobile menu button - only visible on mobile */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onMobileMenuToggle}
          className="md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </Button>

        {/* Left section - Page Title */}
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{getPageTitle()}</h1>
          {pathname !== "/" && (
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <ChevronRight className="h-4 w-4 mx-1" />
              <span>Overview</span>
            </div>
          )}
        </div>

        {/* Center section - Search */}
        <div id="search-container" className="hidden md:block flex-1 max-w-md mx-8 relative">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                aria-hidden="true"
              />
              <Input
                type="search"
                placeholder="Search startups, applications, reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 h-9 w-full bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0"
                aria-label="Global search"
                onFocus={() => {
                  if (searchQuery.trim().length >= 2) {
                    setShowSearchResults(true)
                  }
                }}
              />
              {searchQuery.length > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full p-0"
                  onClick={() => {
                    setSearchQuery("")
                    setShowSearchResults(false)
                  }}
                  aria-label="Clear search"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </form>

          {/* Search results dropdown */}
          {showSearchResults && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-md shadow-lg overflow-hidden z-50">
              {isSearching ? (
                <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">Searching...</div>
              ) : searchResults.length > 0 ? (
                <div>
                  <div className="max-h-[60vh] overflow-y-auto">
                    {searchResults.map((result) => (
                      <button
                        key={result.id}
                        className="flex items-start gap-3 w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-900 border-b border-gray-100 dark:border-gray-800 last:border-0"
                        onClick={() => navigateToResult(result.url)}
                      >
                        <div className="mt-0.5">{getSearchResultIcon(result.type)}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{result.title}</p>
                          {result.description && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                              {result.description}
                            </p>
                          )}
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs px-1.5 py-0">
                              {getTypeLabel(result.type)}
                            </Badge>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-800 p-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm"
                      onClick={() => {
                        toast({
                          title: "Advanced search",
                          description: `Searching for "${searchQuery}" with advanced filters`,
                        })
                        setShowSearchResults(false)
                      }}
                    >
                      Advanced Search
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  No results found for "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right section - Only Notifications */}
        <div className="flex items-center gap-2">
          {/* Search button - only visible on mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-9 w-9 rounded-full"
            aria-label="Search"
            onClick={() =>
              toast({
                title: "Mobile search",
                description: "Mobile search functionality would open here",
              })
            }
          >
            <Search className="h-4 w-4" />
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9 rounded-full"
                aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ""}`}
              >
                <Bell className="h-5 w-5 text-gray-700 dark:text-gray-300" aria-hidden="true" />
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px] font-medium"
                    aria-hidden="true"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifications</span>
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {unreadCount} new
                  </Badge>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[60vh] overflow-y-auto">
                {notifications.map((notification, index) => (
                  <div key={notification.id}>
                    <DropdownMenuItem className="flex items-start gap-3 p-3 cursor-pointer">
                      <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={cn("text-sm", notification.unread && "font-medium")}>{notification.title}</p>
                          {notification.unread && (
                            <div className="h-2 w-2 bg-blue-600 rounded-full" aria-label="Unread notification" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                          {notification.description}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    </DropdownMenuItem>
                    {index < notifications.length - 1 && <DropdownMenuSeparator />}
                  </div>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
