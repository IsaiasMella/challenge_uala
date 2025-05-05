import { describe, it, expect } from 'vitest';
import { calendarFormatters } from '../../../../features/helpers/calendar/calendarFormatters';

describe('calendarFormatters', () => {
  describe('formatWeekdayName', () => {
    it('should format Monday correctly', () => {
      const monday = new Date(2025, 4, 5); // 5 mayo 2025 es lunes
      expect(calendarFormatters.formatWeekdayName(monday)).toBe('Lun');
    });

    it('should format Tuesday correctly', () => {
      const tuesday = new Date(2025, 4, 6);
      expect(calendarFormatters.formatWeekdayName(tuesday)).toBe('Mar');
    });

    it('should format Wednesday correctly', () => {
      const wednesday = new Date(2025, 4, 7);
      expect(calendarFormatters.formatWeekdayName(wednesday)).toBe('Mié');
    });

    it('should format Thursday correctly', () => {
      const thursday = new Date(2025, 4, 8);
      expect(calendarFormatters.formatWeekdayName(thursday)).toBe('Jue');
    });

    it('should format Friday correctly', () => {
      const friday = new Date(2025, 4, 9);
      expect(calendarFormatters.formatWeekdayName(friday)).toBe('Vie');
    });

    it('should format Saturday correctly', () => {
      const saturday = new Date(2025, 4, 10); // 10 mayo 2025 es sábado
      expect(calendarFormatters.formatWeekdayName(saturday)).toBe('Sáb');
    });

    it('should format Sunday correctly', () => {
      const sunday = new Date(2025, 4, 11); // 11 mayo 2025 es domingo
      expect(calendarFormatters.formatWeekdayName(sunday)).toBe('Dom');
    });
  });
});
