"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Home,
  Zap,
  Target,
  Building2,
  BarChart3,
  FileText,
  CheckSquare,
  DollarSign,
  Calendar,
  Users,
  MessageSquare,
  Heart,
  Shield,
  Settings,
  Rocket,
  TrendingUp,
  BookOpen,
  Network,
  PieChart,
  Lightbulb,
} from "lucide-react"

// Define navigation items with proper grouping
const navigationItems = [
  {
    group: "Core",
    items: [
      { name: "Dashboard", href: "/", icon: Home, description: "Main dashboard overview" },
      { name: "Accelerator", href: "/accelerator", icon: Zap, description: "Accelerator programs and applications" },
      { name: "Programs", href: "/programs", icon: Target, description: "Program management and cohorts" },
      { name: "Portfolio", href: "/portfolio", icon: Building2, description: "Startup portfolio management" },
      { name: "Analytics", href: "/analytics", icon: BarChart3, description: "Analytics and insights" },
    ],
  },
  {
    group: "Operations",
    items: [
      { name: "Applications", href: "/assessments", icon: FileText, description: "Application assessments" },
      { name: "Tasks", href: "/tasks", icon: CheckSquare, description: "Task management" },
      { name: "Funding", href: "/funding", icon: DollarSign, description: "Funding and investments" },
      { name: "Calendar", href: "/calendar", icon: Calendar, description: "Schedule and events" },
    ],
  },
  {
    group: "Founders",
    items: [
      { name: "Founder Hub", href: "/founders", icon: Rocket, description: "Founder dashboard and resources" },
      {
        name: "Progress",
        href: "/founders/progress",
        icon: TrendingUp,
        description: "Track startup progress and milestones",
      },
      {
        name: "Learning",
        href: "/founders/learning",
        icon: BookOpen,
        description: "Educational resources and courses",
      },
      {
        name: "Community",
        href: "/founders/community",
        icon: Network,
        description: "Founder community and networking",
      },
      { name: "Equity", href: "/founders/equity", icon: PieChart, description: "Equity management and cap table" },
      { name: "Ideas", href: "/founders/ideas", icon: Lightbulb, description: "Idea validation and feedback" },
    ],
  },
  {
    group: "Community",
    items: [
      { name: "Mentors", href: "/mentors", icon: Users, description: "Mentor network" },
      { name: "Requests", href: "/requests", icon: MessageSquare, description: "Request management" },
      { name: "CSR Portal", href: "/csr", icon: Heart, description: "Corporate social responsibility" },
    ],
  },
  {
    group: "Management",
    items: [
      { name: "Compliance", href: "/audits", icon: Shield, description: "Audit and compliance" },
      { name: "Settings", href: "/settings", icon: Settings, description: "Settings and preferences" },
    ],
  },
]

export function ModernSideMenu() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <TooltipProvider>
      <aside
        className="fixed left-0 top-0 z-40 h-screen w-16 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 shadow-sm"
        aria-label="Main navigation"
      >
        {/* Logo Section */}
        <div className="flex h-16 items-center justify-center border-b border-gray-200 dark:border-gray-800">
          <Link href="/" className="flex items-center justify-center">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm" aria-hidden="true">
                SI
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <nav className="flex flex-col gap-6 p-2 pt-4" role="navigation" aria-label="Main navigation">
            {navigationItems.map((group) => (
              <div key={group.group} className="flex flex-col gap-1">
                <div className="px-2 mb-1">
                  <div className="h-px w-8 bg-gray-200 dark:bg-gray-800 mx-auto" aria-hidden="true" />
                </div>
                {group.items.map((item) => {
                  const itemIsActive = isActive(item.href)
                  return (
                    <Tooltip key={item.name} delayDuration={300}>
                      <TooltipTrigger asChild>
                        <Link
                          href={item.href}
                          aria-label={`${item.name}: ${item.description}`}
                          aria-current={itemIsActive ? "page" : undefined}
                          className={cn(
                            "relative flex h-10 w-10 mx-auto items-center justify-center rounded-lg",
                            "transition-all duration-200 ease-in-out",
                            "hover:bg-gray-100 dark:hover:bg-gray-900",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                            itemIsActive && [
                              "bg-blue-50 dark:bg-blue-950/40",
                              "before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2",
                              "before:h-6 before:w-1 before:rounded-r-full before:bg-blue-600",
                            ],
                          )}
                        >
                          <item.icon
                            className={cn(
                              "h-5 w-5 transition-colors",
                              itemIsActive ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400",
                            )}
                            aria-hidden="true"
                          />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        className="ml-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">{item.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  )
                })}
              </div>
            ))}
          </nav>
        </ScrollArea>
      </aside>
    </TooltipProvider>
  )
}
