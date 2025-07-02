"use client"

import type React from "react"

import { useState } from "react"
import { ModernSideMenu } from "@/components/modern-side-menu"
import { ModernHeader } from "@/components/modern-header"
import { AccessibleMobileNav } from "@/components/accessible-mobile-nav"
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"
import { GlobalSettingsProvider } from "@/contexts/global-settings-context"
import { NotificationProvider } from "@/contexts/notification-context"

interface ModernLayoutProps {
  children: React.ReactNode
}

export function ModernLayout({ children }: ModernLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <GlobalSettingsProvider>
      <NotificationProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          {/* Desktop Sidebar */}
          <div className="hidden md:block">
            <ModernSideMenu />
          </div>

          {/* Mobile Navigation */}
          <AccessibleMobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

          {/* Header */}
          <ModernHeader onMobileMenuToggle={handleMobileMenuToggle} isMobileMenuOpen={isMobileMenuOpen} />

          {/* Main Content */}
          <main
            id="main-content"
            className={cn(
              "transition-all duration-200 ease-in-out",
              "md:ml-16 pt-16", // Desktop: margin-left for sidebar, padding-top for header
              "ml-0", // Mobile: no margin-left
            )}
            role="main"
            aria-label="Main content"
          >
            {/* Standardized container with consistent padding */}
            <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8 max-w-7xl">{children}</div>
          </main>

          <Toaster />
        </div>
      </NotificationProvider>
    </GlobalSettingsProvider>
  )
}
