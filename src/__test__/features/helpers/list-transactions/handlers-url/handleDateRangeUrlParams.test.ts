import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleDateRangeUrlParams } from '@/features/helpers/list-transactions/handlers-url/handleDateRangeUrlParams';
import { URL_PARAMS } from '@/constants/home/filters-sidebar/filters';
import moment from 'moment';

describe('handleDateRangeUrlParams', () => {
  const mockSetActiveFilters = vi.fn();

  beforeEach(() => {
    mockSetActiveFilters.mockClear();
  });

  it('should set date range parameters when both dates are provided', () => {
    const params = new URLSearchParams();
    const date = {
      from: moment.utc('2024-03-01').toDate(),
      to: moment.utc('2024-03-31').toDate(),
    };

    handleDateRangeUrlParams(date, params, mockSetActiveFilters);

    expect(params.get(URL_PARAMS.DATE_FROM)).toBe('2024-03-01');
    expect(params.get(URL_PARAMS.DATE_TO)).toBe('2024-03-31');
    expect(mockSetActiveFilters).toHaveBeenCalledWith(expect.any(Function));
    expect(mockSetActiveFilters.mock.calls[0][0]({ date: false })).toEqual({ date: true });
  });

  it('should handle only from date', () => {
    const params = new URLSearchParams();
    const date = {
      from: moment.utc('2024-03-01').toDate(),
      to: undefined,
    };

    handleDateRangeUrlParams(date, params, mockSetActiveFilters);

    expect(params.get(URL_PARAMS.DATE_FROM)).toBe('2024-03-01');
    expect(params.has(URL_PARAMS.DATE_TO)).toBe(false);
    expect(mockSetActiveFilters).toHaveBeenCalledWith(expect.any(Function));
    expect(mockSetActiveFilters.mock.calls[0][0]({ date: false })).toEqual({ date: true });
  });

  it('should handle only to date', () => {
    const params = new URLSearchParams();
    const date = {
      from: undefined,
      to: moment.utc('2024-03-31').toDate(),
    };

    handleDateRangeUrlParams(date, params, mockSetActiveFilters);

    expect(params.has(URL_PARAMS.DATE_FROM)).toBe(false);
    expect(params.get(URL_PARAMS.DATE_TO)).toBe('2024-03-31');
    expect(mockSetActiveFilters).toHaveBeenCalledWith(expect.any(Function));
    expect(mockSetActiveFilters.mock.calls[0][0]({ date: false })).toEqual({ date: true });
  });

  it('should delete date parameters when no dates are provided', () => {
    const params = new URLSearchParams();
    params.set(URL_PARAMS.DATE_FROM, '2024-03-01');
    params.set(URL_PARAMS.DATE_TO, '2024-03-31');
    const date = {
      from: undefined,
      to: undefined,
    };

    handleDateRangeUrlParams(date, params, mockSetActiveFilters);

    expect(params.has(URL_PARAMS.DATE_FROM)).toBe(false);
    expect(params.has(URL_PARAMS.DATE_TO)).toBe(false);
    expect(mockSetActiveFilters).not.toHaveBeenCalled();
  });

  it('should handle undefined date range', () => {
    const params = new URLSearchParams();
    params.set(URL_PARAMS.DATE_FROM, '2024-03-01');
    params.set(URL_PARAMS.DATE_TO, '2024-03-31');

    handleDateRangeUrlParams(undefined, params, mockSetActiveFilters);

    expect(params.has(URL_PARAMS.DATE_FROM)).toBe(false);
    expect(params.has(URL_PARAMS.DATE_TO)).toBe(false);
    expect(mockSetActiveFilters).not.toHaveBeenCalled();
  });
});
