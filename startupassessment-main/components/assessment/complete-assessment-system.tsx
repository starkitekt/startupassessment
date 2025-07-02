"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import { Clock, FileText, Users, CalendarIcon, Star, ArrowRight, ArrowLeft, Save, Send } from "lucide-react"

interface AssessmentTemplate {
  id: string
  name: string
  description: string
  stages: AssessmentStage[]
  estimatedDuration: number
  category: "seed" | "series-a" | "series-b" | "growth"
}

interface AssessmentStage {
  id: string
  name: string
  description: string
  criteria: AssessmentCriterion[]
  requiredDocuments: string[]
  estimatedHours: number
  order: number
}

interface AssessmentCriterion {
  id: string
  name: string
  description: string
  weight: number
  scoreType: "numeric" | "boolean" | "scale"
  maxScore: number
  category: string
}

interface Assessment {
  id: string
  startupId: string
  startupName: string
  templateId: string
  status: "draft" | "in-progress" | "under-review" | "completed" | "approved" | "rejected"
  currentStage: string
  assignedReviewers: string[]
  createdAt: Date
  dueDate?: Date
  scores: Record<string, number>
  notes: Record<string, string>
  overallScore?: number
  recommendation?: string
  collaborators: AssessmentCollaborator[]
}

interface AssessmentCollaborator {
  id: string
  name: string
  role: string
  permissions: ("view" | "edit" | "approve")[]
  lastActivity?: Date
}

interface AssessmentSchedule {
  assessmentId: string
  reviewerName: string
  scheduledDate: Date
  duration: number
  type: "initial-review" | "deep-dive" | "presentation" | "final-review"
  status: "scheduled" | "completed" | "cancelled"
}

