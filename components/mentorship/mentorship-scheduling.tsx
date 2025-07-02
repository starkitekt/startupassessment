"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
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
import { format, addDays, isSameDay, parseISO, isAfter, isBefore } from "date-fns"
import {
  CalendarIcon,
  Clock,
  Video,
  Users,
  MapPin,
  MessageSquare,
  CheckCircle,
  X,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react"

// Types
interface MentorshipSession {
  id: string
  mentorId: string
  startupId: string
  title: string
  description?: string
  date: Date
  startTime: string
  endTime: string
  status: "scheduled" | "completed" | "cancelled" | "pending"
  type: "video" | "in-person" | "phone"
  location?: string
  meetingLink?: string
  notes?: string
  feedback?: {
    rating?: number
    comment?: string
  }
}

interface Mentor {
  id: string
  name: string
  avatarUrl: string
  expertise: string[]
  availability: {
    timeSlots: {
      day: string
      slots: string[]
    }[]
  }
}

interface Startup {
  id: string
  name: string
  founderName: string
  founderAvatarUrl: string
}

// Mock data
const MOCK_MENTORS = [
  {
    id: "mentor1",
    name: "Ananya Sharma",
    avatarUrl: "/placeholder.svg?height=150&width=150&text=AS",
    expertise: ["Fundraising Strategy", "Go-to-Market Strategy", "Financial Modeling", "Growth Hacking"],
    availability: {
      timeSlots: [
        { day: "Monday", slots: ["10:00", "11:00", "15:00"] },
        { day: "Wednesday", slots: ["14:00", "15:00", "16:00"] },
        { day: "Friday", slots: ["11:00", "12:00"] },
      ],
    },
  },
  {
    id: "mentor2",
    name: "Vikram Singh",
    avatarUrl: "/placeholder.svg?height=150&width=150&text=VS",
    expertise: ["Technical Architecture", "Product-Market Fit", "Agile Development", "Team Building"],
    availability: {
      timeSlots: [
        { day: "Tuesday", slots: ["09:00", "10:00"] },
        { day: "Thursday", slots: ["16:00", "17:00", "18:00"] },
      ],
    },
  },
]

const MOCK_STARTUPS = [
  {
    id: "startup1",
    name: "FinSecure",
    founderName: "Arjun Reddy",
    founderAvatarUrl: "/placeholder.svg?height=150&width=150&text=AR",
  },
  {
    id: "startup2",
    name: "EduLearn",
    founderName: "Meera Shah",
    founderAvatarUrl: "/placeholder.svg?height=150&width=150&text=MS",
  },
]

const MOCK_SESSIONS: MentorshipSession[] = [
  {
    id: "session1",
    mentorId: "mentor1",
    startupId: "startup1",
    title: "Initial Strategy Discussion",
    description: "Discuss fundraising strategy and financial modeling for Series A",
    date: addDays(new Date(), 2),
    startTime: "10:00",
    endTime: "11:00",
    status: "scheduled",
    type: "video",
    meetingLink: "https://meet.google.com/abc-defg-hij",
  },
  {
    id: "session2",
    mentorId: "mentor2",
    startupId: "startup1",
    title: "Technical Architecture Review",
    description: "Review current architecture and discuss scalability improvements",
    date: addDays(new Date(), -3),
    startTime: "14:00",
    endTime: "15:00",
    status: "completed",
    type: "video",
    meetingLink: "https://meet.google.com/xyz-abcd-efg",
    feedback: {
      rating: 4.5,
      comment: "Very helpful session. Got great insights on improving our architecture.",
    },
  },
  {
    id: "session3",
    mentorId: "mentor1",
    startupId: "startup2",
    title: "Go-to-Market Strategy",
    description: "Develop a comprehensive GTM strategy for the EdTech market",
    date: addDays(new Date(), 5),
    startTime: "15:00",
    endTime: "16:00",
    status: "scheduled",
    type: "in-person",
    location: "Incubator Office, Meeting Room 3",
  },
]

// Helper functions
const getDayName = (date: Date): string => {
  return format(date, "EEEE")
}

const getAvailableTimeSlots = (mentor: Mentor, date: Date): string[] => {
  const dayName = getDayName(date)
  const daySlot = mentor.availability.timeSlots.find((slot) => slot.day === dayName)
  return daySlot ? daySlot.slots : []
}

const getMentorById = (id: string): Mentor | undefined => {
  return MOCK_MENTORS.find((mentor) => mentor.id === id)
}

const getStartupById = (id: string): Startup | undefined => {
  return MOCK_STARTUPS.find((startup) => startup.id === id)
}

export function MentorshipScheduling() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedMentor, setSelectedMentor] = useState<string>("")
  const [selectedStartup, setSelectedStartup] = useState<string>("")
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("")
  const [sessionType, setSessionType] = useState<"video" | "in-person" | "phone">("video")
  const [sessionTitle, setSessionTitle] = useState<string>("")
  const [sessionDescription, setSessionDescription] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [sessions, setSessions] = useState<MentorshipSession[]>(MOCK_SESSIONS)
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState<boolean>(false)
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar")
  const [calendarDate, setCalendarDate] = useState<Date>(new Date())

  const { toast } = useToast()

  // Get available time slots for selected mentor and date
  const availableTimeSlots =
    selectedMentor && selectedDate ? getAvailableTimeSlots(getMentorById(selectedMentor)!, selectedDate) : []

  // Filter sessions by date for calendar view
  const sessionsForSelectedDate = sessions.filter((session) => selectedDate && isSameDay(session.date, selectedDate))

  // Group sessions by date for list view
  const groupedSessions = sessions.reduce<Record<string, MentorshipSession[]>>((acc, session) => {
    const dateKey = format(session.date, "yyyy-MM-dd")
    if (!acc[dateKey]) {
      acc[dateKey] = []
    }
    acc[dateKey].push(session)
    return acc
  }, {})

  // Sort dates for list view
  const sortedDates = Object.keys(groupedSessions).sort((a, b) => {
    return parseISO(a).getTime() - parseISO(b).getTime()
  })

  // Filter upcoming and past sessions
  const upcomingSessions = sessions.filter(
    (session) =>
      isAfter(session.date, new Date()) ||
      (isSameDay(session.date, new Date()) && session.startTime > format(new Date(), "HH:mm")),
  )

  const pastSessions = sessions.filter(
    (session) =>
      isBefore(session.date, new Date()) ||
      (isSameDay(session.date, new Date()) && session.startTime <= format(new Date(), "HH:mm")),
  )

  // Handle session scheduling
  const handleScheduleSession = () => {
    if (!selectedMentor || !selectedStartup || !selectedDate || !selectedTimeSlot || !sessionTitle) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    // Calculate end time (assuming 1 hour sessions)
    const [hours, minutes] = selectedTimeSlot.split(":").map(Number)
    const endTime = `${String(hours + 1).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`

    const newSession: MentorshipSession = {
      id: `session${Date.now()}`,
      mentorId: selectedMentor,
      startupId: selectedStartup,
      title: sessionTitle,
      description: sessionDescription,
      date: selectedDate,
      startTime: selectedTimeSlot,
      endTime,
      status: "scheduled",
      type: sessionType,
      location: sessionType === "in-person" ? location : undefined,
      meetingLink: sessionType === "video" ? "https://meet.google.com/generated-link" : undefined,
    }

    setSessions((prev) => [...prev, newSession])
    setIsScheduleDialogOpen(false)

    // Reset form
    setSessionTitle("")
    setSessionDescription("")
    setSelectedTimeSlot("")
    setLocation("")

    toast({
      title: "Session Scheduled",
      description: `Mentorship session with ${getMentorById(selectedMentor)?.name} scheduled successfully`,
    })
  }

  // Handle session cancellation
  const handleCancelSession = (sessionId: string) => {
    setSessions((prev) =>
      prev.map((session) => (session.id === sessionId ? { ...session, status: "cancelled" } : session)),
    )

    toast({
      title: "Session Cancelled",
      description: "The mentorship session has been cancelled",
    })
  }

  // Handle session completion
  const handleCompleteSession = (sessionId: string) => {
    setSessions((prev) =>
      prev.map((session) => (session.id === sessionId ? { ...session, status: "completed" } : session)),
    )

    toast({
      title: "Session Completed",
      description: "The mentorship session has been marked as completed",
    })
  }

  // Handle feedback submission
  const handleSubmitFeedback = (sessionId: string, rating: number, comment: string) => {
    setSessions((prev) =>
      prev.map((session) => (session.id === sessionId ? { ...session, feedback: { rating, comment } } : session)),
    )

    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback on the mentorship session",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Mentorship Sessions</h1>
          <p className="text-muted-foreground">Schedule and manage your mentorship sessions</p>
        </div>
        <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
          <DialogTrigger asChild>
            <Button className="jpmc-gradient">
              <Plus className="mr-2 h-4 w-4" />
              Schedule New Session
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Schedule Mentorship Session</DialogTitle>
              <DialogDescription>Book a session with a mentor to get guidance for your startup</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="mentor">Select Mentor</Label>
                  <Select value={selectedMentor} onValueChange={setSelectedMentor}>
                    <SelectTrigger id="mentor">
                      <SelectValue placeholder="Choose a mentor" />
                    </SelectTrigger>
                    <SelectContent>
                      {MOCK_MENTORS.map((mentor) => (
                        <SelectItem key={mentor.id} value={mentor.id}>
                          {mentor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="startup">Select Startup</Label>
                  <Select value={selectedStartup} onValueChange={setSelectedStartup}>
                    <SelectTrigger id="startup">
                      <SelectValue placeholder="Choose your startup" />
                    </SelectTrigger>
                    <SelectContent>
                      {MOCK_STARTUPS.map((startup) => (
                        <SelectItem key={startup.id} value={startup.id}>
                          {startup.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedMentor && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Select Date</Label>
                    <div className="mt-2 border rounded-md">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => {
                          const dayName = format(date, "EEEE")
                          const mentor = getMentorById(selectedMentor)
                          if (!mentor) return true

                          // Check if mentor is available on this day
                          const hasAvailability = mentor.availability.timeSlots.some((slot) => slot.day === dayName)

                          // Disable past dates and dates without availability
                          return isBefore(date, new Date()) || !hasAvailability
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Available Time Slots</Label>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {availableTimeSlots.length > 0 ? (
                        availableTimeSlots.map((timeSlot) => (
                          <Button
                            key={timeSlot}
                            variant={selectedTimeSlot === timeSlot ? "default" : "outline"}
                            className="justify-center"
                            onClick={() => setSelectedTimeSlot(timeSlot)}
                          >
                            {timeSlot}
                          </Button>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground col-span-2">
                          {selectedDate
                            ? "No available time slots for this date"
                            : "Please select a date to see available time slots"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="session-title">Session Title</Label>
                <input
                  id="session-title"
                  value={sessionTitle}
                  onChange={(e) => setSessionTitle(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="e.g., Fundraising Strategy Discussion"
                />
              </div>

              <div>
                <Label htmlFor="session-description">Description (Optional)</Label>
                <Textarea
                  id="session-description"
                  value={sessionDescription}
                  onChange={(e) => setSessionDescription(e.target.value)}
                  placeholder="Describe what you'd like to discuss in this session"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="session-type">Session Type</Label>
                <Select
                  value={sessionType}
                  onValueChange={(value: "video" | "in-person" | "phone") => setSessionType(value)}
                >
                  <SelectTrigger id="session-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video Call</SelectItem>
                    <SelectItem value="in-person">In-Person Meeting</SelectItem>
                    <SelectItem value="phone">Phone Call</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {sessionType === "in-person" && (
                <div>
                  <Label htmlFor="location">Meeting Location</Label>
                  <input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="e.g., Incubator Office, Meeting Room 2"
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsScheduleDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleScheduleSession}>Schedule Session</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
          <TabsTrigger value="past">Past Sessions</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>View Options</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === "calendar" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("calendar")}
                  >
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Calendar
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    List
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {viewMode === "calendar" ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Button variant="outline" size="sm" onClick={() => setCalendarDate(addDays(calendarDate, -7))}>
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous Week
                    </Button>
                    <h3 className="font-medium">
                      {format(calendarDate, "MMMM d, yyyy")} - {format(addDays(calendarDate, 6), "MMMM d, yyyy")}
                    </h3>
                    <Button variant="outline" size="sm" onClick={() => setCalendarDate(addDays(calendarDate, 7))}>
                      Next Week
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 7 }).map((_, i) => {
                      const date = addDays(calendarDate, i)
                      const dayName = format(date, "EEE")
                      const dayNumber = format(date, "d")
                      const isToday = isSameDay(date, new Date())
                      const sessionsForDay = sessions.filter((session) => isSameDay(session.date, date))

                      return (
                        <div
                          key={i}
                          className={`border rounded-md p-2 min-h-[150px] ${
                            isToday ? "bg-primary/10 border-primary" : ""
                          } ${selectedDate && isSameDay(date, selectedDate) ? "ring-2 ring-primary" : ""}`}
                          onClick={() => setSelectedDate(date)}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">{dayName}</span>
                            <span
                              className={`h-6 w-6 rounded-full flex items-center justify-center text-sm ${
                                isToday ? "bg-primary text-primary-foreground" : ""
                              }`}
                            >
                              {dayNumber}
                            </span>
                          </div>
                          <div className="space-y-1">
                            {sessionsForDay.length > 0 ? (
                              sessionsForDay.map((session) => (
                                <div
                                  key={session.id}
                                  className={`text-xs p-1 rounded truncate ${
                                    session.status === "cancelled"
                                      ? "bg-red-100 text-red-800 line-through"
                                      : "bg-blue-100 text-blue-800"
                                  }`}
                                >
                                  {session.startTime} - {session.title}
                                </div>
                              ))
                            ) : (
                              <div className="text-xs text-muted-foreground">No sessions</div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {selectedDate && (
                    <Card className="mt-4">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Sessions for {format(selectedDate, "MMMM d, yyyy")}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {sessionsForSelectedDate.length > 0 ? (
                          <div className="space-y-4">
                            {sessionsForSelectedDate.map((session) => {
                              const mentor = getMentorById(session.mentorId)
                              const startup = getStartupById(session.startupId)

                              return (
                                <div
                                  key={session.id}
                                  className="flex items-center justify-between p-4 border rounded-lg"
                                >
                                  <div className="flex items-center gap-4">
                                    <Avatar className="h-10 w-10">
                                      <AvatarImage src={mentor?.avatarUrl || "/placeholder.svg"} alt={mentor?.name} />
                                      <AvatarFallback>
                                        {mentor?.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <h4 className="font-medium">{session.title}</h4>
                                      <p className="text-sm text-muted-foreground">
                                        {session.startTime} - {session.endTime} with {mentor?.name}
                                      </p>
                                      <div className="flex items-center gap-2 mt-1">
                                        <Badge variant={session.status === "cancelled" ? "destructive" : "default"}>
                                          {session.status}
                                        </Badge>
                                        {session.type === "video" && (
                                          <Video className="h-4 w-4 text-muted-foreground" />
                                        )}
                                        {session.type === "in-person" && (
                                          <MapPin className="h-4 w-4 text-muted-foreground" />
                                        )}
                                        {session.type === "phone" && (
                                          <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {session.status === "scheduled" && (
                                      <>
                                        <Button size="sm" variant="outline">
                                          Join
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="destructive"
                                          onClick={() => handleCancelSession(session.id)}
                                        >
                                          <X className="h-4 w-4" />
                                        </Button>
                                      </>
                                    )}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        ) : (
                          <p className="text-muted-foreground text-center py-8">No sessions scheduled for this date</p>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingSessions.length > 0 ? (
                    upcomingSessions.map((session) => {
                      const mentor = getMentorById(session.mentorId)
                      const startup = getStartupById(session.startupId)

                      return (
                        <Card key={session.id}>
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-4">
                                <Avatar className="h-12 w-12">
                                  <AvatarImage src={mentor?.avatarUrl || "/placeholder.svg"} alt={mentor?.name} />
                                  <AvatarFallback>
                                    {mentor?.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="space-y-1">
                                  <h3 className="font-semibold">{session.title}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    with {mentor?.name} for {startup?.name}
                                  </p>
                                  <div className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-1">
                                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                      <span>{format(session.date, "MMM d, yyyy")}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-4 w-4 text-muted-foreground" />
                                      <span>
                                        {session.startTime} - {session.endTime}
                                      </span>
                                    </div>
                                    <Badge variant={session.status === "cancelled" ? "destructive" : "default"}>
                                      {session.status}
                                    </Badge>
                                  </div>
                                  {session.description && (
                                    <p className="text-sm text-muted-foreground mt-2">{session.description}</p>
                                  )}
                                  <div className="flex items-center gap-2 mt-2">
                                    {session.type === "video" && (
                                      <div className="flex items-center gap-1 text-sm">
                                        <Video className="h-4 w-4 text-muted-foreground" />
                                        <span>Video Call</span>
                                      </div>
                                    )}
                                    {session.type === "in-person" && (
                                      <div className="flex items-center gap-1 text-sm">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        <span>{session.location}</span>
                                      </div>
                                    )}
                                    {session.type === "phone" && (
                                      <div className="flex items-center gap-1 text-sm">
                                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                        <span>Phone Call</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {session.status === "scheduled" && (
                                  <>
                                    <Button size="sm">{session.type === "video" ? "Join Call" : "View Details"}</Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleCompleteSession(session.id)}
                                    >
                                      <CheckCircle className="h-4 w-4 mr-1" />
                                      Complete
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      onClick={() => handleCancelSession(session.id)}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })
                  ) : (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No upcoming sessions</h3>
                        <p className="text-muted-foreground mb-4">Schedule a mentorship session to get started</p>
                        <Button onClick={() => setIsScheduleDialogOpen(true)}>Schedule New Session</Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="past" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Past Sessions</CardTitle>
              <CardDescription>Review your completed mentorship sessions</CardDescription>
            </CardHeader>
            <CardContent>
              {pastSessions.length > 0 ? (
                <div className="space-y-4">
                  {pastSessions.map((session) => {
                    const mentor = getMentorById(session.mentorId)
                    const startup = getStartupById(session.startupId)

                    return (
                      <Card key={session.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={mentor?.avatarUrl || "/placeholder.svg"} alt={mentor?.name} />
                                <AvatarFallback>
                                  {mentor?.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="space-y-1">
                                <h3 className="font-semibold">{session.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                  with {mentor?.name} for {startup?.name}
                                </p>
                                <div className="flex items-center gap-4 text-sm">
                                  <div className="flex items-center gap-1">
                                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                    <span>{format(session.date, "MMM d, yyyy")}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span>
                                      {session.startTime} - {session.endTime}
                                    </span>
                                  </div>
                                  <Badge variant={session.status === "completed" ? "default" : "destructive"}>
                                    {session.status}
                                  </Badge>
                                </div>
                                {session.feedback && (
                                  <div className="mt-2 p-3 bg-muted rounded-md">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="text-sm font-medium">Your Feedback:</span>
                                      <div className="flex items-center gap-1">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                          <span
                                            key={i}
                                            className={`text-sm ${
                                              i < Math.floor(session.feedback!.rating!)
                                                ? "text-yellow-500"
                                                : "text-gray-300"
                                            }`}
                                          >
                                            ★
                                          </span>
                                        ))}
                                        <span className="text-sm ml-1">{session.feedback.rating}/5</span>
                                      </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{session.feedback.comment}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {session.status === "completed" && !session.feedback && (
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button size="sm" variant="outline">
                                      <MessageSquare className="h-4 w-4 mr-1" />
                                      Add Feedback
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Session Feedback</DialogTitle>
                                      <DialogDescription>
                                        Share your feedback about this mentorship session
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <div>
                                        <Label>Rating</Label>
                                        <div className="flex items-center gap-1 mt-1">
                                          {Array.from({ length: 5 }).map((_, i) => (
                                            <button
                                              key={i}
                                              className="text-2xl text-gray-300 hover:text-yellow-500"
                                              onClick={() => {
                                                /* Handle rating */
                                              }}
                                            >
                                              ★
                                            </button>
                                          ))}
                                        </div>
                                      </div>
                                      <div>
                                        <Label htmlFor="feedback-comment">Comment</Label>
                                        <Textarea
                                          id="feedback-comment"
                                          placeholder="Share your thoughts about this session..."
                                          rows={4}
                                        />
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <Button onClick={() => handleSubmitFeedback(session.id, 4.5, "Great session!")}>
                                        Submit Feedback
                                      </Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No past sessions</h3>
                  <p className="text-muted-foreground">Your completed mentorship sessions will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
