"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSearchParams, useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, FilePlus } from "lucide-react"
import { useGlobalSettings } from "@/contexts/global-settings-context"

export default function NewAssessmentPage() {
  const searchParams = useSearchParams()
  const startupId = searchParams.get("startupId")
  const startupNameParam = searchParams.get("startupName")
  const router = useRouter()
  const { toast } = useToast()
  const { selectedCurrency, formatCurrency } = useGlobalSettings()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())
    const newAssessmentId = `ASS${Date.now().toString().slice(-6)}` // Generate a mock ID

    // Simulate API call & data processing
    console.log("New Assessment Data:", { id: newAssessmentId, ...data })

    // Redirect with query parameters for confirmation on the list page
    const queryParams = new URLSearchParams({
      newId: newAssessmentId,
      startupName: data.startupName as string,
      type: data.assessmentType as string,
    }).toString()

    router.push(`/assessments?${queryParams}`)
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FilePlus className="mr-2 h-6 w-6 text-primary" />
            Create New Assessment
          </CardTitle>
          <CardDescription>
            Fill in the details to start a new assessment process.
            {(startupId || startupNameParam) && ` For Startup: ${startupNameParam || startupId}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="startupName">
                Startup Name / ID <span className="text-red-500">*</span>
              </Label>
              <Input
                id="startupName"
                name="startupName"
                defaultValue={startupNameParam || (startupId ? `Startup ${startupId}` : "")}
                placeholder="Enter Startup Name or ID"
                required
              />
            </div>
            <div>
              <Label htmlFor="assessmentType">
                Assessment Type <span className="text-red-500">*</span>
              </Label>
              <Select name="assessmentType" required>
                <SelectTrigger id="assessmentType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="seed-funding">Seed Funding Application</SelectItem>
                  <SelectItem value="series-a">Series A Proposal</SelectItem>
                  <SelectItem value="incubation">Incubation Application</SelectItem>
                  <SelectItem value="grant">Grant Application</SelectItem>
                  <SelectItem value="accelerator">Accelerator Program</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="fundingAmount">Funding Amount Requested ({selectedCurrency.code})</Label>
              <Input id="fundingAmount" name="fundingAmount" type="number" placeholder="e.g., 500000" />
            </div>
            <div>
              <Label htmlFor="description">Brief Description / Purpose</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter a brief description for this assessment"
              />
            </div>
            <Button type="submit" className="w-full jpmc-gradient text-white">
              Initiate Assessment
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
