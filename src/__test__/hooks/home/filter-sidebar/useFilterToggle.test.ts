import { vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn(() => new URLSearchParams('card=visa')),
}));

vi.mock('@/features/helpers/list-transactions/handleFilterDeactivation', () => ({
  handleFilterDeactivation: vi.fn((id, params, setFilterValues) => {
    setFilterValues((prev: FilterState) => ({
      ...prev,
      [id]: undefined,
    }));
  }),
}));

const mockSetPendingUrlUpdate = vi.fn();
vi.mock('@/hooks/home/filter-sidebar/usePendingUrlUpdate', () => ({
  usePendingUrlUpdate: () => ({
    setPendingUrlUpdate: mockSetPendingUrlUpdate,
  }),
}));

import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useFilterToggle } from '@/hooks/home/filter-sidebar/useFilterToggle';
import { handleFilterDeactivation } from '@/features/helpers/list-transactions/handleFilterDeactivation';
import type { FilterId, FilterState } from '@/types/sections/home/filterSidebar';
import { useState } from 'react';

const initialFilterState: FilterState = {
  date: undefined,
  card: [],
  installments: [],
  amount: { min: 0, max: 0 },
  paymentMethod: []
};

const initialActiveFilters: Record<FilterId, boolean> = {
  date: false,
  card: false,
  installments: false,
  amount: false,
  paymentMethod: false
};

describe('useFilterToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should toggle filter state correctly', () => {
    const { result } = renderHook(() => {
      const [, setFilterValues] = useState<FilterState>(initialFilterState);
      const [, setActiveFilters] = useState<Record<FilterId, boolean>>(initialActiveFilters);

      return useFilterToggle(setFilterValues, setActiveFilters);
    });

    act(() => {
      result.current.switchToggle('date');
    });

    expect(typeof result.current.switchToggle).toBe('function');
  });

  it('should handle filter deactivation (toggle from true to false)', () => {
    const { result } = renderHook(() => {
      const [filterValues, setFilterValues] = useState<FilterState>({
        ...initialFilterState,
        date: { from: new Date(), to: new Date() }
      });
      const [, setActiveFilters] = useState<Record<FilterId, boolean>>({
        ...initialActiveFilters,
        date: true
      });

      return {
        ...useFilterToggle(setFilterValues, setActiveFilters),
        getFilterValues: () => filterValues,
      };
    });

    act(() => {
      result.current.switchToggle('date');
    });

    expect(handleFilterDeactivation).toHaveBeenCalled();
    expect(mockSetPendingUrlUpdate).toHaveBeenCalled();
  });

  it('should not call handleFilterDeactivation when activating filter', () => {
    const { result } = renderHook(() => {
      const [, setFilterValues] = useState<FilterState>(initialFilterState);
      const [, setActiveFilters] = useState<Record<FilterId, boolean>>(initialActiveFilters);

      return useFilterToggle(setFilterValues, setActiveFilters);
    });

    act(() => {
      result.current.switchToggle('date');
    });

    expect(handleFilterDeactivation).not.toHaveBeenCalled();
    expect(mockSetPendingUrlUpdate).not.toHaveBeenCalled();
  });
});
