import { SEPARATORS, URL_PARAMS } from "@/constants/home/filters-sidebar/filters";
import type { FilterId } from "@/types/sections/home/filterSidebar";

/**
 * Updates URL parameters and active filters state for payment method filter changes
 * @param paymentMethods - Array of selected payment methods
 * @param params - URLSearchParams object to update
 * @param setActiveFilters - State setter function for active filters
 */
export const handlePaymentMethodUrlParams = (
    paymentMethods: string[],
    params: URLSearchParams,
    setActiveFilters: React.Dispatch<React.SetStateAction<Record<FilterId, boolean>>>
) => {
    if (paymentMethods.length > 0) {
        params.set(URL_PARAMS.PAYMENT_METHOD, paymentMethods.join(SEPARATORS.ARRAY));
        setActiveFilters((prev) => ({ ...prev, paymentMethod: true }));
    } else {
        params.delete(URL_PARAMS.PAYMENT_METHOD);
    }
};