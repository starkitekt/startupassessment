"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import {
  format,
  addDays,
  isSameDay,
  isToday,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addWeeks,
  subWeeks,
  startOfMonth,
  endOfMonth,
  eachWeekOfInterval,
} from "date-fns"
import {
  CalendarIcon,
  Clock,
  Users,
  AlertTriangle,
  CheckCircle2,
  Plus,
  ChevronLeft,
  ChevronRight,
  Filter,
  ExternalLink,
  FolderSyncIcon as Sync,
} from "lucide-react"

// Types
interface CalendarEvent {
  id: string
  title: string
  description?: string
  startDate: Date
  endDate: Date
  type: "mentorship" | "deadline" | "meeting" | "milestone" | "assessment" | "funding"
  priority: "low" | "medium" | "high" | "urgent"
  status: "scheduled" | "completed" | "cancelled" | "overdue"
  participants?: string[]
  location?: string
  meetingLink?: string
  relatedEntity?: {
    type: "startup" | "mentor" | "task" | "document"
    id: string
    name: string
  }
}

interface CalendarView {
  type: "month" | "week" | "day" | "agenda"
  date: Date
}

// Mock data
const MOCK_EVENTS: CalendarEvent[] = [
  {
    id: "event1",
    title: "Mentorship Session with Ananya Sharma",
    description: "Discuss fundraising strategy and financial modeling",
    startDate: addDays(new Date(), 2),
    endDate: addDays(new Date(), 2),
    type: "mentorship",
    priority: "high",
    status: "scheduled",
    participants: ["mentor1", "startup1"],
    meetingLink: "https://meet.google.com/abc-defg-hij",
    relatedEntity: {
      type: "startup",
      id: "startup1",
      name: "FinSecure",
    },
  },
  {
    id: "event2",
    title: "Series A Pitch Deck Deadline",
    description: "Final submission deadline for Series A pitch deck",
    startDate: addDays(new Date(), 5),
    endDate: addDays(new Date(), 5),
    type: "deadline",
    priority: "urgent",
    status: "scheduled",
    relatedEntity: {
      type: "document",
      id: "doc1",
      name: "Series A Pitch Deck",
    },
  },
  {
    id: "event3",
    title: "Technical Assessment Review",
    description: "Review technical assessment results with the team",
    startDate: addDays(new Date(), 1),
    endDate: addDays(new Date(), 1),
    type: "assessment",
    priority: "medium",
    status: "scheduled",
    participants: ["assessor1", "startup2"],
    location: "Incubator Office, Meeting Room 2",
  },
  {
    id: "event4",
    title: "Q1 Milestone Review",
    description: "Quarterly milestone review and planning session",
    startDate: addDays(new Date(), 7),
    endDate: addDays(new Date(), 7),
    type: "milestone",
    priority: "high",
    status: "scheduled",
    participants: ["team1", "startup1", "startup2"],
  },
  {
    id: "event5",
    title: "Funding Committee Meeting",
    description: "Monthly funding committee meeting to review applications",
    startDate: addDays(new Date(), -2),
    endDate: addDays(new Date(), -2),
    type: "meeting",
    priority: "high",
    status: "completed",
    participants: ["committee1", "committee2", "committee3"],
  },
  {
    id: "event6",
    title: "Product Demo Preparation",
    description: "Prepare product demo for investor presentation",
    startDate: addDays(new Date(), 3),
    endDate: addDays(new Date(), 3),
    type: "milestone",
    priority: "medium",
    status: "scheduled",
    relatedEntity: {
      type: "startup",
      id: "startup2",
      name: "EduLearn",
    },
  },
]

// Helper functions
const getEventTypeColor = (type: CalendarEvent["type"]): string => {
  const colors = {
    mentorship: "bg-blue-500",
    deadline: "bg-red-500",
    meeting: "bg-green-500",
    milestone: "bg-purple-500",
    assessment: "bg-orange-500",
    funding: "bg-yellow-500",
  }
  return colors[type] || "bg-gray-500"
}

const getPriorityColor = (priority: CalendarEvent["priority"]): string => {
  const colors = {
    low: "border-gray-300",
    medium: "border-yellow-400",
    high: "border-orange-400",
    urgent: "border-red-500",
  }
  return colors[priority] || "border-gray-300"
}

const getStatusIcon = (status: CalendarEvent["status"]) => {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />
    case "cancelled":
      return <AlertTriangle className="h-4 w-4 text-red-500" />
    case "overdue":
      return <AlertTriangle className="h-4 w-4 text-orange-500" />
    default:
      return <Clock className="h-4 w-4 text-blue-500" />
  }
}

