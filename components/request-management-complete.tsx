"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Search,
  Plus,
  Filter,
  Download,
  Package,
  Users,
  Receipt,
  TrendingUp,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  Building,
  Star,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useGlobalSettings } from "@/contexts/global-settings-context"

// Mock data for demonstration
const mockProcurementRequests = [
  {
    id: "PR001",
    title: "Office Supplies Q4",
    requester: "John Doe",
    department: "Operations",
    status: "pending_approval",
    priority: "medium",
    amount: 2500000, // 25 Lakh INR
    requestDate: "2024-01-15",
    expectedDelivery: "2024-02-01",
    vendor: "Office Mart Ltd",
    category: "Supplies",
  },
  {
    id: "PR002",
    title: "IT Equipment Upgrade",
    requester: "Sarah Wilson",
    department: "Technology",
    status: "approved",
    priority: "high",
    amount: 15000000, // 1.5 Cr INR
    requestDate: "2024-01-10",
    expectedDelivery: "2024-01-25",
    vendor: "Tech Solutions Inc",
    category: "Equipment",
  },
  {
    id: "PR003",
    title: "Marketing Materials",
    requester: "Mike Johnson",
    department: "Marketing",
    status: "in_progress",
    priority: "low",
    amount: 750000, // 7.5 Lakh INR
    requestDate: "2024-01-12",
    expectedDelivery: "2024-01-30",
    vendor: "Creative Print Co",
    category: "Marketing",
  },
]

const mockVendors = [
  {
    id: "V001",
    name: "Office Mart Ltd",
    category: "Office Supplies",
    rating: 4.5,
    totalOrders: 45,
    totalValue: 12500000, // 1.25 Cr INR
    status: "active",
    lastOrder: "2024-01-15",
    contactPerson: "Raj Patel",
    email: "raj@officemart.com",
    phone: "+91 98765 43210",
    address: "123 Business Park, Mumbai, MH 400001",
    certifications: ["ISO 9001", "GST Registered"],
    performanceScore: 85,
  },
  {
    id: "V002",
    name: "Tech Solutions Inc",
    category: "IT Equipment",
    rating: 4.8,
    totalOrders: 28,
    totalValue: 45000000, // 4.5 Cr INR
    status: "active",
    lastOrder: "2024-01-10",
    contactPerson: "Priya Sharma",
    email: "priya@techsolutions.com",
    phone: "+91 87654 32109",
    address: "456 Tech Hub, Bangalore, KA 560001",
    certifications: ["ISO 27001", "CMMI Level 3"],
    performanceScore: 92,
  },
  {
    id: "V003",
    name: "Creative Print Co",
    category: "Printing & Marketing",
    rating: 4.2,
    totalOrders: 32,
    totalValue: 8500000, // 85 Lakh INR
    status: "active",
    lastOrder: "2024-01-12",
    contactPerson: "Amit Kumar",
    email: "amit@creativeprint.com",
    phone: "+91 76543 21098",
    address: "789 Print Street, Delhi, DL 110001",
    certifications: ["FSC Certified", "Green Printing"],
    performanceScore: 78,
  },
]

