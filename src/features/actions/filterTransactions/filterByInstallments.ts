import type { Transaction } from "@/types/transactions";

/**
 * Filters an array of transactions based on specified installment values
 * @param transactions - Array of transactions to filter
 * @param installments - Optional array of installment values to filter by
 * @returns Filtered array of transactions that match the specified installment values. If no installments are provided, or if "todas" (all) is included, returns the original array
 */
export const filterByInstallments = (
  transactions: Transaction[],
  installments?: string[],
) => {
  if (
    !installments ||
    installments.length === 0 ||
    installments.includes("todas")
  )
    return transactions;

  return transactions.filter((transaction) =>
    installments.includes(transaction.installments.toString()),
  );
};
