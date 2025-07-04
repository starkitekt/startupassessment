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
import { Shield, AlertTriangle, CheckCircle, Clock, FileText, Users, BookOpen, Plus, Download, Eye } from "lucide-react"

const iccMembers = [
  {
    id: 1,
    name: "Priya Sharma",
    designation: "HR Director",
    role: "Presiding Officer",
    department: "Human Resources",
    appointmentDate: "2023-01-15",
    status: "active",
    trainingCompleted: true,
    lastTraining: "2023-12-01",
  },
  {
    id: 2,
    name: "Dr. Anita Desai",
    designation: "External Member",
    role: "External Expert",
    department: "Legal Consultant",
    appointmentDate: "2023-01-15",
    status: "active",
    trainingCompleted: true,
    lastTraining: "2023-11-15",
  },
  {
    id: 3,
    name: "Rajesh Kumar",
    designation: "Employee Representative",
    role: "Employee Member",
    department: "Engineering",
    appointmentDate: "2023-01-15",
    status: "active",
    trainingCompleted: false,
    lastTraining: null,
  },
]

const poshPolicies = [
  {
    id: "POSH-POL-001",
    title: "Prevention of Sexual Harassment Policy",
    version: "2.1",
    lastUpdated: "2023-12-01",
    status: "active",
    approvedBy: "Board of Directors",
    nextReview: "2024-12-01",
    acknowledgments: 42,
    totalEmployees: 45,
  },
  {
    id: "POSH-POL-002",
    title: "Complaint Handling Procedure",
    version: "1.3",
    lastUpdated: "2023-11-15",
    status: "active",
    approvedBy: "ICC Committee",
    nextReview: "2024-11-15",
    acknowledgments: 38,
    totalEmployees: 45,
  },
]

const trainingPrograms = [
  {
    id: "TRAIN-2024-001",
    title: "POSH Awareness Training - Q1 2024",
    type: "Mandatory",
    scheduledDate: "2024-02-15",
    duration: "2 hours",
    targetAudience: "All Employees",
    status: "scheduled",
    registrations: 35,
    capacity: 50,
    trainer: "External Expert",
  },
  {
    id: "TRAIN-2023-004",
    title: "ICC Member Training",
    type: "Specialized",
    scheduledDate: "2023-12-01",
    duration: "4 hours",
    targetAudience: "ICC Members",
    status: "completed",
    registrations: 3,
    capacity: 5,
    trainer: "Legal Consultant",
  },
]

const incidentReports = [
  {
    id: "INC-2024-001",
    reportDate: "2024-01-08",
    status: "under-investigation",
    severity: "medium",
    reportedBy: "Anonymous",
    assignedTo: "ICC Committee",
    dueDate: "2024-02-07",
    daysRemaining: 30,
    confidential: true,
  },
  {
    id: "INC-2023-003",
    reportDate: "2023-11-20",
    status: "resolved",
    severity: "low",
    reportedBy: "Employee",
    assignedTo: "ICC Committee",
    dueDate: "2023-12-20",
    daysRemaining: 0,
    confidential: true,
  },
]

const complianceMetrics = {
  totalEmployees: 45,
  policyAcknowledgment: 93.3,
  trainingCompletion: 88.9,
  iccFormation: true,
  annualReportFiled: true,
  lastAuditDate: "2023-12-15",
  nextAuditDue: "2024-12-15",
  complianceScore: 94,
}

const annualReport = {
  reportingPeriod: "FY 2023-24",
  totalComplaints: 2,
  complaintsResolved: 2,
  pendingComplaints: 0,
  trainingSessionsConducted: 4,
  employeesTrained: 40,
  policyUpdates: 1,
  status: "draft",
  dueDate: "2024-04-30",
}

