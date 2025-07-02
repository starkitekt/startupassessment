"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ClipboardCheck } from "lucide-react"
import { cn } from "@/lib/utils"

interface Task {
  id: string
  title: string
  dueDate: string
  priority: string
}

interface PendingTasksCardProps {
  tasks: Task[]
  onViewAllTasks: () => void
}

export function PendingTasksCard({ tasks, onViewAllTasks }: PendingTasksCardProps) {
  return (
    <Card className="border hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <CardHeader>
        <CardTitle className="flex items-center">
          <ClipboardCheck className="mr-2 h-5 w-5 text-primary" /> Your Pending Tasks
        </CardTitle>
      </CardHeader>
      <CardContent>
        {tasks.length > 0 ? (
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li key={task.id} className="flex items-center justify-between p-2 border rounded-md text-sm">
                <div>
                  <p className="font-medium">{task.title}</p>
                  <p className="text-xs text-muted-foreground">Due: {task.dueDate}</p>
                </div>
                <Badge
                  variant={task.priority === "High" ? "destructive" : "secondary"}
                  className={cn(task.priority === "High" && "bg-red-500 text-white dark:bg-red-700 dark:text-red-100")}
                >
                  {task.priority}
                </Badge>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground text-center py-4 text-sm">No pending tasks.</p>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" onClick={onViewAllTasks}>
          View All Tasks
        </Button>
      </CardFooter>
    </Card>
  )
}
