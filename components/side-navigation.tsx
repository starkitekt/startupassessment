"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "./ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
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
  LifeBuoy,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react"

// Redefine NavItem for SideNavigation needs if different from MobileNavMenu
export interface SideNavItem {
  name: string
  href?: string
  icon: React.ElementType // Icon is mandatory for side nav
  children?: SideNavItem[]
  onClick?: () => void
  label?: string // For badges like "New"
  isSectionHeader?: boolean
}

const mainNavItems: SideNavItem[] = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  {
    name: "Portfolio",
    icon: Briefcase,
    href: "/portfolio", // Main link for the section
    children: [
      { name: "View All Startups", href: "/portfolio", icon: Building2 },
      { name: "Add New Startup", href: "/portfolio/new", icon: PlusCircle },
    ],
  },
  {
    name: "Assessments",
    icon: FileText,
    href: "/assessments",
    children: [
      { name: "All Assessments", href: "/assessments", icon: FileText },
      { name: "New Assessment", href: "/assessments/new", icon: PlusCircle },
    ],
  },
  {
    name: "Mentors",
    icon: Users,
    href: "/mentors",
    children: [
      { name: "Mentor Network", href: "/mentors", icon: Users },
      { name: "Add New Mentor", href: "/mentors/new", icon: UserPlus },
    ],
  },
  { name: "Requests", href: "/requests", icon: HelpCircle }, // Changed icon
  { name: "Reports", href: "/reports", icon: BarChart2 },
  { name: "Analytics", href: "/analytics", icon: BarChart2 }, // Consider a different icon if BarChart2 is too similar to reports
  { name: "Audits", href: "/audits", icon: ShieldCheck }, // New Audit item
]

const resourcesNavItems: SideNavItem[] = [
  { name: "Knowledge Base", href: "/knowledge-base", icon: LifeBuoy },
  { name: "Support Center", href: "/support", icon: HelpCircle },
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

  const handleSignOut = () => {
    toast({ title: "Logged Out", description: "You have been successfully logged out." })
    router.push("/login") // Simulate redirect to login
  }

  const userDisplayName = "Rajesh Kumar"
  const userEmail = "rajesh.k@example.com"

  const renderNavItem = (item: SideNavItem, level = 0): JSX.Element => {
    const isActive = item.href
      ? pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
      : (item.children &&
          item.children.some(
            (child) =>
              child.href && (pathname === child.href || (child.href !== "/" && pathname.startsWith(child.href))),
          )) ||
        false

    if (item.children && item.children.length > 0) {
      return (
        <AccordionItem value={item.name} key={item.name} className="border-b-0">
          <AccordionTrigger
            className={cn(
              "flex items-center justify-between w-full px-3 py-2.5 rounded-md text-sm font-medium hover:no-underline transition-colors",
              isActive
                ? "bg-primary/10 text-primary dark:bg-primary/20"
                : "text-foreground/70 hover:bg-muted hover:text-foreground/90",
              level > 0 && "pl-8", // Indent nested accordions
            )}
          >
            <div className="flex items-center">
              <item.icon className={cn("h-5 w-5 mr-3", isActive ? "text-primary" : "text-foreground/70")} />
              {item.name}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-0 pl-3 pr-0">
            <div className="ml-0 space-y-1 mt-1">{item.children.map((child) => renderNavItem(child, level + 1))}</div>
          </AccordionContent>
        </AccordionItem>
      )
    }

    return (
      <Link
        key={item.name}
        href={item.href || "#"}
        onClick={item.onClick ? item.onClick : () => setIsMobileOpen(false)}
        className={cn(
          "flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
          isActive
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "text-foreground/70 hover:bg-muted hover:text-foreground/90",
          level > 0 && "pl-8", // Indent direct links
        )}
      >
        <item.icon className={cn("h-5 w-5 mr-3", isActive ? "" : "text-foreground/70")} />
        {item.name}
        {item.label && (
          <Badge variant="secondary" className="ml-auto">
            {item.label}
          </Badge>
        )}
      </Link>
    )
  }

  const navigationContent = (
    <>
      <div className="p-3">
        <Link href="/" className="flex items-center gap-2 mb-4" onClick={() => setIsMobileOpen(false)}>
          <div className="h-8 w-8 rounded-full jpmc-gradient flex items-center justify-center" />
          <span className="font-semibold text-lg text-foreground">Incubator</span>
        </Link>
        <div className="relative mb-4">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-8 h-9 bg-muted/60 dark:bg-muted/30 focus:bg-background" />
        </div>
      </div>

      <ScrollArea className="flex-grow px-2">
        <Accordion type="multiple" className="w-full space-y-0.5">
          {mainNavItems.map((item) => renderNavItem(item))}
        </Accordion>

        <div className="mt-4 pt-3 border-t mx-2">
          <h4 className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
            Resources
          </h4>
          <div className="space-y-0.5">{resourcesNavItems.map((item) => renderNavItem(item))}</div>
        </div>

        <div className="mt-4 pt-3 border-t mx-2">
          <h4 className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
            Global Settings
          </h4>
          <div className="px-1 space-y-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-foreground/80 hover:bg-muted hover:text-foreground px-2"
                >
                  <Globe className="h-4 w-4 mr-2" /> {selectedCountry.code}
                  <ChevronDown className="h-4 w-4 ml-auto opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" side="right" className="w-52">
                <DropdownMenuLabel>Select Country</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {availableCountries.map((country) => (
                  <DropdownMenuItem key={country.code} onSelect={() => setSelectedCountry(country)}>
                    {country.flag} {country.name} ({country.code})
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-foreground/80 hover:bg-muted hover:text-foreground px-2"
                >
                  <IndianRupee className="h-4 w-4 mr-2" /> {selectedCurrency.code}
                  <ChevronDown className="h-4 w-4 ml-auto opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" side="right" className="w-52">
                <DropdownMenuLabel>Select Currency</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {availableCurrenciesForCountry.map((currency) => (
                  <DropdownMenuItem key={currency.code} onSelect={() => setSelectedCurrency(currency)}>
                    {currency.name} ({currency.code})
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </ScrollArea>

      <div className="mt-auto p-3 border-t">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start items-center text-left h-auto p-2 hover:bg-muted">
              <Avatar className="h-9 w-9 mr-3">
                <AvatarImage src="/placeholder.svg?height=36&width=36&text=RK" alt={userDisplayName} />
                <AvatarFallback>{userDisplayName.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <p className="text-sm font-medium text-foreground">{userDisplayName}</p>
                <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
              </div>
              <ChevronDown className="h-4 w-4 opacity-50 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="top" className="w-56 mb-1">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center w-full">
                <Users className="mr-2 h-4 w-4" /> Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center w-full">
                <Settings className="mr-2 h-4 w-4" /> Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="text-destructive focus:text-destructive focus:bg-destructive/10"
            >
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Hamburger Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-3 left-3 z-50 md:hidden bg-card/80 backdrop-blur-sm"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Mobile Sheet */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setIsMobileOpen(false)} // Close on overlay click
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex h-full w-72 flex-col border-r bg-card transition-transform duration-300 ease-in-out md:translate-x-0",
          isMobileOpen ? "translate-x-0 shadow-xl" : "-translate-x-full",
        )}
      >
        {navigationContent}
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:z-30 md:flex md:h-full md:w-72 md:flex-col md:border-r md:bg-card">
        {navigationContent}
      </aside>
    </>
  )
}
