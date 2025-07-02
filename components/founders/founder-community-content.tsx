"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/design-system/card"
import { Badge } from "@/components/design-system/badge"
import { Button } from "@/components/design-system/button"
import { Input } from "@/components/design-system/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import {
  MessageSquare,
  Users,
  TrendingUp,
  Calendar,
  Search,
  Plus,
  Heart,
  Share,
  MessageCircle,
  UserPlus,
  Network,
  Video,
  Coffee,
} from "lucide-react"

// Mock data
const communityData = {
  forums: [
    {
      id: 1,
      title: "Product Development",
      description: "Discuss product strategy, development, and user feedback",
      members: 342,
      posts: 1250,
      lastActivity: "2 hours ago",
      category: "Product",
      trending: true,
    },
    {
      id: 2,
      title: "Fundraising & Investment",
      description: "Share experiences and tips about raising capital",
      members: 189,
      posts: 890,
      lastActivity: "4 hours ago",
      category: "Funding",
      trending: false,
    },
    {
      id: 3,
      title: "Marketing & Growth",
      description: "Growth hacking, marketing strategies, and customer acquisition",
      members: 456,
      posts: 2100,
      lastActivity: "1 hour ago",
      category: "Marketing",
      trending: true,
    },
  ],
  posts: [
    {
      id: 1,
      author: "Alex Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "How we achieved product-market fit in 6 months",
      content: "Sharing our journey from idea to PMF. Key lessons learned and metrics that mattered most...",
      likes: 24,
      comments: 8,
      timeAgo: "3 hours ago",
      category: "Product",
      tags: ["PMF", "Metrics", "Strategy"],
    },
    {
      id: 2,
      author: "Sarah Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "Seed funding pitch deck template that worked",
      content: "After 50+ investor meetings, here's the deck structure that finally got us funded...",
      likes: 45,
      comments: 12,
      timeAgo: "5 hours ago",
      category: "Funding",
      tags: ["Pitch Deck", "Seed", "Template"],
    },
    {
      id: 3,
      author: "Mike Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "Growth hack that 10x'd our user acquisition",
      content: "Simple referral program implementation that changed everything for our B2B SaaS...",
      likes: 67,
      comments: 23,
      timeAgo: "1 day ago",
      category: "Marketing",
      tags: ["Growth", "Referral", "B2B"],
    },
  ],
  events: [
    {
      id: 1,
      title: "Founder Coffee Chat",
      date: "Dec 15, 2024",
      time: "9:00 AM",
      location: "Virtual",
      attendees: 12,
      maxAttendees: 15,
      type: "Networking",
      host: "Community Team",
    },
    {
      id: 2,
      title: "Product Demo Showcase",
      date: "Dec 18, 2024",
      time: "2:00 PM",
      location: "Innovation Hub",
      attendees: 25,
      maxAttendees: 30,
      type: "Demo",
      host: "Sarah Johnson",
    },
    {
      id: 3,
      title: "Investor Speed Dating",
      date: "Dec 22, 2024",
      time: "6:00 PM",
      location: "Downtown Conference Center",
      attendees: 40,
      maxAttendees: 50,
      type: "Funding",
      host: "Investment Committee",
    },
  ],
  connections: [
    {
      id: 1,
      name: "Emma Wilson",
      title: "CEO at HealthTech Solutions",
      stage: "Series A",
      industry: "Healthcare",
      avatar: "/placeholder.svg?height=40&width=40",
      mutualConnections: 3,
      status: "online",
    },
    {
      id: 2,
      name: "David Park",
      title: "Founder of EduPlatform",
      stage: "Seed",
      industry: "Education",
      avatar: "/placeholder.svg?height=40&width=40",
      mutualConnections: 7,
      status: "offline",
    },
    {
      id: 3,
      name: "Lisa Zhang",
      title: "Co-founder at GreenEnergy",
      stage: "Pre-seed",
      industry: "CleanTech",
      avatar: "/placeholder.svg?height=40&width=40",
      mutualConnections: 2,
      status: "online",
    },
  ],
}

