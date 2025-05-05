import { describe, it, expect } from 'vitest';
import { filterByCards } from '@/features/actions/filterTransactions/filterByCards';
import { mockTransactions } from '@/__test__/utils/mockData';

describe('filterByCards', () => {
  it('should return all transactions when no cards are provided', () => {
    const result = filterByCards(mockTransactions);
    expect(result).toEqual(mockTransactions);
  });

  it('should return all transactions when cards array is empty', () => {
    const result = filterByCards(mockTransactions, []);
    expect(result).toEqual(mockTransactions);
  });

  it('should return all transactions when "todas" is included', () => {
    const result = filterByCards(mockTransactions, ['todas']);
    expect(result).toEqual(mockTransactions);
  });

  it('should filter transactions by specific card', () => {
    const result = filterByCards(mockTransactions, ['visa']);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('should filter transactions by multiple cards', () => {
    const result = filterByCards(mockTransactions, ['visa', 'mastercard']);
    expect(result).toHaveLength(2);
    expect(result.map(t => t.id)).toEqual(['1', '2']);
  });

  it('should handle case-insensitive card matching', () => {
    const result = filterByCards(mockTransactions, ['VISA']);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('should return empty array when no transactions match the cards', () => {
    const result = filterByCards(mockTransactions, ['NON_EXISTENT_CARD']);
    expect(result).toHaveLength(0);
  });
}); 