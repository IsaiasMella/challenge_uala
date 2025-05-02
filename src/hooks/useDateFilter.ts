import { useState, useEffect, useCallback } from "react";
import { DateRange } from "react-day-picker";
import { FilterComponentProps } from "@/types/sections/home/filterSidebar";

interface UseDateFilterProps {
    committedFilters: FilterComponentProps<DateRange | undefined>['committedFilters'];
    onApply: FilterComponentProps<DateRange | undefined>['onApply'];
}

export const useDateFilter = ({ committedFilters, onApply }: UseDateFilterProps) => {
    const [selectedDate, setSelectedDate] = useState<DateRange | undefined>(committedFilters.date);

    useEffect(() => {
        const { date } = committedFilters;
        const hasDateSelection = date?.from || date?.to;

        if (hasDateSelection && date) {
            setSelectedDate({
                from: date.from,
                to: date.to || date.from
            });
        }
    }, [committedFilters.date]);

    const handleDateSelect = useCallback((dateRange: DateRange | undefined) => {
        setSelectedDate(dateRange);

        if (dateRange?.from) {
            onApply({
                ...committedFilters,
                date: {
                    from: dateRange.from,
                    to: dateRange.to || dateRange.from
                }
            });
        }
    }, [committedFilters, onApply]);

    const handleClearSelection = useCallback(() => {
        setSelectedDate(undefined);
        onApply({
            ...committedFilters,
            date: undefined
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
        formatWeekdayName
    };
}; 