"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Download, FileText, ImageIcon, File, Check, X } from "lucide-react"
import type { DocumentFile } from "./document-uploader"
import { cn } from "@/lib/utils"

interface DocumentPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  document: DocumentFile | null
  onVerify?: (documentId: string, status: "verified" | "rejected", comments?: string) => void
  onDownload?: (document: DocumentFile) => void
  canVerify?: boolean
}

export function DocumentPreviewModal({
  isOpen,
  onClose,
  document,
  onVerify,
  onDownload,
  canVerify = false,
}: DocumentPreviewModalProps) {
  const [verificationComments, setVerificationComments] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const { toast } = useToast()

  if (!document) return null

  const handleVerify = async (status: "verified" | "rejected") => {
    if (!onVerify) return

    setIsVerifying(true)
    try {
      await onVerify(document.id, status, verificationComments)
      toast({
        title: `Document ${status}`,
        description: `Document has been ${status} successfully`,
      })
      onClose()
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Failed to update document status",
        variant: "destructive",
      })
    } finally {
      setIsVerifying(false)
    }
  }

  const handleDownload = () => {
    if (onDownload) {
      onDownload(document)
    } else {
      // Fallback download simulation
      toast({
        title: "Download Started",
        description: `Downloading ${document.name}...`,
      })
    }
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.includes("pdf")) return <FileText className="h-8 w-8 text-red-500" />
    if (fileType.includes("image")) return <Image className="h-8 w-8 text-blue-500" />
    if (fileType.includes("sheet") || fileType.includes("excel")) return <File className="h-8 w-8 text-green-500" />
    return <File className="h-8 w-8 text-gray-500" />
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "uploaded":
        return "bg-blue-100 text-blue-700"
      case "verified":
        return "bg-green-100 text-green-700"
      case "rejected":
        return "bg-red-100 text-red-700"
      case "pending-review":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {getFileIcon(document.type)}
            <div className="flex-1 min-w-0">
              <p className="truncate">{document.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={cn("text-xs", getStatusColor(document.status))}>
                  {document.status.replace("-", " ")}
                </Badge>
                <span className="text-xs text-muted-foreground">{formatFileSize(document.size)}</span>
              </div>
            </div>
          </DialogTitle>
          <DialogDescription>
            Uploaded by {document.uploadedBy} on {document.uploadedAt.toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Document Preview Area */}
          <div className="border rounded-lg p-8 bg-muted/20 text-center">
            {document.type.includes("image") ? (
              <div className="space-y-4">
                <ImageIcon className="h-16 w-16 mx-auto text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Image preview would appear here</p>
                <p className="text-xs text-muted-foreground">
                  In a real implementation, this would show the actual image
                </p>
              </div>
            ) : document.type.includes("pdf") ? (
              <div className="space-y-4">
                <FileText className="h-16 w-16 mx-auto text-muted-foreground" />
                <p className="text-sm text-muted-foreground">PDF preview would appear here</p>
                <p className="text-xs text-muted-foreground">In a real implementation, this would show a PDF viewer</p>
              </div>
            ) : (
              <div className="space-y-4">
                <File className="h-16 w-16 mx-auto text-muted-foreground" />
                <p className="text-sm text-muted-foreground">File preview not available</p>
                <p className="text-xs text-muted-foreground">Download the file to view its contents</p>
              </div>
            )}
          </div>

          {/* Document Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <Label className="font-medium">Document Type</Label>
              <p className="text-muted-foreground capitalize">{document.documentType.replace("-", " ")}</p>
            </div>
            <div>
              <Label className="font-medium">File Type</Label>
              <p className="text-muted-foreground">{document.type}</p>
            </div>
            <div>
              <Label className="font-medium">Upload Date</Label>
              <p className="text-muted-foreground">{document.uploadedAt.toLocaleString()}</p>
            </div>
            <div>
              <Label className="font-medium">Uploaded By</Label>
              <p className="text-muted-foreground">{document.uploadedBy}</p>
            </div>
          </div>

          {/* Comments */}
          {document.comments && (
            <div>
              <Label className="font-medium">Comments</Label>
              <p className="text-sm text-muted-foreground mt-1 p-3 bg-muted rounded-md">{document.comments}</p>
            </div>
          )}

          {/* Verification Section */}
          {canVerify && document.status === "pending-review" && (
            <div className="space-y-4 border-t pt-4">
              <Label className="font-medium">Document Verification</Label>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="verification-comments" className="text-sm">
                    Comments (optional)
                  </Label>
                  <Textarea
                    id="verification-comments"
                    placeholder="Add any comments about this document..."
                    value={verificationComments}
                    onChange={(e) => setVerificationComments(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleVerify("verified")}
                    disabled={isVerifying}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Verify Document
                  </Button>
                  <Button onClick={() => handleVerify("rejected")} disabled={isVerifying} variant="destructive">
                    <X className="h-4 w-4 mr-2" />
                    Reject Document
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between items-center border-t pt-4">
            <Button variant="outline" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
