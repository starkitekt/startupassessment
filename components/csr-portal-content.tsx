"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Heart,
  Users,
  Target,
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  Award,
  FileText,
  Plus,
  Download,
  Eye,
  Building2,
  Handshake,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Star,
  Globe,
  TreePine,
  GraduationCap,
  Briefcase,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for CSR initiatives
const mockCSRInitiatives = [
  {
    id: "csr001",
    title: "Green Tech Accelerator",
    description: "Supporting startups focused on environmental sustainability and clean technology solutions.",
    category: "Environmental",
    status: "Active",
    startDate: "2024-01-15",
    endDate: "2024-12-31",
    budget: 250000,
    spent: 180000,
    beneficiaries: 45,
    partners: ["EcoVentures", "GreenFund Capital", "Sustainable Solutions Inc."],
    impact: {
      co2Reduced: "1,200 tons",
      jobsCreated: 78,
      startupsSupported: 12,
      patentsGenerated: 8,
    },
    milestones: [
      { title: "Program Launch", completed: true, date: "2024-01-15" },
      { title: "First Cohort Selection", completed: true, date: "2024-02-28" },
      { title: "Mid-Program Review", completed: true, date: "2024-06-15" },
      { title: "Final Showcase", completed: false, date: "2024-12-15" },
    ],
  },
  {
    id: "csr002",
    title: "Digital Inclusion Program",
    description: "Bridging the digital divide by supporting underrepresented entrepreneurs in tech.",
    category: "Social",
    status: "Active",
    startDate: "2024-03-01",
    endDate: "2025-02-28",
    budget: 180000,
    spent: 95000,
    beneficiaries: 32,
    partners: ["TechForAll", "Diversity Ventures", "Community Tech Hub"],
    impact: {
      diversityIncrease: "40%",
      jobsCreated: 52,
      startupsSupported: 8,
      mentorshipHours: 1200,
    },
    milestones: [
      { title: "Community Outreach", completed: true, date: "2024-03-01" },
      { title: "Mentor Network Setup", completed: true, date: "2024-04-15" },
      { title: "First Cohort Launch", completed: false, date: "2024-07-01" },
      { title: "Impact Assessment", completed: false, date: "2025-01-15" },
    ],
  },
  {
    id: "csr003",
    title: "Rural Innovation Hub",
    description: "Establishing innovation centers in rural areas to support local entrepreneurship.",
    category: "Economic Development",
    status: "Planning",
    startDate: "2024-09-01",
    endDate: "2025-08-31",
    budget: 320000,
    spent: 0,
    beneficiaries: 0,
    partners: ["Rural Development Corp", "Local Government Alliance"],
    impact: {},
    milestones: [
      { title: "Site Selection", completed: false, date: "2024-09-01" },
      { title: "Infrastructure Setup", completed: false, date: "2024-11-01" },
      { title: "Program Launch", completed: false, date: "2025-01-01" },
      { title: "First Cohort", completed: false, date: "2025-03-01" },
    ],
  },
]

// Mock data for upcoming events
const mockUpcomingEvents = [
  {
    id: "event001",
    title: "CSR Impact Summit 2024",
    description: "Annual summit showcasing the impact of our CSR initiatives and future roadmap.",
    date: "2024-08-15",
    time: "09:00 AM",
    location: "Innovation Center, Downtown",
    type: "Summit",
    capacity: 200,
    registered: 156,
    speakers: ["Dr. Sarah Chen", "Mark Rodriguez", "Lisa Thompson"],
    agenda: [
      "Opening Keynote: The Future of Corporate Social Responsibility",
      "Panel: Measuring Social Impact in Startup Ecosystems",
      "Workshop: Building Sustainable Partnerships",
      "Closing: Commitment Ceremony for New Partners",
    ],
  },
  {
    id: "event002",
    title: "Green Tech Showcase",
    description: "Presenting innovative solutions from our Green Tech Accelerator cohort.",
    date: "2024-07-22",
    time: "02:00 PM",
    location: "Virtual Event",
    type: "Showcase",
    capacity: 500,
    registered: 287,
    speakers: ["Environmental Startups Cohort"],
    agenda: [
      "Welcome & Program Overview",
      "Startup Pitch Presentations",
      "Impact Metrics Review",
      "Networking Session",
    ],
  },
  {
    id: "event003",
    title: "Community Volunteer Day",
    description: "Team building through community service and local impact projects.",
    date: "2024-07-30",
    time: "08:00 AM",
    location: "Various Community Sites",
    type: "Volunteer",
    capacity: 100,
    registered: 78,
    speakers: [],
    agenda: [
      "Morning Briefing & Team Assignments",
      "Community Service Activities",
      "Lunch & Reflection Session",
      "Impact Documentation",
    ],
  },
]

