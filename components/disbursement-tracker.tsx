"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { CheckCircle, Clock, AlertCircle, DollarSign, FileText, Building, Calendar, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

export type DisbursementStatus =
  | "pending-approval"
  | "approved"
  | "documentation-pending"
  | "bank-verification"
  | "processing"
  | "disbursed"
  | "failed"
  | "cancelled"

export interface DisbursementMilestone {
  id: string
  title: string
  description: string
  amount: number
  dueDate: Date
  status: DisbursementStatus
  completedDate?: Date
  documents: {
    id: string
    name: string
    status: "pending" | "submitted" | "verified" | "rejected"
    url?: string
  }[]
  comments?: string
}

export interface DisbursementData {
  id: string
  startupName: string
  totalAmount: number
  disbursedAmount: number
  pendingAmount: number
  applicationDate: Date
  approvalDate?: Date
  bankDetails: {
    accountName: string
    accountNumber: string
    ifscCode: string
    bankName: string
    verified: boolean
  }
  milestones: DisbursementMilestone[]
  overallStatus: DisbursementStatus
  nextAction?: string
}

interface DisbursementTrackerProps {
  disbursement: DisbursementData
  onDocumentUpload?: (milestoneId: string, files: File[]) => Promise<void>
  onVerifyBankDetails?: () => Promise<void>
  canManage?: boolean
}

export function DisbursementTracker({
  disbursement,
  onDocumentUpload,
  onVerifyBankDetails,
  canManage = false,
}: DisbursementTrackerProps) {
  const [expandedMilestone, setExpandedMilestone] = useState<string | null>(null)
  const { toast } = useToast()

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusIcon = (status: DisbursementStatus) => {
    switch (status) {
      case "disbursed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "processing":
        return <Clock className="h-5 w-5 text-blue-500 animate-pulse" />
      case "failed":
      case "cancelled":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />
    }
  }

  const getStatusColor = (status: DisbursementStatus) => {
    switch (status) {
      case "disbursed":
        return "bg-green-100 text-green-700"
      case "processing":
        return "bg-blue-100 text-blue-700"
      case "failed":
      case "cancelled":
        return "bg-red-100 text-red-700"
      case "approved":
        return "bg-emerald-100 text-emerald-700"
      default:
        return "bg-yellow-100 text-yellow-700"
    }
  }

  const disbursementProgress = (disbursement.disbursedAmount / disbursement.totalAmount) * 100

  const handleVerifyBank = async () => {
    if (onVerifyBankDetails) {
      try {
        await onVerifyBankDetails()
        toast({
          title: "Bank Details Verified",
          description: "Bank account details have been successfully verified",
        })
      } catch (error) {
        toast({
          title: "Verification Failed",
          description: "Failed to verify bank details. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const handleDocumentView = (document: any) => {
    if (document.url) {
      window.open(document.url, "_blank")
    } else {
      toast({
        title: "Document Not Available",
        description: "This document is not yet available for viewing",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-6 w-6" />
            Disbursement Overview
          </CardTitle>
          <CardDescription>Funding disbursement status for {disbursement.startupName}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Overview */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Disbursement Progress</span>
              <span className="text-sm text-muted-foreground">{Math.round(disbursementProgress)}%</span>
            </div>
            <Progress value={disbursementProgress} className="w-full" />
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(disbursement.disbursedAmount)}</p>
                <p className="text-sm text-muted-foreground">Disbursed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">{formatCurrency(disbursement.pendingAmount)}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{formatCurrency(disbursement.totalAmount)}</p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Status and Next Action */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getStatusIcon(disbursement.overallStatus)}
              <Badge className={cn("capitalize", getStatusColor(disbursement.overallStatus))}>
                {disbursement.overallStatus.replace("-", " ")}
              </Badge>
            </div>
            {disbursement.nextAction && (
              <div className="text-right">
                <p className="text-sm font-medium">Next Action:</p>
                <p className="text-sm text-muted-foreground">{disbursement.nextAction}</p>
              </div>
            )}
          </div>

          {/* Application Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">Application Date</p>
              <p className="text-muted-foreground">{disbursement.applicationDate.toLocaleDateString()}</p>
            </div>
            {disbursement.approvalDate && (
              <div>
                <p className="font-medium">Approval Date</p>
                <p className="text-muted-foreground">{disbursement.approvalDate.toLocaleDateString()}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Bank Details Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Bank Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Account Name</p>
                <p className="text-muted-foreground">{disbursement.bankDetails.accountName}</p>
              </div>
              <div>
                <p className="font-medium">Account Number</p>
                <p className="text-muted-foreground">****{disbursement.bankDetails.accountNumber.slice(-4)}</p>
              </div>
              <div>
                <p className="font-medium">IFSC Code</p>
                <p className="text-muted-foreground">{disbursement.bankDetails.ifscCode}</p>
              </div>
              <div>
                <p className="font-medium">Bank Name</p>
                <p className="text-muted-foreground">{disbursement.bankDetails.bankName}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {disbursement.bankDetails.verified ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                )}
                <span className="text-sm">
                  {disbursement.bankDetails.verified ? "Verified" : "Pending Verification"}
                </span>
              </div>
              {!disbursement.bankDetails.verified && canManage && (
                <Button size="sm" onClick={handleVerifyBank}>
                  Verify Bank Details
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Milestones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Disbursement Milestones
          </CardTitle>
          <CardDescription>Track progress through each disbursement milestone</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {disbursement.milestones.map((milestone, index) => (
              <div key={milestone.id} className="border rounded-lg p-4">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setExpandedMilestone(expandedMilestone === milestone.id ? null : milestone.id)}
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(milestone.status)}
                    <div>
                      <h4 className="font-medium">{milestone.title}</h4>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(milestone.amount)}</p>
                    <Badge className={cn("text-xs", getStatusColor(milestone.status))}>
                      {milestone.status.replace("-", " ")}
                    </Badge>
                  </div>
                </div>

                {expandedMilestone === milestone.id && (
                  <div className="mt-4 pt-4 border-t space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Due Date</p>
                        <p className="text-muted-foreground">{milestone.dueDate.toLocaleDateString()}</p>
                      </div>
                      {milestone.completedDate && (
                        <div>
                          <p className="font-medium">Completed Date</p>
                          <p className="text-muted-foreground">{milestone.completedDate.toLocaleDateString()}</p>
                        </div>
                      )}
                    </div>

                    {milestone.comments && (
                      <div>
                        <p className="font-medium text-sm">Comments</p>
                        <p className="text-sm text-muted-foreground bg-muted p-2 rounded">{milestone.comments}</p>
                      </div>
                    )}

                    {/* Documents */}
                    <div>
                      <p className="font-medium text-sm mb-2">Required Documents</p>
                      <div className="space-y-2">
                        {milestone.documents.map((document) => (
                          <div
                            key={document.id}
                            className="flex items-center justify-between p-2 border rounded text-sm"
                          >
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              <span>{document.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={document.status === "verified" ? "default" : "outline"}
                                className={cn(
                                  "text-xs",
                                  document.status === "verified" && "bg-green-100 text-green-700",
                                  document.status === "rejected" && "bg-red-100 text-red-700",
                                )}
                              >
                                {document.status}
                              </Badge>
                              {document.url && (
                                <Button size="sm" variant="ghost" onClick={() => handleDocumentView(document)}>
                                  <Eye className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
