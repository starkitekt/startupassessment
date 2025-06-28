"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/design-system/card"
import { Badge } from "@/components/design-system/badge"
import { Button } from "@/components/design-system/button"
import { Input } from "@/components/design-system/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import {
  BookOpen,
  Play,
  Clock,
  Users,
  Star,
  Search,
  Filter,
  Award,
  CheckCircle,
  Calendar,
  Download,
} from "lucide-react"

// Mock data
const learningData = {
  courses: [
    {
      id: 1,
      title: "Startup Fundamentals",
      description: "Learn the basics of starting and running a successful startup",
      instructor: "Sarah Johnson",
      duration: "4 hours",
      lessons: 12,
      rating: 4.8,
      enrolled: 1250,
      progress: 75,
      category: "Fundamentals",
      level: "Beginner",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Product-Market Fit Mastery",
      description: "Strategies to achieve and validate product-market fit",
      instructor: "Mike Chen",
      duration: "6 hours",
      lessons: 18,
      rating: 4.9,
      enrolled: 890,
      progress: 0,
      category: "Product",
      level: "Intermediate",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Fundraising Essentials",
      description: "Complete guide to raising capital for your startup",
      instructor: "Emily Rodriguez",
      duration: "8 hours",
      lessons: 24,
      rating: 4.7,
      enrolled: 2100,
      progress: 30,
      category: "Funding",
      level: "Advanced",
      image: "/placeholder.svg?height=200&width=300",
    },
  ],
  workshops: [
    {
      id: 1,
      title: "Pitch Deck Workshop",
      date: "Dec 15, 2024",
      time: "2:00 PM - 4:00 PM",
      instructor: "David Kim",
      attendees: 25,
      maxAttendees: 30,
      type: "Live",
      category: "Pitching",
    },
    {
      id: 2,
      title: "Customer Discovery Bootcamp",
      date: "Dec 20, 2024",
      time: "10:00 AM - 12:00 PM",
      instructor: "Lisa Wang",
      attendees: 18,
      maxAttendees: 20,
      type: "Live",
      category: "Research",
    },
  ],
  resources: [
    {
      id: 1,
      title: "Startup Toolkit",
      description: "Essential templates and tools for startup operations",
      type: "Templates",
      downloads: 5420,
      category: "Operations",
    },
    {
      id: 2,
      title: "Financial Planning Spreadsheet",
      description: "Comprehensive financial model template",
      type: "Spreadsheet",
      downloads: 3210,
      category: "Finance",
    },
    {
      id: 3,
      title: "Market Research Guide",
      description: "Step-by-step guide to conducting market research",
      type: "Guide",
      downloads: 2890,
      category: "Research",
    },
  ],
}

