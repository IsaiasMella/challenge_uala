import { useMemo } from "react";
import { Transaction } from "@/types/transactions";
import { TIME_RANGES } from "@/constants/home/home";
import moment from "moment";
import "moment/locale/es";
import { useSearchParams } from "next/navigation";

/**
 * Custom hook that filters transactions based on various criteria.
 * 
 * This hook filters transactions based on a time range and URL search parameters.
 * It handles filtering by date range, card type, specific dates, amount,
 * installments, and payment method.
 * 
 * @param {Transaction[]} transactions - Array of transactions to filter
 * @param {string} range - Time range to filter by (daily, weekly, monthly)
 * 
 * @returns {Transaction[]} Filtered array of transactions that match all criteria
 * 
 * @example
 * ```tsx
 * const filteredTransactions = useFilteredTransactions(transactions, 'weekly');
 * ```
 */

export const useFilteredTransactions = (
  transactions: Transaction[],
  range: string,
) => {
  const searchParams = useSearchParams();

  const getDateRange = (range: string) => {
    const now = moment();
    const startDate = moment(now);

    switch (range) {
      case TIME_RANGES.DIARIO:
        startDate.startOf("day");
        return { startDate, endDate: moment(now).endOf("day") };
      case TIME_RANGES.SEMANAL:
        startDate.subtract(6, "days").startOf("day");
        return { startDate, endDate: moment(now).endOf("day") };
      case TIME_RANGES.MENSUAL:
        startDate.startOf("month");
        return { startDate, endDate: moment(now).endOf("day") };
      default:
        return { startDate: moment(0), endDate: now };
    }
  };

  return useMemo(() => {
    if (!transactions) return [];

    const { startDate, endDate } = getDateRange(range);

    const selectedCards =
      searchParams.get("card")?.split(",").filter(Boolean) || [];
    const selectedDate =
      searchParams.get("date")?.split(",").filter(Boolean) || [];
    const selectedAmount =
      searchParams.get("amount")?.split(",").filter(Boolean) || [];
    const selectedInstallments =
      searchParams.get("installments")?.split(",").filter(Boolean) || [];
    const selectedPaymentMethod =
      searchParams.get("paymentMethod")?.split(",").filter(Boolean) || [];

    return transactions.filter((transaction) => {
      // Date range filter
      const transactionDate = moment(transaction.createdAt);
      const isInDateRange = transactionDate.isBetween(
        startDate,
        endDate,
        undefined,
        "[]",
      );
      if (!isInDateRange) return false;

      // Card filter
      if (selectedCards.length > 0 && !selectedCards.includes("todas")) {
        if (!selectedCards.includes(transaction.card.toLowerCase()))
          return false;
      }

      // Specific date filter
      if (selectedDate.length > 0) {
        if (
          !selectedDate.includes(
            moment(transaction.createdAt).format("YYYY-MM-DD"),
          )
        )
          return false;
      }

      // Amount filter
      if (selectedAmount.length > 0) {
        if (!selectedAmount.includes(transaction.amount.toString()))
          return false;
      }

      // Installments filter
      if (selectedInstallments.length > 0) {
        if (!selectedInstallments.includes(transaction.installments.toString()))
          return false;
      }

      // Payment method filter
      if (selectedPaymentMethod.length > 0) {
        if (!selectedPaymentMethod.includes(transaction.paymentMethod))
          return false;
      }

      return true;
    });
  }, [transactions, range, searchParams]);
};
