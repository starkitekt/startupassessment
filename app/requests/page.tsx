import type { Metadata } from "next"
import { RequestManagementComplete } from "@/components/request-management-complete"

export const metadata: Metadata = {
  title: "Request Management - Startup Incubator Portal",
  description: "Comprehensive request management system for procurement, vendor management, and receipt processing",
}

export default function RequestsPage() {
  return <RequestManagementComplete />
}
