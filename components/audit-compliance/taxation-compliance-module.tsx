"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
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
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from "recharts"
import {
  Calculator,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Plus,
  Calendar,
  CreditCard,
} from "lucide-react"

const gstReturns = [
  {
    id: "GSTR-3B-Dec-2023",
    returnType: "GSTR-3B",
    period: "December 2023",
    dueDate: "2024-01-20",
    status: "pending",
    taxLiability: 125000,
    itcClaimed: 45000,
    netTax: 80000,
    lastUpdated: "2024-01-10",
  },
  {
    id: "GSTR-1-Dec-2023",
    returnType: "GSTR-1",
    period: "December 2023",
    dueDate: "2024-01-11",
    status: "filed",
    taxLiability: 125000,
    itcClaimed: 0,
    netTax: 125000,
    lastUpdated: "2024-01-08",
  },
  {
    id: "GSTR-3B-Nov-2023",
    returnType: "GSTR-3B",
    period: "November 2023",
    dueDate: "2023-12-20",
    status: "filed",
    taxLiability: 110000,
    itcClaimed: 38000,
    netTax: 72000,
    lastUpdated: "2023-12-15",
  },
]

const incomeTaxReturns = [
  {
    id: "ITR-6-FY2023-24",
    returnType: "ITR-6",
    assessmentYear: "AY 2024-25",
    dueDate: "2024-10-31",
    status: "in-progress",
    totalIncome: 2500000,
    taxLiability: 375000,
    advanceTaxPaid: 300000,
    refundDue: 0,
  },
  {
    id: "ITR-6-FY2022-23",
    returnType: "ITR-6",
    assessmentYear: "AY 2023-24",
    dueDate: "2023-10-31",
    status: "filed",
    totalIncome: 1800000,
    taxLiability: 270000,
    advanceTaxPaid: 280000,
    refundDue: 10000,
  },
]

const tdsReturns = [
  {
    id: "TDS-Q3-2023-24",
    quarter: "Q3 FY 2023-24",
    dueDate: "2024-01-31",
    status: "pending",
    tdsDeducted: 85000,
    tdsDeposited: 85000,
    challanCount: 12,
    certificatesIssued: 45,
  },
  {
    id: "TDS-Q2-2023-24",
    quarter: "Q2 FY 2023-24",
    dueDate: "2023-10-31",
    status: "filed",
    tdsDeducted: 72000,
    tdsDeposited: 72000,
    challanCount: 10,
    certificatesIssued: 38,
  },
]

const taxCalendar = [
  {
    id: 1,
    task: "GST Return Filing (GSTR-3B)",
    dueDate: "2024-01-20",
    frequency: "Monthly",
    priority: "high",
    status: "pending",
  },
  {
    id: 2,
    task: "TDS Return Filing (24Q)",
    dueDate: "2024-01-31",
    frequency: "Quarterly",
    priority: "high",
    status: "pending",
  },
  {
    id: 3,
    task: "Advance Tax Payment",
    dueDate: "2024-03-15",
    frequency: "Quarterly",
    priority: "medium",
    status: "upcoming",
  },
  {
    id: 4,
    task: "GST Annual Return (GSTR-9)",
    dueDate: "2024-12-31",
    frequency: "Annual",
    priority: "medium",
    status: "upcoming",
  },
]

const monthlyTaxData = [
  { month: "Jul", gst: 72000, tds: 15000, total: 87000 },
  { month: "Aug", gst: 85000, tds: 18000, total: 103000 },
  { month: "Sep", gst: 78000, tds: 16000, total: 94000 },
  { month: "Oct", gst: 92000, tds: 22000, total: 114000 },
  { month: "Nov", gst: 88000, tds: 19000, total: 107000 },
  { month: "Dec", gst: 95000, tds: 25000, total: 120000 },
]

const itcReconciliation = {
  availableITC: 450000,
  claimedITC: 380000,
  reversedITC: 25000,
  lapseITC: 15000,
  utilizationRate: 84.4,
}

