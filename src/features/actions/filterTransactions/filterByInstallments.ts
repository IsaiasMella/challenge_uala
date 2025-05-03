import type { Transaction } from "@/types/transactions";

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
