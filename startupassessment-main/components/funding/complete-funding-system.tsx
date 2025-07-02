"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
  DollarSign,
  TrendingUp,
  FileText,
  CalendarIcon,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Eye,
  Edit,
  Download,
} from "lucide-react"

interface FundingApplication {
  id: string
  startupId: string
  startupName: string
  applicantName: string
  applicantEmail: string
  fundingType: "pre-seed" | "seed" | "series-a" | "series-b" | "bridge" | "grant"
  requestedAmount: number
  useOfFunds: string
  businessPlan: string
  marketAnalysis: string
  financialProjections: FinancialProjection[]
  teamInfo: TeamMember[]
  milestones: FundingMilestone[]
  status:
    | "draft"
    | "submitted"
    | "under-review"
    | "due-diligence"
    | "committee-review"
    | "approved"
    | "rejected"
    | "withdrawn"
  submittedDate: Date
  reviewDeadline?: Date
  assignedReviewer?: string
  reviewNotes: ReviewNote[]
  documents: Document[]
  currentStage: string
  nextSteps: string[]
}

interface FinancialProjection {
  year: number
  revenue: number
  expenses: number
  netIncome: number
  cashFlow: number
  customers: number
  employees: number
}

interface TeamMember {
  id: string
  name: string
  role: string
  experience: string
  equity: number
  linkedIn?: string
}

interface FundingMilestone {
  id: string
  title: string
  description: string
  targetDate: Date
  amount: number
  status: "pending" | "in-progress" | "completed" | "delayed"
  dependencies: string[]
}

interface ReviewNote {
  id: string
  reviewerId: string
  reviewerName: string
  category: "financial" | "market" | "team" | "product" | "legal"
  rating: number
  comments: string
  createdAt: Date
}

interface Document {
  id: string
  name: string
  type: "pitch-deck" | "business-plan" | "financials" | "legal" | "technical" | "other"
  url: string
  uploadedAt: Date
  size: number
  status: "pending" | "reviewed" | "approved" | "rejected"
}

interface Disbursement {
  id: string
  applicationId: string
  amount: number
  milestoneId: string
  scheduledDate: Date
  actualDate?: Date
  status: "scheduled" | "pending-approval" | "approved" | "disbursed" | "failed"
  bankDetails: BankDetails
  approvedBy?: string
  transactionId?: string
  conditions: string[]
  documents: string[]
}

interface BankDetails {
  accountName: string
  accountNumber: string
  routingNumber: string
  bankName: string
  verified: boolean
}

interface InvestmentCommittee {
  id: string
  name: string
  members: CommitteeMember[]
  meetingSchedule: string
  decisionThreshold: number
  focusAreas: string[]
}

interface CommitteeMember {
  id: string
  name: string
  role: string
  expertise: string[]
  votingPower: number
}

interface CapTableEntry {
  id: string
  startupId: string
  shareholderName: string
  shareholderType: "founder" | "employee" | "investor" | "advisor"
  shares: number
  shareClass: "common" | "preferred-a" | "preferred-b" | "options"
  ownershipPercentage: number
  investmentAmount?: number
  investmentDate?: Date
  liquidationPreference?: number
  antiDilution?: "weighted-average" | "full-ratchet" | "none"
}

