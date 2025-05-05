import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FilterTrigger } from '@/UI/components/home/filter-sidebar/FilterTrigger'

// Mock de next/image
vi.mock('next/image', () => ({
  default: ({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) => (
    <img src={src} alt={alt} width={width} height={height} />
  )
}))

describe('FilterTrigger', () => {
  it('debería renderizar el botón de filtros', () => {
    render(<FilterTrigger activeFiltersCount={0} />)
    const filterButton = screen.getByAltText('Abrir filtros')
    expect(filterButton).toBeInTheDocument()
    expect(filterButton).toHaveAttribute('src', '/common/filters.svg')
  })

  it('no debería mostrar el contador cuando no hay filtros activos', () => {
    render(<FilterTrigger activeFiltersCount={0} />)
    expect(screen.queryByText('0')).not.toBeInTheDocument()
  })

  it('debería mostrar el contador cuando hay filtros activos', () => {
    render(<FilterTrigger activeFiltersCount={3} />)
    const counter = screen.getByText('3')
    expect(counter).toBeInTheDocument()
    expect(counter).toHaveClass('absolute')
    expect(counter).toHaveClass('-top-2')
    expect(counter).toHaveClass('-right-2')
    expect(counter).toHaveClass('bg-blue-uala')
    expect(counter).toHaveClass('text-white')
  })

  it('debería tener las clases correctas en el contenedor', () => {
    render(<FilterTrigger activeFiltersCount={0} />)
    const container = screen.getByAltText('Abrir filtros').parentElement
    expect(container).toHaveClass('relative')
  })
}) 