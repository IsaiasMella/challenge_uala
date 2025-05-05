import type { Transaction } from "@/types/transactions";

/**
 * Filters an array of transactions based on a specified amount range
 * @param transactions - Array of transactions to filter
 * @param amountRange - Optional object containing minimum and maximum amount values
 * @param amountRange.min - Minimum amount to filter by
 * @param amountRange.max - Maximum amount to filter by
 * @returns Filtered array of transactions that fall within the specified amount range. If no range is provided, returns the original array
 */
export const filterByAmountRange = (
  transactions: Transaction[],
  amountRange?: { min: number; max: number },
) => {
  if (!amountRange) return transactions;

  return transactions.filter(
    (transaction) =>
      transaction.amount >= amountRange.min &&
      transaction.amount <= amountRange.max,
  );
};
