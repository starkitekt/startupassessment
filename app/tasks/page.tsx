"use client"

import { TaskManagement } from "@/components/task-management"
import { useUserRole } from "@/hooks/use-user-role"

export default function TasksPage() {
  const { role } = useUserRole()

  const canCreateTasks = role === "admin" || role === "editor"
  const canAssignTasks = role === "admin"

  return (
    <div className="container mx-auto py-6">
      <TaskManagement canCreateTasks={canCreateTasks} canAssignTasks={canAssignTasks} />
    </div>
  )
}
