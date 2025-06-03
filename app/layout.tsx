import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { TopNavigation } from "@/components/top-navigation" // Import TopNavigation
import { ThemeProvider } from "@/components/theme-provider" // Assuming you have this

export const metadata: Metadata = {
  title: "Startup India Incubator Portal V2",
  description: "Comprehensive incubator management and assessment platform.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-geist antialiased min-h-screen bg-background flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TopNavigation /> {/* Use TopNavigation */}
          <main className="flex-1 container max-w-screen-2xl py-6 lg:py-8">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
