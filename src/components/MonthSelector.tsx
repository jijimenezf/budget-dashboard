"use client";

import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const MONTH_LIST = [
  { id: "1", description: "January" },
  { id: "2", description: "February" },
  { id: "3", description: "March" },
  { id: "4", description: "April" },
  { id: "5", description: "May" },
  { id: "6", description: "June" },
  { id: "7", description: "July" },
  { id: "8", description: "August" },
  { id: "9", description: "September" },
  { id: "10", description: "October" },
  { id: "11", description: "November" },
  { id: "12", description: "December" },
];

export function MonthSelector({ selectedMonth, selectedYear, onUpdateMonth, onUpdateYear }: 
  { selectedMonth: number; selectedYear: number; onUpdateMonth: (month: number) => void, onUpdateYear: (year: number) => void }) {
  const [selected, setSelected] = useState(selectedMonth);
  const [currentYear, setCurrentYear] = useState(selectedYear);

  const handleChange = (index: number) => {
    if (index < 1) {
      const updateYear = currentYear - 1;
      const updateMonth = 12;
      setCurrentYear(updateYear);
      setSelected(updateMonth);
      onUpdateYear(updateYear);
      onUpdateMonth(updateMonth);
      return;
    }
    if (index > 12) {
      const updateYear = currentYear + 1;
      const updateMonth = 1;
      setCurrentYear(updateYear);
      setSelected(updateMonth);
      onUpdateYear(updateYear);
      onUpdateMonth(updateMonth);
      return;
    }
    setSelected(index);
    onUpdateMonth(index);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => handleChange(selected - 1)} />
        </PaginationItem>
        <span className="text-blue-800 text-2xl">
          {MONTH_LIST[selected - 1].description}
        </span>
        <span className="text-blue-800 text-2xl">{currentYear}</span>
        <PaginationItem>
          <PaginationNext onClick={() => handleChange(selected + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
