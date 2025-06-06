"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { FileText, Download, Plus, Eye, Settings, Calendar, CheckCircle, Clock, Share } from "lucide-react"

interface AuditReport {
  id: string
  name: string
  type: "executive" | "detailed" | "compliance" | "findings" | "custom"
  engagementId: string
  engagementName: string
  status: "draft" | "in_review" | "approved" | "published"
  createdBy: string
  createdAt: Date
  lastModified: Date
  sections: ReportSection[]
  recipients: string[]
  format: "pdf" | "word" | "excel" | "html"
  autoGenerate: boolean
  schedule?: ReportSchedule
}

interface ReportSection {
  id: string
  title: string
  type: "summary" | "findings" | "recommendations" | "charts" | "tables" | "text"
  content: any
  order: number
  included: boolean
}

interface ReportSchedule {
  frequency: "manual" | "weekly" | "monthly" | "quarterly"
  dayOfWeek?: number
  dayOfMonth?: number
  recipients: string[]
}

interface ReportTemplate {
  id: string
  name: string
  description: string
  type: string
  sections: ReportSection[]
  defaultFormat: string
}

export function AuditReports() {
  const { toast } = useToast()
  const [reports, setReports] = useState<AuditReport[]>([
    {
      id: "report-1",
      name: "Q4 Financial Audit Report",
      type: "executive",
      engagementId: "eng-1",
      engagementName: "Q4 Financial Audit - TechStart Solutions",
      status: "approved",
      createdBy: "Sarah Johnson",
      createdAt: new Date("2024-01-15"),
      lastModified: new Date("2024-01-20"),
      sections: [],
      recipients: ["ceo@company.com", "cfo@company.com"],
      format: "pdf",
      autoGenerate: false,
    },
    {
      id: "report-2",
      name: "Compliance Assessment Summary",
      type: "compliance",
      engagementId: "eng-2",
      engagementName: "Annual Compliance Review",
      status: "in_review",
      createdBy: "Michael Chen",
      createdAt: new Date("2024-01-18"),
      lastModified: new Date("2024-01-22"),
      sections: [],
      recipients: ["compliance@company.com"],
      format: "pdf",
      autoGenerate: true,
      schedule: {
        frequency: "quarterly",
        dayOfMonth: 1,
        recipients: ["compliance@company.com", "audit@company.com"],
      },
    },
  ])

  const [templates, setTemplates] = useState<ReportTemplate[]>([
    {
      id: "template-1",
      name: "Executive Summary Report",
      description: "High-level audit findings and recommendations for executives",
      type: "executive",
      sections: [
        {
          id: "s1",
          title: "Executive Summary",
          type: "summary",
          content: {},
          order: 1,
          included: true,
        },
        {
          id: "s2",
          title: "Key Findings",
          type: "findings",
          content: {},
          order: 2,
          included: true,
        },
        {
          id: "s3",
          title: "Risk Assessment",
          type: "charts",
          content: {},
          order: 3,
          included: true,
        },
        {
          id: "s4",
          title: "Recommendations",
          type: "recommendations",
          content: {},
          order: 4,
          included: true,
        },
      ],
      defaultFormat: "pdf",
    },
    {
      id: "template-2",
      name: "Detailed Audit Report",
      description: "Comprehensive audit report with detailed findings and evidence",
      type: "detailed",
      sections: [
        {
          id: "s1",
          title: "Audit Scope and Objectives",
          type: "text",
          content: {},
          order: 1,
          included: true,
        },
        {
          id: "s2",
          title: "Methodology",
          type: "text",
          content: {},
          order: 2,
          included: true,
        },
        {
          id: "s3",
          title: "Detailed Findings",
          type: "findings",
          content: {},
          order: 3,
          included: true,
        },
        {
          id: "s4",
          title: "Evidence and Documentation",
          type: "tables",
          content: {},
          order: 4,
          included: true,
        },
        {
          id: "s5",
          title: "Management Responses",
          type: "text",
          content: {},
          order: 5,
          included: true,
        },
        {
          id: "s6",
          title: "Action Plan",
          type: "tables",
          content: {},
          order: 6,
          included: true,
        },
      ],
      defaultFormat: "pdf",
    },
  ])

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [newReport, setNewReport] = useState({
    name: "",
    type: "executive" as const,
    engagementId: "",
    format: "pdf" as const,
    recipients: [""],
    autoGenerate: false,
    sections: [] as ReportSection[],
  })

  const engagements = [
    { id: "eng-1", name: "Q4 Financial Audit - TechStart Solutions" },
    { id: "eng-2", name: "Annual Compliance Review" },
    { id: "eng-3", name: "IT Security Assessment" },
  ]

  const reportTypes = [
    { value: "executive", label: "Executive Summary" },
    { value: "detailed", label: "Detailed Report" },
    { value: "compliance", label: "Compliance Report" },
    { value: "findings", label: "Findings Report" },
    { value: "custom", label: "Custom Report" },
  ]

  const handleCreateReport = () => {
    const template = templates.find((t) => t.id === selectedTemplate)
    const report: AuditReport = {
      id: `report-${Date.now()}`,
      name: newReport.name,
      type: newReport.type,
      engagementId: newReport.engagementId,
      engagementName: engagements.find((e) => e.id === newReport.engagementId)?.name || "",
      status: "draft",
      createdBy: "Current User",
      createdAt: new Date(),
      lastModified: new Date(),
      sections: template?.sections || [],
      recipients: newReport.recipients.filter((r) => r.trim()),
      format: newReport.format,
      autoGenerate: newReport.autoGenerate,
    }

    setReports([...reports, report])
    setIsCreateDialogOpen(false)
    setNewReport({
      name: "",
      type: "executive",
      engagementId: "",
      format: "pdf",
      recipients: [""],
      autoGenerate: false,
      sections: [],
    })
    setSelectedTemplate("")

    toast({
      title: "Report created",
      description: "Your audit report has been created successfully.",
    })
  }

  const handleGenerateReport = (reportId: string) => {
    setReports(
      reports.map((report) =>
        report.id === reportId ? { ...report, status: "in_review", lastModified: new Date() } : report,
      ),
    )

    toast({
      title: "Report generated",
      description: "The audit report has been generated and is ready for review.",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800"
      case "in_review":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "published":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "draft":
        return <FileText className="h-4 w-4" />
      case "in_review":
        return <Clock className="h-4 w-4" />
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "published":
        return <Share className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Audit Reports</h2>
          <p className="text-muted-foreground">Generate and manage comprehensive audit reports</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Report
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Audit Report</DialogTitle>
              <DialogDescription>
                Generate a new audit report from a template or create a custom report.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Report Name</Label>
                <Input
                  value={newReport.name}
                  onChange={(e) => setNewReport({ ...newReport, name: e.target.value })}
                  placeholder="Enter report name..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Report Type</Label>
                  <Select
                    value={newReport.type}
                    onValueChange={(value) => setNewReport({ ...newReport, type: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Engagement</Label>
                  <Select
                    value={newReport.engagementId}
                    onValueChange={(value) => setNewReport({ ...newReport, engagementId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select engagement..." />
                    </SelectTrigger>
                    <SelectContent>
                      {engagements.map((engagement) => (
                        <SelectItem key={engagement.id} value={engagement.id}>
                          {engagement.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Template</Label>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a template..." />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Format</Label>
                  <Select
                    value={newReport.format}
                    onValueChange={(value) => setNewReport({ ...newReport, format: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="word">Word Document</SelectItem>
                      <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                      <SelectItem value="html">HTML</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Recipients</Label>
                  <Input
                    value={newReport.recipients[0]}
                    onChange={(e) =>
                      setNewReport({
                        ...newReport,
                        recipients: [e.target.value],
                      })
                    }
                    placeholder="Enter email addresses..."
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="auto-generate"
                  checked={newReport.autoGenerate}
                  onCheckedChange={(checked) =>
                    setNewReport({
                      ...newReport,
                      autoGenerate: checked as boolean,
                    })
                  }
                />
                <Label htmlFor="auto-generate">Auto-generate on engagement completion</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateReport}>Create Report</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="reports">
        <TabsList>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4">
            {reports.map((report) => (
              <Card key={report.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {getStatusIcon(report.status)}
                        {report.name}
                        <Badge className={getStatusColor(report.status)}>{report.status.replace("_", " ")}</Badge>
                      </CardTitle>
                      <CardDescription>
                        {report.engagementName} • {report.type} report
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleGenerateReport(report.id)}
                        disabled={report.status === "published"}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        {report.status === "draft" ? "Generate" : "Download"}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Created by:</span>
                        <p className="font-medium">{report.createdBy}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Created:</span>
                        <p className="font-medium">{report.createdAt.toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Format:</span>
                        <p className="font-medium uppercase">{report.format}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Recipients:</span>
                        <p className="font-medium">{report.recipients.length} people</p>
                      </div>
                    </div>

                    {report.autoGenerate && (
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-blue-500" />
                        <span className="text-blue-600">Auto-generated report</span>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Settings className="mr-2 h-4 w-4" />
                        Configure
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {templates.map((template) => (
              <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-base">{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Sections:</span>
                      <span>{template.sections.length} sections</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Default Format:</span>
                      <span className="uppercase">{template.defaultFormat}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm text-muted-foreground">Includes:</span>
                      <div className="flex flex-wrap gap-1">
                        {template.sections.slice(0, 3).map((section) => (
                          <Badge key={section.id} variant="outline" className="text-xs">
                            {section.title}
                          </Badge>
                        ))}
                        {template.sections.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{template.sections.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button size="sm" className="w-full">
                      Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <div className="grid gap-4">
            {reports
              .filter((report) => report.autoGenerate)
              .map((report) => (
                <Card key={report.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      {report.name}
                      <Badge variant="outline">Scheduled</Badge>
                    </CardTitle>
                    <CardDescription>{report.engagementName}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Frequency:</span>
                        <span>{report.schedule?.frequency || "On completion"}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Recipients:</span>
                        <span>{report.recipients.length} people</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Last Generated:</span>
                        <span>{report.lastModified.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            {reports.filter((report) => report.autoGenerate).length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No scheduled reports configured</p>
                  <Button className="mt-4" onClick={() => setIsCreateDialogOpen(true)}>
                    Create Scheduled Report
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
