import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ToastNoDataForTransactionsExcel } from '@/UI/components/home/list-transactions/ToastNoDataForTransactionsExcel'

describe('ToastNoDataForTransactionsExcel', () => {
  it('debería renderizar el mensaje correctamente', () => {
    const message = 'No hay datos para exportar'
    render(<ToastNoDataForTransactionsExcel message={message} />)
    expect(screen.getByText(message)).toBeInTheDocument()
  })

  it('debería tener las clases correctas en el contenedor', () => {
    render(<ToastNoDataForTransactionsExcel message="Test" />)
    const container = screen.getByText('Test').parentElement
    expect(container).toHaveClass('bg-blue-uala-dark')
    expect(container).toHaveClass('text-white')
    expect(container).toHaveClass('px-4')
    expect(container).toHaveClass('py-3')
    expect(container).toHaveClass('rounded-md')
  })
}) 