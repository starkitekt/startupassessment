"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft } from "lucide-react"

export default function NewMentorPage() {
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Logic to create new mentor
    toast({
      title: "Mentor Added (Simulated)",
      description: `New mentor profile has been created.`,
    })
    router.push("/mentors")
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Mentors
      </Button>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Add New Mentor</CardTitle>
          <CardDescription>Complete the form to add a new mentor to the network.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mentorName">Full Name</Label>
                <Input id="mentorName" placeholder="e.g., Ananya Sharma" required />
              </div>
              <div>
                <Label htmlFor="mentorTitle">Title / Designation</Label>
                <Input id="mentorTitle" placeholder="e.g., FinTech Growth Strategist" required />
              </div>
            </div>
            <div>
              <Label htmlFor="mentorEmail">Email Address</Label>
              <Input id="mentorEmail" type="email" placeholder="mentor@example.com" required />
            </div>
            <div>
              <Label htmlFor="mentorLinkedin">LinkedIn Profile URL</Label>
              <Input id="mentorLinkedin" type="url" placeholder="https://linkedin.com/in/..." />
            </div>
            <div>
              <Label htmlFor="mentorExpertise">Areas of Expertise (comma-separated)</Label>
              <Input id="mentorExpertise" placeholder="e.g., FinTech, SaaS, AI/ML" required />
            </div>
            <div>
              <Label htmlFor="mentorBio">Short Bio</Label>
              <Textarea
                id="mentorBio"
                placeholder="Briefly describe the mentor's background and experience."
                className="min-h-[100px]"
              />
            </div>
            <Button type="submit" className="w-full">
              Add Mentor
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
