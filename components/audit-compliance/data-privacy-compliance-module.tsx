"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Users,
  Database,
  Eye,
  Download,
  Plus,
  Settings,
} from "lucide-react"

const dataMapping = [
  {
    id: 1,
    dataType: "Personal Information",
    category: "Sensitive",
    source: "User Registration",
    purpose: "Account Creation",
    retention: "7 years",
    lawfulBasis: "Consent",
    status: "mapped",
  },
  {
    id: 2,
    dataType: "Financial Data",
    category: "Highly Sensitive",
    source: "Payment Gateway",
    purpose: "Transaction Processing",
    retention: "10 years",
    lawfulBasis: "Contract",
    status: "mapped",
  },
  {
    id: 3,
    dataType: "Usage Analytics",
    category: "Non-Personal",
    source: "Application Logs",
    purpose: "Service Improvement",
    retention: "2 years",
    lawfulBasis: "Legitimate Interest",
    status: "pending",
  },
]

const consentManagement = {
  totalUsers: 15420,
  consentGiven: 14890,
  consentWithdrawn: 530,
  consentRate: 96.6,
  lastUpdated: "2024-01-10",
  purposes: [
    { purpose: "Marketing Communications", consented: 12500, rate: 81.1 },
    { purpose: "Analytics & Insights", consented: 14200, rate: 92.1 },
    { purpose: "Third-party Integrations", consented: 8900, rate: 57.7 },
    { purpose: "Personalization", consented: 13800, rate: 89.5 },
  ],
}

const breachIncidents = [
  {
    id: "BREACH-2024-001",
    title: "Unauthorized Access Attempt",
    severity: "medium",
    status: "resolved",
    reportedDate: "2024-01-05",
    resolvedDate: "2024-01-08",
    affectedRecords: 0,
    notificationRequired: false,
    description: "Failed login attempts detected from suspicious IP addresses",
  },
  {
    id: "BREACH-2023-003",
    title: "Email Configuration Error",
    severity: "low",
    status: "resolved",
    reportedDate: "2023-12-15",
    resolvedDate: "2023-12-16",
    affectedRecords: 25,
    notificationRequired: true,
    description: "Temporary exposure of email addresses in newsletter system",
  },
]

const privacyImpactAssessments = [
  {
    id: "PIA-2024-001",
    title: "New Analytics Platform Implementation",
    status: "in-progress",
    riskLevel: "medium",
    startDate: "2024-01-01",
    dueDate: "2024-01-31",
    assignedTo: "Data Protection Officer",
    completionRate: 65,
  },
  {
    id: "PIA-2023-004",
    title: "Customer Data Migration",
    status: "completed",
    riskLevel: "high",
    startDate: "2023-11-01",
    dueDate: "2023-11-30",
    assignedTo: "IT Security Team",
    completionRate: 100,
  },
]

const dataSubjectRequests = [
  {
    id: "DSR-2024-001",
    type: "Access Request",
    requestDate: "2024-01-08",
    dueDate: "2024-02-07",
    status: "in-progress",
    requesterEmail: "user@example.com",
    assignedTo: "Privacy Team",
  },
  {
    id: "DSR-2024-002",
    type: "Deletion Request",
    requestDate: "2024-01-06",
    dueDate: "2024-02-05",
    status: "completed",
    requesterEmail: "delete@example.com",
    assignedTo: "Privacy Team",
  },
  {
    id: "DSR-2024-003",
    type: "Rectification Request",
    requestDate: "2024-01-10",
    dueDate: "2024-02-09",
    status: "pending",
    requesterEmail: "correct@example.com",
    assignedTo: "Privacy Team",
  },
]

