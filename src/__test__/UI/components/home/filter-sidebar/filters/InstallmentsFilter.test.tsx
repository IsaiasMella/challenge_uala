import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { InstallmentsFilter } from '@/UI/components/home/filter-sidebar/filters/InstallmentsFilter';
import type { FilterState } from '@/types/sections/home/filterSidebar';
import { useFilterSelection } from '@/hooks/useFilterSelection';

vi.mock('@/hooks/useFilterSelection', () => ({
  useFilterSelection: vi.fn()
}));

describe('InstallmentsFilter', () => {
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

  it('renders all installment toggles', () => {
    render(<InstallmentsFilter {...defaultProps} />);
    expect(screen.getByText('Todas')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  it('calls handleSelection when a toggle is clicked', () => {
    render(<InstallmentsFilter {...defaultProps} />);
    const toggle = screen.getByText('1');
    fireEvent.click(toggle);
    expect(mockHandleSelection).toHaveBeenCalledWith('1');
  });

  it('shows selected state correctly', () => {
    mockIsSelected.mockImplementation((installment: string) => installment === '1');
    render(<InstallmentsFilter {...defaultProps} />);
    const selected = screen.getByText('1').parentElement;
    const unselected = screen.getByText('2').parentElement;
    expect(selected).toHaveClass('bg-blue-uala-ligther');
    expect(unselected).not.toHaveClass('bg-blue-uala-ligther');
  });

  it('shows remove icon (×) only for selected items', () => {
    mockIsSelected.mockImplementation((installment: string) => installment === '1');
    render(<InstallmentsFilter {...defaultProps} />);
    expect(screen.getByText('1').parentElement).toHaveTextContent('×');
    expect(screen.getByText('2').parentElement).not.toHaveTextContent('×');
  });

  it('renders toggles in correct order', () => {
    render(<InstallmentsFilter {...defaultProps} />);
    const toggles = screen.getAllByRole('button');
    const toggleLabels = toggles.map(toggle => {
      const pTag = toggle.querySelector('p');
      return pTag?.textContent?.trim();
    });
    expect(toggleLabels).toEqual(['Todas', '1', '2', '3', '6', '12']);
  });

  it('handles "Todas" option correctly', () => {
    render(<InstallmentsFilter {...defaultProps} />);
    const todasToggle = screen.getByText('Todas');
    fireEvent.click(todasToggle);
    expect(mockHandleSelection).toHaveBeenCalledWith('Todas');
  });
});
