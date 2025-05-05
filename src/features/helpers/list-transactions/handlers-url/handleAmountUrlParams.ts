'use client'

import { DEFAULT_AMOUNT_VALUES, URL_PARAMS } from "@/constants/home/filters-sidebar/filters";

import type { FilterId } from "@/types/sections/home/filterSidebar";

/**
 * Updates URL parameters and active filters state for amount range filter changes
 * @param amount - Object containing min and max amount values
 * @param params - URLSearchParams object to update
 * @param setActiveFilters - State setter function for active filters
 */
export const handleAmountUrlParams = (
    amount: { min: number; max: number },
    params: URLSearchParams,
    setActiveFilters: React.Dispatch<React.SetStateAction<Record<FilterId, boolean>>>
) => {
    if (
        amount.min >= DEFAULT_AMOUNT_VALUES.AMOUNT.MIN ||
        amount.max <= DEFAULT_AMOUNT_VALUES.AMOUNT.MAX
    ) {
        params.set(URL_PARAMS.AMOUNT_MIN, amount.min.toString());
        params.set(URL_PARAMS.AMOUNT_MAX, amount.max.toString());
        setActiveFilters((prev) => ({ ...prev, amount: true }));
    } else {
        params.delete(URL_PARAMS.AMOUNT_MIN);
        params.delete(URL_PARAMS.AMOUNT_MAX);
    }
};