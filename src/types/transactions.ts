export interface Transaction {
  id: string;
  amount: number;
  card: Card;
  installments: number;
  createdAt: Date;
  updatedAt: Date;
  paymentMethod: PaymentMethod;
}

export type Card = "mastercard" | "amex" | "visa";

export type PaymentMethod = "qr" | "mpos" | "pospro" | "link";
