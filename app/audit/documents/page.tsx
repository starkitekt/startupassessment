"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StandardizedPageLayout } from "@/components/standardized-page-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Plus,
  Upload,
  Download,
  Search,
  Filter,
  FileText,
  Folder,
  Eye,
  Edit,
  Share,
  Archive,
  Clock,
  User,
} from "lucide-react"

const documentCategories = [
  {
    name: "Corporate Documents",
    count: 45,
    icon: FileText,
    description: "Board resolutions, MOA, AOA, and corporate filings",
  },
  {
    name: "Tax Documents",
    count: 78,
    icon: FileText,
    description: "GST returns, income tax filings, and tax certificates",
  },
  {
    name: "Labor Compliance",
    count: 32,
    icon: FileText,
    description: "EPF/ESI documents, employment contracts, and policies",
  },
  {
    name: "IP Documents",
    count: 23,
    icon: FileText,
    description: "Patent applications, trademark filings, and IP agreements",
  },
  {
    name: "Data Privacy",
    count: 18,
    icon: FileText,
    description: "Privacy policies, consent forms, and breach reports",
  },
  {
    name: "POSH Documents",
    count: 12,
    icon: FileText,
    description: "Policies, training materials, and incident reports",
  },
]

const recentDocuments = [
  {
    id: "DOC-2024-001",
    name: "Board Resolution - Q4 2023",
    category: "Corporate",
    type: "PDF",
    size: "2.4 MB",
    version: "v1.2",
    lastModified: "2024-01-12",
    modifiedBy: "Priya Sharma",
    status: "approved",
    tags: ["board", "resolution", "q4"],
  },
  {
    id: "DOC-2024-002",
    name: "GST Return GSTR-3B Dec 2023",
    category: "Taxation",
    type: "PDF",
    size: "1.8 MB",
    version: "v1.0",
    lastModified: "2024-01-10",
    modifiedBy: "Rajesh Kumar",
    status: "filed",
    tags: ["gst", "return", "december"],
  },
  {
    id: "DOC-2024-003",
    name: "Employment Contract - New Hire",
    category: "Labor",
    type: "DOCX",
    size: "156 KB",
    version: "v2.1",
    lastModified: "2024-01-08",
    modifiedBy: "Anita Desai",
    status: "draft",
    tags: ["contract", "employment", "template"],
  },
  {
    id: "DOC-2024-004",
    name: "Patent Application - AI Engine",
    category: "IP",
    type: "PDF",
    size: "3.2 MB",
    version: "v1.0",
    lastModified: "2024-01-05",
    modifiedBy: "Vikram Singh",
    status: "submitted",
    tags: ["patent", "ai", "application"],
  },
]

const documentVersions = [
  {
    version: "v1.2",
    date: "2024-01-12",
    author: "Priya Sharma",
    changes: "Updated financial figures and board member signatures",
    status: "current",
  },
  {
    version: "v1.1",
    date: "2024-01-10",
    author: "Priya Sharma",
    changes: "Added quarterly performance metrics",
    status: "archived",
  },
  {
    version: "v1.0",
    date: "2024-01-08",
    author: "Legal Team",
    changes: "Initial draft created",
    status: "archived",
  },
]

