"use client";

import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import { useTransactionStore } from "@/store/transactionStore";

import { CardTransaction } from "@/UI/components/home/list-transactions/CardTransaction";
import { EmptyTransactions } from "@/UI/components/home/list-transactions/EmptyTransactions";
import { SkeletonCollection } from "@/UI/components/home/skeletons/collection";

import { filterTransactionsByParams } from "@/features/helpers/filterTransactionsByParams";

import "moment/locale/es";
import { FilterSidebar } from "@/UI/sections/home/FilterSidebar";
import { DateRangePicker } from "@/UI/components/home/list-transactions/DateRangePicker";

export const TransactionHistory = () => {
  const searchParams = useSearchParams();

  const { 
    isLoading,
    error,
    fetchTransactions,
    filteredTransactions,
  } = useTransactionStore();

  const [transactionsFilteredByParams, setTransactionsFilteredByParams] = useState(filteredTransactions);

  useEffect(() => {
    console.log("🔔 TransactionHistory useEffect arrancó");
    fetchTransactions();
  }, []);

  useEffect(() => {
    if (!filteredTransactions) return;
    const filtered = filterTransactionsByParams(filteredTransactions, searchParams);

    console.log("filtered", filtered);

    setTransactionsFilteredByParams(filtered);
  }, [filteredTransactions,searchParams]);


  if (isLoading)
    return Array.from({ length: 10 }).map((_, index) => (
      <SkeletonCollection key={index} />
    ));

  if (error)
    return <p className="text-red-500">Error al cargar las transacciones</p>;

  return (
    <section className="my-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium">Historial de transacciones</h2>
        <div className="flex gap-4">
          <FilterSidebar />
          <DateRangePicker />
        </div>
      </div>
      {transactionsFilteredByParams.length === 0 && !isLoading && !error && (
        <EmptyTransactions />
      )}
      {transactionsFilteredByParams?.toReversed().map((transaction) => (
        <CardTransaction key={transaction.id} transaction={transaction} />
      ))}
    </section>
  );
};
