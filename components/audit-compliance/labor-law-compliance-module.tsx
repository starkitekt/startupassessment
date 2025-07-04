"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
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
import { Switch } from "@/components/ui/switch"
import {
  Users,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Plus,
  Shield,
  Calculator,
  Building,
} from "lucide-react"

const epfEsiReturns = [
  {
    id: "EPF-Dec-2023",
    type: "EPF",
    period: "December 2023",
    dueDate: "2024-01-15",
    status: "pending",
    employeeCount: 45,
    totalContribution: 125000,
    employerShare: 75000,
    employeeShare: 50000,
  },
  {
    id: "ESI-Dec-2023",
    type: "ESI",
    period: "December 2023",
    dueDate: "2024-01-21",
    status: "filed",
    employeeCount: 45,
    totalContribution: 35000,
    employerShare: 26250,
    employeeShare: 8750,
  },
  {
    id: "EPF-Nov-2023",
    type: "EPF",
    period: "November 2023",
    dueDate: "2023-12-15",
    status: "filed",
    employeeCount: 42,
    totalContribution: 118000,
    employerShare: 70800,
    employeeShare: 47200,
  },
]

const minimumWageCompliance = [
  {
    state: "Karnataka",
    category: "Skilled",
    minimumWage: 458,
    currentWage: 500,
    compliance: "compliant",
    employeeCount: 25,
  },
  {
    state: "Karnataka",
    category: "Semi-Skilled",
    minimumWage: 420,
    currentWage: 450,
    compliance: "compliant",
    employeeCount: 15,
  },
  {
    state: "Karnataka",
    category: "Unskilled",
    minimumWage: 385,
    currentWage: 400,
    compliance: "compliant",
    employeeCount: 5,
  },
]

const employmentContracts = [
  {
    id: 1,
    employeeName: "Rajesh Kumar",
    designation: "Software Engineer",
    contractType: "Permanent",
    startDate: "2023-01-15",
    status: "active",
    complianceScore: 95,
    lastReview: "2023-12-01",
  },
  {
    id: 2,
    employeeName: "Priya Sharma",
    designation: "Product Manager",
    contractType: "Permanent",
    startDate: "2023-03-01",
    status: "active",
    complianceScore: 98,
    lastReview: "2023-11-15",
  },
  {
    id: 3,
    employeeName: "Vikram Singh",
    designation: "Consultant",
    contractType: "Contract",
    startDate: "2023-06-01",
    status: "active",
    complianceScore: 88,
    lastReview: "2023-10-20",
  },
]

const selfCertificationStatus = {
  isEligible: true,
  validUntil: "2028-04-15",
  coveredLaws: [
    "Employees' Provident Fund Act",
    "Payment of Gratuity Act",
    "Contract Labour Act",
    "Minimum Wages Act",
    "Payment of Wages Act",
    "Employees' State Insurance Act",
  ],
  complianceScore: 92,
  lastCertification: "2023-04-15",
}

const payrollCompliance = {
  totalEmployees: 45,
  epfCovered: 45,
  esiCovered: 45,
  professionalTaxDeducted: 42,
  tdsDeducted: 38,
  complianceRate: 96.7,
  lastPayrollRun: "2023-12-31",
}

