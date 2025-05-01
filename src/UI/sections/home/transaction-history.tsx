"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import moment from "moment";
import "moment/locale/es";
import { useSearchParams } from "next/navigation";

import { useTransactionStore } from "@/store/transactionStore";
import { 
  filterByDateRange, 
  filterByCards, 
  filterByInstallments, 
  filterByAmountRange, 
  filterByPaymentMethods 
} from "@/features/actions/filterTransactions";

import { FilterSidebar } from "@/UI/components/home/FilterSidebar";
import { DateRangePicker } from "@/UI/components/home/DateRangePicker";
import { SkeletonCollection } from "@/UI/components/home/skeletons/collection";

import { getPaymentMethod } from "@/features/helpers/getPaymentMethod";

export const TransactionHistory = () => {
  const { transactions, isLoading, error, fetchTransactions } = useTransactionStore();
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);

  const searchParams = useSearchParams();

  const formatDate = useCallback((date: string | Date) => {
    return moment(date).format('DD/MM/YYYY');
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  useEffect(() => {
    if (!transactions) return;

    // Obtener los parámetros de filtrado
    const dateStr = searchParams.get('date');
    const amountMin = searchParams.get('amountMin');
    const amountMax = searchParams.get('amountMax');
    const cards = searchParams.get('card')?.split(',').filter(Boolean);
    const installments = searchParams.get('installments')?.split(',').filter(Boolean);
    const paymentMethods = searchParams.get('paymentMethod')?.split(',').filter(Boolean);

    // Preparar el rango de fechas
    let dateRange;
    if (dateStr) {
      const [from, to] = dateStr.split('|').map(d => new Date(d));
      dateRange = { from, to };
    }

    // Aplicar los filtros secuencialmente
    let result = transactions;
    result = filterByDateRange(result, dateRange);
    result = filterByCards(result, cards);
    result = filterByInstallments(result, installments);
    result = filterByAmountRange(result, amountMin || amountMax ? {
      min: Number(amountMin),
      max: Number(amountMax)
    } : undefined);
    result = filterByPaymentMethods(result, paymentMethods);

    console.log('result', result)

    setFilteredTransactions(result);
  }, [transactions, searchParams]);

  return (
    <section className="my-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium ">Historial de transacciones</h2>
        <div className="flex gap-4">
          <FilterSidebar />
          <DateRangePicker />
        </div>
      </div>
      {isLoading ? (
        Array.from({ length: 10 }).map((_, index) => <SkeletonCollection key={index} />)
      ) : error ? (
        <p className="text-red-500">Error al cargar las transacciones</p>
      ) : (
        filteredTransactions?.map((transaction) => (
          <div key={transaction.id} className="py-2 flex border-b border-gray-200 items-center gap-3 mx-1">
            <div className="max-w-[40px] w-full h-10 flex items-center justify-center">
              <Image src={`/category-stores-in.svg`} height={24} width={24} alt={`${transaction.paymentMethod} icon`} />
            </div>
            <div className="w-10/12 h-10  flex items-center justify-between px-4">
              <div className="flex flex-col">
                <p>{getPaymentMethod(transaction.paymentMethod)}</p>
                <p>Venta</p>
              </div>
              <div className="flex flex-col items-end">
                <p>+${transaction.amount}</p>
                <small>{formatDate(transaction.createdAt)}</small>
              </div>
            </div>
          </div>
        ))
      )}
    </section>
  );
};
