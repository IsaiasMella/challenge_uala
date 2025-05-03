"use client";

import { TotalAmount } from "./TotalAmount";
import { TimeRangeSelector } from "./TimeRangeSelector";

import { useRangeStore } from "@/store/rangeStore";
import { useTransactionStore } from "@/store/transactionStore";

import { sumTotalAmount } from "@/features/helpers/sumTotalAmount";

export const TemporalityCollections = () => {
  const { transactions, isLoading, error } = useTransactionStore();
  const { selectedRange } = useRangeStore();

  const totalAmount = sumTotalAmount({ transactions, selectedRange });

  return (
    <div className="w-full flex flex-col gap-3">
      <TimeRangeSelector />
      <TotalAmount
        totalAmount={totalAmount}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};
