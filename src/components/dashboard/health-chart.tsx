"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { herdHealthData } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const chartConfig = {
  count: {
    label: "Hayvan Sayısı",
    color: "hsl(var(--primary))",
  },
  "Sağlıklı": {
    label: "Sağlıklı",
    color: "hsl(var(--chart-2))",
  },
  "Gebe": {
    label: "Gebe",
    color: "hsl(var(--chart-5))",
  },
  "Hasta": {
    label: "Hasta",
    color: "hsl(var(--chart-1))",
  },
};

export function HealthChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sürü Sağlık Durumu</CardTitle>
        <CardDescription>Sürüdeki hayvanların sağlık durumlarına göre dağılımı.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={herdHealthData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
              <XAxis
                dataKey="status"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="count" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

