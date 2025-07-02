"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useToast } from "@/components/ui/use-toast"
import type { DocumentFile, DocumentType } from "@/components/document-uploader"

interface DocumentContextType {
  documents: DocumentFile[]
  uploadDocuments: (files: File[], documentType: DocumentType, entityId: string) => Promise<void>
  getDocumentsByEntity: (entityId: string) => DocumentFile[]
  getDocumentsByType: (documentType: DocumentType) => DocumentFile[]
  deleteDocument: (documentId: string) => Promise<void>
  verifyDocument: (documentId: string, status: "verified" | "rejected", comments?: string) => Promise<void>
  downloadDocument: (document: DocumentFile) => void
  isUploading: boolean
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined)

export function useDocuments() {
  const context = useContext(DocumentContext)
  if (!context) {
    throw new Error("useDocuments must be used within a DocumentProvider")
  }
  return context
}

interface DocumentProviderProps {
  children: ReactNode
}

export function DocumentProvider({ children }: DocumentProviderProps) {
  const [documents, setDocuments] = useState<DocumentFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  // Initialize with mock documents
  useEffect(() => {
    const mockDocuments: DocumentFile[] = [
      {
        id: "DOC001",
        name: "Pitch Deck v2.pdf",
        size: 2048000, // 2MB
        type: "application/pdf",
        documentType: "pitch-deck",
        status: "verified",
        uploadedAt: new Date("2024-01-15"),
        uploadedBy: "Rahul Sharma",
        url: "/placeholder-document.pdf",
        comments: "Excellent presentation with clear value proposition",
      },
      {
        id: "DOC002",
        name: "Financial Projections.xlsx",
        size: 1024000, // 1MB
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        documentType: "financials",
        status: "pending-review",
        uploadedAt: new Date("2024-01-16"),
        uploadedBy: "Rahul Sharma",
        url: "/placeholder-document.xlsx",
      },
      {
        id: "DOC003",
        name: "Team Bio.docx",
        size: 512000, // 512KB
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        documentType: "team-info",
        status: "uploaded",
        uploadedAt: new Date("2024-01-15"),
        uploadedBy: "Rahul Sharma",
        url: "/placeholder-document.docx",
      },
    ]
    setDocuments(mockDocuments)
  }, [])

  const uploadDocuments = async (files: File[], documentType: DocumentType, entityId: string) => {
    setIsUploading(true)
    try {
      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const newDocuments: DocumentFile[] = files.map((file) => ({
        id: `DOC${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        size: file.size,
        type: file.type,
        documentType,
        status: "uploaded",
        uploadedAt: new Date(),
        uploadedBy: "Current User", // In real app, get from auth context
        url: URL.createObjectURL(file), // In real app, this would be the server URL
      }))

      setDocuments((prev) => [...prev, ...newDocuments])

      toast({
        title: "Upload Successful",
        description: `${files.length} document(s) uploaded successfully`,
      })
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to upload documents. Please try again.",
        variant: "destructive",
      })
      throw error
    } finally {
      setIsUploading(false)
    }
  }

  const getDocumentsByEntity = (entityId: string) => {
    // In a real app, this would filter by entity ID
    // For now, return all documents as mock data
    return documents
  }

  const getDocumentsByType = (documentType: DocumentType) => {
    return documents.filter((doc) => doc.documentType === documentType)
  }

  const deleteDocument = async (documentId: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      setDocuments((prev) => prev.filter((doc) => doc.id !== documentId))

      toast({
        title: "Document Deleted",
        description: "Document has been successfully deleted",
      })
    } catch (error) {
      toast({
        title: "Delete Failed",
        description: "Failed to delete document. Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }

  const verifyDocument = async (documentId: string, status: "verified" | "rejected", comments?: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setDocuments((prev) =>
        prev.map((doc) =>
          doc.id === documentId
            ? {
                ...doc,
                status: status,
                comments: comments || doc.comments,
              }
            : doc,
        ),
      )

      toast({
        title: `Document ${status}`,
        description: `Document has been ${status} successfully`,
      })
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Failed to update document status. Please try again.",
        variant: "destructive",
      })
      throw error
    }
  }

  const downloadDocument = (document: DocumentFile) => {
    // Simulate download
    const link = document.createElement("a")
    link.href = document.url || "#"
    link.download = document.name
    link.click()

    toast({
      title: "Download Started",
      description: `Downloading ${document.name}...`,
    })
  }

  return (
    <DocumentContext.Provider
      value={{
        documents,
        uploadDocuments,
        getDocumentsByEntity,
        getDocumentsByType,
        deleteDocument,
        verifyDocument,
        downloadDocument,
        isUploading,
      }}
    >
      {children}
    </DocumentContext.Provider>
  )
}
