"use client"

import type React from "react"

import { useState } from "react"
import { TopNavigation } from "./top-navigation"
import { MobileTopNav } from "./mobile-top-nav"
import { Toaster } from "@/components/ui/toaster"
import { DocumentProvider } from "@/contexts/document-context"

interface TopNavigationLayoutProps {
  children: React.ReactNode
}

export function TopNavigationLayout({ children }: TopNavigationLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <DocumentProvider>
      <div className="min-h-screen bg-background">
        {/* Top Navigation */}
        <TopNavigation onMobileMenuToggle={handleMobileMenuToggle} />

        {/* Mobile Navigation Sheet */}
        <MobileTopNav isOpen={isMobileMenuOpen} onClose={handleMobileMenuClose} />

        {/* Main Content */}
        <main className="pt-16">
          <div className="container mx-auto px-4 py-6 lg:px-6">{children}</div>
        </main>

        {/* Toast Notifications */}
        <Toaster />
      </div>
    </DocumentProvider>
  )
}
