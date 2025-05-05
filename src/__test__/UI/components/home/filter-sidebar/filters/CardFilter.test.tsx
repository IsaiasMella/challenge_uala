import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CardFilter } from '@/UI/components/home/filter-sidebar/filters/CardFilter';
import { useFilterSelection } from '@/hooks/useFilterSelection';
import type { Mock } from 'vitest';
import type { FilterState } from '@/types/sections/home/filterSidebar';

vi.mock('@/hooks/useFilterSelection', () => ({
  useFilterSelection: vi.fn()
}));

describe('CardFilter', () => {
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

  const mockHandleSelection = vi.fn();
  const mockIsSelected = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useFilterSelection as Mock).mockReturnValue({
      handleSelection: mockHandleSelection,
      isSelected: mockIsSelected
    });
  });

  it('renders all card toggles', () => {
    render(<CardFilter {...defaultProps} />);
    expect(screen.getByText('Todas')).toBeInTheDocument();
    expect(screen.getByText('Visa')).toBeInTheDocument();
    expect(screen.getByText('Mastercard')).toBeInTheDocument();
    expect(screen.getByText('Amex')).toBeInTheDocument();
  });

  it('calls handleSelection when a toggle is clicked', () => {
    render(<CardFilter {...defaultProps} />);
    const toggle = screen.getByText('Visa');
    fireEvent.click(toggle);
    expect(mockHandleSelection).toHaveBeenCalledWith('Visa');
  });

  it('shows selected state correctly', () => {
    mockIsSelected.mockImplementation((card: string) => card === 'Visa');
    render(<CardFilter {...defaultProps} />);
    const selectedToggle = screen.getByText('Visa');
    expect(selectedToggle.parentElement).toHaveClass('bg-blue-uala-ligther');
    const unselectedToggle = screen.getByText('Mastercard');
    expect(unselectedToggle.parentElement).not.toHaveClass('bg-blue-uala-ligther');
  });

  it('shows remove icon (×) only for selected items', () => {
    mockIsSelected.mockImplementation((card: string) => card === 'Visa');
    render(<CardFilter {...defaultProps} />);
    const selectedToggle = screen.getByText('Visa').parentElement;
    expect(selectedToggle).toHaveTextContent('×');
    const unselectedToggle = screen.getByText('Mastercard').parentElement;
    expect(unselectedToggle).not.toHaveTextContent('×');
  });

  it('renders toggles in correct order', () => {
    render(<CardFilter {...defaultProps} />);
    const toggles = screen.getAllByRole('button');
    const toggleLabels = toggles.map(toggle => {
      const label = toggle.querySelector('p');
      return label?.textContent?.trim();
    });
    expect(toggleLabels).toEqual(['Todas', 'Visa', 'Mastercard', 'Amex']);
  });

  it('handles "Todas" option correctly', () => {
    render(<CardFilter {...defaultProps} />);
    const todasToggle = screen.getByText('Todas');
    fireEvent.click(todasToggle);
    expect(mockHandleSelection).toHaveBeenCalledWith('Todas');
  });
});
