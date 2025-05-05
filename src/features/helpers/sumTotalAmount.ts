import { ValueOf } from "next/dist/shared/lib/constants";

import { getDateRange } from "./getDateRange";
import { formatAmount } from "../utils/formatAmount";

import { TIME_RANGES } from "@/constants/home/home";
import type { Transaction } from "@/types/transactions";
import { filterByDateRange } from "../actions/filterTransactions/filterByDateRange";

interface TotalAmount {
  integer: string;
  decimal: string;
}

interface TotalAmountParams {
  filteredTransactions: Transaction[];
  selectedRange: ValueOf<typeof TIME_RANGES>;
}

/**
 * Calculates the total amount of transactions for a given time range.
 * @param filteredTransactions - The transactions to calculate the total amount for.
 * @param selectedRange - The time range to calculate the total amount for.
 * @returns An object with the integer and decimal parts of the total amount.
 */

export const sumTotalAmount = ({
  filteredTransactions,
  selectedRange,
}: TotalAmountParams): TotalAmount => {
  if (!filteredTransactions) return { integer: "0", decimal: "00" };

  const { startDate, endDate } = getDateRange(selectedRange);
  const filtered = filterByDateRange(filteredTransactions, { from: startDate.toDate(), to: endDate.toDate() });
  
  const total = filtered.reduce((acc, transaction) => acc + transaction.amount, 0);

  return formatAmount(total);
};
