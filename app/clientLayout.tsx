"use client"

import type React from "react"
import { NavigationLayout } from "@/components/navigation-layout"
import { Toaster } from "@/components/ui/toaster"

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <NavigationLayout>{children}</NavigationLayout>
      <Toaster />
    </>
  )
}
