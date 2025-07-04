"use client"

import { CorporateComplianceModule } from "@/components/audit-compliance/corporate-compliance-module"
import { StandardizedPageLayout } from "@/components/standardized-page-layout"
import { Button } from "@/components/ui/button"
import { Plus, FileText, Calendar } from "lucide-react"

export default function CorporateCompliancePage() {
  return (
    <StandardizedPageLayout
      title="Corporate Compliance"
      description="ROC filings, board meetings, and director management"
      actions={
        <>
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            New Filing
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Meeting
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Director
          </Button>
        </>
      }
    >
      <CorporateComplianceModule />
    </StandardizedPageLayout>
  )
}