export function CompleteAssessmentSystem() {
  const [activeTab, setActiveTab] = useState("assessments")
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null)
  const [currentStage, setCurrentStage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [templates, setTemplates] = useState<AssessmentTemplate[]>([])
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [schedules, setSchedules] = useState<AssessmentSchedule[]>([])
  const { toast } = useToast()

  // Mock data
  useEffect(() => {
    const mockTemplates: AssessmentTemplate[] = [
      {
        id: "seed-template",
        name: "Seed Stage Assessment",
        description: "Comprehensive evaluation for seed-stage startups",
        category: "seed",
        estimatedDuration: 40,
        stages: [
          {
            id: "initial-screening",
            name: "Initial Screening",
            description: "Basic viability and fit assessment",
            order: 1,
            estimatedHours: 8,
            requiredDocuments: ["Pitch Deck", "Executive Summary"],
            criteria: [
              {
                id: "problem-clarity",
                name: "Problem Statement Clarity",
                description: "How clearly defined is the problem being solved?",
                weight: 0.3,
                scoreType: "scale",
                maxScore: 10,
                category: "Market",
              },
              {
                id: "solution-viability",
                name: "Solution Viability",
                description: "How viable is the proposed solution?",
                weight: 0.4,
                scoreType: "scale",
                maxScore: 10,
                category: "Product",
              },
              {
                id: "initial-traction",
                name: "Initial Traction",
                description: "Evidence of market interest or early adoption",
                weight: 0.3,
                scoreType: "scale",
                maxScore: 10,
                category: "Traction",
              },
            ],
          },
          {
            id: "team-evaluation",
            name: "Team Evaluation",
            description: "Assessment of founding team capabilities",
            order: 2,
            estimatedHours: 12,
            requiredDocuments: ["Team Bios", "LinkedIn Profiles"],
            criteria: [
              {
                id: "founder-experience",
                name: "Founder Experience",
                description: "Relevant industry and entrepreneurial experience",
                weight: 0.4,
                scoreType: "scale",
                maxScore: 10,
                category: "Team",
              },
              {
                id: "team-composition",
                name: "Team Composition",
                description: "Complementary skills and roles within team",
                weight: 0.3,
                scoreType: "scale",
                maxScore: 10,
                category: "Team",
              },
              {
                id: "commitment-level",
                name: "Commitment Level",
                description: "Full-time dedication and skin in the game",
                weight: 0.3,
                scoreType: "scale",
                maxScore: 10,
                category: "Team",
              },
            ],
          },
          {
            id: "market-analysis",
            name: "Market Analysis",
            description: "Market opportunity and competitive assessment",
            order: 3,
            estimatedHours: 15,
            requiredDocuments: ["Market Research", "Competitive Analysis"],
            criteria: [
              {
                id: "market-size",
                name: "Market Size",
                description: "Total addressable market size and growth potential",
                weight: 0.3,
                scoreType: "scale",
                maxScore: 10,
                category: "Market",
              },
              {
                id: "competitive-advantage",
                name: "Competitive Advantage",
                description: "Unique value proposition and differentiation",
                weight: 0.4,
                scoreType: "scale",
                maxScore: 10,
                category: "Market",
              },
              {
                id: "go-to-market",
                name: "Go-to-Market Strategy",
                description: "Clear and feasible customer acquisition strategy",
                weight: 0.3,
                scoreType: "scale",
                maxScore: 10,
                category: "Strategy",
              },
            ],
          },
          {
            id: "financial-review",
            name: "Financial Review",
            description: "Financial projections and funding requirements",
            order: 4,
            estimatedHours: 10,
            requiredDocuments: ["Financial Model", "Use of Funds"],
            criteria: [
              {
                id: "revenue-model",
                name: "Revenue Model",
                description: "Clarity and viability of revenue streams",
                weight: 0.3,
                scoreType: "scale",
                maxScore: 10,
                category: "Financial",
              },
              {
                id: "financial-projections",
                name: "Financial Projections",
                description: "Realism and quality of financial forecasts",
                weight: 0.4,
                scoreType: "scale",
                maxScore: 10,
                category: "Financial",
              },
              {
                id: "funding-efficiency",
                name: "Funding Efficiency",
                description: "Appropriate use of requested funds",
                weight: 0.3,
                scoreType: "scale",
                maxScore: 10,
                category: "Financial",
              },
            ],
          },
        ],
      },
    ]

    const mockAssessments: Assessment[] = [
      {
        id: "assess-001",
        startupId: "startup-001",
        startupName: "TechFlow Solutions",
        templateId: "seed-template",
        status: "in-progress",
        currentStage: "team-evaluation",
        assignedReviewers: ["reviewer-1", "reviewer-2"],
        createdAt: new Date("2024-01-15"),
        dueDate: new Date("2024-02-15"),
        scores: {
          "problem-clarity": 8,
          "solution-viability": 7,
          "initial-traction": 6,
        },
        notes: {
          "initial-screening": "Strong problem statement, good initial traction",
        },
        collaborators: [
          {
            id: "collab-1",
            name: "Sarah Johnson",
            role: "Lead Reviewer",
            permissions: ["view", "edit", "approve"],
            lastActivity: new Date("2024-01-20"),
          },
          {
            id: "collab-2",
            name: "Michael Chen",
            role: "Technical Reviewer",
            permissions: ["view", "edit"],
            lastActivity: new Date("2024-01-19"),
          },
        ],
      },
    ]

    const mockSchedules: AssessmentSchedule[] = [
      {
        assessmentId: "assess-001",
        reviewerName: "Sarah Johnson",
        scheduledDate: new Date("2024-01-25"),
        duration: 120,
        type: "deep-dive",
        status: "scheduled",
      },
    ]

    setTemplates(mockTemplates)
    setAssessments(mockAssessments)
    setSchedules(mockSchedules)
  }, [])

  const handleCreateAssessment = async (templateId: string, startupId: string) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newAssessment: Assessment = {
        id: `assess-${Date.now()}`,
        startupId,
        startupName: "New Startup",
        templateId,
        status: "draft",
        currentStage: templates.find((t) => t.id === templateId)?.stages[0]?.id || "",
        assignedReviewers: [],
        createdAt: new Date(),
        scores: {},
        notes: {},
        collaborators: [],
      }

      setAssessments([...assessments, newAssessment])
      setSelectedAssessment(newAssessment)
      setActiveTab("conduct")

      toast({
        title: "Assessment created",
        description: "New assessment has been created successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create assessment",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleScoreUpdate = (criterionId: string, score: number) => {
    if (selectedAssessment) {
      setSelectedAssessment({
        ...selectedAssessment,
        scores: {
          ...selectedAssessment.scores,
          [criterionId]: score,
        },
      })
    }
  }

  const handleNotesUpdate = (stageId: string, notes: string) => {
    if (selectedAssessment) {
      setSelectedAssessment({
        ...selectedAssessment,
        notes: {
          ...selectedAssessment.notes,
          [stageId]: notes,
        },
      })
    }
  }

  const handleStageComplete = async () => {
    if (!selectedAssessment) return

    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const template = templates.find((t) => t.id === selectedAssessment.templateId)
      const currentStageIndex = template?.stages.findIndex((s) => s.id === selectedAssessment.currentStage) || 0
      const nextStage = template?.stages[currentStageIndex + 1]

      const updatedAssessment = {
        ...selectedAssessment,
        currentStage: nextStage?.id || selectedAssessment.currentStage,
        status: nextStage ? ("in-progress" as const) : ("under-review" as const),
      }

      setSelectedAssessment(updatedAssessment)
      setCurrentStage(currentStage + 1)

      toast({
        title: "Stage completed",
        description: nextStage ? `Moved to ${nextStage.name}` : "Assessment ready for review",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to complete stage",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const calculateStageProgress = (assessment: Assessment, template: AssessmentTemplate) => {
    const currentStageIndex = template.stages.findIndex((s) => s.id === assessment.currentStage)
    return ((currentStageIndex + 1) / template.stages.length) * 100
  }

  const calculateOverallScore = (assessment: Assessment, template: AssessmentTemplate) => {
    let totalScore = 0
    let totalWeight = 0

    template.stages.forEach((stage) => {
      stage.criteria.forEach((criterion) => {
        const score = assessment.scores[criterion.id]
        if (score !== undefined) {
          totalScore += score * criterion.weight
          totalWeight += criterion.weight
        }
      })
    })

    return totalWeight > 0 ? Math.round((totalScore / totalWeight) * 10) / 10 : 0
  }

  const getStatusColor = (status: Assessment["status"]) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800"
      case "under-review":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Assessment Management</h1>
          <p className="text-muted-foreground">Comprehensive startup evaluation system</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="conduct">Conduct</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="assessments" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Active Assessments</h2>
            <Button onClick={() => setActiveTab("templates")}>
              <FileText className="mr-2 h-4 w-4" />
              New Assessment
            </Button>
          </div>

          <div className="grid gap-4">
            {assessments.map((assessment) => {
              const template = templates.find((t) => t.id === assessment.templateId)
              if (!template) return null

              const progress = calculateStageProgress(assessment, template)
              const overallScore = calculateOverallScore(assessment, template)

              return (
                <Card key={assessment.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{assessment.startupName}</h3>
                          <Badge className={getStatusColor(assessment.status)}>{assessment.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Template: {template.name}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center">
                            <CalendarIcon className="mr-1 h-4 w-4" />
                            Created: {assessment.createdAt.toLocaleDateString()}
                          </div>
                          {assessment.dueDate && (
                            <div className="flex items-center">
                              <Clock className="mr-1 h-4 w-4" />
                              Due: {assessment.dueDate.toLocaleDateString()}
                            </div>
                          )}
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{Math.round(progress)}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                        {overallScore > 0 && (
                          <div className="flex items-center space-x-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-medium">Score: {overallScore}/10</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedAssessment(assessment)
                            setActiveTab("conduct")
                          }}
                        >
                          Continue
                        </Button>
                        <div className="flex -space-x-2">
                          {assessment.collaborators.slice(0, 3).map((collaborator) => (
                            <div
                              key={collaborator.id}
                              className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs border-2 border-background"
                            >
                              {collaborator.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                          ))}
                          {assessment.collaborators.length > 3 && (
                            <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs border-2 border-background">
                              +{assessment.collaborators.length - 3}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Assessment Templates</h2>
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Create Template
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {templates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {template.name}
                    <Badge variant="outline">{template.category}</Badge>
                  </CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Stages: {template.stages.length}</span>
                      <span>Est. Duration: {template.estimatedDuration}h</span>
                    </div>
                    <div className="space-y-2">
                      {template.stages.map((stage, index) => (
                        <div key={stage.id} className="flex items-center justify-between text-sm">
                          <span>
                            {index + 1}. {stage.name}
                          </span>
                          <span className="text-muted-foreground">{stage.estimatedHours}h</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => handleCreateAssessment(template.id, "startup-new")}
                      disabled={loading}
                    >
                      Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="conduct" className="space-y-4">
          {selectedAssessment ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{selectedAssessment.startupName} Assessment</h2>
                  <p className="text-muted-foreground">
                    Current Stage:{" "}
                    {
                      templates
                        .find((t) => t.id === selectedAssessment.templateId)
                        ?.stages.find((s) => s.id === selectedAssessment.currentStage)?.name
                    }
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Save className="mr-2 h-4 w-4" />
                    Save Draft
                  </Button>
                  <Button size="sm">
                    <Send className="mr-2 h-4 w-4" />
                    Submit for Review
                  </Button>
                </div>
              </div>

              {(() => {
                const template = templates.find((t) => t.id === selectedAssessment.templateId)
                const currentStageData = template?.stages.find((s) => s.id === selectedAssessment.currentStage)

                if (!template || !currentStageData) return null

                return (
                  <Card>
                    <CardHeader>
                      <CardTitle>{currentStageData.name}</CardTitle>
                      <CardDescription>{currentStageData.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {currentStageData.criteria.map((criterion) => (
                        <div key={criterion.id} className="space-y-4 p-4 border rounded-lg">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{criterion.name}</h4>
                            <Badge variant="outline">Weight: {(criterion.weight * 100).toFixed(0)}%</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{criterion.description}</p>

                          <div className="space-y-2">
                            <Label>Score (1-{criterion.maxScore})</Label>
                            <div className="flex items-center space-x-4">
                              <Slider
                                min={1}
                                max={criterion.maxScore}
                                step={1}
                                value={[selectedAssessment.scores[criterion.id] || 5]}
                                onValueChange={(value) => handleScoreUpdate(criterion.id, value[0])}
                                className="flex-1"
                              />
                              <span className="w-8 text-center font-medium">
                                {selectedAssessment.scores[criterion.id] || 5}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Notes</Label>
                            <Textarea
                              placeholder="Add your evaluation notes..."
                              value={selectedAssessment.notes[criterion.id] || ""}
                              onChange={(e) => handleNotesUpdate(criterion.id, e.target.value)}
                              rows={3}
                            />
                          </div>
                        </div>
                      ))}

                      <div className="space-y-2">
                        <Label>Stage Summary</Label>
                        <Textarea
                          placeholder="Overall assessment for this stage..."
                          value={selectedAssessment.notes[currentStageData.id] || ""}
                          onChange={(e) => handleNotesUpdate(currentStageData.id, e.target.value)}
                          rows={4}
                        />
                      </div>

                      <div className="flex justify-between">
                        <Button
                          variant="outline"
                          onClick={() => setCurrentStage(Math.max(0, currentStage - 1))}
                          disabled={currentStage === 0}
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Previous Stage
                        </Button>
                        <Button onClick={handleStageComplete} disabled={loading}>
                          {currentStage === template.stages.length - 1 ? "Complete Assessment" : "Next Stage"}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })()}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Assessment Selected</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Select an assessment from the list or create a new one to get started
                </p>
                <Button onClick={() => setActiveTab("assessments")}>View Assessments</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Assessment Schedule</h2>
            <Button>
              <CalendarIcon className="mr-2 h-4 w-4" />
              Schedule Review
            </Button>
          </div>

          <div className="grid gap-4">
            {schedules.map((schedule, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">{schedule.type.replace("-", " ").toUpperCase()}</h4>
                      <p className="text-sm text-muted-foreground">
                        Assessment: {assessments.find((a) => a.id === schedule.assessmentId)?.startupName}
                      </p>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center">
                          <CalendarIcon className="mr-1 h-4 w-4" />
                          {schedule.scheduledDate.toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          {schedule.duration} minutes
                        </div>
                        <div className="flex items-center">
                          <Users className="mr-1 h-4 w-4" />
                          {schedule.reviewerName}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        className={
                          schedule.status === "completed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                        }
                      >
                        {schedule.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        {schedule.status === "scheduled" ? "Join" : "View"}
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
