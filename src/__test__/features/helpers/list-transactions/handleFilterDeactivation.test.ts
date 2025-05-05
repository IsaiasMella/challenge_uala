import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleFilterDeactivation } from '@/features/helpers/list-transactions/handleFilterDeactivation';
import { URL_PARAMS, DEFAULT_AMOUNT_VALUES } from '@/constants/home/filters-sidebar/filters';

describe('handleFilterDeactivation', () => {
    const mockSetFilterValues = vi.fn();

    beforeEach(() => {
        mockSetFilterValues.mockClear();
    });

    it('should deactivate date filter', () => {
        const params = new URLSearchParams();
        params.set(URL_PARAMS.DATE_FROM, '2024-03-01');
        params.set(URL_PARAMS.DATE_TO, '2024-03-31');

        handleFilterDeactivation('date', params, mockSetFilterValues);

        expect(params.has(URL_PARAMS.DATE_FROM)).toBe(false);
        expect(params.has(URL_PARAMS.DATE_TO)).toBe(false);
        expect(mockSetFilterValues).toHaveBeenCalledWith(expect.any(Function));
        expect(mockSetFilterValues.mock.calls[0][0]({ date: '2024-03-01' })).toEqual({ date: undefined });
    });

    it('should deactivate card filter', () => {
        const params = new URLSearchParams();
        params.set(URL_PARAMS.CARD, 'visa,mastercard');

        handleFilterDeactivation('card', params, mockSetFilterValues);

        expect(params.has(URL_PARAMS.CARD)).toBe(false);
        expect(mockSetFilterValues).toHaveBeenCalledWith(expect.any(Function));
        expect(mockSetFilterValues.mock.calls[0][0]({ card: ['visa'] })).toEqual({ card: [] });
    });

    it('should deactivate installments filter', () => {
        const params = new URLSearchParams();
        params.set(URL_PARAMS.INSTALLMENTS, '3,6');

        handleFilterDeactivation('installments', params, mockSetFilterValues);

        expect(params.has(URL_PARAMS.INSTALLMENTS)).toBe(false);
        expect(mockSetFilterValues).toHaveBeenCalledWith(expect.any(Function));
        expect(mockSetFilterValues.mock.calls[0][0]({ installments: [3] })).toEqual({ installments: [] });
    });

    it('should deactivate amount filter', () => {
        const params = new URLSearchParams();
        params.set(URL_PARAMS.AMOUNT_MIN, '1000');
        params.set(URL_PARAMS.AMOUNT_MAX, '5000');

        handleFilterDeactivation('amount', params, mockSetFilterValues);

        expect(params.has(URL_PARAMS.AMOUNT_MIN)).toBe(false);
        expect(params.has(URL_PARAMS.AMOUNT_MAX)).toBe(false);
        expect(mockSetFilterValues).toHaveBeenCalledWith(expect.any(Function));
        expect(mockSetFilterValues.mock.calls[0][0]({ amount: { min: 1000, max: 5000 } })).toEqual({
            amount: {
                min: DEFAULT_AMOUNT_VALUES.AMOUNT.MIN,
                max: DEFAULT_AMOUNT_VALUES.AMOUNT.MAX,
            },
        });
    });

    it('should deactivate payment method filter', () => {
        const params = new URLSearchParams();
        params.set(URL_PARAMS.PAYMENT_METHOD, 'qr,mpos');

        handleFilterDeactivation('paymentMethod', params, mockSetFilterValues);

        expect(params.has(URL_PARAMS.PAYMENT_METHOD)).toBe(false);
        expect(mockSetFilterValues).toHaveBeenCalledWith(expect.any(Function));
        expect(mockSetFilterValues.mock.calls[0][0]({ paymentMethod: ['qr'] })).toEqual({ paymentMethod: [] });
    });
}); 