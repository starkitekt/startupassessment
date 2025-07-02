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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const toggleNavigation = () => {
    // Mobile navigation toggle can be implemented here if needed
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={toggleNavigation} />
      <SideNavigation />
      <main className={cn("transition-all duration-300", isMobile ? "ml-0 pt-16" : "ml-16 pt-16")}>
        <div className="h-full p-4 md:p-6">{children}</div>
      </main>
    </div>
  )
}
