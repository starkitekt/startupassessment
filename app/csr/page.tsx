"use client"

import { CsrPortalContent } from "@/components/csr-portal-content" // Verified import
import { Breadcrumbs } from "@/components/breadcrumbs"

export default function CsrPage() {
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs
        segments={[
          { title: "Dashboard", href: "/" },
          { title: "CSR Portal", href: "/csr" },
        ]}
      />
      <CsrPortalContent />
    </div>
  )
}
