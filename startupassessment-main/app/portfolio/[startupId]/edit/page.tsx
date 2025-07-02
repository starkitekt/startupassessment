"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Building, Save } from "lucide-react"
import { useGlobalSettings } from "@/contexts/global-settings-context"

// Mock data for portfolio items (ensure this matches structure in portfolio-content.tsx)
const mockPortfolios = [
  {
    id: "STP001",
    name: "Innovatech Solutions",
    logoUrl: "/placeholder.svg?height=32&width=32",
    sector: "FinTech",
    stage: "Seed",
    fundingStatus: "Funded",
    totalFunding: 500000,
    mrr: 15000,
    userGrowth: 25,
    assignedMentor: "Ananya Sharma",
    lastActivity: "2024-05-15",
    tags: "AI, Payments",
    healthScore: 85,
    tagline: "Revolutionizing digital payments",
    description:
      "Innovatech Solutions is an AI-driven FinTech company focused on providing personalized financial advice and payment solutions.",
    website: "https://innovatech.example.com",
  },
  {
    id: "STP002",
    name: "HealthWell AI",
    logoUrl: "/placeholder.svg?height=32&width=32",
    sector: "HealthTech",
    stage: "Series A",
    fundingStatus: "Seeking",
    totalFunding: 1200000,
    mrr: 45000,
    userGrowth: 18,
    assignedMentor: "Vikram Singh",
    lastActivity: "2024-05-20",
    tags: "Diagnostics, ML",
    healthScore: 78,
    tagline: "AI for better healthcare outcomes",
    description:
      "HealthWell AI leverages machine learning for early disease detection and personalized treatment plans.",
    website: "https://healthwell.example.com",
  },
]

const startupSchema = z.object({
  name: z.string().min(2, "Startup name must be at least 2 characters"),
  logoUrl: z.string().url("Invalid URL for logo").optional().or(z.literal("")),
  sector: z.string().min(1, "Sector is required"),
  stage: z.string().min(1, "Stage is required"),
  tagline: z.string().max(150, "Tagline too long").optional(),
  description: z.string().min(20, "Description must be at least 20 characters"),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
  totalFunding: z.preprocess(
    (val) => (val === "" ? undefined : Number(String(val))),
    z
      .number({ invalid_type_error: "Total funding must be a number" })
      .nonnegative("Funding cannot be negative")
      .optional(),
  ),
  mrr: z.preprocess(
    (val) => (val === "" ? undefined : Number(String(val))),
    z.number({ invalid_type_error: "MRR must be a number" }).nonnegative("MRR cannot be negative").optional(),
  ),
  assignedMentor: z.string().optional(),
  tags: z.string().optional(), // comma separated
  fundingStatus: z.string().min(1, "Funding status is required"),
})

type StartupFormValues = z.infer<typeof startupSchema>

