import { SEPARATORS, URL_PARAMS } from "@/constants/home/filters-sidebar/filters";

import type { FilterId } from "@/types/sections/home/filterSidebar";

/**
 * Updates URL parameters and active filters state for installments filter changes
 * @param installments - Array of selected installment values
 * @param params - URLSearchParams object to update
 * @param setActiveFilters - State setter function for active filters
 */
export const handleInstallmentsUrlParams = (
    installments: string[],
    params: URLSearchParams,
    setActiveFilters: React.Dispatch<React.SetStateAction<Record<FilterId, boolean>>>
  ) => {
    if (installments.length > 0) {
      params.set(URL_PARAMS.INSTALLMENTS, installments.join(SEPARATORS.ARRAY));
      setActiveFilters((prev) => ({ ...prev, installments: true }));
    } else {
      params.delete(URL_PARAMS.INSTALLMENTS);
    }
  };