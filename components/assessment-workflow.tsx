"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useUserRole } from "@/hooks/use-user-role"
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  DollarSign,
  Users,
  Shield,
  Target,
} from "lucide-react"
import { cn } from "@/lib/utils"

export type AssessmentStage =
  | "initial-screening"
  | "technical-review"
  | "financial-review"
  | "due-diligence"
  | "final-approval"

export interface AssessmentScore {
  category: string
  score: number
  maxScore: number
  comments: string
  reviewerId: string
  reviewerName: string
  reviewedAt: Date
}

export interface AssessmentWorkflowData {
  id: string
  startupName: string
  currentStage: AssessmentStage
  overallProgress: number
  scores: AssessmentScore[]
  stageHistory: {
    stage: AssessmentStage
    completedAt: Date
    completedBy: string
    notes: string
  }[]
  canProceed: boolean
  blockers: string[]
}

interface AssessmentWorkflowProps {
  assessment: AssessmentWorkflowData
  onStageChange: (newStage: AssessmentStage, notes: string) => Promise<void>
  onScoreUpdate: (score: AssessmentScore) => Promise<void>
}

export function AssessmentWorkflow({ assessment, onStageChange, onScoreUpdate }: AssessmentWorkflowProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [stageNotes, setStageNotes] = useState("")
  const [currentScore, setCurrentScore] = useState<Partial<AssessmentScore>>({})
  const { role, userName } = useUserRole()
  const { toast } = useToast()

  const stages: {
    key: AssessmentStage
    label: string
    description: string
    icon: React.ReactNode
    requiredRole: string[]
  }[] = [
    {
      key: "initial-screening",
      label: "Initial Screening",
      description: "Basic eligibility and documentation review",
      icon: <FileText className="h-5 w-5" />,
      requiredRole: ["admin", "editor"],
    },
    {
      key: "technical-review",
      label: "Technical Review",
      description: "Technology assessment and feasibility analysis",
      icon: <Shield className="h-5 w-5" />,
      requiredRole: ["admin", "editor"],
    },
    {
      key: "financial-review",
      label: "Financial Review",
      description: "Financial projections and business model evaluation",
      icon: <DollarSign className="h-5 w-5" />,
      requiredRole: ["admin", "editor"],
    },
    {
      key: "due-diligence",
      label: "Due Diligence",
      description: "Comprehensive background and legal verification",
      icon: <Users className="h-5 w-5" />,
      requiredRole: ["admin"],
    },
    {
      key: "final-approval",
      label: "Final Approval",
      description: "Final decision and approval process",
      icon: <Target className="h-5 w-5" />,
      requiredRole: ["admin"],
    },
  ]

  const currentStageIndex = stages.findIndex((stage) => stage.key === assessment.currentStage)
  const canMoveForward = assessment.canProceed && currentStageIndex < stages.length - 1
  const canMoveBackward = currentStageIndex > 0
  const canEditCurrentStage = stages[currentStageIndex]?.requiredRole.includes(role)

  const handleStageChange = async (direction: "forward" | "backward") => {
    if (!stageNotes.trim()) {
      toast({
        title: "Notes Required",
        description: "Please add notes before proceeding",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    try {
      const newStageIndex = direction === "forward" ? currentStageIndex + 1 : currentStageIndex - 1
      const newStage = stages[newStageIndex].key

      await onStageChange(newStage, stageNotes)
      setStageNotes("")

      toast({
        title: "Stage Updated",
        description: `Assessment moved to ${stages[newStageIndex].label}`,
      })
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update assessment stage",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleScoreSubmit = async () => {
    if (!currentScore.category || !currentScore.score || !currentScore.comments) {
      toast({
        title: "Incomplete Score",
        description: "Please fill in all score fields",
        variant: "destructive",
      })
      return
    }

    const score: AssessmentScore = {
      category: currentScore.category,
      score: currentScore.score,
      maxScore: currentScore.maxScore || 100,
      comments: currentScore.comments,
      reviewerId: "current-user-id", // In real app, get from auth
      reviewerName: userName,
      reviewedAt: new Date(),
    }

    try {
      await onScoreUpdate(score)
      setCurrentScore({})
      toast({
        title: "Score Added",
        description: "Assessment score has been recorded",
      })
    } catch (error) {
      toast({
        title: "Score Failed",
        description: "Failed to record assessment score",
        variant: "destructive",
      })
    }
  }

  const getStageStatus = (stageIndex: number) => {
    if (stageIndex < currentStageIndex) return "completed"
    if (stageIndex === currentStageIndex) return "current"
    return "pending"
  }

  const getStageIcon = (stageIndex: number, stage: any) => {
    const status = getStageStatus(stageIndex)
    if (status === "completed") return <CheckCircle className="h-5 w-5 text-green-500" />
    if (status === "current") return <Clock className="h-5 w-5 text-blue-500" />
    return stage.icon
  }

  return (
    <div className="space-y-6">
      {/* Stage Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Assessment Progress</CardTitle>
          <CardDescription>Current stage: {stages[currentStageIndex]?.label}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={assessment.overallProgress} className="w-full" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Progress: {assessment.overallProgress}%</span>
              <span>
                Stage {currentStageIndex + 1} of {stages.length}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stage Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Assessment Stages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stages.map((stage, index) => {
              const status = getStageStatus(index)
              const isAccessible = stage.requiredRole.includes(role)

              return (
                <div
                  key={stage.key}
                  className={cn(
                    "flex items-center space-x-4 p-4 rounded-lg border",
                    status === "current" && "border-blue-500 bg-blue-50 dark:bg-blue-950/20",
                    status === "completed" && "border-green-500 bg-green-50 dark:bg-green-950/20",
                    status === "pending" && "border-gray-200 bg-gray-50 dark:bg-gray-950/20",
                  )}
                >
                  <div className="flex-shrink-0">{getStageIcon(index, stage)}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{stage.label}</h4>
                      <Badge
                        variant={status === "completed" ? "default" : status === "current" ? "secondary" : "outline"}
                        className={cn(
                          status === "completed" && "bg-green-100 text-green-700",
                          status === "current" && "bg-blue-100 text-blue-700",
                        )}
                      >
                        {status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{stage.description}</p>
                    {!isAccessible && (
                      <p className="text-xs text-orange-600 mt-1">Requires {stage.requiredRole.join(" or ")} role</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Current Stage Actions */}
      {canEditCurrentStage && (
        <Card>
          <CardHeader>
            <CardTitle>Stage Actions</CardTitle>
            <CardDescription>Actions for {stages[currentStageIndex]?.label}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Score Input */}
            <div className="space-y-4 border rounded-lg p-4">
              <h4 className="font-medium">Add Assessment Score</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="score-category">Category</Label>
                  <Input
                    id="score-category"
                    placeholder="e.g., Technical Feasibility"
                    value={currentScore.category || ""}
                    onChange={(e) => setCurrentScore((prev) => ({ ...prev, category: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="score-value">Score (out of 100)</Label>
                  <Input
                    id="score-value"
                    type="number"
                    min="0"
                    max="100"
                    value={currentScore.score || ""}
                    onChange={(e) => setCurrentScore((prev) => ({ ...prev, score: Number.parseInt(e.target.value) }))}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="score-comments">Comments</Label>
                <Textarea
                  id="score-comments"
                  placeholder="Detailed assessment comments..."
                  value={currentScore.comments || ""}
                  onChange={(e) => setCurrentScore((prev) => ({ ...prev, comments: e.target.value }))}
                />
              </div>
              <Button onClick={handleScoreSubmit}>Add Score</Button>
            </div>

            {/* Stage Navigation */}
            <div className="space-y-4 border rounded-lg p-4">
              <h4 className="font-medium">Stage Navigation</h4>
              <div>
                <Label htmlFor="stage-notes">Notes (required)</Label>
                <Textarea
                  id="stage-notes"
                  placeholder="Add notes about this stage transition..."
                  value={stageNotes}
                  onChange={(e) => setStageNotes(e.target.value)}
                />
              </div>

              {/* Blockers */}
              {assessment.blockers.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-orange-600">Blockers</Label>
                  {assessment.blockers.map((blocker, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-orange-600">
                      <AlertCircle className="h-4 w-4" />
                      <span>{blocker}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => handleStageChange("backward")}
                  disabled={!canMoveBackward || isProcessing}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous Stage
                </Button>
                <Button
                  onClick={() => handleStageChange("forward")}
                  disabled={!canMoveForward || isProcessing}
                  className="jpmc-gradient"
                >
                  Next Stage
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Assessment Scores */}
      {assessment.scores.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Assessment Scores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {assessment.scores.map((score, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{score.category}</h4>
                    <Badge variant="outline">
                      {score.score}/{score.maxScore}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{score.comments}</p>
                  <div className="text-xs text-muted-foreground">
                    Reviewed by {score.reviewerName} on {score.reviewedAt.toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
