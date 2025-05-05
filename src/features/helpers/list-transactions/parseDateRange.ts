import { URL_PARAMS } from "@/constants/home/filters-sidebar/filters";
import moment from "moment";
import { DateRange } from "react-day-picker";

/**
 * Parses date range parameters from URL search params into a DateRange object
 * @param params - URLSearchParams object containing date range parameters
 * @returns DateRange object with from and to dates, or undefined if no valid dates are found
 */
export const parseDateRange = (params: URLSearchParams): DateRange | undefined => {
    const fromRaw = params.get(URL_PARAMS.DATE_FROM);
    const toRaw = params.get(URL_PARAMS.DATE_TO);
  
    if (!fromRaw && !toRaw) return undefined;
  
    const fromMoment = fromRaw ? moment(fromRaw, "YYYY-MM-DD", true) : undefined;
    const toMoment = toRaw ? moment(toRaw, "YYYY-MM-DD", true) : undefined;
  
    const isFromValid = fromMoment?.isValid() ?? true;
    const isToValid = toMoment?.isValid() ?? true;
  
    if (!isFromValid || !isToValid) return undefined;
  
    return {
      from: fromMoment?.toDate(),
      to: toMoment?.toDate(),
    };
  };