// Mock data for corporate partners
const mockCorporatePartners = [
  {
    id: "partner001",
    name: "TechCorp Global",
    logo: "/placeholder.svg?height=60&width=120",
    tier: "Platinum",
    commitmentAmount: 500000,
    commitmentPeriod: "2024-2026",
    focusAreas: ["Technology", "Education", "Environmental"],
    currentContributions: 350000,
    initiativesSupported: 5,
    impactMetrics: {
      startupsSupported: 25,
      jobsCreated: 120,
      co2Reduced: "800 tons",
    },
    contactPerson: "Jennifer Walsh",
    contactEmail: "j.walsh@techcorp.com",
    nextReview: "2024-09-15",
    status: "Active",
  },
  {
    id: "partner002",
    name: "GreenFund Capital",
    logo: "/placeholder.svg?height=60&width=120",
    tier: "Gold",
    commitmentAmount: 300000,
    commitmentPeriod: "2024-2025",
    focusAreas: ["Environmental", "Clean Energy"],
    currentContributions: 180000,
    initiativesSupported: 2,
    impactMetrics: {
      startupsSupported: 12,
      jobsCreated: 45,
      co2Reduced: "400 tons",
    },
    contactPerson: "Michael Green",
    contactEmail: "m.green@greenfund.com",
    nextReview: "2024-08-30",
    status: "Active",
  },
  {
    id: "partner003",
    name: "Community First Bank",
    logo: "/placeholder.svg?height=60&width=120",
    tier: "Silver",
    commitmentAmount: 150000,
    commitmentPeriod: "2024-2024",
    focusAreas: ["Economic Development", "Financial Inclusion"],
    currentContributions: 75000,
    initiativesSupported: 1,
    impactMetrics: {
      startupsSupported: 8,
      jobsCreated: 32,
      loansProvided: 15,
    },
    contactPerson: "David Martinez",
    contactEmail: "d.martinez@communityfirst.com",
    nextReview: "2024-12-01",
    status: "Active",
  },
]

// Mock data for impact metrics
const impactMetrics = {
  totalBudget: 750000,
  totalSpent: 275000,
  totalBeneficiaries: 77,
  totalPartners: 8,
  activeInitiatives: 2,
  completedInitiatives: 0,
  totalJobsCreated: 150,
  totalCO2Reduced: "1,600 tons",
  totalStartupsSupported: 45,
  volunteerHours: 2400,
}

