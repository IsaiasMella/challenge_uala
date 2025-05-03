'use client'

import { useState, useEffect, useCallback } from "react";
import { DateRange } from "react-day-picker";
import { FilterComponentProps } from "@/types/sections/home/filterSidebar";

/**
 * Custom hook that manages date range filter functionality.
 * 
 * This hook handles the state and operations related to date range selection,
 * including selecting dates, clearing selection, and formatting weekday names.
 * It syncs with committed filters and provides callbacks for date updates.
 * 
 * @param {Object} props - Hook properties
 * @param {Object} props.committedFilters - Currently committed filter values
 * @param {Function} props.onApply - Callback function to apply new filter values
 * 
 * @returns {Object} An object containing:
 *   @property {DateRange | undefined} selectedDate - Currently selected date range
 *   @property {(dateRange: DateRange | undefined) => void} handleDateSelect - Function to handle date selection
 *   @property {() => void} handleClearSelection - Function to clear the date selection
 *   @property {(weekday: Date) => string} formatWeekdayName - Function to format weekday names
 * 
 * @example
 * ```tsx
 * const { selectedDate, handleDateSelect, handleClearSelection, formatWeekdayName } = 
 *   useDateFilter({ committedFilters, onApply });
 * ```
 */

interface UseDateFilterProps {
  committedFilters: FilterComponentProps["committedFilters"];
  onApply: FilterComponentProps["onApply"];
}

export const useDateFilter = ({
  committedFilters,
  onApply,
}: UseDateFilterProps) => {
  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>(
    committedFilters.date,
  );

  useEffect(() => {
    const { date } = committedFilters;
    const hasDateSelection = date?.from || date?.to;

    if (hasDateSelection && date) {
      setSelectedDate({
        from: date.from,
        to: date.to || date.from,
      });
    }
  }, [committedFilters.date, committedFilters]);

  const handleDateSelect = useCallback(
    (dateRange: DateRange | undefined) => {
      setSelectedDate(dateRange);

      if (dateRange?.from) {
        onApply({
          ...committedFilters,
          date: {
            from: dateRange.from,
            to: dateRange.to || dateRange.from,
          },
        });
      }
    },
    [committedFilters, onApply],
  );

  const handleClearSelection = useCallback(() => {
    setSelectedDate(undefined);
    onApply({
      ...committedFilters,
      date: undefined,
    });
  }, [committedFilters, onApply]);

  const formatWeekdayName = useCallback((weekday: Date) => {
    const dayName = weekday.toLocaleString("es", { weekday: "short" });
    return dayName.charAt(0).toUpperCase() + dayName.slice(1);
  }, []);

  return {
    selectedDate,
    handleDateSelect,
    handleClearSelection,
    formatWeekdayName,
  };
};
