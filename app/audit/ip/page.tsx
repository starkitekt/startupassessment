"use client"

import { IPManagementModule } from "@/components/audit-compliance/ip-management-module"
import { StandardizedPageLayout } from "@/components/standardized-page-layout"
import { Button } from "@/components/ui/button"
import { Plus, Search, Award } from "lucide-react"

export default function IPManagementPage() {
  return (
    <StandardizedPageLayout
      title="Intellectual Property Management"
      description="Patents, trademarks, copyrights, and SIPP scheme benefits"
      actions={
        <>
          <Button variant="outline" size="sm">
            <Search className="mr-2 h-4 w-4" />
            Prior Art Search
          </Button>
          <Button variant="outline" size="sm">
            <Award className="mr-2 h-4 w-4" />
            SIPP Benefits
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Application
          </Button>
        </>
      }
    >
      <IPManagementModule />
    </StandardizedPageLayout>
  )
}