export default function DocumentManagementPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
      case "filed":
      case "current":
        return "bg-green-100 text-green-800"
      case "submitted":
        return "bg-blue-100 text-blue-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "archived":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <StandardizedPageLayout
      title="Document Management"
      description="Centralized repository and version control for compliance documents"
      actions={
        <>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Archive className="mr-2 h-4 w-4" />
            Archive
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Upload New Document</DialogTitle>
                <DialogDescription>Add a new document to the compliance repository</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Document Title</Label>
                  <Input placeholder="Enter document title" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="corporate">Corporate Documents</SelectItem>
                        <SelectItem value="taxation">Tax Documents</SelectItem>
                        <SelectItem value="labor">Labor Compliance</SelectItem>
                        <SelectItem value="ip">IP Documents</SelectItem>
                        <SelectItem value="privacy">Data Privacy</SelectItem>
                        <SelectItem value="posh">POSH Documents</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Document Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="policy">Policy</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="filing">Regulatory Filing</SelectItem>
                        <SelectItem value="report">Report</SelectItem>
                        <SelectItem value="certificate">Certificate</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Brief description of the document..." className="h-20" />
                </div>
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <Input placeholder="Enter tags separated by commas" />
                </div>
                <div className="space-y-2">
                  <Label>File Upload</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <Button variant="outline">Choose File</Button>
                      <p className="mt-2 text-sm text-gray-500">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">PDF, DOC, DOCX up to 10MB</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Upload Document</Button>
              </div>
            </DialogContent>
          </Dialog>
        </>
      }
    >
      <div className="space-y-6">
        {/* Search and Filter Bar */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search documents..." className="pl-10" />
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="corporate">Corporate</SelectItem>
                  <SelectItem value="taxation">Taxation</SelectItem>
                  <SelectItem value="labor">Labor</SelectItem>
                  <SelectItem value="ip">IP</SelectItem>
                  <SelectItem value="privacy">Privacy</SelectItem>
                  <SelectItem value="posh">POSH</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="filed">Filed</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="categories" className="space-y-6">
          <TabsList>
            <TabsTrigger value="categories">Document Categories</TabsTrigger>
            <TabsTrigger value="recent">Recent Documents</TabsTrigger>
            <TabsTrigger value="versions">Version Control</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="categories" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {documentCategories.map((category, index) => {
                const IconComponent = category.icon
                return (
                  <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-5 w-5 text-primary" />
                          <CardTitle className="text-lg">{category.name}</CardTitle>
                        </div>
                        <Badge variant="secondary">{category.count}</Badge>
                      </div>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Folder className="mr-2 h-4 w-4" />
                          Browse
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="recent" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Documents</CardTitle>
                <CardDescription>Recently modified and accessed documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentDocuments.map((doc) => (
                    <div key={doc.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground mt-1" />
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium">{doc.name}</h3>
                              <Badge variant="outline">{doc.category}</Badge>
                              <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>
                                {doc.type} • {doc.size}
                              </span>
                              <span>Version {doc.version}</span>
                              <span>Modified {doc.lastModified}</span>
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              {doc.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                          <Button size="sm" variant="outline">
                            <Share className="mr-2 h-4 w-4" />
                            Share
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <User className="h-3 w-3" />
                        <span>Last modified by {doc.modifiedBy}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="versions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Version Control</CardTitle>
                <CardDescription>Document version history and change tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <h3 className="font-medium">Board Resolution - Q4 2023</h3>
                      <p className="text-sm text-muted-foreground">Current document selected for version history</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {documentVersions.map((version, index) => (
                      <div key={index} className="flex items-start gap-4 p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{version.version}</span>
                              <Badge className={getStatusColor(version.status)}>{version.status}</Badge>
                            </div>
                            <span className="text-sm text-muted-foreground">{version.date}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{version.changes}</p>
                          <p className="text-xs text-muted-foreground">by {version.author}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Document Templates</CardTitle>
                <CardDescription>Pre-approved templates for common compliance documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Employment Contract</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Standard employment contract template with legal clauses
                    </p>
                    <Button size="sm" className="w-full">
                      Use Template
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Board Resolution</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Template for board meeting resolutions and decisions
                    </p>
                    <Button size="sm" className="w-full">
                      Use Template
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Privacy Policy</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">DPDPA compliant privacy policy template</p>
                    <Button size="sm" className="w-full">
                      Use Template
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">POSH Policy</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Prevention of Sexual Harassment policy template
                    </p>
                    <Button size="sm" className="w-full">
                      Use Template
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">NDA Template</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Non-disclosure agreement for employees and vendors
                    </p>
                    <Button size="sm" className="w-full">
                      Use Template
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Audit Report</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Standard audit report template with findings</p>
                    <Button size="sm" className="w-full">
                      Use Template
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </StandardizedPageLayout>
  )
}
