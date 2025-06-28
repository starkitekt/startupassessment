"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { Target, CheckCircle, Clock, AlertTriangle, Users, DollarSign, Award, Plus } from "lucide-react"

// Mock data
const progressData = {
  milestones: [
    {
      id: 1,
      title: "Business Plan Completion",
      status: "completed",
      dueDate: "2024-01-15",
      completedDate: "2024-01-12",
      category: "Planning",
    },
    {
      id: 2,
      title: "MVP Development",
      status: "completed",
      dueDate: "2024-03-01",
      completedDate: "2024-02-28",
      category: "Product",
    },
    {
      id: 3,
      title: "First Customer Acquisition",
      status: "completed",
      dueDate: "2024-04-15",
      completedDate: "2024-04-10",
      category: "Sales",
    },
    { id: 4, title: "Seed Funding Application", status: "in-progress", dueDate: "2024-12-31", category: "Funding" },
    { id: 5, title: "Team Expansion (5 members)", status: "pending", dueDate: "2025-02-01", category: "Team" },
    { id: 6, title: "Product-Market Fit Validation", status: "pending", dueDate: "2025-03-15", category: "Product" },
  ],
  metrics: [
    { month: "Jan", revenue: 5000, users: 120, funding: 0 },
    { month: "Feb", revenue: 8000, users: 180, funding: 0 },
    { month: "Mar", revenue: 12000, users: 250, funding: 0 },
    { month: "Apr", revenue: 18000, users: 340, funding: 0 },
    { month: "May", revenue: 25000, users: 450, funding: 0 },
    { month: "Jun", revenue: 35000, users: 580, funding: 50000 },
  ],
  kpis: {
    revenue: { current: 35000, target: 50000, growth: 40 },
    users: { current: 580, target: 1000, growth: 28.9 },
    funding: { current: 50000, target: 500000, growth: 0 },
    team: { current: 3, target: 8, growth: 0 },
  },
}

export function FounderProgressContent() {
  const [activeTab, setActiveTab] = useState("overview")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/20">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
        )
      case "in-progress":
        return (
          <div className="p-2 rounded-full bg-yellow-100 dark:bg-yellow-900/20">
            <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          </div>
        )
      case "pending":
        return (
          <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
            <AlertTriangle className="h-5 w-5 text-gray-400" />
          </div>
        )
      default:
        return (
          <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
            <Clock className="h-5 w-5 text-gray-400" />
          </div>
        )
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "secondary"
      case "in-progress":
        return "outline"
      case "pending":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-8">
      {/* KPI Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Monthly Revenue</CardTitle>
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20 group-hover:scale-110 transition-transform duration-200">
              <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight mb-3">
              ${progressData.kpis.revenue.current.toLocaleString()}
            </div>
            <Progress
              value={(progressData.kpis.revenue.current / progressData.kpis.revenue.target) * 100}
              className="h-2 mb-2"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Target: ${progressData.kpis.revenue.target.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</CardTitle>
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20 group-hover:scale-110 transition-transform duration-200">
              <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight mb-3">
              {progressData.kpis.users.current.toLocaleString()}
            </div>
            <Progress
              value={(progressData.kpis.users.current / progressData.kpis.users.target) * 100}
              className="h-2 mb-2"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Target: {progressData.kpis.users.target.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Funding Raised</CardTitle>
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20 group-hover:scale-110 transition-transform duration-200">
              <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight mb-3">
              ${(progressData.kpis.funding.current / 1000).toFixed(0)}K
            </div>
            <Progress
              value={(progressData.kpis.funding.current / progressData.kpis.funding.target) * 100}
              className="h-2 mb-2"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Target: ${(progressData.kpis.funding.target / 1000).toFixed(0)}K
            </p>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Team Size</CardTitle>
            <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/20 group-hover:scale-110 transition-transform duration-200">
              <Users className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight mb-3">
              {progressData.kpis.team.current}
            </div>
            <Progress
              value={(progressData.kpis.team.current / progressData.kpis.team.target) * 100}
              className="h-2 mb-2"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">Target: {progressData.kpis.team.target} members</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Progress Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Progress Summary</CardTitle>
                <CardDescription>Your startup's overall progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-700 dark:text-gray-300">Completed Milestones</span>
                    <span className="text-gray-900 dark:text-gray-100">3/6</span>
                  </div>
                  <Progress value={50} className="h-3" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-700 dark:text-gray-300">Revenue Target</span>
                    <span className="text-gray-900 dark:text-gray-100">70%</span>
                  </div>
                  <Progress value={70} className="h-3" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-700 dark:text-gray-300">User Acquisition</span>
                    <span className="text-gray-900 dark:text-gray-100">58%</span>
                  </div>
                  <Progress value={58} className="h-3" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-700 dark:text-gray-300">Funding Progress</span>
                    <span className="text-gray-900 dark:text-gray-100">10%</span>
                  </div>
                  <Progress value={10} className="h-3" />
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Recent Achievements</CardTitle>
                <CardDescription>Your latest accomplishments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {progressData.milestones
                  .filter((m) => m.status === "completed")
                  .slice(-3)
                  .map((milestone) => (
                    <div
                      key={milestone.id}
                      className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800/50 hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
                    >
                      <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
                        <Award className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 dark:text-gray-100">{milestone.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Completed on {new Date(milestone.completedDate!).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Startup Milestones</h3>
              <p className="text-base text-gray-600 dark:text-gray-400 mt-1">Track your key objectives and deadlines</p>
            </div>
            <Button size="lg" className="hover:shadow-md transition-all duration-200">
              <Plus className="h-4 w-4 mr-2" />
              Add Milestone
            </Button>
          </div>

          <div className="space-y-4">
            {progressData.milestones.map((milestone) => (
              <Card key={milestone.id} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(milestone.status)}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{milestone.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Due: {new Date(milestone.dueDate).toLocaleDateString()}
                          {milestone.completedDate && (
                            <span className="ml-2">
                              • Completed: {new Date(milestone.completedDate).toLocaleDateString()}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline">{milestone.category}</Badge>
                      <Badge variant={getStatusBadgeVariant(milestone.status)}>
                        {milestone.status.replace("-", " ")}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-8">
          <div className="grid gap-8">
            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Revenue Growth</CardTitle>
                <CardDescription>Monthly revenue progression</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={progressData.metrics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" fontSize={12} fontWeight={500} />
                    <YAxis stroke="#6b7280" fontSize={12} fontWeight={500} />
                    <Tooltip
                      formatter={(value) => [`$${value}`, "Revenue"]}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* User Growth Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">User Acquisition</CardTitle>
                <CardDescription>Monthly active user growth</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={progressData.metrics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" fontSize={12} fontWeight={500} />
                    <YAxis stroke="#6b7280" fontSize={12} fontWeight={500} />
                    <Tooltip
                      formatter={(value) => [value, "Users"]}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                    <Bar dataKey="users" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
