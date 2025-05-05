import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TotalAmount } from '@/UI/components/home/collections/TotalAmount'

describe('TotalAmount', () => {
  it('should render skeleton when loading', () => {
    render(<TotalAmount isLoading={true} totalAmount={{ integer: '0', decimal: '00' }} error={null} />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('should render total amount correctly', () => {
    render(<TotalAmount isLoading={false} totalAmount={{ integer: '1,234', decimal: '56' }} error={null} />)
    expect(screen.getByText('+$1,234,')).toBeInTheDocument()
    expect(screen.getByText('56')).toBeInTheDocument()
  })

  it('should not show plus sign when there is an error', () => {
    render(<TotalAmount isLoading={false} totalAmount={{ integer: '1,234', decimal: '56' }} error="Error" />)
    expect(screen.queryByText('+$1,234,')).not.toBeInTheDocument()
    expect(screen.getByText('$1,234,')).toBeInTheDocument()
  })
}) 