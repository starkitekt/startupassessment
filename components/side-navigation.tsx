"use client"

import type React from "react"
import { useState, useRef, useCallback, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "./ui/use-toast"
import { useGlobalSettings } from "@/contexts/global-settings-context"
import {
  LayoutDashboard,
  FileText,
  Building2,
  Users,
  Settings,
  LogOut,
  Search,
  ChevronDown,
  IndianRupee,
  Globe,
  PlusCircle,
  UserPlus,
  Briefcase,
  BarChart2,
  HelpCircle,
  ShieldCheck,
  BookOpen,
  MessageSquareIcon as MessageSquareQuestion,
  TrendingUp,
  Menu,
  X,
  Zap,
  Gavel,
  Rocket,
  ClipboardCheck,
  CheckCircle,
} from "lucide-react"
import { AdvancedSearch } from "./advanced-search"

export interface SideNavItem {
  name: string
  href?: string
  icon: React.ElementType
  children?: SideNavItem[]
  onClick?: () => void
  label?: string
  description?: string
}

const mainNavItems: SideNavItem[] = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    description: "Overview and key metrics",
  },
  {
    name: "Accelerator",
    href: "/accelerator",
    icon: Zap,
    description: "Manage accelerator programs",
    children: [
      { name: "Programs Overview", href: "/accelerator", icon: Rocket, description: "View all accelerator programs" },
      {
        name: "My Applications",
        href: "/accelerator/applications", // Placeholder, actual page might differ
        icon: FileText,
        description: "Track your applications",
      },
      { name: "Active Cohorts", href: "/accelerator/cohorts", icon: Users, description: "Engage with active cohorts" }, // Placeholder
    ],
  },
  {
    name: "Compliance",
    href: "/compliance",
    icon: Gavel,
    description: "Oversee compliance & regulations",
    children: [
      {
        name: "Compliance Dashboard",
        href: "/compliance",
        icon: ClipboardCheck,
        description: "Overall compliance status",
      },
      { name: "Policies", href: "/compliance/policies", icon: BookOpen, description: "View company policies" }, // Placeholder
      {
        name: "My Compliance Tasks",
        href: "/compliance/tasks", // Placeholder
        icon: CheckCircle,
        description: "Your pending tasks",
      },
    ],
  },
  {
    name: "Portfolio",
    icon: Briefcase,
    href: "/portfolio",
    description: "Manage startup portfolio",
    children: [
      { name: "View All Startups", href: "/portfolio", icon: Building2, description: "Browse all startups" },
      { name: "Add New Startup", href: "/portfolio/new", icon: PlusCircle, description: "Onboard new startup" },
    ],
  },
  {
    name: "Assessments",
    icon: FileText,
    href: "/assessments",
    description: "Evaluation and scoring",
    children: [
      { name: "All Assessments", href: "/assessments", icon: FileText, description: "View all assessments" },
      { name: "New Assessment", href: "/assessments/new", icon: PlusCircle, description: "Create new assessment" },
    ],
  },
  {
    name: "Mentors",
    icon: Users,
    href: "/mentors",
    description: "Mentor network management",
    children: [
      { name: "Mentor Network", href: "/mentors", icon: Users, description: "Browse mentor profiles" },
      { name: "Add New Mentor", href: "/mentors/new", icon: UserPlus, description: "Onboard new mentor" },
    ],
  },
  {
    name: "Requests",
    href: "/requests",
    icon: HelpCircle,
    description: "Manage requests and tasks",
  },
  {
    name: "Reports",
    href: "/reports",
    icon: BarChart2,
    description: "Generate and view reports",
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: TrendingUp,
    description: "Data insights and trends",
  },
  {
    name: "Audits",
    href: "/audits",
    icon: ShieldCheck,
    description: "Audit management",
  },
]

const resourcesNavItems: SideNavItem[] = [
  // 'Accelerator & Compliance Info' removed
  {
    name: "Knowledge Base",
    href: "/knowledge-base",
    icon: BookOpen,
    description: "Documentation and guides",
  },
  {
    name: "Support Center",
    href: "/support",
    icon: MessageSquareQuestion,
    description: "Get help and support",
  },
]

