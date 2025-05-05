import moment from "moment";

import type { Transaction } from "@/types/transactions";

/**
 * Filters an array of transactions based on a date range
 * @param transactions - Array of transactions to filter
 * @param fromDate - Start date of the range (inclusive)
 * @param toDate - End date of the range (inclusive, adjusted to end of day)
 * @returns Filtered array of transactions that fall within the specified date range
 */
export const filterTransactionsByDateRange = (
    transactions: Transaction[],
    fromDate: moment.Moment,
    toDate: moment.Moment
  ): Transaction[] => {
    return transactions.filter((transaction) => {
      const transactionDate = moment(transaction.createdAt);
      const adjustedToDate = moment(toDate).endOf('day');

      return transactionDate.isBetween(fromDate, adjustedToDate, undefined, '[]');
    });
  };