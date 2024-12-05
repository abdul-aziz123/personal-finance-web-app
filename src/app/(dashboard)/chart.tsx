"use client";

import React from "react";
import { Label, Pie, PieChart } from "recharts";
import { Transaction } from "@/libs/definitions";

import { cn } from "@/libs/utils";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  amount: {
    label: "Amount",
  },
} satisfies ChartConfig;

export const description = "A donut chart with text";
interface ChartData {
  id: number;
  category: string;
  amount: number;
  fill: string;
  totalSpent: number;
  remaining: number;
  latestTransaction: Transaction[];
}

export default function Chart({ chartData }: { chartData: ChartData[] }) {
  const totalAmount = React.useMemo(() => {
    return chartData.reduce(
      (acc: number, curr: ChartData) => acc + Math.abs(curr.amount),
      0,
    );
  }, [chartData]);
  const totalSpent = React.useMemo(() => {
    return chartData.reduce(
      (acc: number, curr: ChartData) => acc + Math.abs(curr.totalSpent),
      0,
    );
  }, [chartData]);

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-square h-[250px] w-full"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="amount"
          nameKey="category"
          innerRadius={60}
          strokeWidth={5}
        >
          {chartData.map((_: ChartData, index: number) => (
            <React.Fragment key={`slice-${index}`}>
              <Label position="inside" />
            </React.Fragment>
          ))}
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      ${totalSpent.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className={cn("fill-muted-foreground", {
                        "fill-secondary-red": totalSpent > totalAmount,
                      })}
                    >
                      of ${totalAmount.toLocaleString()} limit
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
