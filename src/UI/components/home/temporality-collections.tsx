"use client";

import { useMemo, useEffect } from "react";

import { Skeleton } from "@/common/skeleton";

import { useTransactionStore } from "@/store/transactionStore";

import { Button } from "@/common/button";
import { useRangeStore } from "@/store/rangeStore";
import { sumTotalAmount } from "@/features/helpers/sumTotalAmount";

import { TIME_RANGES } from "@/constants/home/home";

export const TemporalityCollections = () => {
  const { selectedRange, setSelectedRange } = useRangeStore(); // TODO: este contexto pasarlo a useContext
  const { transactions, isLoading, error, fetchTransactions } = useTransactionStore(); // TODO: revisar esto porque lo que esta haciendo ya lo hacen otras funciones en el proyecto, por lo que es codigo repetido

  const totalAmount = useMemo(() => {
    return sumTotalAmount({ transactions, selectedRange });
  }, [transactions, selectedRange]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <div className="w-full flex flex-col gap-3">
      <nav className="w-full">
        <ol className="flex justify-between items-center px-1">
          {Object.values(TIME_RANGES).map((range) => (
            <li key={range}>
              <Button
                variant="ghost"
                onClick={() => setSelectedRange(range)}
                className={`text-sm transition-all duration-300 ease-in-out transform ${range === selectedRange ? "font-medium -translate-y-1" : "text-[#666666] translate-y-0"}`}
              >
                {range}
              </Button>
              <div
                className={`m-auto mt-2 h-2 w-2 bg-blue-uala rounded-full transition-opacity duration-300 ease-in-out ${range === selectedRange ? "opacity-100" : "opacity-0"}`}
              />
            </li>
          ))}
        </ol>
      </nav>
      {isLoading ? (
        <Skeleton className="w-4/5 m-auto h-10 rounded-2xl" />
      ) : (
        <div className="flex w-full text-black font-normal m-auto justify-center">
          <p className="text-[34px] leading-none">
            {!error && "+"}${totalAmount.integer},
          </p>
          <p className="text-[22px] self-end leading-none">{totalAmount.decimal}</p>
        </div>
      )}
    </div>
  );
};
