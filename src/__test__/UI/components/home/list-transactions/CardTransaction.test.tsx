import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CardTransaction } from '@/UI/components/home/list-transactions/CardTransaction'
import { Transaction, PaymentMethod, Card } from '@/types/transactions'
import { TYPE_PAYMENT_METHOD } from '@/constants/home/home'

vi.mock('next/image', () => ({
  default: ({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) => (
    <img src={src} alt={alt} width={width} height={height} />
  )
}))

vi.mock('moment', () => ({
  default: () => ({
    format: () => '01/01/2024'
  })
}))

vi.mock('@/features/helpers/getPaymentMethod', () => {
  return {
    getPaymentMethod: (method: string) => {
      const PAYMENT_METHOD_LABELS: Record<string, string> = {
        CREDIT_CARD: "Tarjeta de crédito",
        DEBIT_CARD: "Tarjeta de débito",
        CASH: "Efectivo",
        QR: TYPE_PAYMENT_METHOD.qr,
        MPOS: TYPE_PAYMENT_METHOD.mpos,
        POSPRO: TYPE_PAYMENT_METHOD.pospro,
        LINK: TYPE_PAYMENT_METHOD.link
      };
      return PAYMENT_METHOD_LABELS[method] ?? method;
    }
  };
})

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

  it('should render the image with correct attributes', () => {
    render(<CardTransaction transaction={mockTransaction} />)
    const image = screen.getByAltText('CREDIT_CARD icon')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/category-stores-in.svg')
    expect(image).toHaveAttribute('width', '24')
    expect(image).toHaveAttribute('height', '24')
  })

  it('should display the payment method correctly', () => {
    render(<CardTransaction transaction={mockTransaction} />)
    expect(screen.getByText('Tarjeta de crédito')).toBeInTheDocument()
  })

  it('should display the formatted amount correctly', () => {
    render(<CardTransaction transaction={mockTransaction} />)
    expect(screen.getByText(/\+\$\s*1\.000,00/, { exact: false })).toBeInTheDocument()
  })  

  it('should display the formatted date correctly', () => {
    render(<CardTransaction transaction={mockTransaction} />)
    expect(screen.getByText('01/01/2024')).toBeInTheDocument()
  })

  it('should display the transaction type', () => {
    render(<CardTransaction transaction={mockTransaction} />)
    expect(screen.getByText('Venta')).toBeInTheDocument()
  })

  it('should have correct classes in container', () => {
    render(<CardTransaction transaction={mockTransaction} />)
    const container = screen.getByText('Venta').closest('div')?.parentElement?.parentElement
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
