"use client"

import type React from "react"
import { Inter } from "next/font/google" // Using Next/Font for optimization
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TopNavigation } from "@/components/top-navigation"
import { Toaster } from "@/components/ui/toaster"
import { GlobalSettingsProvider, useGlobalSettings } from "@/contexts/global-settings-context"
import { cn } from "@/lib/utils"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { usePathname } from "next/navigation"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // Optional: if you want to use it as a CSS variable
  display: "swap", // Ensures text remains visible during font loading
})

// Inner component to access GlobalSettingsContext after provider is set up
function AppContent({ children }: { children: React.ReactNode }) {
  const { selectedCountry, isExchangeRateLoading } = useGlobalSettings() // Added isExchangeRateLoading
  const pathname = usePathname()

  return (
    <body className={cn(inter.className, "flex flex-col min-h-screen bg-background font-geist antialiased")}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <TopNavigation />
        {/* Informational banner for country selection and loading state */}
        {(selectedCountry || isExchangeRateLoading) && (
          <div
            className={cn(
              "text-xs text-center py-1 transition-all duration-300",
              isExchangeRateLoading ? "bg-amber-500 text-white" : "bg-secondary text-secondary-foreground",
            )}
          >
            {isExchangeRateLoading
              ? `Fetching exchange rates for ${selectedCountry.name}...`
              : `Content tailored for ${selectedCountry.name}. (Legal frameworks simulated)`}
          </div>
        )}
        <main className="flex-grow container mx-auto px-4 py-6 max-w-screen-2xl">
          {/* Render breadcrumbs for all paths except the home page */}
          {pathname !== "/" && <Breadcrumbs />}
          {children}
        </main>
        <Toaster />
        <footer className="py-6 md:px-8 md:py-0 border-t bg-muted/30 dark:bg-muted/10">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-20 md:flex-row">
            <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
              © {new Date().getFullYear()} Startup Incubator Portal. All rights reserved. (Demo Application)
            </p>
            {/* Add any other footer links or info here */}
          </div>
        </footer>
      </ThemeProvider>
    </body>
  )
}

export default function ClientLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // GlobalSettingsProvider wraps AppContent so useGlobalSettings can be used within it
    <GlobalSettingsProvider>
      <AppContent>{children}</AppContent>
    </GlobalSettingsProvider>
  )
}
