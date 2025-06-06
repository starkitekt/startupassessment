"use client"

import { TaskManagement } from "@/components/task-management"

export default function TasksPage() {
  return (
    <div className="space-y-8 lg:space-y-10 p-4 md:p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">Task Management</h1>
        <p className="text-muted-foreground">Organize, track, and manage tasks across your incubator programs.</p>
      </div>
      <TaskManagement />
    </div>
  )
}
