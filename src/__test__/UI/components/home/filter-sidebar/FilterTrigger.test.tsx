import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FilterTrigger } from '@/UI/components/home/filter-sidebar/FilterTrigger'
import { Sheet } from '@/common/sheet'

vi.mock('next/image', () => ({
  default: ({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) => (
    <img src={src} alt={alt} width={width} height={height} />
  )
}))

const renderWithSheet = (ui: React.ReactNode) => render(<Sheet open>{ui}</Sheet>)

describe('FilterTrigger', () => {
  it('should render the filter button', () => {
    renderWithSheet(<FilterTrigger activeFiltersCount={0} />)
    const filterButton = screen.getByAltText('Abrir filtros')
    expect(filterButton).toBeInTheDocument()
    expect(filterButton).toHaveAttribute('src', '/common/filters.svg')
  })

  it('should not show counter when there are no active filters', () => {
    renderWithSheet(<FilterTrigger activeFiltersCount={0} />)
    expect(screen.queryByText('0')).not.toBeInTheDocument()
  })

  it('should show counter when there are active filters', () => {
    renderWithSheet(<FilterTrigger activeFiltersCount={3} />)
    const counter = screen.getByText('3')
    expect(counter).toBeInTheDocument()
    expect(counter).toHaveClass('absolute')
    expect(counter).toHaveClass('-top-2')
    expect(counter).toHaveClass('-right-2')
    expect(counter).toHaveClass('bg-blue-uala')
    expect(counter).toHaveClass('text-white')
  })

  it('should have correct classes in container', () => {
    renderWithSheet(<FilterTrigger activeFiltersCount={0} />)
    const container = screen.getByAltText('Abrir filtros').parentElement
    expect(container).toHaveClass('relative')
  })
})
