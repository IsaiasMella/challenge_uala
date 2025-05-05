import { describe, it, expect } from 'vitest';
import { filterByDateRange } from '@/features/actions/filterTransactions/filterByDateRange';
import { mockTransactions } from '@/__test__/utils/mockData';
import type { Transaction } from '@/types/transactions';
import moment from 'moment';

describe('filterByDateRange', () => {
  it('should return all transactions when no date range is provided', () => {
    const result = filterByDateRange(mockTransactions);
    expect(result).toEqual(mockTransactions);
  });

  it('should filter transactions within date range', () => {
    const dateRange = {
      from: moment('2025-05-01'),
      to: moment('2025-05-02')
    };

    const result = filterByDateRange(mockTransactions, dateRange);
    expect(result).toHaveLength(2);
    expect(result.map(t => t.id)).toEqual(['1', '2']);
  });

  it('should include transactions on boundary dates', () => {
    const dateRange = {
      from: moment('2025-05-01'),
      to: moment('2025-05-03')
    };

    const result = filterByDateRange(mockTransactions, dateRange);
    expect(result).toHaveLength(3);
    expect(result.map(t => t.id)).toEqual(['1', '2', '3']);
  });

  it('should handle transactions at start of day', () => {
    const transactionsWithStartOfDay: Transaction[] = [
      {
        id: '4',
        createdAt: '2025-05-04T00:00:00Z',
        amount: 400,
        paymentMethod: 'qr',
        card: 'visa',
        installments: 1,
        updatedAt: '2025-05-04T00:00:00Z'
      }
    ];

    const dateRange = {
      from: moment('2025-05-04'),
      to: moment('2025-05-04')
    };

    const result = filterByDateRange(transactionsWithStartOfDay, dateRange);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('4');
  });

  it('should handle transactions at end of day', () => {
    const transactionsWithEndOfDay: Transaction[] = [
      {
        id: '5',
        createdAt: '2025-05-04T23:59:59Z',
        amount: 500,
        paymentMethod: 'qr',
        card: 'visa',
        installments: 1,
        updatedAt: '2025-05-04T23:59:59Z'
      }
    ];

    const dateRange = {
      from: moment('2025-05-04'),
      to: moment('2025-05-04')
    };

    const result = filterByDateRange(transactionsWithEndOfDay, dateRange);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('5');
  });

  it('should return empty array when no transactions fall within the range', () => {
    const dateRange = {
      from: moment('2025-06-01'),
      to: moment('2025-06-30')
    };

    const result = filterByDateRange(mockTransactions, dateRange);
    expect(result).toHaveLength(0);
  });
});
