"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  LayoutDashboard,
  FileText,
  Building2,
  Users,
  BarChart3,
  TrendingUp,
  Settings,
  LogOut,
  Search,
  Bell,
  ChevronDown,
  IndianRupee,
  Globe,
  ListChecks,
  PlusCircle,
  Briefcase,
  ClipboardList,
  UserCheck,
  BookOpen,
  MessageSquare,
  UserPlus,
} from "lucide-react"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { useToast } from "./ui/use-toast"
import { useGlobalSettings } from "@/contexts/global-settings-context"
import { MobileNavMenu } from "./mobile-nav-menu" // Import the new mobile menu

export interface NavItem {
  name: string
  href?: string
  icon?: React.ElementType
  children?: NavItem[]
  onClick?: () => void
  isExternal?: boolean // For links that should open in a new tab
  label?: string // Optional label like "New"
}

export type TopNavigationProps = {}

const mainNavItems: NavItem[] = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  {
    name: "Portfolio",
    icon: Briefcase,
    href: "/portfolio", // Parent link
    children: [
      { name: "View All Startups", href: "/portfolio", icon: Building2 },
      { name: "Add New Startup", href: "/portfolio/new", icon: PlusCircle },
      // { name: "Investment Tracking", href: "/portfolio/investments", icon: TrendingUp },
    ],
  },
  {
    name: "Assessments",
    icon: ClipboardList,
    href: "/assessments", // Parent link
    children: [
      { name: "All Assessments", href: "/assessments", icon: FileText },
      { name: "New Assessment", href: "/assessments/new", icon: PlusCircle },
      // { name: "Assessment Templates", href: "/assessments/templates", icon: FileText },
    ],
  },
  {
    name: "Mentors",
    icon: UserCheck,
    href: "/mentors", // Parent link
    children: [
      { name: "Mentor Network", href: "/mentors", icon: Users },
      { name: "Add New Mentor", href: "/mentors/new", icon: UserPlus },
      // { name: "Feedback & Ratings", href: "/mentors/feedback", icon: Star },
    ],
  },
  { name: "Requests", href: "/requests", icon: ListChecks },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Analytics", href: "/analytics", icon: TrendingUp },
]

const resourcesNavItems: NavItem[] = [
  { name: "Knowledge Base", href: "/knowledge-base", icon: BookOpen },
  { name: "Support Center", href: "/support", icon: MessageSquare },
]

// User Profile Dropdown Items
const userProfileNavItems = (onSignOut: () => void): NavItem[] => [
  { name: "My Dashboard", href: "/", icon: LayoutDashboard, onClick: () => {} /* Add shortcut if needed */ },
  { name: "Profile", href: "/profile", icon: Users, onClick: () => {} /* Add shortcut if needed */ },
  { name: "Settings", href: "/settings", icon: Settings, onClick: () => {} /* Add shortcut if needed */ },
  { name: "Sign Out", icon: LogOut, onClick: onSignOut, isExternal: false /* Add shortcut if needed */ },
]

