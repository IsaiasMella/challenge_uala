"use client";

import { useEffect } from "react";

import { useRangeStore } from "@/store/rangeStore";
import { useTransactionStore } from "@/store/transactionStore";

import { getDateRange } from "@/features/helpers/getDateRange";
import { filterTransactionsByDateRange } from "@/features/helpers/filterTransactionsByDateRange";

import { Button } from "@/common/button";

import { TIME_RANGES } from "@/constants/home/home";
import { ValueOf } from "next/dist/shared/lib/constants";

export const TimeRangeSelector = () => {
  const { selectedRange, setSelectedRange } = useRangeStore();
  const { transactions, setFilteredTransactions } = useTransactionStore();

  useEffect(() => {
    const { startDate, endDate } = getDateRange(selectedRange);
    const filtered = filterTransactionsByDateRange(transactions, startDate, endDate);
    setFilteredTransactions(filtered);
  }, [selectedRange, transactions, setFilteredTransactions]);

  return (
    <nav className="w-full">
      <ol className="flex justify-between items-center px-1">
        {Object.entries(TIME_RANGES).map(([key, label]) => (
          <li key={key}>
            <Button
              variant="ghost"
              onClick={() => setSelectedRange(key as ValueOf<typeof TIME_RANGES>)}
              className={`text-sm transition-all duration-300 ease-in-out transform ${
                key === selectedRange ? "font-medium -translate-y-1" : "text-[#666666] translate-y-0"
              }`}
            >
              {label}
            </Button>
            <div
              className={`m-auto mt-2 h-2 w-2 bg-blue-uala rounded-full transition-opacity duration-300 ease-in-out ${
                key === selectedRange ? "opacity-100" : "opacity-0"
              }`}
            />
          </li>
        ))}
      </ol>
    </nav>
  );
};
