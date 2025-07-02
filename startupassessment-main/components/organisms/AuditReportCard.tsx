import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/molecules/StatusBadge"

export function AuditReportCard({ report }: { report: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{report.name}</CardTitle>
        <div className="flex items-center gap-2">
          <StatusBadge status={report.status} />
          <span className="text-xs text-muted-foreground">{report.type}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground mb-2">{report.engagementName}</div>
        <div className="text-xs">Created: {new Date(report.createdAt).toLocaleDateString()}</div>
        <div className="text-xs">Last Modified: {new Date(report.lastModified).toLocaleDateString()}</div>
      </CardContent>
    </Card>
  )
} 