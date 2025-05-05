import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFilterStateManagement } from '@/hooks/home/filter-sidebar/useFilterStateManagement';
import { INITIAL_ACTIVE_FILTERS_STATE, INITIAL_FILTERS_STATE } from '@/constants/home/filters-sidebar/filters';
import type { FilterId, FilterState } from '@/types/sections/home/filterSidebar';

describe('useFilterStateManagement', () => {
  it('should call setFilterValues with updated filter when onChangeFilters is called', () => {
    const setFilterValues = vi.fn();
    const setActiveFilters = vi.fn();

    const { result } = renderHook(() =>
      useFilterStateManagement(setFilterValues, setActiveFilters)
    );

    const filterId: FilterId = 'amount';
    const newValue = { min: 50, max: 500 };

    act(() => {
      result.current.onChangeFilters(filterId, newValue);
    });

    expect(setFilterValues).toHaveBeenCalledTimes(1);
    expect(setFilterValues).toHaveBeenCalledWith(expect.any(Function));

    const prevState: FilterState = {
      ...INITIAL_FILTERS_STATE,
    };

    const updaterFn = setFilterValues.mock.calls[0][0];
    const newState = updaterFn(prevState);

    expect(newState).toEqual({
      ...INITIAL_FILTERS_STATE,
      [filterId]: newValue,
    });
  });

  it('should reset filters to initial state when clearFilters is called', () => {
    const setFilterValues = vi.fn();
    const setActiveFilters = vi.fn();

    const { result } = renderHook(() =>
      useFilterStateManagement(setFilterValues, setActiveFilters)
    );

    act(() => {
      result.current.clearFilters();
    });

    expect(setActiveFilters).toHaveBeenCalledWith(INITIAL_ACTIVE_FILTERS_STATE);
    expect(setFilterValues).toHaveBeenCalledWith(INITIAL_FILTERS_STATE);
  });
});
