import { Button } from "@/components/ui/button"
import { CalendarIntegration } from "@/components/calendar/calendar-integration"
import { StandardizedPageLayout } from "@/components/standardized-page-layout"
import { Plus, Download } from "lucide-react"

export default function CalendarPage() {
  return (
    <StandardizedPageLayout
      title="Calendar"
      description="Manage your schedule, events, and appointments"
      actions={
        <>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Event
          </Button>
        </>
      }
    >
      <CalendarIntegration />
    </StandardizedPageLayout>
  )
}
