import moment from "moment";

/**
 * Object defining the date range for disabled calendar days
 * All dates after tomorrow and before 2026-01-01 are disabled
 * This is based on the requirement that all transactions belong to 2025
 */
export const disabledCalendarDays = {
  from: moment().add(1, "days").toDate(),
  to: moment("2026-01-01").toDate(), // All dates belong to 2025, as indicated in the PDF
};
