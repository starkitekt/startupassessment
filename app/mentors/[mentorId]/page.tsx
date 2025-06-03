"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Star, Users, Briefcase, LinkIcon, MessageCircle, CalendarDays, Edit, UserPlus } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

// Find mentor from mock data based on ID
const getMentorDetails = (id: string) => {
  const mockMentorsList = [
    // Same as in mentors-content.tsx
    {
      id: "M001",
      name: "Ananya Sharma",
      title: "FinTech Growth Strategist",
      avatarUrl: "/placeholder.svg?height=128&width=128",
      expertise: ["FinTech", "Scale-ups", "VC Funding", "GTM Strategy"],
      rating: 4.8,
      startupsMentoredInternal: 12,
      startupsMentoredExternal: 8,
      successRate: "85%",
      avgMentorshipDuration: "9 months",
      currentMentees: 3,
      availability: "Available",
      linkedin: "linkedin.com/in/ananya-sharma-mentor",
      bio: "Seasoned FinTech expert with 15+ years of experience in scaling startups. Passionate about helping founders navigate complex financial landscapes and achieve sustainable growth. Active in multiple accelerator programs.",
      specializations: ["Market Entry", "Fundraising Strategy", "Product-Market Fit"],
      industryExperience: ["Banking", "Investment Tech", "RegTech"],
      mentees: [
        { id: "STP001", name: "Innovatech" },
        { id: "STP005", name: "Retail Rocket" },
      ],
      engagementLog: [{ date: "2024-05-01", startup: "Innovatech", notes: "Reviewed Q2 roadmap." }],
    },
    {
      id: "M002",
      name: "Vikram Singh",
      title: "AI & ML Product Lead",
      avatarUrl: "/placeholder.svg?height=128&width=128",
      expertise: ["AI/ML", "Product Management", "SaaS", "Deep Tech"],
      rating: 4.5,
      startupsMentoredInternal: 8,
      startupsMentoredExternal: 5,
      successRate: "75%",
      avgMentorshipDuration: "12 months",
      currentMentees: 2,
      availability: "Limited",
      linkedin: "linkedin.com/in/vikram-singh-ai",
      bio: "Product leader with a strong background in AI and Machine Learning. Helped launch multiple successful SaaS products. Currently advising select startups on tech roadmaps and product strategy.",
      specializations: ["AI Ethics", "MLOps", "Technical Due Diligence"],
      industryExperience: ["Software Development", "Healthcare AI", "Enterprise SaaS"],
      mentees: [{ id: "STP002", name: "HealthWell AI" }],
      engagementLog: [{ date: "2024-04-15", startup: "HealthWell AI", notes: "Discussed AI model scaling." }],
    },
  ]
  return mockMentorsList.find((m) => m.id === id) || null
}

