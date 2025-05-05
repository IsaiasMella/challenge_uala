import { SEPARATORS, URL_PARAMS } from "@/constants/home/filters-sidebar/filters";

import type { FilterId } from "@/types/sections/home/filterSidebar";

/**
 * Updates URL parameters and active filters state for card filter changes
 * @param cards - Array of selected card types
 * @param params - URLSearchParams object to update
 * @param setActiveFilters - State setter function for active filters
 */
export const handleCardUrlParams = (
    cards: string[],
    params: URLSearchParams,
    setActiveFilters: React.Dispatch<React.SetStateAction<Record<FilterId, boolean>>>
  ) => {
    if (cards.length > 0) {
      params.set(URL_PARAMS.CARD, cards.join(SEPARATORS.ARRAY));
      setActiveFilters((prev) => ({ ...prev, card: true }));
    } else {
      params.delete(URL_PARAMS.CARD);
    }
  };