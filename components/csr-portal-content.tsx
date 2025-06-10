"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, CalendarDays, Target, DollarSign, Zap } from "lucide-react" // Verified imports

const initiatives = [
  {
    id: "csr-init-1",
    name: "Community Tech Skilling Program",
    description: "Providing free tech education and workshops to underprivileged youth.",
    status: "Ongoing",
    impactArea: "Education",
    volunteersNeeded: 15,
    progress: 60,
  },
  {
    id: "csr-init-2",
    name: "Green Startup Incubation",
    description: "Supporting and funding startups focused on environmental sustainability.",
    status: "Planning",
    impactArea: "Environment",
    volunteersNeeded: 5,
    progress: 20,
  },
  {
    id: "csr-init-3",
    name: "Local Shelter Support Drive",
    description: "Collecting donations and providing support for local homeless shelters.",
    status: "Completed",
    impactArea: "Social Welfare",
    volunteersNeeded: 0,
    progress: 100,
  },
]

const events = [
  {
    id: "csr-event-1",
    name: "Volunteer Day: Coding Workshop",
    date: "2025-07-15",
    initiative: "Community Tech Skilling Program",
    location: "Community Center Hall A",
  },
  {
    id: "csr-event-2",
    name: "Sustainability Ideas Pitch Night",
    date: "2025-08-05",
    initiative: "Green Startup Incubation",
    location: "Online Event",
  },
]

const impactStats = [
  { label: "Volunteers Engaged", value: "120+", icon: Users, color: "text-blue-500" },
  { label: "Funds Raised for Causes", value: "$50,000+", icon: DollarSign, color: "text-green-500" },
  { label: "Community Projects Launched", value: "15+", icon: Target, color: "text-purple-500" },
  { label: "Lives Impacted", value: "2,000+", icon: Heart, color: "text-red-500" },
]

export function CsrPortalContent() {
  // Verified export
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center">
          <Heart className="mr-3 h-8 w-8 text-red-500" />
          Corporate Social Responsibility Portal
        </h1>
        <p className="text-muted-foreground mt-1">
          Track our initiatives, get involved, and see the impact we&apos;re making together.
        </p>
      </header>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Our Collective Impact</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {impactStats.map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Current Initiatives</h2>
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {initiatives.map((initiative) => (
            <Card key={initiative.id}>
              <CardHeader>
                <CardTitle>{initiative.name}</CardTitle>
                <CardDescription>{initiative.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <Badge
                    variant={
                      initiative.status === "Ongoing"
                        ? "default"
                        : initiative.status === "Completed"
                          ? "outline"
                          : "secondary"
                    }
                  >
                    {initiative.status}
                  </Badge>
                  <span className="text-muted-foreground">Impact: {initiative.impactArea}</span>
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Progress</span>
                    <span>{initiative.progress}%</span>
                  </div>
                  <Progress value={initiative.progress} aria-label={`${initiative.name} progress`} />
                </div>
                {initiative.status !== "Completed" && (
                  <p className="text-sm text-muted-foreground">
                    {initiative.volunteersNeeded > 0
                      ? `${initiative.volunteersNeeded} volunteers needed`
                      : "Fully staffed"}
                  </p>
                )}
                <Button variant="outline" size="sm" className="w-full">
                  <Zap className="mr-2 h-4 w-4" /> Learn More & Participate
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Related Initiative</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.name}</TableCell>
                  <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                  <TableCell>{event.initiative}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <CalendarDays className="mr-2 h-4 w-4" /> Add to Calendar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {events.length === 0 && (
            <CardContent className="py-8 text-center text-muted-foreground">
              No upcoming events scheduled. Check back soon!
            </CardContent>
          )}
        </Card>
      </section>

      <section>
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>Want to Make a Difference?</CardTitle>
            <CardDescription>
              There are many ways to contribute to our CSR efforts. Explore opportunities or suggest a new initiative.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4">
            <Button size="lg">
              <Users className="mr-2 h-5 w-5" /> View Volunteering Opportunities
            </Button>
            <Button variant="outline" size="lg">
              Suggest a CSR Initiative
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
