// Mock hook to simulate user roles and ID
// In a real application, this would come from an authentication context.

export type UserRole = "admin" | "editor" | "viewer"

// --- Mock User Configuration ---
// You can change MOCK_CURRENT_USER_ID to test different roles.
// Ensure the ID matches one in mockUsers.
const MOCK_CURRENT_USER_ID: string = "user123" // Rajesh Kumar (Admin)

export const mockUsers: ReadonlyArray<{ id: string; name: string; role: UserRole }> = [
  { id: "user123", name: "Rajesh Kumar (Admin)", role: "admin" },
  { id: "user456", name: "Priya Sharma (Editor)", role: "editor" },
  { id: "user789", name: "Amit Singh (Viewer)", role: "viewer" },
  { id: "user101", name: "Sneha Patel (Editor)", role: "editor" },
]

export const useUserRole = (): { role: UserRole; userId: string; userName: string } => {
  const currentUser = mockUsers.find((user) => user.id === MOCK_CURRENT_USER_ID) || mockUsers[0] // Fallback to first user

  return {
    role: currentUser.role,
    userId: currentUser.id,
    userName: currentUser.name,
  }
}
