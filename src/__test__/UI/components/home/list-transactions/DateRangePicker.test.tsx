import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { DateRangePicker } from '@/UI/components/home/list-transactions/DateRangePicker'
import { useTransactionStore } from '@/store/transactionStore'
import { useExcelTransactionExport } from '@/hooks/useExcelTransactionExport'

// Mock de los hooks
vi.mock('@/store/transactionStore', () => ({
  useTransactionStore: vi.fn()
}))

vi.mock('@/hooks/useExcelTransactionExport', () => ({
  useExcelTransactionExport: vi.fn()
}))

// Mock de next/image
vi.mock('next/image', () => ({
  default: ({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) => (
    <img src={src} alt={alt} width={width} height={height} />
  )
}))

describe('DateRangePicker', () => {
  const mockHandleDownload = vi.fn()

  beforeEach(() => {
    vi.mocked(useTransactionStore).mockReturnValue({
      transactions: []
    })

    vi.mocked(useExcelTransactionExport).mockReturnValue({
      handleDownload: mockHandleDownload
    })
  })

  it('debería renderizar el botón de descarga', () => {
    render(<DateRangePicker />)
    const downloadButton = screen.getByAltText('filters icon')
    expect(downloadButton).toBeInTheDocument()
    expect(downloadButton).toHaveAttribute('src', '/common/download.svg')
  })

  it('debería abrir el popover al hacer clic en el botón de descarga', () => {
    render(<DateRangePicker />)
    const downloadButton = screen.getByAltText('filters icon')
    fireEvent.click(downloadButton)
    
    expect(screen.getByText('Elegí las fechas que querés descargar')).toBeInTheDocument()
    expect(screen.getByAltText('calendar icon')).toBeInTheDocument()
  })

  it('debería mostrar los botones de acción en el popover', () => {
    render(<DateRangePicker />)
    const downloadButton = screen.getByAltText('filters icon')
    fireEvent.click(downloadButton)
    
    expect(screen.getByText('Cerrar')).toBeInTheDocument()
    expect(screen.getByText('Descargar')).toBeInTheDocument()
  })

  it('debería llamar a handleDownload al hacer clic en el botón Descargar', () => {
    render(<DateRangePicker />)
    const downloadButton = screen.getByAltText('filters icon')
    fireEvent.click(downloadButton)
    
    const downloadActionButton = screen.getByText('Descargar')
    fireEvent.click(downloadActionButton)
    
    expect(mockHandleDownload).toHaveBeenCalled()
  })

  it('debería cerrar el popover al hacer clic en el botón Cerrar', () => {
    render(<DateRangePicker />)
    const downloadButton = screen.getByAltText('filters icon')
    fireEvent.click(downloadButton)
    
    const closeButton = screen.getByText('Cerrar')
    fireEvent.click(closeButton)
    
    expect(screen.queryByText('Elegí las fechas que querés descargar')).not.toBeInTheDocument()
  })
}) 