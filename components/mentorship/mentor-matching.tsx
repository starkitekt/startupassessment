"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import {
  Users,
  Calendar,
  Star,
  Clock,
  Briefcase,
  Award,
  CheckCircle2,
  Filter,
  Search,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"

// Types
interface Expertise {
  id: string
  name: string
  category: string
}

interface Mentor {
  id: string
  name: string
  title: string
  company: string
  bio: string
  avatarUrl: string
  expertise: string[]
  industries: string[]
  rating: number
  availability: {
    hoursPerWeek: number
    timeSlots: {
      day: string
      slots: string[]
    }[]
  }
  startupsMentored: number
  successRate: number
  languages: string[]
  location: string
  timezone: string
  contactEmail?: string
  linkedinUrl?: string
}

interface Startup {
  id: string
  name: string
  description: string
  stage: string
  industry: string
  needs: string[]
  founderName: string
  founderAvatarUrl: string
  location: string
  timezone: string
}

interface MatchResult {
  mentorId: string
  startupId: string
  score: number
  compatibilityReasons: string[]
  challengeAreas?: string[]
}

// Mock data
const EXPERTISE_CATEGORIES = [
  "Business Development",
  "Marketing & Sales",
  "Finance & Fundraising",
  "Product Development",
  "Technology",
  "Operations",
  "Legal & Compliance",
  "Leadership & Management",
]

const EXPERTISE_LIST: Expertise[] = [
  { id: "exp1", name: "Fundraising Strategy", category: "Finance & Fundraising" },
  { id: "exp2", name: "Pitch Deck Creation", category: "Finance & Fundraising" },
  { id: "exp3", name: "Product-Market Fit", category: "Business Development" },
  { id: "exp4", name: "Go-to-Market Strategy", category: "Marketing & Sales" },
  { id: "exp5", name: "Technical Architecture", category: "Technology" },
  { id: "exp6", name: "UI/UX Design", category: "Product Development" },
  { id: "exp7", name: "Team Building", category: "Leadership & Management" },
  { id: "exp8", name: "Financial Modeling", category: "Finance & Fundraising" },
  { id: "exp9", name: "Growth Hacking", category: "Marketing & Sales" },
  { id: "exp10", name: "Regulatory Compliance", category: "Legal & Compliance" },
  { id: "exp11", name: "Supply Chain Management", category: "Operations" },
  { id: "exp12", name: "Agile Development", category: "Technology" },
  { id: "exp13", name: "Customer Acquisition", category: "Marketing & Sales" },
  { id: "exp14", name: "Intellectual Property", category: "Legal & Compliance" },
  { id: "exp15", name: "Board Management", category: "Leadership & Management" },
]

const INDUSTRIES = [
  "FinTech",
  "HealthTech",
  "EdTech",
  "E-commerce",
  "SaaS",
  "AI/ML",
  "CleanTech",
  "AgriTech",
  "Cybersecurity",
  "Blockchain",
  "IoT",
  "Consumer Apps",
  "Enterprise Software",
  "Hardware",
  "Marketplace",
]

