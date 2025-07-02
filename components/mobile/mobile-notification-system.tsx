"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import {
  Bell,
  MessageSquare,
  Calendar,
  DollarSign,
  Users,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Settings,
  X,
} from "lucide-react"
import { format } from "date-fns"

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "success" | "error"
  category: "system" | "calendar" | "funding" | "mentorship" | "procurement"
  timestamp: Date
  read: boolean
  actionRequired?: boolean
  priority: "low" | "medium" | "high" | "urgent"
}

interface NotificationSettings {
  pushEnabled: boolean
  emailEnabled: boolean
  smsEnabled: boolean
  categories: {
    [key: string]: boolean
  }
  quietHours: {
    enabled: boolean
    start: string
    end: string
  }
  frequency: "immediate" | "hourly" | "daily"
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "New Funding Application",
    message: "TechStart Inc. has submitted a Series A funding application",
    type: "info",
    category: "funding",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false,
    actionRequired: true,
    priority: "high",
  },
  {
    id: "2",
    title: "Mentorship Session Reminder",
    message: "Your session with Sarah Chen starts in 15 minutes",
    type: "warning",
    category: "mentorship",
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    read: false,
    actionRequired: false,
    priority: "medium",
  },
  {
    id: "3",
    title: "Procurement Request Approved",
    message: "Your office supplies request has been approved",
    type: "success",
    category: "procurement",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: true,
    actionRequired: false,
    priority: "low",
  },
  {
    id: "4",
    title: "System Maintenance",
    message: "Scheduled maintenance will begin at 2:00 AM",
    type: "warning",
    category: "system",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false,
    actionRequired: false,
    priority: "medium",
  },
]

export function MobileNotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS)
  const [settings, setSettings] = useState<NotificationSettings>({
    pushEnabled: true,
    emailEnabled: true,
    smsEnabled: false,
    categories: {
      system: true,
      calendar: true,
      funding: true,
      mentorship: true,
      procurement: true,
    },
    quietHours: {
      enabled: true,
      start: "22:00",
      end: "08:00",
    },
    frequency: "immediate",
  })
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const { toast } = useToast()

  const unreadCount = notifications.filter((n) => !n.read).length

  const getNotificationIcon = (category: Notification["category"]) => {
    switch (category) {
      case "calendar":
        return <Calendar className="h-4 w-4" />
      case "funding":
        return <DollarSign className="h-4 w-4" />
      case "mentorship":
        return <Users className="h-4 w-4" />
      case "procurement":
        return <MessageSquare className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getTypeIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-blue-500" />
    }
  }

  const getPriorityColor = (priority: Notification["priority"]) => {
    switch (priority) {
      case "urgent":
        return "border-l-red-500"
      case "high":
        return "border-l-orange-500"
      case "medium":
        return "border-l-yellow-500"
      default:
        return "border-l-gray-300"
    }
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission()
      if (permission === "granted") {
        toast({
          title: "Notifications Enabled",
          description: "You'll now receive push notifications",
        })
      }
    }
  }

  useEffect(() => {
    // Request notification permission on component mount
    if (settings.pushEnabled && "Notification" in window && Notification.permission === "default") {
      requestNotificationPermission()
    }
  }, [settings.pushEnabled])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Notifications</h2>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {unreadCount}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              Mark All Read
            </Button>
          )}
          <Sheet open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Notification Settings</SheetTitle>
                <SheetDescription>Configure how you receive notifications</SheetDescription>
              </SheetHeader>
              <div className="space-y-6 mt-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Delivery Methods</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                    </div>
                    <Switch
                      checked={settings.pushEnabled}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, pushEnabled: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={settings.emailEnabled}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, emailEnabled: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                    </div>
                    <Switch
                      checked={settings.smsEnabled}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, smsEnabled: checked }))}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Categories</h3>
                  {Object.entries(settings.categories).map(([category, enabled]) => (
                    <div key={category} className="flex items-center justify-between">
                      <Label className="capitalize">{category}</Label>
                      <Switch
                        checked={enabled}
                        onCheckedChange={(checked) =>
                          setSettings((prev) => ({
                            ...prev,
                            categories: { ...prev.categories, [category]: checked },
                          }))
                        }
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Frequency</h3>
                  <Select
                    value={settings.frequency}
                    onValueChange={(value: "immediate" | "hourly" | "daily") =>
                      setSettings((prev) => ({ ...prev, frequency: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="hourly">Hourly Digest</SelectItem>
                      <SelectItem value="daily">Daily Digest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Quiet Hours</Label>
                    <Switch
                      checked={settings.quietHours.enabled}
                      onCheckedChange={(checked) =>
                        setSettings((prev) => ({
                          ...prev,
                          quietHours: { ...prev.quietHours, enabled: checked },
                        }))
                      }
                    />
                  </div>
                  {settings.quietHours.enabled && (
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-sm">Start</Label>
                        <Select
                          value={settings.quietHours.start}
                          onValueChange={(value) =>
                            setSettings((prev) => ({
                              ...prev,
                              quietHours: { ...prev.quietHours, start: value },
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 24 }, (_, i) => (
                              <SelectItem key={i} value={`${i.toString().padStart(2, "0")}:00`}>
                                {`${i.toString().padStart(2, "0")}:00`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-sm">End</Label>
                        <Select
                          value={settings.quietHours.end}
                          onValueChange={(value) =>
                            setSettings((prev) => ({
                              ...prev,
                              quietHours: { ...prev.quietHours, end: value },
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 24 }, (_, i) => (
                              <SelectItem key={i} value={`${i.toString().padStart(2, "0")}:00`}>
                                {`${i.toString().padStart(2, "0")}:00`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="space-y-2">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`border-l-4 ${getPriorityColor(notification.priority)} ${
                !notification.read ? "bg-muted/50" : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="flex items-center gap-2 mt-1">
                      {getNotificationIcon(notification.category)}
                      {getTypeIcon(notification.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className={`font-medium ${!notification.read ? "font-semibold" : ""}`}>
                          {notification.title}
                        </h4>
                        {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                        {notification.actionRequired && (
                          <Badge variant="destructive" className="text-xs">
                            Action Required
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="outline" className="text-xs">
                          {notification.category}
                        </Badge>
                        <span>{format(notification.timestamp, "MMM d, HH:mm")}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {!notification.read && (
                      <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                        Mark Read
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Notifications</h3>
              <p className="text-muted-foreground">You're all caught up!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
