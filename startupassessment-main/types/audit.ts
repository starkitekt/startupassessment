export type AuditStatus = "Planned" | "In Progress" | "Pending Review" | "Completed" | "On Hold"
export type AuditType = "Financial" | "Compliance" | "Milestone" | "IP" | "Comprehensive"

export interface AuditEngagement {
  id: string // e.g., AUD-YYYY-NNN
  name: string // e.g., "FY 2024-2025 Cohort Audit"
  scopeDescription: string // e.g., "All startups incubated between 01 Apr 2024 – 31 Mar 2025"
  type: AuditType
  status: AuditStatus
  auditPeriodStart: string // ISO Date
  auditPeriodEnd: string // ISO Date
  auditorTeam: { id: string; name: string }[]
  plannedStartDate: string // ISO Date
  plannedEndDate: string // ISO Date
  actualStartDate?: string // ISO Date
  actualEndDate?: string // ISO Date
  createdAt: string // ISO Date
  updatedAt: string // ISO Date
}

export const mockAuditEngagements: AuditEngagement[] = [
  {
    id: "AUD-2024-001",
    name: "FY 2023-2024 Q4 Audit",
    scopeDescription: "Financial and Milestone audit for startups in Cohort Alpha.",
    type: "Comprehensive",
    status: "Completed",
    auditPeriodStart: "2024-01-01",
    auditPeriodEnd: "2024-03-31",
    auditorTeam: [{ id: "USR005", name: "Priya Auditor" }],
    plannedStartDate: "2024-04-05",
    plannedEndDate: "2024-04-20",
    actualStartDate: "2024-04-06",
    actualEndDate: "2024-04-19",
    createdAt: "2024-03-15T00:00:00Z",
    updatedAt: "2024-04-19T00:00:00Z",
  },
  {
    id: "AUD-2025-001",
    name: "FY 2024-2025 Annual Audit",
    scopeDescription: "Full audit for all startups onboarded in FY 2024-2025.",
    type: "Comprehensive",
    status: "Planned",
    auditPeriodStart: "2024-04-01",
    auditPeriodEnd: "2025-03-31",
    auditorTeam: [
      { id: "USR005", name: "Priya Auditor" },
      { id: "USR006", name: "Amit Reviewer" },
    ],
    plannedStartDate: "2025-04-10",
    plannedEndDate: "2025-05-10",
    createdAt: "2024-06-01T00:00:00Z",
    updatedAt: "2024-06-01T00:00:00Z",
  },
  {
    id: "AUD-2025-002",
    name: "AgriTech Cohort IP Audit",
    scopeDescription: "IP specific audit for the AgriTech focused cohort.",
    type: "IP",
    status: "In Progress",
    auditPeriodStart: "2024-07-01",
    auditPeriodEnd: "2024-12-31",
    auditorTeam: [{ id: "USR005", name: "Priya Auditor" }],
    plannedStartDate: "2025-01-15",
    plannedEndDate: "2025-01-30",
    actualStartDate: "2025-01-16",
    createdAt: "2024-12-01T00:00:00Z",
    updatedAt: "2025-01-16T00:00:00Z",
  },
]

export const AUDIT_STATUSES: ReadonlyArray<AuditStatus> = [
  "Planned",
  "In Progress",
  "Pending Review",
  "Completed",
  "On Hold",
]
export const AUDIT_TYPES: ReadonlyArray<AuditType> = ["Financial", "Compliance", "Milestone", "IP", "Comprehensive"]
