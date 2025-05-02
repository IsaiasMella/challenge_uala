import moment from "moment";
import type { Transaction } from "@/types/transactions";

export const filterByDateRange = (transactions: Transaction[], dateRange?: { from: Date; to: Date }) => {
  if (!dateRange) return transactions;
  
  return transactions.filter((transaction) => {
    const transactionDate = moment(transaction.createdAt);
    const fromDate = moment(dateRange.from).startOf('day');
    const toDate = moment(dateRange.to).endOf('day');
    return transactionDate.isBetween(fromDate, toDate, undefined, '[]');
  });
}; 