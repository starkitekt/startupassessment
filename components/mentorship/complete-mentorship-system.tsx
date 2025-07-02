"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import {
  Users,
  Star,
  CalendarIcon,
  Clock,
  Video,
  MessageSquare,
  Target,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
} from "lucide-react"

interface Mentor {
  id: string
  name: string
  title: string
  company: string
  avatar: string
  expertise: string[]
  industries: string[]
  experience: number
  rating: number
  totalMentees: number
  activeMentees: number
  availability: "high" | "medium" | "low"
  hourlyRate?: number
  bio: string
  achievements: string[]
  languages: string[]
  timezone: string
}

interface Mentee {
  id: string
  name: string
  startupName: string
  avatar: string
  stage: string
  industry: string
  goals: string[]
  joinedDate: Date
}

interface MentorshipProgram {
  id: string
  name: string
  description: string
  duration: number
  maxMentees: number
  focusAreas: string[]
  requirements: string[]
  status: "active" | "upcoming" | "completed"
  startDate: Date
  endDate: Date
  mentors: string[]
  mentees: string[]
}

interface MentorshipSession {
  id: string
  mentorId: string
  menteeId: string
  scheduledDate: Date
  duration: number
  type: "video" | "in-person" | "phone"
  status: "scheduled" | "completed" | "cancelled" | "no-show"
  agenda: string
  notes?: string
  feedback?: {
    mentorRating: number
    menteeRating: number
    mentorComment: string
    menteeComment: string
  }
  goals: string[]
  outcomes?: string[]
}

interface Goal {
  id: string
  mentorshipId: string
  title: string
  description: string
  category: "business" | "technical" | "personal" | "financial"
  targetDate: Date
  status: "not-started" | "in-progress" | "completed" | "blocked"
  progress: number
  milestones: Milestone[]
}

interface Milestone {
  id: string
  title: string
  description: string
  dueDate: Date
  completed: boolean
  completedDate?: Date
}

