"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import {
  Home,
  Building2,
  Users,
  FileText,
  BarChart3,
  Settings,
  CheckSquare,
  DollarSign,
  Calendar,
  MessageSquare,
  Shield,
  Target,
  Heart,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"

const navigationSections = [
  {
    title: "Core",
    items: [
      { name: "Dashboard", href: "/", icon: Home, description: "Main dashboard with overview metrics" },
      { name: "Portfolio", href: "/portfolio", icon: Building2, description: "Manage startup portfolio companies" },
      { name: "Analytics", href: "/analytics", icon: BarChart3, description: "View analytics and insights" },
    ],
  },
  {
    title: "Operations",
    items: [
      { name: "Applications", href: "/assessments", icon: FileText, description: "Review startup applications" },
      { name: "Tasks", href: "/tasks", icon: CheckSquare, description: "Manage tasks and workflows" },
      { name: "Funding", href: "/funding", icon: DollarSign, description: "Track funding and investments" },
      { name: "Calendar", href: "/calendar", icon: Calendar, description: "Schedule and manage events" },
    ],
  },
  {
    title: "Growth",
    items: [
      { name: "Mentors", href: "/mentors", icon: Users, description: "Manage mentor network" },
      { name: "Programs", href: "/programs", icon: Target, description: "Accelerator programs and cohorts" },
      { name: "Acceleration", href: "/accelerator", icon: Zap, description: "Startup acceleration hub and programs" },
      { name: "Requests", href: "/requests", icon: MessageSquare, description: "Handle requests and communications" },
      { name: "CSR Portal", href: "/csr", icon: Heart, description: "Corporate Social Responsibility initiatives" },
    ],
  },
  {
    title: "Management",
    items: [
      { name: "Compliance", href: "/audits", icon: Shield, description: "Audit and compliance management" },
      { name: "Settings", href: "/settings", icon: Settings, description: "Application settings and preferences" },
    ],
  },
]

interface AccessibleSideNavigationProps {
  className?: string
}

export function AccessibleSideNavigation({ className }: AccessibleSideNavigationProps) {
  const pathname = usePathname()
  const navigationRef = useRef<HTMLElement>(null)

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!navigationRef.current?.contains(e.target as Node)) return

      const focusableElements = navigationRef.current.querySelectorAll(
        "a[href], button:not([disabled])",
      ) as NodeListOf<HTMLElement>

      const currentIndex = Array.from(focusableElements).indexOf(e.target as HTMLElement)
      let nextIndex = currentIndex

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          nextIndex = (currentIndex + 1) % focusableElements.length
          break
        case "ArrowUp":
          e.preventDefault()
          nextIndex = currentIndex === 0 ? focusableElements.length - 1 : currentIndex - 1
          break
        case "Home":
          e.preventDefault()
          nextIndex = 0
          break
        case "End":
          e.preventDefault()
          nextIndex = focusableElements.length - 1
          break
        default:
          return
      }
      focusableElements[nextIndex]?.focus()
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <TooltipProvider>
      <nav
        ref={navigationRef}
        className={cn(
          "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-16 border-r bg-background transition-all duration-200 ease-in-out lg:w-16",
          className,
        )}
        aria-label="Main navigation"
        role="navigation"
      >
        <ScrollArea className="h-full" aria-label="Navigation sections">
          <div className="flex flex-col gap-2 p-2">
            {navigationSections.map((section, sectionIndex) => (
              <div key={section.title} className="space-y-1" role="group" aria-labelledby={`section-${sectionIndex}`}>
                {sectionIndex > 0 && <Separator className="my-2" />}
                <h2 id={`section-${sectionIndex}`} className="sr-only">
                  {section.title} navigation
                </h2>
                {section.items.map((item) => {
                  const itemIsActive = isActive(item.href)
                  return (
                    <Tooltip key={item.name}>
                      <TooltipTrigger asChild>
                        <Button
                          variant={itemIsActive ? "secondary" : "ghost"}
                          size="icon"
                          className={cn(
                            "h-12 w-12 relative transition-all duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2",
                            itemIsActive && "bg-primary/10 text-primary border border-primary/20",
                            !itemIsActive && "hover:bg-primary/5",
                          )}
                          asChild
                        >
                          <Link
                            href={item.href}
                            aria-label={`${item.name}: ${item.description}`}
                            aria-current={itemIsActive ? "page" : undefined}
                          >
                            <item.icon className="h-5 w-5" aria-hidden="true" />
                            <span className="sr-only">{item.name}</span>
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="max-w-xs">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{section.title} section</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  )
                })}
              </div>
            ))}
          </div>
        </ScrollArea>
      </nav>
    </TooltipProvider>
  )
}
