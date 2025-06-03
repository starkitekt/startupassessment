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
import { ArrowLeft } from "lucide-react"

export default function NewAssessmentPage() {
  const searchParams = useSearchParams()
  const startupId = searchParams.get("startupId")
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Logic to create new assessment
    toast({
      title: "Assessment Created (Simulated)",
      description: `New assessment for Startup ID: ${startupId || "N/A"} has been initiated.`,
    })
    router.push("/assessments")
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create New Assessment</CardTitle>
          <CardDescription>
            Fill in the details to start a new assessment process.
            {startupId && ` For Startup ID: ${startupId}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="startupName">Startup Name / ID</Label>
              <Input
                id="startupName"
                defaultValue={startupId ? `Startup ${startupId}` : ""}
                placeholder="Enter Startup Name or ID"
                required
              />
            </div>
            <div>
              <Label htmlFor="assessmentType">Assessment Type</Label>
              <Select required>
                <SelectTrigger id="assessmentType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="seed-funding">Seed Funding Application</SelectItem>
                  <SelectItem value="series-a">Series A Proposal</SelectItem>
                  <SelectItem value="incubation">Incubation Application</SelectItem>
                  <SelectItem value="grant">Grant Application</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="description">Brief Description / Purpose</Label>
              <Textarea id="description" placeholder="Enter a brief description for this assessment" />
            </div>
            <Button type="submit" className="w-full">
              Initiate Assessment
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