export function LaborLawComplianceModule() {
  const [isNewContractOpen, setIsNewContractOpen] = useState(false)
  const [selfCertificationEnabled, setSelfCertificationEnabled] = useState(true)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "filed":
      case "active":
      case "compliant":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
      case "non-compliant":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "filed":
      case "active":
      case "compliant":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "overdue":
      case "non-compliant":
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
          <h2 className="text-2xl font-bold">Labor Law Compliance</h2>
          <p className="text-muted-foreground">EPF/ESI, minimum wages, employment contracts, and self-certification</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isNewContractOpen} onOpenChange={setIsNewContractOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                New Contract
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Generate Employment Contract</DialogTitle>
                <DialogDescription>Create a new employment contract with legal templates</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Employee Name</Label>
                    <Input placeholder="Enter employee name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Designation</Label>
                    <Input placeholder="Enter designation" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Contract Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select contract type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="permanent">Permanent</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                        <SelectItem value="consultant">Consultant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Department</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="product">Product</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="hr">Human Resources</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Basic Salary (₹)</Label>
                    <Input type="number" placeholder="Enter basic salary" />
                  </div>
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input type="date" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsNewContractOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsNewContractOpen(false)}>Generate Contract</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            File Return
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{payrollCompliance.totalEmployees}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+3</span> new this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">EPF Compliance</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100%</div>
            <p className="text-xs text-muted-foreground">{payrollCompliance.epfCovered} employees covered</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Minimum Wage</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Compliant</div>
            <p className="text-xs text-muted-foreground">All categories above minimum</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Self-Certification</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Active</div>
            <p className="text-xs text-muted-foreground">Valid until 2028</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="epf-esi" className="space-y-6">
        <TabsList>
          <TabsTrigger value="epf-esi">EPF/ESI Returns</TabsTrigger>
          <TabsTrigger value="wages">Minimum Wages</TabsTrigger>
          <TabsTrigger value="contracts">Employment Contracts</TabsTrigger>
          <TabsTrigger value="self-cert">Self-Certification</TabsTrigger>
          <TabsTrigger value="payroll">Payroll Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="epf-esi" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>EPF/ESI Return Management</CardTitle>
              <CardDescription>Monthly EPF and ESI return filing and compliance tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {epfEsiReturns.map((epfReturn) => (
                  <div key={epfReturn.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">{getStatusIcon(epfReturn.status)}</div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{epfReturn.type} Return</h3>
                            <Badge variant="outline">{epfReturn.period}</Badge>
                            <Badge className={getStatusColor(epfReturn.status)}>{epfReturn.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Due: {epfReturn.dueDate}</p>
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
                        <span className="text-muted-foreground">Employees:</span>
                        <p className="font-medium">{epfReturn.employeeCount}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Total Contribution:</span>
                        <p className="font-medium">₹{epfReturn.totalContribution.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Employer Share:</span>
                        <p className="font-medium">₹{epfReturn.employerShare.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Employee Share:</span>
                        <p className="font-medium">₹{epfReturn.employeeShare.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Minimum Wage Compliance</CardTitle>
              <CardDescription>State-wise minimum wage compliance tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {minimumWageCompliance.map((wage, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium">
                          {wage.state} - {wage.category}
                        </h3>
                        <p className="text-sm text-muted-foreground">{wage.employeeCount} employees</p>
                      </div>
                      <Badge className={getStatusColor(wage.compliance)}>{wage.compliance}</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Minimum Wage:</span>
                        <p className="font-medium">₹{wage.minimumWage}/day</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Current Wage:</span>
                        <p className="font-medium">₹{wage.currentWage}/day</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Difference:</span>
                        <p
                          className={`font-medium ${wage.currentWage >= wage.minimumWage ? "text-green-600" : "text-red-600"}`}
                        >
                          ₹{wage.currentWage - wage.minimumWage}/day
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contracts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Employment Contract Management</CardTitle>
              <CardDescription>Manage employment contracts with legal templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {employmentContracts.map((contract) => (
                  <div key={contract.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium">{contract.employeeName}</h3>
                        <p className="text-sm text-muted-foreground">{contract.designation}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(contract.status)}>{contract.status}</Badge>
                        <Badge variant="outline">{contract.contractType}</Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-muted-foreground">Start Date:</span>
                        <p className="font-medium">{contract.startDate}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Compliance Score:</span>
                        <p className="font-medium">{contract.complianceScore}%</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Last Review:</span>
                        <p className="font-medium">{contract.lastReview}</p>
                      </div>
                    </div>
                    <Progress value={contract.complianceScore} className="mb-3" />
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <FileText className="mr-2 h-4 w-4" />
                        View Contract
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button size="sm">Review</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="self-cert" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Self-Certification Status</CardTitle>
                <CardDescription>Startup labor law self-certification benefits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Self-Certification Enabled</span>
                  <Switch checked={selfCertificationEnabled} onCheckedChange={setSelfCertificationEnabled} />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Eligibility Status</span>
                    <span
                      className={`font-medium ${selfCertificationStatus.isEligible ? "text-green-600" : "text-red-600"}`}
                    >
                      {selfCertificationStatus.isEligible ? "Eligible" : "Not Eligible"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Valid Until</span>
                    <span className="font-medium">{selfCertificationStatus.validUntil}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Compliance Score</span>
                    <span className="font-medium">{selfCertificationStatus.complianceScore}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Last Certification</span>
                    <span className="font-medium">{selfCertificationStatus.lastCertification}</span>
                  </div>
                </div>
                <Progress value={selfCertificationStatus.complianceScore} className="mt-4" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Covered Labor Laws</CardTitle>
                <CardDescription>Laws covered under self-certification scheme</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selfCertificationStatus.coveredLaws.map((law, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{law}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <Shield className="inline h-4 w-4 mr-1" />
                    Self-certification provides 5-year exemption from routine inspections under these laws.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payroll" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payroll Compliance Overview</CardTitle>
              <CardDescription>Statutory deduction monitoring and compliance tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-3">
                  <h4 className="font-medium">EPF Coverage</h4>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Covered Employees</span>
                    <span className="font-medium">
                      {payrollCompliance.epfCovered}/{payrollCompliance.totalEmployees}
                    </span>
                  </div>
                  <Progress value={(payrollCompliance.epfCovered / payrollCompliance.totalEmployees) * 100} />
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium">ESI Coverage</h4>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Covered Employees</span>
                    <span className="font-medium">
                      {payrollCompliance.esiCovered}/{payrollCompliance.totalEmployees}
                    </span>
                  </div>
                  <Progress value={(payrollCompliance.esiCovered / payrollCompliance.totalEmployees) * 100} />
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium">Professional Tax</h4>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Deducted</span>
                    <span className="font-medium">
                      {payrollCompliance.professionalTaxDeducted}/{payrollCompliance.totalEmployees}
                    </span>
                  </div>
                  <Progress
                    value={(payrollCompliance.professionalTaxDeducted / payrollCompliance.totalEmployees) * 100}
                  />
                </div>
              </div>
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-green-800">Overall Compliance Rate</h4>
                    <p className="text-sm text-green-600">Last payroll run: {payrollCompliance.lastPayrollRun}</p>
                  </div>
                  <div className="text-2xl font-bold text-green-600">{payrollCompliance.complianceRate}%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
