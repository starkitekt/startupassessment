"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AccessibleHeader } from "@/components/accessible-header"
import { AccessibleSideNavigation } from "@/components/accessible-side-navigation"
import { AccessibleMobileNav } from "@/components/accessible-mobile-nav"
import { cn } from "@/lib/utils"

interface AccessibleNavigationLayoutProps {
  children: React.ReactNode
}

export function AccessibleNavigationLayout({ children }: AccessibleNavigationLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Handle mobile detection
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)

    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  // Handle mobile menu state changes
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false)
  }

  // Close mobile menu on route change (handled in mobile nav component)
  useEffect(() => {
    if (isMobileMenuOpen && !isMobile) {
      setIsMobileMenuOpen(false)
    }
  }, [isMobile, isMobileMenuOpen])

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <AccessibleHeader onMenuToggle={handleMobileMenuToggle} isMenuOpen={isMobileMenuOpen} />

      {/* Desktop Side Navigation */}
      {!isMobile && <AccessibleSideNavigation className="hidden md:block" />}

      {/* Mobile Navigation */}
      <AccessibleMobileNav isOpen={isMobileMenuOpen} onClose={handleMobileMenuClose} />

      {/* Main Content */}
      <main
        id="main-content"
        className={cn("pt-16 transition-all duration-200 ease-in-out", !isMobile ? "md:pl-16" : "")}
        tabIndex={-1}
        role="main"
        aria-label="Main content"
      >
        <div className="container mx-auto px-4 py-6 lg:px-8">{children}</div>
      </main>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={handleMobileMenuClose} aria-hidden="true" />
      )}
    </div>
  )
}
