import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSearchParams } from 'next/navigation';
import { useFilterValuesFromUrl } from '@/hooks/home/filter-sidebar/useFilterValuesFromUrl';
import type { Mock } from 'vitest';

vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn(),
}));

describe('useFilterValuesFromUrl', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with default filter values when URL has no parameters', () => {
    const emptyParams = new URLSearchParams('');
    (useSearchParams as Mock).mockReturnValue(emptyParams);

    const { result } = renderHook(() => useFilterValuesFromUrl());

    expect(result.current.filterValues).toEqual({
      date: undefined,
      card: [],
      amount: { min: 0, max: 500 },
      installments: [],
      paymentMethod: [],
    });
  });

  it('should update filter values state', () => {
    const emptyParams = new URLSearchParams('');
    (useSearchParams as Mock).mockReturnValue(emptyParams);

    const { result } = renderHook(() => useFilterValuesFromUrl());

    const newDate = {
      from: new Date(Date.UTC(2024, 0, 1)),
      to: new Date(Date.UTC(2024, 0, 31)),
    };

    act(() => {
      result.current.setFilterValues((prev) => ({
        ...prev,
        date: newDate,
      }));
    });

    const updatedDate = result.current.filterValues.date!;
    expect(updatedDate.from?.toISOString()).toBe('2024-01-01T00:00:00.000Z');
    expect(updatedDate.to?.toISOString()).toBe('2024-01-31T00:00:00.000Z');

    expect(result.current.filterValues.card).toEqual([]);
    expect(result.current.filterValues.amount).toEqual({ min: 0, max: 500 });
    expect(result.current.filterValues.installments).toEqual([]);
    expect(result.current.filterValues.paymentMethod).toEqual([]);
  });
});
