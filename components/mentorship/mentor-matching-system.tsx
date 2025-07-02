"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { Search, Star, Calendar, CheckCircle, ArrowRight, Clock } from "lucide-react"

interface Mentor {
  id: string
  name: string
  title: string
  company: string
  expertise: string[]
  industries: string[]
  experience: number
  rating: number
  availability: number
  bio: string
  imageUrl?: string
  matchScore?: number
}

interface Startup {
  id: string
  name: string
  industry: string
  stage: string
  needs: string[]
}

interface MentorMatchingSystemProps {
  startupId?: string
  onMatchConfirmed?: (mentorId: string, startupId: string) => void
}

export function MentorMatchingSystem({ startupId, onMatchConfirmed }: MentorMatchingSystemProps) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("find")
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([])
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([])
  const [minExperience, setMinExperience] = useState(0)
  const [minAvailability, setMinAvailability] = useState(0)
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null)
  const [requestMessage, setRequestMessage] = useState("")
  const [requestSent, setRequestSent] = useState(false)

  // Mock data - in a real app, this would come from an API
  const [mentors, setMentors] = useState<Mentor[]>([
    {
      id: "m1",
      name: "Sarah Johnson",
      title: "Former CTO",
      company: "TechGrowth Inc.",
      expertise: ["Technical Leadership", "Product Development", "Scaling"],
      industries: ["SaaS", "Fintech"],
      experience: 12,
      rating: 4.8,
      availability: 3,
      bio: "Former CTO with 12+ years of experience scaling tech startups from seed to Series C. Specialized in building engineering teams and technical architecture for rapid growth.",
      imageUrl: "/placeholder.svg?height=100&width=100",
      matchScore: 92,
    },
    {
      id: "m2",
      name: "Michael Chen",
      title: "Angel Investor",
      company: "Horizon Ventures",
      expertise: ["Fundraising", "Go-to-Market", "Financial Modeling"],
      industries: ["E-commerce", "Marketplaces"],
      experience: 8,
      rating: 4.6,
      availability: 2,
      bio: "Angel investor who has funded 20+ early-stage startups. Previously founded and exited two e-commerce companies. Passionate about helping founders navigate early growth challenges.",
      imageUrl: "/placeholder.svg?height=100&width=100",
      matchScore: 85,
    },
    {
      id: "m3",
      name: "Alicia Rodriguez",
      title: "Marketing Director",
      company: "GrowthLabs",
      expertise: ["Digital Marketing", "Brand Strategy", "Customer Acquisition"],
      industries: ["Consumer Products", "Health Tech"],
      experience: 10,
      rating: 4.9,
      availability: 4,
      bio: "Marketing executive specialized in launching consumer products and building brands from scratch. Expertise in digital acquisition strategies and conversion optimization.",
      imageUrl: "/placeholder.svg?height=100&width=100",
      matchScore: 78,
    },
    {
      id: "m4",
      name: "David Washington",
      title: "Operations Expert",
      company: "Former COO at ScaleUp",
      expertise: ["Operations", "Supply Chain", "Team Building"],
      industries: ["Manufacturing", "Logistics"],
      experience: 15,
      rating: 4.7,
      availability: 2,
      bio: "Operations specialist with experience scaling companies from $1M to $50M+ in revenue. Focus on building efficient processes and teams that can handle rapid growth.",
      imageUrl: "/placeholder.svg?height=100&width=100",
      matchScore: 65,
    },
    {
      id: "m5",
      name: "Jennifer Liu",
      title: "Product Leader",
      company: "ProductVision",
      expertise: ["Product Management", "UX Design", "Customer Research"],
      industries: ["SaaS", "Mobile Apps"],
      experience: 9,
      rating: 4.5,
      availability: 3,
      bio: "Product leader who has launched and scaled multiple B2B SaaS products. Specialized in user-centered design and building products that solve real customer problems.",
      imageUrl: "/placeholder.svg?height=100&width=100",
      matchScore: 88,
    },
  ])

  const startup: Startup = {
    id: startupId || "s1",
    name: "GreenTech Solutions",
    industry: "CleanTech",
    stage: "Seed",
    needs: ["Technical Leadership", "Fundraising", "Product Development"],
  }

  const expertiseOptions = [
    "Technical Leadership",
    "Product Development",
    "Scaling",
    "Fundraising",
    "Go-to-Market",
    "Financial Modeling",
    "Digital Marketing",
    "Brand Strategy",
    "Customer Acquisition",
    "Operations",
    "Supply Chain",
    "Team Building",
    "Product Management",
    "UX Design",
    "Customer Research",
  ]

  const industryOptions = [
    "SaaS",
    "Fintech",
    "E-commerce",
    "Marketplaces",
    "Consumer Products",
    "Health Tech",
    "Manufacturing",
    "Logistics",
    "Mobile Apps",
    "CleanTech",
    "EdTech",
    "AI/ML",
  ]

  const filteredMentors = mentors
    .filter(
      (mentor) =>
        (searchQuery === "" ||
          mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          mentor.expertise.some((e) => e.toLowerCase().includes(searchQuery.toLowerCase())) ||
          mentor.industries.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase()))) &&
        (selectedExpertise.length === 0 || selectedExpertise.some((e) => mentor.expertise.includes(e))) &&
        (selectedIndustries.length === 0 || selectedIndustries.some((i) => mentor.industries.includes(i))) &&
        mentor.experience >= minExperience &&
        mentor.availability >= minAvailability,
    )
    .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))

  const handleExpertiseChange = (expertise: string) => {
    setSelectedExpertise((prev) =>
      prev.includes(expertise) ? prev.filter((e) => e !== expertise) : [...prev, expertise],
    )
  }

  const handleIndustryChange = (industry: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(industry) ? prev.filter((i) => i !== industry) : [...prev, industry],
    )
  }

  const handleMentorSelect = (mentor: Mentor) => {
    setSelectedMentor(mentor)
    setActiveTab("request")
  }

  const handleSendRequest = async () => {
    if (!selectedMentor) return

    setLoading(true)

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setRequestSent(true)

      toast({
        title: "Request sent successfully",
        description: `Your mentorship request has been sent to ${selectedMentor.name}.`,
      })

      if (onMatchConfirmed) {
        onMatchConfirmed(selectedMentor.id, startup.id)
      }
    } catch (error) {
      toast({
        title: "Error sending request",
        description: "There was an error sending your mentorship request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setSelectedMentor(null)
    setRequestMessage("")
    setRequestSent(false)
    setActiveTab("find")
  }

  const getAvailabilityLabel = (level: number) => {
    switch (level) {
      case 1:
        return "Limited (1-2 hrs/month)"
      case 2:
        return "Moderate (3-5 hrs/month)"
      case 3:
        return "Good (6-8 hrs/month)"
      case 4:
        return "High (9+ hrs/month)"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Mentor Matching</h2>
        <p className="text-muted-foreground">Find the perfect mentor for {startup.name}</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="find" disabled={requestSent}>
            Find Mentors
          </TabsTrigger>
          <TabsTrigger value="request" disabled={!selectedMentor || requestSent}>
            Request Mentorship
          </TabsTrigger>
          <TabsTrigger value="confirm" disabled={!requestSent}>
            Confirmation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="find" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Expertise Needed</Label>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {expertiseOptions.map((expertise) => (
                        <div key={expertise} className="flex items-center space-x-2">
                          <Checkbox
                            id={`expertise-${expertise}`}
                            checked={selectedExpertise.includes(expertise)}
                            onCheckedChange={() => handleExpertiseChange(expertise)}
                          />
                          <label
                            htmlFor={`expertise-${expertise}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {expertise}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Industries</Label>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {industryOptions.map((industry) => (
                        <div key={industry} className="flex items-center space-x-2">
                          <Checkbox
                            id={`industry-${industry}`}
                            checked={selectedIndustries.includes(industry)}
                            onCheckedChange={() => handleIndustryChange(industry)}
                          />
                          <label
                            htmlFor={`industry-${industry}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {industry}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Minimum Experience (Years)</Label>
                    <div className="pt-2">
                      <Slider
                        min={0}
                        max={15}
                        step={1}
                        value={[minExperience]}
                        onValueChange={(value) => setMinExperience(value[0])}
                      />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs">0</span>
                        <span className="text-xs font-medium">{minExperience} years</span>
                        <span className="text-xs">15+</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Minimum Availability</Label>
                    <div className="pt-2">
                      <Slider
                        min={0}
                        max={4}
                        step={1}
                        value={[minAvailability]}
                        onValueChange={(value) => setMinAvailability(value[0])}
                      />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs">Any</span>
                        <span className="text-xs font-medium">{getAvailabilityLabel(minAvailability)}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSelectedExpertise([])
                      setSelectedIndustries([])
                      setMinExperience(0)
                      setMinAvailability(0)
                      setSearchQuery("")
                    }}
                  >
                    Reset Filters
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-3 space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, expertise, or industry..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select value="match" onValueChange={() => {}}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="match">Best Match</SelectItem>
                    <SelectItem value="rating">Highest Rating</SelectItem>
                    <SelectItem value="experience">Most Experience</SelectItem>
                    <SelectItem value="availability">Most Available</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {filteredMentors.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-8">
                      <div className="text-center space-y-2">
                        <h3 className="text-lg font-medium">No mentors found</h3>
                        <p className="text-sm text-muted-foreground">Try adjusting your filters or search query</p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  filteredMentors.map((mentor) => (
                    <Card key={mentor.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4 p-4 flex flex-col items-center justify-center border-r border-border">
                          <Avatar className="h-20 w-20">
                            <AvatarImage src={mentor.imageUrl || "/placeholder.svg"} alt={mentor.name} />
                            <AvatarFallback>
                              {mentor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <h3 className="mt-2 font-medium text-center">{mentor.name}</h3>
                          <p className="text-sm text-muted-foreground text-center">{mentor.title}</p>
                          <p className="text-xs text-muted-foreground text-center">{mentor.company}</p>
                          <div className="flex items-center mt-2">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            <span className="ml-1 text-sm font-medium">{mentor.rating}</span>
                          </div>
                        </div>
                        <div className="md:w-3/4 p-4">
                          <div className="flex flex-col md:flex-row justify-between">
                            <div className="space-y-2 mb-4 md:mb-0">
                              <div className="flex flex-wrap gap-1">
                                {mentor.expertise.map((exp) => (
                                  <Badge key={exp} variant="secondary">
                                    {exp}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {mentor.industries.map((ind) => (
                                  <Badge key={ind} variant="outline">
                                    {ind}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              {mentor.matchScore && (
                                <div className="flex flex-col items-end mb-2">
                                  <span className="text-xs text-muted-foreground">Match Score</span>
                                  <div className="flex items-center">
                                    <Progress value={mentor.matchScore} className="h-2 w-24 mr-2" />
                                    <span className="font-medium text-sm">{mentor.matchScore}%</span>
                                  </div>
                                </div>
                              )}
                              <div className="flex items-center text-sm">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>{getAvailabilityLabel(mentor.availability)}</span>
                              </div>
                              <div className="flex items-center text-sm mt-1">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{mentor.experience} years experience</span>
                              </div>
                            </div>
                          </div>

                          <p className="text-sm mt-4">{mentor.bio}</p>

                          <div className="flex justify-end mt-4">
                            <Button onClick={() => handleMentorSelect(mentor)}>Request Mentorship</Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="request" className="space-y-4 pt-4">
          {selectedMentor && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Selected Mentor</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={selectedMentor.imageUrl || "/placeholder.svg"} alt={selectedMentor.name} />
                      <AvatarFallback>
                        {selectedMentor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="mt-4 text-xl font-medium">{selectedMentor.name}</h3>
                    <p className="text-muted-foreground">{selectedMentor.title}</p>
                    <p className="text-sm text-muted-foreground">{selectedMentor.company}</p>

                    <div className="flex items-center mt-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 font-medium">{selectedMentor.rating}</span>
                    </div>

                    <div className="w-full mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Experience:</span>
                        <span>{selectedMentor.experience} years</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Availability:</span>
                        <span>{getAvailabilityLabel(selectedMentor.availability)}</span>
                      </div>
                      {selectedMentor.matchScore && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Match Score:</span>
                          <span>{selectedMentor.matchScore}%</span>
                        </div>
                      )}
                    </div>

                    <div className="w-full mt-4">
                      <h4 className="text-sm font-medium mb-1">Expertise</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedMentor.expertise.map((exp) => (
                          <Badge key={exp} variant="secondary">
                            {exp}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="w-full mt-4">
                      <h4 className="text-sm font-medium mb-1">Industries</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedMentor.industries.map((ind) => (
                          <Badge key={ind} variant="outline">
                            {ind}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Request Mentorship</CardTitle>
                    <CardDescription>
                      Send a personalized message to {selectedMentor.name} explaining why you'd like to connect
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="startup-info">About Your Startup</Label>
                      <div className="p-3 bg-muted rounded-md">
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Name:</span>
                            <span className="text-sm">{startup.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Industry:</span>
                            <span className="text-sm">{startup.industry}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Stage:</span>
                            <span className="text-sm">{startup.stage}</span>
                          </div>
                          <div>
                            <span className="text-sm font-medium">Key Needs:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {startup.needs.map((need) => (
                                <Badge key={need} variant="outline">
                                  {need}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Your Message</Label>
                      <textarea
                        id="message"
                        className="min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder={`Hi ${selectedMentor.name}, I'm interested in your mentorship because...`}
                        value={requestMessage}
                        onChange={(e) => setRequestMessage(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Be specific about what you're looking for help with and why you think this mentor would be a
                        good fit.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Suggested Meeting Frequency</Label>
                      <Select defaultValue="biweekly">
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly (1 hour)</SelectItem>
                          <SelectItem value="biweekly">Bi-weekly (1 hour)</SelectItem>
                          <SelectItem value="monthly">Monthly (1-2 hours)</SelectItem>
                          <SelectItem value="asneeded">As needed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedMentor(null)
                        setActiveTab("find")
                      }}
                    >
                      Back to Search
                    </Button>
                    <Button onClick={handleSendRequest} disabled={loading || requestMessage.length < 20}>
                      Send Request
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="confirm" className="space-y-4 pt-4">
          {requestSent && selectedMentor && (
            <Card>
              <CardContent className="flex flex-col items-center py-8">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-medium">Request Sent Successfully!</h3>
                <p className="text-center text-muted-foreground mt-2 max-w-md">
                  Your mentorship request has been sent to {selectedMentor.name}. You'll receive a notification when
                  they respond to your request.
                </p>

                <div className="mt-6 p-4 border rounded-md w-full max-w-md">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedMentor.imageUrl || "/placeholder.svg"} alt={selectedMentor.name} />
                      <AvatarFallback>
                        {selectedMentor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="font-medium">{selectedMentor.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedMentor.title} at {selectedMentor.company}
                      </p>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                        <span className="text-sm text-muted-foreground">Typically responds within 2-3 days</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center mt-8 space-x-2">
                  <Button variant="outline" onClick={resetForm}>
                    Find More Mentors
                  </Button>
                  <Button
                    onClick={() => {
                      // In a real app, this would navigate to a dashboard or mentorship page
                      toast({
                        title: "Navigating to mentorships",
                        description: "This would navigate to your active mentorships page.",
                      })
                    }}
                  >
                    View My Mentorships
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
