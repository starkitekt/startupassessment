"use client"

import { AuditTrailSystem } from "@/components/audit-compliance/audit-trail-system"
import { StandardizedPageLayout } from "@/components/standardized-page-layout"
import { Button } from "@/components/ui/button"
import { Download, Filter, Search } from "lucide-react"

export default function AuditTrailPage() {
  return (
    <StandardizedPageLayout
      title="Audit Trail"
      description="Detailed transaction logs and user activity monitoring"
      actions={
        <>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Advanced Filter
          </Button>
          <Button variant="outline" size="sm">
            <Search className="mr-2 h-4 w-4" />
            Search Logs
          </Button>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Logs
          </Button>
        </>
      }
    >
      <AuditTrailSystem />
    </StandardizedPageLayout>
  )
}
