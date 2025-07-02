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
    title: "Management",
    items: [
      { name: "Compliance", href: "/audits", icon: Shield },
      { name: "Settings", href: "/settings", icon: Settings },
    ],
  },
]

export function SideNavigation() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <TooltipProvider>
      <div className="fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-16 border-r bg-background">
        <ScrollArea className="h-full">
          <div className="flex flex-col gap-2 p-2">
            {navigationSections.map((section, sectionIndex) => (
              <div key={section.title} className="space-y-1">
                {sectionIndex > 0 && <Separator className="my-2" />}
                {section.items.map((item) => {
                  const itemIsActive = isActive(item.href)
                  return (
                    <Tooltip key={item.name}>
                      <TooltipTrigger asChild>
                        <Button
                          variant={itemIsActive ? "secondary" : "ghost"}
                          size="icon"
                          className={cn(
                            "h-12 w-12 relative transition-all duration-200",
                            itemIsActive && "bg-primary/10 text-primary border border-primary/20",
                            !itemIsActive && "hover:bg-primary/5",
                          )}
                          asChild
                        >
                          <Link href={item.href}>
                            <item.icon className="h-5 w-5" />
                            <span className="sr-only">{item.name}</span>
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{section.title}</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  )
                })}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </TooltipProvider>
  )
}
