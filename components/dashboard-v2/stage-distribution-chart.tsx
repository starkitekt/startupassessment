"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from "recharts"
import { Briefcase } from "lucide-react"

interface StageDistributionChartProps {
  data: { name: string; value: number; fill: string }[]
}

export function StageDistributionChart({ data }: StageDistributionChartProps) {
  return (
    <Card className="border hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Briefcase className="mr-2 h-5 w-5 text-primary" /> Stage Distribution
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Number of startups per investment stage.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className="h-[250px] w-full">
          <ResponsiveContainer>
            <BarChart data={data} margin={{ left: -10, right: 10, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" fontSize={11} interval={0} angle={-40} textAnchor="end" height={60} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" name="Startups" radius={[4, 4, 0, 0]}>
                {data.map((entry) => (
                  <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
