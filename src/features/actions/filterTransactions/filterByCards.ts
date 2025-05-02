import type { Transaction } from "@/types/transactions";

export const filterByCards = (transactions: Transaction[], cards?: string[]) => {
  if (!cards || cards.length === 0 || cards.includes('todas')) return transactions;
  
  return transactions.filter((transaction) => 
    cards.includes(transaction.card.toLowerCase())
  );
}; 