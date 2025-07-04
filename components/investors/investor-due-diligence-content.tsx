"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"
import { Plus, FileText, MessageSquare, CheckCircle, Clock, AlertCircle, Download, Upload } from "lucide-react"

const initialDeals = {
  pipeline: [
    {
      id: "1",
      company: "AI Robotics",
      sector: "AI/ML",
      stage: "Series A",
      amount: "₹25 Cr",
      valuation: "₹100 Cr",
      assignee: "Sarah Johnson",
      dueDate: "2024-01-15",
      score: 85,
      status: "In Review",
      description: "AI-powered robotics for manufacturing",
    },
    {
      id: "2",
      company: "GreenTech Solutions",
      sector: "CleanTech",
      stage: "Seed",
      amount: "₹8 Cr",
      valuation: "₹40 Cr",
      assignee: "Mike Chen",
      dueDate: "2024-01-20",
      score: 78,
      status: "Initial Review",
      description: "Renewable energy storage solutions",
    },
  ],
  "due-diligence": [
    {
      id: "3",
      company: "FinanceAI",
      sector: "FinTech",
      stage: "Series B",
      amount: "₹50 Cr",
      valuation: "₹200 Cr",
      assignee: "Alex Kumar",
      dueDate: "2024-01-25",
      score: 92,
      status: "Technical DD",
      description: "AI-driven financial advisory platform",
    },
  ],
  "investment-committee": [
    {
      id: "4",
      company: "HealthTech Pro",
      sector: "HealthTech",
      stage: "Series A",
      amount: "₹30 Cr",
      valuation: "₹120 Cr",
      assignee: "Lisa Wang",
      dueDate: "2024-01-30",
      score: 88,
      status: "IC Review",
      description: "Telemedicine platform for rural areas",
    },
  ],
  approved: [
    {
      id: "5",
      company: "EduTech Plus",
      sector: "EdTech",
      stage: "Series A",
      amount: "₹20 Cr",
      valuation: "₹80 Cr",
      assignee: "David Park",
      dueDate: "2024-02-05",
      score: 90,
      status: "Approved",
      description: "Personalized learning platform",
    },
  ],
}

const ddCriteria = [
  { category: "Market", weight: 25, score: 85, items: ["Market Size", "Competition", "Growth Rate"] },
  { category: "Team", weight: 20, score: 90, items: ["Experience", "Track Record", "Completeness"] },
  { category: "Product", weight: 20, score: 80, items: ["Innovation", "Scalability", "IP"] },
  { category: "Financials", weight: 15, score: 75, items: ["Revenue", "Unit Economics", "Projections"] },
  { category: "Technology", weight: 10, score: 88, items: ["Architecture", "Security", "Scalability"] },
  { category: "Legal", weight: 10, score: 92, items: ["Compliance", "Contracts", "IP Rights"] },
]

