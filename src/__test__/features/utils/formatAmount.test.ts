import { describe, it, expect } from 'vitest';
import { formatAmount } from '@/features/utils/formatAmount';

describe('formatAmount', () => {
  it('should format zero amount correctly', () => {
    const result = formatAmount(0);
    expect(result).toEqual({ integer: '0', decimal: '00' });
  });

  it('should format positive amount correctly', () => {
    const result = formatAmount(1234.56);
    expect(result).toEqual({ integer: '1.234', decimal: '56' });
  });

  it('should format negative amount correctly', () => {
    const result = formatAmount(-1234.56);
    expect(result).toEqual({ integer: '-1.234', decimal: '56' });
  });

  it('should format amount with single decimal correctly', () => {
    const result = formatAmount(1234.5);
    expect(result).toEqual({ integer: '1.234', decimal: '50' });
  });

  it('should format amount with no decimals correctly', () => {
    const result = formatAmount(1234);
    expect(result).toEqual({ integer: '1.234', decimal: '00' });
  });

  it('should handle null or undefined amount', () => {
    const result = formatAmount(0);
    expect(result).toEqual({ integer: '0', decimal: '00' });
  });
}); 