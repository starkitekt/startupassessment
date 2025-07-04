"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { FileText, CalendarIcon, Share, AlertTriangle, CheckCircle, Clock, Download, Upload, Plus } from "lucide-react"

const rocFilings = [
  {
    id: "MGT-7-2024",
    formType: "MGT-7",
    description: "Annual Return for FY 2023-24",
    dueDate: "2024-01-30",
    status: "pending",
    priority: "high",
    lastUpdated: "2024-01-10",
    assignedTo: "Priya Sharma",
  },
  {
    id: "AOC-4-2024",
    formType: "AOC-4",
    description: "Financial Statement Filing",
    dueDate: "2024-02-15",
    status: "in-progress",
    priority: "medium",
    lastUpdated: "2024-01-08",
    assignedTo: "Rajesh Kumar",
  },
  {
    id: "DIR-12-2024",
    formType: "DIR-12",
    description: "Director Appointment - New CTO",
    dueDate: "2024-01-25",
    status: "completed",
    priority: "medium",
    lastUpdated: "2024-01-05",
    assignedTo: "Anita Desai",
  },
]

const boardMeetings = [
  {
    id: 1,
    title: "Q4 Board Meeting",
    date: "2024-01-20",
    time: "10:00 AM",
    agenda: ["Financial Review", "Strategic Planning", "Compliance Update"],
    attendees: ["CEO", "CFO", "Independent Director"],
    status: "scheduled",
    minutesStatus: "pending",
  },
  {
    id: 2,
    title: "Annual General Meeting",
    date: "2024-02-28",
    time: "2:00 PM",
    agenda: ["Annual Report", "Auditor Appointment", "Dividend Declaration"],
    attendees: ["All Directors", "Shareholders"],
    status: "scheduled",
    minutesStatus: "pending",
  },
  {
    id: 3,
    title: "Emergency Board Meeting",
    date: "2024-01-05",
    time: "4:00 PM",
    agenda: ["Funding Round Approval", "New Director Appointment"],
    attendees: ["CEO", "CFO", "Lead Investor"],
    status: "completed",
    minutesStatus: "approved",
  },
]

const directors = [
  {
    id: 1,
    name: "Rajesh Kumar",
    din: "08123456",
    designation: "Managing Director",
    appointmentDate: "2022-04-15",
    status: "active",
    compliance: {
      dinStatus: "active",
      declarationFiled: true,
      lastDeclaration: "2023-12-31",
    },
  },
  {
    id: 2,
    name: "Priya Sharma",
    din: "08234567",
    designation: "Independent Director",
    appointmentDate: "2023-01-10",
    status: "active",
    compliance: {
      dinStatus: "active",
      declarationFiled: true,
      lastDeclaration: "2023-12-31",
    },
  },
  {
    id: 3,
    name: "Vikram Singh",
    din: "08345678",
    designation: "Executive Director",
    appointmentDate: "2023-06-01",
    status: "active",
    compliance: {
      dinStatus: "active",
      declarationFiled: false,
      lastDeclaration: null,
    },
  },
]

const shareCapital = {
  authorizedCapital: 10000000,
  paidUpCapital: 5000000,
  faceValue: 10,
  totalShares: 500000,
  shareholderCount: 15,
  lastAllotment: {
    date: "2023-11-15",
    shares: 50000,
    amount: 2500000,
    purpose: "Series A Funding",
  },
}

