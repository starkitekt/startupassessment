"use client"

import { LaborLawComplianceModule } from "@/components/audit-compliance/labor-law-compliance-module"
import { StandardizedPageLayout } from "@/components/standardized-page-layout"
import { Button } from "@/components/ui/button"
import { Plus, FileText, Users } from "lucide-react"

export default function LaborLawCompliancePage() {
  return (
    <StandardizedPageLayout
      title="Labor Law Compliance"
      description="EPF/ESI, minimum wages, employment contracts, and self-certification"
      actions={
        <>
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            New Contract
          </Button>
          <Button variant="outline" size="sm">
            <Users className="mr-2 h-4 w-4" />
            Employee Records
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            File Return
          </Button>
        </>
      }
    >
      <LaborLawComplianceModule />
    </StandardizedPageLayout>
  )
}
