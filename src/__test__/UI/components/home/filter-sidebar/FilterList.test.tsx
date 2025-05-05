import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FilterList } from '@/UI/components/home/filter-sidebar/FilterList'
import { FILTERS } from '@/constants/home/filters-sidebar/filters'
import { FilterState } from '@/types/sections/home/filterSidebar'

vi.mock('next/image', () => ({
  default: ({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) => (
    <img src={src} alt={alt} width={width} height={height} />
  )
}))

vi.mock('@/UI/components/home/filter-sidebar/filters/AmountFilter', () => ({
  AmountFilter: () => <div data-testid="amount-filter">Amount Filter</div>
}))

vi.mock('@/UI/components/home/filter-sidebar/filters/DateFilter', () => ({
  DateFilter: () => <div data-testid="date-filter">Date Filter</div>
}))

vi.mock('@/UI/components/home/filter-sidebar/filters/PaymentMethodFilter', () => ({
  PaymentMethodFilter: () => <div data-testid="payment-method-filter">Payment Method Filter</div>
}))

vi.mock('@/UI/components/home/filter-sidebar/filters/InstallmentsFilter', () => ({
  InstallmentsFilter: () => <div data-testid="installments-filter">Installments Filter</div>
}))

vi.mock('@/UI/components/home/filter-sidebar/filters/CardFilter', () => ({
  CardFilter: () => <div data-testid="card-filter">Card Filter</div>
}))

describe('FilterList', () => {
  const mockActiveFilters: Record<string, boolean> = {
    amount: false,
    date: false,
    paymentMethod: false,
    installments: false,
    card: false
  }

  const mockFilterValues: FilterState = {
    amount: {
      min: 0,
      max: 1000
    },
    date: undefined,
    paymentMethod: [],
    installments: [],
    card: []
  }

  const mockOnSwitchToggle = vi.fn()
  const mockOnChangeFilters = vi.fn()

  it('should render all filters', () => {
    render(
      <FilterList
        activeFilters={mockActiveFilters}
        filterValues={mockFilterValues}
        onSwitchToggle={mockOnSwitchToggle}
        onChangeFilters={mockOnChangeFilters}
      />
    )

    FILTERS.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument()
    })
  })

  it('should render filter icons', () => {
    render(
      <FilterList
        activeFilters={mockActiveFilters}
        filterValues={mockFilterValues}
        onSwitchToggle={mockOnSwitchToggle}
        onChangeFilters={mockOnChangeFilters}
      />
    )

    FILTERS.forEach(({ label }) => {
      expect(screen.getByAltText(`${label} icon`)).toBeInTheDocument()
    })
  })

  it('should call onSwitchToggle when switch changes', () => {
    render(
      <FilterList
        activeFilters={mockActiveFilters}
        filterValues={mockFilterValues}
        onSwitchToggle={mockOnSwitchToggle}
        onChangeFilters={mockOnChangeFilters}
      />
    )

    const switches = screen.getAllByRole('switch')
    fireEvent.click(switches[0])

    expect(mockOnSwitchToggle).toHaveBeenCalledWith(FILTERS[0].id)
  })

  it('should show filter component when active', () => {
    const activeFilters = { ...mockActiveFilters, amount: true }
    
    render(
      <FilterList
        activeFilters={activeFilters}
        filterValues={mockFilterValues}
        onSwitchToggle={mockOnSwitchToggle}
        onChangeFilters={mockOnChangeFilters}
      />
    )

    expect(screen.getByTestId('amount-filter')).toBeInTheDocument()
  })

  it('should have correct classes in main container', () => {
    render(
      <FilterList
        activeFilters={mockActiveFilters}
        filterValues={mockFilterValues}
        onSwitchToggle={mockOnSwitchToggle}
        onChangeFilters={mockOnChangeFilters}
      />
    )

    const main = screen.getByRole('main')
    expect(main).toHaveClass('flex-1')
    expect(main).toHaveClass('space-y-6')
    expect(main).toHaveClass('px-8')
    expect(main).toHaveClass('pt-3')
    expect(main).toHaveClass('overflow-y-auto')
    expect(main).toHaveClass('mb-24')
  })
})