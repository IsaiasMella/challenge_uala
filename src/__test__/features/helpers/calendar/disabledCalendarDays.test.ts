import { describe, it, expect } from 'vitest';
import { disabledCalendarDays } from '../../../../features/helpers/calendar/disabledCalendarDays';
import moment from 'moment';

describe('disabledCalendarDays', () => {
    it('should have from date set to tomorrow', () => {
        const tomorrow = moment().add(1, 'days').startOf('day').toDate();
        const fromDate = moment(disabledCalendarDays.from).startOf('day').toDate();
        expect(fromDate).toEqual(tomorrow);
    });

    it('should have to date set to 2026-01-01', () => {
        const expectedDate = moment('2026-01-01').startOf('day').toDate();
        const toDate = moment(disabledCalendarDays.to).startOf('day').toDate();
        expect(toDate).toEqual(expectedDate);
    });

    it('should have from date before to date', () => {
        expect(disabledCalendarDays.from.getTime()).toBeLessThan(disabledCalendarDays.to.getTime());
    });
}); 