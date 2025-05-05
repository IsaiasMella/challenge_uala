import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TimeRangeSelector } from '@/UI/components/home/collections/TimeRangeSelector'
import { useRangeStore } from '@/store/rangeStore'
import { useTransactionStore } from '@/store/transactionStore'
import { TIME_RANGES } from '@/constants/home/home'

vi.mock('@/store/rangeStore', () => ({
  useRangeStore: vi.fn()
}))

vi.mock('@/store/transactionStore', () => ({
  useTransactionStore: vi.fn()
}))

describe('TimeRangeSelector', () => {
  const mockSetSelectedRange = vi.fn()
  const mockSetFilteredTransactions = vi.fn()

  beforeEach(() => {
    vi.mocked(useRangeStore).mockReturnValue({
      selectedRange: 'SEMANAL',
      setSelectedRange: mockSetSelectedRange
    })

    vi.mocked(useTransactionStore).mockReturnValue({
      transactions: [],
      setFilteredTransactions: mockSetFilteredTransactions
    })
  })

  it('should render all time ranges', () => {
    render(<TimeRangeSelector />)
    Object.values(TIME_RANGES).forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument()
    })
  })

  it('should show selected range with different style', () => {
    render(<TimeRangeSelector />)
    const selectedButton = screen.getByText(TIME_RANGES.SEMANAL)
    expect(selectedButton).toHaveClass('font-medium')
  })

  it('should hide indicator for unselected range', () => {
    render(<TimeRangeSelector />)
    const unselectedButton = screen.getByText(TIME_RANGES.MENSUAL)
    const indicator = unselectedButton.closest('li')?.querySelector('div')
    expect(indicator).toHaveClass('opacity-0')
  })
})
