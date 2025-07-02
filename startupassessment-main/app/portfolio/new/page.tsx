"use client"
import { useRouter } from "next/navigation"
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
import { ArrowLeft, Building } from "lucide-react"
import { useGlobalSettings } from "@/contexts/global-settings-context"

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
})

type StartupFormValues = z.infer<typeof startupSchema>

export default function NewStartupPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { selectedCurrency } = useGlobalSettings()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<StartupFormValues>({
    resolver: zodResolver(startupSchema),
    defaultValues: {
      totalFunding: 0,
      mrr: 0,
    },
  })

  const onSubmit = async (data: StartupFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
    console.log("New Startup Data:", data)
    toast({
      title: "Startup Added (Simulated)",
      description: `${data.name} has been added to the portfolio.`,
    })
    router.push("/portfolio")
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
      </Button>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="mr-2 h-6 w-6 text-primary" /> Add New Startup
          </CardTitle>
          <CardDescription>Enter the details for the new startup to add it to your portfolio.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">
                Startup Name <span className="text-red-500">*</span>
              </Label>
              <Input id="name" {...register("name")} placeholder="e.g., Innovatech Solutions" />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="logoUrl">Logo URL</Label>
              <Input id="logoUrl" {...register("logoUrl")} placeholder="https://example.com/logo.png" />
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger id="sector">
                        <SelectValue placeholder="Select sector" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="FinTech">FinTech</SelectItem>
                        <SelectItem value="HealthTech">HealthTech</SelectItem>
                        <SelectItem value="EdTech">EdTech</SelectItem>
                        <SelectItem value="AgriTech">AgriTech</SelectItem>
                        <SelectItem value="SaaS">SaaS</SelectItem>
                        <SelectItem value="E-commerce">E-commerce</SelectItem>
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger id="stage">
                        <SelectValue placeholder="Select stage" />
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
              <Label htmlFor="tagline">Tagline</Label>
              <Input id="tagline" {...register("tagline")} placeholder="e.g., Revolutionizing digital payments" />
              {errors.tagline && <p className="text-sm text-red-500">{errors.tagline.message}</p>}
            </div>
            <div>
              <Label htmlFor="description">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Brief overview of the startup, its mission, and problem it solves."
              />
              {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
            </div>
            <div>
              <Label htmlFor="website">Website URL</Label>
              <Input id="website" {...register("website")} placeholder="https://startupname.com" />
              {errors.website && <p className="text-sm text-red-500">{errors.website.message}</p>}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="totalFunding">Total Funding ({selectedCurrency.code})</Label>
                <Input id="totalFunding" type="number" {...register("totalFunding")} placeholder="e.g., 500000" />
                {errors.totalFunding && <p className="text-sm text-red-500">{errors.totalFunding.message}</p>}
              </div>
              <div>
                <Label htmlFor="mrr">MRR ({selectedCurrency.code})</Label>
                <Input id="mrr" type="number" {...register("mrr")} placeholder="e.g., 15000" />
                {errors.mrr && <p className="text-sm text-red-500">{errors.mrr.message}</p>}
              </div>
            </div>
            <div>
              <Label htmlFor="assignedMentor">Assigned Mentor (ID or Name)</Label>
              <Input id="assignedMentor" {...register("assignedMentor")} placeholder="e.g., Ananya Sharma or M001" />
              {errors.assignedMentor && <p className="text-sm text-red-500">{errors.assignedMentor.message}</p>}
            </div>
            <div>
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input id="tags" {...register("tags")} placeholder="e.g., AI, Payments, B2B" />
              {errors.tags && <p className="text-sm text-red-500">{errors.tags.message}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
              {isSubmitting ? "Adding Startup..." : "Add Startup to Portfolio"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
