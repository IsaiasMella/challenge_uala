import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CardTransaction } from '@/UI/components/home/list-transactions/CardTransaction'
import { Transaction, PaymentMethod, Card } from '@/types/transactions'

// Mock de next/image
vi.mock('next/image', () => ({
  default: ({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) => (
    <img src={src} alt={alt} width={width} height={height} />
  )
}))

// Mock de moment
vi.mock('moment', () => ({
  default: () => ({
    format: () => '01/01/2024'
  })
}))

describe('CardTransaction', () => {
  const mockTransaction: Transaction = {
    id: '1',
    amount: 1000,
    paymentMethod: 'CREDIT_CARD' as PaymentMethod,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    card: 'VISA' as Card,
    installments: 1
  }

  it('debería renderizar la imagen con los atributos correctos', () => {
    render(<CardTransaction transaction={mockTransaction} />)
    const image = screen.getByAltText('credit_card icon')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/category-stores-in.svg')
    expect(image).toHaveAttribute('width', '24')
    expect(image).toHaveAttribute('height', '24')
  })

  it('debería mostrar el método de pago correctamente', () => {
    render(<CardTransaction transaction={mockTransaction} />)
    expect(screen.getByText('Tarjeta de crédito')).toBeInTheDocument()
  })

  it('debería mostrar el monto formateado correctamente', () => {
    render(<CardTransaction transaction={mockTransaction} />)
    expect(screen.getByText('+$ 1.000,00')).toBeInTheDocument()
  })

  it('debería mostrar la fecha formateada correctamente', () => {
    render(<CardTransaction transaction={mockTransaction} />)
    expect(screen.getByText('01/01/2024')).toBeInTheDocument()
  })

  it('debería mostrar el tipo de transacción', () => {
    render(<CardTransaction transaction={mockTransaction} />)
    expect(screen.getByText('Venta')).toBeInTheDocument()
  })

  it('debería tener las clases correctas en el contenedor', () => {
    render(<CardTransaction transaction={mockTransaction} />)
    const container = screen.getByText('Venta').closest('div')?.parentElement
    expect(container).toHaveClass('py-2')
    expect(container).toHaveClass('flex')
    expect(container).toHaveClass('justify-between')
    expect(container).toHaveClass('border-b')
    expect(container).toHaveClass('border-gray-200')
    expect(container).toHaveClass('items-center')
    expect(container).toHaveClass('gap-3')
    expect(container).toHaveClass('mx-1')
  })
}) 