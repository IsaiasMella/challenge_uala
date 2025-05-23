import { TIME_RANGES } from "@/constants/home/home";
import { ValueOf } from "next/dist/shared/lib/constants";
import moment from "moment";
import "moment/locale/es";

interface GetDateRange {
  startDate: moment.Moment;
  endDate: moment.Moment;
}

/**
 * Gets the date range for a given time range.
 * @param range - The time range to get the date range for.
 * @returns An object with the start and end dates for the given time range.
 */
export const getDateRange = (
  range: ValueOf<typeof TIME_RANGES>,
): GetDateRange => {
  const now = moment();
  const startDate = moment(now);

  switch (range) {
    case TIME_RANGES.DIARIO:
      startDate.startOf("day");
      return { startDate, endDate: moment(now).endOf("day") };
    case TIME_RANGES.SEMANAL:
      startDate.subtract(7, "days").startOf("day");
      return { startDate, endDate: moment(now).endOf("day") };
    case TIME_RANGES.MENSUAL:
      startDate.subtract(30, "days").startOf("day");
      return { startDate, endDate: moment(now).endOf("day") };
    default:
      return { startDate: moment(0), endDate: now };
  }
};
