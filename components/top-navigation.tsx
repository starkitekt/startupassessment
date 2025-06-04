"use client"
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
  DropdownMenuShortcut,
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
  LifeBuoy,
  Search,
  Bell,
  Lightbulb,
  ChevronDown,
  IndianRupee,
  Globe,
  ListChecks,
} from "lucide-react"
import { Input } from "./ui/input" // Assuming Input is in ui folder
import { Badge } from "./ui/badge" // Assuming Badge is in ui folder
import { useToast } from "./ui/use-toast" // Assuming useToast is in ui folder
import { useGlobalSettings } from "@/contexts/global-settings-context"

const mainNavItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Portfolio", href: "/portfolio", icon: Building2 },
  { name: "Assessments", href: "/assessments", icon: FileText },
  { name: "Mentors", href: "/mentors", icon: Users },
  { name: "Requests", href: "/requests", icon: ListChecks },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Analytics", href: "/analytics", icon: TrendingUp },
]

const resourcesNavItems = [
  { name: "Knowledge Base", href: "/knowledge-base", icon: Lightbulb },
  { name: "Support Center", href: "/support", icon: LifeBuoy },
]

export function TopNavigation() {
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
    })
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        {/* Logo and Main Title */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <div className="h-8 w-8 rounded bg-gradient-to-r from-jpmc-blue to-jpmc-darkblue flex items-center justify-center">
            <span className="text-white font-bold text-sm">SI</span>
          </div>
          <span className="hidden font-bold sm:inline-block text-jpmc-darkblue dark:text-jpmc-lightblue">
            Incubator Portal
          </span>
        </Link>

        {/* Main Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {mainNavItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              {item.name}
            </Link>
          ))}

          {/* Resources Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                Resources <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {resourcesNavItems.map((item) => (
                <DropdownMenuItem key={item.name} asChild>
                  <Link href={item.href} className="flex items-center">
                    <item.icon className="mr-2 h-4 w-4" /> {item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Spacer */}
        <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
          {/* Search Bar (Optional - can be prominent or icon-triggered) */}
          <div className="hidden lg:block w-full max-w-xs">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-9" />
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Globe className="h-4 w-4" /> {/* Or selectedCountry.flag */}
                {selectedCountry.code}
                <ChevronDown className="h-4 w-4 opacity-50" />
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
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <IndianRupee className="h-4 w-4" /> {/* Or a generic icon */}
                {selectedCurrency.code}
                <ChevronDown className="h-4 w-4 opacity-50" />
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

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative" onClick={handleNotificationClick}>
            <Bell className="h-5 w-5" />
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs"
            >
              3
            </Badge>
          </Button>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/placeholder.svg?height=36&width=36" alt="User Avatar" />
                  <AvatarFallback>RK</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <p className="font-medium">Rajesh Kumar</p>
                <p className="text-xs text-muted-foreground">rajesh.k@example.com</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => toast({ title: "Logged Out", description: "You have been successfully logged out." })}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign Out</span>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Trigger (if needed, or handle via responsive main nav) */}
          {/* <Button variant="ghost" size="icon" className="md:hidden"> <Menu className="h-5 w-5" /> </Button> */}
        </div>
      </div>
    </header>
  )
}
