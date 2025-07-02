"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  Target,
  TrendingUp,
  Calendar,
  MessageSquare,
  BookOpen,
  Users,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowRight,
  Plus,
  Bell,
  Settings,
} from "lucide-react"

export function FounderDashboardContent() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data
  const founderProfile = {
    name: "Sarah Chen",
    title: "CEO & Co-Founder",
    company: "TechFlow Solutions",
    avatar: "/placeholder-user.jpg",
    joinDate: "March 2024",
    stage: "Seed Stage",
    progress: 68,
  }

  const quickStats = [
    {
      title: "Funding Raised",
      value: "$250K",
      change: "+15%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Team Size",
      value: "8",
      change: "+2",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Monthly Revenue",
      value: "$12K",
      change: "+8%",
      trend: "up",
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      title: "Active Users",
      value: "1.2K",
      change: "+23%",
      trend: "up",
      icon: User,
      color: "text-orange-600",
    },
  ]

  const milestones = [
    {
      id: 1,
      title: "Complete MVP Development",
      status: "completed",
      dueDate: "2024-01-15",
      progress: 100,
    },
    {
      id: 2,
      title: "Secure Seed Funding",
      status: "in-progress",
      dueDate: "2024-03-30",
      progress: 75,
    },
    {
      id: 3,
      title: "Launch Beta Program",
      status: "pending",
      dueDate: "2024-04-15",
      progress: 25,
    },
    {
      id: 4,
      title: "Hire Technical Team",
      status: "pending",
      dueDate: "2024-05-01",
      progress: 0,
    },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Investor Pitch Session",
      date: "2024-02-15",
      time: "2:00 PM",
      type: "meeting",
    },
    {
      id: 2,
      title: "Product Demo Day",
      date: "2024-02-20",
      time: "10:00 AM",
      type: "event",
    },
    {
      id: 3,
      title: "Mentor Session with John Doe",
      date: "2024-02-22",
      time: "3:00 PM",
      type: "mentorship",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      action: "Submitted funding application",
      timestamp: "2 hours ago",
      type: "funding",
    },
    {
      id: 2,
      action: "Completed market research milestone",
      timestamp: "1 day ago",
      type: "milestone",
    },
    {
      id: 3,
      action: "Attended networking event",
      timestamp: "3 days ago",
      type: "event",
    },
    {
      id: 4,
      action: "Updated business plan",
      timestamp: "1 week ago",
      type: "document",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-orange-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            In Progress
          </Badge>
        )
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={founderProfile.avatar || "/placeholder.svg"} alt={founderProfile.name} />
            <AvatarFallback>
              {founderProfile.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{founderProfile.name}</h1>
            <p className="text-gray-600">
              {founderProfile.title} at {founderProfile.company}
            </p>
            <div className="flex items-center gap-4 mt-1">
              <Badge variant="outline">{founderProfile.stage}</Badge>
              <span className="text-sm text-gray-500">Joined {founderProfile.joinDate}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Overall Progress
          </CardTitle>
          <CardDescription>Your journey through the incubator program</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Program Completion</span>
              <span>{founderProfile.progress}%</span>
            </div>
            <Progress value={founderProfile.progress} className="h-2" />
            <p className="text-xs text-gray-600">You're making great progress! Keep up the momentum.</p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${stat.color} flex items-center gap-1`}>
                    <TrendingUp className="h-3 w-3" />
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-gray-100`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Current Milestones */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Current Milestones
                  </span>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {milestones.slice(0, 3).map((milestone) => (
                  <div key={milestone.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    {getStatusIcon(milestone.status)}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{milestone.title}</p>
                      <p className="text-xs text-gray-500">Due: {milestone.dueDate}</p>
                      <Progress value={milestone.progress} className="h-1 mt-2" />
                    </div>
                    {getStatusBadge(milestone.status)}
                  </div>
                ))}
                <Button variant="ghost" className="w-full">
                  View All Milestones
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Calendar className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{event.title}</p>
                      <p className="text-xs text-gray-500">
                        {event.date} at {event.time}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {event.type}
                    </Badge>
                  </div>
                ))}
                <Button variant="ghost" className="w-full">
                  View Calendar
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts to help you stay productive</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <BookOpen className="h-6 w-6" />
                  <span className="text-xs">Learning Hub</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <Users className="h-6 w-6" />
                  <span className="text-xs">Find Mentors</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <DollarSign className="h-6 w-6" />
                  <span className="text-xs">Apply for Funding</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <MessageSquare className="h-6 w-6" />
                  <span className="text-xs">Community</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>All Milestones</span>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Milestone
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {milestones.map((milestone) => (
                <div key={milestone.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  {getStatusIcon(milestone.status)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{milestone.title}</h3>
                      {getStatusBadge(milestone.status)}
                    </div>
                    <p className="text-sm text-gray-500 mb-2">Due: {milestone.dueDate}</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>{milestone.progress}%</span>
                      </div>
                      <Progress value={milestone.progress} className="h-2" />
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Stay updated with important dates and deadlines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="text-sm text-gray-500">
                      {event.date} at {event.time}
                    </p>
                  </div>
                  <Badge variant="outline">{event.type}</Badge>
                  <Button variant="ghost" size="sm">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Track your progress and recent actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-4 p-3 border-l-4 border-blue-200 bg-blue-50 rounded-r-lg"
                >
                  <div className="p-2 bg-white rounded-lg">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.timestamp}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
