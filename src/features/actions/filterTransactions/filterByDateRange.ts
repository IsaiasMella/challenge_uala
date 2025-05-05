import moment, { Moment } from "moment";
import type { Transaction } from "@/types/transactions";

type DateInput = Date | string | Moment;

/**
 * Filters an array of transactions based on a date range
 * @param transactions - Array of transactions to filter
 * @param dateRange - Optional object containing 'from' and 'to' dates to filter by
 * @returns Filtered array of transactions that fall within the specified date range.
 * If no date range is provided, returns the original array unfiltered.
 */
export const filterByDateRange = (
  transactions: Transaction[],
  dateRange?: { from: DateInput; to: DateInput },
): Transaction[] => {
  if (!dateRange) return transactions;

  const fromUtc = moment.utc(dateRange.from).startOf("day");
  const toUtc = moment.utc(dateRange.to).endOf("day");

  return transactions.filter(({ createdAt }) => {
    const txUtc = moment.utc(createdAt);
    return txUtc.isSameOrAfter(fromUtc) && txUtc.isSameOrBefore(toUtc);
  });
};
