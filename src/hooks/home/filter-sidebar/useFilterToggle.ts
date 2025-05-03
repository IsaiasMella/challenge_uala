'use client'

import { Dispatch, useCallback } from "react";

import { useSearchParams } from "next/navigation";

import { handleFilterDeactivation } from "@/features/helpers/list-transactions";

import { usePendingUrlUpdate } from "./usePendingUrlUpdate";
import { useActiveFiltersFromUrl } from "./useActiveFiltersFromUrl";

import type { FilterId, FilterState } from "@/types/sections/home/filterSidebar";

/**
 * Custom hook that manages filter toggle functionality.
 * 
 * This hook handles the toggling of filters, managing both the active state
 * and URL parameters when filters are deactivated. It provides a callback
 * function to toggle individual filters on/off.
 * 
 * @param {Dispatch<React.SetStateAction<FilterState>>} setFilterValues - Function to update filter values
 * 
 * @returns {Object} An object containing:
 *   @property {(id: FilterId) => void} switchToggle - Function to toggle a specific filter
 * 
 * @example
 * ```tsx
 * const { switchToggle } = useFilterToggle(setFilterValues);
 * ```
 */

export const useFilterToggle = (
    setFilterValues: Dispatch<React.SetStateAction<FilterState>>,
) => {
    const searchParams = useSearchParams();

    const { setPendingUrlUpdate } = usePendingUrlUpdate();
    const { setActiveFilters } = useActiveFiltersFromUrl();

    const switchToggle = useCallback(
        (id: FilterId) => {
            setActiveFilters((prev) => {
                const newActiveFilters = {
                    ...prev,
                    [id]: !prev[id],
                };

                if (!newActiveFilters[id]) {
                    const params = new URLSearchParams(searchParams.toString());
                    handleFilterDeactivation(id, params, setFilterValues);
                    setPendingUrlUpdate({ params, id });
                }

                return newActiveFilters;
            });
        },
        [searchParams, setFilterValues, setPendingUrlUpdate, setActiveFilters]
    );

    return { switchToggle };
};
