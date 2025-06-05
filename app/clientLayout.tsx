"use client"

import type React from "react"
import { useEffect } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { SideNavigation } from "@/components/side-navigation"
import { Toaster } from "@/components/ui/toaster"
import { GlobalSettingsProvider, useGlobalSettings } from "@/contexts/global-settings-context"
import { cn } from "@/lib/utils"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { usePathname } from "next/navigation"

function AppContent({ children }: { children: React.ReactNode }) {
  const { selectedCountry, isExchangeRateLoading } = useGlobalSettings()
  const pathname = usePathname()

  // Global keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        // Trigger search modal - this would be handled by the SideNavigation component
        const searchButton = document.querySelector("[data-search-trigger]") as HTMLButtonElement
        if (searchButton) {
          searchButton.click()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SideNavigation />
      {/* Main content with left margin for fixed sidebar */}
      <div className="md:ml-16 flex flex-col flex-1 min-h-screen">
        {/* Informational banner for country selection and loading state */}
        {(selectedCountry || isExchangeRateLoading) && (
          <div
            className={cn(
              "text-xs text-center py-1 transition-all duration-300 sticky top-0 z-20",
              isExchangeRateLoading ? "bg-amber-500 text-white" : "bg-secondary text-secondary-foreground",
            )}
          >
            {isExchangeRateLoading
              ? `Fetching exchange rates for ${selectedCountry.name}...`
              : `Content tailored for ${selectedCountry.name}. (Legal frameworks simulated)`}
          </div>
        )}
        <main className="flex-grow container mx-auto px-4 py-6 max-w-screen-2xl">
          {/* Add top margin to account for mobile menu button */}
          <div className="mt-16 md:mt-4">{pathname !== "/" && <Breadcrumbs />}</div>
          {children}
        </main>
        <Toaster />
        <footer className="py-6 md:px-8 md:py-0 border-t bg-muted/30 dark:bg-muted/10">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-20 md:flex-row">
            <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
              © {new Date().getFullYear()} Startup Incubator Portal. All rights reserved. (Demo Application)
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}

export default function ClientLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <GlobalSettingsProvider>
      <AppContent>{children}</AppContent>
    </GlobalSettingsProvider>
  )
}
