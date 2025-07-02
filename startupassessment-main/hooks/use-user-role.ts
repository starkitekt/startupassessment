// Mock hook to simulate user roles and ID
// In a real application, this would come from an authentication context.

export type UserRole = "admin" | "editor" | "viewer"

// You can change this to test different roles:
const MOCK_CURRENT_ROLE: UserRole = "admin"
const MOCK_CURRENT_USER_ID: string = "user123" // Corresponds to Rajesh Kumar (Admin) in mockUsers
const MOCK_CURRENT_USER_NAME: string = "Rajesh Kumar (Admin)"

export const useUserRole = (): { role: UserRole; userId: string; userName: string } => {
  return { role: MOCK_CURRENT_ROLE, userId: MOCK_CURRENT_USER_ID, userName: MOCK_CURRENT_USER_NAME }
}

export const mockUsers = [
  { id: "user123", name: "Rajesh Kumar (Admin)" },
  { id: "user456", name: "Priya Sharma (Editor)" },
  { id: "user789", name: "Amit Singh (Viewer)" },
  { id: "user101", name: "Sneha Patel (Editor)" },
]
