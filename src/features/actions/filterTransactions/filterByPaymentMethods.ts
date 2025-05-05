import type { Transaction } from "@/types/transactions";

/**
 * Filters an array of transactions based on specified payment methods
 * @param transactions - Array of transactions to filter
 * @param paymentMethods - Optional array of payment methods to filter by
 * @returns Filtered array of transactions that match the specified payment methods. If no payment methods are provided, returns the original array
 */
export const filterByPaymentMethods = (
  transactions: Transaction[],
  paymentMethods?: string[],
) => {
  if (!paymentMethods || paymentMethods.length === 0) return transactions;

  const normalizedMethods = paymentMethods.map(method => method.toLowerCase());
  return transactions.filter((transaction) =>
    normalizedMethods.includes(transaction.paymentMethod.toLowerCase()),
  );
};
