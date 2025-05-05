import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FilterFooter } from '@/UI/components/home/filter-sidebar/FilterFooter'

describe('FilterFooter', () => {
  it('should render the apply filters button', () => {
    render(<FilterFooter activeFiltersCount={0} />)
    expect(screen.getByText('Aplicar filtros')).toBeInTheDocument()
  })

  it('should be disabled when there are no active filters', () => {
    render(<FilterFooter activeFiltersCount={0} />)
    const button = screen.getByText('Aplicar filtros')
    expect(button).toBeDisabled()
    expect(button).toHaveClass('opacity-50')
    expect(button).toHaveClass('cursor-not-allowed')
  })

  it('should be enabled when there are active filters', () => {
    render(<FilterFooter activeFiltersCount={3} />)
    const button = screen.getByText('Aplicar filtros')
    expect(button).not.toBeDisabled()
    expect(button).not.toHaveClass('opacity-50')
    expect(button).not.toHaveClass('cursor-not-allowed')
  })

  it('should have the correct classes in the footer', () => {
    render(<FilterFooter activeFiltersCount={0} />)
    const footer = screen.getByText('Aplicar filtros').closest('footer')
    expect(footer).toHaveClass('absolute')
    expect(footer).toHaveClass('bottom-0')
    expect(footer).toHaveClass('left-0')
    expect(footer).toHaveClass('right-0')
    expect(footer).toHaveClass('z-99')
    expect(footer).toHaveClass('mb-2')
    expect(footer).toHaveClass('px-6')
  })

  it('should have the correct classes in the button', () => {
    render(<FilterFooter activeFiltersCount={3} />)
    const button = screen.getByText('Aplicar filtros')
    expect(button).toHaveClass('h-12')
    expect(button).toHaveClass('w-full')
    expect(button).toHaveClass('rounded-full')
    expect(button).toHaveClass('bg-blue-uala')
    expect(button).toHaveClass('text-white')
    expect(button).toHaveClass('hover:bg-blue-uala/90')
    expect(button).toHaveClass('transition-colors')
  })
}) 