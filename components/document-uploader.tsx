"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Upload, File, FileText, ImageIcon, X, Download, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

export type DocumentType = "pitch-deck" | "financials" | "team-info" | "legal-docs" | "technical-docs" | "other"

export type DocumentStatus = "uploading" | "uploaded" | "verified" | "rejected" | "pending-review"

export interface DocumentFile {
  id: string
  name: string
  size: number
  type: string
  documentType: DocumentType
  status: DocumentStatus
  uploadedAt: Date
  uploadedBy: string
  url?: string
  comments?: string
}

interface DocumentUploaderProps {
  onUpload: (files: File[], documentType: DocumentType) => Promise<void>
  acceptedTypes?: string[]
  maxSize?: number
  multiple?: boolean
  documentType: DocumentType
  className?: string
}

export function DocumentUploader({
  onUpload,
  acceptedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ],
  maxSize = 10 * 1024 * 1024, // 10MB
  multiple = true,
  documentType,
  className,
}: DocumentUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const { toast } = useToast()

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return

      // Validate file sizes
      const oversizedFiles = acceptedFiles.filter((file) => file.size > maxSize)
      if (oversizedFiles.length > 0) {
        toast({
          title: "File Size Error",
          description: `Some files exceed the ${Math.round(maxSize / (1024 * 1024))}MB limit`,
          variant: "destructive",
        })
        return
      }

      setUploading(true)
      setUploadProgress(0)

      try {
        // Simulate upload progress
        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 90) {
              clearInterval(progressInterval)
              return 90
            }
            return prev + 10
          })
        }, 200)

        await onUpload(acceptedFiles, documentType)

        clearInterval(progressInterval)
        setUploadProgress(100)

        toast({
          title: "Upload Successful",
          description: `${acceptedFiles.length} file(s) uploaded successfully`,
        })
      } catch (error) {
        toast({
          title: "Upload Failed",
          description: "Failed to upload files. Please try again.",
          variant: "destructive",
        })
      } finally {
        setUploading(false)
        setTimeout(() => setUploadProgress(0), 1000)
      }
    },
    [onUpload, documentType, maxSize, toast],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    multiple,
    disabled: uploading,
  })

  const getFileIcon = (fileType: string) => {
    if (fileType.includes("pdf")) return <FileText className="h-8 w-8 text-red-500" />
    if (fileType.includes("image")) return <ImageIcon className="h-8 w-8 text-blue-500" />
    if (fileType.includes("sheet") || fileType.includes("excel")) return <File className="h-8 w-8 text-green-500" />
    return <File className="h-8 w-8 text-gray-500" />
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload {documentType.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
        </CardTitle>
        <CardDescription>
          Drag and drop files here or click to browse. Max size: {Math.round(maxSize / (1024 * 1024))}MB
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
            isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25",
            uploading && "pointer-events-none opacity-50",
          )}
        >
          <input {...getInputProps()} />

          {uploading ? (
            <div className="space-y-4">
              <div className="animate-pulse">
                <Upload className="h-12 w-12 mx-auto text-primary" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Uploading files...</p>
                <Progress value={uploadProgress} className="w-full max-w-xs mx-auto" />
                <p className="text-xs text-muted-foreground">{uploadProgress}% complete</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  {isDragActive ? "Drop files here" : "Click to upload or drag and drop"}
                </p>
                <p className="text-xs text-muted-foreground">Supported formats: PDF, JPG, PNG, Excel</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

interface DocumentListProps {
  documents: DocumentFile[]
  onView?: (document: DocumentFile) => void
  onDelete?: (documentId: string) => void
  onDownload?: (document: DocumentFile) => void
  onVerify?: (documentId: string, status: "verified" | "rejected", comments?: string) => void
  showActions?: boolean
  className?: string
}

export function DocumentList({
  documents,
  onView,
  onDelete,
  onDownload,
  onVerify,
  showActions = true,
  className,
}: DocumentListProps) {
  const getStatusColor = (status: DocumentStatus) => {
    switch (status) {
      case "uploaded":
        return "bg-blue-100 text-blue-700"
      case "verified":
        return "bg-green-100 text-green-700"
      case "rejected":
        return "bg-red-100 text-red-700"
      case "pending-review":
        return "bg-yellow-100 text-yellow-700"
      case "uploading":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.includes("pdf")) return <FileText className="h-5 w-5 text-red-500" />
    if (fileType.includes("image")) return <ImageIcon className="h-5 w-5 text-blue-500" />
    if (fileType.includes("sheet") || fileType.includes("excel")) return <File className="h-5 w-5 text-green-500" />
    return <File className="h-5 w-5 text-gray-500" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  if (documents.length === 0) {
    return (
      <Card className={className}>
        <CardContent className="p-8 text-center">
          <File className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-sm text-muted-foreground">No documents uploaded yet</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Documents ({documents.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {documents.map((document) => (
          <div
            key={document.id}
            className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              {getFileIcon(document.type)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{document.name}</p>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span>{formatFileSize(document.size)}</span>
                  <span>•</span>
                  <span>{document.uploadedAt.toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{document.uploadedBy}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Badge className={cn("text-xs", getStatusColor(document.status))}>
                {document.status.replace("-", " ")}
              </Badge>

              {showActions && (
                <div className="flex items-center space-x-1">
                  {onView && (
                    <Button variant="ghost" size="sm" onClick={() => onView(document)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
                  {onDownload && (
                    <Button variant="ghost" size="sm" onClick={() => onDownload(document)}>
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                  {onDelete && (
                    <Button variant="ghost" size="sm" onClick={() => onDelete(document.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
