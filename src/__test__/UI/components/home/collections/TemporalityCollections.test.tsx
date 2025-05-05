import { vi } from 'vitest'

vi.mock('@/store/rangeStore', () => ({
  useRangeStore: vi.fn()
}))

vi.mock('@/store/transactionStore', () => ({
  useTransactionStore: vi.fn()
}))

vi.mock('@/UI/components/home/collections/TimeRangeSelector', () => ({
  TimeRangeSelector: () => <div data-testid="mock-time-range-selector" />
}))

import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TemporalityCollections } from '@/UI/components/home/collections/TemporalityCollections'
import { useRangeStore } from '@/store/rangeStore'
import { useTransactionStore } from '@/store/transactionStore'

describe('TemporalityCollections', () => {
  const mockTransactions = [
    { amount: 1000, createdAt: '2024-01-01' },
    { amount: 2000, createdAt: '2024-01-02' }
  ]

  beforeEach(() => {
    vi.mocked(useRangeStore).mockReturnValue({
      selectedRange: 'week',
      setSelectedRange: vi.fn()
    })

    vi.mocked(useTransactionStore).mockReturnValue({
      filteredTransactions: mockTransactions,
      isLoading: false,
      error: null
    })
  })

  it('should render the time range selector', () => {
    render(<TemporalityCollections />)
    expect(screen.getByTestId('mock-time-range-selector')).toBeInTheDocument()
  })

  it('should render the total amount', () => {
    render(<TemporalityCollections />)
    expect(
      screen.getByText((content) => content.includes('+$3.000'))
    ).toBeInTheDocument()
    expect(screen.getByText('00')).toBeInTheDocument()
  })

  it('should show skeleton when loading', () => {
    vi.mocked(useTransactionStore).mockReturnValue({
      filteredTransactions: [],
      isLoading: true,
      error: null
    })

    render(<TemporalityCollections />)
    expect(screen.getByTestId('skeleton')).toBeInTheDocument()
  })


  it('should handle error state', () => {
    vi.mocked(useTransactionStore).mockReturnValue({
      filteredTransactions: [],
      isLoading: false,
      error: 'Error loading transactions'
    })

    render(<TemporalityCollections />)
    expect(screen.getByText('$0,')).toBeInTheDocument()
    expect(screen.getByText('00')).toBeInTheDocument()
  })
})
