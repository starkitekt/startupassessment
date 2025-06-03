"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LifeBuoy, Mail, Phone } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function SupportPage() {
  const { toast } = useToast()

  const handleSubmitSupportTicket = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    toast({
      title: "Support Ticket Submitted",
      description: "Thank you for contacting us. Our team will get back to you shortly. (Simulated)",
    })
    ;(event.target as HTMLFormElement).reset()
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-jpmc-darkblue dark:text-jpmc-lightblue">Support Center</h1>
        <p className="text-muted-foreground">Need help? Find support resources or contact our team.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <LifeBuoy className="mr-2 h-5 w-5 text-primary" /> Submit a Support Ticket
            </CardTitle>
            <CardDescription>
              If you can't find an answer in our Knowledge Base, please submit a ticket.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitSupportTicket} className="space-y-4">
              <div>
                <Label htmlFor="supportName">Your Name</Label>
                <Input id="supportName" placeholder="Enter your full name" required />
              </div>
              <div>
                <Label htmlFor="supportEmail">Your Email</Label>
                <Input id="supportEmail" type="email" placeholder="your.email@example.com" required />
              </div>
              <div>
                <Label htmlFor="supportCategory">Category</Label>
                <Select required>
                  <SelectTrigger id="supportCategory">
                    <SelectValue placeholder="Select issue category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical Issue</SelectItem>
                    <SelectItem value="application">Application Process</SelectItem>
                    <SelectItem value="mentorship">Mentorship Program</SelectItem>
                    <SelectItem value="general">General Inquiry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="supportSubject">Subject</Label>
                <Input id="supportSubject" placeholder="Briefly describe your issue" required />
              </div>
              <div>
                <Label htmlFor="supportMessage">Message</Label>
                <Textarea
                  id="supportMessage"
                  placeholder="Please provide details about your issue..."
                  className="min-h-[120px]"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Submit Ticket
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Other ways to reach us.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex items-start">
              <Mail className="mr-3 h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold">Email Support</h4>
                <a href="mailto:support@incubatorportal.gov" className="text-primary hover:underline">
                  support@incubatorportal.gov
                </a>
                <p className="text-xs text-muted-foreground">Response within 24-48 hours.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="mr-3 h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold">Phone Support (Urgent Issues)</h4>
                <p>+91-11-12345678</p>
                <p className="text-xs text-muted-foreground">Mon-Fri, 9 AM - 6 PM IST.</p>
              </div>
            </div>
            <div className="flex items-start">
              <LifeBuoy className="mr-3 h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold">Knowledge Base</h4>
                <p>
                  Find quick answers in our{" "}
                  <Link href="/knowledge-base" className="text-primary hover:underline">
                    FAQ and guides
                  </Link>
                  .
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
