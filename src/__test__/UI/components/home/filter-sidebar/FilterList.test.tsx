import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FilterList } from '@/UI/components/home/filter-sidebar/FilterList'
import { FILTERS } from '@/constants/home/filters-sidebar/filters'
import { FilterId, FilterState } from '@/types/sections/home/filterSidebar'

// Mock de next/image
vi.mock('next/image', () => ({
  default: ({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) => (
    <img src={src} alt={alt} width={width} height={height} />
  )
}))

// Mock de los componentes de filtro
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

  it('debería renderizar todos los filtros', () => {
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

  it('debería renderizar los íconos de los filtros', () => {
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

  it('debería llamar a onSwitchToggle al cambiar el switch', () => {
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

  it('debería mostrar el componente de filtro cuando está activo', () => {
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

  it('debería tener las clases correctas en el contenedor principal', () => {
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