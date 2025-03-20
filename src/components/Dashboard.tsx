import { useState, useEffect } from "react";

import { CustomChart } from "@/components/CustomChart";
import { CustomTable } from "@/components/CustomTable";
import { MonthSelector } from "@/components/MonthSelector";
import {
  type Transaction,
  getDataPerMonth,
  calculateExpensesPerMonth,
} from "@/utils/selector";

export function Dashboard({
  currentMonth,
  currentYear,
}: {
  currentMonth: number;
  currentYear: number;
}) {
  const [data, setData] = useState<Transaction[]>([]);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  useEffect(() => {
    const transactions = getDataPerMonth(selectedMonth, selectedYear);
    setData(transactions);
    setTotalExpenses(calculateExpensesPerMonth(transactions));
  }, [selectedMonth, selectedYear]);

  return (
    <div className="p-4 h-screen grid gap-2 grid-cols-1">
      <div className="rounded-md flex flex-col justify-center items-center text-white font-mono  col-span-4 row-span-5 p-4 gap-4">
        <h2 className="text-2xl text-gray-800 dark:text-gray-300">Budget Dashboard</h2>
        <div className="rounded-md  flex flex-col w-full p-4 gap-4 h-1/3">
          <div className=" text-gray-700 p-4 rounded-md h-1/2 flex items-center justify-center">
            <MonthSelector
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              onUpdateMonth={setSelectedMonth}
              onUpdateYear={setSelectedYear}
            />
          </div>

          <div className="bg-gray-100 rounded-md h-1/2 flex items-center justify-center gap-4 p-4 text-gray-400 uppercase">
            total expense this month{" "}
            <span className="text-black text-2xl">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(totalExpenses)}
            </span>
          </div>
        </div>

        <div className="rounded-md w-full flex items-center justify-center gap-4 bg-gray-400 md:flex-row flex-col">
          <div className="rounded-md h-full w-full flex flex-col min-w-xs min-h-auto">
            <CustomChart transactions={data} />
          </div>
          <div className="rounded-md text-black h-full w-full flex items-center justify-center dark:bg-gray-950 dark:text-white bg-gray-50 min-w-xs min-h-80">
            <CustomTable transactions={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
