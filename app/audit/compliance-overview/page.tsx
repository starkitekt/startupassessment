"use client"

import { AuditComplianceDashboard } from "@/components/audit-compliance/audit-compliance-dashboard"
import { StandardizedPageLayout } from "@/components/standardized-page-layout"
import { Button } from "@/components/ui/button"
import { Plus, AlertTriangle, Download } from "lucide-react"

export default function ComplianceOverviewPage() {
  return (
    <StandardizedPageLayout
      title="Compliance Overview"
      description="Real-time compliance health score and comprehensive dashboard"
      actions={
        <>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button variant="outline" size="sm">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Risk Assessment
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Compliance Task
          </Button>
        </>
      }
    >
      <AuditComplianceDashboard />
    </StandardizedPageLayout>
  )
}
