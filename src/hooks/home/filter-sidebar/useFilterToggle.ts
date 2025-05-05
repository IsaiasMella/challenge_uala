'use client'

import { Dispatch, useCallback } from "react";

import { useSearchParams } from "next/navigation";

import { handleFilterDeactivation } from "@/features/helpers/list-transactions";

import { usePendingUrlUpdate } from "./usePendingUrlUpdate";

import type { FilterId, FilterState } from "@/types/sections/home/filterSidebar";

/**
 * Custom hook that manages filter toggle functionality.
 * 
 * This hook handles the toggling of filters, managing both the active state
 * and URL parameters when filters are deactivated. It provides a callback
 * function to toggle individual filters on/off.
 * 
 * @param {Dispatch<React.SetStateAction<FilterState>>} setFilterValues - Function to update filter values
 * @param {Dispatch<React.SetStateAction<Record<FilterId, boolean>>>} setActiveFilters - Function to update active filters state
 * 
 * @returns {Object} An object containing:
 *   @property {(id: FilterId) => void} switchToggle - Function to toggle a specific filter
 * 
 * @example
 * ```tsx
 * const { switchToggle } = useFilterToggle(setFilterValues, setActiveFilters);
 * ```
 */

export const useFilterToggle = (
    setFilterValues: Dispatch<React.SetStateAction<FilterState>>,
    setActiveFilters: Dispatch<React.SetStateAction<Record<FilterId, boolean>>>
) => {
    const searchParams = useSearchParams();
    const { setPendingUrlUpdate } = usePendingUrlUpdate();

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
