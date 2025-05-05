import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useFilteredTransactions } from '@/hooks/useFilteredTransactions';
import { TIME_RANGES } from '@/constants/home/home';
import type { Transaction } from '@/types/transactions';
import moment from 'moment';
import 'moment/locale/es';

vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn(),
}));

import { useSearchParams } from 'next/navigation';
import type { Mock } from 'vitest';

describe('useFilteredTransactions', () => {
  const baseDate = moment().startOf('day');
  const mockTransactions: Transaction[] = [
    {
      id: '1',
      amount: 100,
      card: 'visa',
      installments: 1,
      createdAt: baseDate.clone().toISOString(),
      updatedAt: baseDate.clone().toISOString(),
      paymentMethod: 'qr',
    },
    {
      id: '2',
      amount: 200,
      card: 'mastercard',
      installments: 3,
      createdAt: baseDate.clone().subtract(6, 'days').toISOString(),
      updatedAt: baseDate.clone().subtract(6, 'days').toISOString(),
      paymentMethod: 'link',
    }    
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const setSearchParams = (params: Record<string, string>) => {
    const sp = new URLSearchParams();
    for (const [key, val] of Object.entries(params)) {
      sp.set(key, val);
    }
    (useSearchParams as Mock).mockReturnValue(sp);
  };

  it('should return all transactions within daily range', () => {
    setSearchParams({});
    const { result } = renderHook(() =>
      useFilteredTransactions(mockTransactions, TIME_RANGES.DIARIO)
    );
    expect(result.current).toHaveLength(1);
    expect(result.current[0].id).toBe('1');
  });

  it('should filter by card', () => {
    setSearchParams({ card: 'visa' });
    const { result } = renderHook(() =>
      useFilteredTransactions(mockTransactions, TIME_RANGES.MENSUAL)
    );
    expect(result.current).toHaveLength(1);
    expect(result.current[0].card).toBe('visa');
  });

  it('should filter by specific date', () => {
    const dateStr = baseDate.format('YYYY-MM-DD');
    setSearchParams({ date: dateStr });
    const { result } = renderHook(() =>
      useFilteredTransactions(mockTransactions, TIME_RANGES.MENSUAL)
    );
    expect(result.current).toHaveLength(1);
    expect(result.current[0].id).toBe('1');
  });

  it('should filter by amount', () => {
    setSearchParams({ amount: '100' });
    const { result } = renderHook(() =>
      useFilteredTransactions(mockTransactions, TIME_RANGES.MENSUAL)
    );
    expect(result.current).toHaveLength(1);
    expect(result.current[0].amount).toBe(100);
  });

  it('should filter by installments', () => {
    setSearchParams({ installments: '3' });
    const { result } = renderHook(() =>
      useFilteredTransactions(mockTransactions, TIME_RANGES.SEMANAL)
    );
    expect(result.current).toHaveLength(1);
    expect(result.current[0].id).toBe('2');
  });

  it('should filter by payment method', () => {
    setSearchParams({ paymentMethod: 'qr' });
    const { result } = renderHook(() =>
      useFilteredTransactions(mockTransactions, TIME_RANGES.MENSUAL)
    );
    expect(result.current).toHaveLength(1);
    expect(result.current[0].paymentMethod).toBe('qr');
  });

  it('should return empty array if no transaction matches', () => {
    setSearchParams({ amount: '999' });
    const { result } = renderHook(() =>
      useFilteredTransactions(mockTransactions, TIME_RANGES.MENSUAL)
    );
    expect(result.current).toHaveLength(0);
  });
});
