import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PaymentMethodFilter } from '@/UI/components/home/filter-sidebar/filters/PaymentMethodFilter';
import type { FilterState } from '@/types/sections/home/filterSidebar';
import { TYPE_PAYMENT_METHOD } from '@/constants/home/home';
import type { PaymentMethod } from '@/types/transactions';
import { useFilterSelection } from '@/hooks/useFilterSelection';

vi.mock('@/hooks/useFilterSelection', () => ({
  useFilterSelection: vi.fn()
}));

describe('PaymentMethodFilter', () => {
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

  it('renders all payment method toggles', () => {
    render(<PaymentMethodFilter {...defaultProps} />);
    Object.values(TYPE_PAYMENT_METHOD).forEach(label => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('calls handleSelection when a toggle is clicked', () => {
    render(<PaymentMethodFilter {...defaultProps} />);
    const firstToggle = screen.getByText(TYPE_PAYMENT_METHOD.link);
    fireEvent.click(firstToggle);
    expect(mockHandleSelection).toHaveBeenCalledWith('link');
  });

  it('shows selected state correctly', () => {
    mockIsSelected.mockImplementation((key: PaymentMethod) => key === 'link');
    render(<PaymentMethodFilter {...defaultProps} />);
    expect(screen.getByText(TYPE_PAYMENT_METHOD.link).parentElement).toHaveClass('bg-blue-uala-ligther');
    expect(screen.getByText(TYPE_PAYMENT_METHOD.qr).parentElement).not.toHaveClass('bg-blue-uala-ligther');
  });

  it('shows remove icon (×) only for selected items', () => {
    mockIsSelected.mockImplementation((key: PaymentMethod) => key === 'link');
    render(<PaymentMethodFilter {...defaultProps} />);
    expect(screen.getByText(TYPE_PAYMENT_METHOD.link).parentElement).toHaveTextContent('×');
    expect(screen.getByText(TYPE_PAYMENT_METHOD.qr).parentElement).not.toHaveTextContent('×');
  });

  it('renders toggles in correct order', () => {
    render(<PaymentMethodFilter {...defaultProps} />);
    const toggles = screen.getAllByRole('button');
    const toggleLabels = toggles.map(toggle => {
      const pTag = toggle.querySelector('p');
      return pTag?.textContent?.trim();
    });

    expect(toggleLabels).toEqual([
      TYPE_PAYMENT_METHOD.link,
      TYPE_PAYMENT_METHOD.qr,
      TYPE_PAYMENT_METHOD.mpos,
      TYPE_PAYMENT_METHOD.pospro
    ]);
  });
});
