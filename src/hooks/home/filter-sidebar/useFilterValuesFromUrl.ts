'use client'

import { useState } from "react";

import { useSearchParams } from "next/navigation";

import { parseFilterStateFromURLParams } from "@/features/helpers/list-transactions";

import type { FilterState } from "@/types/sections/home/filterSidebar";

/**
 * Custom hook that handles filter state based on URL parameters.
 * 
 * This hook extracts filter values from URL search parameters,
 * parses them into a valid filter state and maintains that state in memory.
 * 
 * @returns {Object} An object containing:
 *   @property {FilterState} filterValues - The current filter state
 *   @property {React.Dispatch<React.SetStateAction<FilterState>>} setFilterValues - Function to update the filter state
 * 
 * @example
 * ```tsx
 * const { filterValues, setFilterValues } = useFilterValuesFromUrl();
 * ```
 */
export const useFilterValuesFromUrl = () => {
    const searchParams = useSearchParams();

    const url = new URLSearchParams(searchParams.toString())
    const paredFilters = parseFilterStateFromURLParams(url)

    const [filterValues, setFilterValues] = useState<FilterState>(paredFilters);

    return { filterValues, setFilterValues };
};