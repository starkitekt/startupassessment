import type React from "react"
import type { Metadata } from "next"
// Removed Inter font import, assuming Geist is primary as per tailwind.config.ts
// import { Inter } from 'next/font/google'
import "./globals.css"
import { cn } from "@/lib/utils"
import ClientLayout from "./clientLayout" // Assuming this contains ThemeProvider
import { ThemeProvider } from "@/components/theme-provider" // Explicitly import ThemeProvider

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
//   display: "swap",
// })

export const metadata: Metadata = {
  title: "Startup Incubator Portal",
  description: "Manage and accelerate your startup portfolio.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Ensure font variables are correctly applied if not using Inter */}
      {/* <body className={cn(inter.className, "min-h-screen bg-background font-sans antialiased")}> */}
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
