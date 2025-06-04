"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BellRing } from "lucide-react"
import { cn } from "@/lib/utils"

interface ActivityItem {
  id: string
  type: string
  description: string
  time: string
  icon: React.ElementType
  color: string
}

interface RecentActivityCardProps {
  activity: ActivityItem[]
}

export function RecentActivityCard({ activity }: RecentActivityCardProps) {
  return (
    <Card className="border hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <CardHeader>
        <CardTitle className="flex items-center">
          <BellRing className="mr-2 h-5 w-5 text-primary" /> Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-[150px] overflow-y-auto">
        {activity.map((item) => (
          <div key={item.id} className="flex items-start space-x-3 text-sm">
            <item.icon className={cn("h-4 w-4 mt-0.5 flex-shrink-0", item.color)} />
            <div>
              <p className="font-medium leading-tight">{item.type}</p>
              <p className="text-xs text-muted-foreground leading-tight">{item.description}</p>
              <p className="text-xs text-muted-foreground/70">{item.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
