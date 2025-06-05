"use client"
import Link from "next/link"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
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
} from "lucide-react"

interface MobileNavMenuProps {
  isOpen: boolean
  onClose: () => void
}

// Navigation items (same as in side navigation)
const navigationItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Portfolio", href: "/portfolio", icon: Building2 },
  { name: "Assessments", href: "/assessments", icon: FileText },
  { name: "Mentors", href: "/mentors", icon: Users },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Requests", href: "/requests", icon: MessageSquare },
  { name: "Audits", href: "/audits", icon: Shield },
  { name: "Accelerator", href: "/accelerator", icon: Zap },
  { name: "Compliance", href: "/compliance", icon: BookOpen },
  { name: "Reports", href: "/reports", icon: TrendingUp },
  { name: "Knowledge Base", href: "/knowledge-base", icon: BookOpen },
  { name: "Support", href: "/support", icon: HelpCircle },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function MobileNavMenu({ isOpen, onClose }: MobileNavMenuProps) {
  const createNavLink = (item: (typeof navigationItems)[0]) => (
    <Link
      key={item.name}
      href={item.href}
      className="flex items-center p-3 rounded-md text-base font-medium transition-colors text-foreground/80 hover:bg-muted hover:text-foreground"
      onClick={onClose} // Close menu on navigation
    >
      <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
      {item.name}
    </Link>
  )

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-full max-w-xs sm:max-w-sm p-0 flex flex-col">
        <SheetHeader className="p-4 border-b">
          <div className="flex justify-between items-center">
            <SheetTitle className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-md jpmc-gradient flex items-center justify-center">
                <span className="text-white font-bold text-sm">SI</span>
              </div>
              <span className="font-semibold text-lg text-foreground">Incubator Portal</span>
            </SheetTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-foreground/70">
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
        </SheetHeader>

        <div className="flex-grow overflow-y-auto p-4 space-y-2">
          {navigationItems.map((item) => createNavLink(item))}
        </div>

        <div className="p-4 border-t">
          <div className="mb-2">
            <p className="text-sm font-medium text-foreground">John Doe</p>
            <p className="text-xs text-muted-foreground">john.doe@example.com</p>
          </div>
          <Button variant="outline" className="w-full" onClick={onClose}>
            Sign Out
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
