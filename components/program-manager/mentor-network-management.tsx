"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  Plus,
  Users,
  Star,
  Calendar,
  MessageSquare,
  Phone,
  Mail,
  Building2,
  TrendingUp,
  UserPlus,
  Settings,
} from "lucide-react"

interface Mentor {
  id: string
  name: string
  avatar: string
  title: string
  company: string
  expertise: string[]
  experience: number
  rating: number
  totalSessions: number
  activeStartups: number
  availability: "high" | "medium" | "low"
  location: string
  languages: string[]
  bio: string
  achievements: string[]
  contactInfo: {
    email: string
    phone: string
    linkedin: string
  }
  mentorshipStats: {
    successRate: number
    avgSessionRating: number
    responseTime: number
    completionRate: number
  }
  currentAssignments: Assignment[]
}

interface Assignment {
  startupId: string
  startupName: string
  startupLogo: string
  assignedDate: string
  lastSession: string
  nextSession: string
  progress: number
  status: "active" | "completed" | "paused"
  focus: string[]
}

const mockMentors: Mentor[] = [
  {
    id: "1",
    name: "David Wilson",
    avatar: "/placeholder.svg?height=40&width=40&text=DW",
    title: "Senior Product Manager",
    company: "Google",
    expertise: ["Product Strategy", "User Experience", "Growth Hacking", "Team Leadership"],
    experience: 12,
    rating: 4.9,
    totalSessions: 156,
    activeStartups: 3,
    availability: "high",
    location: "San Francisco, CA",
    languages: ["English", "Spanish"],
    bio: "Experienced product leader with 12+ years at top tech companies. Passionate about helping startups build products that users love.",
    achievements: ["Led 3 successful product launches", "Mentored 50+ startups", "TEDx Speaker"],
    contactInfo: {
      email: "david.wilson@email.com",
      phone: "+1-555-0101",
      linkedin: "linkedin.com/in/davidwilson",
    },
    mentorshipStats: {
      successRate: 85,
      avgSessionRating: 4.8,
      responseTime: 2,
      completionRate: 92,
    },
    currentAssignments: [
      {
        startupId: "1",
        startupName: "TechNova",
        startupLogo: "/placeholder.svg?height=32&width=32&text=TN",
        assignedDate: "2024-01-15",
        lastSession: "2 days ago",
        nextSession: "Tomorrow",
        progress: 75,
        status: "active",
        focus: ["Product Strategy", "User Research"],
      },
      {
        startupId: "2",
        startupName: "FinanceFlow",
        startupLogo: "/placeholder.svg?height=32&width=32&text=FF",
        assignedDate: "2024-02-01",
        lastSession: "1 week ago",
        nextSession: "In 3 days",
        progress: 60,
        status: "active",
        focus: ["Growth Strategy", "Team Building"],
      },
    ],
  },
  {
    id: "2",
    name: "Dr. Jennifer Lee",
    avatar: "/placeholder.svg?height=40&width=40&text=JL",
    title: "Chief Medical Officer",
    company: "HealthTech Innovations",
    expertise: ["Healthcare Technology", "Regulatory Affairs", "Clinical Trials", "Medical Devices"],
    experience: 15,
    rating: 4.8,
    totalSessions: 89,
    activeStartups: 2,
    availability: "medium",
    location: "Boston, MA",
    languages: ["English", "Korean"],
    bio: "Medical doctor turned healthcare entrepreneur. Expert in navigating regulatory landscapes and clinical validation.",
    achievements: [
      "FDA approval for 2 medical devices",
      "Published 30+ research papers",
      "Healthcare Innovation Award",
    ],
    contactInfo: {
      email: "jennifer.lee@email.com",
      phone: "+1-555-0102",
      linkedin: "linkedin.com/in/drjenniferlee",
    },
    mentorshipStats: {
      successRate: 90,
      avgSessionRating: 4.7,
      responseTime: 4,
      completionRate: 88,
    },
    currentAssignments: [
      {
        startupId: "3",
        startupName: "HealthPlus",
        startupLogo: "/placeholder.svg?height=32&width=32&text=HP",
        assignedDate: "2024-01-20",
        lastSession: "3 days ago",
        nextSession: "Today",
        progress: 45,
        status: "active",
        focus: ["Regulatory Strategy", "Clinical Validation"],
      },
    ],
  },
  {
    id: "3",
    name: "Robert Kim",
    avatar: "/placeholder.svg?height=40&width=40&text=RK",
    title: "Venture Partner",
    company: "Greenfield Ventures",
    expertise: ["Fundraising", "Business Development", "Market Strategy", "Investor Relations"],
    experience: 10,
    rating: 4.7,
    totalSessions: 124,
    activeStartups: 4,
    availability: "high",
    location: "New York, NY",
    languages: ["English", "Mandarin"],
    bio: "Former startup founder turned VC. Specializes in helping startups prepare for and navigate fundraising processes.",
    achievements: ["Raised $50M+ for portfolio companies", "Successful exit as founder", "Top 40 under 40 VC"],
    contactInfo: {
      email: "robert.kim@email.com",
      phone: "+1-555-0103",
      linkedin: "linkedin.com/in/robertkim",
    },
    mentorshipStats: {
      successRate: 82,
      avgSessionRating: 4.6,
      responseTime: 3,
      completionRate: 85,
    },
    currentAssignments: [
      {
        startupId: "4",
        startupName: "GreenEarth",
        startupLogo: "/placeholder.svg?height=32&width=32&text=GE",
        assignedDate: "2024-02-10",
        lastSession: "1 week ago",
        nextSession: "In 2 days",
        progress: 30,
        status: "active",
        focus: ["Fundraising Strategy", "Pitch Deck"],
      },
    ],
  },
]

