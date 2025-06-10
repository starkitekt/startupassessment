"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface StandardizedPageLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
  actions?: React.ReactNode
  className?: string
}

export function StandardizedPageLayout({
  children,
  title,
  description,
  actions,
  className,
}: StandardizedPageLayoutProps) {
  return (
    <div className={cn("space-y-8", className)}>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      {/* Page Content */}
      <div className="space-y-6">{children}</div>
    </div>
  )
}
