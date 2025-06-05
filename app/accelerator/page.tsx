import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, FileText, Lightbulb, PlusCircle, Rocket, Users, Zap } from "lucide-react"
import Link from "next/link"

const mockAcceleratorPrograms = [
  {
    id: "prog001",
    name: "FinTech FastTrack",
    focus: "FinTech",
    duration: "12 Weeks",
    status: "Accepting Applications",
    nextCohort: "2025 Q3",
    slots: 20,
    applications: 150,
  },
  {
    id: "prog002",
    name: "HealthTech Innovators",
    focus: "HealthTech",
    duration: "16 Weeks",
    status: "In Progress",
    currentCohort: "2025 Q1",
    slots: 15,
    applications: 120,
  },
  {
    id: "prog003",
    name: "AI Launchpad",
    focus: "Artificial Intelligence",
    duration: "14 Weeks",
    status: "Planning",
    nextCohort: "2025 Q4",
    slots: 18,
    applications: 0,
  },
]

const mockMyApplications = [
  {
    id: "app001",
    programName: "FinTech FastTrack",
    startupName: "PayPulse",
    submissionDate: "2025-05-15",
    status: "Under Review",
    nextStep: "Interview",
  },
  {
    id: "app002",
    programName: "AI Launchpad",
    startupName: "CogniCore",
    submissionDate: "2025-04-20",
    status: "Shortlisted",
    nextStep: "Pitch Deck Submission",
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
  },
]

export default function AcceleratorPage() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl flex items-center gap-2">
            <Zap className="h-8 w-8 text-primary" /> Accelerator Hub
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover, apply, and manage your journey through our startup accelerator programs.
          </p>
        </div>
        <Button asChild className="jpmc-gradient">
          <Link href="/accelerator/apply">
            {" "}
            {/* Assuming a general application page or specific program links */}
            <PlusCircle className="mr-2 h-4 w-4" /> Apply to a Program
          </Link>
        </Button>
      </header>

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
                  <Card key={program.id} className="flex flex-col">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-1">
                        <Rocket className="h-5 w-5 text-primary" />
                        <CardTitle className="text-xl">{program.name}</CardTitle>
                      </div>
                      <CardDescription>
                        {program.focus} &bull; {program.duration}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm flex-grow">
                      <p>
                        <strong>Status:</strong>{" "}
                        <span className={program.status === "Accepting Applications" ? "text-green-600" : ""}>
                          {program.status}
                        </span>
                      </p>
                      <p>
                        <strong>Next/Current Cohort:</strong> {program.nextCohort || program.currentCohort}
                      </p>
                      <p>
                        <strong>Slots Available:</strong> {program.slots}
                      </p>
                      <p>
                        <strong>Applications Received:</strong> {program.applications}
                      </p>
                    </CardContent>
                    <div className="p-4 pt-0">
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link href={`/accelerator/programs/${program.id}`}>
                          {" "}
                          {/* Placeholder link */}
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
                      <TableHead>Next Step</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockMyApplications.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell className="font-medium">{app.programName}</TableCell>
                        <TableCell>{app.startupName}</TableCell>
                        <TableCell>{app.submissionDate}</TableCell>
                        <TableCell>
                          <span
                            className={cn(
                              "px-2 py-0.5 rounded-full text-xs",
                              app.status === "Under Review"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-blue-100 text-blue-700",
                            )}
                          >
                            {app.status}
                          </span>
                        </TableCell>
                        <TableCell>{app.nextStep}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/accelerator/applications/${app.id}`}>
                              {" "}
                              {/* Placeholder link */}
                              View Details
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
                  <p>You haven't submitted any applications yet.</p>
                  <Button variant="link" asChild className="mt-2">
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
                    <Card key={enrollment.id} className="bg-muted/30">
                      <CardHeader>
                        <CardTitle className="text-xl">
                          {enrollment.programName} - {enrollment.startupName}
                        </CardTitle>
                        <CardDescription>Mentor: {enrollment.mentor}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <p className="text-sm font-medium">Current Milestone: {enrollment.currentMilestone}</p>
                            <p className="text-sm text-muted-foreground">{enrollment.milestoneProgress}%</p>
                          </div>
                          <Progress value={enrollment.milestoneProgress} className="h-2" />
                        </div>
                        <p className="text-sm">
                          <strong>Next Deadline:</strong> {enrollment.nextDeadline}
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          <Button size="sm" asChild>
                            <Link href={`/accelerator/cohorts/${enrollment.id}/milestones`}>
                              {" "}
                              {/* Placeholder link */}
                              <Lightbulb className="mr-2 h-4 w-4" /> Submit Milestone Update
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link
                              href={`/mentors/${enrollment.mentor.toLowerCase().replace("dr. ", "").replace(" ", "-")}`}
                            >
                              {" "}
                              {/* Placeholder link */}
                              <Users className="mr-2 h-4 w-4" /> Schedule Mentor Session
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Zap className="mx-auto h-12 w-12 mb-2" />
                  <p>You are not currently enrolled in any accelerator programs.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
