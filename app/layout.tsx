import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { UserProvider } from "@/hooks/use-user-role"
import { GlobalSettingsProvider } from "@/contexts/global-settings-context"
import { NotificationProvider } from "@/contexts/notification-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Startup Incubator Platform",
  description: "Comprehensive platform for startup incubation and acceleration",
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
                {children}
                <Toaster />
              </NotificationProvider>
            </GlobalSettingsProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
