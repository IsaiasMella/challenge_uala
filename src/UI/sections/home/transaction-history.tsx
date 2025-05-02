"use client";

import { useCallback, useEffect, useState } from "react";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

import moment from "moment";
import "moment/locale/es";

import { useTransactionStore } from "@/store/transactionStore";

import { FilterSidebar } from "@/UI/components/home/FilterSidebar";
import { DateRangePicker } from "@/UI/components/home/DateRangePicker";
import { SkeletonCollection } from "@/UI/components/home/skeletons/collection";

import { getPaymentMethod } from "@/features/helpers/getPaymentMethod";
import { filterTransactionsByParams } from "@/features/helpers/filterTransactionsByParams";

const money = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
}).format;

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
    const filtered = filterTransactionsByParams(transactions, searchParams);

    console.log('filtered', filtered);

    setFilteredTransactions(filtered);
  }, [transactions, searchParams]);

  return (
    <section className="my-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium">Historial de transacciones</h2>
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
        filteredTransactions?.toReversed().map((transaction) => (
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
                <p>+{money(transaction.amount)}</p>
                <small>{formatDate(transaction.createdAt)}</small>
              </div>
            </div>
          </div>
        ))
      )}
    </section>
  );
};
