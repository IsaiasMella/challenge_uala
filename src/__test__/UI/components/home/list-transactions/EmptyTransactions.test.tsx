import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { EmptyTransactions } from '@/UI/components/home/list-transactions/EmptyTransactions'

vi.mock('next/image', () => ({
  default: ({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) => (
    <img src={src} alt={alt} width={width} height={height} />
  )
}))

describe('EmptyTransactions', () => {
  it('should render the image with correct attributes', () => {
    render(<EmptyTransactions />)
    const image = screen.getByAltText('magnifier')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/magnifier.svg')
    expect(image).toHaveAttribute('width', '72')
    expect(image).toHaveAttribute('height', '72')
  })

  it('should display the no results message', () => {
    render(<EmptyTransactions />)
    expect(screen.getByText('No hay resultados que mostrar. Podés probar usando los filtros.')).toBeInTheDocument()
  })

  it('should have correct classes in container', () => {
    render(<EmptyTransactions />)
    const container = screen.getByText('No hay resultados que mostrar. Podés probar usando los filtros.').parentElement
    expect(container).toHaveClass('m-auto')
    expect(container).toHaveClass('flex')
    expect(container).toHaveClass('flex-col')
    expect(container).toHaveClass('items-center')
    expect(container).toHaveClass('justify-center')
    expect(container).toHaveClass('gap-4')
    expect(container).toHaveClass('sm:py-12')
    expect(container).toHaveClass('py-6')
    expect(container).toHaveClass('sm:w-5/12')
  })
})