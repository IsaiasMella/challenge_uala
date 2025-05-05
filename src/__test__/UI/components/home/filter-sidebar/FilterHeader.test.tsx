import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FilterHeader } from '@/UI/components/home/filter-sidebar/FilterHeader'

// Mock de next/image
vi.mock('next/image', () => ({
  default: ({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) => (
    <img src={src} alt={alt} width={width} height={height} />
  )
}))

describe('FilterHeader', () => {
  it('debería renderizar el título y el botón de volver', () => {
    render(<FilterHeader onClearFilters={() => {}} />)
    expect(screen.getByText('Filtros')).toBeInTheDocument()
    expect(screen.getByAltText('Volver')).toBeInTheDocument()
  })

  it('debería renderizar el botón de limpiar filtros', () => {
    render(<FilterHeader onClearFilters={() => {}} />)
    expect(screen.getByText('Limpiar')).toBeInTheDocument()
  })

  it('debería llamar a onClearFilters al hacer clic en el botón de limpiar', () => {
    const mockOnClearFilters = vi.fn()
    render(<FilterHeader onClearFilters={mockOnClearFilters} />)
    
    const clearButton = screen.getByText('Limpiar')
    fireEvent.click(clearButton)
    
    expect(mockOnClearFilters).toHaveBeenCalled()
  })

  it('debería tener las clases correctas en el header', () => {
    render(<FilterHeader onClearFilters={() => {}} />)
    const header = screen.getByText('Filtros').closest('header')
    expect(header).toHaveClass('px-6')
    expect(header).toHaveClass('pt-12')
    expect(header).toHaveClass('pb-4')
  })

  it('debería tener las clases correctas en el botón de limpiar', () => {
    render(<FilterHeader onClearFilters={() => {}} />)
    const clearButton = screen.getByText('Limpiar')
    expect(clearButton).toHaveClass('text-gray-400')
    expect(clearButton).toHaveClass('hover:text-gray-600')
    expect(clearButton).toHaveClass('transition-colors')
  })
}) 