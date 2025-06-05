"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { SideNavigation } from "@/components/side-navigation"
import { MobileNavMenu } from "@/components/mobile-nav-menu"
import { GlobalSettingsProvider } from "@/contexts/global-settings-context"
import { NotificationProvider } from "@/contexts/notification-context"
import { AdvancedSearch } from "@/components/advanced-search"

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsSearchOpen(true)
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false)
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <GlobalSettingsProvider>
      <NotificationProvider>
        <div className="min-h-screen bg-background">
          <Header onMenuClick={() => setIsMobileMenuOpen(true)} onSearchClick={() => setIsSearchOpen(true)} />

          <div className="flex">
            <SideNavigation />

            <main className="flex-1 ml-16 pt-16">
              <div className="container mx-auto p-6">{children}</div>
            </main>
          </div>

          {/* Mobile Navigation */}
          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

          {/* Advanced Search Modal */}
          <AdvancedSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </div>
      </NotificationProvider>
    </GlobalSettingsProvider>
  )
}