export function MentorNetworkManagement() {
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [expertiseFilter, setExpertiseFilter] = useState("all")
  const [availabilityFilter, setAvailabilityFilter] = useState("all")
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const filteredMentors = mockMentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.company.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesExpertise = expertiseFilter === "all" || mentor.expertise.includes(expertiseFilter)
    const matchesAvailability = availabilityFilter === "all" || mentor.availability === availabilityFilter
    return matchesSearch && matchesExpertise && matchesAvailability
  })

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "paused":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const allExpertise = Array.from(new Set(mockMentors.flatMap((mentor) => mentor.expertise)))

  const handleViewDetails = (mentor: Mentor) => {
    setSelectedMentor(mentor)
    setIsDetailDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mentor Network Management</h1>
          <p className="text-muted-foreground">Manage mentors, assignments, and relationships</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <UserPlus className="mr-2 h-4 w-4" />
            Recruit Mentors
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Mentor
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Mentors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMentors.length}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+3</span> new this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockMentors.reduce((sum, mentor) => sum + mentor.activeStartups, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Across all mentors</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(mockMentors.reduce((sum, mentor) => sum + mentor.rating, 0) / mockMentors.length).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">Out of 5.0</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                mockMentors.reduce((sum, mentor) => sum + mentor.mentorshipStats.successRate, 0) / mockMentors.length,
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground">Average across network</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="recruitment">Recruitment</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search mentors..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={expertiseFilter} onValueChange={setExpertiseFilter}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by expertise" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Expertise</SelectItem>
                    {allExpertise.map((expertise) => (
                      <SelectItem key={expertise} value={expertise}>
                        {expertise}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Mentor Grid */}
          <div className="grid gap-6 lg:grid-cols-2">
            {filteredMentors.map((mentor) => (
              <Card key={mentor.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={mentor.avatar || "/placeholder.svg"} alt={mentor.name} />
                        <AvatarFallback>{mentor.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{mentor.name}</CardTitle>
                        <CardDescription>
                          {mentor.title} at {mentor.company}
                        </CardDescription>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{mentor.rating}</span>
                          <span className="text-sm text-muted-foreground">({mentor.totalSessions} sessions)</span>
                        </div>
                      </div>
                    </div>
                    <Badge className={getAvailabilityColor(mentor.availability)}>
                      {mentor.availability} availability
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Expertise */}
                  <div>
                    <div className="text-sm font-medium mb-2">Expertise</div>
                    <div className="flex flex-wrap gap-1">
                      {mentor.expertise.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {mentor.expertise.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{mentor.expertise.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Active Startups:</span>
                      <p className="font-medium">{mentor.activeStartups}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Success Rate:</span>
                      <p className="font-medium">{mentor.mentorshipStats.successRate}%</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Experience:</span>
                      <p className="font-medium">{mentor.experience} years</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Response Time:</span>
                      <p className="font-medium">{mentor.mentorshipStats.responseTime}h avg</p>
                    </div>
                  </div>

                  {/* Current Assignments Preview */}
                  {mentor.currentAssignments.length > 0 && (
                    <div>
                      <div className="text-sm font-medium mb-2">Current Assignments</div>
                      <div className="space-y-2">
                        {mentor.currentAssignments.slice(0, 2).map((assignment) => (
                          <div
                            key={assignment.startupId}
                            className="flex items-center justify-between p-2 bg-muted rounded"
                          >
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage
                                  src={assignment.startupLogo || "/placeholder.svg"}
                                  alt={assignment.startupName}
                                />
                                <AvatarFallback className="text-xs">
                                  {assignment.startupName.substring(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{assignment.startupName}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">{assignment.progress}%</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-2 border-t">
                    <Button size="sm" onClick={() => handleViewDetails(mentor)}>
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Contact
                    </Button>
                    <Button size="sm" variant="outline">
                      <Settings className="mr-2 h-4 w-4" />
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Mentor Assignments</CardTitle>
              <CardDescription>Overview of all active mentor-startup relationships</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mentor</TableHead>
                    <TableHead>Startup</TableHead>
                    <TableHead>Focus Areas</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Last Session</TableHead>
                    <TableHead>Next Session</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockMentors.flatMap((mentor) =>
                    mentor.currentAssignments.map((assignment) => (
                      <TableRow key={`${mentor.id}-${assignment.startupId}`}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={mentor.avatar || "/placeholder.svg"} alt={mentor.name} />
                              <AvatarFallback className="text-xs">{mentor.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{mentor.name}</div>
                              <div className="text-xs text-muted-foreground">{mentor.company}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={assignment.startupLogo || "/placeholder.svg"}
                                alt={assignment.startupName}
                              />
                              <AvatarFallback className="text-xs">
                                {assignment.startupName.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{assignment.startupName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {assignment.focus.map((area) => (
                              <Badge key={area} variant="outline" className="text-xs">
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={assignment.progress} className="w-16 h-2" />
                            <span className="text-sm">{assignment.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{assignment.lastSession}</TableCell>
                        <TableCell className="text-sm">{assignment.nextSession}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(assignment.status)}>{assignment.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                            <Button size="sm" variant="outline">
                              Edit
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )),
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Mentors</CardTitle>
                <CardDescription>Based on success rate and feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockMentors
                    .sort((a, b) => b.mentorshipStats.successRate - a.mentorshipStats.successRate)
                    .slice(0, 5)
                    .map((mentor, index) => (
                      <div key={mentor.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="text-lg font-bold text-muted-foreground">#{index + 1}</div>
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={mentor.avatar || "/placeholder.svg"} alt={mentor.name} />
                            <AvatarFallback>{mentor.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{mentor.name}</div>
                            <div className="text-sm text-muted-foreground">{mentor.company}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">{mentor.mentorshipStats.successRate}%</div>
                          <div className="text-xs text-muted-foreground">Success Rate</div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mentor Utilization</CardTitle>
                <CardDescription>Current workload distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockMentors.map((mentor) => (
                    <div key={mentor.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{mentor.name}</span>
                        <span className="text-sm text-muted-foreground">{mentor.activeStartups}/5 startups</span>
                      </div>
                      <Progress value={(mentor.activeStartups / 5) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recruitment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mentor Recruitment Pipeline</CardTitle>
              <CardDescription>Track and manage new mentor recruitment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Recruitment Pipeline</h3>
                <p className="text-muted-foreground mb-4">
                  Manage your mentor recruitment process and track candidates
                </p>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Start Recruitment Campaign
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Mentor Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Mentor Details</DialogTitle>
            <DialogDescription>Comprehensive mentor profile and performance</DialogDescription>
          </DialogHeader>
          {selectedMentor && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedMentor.avatar || "/placeholder.svg"} alt={selectedMentor.name} />
                  <AvatarFallback className="text-lg">{selectedMentor.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{selectedMentor.name}</h3>
                  <p className="text-muted-foreground">
                    {selectedMentor.title} at {selectedMentor.company}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{selectedMentor.rating}</span>
                    </div>
                    <Badge className={getAvailabilityColor(selectedMentor.availability)}>
                      {selectedMentor.availability} availability
                    </Badge>
                    <span className="text-sm text-muted-foreground">{selectedMentor.experience} years experience</span>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="profile">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="assignments">Assignments</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="contact">Contact</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Bio</h4>
                    <p className="text-sm text-muted-foreground">{selectedMentor.bio}</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMentor.expertise.map((skill) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Achievements</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {selectedMentor.achievements.map((achievement, index) => (
                        <li key={index}>• {achievement}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Location</h4>
                      <p className="text-sm text-muted-foreground">{selectedMentor.location}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Languages</h4>
                      <p className="text-sm text-muted-foreground">{selectedMentor.languages.join(", ")}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="assignments" className="space-y-4">
                  {selectedMentor.currentAssignments.map((assignment) => (
                    <div key={assignment.startupId} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={assignment.startupLogo || "/placeholder.svg"}
                              alt={assignment.startupName}
                            />
                            <AvatarFallback>{assignment.startupName.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h5 className="font-medium">{assignment.startupName}</h5>
                            <p className="text-sm text-muted-foreground">Assigned: {assignment.assignedDate}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(assignment.status)}>{assignment.status}</Badge>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium">Progress: </span>
                          <span className="text-sm">{assignment.progress}%</span>
                          <Progress value={assignment.progress} className="mt-1 h-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Last Session:</span>
                            <p>{assignment.lastSession}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Next Session:</span>
                            <p>{assignment.nextSession}</p>
                          </div>
                        </div>

                        <div>
                          <span className="text-sm font-medium">Focus Areas: </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {assignment.focus.map((area) => (
                              <Badge key={area} variant="outline" className="text-xs">
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="performance" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {selectedMentor.mentorshipStats.successRate}%
                      </div>
                      <div className="text-sm text-muted-foreground">Success Rate</div>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {selectedMentor.mentorshipStats.avgSessionRating}
                      </div>
                      <div className="text-sm text-muted-foreground">Avg Session Rating</div>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {selectedMentor.mentorshipStats.responseTime}h
                      </div>
                      <div className="text-sm text-muted-foreground">Avg Response Time</div>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {selectedMentor.mentorshipStats.completionRate}%
                      </div>
                      <div className="text-sm text-muted-foreground">Completion Rate</div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="contact" className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Email</div>
                        <div className="text-sm text-muted-foreground">{selectedMentor.contactInfo.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">Phone</div>
                        <div className="text-sm text-muted-foreground">{selectedMentor.contactInfo.phone}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <Building2 className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">LinkedIn</div>
                        <div className="text-sm text-muted-foreground">{selectedMentor.contactInfo.linkedin}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <Mail className="mr-2 h-4 w-4" />
                      Send Email
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <Phone className="mr-2 h-4 w-4" />
                      Call
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
