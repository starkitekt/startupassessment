"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/design-system/card"
import { Badge } from "@/components/design-system/badge"
import { Button } from "@/components/design-system/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { designTokens } from "@/lib/design-tokens"
import {
  PieChartIcon,
  TrendingUp,
  Users,
  DollarSign,
  FileText,
  Plus,
  Download,
  AlertCircle,
  CheckCircle,
} from "lucide-react"

// Mock data
const equityData = {
  capTable: [
    { name: "Founders", shares: 7000000, percentage: 70, value: 7000000, type: "Common" },
    { name: "Employee Pool", shares: 1500000, percentage: 15, value: 1500000, type: "Options" },
    { name: "Seed Investors", shares: 1000000, percentage: 10, value: 2000000, type: "Preferred" },
    { name: "Angel Investors", shares: 500000, percentage: 5, value: 1000000, type: "Preferred" },
  ],
  founders: [
    { name: "Sarah Chen", role: "CEO", shares: 4000000, percentage: 40, vesting: 75 },
    { name: "Mike Johnson", role: "CTO", shares: 2000000, percentage: 20, vesting: 60 },
    { name: "Lisa Wang", role: "COO", shares: 1000000, percentage: 10, vesting: 50 },
  ],
  employees: [
    { name: "John Smith", role: "Senior Developer", shares: 50000, percentage: 0.5, vesting: 25 },
    { name: "Emma Davis", role: "Product Manager", shares: 30000, percentage: 0.3, vesting: 40 },
    { name: "Alex Brown", role: "Designer", shares: 20000, percentage: 0.2, vesting: 20 },
  ],
  fundingRounds: [
    { round: "Pre-seed", date: "2023-06-01", amount: 250000, valuation: 2500000, investors: 3 },
    { round: "Seed", date: "2024-03-15", amount: 1000000, valuation: 10000000, investors: 5 },
    { round: "Series A", date: "TBD", amount: 5000000, valuation: 25000000, investors: 0, status: "planned" },
  ],
  documents: [
    { name: "Cap Table Spreadsheet", type: "Excel", lastUpdated: "2024-12-01", status: "current" },
    { name: "Stock Option Plan", type: "PDF", lastUpdated: "2024-11-15", status: "current" },
    { name: "Shareholder Agreement", type: "PDF", lastUpdated: "2024-10-20", status: "current" },
    { name: "Board Resolutions", type: "PDF", lastUpdated: "2024-12-05", status: "current" },
  ],
}

const COLORS = [
  designTokens.colors.primary[500],
  designTokens.colors.semantic.success.default,
  designTokens.colors.chart[4],
  designTokens.colors.chart[5],
]

