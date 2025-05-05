import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SkeletonCollection } from '@/UI/components/home/skeletons/collection'

describe('SkeletonCollection', () => {
  it('debería renderizar dos esqueletos', () => {
    render(<SkeletonCollection />)
    const skeletons = screen.getAllByRole('status')
    expect(skeletons).toHaveLength(2)
  })

  it('debería tener las clases correctas en los esqueletos', () => {
    render(<SkeletonCollection />)
    const skeletons = screen.getAllByRole('status')
    
    // Primer esqueleto (más pequeño)
    expect(skeletons[0]).toHaveClass('max-w-[40px]')
    expect(skeletons[0]).toHaveClass('w-full')
    
    // Segundo esqueleto (más grande)
    expect(skeletons[1]).toHaveClass('w-10/12')
  })

  it('debería tener el contenedor con las clases correctas', () => {
    render(<SkeletonCollection />)
    const container = screen.getByRole('status').parentElement
    expect(container).toHaveClass('flex')
    expect(container).toHaveClass('gap-3')
    expect(container).toHaveClass('mx-1')
    expect(container).toHaveClass('mt-4')
  })
}) 