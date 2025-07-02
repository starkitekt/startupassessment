import { ModernLayout } from "@/components/modern-layout"
import { FounderIdeasContent } from "@/components/founders/founder-ideas-content"

export default function FounderIdeasPage() {
  return (
    <ModernLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Idea Validation</h1>
          <p className="text-muted-foreground">
            Validate your startup ideas, get feedback from the community, and refine your concepts before building.
          </p>
        </div>

        <FounderIdeasContent />
      </div>
    </ModernLayout>
  )
}
