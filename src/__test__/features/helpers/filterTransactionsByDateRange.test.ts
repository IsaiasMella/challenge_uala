import { describe, it, expect } from 'vitest';
import { filterTransactionsByDateRange } from '@/features/helpers/filterTransactionsByDateRange';
import type { Transaction, Card, PaymentMethod } from '@/types/transactions';
import moment from 'moment';

describe('filterTransactionsByDateRange', () => {
    const mockTransactions: Transaction[] = [
        {
            id: '1',
            amount: 1000,
            card: 'visa' as Card,
            installments: 1,
            paymentMethod: 'qr' as PaymentMethod,
            createdAt: '2024-03-15T10:00:00Z',
            updatedAt: '2024-03-15T10:00:00Z',
        },
        {
            id: '2',
            amount: 2000,
            card: 'mastercard' as Card,
            installments: 3,
            paymentMethod: 'mpos' as PaymentMethod,
            createdAt: '2024-03-15T15:00:00Z',
            updatedAt: '2024-03-15T15:00:00Z',
        },
        {
            id: '3',
            amount: 3000,
            card: 'visa' as Card,
            installments: 6,
            paymentMethod: 'qr' as PaymentMethod,
            createdAt: '2024-03-16T10:00:00Z',
            updatedAt: '2024-03-16T10:00:00Z',
        },
    ];

    it('should filter transactions within date range', () => {
        const fromDate = moment('2024-03-15T00:00:00Z');
        const toDate = moment('2024-03-15T23:59:59Z');

        const result = filterTransactionsByDateRange(mockTransactions, fromDate, toDate);
        expect(result).toHaveLength(2);
        expect(result.map(t => t.id)).toEqual(['1', '2']);
    });

    it('should include transactions exactly on start date', () => {
        const fromDate = moment('2024-03-15T10:00:00Z');
        const toDate = moment('2024-03-15T23:59:59Z');

        const result = filterTransactionsByDateRange(mockTransactions, fromDate, toDate);
        expect(result).toHaveLength(2);
        expect(result[0].id).toBe('1');
    });

    it('should include transactions exactly on end date', () => {
        const fromDate = moment('2024-03-15T00:00:00Z');
        const toDate = moment('2024-03-15T15:00:00Z');

        const result = filterTransactionsByDateRange(mockTransactions, fromDate, toDate);
        expect(result).toHaveLength(2);
        expect(result[1].id).toBe('2');
    });

    it('should return empty array when no transactions match date range', () => {
        const fromDate = moment('2024-03-17T00:00:00Z');
        const toDate = moment('2024-03-17T23:59:59Z');

        const result = filterTransactionsByDateRange(mockTransactions, fromDate, toDate);
        expect(result).toHaveLength(0);
    });

    it('should handle empty transactions array', () => {
        const fromDate = moment('2024-03-15T00:00:00Z');
        const toDate = moment('2024-03-15T23:59:59Z');

        const result = filterTransactionsByDateRange([], fromDate, toDate);
        expect(result).toHaveLength(0);
    });
}); 