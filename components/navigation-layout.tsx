"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { SideNavigation } from "./side-navigation"
import { Header } from "./header"
import { cn } from "@/lib/utils"

interface NavigationLayoutProps {
  children: React.ReactNode
}

export function NavigationLayout({ children }: NavigationLayoutProps) {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setIsNavCollapsed(true)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const toggleNavigation = () => {
    setIsNavCollapsed(!isNavCollapsed)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={toggleNavigation} />
      <SideNavigation isCollapsed={isNavCollapsed} onToggle={toggleNavigation} />
      <main className={cn("transition-all duration-300 pt-16", isNavCollapsed ? "ml-16" : "ml-64", isMobile && "ml-0")}>
        <div className="container mx-auto p-4 md:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  )
}
