import { Badge } from "@/components/ui/badge"
import { STATUS_COLOR_MAP } from "@/lib/mappings"

export function StatusBadge({ status }: { status: string }) {
  return <Badge className={STATUS_COLOR_MAP[status] || "bg-gray-100 text-gray-800"}>{status}</Badge>
} 