export function FounderLearningContent() {
  const [activeTab, setActiveTab] = useState("courses")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-8">
      {/* Search and Filter - Enhanced with design system */}
      <Card variant="elevated">
        <CardContent padding="lg">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search courses, workshops, and resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>
            <Button variant="outline" size="lg" className="hover:shadow-md transition-all duration-200 bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Learning Progress Overview */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card variant="elevated" className="group hover:shadow-lg transition-all duration-300">
          <CardHeader padding="default" className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Courses Completed</CardTitle>
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20 group-hover:scale-110 transition-transform duration-200">
              <Award className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent padding="default" className="pt-0">
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">3</div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">+2 from last month</p>
          </CardContent>
        </Card>

        <Card variant="elevated" className="group hover:shadow-lg transition-all duration-300">
          <CardHeader padding="default" className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Learning Hours</CardTitle>
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20 group-hover:scale-110 transition-transform duration-200">
              <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent padding="default" className="pt-0">
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">24</div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">This month</p>
          </CardContent>
        </Card>

        <Card variant="elevated" className="group hover:shadow-lg transition-all duration-300">
          <CardHeader padding="default" className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Certificates Earned</CardTitle>
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20 group-hover:scale-110 transition-transform duration-200">
              <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent padding="default" className="pt-0">
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">2</div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Verified credentials</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 h-12 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <TabsTrigger
            value="courses"
            className="font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Courses
          </TabsTrigger>
          <TabsTrigger
            value="workshops"
            className="font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Workshops
          </TabsTrigger>
          <TabsTrigger
            value="resources"
            className="font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Resources
          </TabsTrigger>
          <TabsTrigger
            value="progress"
            className="font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            My Progress
          </TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {learningData.courses.map((course) => (
              <Card
                key={course.id}
                variant="elevated"
                className="overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 relative overflow-hidden">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge variant="secondary" size="sm">
                      {course.category}
                    </Badge>
                    <Badge
                      variant="outline"
                      size="sm"
                      className={cn(
                        course.level === "Beginner" && "border-green-300 text-green-700 bg-green-50",
                        course.level === "Intermediate" && "border-yellow-300 text-yellow-700 bg-yellow-50",
                        course.level === "Advanced" && "border-red-300 text-red-700 bg-red-50",
                      )}
                    >
                      {course.level}
                    </Badge>
                  </div>
                </div>

                <CardHeader padding="lg">
                  <CardTitle className="text-lg font-semibold line-clamp-2">{course.title}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2">{course.description}</CardDescription>
                </CardHeader>

                <CardContent padding="lg" className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </span>
                    <span className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {course.lessons} lessons
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div className="flex items-center mr-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-4 w-4",
                              i < Math.floor(course.rating) ? "text-yellow-400 fill-current" : "text-gray-300",
                            )}
                          />
                        ))}
                      </div>
                      <span className="font-medium">{course.rating}</span>
                      <span className="text-gray-500 ml-1">({course.enrolled.toLocaleString()})</span>
                    </div>
                  </div>

                  {course.progress > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-gray-700 dark:text-gray-300">Progress</span>
                        <span className="text-gray-900 dark:text-gray-100">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  )}

                  <div className="flex items-center space-x-3 pt-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs font-medium">
                        {course.instructor
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">{course.instructor}</span>
                  </div>

                  <Button size="lg" className="w-full hover:shadow-md transition-all duration-200">
                    {course.progress > 0 ? (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Continue Learning
                      </>
                    ) : (
                      <>
                        <BookOpen className="h-4 w-4 mr-2" />
                        Start Course
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="workshops" className="space-y-6">
          <div className="grid gap-6">
            {learningData.workshops.map((workshop) => (
              <Card key={workshop.id} variant="elevated" className="hover:shadow-lg transition-all duration-300">
                <CardContent padding="lg">
                  <div className="flex items-center justify-between">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{workshop.title}</h3>
                        <Badge variant="info" size="default">
                          {workshop.type}
                        </Badge>
                        <Badge variant="outline" size="default">
                          {workshop.category}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {workshop.date}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          {workshop.time}
                        </span>
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          {workshop.attendees}/{workshop.maxAttendees} attendees
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Instructor: {workshop.instructor}
                      </p>
                    </div>
                    <div className="flex flex-col space-y-3 items-end">
                      <Button size="lg" className="hover:shadow-md transition-all duration-200">
                        Register
                      </Button>
                      <div className="w-32">
                        <Progress value={(workshop.attendees / workshop.maxAttendees) * 100} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1 text-center">
                          {workshop.maxAttendees - workshop.attendees} spots left
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {learningData.resources.map((resource) => (
              <Card key={resource.id} variant="elevated" className="group hover:shadow-lg transition-all duration-300">
                <CardHeader padding="lg">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" size="default">
                      {resource.category}
                    </Badge>
                    <Badge variant="outline" size="default">
                      {resource.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-semibold">{resource.title}</CardTitle>
                  <CardDescription className="text-sm">{resource.description}</CardDescription>
                </CardHeader>
                <CardContent padding="lg" className="space-y-4">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Download className="h-4 w-4 mr-2" />
                    {resource.downloads.toLocaleString()} downloads
                  </div>
                  <Button size="lg" className="w-full hover:shadow-md transition-all duration-200">
                    <Download className="h-4 w-4 mr-2" />
                    Download Resource
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-8">
          <div className="grid gap-8 md:grid-cols-2">
            <Card variant="elevated">
              <CardHeader padding="lg">
                <CardTitle className="text-xl font-semibold">Learning Path Progress</CardTitle>
                <CardDescription className="text-base">
                  Your progress through recommended learning paths
                </CardDescription>
              </CardHeader>
              <CardContent padding="lg" className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-700 dark:text-gray-300">Startup Fundamentals Path</span>
                    <span className="text-gray-900 dark:text-gray-100">3/5 courses</span>
                  </div>
                  <Progress value={60} className="h-3" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-700 dark:text-gray-300">Product Development Path</span>
                    <span className="text-gray-900 dark:text-gray-100">1/4 courses</span>
                  </div>
                  <Progress value={25} className="h-3" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-700 dark:text-gray-300">Fundraising Mastery Path</span>
                    <span className="text-gray-900 dark:text-gray-100">0/6 courses</span>
                  </div>
                  <Progress value={0} className="h-3" />
                </div>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader padding="lg">
                <CardTitle className="text-xl font-semibold">Certificates Earned</CardTitle>
                <CardDescription className="text-base">Your verified learning achievements</CardDescription>
              </CardHeader>
              <CardContent padding="lg" className="space-y-4">
                <div
                  className={cn(
                    "flex items-center space-x-4 p-4 rounded-xl",
                    "bg-gradient-to-r from-green-50 to-emerald-50",
                    "dark:from-green-950/20 dark:to-emerald-950/20",
                    "border border-green-200 dark:border-green-800/50",
                  )}
                >
                  <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/20">
                    <Award className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">Startup Fundamentals</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Completed Dec 1, 2024</p>
                  </div>
                </div>
                <div
                  className={cn(
                    "flex items-center space-x-4 p-4 rounded-xl",
                    "bg-gradient-to-r from-green-50 to-emerald-50",
                    "dark:from-green-950/20 dark:to-emerald-950/20",
                    "border border-green-200 dark:border-green-800/50",
                  )}
                >
                  <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/20">
                    <Award className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">Customer Development</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Completed Nov 15, 2024</p>
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
