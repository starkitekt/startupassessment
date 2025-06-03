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

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions (FAQs)</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-left hover:no-underline">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

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
