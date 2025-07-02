{
  ;`
"use client"

import type React from "react"
import { useState } from "react"
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
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ArrowLeft, UploadCloud, FileText, Landmark, Building, CalendarDays, Hash, IndianRupee, FileBadge, Info, TestTube2 } from 'lucide-react'

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png"];

const applicationFormSchema = z.object({
  // Corporate Details
  entityName: z.string().min(1, "Entity name is required"),
  entityType: z.enum(["Private Limited", "LLP", "Partnership"], { required_error: "Entity type is required" }),
  incorporationDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format for incorporation date.",
  }).refine((date) => {
    const tenYearsAgo = new Date();
    const inputDate = new Date(date);
    tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);
    // Ensure date is not in the future and not more than 10 years ago
    return inputDate <= new Date() && inputDate >= tenYearsAgo;
  }, "Incorporation date must be within the last 10 years and not in the future."),
  cinRocNumber: z.string().min(1, "CIN/ROC number is required").regex(/^[LUu]{1}[0-9]{5}[A-Za-z]{2}[0-9]{4}[A-Za-z]{3}[0-9]{6}$|^[Ff]{1}[0-9]{5}$|^[A-Za-z]{3}-[0-9]{5}$|^[A-Za-z0-9]{8}$/, "Invalid CIN/LLPIN/Reg No. format"),
  dpiitRecognitionNumber: z.string().optional(),
  
  // Financial Details
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format").min(10, "PAN must be 10 characters").max(10, "PAN must be 10 characters"),
  gstinNumber: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GSTIN format").optional().or(z.literal("")),
  latestAnnualTurnover: z.preprocess(
    (val) => (val === "" ? undefined : Number(String(val))),
    z.number({invalid_type_error: "Turnover must be a number"}).nonnegative("Turnover cannot be negative").max(1000000000, "Turnover cannot exceed ₹100 crore (100,00,00,000)")
  ),

  // Legal Declarations
  confirmDpiitDefinition: z.boolean().refine(val => val === true, {
    message: "You must confirm the entity meets DPIIT startup definition."
  }),

  // Document Uploads (basic file input, actual upload handling is backend)
  incorporationCertificate: z.any()
    .refine((files) => !files || files.length === 0 || files?.[0]?.size <= MAX_FILE_SIZE, \`Max file size is 5MB.\`)
    .refine((files) => !files || files.length === 0 || ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), "Only .pdf, .jpg, .png files are accepted.")
    .optional(),
  panCardCopy: z.any()
    .refine((files) => !files || files.length === 0 || files?.[0]?.size <= MAX_FILE_SIZE, \`Max file size is 5MB.\`)
    .refine((files) => !files || files.length === 0 || ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), "Only .pdf, .jpg, .png files are accepted.")
    .optional(),
  dpiitRecognitionCertificateCopy: z.any()
    .refine((files) => !files || files.length === 0 || files?.[0]?.size <= MAX_FILE_SIZE, \`Max file size is 5MB.\`)
    .refine((files) => !files || files.length === 0 || ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), "Only .pdf, .jpg, .png files are accepted.")
    .optional(),
  proofOfRegisteredOffice: z.any()
    .refine((files) => !files || files.length === 0 || files?.[0]?.size <= MAX_FILE_SIZE, \`Max file size is 5MB.\`)
    .refine((files) => !files || files.length === 0 || ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), "Only .pdf, .jpg, .png files are accepted.")
    .optional(),
  
  businessPlanPitchDeck: z.any()
    .refine((files) => !files || files.length === 0 || files?.[0]?.size <= MAX_FILE_SIZE, \`Max file size is 5MB.\`)
    .refine((files) => !files || files.length === 0 || ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), "Only .pdf, .jpg, .png files are accepted.")
    .optional(),
  teamDetails: z.string().min(1, "Team details are required"),
  requestedFundingAmount: z.preprocess(
    (val) => (val === "" ? undefined : Number(String(val))),
    z.number({invalid_type_error: "Funding amount must be a number"}).positive("Funding amount must be positive")
  ),

  stateIncubatorScheme: z.string().optional(),
});

type ApplicationFormValues = z.infer<typeof applicationFormSchema>;

// Dummy data for training
const dummyData: Partial<ApplicationFormValues> = {
  entityName: "Innovatech Future Solutions Pvt. Ltd.",
  entityType: "Private Limited",
  incorporationDate: "2023-05-15", // YYYY-MM-DD
  cinRocNumber: "U72900KA2023PTC123456",
  dpiitRecognitionNumber: "DIPP12345",
  panNumber: "ABCDE1234F",
  gstinNumber: "29ABCDE1234F1Z5",
  latestAnnualTurnover: 5000000, // 50 Lakhs
  teamDetails: "Experienced team with 2 co-founders. CEO: Priya Sharma (10+ years in tech), CTO: Rahul Verma (8+ years in AI/ML). Strong advisory board.",
  requestedFundingAmount: 10000000, // 1 Crore
  stateIncubatorScheme: "karnataka",
  confirmDpiitDefinition: true,
};


export default function NewStartupApplicationPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { register, handleSubmit, control, formState: { errors, isSubmitting }, reset } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      confirmDpiitDefinition: false,
      latestAnnualTurnover: 0,
      requestedFundingAmount: 0,
    }
  });

  const onSubmit = async (data: ApplicationFormValues) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("Application Data:", data);
    
    const uploadedFileNames = {
      incorporationCertificate: data.incorporationCertificate?.[0]?.name,
      panCardCopy: data.panCardCopy?.[0]?.name,
      dpiitRecognitionCertificateCopy: data.dpiitRecognitionCertificateCopy?.[0]?.name,
      proofOfRegisteredOffice: data.proofOfRegisteredOffice?.[0]?.name,
      businessPlanPitchDeck: data.businessPlanPitchDeck?.[0]?.name,
    };
    console.log("Uploaded files (names):", uploadedFileNames);

    toast({
      title: "Application Submitted (Simulated)",
      description: \`Thank you, \${data.entityName}. Your application is now pending review.\`,
    });
    router.push("/"); 
  };

  const loadDummyData = () => {
    reset(dummyData); // react-hook-form's reset function to populate form
    toast({ title: "Dummy Data Loaded", description: "Form has been populated with example data." });
  };

  const FileInput = ({name, label, icon: IconComp, required, tooltipText}: {name: keyof ApplicationFormValues, label: string, icon: React.ElementType, required?: boolean, tooltipText?: string}) => (
    <div className="space-y-1">
      <div className="flex items-center">
        <Label htmlFor={name} className="flex items-center">
          <IconComp className="mr-2 h-4 w-4 text-muted-foreground" />
          {label} {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        {tooltipText && (
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 p-0">
                  <Info className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs">
                <p>{tooltipText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <Input id={name} type="file" {...register(name)} className="pt-1.5" />
      {errors[name] && <p className="text-sm text-red-500">{(errors[name] as any)?.message}</p>}
    </div>
  );


  return (
    <TooltipProvider> {/* Ensure TooltipProvider wraps the content using tooltips */}
      <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button variant="secondary" onClick={loadDummyData}>
            <TestTube2 className="mr-2 h-4 w-4" /> Load Dummy Data (For Training)
          </Button>
        </div>
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">New Startup Application</CardTitle>
            <CardDescription>
              Fill in the details to apply for the incubation program. Please ensure all information is accurate and documents are up-to-date.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              {/* Corporate Details Section */}
              <section className="space-y-4 p-4 border rounded-md">
                <h3 className="text-lg font-semibold flex items-center"><Building className="mr-2 h-5 w-5 text-primary" />Corporate Details</h3>
                <div>
                  <div className="flex items-center">
                    <Label htmlFor="entityName">Entity Name <span className="text-red-500">*</span></Label>
                    <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 p-0"><Info className="h-3.5 w-3.5 text-muted-foreground" /></Button>
                        </TooltipTrigger>
                        <TooltipContent side="top"><p>The full legal name of your startup as registered.</p></TooltipContent>
                    </Tooltip>
                  </div>
                  <Input id="entityName" {...register("entityName")} placeholder="e.g., Innovatech Solutions Pvt. Ltd." />
                  {errors.entityName && <p className="text-sm text-red-500">{errors.entityName.message}</p>}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="entityType">Entity Type <span className="text-red-500">*</span></Label>
                    <Controller
                      name="entityType"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                          <SelectTrigger id="entityType"><SelectValue placeholder="Select entity type" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Private Limited">Private Limited Company</SelectItem>
                            <SelectItem value="LLP">Limited Liability Partnership (LLP)</SelectItem>
                            <SelectItem value="Partnership">Registered Partnership Firm</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.entityType && <p className="text-sm text-red-500">{errors.entityType.message}</p>}
                  </div>
                  <div>
                    <div className="flex items-center">
                      <Label htmlFor="incorporationDate">Incorporation Date <span className="text-red-500">*</span></Label>
                       <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-5 w-5 ml-1 p-0"><Info className="h-3.5 w-3.5 text-muted-foreground" /></Button>
                        </TooltipTrigger>
                        <TooltipContent side="top"><p>Date of company registration. Must be within the last 10 years.</p></TooltipContent>
                      </Tooltip>
                    </div>
                    <Input id="incorporationDate" type="date" {...register("incorporationDate")} />
                    {errors.incorporationDate && <p className="text-sm text-red-500">{errors.incorporationDate.message}</p>}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cinRocNumber">CIN / LLPIN / Registration No. <span className="text-red-500">*</span></Label>
                    <Input id="cinRocNumber" {...register("cinRocNumber")} placeholder="Enter Corporate ID Number" />
                    {errors.cinRocNumber && <p className="text-sm text-red-500">{errors.cinRocNumber.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="dpiitRecognitionNumber">DPIIT Recognition Number (if any)</Label>
                    <Input id="dpiitRecognitionNumber" {...register("dpiitRecognitionNumber")} placeholder="Enter DPIIT number if available" />
                    {errors.dpiitRecognitionNumber && <p className="text-sm text-red-500">{errors.dpiitRecognitionNumber.message}</p>}
                  </div>
                </div>
              </section>

              {/* Financial Details Section */}
              <section className="space-y-4 p-4 border rounded-md">
                <h3 className="text-lg font-semibold flex items-center"><Landmark className="mr-2 h-5 w-5 text-primary" />Financial Details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="panNumber">PAN of Entity <span className="text-red-500">*</span></Label>
                    <Input id="panNumber" {...register("panNumber")} placeholder="ABCDE1234F" />
                    {errors.panNumber && <p className="text-sm text-red-500">{errors.panNumber.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="gstinNumber">GSTIN (if applicable)</Label>
                    <Input id="gstinNumber" {...register("gstinNumber")} placeholder="e.g., 29ABCDE1234F1Z5" />
                    {errors.gstinNumber && <p className="text-sm text-red-500">{errors.gstinNumber.message}</p>}
                  </div>
                </div>
                <div>
                  <Label htmlFor="latestAnnualTurnover">Latest Annual Turnover (INR) <span className="text-red-500">*</span></Label>
                  <Input id="latestAnnualTurnover" type="number" {...register("latestAnnualTurnover")} placeholder="e.g., 5000000 (for ₹50 Lakhs)" />
                  {errors.latestAnnualTurnover && <p className="text-sm text-red-500">{errors.latestAnnualTurnover.message}</p>}
                </div>
              </section>
              
              <section className="space-y-4 p-4 border rounded-md">
                <h3 className="text-lg font-semibold flex items-center"><FileText className="mr-2 h-5 w-5 text-primary" />Application Specifics</h3>
                 <div>
                  <Label htmlFor="teamDetails">Team Details <span className="text-red-500">*</span></Label>
                  <Textarea id="teamDetails" {...register("teamDetails")} placeholder="Briefly describe key team members, their roles, and expertise." />
                  {errors.teamDetails && <p className="text-sm text-red-500">{errors.teamDetails.message}</p>}
                </div>
                <div>
                  <Label htmlFor="requestedFundingAmount">Requested Funding Amount (INR) <span className="text-red-500">*</span></Label>
                  <Input id="requestedFundingAmount" type="number" {...register("requestedFundingAmount")} placeholder="e.g., 1000000 (for ₹10 Lakhs)" />
                  {errors.requestedFundingAmount && <p className="text-sm text-red-500">{errors.requestedFundingAmount.message}</p>}
                </div>
              </section>

              <section className="space-y-4 p-4 border rounded-md">
                <h3 className="text-lg font-semibold flex items-center"><UploadCloud className="mr-2 h-5 w-5 text-primary" />Document Uploads</h3>
                <p className="text-sm text-muted-foreground">Max file size 5MB. Accepted formats: PDF, JPG, PNG.</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <FileInput name="incorporationCertificate" label="Incorporation Certificate" icon={FileBadge} tooltipText="Upload the official Certificate of Incorporation for your entity." />
                  <FileInput name="panCardCopy" label="PAN Card Copy (Entity)" icon={FileBadge} tooltipText="Upload a clear copy of the PAN card registered to the entity."/>
                  <FileInput name="dpiitRecognitionCertificateCopy" label="DPIIT Recognition Certificate (if any)" icon={FileBadge} />
                  <FileInput name="proofOfRegisteredOffice" label="Proof of Registered Office" icon={FileBadge} tooltipText="E.g., latest utility bill (electricity, telephone) or rental agreement."/>
                  <FileInput name="businessPlanPitchDeck" label="Business Plan / Pitch Deck" icon={FileText} tooltipText="Upload your comprehensive business plan or investor pitch deck."/>
                </div>
              </section>

              <section className="space-y-4 p-4 border rounded-md">
                <h3 className="text-lg font-semibold flex items-center"><Hash className="mr-2 h-5 w-5 text-primary" />State Specific Information</h3>
                <div>
                  <Label htmlFor="stateIncubatorScheme">Applicable State Incubator Scheme (if any)</Label>
                   <Controller
                      name="stateIncubatorScheme"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                          <SelectTrigger id="stateIncubatorScheme"><SelectValue placeholder="Select state scheme if applicable" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="karnataka">Karnataka Startup Cell</SelectItem>
                            <SelectItem value="maharashtra">Maharashtra State Innovation Society</SelectItem>
                            <SelectItem value="telangana">Telangana TSIIC Scheme</SelectItem>
                            <SelectItem value="other">Other / Not Applicable</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  {errors.stateIncubatorScheme && <p className="text-sm text-red-500">{errors.stateIncubatorScheme.message}</p>}
                  <p className="text-xs text-muted-foreground mt-1">Additional fields may appear based on selection in a future version.</p>
                </div>
              </section>

              <section className="space-y-2 p-4 border rounded-md">
                <h3 className="text-lg font-semibold flex items-center"><FileBadge className="mr-2 h-5 w-5 text-primary" />Legal Declarations</h3>
                <div className="flex items-start space-x-2">
                  <Controller
                    name="confirmDpiitDefinition"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        id="confirmDpiitDefinition"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-1"
                      />
                    )}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="confirmDpiitDefinition" className="font-medium">
                      I confirm that this entity meets the startup definition as per DPIIT guidelines and all information provided is true to the best of my knowledge. <span className="text-red-500">*</span>
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Misrepresentation may lead to disqualification and legal action.
                    </p>
                  </div>
                </div>
                {errors.confirmDpiitDefinition && <p className="text-sm text-red-500">{errors.confirmDpiitDefinition.message}</p>}
              </section>
              
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                {isSubmitting ? "Submitting Application..." : "Submit Application"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </TooltipProvider>
  );
}
`
}