export function TaxationComplianceModule() {
  const [isNewReturnOpen, setIsNewReturnOpen] = useState(false)
  const [selectedReturnType, setSelectedReturnType] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "filed":
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
      case "filed":
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
          <h2 className="text-2xl font-bold">Taxation Compliance</h2>
          <p className="text-muted-foreground">GST, Income Tax, TDS, and Professional Tax management</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isNewReturnOpen} onOpenChange={setIsNewReturnOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                File Return
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>File New Tax Return</DialogTitle>
                <DialogDescription>Initiate a new tax return filing process</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Return Type</Label>
                  <Select value={selectedReturnType} onValueChange={setSelectedReturnType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select return type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GSTR-1">GSTR-1 (Outward Supplies)</SelectItem>
                      <SelectItem value="GSTR-3B">GSTR-3B (Summary Return)</SelectItem>
                      <SelectItem value="ITR-6">ITR-6 (Company Return)</SelectItem>
                      <SelectItem value="24Q">24Q (TDS Return)</SelectItem>
                      <SelectItem value="26AS">26AS (Tax Credit Statement)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Period</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jan-2024">January 2024</SelectItem>
                        <SelectItem value="dec-2023">December 2023</SelectItem>
                        <SelectItem value="q3-2023-24">Q3 FY 2023-24</SelectItem>
                        <SelectItem value="fy-2023-24">FY 2023-24</SelectItem>
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
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsNewReturnOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsNewReturnOpen(false)}>Create Return</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Tax Calendar
          </Button>
        </div>
      </div>

      {/* Tax Overview Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly GST Liability</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹95,000</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ITC Available</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹4.5L</div>
            <p className="text-xs text-muted-foreground">84% utilization rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">TDS Deducted</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹85,000</div>
            <p className="text-xs text-muted-foreground">Q3 FY 2023-24</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Returns</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 due this month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="gst" className="space-y-6">
        <TabsList>
          <TabsTrigger value="gst">GST Returns</TabsTrigger>
          <TabsTrigger value="income-tax">Income Tax</TabsTrigger>
          <TabsTrigger value="tds">TDS Returns</TabsTrigger>
          <TabsTrigger value="calendar">Tax Calendar</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="gst" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>GST Return Tracker</CardTitle>
                  <CardDescription>Track all GST return filings and compliance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {gstReturns.map((gstReturn) => (
                      <div key={gstReturn.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-3">
                            <div className="mt-1">{getStatusIcon(gstReturn.status)}</div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-medium">{gstReturn.returnType}</h3>
                                <Badge variant="outline">{gstReturn.period}</Badge>
                                <Badge className={getStatusColor(gstReturn.status)}>{gstReturn.status}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">Due: {gstReturn.dueDate}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                            <Button size="sm">File Return</Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Tax Liability:</span>
                            <p className="font-medium">₹{gstReturn.taxLiability.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">ITC Claimed:</span>
                            <p className="font-medium">₹{gstReturn.itcClaimed.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Net Tax:</span>
                            <p className="font-medium">₹{gstReturn.netTax.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>ITC Reconciliation</CardTitle>
                <CardDescription>Input Tax Credit utilization summary</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Available ITC</span>
                    <span className="font-medium">₹{itcReconciliation.availableITC.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Claimed ITC</span>
                    <span className="font-medium">₹{itcReconciliation.claimedITC.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Reversed ITC</span>
                    <span className="font-medium text-red-600">₹{itcReconciliation.reversedITC.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Lapsed ITC</span>
                    <span className="font-medium text-red-600">₹{itcReconciliation.lapseITC.toLocaleString()}</span>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Utilization Rate</span>
                    <span className="font-medium">{itcReconciliation.utilizationRate}%</span>
                  </div>
                  <Progress value={itcReconciliation.utilizationRate} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="income-tax" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Income Tax Returns</CardTitle>
              <CardDescription>Annual income tax return filing and compliance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incomeTaxReturns.map((itReturn) => (
                  <div key={itReturn.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">{getStatusIcon(itReturn.status)}</div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{itReturn.returnType}</h3>
                            <Badge variant="outline">{itReturn.assessmentYear}</Badge>
                            <Badge className={getStatusColor(itReturn.status)}>{itReturn.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Due: {itReturn.dueDate}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                        <Button size="sm">File Return</Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Total Income:</span>
                        <p className="font-medium">₹{itReturn.totalIncome.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Tax Liability:</span>
                        <p className="font-medium">₹{itReturn.taxLiability.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Advance Tax:</span>
                        <p className="font-medium">₹{itReturn.advanceTaxPaid.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Refund Due:</span>
                        <p className={`font-medium ${itReturn.refundDue > 0 ? "text-green-600" : ""}`}>
                          ₹{itReturn.refundDue.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tds" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>TDS Return Management</CardTitle>
              <CardDescription>Quarterly TDS return filing and certificate management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tdsReturns.map((tdsReturn) => (
                  <div key={tdsReturn.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">{getStatusIcon(tdsReturn.status)}</div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">TDS Return</h3>
                            <Badge variant="outline">{tdsReturn.quarter}</Badge>
                            <Badge className={getStatusColor(tdsReturn.status)}>{tdsReturn.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Due: {tdsReturn.dueDate}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                        <Button size="sm">File Return</Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">TDS Deducted:</span>
                        <p className="font-medium">₹{tdsReturn.tdsDeducted.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">TDS Deposited:</span>
                        <p className="font-medium">₹{tdsReturn.tdsDeposited.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Challans:</span>
                        <p className="font-medium">{tdsReturn.challanCount}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Certificates:</span>
                        <p className="font-medium">{tdsReturn.certificatesIssued}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tax Compliance Calendar</CardTitle>
              <CardDescription>Upcoming tax deadlines and compliance requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {taxCalendar.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">{task.task}</h3>
                        <p className="text-sm text-muted-foreground">{task.frequency}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className={`font-medium ${getPriorityColor(task.priority)}`}>{task.dueDate}</p>
                        <p className="text-xs text-muted-foreground">{task.priority} priority</p>
                      </div>
                      <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                      <Button size="sm" variant="outline">
                        Set Reminder
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Tax Trends</CardTitle>
                <CardDescription>Tax liability trends over the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyTaxData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, ""]} />
                      <Line type="monotone" dataKey="gst" stroke="#3b82f6" name="GST" strokeWidth={2} />
                      <Line type="monotone" dataKey="tds" stroke="#10b981" name="TDS" strokeWidth={2} />
                      <Line type="monotone" dataKey="total" stroke="#f59e0b" name="Total" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tax Distribution</CardTitle>
                <CardDescription>Breakdown of tax components for current period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyTaxData.slice(-3)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, ""]} />
                      <Bar dataKey="gst" fill="#3b82f6" name="GST" />
                      <Bar dataKey="tds" fill="#10b981" name="TDS" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