export function FounderEquityContent() {
  const [activeTab, setActiveTab] = useState("overview")

  const totalShares = equityData.capTable.reduce((sum, item) => sum + item.shares, 0)
  const totalValue = equityData.capTable.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="space-y-8">
      {/* Key Metrics - Enhanced with design system */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card variant="elevated" className="group hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Shares</CardTitle>
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20 group-hover:scale-110 transition-transform duration-200">
              <PieChartIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
              {(totalShares / 1000000).toFixed(1)}M
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Outstanding shares</p>
          </CardContent>
        </Card>

        <Card variant="elevated" className="group hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Company Valuation</CardTitle>
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20 group-hover:scale-110 transition-transform duration-200">
              <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
              ${(totalValue / 1000000).toFixed(1)}M
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Post-money valuation</p>
          </CardContent>
        </Card>

        <Card variant="elevated" className="group hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Stakeholders</CardTitle>
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20 group-hover:scale-110 transition-transform duration-200">
              <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
              {equityData.founders.length + equityData.employees.length + 8}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Total shareholders</p>
          </CardContent>
        </Card>

        <Card variant="elevated" className="group hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Funds Raised</CardTitle>
            <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/20 group-hover:scale-110 transition-transform duration-200">
              <DollarSign className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
              ${(equityData.fundingRounds.reduce((sum, round) => sum + round.amount, 0) / 1000).toFixed(0)}K
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Total funding</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 h-12 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <TabsTrigger
            value="overview"
            className="font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="cap-table"
            className="font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Cap Table
          </TabsTrigger>
          <TabsTrigger
            value="vesting"
            className="font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Vesting
          </TabsTrigger>
          <TabsTrigger
            value="funding"
            className="font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Funding
          </TabsTrigger>
          <TabsTrigger
            value="documents"
            className="font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Documents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Ownership Distribution Chart */}
            <Card variant="elevated">
              <CardHeader padding="lg">
                <CardTitle className="text-xl font-semibold">Ownership Distribution</CardTitle>
                <CardDescription className="text-base">Current equity breakdown by stakeholder group</CardDescription>
              </CardHeader>
              <CardContent padding="lg">
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={equityData.capTable}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name} ${percentage}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="percentage"
                    >
                      {equityData.capTable.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Valuation History */}
            <Card variant="elevated">
              <CardHeader padding="lg">
                <CardTitle className="text-xl font-semibold">Valuation History</CardTitle>
                <CardDescription className="text-base">Company valuation across funding rounds</CardDescription>
              </CardHeader>
              <CardContent padding="lg">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={equityData.fundingRounds.filter((r) => r.status !== "planned")}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="round" stroke="#6b7280" fontSize={12} fontWeight={500} />
                    <YAxis stroke="#6b7280" fontSize={12} fontWeight={500} />
                    <Tooltip
                      formatter={(value) => [`$${(value / 1000000).toFixed(1)}M`, "Valuation"]}
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                    <Bar dataKey="valuation" fill={designTokens.colors.primary[500]} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card variant="elevated">
            <CardHeader padding="lg">
              <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
              <CardDescription className="text-base">Common equity management tasks</CardDescription>
            </CardHeader>
            <CardContent padding="lg" className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button
                size="lg"
                variant="default"
                className="h-auto p-6 flex flex-col items-center space-y-3 hover:shadow-md transition-all duration-200"
              >
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                  <Plus className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="font-medium">Issue Options</span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-auto p-6 flex flex-col items-center space-y-3 hover:shadow-md transition-all duration-200 bg-transparent"
              >
                <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/20">
                  <FileText className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <span className="font-medium">Update Cap Table</span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-auto p-6 flex flex-col items-center space-y-3 hover:shadow-md transition-all duration-200 bg-transparent"
              >
                <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                  <Download className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="font-medium">Export Reports</span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-auto p-6 flex flex-col items-center space-y-3 hover:shadow-md transition-all duration-200 bg-transparent"
              >
                <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900/20">
                  <Users className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <span className="font-medium">Add Shareholder</span>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cap-table" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Capitalization Table</h3>
              <p className="text-base text-gray-600 dark:text-gray-400 mt-1">
                Current ownership structure and share distribution
              </p>
            </div>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                size="lg"
                leftIcon={<Download className="h-4 w-4 bg-transparent" />}
                className="hover:shadow-md transition-all duration-200"
              >
                Export
              </Button>
              <Button
                size="lg"
                leftIcon={<Plus className="h-4 w-4" />}
                className="hover:shadow-md transition-all duration-200"
              >
                Add Entry
              </Button>
            </div>
          </div>

          <Card variant="elevated">
            <CardContent padding="none">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                    <tr className="text-left">
                      <th className="p-4 font-semibold text-gray-900 dark:text-gray-100">Stakeholder</th>
                      <th className="p-4 font-semibold text-gray-900 dark:text-gray-100">Share Type</th>
                      <th className="p-4 font-semibold text-gray-900 dark:text-gray-100">Shares</th>
                      <th className="p-4 font-semibold text-gray-900 dark:text-gray-100">Percentage</th>
                      <th className="p-4 font-semibold text-gray-900 dark:text-gray-100">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {equityData.capTable.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                      >
                        <td className="p-4 font-semibold text-gray-900 dark:text-gray-100">{item.name}</td>
                        <td className="p-4">
                          <Badge variant="outline" size="default">
                            {item.type}
                          </Badge>
                        </td>
                        <td className="p-4 font-medium text-gray-700 dark:text-gray-300">
                          {item.shares.toLocaleString()}
                        </td>
                        <td className="p-4 font-medium text-gray-700 dark:text-gray-300">{item.percentage}%</td>
                        <td className="p-4 font-medium text-gray-700 dark:text-gray-300">
                          ${item.value.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vesting" className="space-y-8">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Vesting Schedules</h3>
            <p className="text-base text-gray-600 dark:text-gray-400 mt-1">
              Track equity vesting progress for founders and employees
            </p>
          </div>

          <div className="space-y-8">
            {/* Founders Vesting */}
            <Card variant="elevated">
              <CardHeader padding="lg">
                <CardTitle className="text-xl font-semibold">Founder Vesting</CardTitle>
                <CardDescription className="text-base">4-year vesting with 1-year cliff</CardDescription>
              </CardHeader>
              <CardContent padding="lg" className="space-y-6">
                {equityData.founders.map((founder, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-100 text-lg">{founder.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {founder.role} • {founder.shares.toLocaleString()} shares ({founder.percentage}%)
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
                          {founder.vesting}% vested
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {Math.round((founder.shares * founder.vesting) / 100).toLocaleString()} shares
                        </p>
                      </div>
                    </div>
                    <Progress value={founder.vesting} className="h-3" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Employee Vesting */}
            <Card variant="elevated">
              <CardHeader padding="lg">
                <CardTitle className="text-xl font-semibold">Employee Vesting</CardTitle>
                <CardDescription className="text-base">Stock option vesting schedules</CardDescription>
              </CardHeader>
              <CardContent padding="lg" className="space-y-6">
                {equityData.employees.map((employee, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">{employee.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {employee.role} • {employee.shares.toLocaleString()} options ({employee.percentage}%)
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-gray-100">{employee.vesting}% vested</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {Math.round((employee.shares * employee.vesting) / 100).toLocaleString()} options
                        </p>
                      </div>
                    </div>
                    <Progress value={employee.vesting} className="h-3" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="funding" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Funding Rounds</h3>
              <p className="text-base text-gray-600 dark:text-gray-400 mt-1">
                Track investment rounds and investor information
              </p>
            </div>
            <Button
              size="lg"
              leftIcon={<Plus className="h-4 w-4" />}
              className="hover:shadow-md transition-all duration-200"
            >
              Add Round
            </Button>
          </div>

          <div className="space-y-6">
            {equityData.fundingRounds.map((round, index) => (
              <Card key={index} variant="elevated" className="hover:shadow-lg transition-all duration-300">
                <CardContent padding="lg">
                  <div className="flex items-center justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{round.round}</h4>
                        {round.status === "planned" ? (
                          <Badge variant="warning" leftIcon={<AlertCircle className="h-3 w-3" />}>
                            Planned
                          </Badge>
                        ) : (
                          <Badge variant="success" leftIcon={<CheckCircle className="h-3 w-3" />}>
                            Completed
                          </Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                        <div>
                          <p className="text-gray-600 dark:text-gray-400 font-medium">Date</p>
                          <p className="font-semibold text-gray-900 dark:text-gray-100">
                            {round.date === "TBD" ? "TBD" : new Date(round.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400 font-medium">Amount</p>
                          <p className="font-semibold text-gray-900 dark:text-gray-100">
                            ${(round.amount / 1000).toFixed(0)}K
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400 font-medium">Valuation</p>
                          <p className="font-semibold text-gray-900 dark:text-gray-100">
                            ${(round.valuation / 1000000).toFixed(1)}M
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400 font-medium">Investors</p>
                          <p className="font-semibold text-gray-900 dark:text-gray-100">{round.investors}</p>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="lg"
                      className="hover:shadow-md transition-all duration-200 bg-transparent"
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Legal Documents</h3>
              <p className="text-base text-gray-600 dark:text-gray-400 mt-1">
                Manage equity-related legal documents and agreements
              </p>
            </div>
            <Button
              size="lg"
              leftIcon={<Plus className="h-4 w-4" />}
              className="hover:shadow-md transition-all duration-200"
            >
              Upload Document
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {equityData.documents.map((doc, index) => (
              <Card key={index} variant="elevated" className="hover:shadow-lg transition-all duration-300">
                <CardContent padding="lg">
                  <div className="flex items-center justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                          <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">{doc.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {doc.type} • Updated {new Date(doc.lastUpdated).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Badge variant="success" size="sm" leftIcon={<CheckCircle className="h-3 w-3" />}>
                        Current
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<Download className="h-4 w-4 bg-transparent" />}
                        className="hover:shadow-sm transition-all duration-200"
                      >
                        Download
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
