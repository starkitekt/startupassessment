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
  Award,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Plus,
  Search,
  Shield,
  TrendingUp,
  Calendar,
} from "lucide-react"

const patentApplications = [
  {
    id: "PAT-2024-001",
    title: "AI-Powered Recommendation Engine",
    type: "Patent",
    applicationNumber: "202441000123",
    filingDate: "2024-01-15",
    status: "under-examination",
    priority: "high",
    inventor: "Dr. Rajesh Kumar",
    estimatedCost: 45000,
    sippBenefit: true,
    nextDeadline: "2024-03-15",
  },
  {
    id: "TM-2024-002",
    title: "TechStart Logo & Brand",
    type: "Trademark",
    applicationNumber: "5234567",
    filingDate: "2024-01-10",
    status: "published",
    priority: "medium",
    inventor: "Brand Team",
    estimatedCost: 8000,
    sippBenefit: true,
    nextDeadline: "2024-02-10",
  },
  {
    id: "PAT-2023-003",
    title: "Blockchain Security Protocol",
    type: "Patent",
    applicationNumber: "202341000456",
    filingDate: "2023-11-20",
    status: "granted",
    priority: "high",
    inventor: "Priya Sharma",
    estimatedCost: 50000,
    sippBenefit: true,
    nextDeadline: "2024-11-20",
  },
]

const ipPortfolio = {
  totalApplications: 15,
  patents: 8,
  trademarks: 5,
  copyrights: 2,
  totalValue: 2500000,
  sippSavings: 180000,
  renewalsDue: 3,
}

const sippScheme = {
  isEligible: true,
  registrationNumber: "SIPP-2023-001234",
  validUntil: "2028-04-15",
  benefits: {
    patentFeeReduction: 80,
    trademarkFeeReduction: 50,
    designFeeReduction: 50,
    fastTrackExamination: true,
  },
  totalSavings: 180000,
  applicationsUnderSIPP: 12,
}

const renewalCalendar = [
  {
    id: 1,
    ipTitle: "Mobile App Patent",
    type: "Patent",
    renewalDate: "2024-02-15",
    fee: 8000,
    status: "upcoming",
    priority: "high",
  },
  {
    id: 2,
    ipTitle: "Company Trademark",
    type: "Trademark",
    renewalDate: "2024-03-20",
    fee: 5000,
    status: "upcoming",
    priority: "medium",
  },
  {
    id: 3,
    ipTitle: "Software Copyright",
    type: "Copyright",
    renewalDate: "2024-04-10",
    fee: 2000,
    status: "upcoming",
    priority: "low",
  },
]

const infringementAlerts = [
  {
    id: "INF-2024-001",
    title: "Similar Patent Application Detected",
    type: "Patent",
    severity: "medium",
    description: "Competitor filed similar AI recommendation patent",
    detectedDate: "2024-01-08",
    status: "investigating",
    actionRequired: true,
  },
  {
    id: "INF-2024-002",
    title: "Trademark Usage Violation",
    type: "Trademark",
    severity: "high",
    description: "Unauthorized use of company logo detected",
    detectedDate: "2024-01-05",
    status: "legal-action",
    actionRequired: true,
  },
]

const priorArtSearches = [
  {
    id: "PAS-2024-001",
    title: "AI Recommendation Systems",
    searchDate: "2024-01-12",
    status: "completed",
    resultsFound: 45,
    relevantResults: 8,
    riskAssessment: "medium",
    assignedTo: "IP Research Team",
  },
  {
    id: "PAS-2024-002",
    title: "Blockchain Security Methods",
    searchDate: "2024-01-10",
    status: "in-progress",
    resultsFound: 0,
    relevantResults: 0,
    riskAssessment: "pending",
    assignedTo: "Technical Team",
  },
]

