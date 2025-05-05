import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { sumTotalAmount } from '@/features/helpers/sumTotalAmount';
import { TIME_RANGES } from '@/constants/home/home';
import { mockTransactions } from '@/__test__/utils/mockData';

describe('sumTotalAmount', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-05-03T12:00:00Z')); // Fecha más reciente del mock
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return zero amount when no transactions are provided', () => {
    const result = sumTotalAmount({
      filteredTransactions: [],
      selectedRange: TIME_RANGES.DIARIO,
    });
    expect(result).toEqual({ integer: '0', decimal: '00' });
  });

  it('should calculate total amount for daily range', () => {
    const result = sumTotalAmount({
      filteredTransactions: mockTransactions,
      selectedRange: TIME_RANGES.DIARIO,
    });
    expect(result).toEqual({ integer: '300', decimal: '00' });
  });

  it('should calculate total amount for weekly range', () => {
    const result = sumTotalAmount({
      filteredTransactions: mockTransactions,
      selectedRange: TIME_RANGES.SEMANAL,
    });
    expect(result).toEqual({ integer: '600', decimal: '00' });
  });

  it('should calculate total amount for monthly range', () => {
    const result = sumTotalAmount({
      filteredTransactions: mockTransactions,
      selectedRange: TIME_RANGES.MENSUAL,
    });
    expect(result).toEqual({ integer: '600', decimal: '00' });
  });
});