export function SideNavigation() {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const {
    selectedCountry,
    setSelectedCountry,
    availableCountries,
    selectedCurrency,
    setSelectedCurrency,
    availableCurrenciesForCountry,
  } = useGlobalSettings()

  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeFlyoutItemName, setActiveFlyoutItemName] = useState<string | null>(null)
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false)
  const [flyoutPosition, setFlyoutPosition] = useState({ top: 0, left: 0 })
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false)

  const flyoutTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const flyoutRef = useRef<HTMLDivElement>(null) // Ref for the flyout panel

  const clearFlyoutTimeout = useCallback(() => {
    if (flyoutTimeoutRef.current) {
      clearTimeout(flyoutTimeoutRef.current)
      flyoutTimeoutRef.current = null
    }
  }, [])

  const startFlyoutCloseTimer = useCallback(() => {
    clearFlyoutTimeout()
    flyoutTimeoutRef.current = setTimeout(() => {
      setIsFlyoutVisible(false)
    }, 5000)
  }, [clearFlyoutTimeout])

  const handleNavItemMouseEnter = (item: SideNavItem, event: React.MouseEvent<HTMLElement>) => {
    if (item.children && item.children.length > 0) {
      clearFlyoutTimeout()
      const rect = event.currentTarget.getBoundingClientRect()
      setFlyoutPosition({
        top: rect.top,
        left: rect.right + 8,
      })
      setActiveFlyoutItemName(item.name)
      setIsFlyoutVisible(true)
    } else {
      // If item has no children, ensure any existing flyout is hidden
      // but only if the mouse isn't moving towards an already open flyout
      if (isFlyoutVisible && activeFlyoutItemName !== item.name) {
        startFlyoutCloseTimer() // Start timer to close previous flyout
      }
      // If not hovering over a flyout-triggering item, ensure no flyout is considered active
      if (!(item.children && item.children.length > 0)) {
        setActiveFlyoutItemName(null)
      }
    }
  }

  const handleNavItemMouseLeave = (item: SideNavItem) => {
    // Start timer only if the mouse is not over the flyout and the leaving item is the active one
    if (activeFlyoutItemName === item.name && !flyoutRef.current?.matches(":hover")) {
      startFlyoutCloseTimer()
    }
  }

  const handleFlyoutMouseEnter = () => {
    clearFlyoutTimeout()
  }

  const handleFlyoutMouseLeave = () => {
    startFlyoutCloseTimer()
  }

  const handleFlyoutItemClick = () => {
    clearFlyoutTimeout()
    setIsFlyoutVisible(false)
    setActiveFlyoutItemName(null)
    setIsMobileOpen(false)
  }

  useEffect(() => {
    // Add keydown listener for Esc key to close flyout
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isFlyoutVisible) {
        handleFlyoutItemClick() // Use existing close logic
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isFlyoutVisible])

  const handleSignOut = () => {
    toast({ title: "Logged Out", description: "You have been successfully logged out." })
    router.push("/login")
  }

  const userDisplayName = "Rajesh Kumar"
  const userEmail = "rajesh.k@example.com"

  const renderNavItem = (item: SideNavItem): React.JSX.Element => {
    const isFlyoutTriggerActive = activeFlyoutItemName === item.name && isFlyoutVisible
    const isPathActive = item.href
      ? pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
      : (item.children &&
          item.children.some(
            (child) =>
              child.href && (pathname === child.href || (child.href !== "/" && pathname.startsWith(child.href))),
          )) ||
        false
    const isActive = isPathActive || isFlyoutTriggerActive

    const commonItemClasses = cn(
      "flex items-center justify-center w-12 h-12 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-muted/80 group relative",
      isActive ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground",
    )

    return (
      <TooltipProvider delayDuration={300} key={item.name}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className="relative"
              onMouseEnter={(e) => handleNavItemMouseEnter(item, e)}
              onMouseLeave={() => handleNavItemMouseLeave(item)}
            >
              {item.href && !item.children ? (
                <Link
                  href={item.href}
                  onClick={() => {
                    setIsMobileOpen(false)
                    handleFlyoutItemClick()
                  }}
                  className={commonItemClasses}
                >
                  <item.icon className="h-5 w-5" />
                </Link>
              ) : (
                <button
                  onClick={() => {
                    if (item.href) router.push(item.href)
                    setIsMobileOpen(false)
                    // If it has children, clicking the icon itself could also toggle the flyout or navigate to parent
                    if (item.children && item.children.length > 0) {
                      // No direct action, hover handles flyout. Or, could navigate to item.href if defined.
                    }
                  }}
                  className={commonItemClasses}
                  aria-haspopup={!!(item.children && item.children.length > 0)}
                  aria-expanded={activeFlyoutItemName === item.name && isFlyoutVisible}
                >
                  <item.icon className="h-5 w-5" />
                </button>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" className="max-w-xs bg-popover text-popover-foreground border-border shadow-lg">
            <div>
              <p className="font-semibold">{item.name}</p>
              {item.description && <p className="text-xs text-muted-foreground mt-1">{item.description}</p>}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  const currentFlyoutData =
    mainNavItems.find((item) => item.name === activeFlyoutItemName) ||
    resourcesNavItems.find((item) => item.name === activeFlyoutItemName)

  const renderMobileNavItem = (item: SideNavItem, isSubItem = false): React.JSX.Element => {
    const isActive = item.href ? pathname.startsWith(item.href) : false
    return (
      <div key={item.name}>
        <Link
          href={item.href || "#"}
          onClick={() => {
            setIsMobileOpen(false)
            if (!item.children && item.href) router.push(item.href)
          }}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
            isSubItem
              ? "ml-4 text-muted-foreground hover:bg-muted hover:text-foreground"
              : "text-foreground hover:bg-muted",
            isActive && (isSubItem ? "bg-primary/10 text-primary" : "bg-primary text-primary-foreground"),
          )}
        >
          <item.icon className={cn("h-4 w-4", isSubItem && "h-3.5 w-3.5")} />
          {item.name}
        </Link>
        {!isSubItem && item.children && (
          <div className="pl-4 mt-1 space-y-1">{item.children.map((child) => renderMobileNavItem(child, true))}</div>
        )}
      </div>
    )
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-[60] md:hidden bg-card/80 backdrop-blur-sm border shadow-md"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-[55] flex h-full w-72 flex-col border-r bg-card shadow-xl transition-transform duration-300 ease-in-out md:hidden",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="p-4">
          <Link href="/" className="flex items-center gap-3 mb-6" onClick={() => setIsMobileOpen(false)}>
            <div className="h-8 w-8 rounded-full jpmc-gradient flex items-center justify-center" />
            <span className="font-semibold text-lg text-foreground">Incubator Portal</span>
          </Link>
          <Button
            variant="outline"
            className="w-full justify-start mb-4"
            onClick={() => {
              setShowAdvancedSearch(true)
              setIsMobileOpen(false)
            }}
          >
            <Search className="h-4 w-4 mr-2" />
            Search...
          </Button>
        </div>
        <ScrollArea className="flex-grow px-4">
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Main Navigation
            </h4>
            {mainNavItems.map((item) => renderMobileNavItem(item))}
          </div>
          <div className="mt-6 space-y-1">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Resources</h4>
            {resourcesNavItems.map((item) => renderMobileNavItem(item))}
          </div>
        </ScrollArea>
        <div className="p-4 border-t">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start p-2">
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarImage src="/placeholder.svg?height=32&width=32&text=RK" alt={userDisplayName} />
                  <AvatarFallback>{userDisplayName.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-grow text-left">
                  <p className="text-sm font-medium">{userDisplayName}</p>
                  <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
                </div>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-popover text-popover-foreground border-border">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <Users className="mr-2 h-4 w-4" /> Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:z-30 md:flex md:h-full md:w-16 md:flex-col md:items-center md:gap-1 md:border-r md:bg-card md:py-3 md:shadow-sm">
        <Link href="/" className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-muted/50 mb-1">
          <div className="h-8 w-8 rounded-full jpmc-gradient flex items-center justify-center" />
        </Link>
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80"
                onClick={() => setShowAdvancedSearch(true)}
                data-search-trigger
              >
                <Search className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-popover text-popover-foreground border-border shadow-lg">
              <p>Advanced Search (Ctrl+K)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="flex-grow flex flex-col items-center gap-1 w-full mt-1">
          {mainNavItems.map((item) => renderNavItem(item))}
        </div>
        <div className="flex flex-col items-center gap-1 w-full mt-auto pt-1 border-t">
          {resourcesNavItems.map((item) => renderNavItem(item))}
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-12 w-12 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80"
                    >
                      <Globe className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    side="right"
                    className="w-52 bg-popover text-popover-foreground border-border"
                  >
                    <DropdownMenuLabel>Global Settings</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="text-xs text-muted-foreground">Country</DropdownMenuLabel>
                    {availableCountries.map((country) => (
                      <DropdownMenuItem key={country.code} onSelect={() => setSelectedCountry(country)}>
                        {country.flag} {country.name} ({country.code})
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="text-xs text-muted-foreground">Currency</DropdownMenuLabel>
                    {availableCurrenciesForCountry.map((currency) => (
                      <DropdownMenuItem key={currency.code} onSelect={() => setSelectedCurrency(currency)}>
                        <IndianRupee className="mr-2 h-4 w-4" />
                        {currency.name} ({currency.code})
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-popover text-popover-foreground border-border shadow-lg">
                <p>Global Settings</p>
                <p className="text-xs text-muted-foreground">Country: {selectedCountry.code}</p>
                <p className="text-xs text-muted-foreground">Currency: {selectedCurrency.code}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-12 w-12 rounded-lg hover:bg-muted/80">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32&text=RK" alt={userDisplayName} />
                        <AvatarFallback>{userDisplayName.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    side="right"
                    className="w-56 bg-popover text-popover-foreground border-border"
                  >
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile">
                        <Users className="mr-2 h-4 w-4" /> Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings">
                        <Settings className="mr-2 h-4 w-4" /> Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
                      <LogOut className="mr-2 h-4 w-4" /> Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-popover text-popover-foreground border-border shadow-lg">
                <p>{userDisplayName}</p>
                <p className="text-xs text-muted-foreground">{userEmail}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </aside>

      {currentFlyoutData?.children && (
        <div
          ref={flyoutRef}
          className={cn(
            "hidden md:block fixed z-40 bg-popover border border-border rounded-lg shadow-xl p-2 min-w-[250px]", // Increased min-width
            "data-[state=open]:animate-flyout-in data-[state=closed]:animate-flyout-out",
          )}
          data-state={isFlyoutVisible ? "open" : "closed"}
          style={{
            top: flyoutPosition.top,
            left: flyoutPosition.left,
            // Opacity and pointer-events are now handled by animation states if needed, or keep direct control:
            // opacity: isFlyoutVisible ? 1 : 0,
            // pointerEvents: isFlyoutVisible ? 'auto' : 'none',
          }}
          onMouseEnter={handleFlyoutMouseEnter}
          onMouseLeave={handleFlyoutMouseLeave}
        >
          <div className="p-2 border-b border-border mb-1">
            <h4 className="font-semibold text-sm text-popover-foreground">{currentFlyoutData.name}</h4>
            {currentFlyoutData.description && (
              <p className="text-xs text-muted-foreground mt-0.5">{currentFlyoutData.description}</p>
            )}
          </div>
          <div className="space-y-0.5">
            {currentFlyoutData.children.map((child) => (
              <Link
                key={child.name}
                href={child.href || "#"}
                onClick={handleFlyoutItemClick}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors hover:bg-muted",
                  pathname === child.href
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-popover-foreground/80 hover:text-popover-foreground",
                )}
              >
                <child.icon className="h-4 w-4 flex-shrink-0" />
                <div className="flex-grow">
                  <p className="font-medium text-sm">{child.name}</p>
                  {child.description && <p className="text-xs text-muted-foreground mt-0.5">{child.description}</p>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      <AdvancedSearch isOpen={showAdvancedSearch} onClose={() => setShowAdvancedSearch(false)} />
    </>
  )
}
