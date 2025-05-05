import { SEPARATORS, URL_PARAMS } from "@/constants/home/filters-sidebar/filters";
import { FilterId } from "@/types/sections/home/filterSidebar";

/**
 * Parses URL search params to determine which filters are initially active
 * @param params - URLSearchParams object containing filter parameters
 * @returns Record of filter IDs to boolean values indicating which filters are active
 */
export const parseInitialActiveFilters = (params: URLSearchParams): Record<FilterId, boolean> => {
    return {
      date: params.has(URL_PARAMS.DATE_FROM) || params.has(URL_PARAMS.DATE_TO),
      card: (params.get(URL_PARAMS.CARD) || "").split(SEPARATORS.ARRAY).filter(Boolean).length > 0,
      installments: (params.get(URL_PARAMS.INSTALLMENTS) || "").split(SEPARATORS.ARRAY).filter(Boolean).length > 0,
      amount: params.has(URL_PARAMS.AMOUNT_MIN) || params.has(URL_PARAMS.AMOUNT_MAX),
      paymentMethod: !!params.get(URL_PARAMS.PAYMENT_METHOD),
    };
  };