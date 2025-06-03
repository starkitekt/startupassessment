"use client" // Required for usePathname and other client hooks if used directly or indirectly

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TopNavigation } from "@/components/top-navigation"
import { Toaster } from "@/components/ui/toaster"
import { GlobalSettingsProvider, useGlobalSettings } from "@/contexts/global-settings-context"
import { cn } from "@/lib/utils"
import { Breadcrumbs } from "@/components/breadcrumbs" // Assuming Breadcrumbs component exists
import { usePathname } from "next/navigation" // For breadcrumbs

const inter = Inter({ subsets: ["latin"] })

function AppContent({ children }: { children: React.ReactNode }) {
  const { selectedCountry } = useGlobalSettings()
  const pathname = usePathname()

  return (
    <body className={cn(inter.className, "flex flex-col min-h-screen")}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <TopNavigation />
        {selectedCountry && (
          <div className="bg-secondary text-secondary-foreground text-xs text-center py-1">
            Content tailored for {selectedCountry.name}. (Legal frameworks simulated)
          </div>
        )}
        <main className="flex-grow container mx-auto px-4 py-6 max-w-screen-2xl">
          <Breadcrumbs />
          {children}
        </main>
        <Toaster />
        <footer className="py-6 md:px-8 md:py-0 border-t">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-20 md:flex-row">
            <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
              © {new Date().getFullYear()} Startup Incubator Portal. All rights reserved. (Demo Application)
            </p>
          </div>
        </footer>
      </ThemeProvider>
    </body>
  )
}

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <GlobalSettingsProvider>
      <AppContent>{children}</AppContent>
    </GlobalSettingsProvider>
  )
}
