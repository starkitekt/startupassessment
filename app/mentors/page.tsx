import { Button } from "@/components/ui/button"
import { MentorMatching } from "@/components/mentorship/mentor-matching"
import { StandardizedPageLayout } from "@/components/standardized-page-layout"
import { Plus, UserPlus } from "lucide-react"
import Link from "next/link"

export default function MentorsPage() {
  return (
    <StandardizedPageLayout
      title="Mentor Matching"
      description="Find and connect with the perfect mentors for your startups"
      actions={
        <>
          <Button variant="outline" size="sm" asChild>
            <Link href="/mentors/schedule">
              <Plus className="mr-2 h-4 w-4" />
              Schedule Session
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/mentors/new">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Mentor
            </Link>
          </Button>
        </>
      }
    >
      <MentorMatching />
    </StandardizedPageLayout>
  )
}
