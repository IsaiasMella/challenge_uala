import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Collections } from '@/UI/sections/home/Collections';

vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} data-testid="next-image" />
  ),
}));

vi.mock('@/common/button', () => ({
  Button: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <button className={className} data-testid="button">
      {children}
    </button>
  ),
}));

vi.mock('@/UI/components/home/collections/TemporalityCollections', () => ({
  TemporalityCollections: () => <div data-testid="temporality-collections">Temporality Collections</div>,
}));

describe('Collections', () => {
  it('should render the collections header', () => {
    render(<Collections />);
    expect(screen.getByText('Tus cobros')).toBeInTheDocument();
  });

  it('should render the temporality collections component', () => {
    render(<Collections />);
    expect(screen.getByTestId('temporality-collections')).toBeInTheDocument();
  });

  it('should render the metrics button with correct content', () => {
    render(<Collections />);
    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();
    expect(screen.getByText('Ver métricas')).toBeInTheDocument();
    expect(screen.getByTestId('next-image')).toHaveAttribute('alt', 'metrics icon');
  });

  it('should have correct accessibility attributes', () => {
    render(<Collections />);
    expect(screen.getByText('Cobros')).toHaveAttribute('class', 'sr-only');
  });
}); 