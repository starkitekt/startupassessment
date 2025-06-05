import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DollarSign, FileText, Target, TrendingUp, Clock, CheckCircle, AlertCircle, Plus } from "lucide-react"

export const metadata: Metadata = {
  title: "Funding Management",
  description: "Manage funding applications and disbursements",
}

export default function FundingPage() {
  const fundingStats = [
    {
      title: "Total Applications",
      value: "24",
      change: "+12%",
      icon: FileText,
    },
    {
      title: "Approved Funding",
      value: "$2.4M",
      change: "+18%",
      icon: DollarSign,
    },
    {
      title: "Active Disbursements",
      value: "8",
      change: "+3",
      icon: Target,
    },
    {
      title: "Success Rate",
      value: "67%",
      change: "+5%",
      icon: TrendingUp,
    },
  ]

  const recentApplications = [
    {
      id: "FA-001",
      startup: "TechFlow Solutions",
      amount: "$250,000",
      status: "Under Review",
      stage: "Due Diligence",
      progress: 65,
      submittedDate: "2024-01-15",
    },
    {
      id: "FA-002",
      startup: "GreenEnergy Innovations",
      amount: "$500,000",
      status: "Approved",
      stage: "Disbursement",
      progress: 90,
      submittedDate: "2024-01-10",
    },
    {
      id: "FA-003",
      startup: "HealthTech Pro",
      amount: "$150,000",
      status: "Pending",
      stage: "Initial Review",
      progress: 25,
      submittedDate: "2024-01-20",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800"
      case "Under Review":
        return "bg-yellow-100 text-yellow-800"
      case "Pending":
        return "bg-blue-100 text-blue-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="h-4 w-4" />
      case "Under Review":
        return <Clock className="h-4 w-4" />
      case "Pending":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Funding Management</h1>
          <p className="text-muted-foreground">Manage funding applications, disbursements, and milestones</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Application
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {fundingStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Applications */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Funding Applications</CardTitle>
          <CardDescription>Latest funding applications and their current status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentApplications.map((application) => (
              <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{application.startup}</h3>
                      <p className="text-sm text-muted-foreground">
                        {application.id} • Submitted {application.submittedDate}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{application.amount}</p>
                      <Badge className={getStatusColor(application.status)}>
                        {getStatusIcon(application.status)}
                        <span className="ml-1">{application.status}</span>
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>Stage: {application.stage}</span>
                      <span>{application.progress}%</span>
                    </div>
                    <Progress value={application.progress} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
