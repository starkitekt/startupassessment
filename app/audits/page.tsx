"use client"

import { AuditComplianceDashboard } from "@/components/audit-compliance/audit-compliance-dashboard"
import { StandardizedPageLayout } from "@/components/standardized-page-layout"
import { Button } from "@/components/ui/button"
import { Plus, FileText, AlertTriangle } from "lucide-react"

export default function AuditsPage() {
  return (
    <StandardizedPageLayout
      title="Audit & Compliance Management"
      description="Comprehensive regulatory compliance platform for Indian startups"
      actions={
        <>
          <Button variant="outline" size="sm">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Risk Assessment
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
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
