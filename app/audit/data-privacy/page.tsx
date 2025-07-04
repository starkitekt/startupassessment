"use client"

import { DataPrivacyComplianceModule } from "@/components/audit-compliance/data-privacy-compliance-module"
import { StandardizedPageLayout } from "@/components/standardized-page-layout"
import { Button } from "@/components/ui/button"
import { Plus, AlertTriangle, Shield } from "lucide-react"

export default function DataPrivacyCompliancePage() {
  return (
    <StandardizedPageLayout
      title="Data Privacy Compliance (DPDPA)"
      description="Digital Personal Data Protection Act compliance management"
      actions={
        <>
          <Button variant="outline" size="sm">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Report Breach
          </Button>
          <Button variant="outline" size="sm">
            <Shield className="mr-2 h-4 w-4" />
            Privacy Assessment
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New PIA
          </Button>
        </>
      }
    >
      <DataPrivacyComplianceModule />
    </StandardizedPageLayout>
  )
}
