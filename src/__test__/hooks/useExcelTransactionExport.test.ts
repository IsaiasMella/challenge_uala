import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useExcelTransactionExport } from '@/hooks/useExcelTransactionExport';
import { toast } from 'sonner';
import * as xlsx from 'xlsx';
import type { Transaction } from '@/types/transactions';
import type { WorkSheet } from 'xlsx';

vi.mock('sonner', () => ({
  toast: {
    custom: vi.fn(),
  },
}));

vi.mock('xlsx', async () => {
  const actual = await vi.importActual<typeof import('xlsx')>('xlsx');
  return {
    ...actual,
    utils: {
      ...actual.utils,
      book_new: vi.fn(() => ({ mocked: true })),
      json_to_sheet: vi.fn(() => ({ sheet: true } as WorkSheet)),
      book_append_sheet: vi.fn(),
    },
    writeFile: vi.fn(),
  };
});

describe('useExcelTransactionExport', () => {
  const mockTransactions: Transaction[] = [
    {
      id: '1',
      amount: 100,
      card: 'visa',
      installments: 1,
      createdAt: '2024-03-20T10:00:00Z',
      updatedAt: '2024-03-20T10:00:00Z',
      paymentMethod: 'qr',
    },
  ];

  const mockDate = {
    from: new Date('2024-03-20'),
    to: new Date('2024-03-20'),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not download if date is not provided', () => {
    const { result } = renderHook(() =>
      useExcelTransactionExport({
        date: undefined,
        transactions: mockTransactions,
        labelToast: 'No transactions found',
      })
    );

    result.current.handleDownload();
    expect(xlsx.writeFile).not.toHaveBeenCalled();
  });

  it('should not download if transactions are not provided', () => {
    const { result } = renderHook(() =>
      useExcelTransactionExport({
        date: mockDate,
        transactions: undefined,
        labelToast: 'No transactions found',
      })
    );

    result.current.handleDownload();
    expect(xlsx.writeFile).not.toHaveBeenCalled();
  });

  it('should show toast when no transactions are found in date range', () => {
    const { result } = renderHook(() =>
      useExcelTransactionExport({
        date: {
          from: new Date('2024-03-21'),
          to: new Date('2024-03-21'),
        },
        transactions: mockTransactions,
        labelToast: 'No transactions found',
      })
    );

    result.current.handleDownload();
    expect(toast.custom).toHaveBeenCalled();
    expect(xlsx.writeFile).not.toHaveBeenCalled();
  });

});