export function POSHComplianceModule() {
  const [isNewIncidentOpen, setIsNewIncidentOpen] = useState(false)
  const [isTrainingOpen, setIsTrainingOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "resolved":
      case "completed":
        return "bg-green-100 text-green-800"
      case "under-investigation":
      case "scheduled":
      case "draft":
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
      case "active":
      case "resolved":
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "under-investigation":
      case "scheduled":
      case "draft":
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
          <h2 className="text-2xl font-bold">POSH Compliance</h2>
          <p className="text-muted-foreground">Prevention of Sexual Harassment Act compliance management</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isNewIncidentOpen} onOpenChange={setIsNewIncidentOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Report Incident
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Report POSH Incident</DialogTitle>
                <DialogDescription>
                  Report a sexual harassment incident confidentially. All reports are handled with strict
                  confidentiality.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <Shield className="inline h-4 w-4 mr-1" />
                    This report will be handled confidentially by the Internal Complaints Committee (ICC).
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Reporting As</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select reporting type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="self">Self</SelectItem>
                        <SelectItem value="third-party">Third Party</SelectItem>
                        <SelectItem value="anonymous">Anonymous</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Incident Severity</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Incident Date</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Incident Description</Label>
                  <Textarea placeholder="Provide detailed description of the incident..." className="h-24" />
                </div>
                <div className="space-y-2">
                  <Label>Witnesses (if any)</Label>
                  <Textarea placeholder="Names and details of witnesses..." className="h-16" />
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="confidential" className="rounded" defaultChecked />
                  <Label htmlFor="confidential">Keep this report confidential</Label>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsNewIncidentOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsNewIncidentOpen(false)}>Submit Report</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={isTrainingOpen} onOpenChange={setIsTrainingOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Schedule Training
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Schedule POSH Training</DialogTitle>
                <DialogDescription>Schedule a new POSH awareness training session</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Training Title</Label>
                  <Input placeholder="Enter training title" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Training Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mandatory">Mandatory Training</SelectItem>
                        <SelectItem value="refresher">Refresher Training</SelectItem>
                        <SelectItem value="specialized">Specialized Training</SelectItem>
                        <SelectItem value="icc">ICC Member Training</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 hour</SelectItem>
                        <SelectItem value="2">2 hours</SelectItem>
                        <SelectItem value="4">4 hours</SelectItem>
                        <SelectItem value="8">Full day</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Scheduled Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Capacity</Label>
                    <Input type="number" placeholder="Maximum participants" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Target Audience</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Employees</SelectItem>
                      <SelectItem value="new">New Employees</SelectItem>
                      <SelectItem value="managers">Managers</SelectItem>
                      <SelectItem value="icc">ICC Members</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Trainer</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select trainer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="internal">Internal HR Team</SelectItem>
                      <SelectItem value="external">External Expert</SelectItem>
                      <SelectItem value="legal">Legal Consultant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsTrainingOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsTrainingOpen(false)}>Schedule Training</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{complianceMetrics.complianceScore}%</div>
            <p className="text-xs text-muted-foreground">Excellent compliance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Policy Acknowledgment</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complianceMetrics.policyAcknowledgment}%</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((complianceMetrics.policyAcknowledgment / 100) * complianceMetrics.totalEmployees)} of{" "}
              {complianceMetrics.totalEmployees} employees
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Training Completion</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complianceMetrics.trainingCompletion}%</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((complianceMetrics.trainingCompletion / 100) * complianceMetrics.totalEmployees)} employees
              trained
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {incidentReports.filter((i) => i.status === "under-investigation").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {incidentReports.filter((i) => i.status === "resolved").length} resolved this year
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="icc" className="space-y-6">
        <TabsList>
          <TabsTrigger value="icc">ICC Committee</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
          <TabsTrigger value="reports">Annual Report</TabsTrigger>
        </TabsList>

        <TabsContent value="icc" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Internal Complaints Committee (ICC)</CardTitle>
              <CardDescription>Manage ICC formation and member details as per POSH Act requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {iccMembers.map((member) => (
                  <div key={member.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">{getStatusIcon(member.status)}</div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{member.name}</h3>
                            <Badge variant="outline">{member.role}</Badge>
                            <Badge className={getStatusColor(member.status)}>{member.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {member.designation} | {member.department}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <FileText className="mr-2 h-4 w-4" />
                          Certificate
                        </Button>
                        <Button size="sm">Edit</Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Appointment Date:</span>
                        <p className="font-medium">{member.appointmentDate}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Training Status:</span>
                        <p className={`font-medium ${member.trainingCompleted ? "text-green-600" : "text-red-600"}`}>
                          {member.trainingCompleted ? "Completed" : "Pending"}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Last Training:</span>
                        <p className="font-medium">{member.lastTraining || "Not completed"}</p>
                      </div>
                    </div>
                    {!member.trainingCompleted && (
                      <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                        <AlertTriangle className="inline h-4 w-4 mr-1" />
                        Training required for ICC member certification
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>POSH Policies & Procedures</CardTitle>
              <CardDescription>Manage organizational policies and employee acknowledgments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {poshPolicies.map((policy) => (
                  <div key={policy.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">{getStatusIcon(policy.status)}</div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{policy.title}</h3>
                            <Badge variant="outline">v{policy.version}</Badge>
                            <Badge className={getStatusColor(policy.status)}>{policy.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Approved by: {policy.approvedBy}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                        <Button size="sm">Update</Button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Last Updated:</span>
                          <p className="font-medium">{policy.lastUpdated}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Next Review:</span>
                          <p className="font-medium">{policy.nextReview}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Acknowledgments:</span>
                          <p className="font-medium">
                            {policy.acknowledgments}/{policy.totalEmployees}
                          </p>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Employee Acknowledgment Rate</span>
                          <span>{((policy.acknowledgments / policy.totalEmployees) * 100).toFixed(1)}%</span>
                        </div>
                        <Progress value={(policy.acknowledgments / policy.totalEmployees) * 100} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Training Programs</CardTitle>
              <CardDescription>Schedule and track POSH awareness training sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trainingPrograms.map((training) => (
                  <div key={training.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">{getStatusIcon(training.status)}</div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{training.title}</h3>
                            <Badge variant="outline">{training.type}</Badge>
                            <Badge className={getStatusColor(training.status)}>{training.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {training.duration} | {training.targetAudience}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Users className="mr-2 h-4 w-4" />
                          Attendees
                        </Button>
                        <Button size="sm">Manage</Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Scheduled Date:</span>
                        <p className="font-medium">{training.scheduledDate}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Registrations:</span>
                        <p className="font-medium">
                          {training.registrations}/{training.capacity}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Trainer:</span>
                        <p className="font-medium">{training.trainer}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Capacity:</span>
                        <p className="font-medium">
                          {((training.registrations / training.capacity) * 100).toFixed(0)}%
                        </p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Progress value={(training.registrations / training.capacity) * 100} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="incidents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Incident Management</CardTitle>
              <CardDescription>Track and manage sexual harassment incident reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incidentReports.map((incident) => (
                  <div key={incident.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">{getStatusIcon(incident.status)}</div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">Incident Report</h3>
                            <Badge variant="outline">{incident.id}</Badge>
                            <Badge className={getStatusColor(incident.status)}>{incident.status}</Badge>
                            {incident.confidential && <Badge className="bg-red-100 text-red-800">Confidential</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground">Reported by: {incident.reportedBy}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                        <Button size="sm">Update</Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Report Date:</span>
                        <p className="font-medium">{incident.reportDate}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Severity:</span>
                        <p className={`font-medium ${getSeverityColor(incident.severity)}`}>{incident.severity}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Assigned To:</span>
                        <p className="font-medium">{incident.assignedTo}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Due Date:</span>
                        <p className="font-medium">{incident.dueDate}</p>
                      </div>
                    </div>
                    {incident.status === "under-investigation" && (
                      <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
                        <Clock className="inline h-4 w-4 mr-1" />
                        Investigation in progress - {incident.daysRemaining} days remaining for resolution
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Annual Compliance Report</CardTitle>
                <CardDescription>Generate annual POSH compliance report for regulatory filing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-mute-foreground">Reporting Period</span>
                    <span className="font-medium">{annualReport.reportingPeriod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Complaints</span>
                    <span className="font-medium">{annualReport.totalComplaints}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Complaints Resolved</span>
                    <span className="font-medium text-green-600">{annualReport.complaintsResolved}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Pending Complaints</span>
                    <span className="font-medium">{annualReport.pendingComplaints}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Training Sessions</span>
                    <span className="font-medium">{annualReport.trainingSessionsConducted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Employees Trained</span>
                    <span className="font-medium">{annualReport.employeesTrained}</span>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Report Status</p>
                      <Badge className={getStatusColor(annualReport.status)}>{annualReport.status}</Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Due Date</p>
                      <p className="font-medium">{annualReport.dueDate}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compliance Metrics</CardTitle>
                <CardDescription>Key compliance indicators and audit information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Policy Acknowledgment</span>
                      <span>{complianceMetrics.policyAcknowledgment}%</span>
                    </div>
                    <Progress value={complianceMetrics.policyAcknowledgment} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Training Completion</span>
                      <span>{complianceMetrics.trainingCompletion}%</span>
                    </div>
                    <Progress value={complianceMetrics.trainingCompletion} className="h-2" />
                  </div>
                </div>
                <div className="pt-4 border-t space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">ICC Formation</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Annual Report Filed</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Last Audit</span>
                    <span className="font-medium">{complianceMetrics.lastAuditDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Next Audit Due</span>
                    <span className="font-medium">{complianceMetrics.nextAuditDue}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
