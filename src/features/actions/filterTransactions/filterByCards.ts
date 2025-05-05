import type { Transaction } from "@/types/transactions";

/**
 * Filters an array of transactions based on specified card types
 * @param transactions - Array of transactions to filter
 * @param cards - Optional array of card types to filter by
 * @returns Filtered array of transactions that match the specified card types. If no cards are provided, or if "todas" (all) is included, returns the original array
 */
export const filterByCards = (
  transactions: Transaction[],
  cards?: string[],
) => {
  if (!cards || cards.length === 0 || cards.includes("todas"))
    return transactions;

  const normalizedCards = cards.map(card => card.toLowerCase());
  return transactions.filter((transaction) =>
    normalizedCards.includes(transaction.card.toLowerCase()),
  );
};
