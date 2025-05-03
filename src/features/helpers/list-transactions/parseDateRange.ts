import { URL_PARAMS } from "@/constants/home/filters-sidebar/filters";
import moment from "moment";
import { DateRange } from "react-day-picker";

export const parseDateRange = (params: URLSearchParams): DateRange | undefined => {
    const from = params.get(URL_PARAMS.DATE_FROM);
    const to = params.get(URL_PARAMS.DATE_TO);

    if (!from && !to) return undefined;

    try {
        return {
            from: from ? moment(from, "YYYY-MM-DD").toDate() : undefined,
            to: to ? moment(to, "YYYY-MM-DD").toDate() : undefined,
        };
    } catch {
        return undefined;
    }
};