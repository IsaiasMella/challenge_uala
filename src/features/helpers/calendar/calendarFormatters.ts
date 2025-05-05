/**
 * Object containing formatter functions for calendar display
 */
export const calendarFormatters = {
    /**
     * Formats a weekday name to Spanish short format with first letter capitalized
     * @param weekday - Date object representing the weekday
     * @returns Formatted weekday name (e.g., "Lun" for Monday)
     */
    formatWeekdayName: (weekday: Date) => {
        const dayName = weekday.toLocaleString("es", { weekday: "short" });
        return dayName.charAt(0).toUpperCase() + dayName.slice(1);
    },
};