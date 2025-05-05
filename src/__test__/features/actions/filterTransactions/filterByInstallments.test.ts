import { describe, it, expect } from 'vitest';
import { filterByInstallments } from '@/features/actions/filterTransactions/filterByInstallments';
import { mockTransactions } from '@/__test__/utils/mockData';

describe('filterByInstallments', () => {
  it('should return all transactions when no installments are provided', () => {
    const result = filterByInstallments(mockTransactions);
    expect(result).toEqual(mockTransactions);
  });

  it('should return all transactions when installments array is empty', () => {
    const result = filterByInstallments(mockTransactions, []);
    expect(result).toEqual(mockTransactions);
  });

  it('should return all transactions when "todas" is included', () => {
    const result = filterByInstallments(mockTransactions, ['todas']);
    expect(result).toEqual(mockTransactions);
  });

  it('should filter transactions by specific installment value', () => {
    const result = filterByInstallments(mockTransactions, ['1']);
    expect(result).toHaveLength(1);
    expect(result.map(t => t.id)).toEqual(['1']);
  });

  it('should filter transactions by multiple installment values', () => {
    const result = filterByInstallments(mockTransactions, ['1', '3']);
    expect(result).toHaveLength(2);
    expect(result.map(t => t.id)).toEqual(['1', '2']);
  });

  it('should return one transaction when filtering for 6 installments', () => {
    const result = filterByInstallments(mockTransactions, ['6']);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('3');
  });
});
