import { ModernLayout } from "@/components/modern-layout"
import { FounderCommunityContent } from "@/components/founders/founder-community-content"

export default function FounderCommunityPage() {
  return (
    <ModernLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Founder Community</h1>
          <p className="text-muted-foreground">
            Connect with fellow founders, share experiences, and build meaningful relationships in the startup
            ecosystem.
          </p>
        </div>

        <FounderCommunityContent />
      </div>
    </ModernLayout>
  )
}
