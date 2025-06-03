"use client" // Keep if client-side interactions are needed for dashboard

// Removed Header and Sidebar imports as TopNavigation is in layout
import { DashboardV2Content } from "@/components/dashboard-v2-content" // New dashboard content component

export default function HomePage() {
  return <DashboardV2Content />
}
