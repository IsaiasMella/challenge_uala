import { Transaction } from "@/types/transactions";
import moment from "moment";

interface FilterParams {
  transactions: Transaction[];
  dateRange?: { from: Date; to: Date };
  cards?: string[];
  installments?: string[];
  amountRange?: { min: number; max: number };
  paymentMethods?: string[];
}

export const filterTransactions = ({
  transactions,
  dateRange,
  cards,
  installments,
  amountRange,
  paymentMethods,
}: FilterParams): Transaction[] => {
  let result = [...transactions];

  // Filtro por rango de fechas
  result = filterByDateRange(result, dateRange);

  // Filtro por tarjetas
  result = filterByCards(result, cards);

  // Filtro por cuotas
  result = filterByInstallments(result, installments);

  // Filtro por rango de monto
  result = filterByAmountRange(result, amountRange);

  // Filtro por método de pago
  result = filterByPaymentMethods(result, paymentMethods);

  return result;
};

export const filterByDateRange = (transactions: Transaction[], dateRange?: { from: Date; to: Date }) => {
  if (!dateRange) return transactions;
  
  return transactions.filter((transaction) => {
    const transactionDate = moment(transaction.createdAt);
    return transactionDate.isBetween(dateRange.from, dateRange.to, undefined, '[]');
  });
};

export const filterByCards = (transactions: Transaction[], cards?: string[]) => {
  if (!cards || cards.length === 0 || cards.includes('todas')) return transactions;
  
  return transactions.filter((transaction) => 
    cards.includes(transaction.card.toLowerCase())
  );
};

export const filterByInstallments = (transactions: Transaction[], installments?: string[]) => {
  if (!installments || installments.length === 0) return transactions;
  
  return transactions.filter((transaction) =>
    installments.includes(transaction.installments.toString())
  );
};

export const filterByAmountRange = (transactions: Transaction[], amountRange?: { min: number; max: number }) => {
  if (!amountRange) return transactions;
  
  return transactions.filter((transaction) =>
    transaction.amount >= amountRange.min && transaction.amount <= amountRange.max
  );
};

export const filterByPaymentMethods = (transactions: Transaction[], paymentMethods?: string[]) => {
  if (!paymentMethods || paymentMethods.length === 0) return transactions;

  console.log('paymentMethods', paymentMethods)
  console.log('transactions', transactions)
  
  return transactions.filter((transaction) => 
    paymentMethods.includes(transaction.paymentMethod.toLowerCase())
  );
}; 