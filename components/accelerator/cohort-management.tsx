"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus, Edit, Eye, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useToast } from "@/components/ui/use-toast"

interface Cohort {
  id: string
  name: string
  program: string
  startDate: string
  endDate: string
  status: "Planning" | "Active" | "Completed" | "Paused"
  participantCount: number
  maxParticipants: number
  progress: number
  milestones: Milestone[]
  participants: Participant[]
}

interface Milestone {
  id: string
  name: string
  description: string
  dueDate: string
  status: "Pending" | "In Progress" | "Completed" | "Overdue"
  completionRate: number
}

interface Participant {
  id: string
  startupName: string
  founderName: string
  sector: string
  stage: string
  progress: number
  status: "Active" | "At Risk" | "Graduated" | "Dropped Out"
}

const mockCohorts: Cohort[] = [
  {
    id: "cohort-001",
    name: "FinTech Accelerator Q1 2025",
    program: "FinTech FastTrack",
    startDate: "2025-01-15",
    endDate: "2025-04-15",
    status: "Active",
    participantCount: 12,
    maxParticipants: 15,
    progress: 65,
    milestones: [
      {
        id: "m1",
        name: "MVP Development",
        description: "Complete minimum viable product",
        dueDate: "2025-02-15",
        status: "Completed",
        completionRate: 100,
      },
      {
        id: "m2",
        name: "Market Validation",
        description: "Validate product-market fit",
        dueDate: "2025-03-15",
        status: "In Progress",
        completionRate: 75,
      },
      {
        id: "m3",
        name: "Investor Pitch",
        description: "Prepare and deliver investor pitch",
        dueDate: "2025-04-10",
        status: "Pending",
        completionRate: 0,
      },
    ],
    participants: [
      {
        id: "p1",
        startupName: "PayFlow",
        founderName: "Sarah Chen",
        sector: "FinTech",
        stage: "Seed",
        progress: 80,
        status: "Active",
      },
      {
        id: "p2",
        startupName: "CryptoWallet Pro",
        founderName: "Mike Johnson",
        sector: "FinTech",
        stage: "Pre-Seed",
        progress: 45,
        status: "At Risk",
      },
    ],
  },
  {
    id: "cohort-002",
    name: "HealthTech Innovators Q4 2024",
    program: "HealthTech Accelerator",
    startDate: "2024-10-01",
    endDate: "2025-01-31",
    status: "Completed",
    participantCount: 10,
    maxParticipants: 12,
    progress: 100,
    milestones: [],
    participants: [],
  },
]

export function CohortManagement() {
  const [cohorts, setCohorts] = useState<Cohort[]>(mockCohorts)
  const [selectedCohort, setSelectedCohort] = useState<Cohort | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const { toast } = useToast()

  const filteredCohorts = useMemo(() => {
    return cohorts.filter((cohort) => {
      const matchesSearch =
        cohort.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cohort.program.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || cohort.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [cohorts, searchQuery, statusFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Completed":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "Planning":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "Paused":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getMilestoneIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "In Progress":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "Overdue":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const handleCreateCohort = () => {
    toast({
      title: "Cohort Created",
      description: "New cohort has been created successfully.",
    })
    setIsCreateDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cohort Management</h1>
          <p className="text-muted-foreground">Manage accelerator cohorts and track progress</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="jpmc-gradient">
              <Plus className="mr-2 h-4 w-4" />
              Create New Cohort
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Cohort</DialogTitle>
              <DialogDescription>Set up a new accelerator cohort with participants and milestones.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cohort-name" className="text-right">
                  Name
                </Label>
                <Input id="cohort-name" placeholder="Cohort name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="program" className="text-right">
                  Program
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select program" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fintech">FinTech FastTrack</SelectItem>
                    <SelectItem value="healthtech">HealthTech Innovators</SelectItem>
                    <SelectItem value="ai">AI Launchpad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Duration</Label>
                <div className="col-span-3 flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="flex-1">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        Start Date
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" />
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="flex-1">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        End Date
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="max-participants" className="text-right">
                  Max Participants
                </Label>
                <Input id="max-participants" type="number" placeholder="15" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea id="description" placeholder="Cohort description" className="col-span-3" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateCohort}>Create Cohort</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search cohorts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Planning">Planning</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Paused">Paused</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Cohorts Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCohorts.map((cohort) => (
          <Card
            key={cohort.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedCohort(cohort)}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{cohort.name}</CardTitle>
                  <CardDescription>{cohort.program}</CardDescription>
                </div>
                <Badge variant="outline" className={cn("text-xs", getStatusColor(cohort.status))}>
                  {cohort.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{cohort.progress}%</span>
              </div>
              <Progress value={cohort.progress} className="h-2" />

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Participants</p>
                  <p className="font-medium">
                    {cohort.participantCount}/{cohort.maxParticipants}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Duration</p>
                  <p className="font-medium">
                    {format(new Date(cohort.startDate), "MMM dd")} - {format(new Date(cohort.endDate), "MMM dd")}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-3 w-3" />
                  View Details
                </Button>
                <Button variant="ghost" size="sm">
                  <Edit className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cohort Details Dialog */}
      {selectedCohort && (
        <Dialog open={!!selectedCohort} onOpenChange={() => setSelectedCohort(null)}>
          <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedCohort.name}</DialogTitle>
              <DialogDescription>{selectedCohort.program}</DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="milestones">Milestones</TabsTrigger>
                <TabsTrigger value="participants">Participants</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Overall Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{selectedCohort.progress}%</div>
                      <Progress value={selectedCohort.progress} className="mt-2" />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Participants</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {selectedCohort.participantCount}/{selectedCohort.maxParticipants}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {selectedCohort.maxParticipants - selectedCohort.participantCount} spots available
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="milestones" className="space-y-4">
                <div className="space-y-3">
                  {selectedCohort.milestones.map((milestone) => (
                    <Card key={milestone.id}>
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            {getMilestoneIcon(milestone.status)}
                            <div>
                              <h4 className="font-medium">{milestone.name}</h4>
                              <p className="text-sm text-muted-foreground">{milestone.description}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Due: {format(new Date(milestone.dueDate), "MMM dd, yyyy")}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">{milestone.completionRate}%</div>
                            <Progress value={milestone.completionRate} className="w-20 h-1 mt-1" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="participants" className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Startup</TableHead>
                      <TableHead>Founder</TableHead>
                      <TableHead>Sector</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedCohort.participants.map((participant) => (
                      <TableRow key={participant.id}>
                        <TableCell className="font-medium">{participant.startupName}</TableCell>
                        <TableCell>{participant.founderName}</TableCell>
                        <TableCell>{participant.sector}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={participant.progress} className="w-16 h-2" />
                            <span className="text-xs">{participant.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={cn("text-xs", getStatusColor(participant.status))}>
                            {participant.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
