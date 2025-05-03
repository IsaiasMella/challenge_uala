import moment from "moment";

import { URL_PARAMS } from "@/constants/home/filters-sidebar/filters";

import { DateRange } from "react-day-picker";
import { FilterId } from "@/types/sections/home/filterSidebar";

export const handleDateRangeUrlParams = (
    date: DateRange | undefined,
    params: URLSearchParams,
    setActiveFilters: React.Dispatch<React.SetStateAction<Record<FilterId, boolean>>>
  ) => {
    if (!date?.from && !date?.to) {
      params.delete(URL_PARAMS.DATE_FROM);
      params.delete(URL_PARAMS.DATE_TO);
    } else {
      if (date.from) {
        params.set(URL_PARAMS.DATE_FROM, moment(date.from).format("YYYY-MM-DD"));
      } else {
        params.delete(URL_PARAMS.DATE_FROM);
      }
  
      if (date.to) {
        params.set(URL_PARAMS.DATE_TO, moment(date.to).format("YYYY-MM-DD"));
      } else {
        params.delete(URL_PARAMS.DATE_TO);
      }
  
      setActiveFilters((prev) => ({ ...prev, date: true }));
    }
  };