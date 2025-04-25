import { useMemo } from "react";
import { Transaction } from "@/types/transactions";
import { TIME_RANGES } from "@/constants";

export const useFilteredTransactions = (transactions: Transaction[], range: string) => {
  const getDateRange = (range: string) => {
    const now = new Date();
    const startDate = new Date(now);

    switch (range) {
      case TIME_RANGES.DIARIO:
        startDate.setHours(0, 0, 0, 0);
        return { startDate, endDate: new Date(now.setHours(23, 59, 59, 999)) };
      case TIME_RANGES.SEMANAL:
        startDate.setDate(now.getDate() - 6);
        startDate.setHours(0, 0, 0, 0);
        return { startDate, endDate: new Date(now.setHours(23, 59, 59, 999)) };
      case TIME_RANGES.MENSUAL:
        startDate.setDate(1);
        startDate.setHours(0, 0, 0, 0);
        return { startDate, endDate: new Date(now.setHours(23, 59, 59, 999)) };
      default:
        return { startDate: new Date(0), endDate: now };
    }
  };

  return useMemo(() => {
    if (!transactions) return [];

    const { startDate, endDate } = getDateRange(range);

    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.createdAt);
      return transactionDate >= startDate && transactionDate <= endDate;
    });
  }, [transactions, range]);
};
