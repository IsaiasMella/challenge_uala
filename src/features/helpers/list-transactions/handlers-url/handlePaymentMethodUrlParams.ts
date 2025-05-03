import { SEPARATORS, URL_PARAMS } from "@/constants/home/filters-sidebar/filters";
import type { FilterId } from "@/types/sections/home/filterSidebar";

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