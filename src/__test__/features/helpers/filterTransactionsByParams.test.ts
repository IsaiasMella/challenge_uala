import { describe, it, expect } from 'vitest';
import { filterTransactionsByParams } from '@/features/helpers/filterTransactionsByParams';
import { URL_PARAMS } from '@/constants/home/filters-sidebar/filters';
import type { Transaction } from '@/types/transactions';
import { mockTransactions } from '@/__test__/utils/mockData';

describe('filterTransactionsByParams', () => {
    it('should filter by date range', () => {
        const searchParams = new URLSearchParams();
        searchParams.set(URL_PARAMS.DATE_FROM, '2025-05-01');
        searchParams.set(URL_PARAMS.DATE_TO, '2025-05-02');


        const result = filterTransactionsByParams(mockTransactions, searchParams);
        expect(result).toHaveLength(2);
        expect(result.map((t: Transaction) => t.id)).toEqual(['1', '2']);
    });

    it('should filter by amount range', () => {
        const searchParams = new URLSearchParams();
        searchParams.set(URL_PARAMS.AMOUNT_MIN, '150');
        searchParams.set(URL_PARAMS.AMOUNT_MAX, '250');

        const result = filterTransactionsByParams(mockTransactions, searchParams);
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe('2');
    });

    it('should filter by card', () => {
        const searchParams = new URLSearchParams();
        searchParams.set(URL_PARAMS.CARD, 'visa');

        const result = filterTransactionsByParams(mockTransactions, searchParams);
        expect(result).toHaveLength(1);
        expect(result.every((t: Transaction) => t.card === 'visa')).toBe(true);
    });

    it('should filter by installments', () => {
        const searchParams = new URLSearchParams();
        searchParams.set(URL_PARAMS.INSTALLMENTS, '3,6');

        const result = filterTransactionsByParams(mockTransactions, searchParams);
        expect(result).toHaveLength(2);
        expect(result.map((t: Transaction) => t.installments)).toEqual([3, 6]);
    });

    it('should filter by payment method', () => {
        const searchParams = new URLSearchParams();
        searchParams.set(URL_PARAMS.PAYMENT_METHOD, 'qr');

        const result = filterTransactionsByParams(mockTransactions, searchParams);
        expect(result).toHaveLength(1);
        expect(result.every((t: Transaction) => t.paymentMethod === 'qr')).toBe(true);
    });

    it('should apply multiple filters', () => {
        const searchParams = new URLSearchParams();
        searchParams.set(URL_PARAMS.DATE_FROM, '2025-05-01');
        searchParams.set(URL_PARAMS.DATE_TO, '2025-05-02');
        searchParams.set(URL_PARAMS.CARD, 'visa');
        searchParams.set(URL_PARAMS.PAYMENT_METHOD, 'qr');

        const result = filterTransactionsByParams(mockTransactions, searchParams);
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe('1');
    });

    it('should return all transactions when no filters are applied', () => {
        const searchParams = new URLSearchParams();
        const result = filterTransactionsByParams(mockTransactions, searchParams);
        expect(result).toEqual(mockTransactions);
    });
});
