import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, CheckCircle, ExternalLink, FileText, ShieldCheck, Zap } from "lucide-react"
import Link from "next/link"

export default function AcceleratorCompliancePage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Accelerator Programs & Compliance Framework</h1>
        <p className="text-lg text-muted-foreground">
          Fostering startup growth through tailored acceleration while ensuring robust adherence to regulatory and
          ethical standards.
        </p>
      </header>

      <section className="grid gap-8 md:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-primary/10 p-2 rounded-lg">
                <Zap className="h-6 w-6 text-primary" />
              </span>
              <CardTitle className="text-2xl">Startup Accelerator Programs</CardTitle>
            </div>
            <CardDescription>
              Our accelerator programs are designed to propel early-stage startups towards market success and investment
              readiness.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-grow">
            <p>
              We provide a dynamic environment with intensive mentorship, access to a vast network of industry experts,
              strategic resources, and potential funding opportunities. Each program is tailored to specific industry
              verticals or technological domains.
            </p>
            <div>
              <h4 className="font-semibold mb-2">Key Features:</h4>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Personalized mentorship from seasoned entrepreneurs and domain experts.</li>
                <li>Workshops on product development, market strategy, fundraising, and operations.</li>
                <li>Access to co-working spaces, tech infrastructure, and partner perks.</li>
                <li>Networking events with investors, corporate partners, and fellow founders.</li>
                <li>Culmination in a Demo Day to showcase progress to potential investors.</li>
              </ul>
            </div>
            <p>
              Our goal is to significantly shorten the learning curve for startups, helping them achieve critical
              milestones faster and build sustainable businesses.
            </p>
          </CardContent>
          <div className="p-6 pt-0 flex flex-col sm:flex-row gap-3">
            <Button asChild className="w-full sm:w-auto jpmc-gradient">
              <Link href="/portfolio">
                Explore Portfolio Startups <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/startups/applications/new">
                Apply to Accelerator <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-green-500/10 p-2 rounded-lg">
                <ShieldCheck className="h-6 w-6 text-green-600" />
              </span>
              <CardTitle className="text-2xl">Comprehensive Compliance Framework</CardTitle>
            </div>
            <CardDescription>
              We uphold the highest standards of compliance to ensure operational integrity, mitigate risks, and build
              trust with stakeholders.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-grow">
            <p>
              Our robust compliance framework integrates seamlessly with incubator and accelerator operations, providing
              startups with guidance and tools to navigate complex regulatory landscapes.
            </p>
            <div>
              <h4 className="font-semibold mb-2">Core Pillars:</h4>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>
                  <strong>Regulatory Adherence:</strong> Monitoring and adapting to evolving local and international
                  laws (e.g., data privacy, financial regulations).
                </li>
                <li>
                  <strong>Risk Management:</strong> Proactive identification, assessment, and mitigation of operational,
                  financial, and legal risks.
                </li>
                <li>
                  <strong>Ethical Conduct:</strong> Promoting a culture of integrity, transparency, and responsible
                  innovation.
                </li>
                <li>
                  <strong>Audit Readiness:</strong> Maintaining meticulous records and processes for internal and
                  external audits.
                </li>
                <li>
                  <strong>Startup Guidance:</strong> Assisting portfolio companies in establishing their own sound
                  compliance practices.
                </li>
              </ul>
            </div>
            <p>
              Leverage our platform's built-in compliance tools, automated checks (simulated), and reporting features to
              stay ahead.
            </p>
          </CardContent>
          <div className="p-6 pt-0 flex flex-col sm:flex-row gap-3">
            <Button asChild className="w-full sm:w-auto">
              <Link href="/audits">
                View Audit Information <FileText className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full sm:w-auto" disabled>
              <Link href="#">
                Compliance Dashboard <CheckCircle className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>The Synergy of Acceleration and Compliance</CardTitle>
            <CardDescription>
              Driving innovation responsibly by integrating growth initiatives with stringent compliance measures.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              At our core, we believe that sustainable growth and long-term success for startups are built on a
              foundation of trust and integrity. While our accelerator programs push the boundaries of innovation, our
              compliance framework ensures this journey is navigated responsibly.
            </p>
            <p>
              This dual focus not only protects the startups and the incubator but also enhances their attractiveness to
              investors and partners who value diligence and ethical operations. We provide the tools and knowledge for
              startups to embed compliance into their DNA from day one, turning potential regulatory hurdles into
              competitive advantages.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