export function InvestorDueDiligenceContent() {
  const [deals, setDeals] = useState(initialDeals)
  const [selectedDeal, setSelectedDeal] = useState<any>(null)
  const [newDealOpen, setNewDealOpen] = useState(false)

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    const sourceColumn = deals[source.droppableId as keyof typeof deals]
    const destColumn = deals[destination.droppableId as keyof typeof deals]
    const draggedDeal = sourceColumn.find((deal) => deal.id === draggableId)

    if (!draggedDeal) return

    const newSourceColumn = sourceColumn.filter((deal) => deal.id !== draggableId)
    const newDestColumn = [...destColumn]
    newDestColumn.splice(destination.index, 0, draggedDeal)

    setDeals({
      ...deals,
      [source.droppableId]: newSourceColumn,
      [destination.droppableId]: newDestColumn,
    })
  }

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600 bg-green-100"
    if (score >= 70) return "text-yellow-600 bg-yellow-100"
    return "text-red-600 bg-red-100"
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "In Review":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-blue-600" />
    }
  }

  const columns = [
    { id: "pipeline", title: "Pipeline", color: "bg-gray-100" },
    { id: "due-diligence", title: "Due Diligence", color: "bg-blue-100" },
    { id: "investment-committee", title: "Investment Committee", color: "bg-yellow-100" },
    { id: "approved", title: "Approved", color: "bg-green-100" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Due Diligence</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage investment evaluation process</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={newDealOpen} onOpenChange={setNewDealOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Deal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Deal</DialogTitle>
                <DialogDescription>Create a new deal for evaluation</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Company Name" />
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Sector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fintech">FinTech</SelectItem>
                    <SelectItem value="healthtech">HealthTech</SelectItem>
                    <SelectItem value="edtech">EdTech</SelectItem>
                    <SelectItem value="ai">AI/ML</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Investment Amount" />
                <Textarea placeholder="Description" />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setNewDealOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setNewDealOpen(false)}>Create Deal</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Kanban Board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {columns.map((column) => (
            <div key={column.id} className="space-y-4">
              <div className={`p-3 rounded-lg ${column.color}`}>
                <h3 className="font-semibold text-center">{column.title}</h3>
                <p className="text-sm text-center text-gray-600">
                  {deals[column.id as keyof typeof deals].length} deals
                </p>
              </div>

              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-[400px] space-y-3 p-2 rounded-lg transition-colors ${
                      snapshot.isDraggingOver ? "bg-gray-50 dark:bg-gray-800" : ""
                    }`}
                  >
                    {deals[column.id as keyof typeof deals].map((deal, index) => (
                      <Draggable key={deal.id} draggableId={deal.id} index={index}>
                        {(provided, snapshot) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`cursor-pointer transition-shadow ${snapshot.isDragging ? "shadow-lg" : ""}`}
                            onClick={() => setSelectedDeal(deal)}
                          >
                            <CardContent className="p-4">
                              <div className="space-y-3">
                                <div className="flex items-start justify-between">
                                  <h4 className="font-semibold text-sm">{deal.company}</h4>
                                  <div
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(deal.score)}`}
                                  >
                                    {deal.score}
                                  </div>
                                </div>

                                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                                  {deal.description}
                                </p>

                                <div className="flex items-center justify-between text-xs">
                                  <Badge variant="secondary">{deal.sector}</Badge>
                                  <Badge variant="outline">{deal.stage}</Badge>
                                </div>

                                <div className="space-y-2">
                                  <div className="flex justify-between text-xs">
                                    <span className="text-gray-500">Amount:</span>
                                    <span className="font-medium">{deal.amount}</span>
                                  </div>
                                  <div className="flex justify-between text-xs">
                                    <span className="text-gray-500">Valuation:</span>
                                    <span className="font-medium">{deal.valuation}</span>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-1">
                                    {getStatusIcon(deal.status)}
                                    <span className="text-xs">{deal.status}</span>
                                  </div>
                                  <Avatar className="h-6 w-6">
                                    <AvatarFallback className="text-xs">
                                      {deal.assignee
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {/* Deal Detail Modal */}
      {selectedDeal && (
        <Dialog open={!!selectedDeal} onOpenChange={() => setSelectedDeal(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedDeal.company}
                <Badge variant="secondary">{selectedDeal.sector}</Badge>
              </DialogTitle>
              <DialogDescription>{selectedDeal.description}</DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="scoring">Scoring</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Investment Amount</p>
                    <p className="text-lg font-semibold">{selectedDeal.amount}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Valuation</p>
                    <p className="text-lg font-semibold">{selectedDeal.valuation}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Stage</p>
                    <Badge variant="outline">{selectedDeal.stage}</Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Overall Score</p>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(selectedDeal.score)}`}>
                      {selectedDeal.score}/100
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Assigned To</p>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {selectedDeal.assignee
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{selectedDeal.assignee}</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="scoring" className="space-y-4">
                <div className="space-y-4">
                  {ddCriteria.map((criteria) => (
                    <div key={criteria.category} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{criteria.category}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">Weight: {criteria.weight}%</span>
                          <div className={`px-2 py-1 rounded text-sm font-medium ${getScoreColor(criteria.score)}`}>
                            {criteria.score}
                          </div>
                        </div>
                      </div>
                      <Progress value={criteria.score} className="mb-2" />
                      <div className="flex flex-wrap gap-2">
                        {criteria.items.map((item) => (
                          <Badge key={item} variant="secondary" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="documents" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Documents</h4>
                  <Button size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
                <div className="space-y-2">
                  {["Pitch Deck", "Financial Statements", "Legal Documents", "Technical DD Report"].map((doc) => (
                    <div key={doc} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">{doc}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="activity" className="space-y-4">
                <div className="space-y-3">
                  {[
                    { action: "Initial review completed", user: "Sarah Johnson", time: "2 hours ago" },
                    { action: "Financial documents uploaded", user: "Mike Chen", time: "1 day ago" },
                    { action: "Technical DD started", user: "Alex Kumar", time: "2 days ago" },
                    { action: "Deal created", user: "Lisa Wang", time: "1 week ago" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 border rounded">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <MessageSquare className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-gray-500">
                          by {activity.user} • {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
