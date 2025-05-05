import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TransactionHistory } from '@/UI/sections/home/TransactionHistory';
import { useTransactionStore } from '@/store/transactionStore';
import { useSearchParams } from 'next/navigation';

// Mock the hooks and components
vi.mock('@/store/transactionStore', () => ({
  useTransactionStore: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn(),
}));

vi.mock('@/UI/sections/home/FilterSidebar', () => ({
  FilterSidebar: () => <div data-testid="filter-sidebar">Filter Sidebar</div>,
}));

vi.mock('@/UI/components/home/list-transactions/DateRangePicker', () => ({
  DateRangePicker: () => <div data-testid="date-range-picker">Date Range Picker</div>,
}));

vi.mock('@/UI/components/home/list-transactions/CardTransaction', () => ({
  CardTransaction: ({ transaction }: { transaction: any }) => (
    <div data-testid="card-transaction">{transaction.id}</div>
  ),
}));

vi.mock('@/UI/components/home/list-transactions/EmptyTransactions', () => ({
  EmptyTransactions: () => <div data-testid="empty-transactions">No transactions found</div>,
}));

vi.mock('@/UI/components/home/skeletons/collection', () => ({
  SkeletonCollection: () => <div data-testid="skeleton-collection">Loading...</div>,
}));

describe('TransactionHistory', () => {
  const mockTransactions = [
    { id: '1', amount: 100, description: 'Test 1' },
    { id: '2', amount: 200, description: 'Test 2' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (useSearchParams as any).mockReturnValue(new URLSearchParams());
  });

  it('should render loading state', () => {
    (useTransactionStore as any).mockReturnValue({
      isLoading: true,
      error: null,
      fetchTransactions: vi.fn(),
      filteredTransactions: [],
    });

    render(<TransactionHistory />);
    const skeletons = screen.getAllByTestId('skeleton-collection');
    expect(skeletons).toHaveLength(10);
  });

  it('should render error state', () => {
    (useTransactionStore as any).mockReturnValue({
      isLoading: false,
      error: 'Error message',
      fetchTransactions: vi.fn(),
      filteredTransactions: [],
    });

    render(<TransactionHistory />);
    expect(screen.getByText('Error al cargar las transacciones')).toBeInTheDocument();
  });

  it('should render empty state', () => {
    (useTransactionStore as any).mockReturnValue({
      isLoading: false,
      error: null,
      fetchTransactions: vi.fn(),
      filteredTransactions: [],
    });

    render(<TransactionHistory />);
    expect(screen.getByTestId('empty-transactions')).toBeInTheDocument();
  });

  it('should render transactions list', () => {
    (useTransactionStore as any).mockReturnValue({
      isLoading: false,
      error: null,
      fetchTransactions: vi.fn(),
      filteredTransactions: mockTransactions,
    });

    render(<TransactionHistory />);
    const transactions = screen.getAllByTestId('card-transaction');
    expect(transactions).toHaveLength(2);
  });

  it('should render filter sidebar and date range picker', () => {
    (useTransactionStore as any).mockReturnValue({
      isLoading: false,
      error: null,
      fetchTransactions: vi.fn(),
      filteredTransactions: mockTransactions,
    });

    render(<TransactionHistory />);
    expect(screen.getByTestId('filter-sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('date-range-picker')).toBeInTheDocument();
  });
}); 