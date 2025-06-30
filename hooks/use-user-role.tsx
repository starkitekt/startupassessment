"use client"

import type React from "react"

import { useState, createContext, useContext } from "react"

// Define user role types
export type UserRole = "admin" | "editor" | "viewer"

// Define user interface
export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  department: string
}

// Mock user data
export const mockUsers: User[] = [
  {
    id: "u001",
    name: "John Doe (Admin)",
    email: "john.doe@example.com",
    role: "admin" as const,
    department: "Management",
  },
  {
    id: "u002",
    name: "Jane Smith (Editor)",
    email: "jane.smith@example.com",
    role: "editor" as const,
    department: "Operations",
  },
  {
    id: "u003",
    name: "Bob Wilson (Viewer)",
    email: "bob.wilson@example.com",
    role: "viewer" as const,
    department: "Finance",
  },
  {
    id: "u004",
    name: "Sneha Patel (Editor)",
    email: "sneha.patel@example.com",
    role: "editor" as const,
    department: "Technology",
  },
  {
    id: "u005",
    name: "Michael Chen (Admin)",
    email: "michael.chen@example.com",
    role: "admin" as const,
    department: "Procurement",
  },
  {
    id: "u006",
    name: "Sarah Johnson (Editor)",
    email: "sarah.johnson@example.com",
    role: "editor" as const,
    department: "Vendor Relations",
  },
]

// User context interface
interface UserContextType {
  currentUser: User | null
  setCurrentUser: (user: User | null) => void
  users: User[]
}

// Create user context
const UserContext = createContext<UserContextType | undefined>(undefined)

// User provider component
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(mockUsers[0]) // Default to first admin user
  const [users] = useState<User[]>(mockUsers)

  return <UserContext.Provider value={{ currentUser, setCurrentUser, users }}>{children}</UserContext.Provider>
}

// Main hook - this is the missing export that was causing the error
export function useUserRole() {
  const context = useContext(UserContext)

  if (context === undefined) {
    // Return default values if context is not available
    return {
      currentUser: mockUsers[0],
      setCurrentUser: () => {},
      users: mockUsers,
      userRole: mockUsers[0].role,
      hasPermission: (action: string, resource: string) => hasPermission(mockUsers[0].role, action, resource),
      canManageVendors: () => canManageVendors(mockUsers[0].role),
      canApproveProcurement: () => canApproveProcurement(mockUsers[0].role),
      canProcessReceipts: () => canProcessReceipts(mockUsers[0].role),
    }
  }

  const { currentUser, setCurrentUser, users } = context

  return {
    currentUser,
    setCurrentUser,
    users,
    userRole: currentUser?.role || "viewer",
    hasPermission: (action: string, resource: string) => hasPermission(currentUser?.role || "viewer", action, resource),
    canManageVendors: () => canManageVendors(currentUser?.role || "viewer"),
    canApproveProcurement: () => canApproveProcurement(currentUser?.role || "viewer"),
    canProcessReceipts: () => canProcessReceipts(currentUser?.role || "viewer"),
  }
}

// Permission checking functions
export function hasPermission(userRole: UserRole, action: string, resource: string): boolean {
  const permissions = {
    admin: ["create", "read", "update", "delete", "approve", "manage"],
    editor: ["create", "read", "update", "submit"],
    viewer: ["read"],
  }

  return permissions[userRole]?.includes(action) || false
}

export function canManageVendors(userRole: UserRole): boolean {
  return userRole === "admin" || userRole === "editor"
}

export function canApproveProcurement(userRole: UserRole): boolean {
  return userRole === "admin"
}

export function canProcessReceipts(userRole: UserRole): boolean {
  return userRole === "admin" || userRole === "editor"
}

// Additional utility functions
export function getUserById(id: string): User | undefined {
  return mockUsers.find((user) => user.id === id)
}

export function getUsersByRole(role: UserRole): User[] {
  return mockUsers.filter((user) => user.role === role)
}

export function getUsersByDepartment(department: string): User[] {
  return mockUsers.filter((user) => user.department === department)
}

// Role hierarchy checking
export function isHigherRole(role1: UserRole, role2: UserRole): boolean {
  const hierarchy = { admin: 3, editor: 2, viewer: 1 }
  return hierarchy[role1] > hierarchy[role2]
}

export function canAccessResource(userRole: UserRole, requiredRole: UserRole): boolean {
  const hierarchy = { admin: 3, editor: 2, viewer: 1 }
  return hierarchy[userRole] >= hierarchy[requiredRole]
}