export default function EditStartupPage() {
  const router = useRouter()
  const params = useParams()
  const startupId = params.startupId as string
  const { toast } = useToast()
  const { selectedCurrency } = useGlobalSettings()

  const [startupData, setStartupData] = useState<StartupFormValues | null>(null)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StartupFormValues>({
    resolver: zodResolver(startupSchema),
  })

  useEffect(() => {
    // Simulate fetching startup data
    const data = mockPortfolios.find((s) => s.id === startupId)
    if (data) {
      const formData = {
        ...data,
        tags: Array.isArray(data.tags) ? data.tags.join(", ") : data.tags, // Ensure tags is a string for the form
      }
      setStartupData(formData as StartupFormValues) // Cast might be needed if mock data structure differs slightly
      reset(formData as StartupFormValues)
    } else {
      toast({ title: "Error", description: "Startup not found.", variant: "destructive" })
      router.push("/portfolio")
    }
  }, [startupId, reset, router, toast])

  const onSubmit = async (data: StartupFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
    console.log("Updated Startup Data:", { startupId, ...data })
    toast({
      title: "Startup Updated (Simulated)",
      description: `${data.name} has been successfully updated.`,
    })
    router.push(`/portfolio/${startupId}`)
  }

  if (!startupData) {
    return <div className="p-6 text-center">Loading startup data...</div>
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
      </Button>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="mr-2 h-6 w-6 text-primary" /> Edit Startup: {startupData.name}
          </CardTitle>
          <CardDescription>Update the details for this startup.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">
                Startup Name <span className="text-red-500">*</span>
              </Label>
              <Input id="name" {...register("name")} />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="logoUrl">Logo URL</Label>
              <Input id="logoUrl" {...register("logoUrl")} />
              {errors.logoUrl && <p className="text-sm text-red-500">{errors.logoUrl.message}</p>}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sector">
                  Sector <span className="text-red-500">*</span>
                </Label>
                <Controller
                  name="sector"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="sector">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="FinTech">FinTech</SelectItem>
                        <SelectItem value="HealthTech">HealthTech</SelectItem>
                        <SelectItem value="EdTech">EdTech</SelectItem>
                        <SelectItem value="AgriTech">AgriTech</SelectItem>
                        <SelectItem value="SaaS">SaaS</SelectItem>
                        <SelectItem value="E-commerce">E-commerce</SelectItem>
                        <SelectItem value="CleanTech">CleanTech</SelectItem>
                        <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                        <SelectItem value="RetailTech">RetailTech</SelectItem>
                        <SelectItem value="Deep Tech">Deep Tech</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.sector && <p className="text-sm text-red-500">{errors.sector.message}</p>}
              </div>
              <div>
                <Label htmlFor="stage">
                  Stage <span className="text-red-500">*</span>
                </Label>
                <Controller
                  name="stage"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="stage">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pre-Seed">Pre-Seed</SelectItem>
                        <SelectItem value="Seed">Seed</SelectItem>
                        <SelectItem value="Series A">Series A</SelectItem>
                        <SelectItem value="Series B">Series B</SelectItem>
                        <SelectItem value="Growth">Growth</SelectItem>
                        <SelectItem value="Exit">Exit</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.stage && <p className="text-sm text-red-500">{errors.stage.message}</p>}
              </div>
            </div>
            <div>
              <Label htmlFor="fundingStatus">
                Funding Status <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="fundingStatus"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="fundingStatus">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bootstrapped">Bootstrapped</SelectItem>
                      <SelectItem value="Seeking">Seeking</SelectItem>
                      <SelectItem value="Funded">Funded</SelectItem>
                      <SelectItem value="Acquired">Acquired</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.fundingStatus && <p className="text-sm text-red-500">{errors.fundingStatus.message}</p>}
            </div>
            <div>
              <Label htmlFor="tagline">Tagline</Label>
              <Input id="tagline" {...register("tagline")} />
              {errors.tagline && <p className="text-sm text-red-500">{errors.tagline.message}</p>}
            </div>
            <div>
              <Label htmlFor="description">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea id="description" {...register("description")} />
              {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
            </div>
            <div>
              <Label htmlFor="website">Website URL</Label>
              <Input id="website" {...register("website")} />
              {errors.website && <p className="text-sm text-red-500">{errors.website.message}</p>}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="totalFunding">Total Funding ({selectedCurrency.code})</Label>
                <Input id="totalFunding" type="number" {...register("totalFunding")} />
                {errors.totalFunding && <p className="text-sm text-red-500">{errors.totalFunding.message}</p>}
              </div>
              <div>
                <Label htmlFor="mrr">MRR ({selectedCurrency.code})</Label>
                <Input id="mrr" type="number" {...register("mrr")} />
                {errors.mrr && <p className="text-sm text-red-500">{errors.mrr.message}</p>}
              </div>
            </div>
            <div>
              <Label htmlFor="assignedMentor">Assigned Mentor (ID or Name)</Label>
              <Input id="assignedMentor" {...register("assignedMentor")} />
              {errors.assignedMentor && <p className="text-sm text-red-500">{errors.assignedMentor.message}</p>}
            </div>
            <div>
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input id="tags" {...register("tags")} />
              {errors.tags && <p className="text-sm text-red-500">{errors.tags.message}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full md:w-auto jpmc-gradient text-white" disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" /> {isSubmitting ? "Saving Changes..." : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
