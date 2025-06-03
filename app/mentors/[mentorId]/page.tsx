"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Star,
  Users,
  Briefcase,
  CalendarDays,
  Linkedin,
  MessageSquare,
  Edit,
  ShieldCheck,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { ProvideMentorFeedbackModal } from "@/components/provide-mentor-feedback-modal" // Assume this exists
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock data for a single mentor - in a real app, this would be fetched
const mockMentorDetails = {
  id: "M001",
  name: "Ananya Sharma",
  title: "FinTech Growth Strategist",
  avatarUrl: "/placeholder.svg?height=128&width=128",
  expertise: ["FinTech", "Scale-ups", "VC Funding", "GTM Strategy", "Product Management", "Market Entry"],
  rating: 4.8,
  startupsMentoredInternal: 12,
  startupsMentoredExternal: 8,
  successRate: "85%",
  avgMentorshipDuration: "9 months",
  currentMentees: 3,
  maxMentees: 5,
  availability: "Available", // "Available", "Limited", "Unavailable"
  linkedin: "https://linkedin.com/in/ananya-sharma-mentor",
  bio: "Seasoned FinTech expert with 15+ years of experience in scaling startups from seed to Series B. Passionate about helping founders navigate complex financial landscapes, build robust product strategies, and achieve sustainable growth. Active in multiple accelerator programs and an angel investor in early-stage tech companies. Proven track record of guiding companies through successful funding rounds and market expansion.",
  specializations: ["Market Entry Strategy", "Fundraising & Pitching", "Product-Market Fit", "Team Building"],
  industryExperience: ["Banking & Payments", "Investment Tech", "RegTech", "InsurTech"],
  joinedDate: "2022-03-15",
  // Placeholder for feedback that would be fetched if the current user is this mentor
  confidentialFeedbackSummary: [
    {
      startupName: "Innovatech",
      rating: 4.5,
      commentSnippet: "Ananya was instrumental in our seed round...",
      date: "2023-11-20",
    },
    {
      startupName: "PaySwift",
      rating: 5,
      commentSnippet: "Her insights on GTM strategy were invaluable...",
      date: "2023-08-05",
    },
  ],
}

