import type { Transaction } from "@/types/transactions";

export const filterByAmountRange = (transactions: Transaction[], amountRange?: { min: number; max: number }) => {
  if (!amountRange) return transactions;
  
  return transactions.filter((transaction) =>
    transaction.amount >= amountRange.min && transaction.amount <= amountRange.max
  );
}; 