"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Building,
  DollarSign,
  Users,
  TrendingUp,
  CalendarDays,
  Edit,
  FileText,
  Briefcase,
  ShieldCheck,
  Zap,
  Target,
  Send,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useGlobalSettings } from "@/contexts/global-settings-context"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"

// Enhanced mock data for a single startup
const mockStartupDetails = {
  id: "STP001",
  name: "Innovatech Solutions",
  logoUrl: "/placeholder.svg?height=128&width=128&text=IS",
  sector: "FinTech",
  stage: "Seed", // This could also be "Accelerator Stage 1", etc.
  tagline: "Revolutionizing digital payments with AI.",
  description:
    "Innovatech Solutions is an AI-driven FinTech company focused on providing personalized financial advice and cutting-edge payment solutions. Our platform leverages machine learning to offer users unparalleled insights and seamless transaction experiences. We are committed to democratizing financial tools for the next generation.",
  website: "https://innovatech.example.com",
  foundedDate: "2022-08-01",
  teamSize: 15,
  location: "Bangalore, India",
  totalFunding: 500000,
  mrr: 15000,
  userGrowth: 25,
  assignedMentor: "Ananya Sharma",
  mentorId: "M001",
  tags: ["AI", "Payments", "FinTech", "Machine Learning"],
  healthScore: 85,
  keyMetrics: [
    { name: "Active Users", value: "10,500", trend: "+15%" },
    { name: "Conversion Rate", value: "3.5%", trend: "+0.5%" },
    { name: "Customer Churn", value: "2.1%", trend: "-0.2%" },
  ],
  recentActivities: [
    { date: "2024-05-20", activity: "Reached 10k active users milestone." },
    { date: "2024-05-15", activity: "Seed funding round closed." },
    { date: "2024-04-28", activity: "Launched new mobile app version." },
  ],
  fundingRounds: [
    { stage: "Pre-Seed", amount: 100000, date: "2022-10-01", investors: "Angel Investor Group" },
    { stage: "Seed", amount: 500000, date: "2024-05-15", investors: "VC Firm Alpha, Beta Ventures" },
  ],
  // Accelerator Specific Data
  acceleratorTrack: "FinTech Scale-Up Program",
  mouStatus: "Signed & Active", // e.g., "Pending Signature", "Signed & Active", "Expired"
  currentMilestone: {
    name: "User Acquisition Target (15k users)",
    description: "Achieve 15,000 registered and active users on the platform.",
    dueDate: "2024-08-30",
    status: "In Progress", // "Pending", "In Progress", "Completed", "Delayed"
    progress: 70, // Percentage
  },
  pastMilestones: [
    { name: "Beta Platform Launch", status: "Completed", completionDate: "2024-04-28" },
    { name: "Secure Seed Funding", status: "Completed", completionDate: "2024-05-15" },
  ],
  pfmsDetails: {
    lastReportGenerated: "2024-06-01",
    nextReportDueDate: "2024-07-01",
  },
}

