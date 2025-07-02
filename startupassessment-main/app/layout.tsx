import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TopNavigationLayout } from "@/components/top-navigation-layout"
import { UserProvider } from "@/hooks/use-user-role"
import { GlobalSettingsProvider } from "@/contexts/global-settings-context"
import { NotificationProvider } from "@/contexts/notification-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Startup Incubator Platform",
  description: "Comprehensive platform for startup incubation, acceleration, and portfolio management",
  keywords: ["startup", "incubator", "accelerator", "venture capital", "entrepreneurship", "portfolio management"],
  authors: [{ name: "Startup Incubator Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Startup Incubator Platform",
    description: "Manage and accelerate your startup portfolio with our comprehensive platform",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <UserProvider>
            <GlobalSettingsProvider>
              <NotificationProvider>
                <TopNavigationLayout>{children}</TopNavigationLayout>
              </NotificationProvider>
            </GlobalSettingsProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
