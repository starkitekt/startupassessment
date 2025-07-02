"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { X } from "lucide-react"
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
  BookOpen,
  HelpCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"

interface AccessibleMobileNavProps {
  isOpen: boolean
  onClose: () => void
}

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
    title: "People",
    items: [
      { name: "Mentors", href: "/mentors", icon: Users, description: "Manage mentor network" },
      { name: "Programs", href: "/programs", icon: Target, description: "Accelerator programs and cohorts" },
      { name: "Requests", href: "/requests", icon: MessageSquare, description: "Handle requests and communications" },
    ],
  },
  {
    title: "Management",
    items: [
      { name: "Compliance", href: "/audits", icon: Shield, description: "Audit and compliance management" },
      { name: "Knowledge", href: "/knowledge-base", icon: BookOpen, description: "Knowledge base and resources" },
      { name: "Support", href: "/support", icon: HelpCircle, description: "Help and support center" },
      { name: "Settings", href: "/settings", icon: Settings, description: "Application settings and preferences" },
    ],
  },
]

export function AccessibleMobileNav({ isOpen, onClose }: AccessibleMobileNavProps) {
  const pathname = usePathname()
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  // Focus management when modal opens
  useEffect(() => {
    if (isOpen && firstLinkRef.current) {
      setTimeout(() => {
        firstLinkRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  const createNavLink = (item: any, isFirst = false) => (
    <Link
      key={item.name}
      ref={isFirst ? firstLinkRef : undefined}
      href={item.href}
      onClick={onClose}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        isActive(item.href)
          ? "bg-primary/10 text-primary border border-primary/20"
          : "text-foreground/80 hover:bg-muted hover:text-foreground",
      )}
      aria-current={isActive(item.href) ? "page" : undefined}
      aria-describedby={`${item.name.toLowerCase().replace(/\s+/g, "-")}-desc`}
    >
      <item.icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
      <div className="flex-1">
        <div>{item.name}</div>
        <div
          id={`${item.name.toLowerCase().replace(/\s+/g, "-")}-desc`}
          className="text-xs text-muted-foreground mt-0.5"
        >
          {item.description}
        </div>
      </div>
    </Link>
  )

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="left"
        className="w-full max-w-xs sm:max-w-sm p-0 flex flex-col"
        aria-describedby="mobile-nav-description"
      >
        <SheetHeader className="p-4 border-b">
          <div className="flex justify-between items-center">
            <SheetTitle className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-md jpmc-gradient flex items-center justify-center">
                <span className="text-white font-bold text-sm" aria-hidden="true">
                  SI
                </span>
              </div>
              <span className="font-semibold text-lg text-foreground">Incubator Portal</span>
            </SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-foreground/70 hover:text-foreground focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Close navigation menu"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
          <p id="mobile-nav-description" className="sr-only">
            Main navigation menu for the startup incubator portal
          </p>
        </SheetHeader>

        <ScrollArea className="flex-grow p-4" aria-label="Navigation sections">
          <nav role="navigation" aria-label="Mobile navigation">
            <div className="space-y-6">
              {navigationSections.map((section, sectionIndex) => (
                <div key={section.title} role="group" aria-labelledby={`mobile-section-${sectionIndex}`}>
                  <h3
                    id={`mobile-section-${sectionIndex}`}
                    className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3"
                  >
                    {section.title}
                  </h3>
                  <div className="space-y-1">
                    {section.items.map((item, itemIndex) => createNavLink(item, sectionIndex === 0 && itemIndex === 0))}
                  </div>
                  {sectionIndex < navigationSections.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </nav>
        </ScrollArea>

        <div className="p-4 border-t bg-muted/30">
          <div className="mb-3">
            <p className="text-sm font-medium text-foreground">John Doe</p>
            <p className="text-xs text-muted-foreground">john.doe@example.com</p>
          </div>
          <Button
            variant="outline"
            className="w-full focus:ring-2 focus:ring-primary focus:ring-offset-2"
            onClick={onClose}
            aria-describedby="sign-out-desc"
          >
            Sign Out
            <span id="sign-out-desc" className="sr-only">
              Sign out of your account
            </span>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
