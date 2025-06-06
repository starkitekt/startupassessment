"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNotifications, type NotificationType } from "@/contexts/notification-context"
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  FileText,
  DollarSign,
  Users,
  Settings,
  AlertCircle,
  Info,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

export function NotificationCenter() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    getNotificationsByType,
  } = useNotifications()

  const [activeTab, setActiveTab] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState<"all" | "high" | "medium" | "low">("all")
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check for new notifications every minute
    const interval = setInterval(() => {
      // In a real app, this would fetch from an API
      console.log("Checking for new notifications...")
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "assessment":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "funding":
        return <DollarSign className="h-4 w-4 text-green-500" />
      case "document":
        return <FileText className="h-4 w-4 text-orange-500" />
      case "mentor":
        return <Users className="h-4 w-4 text-purple-500" />
      case "system":
        return <Settings className="h-4 w-4 text-gray-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "success":
        return <Check className="h-4 w-4 text-green-500" />
      default:
        return <Info className="h-4 w-4 text-blue-500" />
    }
  }

  const getTypeLabel = (type: NotificationType) => {
    switch (type) {
      case "assessment":
        return "Assessments"
      case "funding":
        return "Funding"
      case "document":
        return "Documents"
      case "mentor":
        return "Mentoring"
      case "system":
        return "System"
      default:
        return "Other"
    }
  }

  const handleNotificationClick = (notification: any) => {
    if (!notification.read) {
      markAsRead(notification.id)
    }
    if (notification.actionUrl) {
      router.push(notification.actionUrl)
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`

    return date.toLocaleDateString()
  }

  const getFilteredNotifications = () => {
    let filtered = activeTab === "all" ? notifications : getNotificationsByType(activeTab as NotificationType)

    if (priorityFilter !== "all") {
      filtered = filtered.filter((n) => {
        const priorityMap: Record<NotificationType, "high" | "medium" | "low"> = {
          error: "high",
          warning: "medium",
          success: "low",
          info: "low",
          assessment: "medium",
          funding: "high",
          document: "medium",
          mentor: "low",
          system: "medium",
        }
        return priorityMap[n.type] === priorityFilter
      })
    }

    return filtered
  }

  const filteredNotifications = getFilteredNotifications()

  const groupedNotifications = () => {
    const groups: Record<string, typeof filteredNotifications> = {}

    filteredNotifications.forEach((notification) => {
      const date = format(notification.createdAt, "MMM d, yyyy")
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(notification)
    })

    return groups
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)

    // Mark notifications as seen when opening
    if (open && unreadCount > 0) {
      // In a real app, you might want to mark them as "seen" but not "read"
      // For simplicity, we're not implementing that distinction here
    }
  }

  const notificationTypes = ["assessment", "funding", "document", "mentor", "system"] as const

  return (
    <DropdownMenu onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96 p-0">
        <div className="flex items-center justify-between p-4 border-b">
          <DropdownMenuLabel className="p-0 font-semibold">Notifications ({unreadCount} unread)</DropdownMenuLabel>
          <div className="flex items-center space-x-1">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-8 px-2 text-xs">
                <CheckCheck className="h-3 w-3 mr-1" />
                Mark all read
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="h-8 px-2 text-xs text-destructive hover:text-destructive"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Clear all
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 h-8 m-2 mb-0">
            <TabsTrigger value="all" className="text-xs">
              All
            </TabsTrigger>
            {notificationTypes.map((type) => (
              <TabsTrigger key={type} value={type} className="text-xs">
                {getTypeLabel(type)}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="flex items-center justify-between px-2 py-1">
            <span className="text-xs text-muted-foreground">Filter by priority:</span>
            <select
              className="text-xs border rounded px-1 py-0.5"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as any)}
            >
              <option value="all">All</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            <ScrollArea className="h-96">
              {Object.keys(filteredNotifications).length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground">
                    {activeTab === "all"
                      ? "No notifications"
                      : `No ${getTypeLabel(activeTab as NotificationType).toLowerCase()} notifications`}
                  </p>
                </div>
              ) : (
                <div className="space-y-4 p-2">
                  {Object.entries(groupedNotifications()).map(([date, notifications]) => (
                    <div key={date} className="space-y-1">
                      <div className="sticky top-0 bg-background z-10 py-1">
                        <h4 className="text-xs font-medium text-muted-foreground px-3">{date}</h4>
                      </div>

                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={cn(
                            "flex items-start space-x-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted/50",
                            !notification.read && "bg-blue-50 dark:bg-blue-950/20",
                          )}
                          onClick={() => handleNotificationClick(notification)}
                        >
                          <div className="flex-shrink-0 mt-0.5">{getNotificationIcon(notification.type)}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <p className={cn("text-sm font-medium truncate", !notification.read && "font-semibold")}>
                                {notification.title}
                              </p>
                              <div className="flex items-center space-x-1 ml-2">
                                {!notification.read && <div className="h-2 w-2 bg-blue-500 rounded-full" />}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    deleteNotification(notification.id)
                                  }}
                                  className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{notification.message}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-muted-foreground">
                                {formatTimeAgo(notification.createdAt)}
                              </span>
                              {notification.actionLabel && (
                                <span className="text-xs text-primary font-medium">{notification.actionLabel}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
