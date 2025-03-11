"use client";

import { useEffect, useState } from "react";
import { Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  //ChartTooltip,
  //ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  type DataChart, type Transaction, calculateExpensesByCategory
} from "@/utils/selector";



export function CustomChart({ transactions }: { transactions: Transaction[] }) {

  const [chartInfo, setChartInfo] = useState<DataChart[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({} as ChartConfig);

  useEffect(() => {
    const healthExpense = calculateExpensesByCategory(transactions, "Health");
    const giftsExpense = calculateExpensesByCategory(transactions, "Gifts");
    const groceriesExpense = calculateExpensesByCategory(transactions, "Groceries");
    const shoppingExpense = calculateExpensesByCategory(transactions, "Shopping");
    const educationExpense = calculateExpensesByCategory(transactions, "Education");
    const entertainmentExpense = calculateExpensesByCategory(transactions, "Entertainment");
    const travelExpense = calculateExpensesByCategory(transactions, "Travel");
    const utilitiesExpense = calculateExpensesByCategory(transactions, "Utilities");
    const homeExpense = calculateExpensesByCategory(transactions, "Home");
    const diningExpense = calculateExpensesByCategory(transactions, "Dining");
    setChartInfo([
      {
        category: "health",
        expenses: healthExpense,
        fill: "var(--chart-health)",
      },
      { category: "gifts", expenses: giftsExpense, fill: "var(--chart-gifts)" },
      {
        category: "groceries",
        expenses: groceriesExpense,
        fill: "var(--chart-groceries)",
      },
      {
        category: "shopping",
        expenses: shoppingExpense,
        fill: "var(--chart-shopping)",
      },
      {
        category: "education",
        expenses: educationExpense,
        fill: "var(--chart-education)",
      },
      {
        category: "entertainment",
        expenses: entertainmentExpense,
        fill: "var(--chart-entertainment)",
      },
      {
        category: "travel",
        expenses: travelExpense,
        fill: "var(--chart-travel)",
      },
      {
        category: "utilities",
        expenses: utilitiesExpense,
        fill: "var(--chart-utilities)",
      },
      { category: "home", expenses: homeExpense, fill: "var(--chart-home)" },
      {
        category: "dining",
        expenses: diningExpense,
        fill: "var(--chart-dining)",
      },
    ]);

    const localChartConfig = {
      expenses: {
        label: "Expenses",
      },
      health: {
        label: `Health ${healthExpense.toFixed(2)}`,
        color: "hsl(var(--chart-health))",
      },
      gifts: {
        label: `Gifts ${giftsExpense.toFixed(2)}`,
        color: "hsl(var(--chart-gifts))",
      },
      groceries: {
        label: `Groceries ${groceriesExpense.toFixed(2)}`,
        color: "hsl(var(--chart-groceries))",
      },
      shopping: {
        label: `Shopping ${shoppingExpense.toFixed(2)}`,
        color: "hsl(var(--chart-shopping))",
      },
      education: {
        label: `Education ${educationExpense.toFixed(2)}`,
        color: "hsl(var(--chart-education))",
      },
      entertainment: {
        label: `Entertainment ${entertainmentExpense.toFixed(2)}`,
        color: "hsl(var(--chart-entertainment))",
      },
      travel: {
        label: `Travel ${travelExpense.toFixed(2)}`,
        color: "hsl(var(--chart-travel))",
      },
      utilities: {
        label: `Utilities ${utilitiesExpense.toFixed(2)}`,
        color: "hsl(var(--chart-utilities))",
      },
      home: {
        label: `Home ${homeExpense.toFixed(2)}`,
        color: "hsl(var(--chart-home))",
      },
      dining: {
        label: `Dining ${diningExpense.toFixed(2)}`,
        color: "hsl(var(--chart-dining))",
      },
    } satisfies ChartConfig;
    setChartConfig(localChartConfig);
  }, [transactions]);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pt-2">
        <CardTitle className="uppercase text-gray-300">
          expenses by category
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[370px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            {/* used to display a tooltip <ChartTooltip content={<ChartTooltipContent hideLabel />} /> */}
            {/* used to display custom indicator <Pie data={chartInfo} dataKey="expenses" label nameKey="category" /> */}
            <Pie data={chartInfo} dataKey="expenses" nameKey="category" />

            <ChartLegend
              content={<ChartLegendContent nameKey="category" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
