'use client'

import { Dispatch, SetStateAction } from "react";

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
 * Hook personalizado para gestionar y sincronizar los filtros con los parámetros de la URL.
 *
 * Este hook actualiza los parámetros de la URL según los valores de los filtros activos,
 * permitiendo mantener el estado de los filtros en la URL y facilitando la navegación y el share de estados.
 * Procesa distintos tipos de filtros (rango de fechas, tarjeta, cuotas, monto y método de pago)
 * y actualiza la URL en consecuencia. Si el filtro de monto está activo, también lo procesa.
 *
 * @param {FilterState} filterValues - Estado actual de todos los filtros.
 * @param {Dispatch<SetStateAction<Record<FilterId, boolean>>>} setActiveFilters - Setter para actualizar el estado de filtros activos.
 * @param {Record<FilterId, boolean>=} activeFilters - (Opcional) Estado actual de los filtros activos.
 *
 * @returns {Object} Un objeto con:
 *   @property {() => void} onSubmitFilters - Handler para actualizar los parámetros de la URL según los filtros seleccionados.
 *
 * @example
 * ```tsx
 * const { onSubmitFilters } = useFilterUrlManagement(filterValues, setActiveFilters, activeFilters);
 * ```
 */

export const useFilterUrlManagement = (
    filterValues: FilterState,
    setActiveFilters: Dispatch<SetStateAction<Record<FilterId, boolean>>>,
    activeFilters?: Record<FilterId, boolean>
) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const onSubmitFilters = () => {
        const params = new URLSearchParams(searchParams.toString());

        handleDateRangeUrlParams(filterValues.date, params, setActiveFilters);
        handleCardUrlParams(filterValues.card, params, setActiveFilters);
        handleInstallmentsUrlParams(filterValues.installments, params, setActiveFilters);
        if (activeFilters?.amount) { handleAmountUrlParams(filterValues.amount, params, setActiveFilters) }
        handlePaymentMethodUrlParams(filterValues.paymentMethod, params, setActiveFilters);


        router.push(`?${params.toString()}`, { scroll: false });
    }

    return { onSubmitFilters };
};