export function CorporateComplianceModule() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [isNewFilingOpen, setIsNewFilingOpen] = useState(false)
  const [isBoardMeetingOpen, setIsBoardMeetingOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
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
          <h2 className="text-2xl font-bold">Corporate Compliance</h2>
          <p className="text-muted-foreground">ROC filings, board meetings, and director management</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isNewFilingOpen} onOpenChange={setIsNewFilingOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                New Filing
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New ROC Filing</DialogTitle>
                <DialogDescription>Initiate a new regulatory filing with MCA</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Form Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select form type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MGT-7">MGT-7 (Annual Return)</SelectItem>
                        <SelectItem value="AOC-4">AOC-4 (Financial Statement)</SelectItem>
                        <SelectItem value="DIR-12">DIR-12 (Director Appointment)</SelectItem>
                        <SelectItem value="SH-7">SH-7 (Share Allotment)</SelectItem>
                        <SelectItem value="INC-22">INC-22 (Registered Office)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Enter filing description..." />
                </div>
                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>Assigned To</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select assignee" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="priya">Priya Sharma</SelectItem>
                      <SelectItem value="rajesh">Rajesh Kumar</SelectItem>
                      <SelectItem value="anita">Anita Desai</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsNewFilingOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsNewFilingOpen(false)}>Create Filing</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Schedule Board Meeting
          </Button>
        </div>
      </div>

      <Tabs defaultValue="filings" className="space-y-6">
        <TabsList>
          <TabsTrigger value="filings">ROC Filings</TabsTrigger>
          <TabsTrigger value="board">Board Meetings</TabsTrigger>
          <TabsTrigger value="directors">Directors</TabsTrigger>
          <TabsTrigger value="shares">Share Capital</TabsTrigger>
        </TabsList>

        <TabsContent value="filings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ROC Filing Tracker</CardTitle>
              <CardDescription>Track all regulatory filings with Ministry of Corporate Affairs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rocFilings.map((filing) => (
                  <div key={filing.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">{getStatusIcon(filing.status)}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{filing.formType}</h3>
                            <Badge variant="outline">{filing.id}</Badge>
                            <Badge className={getStatusColor(filing.status)}>{filing.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{filing.description}</p>
                          <div className="grid grid-cols-3 gap-4 text-xs text-muted-foreground">
                            <div>
                              <span>Due Date:</span>
                              <p className={`font-medium ${getPriorityColor(filing.priority)}`}>{filing.dueDate}</p>
                            </div>
                            <div>
                              <span>Assigned To:</span>
                              <p className="font-medium">{filing.assignedTo}</p>
                            </div>
                            <div>
                              <span>Last Updated:</span>
                              <p className="font-medium">{filing.lastUpdated}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                        <Button size="sm" variant="outline">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload
                        </Button>
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="board" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Board Meeting Management</CardTitle>
              <CardDescription>Schedule and manage board meetings with agenda and minutes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {boardMeetings.map((meeting) => (
                  <div key={meeting.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium">{meeting.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {meeting.date} at {meeting.time}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(meeting.status)}>{meeting.status}</Badge>
                        <Badge variant="outline">{meeting.minutesStatus} minutes</Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <h4 className="text-sm font-medium mb-1">Agenda Items</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {meeting.agenda.map((item, index) => (
                            <li key={index}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Attendees</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {meeting.attendees.map((attendee, index) => (
                            <li key={index}>• {attendee}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        Reschedule
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="mr-2 h-4 w-4" />
                        Minutes
                      </Button>
                      <Button size="sm">View Details</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="directors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Director Management</CardTitle>
              <CardDescription>Manage director information and compliance requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {directors.map((director) => (
                  <div key={director.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium">{director.name}</h3>
                        <p className="text-sm text-muted-foreground">{director.designation}</p>
                        <p className="text-xs text-muted-foreground">DIN: {director.din}</p>
                      </div>
                      <Badge className={getStatusColor(director.status)}>{director.status}</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Appointment Date:</span>
                        <p className="font-medium">{director.appointmentDate}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">DIN Status:</span>
                        <p className="font-medium">{director.compliance.dinStatus}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Declaration Filed:</span>
                        <p
                          className={`font-medium ${director.compliance.declarationFiled ? "text-green-600" : "text-red-600"}`}
                        >
                          {director.compliance.declarationFiled ? "Yes" : "No"}
                        </p>
                      </div>
                    </div>
                    {!director.compliance.declarationFiled && (
                      <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                        <AlertTriangle className="inline h-4 w-4 mr-1" />
                        Annual declaration pending - Due by March 31st
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shares" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Share Capital Overview</CardTitle>
                <CardDescription>Current share capital structure and details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Authorized Capital</span>
                    <p className="text-lg font-bold">₹{shareCapital.authorizedCapital.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Paid-up Capital</span>
                    <p className="text-lg font-bold">₹{shareCapital.paidUpCapital.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Face Value</span>
                    <p className="text-lg font-bold">₹{shareCapital.faceValue}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Total Shares</span>
                    <p className="text-lg font-bold">{shareCapital.totalShares.toLocaleString()}</p>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span>Capital Utilization</span>
                    <span>{((shareCapital.paidUpCapital / shareCapital.authorizedCapital) * 100).toFixed(1)}%</span>
                  </div>
                  <Progress
                    value={(shareCapital.paidUpCapital / shareCapital.authorizedCapital) * 100}
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Last Share Allotment</CardTitle>
                <CardDescription>Details of the most recent share allotment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Date</span>
                    <span className="font-medium">{shareCapital.lastAllotment.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Shares Allotted</span>
                    <span className="font-medium">{shareCapital.lastAllotment.shares.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Amount Raised</span>
                    <span className="font-medium">₹{shareCapital.lastAllotment.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Purpose</span>
                    <span className="font-medium">{shareCapital.lastAllotment.purpose}</span>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <Button className="w-full bg-transparent" variant="outline">
                    <Share className="mr-2 h-4 w-4" />
                    New Share Allotment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
