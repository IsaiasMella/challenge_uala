'use client'

import { useState } from "react";

import { useSearchParams } from "next/navigation";

import { parseInitialActiveFilters } from "@/features/helpers/list-transactions";

import type { FilterId } from "@/types/sections/home/filterSidebar";

/**
 * Custom hook that manages the state of active filters based on URL parameters.
 * 
 * This hook extracts active filters from URL search parameters,
 * parses them and maintains their state in memory. It allows dynamically
 * activating and deactivating filters.
 * 
 * @returns {Object} An object containing:
 *   @property {Record<FilterId, boolean>} activeFilters - The current state of active filters
 *   @property {React.Dispatch<React.SetStateAction<Record<FilterId, boolean>>>} setActiveFilters - Function to update active filters
 * 
 * @example
 * ```tsx
 * const { activeFilters, setActiveFilters } = useActiveFiltersFromUrl();
 * ```
 */

export const useActiveFiltersFromUrl = () => {
    const searchParams = useSearchParams();

    const url = new URLSearchParams(searchParams.toString())
    const parsedActiveFilters = parseInitialActiveFilters(url)

    const [activeFilters, setActiveFilters] = useState<
    Record<FilterId, boolean>>(parsedActiveFilters)

    return { activeFilters, setActiveFilters };
};