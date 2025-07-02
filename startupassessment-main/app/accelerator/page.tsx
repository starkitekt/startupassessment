"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, FileText, Lightbulb, PlusCircle, Rocket, Users, TrendingUp, Target } from "lucide-react"
import Link from "next/link"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { StandardizedPageLayout } from "@/components/standardized-page-layout"

const mockAcceleratorPrograms = [
  {
    id: "prog001",
    name: "FinTech FastTrack",
    focus: "FinTech",
    duration: "12 Weeks",
    status: "Accepting Applications",
    nextCohortStartDate: "2025-09-01",
    slots: 20,
    applicationsReceived: 150,
    successRate: 75,
    avgFundingPostProgram: 500000,
  },
  {
    id: "prog002",
    name: "HealthTech Innovators",
    focus: "HealthTech",
    duration: "16 Weeks",
    status: "In Progress",
    currentCohortEndDate: "2025-08-15",
    slots: 15,
    applicationsReceived: 120,
    successRate: 80,
    avgFundingPostProgram: 750000,
  },
  {
    id: "prog003",
    name: "AI Launchpad",
    focus: "Artificial Intelligence",
    duration: "14 Weeks",
    status: "Planning",
    nextCohortStartDate: "2025-11-01",
    slots: 18,
    applicationsReceived: 0,
    successRate: 0,
    avgFundingPostProgram: 0,
  },
]

const mockMyApplications = [
  {
    id: "app001",
    programName: "FinTech FastTrack",
    startupName: "PayPulse",
    submissionDate: "2025-05-15",
    status: "Under Review",
    stage: "Initial Screening",
  },
  {
    id: "app002",
    programName: "AI Launchpad",
    startupName: "CogniCore",
    submissionDate: "2025-04-20",
    status: "Shortlisted",
    stage: "Pitch Deck Review",
  },
]

const mockMyEnrolledPrograms = [
  {
    id: "enr001",
    programName: "HealthTech Innovators",
    startupName: "WellAI",
    currentMilestone: "MVP Development",
    milestoneProgress: 60,
    nextDeadline: "2025-07-15",
    mentor: "Dr. Anya Sharma",
    mentorId: "M001",
    overallProgress: 45,
    keyMetrics: [
      { name: "User Engagement", value: "70%", trend: "up" },
      { name: "Technical Debt", value: "Low", trend: "stable" },
    ],
  },
]

const applicationFunnelData = [
  { stage: "Applications", count: 270, fill: "hsl(var(--chart-1))" },
  { stage: "Screened", count: 180, fill: "hsl(var(--chart-2))" },
  { stage: "Interviewed", count: 90, fill: "hsl(var(--chart-3))" },
  { stage: "Offered", count: 45, fill: "hsl(var(--chart-4))" },
  { stage: "Accepted", count: 35, fill: "hsl(var(--chart-5))" },
]

const chartConfig = {
  count: { label: "Count", color: "hsl(var(--chart-1))" },
}

