import { DEFAULT_AMOUNT_VALUES, URL_PARAMS } from "@/constants/home/filters-sidebar/filters";

import type { FilterId, FilterState } from "@/types/sections/home/filterSidebar";

export const handleFilterDeactivation = (
    id: FilterId,
    params: URLSearchParams,
    setFilterValues: React.Dispatch<React.SetStateAction<FilterState>>
  ) => {
    switch (id) {
      case "date":
        params.delete(URL_PARAMS.DATE_FROM);
        params.delete(URL_PARAMS.DATE_TO);
        setFilterValues((prev) => ({ ...prev, date: undefined }));
        break;
      case "card":
        params.delete(URL_PARAMS.CARD);
        setFilterValues((prev) => ({ ...prev, card: [] }));
        break;
      case "installments":
        params.delete(URL_PARAMS.INSTALLMENTS);
        setFilterValues((prev) => ({ ...prev, installments: [] }));
        break;
      case "amount":
        params.delete(URL_PARAMS.AMOUNT_MIN);
        params.delete(URL_PARAMS.AMOUNT_MAX);
        setFilterValues((prev) => ({
          ...prev,
          amount: {
            min: DEFAULT_AMOUNT_VALUES.AMOUNT.MIN,
            max: DEFAULT_AMOUNT_VALUES.AMOUNT.MAX,
          },
        }));
        break;
      case "paymentMethod":
        params.delete(URL_PARAMS.PAYMENT_METHOD);
        setFilterValues((prev) => ({ ...prev, paymentMethod: [] }));
        break;
    }
  };