export default function MentorDetailPage() {
  const params = useParams()
  const mentorId = params.mentorId as string
  const mentor = getMentorDetails(mentorId)
  const router = useRouter()
  const { toast } = useToast()

  if (!mentor) {
    return (
      <div className="text-center py-10">
        <p>Mentor not found.</p>
        <Button onClick={() => router.push("/mentors")} className="mt-4">
          Back to Mentors
        </Button>
      </div>
    )
  }

  const handleEditMentor = () => {
    toast({ title: "Edit Mentor", description: `Editing profile for ${mentor.name} (simulated).` })
  }
  const handleAssignStartup = () => {
    toast({ title: "Assign Startup", description: `Opening modal to assign a startup to ${mentor.name} (simulated).` })
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Mentors
      </Button>
      <Card>
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6">
          <Avatar className="h-32 w-32 border-4 border-primary">
            <AvatarImage src={mentor.avatarUrl || "/placeholder.svg"} alt={mentor.name} />
            <AvatarFallback>
              {mentor.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-3xl">{mentor.name}</CardTitle>
                <CardDescription className="text-lg text-muted-foreground">{mentor.title}</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={handleEditMentor}>
                <Edit className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <div className="flex items-center">
                <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" /> {mentor.rating}/5.0
              </div>
              <div className="flex items-center">
                <Users className="mr-1 h-4 w-4 text-muted-foreground" />{" "}
                {mentor.startupsMentoredInternal + mentor.startupsMentoredExternal} Total Mentees
              </div>
              <div className="flex items-center">
                <Briefcase className="mr-1 h-4 w-4 text-muted-foreground" /> Success Rate: {mentor.successRate}
              </div>
              <a
                href={`https://${mentor.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-primary hover:underline"
              >
                <LinkIcon className="mr-1 h-4 w-4" /> LinkedIn
              </a>
            </div>
            <Badge
              variant={
                mentor.availability === "Available"
                  ? "default"
                  : mentor.availability === "Limited"
                    ? "outline"
                    : "destructive"
              }
              className={cn(
                "mt-3 text-xs",
                mentor.availability === "Available" ? "bg-charting-positive text-white" : "",
              )}
            >
              <CalendarDays className="mr-1.5 h-3.5 w-3.5" /> Availability: {mentor.availability}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
              <TabsTrigger value="expertise">Expertise</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold">About {mentor.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{mentor.bio}</p>
              <div>
                <h4 className="font-semibold text-sm mb-1">Industry Experience:</h4>
                <div className="flex flex-wrap gap-2">
                  {mentor.industryExperience.map((ind) => (
                    <Badge key={ind} variant="secondary" className="text-xs">
                      {ind}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="engagement" className="mt-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Mentorship Engagement</h3>
                <Button size="sm" onClick={handleAssignStartup}>
                  <UserPlus className="mr-2 h-4 w-4" /> Assign New Startup
                </Button>
              </div>
              <CardDescription>Track record of startups mentored and engagement logs.</CardDescription>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <p>
                  <strong>Internal Mentees:</strong> {mentor.startupsMentoredInternal}
                </p>
                <p>
                  <strong>External Mentees:</strong> {mentor.startupsMentoredExternal}
                </p>
                <p>
                  <strong>Avg. Duration:</strong> {mentor.avgMentorshipDuration}
                </p>
                <p>
                  <strong>Current Mentees:</strong> {mentor.currentMentees}
                </p>
              </div>
              <h4 className="font-semibold text-sm mt-4 mb-2">Current Mentees:</h4>
              {mentor.mentees && mentor.mentees.length > 0 ? (
                <ul className="list-disc list-inside pl-1 space-y-1 text-sm">
                  {mentor.mentees.map((mentee) => (
                    <li key={mentee.id}>
                      <Link href={`/portfolio/${mentee.id}`} className="text-primary hover:underline">
                        {mentee.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No current mentees assigned in this portal.</p>
              )}

              <h4 className="font-semibold text-sm mt-4 mb-2">Recent Engagement Log:</h4>
              {mentor.engagementLog && mentor.engagementLog.length > 0 ? (
                <div className="space-y-3">
                  {mentor.engagementLog.map((log, idx) => (
                    <div key={idx} className="p-3 border rounded-md text-sm">
                      <p className="font-medium">
                        Startup:{" "}
                        <Link
                          href={`/portfolio/${mentor.mentees?.find((m) => m.name === log.startup)?.id || "STP000"}`}
                          className="text-primary hover:underline"
                        >
                          {log.startup}
                        </Link>
                      </p>
                      <p className="text-xs text-muted-foreground">Date: {new Date(log.date).toLocaleDateString()}</p>
                      <p className="mt-1">{log.notes}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No engagement logs available.</p>
              )}
            </TabsContent>

            <TabsContent value="expertise" className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold">Areas of Expertise & Specialization</h3>
              <div>
                <h4 className="font-semibold text-sm mb-1">Core Expertise:</h4>
                <div className="flex flex-wrap gap-2">
                  {mentor.expertise.map((exp) => (
                    <Badge
                      key={exp}
                      variant="default"
                      className="bg-jpmc-blue/10 text-jpmc-darkblue hover:bg-jpmc-blue/20 text-sm px-3 py-1"
                    >
                      {exp}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1 mt-3">Specializations:</h4>
                <ul className="list-disc list-inside pl-1 space-y-1 text-sm text-muted-foreground">
                  {mentor.specializations.map((spec) => (
                    <li key={spec}>{spec}</li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="feedback" className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold">Feedback & Testimonials</h3>
              <CardDescription>Feedback received from mentored startups.</CardDescription>
              {/* Placeholder for feedback/testimonials list */}
              <div className="p-6 border-2 border-dashed rounded-md min-h-[150px] flex items-center justify-center">
                <p className="text-muted-foreground text-sm">
                  No feedback or testimonials available yet. Check back later or request feedback from mentees.
                </p>
              </div>
              <Button variant="outline" size="sm">
                <MessageCircle className="mr-2 h-4 w-4" /> Request Feedback
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
