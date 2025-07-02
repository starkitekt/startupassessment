import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { notFound } from "next/navigation"

interface TechnicalDetails {
  "Physical Properties": string[]
  "Chemical Properties": string[]
}

interface Product {
  name: string
  category: string
  description: string
  specifications: string[]
  applications: string[]
  technicalDetails: TechnicalDetails
  certifications: string[]
}

interface ProductDatabase {
  [category: string]: {
    [product: string]: Product
  }
}

// This would typically come from a database or API
const productDatabase: ProductDatabase = {
  "carbon-nanotubes": {
    "single-walled-carbon-nanotubes": {
      name: "Single-Walled Carbon Nanotubes",
      category: "Carbon Nanotubes & Graphene",
      description: "High-purity SWCNTs with controlled diameter and length",
      specifications: [
        "Purity: >95%",
        "Diameter: 1-2 nm",
        "Length: 5-30 μm",
        "Surface Area: >400 m²/g"
      ],
      applications: [
        "Electronics and Sensors",
        "Energy Storage",
        "Composite Materials",
        "Biomedical Applications"
      ],
      technicalDetails: {
        "Physical Properties": [
          "Color: Black",
          "Form: Powder",
          "Density: 1.3-1.5 g/cm³",
          "Thermal Conductivity: >3000 W/m·K"
        ],
        "Chemical Properties": [
          "Carbon Content: >95%",
          "Metal Impurities: <5%",
          "Surface Chemistry: Customizable",
          "Functional Groups: Available on request"
        ]
      },
      certifications: [
        "ISO 9001:2015",
        "Material Safety Data Sheet",
        "Certificate of Analysis",
        "Quality Control Report"
      ]
    }
  }
}

export default function ProductPage({
  params
}: {
  params: { category: string; product: string }
}) {
  const product = productDatabase[params.category]?.[params.product]

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/products/nanomaterials" className="text-muted-foreground hover:text-primary">
            ← Back to Nanomaterials
          </Link>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl text-muted-foreground">{product.description}</p>
        </div>

        <Tabs defaultValue="overview" className="mb-12">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="technical">Technical Details</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Product Overview</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p>
                    Our {product.name} is a high-quality nanomaterial designed for advanced applications
                    in various industries. With precise control over physical and chemical properties,
                    this product offers exceptional performance and reliability.
                  </p>
                  <h3>Key Features</h3>
                  <ul>
                    {product.specifications.slice(0, 3).map((spec: string) => (
                      <li key={spec}>{spec}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications">
            <Card>
              <CardHeader>
                <CardTitle>Product Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {product.specifications.map((spec: string) => (
                    <div key={spec} className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                      {spec}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {product.applications.map((app: string) => (
                    <div key={app} className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                      {app}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="technical">
            <Card>
              <CardHeader>
                <CardTitle>Technical Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(product.technicalDetails).map(([category, details]) => (
                    <div key={category}>
                      <h3 className="font-semibold mb-2">{category}</h3>
                      <div className="grid gap-2">
                        {(details as string[]).map((detail: string) => (
                          <div key={detail} className="flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                            {detail}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Certifications & Documentation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.certifications.map((cert: string) => (
              <div key={cert} className="flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                {cert}
              </div>
            ))}
          </div>
          <div className="mt-8 flex gap-4">
            <Button asChild>
              <Link href="/contact">Request Quote</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Technical Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 