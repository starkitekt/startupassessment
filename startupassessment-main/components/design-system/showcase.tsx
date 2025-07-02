"use client"
import { Button } from "./button"
import { Input } from "./input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { Badge } from "./badge"
import { Search, User, Mail, Phone, Plus, Download, Settings } from "lucide-react"

export function DesignSystemShowcase() {
  return (
    <div className="space-y-12 p-8">
      {/* Typography Section */}
      <section className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Typography Scale</h1>
          <p className="text-muted-foreground">Consistent typography hierarchy for all content</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Display Heading (H1)</h1>
            <h2 className="text-3xl font-semibold">Section Heading (H2)</h2>
            <h3 className="text-2xl font-semibold">Subsection Heading (H3)</h3>
            <h4 className="text-xl font-semibold">Component Heading (H4)</h4>
            <h5 className="text-lg font-medium">Small Heading (H5)</h5>
            <h6 className="text-base font-medium">Micro Heading (H6)</h6>
          </div>

          <div className="space-y-2">
            <p className="text-lg">Large body text for important content</p>
            <p className="text-base">Default body text for general content</p>
            <p className="text-sm">Small body text for secondary information</p>
            <p className="text-xs text-muted-foreground">Caption text for labels and metadata</p>
          </div>
        </div>
      </section>

      {/* Color Palette Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-3xl font-semibold mb-2">Color Palette</h2>
          <p className="text-muted-foreground">Semantic color system for consistent UI</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-3">
            <h4 className="font-semibold">Primary</h4>
            <div className="space-y-2">
              <div className="h-12 bg-primary rounded-md flex items-center justify-center text-primary-foreground text-sm font-medium">
                Primary
              </div>
              <div className="h-8 bg-primary/80 rounded-md flex items-center justify-center text-primary-foreground text-xs">
                Primary 80%
              </div>
              <div className="h-8 bg-primary/60 rounded-md flex items-center justify-center text-primary-foreground text-xs">
                Primary 60%
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Secondary</h4>
            <div className="space-y-2">
              <div className="h-12 bg-secondary rounded-md flex items-center justify-center text-secondary-foreground text-sm font-medium">
                Secondary
              </div>
              <div className="h-8 bg-secondary/80 rounded-md flex items-center justify-center text-secondary-foreground text-xs">
                Secondary 80%
              </div>
              <div className="h-8 bg-secondary/60 rounded-md flex items-center justify-center text-secondary-foreground text-xs">
                Secondary 60%
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Semantic</h4>
            <div className="space-y-2">
              <div className="h-8 bg-green-600 rounded-md flex items-center justify-center text-white text-xs">
                Success
              </div>
              <div className="h-8 bg-yellow-600 rounded-md flex items-center justify-center text-white text-xs">
                Warning
              </div>
              <div className="h-8 bg-destructive rounded-md flex items-center justify-center text-destructive-foreground text-xs">
                Error
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Neutral</h4>
            <div className="space-y-2">
              <div className="h-8 bg-muted rounded-md flex items-center justify-center text-muted-foreground text-xs">
                Muted
              </div>
              <div className="h-8 bg-accent rounded-md flex items-center justify-center text-accent-foreground text-xs">
                Accent
              </div>
              <div className="h-8 border rounded-md flex items-center justify-center text-foreground text-xs">
                Border
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Button Components */}
      <section className="space-y-6">
        <div>
          <h2 className="text-3xl font-semibold mb-2">Buttons</h2>
          <p className="text-muted-foreground">Interactive elements for user actions</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-semibold">Variants</h4>
            <div className="flex flex-wrap gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="success">Success</Button>
              <Button variant="warning">Warning</Button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Sizes</h4>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">With Icons</h4>
            <div className="flex flex-wrap gap-3">
              <Button leftIcon={<Download className="h-4 w-4" />}>Download</Button>
              <Button rightIcon={<Settings className="h-4 w-4" />}>Settings</Button>
              <Button loading>Loading</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Input Components */}
      <section className="space-y-6">
        <div>
          <h2 className="text-3xl font-semibold mb-2">Input Fields</h2>
          <p className="text-muted-foreground">Form controls for user input</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          <Input label="Basic Input" placeholder="Enter text..." helperText="This is helper text" />
          <Input label="With Icon" placeholder="Search..." leftIcon={<Search className="h-4 w-4" />} />
          <Input
            label="Email Input"
            type="email"
            placeholder="user@example.com"
            leftIcon={<Mail className="h-4 w-4" />}
            required
          />
          <Input label="Error State" placeholder="Invalid input" error="This field is required" variant="error" />
          <Input label="With Addon" placeholder="Username" leftAddon="@" />
          <Input
            label="Phone Number"
            placeholder="(555) 123-4567"
            leftIcon={<Phone className="h-4 w-4" />}
            rightAddon="US"
          />
        </div>
      </section>

      {/* Card Components */}
      <section className="space-y-6">
        <div>
          <h2 className="text-3xl font-semibold mb-2">Cards</h2>
          <p className="text-muted-foreground">Containers for grouping related content</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
              <CardDescription>Basic card with standard styling</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This is the card content area where you can place any information.
              </p>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Elevated Card</CardTitle>
              <CardDescription>Card with enhanced shadow</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">This card has more prominent shadow for emphasis.</p>
            </CardContent>
          </Card>

          <Card interactive>
            <CardHeader>
              <CardTitle>Interactive Card</CardTitle>
              <CardDescription>Clickable card with hover effects</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">This card responds to user interaction.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Badge Components */}
      <section className="space-y-6">
        <div>
          <h2 className="text-3xl font-semibold mb-2">Badges</h2>
          <p className="text-muted-foreground">Labels and status indicators</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-semibold">Variants</h4>
            <div className="flex flex-wrap gap-3">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="destructive">Error</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="ghost">Ghost</Badge>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Sizes</h4>
            <div className="flex flex-wrap items-center gap-3">
              <Badge size="sm">Small</Badge>
              <Badge size="default">Default</Badge>
              <Badge size="lg">Large</Badge>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">With Icons</h4>
            <div className="flex flex-wrap gap-3">
              <Badge leftIcon={<User className="h-3 w-3" />}>User</Badge>
              <Badge rightIcon={<Settings className="h-3 w-3" />}>Settings</Badge>
              <Badge removable onRemove={() => console.log("Removed")}>
                Removable
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Spacing System */}
      <section className="space-y-6">
        <div>
          <h2 className="text-3xl font-semibold mb-2">Spacing System</h2>
          <p className="text-muted-foreground">Consistent spacing scale for layouts</p>
        </div>

        <div className="space-y-4">
          {[
            { name: "xs", value: "4px", class: "w-1" },
            { name: "sm", value: "8px", class: "w-2" },
            { name: "md", value: "16px", class: "w-4" },
            { name: "lg", value: "24px", class: "w-6" },
            { name: "xl", value: "32px", class: "w-8" },
            { name: "2xl", value: "48px", class: "w-12" },
            { name: "3xl", value: "64px", class: "w-16" },
          ].map((spacing) => (
            <div key={spacing.name} className="flex items-center gap-4">
              <div className="w-12 text-sm font-mono">{spacing.name}</div>
              <div className="w-16 text-sm text-muted-foreground">{spacing.value}</div>
              <div className={`h-4 bg-primary rounded ${spacing.class}`} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
