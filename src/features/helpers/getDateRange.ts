import { TIME_RANGES } from "@/constants";
import { ValueOf } from "next/dist/shared/lib/constants";

/**
 * Gets the date range for a given time range.
 * @param range - The time range to get the date range for.
 * @returns An object with the start and end dates for the given time range.
 */

interface GetDateRange {
  startDate: Date;
  endDate: Date;
}

export const getDateRange = (range: ValueOf<typeof TIME_RANGES>): GetDateRange => {
  const now = new Date();
  const startDate = new Date(now);

  switch (range) {
    case TIME_RANGES.DIARIO:
      startDate.setHours(0, 0, 0, 0);
      return { startDate, endDate: new Date(now.setHours(23, 59, 59, 999)) };
    case TIME_RANGES.SEMANAL:
      startDate.setDate(now.getDate() - 6);
      startDate.setHours(0, 0, 0, 0);
      return { startDate, endDate: new Date(now.setHours(23, 59, 59, 999)) };
    case TIME_RANGES.MENSUAL:
      startDate.setDate(1);
      startDate.setHours(0, 0, 0, 0);
      return { startDate, endDate: new Date(now.setHours(23, 59, 59, 999)) };
    default:
      return { startDate: new Date(0), endDate: now };
  }
};
