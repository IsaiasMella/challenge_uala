import { Transaction } from "@/types/transactions";

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    createdAt: '2025-05-01T10:00:00Z',
    amount: 100,
    paymentMethod: 'qr',
    card: 'visa',
    installments: 1,
    updatedAt: '2025-05-01T10:00:00Z'
  },
  {
    id: '2',
    createdAt: '2025-05-02T10:00:00Z',
    amount: 200,
    paymentMethod: 'mpos',
    card: 'mastercard',
    installments: 3,
    updatedAt: '2025-05-02T10:00:00Z'
  },
  {
    id: '3',
    createdAt: '2025-05-03T10:00:00Z',
    amount: 300,
    paymentMethod: 'pospro',
    card: 'amex',
    installments: 6,
    updatedAt: '2025-05-03T10:00:00Z'
  }
];
