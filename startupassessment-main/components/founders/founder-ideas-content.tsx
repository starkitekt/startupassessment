"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Lightbulb,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Share,
  Plus,
  TrendingUp,
  Target,
  Search,
  Filter,
  Star,
} from "lucide-react"

// Mock data
const ideasData = {
  myIdeas: [
    {
      id: 1,
      title: "AI-Powered Code Review Assistant",
      description: "An AI tool that automatically reviews code for bugs, security issues, and best practices",
      category: "Developer Tools",
      stage: "Concept",
      votes: { up: 24, down: 3 },
      comments: 12,
      createdAt: "2024-12-01",
      tags: ["AI", "Developer Tools", "Automation"],
      status: "active",
    },
    {
      id: 2,
      title: "Sustainable Food Delivery Platform",
      description: "A delivery platform focused on eco-friendly packaging and local sustainable restaurants",
      category: "Food & Beverage",
      stage: "Validation",
      votes: { up: 18, down: 5 },
      comments: 8,
      createdAt: "2024-11-28",
      tags: ["Sustainability", "Food", "Delivery"],
      status: "active",
    },
  ],
  communityIdeas: [
    {
      id: 3,
      title: "Remote Team Wellness Platform",
      description: "A comprehensive platform for managing remote team mental health and wellness",
      author: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      category: "HR Tech",
      stage: "MVP",
      votes: { up: 45, down: 2 },
      comments: 23,
      createdAt: "2024-12-05",
      tags: ["Remote Work", "Wellness", "HR"],
    },
    {
      id: 4,
      title: "Blockchain-Based Supply Chain Tracker",
      description: "Track products from manufacture to consumer using blockchain technology",
      author: "Sarah Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      category: "Supply Chain",
      stage: "Concept",
      votes: { up: 32, down: 8 },
      comments: 15,
      createdAt: "2024-12-03",
      tags: ["Blockchain", "Supply Chain", "Transparency"],
    },
  ],
  feedback: [
    {
      id: 1,
      ideaId: 1,
      author: "Mike Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      content: "This is a great idea! Have you considered integrating with popular IDEs like VS Code?",
      rating: 5,
      createdAt: "2024-12-02",
    },
    {
      id: 2,
      ideaId: 1,
      author: "Lisa Wang",
      avatar: "/placeholder.svg?height=32&width=32",
      content: "The market is quite competitive. How would you differentiate from existing tools like SonarQube?",
      rating: 4,
      createdAt: "2024-12-01",
    },
  ],
}

export function FounderIdeasContent() {
  const [activeTab, setActiveTab] = useState("my-ideas")
  const [newIdeaTitle, setNewIdeaTitle] = useState("")
  const [newIdeaDescription, setNewIdeaDescription] = useState("")

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Ideas</CardTitle>
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ideasData.myIdeas.length}</div>
            <p className="text-xs text-muted-foreground">Active concepts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Votes</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ideasData.myIdeas.reduce((sum, idea) => sum + idea.votes.up, 0)}</div>
            <p className="text-xs text-muted-foreground">Community support</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comments</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ideasData.myIdeas.reduce((sum, idea) => sum + idea.comments, 0)}</div>
            <p className="text-xs text-muted-foreground">Feedback received</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Validation Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.2</div>
            <p className="text-xs text-muted-foreground">Average rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="my-ideas">My Ideas</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="submit">Submit Idea</TabsTrigger>
        </TabsList>

        <TabsContent value="my-ideas" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">My Ideas</h3>
              <p className="text-sm text-muted-foreground">Track your submitted ideas and their validation progress</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Idea
            </Button>
          </div>

          <div className="space-y-4">
            {ideasData.myIdeas.map((idea) => (
              <Card key={idea.id}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-lg">{idea.title}</h4>
                          <Badge variant="outline">{idea.category}</Badge>
                          <Badge variant="secondary">{idea.stage}</Badge>
                        </div>
                        <p className="text-muted-foreground">{idea.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {idea.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="h-4 w-4 text-green-600" />
                          <span>{idea.votes.up}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ThumbsDown className="h-4 w-4 text-red-600" />
                          <span>{idea.votes.down}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{idea.comments} comments</span>
                        </div>
                        <span>Created {new Date(idea.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Share className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="community" className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search ideas..." className="pl-10" />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline">
                <TrendingUp className="h-4 w-4 mr-2" />
                Trending
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {ideasData.communityIdeas.map((idea) => (
              <Card key={idea.id}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={idea.avatar || "/placeholder.svg"} alt={idea.author} />
                        <AvatarFallback>
                          {idea.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{idea.author}</p>
                        <p className="text-sm text-muted-foreground">{new Date(idea.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-lg">{idea.title}</h4>
                        <Badge variant="outline">{idea.category}</Badge>
                        <Badge variant="secondary">{idea.stage}</Badge>
                      </div>
                      <p className="text-muted-foreground">{idea.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {idea.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-4">
                        <Button size="sm" variant="ghost">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {idea.votes.up}
                        </Button>
                        <Button size="sm" variant="ghost">
                          <ThumbsDown className="h-4 w-4 mr-1" />
                          {idea.votes.down}
                        </Button>
                        <Button size="sm" variant="ghost">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {idea.comments}
                        </Button>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Share className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                        <Button size="sm">Provide Feedback</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold">Feedback Received</h3>
            <p className="text-sm text-muted-foreground">Community feedback on your ideas</p>
          </div>

          <div className="space-y-4">
            {ideasData.feedback.map((feedback) => (
              <Card key={feedback.id}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={feedback.avatar || "/placeholder.svg"} alt={feedback.author} />
                          <AvatarFallback>
                            {feedback.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{feedback.author}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(feedback.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < feedback.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{feedback.content}</p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Helpful
                      </Button>
                      <Button size="sm" variant="outline">
                        Reply
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="submit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Submit New Idea</CardTitle>
              <CardDescription>
                Share your startup idea with the community to get valuable feedback and validation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Idea Title</label>
                <Input
                  placeholder="Enter a compelling title for your idea"
                  value={newIdeaTitle}
                  onChange={(e) => setNewIdeaTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Describe your idea in detail. What problem does it solve? Who is your target audience?"
                  rows={6}
                  value={newIdeaDescription}
                  onChange={(e) => setNewIdeaDescription(e.target.value)}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Select a category</option>
                    <option>Developer Tools</option>
                    <option>Food & Beverage</option>
                    <option>HR Tech</option>
                    <option>Supply Chain</option>
                    <option>Healthcare</option>
                    <option>Education</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Stage</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Concept</option>
                    <option>Validation</option>
                    <option>MVP</option>
                    <option>Beta</option>
                    <option>Launch</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tags</label>
                <Input placeholder="Add tags separated by commas (e.g., AI, SaaS, Mobile)" />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">Save Draft</Button>
                <Button>
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Submit Idea
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
