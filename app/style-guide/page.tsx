import { DesignSystemShowcase } from "@/components/design-system/showcase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function StyleGuidePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge variant="outline">v1.0.0</Badge>
              <Badge variant="secondary">WCAG 2.1 AA</Badge>
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Startup Incubator Design System</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              A comprehensive design system built for consistency, accessibility, and scalability. This living style
              guide documents all components, patterns, and guidelines for building exceptional user experiences.
            </p>
            <div className="flex gap-4 pt-4">
              <Button size="lg">View Components</Button>
              <Button variant="outline" size="lg">
                Download Assets
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-none lg:inline-flex">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="foundations">Foundations</TabsTrigger>
              <TabsTrigger value="components">Components</TabsTrigger>
              <TabsTrigger value="patterns">Patterns</TabsTrigger>
              <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-8">
              <div className="space-y-8">
                {/* Design Principles */}
                <section>
                  <h2 className="text-3xl font-semibold mb-6">Design Principles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <div className="w-4 h-4 bg-primary rounded-sm" />
                          </div>
                          Clarity
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Information should be clear and easy to understand. We use visual hierarchy, consistent
                          patterns, and immediate feedback to guide users.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <div className="w-4 h-4 bg-green-600 rounded-sm" />
                          </div>
                          Consistency
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Similar elements behave similarly across the application. We maintain consistent spacing,
                          colors, typography, and interaction patterns.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <div className="w-4 h-4 bg-blue-600 rounded-sm" />
                          </div>
                          Accessibility
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Designed for users of all abilities. We ensure WCAG 2.1 AA compliance, keyboard navigation,
                          and screen reader compatibility.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                            <div className="w-4 h-4 bg-orange-600 rounded-sm" />
                          </div>
                          Efficiency
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Enable users to complete tasks quickly. We reduce cognitive load through familiar patterns and
                          provide shortcuts for power users.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                            <div className="w-4 h-4 bg-purple-600 rounded-sm" />
                          </div>
                          Trust
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Convey professionalism and reliability. We provide clear feedback, maintain security, and use
                          consistent branding.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                            <div className="w-4 h-4 bg-teal-600 rounded-sm" />
                          </div>
                          Scalability
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Built to grow with the product. Our system is flexible, maintainable, and supports rapid
                          development of new features.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* System Architecture */}
                <section>
                  <h2 className="text-3xl font-semibold mb-6">System Architecture</h2>
                  <Card>
                    <CardHeader>
                      <CardTitle>Design System Structure</CardTitle>
                      <CardDescription>
                        Our design system is built on a foundation of design tokens, reusable components, and
                        comprehensive guidelines.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-semibold mb-2">Design Tokens</h4>
                            <p className="text-sm text-muted-foreground">
                              Colors, typography, spacing, and other design decisions as code
                            </p>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-semibold mb-2">Components</h4>
                            <p className="text-sm text-muted-foreground">
                              Reusable UI components with consistent styling and behavior
                            </p>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-semibold mb-2">Patterns</h4>
                            <p className="text-sm text-muted-foreground">
                              Common layout patterns and interaction flows
                            </p>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-semibold mb-2">Guidelines</h4>
                            <p className="text-sm text-muted-foreground">
                              Usage guidelines, best practices, and accessibility standards
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* Quick Stats */}
                <section>
                  <h2 className="text-3xl font-semibold mb-6">System Overview</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl font-bold text-primary">50+</div>
                        <div className="text-sm text-muted-foreground">Components</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl font-bold text-green-600">100%</div>
                        <div className="text-sm text-muted-foreground">WCAG AA</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl font-bold text-blue-600">12</div>
                        <div className="text-sm text-muted-foreground">Color Scales</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl font-bold text-purple-600">3</div>
                        <div className="text-sm text-muted-foreground">Font Families</div>
                      </CardContent>
                    </Card>
                  </div>
                </section>
              </div>
            </TabsContent>

            <TabsContent value="foundations" className="mt-8">
              <DesignSystemShowcase />
            </TabsContent>

            <TabsContent value="components" className="mt-8">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-semibold mb-4">Component Library</h2>
                  <p className="text-muted-foreground mb-8">
                    Comprehensive collection of reusable components with consistent styling and behavior.
                  </p>
                </div>
                <DesignSystemShowcase />
              </div>
            </TabsContent>

            <TabsContent value="patterns" className="mt-8">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-semibold mb-4">Design Patterns</h2>
                  <p className="text-muted-foreground mb-8">
                    Common layout patterns and interaction flows used throughout the application.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Form Patterns</CardTitle>
                      <CardDescription>
                        Consistent form layouts with proper validation and accessibility
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 border rounded bg-muted/30">
                          <div className="space-y-3">
                            <div className="h-4 bg-muted rounded w-20" />
                            <div className="h-8 bg-background border rounded" />
                            <div className="h-3 bg-muted rounded w-32" />
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Standard form field with label, input, and helper text
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Card Layouts</CardTitle>
                      <CardDescription>Flexible card patterns for displaying grouped content</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 border rounded">
                          <div className="space-y-3">
                            <div className="h-4 bg-muted rounded w-24" />
                            <div className="h-3 bg-muted rounded w-full" />
                            <div className="h-3 bg-muted rounded w-3/4" />
                            <div className="flex gap-2 pt-2">
                              <div className="h-6 bg-primary/20 rounded px-2" />
                              <div className="h-6 bg-muted rounded px-2" />
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Standard card with header, content, and action area
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Navigation Patterns</CardTitle>
                      <CardDescription>Consistent navigation structures for different contexts</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="border rounded">
                          <div className="p-3 border-b bg-muted/30">
                            <div className="flex gap-4">
                              <div className="h-4 bg-muted rounded w-16" />
                              <div className="h-4 bg-muted rounded w-20" />
                              <div className="h-4 bg-primary rounded w-18" />
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="h-20 bg-muted/30 rounded" />
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">Tab navigation with active state indication</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Data Display</CardTitle>
                      <CardDescription>Patterns for presenting data clearly and efficiently</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="border rounded overflow-hidden">
                          <div className="bg-muted/30 p-2 border-b">
                            <div className="flex gap-4">
                              <div className="h-3 bg-muted rounded w-16" />
                              <div className="h-3 bg-muted rounded w-20" />
                              <div className="h-3 bg-muted rounded w-12" />
                            </div>
                          </div>
                          <div className="p-2 space-y-2">
                            <div className="flex gap-4">
                              <div className="h-3 bg-muted/60 rounded w-16" />
                              <div className="h-3 bg-muted/60 rounded w-20" />
                              <div className="h-3 bg-muted/60 rounded w-12" />
                            </div>
                            <div className="flex gap-4">
                              <div className="h-3 bg-muted/60 rounded w-16" />
                              <div className="h-3 bg-muted/60 rounded w-20" />
                              <div className="h-3 bg-muted/60 rounded w-12" />
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Data table with sortable headers and consistent spacing
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="accessibility" className="mt-8">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-semibold mb-4">Accessibility Standards</h2>
                  <p className="text-muted-foreground mb-8">
                    Our design system meets WCAG 2.1 AA standards to ensure inclusive experiences for all users.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Color & Contrast</CardTitle>
                      <CardDescription>
                        All color combinations meet or exceed WCAG contrast requirements
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 bg-primary text-primary-foreground rounded">
                            <span>Primary on White</span>
                            <Badge variant="secondary">7.2:1</Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-muted text-muted-foreground rounded">
                            <span>Muted Text</span>
                            <Badge variant="secondary">4.8:1</Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 border rounded">
                            <span>Body Text</span>
                            <Badge variant="secondary">12.6:1</Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          All text meets minimum 4.5:1 contrast ratio for normal text
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Keyboard Navigation</CardTitle>
                      <CardDescription>
                        All interactive elements are keyboard accessible with visible focus indicators
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Button className="w-full justify-start">Focusable Button</Button>
                          <div className="p-2 border rounded focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
                            <input className="w-full outline-none" placeholder="Focusable Input" />
                          </div>
                          <div className="p-2 border rounded focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
                            <select className="w-full outline-none">
                              <option>Focusable Select</option>
                            </select>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          2px focus ring with 2px offset for clear visibility
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Screen Reader Support</CardTitle>
                      <CardDescription>
                        Semantic HTML and ARIA attributes ensure compatibility with assistive technologies
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 border rounded bg-muted/30">
                          <code className="text-sm">
                            {`<button 
  aria-label="Close dialog"
  aria-describedby="close-help"
>
  <CloseIcon aria-hidden="true" />
</button>`}
                          </code>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Proper ARIA labels and semantic markup for screen readers
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Testing & Validation</CardTitle>
                      <CardDescription>
                        Automated and manual testing ensures ongoing accessibility compliance
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            <span className="text-sm">axe-core automated testing</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            <span className="text-sm">Lighthouse accessibility audits</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            <span className="text-sm">Manual keyboard testing</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            <span className="text-sm">Screen reader testing</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Comprehensive testing strategy ensures accessibility standards
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="resources" className="mt-8">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-semibold mb-4">Resources & Downloads</h2>
                  <p className="text-muted-foreground mb-8">
                    Design assets, code examples, and implementation guides for teams.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Figma Library</CardTitle>
                      <CardDescription>Complete component library with design tokens and styles</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">Open in Figma</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Code Repository</CardTitle>
                      <CardDescription>React components and TypeScript definitions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full bg-transparent">
                        View on GitHub
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Design Tokens</CardTitle>
                      <CardDescription>JSON export of all design tokens and variables</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full bg-transparent">
                        Download JSON
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Icon Library</CardTitle>
                      <CardDescription>SVG icons optimized for web and mobile applications</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full bg-transparent">
                        Browse Icons
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Brand Assets</CardTitle>
                      <CardDescription>Logos, brand colors, and visual identity guidelines</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full bg-transparent">
                        Download Assets
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Documentation</CardTitle>
                      <CardDescription>Complete implementation guide and best practices</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full bg-transparent">
                        View Docs
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Getting Started</CardTitle>
                    <CardDescription>Quick setup guide for developers and designers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <h4 className="font-semibold mb-2">For Developers</h4>
                        <div className="space-y-2 text-sm">
                          <div>1. Install the design system package</div>
                          <div>2. Import components and design tokens</div>
                          <div>3. Follow accessibility guidelines</div>
                          <div>4. Test with keyboard navigation</div>
                        </div>
                      </div>
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <h4 className="font-semibold mb-2">For Designers</h4>
                        <div className="space-y-2 text-sm">
                          <div>1. Access the Figma component library</div>
                          <div>2. Use established design tokens</div>
                          <div>3. Follow spacing and typography guidelines</div>
                          <div>4. Ensure accessibility compliance</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
