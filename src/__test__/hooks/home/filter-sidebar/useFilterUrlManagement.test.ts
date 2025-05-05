import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useFilterUrlManagement } from '@/hooks/home/filter-sidebar/useFilterUrlManagement';
import type { FilterState, FilterId } from '@/types/sections/home/filterSidebar';
import type { Mock } from 'vitest';

vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn(),
  useRouter: vi.fn(),
}));

describe('useFilterUrlManagement', () => {
  const mockSearchParams = new URLSearchParams();
  const mockRouter = {
    push: vi.fn(),
    replace: vi.fn(),
  };
  const mockSetActiveFilters = vi.fn();

  const baseFilterState: FilterState = {
    date: undefined,
    card: [],
    installments: [],
    amount: { min: 0, max: 500 },
    paymentMethod: [],
  };

  const baseActiveFilters: Record<FilterId, boolean> = {
    date: false,
    card: false,
    installments: false,
    amount: false,
    paymentMethod: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useSearchParams as Mock).mockReturnValue(mockSearchParams);
    (useRouter as Mock).mockReturnValue(mockRouter);
  });

  it('should update URL parameters when active filters change', () => {
    const { result } = renderHook(() =>
      useFilterUrlManagement(baseFilterState, mockSetActiveFilters, baseActiveFilters)
    );

    result.current.onSubmitFilters();
    expect(mockRouter.push).toHaveBeenCalled();
  });

  it('should handle date range filter', () => {
    const filterStateWithDate: FilterState = {
      ...baseFilterState,
      date: { from: new Date('2024-01-01'), to: new Date('2024-01-31') },
    };

    const activeFilters = {
      ...baseActiveFilters,
      date: true,
    };

    const { result } = renderHook(() =>
      useFilterUrlManagement(filterStateWithDate, mockSetActiveFilters, activeFilters)
    );

    result.current.onSubmitFilters();
    expect(mockRouter.push).toHaveBeenCalled();
  });

  it('should handle card filter', () => {
    const filterStateWithCard: FilterState = {
      ...baseFilterState,
      card: ['visa', 'mastercard'],
    };

    const activeFilters = {
      ...baseActiveFilters,
      card: true,
    };

    const { result } = renderHook(() =>
      useFilterUrlManagement(filterStateWithCard, mockSetActiveFilters, activeFilters)
    );

    result.current.onSubmitFilters();
    expect(mockRouter.push).toHaveBeenCalled();
  });

  it('should handle amount filter', () => {
    const filterStateWithAmount: FilterState = {
      ...baseFilterState,
      amount: { min: 100, max: 1000 },
    };

    const activeFilters = {
      ...baseActiveFilters,
      amount: true,
    };

    const { result } = renderHook(() =>
      useFilterUrlManagement(filterStateWithAmount, mockSetActiveFilters, activeFilters)
    );

    result.current.onSubmitFilters();
    expect(mockRouter.push).toHaveBeenCalled();
  });
});
