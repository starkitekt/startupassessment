"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"
import {
  Breadcrumb as ShadcnBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb" // Assuming these are standard shadcn/ui imports

// Helper function to capitalize first letter
const capitalizeFirstLetter = (string: string) => {
  if (!string) return string
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// Helper to generate a more readable name from a path segment
const generateBreadcrumbName = (segment: string) => {
  if (!segment) return "Home"
  // Replace hyphens with spaces and capitalize
  const name = segment.replace(/-/g, " ")
  // Specific overrides for better readability
  if (name === "startupId") return "Startup Details"
  if (name === "mentorId") return "Mentor Details"
  if (name === "assessmentId") return "Assessment Details"
  if (name === "knowledge base") return "Knowledge Base"
  return capitalizeFirstLetter(name)
}

export function Breadcrumbs() {
  const pathname = usePathname()
  if (!pathname) return null // Should not happen in Next.js app router

  const pathSegments = pathname.split("/").filter((segment) => segment)

  // Hide breadcrumbs on the root dashboard page or if there are no segments
  if (pathname === "/" || pathSegments.length === 0) {
    return null
  }

  return (
    <ShadcnBreadcrumb className="mb-4 hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/" className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathSegments.map((segment, index) => {
          const href = "/" + pathSegments.slice(0, index + 1).join("/")
          const isLast = index === pathSegments.length - 1
          // Try to generate a more readable name, e.g., for dynamic segments
          let displayName = generateBreadcrumbName(segment)

          // If it's a dynamic segment like [startupId], try to make it more generic
          // or in a real app, you might fetch the actual name
          if (segment.startsWith("[") && segment.endsWith("]")) {
            const dynamicPart = segment.slice(1, -1)
            if (pathSegments[index - 1] === "portfolio" && dynamicPart === "startupId") {
              displayName = "Startup Profile" // Or fetch actual startup name
            } else if (pathSegments[index - 1] === "mentors" && dynamicPart === "mentorId") {
              displayName = "Mentor Profile" // Or fetch actual mentor name
            } else if (pathSegments[index - 1] === "assessments" && dynamicPart === "assessmentId") {
              displayName = "Assessment Details" // Or fetch actual assessment name
            } else {
              displayName = capitalizeFirstLetter(dynamicPart.replace(/Id$/, " Details"))
            }
          }

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{displayName}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{displayName}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </ShadcnBreadcrumb>
  )
}
