import { useMemo } from "react";
import { Transaction } from "@/types/transactions";
import { TIME_RANGES } from "@/constants";
import moment from "moment";
import "moment/locale/es";

export const useFilteredTransactions = (transactions: Transaction[], range: string) => {
  const getDateRange = (range: string) => {
    const now = moment();
    const startDate = moment(now);

    switch (range) {
      case TIME_RANGES.DIARIO:
        startDate.startOf('day');
        return { startDate, endDate: moment(now).endOf('day') };
      case TIME_RANGES.SEMANAL:
        startDate.subtract(6, 'days').startOf('day');
        return { startDate, endDate: moment(now).endOf('day') };
      case TIME_RANGES.MENSUAL:
        startDate.startOf('month');
        return { startDate, endDate: moment(now).endOf('day') };
      default:
        return { startDate: moment(0), endDate: now };
    }
  };

  return useMemo(() => {
    if (!transactions) return [];

    const { startDate, endDate } = getDateRange(range);

    return transactions.filter((transaction) => {
      const transactionDate = moment(transaction.createdAt);
      return transactionDate.isBetween(startDate, endDate, undefined, '[]');
    });
  }, [transactions, range]);
};