export default function AcceleratorPage() {
  return (
    <StandardizedPageLayout
      title="Accelerator Hub"
      description="Discover, apply, and manage your journey through our startup accelerator programs."
      actions={
        <Button asChild className="jpmc-gradient">
          <Link href="/accelerator/apply">
            <PlusCircle className="mr-2 h-4 w-4" /> Apply to a Program
          </Link>
        </Button>
      }
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" /> Application Funnel (Overall)
            </CardTitle>
            <CardDescription>Conversion rates across all programs for the current cycle.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer config={chartConfig} className="w-full h-full">
              <ResponsiveContainer>
                <BarChart data={applicationFunnelData} layout="vertical" margin={{ left: 10, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" />
                  <YAxis dataKey="stage" type="category" width={100} interval={0} tick={{ fontSize: 12 }} />
                  <RechartsTooltip content={<ChartTooltipContent />} cursor={{ fill: "hsl(var(--muted))" }} />
                  <Bar dataKey="count" name="Applications" radius={[0, 4, 4, 0]}>
                    {applicationFunnelData.map((entry) => (
                      <Cell key={`cell-${entry.stage}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" /> Key Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
              <div>
                <p className="text-sm text-muted-foreground">Active Programs</p>
                <p className="text-2xl font-bold">
                  {mockAcceleratorPrograms.filter((p) => p.status !== "Planning").length}
                </p>
              </div>
              <Rocket className="h-8 w-8 text-primary" />
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
              <div>
                <p className="text-sm text-muted-foreground">Total Applications (Current Cycle)</p>
                <p className="text-2xl font-bold">{applicationFunnelData[0].count}</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
              <div>
                <p className="text-sm text-muted-foreground">Startups Currently Enrolled</p>
                <p className="text-2xl font-bold">{mockMyEnrolledPrograms.length}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-6">
          <TabsTrigger value="overview">Programs Overview</TabsTrigger>
          <TabsTrigger value="my-applications">My Applications</TabsTrigger>
          <TabsTrigger value="my-programs">My Enrolled Programs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Available Accelerator Programs</CardTitle>
              <CardDescription>Explore programs designed to boost your startup's growth.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {mockAcceleratorPrograms.map((program) => (
                  <Card key={program.id} className="flex flex-col hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-1">
                        <Rocket className="h-5 w-5 text-primary" />
                        <CardTitle className="text-xl">{program.name}</CardTitle>
                      </div>
                      <Badge variant="secondary">{program.focus}</Badge>
                      <CardDescription className="pt-1">{program.duration}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm flex-grow">
                      <p>
                        <strong>Status:</strong>{" "}
                        <Badge
                          variant={program.status === "Accepting Applications" ? "default" : "outline"}
                          className={cn(
                            program.status === "Accepting Applications" && "bg-green-600 text-primary-foreground",
                            program.status === "In Progress" && "bg-blue-600 text-primary-foreground",
                          )}
                        >
                          {program.status}
                        </Badge>
                      </p>
                      <p>
                        <strong>Next/Current Cohort:</strong>{" "}
                        {program.nextCohortStartDate
                          ? new Date(program.nextCohortStartDate).toLocaleDateString()
                          : program.currentCohortEndDate
                            ? `Ends ${new Date(program.currentCohortEndDate).toLocaleDateString()}`
                            : "TBD"}
                      </p>
                      <p>
                        <strong>Slots:</strong> {program.slots} | <strong>Apps Received:</strong>{" "}
                        {program.applicationsReceived}
                      </p>
                      <p>
                        <strong>Success Rate:</strong> {program.successRate}%
                      </p>
                      <p>
                        <strong>Avg. Funding Post-Program:</strong> ${program.avgFundingPostProgram.toLocaleString()}
                      </p>
                    </CardContent>
                    <div className="p-4 pt-0 mt-auto">
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link href={`/accelerator/programs/${program.id}`}>
                          Learn More & Apply <ExternalLink className="ml-2 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="my-applications">
          <Card>
            <CardHeader>
              <CardTitle>My Startup Applications</CardTitle>
              <CardDescription>Track the status of your applications to our accelerator programs.</CardDescription>
            </CardHeader>
            <CardContent>
              {mockMyApplications.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Program</TableHead>
                      <TableHead>Startup</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Current Stage</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockMyApplications.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell className="font-medium">{app.programName}</TableCell>
                        <TableCell>{app.startupName}</TableCell>
                        <TableCell>{new Date(app.submissionDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge
                            variant={app.status === "Shortlisted" ? "default" : "outline"}
                            className={cn(
                              app.status === "Under Review" && "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
                              app.status === "Shortlisted" && "bg-blue-500/20 text-blue-400 border-blue-500/30",
                            )}
                          >
                            {app.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{app.stage}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/accelerator/applications/${app.id}`}>View Details</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="mx-auto h-12 w-12 mb-3" />
                  <p className="text-lg mb-1">You haven't submitted any applications yet.</p>
                  <Button variant="link" asChild>
                    <Link href="/accelerator">Browse Programs to Apply</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="my-programs">
          <Card>
            <CardHeader>
              <CardTitle>My Enrolled Programs</CardTitle>
              <CardDescription>Manage your active participation in accelerator cohorts.</CardDescription>
            </CardHeader>
            <CardContent>
              {mockMyEnrolledPrograms.length > 0 ? (
                <div className="space-y-6">
                  {mockMyEnrolledPrograms.map((enrollment) => (
                    <Card key={enrollment.id} className="bg-card border border-border shadow-sm">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl">
                              {enrollment.programName} - {enrollment.startupName}
                            </CardTitle>
                            <CardDescription>Mentor: {enrollment.mentor}</CardDescription>
                          </div>
                          <Badge variant="secondary">Overall Progress: {enrollment.overallProgress}%</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <p className="text-sm font-medium">Current Milestone: {enrollment.currentMilestone}</p>
                            <p className="text-sm text-primary">{enrollment.milestoneProgress}%</p>
                          </div>
                          <Progress value={enrollment.milestoneProgress} className="h-2 bg-muted" />
                        </div>
                        <p className="text-sm">
                          <strong>Next Deadline:</strong> {new Date(enrollment.nextDeadline).toLocaleDateString()}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {enrollment.keyMetrics.map((metric) => (
                            <div
                              key={metric.name}
                              className="p-2 bg-muted/50 rounded-md text-xs flex justify-between items-center"
                            >
                              <span>
                                {metric.name}: <span className="font-semibold">{metric.value}</span>
                              </span>
                              <TrendingUp
                                className={cn("h-3 w-3", metric.trend === "up" ? "text-green-500" : "text-red-500")}
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2 flex-wrap pt-2">
                          <Button size="sm" asChild className="jpmc-gradient">
                            <Link href={`/accelerator/cohorts/${enrollment.id}/milestones`}>
                              <Lightbulb className="mr-2 h-4 w-4" /> Submit Milestone Update
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/mentors/${enrollment.mentorId}`}>
                              <Users className="mr-2 h-4 w-4" /> Schedule Mentor Session
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Rocket className="mx-auto h-12 w-12 mb-3" />
                  <p className="text-lg">You are not currently enrolled in any accelerator programs.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </StandardizedPageLayout>
  )
}