export function CSRPortalContent() {
  const [selectedInitiative, setSelectedInitiative] = useState<string | null>(null)
  const [newPartnerDialog, setNewPartnerDialog] = useState(false)
  const [newInitiativeDialog, setNewInitiativeDialog] = useState(false)
  const [eventRegistrationDialog, setEventRegistrationDialog] = useState<string | null>(null)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Environmental":
        return TreePine
      case "Social":
        return Users
      case "Economic Development":
        return Briefcase
      default:
        return Target
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Environmental":
        return "bg-green-500/10 text-green-600 border-green-500/20"
      case "Social":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20"
      case "Economic Development":
        return "bg-purple-500/10 text-purple-600 border-purple-500/20"
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Platinum":
        return "bg-slate-500/10 text-slate-600 border-slate-500/20"
      case "Gold":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      case "Silver":
        return "bg-gray-400/10 text-gray-600 border-gray-400/20"
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    }
  }

  return (
    <div className="space-y-8 p-4 md:p-6 lg:p-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary" /> CSR Portal
          </h1>
          <p className="text-lg text-muted-foreground">
            Corporate Social Responsibility initiatives driving positive impact through startup innovation.
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={newInitiativeDialog} onOpenChange={setNewInitiativeDialog}>
            <DialogTrigger asChild>
              <Button className="jpmc-gradient">
                <Plus className="mr-2 h-4 w-4" /> New Initiative
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New CSR Initiative</DialogTitle>
                <DialogDescription>
                  Launch a new corporate social responsibility initiative to drive positive impact.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="initiative-title">Initiative Title</Label>
                    <Input id="initiative-title" placeholder="Enter initiative title" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="initiative-category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="environmental">Environmental</SelectItem>
                        <SelectItem value="social">Social</SelectItem>
                        <SelectItem value="economic">Economic Development</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="initiative-description">Description</Label>
                  <Textarea id="initiative-description" placeholder="Describe the initiative's goals and approach" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="initiative-budget">Budget ($)</Label>
                    <Input id="initiative-budget" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="initiative-start">Start Date</Label>
                    <Input id="initiative-start" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="initiative-end">End Date</Label>
                    <Input id="initiative-end" type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Target Impact Metrics</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="jobs" />
                      <Label htmlFor="jobs">Jobs Created</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="startups" />
                      <Label htmlFor="startups">Startups Supported</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="co2" />
                      <Label htmlFor="co2">CO2 Reduction</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="diversity" />
                      <Label htmlFor="diversity">Diversity & Inclusion</Label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setNewInitiativeDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setNewInitiativeDialog(false)}>Create Initiative</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export Report
          </Button>
        </div>
      </header>

      {/* Impact Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${impactMetrics.totalSpent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">of ${impactMetrics.totalBudget.toLocaleString()} allocated</p>
            <Progress value={(impactMetrics.totalSpent / impactMetrics.totalBudget) * 100} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lives Impacted</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{impactMetrics.totalBeneficiaries}</div>
            <p className="text-xs text-muted-foreground">Direct beneficiaries</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jobs Created</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{impactMetrics.totalJobsCreated}</div>
            <p className="text-xs text-muted-foreground">Across all initiatives</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Environmental Impact</CardTitle>
            <TreePine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{impactMetrics.totalCO2Reduced}</div>
            <p className="text-xs text-muted-foreground">CO2 reduction achieved</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="initiatives" className="space-y-6">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-4">
          <TabsTrigger value="initiatives">Initiatives</TabsTrigger>
          <TabsTrigger value="partners">Corporate Partners</TabsTrigger>
          <TabsTrigger value="events">Events & Engagement</TabsTrigger>
          <TabsTrigger value="impact">Impact Dashboard</TabsTrigger>
        </TabsList>

        <TabsContent value="initiatives" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active CSR Initiatives</CardTitle>
              <CardDescription>
                Manage and track the progress of ongoing corporate social responsibility programs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {mockCSRInitiatives.map((initiative) => {
                  const CategoryIcon = getCategoryIcon(initiative.category)
                  const progressPercentage = initiative.budget > 0 ? (initiative.spent / initiative.budget) * 100 : 0
                  const completedMilestones = initiative.milestones.filter((m) => m.completed).length
                  const totalMilestones = initiative.milestones.length

                  return (
                    <Card key={initiative.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <CategoryIcon className="h-5 w-5 text-primary" />
                            <CardTitle className="text-lg">{initiative.title}</CardTitle>
                          </div>
                          <Badge variant="outline" className={cn(getCategoryColor(initiative.category), "text-xs")}>
                            {initiative.category}
                          </Badge>
                        </div>
                        <CardDescription className="line-clamp-2">{initiative.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Budget Progress</span>
                            <span>
                              ${initiative.spent.toLocaleString()} / ${initiative.budget.toLocaleString()}
                            </span>
                          </div>
                          <Progress value={progressPercentage} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Milestones</span>
                            <span>
                              {completedMilestones} / {totalMilestones}
                            </span>
                          </div>
                          <Progress value={(completedMilestones / totalMilestones) * 100} className="h-2" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Beneficiaries</p>
                            <p className="font-semibold">{initiative.beneficiaries}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Partners</p>
                            <p className="font-semibold">{initiative.partners.length}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="flex-1">
                                <Eye className="mr-2 h-4 w-4" /> View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                  <CategoryIcon className="h-5 w-5" />
                                  {initiative.title}
                                </DialogTitle>
                                <DialogDescription>{initiative.description}</DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-6">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                  <div>
                                    <p className="text-sm text-muted-foreground">Status</p>
                                    <Badge variant={initiative.status === "Active" ? "default" : "secondary"}>
                                      {initiative.status}
                                    </Badge>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Duration</p>
                                    <p className="font-semibold">
                                      {new Date(initiative.startDate).toLocaleDateString()} -{" "}
                                      {new Date(initiative.endDate).toLocaleDateString()}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Budget</p>
                                    <p className="font-semibold">${initiative.budget.toLocaleString()}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Spent</p>
                                    <p className="font-semibold">${initiative.spent.toLocaleString()}</p>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-semibold mb-3">Impact Metrics</h4>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {Object.entries(initiative.impact).map(([key, value]) => (
                                      <div key={key} className="p-3 bg-muted/50 rounded-md">
                                        <p className="text-sm text-muted-foreground capitalize">
                                          {key.replace(/([A-Z])/g, " $1").trim()}
                                        </p>
                                        <p className="font-semibold">{value}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-semibold mb-3">Milestones</h4>
                                  <div className="space-y-3">
                                    {initiative.milestones.map((milestone, index) => (
                                      <div key={index} className="flex items-center gap-3">
                                        {milestone.completed ? (
                                          <CheckCircle className="h-5 w-5 text-green-500" />
                                        ) : (
                                          <AlertCircle className="h-5 w-5 text-yellow-500" />
                                        )}
                                        <div className="flex-1">
                                          <p
                                            className={cn(
                                              "font-medium",
                                              milestone.completed && "text-muted-foreground",
                                            )}
                                          >
                                            {milestone.title}
                                          </p>
                                          <p className="text-sm text-muted-foreground">
                                            {new Date(milestone.date).toLocaleDateString()}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-semibold mb-3">Partners</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {initiative.partners.map((partner, index) => (
                                      <Badge key={index} variant="outline">
                                        {partner}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button size="sm" className="flex-1">
                            <FileText className="mr-2 h-4 w-4" /> Generate Report
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="partners" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Corporate Partners</CardTitle>
                <CardDescription>
                  Manage relationships with corporate partners and track their contributions to CSR initiatives.
                </CardDescription>
              </div>
              <Dialog open={newPartnerDialog} onOpenChange={setNewPartnerDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Partner
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Corporate Partner</DialogTitle>
                    <DialogDescription>
                      Register a new corporate partner and define their commitment to CSR initiatives.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="partner-name">Company Name</Label>
                        <Input id="partner-name" placeholder="Enter company name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="partner-tier">Partnership Tier</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select tier" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="platinum">Platinum ($500K+)</SelectItem>
                            <SelectItem value="gold">Gold ($250K-$499K)</SelectItem>
                            <SelectItem value="silver">Silver ($100K-$249K)</SelectItem>
                            <SelectItem value="bronze">Bronze ($50K-$99K)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="commitment-amount">Commitment Amount ($)</Label>
                        <Input id="commitment-amount" type="number" placeholder="0" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="commitment-period">Commitment Period</Label>
                        <Input id="commitment-period" placeholder="e.g., 2024-2026" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Focus Areas</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="env" />
                          <Label htmlFor="env">Environmental</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="social" />
                          <Label htmlFor="social">Social</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="economic" />
                          <Label htmlFor="economic">Economic Development</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="education" />
                          <Label htmlFor="education">Education</Label>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contact-person">Contact Person</Label>
                        <Input id="contact-person" placeholder="Full name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-email">Contact Email</Label>
                        <Input id="contact-email" type="email" placeholder="email@company.com" />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setNewPartnerDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setNewPartnerDialog(false)}>Add Partner</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockCorporatePartners.map((partner) => (
                  <Card key={partner.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                            <Building2 className="h-8 w-8 text-muted-foreground" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold">{partner.name}</h3>
                            <p className="text-muted-foreground">{partner.contactPerson}</p>
                            <p className="text-sm text-muted-foreground">{partner.contactEmail}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={cn("mb-2", getTierColor(partner.tier))}>{partner.tier} Partner</Badge>
                          <p className="text-sm text-muted-foreground">
                            Next Review: {new Date(partner.nextReview).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Commitment Progress</p>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-lg font-semibold">
                                ${partner.currentContributions.toLocaleString()}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                / ${partner.commitmentAmount.toLocaleString()}
                              </span>
                            </div>
                            <Progress
                              value={(partner.currentContributions / partner.commitmentAmount) * 100}
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Commitment Period</p>
                            <p className="font-semibold">{partner.commitmentPeriod}</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Focus Areas</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {partner.focusAreas.map((area, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {area}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Initiatives Supported</p>
                            <p className="font-semibold">{partner.initiativesSupported}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">Impact Metrics</p>
                          <div className="space-y-1">
                            {Object.entries(partner.impactMetrics).map(([key, value]) => (
                              <div key={key} className="flex justify-between text-sm">
                                <span className="capitalize">{key.replace(/([A-Z])/g, " $1").trim()}:</span>
                                <span className="font-semibold">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-6">
                        <Button variant="outline" size="sm">
                          <FileText className="mr-2 h-4 w-4" /> Partnership Report
                        </Button>
                        <Button variant="outline" size="sm">
                          <Handshake className="mr-2 h-4 w-4" /> Schedule Review
                        </Button>
                        <Button size="sm">
                          <BarChart3 className="mr-2 h-4 w-4" /> View Impact
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events & Engagement</CardTitle>
              <CardDescription>CSR events, showcases, and community engagement opportunities.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockUpcomingEvents.map((event) => (
                  <Card key={event.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                          <p className="text-muted-foreground mb-3">{event.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(event.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {event.time}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {event.location}
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {event.type}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Registration Progress</p>
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-semibold">{event.registered} registered</span>
                            <span className="text-sm text-muted-foreground">/ {event.capacity} capacity</span>
                          </div>
                          <Progress value={(event.registered / event.capacity) * 100} className="h-2" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Speakers</p>
                          <div className="flex flex-wrap gap-1">
                            {event.speakers.length > 0 ? (
                              event.speakers.map((speaker, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {speaker}
                                </Badge>
                              ))
                            ) : (
                              <span className="text-sm text-muted-foreground">Community-led</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground mb-2">Agenda</p>
                        <ul className="space-y-1">
                          {event.agenda.map((item, index) => (
                            <li key={index} className="text-sm flex items-start gap-2">
                              <span className="text-muted-foreground">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex gap-2">
                        <Dialog
                          open={eventRegistrationDialog === event.id}
                          onOpenChange={(open) => setEventRegistrationDialog(open ? event.id : null)}
                        >
                          <DialogTrigger asChild>
                            <Button>
                              <Users className="mr-2 h-4 w-4" /> Register for Event
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Register for {event.title}</DialogTitle>
                              <DialogDescription>Complete your registration for this CSR event.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="reg-name">Full Name</Label>
                                  <Input id="reg-name" placeholder="Your full name" />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="reg-email">Email</Label>
                                  <Input id="reg-email" type="email" placeholder="your.email@company.com" />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="reg-company">Company/Organization</Label>
                                <Input id="reg-company" placeholder="Your organization" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="reg-role">Role/Title</Label>
                                <Input id="reg-role" placeholder="Your role" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="reg-dietary">Dietary Requirements (if applicable)</Label>
                                <Textarea id="reg-dietary" placeholder="Any dietary restrictions or requirements" />
                              </div>
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" onClick={() => setEventRegistrationDialog(null)}>
                                Cancel
                              </Button>
                              <Button onClick={() => setEventRegistrationDialog(null)}>Complete Registration</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline">
                          <Calendar className="mr-2 h-4 w-4" /> Add to Calendar
                        </Button>
                        <Button variant="outline">
                          <FileText className="mr-2 h-4 w-4" /> Event Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impact" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" /> Impact Transparency Dashboard
                </CardTitle>
                <CardDescription>
                  Real-time tracking of CSR initiative outcomes and corporate partner contributions.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <TreePine className="h-5 w-5 text-green-600" />
                      <span className="font-semibold text-green-800">Environmental</span>
                    </div>
                    <p className="text-2xl font-bold text-green-700">{impactMetrics.totalCO2Reduced}</p>
                    <p className="text-sm text-green-600">CO2 Reduction</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold text-blue-800">Social</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-700">{impactMetrics.totalJobsCreated}</p>
                    <p className="text-sm text-blue-600">Jobs Created</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Startups Supported</span>
                      <span className="text-sm text-muted-foreground">{impactMetrics.totalStartupsSupported}</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Volunteer Hours</span>
                      <span className="text-sm text-muted-foreground">
                        {impactMetrics.volunteerHours.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Community Partnerships</span>
                      <span className="text-sm text-muted-foreground">{impactMetrics.totalPartners}</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" /> Recognition & Achievements
                </CardTitle>
                <CardDescription>Awards, certifications, and recognition received for CSR excellence.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <Star className="h-6 w-6 text-yellow-600" />
                  <div>
                    <p className="font-semibold text-yellow-800">CSR Excellence Award 2024</p>
                    <p className="text-sm text-yellow-600">Recognized for outstanding environmental impact</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <Globe className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-800">UN Global Compact Signatory</p>
                    <p className="text-sm text-green-600">Committed to sustainable development goals</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <GraduationCap className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="font-semibold text-blue-800">Education Impact Certification</p>
                    <p className="text-sm text-blue-600">Verified impact on educational outcomes</p>
                  </div>
                </div>
                <div className="pt-4">
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" /> Download Impact Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Partner Commitment Tracking</CardTitle>
              <CardDescription>
                Transparent view of corporate partner commitments and their fulfillment status.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Partner</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Commitment</TableHead>
                    <TableHead>Contributed</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCorporatePartners.map((partner) => (
                    <TableRow key={partner.id}>
                      <TableCell className="font-medium">{partner.name}</TableCell>
                      <TableCell>
                        <Badge className={getTierColor(partner.tier)}>{partner.tier}</Badge>
                      </TableCell>
                      <TableCell>${partner.commitmentAmount.toLocaleString()}</TableCell>
                      <TableCell>${partner.currentContributions.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={(partner.currentContributions / partner.commitmentAmount) * 100}
                            className="w-20 h-2"
                          />
                          <span className="text-sm text-muted-foreground">
                            {Math.round((partner.currentContributions / partner.commitmentAmount) * 100)}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={partner.status === "Active" ? "default" : "secondary"}>{partner.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
