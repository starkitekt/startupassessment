"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { DollarSign, FileText, Users, Target, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const fundingApplicationSchema = z.object({
  startupName: z.string().min(2, "Startup name must be at least 2 characters"),
  fundingAmount: z.number().min(100000, "Minimum funding amount is ₹1,00,000"),
  fundingType: z.enum(["seed", "series-a", "series-b", "bridge", "grant"]),
  useOfFunds: z.string().min(50, "Please provide detailed use of funds (minimum 50 characters)"),
  businessModel: z.string().min(100, "Please describe your business model (minimum 100 characters)"),
  marketSize: z.string().min(50, "Please describe your target market size"),
  competitiveAdvantage: z.string().min(50, "Please describe your competitive advantage"),
  teamSize: z.number().min(1, "Team size must be at least 1"),
  monthlyRevenue: z.number().min(0, "Monthly revenue cannot be negative"),
  monthlyBurnRate: z.number().min(0, "Monthly burn rate cannot be negative"),
  runwayMonths: z.number().min(0, "Runway cannot be negative"),
  previousFunding: z.number().min(0, "Previous funding cannot be negative"),
  equityOffered: z.number().min(0.1).max(49.9, "Equity offered must be between 0.1% and 49.9%"),
  milestones: z.string().min(100, "Please provide detailed milestones (minimum 100 characters)"),
  risks: z.string().min(50, "Please describe key risks and mitigation strategies"),
  termsAccepted: z.boolean().refine((val) => val === true, "You must accept the terms and conditions"),
})

type FundingApplicationData = z.infer<typeof fundingApplicationSchema>

interface FundingApplicationFormProps {
  startupId?: string
  onSubmit: (data: FundingApplicationData) => Promise<void>
  initialData?: Partial<FundingApplicationData>
}

