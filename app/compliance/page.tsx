import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, CheckCircle, ClipboardCheck, FileText, Gavel, ShieldCheck, ArrowRight } from "lucide-react"
import Link from "next/link"

const mockComplianceOverview = {
  overallStatus: "Good", // Good, Needs Attention, Critical
  overallProgress: 85, // Percentage
  keyAreas: [
    {
      id: "data_privacy",
      name: "Data Privacy (GDPR/CCPA)",
      status: "Compliant",
      progress: 100,
      lastReview: "2025-05-20",
    },
    {
      id: "financial_reporting",
      name: "Financial Reporting Standards",
      status: "Partially Compliant",
      progress: 75,
      lastReview: "2025-04-10",
    },
    {
      id: "startup_onboarding",
      name: "Startup Onboarding Due Diligence",
      status: "Compliant",
      progress: 100,
      lastReview: "2025-06-01",
    },
    {
      id: "ip_protection",
      name: "Intellectual Property Protection",
      status: "Needs Review",
      progress: 50,
      lastReview: "2025-03-15",
    },
  ],
}

const mockPendingTasks = [
  {
    id: "task001",
    title: "Acknowledge Updated Data Security Policy",
    dueDate: "2025-07-10",
    priority: "High",
    relatedArea: "Data Privacy",
  },
  {
    id: "task002",
    title: "Submit Q2 Financial Attestation",
    dueDate: "2025-07-15",
    priority: "Medium",
    relatedArea: "Financial Reporting",
  },
  {
    id: "task003",
    title: "Complete IP Protection Training Module",
    dueDate: "2025-07-30",
    priority: "Low",
    relatedArea: "IP Protection",
  },
]

const mockPolicies = [
  {
    id: "pol001",
    name: "Data Security & Privacy Policy",
    version: "v3.1",
    lastUpdated: "2025-06-15",
    status: "Active",
  },
  { id: "pol002", name: "Code of Conduct", version: "v2.0", lastUpdated: "2025-01-20", status: "Active" },
  {
    id: "pol003",
    name: "Financial Reporting Guidelines",
    version: "v1.5",
    lastUpdated: "2025-03-01",
    status: "Active",
  },
]

export default function CompliancePage() {
  const getStatusColor = (status: string) => {
    if (status === "Compliant") return "bg-green-100 text-green-700"
    if (status === "Partially Compliant" || status === "Needs Review") return "bg-yellow-100 text-yellow-700"
    return "bg-red-100 text-red-700" // Critical or other
  }
  const getPriorityColor = (priority: string) => {
    if (priority === "High") return "text-red-600"
    if (priority === "Medium") return "text-yellow-600"
    return "text-green-600" // Low
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl flex items-center gap-2">
            <Gavel className="h-8 w-8 text-primary" /> Compliance Center
          </h1>
          <p className="text-lg text-muted-foreground">
            Monitor, manage, and maintain adherence to regulatory standards and internal policies.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/audits">
            {" "}
            {/* Link to Audits page */}
            <ShieldCheck className="mr-2 h-4 w-4" /> View Audit Logs
          </Link>
        </Button>
      </header>

      <Tabs defaultValue="dashboard">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-6">
          <TabsTrigger value="dashboard">Compliance Dashboard</TabsTrigger>
          <TabsTrigger value="my-tasks">My Compliance Tasks</TabsTrigger>
          <TabsTrigger value="policies">Policies & Procedures</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <Card>
            <CardHeader>
              <CardTitle>Overall Compliance Status</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Progress value={mockComplianceOverview.overallProgress} className="w-full h-3" />
                <span className="text-lg font-semibold text-primary">{mockComplianceOverview.overallProgress}%</span>
              </div>
              <CardDescription>
                Current status:{" "}
                <span
                  className={cn(
                    "font-semibold",
                    getStatusColor(mockComplianceOverview.overallStatus)
                      .replace("bg-", "text-")
                      .replace("-100", "-600"),
                  )}
                >
                  {mockComplianceOverview.overallStatus}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold mb-3">Key Compliance Areas</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {mockComplianceOverview.keyAreas.map((area) => (
                  <Card key={area.id} className="bg-muted/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-md flex items-center justify-between">
                        {area.name}
                        <Badge variant="outline" className={cn("text-xs", getStatusColor(area.status))}>
                          {area.status}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1 text-sm">
                      <Progress value={area.progress} className="h-1.5 mb-2" />
                      <p>Last Reviewed: {area.lastReview}</p>
                      <Button variant="link" size="sm" className="p-0 h-auto" asChild>
                        <Link href={`/compliance/areas/${area.id}`}>
                          {" "}
                          {/* Placeholder link */}
                          View Details & Actions <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="my-tasks">
          <Card>
            <CardHeader>
              <CardTitle>My Pending Compliance Tasks</CardTitle>
              <CardDescription>Actions required to maintain compliance.</CardDescription>
            </CardHeader>
            <CardContent>
              {mockPendingTasks.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task</TableHead>
                      <TableHead>Related Area</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPendingTasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell className="font-medium">{task.title}</TableCell>
                        <TableCell>{task.relatedArea}</TableCell>
                        <TableCell>{task.dueDate}</TableCell>
                        <TableCell>
                          <span className={cn("font-semibold", getPriorityColor(task.priority))}>{task.priority}</span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="default" size="sm" asChild>
                            <Link href={`/compliance/tasks/${task.id}`}>
                              {" "}
                              {/* Placeholder link */}
                              <CheckCircle className="mr-1.5 h-3.5 w-3.5" /> Complete Task
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <ClipboardCheck className="mx-auto h-12 w-12 mb-2" />
                  <p>No pending compliance tasks. Well done!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies">
          <Card>
            <CardHeader>
              <CardTitle>Policies & Procedures Library</CardTitle>
              <CardDescription>Access all organizational policies and standard operating procedures.</CardDescription>
            </CardHeader>
            <CardContent>
              {mockPolicies.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Policy Name</TableHead>
                      <TableHead>Version</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPolicies.map((policy) => (
                      <TableRow key={policy.id}>
                        <TableCell className="font-medium">{policy.name}</TableCell>
                        <TableCell>{policy.version}</TableCell>
                        <TableCell>{policy.lastUpdated}</TableCell>
                        <TableCell>
                          <Badge
                            variant={policy.status === "Active" ? "default" : "outline"}
                            className={policy.status === "Active" ? "bg-green-600 hover:bg-green-700" : ""}
                          >
                            {policy.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/compliance/policies/${policy.id}`}>
                              {" "}
                              {/* Placeholder link */}
                              <BookOpen className="mr-1.5 h-3.5 w-3.5" /> View Policy
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="mx-auto h-12 w-12 mb-2" />
                  <p>No policies found. Please check back later.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
