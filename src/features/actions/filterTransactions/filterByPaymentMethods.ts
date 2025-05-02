import type { Transaction } from "@/types/transactions";

export const filterByPaymentMethods = (transactions: Transaction[], paymentMethods?: string[]) => {
  if (!paymentMethods || paymentMethods.length === 0) return transactions;
  
  return transactions.filter((transaction) => 
    paymentMethods.includes(transaction.paymentMethod.toLowerCase())
  );
}; 