import { describe, it, expect } from 'vitest';
import { parseInitialActiveFilters } from '@/features/helpers/list-transactions/parseInitialActiveFilters';
import { URL_PARAMS } from '@/constants/home/filters-sidebar/filters';

describe('parseInitialActiveFilters', () => {
    it('should detect active date filter', () => {
        const params = new URLSearchParams();
        params.set(URL_PARAMS.DATE_FROM, '2024-03-01');
        params.set(URL_PARAMS.DATE_TO, '2024-03-31');

        const result = parseInitialActiveFilters(params);

        expect(result.date).toBe(true);
    });

    it('should detect active card filter', () => {
        const params = new URLSearchParams();
        params.set(URL_PARAMS.CARD, 'visa,mastercard');

        const result = parseInitialActiveFilters(params);

        expect(result.card).toBe(true);
    });

    it('should detect active installments filter', () => {
        const params = new URLSearchParams();
        params.set(URL_PARAMS.INSTALLMENTS, '3,6');

        const result = parseInitialActiveFilters(params);

        expect(result.installments).toBe(true);
    });

    it('should detect active amount filter', () => {
        const params = new URLSearchParams();
        params.set(URL_PARAMS.AMOUNT_MIN, '1000');
        params.set(URL_PARAMS.AMOUNT_MAX, '5000');

        const result = parseInitialActiveFilters(params);

        expect(result.amount).toBe(true);
    });

    it('should detect active payment method filter', () => {
        const params = new URLSearchParams();
        params.set(URL_PARAMS.PAYMENT_METHOD, 'qr');

        const result = parseInitialActiveFilters(params);

        expect(result.paymentMethod).toBe(true);
    });

    it('should return all filters as inactive when no params are present', () => {
        const params = new URLSearchParams();

        const result = parseInitialActiveFilters(params);

        expect(result).toEqual({
            date: false,
            card: false,
            installments: false,
            amount: false,
            paymentMethod: false,
        });
    });

    it('should handle empty array values for card and installments', () => {
        const params = new URLSearchParams();
        params.set(URL_PARAMS.CARD, '');
        params.set(URL_PARAMS.INSTALLMENTS, '');

        const result = parseInitialActiveFilters(params);

        expect(result.card).toBe(false);
        expect(result.installments).toBe(false);
    });
}); 