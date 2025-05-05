import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FilterHeader } from '@/UI/components/home/filter-sidebar/FilterHeader'
import { Sheet } from '@/common/sheet'

vi.mock('next/image', () => ({
  default: ({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) => (
    <img src={src} alt={alt} width={width} height={height} />
  )
}))

const renderWithSheet = (ui: React.ReactNode) => {
  return render(<Sheet open>{ui}</Sheet>)
}

describe('FilterHeader', () => {
  it('should render title and back button', () => {
    renderWithSheet(<FilterHeader onClearFilters={() => {}} />)
    expect(screen.getByText('Filtros')).toBeInTheDocument()
    expect(screen.getByAltText('Volver')).toBeInTheDocument()
  })

  it('should render clear filters button', () => {
    renderWithSheet(<FilterHeader onClearFilters={() => {}} />)
    expect(screen.getByText('Limpiar')).toBeInTheDocument()
  })

  it('should call onClearFilters when clicking clear button', () => {
    const mockOnClearFilters = vi.fn()
    renderWithSheet(<FilterHeader onClearFilters={mockOnClearFilters} />)

    const clearButton = screen.getByText('Limpiar')
    fireEvent.click(clearButton)

    expect(mockOnClearFilters).toHaveBeenCalled()
  })

  it('should have correct classes in header', () => {
    renderWithSheet(<FilterHeader onClearFilters={() => {}} />)
    const header = screen.getByText('Filtros').closest('header')
    expect(header).toHaveClass('px-6')
    expect(header).toHaveClass('pt-12')
    expect(header).toHaveClass('pb-4')
  })

  it('should have correct classes in clear button', () => {
    renderWithSheet(<FilterHeader onClearFilters={() => {}} />)
    const clearButton = screen.getByText('Limpiar')
    expect(clearButton).toHaveClass('text-gray-400')
    expect(clearButton).toHaveClass('hover:text-gray-600')
    expect(clearButton).toHaveClass('transition-colors')
  })
})
