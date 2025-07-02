"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { CheckCircle, Clock, ArrowRight, FileText, Users, TrendingUp, DollarSign } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type AssessmentStage =
  | "initial-screening"
  | "document-review"
  | "team-evaluation"
  | "market-analysis"
  | "financial-review"
  | "final-decision"

interface AssessmentCriterion {
  id: string
  name: string
  description: string
  weight: number
  score: number | null
  notes: string
}

interface AssessmentProps {
  assessmentId?: string
  startupId?: string
  startupName?: string
  initialStage?: AssessmentStage
  onComplete?: (result: AssessmentResult) => void
}

interface AssessmentResult {
  assessmentId: string
  startupId: string
  overallScore: number
  recommendation: string
  stageResults: Record<AssessmentStage, StageResult>
  completedAt: Date
}

interface StageResult {
  completed: boolean
  score: number
  notes: string
  completedAt?: Date
}

export function AssessmentWorkflowSystem({
  assessmentId = "new",
  startupId = "",
  startupName = "Unnamed Startup",
  initialStage = "initial-screening",
  onComplete,
}: AssessmentProps) {
  const { toast } = useToast()
  const [currentStage, setCurrentStage] = useState<AssessmentStage>(initialStage)
  const [loading, setLoading] = useState(false)
  const [stageResults, setStageResults] = useState<Record<AssessmentStage, StageResult>>({
    "initial-screening": { completed: false, score: 0, notes: "" },
    "document-review": { completed: false, score: 0, notes: "" },
    "team-evaluation": { completed: false, score: 0, notes: "" },
    "market-analysis": { completed: false, score: 0, notes: "" },
    "financial-review": { completed: false, score: 0, notes: "" },
    "final-decision": { completed: false, score: 0, notes: "" },
  })

  const [criteria, setCriteria] = useState<Record<AssessmentStage, AssessmentCriterion[]>>({
    "initial-screening": [
      {
        id: "is-1",
        name: "Problem Statement Clarity",
        description: "How clearly defined is the problem being solved?",
        weight: 0.3,
        score: null,
        notes: "",
      },
      {
        id: "is-2",
        name: "Solution Viability",
        description: "How viable is the proposed solution?",
        weight: 0.4,
        score: null,
        notes: "",
      },
      {
        id: "is-3",
        name: "Initial Traction",
        description: "Evidence of market interest or early adoption",
        weight: 0.3,
        score: null,
        notes: "",
      },
    ],
    "document-review": [
      {
        id: "dr-1",
        name: "Business Plan Quality",
        description: "Thoroughness and quality of business plan",
        weight: 0.25,
        score: null,
        notes: "",
      },
      {
        id: "dr-2",
        name: "Pitch Deck Clarity",
        description: "Clarity and persuasiveness of pitch materials",
        weight: 0.25,
        score: null,
        notes: "",
      },
      {
        id: "dr-3",
        name: "Financial Documentation",
        description: "Completeness of financial projections and models",
        weight: 0.3,
        score: null,
        notes: "",
      },
      {
        id: "dr-4",
        name: "Legal Documentation",
        description: "Proper legal structure and compliance",
        weight: 0.2,
        score: null,
        notes: "",
      },
    ],
    "team-evaluation": [
      {
        id: "te-1",
        name: "Founder Experience",
        description: "Relevant industry and entrepreneurial experience",
        weight: 0.3,
        score: null,
        notes: "",
      },
      {
        id: "te-2",
        name: "Team Composition",
        description: "Complementary skills and roles within team",
        weight: 0.3,
        score: null,
        notes: "",
      },
      {
        id: "te-3",
        name: "Commitment Level",
        description: "Full-time dedication and skin in the game",
        weight: 0.2,
        score: null,
        notes: "",
      },
      {
        id: "te-4",
        name: "Coachability",
        description: "Openness to feedback and willingness to adapt",
        weight: 0.2,
        score: null,
        notes: "",
      },
    ],
    "market-analysis": [
      {
        id: "ma-1",
        name: "Market Size",
        description: "Total addressable market size and growth potential",
        weight: 0.25,
        score: null,
        notes: "",
      },
      {
        id: "ma-2",
        name: "Competitive Landscape",
        description: "Understanding of competition and differentiation",
        weight: 0.25,
        score: null,
        notes: "",
      },
      {
        id: "ma-3",
        name: "Go-to-Market Strategy",
        description: "Clear and feasible customer acquisition strategy",
        weight: 0.25,
        score: null,
        notes: "",
      },
      {
        id: "ma-4",
        name: "Market Timing",
        description: "Appropriateness of market entry timing",
        weight: 0.25,
        score: null,
        notes: "",
      },
    ],
    "financial-review": [
      {
        id: "fr-1",
        name: "Revenue Model",
        description: "Clarity and viability of revenue streams",
        weight: 0.25,
        score: null,
        notes: "",
      },
      {
        id: "fr-2",
        name: "Unit Economics",
        description: "Profitability at unit/customer level",
        weight: 0.25,
        score: null,
        notes: "",
      },
      {
        id: "fr-3",
        name: "Funding Efficiency",
        description: "Appropriate use of requested funds",
        weight: 0.25,
        score: null,
        notes: "",
      },
      {
        id: "fr-4",
        name: "Financial Projections",
        description: "Realism of financial forecasts",
        weight: 0.25,
        score: null,
        notes: "",
      },
    ],
    "final-decision": [
      {
        id: "fd-1",
        name: "Overall Potential",
        description: "Overall growth and success potential",
        weight: 0.4,
        score: null,
        notes: "",
      },
      {
        id: "fd-2",
        name: "Strategic Fit",
        description: "Alignment with incubator focus and resources",
        weight: 0.3,
        score: null,
        notes: "",
      },
      {
        id: "fd-3",
        name: "Risk Assessment",
        description: "Evaluation of key risks and mitigation plans",
        weight: 0.3,
        score: null,
        notes: "",
      },
    ],
  })

  const [finalRecommendation, setFinalRecommendation] = useState("")

  const stageLabels: Record<AssessmentStage, { title: string; icon: React.ReactNode }> = {
    "initial-screening": { title: "Initial Screening", icon: <Clock className="h-4 w-4" /> },
    "document-review": { title: "Document Review", icon: <FileText className="h-4 w-4" /> },
    "team-evaluation": { title: "Team Evaluation", icon: <Users className="h-4 w-4" /> },
    "market-analysis": { title: "Market Analysis", icon: <TrendingUp className="h-4 w-4" /> },
    "financial-review": { title: "Financial Review", icon: <DollarSign className="h-4 w-4" /> },
    "final-decision": { title: "Final Decision", icon: <CheckCircle className="h-4 w-4" /> },
  }

  const stages: AssessmentStage[] = [
    "initial-screening",
    "document-review",
    "team-evaluation",
    "market-analysis",
    "financial-review",
    "final-decision",
  ]

  const calculateStageScore = (stage: AssessmentStage): number => {
    const stageCriteria = criteria[stage]
    if (!stageCriteria.length) return 0

    let totalScore = 0
    let totalWeight = 0

    stageCriteria.forEach((criterion) => {
      if (criterion.score !== null) {
        totalScore += criterion.score * criterion.weight
        totalWeight += criterion.weight
      }
    })

    return totalWeight > 0 ? Math.round((totalScore / totalWeight) * 10) / 10 : 0
  }

  const calculateOverallScore = (): number => {
    let totalScore = 0
    let completedStages = 0

    Object.entries(stageResults).forEach(([stage, result]) => {
      if (result.completed) {
        totalScore += result.score
        completedStages++
      }
    })

    return completedStages > 0 ? Math.round((totalScore / completedStages) * 10) / 10 : 0
  }

  const handleCriterionScoreChange = (stageId: AssessmentStage, criterionId: string, value: number) => {
    setCriteria((prev) => ({
      ...prev,
      [stageId]: prev[stageId].map((c) => (c.id === criterionId ? { ...c, score: value } : c)),
    }))
  }

  const handleCriterionNotesChange = (stageId: AssessmentStage, criterionId: string, notes: string) => {
    setCriteria((prev) => ({
      ...prev,
      [stageId]: prev[stageId].map((c) => (c.id === criterionId ? { ...c, notes } : c)),
    }))
  }

  const handleStageNotesChange = (stage: AssessmentStage, notes: string) => {
    setStageResults((prev) => ({
      ...prev,
      [stage]: { ...prev[stage], notes },
    }))
  }

  const completeStage = async (stage: AssessmentStage) => {
    setLoading(true)

    try {
      // Calculate stage score
      const score = calculateStageScore(stage)

      // Update stage results
      setStageResults((prev) => ({
        ...prev,
        [stage]: {
          ...prev[stage],
          completed: true,
          score,
          completedAt: new Date(),
        },
      }))

      // Move to next stage if available
      const currentIndex = stages.indexOf(stage)
      if (currentIndex < stages.length - 1) {
        setCurrentStage(stages[currentIndex + 1])
      }

      toast({
        title: "Stage completed",
        description: `${stageLabels[stage].title} has been completed with a score of ${score}/10.`,
      })
    } catch (error) {
      toast({
        title: "Error completing stage",
        description: "There was an error completing this stage. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const completeAssessment = async () => {
    setLoading(true)

    try {
      // Calculate overall score
      const overallScore = calculateOverallScore()

      // Prepare assessment result
      const result: AssessmentResult = {
        assessmentId: assessmentId,
        startupId: startupId,
        overallScore,
        recommendation: finalRecommendation,
        stageResults,
        completedAt: new Date(),
      }

      // Call onComplete callback if provided
      if (onComplete) {
        onComplete(result)
      }

      toast({
        title: "Assessment completed",
        description: `Assessment for ${startupName} has been completed with an overall score of ${overallScore}/10.`,
      })
    } catch (error) {
      toast({
        title: "Error completing assessment",
        description: "There was an error completing this assessment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const isStageComplete = (stage: AssessmentStage): boolean => {
    return stageResults[stage].completed
  }

  const canCompleteStage = (stage: AssessmentStage): boolean => {
    return criteria[stage].every((c) => c.score !== null)
  }

  const canCompleteAssessment = (): boolean => {
    return (
      stages.slice(0, -1).every(isStageComplete) &&
      canCompleteStage("final-decision") &&
      finalRecommendation.trim().length > 0
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Assessment: {startupName}</h2>
          <p className="text-muted-foreground">Complete each stage of the assessment process</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            ID: {assessmentId}
          </Badge>
          <Badge variant="outline" className="text-sm">
            Overall: {calculateOverallScore()}/10
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="md:col-span-1">
          <div className="space-y-2">
            {stages.map((stage) => (
              <Button
                key={stage}
                variant={currentStage === stage ? "default" : "outline"}
                className={`w-full justify-start ${isStageComplete(stage) ? "border-green-500" : ""}`}
                onClick={() => setCurrentStage(stage)}
                disabled={stages.indexOf(stage) > 0 && !isStageComplete(stages[stages.indexOf(stage) - 1])}
              >
                <div className="flex items-center gap-2">
                  {stageLabels[stage].icon}
                  <span className="hidden md:inline">{stageLabels[stage].title}</span>
                  {isStageComplete(stage) && <CheckCircle className="h-4 w-4 ml-auto text-green-500" />}
                </div>
              </Button>
            ))}
          </div>
        </div>

        <div className="md:col-span-5">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{stageLabels[currentStage].title}</CardTitle>
                  <CardDescription>
                    {currentStage === "initial-screening" &&
                      "Evaluate the basic viability of the startup idea and team"}
                    {currentStage === "document-review" &&
                      "Review all submitted documentation for completeness and quality"}
                    {currentStage === "team-evaluation" && "Assess the founding team's capabilities and dynamics"}
                    {currentStage === "market-analysis" &&
                      "Evaluate the market opportunity and competitive positioning"}
                    {currentStage === "financial-review" && "Review financial projections and funding requirements"}
                    {currentStage === "final-decision" && "Make final assessment and funding recommendation"}
                  </CardDescription>
                </div>
                {isStageComplete(currentStage) && (
                  <Badge className="bg-green-500">Completed • Score: {stageResults[currentStage].score}/10</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {criteria[currentStage].map((criterion) => (
                  <div key={criterion.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={criterion.id} className="text-base font-medium">
                        {criterion.name}
                      </Label>
                      <Badge variant="outline">Weight: {criterion.weight * 100}%</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{criterion.description}</p>
                    <div className="pt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs">Poor (1)</span>
                        <span className="text-xs">Excellent (10)</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Slider
                          id={criterion.id}
                          min={1}
                          max={10}
                          step={1}
                          value={criterion.score !== null ? [criterion.score] : [5]}
                          onValueChange={(value) => handleCriterionScoreChange(currentStage, criterion.id, value[0])}
                          disabled={isStageComplete(currentStage)}
                          className="flex-1"
                        />
                        <span className="w-8 text-center font-medium">
                          {criterion.score !== null ? criterion.score : "-"}
                        </span>
                      </div>
                    </div>
                    <Textarea
                      placeholder="Add notes about this criterion..."
                      value={criterion.notes}
                      onChange={(e) => handleCriterionNotesChange(currentStage, criterion.id, e.target.value)}
                      disabled={isStageComplete(currentStage)}
                      className="h-20"
                    />
                  </div>
                ))}

                <div className="pt-4 border-t">
                  <Label htmlFor={`${currentStage}-notes`} className="text-base font-medium">
                    Overall Stage Notes
                  </Label>
                  <Textarea
                    id={`${currentStage}-notes`}
                    placeholder="Add overall notes for this assessment stage..."
                    value={stageResults[currentStage].notes}
                    onChange={(e) => handleStageNotesChange(currentStage, e.target.value)}
                    disabled={isStageComplete(currentStage)}
                    className="mt-2 h-24"
                  />
                </div>

                {currentStage === "final-decision" && (
                  <div className="pt-4 border-t">
                    <Label htmlFor="final-recommendation" className="text-base font-medium">
                      Final Recommendation
                    </Label>
                    <Textarea
                      id="final-recommendation"
                      placeholder="Provide your final recommendation for this startup..."
                      value={finalRecommendation}
                      onChange={(e) => setFinalRecommendation(e.target.value)}
                      disabled={isStageComplete("final-decision")}
                      className="mt-2 h-32"
                    />
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center gap-2">
                {!isStageComplete(currentStage) && (
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStage(stages[Math.max(0, stages.indexOf(currentStage) - 1)])}
                  >
                    Back
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-2">
                {!isStageComplete(currentStage) && currentStage !== "final-decision" && (
                  <Button
                    onClick={() => completeStage(currentStage)}
                    disabled={!canCompleteStage(currentStage) || loading}
                  >
                    Complete Stage
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}

                {currentStage === "final-decision" && !isStageComplete("final-decision") && (
                  <Button
                    onClick={() => completeStage("final-decision")}
                    disabled={!canCompleteStage("final-decision") || loading}
                  >
                    Complete Final Evaluation
                  </Button>
                )}

                {isStageComplete("final-decision") && (
                  <Button
                    onClick={completeAssessment}
                    disabled={!canCompleteAssessment() || loading}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Complete Assessment
                    <CheckCircle className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
