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
  const { transactions, isLoading, error, fetchTransactions } = useTransactionStore();
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);

  const searchParams = useSearchParams();

  useEffect(() => {
    console.log("🔔 TransactionHistory useEffect arrancó");
    fetchTransactions();
  }, []);

  useEffect(() => {
    if (!transactions) return;
    const filtered = filterTransactionsByParams(transactions, searchParams);

    console.log("filtered", filtered);

    setFilteredTransactions(filtered);
  }, [transactions, searchParams]);

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
      {filteredTransactions.length === 0 && !isLoading && !error && (
        <EmptyTransactions />
      )}
      {filteredTransactions?.toReversed().map((transaction) => (
        <CardTransaction key={transaction.id} transaction={transaction} />
      ))}
    </section>
  );
};
