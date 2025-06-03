"use client"

import React, { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Search, Filter, UserPlus, Users } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const mockMentors = [
  {
    id: "M001",
    name: "Ananya Sharma",
    title: "FinTech Growth Strategist",
    avatarUrl: "/placeholder.svg?height=64&width=64",
    expertise: ["FinTech", "Scale-ups", "VC Funding", "GTM Strategy"],
    rating: 4.8,
    startupsMentoredInternal: 12, // Within this incubator
    startupsMentoredExternal: 8, // In other incubators/programs
    successRate: "85%", // e.g., % of mentored startups achieving next funding round
    avgMentorshipDuration: "9 months",
    currentMentees: 3,
    availability: "Available",
    linkedin: "linkedin.com/in/ananya-sharma-mentor",
    tags: ["FinTech", "AI in Finance", "Payments"],
    bio: "Seasoned FinTech expert with 15+ years of experience in scaling startups. Passionate about helping founders navigate complex financial landscapes and achieve sustainable growth. Active in multiple accelerator programs.",
    specializations: ["Market Entry", "Fundraising Strategy", "Product-Market Fit"],
    industryExperience: ["Banking", "Investment Tech", "RegTech"],
  },
  {
    id: "M002",
    name: "Vikram Singh",
    title: "AI & ML Product Lead",
    avatarUrl: "/placeholder.svg?height=64&width=64",
    expertise: ["AI/ML", "Product Management", "SaaS", "Deep Tech"],
    rating: 4.5,
    startupsMentoredInternal: 8,
    startupsMentoredExternal: 5,
    successRate: "75%",
    avgMentorshipDuration: "12 months",
    currentMentees: 2,
    availability: "Limited",
    linkedin: "linkedin.com/in/vikram-singh-ai",
    tags: ["Machine Learning", "SaaS B2B", "Computer Vision"],
    bio: "Product leader with a strong background in AI and Machine Learning. Helped launch multiple successful SaaS products. Currently advising select startups on tech roadmaps and product strategy.",
    specializations: ["AI Ethics", "MLOps", "Technical Due Diligence"],
    industryExperience: ["Software Development", "Healthcare AI", "Enterprise SaaS"],
  },
  // Add more detailed mentors
]

const expertiseAreas = [
  "All",
  "FinTech",
  "AI/ML",
  "SaaS",
  "Marketing",
  "Operations",
  "Deep Tech",
  "EdTech",
  "HealthTech",
]
const availabilityStatus = ["All", "Available", "Limited", "Unavailable"]

export function MentorsContent() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({ expertise: "All", availability: "All" })
  const router = useRouter()
  const { toast } = useToast()

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleFilterChange = (filterType: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }))
  }

  const filteredMentors = useMemo(() => {
    return mockMentors.filter((mentor) => {
      const searchMatch =
        mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.expertise.some((e) => e.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (mentor.tags && mentor.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      const expertiseMatch = filters.expertise === "All" || mentor.expertise.includes(filters.expertise)
      const availabilityMatch = filters.availability === "All" || mentor.availability === filters.availability
      return searchMatch && expertiseMatch && availabilityMatch
    })
  }, [searchTerm, filters])

  const handleViewMentorProfile = (mentorId: string) => {
    router.push(`/mentors/${mentorId}`)
  }

  const handleAddNewMentor = () => {
    router.push("/mentors/new")
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          {" "}
          <Skeleton className="h-10 w-48" /> <Skeleton className="h-10 w-36" />{" "}
        </div>
        <Card>
          <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {" "}
            <Skeleton className="h-10 w-full" /> <Skeleton className="h-10 w-full" />{" "}
            <Skeleton className="h-10 w-full" />{" "}
          </CardContent>
        </Card>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-80 rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-jpmc-darkblue dark:text-jpmc-lightblue">Mentor Network</h1>
            <p className="text-muted-foreground">Discover and connect with experienced industry mentors.</p>
          </div>
          <Button onClick={handleAddNewMentor} className="w-full sm:w-auto">
            <UserPlus className="mr-2 h-4 w-4" /> Add New Mentor
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-xl">
              <Filter className="mr-2 h-5 w-5 text-primary" /> Find Mentors
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-end">
            <div className="relative">
              <Tooltip>
                <TooltipTrigger asChild>
                  <label htmlFor="mentor-search" className="text-sm font-medium cursor-pointer">
                    Search
                  </label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Search by name, title, expertise, or tags</p>
                </TooltipContent>
              </Tooltip>
              <Search className="absolute left-3 top-9 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="mentor-search"
                placeholder="Name, title, expertise, tags..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <label htmlFor="filter-expertise" className="text-sm font-medium cursor-pointer">
                    Expertise
                  </label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Filter mentors by their area of expertise</p>
                </TooltipContent>
              </Tooltip>
              <Select value={filters.expertise} onValueChange={(v) => handleFilterChange("expertise", v)}>
                <SelectTrigger id="filter-expertise">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {expertiseAreas.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <label htmlFor="filter-availability" className="text-sm font-medium cursor-pointer">
                    Availability
                  </label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>See mentors based on their current availability</p>
                </TooltipContent>
              </Tooltip>
              <Select value={filters.availability} onValueChange={(v) => handleFilterChange("availability", v)}>
                <SelectTrigger id="filter-availability">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availabilityStatus.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {filteredMentors.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredMentors.map((mentor) => (
              <Card key={mentor.id} className="flex flex-col hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="flex flex-row items-start gap-4 space-y-0 p-4">
                  <Avatar className="h-16 w-16 border-2 border-primary">
                    <AvatarImage src={mentor.avatarUrl || "/placeholder.svg"} alt={mentor.name} />
                    <AvatarFallback>
                      {mentor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{mentor.name}</CardTitle>
                    <CardDescription className="text-xs">{mentor.title}</CardDescription>
                    <div className="mt-1 flex items-center text-xs">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center cursor-pointer">
                            <Star className="mr-1 h-3.5 w-3.5 fill-yellow-400 text-yellow-400" /> {mentor.rating}/5.0
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>Average rating based on mentee feedback</TooltipContent>
                      </Tooltip>
                      <span className="mx-1.5">·</span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center cursor-pointer">
                            <Users className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                            {mentor.startupsMentoredInternal + mentor.startupsMentoredExternal} Mentees
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>Total startups mentored internally and externally</TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow space-y-2 p-4 text-sm">
                  <div className="flex flex-wrap gap-1.5">
                    {mentor.expertise.slice(0, 4).map((exp) => (
                      <Badge key={exp} variant="secondary" className="text-xs">
                        {exp}
                      </Badge>
                    ))}
                    {mentor.expertise.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{mentor.expertise.length - 4} more
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{mentor.bio.substring(0, 100)}...</p>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge
                        variant={
                          mentor.availability === "Available"
                            ? "default"
                            : mentor.availability === "Limited"
                              ? "outline"
                              : "destructive"
                        }
                        className={cn(
                          "text-xs cursor-pointer",
                          mentor.availability === "Available" ? "bg-charting-positive text-white" : "",
                        )}
                      >
                        {mentor.availability}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>Mentor's current availability for new engagements</TooltipContent>
                  </Tooltip>
                </CardContent>
                <CardFooter className="p-4 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleViewMentorProfile(mentor.id)}
                  >
                    View Full Profile
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="col-span-full">
            <CardContent className="h-64 flex flex-col items-center justify-center text-center">
              <Users className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold">No Mentors Found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </TooltipProvider>
  )
}
