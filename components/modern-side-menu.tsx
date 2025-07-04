import { BarChart3, Building2, FileSearch, FileText, Home, Settings, TrendingUp, User } from "lucide-react"

import type { NavItem } from "@/types"

interface Props {
  isCollapsed: boolean
}

export function ModernSideMenu({ isCollapsed }: Props) {
  const navigation: NavItem[] = [
    {
      title: "Home",
      href: "/",
      icon: Home,
      description: "Dashboard overview",
    },
    {
      title: "Profile",
      href: "/profile",
      icon: User,
      description: "Manage your profile",
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
      description: "Application settings",
    },
    {
      title: "Investors",
      items: [
        {
          title: "Dashboard",
          href: "/investors",
          icon: BarChart3,
          description: "Portfolio overview and performance metrics",
        },
        {
          title: "Companies",
          href: "/investors/companies",
          icon: Building2,
          description: "Portfolio company management",
        },
        {
          title: "Analytics",
          href: "/investors/analytics",
          icon: TrendingUp,
          description: "Advanced portfolio analytics",
        },
        {
          title: "Due Diligence",
          href: "/investors/due-diligence",
          icon: FileSearch,
          description: "Investment evaluation process",
        },
        {
          title: "Reports",
          href: "/investors/reports",
          icon: FileText,
          description: "Generate and manage reports",
        },
      ],
    },
  ]

  return (
    <div className="flex flex-col h-full">
      {/* Add your side menu content here */}
      {/* Example: */}
      <p>Modern Side Menu</p>
      <p>Collapsed: {String(isCollapsed)}</p>
    </div>
  )
}