const MOCK_MENTORS: Mentor[] = [
  {
    id: "mentor1",
    name: "Ananya Sharma",
    title: "FinTech Growth Strategist",
    company: "FinEdge Ventures",
    bio: "15+ years in FinTech with expertise in scaling startups from seed to Series B. Previously VP of Growth at PayEase and advisor to multiple fintech unicorns.",
    avatarUrl: "/placeholder.svg?height=150&width=150&text=AS",
    expertise: ["Fundraising Strategy", "Go-to-Market Strategy", "Financial Modeling", "Growth Hacking"],
    industries: ["FinTech", "SaaS", "Marketplace"],
    rating: 4.8,
    availability: {
      hoursPerWeek: 5,
      timeSlots: [
        { day: "Monday", slots: ["10:00", "11:00", "15:00"] },
        { day: "Wednesday", slots: ["14:00", "15:00", "16:00"] },
        { day: "Friday", slots: ["11:00", "12:00"] },
      ],
    },
    startupsMentored: 12,
    successRate: 85,
    languages: ["English", "Hindi"],
    location: "Mumbai, India",
    timezone: "Asia/Kolkata",
  },
  {
    id: "mentor2",
    name: "Vikram Singh",
    title: "AI & ML Product Lead",
    company: "TechNova AI",
    bio: "Product leader with deep expertise in AI/ML. Built and scaled multiple AI products from concept to market. PhD in Computer Science with focus on machine learning.",
    avatarUrl: "/placeholder.svg?height=150&width=150&text=VS",
    expertise: ["Technical Architecture", "Product-Market Fit", "Agile Development", "Team Building"],
    industries: ["AI/ML", "SaaS", "HealthTech", "Enterprise Software"],
    rating: 4.7,
    availability: {
      hoursPerWeek: 3,
      timeSlots: [
        { day: "Tuesday", slots: ["09:00", "10:00"] },
        { day: "Thursday", slots: ["16:00", "17:00", "18:00"] },
      ],
    },
    startupsMentored: 8,
    successRate: 75,
    languages: ["English", "Hindi", "Punjabi"],
    location: "Bangalore, India",
    timezone: "Asia/Kolkata",
  },
  {
    id: "mentor3",
    name: "Priya Mehta",
    title: "Marketing & Brand Strategist",
    company: "BrandCraft Consulting",
    bio: "Former CMO at GlobalTech with expertise in brand building and marketing strategy. Helped 20+ startups develop their brand identity and marketing playbooks.",
    avatarUrl: "/placeholder.svg?height=150&width=150&text=PM",
    expertise: ["Go-to-Market Strategy", "Growth Hacking", "Customer Acquisition"],
    industries: ["E-commerce", "Consumer Apps", "EdTech", "FinTech"],
    rating: 4.9,
    availability: {
      hoursPerWeek: 8,
      timeSlots: [
        { day: "Monday", slots: ["13:00", "14:00", "15:00"] },
        { day: "Wednesday", slots: ["10:00", "11:00", "12:00"] },
        { day: "Friday", slots: ["14:00", "15:00", "16:00"] },
      ],
    },
    startupsMentored: 24,
    successRate: 90,
    languages: ["English", "Hindi", "Gujarati"],
    location: "Delhi, India",
    timezone: "Asia/Kolkata",
  },
  {
    id: "mentor4",
    name: "Rajiv Kapoor",
    title: "Venture Capital & Investment",
    company: "Horizon Capital",
    bio: "Partner at Horizon Capital with 12+ years in VC. Previously founded and exited two startups. Expert in fundraising strategy and investor relations.",
    avatarUrl: "/placeholder.svg?height=150&width=150&text=RK",
    expertise: ["Fundraising Strategy", "Financial Modeling", "Pitch Deck Creation", "Board Management"],
    industries: ["FinTech", "HealthTech", "SaaS", "AI/ML"],
    rating: 4.6,
    availability: {
      hoursPerWeek: 4,
      timeSlots: [
        { day: "Tuesday", slots: ["11:00", "12:00", "13:00"] },
        { day: "Thursday", slots: ["15:00", "16:00"] },
      ],
    },
    startupsMentored: 15,
    successRate: 80,
    languages: ["English", "Hindi"],
    location: "Mumbai, India",
    timezone: "Asia/Kolkata",
  },
  {
    id: "mentor5",
    name: "Neha Gupta",
    title: "Product & UX Leader",
    company: "DesignFirst",
    bio: "Product design expert with focus on user experience. Led product teams at multiple unicorns and helped 30+ startups improve their product experience.",
    avatarUrl: "/placeholder.svg?height=150&width=150&text=NG",
    expertise: ["UI/UX Design", "Product-Market Fit", "Customer Acquisition"],
    industries: ["Consumer Apps", "E-commerce", "SaaS", "HealthTech"],
    rating: 4.9,
    availability: {
      hoursPerWeek: 6,
      timeSlots: [
        { day: "Monday", slots: ["09:00", "10:00"] },
        { day: "Wednesday", slots: ["14:00", "15:00"] },
        { day: "Friday", slots: ["11:00", "12:00", "13:00"] },
      ],
    },
    startupsMentored: 32,
    successRate: 88,
    languages: ["English", "Hindi"],
    location: "Pune, India",
    timezone: "Asia/Kolkata",
  },
]

const MOCK_STARTUPS: Startup[] = [
  {
    id: "startup1",
    name: "FinSecure",
    description: "AI-powered fraud detection platform for financial institutions",
    stage: "Seed",
    industry: "FinTech",
    needs: ["Fundraising Strategy", "Go-to-Market Strategy", "Technical Architecture"],
    founderName: "Arjun Reddy",
    founderAvatarUrl: "/placeholder.svg?height=150&width=150&text=AR",
    location: "Bangalore, India",
    timezone: "Asia/Kolkata",
  },
  {
    id: "startup2",
    name: "EduLearn",
    description: "Personalized learning platform for K-12 students",
    stage: "Pre-seed",
    industry: "EdTech",
    needs: ["Product-Market Fit", "UI/UX Design", "Customer Acquisition"],
    founderName: "Meera Shah",
    founderAvatarUrl: "/placeholder.svg?height=150&width=150&text=MS",
    location: "Delhi, India",
    timezone: "Asia/Kolkata",
  },
  {
    id: "startup3",
    name: "MediTrack",
    description: "Healthcare supply chain management platform",
    stage: "Series A",
    industry: "HealthTech",
    needs: ["Supply Chain Management", "Fundraising Strategy", "Team Building"],
    founderName: "Karan Malhotra",
    founderAvatarUrl: "/placeholder.svg?height=150&width=150&text=KM",
    location: "Mumbai, India",
    timezone: "Asia/Kolkata",
  },
]

