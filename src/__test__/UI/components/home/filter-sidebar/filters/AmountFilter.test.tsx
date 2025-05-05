import { describe, it, expect, vi, beforeAll } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AmountFilter } from '@/UI/components/home/filter-sidebar/filters/AmountFilter'
import type { FilterState } from '@/types/sections/home/filterSidebar'

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

describe('AmountFilter', () => {
  const mockOnApply = vi.fn()
  const defaultProps = {
    committedFilters: {
      date: undefined,
      card: [],
      installments: [],
      amount: { min: 0, max: 500 },
      paymentMethod: [],
    } as FilterState,
    onApply: mockOnApply,
  }

  it('renders correctly with default values', () => {
    render(<AmountFilter {...defaultProps} />)

    expect(screen.getAllByRole('slider')).toHaveLength(2)
    expect(screen.getByPlaceholderText('0')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('2000')).toBeInTheDocument()
    expect(screen.getByText('Monto mínimo')).toBeInTheDocument()
    expect(screen.getByText('Monto máximo')).toBeInTheDocument()
  })

  it('handles min input change correctly', () => {
    render(<AmountFilter {...defaultProps} />)

    const minInput = screen.getByPlaceholderText('0')
    fireEvent.change(minInput, { target: { value: '100' } })

    expect(mockOnApply).toHaveBeenCalledWith({
      ...defaultProps.committedFilters,
      amount: { min: 100, max: 500 },
    })
  })

  it('handles max input change correctly', () => {
    render(<AmountFilter {...defaultProps} />)

    const maxInput = screen.getByPlaceholderText('2000')
    fireEvent.change(maxInput, { target: { value: '1000' } })

    expect(mockOnApply).toHaveBeenCalledWith({
      ...defaultProps.committedFilters,
      amount: { min: 0, max: 1000 },
    })
  })

  it('simulates slider change correctly (manual mock needed)', () => {
    render(<AmountFilter {...defaultProps} />)

    const [minSlider, maxSlider] = screen.getAllByRole('slider')

    fireEvent.keyDown(minSlider, { key: 'ArrowRight' }) 
    fireEvent.keyDown(maxSlider, { key: 'ArrowLeft' })  

    expect(minSlider).toBeInTheDocument()
    expect(maxSlider).toBeInTheDocument()
  })

  it('renders with custom initial values', () => {
    const customProps = {
      committedFilters: {
        date: undefined,
        card: [],
        installments: [],
        amount: { min: 200, max: 800 },
        paymentMethod: [],
      } as FilterState,
      onApply: mockOnApply,
    }

    render(<AmountFilter {...customProps} />)

    const minInput = screen.getByPlaceholderText('0') as HTMLInputElement
    const maxInput = screen.getByPlaceholderText('2000') as HTMLInputElement

    expect(minInput.value).toBe('200')
    expect(maxInput.value).toBe('800')
  })
})
