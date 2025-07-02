"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Goal } from "lucide-react"
import { useGlobalSettings } from "@/contexts/global-settings-context"

interface IncubatorGoal {
  id: string
  name: string
  currentValueInBase: number
  targetValueInBase: number
  unit: string
  progress: number
}

interface IncubatorGoalsProgressProps {
  goals: IncubatorGoal[]
}

export function IncubatorGoalsProgress({ goals }: IncubatorGoalsProgressProps) {
  const { formatCurrency, selectedCurrency } = useGlobalSettings()

  return (
    <Card className="border hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Goal className="mr-2 h-5 w-5 text-primary" /> Incubator Goals Progress
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Tracking key performance indicators against targets.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.id}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">{goal.name}</span>
              <span className="text-sm text-muted-foreground">
                {goal.unit === "Cr" ? formatCurrency(goal.currentValueInBase) : goal.currentValueInBase} /
                {goal.unit === "Cr"
                  ? formatCurrency(goal.targetValueInBase, selectedCurrency.code, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })
                  : goal.targetValueInBase}{" "}
                {goal.unit !== "Cr" ? goal.unit : ""}
              </span>
            </div>
            <Progress value={goal.progress} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
