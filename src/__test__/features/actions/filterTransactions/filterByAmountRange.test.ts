import { describe, it, expect } from 'vitest';
import { filterByAmountRange } from '@/features/actions/filterTransactions/filterByAmountRange';
import { mockTransactions } from '@/__test__/utils/mockData';
import type { Transaction } from '@/types/transactions';

describe('filterByAmountRange', () => {
  it('should return all transactions when no amount range is provided', () => {
    const result = filterByAmountRange(mockTransactions);
    expect(result).toEqual(mockTransactions);
  });

  it('should filter transactions by minimum amount', () => {
    const result = filterByAmountRange(mockTransactions, { min: 200, max: Infinity });
    expect(result).toHaveLength(2);
    expect(result.map(t => t.id)).toEqual(['2', '3']);
  });

  it('should filter transactions by maximum amount', () => {
    const result = filterByAmountRange(mockTransactions, { min: 0, max: 150 });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('should filter transactions by both minimum and maximum amount', () => {
    const result = filterByAmountRange(mockTransactions, { min: 150, max: 250 });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('2');
  });

  it('should return empty array when no transactions fall within the range', () => {
    const result = filterByAmountRange(mockTransactions, { min: 400, max: 500 });
    expect(result).toHaveLength(0);
  });

  it('should handle transactions with zero amounts', () => {
    const transactionsWithZeroAmount: Transaction[] = [
      {
        id: '4',
        createdAt: '2024-03-01T10:00:00Z',
        amount: 0,
        paymentMethod: 'qr',
        card: 'visa',
        installments: 1,
        updatedAt: '2024-03-01T10:00:00Z'
      }
    ];

    const result = filterByAmountRange(transactionsWithZeroAmount, { min: 0, max: 100 });
    expect(result).toHaveLength(1);
  });
}); 