"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, PlusCircle, Filter } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

const mockTasks = [
  {
    id: "TSK001",
    title: "Review Innovatech's Pitch Deck",
    dueDate: "2024-06-10",
    priority: "High",
    status: "pending",
    assignedTo: "Rajesh Kumar",
    relatedEntity: "Innovatech Solutions (STP001)",
  },
  {
    id: "TSK002",
    title: "Schedule Follow-up with HealthWell AI",
    dueDate: "2024-06-12",
    priority: "Medium",
    status: "pending",
    assignedTo: "Priya Sharma",
    relatedEntity: "HealthWell AI (STP002)",
  },
  {
    id: "TSK003",
    title: "Finalize Q2 Incubator Report",
    dueDate: "2024-06-15",
    priority: "High",
    status: "pending",
    assignedTo: "Admin Team",
    relatedEntity: "General",
  },
  {
    id: "TSK004",
    title: "Onboard New Mentor: Dr. Emily Carter",
    dueDate: "2024-06-08",
    priority: "Low",
    status: "completed",
    assignedTo: "Rajesh Kumar",
    relatedEntity: "Dr. Emily Carter (M005)",
  },
]

type Task = (typeof mockTasks)[0]

export default function TasksPage() {
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>(mockTasks)

  const toggleTaskStatus = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: task.status === "pending" ? "completed" : "pending" } : task,
      ),
    )
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-jpmc-darkblue dark:text-jpmc-lightblue">Task Management</h1>
          <p className="text-muted-foreground">View, manage, and track all your tasks.</p>
        </div>
        <div className="flex space-x-2 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none">
            <Filter className="mr-2 h-4 w-4" /> Filter Tasks
          </Button>
          <Button className="jpmc-gradient text-white flex-1 sm:flex-none">
            <PlusCircle className="mr-2 h-4 w-4" /> New Task
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Tasks</CardTitle>
          <CardDescription>Tasks that require your attention.</CardDescription>
        </CardHeader>
        <CardContent>
          {tasks.filter((t) => t.status === "pending").length > 0 ? (
            <ul className="space-y-3">
              {tasks
                .filter((t) => t.status === "pending")
                .map((task) => (
                  <li
                    key={task.id}
                    className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50"
                  >
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id={`task-${task.id}`}
                        checked={task.status === "completed"}
                        onCheckedChange={() => toggleTaskStatus(task.id)}
                      />
                      <div>
                        <label htmlFor={`task-${task.id}`} className="font-medium cursor-pointer">
                          {task.title}
                        </label>
                        <p className="text-xs text-muted-foreground">
                          Due: {new Date(task.dueDate).toLocaleDateString()} | Related: {task.relatedEntity}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        task.priority === "High" ? "destructive" : task.priority === "Medium" ? "outline" : "secondary"
                      }
                    >
                      {task.priority}
                    </Badge>
                  </li>
                ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-center py-4">No pending tasks. Great job!</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Completed Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          {tasks.filter((t) => t.status === "completed").length > 0 ? (
            <ul className="space-y-3">
              {tasks
                .filter((t) => t.status === "completed")
                .map((task) => (
                  <li key={task.id} className="flex items-center justify-between p-3 border rounded-md bg-muted/30">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id={`task-${task.id}`}
                        checked={task.status === "completed"}
                        onCheckedChange={() => toggleTaskStatus(task.id)}
                      />
                      <div>
                        <label
                          htmlFor={`task-${task.id}`}
                          className="font-medium text-muted-foreground line-through cursor-pointer"
                        >
                          {task.title}
                        </label>
                        <p className="text-xs text-muted-foreground line-through">
                          Completed | Related: {task.relatedEntity}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">Completed</Badge>
                  </li>
                ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-center py-4">No tasks completed yet.</p>
          )}
        </CardContent>
      </Card>
      <p className="text-xs text-center text-muted-foreground">
        This is a placeholder page. Full task management features are planned.
      </p>
    </div>
  )
}
