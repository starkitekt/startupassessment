"use client"

import { useState } from "react"
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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Star, MessageSquare } from "lucide-react"

interface ProvideMentorFeedbackModalProps {
  mentorName: string
  mentorId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProvideMentorFeedbackModal({
  mentorName,
  mentorId,
  open,
  onOpenChange,
}: ProvideMentorFeedbackModalProps) {
  const [rating, setRating] = useState<string>("")
  const [comments, setComments] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmitFeedback = async () => {
    if (!rating || !comments) {
      toast({ title: "Missing Fields", description: "Please provide a rating and comments.", variant: "destructive" })
      return
    }
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

    console.log("Feedback Submitted:", { mentorId, rating, comments })
    toast({
      title: "Feedback Submitted (Simulated)",
      description: `Thank you for your feedback on ${mentorName}.`,
    })
    setIsSubmitting(false)
    setRating("")
    setComments("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <MessageSquare className="mr-2 h-5 w-5 text-primary" /> Provide Feedback for {mentorName}
          </DialogTitle>
          <DialogDescription>
            Your feedback is valuable and helps us improve the mentorship program. It will be shared appropriately.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="feedback-rating" className="flex items-center">
              <Star className="mr-1 h-4 w-4 text-yellow-400" /> Overall Rating
            </Label>
            <Select value={rating} onValueChange={setRating}>
              <SelectTrigger id="feedback-rating">
                <SelectValue placeholder="Select a rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">⭐⭐⭐⭐⭐ (Excellent)</SelectItem>
                <SelectItem value="4">⭐⭐⭐⭐ (Good)</SelectItem>
                <SelectItem value="3">⭐⭐⭐ (Average)</SelectItem>
                <SelectItem value="2">⭐⭐ (Below Average)</SelectItem>
                <SelectItem value="1">⭐ (Poor)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="feedback-comments">Comments</Label>
            <Textarea
              id="feedback-comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Share your experience, suggestions, or any specific feedback..."
              className="min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmitFeedback} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
