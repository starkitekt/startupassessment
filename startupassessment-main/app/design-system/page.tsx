import { DesignSystemShowcase } from "@/components/design-system/showcase"

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Design System</h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive UI components and design tokens for the Startup Incubator Platform
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <DesignSystemShowcase />
      </div>
    </div>
  )
}