export function FundingApplicationForm({ startupId, onSubmit, initialData }: FundingApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<FundingApplicationData>({
    resolver: zodResolver(fundingApplicationSchema),
    defaultValues: {
      startupName: "",
      fundingAmount: 0,
      fundingType: "seed",
      useOfFunds: "",
      businessModel: "",
      marketSize: "",
      competitiveAdvantage: "",
      teamSize: 1,
      monthlyRevenue: 0,
      monthlyBurnRate: 0,
      runwayMonths: 0,
      previousFunding: 0,
      equityOffered: 10,
      milestones: "",
      risks: "",
      termsAccepted: false,
      ...initialData,
    },
  })

  const steps = [
    {
      title: "Basic Information",
      description: "Company details and funding requirements",
      icon: <FileText className="h-5 w-5" />,
      fields: ["startupName", "fundingAmount", "fundingType", "useOfFunds"],
    },
    {
      title: "Business Details",
      description: "Business model and market information",
      icon: <Target className="h-5 w-5" />,
      fields: ["businessModel", "marketSize", "competitiveAdvantage"],
    },
    {
      title: "Financial Information",
      description: "Current financials and projections",
      icon: <DollarSign className="h-5 w-5" />,
      fields: ["teamSize", "monthlyRevenue", "monthlyBurnRate", "runwayMonths", "previousFunding", "equityOffered"],
    },
    {
      title: "Strategy & Risk",
      description: "Milestones and risk assessment",
      icon: <Users className="h-5 w-5" />,
      fields: ["milestones", "risks", "termsAccepted"],
    },
  ]

  const totalSteps = steps.length
  const progress = (currentStep / totalSteps) * 100

  const validateCurrentStep = async () => {
    const currentStepFields = steps[currentStep - 1].fields
    const result = await form.trigger(currentStepFields as any)
    return result
  }

  const handleNext = async () => {
    const isValid = await validateCurrentStep()
    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (data: FundingApplicationData) => {
    setIsSubmitting(true)
    try {
      await onSubmit(data)
      toast({
        title: "Application Submitted",
        description: "Your funding application has been submitted successfully",
      })
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="startupName">Startup Name *</Label>
              <Input
                id="startupName"
                {...form.register("startupName")}
                placeholder="Enter your startup name"
                className={cn(form.formState.errors.startupName && "border-red-500")}
              />
              {form.formState.errors.startupName && (
                <p className="text-sm text-red-500 mt-1">{form.formState.errors.startupName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="fundingAmount">Funding Amount (INR) *</Label>
              <Input
                id="fundingAmount"
                type="number"
                {...form.register("fundingAmount", { valueAsNumber: true })}
                placeholder="Enter funding amount"
                className={cn(form.formState.errors.fundingAmount && "border-red-500")}
              />
              {form.formState.errors.fundingAmount && (
                <p className="text-sm text-red-500 mt-1">{form.formState.errors.fundingAmount.message}</p>
              )}
              {form.watch("fundingAmount") > 0 && (
                <p className="text-sm text-muted-foreground mt-1">
                  Amount: {formatCurrency(form.watch("fundingAmount"))}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="fundingType">Funding Type *</Label>
              <Select onValueChange={(value) => form.setValue("fundingType", value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select funding type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="seed">Seed Funding</SelectItem>
                  <SelectItem value="series-a">Series A</SelectItem>
                  <SelectItem value="series-b">Series B</SelectItem>
                  <SelectItem value="bridge">Bridge Funding</SelectItem>
                  <SelectItem value="grant">Grant</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="useOfFunds">Use of Funds *</Label>
              <Textarea
                id="useOfFunds"
                {...form.register("useOfFunds")}
                placeholder="Describe how you plan to use the funding..."
                className={cn(form.formState.errors.useOfFunds && "border-red-500")}
                rows={4}
              />
              {form.formState.errors.useOfFunds && (
                <p className="text-sm text-red-500 mt-1">{form.formState.errors.useOfFunds.message}</p>
              )}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="businessModel">Business Model *</Label>
              <Textarea
                id="businessModel"
                {...form.register("businessModel")}
                placeholder="Describe your business model, revenue streams, and value proposition..."
                className={cn(form.formState.errors.businessModel && "border-red-500")}
                rows={4}
              />
              {form.formState.errors.businessModel && (
                <p className="text-sm text-red-500 mt-1">{form.formState.errors.businessModel.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="marketSize">Target Market Size *</Label>
              <Textarea
                id="marketSize"
                {...form.register("marketSize")}
                placeholder="Describe your target market size, TAM, SAM, and SOM..."
                className={cn(form.formState.errors.marketSize && "border-red-500")}
                rows={3}
              />
              {form.formState.errors.marketSize && (
                <p className="text-sm text-red-500 mt-1">{form.formState.errors.marketSize.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="competitiveAdvantage">Competitive Advantage *</Label>
              <Textarea
                id="competitiveAdvantage"
                {...form.register("competitiveAdvantage")}
                placeholder="What makes your startup unique? Describe your competitive moat..."
                className={cn(form.formState.errors.competitiveAdvantage && "border-red-500")}
                rows={3}
              />
              {form.formState.errors.competitiveAdvantage && (
                <p className="text-sm text-red-500 mt-1">{form.formState.errors.competitiveAdvantage.message}</p>
              )}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="teamSize">Team Size *</Label>
                <Input
                  id="teamSize"
                  type="number"
                  {...form.register("teamSize", { valueAsNumber: true })}
                  placeholder="Number of team members"
                  className={cn(form.formState.errors.teamSize && "border-red-500")}
                />
                {form.formState.errors.teamSize && (
                  <p className="text-sm text-red-500 mt-1">{form.formState.errors.teamSize.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="monthlyRevenue">Monthly Revenue (INR)</Label>
                <Input
                  id="monthlyRevenue"
                  type="number"
                  {...form.register("monthlyRevenue", { valueAsNumber: true })}
                  placeholder="Current monthly revenue"
                />
                {form.watch("monthlyRevenue") > 0 && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatCurrency(form.watch("monthlyRevenue"))}/month
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="monthlyBurnRate">Monthly Burn Rate (INR)</Label>
                <Input
                  id="monthlyBurnRate"
                  type="number"
                  {...form.register("monthlyBurnRate", { valueAsNumber: true })}
                  placeholder="Monthly expenses"
                />
                {form.watch("monthlyBurnRate") > 0 && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatCurrency(form.watch("monthlyBurnRate"))}/month
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="runwayMonths">Current Runway (Months)</Label>
                <Input
                  id="runwayMonths"
                  type="number"
                  {...form.register("runwayMonths", { valueAsNumber: true })}
                  placeholder="Months of runway remaining"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="previousFunding">Previous Funding (INR)</Label>
                <Input
                  id="previousFunding"
                  type="number"
                  {...form.register("previousFunding", { valueAsNumber: true })}
                  placeholder="Total previous funding raised"
                />
                {form.watch("previousFunding") > 0 && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatCurrency(form.watch("previousFunding"))} raised previously
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="equityOffered">Equity Offered (%)</Label>
                <Input
                  id="equityOffered"
                  type="number"
                  step="0.1"
                  {...form.register("equityOffered", { valueAsNumber: true })}
                  placeholder="Percentage of equity offered"
                  className={cn(form.formState.errors.equityOffered && "border-red-500")}
                />
                {form.formState.errors.equityOffered && (
                  <p className="text-sm text-red-500 mt-1">{form.formState.errors.equityOffered.message}</p>
                )}
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="milestones">Key Milestones *</Label>
              <Textarea
                id="milestones"
                {...form.register("milestones")}
                placeholder="Describe your key milestones for the next 12-18 months..."
                className={cn(form.formState.errors.milestones && "border-red-500")}
                rows={4}
              />
              {form.formState.errors.milestones && (
                <p className="text-sm text-red-500 mt-1">{form.formState.errors.milestones.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="risks">Key Risks & Mitigation *</Label>
              <Textarea
                id="risks"
                {...form.register("risks")}
                placeholder="Identify key risks and your mitigation strategies..."
                className={cn(form.formState.errors.risks && "border-red-500")}
                rows={4}
              />
              {form.formState.errors.risks && (
                <p className="text-sm text-red-500 mt-1">{form.formState.errors.risks.message}</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="termsAccepted"
                checked={form.watch("termsAccepted")}
                onCheckedChange={(checked) => form.setValue("termsAccepted", Boolean(checked))}
              />
              <Label htmlFor="termsAccepted" className="text-sm">
                I accept the terms and conditions and confirm that all information provided is accurate *
              </Label>
            </div>
            {form.formState.errors.termsAccepted && (
              <p className="text-sm text-red-500">{form.formState.errors.termsAccepted.message}</p>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-6 w-6" />
          Funding Application
        </CardTitle>
        <CardDescription>Complete all steps to submit your funding application</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>
                Step {currentStep} of {totalSteps}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between">
            {steps.map((step, index) => {
              const stepNumber = index + 1
              const isActive = stepNumber === currentStep
              const isCompleted = stepNumber < currentStep
              const isAccessible = stepNumber <= currentStep

              return (
                <div key={stepNumber} className="flex flex-col items-center space-y-2">
                  <div
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors",
                      isCompleted && "bg-green-500 border-green-500 text-white",
                      isActive && "border-blue-500 bg-blue-50 text-blue-500",
                      !isActive && !isCompleted && "border-gray-300 text-gray-400",
                    )}
                  >
                    {isCompleted ? <CheckCircle className="h-5 w-5" /> : step.icon}
                  </div>
                  <div className="text-center">
                    <p className={cn("text-xs font-medium", isActive && "text-blue-500")}>{step.title}</p>
                    <p className="text-xs text-muted-foreground hidden sm:block">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Step Content */}
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{steps[currentStep - 1].title}</CardTitle>
                <CardDescription>{steps[currentStep - 1].description}</CardDescription>
              </CardHeader>
              <CardContent>{renderStepContent()}</CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
                Previous
              </Button>

              {currentStep < totalSteps ? (
                <Button type="button" onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting} className="jpmc-gradient">
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}
