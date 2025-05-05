import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import { getDateRange } from '@/features/helpers/getDateRange';
import { TIME_RANGES } from '@/constants/home/home';

describe('getDateRange', () => {
  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-03-15T12:00:00Z'));
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('should return daily range', () => {
    const { startDate, endDate } = getDateRange(TIME_RANGES.DIARIO);

    expect(startDate.format('YYYY-MM-DD HH:mm:ss')).toBe('2024-03-15 00:00:00');
    expect(endDate.format('YYYY-MM-DD HH:mm:ss')).toBe('2024-03-15 23:59:59');
  });

  it('should return weekly range', () => {
    const { startDate, endDate } = getDateRange(TIME_RANGES.SEMANAL);

    expect(startDate.format('YYYY-MM-DD HH:mm:ss')).toBe('2024-03-08 00:00:00');
    expect(endDate.format('YYYY-MM-DD HH:mm:ss')).toBe('2024-03-15 23:59:59');
  });

  it('should return monthly range', () => {
    const { startDate, endDate } = getDateRange(TIME_RANGES.MENSUAL);

    expect(startDate.format('YYYY-MM-DD HH:mm:ss')).toBe('2024-02-14 00:00:00');
    expect(endDate.format('YYYY-MM-DD HH:mm:ss')).toBe('2024-03-15 23:59:59');
  });

  it('should return default range for unknown time range', () => {
    const { startDate, endDate } = getDateRange('unknown' as typeof TIME_RANGES[keyof typeof TIME_RANGES]);

    expect(startDate.utc().format('YYYY-MM-DD HH:mm:ss')).toBe('1970-01-01 00:00:00');
    expect(endDate.utc().format('YYYY-MM-DD HH:mm:ss')).toBe('2024-03-15 12:00:00');
  });
});
