"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { TrendingUp, TrendingDown, ArrowUpRight, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { useGlobalSettings } from "@/contexts/global-settings-context"

interface MetricCardProps {
  title: string
  value: string | number
  trend?: {
    value: string
    isPositive: boolean
    description: string
  }
  icon: React.ElementType
  description?: string
  onClick?: () => void
  className?: string
  valueAsNumber?: number
}

interface GoalProgressCardProps {
  title: string
  current: number
  target: number
  unit: string
  description?: string
  trend?: {
    value: string
    isPositive: boolean
  }
}

export function AccessibleMetricCard({
  title,
  value,
  trend,
  icon: Icon,
  description,
  onClick,
  className,
  valueAsNumber,
}: MetricCardProps) {
  const { formatCurrency } = useGlobalSettings()

  const displayValue = valueAsNumber ? formatCurrency(valueAsNumber) : value

  const cardContent = (
    <Card
      className={cn(
        "transition-all duration-200 hover:shadow-md cursor-pointer focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2",
        "border border-border bg-card text-card-foreground",
        className,
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault()
          onClick()
        }
      }}
      aria-describedby={description ? `${title.toLowerCase().replace(/\s+/g, "-")}-desc` : undefined}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          {onClick && <ArrowUpRight className="h-3 w-3 text-muted-foreground" aria-hidden="true" />}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-1" aria-label={`Current value: ${displayValue}`}>
          {displayValue}
        </div>
        {trend && (
          <div
            className={cn(
              "flex items-center text-xs",
              trend.isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400",
            )}
            aria-label={`Trend: ${trend.value} ${trend.isPositive ? "increase" : "decrease"}. ${trend.description}`}
          >
            {trend.isPositive ? (
              <TrendingUp className="mr-1 h-3 w-3" aria-hidden="true" />
            ) : (
              <TrendingDown className="mr-1 h-3 w-3" aria-hidden="true" />
            )}
            <span>{trend.value}</span>
          </div>
        )}
        {description && (
          <p id={`${title.toLowerCase().replace(/\s+/g, "-")}-desc`} className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  )

  if (onClick) {
    return (
      <div>
        {cardContent}
        <span className="sr-only">Click to view details for {title}</span>
      </div>
    )
  }

  return cardContent
}

export function AccessibleGoalProgressCard({
  title,
  current,
  target,
  unit,
  description,
  trend,
}: GoalProgressCardProps) {
  const { formatCurrency, selectedCurrency } = useGlobalSettings()
  const progress = (current / target) * 100
  const isMonetary = unit === "Cr" || unit === "L"

  const displayCurrent = isMonetary ? formatCurrency(current * (unit === "Cr" ? 10000000 : 100000)) : current.toString()

  const displayTarget = isMonetary ? formatCurrency(target * (unit === "Cr" ? 10000000 : 100000)) : target.toString()

  return (
    <Card className="border border-border bg-card text-card-foreground">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base font-medium">{title}</CardTitle>
            {description && <CardDescription className="text-sm">{description}</CardDescription>}
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-muted-foreground hover:text-foreground"
                  aria-label={`More information about ${title}`}
                >
                  <Info className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left" className="max-w-xs">
                <p>Current progress: {Math.round(progress)}% of target</p>
                <p>
                  Remaining:{" "}
                  {isMonetary
                    ? formatCurrency((target - current) * (unit === "Cr" ? 10000000 : 100000))
                    : `${target - current} ${unit}`}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <span className="text-2xl font-bold" aria-label={`Current: ${displayCurrent}`}>
              {displayCurrent}
            </span>
            <span className="text-sm text-muted-foreground" aria-label={`Target: ${displayTarget}`}>
              of {displayTarget}
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Progress</span>
              <span aria-label={`${Math.round(progress)} percent complete`}>{Math.round(progress)}%</span>
            </div>
            <Progress
              value={progress}
              className="h-2"
              aria-label={`Progress bar showing ${Math.round(progress)}% completion of ${title}`}
            />
          </div>
        </div>

        {trend && (
          <div
            className={cn(
              "flex items-center text-xs",
              trend.isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400",
            )}
            aria-label={`Recent trend: ${trend.value} ${trend.isPositive ? "improvement" : "decline"}`}
          >
            {trend.isPositive ? (
              <TrendingUp className="mr-1 h-3 w-3" aria-hidden="true" />
            ) : (
              <TrendingDown className="mr-1 h-3 w-3" aria-hidden="true" />
            )}
            <span>{trend.value} this period</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function AccessibleKeyMetricsGrid({
  metrics,
  onMetricClick,
}: {
  metrics: Array<Omit<MetricCardProps, "onClick"> & { id: string }>
  onMetricClick?: (metricId: string) => void
}) {
  return (
    <section aria-labelledby="key-metrics-heading">
      <h2 id="key-metrics-heading" className="sr-only">
        Key Performance Metrics
      </h2>
      <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <AccessibleMetricCard
            key={metric.id}
            {...metric}
            onClick={onMetricClick ? () => onMetricClick(metric.id) : undefined}
          />
        ))}
      </div>
    </section>
  )
}