export default function MentorDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const mentorId = params.mentorId as string

  const [mentor, setMentor] = useState(mockMentorDetails) // In real app, fetch by ID
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false)

  // Simulate fetching data
  useEffect(() => {
    if (mentorId) {
      // Replace with actual fetch logic
      const fetchedMentor = { ...mockMentorDetails, id: mentorId } // Simulate finding by ID
      setMentor(fetchedMentor)
    }
  }, [mentorId])

  if (!mentor) {
    return <div className="p-6 text-center">Loading mentor details...</div>
  }

  const handleRequestMentorship = () => {
    toast({
      title: "Mentorship Request (Simulated)",
      description: `Your request to connect with ${mentor.name} has been sent.`,
    })
  }

  // Simulate if the current user is this mentor (for viewing confidential feedback)
  const isCurrentUserThisMentor = true // In a real app, this would be based on auth

  return (
    <TooltipProvider>
      <div className="space-y-6 p-4 md:p-6">
        <Button variant="outline" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Mentors
        </Button>

        <Card>
          <CardHeader className="flex flex-col md:flex-row items-start gap-6">
            <Avatar className="h-32 w-32 border-4 border-primary">
              <AvatarImage src={mentor.avatarUrl || "/placeholder.svg"} alt={mentor.name} />
              <AvatarFallback className="text-4xl">
                {mentor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-3xl">{mentor.name}</CardTitle>
              <CardDescription className="text-lg text-muted-foreground">{mentor.title}</CardDescription>
              <div className="mt-2 flex items-center gap-2 text-sm">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span>{mentor.rating}/5.0</span>
                <span className="text-muted-foreground">
                  ({mentor.startupsMentoredInternal + mentor.startupsMentoredExternal} mentees total)
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {mentor.expertise.slice(0, 5).map((exp) => (
                  <Badge key={exp} variant="secondary">
                    {exp}
                  </Badge>
                ))}
                {mentor.expertise.length > 5 && <Badge variant="outline">+{mentor.expertise.length - 5} more</Badge>}
              </div>
              <div className="mt-4 flex gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="default" onClick={handleRequestMentorship} className="jpmc-gradient text-white">
                      <MessageSquare className="mr-2 h-4 w-4" /> Request Mentorship
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Send a request to connect with this mentor.</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" onClick={() => setIsFeedbackModalOpen(true)}>
                      <Edit className="mr-2 h-4 w-4" /> Provide Feedback
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Provide feedback if you've been mentored by {mentor.name}.</p>
                  </TooltipContent>
                </Tooltip>
                {mentor.linkedin && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" asChild>
                        <a href={mentor.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-5 w-5" />
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View LinkedIn Profile</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="mt-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">About {mentor.name.split(" ")[0]}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{mentor.bio}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Key Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <Briefcase className="mr-3 h-5 w-5 text-primary" />
                    <span className="font-semibold">Specializations:</span>&nbsp;{mentor.specializations.join(", ")}
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-3 h-5 w-5 text-primary" />
                    <span className="font-semibold">Industry Experience:</span>&nbsp;
                    {mentor.industryExperience.join(", ")}
                  </div>
                  <div className="flex items-center">
                    <Star className="mr-3 h-5 w-5 text-primary" />
                    <span className="font-semibold">Success Rate:</span>&nbsp;{mentor.successRate} (e.g., mentored
                    startups funded)
                  </div>
                  <div className="flex items-center">
                    <CalendarDays className="mr-3 h-5 w-5 text-primary" />
                    <span className="font-semibold">Avg. Mentorship:</span>&nbsp;{mentor.avgMentorshipDuration}
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-3 h-5 w-5 text-primary" />
                    <span className="font-semibold">Availability:</span>&nbsp;
                    <Badge
                      variant={
                        mentor.availability === "Available"
                          ? "default"
                          : mentor.availability === "Limited"
                            ? "outline"
                            : "destructive"
                      }
                      className={mentor.availability === "Available" ? "bg-green-500 text-white" : ""}
                    >
                      {mentor.availability} ({mentor.currentMentees}/{mentor.maxMentees} slots filled)
                    </Badge>
                  </div>
                  <div className="flex items-center">
                    <CalendarDays className="mr-3 h-5 w-5 text-primary" />
                    <span className="font-semibold">Joined:</span>&nbsp;
                    {new Date(mentor.joinedDate).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            </div>

            {isCurrentUserThisMentor && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <ShieldCheck className="mr-2 h-5 w-5 text-primary" /> Received Feedback (Confidential)
                  </CardTitle>
                  <CardDescription>
                    Summary of feedback from startups you've mentored. Visible only to you and administrators.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {mentor.confidentialFeedbackSummary && mentor.confidentialFeedbackSummary.length > 0 ? (
                    <ul className="space-y-3">
                      {mentor.confidentialFeedbackSummary.map((fb, index) => (
                        <li key={index} className="p-3 border rounded-md bg-muted/30">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold">
                              {fb.startupName} - Rated: {fb.rating}/5
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(fb.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1 italic">"{fb.commentSnippet}"</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No feedback received yet.</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-4">
                    (This is a simulated view. In a real application, detailed feedback would be securely managed and
                    displayed here.)
                  </p>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        <ProvideMentorFeedbackModal
          isOpen={isFeedbackModalOpen}
          onClose={() => setIsFeedbackModalOpen(false)}
          mentorName={mentor.name}
          onSubmit={(feedbackData) => {
            console.log("Feedback Submitted (Simulated):", feedbackData)
            toast({
              title: "Feedback Submitted!",
              description: `Thank you for your feedback on ${mentor.name}. (Simulated)`,
            })
          }}
        />
      </div>
    </TooltipProvider>
  )
}
