"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Search,
  Menu,
  Settings,
  LogOut,
  User,
  Bell,
  Sun,
  Moon,
  Monitor,
  ChevronDown,
  Home,
  Building2,
  Users,
  FileText,
  BarChart3,
  CheckSquare,
  DollarSign,
  Calendar,
  MessageSquare,
  Shield,
  Target,
  Heart,
  Zap,
  BookOpen,
  TrendingUp,
  HelpCircle,
} from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface TopNavigationProps {
  onMobileMenuToggle: () => void
}

const navigationSections = [
  {
    title: "Core",
    items: [
      { name: "Dashboard", href: "/", icon: Home },
      { name: "Portfolio", href: "/portfolio", icon: Building2 },
      { name: "Analytics", href: "/analytics", icon: BarChart3 },
    ],
  },
  {
    title: "Operations",
    items: [
      { name: "Applications", href: "/assessments", icon: FileText },
      { name: "Tasks", href: "/tasks", icon: CheckSquare },
      { name: "Funding", href: "/funding", icon: DollarSign },
      { name: "Calendar", href: "/calendar", icon: Calendar },
    ],
  },
  {
    title: "Growth & Community",
    items: [
      { name: "Mentors", href: "/mentors", icon: Users },
      { name: "Programs", href: "/programs", icon: Target },
      { name: "Acceleration", href: "/accelerator", icon: Zap },
      { name: "Requests", href: "/requests", icon: MessageSquare },
      { name: "CSR Portal", href: "/csr", icon: Heart },
    ],
  },
  {
    title: "Startup Owners",
    items: [
      { name: "Founder Hub", href: "/founders", icon: Users },
      { name: "Community", href: "/founders/community", icon: MessageSquare },
      { name: "Learning", href: "/founders/learning", icon: BookOpen },
      { name: "Progress", href: "/founders/progress", icon: TrendingUp },
      { name: "Equity", href: "/founders/equity", icon: DollarSign },
      { name: "Ideas", href: "/founders/ideas", icon: Target },
    ],
  },
  {
    title: "Management",
    items: [
      { name: "Compliance", href: "/audits", icon: Shield },
      { name: "Knowledge Base", href: "/knowledge-base", icon: BookOpen },
      { name: "Reports", href: "/reports", icon: TrendingUp },
      { name: "Support", href: "/support", icon: HelpCircle },
      { name: "Settings", href: "/settings", icon: Settings },
    ],
  },
]

export function TopNavigation({ onMobileMenuToggle }: TopNavigationProps) {
  const { theme, setTheme } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()
  const [notifications] = useState([
    { id: 1, title: "New procurement request", time: "2 min ago", unread: true },
    { id: 2, title: "Vendor approval pending", time: "1 hour ago", unread: true },
    { id: 3, title: "Receipt verified", time: "3 hours ago", unread: false },
  ])

  const unreadCount = notifications.filter((n) => n.unread).length

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Main Navigation Bar */}
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Left section - Logo and Mobile Menu */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMobileMenuToggle}
            className="lg:hidden focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">SI</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-semibold text-lg text-foreground">Startup Incubator</h1>
              <p className="text-xs text-muted-foreground hidden lg:block">Enterprise Portal</p>
            </div>
          </div>
        </div>

        {/* Center section - Navigation Menu (Desktop) */}
        <div className="hidden lg:flex flex-1 justify-center max-w-4xl mx-8">
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-1">
              {navigationSections.map((section) => (
                <NavigationMenuItem key={section.title}>
                  <NavigationMenuTrigger className="h-9 px-3 text-sm font-medium">
                    {section.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {section.items.map((item) => {
                        const itemIsActive = isActive(item.href)
                        return (
                          <NavigationMenuLink key={item.name} asChild>
                            <Link
                              href={item.href}
                              className={cn(
                                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                itemIsActive && "bg-primary/10 text-primary border border-primary/20",
                              )}
                            >
                              <div className="flex items-center space-x-2">
                                <item.icon className="h-4 w-4" />
                                <div className="text-sm font-medium leading-none">{item.name}</div>
                              </div>
                              <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                                Access {item.name.toLowerCase()} features and tools
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        )
                      })}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right section - Search, Notifications, Theme, User */}
        <div className="flex items-center gap-2">
          {/* Search (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-sm">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-9 w-full"
              />
              <kbd className="pointer-events-none absolute right-2.5 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
          </div>

          {/* Search Button (Mobile) */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-4 w-4" />
          </Button>

          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Toggle theme"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 h-4 w-4" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 h-4 w-4" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Monitor className="mr-2 h-4 w-4" />
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ""}`}
              >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                Notifications
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {unreadCount} new
                  </Badge>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <ScrollArea className="max-h-64">
                {notifications.map((notification, index) => (
                  <div key={notification.id}>
                    <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                      <div className="flex items-center justify-between w-full">
                        <p className={cn("text-sm", notification.unread && "font-semibold")}>{notification.title}</p>
                        {notification.unread && <div className="h-2 w-2 bg-primary rounded-full" />}
                      </div>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </DropdownMenuItem>
                    {index < notifications.length - 1 && <DropdownMenuSeparator />}
                  </div>
                ))}
              </ScrollArea>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center text-primary">View all notifications</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">Administrator</p>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                Help & Support
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
