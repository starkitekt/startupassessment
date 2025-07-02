import { CheckCircle, Clock, AlertTriangle, FileText, Users, BarChart, DollarSign, MessageSquare, Share, AlertCircle, Pause, Zap, Bell, Mail, Workflow, Info, Image as ImageIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { ReactNode } from "react"

// Example: Status to color class
export const STATUS_COLOR_MAP: Record<string, string> = {
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  completed: "bg-blue-100 text-blue-800",
  "in-progress": "bg-yellow-100 text-yellow-800",
  "under-review": "bg-purple-100 text-purple-800",
  open: "bg-red-100 text-red-800",
  "in_progress": "bg-blue-100 text-blue-800",
  resolved: "bg-green-100 text-green-800",
  closed: "bg-gray-100 text-gray-800",
  draft: "bg-gray-100 text-gray-800",
  "in_review": "bg-yellow-100 text-yellow-800",
  published: "bg-blue-100 text-blue-800",
  Planning: "bg-blue-100 text-blue-800",
  "In Progress": "bg-yellow-100 text-yellow-800",
  Review: "bg-purple-100 text-purple-800",
  Completed: "bg-green-100 text-green-800",
  "On Hold": "bg-gray-100 text-gray-800",
  Active: "bg-green-100 text-green-800",
  "At Risk": "bg-red-100 text-red-800",
  Exited: "bg-gray-100 text-gray-800",
}

// Example: Status to icon (ReactNode)
export const STATUS_ICON_MAP: Record<string, ReactNode> = {
  approved: <CheckCircle className="h-4 w-4" />,
  rejected: <AlertTriangle className="h-4 w-4" />,
  completed: <CheckCircle className="h-4 w-4" />,
  "in-progress": <Clock className="h-4 w-4" />,
  "under-review": <Clock className="h-4 w-4" />,
  open: <AlertTriangle className="h-4 w-4" />,
  "in_progress": <Clock className="h-4 w-4" />,
  resolved: <CheckCircle className="h-4 w-4" />,
  closed: <CheckCircle className="h-4 w-4" />,
  draft: <FileText className="h-4 w-4" />,
  "in_review": <Clock className="h-4 w-4" />,
  published: <Share className="h-4 w-4" />,
  Planning: <Clock className="h-4 w-4" />,
  "In Progress": <Clock className="h-4 w-4" />,
  Review: <Clock className="h-4 w-4" />,
  Completed: <CheckCircle className="h-4 w-4" />,
  "On Hold": <Pause className="h-4 w-4" />,
  Active: <CheckCircle className="h-4 w-4" />,
  "At Risk": <AlertTriangle className="h-4 w-4" />,
  Exited: <FileText className="h-4 w-4" />,
}

// Example: Type to label
export const TYPE_LABEL_MAP: Record<string, string> = {
  startup: "Startup",
  application: "Application",
  report: "Report",
  mentor: "Mentor",
  task: "Task",
  event: "Event",
  document: "Document",
  funding: "Funding",
  assessment: "Assessment",
  system: "System",
  error: "Error",
  warning: "Warning",
  success: "Success",
  info: "Info",
}

// Example: Type to icon (ReactNode)
export const TYPE_ICON_MAP: Record<string, ReactNode> = {
  startup: <Users className="h-4 w-4 text-blue-500" />,
  application: <FileText className="h-4 w-4 text-green-500" />,
  report: <BarChart className="h-4 w-4 text-purple-500" />,
  mentor: <Users className="h-4 w-4 text-amber-500" />,
  task: <CheckCircle className="h-4 w-4 text-red-500" />,
  event: <Clock className="h-4 w-4 text-indigo-500" />,
  document: <FileText className="h-4 w-4 text-gray-500" />,
  funding: <DollarSign className="h-4 w-4 text-emerald-500" />,
  assessment: <FileText className="h-4 w-4 text-blue-500" />,
  system: <MessageSquare className="h-4 w-4 text-gray-500" />,
  error: <AlertCircle className="h-4 w-4 text-red-500" />,
  warning: <AlertCircle className="h-4 w-4 text-yellow-500" />,
  success: <CheckCircle className="h-4 w-4 text-green-500" />,
  info: <Info className="h-4 w-4 text-blue-500" />,
}

// Example: Priority/Severity to color
export const PRIORITY_COLOR_MAP: Record<string, string> = {
  Low: "bg-blue-100 text-blue-800",
  Medium: "bg-yellow-100 text-yellow-800",
  High: "bg-orange-100 text-orange-800",
  Critical: "bg-red-100 text-red-800",
}

export const SEVERITY_COLOR_MAP: Record<string, string> = PRIORITY_COLOR_MAP

// Example: Utility function for status badge
export function StatusBadge({ status }: { status: string }) {
  return <Badge className={STATUS_COLOR_MAP[status] || "bg-gray-100 text-gray-800"}>{status}</Badge>
}

// Example: Utility function for status icon
export function StatusIcon({ status }: { status: string }) {
  return <>{STATUS_ICON_MAP[status] || <Clock className="h-4 w-4" />}</>
} 