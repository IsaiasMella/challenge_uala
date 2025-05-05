import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { EmptyTransactions } from '@/UI/components/home/list-transactions/EmptyTransactions'

// Mock de next/image
vi.mock('next/image', () => ({
  default: ({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) => (
    <img src={src} alt={alt} width={width} height={height} />
  )
}))

describe('EmptyTransactions', () => {
  it('debería renderizar la imagen con los atributos correctos', () => {
    render(<EmptyTransactions />)
    const image = screen.getByAltText('magnifier')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/magnifier.svg')
    expect(image).toHaveAttribute('width', '72')
    expect(image).toHaveAttribute('height', '72')
  })

  it('debería mostrar el mensaje de no resultados', () => {
    render(<EmptyTransactions />)
    expect(screen.getByText('No hay resultados que mostrar. Podés probar usando los filtros.')).toBeInTheDocument()
  })

  it('debería tener las clases correctas en el contenedor', () => {
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