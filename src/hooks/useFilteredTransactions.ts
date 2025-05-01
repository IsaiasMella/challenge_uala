import { useMemo } from "react";
import { Transaction } from "@/types/transactions";
import { TIME_RANGES } from "@/constants/home/home";
import moment from "moment";
import "moment/locale/es";
import { useSearchParams } from "next/navigation";

export const useFilteredTransactions = (transactions: Transaction[], range: string) => {
  const searchParams = useSearchParams();
  
  const getDateRange = (range: string) => {
    const now = moment();
    const startDate = moment(now);

    switch (range) {
      case TIME_RANGES.DIARIO:
        startDate.startOf('day');
        return { startDate, endDate: moment(now).endOf('day') };
      case TIME_RANGES.SEMANAL:
        startDate.subtract(6, 'days').startOf('day');
        return { startDate, endDate: moment(now).endOf('day') };
      case TIME_RANGES.MENSUAL:
        startDate.startOf('month');
        return { startDate, endDate: moment(now).endOf('day') };
      default:
        return { startDate: moment(0), endDate: now };
    }
  };

  return useMemo(() => {
    if (!transactions) return [];

    const { startDate, endDate } = getDateRange(range);
    
    // Obtener todos los filtros de la URL
    const selectedCards = searchParams.get('card')?.split(',').filter(Boolean) || [];
    const selectedDate = searchParams.get('date')?.split(',').filter(Boolean) || [];
    const selectedAmount = searchParams.get('amount')?.split(',').filter(Boolean) || [];
    const selectedInstallments = searchParams.get('installments')?.split(',').filter(Boolean) || [];
    const selectedPaymentMethod = searchParams.get('paymentMethod')?.split(',').filter(Boolean) || [];

    // Siempre filtramos desde las transacciones originales
    return transactions.filter(transaction => {
      // Filtro por fecha
      const transactionDate = moment(transaction.createdAt);
      const isInDateRange = transactionDate.isBetween(startDate, endDate, undefined, '[]');
      if (!isInDateRange) return false;

      // Filtro por tarjeta
      if (selectedCards.length > 0 && !selectedCards.includes('todas')) {
        if (!selectedCards.includes(transaction.card.toLowerCase())) return false;
      }

      // Filtro por fecha específica
      if (selectedDate.length > 0) {
        if (!selectedDate.includes(moment(transaction.createdAt).format('YYYY-MM-DD'))) return false;
      }

      // Filtro por monto
      if (selectedAmount.length > 0) {
        if (!selectedAmount.includes(transaction.amount.toString())) return false;
      }

      // Filtro por cuotas
      if (selectedInstallments.length > 0) {
        if (!selectedInstallments.includes(transaction.installments.toString())) return false;
      }

      // Filtro por método de pago
      if (selectedPaymentMethod.length > 0) {
        if (!selectedPaymentMethod.includes(transaction.paymentMethod)) return false;
      }

      return true;
    });
  }, [transactions, range, searchParams]);
};