export function FounderCommunityContent() {
  const [activeTab, setActiveTab] = useState("forums")
  const [newPostContent, setNewPostContent] = useState("")

  return (
    <div className="space-y-8">
      {/* Community Stats - Enhanced with design system */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card variant="elevated" className="group hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Members</CardTitle>
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20 group-hover:scale-110 transition-transform duration-200">
              <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">1,247</div>
            <p className="text-sm text-green-600 dark:text-green-400 font-medium mt-1">+12% from last month</p>
          </CardContent>
        </Card>

        <Card variant="elevated" className="group hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Forum Posts</CardTitle>
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20 group-hover:scale-110 transition-transform duration-200">
              <MessageSquare className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">4,240</div>
            <p className="text-sm text-green-600 dark:text-green-400 font-medium mt-1">+8% from last week</p>
          </CardContent>
        </Card>

        <Card variant="elevated" className="group hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Events This Month</CardTitle>
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20 group-hover:scale-110 transition-transform duration-200">
              <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">18</div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">5 upcoming</p>
          </CardContent>
        </Card>

        <Card variant="elevated" className="group hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Your Connections</CardTitle>
            <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/20 group-hover:scale-110 transition-transform duration-200">
              <Network className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">47</div>
            <p className="text-sm text-green-600 dark:text-green-400 font-medium mt-1">+3 new this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 h-12 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <TabsTrigger
            value="forums"
            className="font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Forums
          </TabsTrigger>
          <TabsTrigger
            value="posts"
            className="font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Recent Posts
          </TabsTrigger>
          <TabsTrigger
            value="events"
            className="font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Events
          </TabsTrigger>
          <TabsTrigger
            value="network"
            className="font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Network
          </TabsTrigger>
        </TabsList>

        <TabsContent value="forums" className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Input placeholder="Search forums..." leftIcon={<Search className="h-4 w-4" />} className="h-12" />
            </div>
            <Button
              size="lg"
              leftIcon={<Plus className="h-4 w-4" />}
              className="hover:shadow-md transition-all duration-200"
            >
              Create Forum
            </Button>
          </div>

          <div className="grid gap-6">
            {communityData.forums.map((forum) => (
              <Card key={forum.id} variant="elevated" className="hover:shadow-lg transition-all duration-300 group">
                <CardContent padding="lg">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{forum.title}</h3>
                        {forum.trending && (
                          <Badge variant="warning" size="default" leftIcon={<TrendingUp className="h-3 w-3" />}>
                            Trending
                          </Badge>
                        )}
                        <Badge variant="outline" size="default">
                          {forum.category}
                        </Badge>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-base">{forum.description}</p>
                      <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          {forum.members.toLocaleString()} members
                        </span>
                        <span className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          {forum.posts.toLocaleString()} posts
                        </span>
                        <span>Last activity: {forum.lastActivity}</span>
                      </div>
                    </div>
                    <Button size="lg" className="hover:shadow-md transition-all duration-200 group-hover:scale-105">
                      Join Forum
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="posts" className="space-y-8">
          {/* Create Post */}
          <Card variant="elevated">
            <CardHeader padding="lg">
              <CardTitle className="text-xl font-semibold">Share with the Community</CardTitle>
            </CardHeader>
            <CardContent padding="lg" className="space-y-4">
              <Input placeholder="What's on your mind?" className="h-12" />
              <Textarea
                placeholder="Share your thoughts, experiences, or questions..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                rows={4}
                className="resize-none"
              />
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Badge variant="outline" className="cursor-pointer hover:bg-gray-100 transition-colors">
                    Product
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-gray-100 transition-colors">
                    Funding
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-gray-100 transition-colors">
                    Marketing
                  </Badge>
                </div>
                <Button
                  size="lg"
                  leftIcon={<Plus className="h-4 w-4" />}
                  className="hover:shadow-md transition-all duration-200"
                >
                  Post
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Posts */}
          <div className="space-y-6">
            {communityData.posts.map((post) => (
              <Card key={post.id} variant="elevated" className="hover:shadow-lg transition-all duration-300">
                <CardContent padding="lg">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={post.avatar || "/placeholder.svg"} alt={post.author} />
                        <AvatarFallback className="font-medium">
                          {post.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <p className="font-semibold text-gray-900 dark:text-gray-100">{post.author}</p>
                          <Badge variant="outline" size="sm">
                            {post.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{post.timeAgo}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{post.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400">{post.content}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" size="sm">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          <Heart className="h-4 w-4 mr-2" />
                          {post.likes}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          {post.comments}
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm" className="hover:bg-gray-50 transition-colors">
                        <Share className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Upcoming Community Events</h3>
              <p className="text-base text-gray-600 dark:text-gray-400 mt-1">
                Connect, learn, and grow with fellow founders
              </p>
            </div>
            <Button
              size="lg"
              leftIcon={<Plus className="h-4 w-4" />}
              className="hover:shadow-md transition-all duration-200"
            >
              Create Event
            </Button>
          </div>

          <div className="grid gap-6">
            {communityData.events.map((event) => (
              <Card key={event.id} variant="elevated" className="hover:shadow-lg transition-all duration-300">
                <CardContent padding="lg">
                  <div className="flex items-center justify-between">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center space-x-3">
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{event.title}</h4>
                        <Badge variant={event.type === "Virtual" ? "info" : "outline"} size="default">
                          {event.type}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {event.date} at {event.time}
                        </span>
                        <span>{event.location}</span>
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          {event.attendees}/{event.maxAttendees} attending
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Hosted by {event.host}</p>
                    </div>
                    <div className="flex flex-col space-y-3">
                      <Button
                        size="lg"
                        leftIcon={
                          event.type === "Virtual" ? <Video className="h-4 w-4" /> : <Coffee className="h-4 w-4" />
                        }
                        className="hover:shadow-md transition-all duration-200"
                      >
                        {event.type === "Virtual" ? "Join Online" : "Attend"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="network" className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Input placeholder="Search founders..." leftIcon={<Search className="h-4 w-4" />} className="h-12" />
            </div>
            <Button
              size="lg"
              leftIcon={<UserPlus className="h-4 w-4" />}
              className="hover:shadow-md transition-all duration-200"
            >
              Find Founders
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {communityData.connections.map((connection) => (
              <Card key={connection.id} variant="elevated" className="hover:shadow-lg transition-all duration-300">
                <CardContent padding="lg">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={connection.avatar || "/placeholder.svg"} alt={connection.name} />
                          <AvatarFallback className="text-lg font-medium">
                            {connection.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={cn(
                            "absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white",
                            connection.status === "online" ? "bg-green-500" : "bg-gray-400",
                          )}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 dark:text-gray-100">{connection.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{connection.title}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Stage:</span>
                        <Badge variant="outline" size="sm">
                          {connection.stage}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Industry:</span>
                        <span className="text-gray-900 dark:text-gray-100 font-medium">{connection.industry}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Mutual connections:</span>
                        <span className="text-gray-900 dark:text-gray-100 font-medium">
                          {connection.mutualConnections}
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        fullWidth
                        leftIcon={<UserPlus className="h-4 w-4" />}
                        className="hover:shadow-sm transition-all duration-200"
                      >
                        Connect
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        fullWidth
                        leftIcon={<MessageSquare className="h-4 w-4 bg-transparent" />}
                        className="hover:shadow-sm transition-all duration-200"
                      >
                        Message
                      </Button>
                    </div>
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
