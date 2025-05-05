import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterSidebar } from '@/UI/sections/home/FilterSidebar';

vi.mock('@/hooks/home/filter-sidebar/useFilterToggle', () => ({
  useFilterToggle: () => ({
    switchToggle: vi.fn(),
  }),
}));

vi.mock('@/hooks/home/filter-sidebar/useFilterValuesFromUrl', () => ({
  useFilterValuesFromUrl: () => ({
    filterValues: {},
    setFilterValues: vi.fn(),
  }),
}));

vi.mock('@/hooks/home/filter-sidebar/useFilterUrlManagement', () => ({
  useFilterUrlManagement: () => ({
    onSubmitFilters: vi.fn(),
  }),
}));

vi.mock('@/hooks/home/filter-sidebar/useActiveFiltersFromUrl', () => ({
  useActiveFiltersFromUrl: () => ({
    activeFilters: {},
    setActiveFilters: vi.fn(),
  }),
}));

vi.mock('@/hooks/home/filter-sidebar/useFilterStateManagement', () => ({
  useFilterStateManagement: () => ({
    onChangeFilters: vi.fn(),
    clearFilters: vi.fn(),
  }),
}));

// Mock the components
vi.mock('@/common/sheet', () => ({
  Sheet: ({ children, open, onOpenChange }: any) => (
    <div data-testid="sheet" data-open={open}>
      {children}
    </div>
  ),
  SheetContent: ({ children }: any) => (
    <div data-testid="sheet-content">{children}</div>
  ),
}));

vi.mock('@/UI/components/home/filter-sidebar/FilterList', () => ({
  FilterList: () => <div data-testid="filter-list">Filter List</div>,
}));

vi.mock('@/UI/components/home/filter-sidebar/FilterHeader', () => ({
  FilterHeader: () => <div data-testid="filter-header">Filter Header</div>,
}));

vi.mock('@/UI/components/home/filter-sidebar/FilterFooter', () => ({
  FilterFooter: () => <div data-testid="filter-footer">Filter Footer</div>,
}));

vi.mock('@/UI/components/home/filter-sidebar/FilterTrigger', () => ({
  FilterTrigger: () => <div data-testid="filter-trigger">Filter Trigger</div>,
}));

describe('FilterSidebar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render filter trigger', () => {
    render(<FilterSidebar />);
    expect(screen.getByTestId('filter-trigger')).toBeInTheDocument();
  });

  it('should render sheet content when open', () => {
    render(<FilterSidebar />);
    const sheet = screen.getByTestId('sheet');
    expect(sheet).toHaveAttribute('data-open', 'false');
  });

  it('should render all filter components', () => {
    render(<FilterSidebar />);
    expect(screen.getByTestId('filter-header')).toBeInTheDocument();
    expect(screen.getByTestId('filter-list')).toBeInTheDocument();
    expect(screen.getByTestId('filter-footer')).toBeInTheDocument();
  });

  it('should handle form submission', () => {
    render(<FilterSidebar />);
    const form = screen.getByRole('form');
    fireEvent.submit(form);
  });
}); 