// Matching algorithm
function calculateMentorStartupMatch(mentor: Mentor, startup: Startup): MatchResult {
  let score = 0
  const compatibilityReasons: string[] = []
  const challengeAreas: string[] = []

  // Check expertise match
  const expertiseMatch = startup.needs.filter((need) => mentor.expertise.includes(need))
  if (expertiseMatch.length > 0) {
    const matchPercentage = Math.round((expertiseMatch.length / startup.needs.length) * 100)
    score += matchPercentage / 2 // Expertise is 50% of the total score
    compatibilityReasons.push(`${matchPercentage}% expertise match (${expertiseMatch.join(", ")})`)
  } else {
    challengeAreas.push("No direct expertise match with startup needs")
  }

  // Check industry match
  if (mentor.industries.includes(startup.industry)) {
    score += 25 // Industry match is 25% of the total score
    compatibilityReasons.push(`Experience in ${startup.industry}`)
  } else {
    challengeAreas.push(`Limited experience in ${startup.industry}`)
  }

  // Check timezone match
  if (mentor.timezone === startup.timezone) {
    score += 15 // Timezone match is 15% of the total score
    compatibilityReasons.push("Same timezone for easy scheduling")
  } else {
    challengeAreas.push("Different timezones may require coordination")
  }

  // Check mentor success rate
  if (mentor.successRate >= 80) {
    score += 10 // Success rate is 10% of the total score
    compatibilityReasons.push(`High success rate (${mentor.successRate}%)`)
  }

  return {
    mentorId: mentor.id,
    startupId: startup.id,
    score,
    compatibilityReasons,
    challengeAreas,
  }
}

