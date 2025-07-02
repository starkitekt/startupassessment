"use client"

import { SettingsProfileComplete } from "@/components/settings-profile-complete"
import { StandardizedPageLayout } from "@/components/standardized-page-layout"

export default function SettingsPage() {
  return (
    <StandardizedPageLayout
      title="Settings & Profile"
      description="Manage your account preferences and personal information"
    >
      <SettingsProfileComplete />
    </StandardizedPageLayout>
  )
}
