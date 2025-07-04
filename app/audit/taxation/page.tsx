"use client"

import { TaxationComplianceModule } from "@/components/audit-compliance/taxation-compliance-module"
import { StandardizedPageLayout } from "@/components/standardized-page-layout"
import { Button } from "@/components/ui/button"
import { Plus, FileText, Calculator } from "lucide-react"

export default function TaxationCompliancePage() {
  return (
    <StandardizedPageLayout
      title="Taxation Compliance"
      description="GST, Income Tax, TDS, and Professional Tax management"
      actions={
        <>
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            File Return
          </Button>
          <Button variant="outline" size="sm">
            <Calculator className="mr-2 h-4 w-4" />
            Tax Calculator
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Tax Calendar
          </Button>
        </>
      }
    >
      <TaxationComplianceModule />
    </StandardizedPageLayout>
  )
}
