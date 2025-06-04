"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { useGlobalSettings } from "@/contexts/global-settings-context"

interface KeyMetric {
  title: string
  value?: string
  valueAsNumber?: number
  trend: string
  icon: React.ElementType
  trendColor: string
  tooltip: string
}

interface KeyMetricsCardsProps {
  metrics: KeyMetric[]
}

export function KeyMetricsCards({ metrics }: KeyMetricsCardsProps) {
  const { formatCurrency } = useGlobalSettings()

  return (
    <TooltipProvider>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title} className="border hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <CardTitle className="text-base font-medium cursor-help">{metric.title}</CardTitle>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{metric.tooltip}</p>
                </TooltipContent>
              </Tooltip>
              <metric.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-numerical">
                {metric.valueAsNumber ? formatCurrency(metric.valueAsNumber) : metric.value}
              </div>
              <p className={cn("text-xs text-muted-foreground flex items-center", metric.trendColor)}>
                <TrendingUp className="h-3 w-3 mr-1" /> {metric.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </TooltipProvider>
  )
}
