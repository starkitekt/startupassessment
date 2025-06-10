// Add more comprehensive user data and role management
export const mockUsers = [
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

// Add permission checking functions
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
