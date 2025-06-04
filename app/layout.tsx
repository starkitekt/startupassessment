import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./clientLayout"

export const metadata: Metadata = {
  title: "Startup Incubator Portal",
  description: "Manage and track startup incubation processes.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ClientLayout>{children}</ClientLayout>
    </html>
  )
}


import './globals.css'
