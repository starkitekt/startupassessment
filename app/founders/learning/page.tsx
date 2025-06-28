import { ModernLayout } from "@/components/modern-layout"
import { FounderLearningContent } from "@/components/founders/founder-learning-content"

export default function FounderLearningPage() {
  return (
    <ModernLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Learning Hub</h1>
          <p className="text-muted-foreground">
            Access curated educational resources, courses, and workshops designed for startup founders.
          </p>
        </div>

        <FounderLearningContent />
      </div>
    </ModernLayout>
  )
}
