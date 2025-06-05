"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CohortManagement } from "@/components/accelerator/cohort-management"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Briefcase, Users, Target, TrendingUp, Plus, Calendar, Clock } from "lucide-react"
import Link from "next/link"

const programStats = [
  {
    title: "Active Programs",
    value: "8",
    change: "+2 from last quarter",
    icon: Briefcase,
  },
  {
    title: "Total Participants",
    value: "156",
    change: "+23 this quarter",
    icon: Users,
  },
  {
    title: "Graduation Rate",
    value: "87%",
    change: "+5% from last cohort",
    icon: Target,
  },
  {
    title: "Success Rate",
    value: "92%",
    change: "Funding secured post-program",
    icon: TrendingUp,
  },
]

const activePrograms = [
  {
    id: "prog-001",
    name: "FinTech FastTrack",
    type: "Accelerator",
    duration: "12 weeks",
    currentCohorts: 2,
    totalParticipants: 28,
    status: "Active",
    nextIntake: "2025-09-01",
  },
  {
    id: "prog-002",
    name: "HealthTech Innovators",
    type: "Accelerator",
    duration: "16 weeks",
    currentCohorts: 1,
    totalParticipants: 15,
    status: "Active",
    nextIntake: "2025-08-15",
  },
  {
    id: "prog-003",
    name: "AI Launchpad",
    type: "Incubator",
    duration: "6 months",
    currentCohorts: 1,
    totalParticipants: 12,
    status: "Planning",
    nextIntake: "2025-10-01",
  },
]

export default function ProgramsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Program Management</h1>
          <p className="text-muted-foreground">Manage accelerator and incubation programs</p>
        </div>
        <Button asChild className="jpmc-gradient">
          <Link href="/programs/new">
            <Plus className="mr-2 h-4 w-4" />
            Create New Program
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {programStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="cohorts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="cohorts">Cohort Management</TabsTrigger>
          <TabsTrigger value="programs">Program Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="cohorts" className="space-y-6">
          <CohortManagement />
        </TabsContent>

        <TabsContent value="programs" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activePrograms.map((program) => (
              <Card key={program.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{program.name}</CardTitle>
                      <CardDescription>
                        {program.type} • {program.duration}
                      </CardDescription>
                    </div>
                    <Badge variant={program.status === "Active" ? "default" : "secondary"}>{program.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Active Cohorts</p>
                      <p className="font-medium">{program.currentCohorts}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Participants</p>
                      <p className="font-medium">{program.totalParticipants}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Next Intake</p>
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-3 w-3" />
                      {new Date(program.nextIntake).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/programs/${program.id}`}>View Details</Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/programs/${program.id}/edit`}>Edit</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Program Performance</CardTitle>
                <CardDescription>Success metrics across all programs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Graduation Rate</span>
                      <span>87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Funding Success</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Mentor Satisfaction</span>
                      <span>94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Milestones</CardTitle>
                <CardDescription>Key dates across all programs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">FinTech Q1 Demo Day</p>
                      <p className="text-xs text-muted-foreground">March 15, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">HealthTech Graduation</p>
                      <p className="text-xs text-muted-foreground">April 20, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <div>
                      <p className="text-sm font-medium">AI Launchpad Intake</p>
                      <p className="text-xs text-muted-foreground">October 1, 2025</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