export function CompleteFundingSystem() {
  const [activeTab, setActiveTab] = useState("applications")
  const [selectedApplication, setSelectedApplication] = useState<FundingApplication | null>(null)
  const [applicationFilter, setApplicationFilter] = useState("all")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  // Mock data
  const [applications, setApplications] = useState<FundingApplication[]>([
    {
      id: "app-001",
      startupId: "startup-001",
      startupName: "TechFlow Solutions",
      applicantName: "Sarah Johnson",
      applicantEmail: "sarah@techflow.com",
      fundingType: "series-a",
      requestedAmount: 2500000,
      useOfFunds: "Product development (40%), Marketing (30%), Team expansion (20%), Working capital (10%)",
      businessPlan: "AI-powered workflow automation platform for enterprise customers",
      marketAnalysis: "TAM: $50B, SAM: $5B, SOM: $500M in workflow automation market",
      financialProjections: [
        {
          year: 2024,
          revenue: 1200000,
          expenses: 900000,
          netIncome: 300000,
          cashFlow: 250000,
          customers: 150,
          employees: 25,
        },
        {
          year: 2025,
          revenue: 3000000,
          expenses: 2100000,
          netIncome: 900000,
          cashFlow: 800000,
          customers: 400,
          employees: 45,
        },
        {
          year: 2026,
          revenue: 7500000,
          expenses: 4500000,
          netIncome: 3000000,
          cashFlow: 2800000,
          customers: 1000,
          employees: 75,
        },
      ],
      teamInfo: [
        {
          id: "tm-1",
          name: "Sarah Johnson",
          role: "CEO",
          experience: "10 years in enterprise software",
          equity: 25,
          linkedIn: "linkedin.com/in/sarahjohnson",
        },
        {
          id: "tm-2",
          name: "Michael Chen",
          role: "CTO",
          experience: "8 years in AI/ML",
          equity: 20,
          linkedIn: "linkedin.com/in/michaelchen",
        },
      ],
      milestones: [
        {
          id: "ms-1",
          title: "Product Beta Launch",
          description: "Launch beta version with 10 enterprise customers",
          targetDate: new Date("2024-03-15"),
          amount: 500000,
          status: "in-progress",
          dependencies: ["Technical development", "Customer onboarding"],
        },
        {
          id: "ms-2",
          title: "Revenue Milestone",
          description: "Achieve $100K MRR",
          targetDate: new Date("2024-06-30"),
          amount: 1000000,
          status: "pending",
          dependencies: ["Product launch", "Sales team hiring"],
        },
      ],
      status: "under-review",
      submittedDate: new Date("2024-01-15"),
      reviewDeadline: new Date("2024-02-15"),
      assignedReviewer: "Investment Committee",
      reviewNotes: [
        {
          id: "rn-1",
          reviewerId: "reviewer-1",
          reviewerName: "David Wilson",
          category: "market",
          rating: 8,
          comments: "Strong market opportunity with clear differentiation",
          createdAt: new Date("2024-01-20"),
        },
      ],
      documents: [
        {
          id: "doc-1",
          name: "Pitch Deck v3.pdf",
          type: "pitch-deck",
          url: "#",
          uploadedAt: new Date("2024-01-15"),
          size: 2500000,
          status: "reviewed",
        },
      ],
      currentStage: "Due Diligence",
      nextSteps: ["Financial model review", "Reference calls", "Legal documentation"],
    },
  ])

  const [disbursements, setDisbursements] = useState<Disbursement[]>([
    {
      id: "disb-001",
      applicationId: "app-001",
      amount: 500000,
      milestoneId: "ms-1",
      scheduledDate: new Date("2024-03-15"),
      status: "scheduled",
      bankDetails: {
        accountName: "TechFlow Solutions Inc.",
        accountNumber: "****1234",
        routingNumber: "021000021",
        bankName: "Chase Bank",
        verified: true,
      },
      conditions: ["Milestone completion verification", "Legal documentation signed"],
      documents: ["Milestone_Report.pdf", "Bank_Verification.pdf"],
    },
  ])

  const [capTable, setCapTable] = useState<CapTableEntry[]>([
    {
      id: "cap-1",
      startupId: "startup-001",
      shareholderName: "Sarah Johnson",
      shareholderType: "founder",
      shares: 2500000,
      shareClass: "common",
      ownershipPercentage: 25,
    },
    {
      id: "cap-2",
      startupId: "startup-001",
      shareholderName: "Venture Partners",
      shareholderType: "investor",
      shares: 1500000,
      shareClass: "preferred-a",
      ownershipPercentage: 15,
      investmentAmount: 2500000,
      investmentDate: new Date("2024-01-15"),
      liquidationPreference: 1,
      antiDilution: "weighted-average",
    },
  ])

  const [committee, setCommittee] = useState<InvestmentCommittee>({
    id: "ic-1",
    name: "Investment Committee",
    members: [
      {
        id: "ic-member-1",
        name: "David Wilson",
        role: "Managing Partner",
        expertise: ["SaaS", "Enterprise Software"],
        votingPower: 3,
      },
      {
        id: "ic-member-2",
        name: "Lisa Chen",
        role: "Investment Director",
        expertise: ["AI/ML", "Deep Tech"],
        votingPower: 2,
      },
    ],
    meetingSchedule: "Weekly on Thursdays",
    decisionThreshold: 70,
    focusAreas: ["B2B SaaS", "AI/ML", "FinTech"],
  })

  const handleApplicationSubmit = async (applicationData: Partial<FundingApplication>) => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newApplication: FundingApplication = {
        id: `app-${Date.now()}`,
        startupId: applicationData.startupId || "",
        startupName: applicationData.startupName || "",
        applicantName: applicationData.applicantName || "",
        applicantEmail: applicationData.applicantEmail || "",
        fundingType: applicationData.fundingType || "seed",
        requestedAmount: applicationData.requestedAmount || 0,
        useOfFunds: applicationData.useOfFunds || "",
        businessPlan: applicationData.businessPlan || "",
        marketAnalysis: applicationData.marketAnalysis || "",
        financialProjections: applicationData.financialProjections || [],
        teamInfo: applicationData.teamInfo || [],
        milestones: applicationData.milestones || [],
        status: "submitted",
        submittedDate: new Date(),
        reviewNotes: [],
        documents: [],
        currentStage: "Initial Review",
        nextSteps: ["Document verification", "Initial screening"],
      }

      setApplications([...applications, newApplication])

      toast({
        title: "Application submitted",
        description: "Funding application has been submitted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDisbursementApproval = async (disbursementId: string) => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setDisbursements(
        disbursements.map((d) =>
          d.id === disbursementId ? { ...d, status: "approved" as const, approvedBy: "Current User" } : d,
        ),
      )

      toast({
        title: "Disbursement approved",
        description: "Funding disbursement has been approved",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve disbursement",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "under-review":
        return "bg-blue-100 text-blue-800"
      case "due-diligence":
        return "bg-purple-100 text-purple-800"
      case "committee-review":
        return "bg-orange-100 text-orange-800"
      case "submitted":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const filteredApplications = applications.filter((app) => {
    if (applicationFilter === "all") return true
    return app.status === applicationFilter
  })

  const calculateTotalFunding = () => {
    return applications
      .filter((app) => app.status === "approved")
      .reduce((total, app) => total + app.requestedAmount, 0)
  }

  const calculatePendingAmount = () => {
    return applications
      .filter((app) => ["submitted", "under-review", "due-diligence", "committee-review"].includes(app.status))
      .reduce((total, app) => total + app.requestedAmount, 0)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Funding Management</h1>
          <p className="text-muted-foreground">Comprehensive funding and financial management system</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Application
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="disbursements">Disbursements</TabsTrigger>
          <TabsTrigger value="committee">Committee</TabsTrigger>
          <TabsTrigger value="cap-table">Cap Table</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{applications.length}</div>
                <p className="text-xs text-muted-foreground">+3 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Approved Funding</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(calculateTotalFunding())}</div>
                <p className="text-xs text-muted-foreground">Across approved applications</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(calculatePendingAmount())}</div>
                <p className="text-xs text-muted-foreground">Under review</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">67%</div>
                <p className="text-xs text-muted-foreground">Last 12 months</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex items-center space-x-4">
            <Select value={applicationFilter} onValueChange={setApplicationFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter applications" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Applications</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="under-review">Under Review</SelectItem>
                <SelectItem value="due-diligence">Due Diligence</SelectItem>
                <SelectItem value="committee-review">Committee Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>

          <div className="grid gap-6">
            {filteredApplications.map((application) => (
              <Card key={application.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-xl font-semibold">{application.startupName}</h3>
                        <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
                        <Badge variant="outline">{application.fundingType}</Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Requested Amount:</span>
                          <p className="font-medium">{formatCurrency(application.requestedAmount)}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Applicant:</span>
                          <p className="font-medium">{application.applicantName}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Submitted:</span>
                          <p className="font-medium">{application.submittedDate.toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Current Stage:</span>
                          <p className="font-medium">{application.currentStage}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Use of Funds</h4>
                        <p className="text-sm text-muted-foreground">{application.useOfFunds}</p>
                      </div>

                      {application.milestones.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">Key Milestones</h4>
                          <div className="space-y-1">
                            {application.milestones.slice(0, 2).map((milestone) => (
                              <div key={milestone.id} className="flex items-center justify-between text-sm">
                                <span>{milestone.title}</span>
                                <div className="flex items-center space-x-2">
                                  <Badge variant="outline" className="text-xs">
                                    {formatCurrency(milestone.amount)}
                                  </Badge>
                                  <span className="text-muted-foreground">
                                    {milestone.targetDate.toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {application.nextSteps.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">Next Steps</h4>
                          <div className="flex flex-wrap gap-1">
                            {application.nextSteps.map((step, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {step}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="mr-2 h-4 w-4" />
                        Review
                      </Button>
                      <Button size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Manage
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="disbursements" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Funding Disbursements</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Schedule Disbursement
            </Button>
          </div>

          <div className="grid gap-4">
            {disbursements.map((disbursement) => {
              const application = applications.find((app) => app.id === disbursement.applicationId)
              const milestone = application?.milestones.find((m) => m.id === disbursement.milestoneId)

              return (
                <Card key={disbursement.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold">{application?.startupName}</h3>
                          <Badge
                            className={
                              disbursement.status === "disbursed"
                                ? "bg-green-100 text-green-800"
                                : disbursement.status === "approved"
                                  ? "bg-blue-100 text-blue-800"
                                  : disbursement.status === "pending-approval"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-800"
                            }
                          >
                            {disbursement.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Amount:</span>
                            <p className="font-medium">{formatCurrency(disbursement.amount)}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Milestone:</span>
                            <p className="font-medium">{milestone?.title}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Scheduled:</span>
                            <p className="font-medium">{disbursement.scheduledDate.toLocaleDateString()}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Bank:</span>
                            <p className="font-medium">{disbursement.bankDetails.bankName}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-2">Bank Details</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Account Name:</span>
                              <p>{disbursement.bankDetails.accountName}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Account Number:</span>
                              <p>{disbursement.bankDetails.accountNumber}</p>
                            </div>
                          </div>
                          <div className="flex items-center mt-2">
                            {disbursement.bankDetails.verified ? (
                              <div className="flex items-center text-green-600">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                <span className="text-sm">Verified</span>
                              </div>
                            ) : (
                              <div className="flex items-center text-orange-600">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                <span className="text-sm">Pending Verification</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {disbursement.conditions.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium mb-2">Conditions</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {disbursement.conditions.map((condition, index) => (
                                <li key={index}>• {condition}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {disbursement.documents.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium mb-2">Required Documents</h4>
                            <div className="flex flex-wrap gap-1">
                              {disbursement.documents.map((doc, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {doc}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        {disbursement.status === "pending-approval" && (
                          <Button
                            size="sm"
                            onClick={() => handleDisbursementApproval(disbursement.id)}
                            disabled={loading}
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Approve
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Eye className="mr-2 h-4 w-4" />
                          Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="committee" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Investment Committee</h2>
            <Button>
              <CalendarIcon className="mr-2 h-4 w-4" />
              Schedule Meeting
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{committee.name}</CardTitle>
              <CardDescription>Investment decision-making body</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Members:</span>
                  <p className="font-medium">{committee.members.length}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Meeting Schedule:</span>
                  <p className="font-medium">{committee.meetingSchedule}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Decision Threshold:</span>
                  <p className="font-medium">{committee.decisionThreshold}%</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Focus Areas:</span>
                  <p className="font-medium">{committee.focusAreas.length} sectors</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-4">Committee Members</h4>
                <div className="space-y-4">
                  {committee.members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <h5 className="font-medium">{member.name}</h5>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                        <div className="flex flex-wrap gap-1">
                          {member.expertise.map((exp, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {exp}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">Voting Power: {member.votingPower}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-4">Focus Areas</h4>
                <div className="flex flex-wrap gap-2">
                  {committee.focusAreas.map((area, index) => (
                    <Badge key={index} variant="outline">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cap-table" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Cap Table Management</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Entry
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Capitalization Table</CardTitle>
              <CardDescription>Ownership structure and equity distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {capTable.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h5 className="font-medium">{entry.shareholderName}</h5>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{entry.shareholderType}</Badge>
                        <Badge variant="secondary">{entry.shareClass}</Badge>
                      </div>
                      {entry.investmentAmount && (
                        <p className="text-sm text-muted-foreground">
                          Investment: {formatCurrency(entry.investmentAmount)}
                          {entry.investmentDate && ` on ${entry.investmentDate.toLocaleDateString()}`}
                        </p>
                      )}
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-medium">{entry.shares.toLocaleString()} shares</p>
                      <p className="text-sm text-muted-foreground">{entry.ownershipPercentage}% ownership</p>
                      {entry.liquidationPreference && (
                        <p className="text-xs text-muted-foreground">
                          {entry.liquidationPreference}x liquidation preference
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t">
                <h4 className="text-sm font-medium mb-4">Ownership Summary</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Total Shares:</span>
                    <p className="font-medium">
                      {capTable.reduce((sum, entry) => sum + entry.shares, 0).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Founders:</span>
                    <p className="font-medium">
                      {capTable
                        .filter((e) => e.shareholderType === "founder")
                        .reduce((sum, e) => sum + e.ownershipPercentage, 0)}
                      %
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Investors:</span>
                    <p className="font-medium">
                      {capTable
                        .filter((e) => e.shareholderType === "investor")
                        .reduce((sum, e) => sum + e.ownershipPercentage, 0)}
                      %
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Employee Pool:</span>
                    <p className="font-medium">
                      {capTable
                        .filter((e) => e.shareholderType === "employee")
                        .reduce((sum, e) => sum + e.ownershipPercentage, 0)}
                      %
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Funding Analytics</CardTitle>
                <CardDescription>Comprehensive funding performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Average Deal Size</h4>
                    <div className="text-2xl font-bold">{formatCurrency(1800000)}</div>
                    <p className="text-xs text-muted-foreground">Across all funding rounds</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Time to Decision</h4>
                    <div className="text-2xl font-bold">28 days</div>
                    <p className="text-xs text-muted-foreground">Average review time</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Portfolio IRR</h4>
                    <div className="text-2xl font-bold text-green-600">22.5%</div>
                    <p className="text-xs text-muted-foreground">Internal Rate of Return</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Funding by Stage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["pre-seed", "seed", "series-a", "series-b"].map((stage) => {
                      const stageApps = applications.filter((app) => app.fundingType === stage)
                      const totalAmount = stageApps.reduce((sum, app) => sum + app.requestedAmount, 0)
                      const percentage = applications.length > 0 ? (stageApps.length / applications.length) * 100 : 0

                      return (
                        <div key={stage} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="capitalize">{stage.replace("-", " ")}</span>
                            <span>{formatCurrency(totalAmount)}</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Application Pipeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["submitted", "under-review", "due-diligence", "committee-review", "approved"].map((status) => {
                      const statusApps = applications.filter((app) => app.status === status)
                      const percentage = applications.length > 0 ? (statusApps.length / applications.length) * 100 : 0

                      return (
                        <div key={status} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="capitalize">{status.replace("-", " ")}</span>
                            <span>{statusApps.length} applications</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
