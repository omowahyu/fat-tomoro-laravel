"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const successRateData = [
  {
    date: "15 Mar",
    successRate: 94.2,
    target: 95,
  },
  {
    date: "16 Mar",
    successRate: 96.8,
    target: 95,
  },
  {
    date: "17 Mar",
    successRate: 93.5,
    target: 95,
  },
  {
    date: "18 Mar",
    successRate: 97.1,
    target: 95,
  },
  {
    date: "19 Mar",
    successRate: 95.9,
    target: 95,
  },
  {
    date: "20 Mar",
    successRate: 98.3,
    target: 95,
  },
  {
    date: "21 Mar",
    successRate: 96.7,
    target: 95,
  },
]

export function SuccessRateChart() {
  return (
    <ChartContainer
      config={{
        successRate: {
          label: "Success Rate",
          color: "#22c55e",
        },
        target: {
          label: "Target",
          color: "#f97316",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={successRateData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="date" className="text-xs fill-muted-foreground" tick={{ fontSize: 12 }} />
          <YAxis
            domain={[90, 100]}
            className="text-xs fill-muted-foreground"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${value}%`}
          />
          <ChartTooltip content={<ChartTooltipContent />} formatter={(value: number) => [`${value}%`, ""]} />
          <Line
            type="monotone"
            dataKey="successRate"
            stroke="var(--color-successRate)"
            strokeWidth={3}
            dot={{ fill: "var(--color-successRate)", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: "var(--color-successRate)", strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="target"
            stroke="var(--color-target)"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
