import { describe, it, expect } from 'vitest';
import { parseDateRange } from '@/features/helpers/list-transactions/parseDateRange';
import { URL_PARAMS } from '@/constants/home/filters-sidebar/filters';
import moment from 'moment';

describe('parseDateRange', () => {
    it('should parse valid date range from URL params', () => {
        const params = new URLSearchParams();
        params.set(URL_PARAMS.DATE_FROM, '2024-03-01');
        params.set(URL_PARAMS.DATE_TO, '2024-03-31');

        const result = parseDateRange(params);

        expect(result).toEqual({
            from: moment('2024-03-01', 'YYYY-MM-DD').toDate(),
            to: moment('2024-03-31', 'YYYY-MM-DD').toDate(),
        });
    });

    it('should handle only from date', () => {
        const params = new URLSearchParams();
        params.set(URL_PARAMS.DATE_FROM, '2024-03-01');

        const result = parseDateRange(params);

        expect(result).toEqual({
            from: moment('2024-03-01', 'YYYY-MM-DD').toDate(),
            to: undefined,
        });
    });

    it('should handle only to date', () => {
        const params = new URLSearchParams();
        params.set(URL_PARAMS.DATE_TO, '2024-03-31');

        const result = parseDateRange(params);

        expect(result).toEqual({
            from: undefined,
            to: moment('2024-03-31', 'YYYY-MM-DD').toDate(),
        });
    });

    it('should return undefined when no dates are present', () => {
        const params = new URLSearchParams();

        const result = parseDateRange(params);

        expect(result).toBeUndefined();
    });

    it('should return undefined when dates are invalid', () => {
        const params = new URLSearchParams();
        params.set(URL_PARAMS.DATE_FROM, 'invalid-date');
        params.set(URL_PARAMS.DATE_TO, 'invalid-date');

        const result = parseDateRange(params);

        expect(result).toBeUndefined();
    });

    it('should handle mixed valid and invalid dates', () => {
        const params = new URLSearchParams();
        params.set(URL_PARAMS.DATE_FROM, '2024-03-01');
        params.set(URL_PARAMS.DATE_TO, 'invalid-date');

        const result = parseDateRange(params);

        expect(result).toBeUndefined();
    });
}); 