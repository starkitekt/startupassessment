import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google" // Import Inter font
import ClientLayout from "./clientLayout"
import { cn } from "@/lib/utils" // Import cn utility
import "./globals.css"

// Initialize Inter font here
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Startup Incubator Portal",
  description: "Manage and track startup incubation processes.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Apply body classes and Inter font class here */}
      <body className={cn(inter.className, "flex flex-col min-h-screen bg-background font-geist antialiased")}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