const mockReceipts = [
  {
    id: "RC001",
    procurementId: "PR002",
    vendor: "Tech Solutions Inc",
    items: [
      { name: "Laptops", quantity: 10, unitPrice: 80000, condition: "good" },
      { name: "Monitors", quantity: 15, unitPrice: 25000, condition: "good" },
    ],
    totalAmount: 1175000, // 11.75 Lakh INR
    receivedDate: "2024-01-20",
    receivedBy: "IT Team",
    status: "verified",
    notes: "All items received in good condition",
  },
  {
    id: "RC002",
    procurementId: "PR003",
    vendor: "Creative Print Co",
    items: [
      { name: "Brochures", quantity: 1000, unitPrice: 50, condition: "good" },
      { name: "Business Cards", quantity: 500, unitPrice: 100, condition: "good" },
    ],
    totalAmount: 100000, // 1 Lakh INR
    receivedDate: "2024-01-18",
    receivedBy: "Marketing Team",
    status: "pending_verification",
    notes: "Partial delivery - remaining items expected next week",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending_approval":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "approved":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "in_progress":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "completed":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    case "rejected":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    case "active":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "verified":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "pending_verification":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    case "medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "low":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

export function RequestManagementComplete() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("overview")
  const { formatCurrency } = useGlobalSettings()

  // Calculate overview metrics
  const overviewMetrics = useMemo(() => {
    const totalRequests = mockProcurementRequests.length
    const pendingRequests = mockProcurementRequests.filter((r) => r.status === "pending_approval").length
    const totalSpend = mockProcurementRequests.reduce((sum, r) => sum + r.amount, 0)
    const activeVendors = mockVendors.filter((v) => v.status === "active").length

    return {
      totalRequests,
      pendingRequests,
      totalSpend,
      activeVendors,
    }
  }, [])

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewMetrics.totalRequests}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewMetrics.pendingRequests}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(overviewMetrics.totalSpend)}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Vendors</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewMetrics.activeVendors}</div>
            <p className="text-xs text-muted-foreground">+2 new this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Procurement Requests</CardTitle>
            <CardDescription>Latest procurement activities</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {mockProcurementRequests.slice(0, 5).map((request) => (
                  <div key={request.id} className="flex items-center space-x-4">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{request.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {request.requester} • {formatCurrency(request.amount)}
                      </p>
                    </div>
                    <Badge className={getStatusColor(request.status)}>{request.status.replace("_", " ")}</Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Vendors</CardTitle>
            <CardDescription>Highest performing vendors</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {mockVendors.slice(0, 5).map((vendor) => (
                  <div key={vendor.id} className="flex items-center space-x-4">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>{vendor.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{vendor.name}</p>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-muted-foreground ml-1">{vendor.rating}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{vendor.totalOrders} orders</span>
                      </div>
                    </div>
                    <div className="text-sm font-medium">{formatCurrency(vendor.totalValue)}</div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const ProcurementTab = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Procurement Requests</h2>
          <p className="text-muted-foreground">Manage and track procurement requests</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Request
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Request ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Requester</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Expected Delivery</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockProcurementRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.id}</TableCell>
                <TableCell>{request.title}</TableCell>
                <TableCell>{request.requester}</TableCell>
                <TableCell>{formatCurrency(request.amount)}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(request.status)}>{request.status.replace("_", " ")}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getPriorityColor(request.priority)}>{request.priority}</Badge>
                </TableCell>
                <TableCell>{request.expectedDelivery}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Request
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )

  const VendorTab = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Vendor Management</h2>
          <p className="text-muted-foreground">Manage vendor relationships and performance</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Vendor
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockVendors.map((vendor) => (
          <Card key={vendor.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarFallback>{vendor.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{vendor.name}</CardTitle>
                    <CardDescription>{vendor.category}</CardDescription>
                  </div>
                </div>
                <Badge className={getStatusColor(vendor.status)}>{vendor.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Rating</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-sm font-medium">{vendor.rating}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Orders</span>
                <span className="text-sm font-medium">{vendor.totalOrders}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Value</span>
                <span className="text-sm font-medium">{formatCurrency(vendor.totalValue)}</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Performance</span>
                  <span className="text-sm font-medium">{vendor.performanceScore}%</span>
                </div>
                <Progress value={vendor.performanceScore} className="h-2" />
              </div>

              <Separator />

              <div className="space-y-1">
                <p className="text-sm font-medium">Contact: {vendor.contactPerson}</p>
                <p className="text-xs text-muted-foreground">{vendor.email}</p>
                <p className="text-xs text-muted-foreground">{vendor.phone}</p>
              </div>

              <div className="flex flex-wrap gap-1">
                {vendor.certifications.map((cert) => (
                  <Badge key={cert} variant="secondary" className="text-xs">
                    {cert}
                  </Badge>
                ))}
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const ReceiptTab = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Receipt Management</h2>
          <p className="text-muted-foreground">Track and verify received items</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Record Receipt
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {mockReceipts.map((receipt) => (
          <Card key={receipt.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Receipt {receipt.id}</CardTitle>
                  <CardDescription>
                    Procurement: {receipt.procurementId} • Vendor: {receipt.vendor}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(receipt.status)}>{receipt.status.replace("_", " ")}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="text-sm font-medium mb-2">Receipt Details</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="text-muted-foreground">Received Date:</span> {receipt.receivedDate}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Received By:</span> {receipt.receivedBy}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Total Amount:</span> {formatCurrency(receipt.totalAmount)}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Items Received</h4>
                  <div className="space-y-2">
                    {receipt.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span>
                          {item.name} (x{item.quantity})
                        </span>
                        <div className="flex items-center space-x-2">
                          <span>{formatCurrency(item.unitPrice * item.quantity)}</span>
                          <Badge variant={item.condition === "good" ? "default" : "destructive"} className="text-xs">
                            {item.condition}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {receipt.notes && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Notes</h4>
                  <p className="text-sm text-muted-foreground">{receipt.notes}</p>
                </div>
              )}

              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Receipt
                </Button>
                {receipt.status === "pending_verification" && (
                  <Button size="sm">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Verify
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Request Management</h1>
          <p className="text-muted-foreground">Comprehensive procurement, vendor, and receipt management system</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="procurement" className="flex items-center space-x-2">
            <Package className="h-4 w-4" />
            <span>Procurement</span>
          </TabsTrigger>
          <TabsTrigger value="vendors" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Vendors</span>
          </TabsTrigger>
          <TabsTrigger value="receipts" className="flex items-center space-x-2">
            <Receipt className="h-4 w-4" />
            <span>Receipts</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="procurement">
          <ProcurementTab />
        </TabsContent>

        <TabsContent value="vendors">
          <VendorTab />
        </TabsContent>

        <TabsContent value="receipts">
          <ReceiptTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
