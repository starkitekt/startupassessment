"use client"

import type React from "react"
// Inter font import is removed as it's handled in RootLayout
import { ThemeProvider } from "@/components/theme-provider"
import { SideNavigation } from "@/components/side-navigation"
import { Toaster } from "@/components/ui/toaster"
import { GlobalSettingsProvider, useGlobalSettings } from "@/contexts/global-settings-context"
import { cn } from "@/lib/utils"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { usePathname } from "next/navigation"

// Inter font initialization is removed

function AppContent({ children }: { children: React.ReactNode }) {
  const { selectedCountry, isExchangeRateLoading } = useGlobalSettings()
  const pathname = usePathname()

  return (
    // The outermost div with inter.className and body styles is removed.
    // ThemeProvider is now the top-level wrapper from this component.
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SideNavigation />
      <div className="md:pl-72 flex flex-col flex-1">
        {" "}
        {/* This div structures the content area beside the sidebar */}
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
          <div className="mt-12 md:mt-0">{pathname !== "/" && <Breadcrumbs />}</div>
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
