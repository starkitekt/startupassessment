"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { Activity } from "lucide-react"
import { useGlobalSettings } from "@/contexts/global-settings-context"
import { useMemo } from "react"

interface FundingApplicationChartProps {
  data: { month: string; disbursed: number; applications: number }[]
}

export function FundingApplicationChart({ data }: FundingApplicationChartProps) {
  const { formatCurrency, selectedCurrency } = useGlobalSettings()

  const chartConfig = useMemo(
    () => ({
      disbursed: { label: `Disbursed (${selectedCurrency.code} Cr)`, color: "hsl(var(--chart-primary))" },
      applications: { label: "Applications", color: "hsl(var(--chart-secondary))" },
    }),
    [selectedCurrency.code],
  )

  return (
    <Card className="border hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="mr-2 h-5 w-5 text-primary" /> Funding & Application Activity
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Monthly trends for funding disbursed and applications received.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer>
            <BarChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={{ strokeOpacity: 0.5 }} />
              <YAxis
                yAxisId="left"
                orientation="left"
                stroke="hsl(var(--chart-primary))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) =>
                  formatCurrency(value * 10000000, selectedCurrency.code, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 1,
                  })
                }
                width={80}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="hsl(var(--chart-secondary))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="dashed"
                    formatter={(value, name, item) => {
                      if (item.dataKey === "disbursed") {
                        return formatCurrency(Number(value) * 10000000, selectedCurrency.code)
                      }
                      return String(value)
                    }}
                  />
                }
              />
              <Legend verticalAlign="top" height={40} />
              <Bar
                yAxisId="left"
                dataKey="disbursed"
                name={chartConfig.disbursed.label}
                fill="hsl(var(--chart-primary))"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                yAxisId="right"
                dataKey="applications"
                name={chartConfig.applications.label}
                fill="hsl(var(--chart-secondary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
