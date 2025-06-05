"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { SideNavigation } from "@/components/side-navigation"
import { MobileNavMenu } from "@/components/mobile-nav-menu"
import { Toaster } from "@/components/ui/toaster"
import { GlobalSettingsProvider } from "@/contexts/global-settings-context"
import { ThemeProvider } from "@/components/theme-provider"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <GlobalSettingsProvider>
        <div className={`${GeistSans.variable} ${GeistMono.variable} min-h-screen bg-background font-sans antialiased`}>
          <Header onMenuClick={handleMenuClick} />
          <div className="flex">
            <SideNavigation />
            <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
            <main className="flex-1 ml-16 p-6 overflow-auto">{children}</main>
          </div>
          <Toaster />
        </div>
      </GlobalSettingsProvider>
    </ThemeProvider>
  )
}
