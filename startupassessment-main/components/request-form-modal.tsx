"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { useToast } from "@/components/ui/use-toast"
import { useUserRole, mockUsers } from "@/hooks/use-user-role"
import type { RequestItem, RequestPriority, RequestType } from "./requests-content"
import { cn } from "@/lib/utils"

interface RequestFormModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (newRequest: RequestItem, notifyByEmail: boolean) => void // Added notifyByEmail
  requestToEdit?: RequestItem | null
}

export function RequestFormModal({ isOpen, onOpenChange, onSubmit, requestToEdit }: RequestFormModalProps) {
  const { toast } = useToast()
  const { userId, userName, role } = useUserRole()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<RequestPriority>("Medium")
  const [type, setType] = useState<RequestType>("Task")
  const [assignedToId, setAssignedToId] = useState<string | undefined>()
  const [dueDate, setDueDate] = useState<Date | undefined>()
  const [notifyByEmail, setNotifyByEmail] = useState(false)

  useEffect(() => {
    if (requestToEdit) {
      setTitle(requestToEdit.title)
      setDescription(requestToEdit.description)
      setPriority(requestToEdit.priority)
      setType(requestToEdit.type)
      setAssignedToId(requestToEdit.assignedTo?.id)
      setDueDate(requestToEdit.dueDate ? new Date(requestToEdit.dueDate) : undefined)
      // Assuming notifyByEmail is not stored, so it defaults to false on edit
      setNotifyByEmail(false)
    } else {
      // Reset form for new request
      setTitle("")
      setDescription("")
      setPriority("Medium")
      setType("Task")
      setAssignedToId(undefined)
      setDueDate(undefined)
      setNotifyByEmail(false)
    }
  }, [requestToEdit, isOpen]) // Re-run effect when modal opens or requestToEdit changes

  const handleSubmit = () => {
    if (!title || !description) {
      toast({ title: "Missing Fields", description: "Title and description are required.", variant: "destructive" })
      return
    }

    const newOrUpdatedRequest: RequestItem = {
      id: requestToEdit?.id || `REQ-${Date.now()}`,
      title,
      description,
      priority,
      type,
      status: requestToEdit?.status || "Pending",
      submittedBy: requestToEdit?.submittedBy || { id: userId, name: userName },
      assignedTo: assignedToId ? mockUsers.find((u) => u.id === assignedToId) : undefined,
      createdAt: requestToEdit?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      dueDate: dueDate?.toISOString(),
      comments: requestToEdit?.comments || [],
    }

    onSubmit(newOrUpdatedRequest, notifyByEmail) // Pass notifyByEmail
    // Toast message handled in parent component after submission logic
    onOpenChange(false)
  }

  const canAssign = role === "admin"

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{requestToEdit ? "Edit Request" : "Create New Request"}</DialogTitle>
          <DialogDescription>
            {requestToEdit
              ? "Update the details of the existing request."
              : "Fill in the details to submit a new request."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="req-title">Title</Label>
            <Input
              id="req-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g., Review Q3 Financial Report"
            />
          </div>
          <div>
            <Label htmlFor="req-description">Description</Label>
            <Textarea
              id="req-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a detailed description of the request..."
              className="min-h-[100px]"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="req-priority">Priority</Label>
              <Select value={priority} onValueChange={(v) => setPriority(v as RequestPriority)}>
                <SelectTrigger id="req-priority">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="req-type">Type</Label>
              <Select value={type} onValueChange={(v) => setType(v as RequestType)}>
                <SelectTrigger id="req-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Feature">Feature Request</SelectItem>
                  <SelectItem value="Bug">Bug Report</SelectItem>
                  <SelectItem value="Task">Task</SelectItem>
                  <SelectItem value="Document Review">Document Review</SelectItem>
                  <SelectItem value="Access Request">Access Request</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="req-dueDate">Due Date (Optional)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !dueDate && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
          {canAssign && (
            <div>
              <Label htmlFor="req-assignTo">Assign To (Optional)</Label>
              <Select value={assignedToId} onValueChange={setAssignedToId}>
                <SelectTrigger id="req-assignTo">
                  <SelectValue placeholder="Select user to assign" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                  {mockUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name} ({user.role})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="flex items-center space-x-2 mt-2">
            <Checkbox
              id="req-notifyEmail"
              checked={notifyByEmail}
              onCheckedChange={(checked) => setNotifyByEmail(Boolean(checked))}
            />
            <Label
              htmlFor="req-notifyEmail"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Notify Assignee via Email (Simulated)
            </Label>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit}>{requestToEdit ? "Save Changes" : "Submit Request"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
