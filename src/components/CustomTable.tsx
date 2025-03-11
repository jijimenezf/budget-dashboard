import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { type Transaction, ITEMS_PER_PAGE } from "@/utils/selector";

export function CustomTable({ transactions }: { transactions: Transaction[] }) {

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);
    const [data, setData] = useState<Transaction[]>([]);

    useEffect(() => {
        setData(transactions.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE));
    }, [currentPage, transactions]);
  return (
    <Table>
      <TableCaption className="uppercase">transactions this month</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] uppercase">payee</TableHead>
          <TableHead className="uppercase">date</TableHead>
          <TableHead className="uppercase">Amount</TableHead>
          <TableHead className="uppercase">category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((payment, index) => (
          <TableRow key={`payment-${index}-${payment.payee}`}>
            <TableCell className="font-medium">{payment.payee}</TableCell>
            <TableCell>{payment.date}</TableCell>
            <TableCell>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(payment.amount)}
            </TableCell>
            <TableCell>{payment.category}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableCaption className="uppercase">
        <Pagination>
          <PaginationContent>
            {Array.from({ length: totalPages }).map((_, index) => (
              <PaginationItem key={`page-${index}`}>
                <PaginationLink
                 isActive={currentPage === index + 1}
                 onClick={() => setCurrentPage(index + 1)}>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            
          </PaginationContent>
        </Pagination>
      </TableCaption>
    </Table>
  );
}