export function CompleteMentorshipSystem() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null)
  const [selectedProgram, setSelectedProgram] = useState<MentorshipProgram | null>(null)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterExpertise, setFilterExpertise] = useState<string[]>([])
  const { toast } = useToast()

  // Mock data
  const [mentors, setMentors] = useState<Mentor[]>([
    {
      id: "mentor-1",
      name: "Sarah Johnson",
      title: "Former CTO",
      company: "TechGrowth Inc.",
      avatar: "/placeholder.svg?height=100&width=100",
      expertise: ["Technical Leadership", "Product Development", "Scaling", "Team Building"],
      industries: ["SaaS", "Fintech", "AI/ML"],
      experience: 12,
      rating: 4.8,
      totalMentees: 45,
      activeMentees: 8,
      availability: "medium",
      hourlyRate: 200,
      bio: "Former CTO with 12+ years of experience scaling tech startups from seed to Series C. Specialized in building engineering teams and technical architecture for rapid growth.",
      achievements: ["Scaled team from 5 to 50 engineers", "Led 3 successful exits", "Published 15 technical papers"],
      languages: ["English", "Spanish"],
      timezone: "PST",
    },
    {
      id: "mentor-2",
      name: "Michael Chen",
      title: "Angel Investor",
      company: "Horizon Ventures",
      avatar: "/placeholder.svg?height=100&width=100",
      expertise: ["Fundraising", "Go-to-Market", "Financial Modeling", "Strategy"],
      industries: ["E-commerce", "Marketplaces", "Consumer"],
      experience: 8,
      rating: 4.6,
      totalMentees: 32,
      activeMentees: 6,
      availability: "high",
      hourlyRate: 150,
      bio: "Angel investor who has funded 20+ early-stage startups. Previously founded and exited two e-commerce companies. Passionate about helping founders navigate early growth challenges.",
      achievements: ["20+ successful investments", "2 unicorn exits", "Forbes 30 Under 30"],
      languages: ["English", "Mandarin"],
      timezone: "EST",
    },
  ])

  const [programs, setPrograms] = useState<MentorshipProgram[]>([
    {
      id: "program-1",
      name: "Seed Stage Accelerator",
      description: "12-week intensive program for seed-stage startups",
      duration: 12,
      maxMentees: 20,
      focusAreas: ["Product-Market Fit", "Fundraising", "Team Building"],
      requirements: ["Pre-seed or seed stage", "B2B SaaS focus", "Full-time commitment"],
      status: "active",
      startDate: new Date("2024-01-15"),
      endDate: new Date("2024-04-15"),
      mentors: ["mentor-1", "mentor-2"],
      mentees: ["mentee-1", "mentee-2"],
    },
  ])

  const [sessions, setSessions] = useState<MentorshipSession[]>([
    {
      id: "session-1",
      mentorId: "mentor-1",
      menteeId: "mentee-1",
      scheduledDate: new Date("2024-01-25T10:00:00"),
      duration: 60,
      type: "video",
      status: "scheduled",
      agenda: "Discuss product roadmap and technical architecture decisions",
      goals: ["Define Q1 product milestones", "Review technical debt priorities"],
    },
  ])

  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "goal-1",
      mentorshipId: "mentorship-1",
      title: "Achieve Product-Market Fit",
      description: "Validate product-market fit through customer interviews and metrics",
      category: "business",
      targetDate: new Date("2024-03-15"),
      status: "in-progress",
      progress: 65,
      milestones: [
        {
          id: "milestone-1",
          title: "Complete 50 customer interviews",
          description: "Conduct interviews with target customers to validate assumptions",
          dueDate: new Date("2024-02-01"),
          completed: true,
          completedDate: new Date("2024-01-28"),
        },
        {
          id: "milestone-2",
          title: "Achieve 40% retention rate",
          description: "Improve product to achieve 40% monthly retention",
          dueDate: new Date("2024-02-15"),
          completed: false,
        },
      ],
    },
  ])

  const handleScheduleSession = async (mentorId: string, menteeId: string, sessionData: any) => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newSession: MentorshipSession = {
        id: `session-${Date.now()}`,
        mentorId,
        menteeId,
        scheduledDate: sessionData.date,
        duration: sessionData.duration,
        type: sessionData.type,
        status: "scheduled",
        agenda: sessionData.agenda,
        goals: sessionData.goals || [],
      }

      setSessions([...sessions, newSession])

      toast({
        title: "Session scheduled",
        description: "Mentorship session has been scheduled successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule session",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateGoal = async (goalData: Partial<Goal>) => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      const newGoal: Goal = {
        id: `goal-${Date.now()}`,
        mentorshipId: goalData.mentorshipId || "",
        title: goalData.title || "",
        description: goalData.description || "",
        category: goalData.category || "business",
        targetDate: goalData.targetDate || new Date(),
        status: "not-started",
        progress: 0,
        milestones: [],
      }

      setGoals([...goals, newGoal])

      toast({
        title: "Goal created",
        description: "New mentorship goal has been created",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create goal",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "high":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.expertise.some((exp) => exp.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesExpertise =
      filterExpertise.length === 0 || filterExpertise.some((exp) => mentor.expertise.includes(exp))
    return matchesSearch && matchesExpertise
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mentorship Management</h1>
          <p className="text-muted-foreground">Connect mentors with startups for guided growth</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Program
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="mentors">Mentors</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Mentors</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mentors.length}</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Programs</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{programs.filter((p) => p.status === "active").length}</div>
                <p className="text-xs text-muted-foreground">1 starting next week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sessions This Week</CardTitle>
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sessions.length}</div>
                <p className="text-xs text-muted-foreground">+12% from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.7</div>
                <p className="text-xs text-muted-foreground">+0.2 from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sessions.slice(0, 3).map((session) => {
                    const mentor = mentors.find((m) => m.id === session.mentorId)
                    return (
                      <div key={session.id} className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={mentor?.avatar || "/placeholder.svg"} alt={mentor?.name} />
                          <AvatarFallback>
                            {mentor?.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">{mentor?.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {session.scheduledDate.toLocaleDateString()} at {session.scheduledDate.toLocaleTimeString()}
                          </p>
                        </div>
                        <Badge variant="outline">{session.type}</Badge>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Mentors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mentors.slice(0, 3).map((mentor) => (
                    <div key={mentor.id} className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={mentor.avatar || "/placeholder.svg"} alt={mentor.name} />
                        <AvatarFallback>
                          {mentor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{mentor.name}</p>
                        <div className="flex items-center space-x-2">
                          <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-xs">{mentor.rating}</span>
                          <span className="text-xs text-muted-foreground">({mentor.totalMentees} mentees)</span>
                        </div>
                      </div>
                      <Badge className={getAvailabilityColor(mentor.availability)}>{mentor.availability}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="mentors" className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search mentors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by expertise" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Expertise</SelectItem>
                <SelectItem value="technical">Technical Leadership</SelectItem>
                <SelectItem value="fundraising">Fundraising</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="product">Product Development</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredMentors.map((mentor) => (
              <Card key={mentor.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={mentor.avatar || "/placeholder.svg"} alt={mentor.name} />
                      <AvatarFallback>
                        {mentor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <h3 className="font-semibold">{mentor.name}</h3>
                      <p className="text-sm text-muted-foreground">{mentor.title}</p>
                      <p className="text-xs text-muted-foreground">{mentor.company}</p>
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-medium">{mentor.rating}</span>
                        <span className="text-xs text-muted-foreground">({mentor.totalMentees} mentees)</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Expertise</h4>
                    <div className="flex flex-wrap gap-1">
                      {mentor.expertise.slice(0, 3).map((exp) => (
                        <Badge key={exp} variant="secondary" className="text-xs">
                          {exp}
                        </Badge>
                      ))}
                      {mentor.expertise.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{mentor.expertise.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Industries</h4>
                    <div className="flex flex-wrap gap-1">
                      {mentor.industries.map((industry) => (
                        <Badge key={industry} variant="outline" className="text-xs">
                          {industry}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Experience:</span>
                    <span>{mentor.experience} years</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Active Mentees:</span>
                    <span>
                      {mentor.activeMentees}/{mentor.activeMentees + 2}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge className={getAvailabilityColor(mentor.availability)}>
                      {mentor.availability} availability
                    </Badge>
                    {mentor.hourlyRate && <span className="text-sm font-medium">${mentor.hourlyRate}/hr</span>}
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">
                      View Profile
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="programs" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Mentorship Programs</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Program
            </Button>
          </div>

          <div className="grid gap-6">
            {programs.map((program) => (
              <Card key={program.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span>{program.name}</span>
                        <Badge
                          className={
                            program.status === "active"
                              ? "bg-green-100 text-green-800"
                              : program.status === "upcoming"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                          }
                        >
                          {program.status}
                        </Badge>
                      </CardTitle>
                      <CardDescription>{program.description}</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Duration:</span>
                      <p className="font-medium">{program.duration} weeks</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Mentees:</span>
                      <p className="font-medium">
                        {program.mentees.length}/{program.maxMentees}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Start Date:</span>
                      <p className="font-medium">{program.startDate.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">End Date:</span>
                      <p className="font-medium">{program.endDate.toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Focus Areas</h4>
                    <div className="flex flex-wrap gap-1">
                      {program.focusAreas.map((area) => (
                        <Badge key={area} variant="secondary">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Requirements</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {program.requirements.map((req, index) => (
                        <li key={index}>• {req}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm">View Details</Button>
                    <Button size="sm" variant="outline">
                      Manage
                    </Button>
                    {program.status === "active" && (
                      <Button size="sm" variant="outline">
                        <Users className="mr-2 h-4 w-4" />
                        View Participants
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Mentorship Sessions</h2>
            <Button>
              <CalendarIcon className="mr-2 h-4 w-4" />
              Schedule Session
            </Button>
          </div>

          <div className="grid gap-4">
            {sessions.map((session) => {
              const mentor = mentors.find((m) => m.id === session.mentorId)
              return (
                <Card key={session.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={mentor?.avatar || "/placeholder.svg"} alt={mentor?.name} />
                          <AvatarFallback>
                            {mentor?.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                          <h3 className="font-semibold">{mentor?.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <CalendarIcon className="mr-1 h-4 w-4" />
                              {session.scheduledDate.toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <Clock className="mr-1 h-4 w-4" />
                              {session.scheduledDate.toLocaleTimeString()} ({session.duration}min)
                            </div>
                            <div className="flex items-center">
                              {session.type === "video" && <Video className="mr-1 h-4 w-4" />}
                              {session.type === "phone" && <MessageSquare className="mr-1 h-4 w-4" />}
                              {session.type}
                            </div>
                          </div>
                          <p className="text-sm">{session.agenda}</p>
                          {session.goals.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {session.goals.map((goal, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {goal}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          className={
                            session.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : session.status === "scheduled"
                                ? "bg-blue-100 text-blue-800"
                                : session.status === "cancelled"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                          }
                        >
                          {session.status}
                        </Badge>
                        {session.status === "scheduled" && (
                          <Button size="sm">{session.type === "video" ? "Join Call" : "View Details"}</Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Mentorship Goals</h2>
            <Button>
              <Target className="mr-2 h-4 w-4" />
              Create Goal
            </Button>
          </div>

          <div className="grid gap-6">
            {goals.map((goal) => (
              <Card key={goal.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span>{goal.title}</span>
                        <Badge variant="outline">{goal.category}</Badge>
                      </CardTitle>
                      <CardDescription>{goal.description}</CardDescription>
                    </div>
                    <Badge
                      className={
                        goal.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : goal.status === "in-progress"
                            ? "bg-blue-100 text-blue-800"
                            : goal.status === "blocked"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                      }
                    >
                      {goal.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Target Date:</span>
                    <span>{goal.targetDate.toLocaleDateString()}</span>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Milestones</h4>
                    <div className="space-y-2">
                      {goal.milestones.map((milestone) => (
                        <div key={milestone.id} className="flex items-center space-x-2 text-sm">
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center ${
                              milestone.completed ? "bg-green-500" : "bg-gray-200"
                            }`}
                          >
                            {milestone.completed && <span className="text-white text-xs">✓</span>}
                          </div>
                          <span className={milestone.completed ? "line-through text-muted-foreground" : ""}>
                            {milestone.title}
                          </span>
                          <span className="text-muted-foreground">- Due: {milestone.dueDate.toLocaleDateString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm">Update Progress</Button>
                    <Button size="sm" variant="outline">
                      Add Milestone
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
