import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useFilterSelection } from '@/hooks/useFilterSelection';

describe('useFilterSelection', () => {
  const mockOptions = ['option1', 'option2', 'option3'] as const;
  const mockAllOption = 'all' as const;
  const mockOnSelectionChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should handle normal option selection', () => {
    const { result } = renderHook(() =>
      useFilterSelection({
        options: mockOptions,
        currentSelection: [],
        onSelectionChange: mockOnSelectionChange,
      })
    );

    result.current.handleSelection('option1');
    expect(mockOnSelectionChange).toHaveBeenCalledWith(['option1']);
  });

  it('should handle option deselection', () => {
    const { result } = renderHook(() =>
      useFilterSelection({
        options: mockOptions,
        currentSelection: ['option1', 'option2'],
        onSelectionChange: mockOnSelectionChange,
      })
    );

    result.current.handleSelection('option1');
    expect(mockOnSelectionChange).toHaveBeenCalledWith(['option2']);
  });

  it('should handle "All" option selection', () => {
    const { result } = renderHook(() =>
      useFilterSelection({
        options: mockOptions,
        allOption: mockAllOption,
        currentSelection: [],
        onSelectionChange: mockOnSelectionChange,
      })
    );

    result.current.handleSelection('all');
    expect(mockOnSelectionChange).toHaveBeenCalledWith(['all']);
  });

  it('should handle "All" option deselection', () => {
    const { result } = renderHook(() =>
      useFilterSelection({
        options: mockOptions,
        allOption: mockAllOption,
        currentSelection: ['all'],
        onSelectionChange: mockOnSelectionChange,
      })
    );

    result.current.handleSelection('all');
    expect(mockOnSelectionChange).toHaveBeenCalledWith([]);
  });

  it('should select specific option when "All" is selected', () => {
    const { result } = renderHook(() =>
      useFilterSelection({
        options: mockOptions,
        allOption: mockAllOption,
        currentSelection: ['all'],
        onSelectionChange: mockOnSelectionChange,
      })
    );

    result.current.handleSelection('option1');
    expect(mockOnSelectionChange).toHaveBeenCalledWith(['option1']);
  });

  it('should select "All" when all options are selected', () => {
    const { result } = renderHook(() =>
      useFilterSelection({
        options: mockOptions,
        allOption: mockAllOption,
        currentSelection: ['option1', 'option2'],
        onSelectionChange: mockOnSelectionChange,
      })
    );

    result.current.handleSelection('option3');
    expect(mockOnSelectionChange).toHaveBeenCalledWith(['all']);
  });

  it('should correctly check if an option is selected', () => {
    const { result } = renderHook(() =>
      useFilterSelection({
        options: mockOptions,
        currentSelection: ['option1', 'option2'],
        onSelectionChange: mockOnSelectionChange,
      })
    );

    expect(result.current.isSelected('option1')).toBe(true);
    expect(result.current.isSelected('option2')).toBe(true);
    expect(result.current.isSelected('option3')).toBe(false);
  });
}); 