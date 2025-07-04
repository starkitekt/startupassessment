"use client"

import { POSHComplianceModule } from "@/components/audit-compliance/posh-compliance-module"
import { StandardizedPageLayout } from "@/components/standardized-page-layout"
import { Button } from "@/components/ui/button"
import { Plus, AlertTriangle, BookOpen } from "lucide-react"

export default function POSHCompliancePage() {
  return (
    <StandardizedPageLayout
      title="POSH Compliance"
      description="Prevention of Sexual Harassment Act compliance management"
      actions={
        <>
          <Button variant="outline" size="sm">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Report Incident
          </Button>
          <Button variant="outline" size="sm">
            <BookOpen className="mr-2 h-4 w-4" />
            Training Materials
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Schedule Training
          </Button>
        </>
      }
    >
      <POSHComplianceModule />
    </StandardizedPageLayout>
  )
}