export function TopNavigation(props: TopNavigationProps) {
  const pathname = usePathname()
  const { toast } = useToast()
  const {
    selectedCountry,
    setSelectedCountry,
    availableCountries,
    selectedCurrency,
    setSelectedCurrency,
    availableCurrenciesForCountry,
  } = useGlobalSettings()

  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have 3 unread messages. (Notification system to be implemented)",
      duration: 3000,
    })
  }

  const handleSignOut = () => {
    toast({ title: "Logged Out", description: "You have been successfully logged out." })
    // Add actual sign out logic here
  }

  const userDisplayName = "Rajesh Kumar" // Mock data
  const userEmail = "rajesh.k@example.com" // Mock data

  const renderNavLink = (item: NavItem, index: number) => {
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
        <DropdownMenu key={item.name}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center",
                isActive
                  ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground"
                  : "text-foreground/70 hover:bg-muted hover:text-foreground/90",
              )}
            >
              {item.icon && <item.icon className="mr-2 h-4 w-4" />}
              {item.name}
              <ChevronDown className="ml-1 h-4 w-4 opacity-70" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {item.children.map((child) => (
              <DropdownMenuItem key={child.name} asChild>
                <Link
                  href={child.href || "#"}
                  className={cn(
                    "flex items-center w-full",
                    child.href &&
                      (pathname === child.href || (child.href !== "/" && pathname.startsWith(child.href))) &&
                      "bg-muted dark:bg-muted/50",
                  )}
                >
                  {child.icon && <child.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
                  {child.name}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }

    return (
      <Link
        key={item.name}
        href={item.href || "#"}
        className={cn(
          "px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center",
          isActive
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "text-foreground/70 hover:bg-muted hover:text-foreground/90",
        )}
      >
        {item.icon && <item.icon className="mr-2 h-4 w-4" />}
        {item.name}
      </Link>
    )
  }

  const GlobalSettingsComponent = () => (
    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-1 px-2 md:px-0 py-2 md:py-0 border-t md:border-none mt-2 md:mt-0 pt-2 md:pt-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-full md:w-auto justify-start md:justify-center text-foreground/80 hover:bg-muted hover:text-foreground"
          >
            <Globe className="h-4 w-4 mr-2" /> {selectedCountry.code}
            <ChevronDown className="h-4 w-4 ml-auto md:ml-1 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
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
            className="w-full md:w-auto justify-start md:justify-center text-foreground/80 hover:bg-muted hover:text-foreground"
          >
            <IndianRupee className="h-4 w-4 mr-2" /> {selectedCurrency.code}
            <ChevronDown className="h-4 w-4 ml-auto md:ml-1 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
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
  )

  const SearchComponent = () => (
    <div className="relative w-full md:max-w-xs px-2 md:px-0">
      <Search className="absolute left-3 md:left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input placeholder="Search..." className="pl-9 bg-muted/50 dark:bg-muted/20 focus:bg-background" />
    </div>
  )

  const NotificationsComponent = () => (
    <Button
      variant="ghost"
      size="icon"
      className="relative text-foreground/80 hover:text-foreground"
      onClick={handleNotificationClick}
    >
      <Bell className="h-5 w-5" />
      <Badge
        variant="destructive"
        className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs"
      >
        3
      </Badge>
      <span className="sr-only">View notifications</span>
    </Button>
  )

  const UserProfileComponent = ({
    isMobile = false,
    onSignOut: mobileSignOut,
  }: { isMobile?: boolean; onSignOut?: () => void }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "relative h-9 w-9 rounded-full",
            isMobile && "w-full flex items-center justify-start p-2 h-auto",
          )}
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="User Avatar" />
            <AvatarFallback>RK</AvatarFallback>
          </Avatar>
          {isMobile && <span className="ml-2 text-sm font-medium">{userDisplayName}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel className="py-2">
          <p className="text-sm font-semibold">{userDisplayName}</p>
          <p className="text-xs text-muted-foreground">{userEmail}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {userProfileNavItems(isMobile ? mobileSignOut! : handleSignOut).map((item) =>
            item.name === "Sign Out" ? (
              <DropdownMenuItem
                key={item.name}
                onClick={item.onClick}
                className="text-destructive focus:text-destructive focus:bg-destructive/10"
              >
                {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                <span>{item.name}</span>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem key={item.name} asChild>
                <Link href={item.href || "#"} className="flex items-center w-full">
                  {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                  <span>{item.name}</span>
                  {/* item.shortcut && <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut> */}
                </Link>
              </DropdownMenuItem>
            ),
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        {/* Mobile Menu Trigger - Placed on the left */}
        <div className="md:hidden">
          <MobileNavMenu
            mainNavItems={mainNavItems}
            resourcesNavItems={resourcesNavItems}
            userDisplayName={userDisplayName}
            userEmail={userEmail}
            onSignOut={handleSignOut}
            currentPathname={pathname}
            globalSettingsComponent={<GlobalSettingsComponent />}
            searchComponent={<SearchComponent />}
            // notificationsComponent={<NotificationsComponent />} // Can be added if needed in mobile sheet
            userProfileComponent={<UserProfileComponent />}
          />
        </div>

        {/* Logo and Main Title */}
        <Link href="/" className="hidden md:flex items-center space-x-2 mr-6">
          <div className="h-8 w-8 rounded-md bg-gradient-to-r from-jpmc-brand-blue-hsl to-jpmc-brand-darkblue-hsl flex items-center justify-center">
            <span className="text-white font-bold text-sm">SI</span>
          </div>
          <span className="font-semibold text-lg text-foreground">Incubator Portal</span>
        </Link>

        {/* Desktop Main Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {mainNavItems.map(renderNavLink)}
          {/* Resources Dropdown for Desktop */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="px-3 py-2 text-sm font-medium rounded-md transition-colors text-foreground/70 hover:bg-muted hover:text-foreground/90 flex items-center"
              >
                Resources <ChevronDown className="ml-1 h-4 w-4 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {resourcesNavItems.map((item) => (
                <DropdownMenuItem key={item.name} asChild>
                  <Link href={item.href || "#"} className="flex items-center w-full">
                    {item.icon && <item.icon className="mr-2 h-4 w-4 text-muted-foreground" />} {item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Spacer and Right-side controls */}
        <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-3">
          <div className="hidden lg:block">
            <SearchComponent />
          </div>
          <div className="hidden md:flex">
            <GlobalSettingsComponent />
          </div>
          <NotificationsComponent />
          <div className="hidden md:block">
            <UserProfileComponent />
          </div>
        </div>
      </div>
    </header>
  )
}
