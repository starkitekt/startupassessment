"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { AuditEngagement, AuditType, AuditStatus } from "@/types/audit"
import { AUDIT_TYPES, AUDIT_STATUSES } from "@/types/audit"
import { mockUsers } from "@/hooks/use-user-role" // Assuming this contains a list of potential auditors
import { useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const auditFormSchema = z.object({
  name: z.string().min(5, "Audit name must be at least 5 characters"),
  scopeDescription: z.string().min(10, "Scope description is required"),
  type: z.enum(AUDIT_TYPES),
  status: z.enum(AUDIT_STATUSES),
  auditPeriodStart: z.date({ required_error: "Audit period start date is required." }),
  auditPeriodEnd: z.date({ required_error: "Audit period end date is required." }),
  plannedStartDate: z.date({ required_error: "Planned start date is required." }),
  plannedEndDate: z.date({ required_error: "Planned end date is required." }),
  auditorTeamIds: z.array(z.string()).min(1, "At least one auditor must be selected"),
})

type AuditFormValues = z.infer<typeof auditFormSchema>

interface AuditFormModalProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  onSubmit: (data: AuditEngagement) => void
  auditToEdit?: AuditEngagement | null
}

export function AuditFormModal({ isOpen, onOpenChange, onSubmit, auditToEdit }: AuditFormModalProps) {
  const form = useForm<AuditFormValues>({
    resolver: zodResolver(auditFormSchema),
    defaultValues: {
      name: "",
      scopeDescription: "",
      type: "Comprehensive",
      status: "Planned",
      auditorTeamIds: [],
    },
  })

  useEffect(() => {
    if (auditToEdit) {
      form.reset({
        name: auditToEdit.name,
        scopeDescription: auditToEdit.scopeDescription,
        type: auditToEdit.type,
        status: auditToEdit.status,
        auditPeriodStart: new Date(auditToEdit.auditPeriodStart),
        auditPeriodEnd: new Date(auditToEdit.auditPeriodEnd),
        plannedStartDate: new Date(auditToEdit.plannedStartDate),
        plannedEndDate: new Date(auditToEdit.plannedEndDate),
        auditorTeamIds: auditToEdit.auditorTeam.map((u) => u.id),
      })
    } else {
      form.reset({
        name: "",
        scopeDescription: "",
        type: "Comprehensive",
        status: "Planned",
        auditPeriodStart: undefined,
        auditPeriodEnd: undefined,
        plannedStartDate: undefined,
        plannedEndDate: undefined,
        auditorTeamIds: [],
      })
    }
  }, [auditToEdit, form, isOpen]) // Added isOpen to reset form when modal opens

  const handleSubmit = (values: AuditFormValues) => {
    const selectedAuditors = mockUsers.filter((user) => values.auditorTeamIds.includes(user.id))
    const submittedData: AuditEngagement = {
      id: auditToEdit?.id || `AUD-${Date.now().toString().slice(-6)}`, // Simple ID generation
      ...values,
      auditPeriodStart: values.auditPeriodStart.toISOString(),
      auditPeriodEnd: values.auditPeriodEnd.toISOString(),
      plannedStartDate: values.plannedStartDate.toISOString(),
      plannedEndDate: values.plannedEndDate.toISOString(),
      auditorTeam: selectedAuditors.map((u) => ({ id: u.id, name: u.name })),
      createdAt: auditToEdit?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    onSubmit(submittedData)
    onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{auditToEdit ? "Edit Audit Engagement" : "Create New Audit Engagement"}</DialogTitle>
          <DialogDescription>
            {auditToEdit
              ? "Update the details of the audit engagement."
              : "Fill in the details for the new audit engagement."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Audit Name</Label>
              <Input id="name" {...form.register("name")} />
              {form.formState.errors.name && (
                <p className="text-xs text-red-500 mt-1">{form.formState.errors.name.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="type">Audit Type</Label>
              <Select
                onValueChange={(value) => form.setValue("type", value as AuditType)}
                defaultValue={form.getValues("type")}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select audit type" />
                </SelectTrigger>
                <SelectContent>
                  {AUDIT_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="scopeDescription">Scope Description</Label>
            <Textarea
              id="scopeDescription"
              {...form.register("scopeDescription")}
              placeholder="Describe the scope of this audit..."
            />
            {form.formState.errors.scopeDescription && (
              <p className="text-xs text-red-500 mt-1">{form.formState.errors.scopeDescription.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="auditPeriodStart">Audit Period Start</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !form.watch("auditPeriodStart") && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.watch("auditPeriodStart") ? (
                      format(form.watch("auditPeriodStart")!, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={form.watch("auditPeriodStart")}
                    onSelect={(date) => form.setValue("auditPeriodStart", date as Date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {form.formState.errors.auditPeriodStart && (
                <p className="text-xs text-red-500 mt-1">{form.formState.errors.auditPeriodStart.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="auditPeriodEnd">Audit Period End</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !form.watch("auditPeriodEnd") && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.watch("auditPeriodEnd") ? (
                      format(form.watch("auditPeriodEnd")!, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={form.watch("auditPeriodEnd")}
                    onSelect={(date) => form.setValue("auditPeriodEnd", date as Date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {form.formState.errors.auditPeriodEnd && (
                <p className="text-xs text-red-500 mt-1">{form.formState.errors.auditPeriodEnd.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="plannedStartDate">Planned Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !form.watch("plannedStartDate") && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.watch("plannedStartDate") ? (
                      format(form.watch("plannedStartDate")!, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={form.watch("plannedStartDate")}
                    onSelect={(date) => form.setValue("plannedStartDate", date as Date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {form.formState.errors.plannedStartDate && (
                <p className="text-xs text-red-500 mt-1">{form.formState.errors.plannedStartDate.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="plannedEndDate">Planned End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !form.watch("plannedEndDate") && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.watch("plannedEndDate") ? (
                      format(form.watch("plannedEndDate")!, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={form.watch("plannedEndDate")}
                    onSelect={(date) => form.setValue("plannedEndDate", date as Date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {form.formState.errors.plannedEndDate && (
                <p className="text-xs text-red-500 mt-1">{form.formState.errors.plannedEndDate.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              onValueChange={(value) => form.setValue("status", value as AuditStatus)}
              defaultValue={form.getValues("status")}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {AUDIT_STATUSES.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="auditorTeamIds">Assign Auditors</Label>
            <Select
              onValueChange={(value) => {
                const currentSelection = form.getValues("auditorTeamIds")
                if (currentSelection.includes(value)) {
                  form.setValue(
                    "auditorTeamIds",
                    currentSelection.filter((id) => id !== value),
                  )
                } else {
                  form.setValue("auditorTeamIds", [...currentSelection, value])
                }
              }}
            >
              <SelectTrigger id="auditorTeamIds">
                <SelectValue placeholder="Select auditors (multiple)" />
              </SelectTrigger>
              <SelectContent>
                {mockUsers
                  .filter((u) => u.role === "admin" || u.role === "editor")
                  .map(
                    (
                      user, // Assuming auditors are admin/editor
                    ) => (
                      <SelectItem
                        key={user.id}
                        value={user.id}
                        className={cn(form.getValues("auditorTeamIds").includes(user.id) && "bg-muted font-semibold")}
                      >
                        {user.name} ({user.role})
                      </SelectItem>
                    ),
                  )}
              </SelectContent>
            </Select>
            <div className="mt-2 text-sm text-muted-foreground">
              Selected:{" "}
              {form
                .watch("auditorTeamIds")
                ?.map((id) => mockUsers.find((u) => u.id === id)?.name)
                .join(", ") || "None"}
            </div>
            {form.formState.errors.auditorTeamIds && (
              <p className="text-xs text-red-500 mt-1">{form.formState.errors.auditorTeamIds.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="jpmc-gradient text-white" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Saving..." : auditToEdit ? "Save Changes" : "Create Audit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
