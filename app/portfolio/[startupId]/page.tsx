"use client"

import { cn } from "@/lib/utils"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import {
  ArrowLeft,
  Edit,
  Users,
  CheckCircle,
  LinkIcon,
  Mail,
  Phone,
  MapPin,
  UploadCloud,
  Paperclip,
  Trash2,
  PlusCircle,
  Download,
} from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"

// Re-use mockPortfolios or fetch specific startup data
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
]

const chartConfig = {
  revenue: { label: "Revenue (USD)", color: "hsl(var(--chart-positive))" },
  burnRate: { label: "Burn Rate (USD)", color: "hsl(var(--chart-negative))" },
}

export default function StartupDetailPage() {
  const [startup, setStartup] = useState<any>(null) // Replace 'any' with a proper type
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const startupId = params.startupId as string
    if (startupId) {
      const foundStartup = mockPortfolios.find((s) => s.id === startupId)
      if (foundStartup) {
        setStartup(foundStartup)
      } else {
        // Handle startup not found, e.g., redirect or show error
        toast({ title: "Error", description: "Startup not found.", variant: "destructive" })
        router.push("/portfolio")
      }
      setIsLoading(false)
    }
  }, [params.startupId, router, toast])

  if (isLoading || !startup) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48" />
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-6">
            <Skeleton className="h-40 w-full" /> <Skeleton className="h-60 w-full" />
          </div>
          <div className="md:col-span-2">
            <Skeleton className="h-[500px] w-full" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Button variant="outline" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
      </Button>

      {/* Startup Header */}
      <Card className="mb-6">
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <Avatar className="h-20 w-20 border-2 border-primary">
            <AvatarImage src={startup.logoUrl || "/placeholder.svg"} alt={startup.name} />
            <AvatarFallback>{startup.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-3xl">{startup.name}</CardTitle>
              <Button size="sm" onClick={() => toast({ title: `Editing ${startup.name}` })}>
                <Edit className="mr-2 h-4 w-4" /> Edit Startup
              </Button>
            </div>
            <CardDescription className="mt-1">{startup.tagline}</CardDescription>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge variant="secondary">{startup.sector}</Badge>
              <Badge variant="outline">{startup.stage}</Badge>
              <Badge
                className={cn(
                  startup.fundingStatus === "Funded" && "status-funded",
                  startup.fundingStatus === "Seeking" && "status-pending",
                )}
              >
                {startup.fundingStatus}
              </Badge>
              {startup.tags.map((tag: string) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <strong className="block text-muted-foreground">Total Funding</strong>{" "}
            <span className="text-numerical">${startup.totalFunding.toLocaleString()}</span>
          </div>
          <div>
            <strong className="block text-muted-foreground">MRR</strong>{" "}
            <span className="text-numerical">${startup.mrr.toLocaleString()}</span>
          </div>
          <div>
            <strong className="block text-muted-foreground">User Growth</strong>{" "}
            <span className="text-numerical">{startup.userGrowth}%</span>
          </div>
          <div>
            <strong className="block text-muted-foreground">Health Score</strong>{" "}
            <Progress
              value={startup.healthScore}
              className="h-2 mt-1"
              indicatorClassName={
                startup.healthScore > 80
                  ? "bg-charting-positive"
                  : startup.healthScore > 60
                    ? "bg-charting-accent1"
                    : "bg-charting-negative"
              }
            />{" "}
            <span className="text-xs">{startup.healthScore}%</span>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Core Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Description</h4>
                <p className="text-muted-foreground text-sm">{startup.description}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Website</h4>
                  <a
                    href={`https://${startup.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline flex items-center"
                  >
                    <LinkIcon className="mr-1 h-3 w-3" />
                    {startup.website}
                  </a>
                </div>
                <div>
                  <h4 className="font-semibold">Contact Email</h4>
                  <a
                    href={`mailto:${startup.email}`}
                    className="text-sm text-primary hover:underline flex items-center"
                  >
                    <Mail className="mr-1 h-3 w-3" />
                    {startup.email}
                  </a>
                </div>
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <Phone className="mr-1 h-3 w-3" />
                    {startup.phone}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Address</h4>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <MapPin className="mr-1 h-3 w-3" />
                    {startup.address}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Team</h4>
                <div className="space-y-2">
                  {startup.team.map((member: any) => (
                    <div key={member.name} className="flex items-center gap-2 p-2 border rounded-md">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{member.name.substring(0, 1)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financials" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-center">Monthly Revenue (USD)</h4>
                <ChartContainer config={chartConfig} className="h-[250px] w-full">
                  <ResponsiveContainer>
                    <LineChart data={startup.financials.revenue} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
                      <YAxis
                        tickFormatter={(val) => `$${val / 1000}k`}
                        tickLine={false}
                        axisLine={false}
                        fontSize={12}
                      />
                      <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="var(--color-charting-positive)"
                        strokeWidth={2}
                        name="Revenue"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-center">Monthly Burn Rate (USD)</h4>
                <ChartContainer config={chartConfig} className="h-[250px] w-full">
                  <ResponsiveContainer>
                    <LineChart data={startup.financials.burnRate} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
                      <YAxis
                        tickFormatter={(val) => `$${val / 1000}k`}
                        tickLine={false}
                        axisLine={false}
                        fontSize={12}
                      />
                      <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="var(--color-charting-negative)"
                        strokeWidth={2}
                        name="Burn Rate"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
          {/* Add Funding Rounds Table here */}
        </TabsContent>

        <TabsContent value="assessments" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Assessment History</CardTitle>
              <Button size="sm" onClick={() => toast({ title: "New Assessment for " + startup.name })}>
                {" "}
                <PlusCircle className="mr-2 h-4 w-4" /> New Assessment
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {startup.assessments.map((ass: any) => (
                    <TableRow key={ass.id}>
                      <TableCell>{ass.type}</TableCell>
                      <TableCell>
                        <Badge
                          variant={ass.status === "Approved" ? "default" : "outline"}
                          className={ass.status === "Approved" ? "status-approved" : "status-pending"}
                        >
                          {ass.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(ass.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button variant="link" size="sm" onClick={() => router.push(`/assessments/${ass.id}`)}>
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {startup.assessments.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center h-24">
                        No assessments found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mentorship" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Mentorship Log</CardTitle>
              <Button size="sm" onClick={() => toast({ title: "Assign Mentor to " + startup.name })}>
                {" "}
                <Users className="mr-2 h-4 w-4" /> Assign Mentor
              </Button>
            </CardHeader>
            <CardContent>
              {startup.mentorship.length > 0 ? (
                startup.mentorship.map((ment: any, index: number) => (
                  <div key={index} className="p-3 border rounded-md mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-semibold">{ment.mentor}</p>
                      <p className="text-xs text-muted-foreground">{new Date(ment.date).toLocaleDateString()}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{ment.notes}</p>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-8">No mentorship sessions logged.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Document Repository</CardTitle>
              <Button size="sm">
                <UploadCloud className="mr-2 h-4 w-4" /> Upload Document
              </Button>
            </CardHeader>
            <CardContent>
              {startup.documents.map((doc: any) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 border rounded-md mb-2 hover:bg-muted/50"
                >
                  <div className="flex items-center gap-2">
                    <Paperclip className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {doc.size} - Uploaded: {new Date(doc.uploaded).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => toast({ title: `Downloading ${doc.name}` })}>
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => toast({ title: `Deleting ${doc.name}`, variant: "destructive" })}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {startup.documents.length === 0 && (
                <p className="text-muted-foreground text-center py-8">No documents uploaded.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              {startup.compliance.map((item: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 border-b last:border-b-0">
                  <p className="text-sm">{item.item}</p>
                  <Badge
                    variant={item.status === "Completed" ? "default" : "outline"}
                    className={item.status === "Completed" ? "status-approved" : "status-pending"}
                  >
                    {item.status === "Completed" && <CheckCircle className="mr-1 h-3 w-3" />}
                    {item.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}
