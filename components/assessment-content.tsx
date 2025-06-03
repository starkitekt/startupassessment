"use client"

import Link from "next/link"

import React, { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs" // For pipeline stages
import { FileText, Download, Eye, Search, PlusCircle, ListChecks, Hourglass, ThumbsUp, ThumbsDown } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

const assessmentData = [
  {
    id: "ASS001",
    startupName: "Innovatech Solutions",
    startupId: "STP001",
    applicant: "Rahul Sharma",
    type: "Seed Funding Application",
    currentStage: "Technical Review",
    overallProgress: 75,
    submittedDate: "2024-01-15",
    assignedReviewer: "Priya Sharma",
    fundingRequested: "₹50L",
    status: "under-review", // 'pending-docs', 'under-review', 'approved', 'rejected'
  },
  {
    id: "ASS002",
    startupName: "HealthWell AI",
    startupId: "STP002",
    applicant: "Dr. Meera Patel",
    type: "Series A Proposal",
    currentStage: "Final Approval",
    overallProgress: 95,
    submittedDate: "2024-01-14",
    assignedReviewer: "Amit Kumar",
    fundingRequested: "₹75L",
    status: "approved",
  },
  {
    id: "ASS003",
    startupName: "EduSphere Learning",
    startupId: "STP003",
    applicant: "Vikash Singh",
    type: "Incubation Application",
    currentStage: "Document Verification",
    overallProgress: 45,
    submittedDate: "2024-01-13",
    assignedReviewer: "Rajesh Gupta",
    fundingRequested: "N/A",
    status: "pending-docs",
  },
  {
    id: "ASS004",
    startupName: "AgriGrow Innovations",
    startupId: "STP004",
    applicant: "Rina Begum",
    type: "Grant Application",
    currentStage: "Screening",
    overallProgress: 20,
    submittedDate: "2024-02-01",
    assignedReviewer: "Sunil Verma",
    fundingRequested: "₹20L",
    status: "under-review",
  },
  {
    id: "ASS005",
    startupName: "Retail Rocket",
    startupId: "STP005", // Assume STP005 exists
    applicant: "Arjun Das",
    type: "Accelerator Program",
    currentStage: "Rejected",
    overallProgress: 100, // Or progress at rejection
    submittedDate: "2024-01-20",
    assignedReviewer: "Priya Sharma",
    fundingRequested: "N/A",
    status: "rejected",
  },
]

const assessmentStages = [
  { id: "all", label: "All Assessments", icon: ListChecks },
  { id: "pending-docs", label: "Pending Docs", icon: FileText },
  { id: "under-review", label: "Under Review", icon: Hourglass },
  { id: "approved", label: "Approved", icon: ThumbsUp },
  { id: "rejected", label: "Rejected", icon: ThumbsDown },
]

export function AssessmentContent() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const filteredAssessments = useMemo(() => {
    return assessmentData.filter(
      (assessment) =>
        (activeTab === "all" || assessment.status === activeTab) &&
        (assessment.startupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          assessment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          assessment.type.toLowerCase().includes(searchTerm.toLowerCase())),
    )
  }, [activeTab, searchTerm])

  const handleReviewAssessment = (assessmentId: string) => {
    router.push(`/assessments/${assessmentId}`)
  }

  const handleNewAssessment = () => {
    router.push("/assessments/new")
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-48" /> <Skeleton className="h-10 w-36" />
        </div>
        <Skeleton className="h-12 w-full" /> {/* For TabsList */}
        <Skeleton className="h-[400px] w-full" /> {/* For Table */}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-jpmc-darkblue dark:text-jpmc-lightblue">Assessments</h1>
          <p className="text-muted-foreground">Manage and review startup applications and assessments.</p>
        </div>
        <div className="flex space-x-2 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none">
            <Download className="mr-2 h-4 w-4" /> Export All
          </Button>
          <Button onClick={handleNewAssessment} className="jpmc-gradient text-white flex-1 sm:flex-none">
            <PlusCircle className="mr-2 h-4 w-4" /> New Assessment
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Assessment Pipeline</CardTitle>
          <CardDescription>Track assessments through various stages.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {assessmentStages.map((stage) => (
                <TabsTrigger key={stage.id} value={stage.id} className="flex-1 text-xs sm:text-sm">
                  <stage.icon className="mr-1.5 h-4 w-4" /> {stage.label} (
                  {stage.id === "all"
                    ? assessmentData.length
                    : assessmentData.filter((a) => a.status === stage.id).length}
                  )
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="mt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by Startup, ID, Type..."
                  className="pl-10 w-full sm:w-1/2 lg:w-1/3"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <TabsContent value={activeTab} className="mt-4">
              {" "}
              {/* This seems redundant, TabsContent should be outside TabsList */}
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Assessment ID</TableHead>
                      <TableHead>Startup</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Stage</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Reviewer</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAssessments.length > 0 ? (
                      filteredAssessments.map((assessment) => (
                        <TableRow key={assessment.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">{assessment.id}</TableCell>
                          <TableCell>
                            <Link href={`/portfolio/${assessment.startupId}`} className="hover:underline text-primary">
                              {assessment.startupName}
                            </Link>
                          </TableCell>
                          <TableCell>{assessment.type}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={cn(
                                assessment.status === "approved" && "status-approved border-green-500",
                                assessment.status === "rejected" && "status-rejected border-red-500",
                                assessment.status === "under-review" && "status-under-review border-blue-500",
                                assessment.status === "pending-docs" && "status-pending border-amber-500",
                              )}
                            >
                              {assessment.currentStage}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress
                                value={assessment.overallProgress}
                                className="h-2 w-20"
                                indicatorClassName={cn(
                                  assessment.overallProgress > 70 && "bg-charting-positive",
                                  assessment.overallProgress > 40 &&
                                    assessment.overallProgress <= 70 &&
                                    "bg-charting-accent1",
                                  assessment.overallProgress <= 40 && "bg-charting-negative",
                                )}
                              />
                              <span className="text-xs text-numerical">{assessment.overallProgress}%</span>
                            </div>
                          </TableCell>
                          <TableCell>{assessment.assignedReviewer}</TableCell>
                          <TableCell>{new Date(assessment.submittedDate).toLocaleDateString()}</TableCell>
                          <TableCell className="text-center">
                            <Button variant="outline" size="sm" onClick={() => handleReviewAssessment(assessment.id)}>
                              <Eye className="mr-1 h-3.5 w-3.5" /> Review
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          No assessments found for this stage or search term.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
