import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleAmountUrlParams } from '@/features/helpers/list-transactions/handlers-url/handleAmountUrlParams';
import { URL_PARAMS, DEFAULT_AMOUNT_VALUES } from '@/constants/home/filters-sidebar/filters';

describe('handleAmountUrlParams', () => {
    const mockSetActiveFilters = vi.fn();

    beforeEach(() => {
        mockSetActiveFilters.mockClear();
    });

    it('should set amount parameters when values are different from defaults', () => {
        const params = new URLSearchParams();
        const amount = {
            min: DEFAULT_AMOUNT_VALUES.AMOUNT.MIN + 1000,
            max: DEFAULT_AMOUNT_VALUES.AMOUNT.MAX - 1000,
        };

        handleAmountUrlParams(amount, params, mockSetActiveFilters);

        expect(params.get(URL_PARAMS.AMOUNT_MIN)).toBe(amount.min.toString());
        expect(params.get(URL_PARAMS.AMOUNT_MAX)).toBe(amount.max.toString());
        expect(mockSetActiveFilters).toHaveBeenCalledWith(expect.any(Function));
        expect(mockSetActiveFilters.mock.calls[0][0]({ amount: false })).toEqual({ amount: true });
    });

    it('should handle min amount equal to default', () => {
        const params = new URLSearchParams();
        const amount = {
            min: DEFAULT_AMOUNT_VALUES.AMOUNT.MIN,
            max: DEFAULT_AMOUNT_VALUES.AMOUNT.MAX - 1000,
        };

        handleAmountUrlParams(amount, params, mockSetActiveFilters);

        expect(params.get(URL_PARAMS.AMOUNT_MIN)).toBe(amount.min.toString());
        expect(params.get(URL_PARAMS.AMOUNT_MAX)).toBe(amount.max.toString());
        expect(mockSetActiveFilters).toHaveBeenCalledWith(expect.any(Function));
        expect(mockSetActiveFilters.mock.calls[0][0]({ amount: false })).toEqual({ amount: true });
    });

    it('should handle max amount equal to default', () => {
        const params = new URLSearchParams();
        const amount = {
            min: DEFAULT_AMOUNT_VALUES.AMOUNT.MIN + 1000,
            max: DEFAULT_AMOUNT_VALUES.AMOUNT.MAX,
        };

        handleAmountUrlParams(amount, params, mockSetActiveFilters);

        expect(params.get(URL_PARAMS.AMOUNT_MIN)).toBe(amount.min.toString());
        expect(params.get(URL_PARAMS.AMOUNT_MAX)).toBe(amount.max.toString());
        expect(mockSetActiveFilters).toHaveBeenCalledWith(expect.any(Function));
        expect(mockSetActiveFilters.mock.calls[0][0]({ amount: false })).toEqual({ amount: true });
    });
}); 