export function IPManagementModule() {
  const [isNewApplicationOpen, setIsNewApplicationOpen] = useState(false)
  const [isPriorArtOpen, setIsPriorArtOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "granted":
      case "published":
      case "completed":
        return "bg-green-100 text-green-800"
      case "under-examination":
      case "in-progress":
      case "investigating":
        return "bg-blue-100 text-blue-800"
      case "pending":
      case "upcoming":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
      case "legal-action":
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

  const getSeverityColor = (severity: string) => {
    switch (severity) {
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
      case "granted":
      case "published":
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "under-examination":
      case "in-progress":
      case "investigating":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "pending":
      case "upcoming":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "rejected":
      case "legal-action":
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
          <h2 className="text-2xl font-bold">Intellectual Property Management</h2>
          <p className="text-muted-foreground">Patents, trademarks, copyrights, and SIPP scheme benefits</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isPriorArtOpen} onOpenChange={setIsPriorArtOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Search className="mr-2 h-4 w-4" />
                Prior Art Search
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Initiate Prior Art Search</DialogTitle>
                <DialogDescription>Search for existing prior art before filing new IP applications</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Search Title</Label>
                  <Input placeholder="Enter search title or invention name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>IP Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select IP type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="patent">Patent</SelectItem>
                        <SelectItem value="trademark">Trademark</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="copyright">Copyright</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Technology Domain</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select domain" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ai-ml">AI/Machine Learning</SelectItem>
                        <SelectItem value="blockchain">Blockchain</SelectItem>
                        <SelectItem value="iot">Internet of Things</SelectItem>
                        <SelectItem value="fintech">FinTech</SelectItem>
                        <SelectItem value="healthtech">HealthTech</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Search Keywords</Label>
                  <Textarea placeholder="Enter relevant keywords and technical terms..." className="h-20" />
                </div>
                <div className="space-y-2">
                  <Label>Technical Description</Label>
                  <Textarea placeholder="Detailed technical description of the invention..." className="h-24" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsPriorArtOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsPriorArtOpen(false)}>Start Search</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={isNewApplicationOpen} onOpenChange={setIsNewApplicationOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Application
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>File New IP Application</DialogTitle>
                <DialogDescription>Initiate a new intellectual property application</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>IP Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select IP type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="patent">Patent</SelectItem>
                      <SelectItem value="trademark">Trademark</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="copyright">Copyright</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Title/Name</Label>
                  <Input placeholder="Enter IP title or name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
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
                  <div className="space-y-2">
                    <Label>Inventor/Creator</Label>
                    <Input placeholder="Enter inventor name" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Brief description of the IP..." className="h-24" />
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="sipp" className="rounded" />
                  <Label htmlFor="sipp">Apply under SIPP scheme (80% fee reduction)</Label>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsNewApplicationOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsNewApplicationOpen(false)}>File Application</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total IP Assets</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ipPortfolio.totalApplications}</div>
            <p className="text-xs text-muted-foreground">
              {ipPortfolio.patents} patents, {ipPortfolio.trademarks} trademarks
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(ipPortfolio.totalValue / 100000).toFixed(1)}L</div>
            <p className="text-xs text-muted-foreground">Estimated market value</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SIPP Savings</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(sippScheme.totalSavings / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">80%</span> fee reduction
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Renewals Due</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{renewalCalendar.length}</div>
            <p className="text-xs text-muted-foreground">Next: {renewalCalendar[0]?.renewalDate}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="applications" className="space-y-6">
        <TabsList>
          <TabsTrigger value="applications">IP Applications</TabsTrigger>
          <TabsTrigger value="sipp">SIPP Scheme</TabsTrigger>
          <TabsTrigger value="renewals">Renewals</TabsTrigger>
          <TabsTrigger value="infringement">Infringement</TabsTrigger>
          <TabsTrigger value="prior-art">Prior Art</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>IP Application Tracker</CardTitle>
              <CardDescription>Track all intellectual property applications and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patentApplications.map((application) => (
                  <div key={application.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">{getStatusIcon(application.status)}</div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{application.title}</h3>
                            <Badge variant="outline">{application.type}</Badge>
                            <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
                            {application.sippBenefit && <Badge className="bg-blue-100 text-blue-800">SIPP</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Application: {application.applicationNumber} | Inventor: {application.inventor}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Filing Date:</span>
                        <p className="font-medium">{application.filingDate}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Priority:</span>
                        <p className={`font-medium ${getPriorityColor(application.priority)}`}>
                          {application.priority}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Estimated Cost:</span>
                        <p className="font-medium">₹{application.estimatedCost.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Next Deadline:</span>
                        <p className="font-medium">{application.nextDeadline}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sipp" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>SIPP Scheme Status</CardTitle>
                <CardDescription>Start-ups Intellectual Property Protection scheme benefits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Eligibility Status</span>
                    <span className={`font-medium ${sippScheme.isEligible ? "text-green-600" : "text-red-600"}`}>
                      {sippScheme.isEligible ? "Eligible" : "Not Eligible"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Registration Number</span>
                    <span className="font-medium">{sippScheme.registrationNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Valid Until</span>
                    <span className="font-medium">{sippScheme.validUntil}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Savings</span>
                    <span className="font-medium text-green-600">₹{sippScheme.totalSavings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Applications Under SIPP</span>
                    <span className="font-medium">{sippScheme.applicationsUnderSIPP}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SIPP Benefits</CardTitle>
                <CardDescription>Fee reductions and fast-track benefits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Patent Fee Reduction</span>
                      <span className="font-medium">{sippScheme.benefits.patentFeeReduction}%</span>
                    </div>
                    <Progress value={sippScheme.benefits.patentFeeReduction} className="h-1" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Trademark Fee Reduction</span>
                      <span className="font-medium">{sippScheme.benefits.trademarkFeeReduction}%</span>
                    </div>
                    <Progress value={sippScheme.benefits.trademarkFeeReduction} className="h-1" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Design Fee Reduction</span>
                      <span className="font-medium">{sippScheme.benefits.designFeeReduction}%</span>
                    </div>
                    <Progress value={sippScheme.benefits.designFeeReduction} className="h-1" />
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-sm">Fast Track Examination</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="renewals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Renewal Calendar</CardTitle>
              <CardDescription>Track IP renewal deadlines and fees</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {renewalCalendar.map((renewal) => (
                  <div key={renewal.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">{renewal.ipTitle}</h3>
                        <p className="text-sm text-muted-foreground">{renewal.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className={`font-medium ${getPriorityColor(renewal.priority)}`}>{renewal.renewalDate}</p>
                        <p className="text-sm text-muted-foreground">₹{renewal.fee.toLocaleString()}</p>
                      </div>
                      <Badge className={getStatusColor(renewal.status)}>{renewal.status}</Badge>
                      <Button size="sm">Renew</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="infringement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Infringement Monitoring</CardTitle>
              <CardDescription>Monitor and manage IP infringement alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {infringementAlerts.map((alert) => (
                  <div key={alert.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">{getStatusIcon(alert.status)}</div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{alert.title}</h3>
                            <Badge variant="outline">{alert.type}</Badge>
                            <Badge className={getStatusColor(alert.status)}>{alert.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{alert.description}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <FileText className="mr-2 h-4 w-4" />
                          Report
                        </Button>
                        <Button size="sm">Take Action</Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Severity:</span>
                        <p className={`font-medium ${getSeverityColor(alert.severity)}`}>{alert.severity}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Detected:</span>
                        <p className="font-medium">{alert.detectedDate}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Action Required:</span>
                        <p className={`font-medium ${alert.actionRequired ? "text-red-600" : "text-green-600"}`}>
                          {alert.actionRequired ? "Yes" : "No"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prior-art" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Prior Art Search Results</CardTitle>
              <CardDescription>Review prior art search results and risk assessments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {priorArtSearches.map((search) => (
                  <div key={search.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">{getStatusIcon(search.status)}</div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{search.title}</h3>
                            <Badge variant="outline">{search.id}</Badge>
                            <Badge className={getStatusColor(search.status)}>{search.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Assigned to: {search.assignedTo}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Export
                        </Button>
                        <Button size="sm">View Results</Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Search Date:</span>
                        <p className="font-medium">{search.searchDate}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Results Found:</span>
                        <p className="font-medium">{search.resultsFound}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Relevant Results:</span>
                        <p className="font-medium">{search.relevantResults}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Risk Assessment:</span>
                        <p className={`font-medium ${getSeverityColor(search.riskAssessment)}`}>
                          {search.riskAssessment}
                        </p>
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
