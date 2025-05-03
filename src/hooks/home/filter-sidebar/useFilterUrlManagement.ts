'use client'

import { Dispatch, SetStateAction, useCallback } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import {
    handleAmountUrlParams,
    handleCardUrlParams,
    handleDateRangeUrlParams,
    handleInstallmentsUrlParams,
    handlePaymentMethodUrlParams
} from "@/features/helpers/list-transactions";

import type { FilterId, FilterState } from "@/types/sections/home/filterSidebar";

/**
 * Custom hook that manages filter URL parameters and their updates.
 * 
 * This hook handles the synchronization between filter values and URL parameters,
 * providing functionality to update the URL when filters are submitted. It processes
 * different types of filters (date range, card, installments, amount, payment method)
 * and updates the URL accordingly.
 * 
 * @param {FilterState} filterValues - Current state of all filter values
 * @param {Dispatch<SetStateAction<Record<FilterId, boolean>>>} setActiveFilters - Function to update active filters state
 * 
 * @returns {Object} An object containing:
 *   @property {(event: React.FormEvent<HTMLFormElement>) => void} onSubmitFilters - Form submission handler that updates URL parameters
 * 
 * @example
 * ```tsx
 * const { onSubmitFilters } = useFilterUrlManagement(filterValues, setActiveFilters);
 * ```
 */

export const useFilterUrlManagement = (
    filterValues: FilterState,
    setActiveFilters: Dispatch<SetStateAction<Record<FilterId, boolean>>>,
) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const onSubmitFilters = useCallback(
        (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const params = new URLSearchParams(searchParams.toString());

            handleDateRangeUrlParams(filterValues.date, params, setActiveFilters);
            handleCardUrlParams(filterValues.card, params, setActiveFilters);
            handleInstallmentsUrlParams(filterValues.installments, params, setActiveFilters);
            handleAmountUrlParams(filterValues.amount, params, setActiveFilters);
            handlePaymentMethodUrlParams(filterValues.paymentMethod, params, setActiveFilters);

            router.push(`?${params.toString()}`, { scroll: false });
        },
        [filterValues, router, searchParams, setActiveFilters]
    );

    return { onSubmitFilters };
};