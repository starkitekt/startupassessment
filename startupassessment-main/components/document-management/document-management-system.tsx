"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import {
  FileText,
  Upload,
  Download,
  Share2,
  Trash2,
  Eye,
  Edit,
  Search,
  FolderPlus,
  MoreHorizontal,
  Lock,
  Unlock,
  Star,
} from "lucide-react"
import { format } from "date-fns"

interface Document {
  id: string
  name: string
  type: "pdf" | "doc" | "xlsx" | "ppt" | "txt" | "image"
  size: number
  category: "contract" | "receipt" | "report" | "presentation" | "legal" | "financial"
  uploadedBy: string
  uploadedAt: Date
  lastModified: Date
  tags: string[]
  shared: boolean
  locked: boolean
  starred: boolean
  version: number
  description?: string
  relatedEntity?: {
    type: "startup" | "mentor" | "procurement" | "funding"
    id: string
    name: string
  }
}

interface Folder {
  id: string
  name: string
  parentId?: string
  documentCount: number
  createdAt: Date
  color: string
}

const MOCK_DOCUMENTS: Document[] = [
  {
    id: "1",
    name: "Series A Term Sheet - TechStart Inc.pdf",
    type: "pdf",
    size: 2048576,
    category: "contract",
    uploadedBy: "Sarah Chen",
    uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    lastModified: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    tags: ["funding", "series-a", "techstart"],
    shared: true,
    locked: false,
    starred: true,
    version: 2,
    description: "Term sheet for Series A funding round",
    relatedEntity: {
      type: "startup",
      id: "startup1",
      name: "TechStart Inc.",
    },
  },
  {
    id: "2",
    name: "Office Supplies Receipt - Q1 2024.pdf",
    type: "pdf",
    size: 512000,
    category: "receipt",
    uploadedBy: "Mike Johnson",
    uploadedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    lastModified: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    tags: ["procurement", "office-supplies", "q1-2024"],
    shared: false,
    locked: true,
    starred: false,
    version: 1,
    description: "Quarterly office supplies procurement receipt",
    relatedEntity: {
      type: "procurement",
      id: "proc1",
      name: "Office Supplies Q1",
    },
  },
  {
    id: "3",
    name: "Mentor Performance Report.xlsx",
    type: "xlsx",
    size: 1024000,
    category: "report",
    uploadedBy: "Emma Davis",
    uploadedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    lastModified: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    tags: ["mentorship", "performance", "analytics"],
    shared: true,
    locked: false,
    starred: false,
    version: 3,
    description: "Monthly mentor performance and engagement report",
  },
]

const MOCK_FOLDERS: Folder[] = [
  {
    id: "1",
    name: "Funding Documents",
    documentCount: 15,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    color: "bg-blue-500",
  },
  {
    id: "2",
    name: "Procurement Records",
    documentCount: 23,
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    color: "bg-green-500",
  },
  {
    id: "3",
    name: "Legal Contracts",
    documentCount: 8,
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
    color: "bg-purple-500",
  },
]

