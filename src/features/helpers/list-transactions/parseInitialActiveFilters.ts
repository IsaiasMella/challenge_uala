import { SEPARATORS, URL_PARAMS } from "@/constants/home/filters-sidebar/filters";
import { FilterId } from "@/types/sections/home/filterSidebar";

export const parseInitialActiveFilters = (params: URLSearchParams): Record<FilterId, boolean> => {
    return {
      date: params.has(URL_PARAMS.DATE_FROM) || params.has(URL_PARAMS.DATE_TO),
      card: (params.get(URL_PARAMS.CARD) || "").split(SEPARATORS.ARRAY).filter(Boolean).length > 0,
      installments: (params.get(URL_PARAMS.INSTALLMENTS) || "").split(SEPARATORS.ARRAY).filter(Boolean).length > 0,
      amount: params.has(URL_PARAMS.AMOUNT_MIN) || params.has(URL_PARAMS.AMOUNT_MAX),
      paymentMethod: !!params.get(URL_PARAMS.PAYMENT_METHOD),
    };
  };