import { describe, it, expect } from 'vitest';
import { parseFilterStateFromURLParams } from '@/features/helpers/list-transactions/parseFilterStateFromURLParams';
import { URL_PARAMS, DEFAULT_AMOUNT_VALUES } from '@/constants/home/filters-sidebar/filters';
import moment from 'moment';

describe('parseFilterStateFromURLParams', () => {
  it('should parse date range from URL params', () => {
    const params = new URLSearchParams();
    params.set(URL_PARAMS.DATE_FROM, '2024-03-01');
    params.set(URL_PARAMS.DATE_TO, '2024-03-31');

    const result = parseFilterStateFromURLParams(params);

    expect(result.date).toEqual({
      from: moment('2024-03-01', 'YYYY-MM-DD').toDate(),
      to: moment('2024-03-31', 'YYYY-MM-DD').toDate(),
    });
  });

  it('should parse card filter from URL params', () => {
    const params = new URLSearchParams();
    params.set(URL_PARAMS.CARD, 'visa,mastercard');

    const result = parseFilterStateFromURLParams(params);

    expect(result.card).toEqual(['visa', 'mastercard']);
  });

  it('should parse installments filter from URL params', () => {
    const params = new URLSearchParams();
    params.set(URL_PARAMS.INSTALLMENTS, '3,6');

    const result = parseFilterStateFromURLParams(params);

    expect(result.installments).toEqual(['3', '6']);
  });

  it('should parse amount filter from URL params', () => {
    const params = new URLSearchParams();
    params.set(URL_PARAMS.AMOUNT_MIN, '1000');
    params.set(URL_PARAMS.AMOUNT_MAX, '5000');

    const result = parseFilterStateFromURLParams(params);

    expect(result.amount).toEqual({
      min: 1000,
      max: 5000,
    });
  });

  it('should parse payment method filter from URL params', () => {
    const params = new URLSearchParams();
    params.set(URL_PARAMS.PAYMENT_METHOD, 'qr,mpos');

    const result = parseFilterStateFromURLParams(params);

    expect(result.paymentMethod).toEqual(['qr', 'mpos']);
  });

  it('should use default values when params are not present', () => {
    const params = new URLSearchParams();

    const result = parseFilterStateFromURLParams(params);

    expect(result).toEqual({
      date: undefined,
      card: [],
      installments: [],
      amount: {
        min: DEFAULT_AMOUNT_VALUES.AMOUNT.MIN,
        max: DEFAULT_AMOUNT_VALUES.AMOUNT.MAX,
      },
      paymentMethod: [],
    });
  });

  it('should handle empty array values for card, installments and payment method', () => {
    const params = new URLSearchParams();
    params.set(URL_PARAMS.CARD, '');
    params.set(URL_PARAMS.INSTALLMENTS, '');
    params.set(URL_PARAMS.PAYMENT_METHOD, '');

    const result = parseFilterStateFromURLParams(params);

    expect(result.card).toEqual([]);
    expect(result.installments).toEqual([]);
    expect(result.paymentMethod).toEqual([]);
  });
});
