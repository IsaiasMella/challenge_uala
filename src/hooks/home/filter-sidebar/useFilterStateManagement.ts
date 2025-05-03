'use client'

import { Dispatch, useCallback } from "react";

import { INITIAL_ACTIVE_FILTERS_STATE, INITIAL_FILTERS_STATE } from "@/constants/home/filters-sidebar/filters";

import type { FilterId, FilterState } from "@/types/sections/home/filterSidebar";

/**
 * Custom hook that manages filter state and provides functions to modify it.
 * 
 * This hook handles the state management for both filter values and active filters,
 * providing functions to update individual filters and reset all filters to their initial state.
 * 
 * @param {Dispatch<React.SetStateAction<FilterState>>} setFilterValues - Function to update filter values
 * @param {Dispatch<React.SetStateAction<Record<FilterId, boolean>>>} setActiveFilters - Function to update active filters state
 * 
 * @returns {Object} An object containing:
 *   @property {(id: FilterId, value: unknown) => void} onChangeFilters - Function to update a specific filter
 *   @property {() => void} clearFilters - Function to reset all filters to their initial state
 * 
 * @example
 * ```tsx
 * const { onChangeFilters, clearFilters } = useFilterStateManagement(setFilterValues, setActiveFilters);
 * ```
 */
export const useFilterStateManagement = (
    setFilterValues: Dispatch<React.SetStateAction<FilterState>>,
    setActiveFilters: Dispatch<React.SetStateAction<Record<FilterId, boolean>>>
  ) => {
    const onChangeFilters = useCallback((id: FilterId, value: unknown) => {
      setFilterValues((prev) => ({
        ...prev,
        [id]: value,
      }));
    }, [setFilterValues]);
  
    const clearFilters = useCallback(() => {
      setActiveFilters(INITIAL_ACTIVE_FILTERS_STATE);
      setFilterValues(INITIAL_FILTERS_STATE);
    }, [setActiveFilters, setFilterValues]);
  
    return { onChangeFilters, clearFilters };
  };