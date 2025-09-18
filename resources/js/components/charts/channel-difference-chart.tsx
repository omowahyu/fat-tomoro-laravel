"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const channelData = [
  {
    date: "15 Mar",
    gofood: 125000,
    grabfood: 89000,
    shopee: 67000,
    tokopedia: 45000,
  },
  {
    date: "16 Mar",
    gofood: 142000,
    grabfood: 95000,
    shopee: 72000,
    tokopedia: 52000,
  },
  {
    date: "17 Mar",
    gofood: 138000,
    grabfood: 87000,
    shopee: 69000,
    tokopedia: 48000,
  },
  {
    date: "18 Mar",
    gofood: 156000,
    grabfood: 102000,
    shopee: 78000,
    tokopedia: 58000,
  },
  {
    date: "19 Mar",
    gofood: 149000,
    grabfood: 98000,
    shopee: 74000,
    tokopedia: 55000,
  },
  {
    date: "20 Mar",
    gofood: 167000,
    grabfood: 108000,
    shopee: 82000,
    tokopedia: 62000,
  },
  {
    date: "21 Mar",
    gofood: 159000,
    grabfood: 104000,
    shopee: 79000,
    tokopedia: 59000,
  },
]

export function ChannelDifferenceChart() {
  return (
    <ChartContainer
      config={{
        gofood: {
          label: "GoFood",
          color: "#f97316",
        },
        grabfood: {
          label: "GrabFood",
          color: "#22c55e",
        },
        shopee: {
          label: "Shopee Food",
          color: "#f59e0b",
        },
        tokopedia: {
          label: "Tokopedia",
          color: "#3b82f6",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={channelData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="date" className="text-xs fill-muted-foreground" tick={{ fontSize: 12 }} />
          <YAxis
            className="text-xs fill-muted-foreground"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
          />
          <ChartTooltip
            content={<ChartTooltipContent />}
            formatter={(value: number) => [`Rp ${value.toLocaleString("id-ID")}`, ""]}
          />
          <Legend />
          <Bar dataKey="gofood" fill="var(--color-gofood)" name="GoFood" radius={[2, 2, 0, 0]} />
          <Bar dataKey="grabfood" fill="var(--color-grabfood)" name="GrabFood" radius={[2, 2, 0, 0]} />
          <Bar dataKey="shopee" fill="var(--color-shopee)" name="Shopee Food" radius={[2, 2, 0, 0]} />
          <Bar dataKey="tokopedia" fill="var(--color-tokopedia)" name="Tokopedia" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
