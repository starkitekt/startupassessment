"use client"

import type React from "react"
import { ModernLayout } from "@/components/modern-layout"

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return <ModernLayout>{children}</ModernLayout>
}
