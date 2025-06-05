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

  const addNotification = (notificationData: Omit<Notification, "id" | "read" | "createdAt">) => {
    const newNotification: Notification = {
      ...notificationData,
      id: Date.now().toString(),
      read: false,
      createdAt: new Date(),
    }

    setNotifications((prev) => [newNotification, ...prev])

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

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAll,
        getNotificationsByType,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
