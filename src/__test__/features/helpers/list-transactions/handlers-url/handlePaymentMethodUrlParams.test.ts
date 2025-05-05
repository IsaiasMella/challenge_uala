import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handlePaymentMethodUrlParams } from '@/features/helpers/list-transactions/handlers-url/handlePaymentMethodUrlParams';
import { URL_PARAMS, SEPARATORS } from '@/constants/home/filters-sidebar/filters';

describe('handlePaymentMethodUrlParams', () => {
    const mockSetActiveFilters = vi.fn();

    beforeEach(() => {
        mockSetActiveFilters.mockClear();
    });

    it('should set payment method parameter when methods are selected', () => {
        const params = new URLSearchParams();
        const paymentMethods = ['qr', 'mpos'];

        handlePaymentMethodUrlParams(paymentMethods, params, mockSetActiveFilters);

        expect(params.get(URL_PARAMS.PAYMENT_METHOD)).toBe(paymentMethods.join(SEPARATORS.ARRAY));
        expect(mockSetActiveFilters).toHaveBeenCalledWith(expect.any(Function));
        expect(mockSetActiveFilters.mock.calls[0][0]({ paymentMethod: false })).toEqual({ paymentMethod: true });
    });

    it('should delete payment method parameter when no methods are selected', () => {
        const params = new URLSearchParams();
        params.set(URL_PARAMS.PAYMENT_METHOD, 'qr,mpos');
        const paymentMethods: string[] = [];

        handlePaymentMethodUrlParams(paymentMethods, params, mockSetActiveFilters);

        expect(params.has(URL_PARAMS.PAYMENT_METHOD)).toBe(false);
        expect(mockSetActiveFilters).not.toHaveBeenCalled();
    });

    it('should handle single payment method', () => {
        const params = new URLSearchParams();
        const paymentMethods = ['qr'];

        handlePaymentMethodUrlParams(paymentMethods, params, mockSetActiveFilters);

        expect(params.get(URL_PARAMS.PAYMENT_METHOD)).toBe('qr');
        expect(mockSetActiveFilters).toHaveBeenCalledWith(expect.any(Function));
        expect(mockSetActiveFilters.mock.calls[0][0]({ paymentMethod: false })).toEqual({ paymentMethod: true });
    });

    it('should handle multiple payment methods', () => {
        const params = new URLSearchParams();
        const paymentMethods = ['qr', 'mpos', 'pos_pro', 'link'];

        handlePaymentMethodUrlParams(paymentMethods, params, mockSetActiveFilters);

        expect(params.get(URL_PARAMS.PAYMENT_METHOD)).toBe(paymentMethods.join(SEPARATORS.ARRAY));
        expect(mockSetActiveFilters).toHaveBeenCalledWith(expect.any(Function));
        expect(mockSetActiveFilters.mock.calls[0][0]({ paymentMethod: false })).toEqual({ paymentMethod: true });
    });
}); 