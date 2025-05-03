export interface Transaction {
  id: string;
  amount: number;
  card: string;
  installments: number;
  createdAt: string;
  updatedAt: string;
  paymentMethod: string;
} 