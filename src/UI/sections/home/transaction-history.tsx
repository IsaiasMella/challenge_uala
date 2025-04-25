"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import moment from "moment";
import "moment/locale/es";

import { DateRangePicker } from "@/UI/components/home/DateRangePicker";
import { SkeletonCollection } from "@/UI/components/home/skeletons/collection";
import { useTransactionStore } from "@/store/transactionStore";
import { useFilteredTransactions } from "@/hooks/useFilteredTransactions";
import { useRangeStore } from "@/store/rangeStore";
import { TYPE_PAYMENT_METHOD } from "@/constants";
import { FilterSidebar } from "@/UI/components/home/FilterSidebar";

const getPaymentMethod = (method: string) => {
  return TYPE_PAYMENT_METHOD[method as keyof typeof TYPE_PAYMENT_METHOD] || method;
};

export const TransactionHistory = () => {
  const { transactions, isLoading, error, fetchTransactions } = useTransactionStore();
  const { selectedRange } = useRangeStore();
  const filteredTransactions = useFilteredTransactions(transactions, selectedRange);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const formatDate = useCallback((date: string | Date) => {
    return moment(date).format('DD/MM/YYYY');
  }, []);

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
