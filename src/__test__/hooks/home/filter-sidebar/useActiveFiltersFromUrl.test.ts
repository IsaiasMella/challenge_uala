import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useActiveFiltersFromUrl } from '@/hooks/home/filter-sidebar/useActiveFiltersFromUrl';

vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn(),
}));

import { useSearchParams } from 'next/navigation';
import type { Mock } from 'vitest';

describe('useActiveFiltersFromUrl', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with empty active filters when URL has no parameters', () => {
    const fakeParams = new URLSearchParams('');
    (useSearchParams as Mock).mockReturnValue(fakeParams);

    const { result } = renderHook(() => useActiveFiltersFromUrl());

    expect(result.current.activeFilters).toEqual({
      date: false,
      card: false,
      amount: false,
      installments: false,
      paymentMethod: false,
    });
  });

  it('should initialize with active filters from URL parameters', () => {
    const fakeParams = new URLSearchParams(
        [
          'date_from=2024-01-01',   
          'date_to=2024-01-31',     
          'card=visa,mastercard',
          'amountMin=100',
          'amountMax=1000',
          'installments=1,2,3',
          'paymentMethod=qr,credit'
        ].join('&')
      );
      
    (useSearchParams as Mock).mockReturnValue(fakeParams);

    const { result } = renderHook(() => useActiveFiltersFromUrl());

    expect(result.current.activeFilters).toEqual({
      date: true,
      card: true,
      amount: true,
      installments: true,
      paymentMethod: true,
    });
  });

  it('should update active filters state', () => {
    const fakeParams = new URLSearchParams('');
    (useSearchParams as Mock).mockReturnValue(fakeParams);

    const { result } = renderHook(() => useActiveFiltersFromUrl());

    act(() => {
      result.current.setActiveFilters((prev) => ({
        ...prev,
        date: true,
      }));
    });

    expect(result.current.activeFilters).toEqual({
      date: true,
      card: false,
      amount: false,
      installments: false,
      paymentMethod: false,
    });
  });
});
