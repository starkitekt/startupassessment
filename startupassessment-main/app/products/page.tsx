import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const productCategories = [
  {
    id: "nanomaterials",
    title: "Nanomaterials",
    description: "Advanced materials at the nanoscale",
    subcategories: [
      "Carbon Nanotubes & Graphene",
      "Compounds",
      "Dispersions",
      "Elements"
    ],
    image: "/images/nanomaterials.jpg"
  },
  {
    id: "nanoscience-lab",
    title: "NanoScience Lab",
    description: "Research and development solutions",
    subcategories: [
      "Material Synthesis",
      "Characterization",
      "Testing & Analysis"
    ],
    image: "/images/nanoscience-lab.jpg"
  },
  {
    id: "instruments",
    title: "Instruments",
    description: "Precision measurement and analysis tools",
    subcategories: [
      "Microscopy",
      "Spectroscopy",
      "Surface Analysis"
    ],
    image: "/images/instruments.jpg"
  }
]

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Products</h1>
        <p className="text-xl text-muted-foreground">
          Discover our comprehensive range of nanotechnology products and solutions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {productCategories.map((category) => (
          <Card key={category.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2 mb-6">
                {category.subcategories.map((subcategory) => (
                  <li key={subcategory} className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                    {subcategory}
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full">
                <Link href={`/products/${category.id}`}>
                  View Details
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Why Choose Our Products?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Quality Assured</h3>
            <p className="text-muted-foreground">
              All products undergo rigorous quality control and testing
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Technical Support</h3>
            <p className="text-muted-foreground">
              Expert assistance and guidance for all products
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Custom Solutions</h3>
            <p className="text-muted-foreground">
              Tailored products and services for specific requirements
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 