import { ValueOf } from "next/dist/shared/lib/constants";

import { getDateRange } from "./getDateRange";
import { formatAmount } from "../utils/formatAmount";

import { TIME_RANGES } from "@/constants";
import type { Transaction } from "@/types/transactions";

interface TotalAmount {
  integer: string;
  decimal: string;
}

interface TotalAmountParams {
  transactions: Transaction[];
  selectedRange: ValueOf<typeof TIME_RANGES>;
}

/**
 * Calculates the total amount of transactions for a given time range.
 * @param transactions - The transactions to calculate the total amount for.
 * @param selectedRange - The time range to calculate the total amount for.
 * @returns An object with the integer and decimal parts of the total amount.
 */

export const sumTotalAmount = ({ transactions, selectedRange }: TotalAmountParams): TotalAmount => {
  if (!transactions) return { integer: "0", decimal: "00" };

  const { startDate, endDate } = getDateRange(selectedRange);

  const filteredTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.createdAt);
    return transactionDate >= startDate && transactionDate <= endDate;
  });

  const total = filteredTransactions.reduce((acc, transaction) => {
    return acc + (transaction.amount || 0);
  }, 0);

  return formatAmount(total);
};
