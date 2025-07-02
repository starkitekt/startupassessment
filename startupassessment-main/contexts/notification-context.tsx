"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useToast } from "@/components/ui/use-toast"

export type NotificationType =
  | "info"
  | "success"
  | "warning"
  | "error"
  | "assessment"
  | "funding"
  | "document"
  | "mentor"
  | "system"

export interface Notification {
  id: string
  title: string
  message: string
  type: NotificationType
  read: boolean
  createdAt: Date
  actionUrl?: string
  actionLabel?: string
  metadata?: Record<string, any>
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "read" | "createdAt">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  deleteNotification: (id: string) => void
  clearAll: () => void
  getNotificationsByType: (type: NotificationType) => Notification[]
  // Add these new functions
  getNotificationsByPriority: (priority: "high" | "medium" | "low") => Notification[]
  getGroupedNotifications: () => Record<string, Notification[]>
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}

interface NotificationProviderProps {
  children: ReactNode
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { toast } = useToast()

  // Add after the useState declarations
  const [socket, setSocket] = useState<WebSocket | null>(null)

  // Add this useEffect for WebSocket connection
  useEffect(() => {
    // In a real app, this would connect to your WebSocket server
    // For demo purposes, we'll simulate real-time notifications
    const simulateWebSocket = () => {
      console.log("Simulating WebSocket connection for notifications")

      // Simulate receiving a new notification every 30 seconds
      const interval = setInterval(() => {
        const randomTypes: NotificationType[] = ["assessment", "funding", "document", "mentor", "system"]
        const randomType = randomTypes[Math.floor(Math.random() * randomTypes.length)]

        const newNotification = {
          title: `New ${randomType} update`,
          message: `You have a new ${randomType} notification that requires your attention.`,
          type: randomType,
          actionUrl: `/${randomType}s`,
          actionLabel: "View Details",
        }

        addNotification(newNotification)
      }, 30000) // Every 30 seconds

      return () => clearInterval(interval)
    }

    const cleanup = simulateWebSocket()

    return () => {
      cleanup
      // In a real app: socket?.close()
    }
  }, [])

  // Initialize with mock notifications
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: "1",
        title: "New Assessment Submitted",
        message: "TechStart Solutions has submitted a new funding assessment",
        type: "assessment",
        read: false,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        actionUrl: "/assessments/ASS002",
        actionLabel: "Review Assessment",
      },
      {
        id: "2",
        title: "Document Verification Required",
        message: "Financial documents for Innovatech Solutions need verification",
        type: "document",
        read: false,
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        actionUrl: "/portfolio/STP001",
        actionLabel: "View Documents",
      },
      {
        id: "3",
        title: "Mentor Session Scheduled",
        message: "Your mentoring session with DataFlow Analytics is scheduled for tomorrow",
        type: "mentor",
        read: true,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        actionUrl: "/mentors/M001",
        actionLabel: "View Details",
      },
      {
        id: "4",
        title: "System Maintenance",
        message: "Scheduled maintenance will occur this weekend from 2-4 AM",
        type: "system",
        read: false,
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      },
    ]
    setNotifications(mockNotifications)
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  // Add this function inside the NotificationProvider
  const playNotificationSound = () => {
    try {
      const audio = new Audio("/notification-sound.mp3")
      audio.volume = 0.5
      audio.play().catch((e) => console.log("Audio play failed:", e))
    } catch (error) {
      console.error("Failed to play notification sound:", error)
    }
  }

  // Add browser notification support
  const showBrowserNotification = (notification: Notification) => {
    if (!("Notification" in window)) return

    if (Notification.permission === "granted") {
      new Notification(notification.title, {
        body: notification.message,
        icon: "/notification-icon.png",
      })
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(notification.title, {
            body: notification.message,
            icon: "/notification-icon.png",
          })
        }
      })
    }
  }

  // Update the addNotification function to include sound and browser notifications
  const addNotification = (notificationData: Omit<Notification, "id" | "read" | "createdAt">) => {
    const newNotification: Notification = {
      ...notificationData,
      id: Date.now().toString(),
      read: false,
      createdAt: new Date(),
    }

    setNotifications((prev) => [newNotification, ...prev])

    // Play sound for new notifications
    playNotificationSound()

    // Show browser notification
    showBrowserNotification(newNotification)

    // Show toast for new notifications
    toast({
      title: newNotification.title,
      description: newNotification.message,
      duration: 5000,
    })
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const getNotificationsByType = (type: NotificationType) => {
    return notifications.filter((notification) => notification.type === type)
  }

  // Add these functions to the NotificationProvider
  const getNotificationsByPriority = (priority: "high" | "medium" | "low") => {
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

    return notifications.filter((notification) => priorityMap[notification.type] === priority)
  }

  const getGroupedNotifications = () => {
    const groups: Record<string, Notification[]> = {}

    notifications.forEach((notification) => {
      const date = notification.createdAt.toDateString()
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(notification)
    })

    return groups
  }

  // Add these to the context value
  const contextValue: NotificationContextType = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    getNotificationsByType,
    // Add these new functions
    getNotificationsByPriority,
    getGroupedNotifications,
  }

  return <NotificationContext.Provider value={contextValue}>{children}</NotificationContext.Provider>
}
