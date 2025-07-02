"use client"

import { Button } from "@/components/ui/button"
import { AuditManagementSystem } from "@/components/audit-management-system"
import { StandardizedPageLayout } from "@/components/standardized-page-layout"
import { Plus, FileText } from "lucide-react"

export default function AuditsPage() {
  return (
    <StandardizedPageLayout
      title="Audit Management"
      description="Track, manage, and review compliance audits across your organization"
      actions={
        <>
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Audit
          </Button>
        </>
      }
    >
      <AuditManagementSystem />
    </StandardizedPageLayout>
  )
}
