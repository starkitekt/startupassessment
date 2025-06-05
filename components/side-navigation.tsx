"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Home,
  Building2,
  Users,
  FileText,
  BarChart3,
  Settings,
  HelpCircle,
  CheckSquare,
  MessageSquare,
  Shield,
  Zap,
  BookOpen,
  TrendingUp,
  ChevronRight,
  Calendar,
  Clock,
  UserCheck,
  Target,
  Briefcase,
  DollarSign,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigationItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Portfolio", href: "/portfolio", icon: Building2 },
  { name: "Assessments", href: "/assessments", icon: FileText },
  { name: "Mentors", href: "/mentors", icon: Users },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Requests", href: "/requests", icon: MessageSquare },
  { name: "Audits", href: "/audits", icon: Shield },
  {
    name: "Accelerator & Compliance",
    href: "/accelerator-compliance",
    icon: Zap,
    children: [
      { name: "Accelerator", href: "/accelerator", icon: Zap },
      { name: "Compliance", href: "/compliance", icon: BookOpen },
    ],
  },
  {
    name: "Programs",
    href: "/programs",
    icon: Briefcase,
    children: [
      { name: "All Programs", href: "/programs", icon: Briefcase },
      { name: "Cohort Management", href: "/programs/cohorts", icon: Users },
      { name: "Program Analytics", href: "/programs/analytics", icon: BarChart3 },
    ],
  },
  {
    name: "Funding",
    href: "/funding",
    icon: DollarSign,
    children: [
      { name: "Applications", href: "/funding/applications", icon: FileText },
      { name: "Disbursements", href: "/funding/disbursements", icon: DollarSign },
      { name: "Milestones", href: "/funding/milestones", icon: Target },
    ],
  },
  {
    name: "Mentorship",
    href: "/mentors",
    icon: Users,
    children: [
      { name: "All Mentors", href: "/mentors", icon: Users },
      { name: "Mentor Matching", href: "/mentors/matching", icon: UserCheck },
      { name: "Schedule Sessions", href: "/mentors/schedule", icon: Clock },
    ],
  },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Reports", href: "/reports", icon: TrendingUp },
  { name: "Knowledge Base", href: "/knowledge-base", icon: BookOpen },
  { name: "Support", href: "/support", icon: HelpCircle },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function SideNavigation() {
  const pathname = usePathname()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [flyoutPosition, setFlyoutPosition] = useState({ top: 0, left: 0 })
  const [showFlyout, setShowFlyout] = useState(false)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const flyoutTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  const hasActiveChild = (children: any[]) => {
    return children?.some((child) => isActive(child.href))
  }

  const handleMouseEnter = (itemName: string, event: React.MouseEvent<HTMLButtonElement>) => {
    const item = navigationItems.find((nav) => nav.name === itemName)

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }

    if (flyoutTimeoutRef.current) {
      clearTimeout(flyoutTimeoutRef.current)
    }

    if (item?.children) {
      const rect = event.currentTarget.getBoundingClientRect()
      setFlyoutPosition({
        top: rect.top,
        left: rect.right + 8,
      })

      hoverTimeoutRef.current = setTimeout(() => {
        setHoveredItem(itemName)
        setShowFlyout(true)
      }, 150) // Slight delay for better UX
    }
  }

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }

    flyoutTimeoutRef.current = setTimeout(() => {
      setShowFlyout(false)
      setHoveredItem(null)
    }, 300) // Delay to allow moving to flyout
  }

  const handleFlyoutMouseEnter = () => {
    if (flyoutTimeoutRef.current) {
      clearTimeout(flyoutTimeoutRef.current)
    }
  }

  const handleFlyoutMouseLeave = () => {
    setShowFlyout(false)
    setHoveredItem(null)
  }

  const handleFlyoutItemClick = () => {
    setShowFlyout(false)
    setHoveredItem(null)
  }

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
      if (flyoutTimeoutRef.current) {
        clearTimeout(flyoutTimeoutRef.current)
      }
    }
  }, [])

  const hoveredItemData = navigationItems.find((item) => item.name === hoveredItem)

  return (
    <TooltipProvider>
      <div className="fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-16 border-r bg-background">
        <ScrollArea className="h-full">
          <div className="flex flex-col gap-2 p-2">
            {navigationItems.map((item) => {
              const hasChildren = item.children && item.children.length > 0
              const itemIsActive = isActive(item.href) || (hasChildren && hasActiveChild(item.children))

              return (
                <div key={item.name}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {hasChildren ? (
                        <Button
                          variant={itemIsActive ? "secondary" : "ghost"}
                          size="icon"
                          className={cn("h-12 w-12 relative", itemIsActive && "bg-primary/10 text-primary")}
                          onMouseEnter={(e) => handleMouseEnter(item.name, e)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <item.icon className="h-5 w-5" />
                          <ChevronRight className="h-3 w-3 absolute bottom-1 right-1" />
                        </Button>
                      ) : (
                        <Button
                          variant={itemIsActive ? "secondary" : "ghost"}
                          size="icon"
                          className={cn("h-12 w-12", itemIsActive && "bg-primary/10 text-primary")}
                          asChild
                        >
                          <Link href={item.href}>
                            <item.icon className="h-5 w-5" />
                          </Link>
                        </Button>
                      )}
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              )
            })}
          </div>
        </ScrollArea>

        {/* Flyout Menu */}
        {showFlyout && hoveredItemData?.children && (
          <div
            className="fixed bg-background border rounded-md shadow-lg z-50 min-w-48 py-2"
            style={{
              top: flyoutPosition.top,
              left: flyoutPosition.left,
            }}
            onMouseEnter={handleFlyoutMouseEnter}
            onMouseLeave={handleFlyoutMouseLeave}
          >
            <div className="px-3 py-2 border-b">
              <div className="flex items-center">
                <hoveredItemData.icon className="mr-2 h-4 w-4" />
                <span className="font-medium text-sm">{hoveredItemData.name}</span>
              </div>
            </div>
            {hoveredItemData.children.map((child) => (
              <Link
                key={child.name}
                href={child.href}
                className={cn(
                  "flex items-center px-4 py-2 text-sm hover:bg-muted transition-colors",
                  isActive(child.href) && "bg-primary/10 text-primary",
                )}
                onClick={handleFlyoutItemClick}
              >
                <child.icon className="mr-3 h-4 w-4" />
                {child.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}
