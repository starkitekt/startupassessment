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
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useGlobalSettings } from "@/contexts/global-settings-context"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

// Mock data for a single startup - in a real app, this would be fetched
const mockStartupDetails = {
  id: "STP001",
  name: "Innovatech Solutions",
  logoUrl: "/placeholder.svg?height=128&width=128&text=IS",
  sector: "FinTech",
  stage: "Seed",
  tagline: "Revolutionizing digital payments with AI.",
  description:
    "Innovatech Solutions is an AI-driven FinTech company focused on providing personalized financial advice and cutting-edge payment solutions. Our platform leverages machine learning to offer users unparalleled insights and seamless transaction experiences. We are committed to democratizing financial tools for the next generation.",
  website: "https://innovatech.example.com",
  foundedDate: "2022-08-01",
  teamSize: 15,
  location: "Bangalore, India",
  totalFunding: 500000, // Base currency (e.g. USD or INR)
  mrr: 15000, // Base currency
  userGrowth: 25, // %
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
}

const mockPortfolios = [
  {
    id: "STP001",
    name: "Innovatech Solutions",
    logoUrl: "/placeholder.svg?height=80&width=80",
    sector: "FinTech",
    stage: "Seed",
    fundingStatus: "Funded",
    totalFunding: 500000,
    mrr: 15000,
    userGrowth: 25,
    assignedMentor: "Ananya Sharma",
    lastActivity: "2024-05-15",
    tags: ["AI", "Payments"],
    healthScore: 85,
    tagline: "Revolutionizing digital payments with AI.",
    description:
      "Innovatech Solutions is building next-generation payment processing systems using artificial intelligence to enhance security and efficiency. Our platform helps businesses reduce fraud and streamline transactions.",
    website: "innovatech.com",
    email: "contact@innovatech.com",
    phone: "+91 98765 43210",
    address: "123 Tech Park, Bangalore, India",
    team: [
      { name: "Ravi Kumar", role: "CEO & Founder" },
      { name: "Sunita Patel", role: "CTO" },
    ],
    financials: {
      revenue: [
        { month: "Jan", value: 12000 },
        { month: "Feb", value: 14000 },
        { month: "Mar", value: 15000 },
      ],
      burnRate: [
        { month: "Jan", value: 8000 },
        { month: "Feb", value: 8500 },
        { month: "Mar", value: 9000 },
      ],
    },
    assessments: [
      { id: "ASS001", type: "Initial Screening", status: "Approved", date: "2024-01-10" },
      { id: "ASS002", type: "Technical Due Diligence", status: "Approved", date: "2024-02-15" },
    ],
    mentorship: [
      { mentor: "Ananya Sharma", date: "2024-03-05", notes: "Discussed GTM strategy." },
      { mentor: "Ananya Sharma", date: "2024-04-10", notes: "Reviewed pitch deck." },
    ],
    documents: [
      { id: "DOC001", name: "Pitch Deck v2.pdf", type: "pdf", size: "2.5MB", uploaded: "2024-02-01" },
      { id: "DOC002", name: "Financial Model.xlsx", type: "excel", size: "800KB", uploaded: "2024-01-20" },
    ],
    compliance: [
      { item: "Company Registration", status: "Completed" },
      { item: "GST Registration", status: "Completed" },
      { item: "KYC of Directors", status: "Pending" },
    ],
  },
  // Add STP002, STP003, etc. with similar detailed structure
  {
    id: "STP002",
    name: "HealthWell AI",
    logoUrl: "/placeholder.svg?height=80&width=80",
    sector: "HealthTech",
    stage: "Series A",
    fundingStatus: "Seeking",
    totalFunding: 1200000,
    mrr: 45000,
    userGrowth: 18,
    assignedMentor: "Vikram Singh",
    lastActivity: "2024-05-20",
    tags: ["Diagnostics", "ML"],
    tagline: "AI-powered diagnostics for better healthcare.",
    description:
      "HealthWell AI leverages machine learning to provide faster and more accurate medical diagnostics. Our tools assist doctors in making critical decisions, improving patient outcomes.",
    website: "healthwell.ai",
    email: "info@healthwell.ai",
    phone: "+91 91234 56789",
    address: "456 BioTech Hub, Hyderabad, India",
    team: [
      { name: "Dr. Aisha Khan", role: "CEO & Co-founder" },
      { name: "Ben Thomas", role: "Chief AI Officer" },
    ],
    financials: {
      revenue: [
        { month: "Jan", value: 30000 },
        { month: "Feb", value: 40000 },
        { month: "Mar", value: 45000 },
      ],
      burnRate: [
        { month: "Jan", value: 20000 },
        { month: "Feb", value: 22000 },
        { month: "Mar", value: 25000 },
      ],
    },
    assessments: [{ id: "ASS003", type: "Initial Screening", status: "Approved", date: "2024-03-01" }],
    mentorship: [{ mentor: "Vikram Singh", date: "2024-04-20", notes: "Product roadmap discussion." }],
    documents: [
      { id: "DOC003", name: "Clinical Trial Results.pdf", type: "pdf", size: "5.2MB", uploaded: "2024-03-15" },
    ],
    compliance: [
      { item: "Medical Device Approval", status: "Pending" },
      { item: "Data Privacy Policy", status: "Completed" },
    ],
  },
  {
    id: "STP003",
    name: "EduSphere Learning",
    logoUrl: "/placeholder.svg?height=80&width=80",
    sector: "EdTech",
    stage: "Pre-Seed",
    fundingStatus: "Bootstrapped",
    totalFunding: 50000,
    mrr: 2000,
    userGrowth: 35,
    assignedMentor: "Priya Desai",
    lastActivity: "2024-05-10",
    tags: ["K-12", "Gamification", "LMS"],
    healthScore: 92,
    tagline: "Interactive learning platforms for K-12.",
    description:
      "EduSphere Learning is creating engaging and interactive educational content for students from K-12, leveraging gamification and adaptive learning technologies.",
    website: "edusphere.com",
    email: "contact@edusphere.com",
    phone: "+91 98765 11223",
    address: "789 Knowledge Park, Pune, India",
    team: [
      { name: "Alok Nath", role: "CEO & Founder" },
      { name: "Meena Kumari", role: "Head of Content" },
    ],
    financials: {
      revenue: [
        { month: "Jan", value: 1000 },
        { month: "Feb", value: 1500 },
        { month: "Mar", value: 2000 },
      ],
      burnRate: [
        { month: "Jan", value: 3000 },
        { month: "Feb", value: 3200 },
        { month: "Mar", value: 3500 },
      ],
    },
    assessments: [{ id: "ASS004", type: "Initial Idea Validation", status: "Approved", date: "2024-04-01" }],
    mentorship: [
      { mentor: "Priya Desai", date: "2024-05-02", notes: "Discussed content strategy and teacher outreach." },
    ],
    documents: [{ id: "DOC004", name: "EduSphere_Pitch_v1.pdf", type: "pdf", size: "1.8MB", uploaded: "2024-03-20" }],
    compliance: [
      { item: "Company Registration", status: "Completed" },
      { item: "Content Copyrights", status: "Pending Review" },
    ],
  },
  {
    id: "STP004",
    name: "AgriTech Innovations",
    logoUrl: "/placeholder.svg?height=80&width=80",
    sector: "AgriTech",
    stage: "Seed",
    fundingStatus: "Seeking",
    totalFunding: 200000,
    mrr: 8000,
    userGrowth: 15,
    assignedMentor: "Rajesh Khanna",
    lastActivity: "2024-05-25",
    tags: ["Precision Farming", "IoT", "Sustainability"],
    healthScore: 78,
    tagline: "Sustainable farming solutions powered by IoT.",
    description:
      "AgriTech Innovations provides IoT-based solutions for precision farming, helping farmers optimize resource usage and improve crop yields sustainably.",
    website: "agritechinnovations.com",
    email: "info@agritechinnovations.com",
    phone: "+91 99887 76655",
    address: "101 Agri Park, Nashik, India",
    team: [
      { name: "Pooja Sharma", role: "CEO & Founder" },
      { name: "Vikram Patel", role: "CTO" },
    ],
    financials: {
      revenue: [
        { month: "Jan", value: 6000 },
        { month: "Feb", value: 7000 },
        { month: "Mar", value: 8000 },
      ],
      burnRate: [
        { month: "Jan", value: 4000 },
        { month: "Feb", value: 4200 },
        { month: "Mar", value: 4500 },
      ],
    },
    assessments: [{ id: "ASS005", type: "Market Analysis", status: "Approved", date: "2024-04-15" }],
    mentorship: [{ mentor: "Rajesh Khanna", date: "2024-05-15", notes: "Discussed market entry strategies." }],
    documents: [
      { id: "DOC005", name: "AgriTech_Business_Plan.pdf", type: "pdf", size: "2.1MB", uploaded: "2024-04-01" },
    ],
    compliance: [
      { item: "Land Usage Permits", status: "Pending" },
      { item: "Environmental Compliance", status: "In Progress" },
    ],
  },
  {
    id: "STP005",
    name: "FinSecure Technologies",
    logoUrl: "/placeholder.svg?height=80&width=80",
    sector: "FinTech",
    stage: "Series B",
    fundingStatus: "Funded",
    totalFunding: 5000000,
    mrr: 150000,
    userGrowth: 10,
    assignedMentor: "Deepika Reddy",
    lastActivity: "2024-05-28",
    tags: ["Cybersecurity", "Blockchain", "Finance"],
    healthScore: 88,
    tagline: "Securing financial transactions with blockchain.",
    description:
      "FinSecure Technologies develops blockchain-based cybersecurity solutions for financial institutions, ensuring secure and transparent transactions.",
    website: "finsecuretech.com",
    email: "contact@finsecuretech.com",
    phone: "+91 97654 32109",
    address: "222 Cyber City, Mumbai, India",
    team: [
      { name: "Suresh Menon", role: "CEO" },
      { name: "Anita Nair", role: "Head of Engineering" },
    ],
    financials: {
      revenue: [
        { month: "Jan", value: 130000 },
        { month: "Feb", value: 140000 },
        { month: "Mar", value: 150000 },
      ],
      burnRate: [
        { month: "Jan", value: 70000 },
        { month: "Feb", value: 75000 },
        { month: "Mar", value: 80000 },
      ],
    },
    assessments: [{ id: "ASS006", type: "Security Audit", status: "Approved", date: "2024-05-01" }],
    mentorship: [
      {
        mentor: "Deepika Reddy",
        date: "2024-05-20",
        notes: "Discussed scaling strategies and international expansion.",
      },
    ],
    documents: [{ id: "DOC006", name: "FinSecure_Whitepaper.pdf", type: "pdf", size: "3.5MB", uploaded: "2024-04-15" }],
    compliance: [
      { item: "Data Security Standards", status: "Completed" },
      { item: "Regulatory Compliance", status: "Completed" },
    ],
  },
]