export function DocumentManagementSystem() {
  const [documents, setDocuments] = useState<Document[]>(MOCK_DOCUMENTS)
  const [folders, setFolders] = useState<Folder[]>(MOCK_FOLDERS)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")

  const { toast } = useToast()

  const getFileIcon = (type: Document["type"]) => {
    return <FileText className="h-5 w-5" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getCategoryColor = (category: Document["category"]) => {
    const colors = {
      contract: "bg-blue-500",
      receipt: "bg-green-500",
      report: "bg-purple-500",
      presentation: "bg-orange-500",
      legal: "bg-red-500",
      financial: "bg-yellow-500",
    }
    return colors[category] || "bg-gray-500"
  }

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleStar = (id: string) => {
    setDocuments((prev) => prev.map((doc) => (doc.id === id ? { ...doc, starred: !doc.starred } : doc)))
  }

  const toggleLock = (id: string) => {
    setDocuments((prev) => prev.map((doc) => (doc.id === id ? { ...doc, locked: !doc.locked } : doc)))
  }

  const deleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id))
    toast({
      title: "Document Deleted",
      description: "The document has been moved to trash",
    })
  }

  const shareDocument = (id: string) => {
    setDocuments((prev) => prev.map((doc) => (doc.id === id ? { ...doc, shared: !doc.shared } : doc)))

    const doc = documents.find((d) => d.id === id)
    toast({
      title: doc?.shared ? "Document Unshared" : "Document Shared",
      description: doc?.shared ? "Document is now private" : "Document is now shared",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Document Management</h1>
          <p className="text-muted-foreground">Organize and manage all your documents</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isCreateFolderOpen} onOpenChange={setIsCreateFolderOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FolderPlus className="mr-2 h-4 w-4" />
                New Folder
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Folder</DialogTitle>
                <DialogDescription>Create a new folder to organize your documents</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Folder Name</Label>
                  <Input placeholder="Enter folder name" />
                </div>
                <div className="space-y-2">
                  <Label>Color</Label>
                  <div className="flex gap-2">
                    {["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500", "bg-red-500"].map((color) => (
                      <div key={color} className={`w-8 h-8 rounded cursor-pointer ${color}`} />
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateFolderOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    toast({
                      title: "Folder Created",
                      description: "New folder has been created successfully",
                    })
                    setIsCreateFolderOpen(false)
                  }}
                >
                  Create Folder
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Document</DialogTitle>
                <DialogDescription>Upload a new document to the system</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-lg font-medium mb-2">Drop files here or click to browse</p>
                  <p className="text-sm text-muted-foreground">Supports PDF, DOC, XLSX, PPT, and images</p>
                  <Button variant="outline" className="mt-4">
                    Choose Files
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="receipt">Receipt</SelectItem>
                        <SelectItem value="report">Report</SelectItem>
                        <SelectItem value="presentation">Presentation</SelectItem>
                        <SelectItem value="legal">Legal</SelectItem>
                        <SelectItem value="financial">Financial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Folder</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select folder" />
                      </SelectTrigger>
                      <SelectContent>
                        {folders.map((folder) => (
                          <SelectItem key={folder.id} value={folder.id}>
                            {folder.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Tags (comma separated)</Label>
                  <Input placeholder="e.g., funding, contract, series-a" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsUploadOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    toast({
                      title: "Document Uploaded",
                      description: "Your document has been uploaded successfully",
                    })
                    setIsUploadOpen(false)
                  }}
                >
                  Upload
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="contract">Contracts</SelectItem>
            <SelectItem value="receipt">Receipts</SelectItem>
            <SelectItem value="report">Reports</SelectItem>
            <SelectItem value="presentation">Presentations</SelectItem>
            <SelectItem value="legal">Legal</SelectItem>
            <SelectItem value="financial">Financial</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="documents" className="space-y-4">
        <TabsList>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="folders">Folders</TabsTrigger>
          <TabsTrigger value="shared">Shared</TabsTrigger>
          <TabsTrigger value="starred">Starred</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-4">
          <div className="space-y-4">
            {filteredDocuments.map((document) => (
              <Card key={document.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex items-center gap-2">
                        {getFileIcon(document.type)}
                        {document.locked && <Lock className="h-4 w-4 text-yellow-500" />}
                        {document.shared && <Share2 className="h-4 w-4 text-blue-500" />}
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{document.name}</h3>
                          {document.starred && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                          <Badge
                            variant="outline"
                            className={`${getCategoryColor(document.category)} text-white border-0`}
                          >
                            {document.category}
                          </Badge>
                          <Badge variant="secondary">v{document.version}</Badge>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{formatFileSize(document.size)}</span>
                          <span>•</span>
                          <span>Uploaded by {document.uploadedBy}</span>
                          <span>•</span>
                          <span>{format(document.uploadedAt, "MMM d, yyyy")}</span>
                        </div>

                        {document.description && (
                          <p className="text-sm text-muted-foreground">{document.description}</p>
                        )}

                        <div className="flex items-center gap-1">
                          {document.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => toggleStar(document.id)}>
                            <Star className="mr-2 h-4 w-4" />
                            {document.starred ? "Unstar" : "Star"}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => shareDocument(document.id)}>
                            <Share2 className="mr-2 h-4 w-4" />
                            {document.shared ? "Unshare" : "Share"}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toggleLock(document.id)}>
                            {document.locked ? <Unlock className="mr-2 h-4 w-4" /> : <Lock className="mr-2 h-4 w-4" />}
                            {document.locked ? "Unlock" : "Lock"}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deleteDocument(document.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="folders" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {folders.map((folder) => (
              <Card key={folder.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-lg ${folder.color} flex items-center justify-center`}>
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{folder.name}</h3>
                      <p className="text-sm text-muted-foreground">{folder.documentCount} documents</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">Created {format(folder.createdAt, "MMM d, yyyy")}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="shared" className="space-y-4">
          <div className="space-y-4">
            {documents
              .filter((doc) => doc.shared)
              .map((document) => (
                <Card key={document.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Share2 className="h-5 w-5 text-blue-500" />
                        <div>
                          <h3 className="font-medium">{document.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Shared by {document.uploadedBy} • {format(document.uploadedAt, "MMM d, yyyy")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="starred" className="space-y-4">
          <div className="space-y-4">
            {documents
              .filter((doc) => doc.starred)
              .map((document) => (
                <Card key={document.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Star className="h-5 w-5 text-yellow-500 fill-current" />
                        <div>
                          <h3 className="font-medium">{document.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {formatFileSize(document.size)} • {format(document.uploadedAt, "MMM d, yyyy")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
