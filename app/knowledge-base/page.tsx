"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const faqs = [
  {
    q: "How do I submit an application?",
    a: "Navigate to the 'Assessments' page and click on 'New Assessment'. Follow the on-screen instructions to complete your application.",
  },
  {
    q: "What are the eligibility criteria for startups?",
    a: "Eligibility criteria vary by program. Generally, we look for innovative startups with a strong team, clear market potential, and a scalable business model. Specifics are detailed in each program's guidelines.",
  },
  {
    q: "How can I find a mentor?",
    a: "Visit the 'Mentors' page to browse our network. You can filter by expertise and availability. Incubator staff can also assist in matching you with a suitable mentor.",
  },
  {
    q: "What kind of reports can I generate?",
    a: "The 'Reports' page allows you to generate reports on funding, startup performance, compliance, and cohort analysis. Use the filters to customize your reports.",
  },
]

const generalFaqs = faqs.slice(0, 1) // Example: first FAQ is general
const applicationFaqs = faqs.slice(1, 2) // Example: second FAQ is about applications
const mentorshipFaqs = faqs.slice(2, 3) // Example: third FAQ is about mentors
const otherFaqs = faqs.slice(3) // Rest

export default function KnowledgeBasePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-jpmc-darkblue dark:text-jpmc-lightblue">Knowledge Base</h1>
        <p className="text-muted-foreground">
          Find answers to frequently asked questions and learn more about our processes.
        </p>
      </div>

      <div className="relative max-w-lg">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search articles and FAQs..." className="pl-10" />
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>General Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {generalFaqs.map((faq, index) => (
                <AccordionItem value={`general-item-${index}`} key={`general-${index}`}>
                  <AccordionTrigger className="text-left hover:no-underline">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Application Process</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {applicationFaqs.map((faq, index) => (
                <AccordionItem value={`app-item-${index}`} key={`app-${index}`}>
                  <AccordionTrigger className="text-left hover:no-underline">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mentorship Program</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {mentorshipFaqs.map((faq, index) => (
                <AccordionItem value={`mentor-item-${index}`} key={`mentor-${index}`}>
                  <AccordionTrigger className="text-left hover:no-underline">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Other Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {otherFaqs.map((faq, index) => (
                <AccordionItem value={`other-item-${index}`} key={`other-${index}`}>
                  <AccordionTrigger className="text-left hover:no-underline">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>

      {/* Placeholder for Articles/Guides */}
      <Card>
        <CardHeader>
          <CardTitle>Guides & Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">More guides and resources coming soon...</p>
          {/* Example: <Link href="/guides/pitch-deck-tips">How to Create a Winning Pitch Deck</Link> */}
        </CardContent>
      </Card>
    </div>
  )
}
