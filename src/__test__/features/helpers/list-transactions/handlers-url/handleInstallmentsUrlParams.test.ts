import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleInstallmentsUrlParams } from '@/features/helpers/list-transactions/handlers-url/handleInstallmentsUrlParams';
import { URL_PARAMS, SEPARATORS } from '@/constants/home/filters-sidebar/filters';

describe('handleInstallmentsUrlParams', () => {
    const mockSetActiveFilters = vi.fn();

    beforeEach(() => {
        mockSetActiveFilters.mockClear();
    });

    it('should set installments parameter when installments are selected', () => {
        const params = new URLSearchParams();
        const installments = ['3', '6'];

        handleInstallmentsUrlParams(installments, params, mockSetActiveFilters);

        expect(params.get(URL_PARAMS.INSTALLMENTS)).toBe(installments.join(SEPARATORS.ARRAY));
        expect(mockSetActiveFilters).toHaveBeenCalledWith(expect.any(Function));
        expect(mockSetActiveFilters.mock.calls[0][0]({ installments: false })).toEqual({ installments: true });
    });

    it('should delete installments parameter when no installments are selected', () => {
        const params = new URLSearchParams();
        params.set(URL_PARAMS.INSTALLMENTS, '3,6');
        const installments: string[] = [];

        handleInstallmentsUrlParams(installments, params, mockSetActiveFilters);

        expect(params.has(URL_PARAMS.INSTALLMENTS)).toBe(false);
        expect(mockSetActiveFilters).not.toHaveBeenCalled();
    });

    it('should handle single installment', () => {
        const params = new URLSearchParams();
        const installments = ['3'];

        handleInstallmentsUrlParams(installments, params, mockSetActiveFilters);

        expect(params.get(URL_PARAMS.INSTALLMENTS)).toBe('3');
        expect(mockSetActiveFilters).toHaveBeenCalledWith(expect.any(Function));
        expect(mockSetActiveFilters.mock.calls[0][0]({ installments: false })).toEqual({ installments: true });
    });

    it('should handle multiple installments', () => {
        const params = new URLSearchParams();
        const installments = ['3', '6', '12', '18'];

        handleInstallmentsUrlParams(installments, params, mockSetActiveFilters);

        expect(params.get(URL_PARAMS.INSTALLMENTS)).toBe(installments.join(SEPARATORS.ARRAY));
        expect(mockSetActiveFilters).toHaveBeenCalledWith(expect.any(Function));
        expect(mockSetActiveFilters.mock.calls[0][0]({ installments: false })).toEqual({ installments: true });
    });
}); 