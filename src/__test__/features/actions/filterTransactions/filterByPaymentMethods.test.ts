import { describe, it, expect } from 'vitest';
import { filterByPaymentMethods } from '@/features/actions/filterTransactions/filterByPaymentMethods';
import { mockTransactions } from '@/__test__/utils/mockData';

describe('filterByPaymentMethods', () => {
  it('should return all transactions when no payment methods are provided', () => {
    const result = filterByPaymentMethods(mockTransactions);
    expect(result).toEqual(mockTransactions);
  });

  it('should return all transactions when payment methods array is empty', () => {
    const result = filterByPaymentMethods(mockTransactions, []);
    expect(result).toEqual(mockTransactions);
  });

  it('should filter transactions by specific payment method', () => {
    const result = filterByPaymentMethods(mockTransactions, ['qr']);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('should filter transactions by multiple payment methods', () => {
    const result = filterByPaymentMethods(mockTransactions, ['qr', 'mpos']);
    expect(result).toHaveLength(2);
    expect(result.map(t => t.id)).toEqual(['1', '2']);
  });

  it('should handle case-insensitive payment method matching', () => {
    const result = filterByPaymentMethods(mockTransactions, ['QR']);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('should return empty array when no transactions match the payment methods', () => {
    const result = filterByPaymentMethods(mockTransactions, ['NON_EXISTENT_METHOD']);
    expect(result).toHaveLength(0);
  });
}); 