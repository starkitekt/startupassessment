"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Plus,
  Download,
  Eye,
  CalendarIcon,
  FileText,
  BarChart3,
  Users,
  Clock,
  Settings,
  Send,
  Copy,
} from "lucide-react"
import { format } from "date-fns"

const reportTemplates = [
  {
    id: 1,
    name: "LP Quarterly Report",
    description: "Comprehensive quarterly report for limited partners",
    type: "LP Report",
    frequency: "Quarterly",
    lastGenerated: "2024-01-01",
    status: "Active",
    recipients: 15,
  },
  {
    id: 2,
    name: "Portfolio Performance Summary",
    description: "Monthly performance summary of all portfolio companies",
    type: "Performance",
    frequency: "Monthly",
    lastGenerated: "2024-01-15",
    status: "Active",
    recipients: 8,
  },
  {
    id: 3,
    name: "Board Presentation",
    description: "Quarterly board presentation with key metrics",
    type: "Board Report",
    frequency: "Quarterly",
    lastGenerated: "2023-12-15",
    status: "Draft",
    recipients: 5,
  },
  {
    id: 4,
    name: "Annual Fund Report",
    description: "Annual comprehensive fund performance report",
    type: "Annual Report",
    frequency: "Annually",
    lastGenerated: "2023-12-31",
    status: "Active",
    recipients: 25,
  },
]

const generatedReports = [
  {
    id: 1,
    name: "Q4 2023 LP Report",
    template: "LP Quarterly Report",
    generatedDate: "2024-01-05",
    generatedBy: "Sarah Johnson",
    format: "PDF",
    size: "2.4 MB",
    downloads: 12,
    status: "Sent",
  },
  {
    id: 2,
    name: "December 2023 Performance",
    template: "Portfolio Performance Summary",
    generatedDate: "2024-01-02",
    generatedBy: "Mike Chen",
    format: "Excel",
    size: "1.8 MB",
    downloads: 8,
    status: "Draft",
  },
  {
    id: 3,
    name: "Q4 Board Presentation",
    template: "Board Presentation",
    generatedDate: "2023-12-20",
    generatedBy: "Alex Kumar",
    format: "PowerPoint",
    size: "5.2 MB",
    downloads: 15,
    status: "Sent",
  },
]

export function InvestorReportsContent() {
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [newReportOpen, setNewReportOpen] = useState(false)
  const [generateReportOpen, setGenerateReportOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Draft":
        return "bg-yellow-100 text-yellow-800"
      case "Sent":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "LP Report":
        return <Users className="h-4 w-4" />
      case "Performance":
        return <BarChart3 className="h-4 w-4" />
      case "Board Report":
        return <FileText className="h-4 w-4" />
      case "Annual Report":
        return <Calendar className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Reports & Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400">Generate and manage investment reports</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={generateReportOpen} onOpenChange={setGenerateReportOpen}>
            <DialogTrigger asChild>
              <Button>
                <BarChart3 className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Generate New Report</DialogTitle>
                <DialogDescription>Create a new report from existing templates</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Report Template</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTemplates.map((template) => (
                        <SelectItem key={template.id} value={template.id.toString()}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Report Period</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>Output Format</Label>
                  <Select defaultValue="pdf">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="powerpoint">PowerPoint</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="auto-send" />
                  <Label htmlFor="auto-send">Automatically send to recipients</Label>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setGenerateReportOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setGenerateReportOpen(false)}>Generate Report</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={newReportOpen} onOpenChange={setNewReportOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                New Template
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Report Template</DialogTitle>
                <DialogDescription>Create a new report template for recurring reports</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Template Name" />
                <Textarea placeholder="Description" />
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Report Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lp">LP Report</SelectItem>
                    <SelectItem value="performance">Performance Report</SelectItem>
                    <SelectItem value="board">Board Report</SelectItem>
                    <SelectItem value="annual">Annual Report</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="annually">Annually</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setNewReportOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setNewReportOpen(false)}>Create Template</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList>
          <TabsTrigger value="templates">Report Templates</TabsTrigger>
          <TabsTrigger value="generated">Generated Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportTemplates.map((template) => (
              <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(template.type)}
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                    </div>
                    <Badge className={getStatusColor(template.status)}>{template.status}</Badge>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Type:</span>
                      <Badge variant="secondary">{template.type}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Frequency:</span>
                      <span>{template.frequency}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Recipients:</span>
                      <span>{template.recipients}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Last Generated:</span>
                      <span>{template.lastGenerated}</span>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Settings className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="generated" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generated Reports</CardTitle>
              <CardDescription>Recently generated reports and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Template</TableHead>
                    <TableHead>Generated Date</TableHead>
                    <TableHead>Generated By</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Downloads</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {generatedReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.name}</TableCell>
                      <TableCell>{report.template}</TableCell>
                      <TableCell>{report.generatedDate}</TableCell>
                      <TableCell>{report.generatedBy}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{report.format}</Badge>
                      </TableCell>
                      <TableCell>{report.size}</TableCell>
                      <TableCell>{report.downloads}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Send className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>Automatically scheduled report generation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No scheduled reports configured</p>
                <Button className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