export function MentorMatching() {
  const [selectedStartup, setSelectedStartup] = useState<string>("")
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([])
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([])
  const [minRating, setMinRating] = useState<number>(4)
  const [minAvailability, setMinAvailability] = useState<number>(2)
  const [showMatches, setShowMatches] = useState<boolean>(false)
  const [autoMatch, setAutoMatch] = useState<boolean>(true)
  const [matchResults, setMatchResults] = useState<MatchResult[]>([])
  const { toast } = useToast()

  // Filter mentors based on criteria
  const filteredMentors = useMemo(() => {
    return MOCK_MENTORS.filter((mentor) => {
      // Filter by rating
      if (mentor.rating < minRating) return false

      // Filter by availability
      if (mentor.availability.hoursPerWeek < minAvailability) return false

      // Filter by expertise if any selected
      if (selectedExpertise.length > 0 && !selectedExpertise.some((exp) => mentor.expertise.includes(exp))) {
        return false
      }

      // Filter by industry if any selected
      if (selectedIndustries.length > 0 && !selectedIndustries.some((ind) => mentor.industries.includes(ind))) {
        return false
      }

      return true
    })
  }, [selectedExpertise, selectedIndustries, minRating, minAvailability])

  // Get startup by ID
  const getStartupById = (id: string): Startup | undefined => {
    return MOCK_STARTUPS.find((startup) => startup.id === id)
  }

  // Get mentor by ID
  const getMentorById = (id: string): Mentor | undefined => {
    return MOCK_MENTORS.find((mentor) => mentor.id === id)
  }

  // Handle match generation
  const handleGenerateMatches = () => {
    if (!selectedStartup) {
      toast({
        title: "Startup Required",
        description: "Please select a startup to generate mentor matches",
        variant: "destructive",
      })
      return
    }

    const startup = getStartupById(selectedStartup)
    if (!startup) return

    const results: MatchResult[] = filteredMentors
      .map((mentor) => calculateMentorStartupMatch(mentor, startup))
      .sort((a, b) => b.score - a.score)

    setMatchResults(results)
    setShowMatches(true)

    toast({
      title: "Matches Generated",
      description: `Found ${results.length} potential mentor matches for ${startup.name}`,
    })
  }

  // Handle mentor request
  const handleRequestMentor = (mentorId: string) => {
    const mentor = getMentorById(mentorId)
    const startup = getStartupById(selectedStartup)

    if (!mentor || !startup) return

    toast({
      title: "Mentor Request Sent",
      description: `Request sent to ${mentor.name} for mentoring ${startup.name}`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Mentor Matching</h1>
          <p className="text-muted-foreground">Find the perfect mentor for your startup's needs</p>
        </div>
      </div>

      <Tabs defaultValue="match">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="match">Match Mentors</TabsTrigger>
          <TabsTrigger value="browse">Browse Mentors</TabsTrigger>
        </TabsList>

        <TabsContent value="match" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" /> Mentor Matching Criteria
              </CardTitle>
              <CardDescription>Select your startup and criteria to find the best mentor matches</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="startup">Select Your Startup</Label>
                    <Select value={selectedStartup} onValueChange={setSelectedStartup}>
                      <SelectTrigger id="startup">
                        <SelectValue placeholder="Select a startup" />
                      </SelectTrigger>
                      <SelectContent>
                        {MOCK_STARTUPS.map((startup) => (
                          <SelectItem key={startup.id} value={startup.id}>
                            {startup.name} - {startup.industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedStartup && (
                    <div className="p-4 bg-muted rounded-lg">
                      <h3 className="font-medium mb-2">Startup Needs</h3>
                      <div className="flex flex-wrap gap-1">
                        {getStartupById(selectedStartup)?.needs.map((need) => (
                          <Badge key={need} variant="secondary">
                            {need}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Switch id="auto-match" checked={autoMatch} onCheckedChange={setAutoMatch} />
                    <Label htmlFor="auto-match">Auto-match based on startup needs</Label>
                  </div>

                  {!autoMatch && (
                    <div className="space-y-4">
                      <div>
                        <Label>Required Expertise</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {EXPERTISE_CATEGORIES.map((category) => (
                            <div key={category} className="space-y-2">
                              <h4 className="text-sm font-medium">{category}</h4>
                              <div className="space-y-1">
                                {EXPERTISE_LIST.filter((exp) => exp.category === category).map((expertise) => (
                                  <div key={expertise.id} className="flex items-center space-x-2">
                                    <Checkbox
                                      id={expertise.id}
                                      checked={selectedExpertise.includes(expertise.name)}
                                      onCheckedChange={(checked) => {
                                        if (checked) {
                                          setSelectedExpertise((prev) => [...prev, expertise.name])
                                        } else {
                                          setSelectedExpertise((prev) => prev.filter((exp) => exp !== expertise.name))
                                        }
                                      }}
                                    />
                                    <Label htmlFor={expertise.id} className="text-sm">
                                      {expertise.name}
                                    </Label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label>Industry Experience</Label>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          {INDUSTRIES.map((industry) => (
                            <div key={industry} className="flex items-center space-x-2">
                              <Checkbox
                                id={`industry-${industry}`}
                                checked={selectedIndustries.includes(industry)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedIndustries((prev) => [...prev, industry])
                                  } else {
                                    setSelectedIndustries((prev) => prev.filter((ind) => ind !== industry))
                                  }
                                }}
                              />
                              <Label htmlFor={`industry-${industry}`} className="text-sm">
                                {industry}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Minimum Rating</Label>
                      <span className="text-sm">{minRating.toFixed(1)}/5.0</span>
                    </div>
                    <Slider
                      defaultValue={[minRating]}
                      min={3}
                      max={5}
                      step={0.1}
                      onValueChange={(values) => setMinRating(values[0])}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Minimum Availability (hours/week)</Label>
                      <span className="text-sm">{minAvailability} hours</span>
                    </div>
                    <Slider
                      defaultValue={[minAvailability]}
                      min={1}
                      max={10}
                      step={1}
                      onValueChange={(values) => setMinAvailability(values[0])}
                    />
                  </div>

                  <div className="pt-4">
                    <Button
                      onClick={handleGenerateMatches}
                      className="w-full jpmc-gradient"
                      disabled={!selectedStartup}
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Mentor Matches
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {showMatches && matchResults.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Mentor Matches for {getStartupById(selectedStartup)?.name}
                </CardTitle>
                <CardDescription>{matchResults.length} potential mentors found based on your criteria</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {matchResults.map((result, index) => {
                    const mentor = getMentorById(result.mentorId)
                    if (!mentor) return null

                    return (
                      <Card key={result.mentorId} className="overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="p-6 md:w-2/3">
                            <div className="flex items-start gap-4">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={mentor.avatarUrl || "/placeholder.svg"} alt={mentor.name} />
                                <AvatarFallback>
                                  {mentor.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="space-y-1">
                                <h3 className="font-semibold text-lg">{mentor.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {mentor.title} at {mentor.company}
                                </p>
                                <div className="flex items-center gap-2 text-sm">
                                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                  <span>{mentor.rating.toFixed(1)}/5.0</span>
                                  <span className="text-muted-foreground">•</span>
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                  <span>{mentor.availability.hoursPerWeek} hrs/week</span>
                                </div>
                              </div>
                            </div>

                            <div className="mt-4">
                              <h4 className="text-sm font-medium mb-1">Expertise</h4>
                              <div className="flex flex-wrap gap-1">
                                {mentor.expertise.map((exp) => (
                                  <Badge
                                    key={exp}
                                    variant={
                                      getStartupById(selectedStartup)?.needs.includes(exp) ? "default" : "secondary"
                                    }
                                    className={getStartupById(selectedStartup)?.needs.includes(exp) ? "bg-primary" : ""}
                                  >
                                    {exp}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="mt-4">
                              <h4 className="text-sm font-medium mb-1">Industries</h4>
                              <div className="flex flex-wrap gap-1">
                                {mentor.industries.map((ind) => (
                                  <Badge
                                    key={ind}
                                    variant={
                                      ind === getStartupById(selectedStartup)?.industry ? "default" : "secondary"
                                    }
                                    className={ind === getStartupById(selectedStartup)?.industry ? "bg-primary" : ""}
                                  >
                                    {ind}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="bg-muted p-6 md:w-1/3">
                            <div className="space-y-4">
                              <div>
                                <div className="flex justify-between items-center mb-1">
                                  <h4 className="text-sm font-medium">Match Score</h4>
                                  <span className="font-semibold">{result.score}%</span>
                                </div>
                                <Progress value={result.score} className="h-2" />
                              </div>

                              <div>
                                <h4 className="text-sm font-medium mb-1">Why it's a good match</h4>
                                <ul className="text-xs space-y-1">
                                  {result.compatibilityReasons.map((reason, i) => (
                                    <li key={i} className="flex items-start gap-1">
                                      <ThumbsUp className="h-3 w-3 text-green-500 mt-0.5" />
                                      <span>{reason}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {result.challengeAreas && result.challengeAreas.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-medium mb-1">Potential challenges</h4>
                                  <ul className="text-xs space-y-1">
                                    {result.challengeAreas.map((challenge, i) => (
                                      <li key={i} className="flex items-start gap-1">
                                        <ThumbsDown className="h-3 w-3 text-yellow-500 mt-0.5" />
                                        <span>{challenge}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              <Button onClick={() => handleRequestMentor(mentor.id)} className="w-full">
                                Request Mentorship
                              </Button>

                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" className="w-full">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    View Availability
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>{mentor.name}'s Availability</DialogTitle>
                                    <DialogDescription>
                                      Schedule a mentorship session during these available time slots
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    {mentor.availability.timeSlots.map((daySlot) => (
                                      <div key={daySlot.day} className="space-y-2">
                                        <h4 className="font-medium">{daySlot.day}</h4>
                                        <div className="flex flex-wrap gap-2">
                                          {daySlot.slots.map((timeSlot) => (
                                            <Badge key={timeSlot} variant="outline">
                                              {timeSlot}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  <DialogFooter>
                                    <Button>Schedule Session</Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {showMatches && matchResults.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No matching mentors found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your criteria to find more potential mentors</p>
                <Button onClick={() => setShowMatches(false)}>Adjust Criteria</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="browse" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-primary" /> Filter Mentors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search mentors..." className="pl-10" />
                </div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Expertise" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Expertise</SelectItem>
                    {EXPERTISE_LIST.map((exp) => (
                      <SelectItem key={exp.id} value={exp.name}>
                        {exp.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Industries</SelectItem>
                    {INDUSTRIES.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_MENTORS.map((mentor) => (
              <Card key={mentor.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={mentor.avatarUrl || "/placeholder.svg"} alt={mentor.name} />
                      <AvatarFallback>
                        {mentor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{mentor.name}</CardTitle>
                      <CardDescription>{mentor.title}</CardDescription>
                      <div className="flex items-center gap-2 text-sm mt-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span>{mentor.rating.toFixed(1)}</span>
                        <span className="text-muted-foreground">•</span>
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span>{mentor.company}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm line-clamp-2">{mentor.bio}</p>

                  <div>
                    <h4 className="text-xs font-medium mb-1">Expertise</h4>
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

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      <span>{mentor.startupsMentored} startups mentored</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{mentor.availability.hoursPerWeek} hrs/week</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-between">
                  <Button variant="outline" className="w-1/2">
                    View Profile
                  </Button>
                  <Button className="w-1/2">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