export default function StartupDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { formatCurrency, selectedCurrency, selectedCountry } = useGlobalSettings()
  const startupId = params.startupId as string

  const [startup, setStartup] = useState(mockStartupDetails)

  useEffect(() => {
    if (startupId) {
      const fetchedStartup = { ...mockStartupDetails, id: startupId, name: `Startup ${startupId.slice(-3)}` }
      setStartup(fetchedStartup)
    }
  }, [startupId])

  if (!startup) {
    return <div className="p-6 text-center">Loading startup details...</div>
  }

  const handleEditStartup = () => router.push(`/portfolio/${startup.id}/edit`)
  const handleViewAssessments = () => router.push(`/assessments?startupId=${startup.id}&startupName=${startup.name}`)
  const handleViewMentor = () => {
    if (startup.mentorId) router.push(`/mentors/${startup.mentorId}`)
    else toast({ title: "No mentor assigned or ID missing.", variant: "destructive" })
  }
  const handleViewAudits = () => router.push(`/audits?startupId=${startup.id}&startupName=${startup.name}`)
  const handleGeneratePFMS = () => {
    toast({
      title: "PFMS Report Generation (Simulated)",
      description: `A PFMS report for ${startup.name} would be generated and processed.`,
    })
  }
  const handleSubmitMilestoneUpdate = () => {
    toast({
      title: "Milestone Update (Simulated)",
      description: `A modal to update progress for "${startup.currentMilestone.name}" would appear.`,
    })
  }

  return (
    <TooltipProvider>
      <div className="space-y-6 p-4 md:p-6">
        <Button variant="outline" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
        </Button>

        <Card>
          <CardHeader className="flex flex-col md:flex-row items-start gap-6">
            <Avatar className="h-32 w-32 border-4 border-primary">
              <AvatarImage src={startup.logoUrl || "/placeholder.svg"} alt={startup.name} />
              <AvatarFallback className="text-4xl">
                {startup.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-3xl">{startup.name}</CardTitle>
                  <CardDescription className="text-lg text-muted-foreground">{startup.tagline}</CardDescription>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={handleEditStartup}>
                      <Edit className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit Startup Details</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm">
                <Badge
                  variant="default"
                  className={cn(
                    startup.healthScore > 80 && "bg-charting-positive text-white",
                    startup.healthScore <= 60 && "bg-charting-negative text-white",
                  )}
                >
                  Health: {startup.healthScore}%
                </Badge>
                <Separator orientation="vertical" className="h-4" />
                <span>{startup.stage} Stage</span>
                <Separator orientation="vertical" className="h-4" />
                <span>{startup.sector}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {startup.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" onClick={handleViewAssessments}>
                      <FileText className="mr-2 h-4 w-4" /> View Assessments
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View all assessments for {startup.name}.</p>
                  </TooltipContent>
                </Tooltip>
                {startup.assignedMentor && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" onClick={handleViewMentor}>
                        <Users className="mr-2 h-4 w-4" /> View Mentor
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View mentor: {startup.assignedMentor}.</p>
                    </TooltipContent>
                  </Tooltip>
                )}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" onClick={handleViewAudits}>
                      <ShieldCheck className="mr-2 h-4 w-4" /> View Audits
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View audit history for {startup.name}.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </CardHeader>
          <CardContent className="mt-6 space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Building className="mr-2 h-5 w-5 text-primary" />
                    Company Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>
                    <span className="font-semibold">Founded:</span> {new Date(startup.foundedDate).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-semibold">Team Size:</span> {startup.teamSize} employees
                  </p>
                  <p>
                    <span className="font-semibold">Location:</span> {startup.location} ({selectedCountry.name})
                  </p>
                  <p>
                    <span className="font-semibold">Website:</span>{" "}
                    <a
                      href={startup.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {startup.website}
                    </a>
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <DollarSign className="mr-2 h-5 w-5 text-primary" />
                    Financials
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>
                    <span className="font-semibold">Total Funding:</span> {formatCurrency(startup.totalFunding)}
                  </p>
                  <p>
                    <span className="font-semibold">MRR:</span> {formatCurrency(startup.mrr)}
                  </p>
                  <p>
                    <span className="font-semibold">User Growth (MoM):</span> {startup.userGrowth}%
                  </p>
                </CardContent>
              </Card>
              {/* Accelerator Program Details Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Zap className="mr-2 h-5 w-5 text-primary" />
                    Accelerator Program
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>
                    <span className="font-semibold">Track:</span> {startup.acceleratorTrack}
                  </p>
                  <p>
                    <span className="font-semibold">MoU Status:</span>{" "}
                    <Badge
                      variant={startup.mouStatus === "Signed & Active" ? "default" : "outline"}
                      className={cn(startup.mouStatus === "Signed & Active" && "bg-green-100 text-green-700")}
                    >
                      {startup.mouStatus}
                    </Badge>
                  </p>
                  <p>
                    <span className="font-semibold">PFMS Due:</span>{" "}
                    {startup.pfmsDetails.nextReportDueDate
                      ? new Date(startup.pfmsDetails.nextReportDueDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                  <Button size="sm" variant="outline" className="w-full mt-2" onClick={handleGeneratePFMS}>
                    <Send className="mr-2 h-4 w-4" /> Generate PFMS Report (Sim.)
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Current Milestone Card */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl flex items-center">
                    <Target className="mr-2 h-5 w-5 text-primary" />
                    Current Milestone
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={handleSubmitMilestoneUpdate}>
                    Update Progress
                  </Button>
                </div>
                <CardDescription>
                  {startup.currentMilestone.name} - Due:{" "}
                  {new Date(startup.currentMilestone.dueDate).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">{startup.currentMilestone.description}</p>
                <div className="flex items-center gap-2">
                  <Progress value={startup.currentMilestone.progress} className="w-full" />
                  <span className="text-sm font-medium">{startup.currentMilestone.progress}%</span>
                </div>
                <Badge
                  variant={startup.currentMilestone.status === "Completed" ? "default" : "outline"}
                  className={cn(
                    "mt-2",
                    startup.currentMilestone.status === "In Progress" && "bg-blue-100 text-blue-700",
                  )}
                >
                  {startup.currentMilestone.status}
                </Badge>
              </CardContent>
            </Card>

            <div>
              <h3 className="text-xl font-semibold mb-2">About {startup.name}</h3>
              <p className="text-sm text-muted-foreground bg-muted p-4 rounded-md">{startup.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                  Key Metrics
                </h3>
                <div className="space-y-3">
                  {startup.keyMetrics.map((metric) => (
                    <Card key={metric.name} className="p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{metric.name}</span>
                        <span
                          className={cn(
                            "text-xs font-semibold",
                            metric.trend.startsWith("+") ? "text-green-600" : "text-red-600",
                          )}
                        >
                          {metric.trend}
                        </span>
                      </div>
                      <p className="text-lg font-bold text-numerical">{metric.value}</p>
                    </Card>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Briefcase className="mr-2 h-5 w-5 text-primary" />
                  Funding Rounds
                </h3>
                <div className="space-y-3">
                  {startup.fundingRounds.map((round, index) => (
                    <Card key={index} className="p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{round.stage} Round</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(round.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-lg font-bold text-numerical">{formatCurrency(round.amount)}</p>
                      <p className="text-xs text-muted-foreground">Investors: {round.investors}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Target className="mr-2 h-5 w-5 text-primary" />
                  Past Milestones
                </h3>
                <ul className="space-y-2 list-disc list-inside text-sm text-muted-foreground">
                  {startup.pastMilestones.map((milestone, index) => (
                    <li key={index}>
                      <span className="font-semibold">{milestone.name}:</span> {milestone.status}
                      {milestone.completionDate &&
                        ` (Completed: ${new Date(milestone.completionDate).toLocaleDateString()})`}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <CalendarDays className="mr-2 h-5 w-5 text-primary" />
                  Recent Activities
                </h3>
                <ul className="space-y-2 list-disc list-inside text-sm text-muted-foreground">
                  {startup.recentActivities.map((activity) => (
                    <li key={activity.date}>
                      <span className="font-semibold">{new Date(activity.date).toLocaleDateString()}:</span>{" "}
                      {activity.activity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}
