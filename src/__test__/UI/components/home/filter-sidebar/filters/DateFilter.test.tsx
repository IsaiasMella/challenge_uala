import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DateFilter } from '@/UI/components/home/filter-sidebar/filters/DateFilter';
import type { FilterState } from '@/types/sections/home/filterSidebar';
import { useDateFilter } from '@/hooks/useDateFilter';
import type { Mock } from 'vitest';

vi.mock('@/hooks/useDateFilter', () => ({
  useDateFilter: vi.fn()
}));

describe('DateFilter', () => {
  const mockOnApply = vi.fn();
  const defaultProps = {
    committedFilters: {
      date: undefined,
      card: [],
      installments: [],
      amount: { min: 0, max: 500 },
      paymentMethod: []
    } as FilterState,
    onApply: mockOnApply
  };

  const mockDateRange = {
    from: new Date('2024-01-01'),
    to: new Date('2024-01-07')
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useDateFilter as Mock).mockReturnValue({
      selectedDate: mockDateRange,
      handleDateSelect: vi.fn(),
      handleClearSelection: vi.fn(),
      formatWeekdayName: (date: Date) => date.toLocaleDateString('es-ES', { weekday: 'short' })
    });
  });

  it('renders correctly with default values', () => {
    render(<DateFilter {...defaultProps} />);
    
    expect(screen.getByRole('grid')).toBeInTheDocument();
    
    const clearButton = screen.getByText('Borrar');
    expect(clearButton).toBeInTheDocument();
  });

  it('disables clear button when no date is selected', () => {
    (useDateFilter as Mock).mockReturnValue({
      selectedDate: undefined,
      handleDateSelect: vi.fn(),
      handleClearSelection: vi.fn(),
      formatWeekdayName: (date: Date) => date.toLocaleDateString('es-ES', { weekday: 'short' })
    });

    render(<DateFilter {...defaultProps} />);
    
    const clearButton = screen.getByText('Borrar');
    expect(clearButton).toBeDisabled();
  });

  it('enables clear button when date is selected', () => {
    render(<DateFilter {...defaultProps} />);
    
    const clearButton = screen.getByText('Borrar');
    expect(clearButton).not.toBeDisabled();
  });

  it('calls handleClearSelection when clear button is clicked', () => {
    const mockHandleClearSelection = vi.fn();
    (useDateFilter as Mock).mockReturnValue({
      selectedDate: mockDateRange,
      handleDateSelect: vi.fn(),
      handleClearSelection: mockHandleClearSelection,
      formatWeekdayName: (date: Date) => date.toLocaleDateString('es-ES', { weekday: 'short' })
    });

    render(<DateFilter {...defaultProps} />);
    
    const clearButton = screen.getByText('Borrar');
    fireEvent.click(clearButton);
    
    expect(mockHandleClearSelection).toHaveBeenCalled();
  });

  it('renders calendar with Spanish weekday names', () => {
    render(<DateFilter {...defaultProps} />);
    
    expect(screen.getByText(/lun\.?/i)).toBeInTheDocument();
  });
});
