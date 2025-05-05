import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleCardUrlParams } from '@/features/helpers/list-transactions/handlers-url/handleCardUrlParams';
import { URL_PARAMS, SEPARATORS } from '@/constants/home/filters-sidebar/filters';

describe('handleCardUrlParams', () => {
    const mockSetActiveFilters = vi.fn();

    beforeEach(() => {
        mockSetActiveFilters.mockClear();
    });

    it('should set card parameter when cards are selected', () => {
        const params = new URLSearchParams();
        const cards = ['visa', 'mastercard'];

        handleCardUrlParams(cards, params, mockSetActiveFilters);

        expect(params.get(URL_PARAMS.CARD)).toBe(cards.join(SEPARATORS.ARRAY));
        expect(mockSetActiveFilters).toHaveBeenCalledWith(expect.any(Function));
        expect(mockSetActiveFilters.mock.calls[0][0]({ card: false })).toEqual({ card: true });
    });

    it('should delete card parameter when no cards are selected', () => {
        const params = new URLSearchParams();
        params.set(URL_PARAMS.CARD, 'visa,mastercard');
        const cards: string[] = [];

        handleCardUrlParams(cards, params, mockSetActiveFilters);

        expect(params.has(URL_PARAMS.CARD)).toBe(false);
        expect(mockSetActiveFilters).not.toHaveBeenCalled();
    });

    it('should handle single card', () => {
        const params = new URLSearchParams();
        const cards = ['visa'];

        handleCardUrlParams(cards, params, mockSetActiveFilters);

        expect(params.get(URL_PARAMS.CARD)).toBe('visa');
        expect(mockSetActiveFilters).toHaveBeenCalledWith(expect.any(Function));
        expect(mockSetActiveFilters.mock.calls[0][0]({ card: false })).toEqual({ card: true });
    });

    it('should handle multiple cards', () => {
        const params = new URLSearchParams();
        const cards = ['visa', 'mastercard', 'amex'];

        handleCardUrlParams(cards, params, mockSetActiveFilters);

        expect(params.get(URL_PARAMS.CARD)).toBe(cards.join(SEPARATORS.ARRAY));
        expect(mockSetActiveFilters).toHaveBeenCalledWith(expect.any(Function));
        expect(mockSetActiveFilters.mock.calls[0][0]({ card: false })).toEqual({ card: true });
    });
}); 