const chartConfig = {
  revenue: { label: "Revenue (USD)", color: "hsl(var(--chart-positive))" },
  burnRate: { label: "Burn Rate (USD)", color: "hsl(var(--chart-negative))" },
}

export default function StartupDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { formatCurrency, selectedCurrency, selectedCountry } = useGlobalSettings()
  const startupId = params.startupId as string

  const [startup, setStartup] = useState(mockStartupDetails) // In real app, fetch by ID

  // Simulate fetching data
  useEffect(() => {
    if (startupId) {
      // Replace with actual fetch logic
      // For now, just update the ID in the mock data if it's different
      const fetchedStartup = { ...mockStartupDetails, id: startupId, name: `Startup ${startupId.slice(-3)}` }
      // A more robust mock would be to have an array of startups and find by ID
      setStartup(fetchedStartup)
    }
  }, [startupId])

  if (!startup) {
    return <div className="p-6 text-center">Loading startup details...</div>
  }

  const handleEditStartup = () => {
    router.push(`/portfolio/${startup.id}/edit`)
  }

  const handleViewAssessments = () => {
    router.push(`/assessments?startupId=${startup.id}&startupName=${startup.name}`)
  }

  const handleViewMentor = () => {
    if (startup.mentorId) {
      router.push(`/mentors/${startup.mentorId}`)
    } else {
      toast({ title: "No mentor assigned or ID missing.", variant: "destructive" })
    }
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
                    <p>View all assessments related to {startup.name}.</p>
                  </TooltipContent>
                </Tooltip>
                {startup.assignedMentor && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" onClick={handleViewMentor}>
                        <Users className="mr-2 h-4 w-4" /> View Mentor Profile
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View profile of assigned mentor: {startup.assignedMentor}.</p>
                    </TooltipContent>
                  </Tooltip>
                )}
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
                    <span className="font-semibold">Monthly Recurring Revenue (MRR):</span>{" "}
                    {formatCurrency(startup.mrr)}
                  </p>
                  <p>
                    <span className="font-semibold">User Growth (MoM):</span> {startup.userGrowth}%
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Users className="mr-2 h-5 w-5 text-primary" />
                    Mentorship
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>
                    <span className="font-semibold">Assigned Mentor:</span> {startup.assignedMentor || "N/A"}
                  </p>
                  {/* Add more mentorship details if available */}
                </CardContent>
              </Card>
            </div>

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
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}