export function DataPrivacyComplianceModule() {
  const [isNewPIAOpen, setIsNewPIAOpen] = useState(false)
  const [isBreachReportOpen, setIsBreachReportOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "resolved":
      case "mapped":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "text-green-600"
      case "medium":
        return "text-yellow-600"
      case "high":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
      case "resolved":
      case "mapped":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "pending":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "overdue":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Data Privacy Compliance (DPDPA)</h2>
          <p className="text-muted-foreground">Digital Personal Data Protection Act compliance management</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isBreachReportOpen} onOpenChange={setIsBreachReportOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Report Breach
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Report Data Breach</DialogTitle>
                <DialogDescription>Report a potential or confirmed data breach incident</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Incident Title</Label>
                  <Input placeholder="Brief description of the incident" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Severity Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Affected Records (Estimated)</Label>
                    <Input type="number" placeholder="Number of records" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Incident Description</Label>
                  <Textarea placeholder="Detailed description of the incident..." className="h-24" />
                </div>
                <div className="space-y-2">
                  <Label>Immediate Actions Taken</Label>
                  <Textarea placeholder="Describe immediate response actions..." className="h-20" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsBreachReportOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsBreachReportOpen(false)}>Report Incident</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New PIA
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consent Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{consentManagement.consentRate}%</div>
            <p className="text-xs text-muted-foreground">
              {consentManagement.consentGiven.toLocaleString()} users consented
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Categories</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dataMapping.length}</div>
            <p className="text-xs text-muted-foreground">
              {dataMapping.filter((d) => d.status === "mapped").length} mapped
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active PIAs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {privacyImpactAssessments.filter((p) => p.status === "in-progress").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {privacyImpactAssessments.filter((p) => p.status === "completed").length} completed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending DSRs</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dataSubjectRequests.filter((d) => d.status !== "completed").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {dataSubjectRequests.filter((d) => d.status === "completed").length} completed
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="data-mapping" className="space-y-6">
        <TabsList>
          <TabsTrigger value="data-mapping">Data Mapping</TabsTrigger>
          <TabsTrigger value="consent">Consent Management</TabsTrigger>
          <TabsTrigger value="breaches">Breach Management</TabsTrigger>
          <TabsTrigger value="pia">Privacy Impact Assessment</TabsTrigger>
          <TabsTrigger value="dsr">Data Subject Rights</TabsTrigger>
        </TabsList>

        <TabsContent value="data-mapping" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Mapping & Classification</CardTitle>
              <CardDescription>Map and classify personal data processing activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dataMapping.map((data) => (
                  <div key={data.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">{getStatusIcon(data.status)}</div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{data.dataType}</h3>
                            <Badge variant="outline">{data.category}</Badge>
                            <Badge className={getStatusColor(data.status)}>{data.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Source: {data.source}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Settings className="mr-2 h-4 w-4" />
                          Configure
                        </Button>
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Purpose:</span>
                        <p className="font-medium">{data.purpose}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Retention:</span>
                        <p className="font-medium">{data.retention}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Lawful Basis:</span>
                        <p className="font-medium">{data.lawfulBasis}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Status:</span>
                        <p className="font-medium capitalize">{data.status}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="consent" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Consent Overview</CardTitle>
                <CardDescription>Overall consent management statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Users</span>
                    <span className="font-medium">{consentManagement.totalUsers.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Consent Given</span>
                    <span className="font-medium text-green-600">
                      {consentManagement.consentGiven.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Consent Withdrawn</span>
                    <span className="font-medium text-red-600">
                      {consentManagement.consentWithdrawn.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Consent Rate</span>
                    <span className="font-medium">{consentManagement.consentRate}%</span>
                  </div>
                  <Progress value={consentManagement.consentRate} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Consent by Purpose</CardTitle>
                <CardDescription>Consent rates for different processing purposes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {consentManagement.purposes.map((purpose, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{purpose.purpose}</span>
                        <span className="font-medium">{purpose.rate}%</span>
                      </div>
                      <Progress value={purpose.rate} className="h-1" />
                      <div className="text-xs text-muted-foreground">
                        {purpose.consented.toLocaleString()} users consented
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="breaches" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Breach Management</CardTitle>
              <CardDescription>Track and manage data breach incidents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {breachIncidents.map((breach) => (
                  <div key={breach.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">{getStatusIcon(breach.status)}</div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{breach.title}</h3>
                            <Badge variant="outline">{breach.id}</Badge>
                            <Badge className={getStatusColor(breach.status)}>{breach.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{breach.description}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <FileText className="mr-2 h-4 w-4" />
                          Report
                        </Button>
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Severity:</span>
                        <p className={`font-medium ${getSeverityColor(breach.severity)}`}>{breach.severity}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Reported:</span>
                        <p className="font-medium">{breach.reportedDate}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Affected Records:</span>
                        <p className="font-medium">{breach.affectedRecords}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Notification Required:</span>
                        <p className={`font-medium ${breach.notificationRequired ? "text-red-600" : "text-green-600"}`}>
                          {breach.notificationRequired ? "Yes" : "No"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pia" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Impact Assessments</CardTitle>
              <CardDescription>Manage privacy impact assessments for high-risk processing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {privacyImpactAssessments.map((pia) => (
                  <div key={pia.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">{getStatusIcon(pia.status)}</div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{pia.title}</h3>
                            <Badge variant="outline">{pia.id}</Badge>
                            <Badge className={getStatusColor(pia.status)}>{pia.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Assigned to: {pia.assignedTo}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Export
                        </Button>
                        <Button size="sm">Continue</Button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Risk Level:</span>
                          <p className={`font-medium ${getSeverityColor(pia.riskLevel)}`}>{pia.riskLevel}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Start Date:</span>
                          <p className="font-medium">{pia.startDate}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Due Date:</span>
                          <p className="font-medium">{pia.dueDate}</p>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Completion Progress</span>
                          <span>{pia.completionRate}%</span>
                        </div>
                        <Progress value={pia.completionRate} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dsr" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Subject Rights Management</CardTitle>
              <CardDescription>Handle data subject access, rectification, and deletion requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dataSubjectRequests.map((request) => (
                  <div key={request.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">{getStatusIcon(request.status)}</div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{request.type}</h3>
                            <Badge variant="outline">{request.id}</Badge>
                            <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">From: {request.requesterEmail}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <FileText className="mr-2 h-4 w-4" />
                          Response
                        </Button>
                        <Button size="sm">Process</Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Request Date:</span>
                        <p className="font-medium">{request.requestDate}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Due Date:</span>
                        <p className="font-medium">{request.dueDate}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Assigned To:</span>
                        <p className="font-medium">{request.assignedTo}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
