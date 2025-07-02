import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

const nanomaterials = {
  "carbon-nanotubes": {
    title: "Carbon Nanotubes & Graphene",
    description: "High-quality carbon nanotubes and graphene materials for advanced applications",
    products: [
      {
        name: "Single-Walled Carbon Nanotubes",
        description: "High-purity SWCNTs with controlled diameter and length",
        specifications: [
          "Purity: >95%",
          "Diameter: 1-2 nm",
          "Length: 5-30 μm",
          "Surface Area: >400 m²/g"
        ]
      },
      {
        name: "Multi-Walled Carbon Nanotubes",
        description: "MWCNTs with excellent mechanical and electrical properties",
        specifications: [
          "Purity: >98%",
          "Diameter: 10-20 nm",
          "Length: 10-50 μm",
          "Surface Area: >200 m²/g"
        ]
      },
      {
        name: "Graphene Oxide",
        description: "High-quality graphene oxide for various applications",
        specifications: [
          "Carbon Content: >45%",
          "Oxygen Content: <50%",
          "Sheet Size: 0.5-5 μm",
          "Thickness: 0.8-1.2 nm"
        ]
      }
    ]
  },
  "compounds": {
    title: "Compounds",
    description: "Specialized compound materials for nanotechnology applications",
    products: [
      {
        name: "Metal Oxide Nanoparticles",
        description: "High-purity metal oxide nanoparticles",
        specifications: [
          "Particle Size: 10-50 nm",
          "Purity: >99.9%",
          "Crystal Structure: Various",
          "Surface Area: >50 m²/g"
        ]
      },
      {
        name: "Quantum Dots",
        description: "Semiconductor quantum dots with tunable properties",
        specifications: [
          "Size: 2-10 nm",
          "Emission Range: 400-800 nm",
          "Quantum Yield: >80%",
          "Stability: >6 months"
        ]
      }
    ]
  }
}

export default function NanomaterialsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">Nanomaterials</h1>
        <p className="text-xl text-muted-foreground">
          High-quality nanomaterials for research and industrial applications
        </p>
      </div>

      <Tabs defaultValue="carbon-nanotubes" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="carbon-nanotubes">Carbon Nanotubes & Graphene</TabsTrigger>
          <TabsTrigger value="compounds">Compounds</TabsTrigger>
        </TabsList>

        {Object.entries(nanomaterials).map(([key, category]) => (
          <TabsContent key={key} value={key}>
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">{category.title}</h2>
                <p className="text-muted-foreground">{category.description}</p>
              </div>

              <div className="grid gap-6">
                {category.products.map((product) => (
                  <Card key={product.name}>
                    <CardHeader>
                      <CardTitle>{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-semibold mb-2">Specifications</h3>
                          <ul className="space-y-1">
                            {product.specifications.map((spec) => (
                              <li key={spec} className="flex items-center">
                                <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                                {spec}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex items-end justify-end">
                          <Button asChild>
                            <Link href={`/products/nanomaterials/${key}/${product.name.toLowerCase().replace(/\s+/g, '-')}`}>
                              View Details
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-16 bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Quality Assurance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Certification</h3>
            <p className="text-muted-foreground">
              All products come with detailed certification and analysis reports
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Customization</h3>
            <p className="text-muted-foreground">
              Available in various specifications and quantities
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Technical Support</h3>
            <p className="text-muted-foreground">
              Expert guidance for product selection and application
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 