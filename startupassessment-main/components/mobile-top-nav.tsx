"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { X, Search } from "lucide-react"
import {
  Home,
  Building2,
  Users,
  FileText,
  BarChart3,
  Settings,
  HelpCircle,
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
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface MobileTopNavProps {
  isOpen: boolean
  onClose: () => void
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
    title: "Growth",
    items: [
      { name: "Mentors", href: "/mentors", icon: Users },
      { name: "Programs", href: "/programs", icon: Target },
      { name: "Acceleration", href: "/accelerator", icon: Zap },
      { name: "Requests", href: "/requests", icon: MessageSquare },
      { name: "CSR Portal", href: "/csr", icon: Heart },
    ],
  },
  {
    title: "Founders",
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

export function MobileTopNav({ isOpen, onClose }: MobileTopNavProps) {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-full max-w-sm p-0 flex flex-col">
        <SheetHeader className="p-4 border-b">
          <div className="flex justify-between items-center">
            <SheetTitle className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">SI</span>
              </div>
              <span className="font-semibold text-lg">Startup Incubator</span>
            </SheetTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </SheetHeader>

        {/* Mobile Search */}
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        {/* Navigation Sections */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-6">
            {navigationSections.map((section, sectionIndex) => (
              <div key={section.title}>
                {sectionIndex > 0 && <Separator className="mb-4" />}
                <div className="mb-3">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    {section.title}
                  </h3>
                </div>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const itemIsActive = isActive(item.href)
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "flex items-center space-x-3 p-3 rounded-lg text-sm font-medium transition-colors",
                          itemIsActive
                            ? "bg-primary/10 text-primary border border-primary/20"
                            : "text-foreground/80 hover:bg-muted hover:text-foreground",
                        )}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        <span>{item.name}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* User Info */}
        <div className="p-4 border-t">
          <div className="mb-3">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground">john.doe@example.com</p>
          </div>
          <Button variant="outline" className="w-full bg-transparent" onClick={onClose}>
            Sign Out
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
