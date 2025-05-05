import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SkeletonCollection } from '@/UI/components/home/skeletons/collection'

describe('SkeletonCollection', () => {
  it('should render two skeletons', () => {
    render(<SkeletonCollection />)
    const skeletons = screen.getAllByTestId('skeleton')
    expect(skeletons).toHaveLength(2)
  })

  it('should have correct classes in skeletons', () => {
    render(<SkeletonCollection />)
    const skeletons = screen.getAllByTestId('skeleton')
    expect(skeletons[0]).toHaveClass('max-w-[40px]')
    expect(skeletons[0]).toHaveClass('w-full')
    expect(skeletons[1]).toHaveClass('w-10/12')
  })

  it('should have correct classes in container', () => {
    render(<SkeletonCollection />)
    const skeletons = screen.getAllByTestId('skeleton')
    const container = skeletons[0].parentElement
    expect(container).toHaveClass('flex')
    expect(container).toHaveClass('gap-3')
    expect(container).toHaveClass('mx-1')
    expect(container).toHaveClass('mt-4')
  })
})
