import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { cn } from "@/lib/utils"
import ClientLayout from "./clientLayout"
import { ThemeProvider } from "@/components/theme-provider"
import { GlobalSettingsProvider } from "@/contexts/global-settings-context"
import { NotificationProvider } from "@/contexts/notification-context"

export const metadata: Metadata = {
  title: "Startup Incubator Portal - Accessible & Responsive",
  description:
    "Comprehensive startup incubator management platform with full accessibility and responsive design support.",
  generator: "v0.dev",
  keywords: ["startup", "incubator", "management", "accessible", "responsive"],
  authors: [{ name: "Startup Incubator Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Startup Incubator Portal",
    description: "Manage and accelerate your startup portfolio with our accessible platform",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <GlobalSettingsProvider>
            <NotificationProvider>
              <ClientLayout>{children}</ClientLayout>
            </NotificationProvider>
          </GlobalSettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
