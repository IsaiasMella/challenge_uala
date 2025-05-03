import { DEFAULT_AMOUNT_VALUES, SEPARATORS, URL_PARAMS } from "@/constants/home/filters-sidebar/filters";
import { parseDateRange } from "./parseDateRange";
import { FilterState } from "@/types/sections/home/filterSidebar";

export const parseFilterStateFromURLParams = (params: URLSearchParams): FilterState => {
  return {
    date: parseDateRange(params),
    card: params.get(URL_PARAMS.CARD)?.split(SEPARATORS.ARRAY).filter(Boolean) || [],
    installments: params.get(URL_PARAMS.INSTALLMENTS)
      ?.split(SEPARATORS.ARRAY).filter(Boolean) || [],
    amount: {
      min: Number(params.get(URL_PARAMS.AMOUNT_MIN)) || DEFAULT_AMOUNT_VALUES.AMOUNT.MIN,
      max: Number(params.get(URL_PARAMS.AMOUNT_MAX)) || DEFAULT_AMOUNT_VALUES.AMOUNT.MAX,
    },
    paymentMethod: params.get(URL_PARAMS.PAYMENT_METHOD)
      ?.split(SEPARATORS.ARRAY).filter(Boolean) || [],
  };
};