export function CalendarIntegration() {
  const [view, setView] = useState<CalendarView>({ type: "month", date: new Date() })
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [events, setEvents] = useState<CalendarEvent[]>(MOCK_EVENTS)
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([])
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const [isCreateEventOpen, setIsCreateEventOpen] = useState<boolean>(false)

  const { toast } = useToast()

  // Filter events based on selected criteria
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      if (selectedEventTypes.length > 0 && !selectedEventTypes.includes(event.type)) {
        return false
      }
      if (selectedPriorities.length > 0 && !selectedPriorities.includes(event.priority)) {
        return false
      }
      return true
    })
  }, [events, selectedEventTypes, selectedPriorities])

  // Get events for a specific date
  const getEventsForDate = (date: Date): CalendarEvent[] => {
    return filteredEvents.filter((event) => isSameDay(event.startDate, date))
  }

  // Get events for the current view period
  const getEventsForPeriod = (): CalendarEvent[] => {
    const { type, date } = view

    switch (type) {
      case "day":
        return getEventsForDate(date)
      case "week":
        const weekStart = startOfWeek(date)
        const weekEnd = endOfWeek(date)
        return filteredEvents.filter((event) => event.startDate >= weekStart && event.startDate <= weekEnd)
      case "month":
        const monthStart = startOfMonth(date)
        const monthEnd = endOfMonth(date)
        return filteredEvents.filter((event) => event.startDate >= monthStart && event.startDate <= monthEnd)
      case "agenda":
        return filteredEvents.filter((event) => event.startDate >= new Date())
      default:
        return filteredEvents
    }
  }

  // Navigation functions
  const navigatePrevious = () => {
    const { type, date } = view
    let newDate: Date

    switch (type) {
      case "day":
        newDate = addDays(date, -1)
        break
      case "week":
        newDate = subWeeks(date, 1)
        break
      case "month":
        newDate = addDays(date, -30)
        break
      default:
        newDate = date
    }

    setView({ ...view, date: newDate })
  }

  const navigateNext = () => {
    const { type, date } = view
    let newDate: Date

    switch (type) {
      case "day":
        newDate = addDays(date, 1)
        break
      case "week":
        newDate = addWeeks(date, 1)
        break
      case "month":
        newDate = addDays(date, 30)
        break
      default:
        newDate = date
    }

    setView({ ...view, date: newDate })
  }

  const navigateToday = () => {
    setView({ ...view, date: new Date() })
  }

  // Event management functions
  const handleCreateEvent = () => {
    // This would typically open a form to create a new event
    toast({
      title: "Create Event",
      description: "Event creation form would open here",
    })
    setIsCreateEventOpen(false)
  }

  const handleSyncCalendar = () => {
    toast({
      title: "Calendar Synced",
      description: "Calendar has been synchronized with external calendars",
    })
  }

  // Render different calendar views
  const renderMonthView = () => {
    const monthStart = startOfMonth(view.date)
    const monthEnd = endOfMonth(view.date)
    const weeks = eachWeekOfInterval({ start: monthStart, end: monthEnd })

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="p-2 text-center font-medium text-sm">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {weeks.map((weekStart) =>
            eachDayOfInterval({ start: weekStart, end: endOfWeek(weekStart) }).map((date) => {
              const dayEvents = getEventsForDate(date)
              const isCurrentMonth = date.getMonth() === view.date.getMonth()
              const isSelected = selectedDate && isSameDay(date, selectedDate)
              const isCurrentDay = isToday(date)

              return (
                <div
                  key={date.toISOString()}
                  className={`min-h-[120px] p-2 border rounded-md cursor-pointer transition-colors ${
                    !isCurrentMonth ? "bg-muted/50 text-muted-foreground" : ""
                  } ${isSelected ? "ring-2 ring-primary" : ""} ${isCurrentDay ? "bg-primary/10 border-primary" : ""}`}
                  onClick={() => setSelectedDate(date)}
                >
                  <div className={`text-sm font-medium mb-1 ${isCurrentDay ? "text-primary" : ""}`}>
                    {format(date, "d")}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 3).map((event) => (
                      <div
                        key={event.id}
                        className={`text-xs p-1 rounded truncate text-white ${getEventTypeColor(event.type)}`}
                        title={event.title}
                      >
                        {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="text-xs text-muted-foreground">+{dayEvents.length - 3} more</div>
                    )}
                  </div>
                </div>
              )
            }),
          )}
        </div>
      </div>
    )
  }

  const renderWeekView = () => {
    const weekStart = startOfWeek(view.date)
    const weekDays = eachDayOfInterval({ start: weekStart, end: endOfWeek(weekStart) })

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-8 gap-1">
          <div className="p-2"></div> {/* Empty cell for time column */}
          {weekDays.map((date) => (
            <div key={date.toISOString()} className="p-2 text-center">
              <div className="font-medium">{format(date, "EEE")}</div>
              <div className={`text-sm ${isToday(date) ? "text-primary font-bold" : ""}`}>{format(date, "d")}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-8 gap-1">
          {/* Time slots */}
          <div className="space-y-12">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="text-xs text-muted-foreground text-right pr-2">
                {String(9 + i).padStart(2, "0")}:00
              </div>
            ))}
          </div>

          {/* Day columns */}
          {weekDays.map((date) => {
            const dayEvents = getEventsForDate(date)

            return (
              <div key={date.toISOString()} className="space-y-1 min-h-[600px] border-l">
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`p-2 rounded text-xs text-white ${getEventTypeColor(event.type)} ${getPriorityColor(event.priority)} border-l-4`}
                  >
                    <div className="font-medium">{event.title}</div>
                    <div className="text-xs opacity-90">{format(event.startDate, "HH:mm")}</div>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const renderAgendaView = () => {
    const upcomingEvents = filteredEvents
      .filter((event) => event.startDate >= new Date())
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())

    return (
      <div className="space-y-4">
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event) => (
            <Card key={event.id} className={`border-l-4 ${getPriorityColor(event.priority)}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(event.status)}
                      <h3 className="font-semibold">{event.title}</h3>
                      <Badge variant="outline" className={`${getEventTypeColor(event.type)} text-white border-0`}>
                        {event.type}
                      </Badge>
                      <Badge variant="outline">{event.priority}</Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{format(event.startDate, "MMM d, yyyy")}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{format(event.startDate, "HH:mm")}</span>
                      </div>
                      {event.participants && (
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{event.participants.length} participants</span>
                        </div>
                      )}
                    </div>

                    {event.description && <p className="text-sm text-muted-foreground">{event.description}</p>}

                    {event.relatedEntity && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Related to:</span>
                        <Badge variant="secondary">{event.relatedEntity.name}</Badge>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {event.meetingLink && (
                      <Button size="sm" variant="outline">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Join
                      </Button>
                    )}
                    <Button size="sm">View Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No upcoming events</h3>
              <p className="text-muted-foreground mb-4">Your scheduled events will appear here</p>
              <Button onClick={() => setIsCreateEventOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Event
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Calendar</h1>
          <p className="text-muted-foreground">Manage your schedule and deadlines</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleSyncCalendar}>
            <Sync className="mr-2 h-4 w-4" />
            Sync
          </Button>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Dialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
            <DialogTrigger asChild>
              <Button className="jpmc-gradient">
                <Plus className="mr-2 h-4 w-4" />
                Create Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
                <DialogDescription>Add a new event to your calendar</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Event creation form would be implemented here with fields for title, description, date, time, type,
                  priority, etc.
                </p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateEventOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateEvent}>Create Event</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {showFilters && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Event Types</label>
                <div className="space-y-2">
                  {["mentorship", "deadline", "meeting", "milestone", "assessment", "funding"].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`type-${type}`}
                        checked={selectedEventTypes.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedEventTypes((prev) => [...prev, type])
                          } else {
                            setSelectedEventTypes((prev) => prev.filter((t) => t !== type))
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                      <label htmlFor={`type-${type}`} className="text-sm capitalize">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Priority Levels</label>
                <div className="space-y-2">
                  {["low", "medium", "high", "urgent"].map((priority) => (
                    <div key={priority} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`priority-${priority}`}
                        checked={selectedPriorities.includes(priority)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedPriorities((prev) => [...prev, priority])
                          } else {
                            setSelectedPriorities((prev) => prev.filter((p) => p !== priority))
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                      <label htmlFor={`priority-${priority}`} className="text-sm capitalize">
                        {priority}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={navigatePrevious}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={navigateToday}>
                  Today
                </Button>
                <Button variant="outline" size="sm" onClick={navigateNext}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <h2 className="text-xl font-semibold">
                {view.type === "month" && format(view.date, "MMMM yyyy")}
                {view.type === "week" && `Week of ${format(startOfWeek(view.date), "MMM d, yyyy")}`}
                {view.type === "day" && format(view.date, "MMMM d, yyyy")}
                {view.type === "agenda" && "Upcoming Events"}
              </h2>
            </div>

            <Tabs value={view.type} onValueChange={(value) => setView({ ...view, type: value as any })}>
              <TabsList>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="agenda">Agenda</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          {view.type === "month" && renderMonthView()}
          {view.type === "week" && renderWeekView()}
          {view.type === "agenda" && renderAgendaView()}
        </CardContent>
      </Card>

      {selectedDate && view.type === "month" && (
        <Card>
          <CardHeader>
            <CardTitle>Events for {format(selectedDate, "MMMM d, yyyy")}</CardTitle>
          </CardHeader>
          <CardContent>
            {getEventsForDate(selectedDate).length > 0 ? (
              <div className="space-y-3">
                {getEventsForDate(selectedDate).map((event) => (
                  <div key={event.id} className={`p-3 rounded-lg border-l-4 ${getPriorityColor(event.priority)}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {getStatusIcon(event.status)}
                          <h4 className="font-medium">{event.title}</h4>
                          <Badge variant="outline" className={`${getEventTypeColor(event.type)} text-white border-0`}>
                            {event.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {format(event.startDate, "HH:mm")} - {event.description}
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">No events scheduled for this date</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
