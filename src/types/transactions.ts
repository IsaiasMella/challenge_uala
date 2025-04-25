export interface Transaction {
  id: string;
  amount: number;
  card: Card;
  installments: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  paymentMethod: PaymentMethod;
}

export type Card = "mastercard" | "amex" | "visa";

export type PaymentMethod = "qr" | "mpos" | "pospro" | "link";
