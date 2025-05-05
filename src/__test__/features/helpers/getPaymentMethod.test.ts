import { describe, it, expect } from 'vitest';
import { getPaymentMethod } from '@/features/helpers/getPaymentMethod';
import { TYPE_PAYMENT_METHOD } from '@/constants/home/home';

describe('getPaymentMethod', () => {
  it('should return formatted name for QR payment method', () => {
    expect(getPaymentMethod('qr')).toBe(TYPE_PAYMENT_METHOD.qr);
  });

  it('should return formatted name for MPOS payment method', () => {
    expect(getPaymentMethod('mpos')).toBe(TYPE_PAYMENT_METHOD.mpos);
  });

  it('should return formatted name for POS PRO payment method', () => {
    expect(getPaymentMethod('pospro')).toBe(TYPE_PAYMENT_METHOD.pospro);
  });

  it('should return formatted name for Link payment method', () => {
    expect(getPaymentMethod('link')).toBe(TYPE_PAYMENT_METHOD.link);
  });

  it('should return original code for unknown payment method', () => {
    const unknownMethod = 'unknown';
    expect(getPaymentMethod(unknownMethod)).toBe(unknownMethod);
  });
}); 