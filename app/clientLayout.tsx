"use client"

import type React from "react"
import { AccessibleNavigationLayout } from "@/components/accessible-navigation-layout"
import { Toaster } from "@/components/ui/toaster"

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <AccessibleNavigationLayout>{children}</AccessibleNavigationLayout>
      <Toaster />
    </>
  )
}
